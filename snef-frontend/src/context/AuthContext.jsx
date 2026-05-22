// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { loginAsGuest, loginUser } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('snef_user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setIsAuthLoading(false);
  }, []);

  const saveSession = ({ token, user: nextUser }) => {
    if (token) {
      localStorage.setItem('snef_token', token);
    } else {
      localStorage.removeItem('snef_token');
    }

    // Si es invitado no persistimos progreso real, pero sí guardamos sesión local temporal.
    localStorage.setItem('snef_user', JSON.stringify(nextUser));
    setUser(nextUser);
  };

  const handleLogin = async (credentials) => {
    const session = await loginUser(credentials);
    saveSession(session);

    return session;
  };

  const handleGuestLogin = async () => {
    const session = await loginAsGuest();
    saveSession(session);

    return session;
  };

  const logout = () => {
    localStorage.removeItem('snef_token');
    localStorage.removeItem('snef_user');
    setUser(null);
  };

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
    [user, isAuthLoading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }

  return context;
}