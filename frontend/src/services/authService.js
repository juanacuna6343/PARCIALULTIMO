import api from './api';

export async function login(email, password) {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getMe(token) {
  try {
    const response = await api.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.success ? response.data.data : null;
  } catch (error) {
    return null;
  }
}
