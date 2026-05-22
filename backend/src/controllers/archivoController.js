const env = require('../config/env');
const { supabase, supabaseConfigured } = require('../lib/supabase');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    if (!supabaseConfigured || !supabase) {
      return res.status(500).json({ success: false, message: 'Supabase no está configurado para cargar archivos' });
    }

    const bucket = env.supabase.bucket;
    if (!bucket) {
      return res.status(500).json({ success: false, message: 'No se ha configurado el bucket de Supabase' });
    }

    const ensureBucket = async () => {
      const { data: bucketData, error: bucketError } = await supabase.storage.getBucket(bucket);
      if (bucketError) {
        if (bucketError?.message?.toLowerCase().includes('not found') || bucketError?.status === 404) {
          const { data: createdBucket, error: createError } = await supabase.storage.createBucket(bucket, { public: true });
          if (createError) {
            console.error('Supabase create bucket error:', createError);
            throw createError;
          }
          return createdBucket;
        }
        throw bucketError;
      }
      return bucketData;
    };

    await ensureBucket();

    const file = req.file; // multer memoryStorage
    const ext = file.originalname.split('.').pop();
    const normalizeFileName = (name) =>
      name
        .normalize('NFKD')
        .replace(/[\u0000-\u001f\u007f-\u009f]/g, '')
        .replace(/[\u0300-\u036f]/g, '') // eliminar diacríticos
        .replace(/[^a-zA-Z0-9._-]+/g, '_')
        .replace(/^_+|_+$/g, '')
        .substring(0, 200);

    const safeName = normalizeFileName(file.originalname);
    const now = Date.now();
    const path = `${now}_${safeName}`;

    // Subir a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: false });

    if (uploadError) {
      console.error('Supabase storage error:', uploadError);
      return res.status(500).json({ success: false, message: uploadError.message || 'Storage error' });
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
    const publicUrl = publicUrlData?.publicUrl || null;

    // Guardar metadata en tabla 'documentos'
    const { data: docData, error: docError } = await supabase
      .from('documentos')
      .insert([
        {
          tipo: ext,
          url_archivo: publicUrl,
          nombre: file.originalname,
          tamano: file.size,
        }
      ])
      .select()
      .single();

    if (docError) {
      console.error('Supabase insert error:', docError);
      return res.status(500).json({ success: false, message: docError.message || 'DB insert error' });
    }

    res.status(201).json({ success: true, data: docData, message: 'Archivo subido correctamente' });
  } catch (error) {
    console.error('Error uploadFile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};
