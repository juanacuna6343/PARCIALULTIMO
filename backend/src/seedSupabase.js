const { supabase } = require('./lib/supabase');
const { mockData } = require('./mockData');
const bcrypt = require('bcryptjs');

async function seedSupabase() {
  try {
    console.log('🌱 Iniciando seed de Supabase...\n');

    // Limpiar tablas en orden de dependencias
    console.log('🗑️  Limpiando datos previos...');
    await supabase.from('oportunidades').delete().neq('id', -1);
    await supabase.from('eventos').delete().neq('id', -1);
    await supabase.from('suscripciones').delete().neq('id', -1);
    await supabase.from('servicios').delete().neq('id', -1);
    await supabase.from('clientes').delete().neq('id', -1);
    await supabase.from('usuarios').delete().neq('id', -1);
    console.log('✅ Datos previos eliminados\n');

    // 1. Insertar usuarios
    console.log('📝 Insertando usuarios...');
    const { data: usuariosData, error: usuariosError } = await supabase
      .from('usuarios')
      .insert(
        mockData.usuarios.map((u) => ({
          email: u.email,
          password: u.password, // Ya viene hasheada de mockData
          nombre: u.nombre,
          rol: u.rol,
          activo: u.activo,
        }))
      )
      .select();

    if (usuariosError) throw usuariosError;
    console.log(`✅ ${usuariosData.length} usuarios insertados\n`);

    // 2. Insertar clientes
    console.log('📝 Insertando clientes...');
    const { data: clientesData, error: clientesError } = await supabase
      .from('clientes')
      .insert(
        mockData.clientes.map((c) => ({
          nombre: c.nombre,
          contacto: c.contacto,
          email: c.email,
          telefono: c.telefono,
          sector: c.sector,
          estado: c.estado,
        }))
      )
      .select();

    if (clientesError) throw clientesError;
    console.log(`✅ ${clientesData.length} clientes insertados\n`);

    // 3. Insertar servicios
    console.log('📝 Insertando servicios...');
    const { data: serviciosData, error: serviciosError } = await supabase
      .from('servicios')
      .insert(
        mockData.servicios.map((s) => ({
          tipo: s.tipo,
          cliente_id: clientesData[s.clienteId - 1]?.id, // Mapear ID correcto
          fecha_inicio: s.fechaInicio,
          fecha_fin: s.fechaFin,
          valor: s.valor,
          estado: s.estado,
          descripcion: s.descripcion,
        }))
      )
      .select();

    if (serviciosError) throw serviciosError;
    console.log(`✅ ${serviciosData.length} servicios insertados\n`);

    // 4. Insertar suscripciones
    console.log('📝 Insertando suscripciones...');
    const { data: suscripcionesData, error: suscripcionesError } = await supabase
      .from('suscripciones')
      .insert(
        mockData.suscripciones.map((s) => {
          const fechaInicio = new Date(s.fechaInicio);
          let fechaRenovacion = new Date(fechaInicio);
          
          if (s.frecuencia === 'mensual') {
            fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 1);
          } else if (s.frecuencia === 'trimestral') {
            fechaRenovacion.setMonth(fechaRenovacion.getMonth() + 3);
          } else if (s.frecuencia === 'anual') {
            fechaRenovacion.setFullYear(fechaRenovacion.getFullYear() + 1);
          }
          
          return {
            cliente_id: clientesData[s.clienteId - 1]?.id,
            nombre: s.nombre,
            valor: s.valor,
            frecuencia: s.frecuencia,
            fecha_inicio: s.fechaInicio,
            fecha_renovacion: fechaRenovacion,
            estado: s.estado,
          };
        })
      )
      .select();

    if (suscripcionesError) throw suscripcionesError;
    console.log(`✅ ${suscripcionesData.length} suscripciones insertadas\n`);

    // 5. Insertar eventos
    console.log('📝 Insertando eventos...');
    const { data: eventosData, error: eventosError } = await supabase
      .from('eventos')
      .insert(
        mockData.eventos.map((e) => ({
          titulo: e.titulo,
          descripcion: e.descripcion,
          fecha_inicio: e.fechaInicio,
          fecha_fin: e.fechaFin,
          tipo: e.tipo,
        }))
      )
      .select();

    if (eventosError) throw eventosError;
    console.log(`✅ ${eventosData.length} eventos insertados\n`);

    // 6. Insertar oportunidades
    console.log('📝 Insertando oportunidades...');
    const { data: oportunidadesData, error: oportunidadesError } = await supabase
      .from('oportunidades')
      .insert(
        mockData.oportunidades.map((o) => ({
          titulo: o.titulo,
          descripcion: o.descripcion,
          cliente_id: clientesData[o.clienteId - 1]?.id,
          etapa: o.etapa,
          valor: o.valor,
          probabilidad: o.probabilidad,
          fecha_estimada: o.fechaEstimada,
          notas: o.notas,
          prioridad: o.prioridad,
        }))
      )
      .select();

    if (oportunidadesError) throw oportunidadesError;
    console.log(`✅ ${oportunidadesData.length} oportunidades insertadas\n`);

    console.log('🎉 Seed completado exitosamente!');
    console.log('✨ Los datos ya están disponibles en tu base de datos Supabase');
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
    process.exit(1);
  }
}

seedSupabase();
