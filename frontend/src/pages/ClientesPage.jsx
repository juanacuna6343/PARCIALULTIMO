import { useEffect, useState } from 'react';
import { listClientes, createCliente } from '../services/clienteService';

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    loadClientes();
  }, []);

  async function loadClientes() {
    const data = await listClientes();
    setClientes(data);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCliente({ nombre, email, telefono, sector: 'Consultoría', estado: 'activo', contacto: 'Administrativo' });
    setNombre('');
    setEmail('');
    setTelefono('');
    setMensaje('Cliente agregado correctamente');
    loadClientes();
  };

  return (
    <div className="panel">
      <h1>Clientes</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Nombre
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Teléfono
          <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </label>
        <button type="submit">Agregar cliente</button>
      </form>
      {mensaje && <div className="success">{mensaje}</div>}
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nombre}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefono}</td>
                <td>{cliente.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientesPage;
