// src/components/Navbar.jsx

import { NavLink } from 'react-router-dom';
import { Video, Film } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

import logoSnef from '../../assets/brand/logoSNEF2026.svg';
import ditasIcon from '../../assets/iconos/ditas.png';
import defaultAvatar from '../../assets/iconos/foto_perfil.png';

const navItems = [
  {
    label: 'Inicio',
    to: '/home',
  },
  {
    label: 'Progreso',
    to: '/progreso',
  },
];

export default function Navbar() {
  const { user } = useAuth();

  const handleOpenRecordingSet = () => {
    // TODO: redirigir al iframe o ruta del set de grabación Unity
    console.log('Abrir set de grabación');
  };

  const handleOpenCinema = () => {
    const token = localStorage.getItem('snef_token');

    // TODO: reemplazar con la URL real del build Unity.
    const unityUrl = token
      ? `/cine-virtual?token=${encodeURIComponent(token)}`
      : '/cine-virtual?guest=true';

    console.log('Abrir cine:', unityUrl);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#141414]/90 px-4 py-5 backdrop-blur-md md:px-8">
      <nav className="mx-auto flex max-w-[1540px] items-center justify-between gap-6">
        <NavLink to="/home" className="shrink-0">
          <img
            src={logoSnef}
            alt="Semana Nacional de Educación Financiera 2026"
            className="h-auto w-[150px] md:w-[180px]"
          />
        </NavLink>

        <div
          className="
            hidden items-center gap-7 rounded-full border border-[#1A1A1A]
            bg-[#0F0F0F] px-8 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.24)]
            xl:flex
          "
        >
          {navItems.map((item) => (
            <NavbarNavButton key={item.to} to={item.to}>
              {item.label}
            </NavbarNavButton>
          ))}

          <NavbarActionButton onClick={handleOpenRecordingSet} icon={Video}>
            Set de grabación
          </NavbarActionButton>

          <CinemaButton onClick={handleOpenCinema} />
        </div>

        <UserCard user={user} />
      </nav>
    </header>
  );
}

function NavbarNavButton({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        relative inline-flex min-w-[160px] items-center justify-center rounded-full
        px-8 py-3 text-lg font-medium transition-all duration-300 ease-out
        active:scale-[0.96]
        ${
          isActive
            ? `
              bg-[#1A1A1A] text-white
              before:absolute before:inset-0 before:rounded-full before:p-[3px]
              before:bg-gradient-to-b before:from-[#6AB439] before:to-[#22ADE4]
              before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]
              before:[mask-composite:exclude]
            `
            : `
              border-[3px] border-[#0F0F0F] bg-[#1A1A1A] text-[#999999]
              hover:bg-[#1D1D1D] hover:text-white
            `
        }
      `}
    >
      <span className="relative z-10 text-inherit">
        {children}
      </span>
    </NavLink>
  );
}

function NavbarActionButton({ children, icon: Icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex min-w-[270px] items-center justify-center gap-3 rounded-full
        border-[3px] border-[#0F0F0F] bg-[#1A1A1A]
        px-8 py-3 text-lg font-medium text-[#999999]
        transition-all duration-300 ease-out
        hover:bg-[#1D1D1D] hover:text-white
        active:scale-[0.96]
      "
    >
      <span className="text-inherit">
        {children}
      </span>

      {Icon && (
        <Icon
          size={24}
          strokeWidth={2.5}
          className="text-[#8DCD21] transition-transform duration-300 group-hover:scale-110"
        />
      )}
    </button>
  );
}

function CinemaButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        inline-flex min-w-[250px] items-center justify-center gap-3 rounded-full
        border border-[#6AB439] bg-[#1A1A1A]
        px-8 py-3 text-lg font-medium text-white
        transition-all duration-300 ease-out
        hover:bg-[#1D1D1D] hover:shadow-[0_14px_34px_rgba(106,180,57,0.16)]
        active:scale-[0.96]
      "
    >
      <span className="text-white">
        Visitar cine
      </span>

      <Film
        size={24}
        strokeWidth={2.5}
        className="text-[#22ADE4] transition-transform duration-300"
      />
    </button>
  );
}

function UserCard({ user }) {
  const username = user?.username || 'Invitado';
  const ditas = user?.ditas ?? 0;
  const avatar = user?.avatar || defaultAvatar;

  return (
    <div
      className="
        hidden items-center gap-4 rounded-full border border-[#1A1A1A]
        bg-[#0F0F0F] px-5 py-2.5 shadow-[0_14px_40px_rgba(0,0,0,0.24)]
        md:flex
      "
    >
      <div className="rounded-full bg-gradient-to-b from-[#22ADE4] to-[#6AB439] p-[3px]">
        <img
          src={avatar}
          alt={`Avatar de ${username}`}
          className="h-16 w-16 rounded-full bg-[#1A1A1A] object-cover"
        />
      </div>

      <div>
        <p className="text-xl font-medium leading-tight text-white">
          {username}
        </p>

        <div className="mt-1 flex items-center gap-2">
          <img
            src={ditasIcon}
            alt="Ditas"
            className="h-7 w-7 object-contain"
          />

          <p className="text-base font-medium text-[#999999]">
            {ditas} Ditas
          </p>
        </div>
      </div>
    </div>
  );
}