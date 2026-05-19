import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientesPage from './pages/ClientesPage';
import { getMe } from './services/authService';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadProfile() {
      const token = window.localStorage.getItem('SGDI_TOKEN');
      if (!token) {
        setLoading(false);
        return;
      }
      const profile = await getMe(token);
      if (profile) {
        setUser(profile);
      } else {
        window.localStorage.removeItem('SGDI_TOKEN');
      }
      setLoading(false);
    }
    loadProfile();
  }, []);

  if (loading) {
    return <div className="app-shell">Cargando...</div>;
  }

  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/dashboard" element={user ? <DashboardPage user={user} onLogout={() => { setUser(null); navigate('/login'); }} /> : <Navigate to="/login" />} />
        <Route path="/clientes" element={user ? <ClientesPage user={user} /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} />} />
        <Route path="*" element={<div>Ruta no encontrada</div>} />
      </Routes>
    </div>
  );
}

export default App;
