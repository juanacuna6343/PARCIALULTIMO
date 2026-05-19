import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function DashboardPage({ user, onLogout }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await api.get('/dashboard');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="panel">
      <header className="panel-header">
        <div>
          <h1>Bienvenido, {user?.nombre}</h1>
          <p>Panel principal</p>
        </div>
        <button className="secondary" onClick={onLogout}>Cerrar sesión</button>
      </header>
      <nav className="nav-links">
        <Link to="/clientes">Clientes</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      {loading ? (
        <p>Cargando estadísticas...</p>
      ) : stats ? (
        <div className="stats-grid">
          <div className="card">
            <h2>Clientes</h2>
            <p>{stats.clientes}</p>
          </div>
          <div className="card">
            <h2>Servicios</h2>
            <p>{stats.servicios}</p>
          </div>
          <div className="card">
            <h2>Tareas pendientes</h2>
            <p>{stats.tareasPendientes}</p>
          </div>
          <div className="card">
            <h2>Usuarios activos</h2>
            <p>{stats.usuarios}</p>
          </div>
        </div>
      ) : (
        <p>No se pudieron cargar los indicadores.</p>
      )}
    </div>
  );
}

export default DashboardPage;
