// src/components/ui/Navbar.jsx

import { NavLink, useLocation } from 'react-router-dom';
import { Video, Film } from 'lucide-react';

import { useAuth } from '../../context/authState';

import logoSnef from '../../assets/brand/logoSNEF2026.svg';
import ditasIcon from '../../assets/iconos/ditas.png';
import defaultAvatar from '../../assets/iconos/foto_perfil.png';

const navItems = [
  {
    label: 'Inicio',
    to: '/home',
    activePaths: ['/home', '/catalogo'],
  },
  {
    label: 'Progreso',
    to: '/progreso',
  },
];

export default function Navbar({ variant = 'default' }) {
  const { user } = useAuth();
  const unityBuildUrl = '/unity-local/Build2/index.html';
  const isOverlay = variant === 'overlay';

  const handleOpenRecordingSet = () => {
    window.location.href = unityBuildUrl;
  };

  const handleOpenCinema = () => {
    window.location.href = unityBuildUrl;
  };

  return (
    <header
      className={`
        top-0 z-50 w-full px-4 py-5 md:px-8
        ${
          isOverlay
            ? 'absolute bg-transparent'
            : 'sticky bg-[#141414]/95 backdrop-blur-md'
        }
      `}
    >
      <nav className="snef-layout-container flex items-center justify-between gap-6">
        <NavLink
          to="/home"
          className="flex h-[82px] shrink-0 items-center no-underline hover:no-underline"
          aria-label="Ir al inicio"
        >
          <img
            src={logoSnef}
            alt="Semana Nacional de EducaciÃ³n Financiera 2026"
            className="h-[72px] w-auto object-contain"
          />
        </NavLink>

        <div
          className="
            hidden h-[82px] items-center gap-7 rounded-full
            border border-[#1A1A1A] bg-[#0F0F0F]
            px-8 py-3
            xl:flex
          "
        >
          {navItems.map((item) => (
            <NavbarNavButton
              key={item.to}
              to={item.to}
              activePaths={item.activePaths}
            >
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

function NavbarNavButton({ to, activePaths = [], children }) {
  const location = useLocation();

  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        const isSelected = isActive || activePaths.includes(location.pathname);

        return `
        group relative inline-flex min-w-[160px] items-center justify-center overflow-hidden
        rounded-full px-8 py-3 text-lg font-medium no-underline
        transition-all duration-300 ease-out
        hover:no-underline active:scale-[0.96]
        ${
          isSelected
            ? `
              border-[2px] border-transparent bg-[#1A1A1A] text-white
              [background:linear-gradient(#1A1A1A,#1A1A1A)_padding-box,linear-gradient(180deg,#6AB439,#22ADE4)_border-box]
            `
            : `
              border-[3px] border-[#0F0F0F] bg-[#1A1A1A] text-[#999999]
              hover:bg-[#1D1D1D] hover:text-white
            `
        }
      `;
      }}
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
        group inline-flex min-w-[270px] items-center justify-center gap-3 rounded-full
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
        group relative inline-flex min-w-[250px] items-center justify-center gap-3 overflow-hidden
        rounded-full border border-[#6AB439] bg-[#1A1A1A]
        px-8 py-3 text-lg font-medium text-white
        transition-all duration-300 ease-out
        hover:bg-[#1D1D1D]
        active:scale-[0.96]
        before:absolute before:left-1/2 before:top-1/2
        before:h-10 before:w-28 before:-translate-x-1/2 before:-translate-y-1/2
        before:rounded-full before:bg-[#6AB439]/20 before:opacity-0 before:blur-xl
        before:transition-opacity before:duration-300
        hover:before:opacity-100
      "
    >
      <span className="relative z-10 text-white">
        Visitar cine
      </span>

      <Film
        size={24}
        strokeWidth={2.5}
        className="relative z-10 text-[#22ADE4] transition-transform duration-300 group-hover:scale-110"
      />
    </button>
  );
}

function UserCard({ user }) {
  const username = user?.username || 'Invitado';
  const ditas = user?.ditas ?? 0;

  return (
    <div
      className="
        hidden h-[82px] items-center gap-4 rounded-full
        border border-[#1A1A1A] bg-[#0F0F0F]
        px-5 py-2.5
        md:flex
      "
    >
      <div className="rounded-full bg-gradient-to-b from-[#22ADE4] to-[#6AB439] p-[3px]">
        <img
          src={defaultAvatar}
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
