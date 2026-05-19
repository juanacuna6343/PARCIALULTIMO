import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('admin@sgdi.local');
  const [password, setPassword] = useState('Admin123!');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    const data = await login(email, password);
    if (!data || !data.success) {
      setError('Usuario o contraseña incorrectos');
      return;
    }
    window.localStorage.setItem('SGDI_TOKEN', data.data.token);
    onLogin(data.data.usuario);
    navigate('/dashboard');
  };

  return (
    <div className="panel">
      <h1>Ingreso SGDI</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Contraseña
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit">Ingresar</button>
        {error && <div className="error">{error}</div>}
      </form>
      <p>Usuario de prueba: admin@sgdi.local / Admin123!</p>
    </div>
  );
}

export default LoginPage;
