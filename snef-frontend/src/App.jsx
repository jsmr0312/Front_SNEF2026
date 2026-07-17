// src/App.jsx

import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import RecoverPassword from './pages/RecoverPassword/RecoverPassword';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import MoviePreview from './pages/MoviePreview/MoviePreview';
import QuizPage from './pages/Quiz/QuizPage';
import WatchPage from './pages/Watch/WatchPage';
import Progress from './pages/Progress/Progress';
import DesignSystem from './pages/DesignSystem/DesignSystem';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/registro" element={<Register />} />
      <Route path="/recuperar-password" element={<RecoverPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/catalogo" element={<Catalog />} />
      <Route path="/preview/:movieId" element={<MoviePreview />} />
      <Route path="/watch/:movieId" element={<WatchPage />} />
      <Route path="/quiz/:movieId" element={<QuizPage />} />
      <Route path="/design-system" element={<DesignSystem />} />
      <Route path="/progreso" element={<Progress />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
