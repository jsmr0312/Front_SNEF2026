// src/pages/Login/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import FormInput from '../../components/ui/FormInput';
import PasswordInput from '../../components/ui/PasswordInput';
import Modal from '../../components/ui/Modal';

import { useAuth } from '../../context/authState';

import loginHero from '../../assets/login-hero.png';

export default function Login() {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();

  const [showGuestWarning, setShowGuestWarning] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    await login({
      username: 'Oscar0312',
      password: '123456',
    });

    navigate('/home');
  };

  const handleOpenGuestWarning = () => {
    setShowGuestWarning(true);
  };

  const handleConfirmGuestAccess = async () => {
    await guestLogin();
    navigate('/home');
  };

  return (
    <main className="snef-page flex min-h-screen items-center justify-center p-4 md:p-6">
      <section className="grid w-full max-w-[1440px] gap-6 lg:grid-cols-[1.1fr_0.85fr]">
        <HeroPanel />

        <LoginPanel
          onSubmit={handleSubmit}
          onGuestAccess={handleOpenGuestWarning}
        />
      </section>

      <GuestWarningModal
        isOpen={showGuestWarning}
        onClose={() => setShowGuestWarning(false)}
        onConfirm={handleConfirmGuestAccess}
      />
    </main>
  );
}

function GuestWarningModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal
      isOpen={isOpen}
      title="Advertencia"
      onClose={onClose}
      actions={
        <Button
          type="button"
          variant="primaryGreen"
          onClick={onConfirm}
          className="min-w-[150px] !px-5 !py-2.5 text-sm"
        >
          Aceptar y jugar
        </Button>
      }
    >
      <div
        className="
          rounded-[8px] bg-[#1A1A1A]
          px-6 py-9 text-center
          md:px-12
        "
      >
        <p className="text-base leading-7 text-white md:text-lg">
          En el modo invitado se perderá todo tu progreso, en caso de querer
          guardar tu progreso te invitamos a iniciar sesión o registrarte en
          caso de que aún no tengas una cuenta.
        </p>
      </div>
    </Modal>
  );
}

function HeroPanel() {
  return (
    <section
      className="
        relative hidden min-h-[640px] overflow-hidden rounded-[30px]
        border border-[#373737] bg-[#1A1A1A]
        lg:block
      "
    >
      <img
        src={loginHero}
        alt="Plataforma virtual SNEF 2026"
        className="h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/45" />
      <div className="absolute inset-0 rounded-[30px] shadow-[inset_0_0_120px_rgba(0,0,0,0.65)]" />
    </section>
  );
}

function LoginPanel({ onSubmit, onGuestAccess }) {
  return (
    <section
      className="
        flex min-h-[640px] items-center justify-center rounded-[30px]
        border border-[#373737] bg-[#1A1A1A]
        px-6 py-10 md:px-12
      "
    >
      <div className="w-full max-w-[430px]">
        <div className="mb-10">
          <h1 className="mb-4 text-3xl font-semibold text-white">
            Inicia sesión
          </h1>

          <p className="text-sm leading-6 text-[#999999]">
            Ingresa tu información de forma correcta para acceder.
          </p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <FormInput
            id="username"
            label="Nombre de usuario:"
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            autoComplete="username"
          />

          <PasswordInput
            id="password"
            label="Contraseña:"
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            value=""
            onChange={() => {}}
          />

          <div className="space-y-4 pt-8">
            <Button type="submit" variant="primary" className="w-full">
              Ingresar
            </Button>

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={onGuestAccess}
            >
              Ingresar como invitado
            </Button>
          </div>

          <div className="space-y-5 pt-10 text-center text-sm">
            <p className="text-[#999999]">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-[#22ADE4] hover:underline">
                Regístrate aquí
              </Link>
            </p>

            <Link
              to="/recuperar-password"
              className="inline-block text-[#22ADE4] hover:underline"
            >
              Olvidé mi contraseña
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}

