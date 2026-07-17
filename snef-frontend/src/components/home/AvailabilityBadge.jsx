import { Film } from 'lucide-react';

export default function AvailabilityBadge({
  label = 'Disponible en cine',
  className = '',
}) {
  return (
    <span
      className={`
        snef-badge snef-badge--cinema
        ${className}
      `}
    >
      <span>{label}</span>

      <Film
        aria-hidden="true"
        size={18}
        strokeWidth={2.5}
        className="text-[#8DCD21]"
      />
    </span>
  );
}
