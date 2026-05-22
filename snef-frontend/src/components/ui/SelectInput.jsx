// src/components/ui/SelectInput.jsx

import { ChevronDown } from 'lucide-react';

export default function SelectInput({
  label,
  id,
  value,
  onChange,
  placeholder = 'Selecciona una opción',
  options = [],
  error,
  className = '',
}) {
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
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="
            w-full appearance-none rounded-[10px] border border-[#373737]
            bg-transparent px-4 py-3 pr-12 text-white outline-none
            transition-all duration-300 ease-out
            hover:border-[#4A4A4A]
            focus:border-[#6AB439]
            focus:bg-white/[0.02]
            focus:shadow-[0_0_0_4px_rgba(106,180,57,0.08)]
            invalid:text-[#999999]
          "
        >
          <option value="" disabled>
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-[#1A1A1A] text-white"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={20}
          strokeWidth={2.2}
          className="
            pointer-events-none absolute right-4 top-1/2 -translate-y-1/2
            text-white transition-transform duration-300
            group-focus-within:rotate-180
          "
        />
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}