// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import Home from './pages/Home/Home';
import DesignSystem from './pages/DesignSystem/DesignSystem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar-password" element={<RecoverPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/design-system" element={<DesignSystem />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;