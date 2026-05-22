// src/components/ui/PasswordInput.jsx

import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function PasswordInput({
  label = 'Contraseña:',
  id,
  value,
  onChange,
  placeholder = 'Ingresa tu contraseña',
  autoComplete = 'current-password',
  error,
  className = '',
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`group w-full ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        <span
          className="
            h-5 w-[3px] rounded-full bg-[#6AB439]
            transition-all duration-300 ease-out
            group-focus-within:h-6 group-focus-within:bg-[#22ADE4]
          "
        />

        <label htmlFor={id} className="text-sm font-medium text-white">
          {label}
        </label>
      </div>

      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="
            w-full rounded-[10px] border border-[#373737]
            bg-transparent px-4 py-3 pr-12 text-white outline-none
            transition-all duration-300 ease-out
            placeholder:text-[#999999]
            hover:border-[#4A4A4A]
            focus:border-[#6AB439]
            focus:bg-white/[0.02]
            focus:shadow-[0_0_0_4px_rgba(106,180,57,0.08)]
          "
        />

        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="
            absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center
            text-white/80 transition-all duration-300
            hover:scale-110 hover:text-white
            active:scale-95
          "
        >
          {showPassword ? (
            <EyeOff size={20} strokeWidth={2.2} />
          ) : (
            <Eye size={20} strokeWidth={2.2} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}