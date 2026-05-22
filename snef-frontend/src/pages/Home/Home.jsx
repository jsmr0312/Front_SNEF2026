// src/pages/Home/Home.jsx

import Navbar from '../../components/ui/Navbar';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="snef-page min-h-screen">
      <Navbar />

      <section className="snef-container py-10">
        <div className="snef-panel p-8 md:p-10">
          <p className="mb-3 text-sm font-medium text-[#22ADE4]">
            Inicio de plataforma
          </p>

          <h1 className="mb-4 text-3xl font-semibold text-white md:text-5xl">
            Bienvenido, {user?.username || 'Invitado'}
          </h1>

          <p className="max-w-2xl text-base leading-7 text-[#999999]">
            Esta será la pantalla principal del catálogo de películas. Aquí
            organizaremos las secciones Platinum, Oro y Plata.
          </p>
        </div>
      </section>
    </main>
  );
}