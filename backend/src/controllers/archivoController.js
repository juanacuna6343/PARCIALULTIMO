const { supabase } = require('../lib/supabase');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    const file = req.file; // multer memoryStorage
    const ext = file.originalname.split('.').pop();
    const now = Date.now();
    const path = `documents/${now}_${file.originalname}`;

    // Subir a Supabase Storage (bucket 'documents')
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('documents')
      .upload(path, file.buffer, { contentType: file.mimetype, upsert: false });

    if (uploadError) {
      console.error('Supabase storage error:', uploadError);
      return res.status(500).json({ success: false, message: uploadError.message || 'Storage error' });
    }

    // Obtener URL pública
    const { data: publicUrlData } = supabase.storage.from('documents').getPublicUrl(path);
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
