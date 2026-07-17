export default function CategoryBadge({
  label,
  accentColor = '#D94F96',
  className = '',
}) {
  if (!label) {
    return null;
  }

  return (
    <span
      className={`
        snef-badge snef-badge--genre
        ${className}
      `}
      style={{ '--snef-badge-color': accentColor }}
    >
      {label}
    </span>
  );
}
