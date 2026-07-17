// src/services/api.js

const API_URL = import.meta.env.VITE_API_URL ?? '';
const USE_MOCKS = import.meta.env.VITE_USE_MOCKS !== 'false';

export function getHeaders() {
  const token = localStorage.getItem('snef_token');

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

const mockUser = {
  id: 'mock-user-001',
  username: 'Oscar0312',
  avatar: '/src/assets/iconos/foto_perfil.png',
  ditas: 230,
  isGuest: false,
};

const mockGuestUser = {
  id: 'guest-user',
  username: 'Invitado',
  avatar: '/src/assets/iconos/foto_perfil.png',
  ditas: 0,
  isGuest: true,
};

export async function loginUser(credentials) {
  if (USE_MOCKS) {
    return {
      token: 'mock-jwt-token-snef-2026',
      user: mockUser,
    };
  }

  if (!API_URL) {
    throw new Error('VITE_API_URL no estÃ¡ configurada');
  }

  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('No se pudo iniciar sesión');
  }

  return response.json();
}

export async function loginAsGuest() {
  if (USE_MOCKS) {
    return {
      token: null,
      user: mockGuestUser,
    };
  }

  return {
    token: null,
    user: mockGuestUser,
  };
}
