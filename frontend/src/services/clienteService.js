import api from './api';

export async function listClientes() {
  const response = await api.get('/clientes');
  return response.data.success ? response.data.data : [];
}

export async function createCliente(cliente) {
  const response = await api.post('/clientes', cliente);
  return response.data;
}
