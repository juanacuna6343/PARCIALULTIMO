const { mockData } = require('../mockData');

exports.getDashboard = (req, res) => {
  try {
    const clientes = mockData.clientes.length;
    const servicios = mockData.servicios.length;
    const tareasPendientes = mockData.tareas.filter((t) => !t.completada).length;
    const usuarios = mockData.usuarios.filter((u) => u.activo).length;

    res.json({
      success: true,
      data: {
        clientes,
        servicios,
        tareasPendientes,
        usuarios,
      },
    });
  } catch (error) {
    console.error('❌ Error en dashboard:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};

exports.getKpis = (req, res) => {
  try {
    const serviciosPorEstado = {};

    mockData.servicios.forEach((servicio) => {
      if (!serviciosPorEstado[servicio.estado]) {
        serviciosPorEstado[servicio.estado] = { estado: servicio.estado, cantidad: 0 };
      }
      serviciosPorEstado[servicio.estado].cantidad++;
    });

    res.json({
      success: true,
      data: {
        serviciosPorEstado: Object.values(serviciosPorEstado),
      },
    });
  } catch (error) {
    console.error('❌ Error en KPIs:', error);
    res.status(500).json({ code: 'SERVER_ERROR', message: error.message });
  }
};
