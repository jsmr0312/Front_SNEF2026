// src/context/AuthContext.jsx

import { useCallback, useMemo, useState } from 'react';
import { loginAsGuest, loginUser } from '../services/api';
import { AuthContext } from './authState';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('snef_user');

    if (savedUser) {
      return JSON.parse(savedUser);
    }

    return null;
  });
  const [isAuthLoading] = useState(false);

  const saveSession = useCallback(({ token, user: nextUser }) => {
    if (token) {
      localStorage.setItem('snef_token', token);
    } else {
      localStorage.removeItem('snef_token');
    }

    // Si es invitado no persistimos progreso real, pero sí guardamos sesión local temporal.
    localStorage.setItem('snef_user', JSON.stringify(nextUser));
    setUser(nextUser);
  }, []);

  const handleLogin = useCallback(async (credentials) => {
    const session = await loginUser(credentials);
    saveSession(session);

    return session;
  }, [saveSession]);

  const handleGuestLogin = useCallback(async () => {
    const session = await loginAsGuest();
    saveSession(session);

    return session;
  }, [saveSession]);

  const logout = useCallback(() => {
    localStorage.removeItem('snef_token');
    localStorage.removeItem('snef_user');
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isGuest: Boolean(user?.isGuest),
      isAuthLoading,
      login: handleLogin,
      guestLogin: handleGuestLogin,
      logout,
      setUser,
    }),
    [user, isAuthLoading, handleLogin, handleGuestLogin, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
