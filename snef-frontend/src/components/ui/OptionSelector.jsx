// src/components/ui/OptionSelector.jsx

export default function OptionSelector({
  label,
  name,
  value,
  onChange,
  options = [],
  columns = 'grid-cols-2',
  error,
  className = '',
}) {
  return (
    <div className={`w-full ${className}`}>
      <div className="mb-3 flex items-center gap-2">
        <span className="h-5 w-[3px] rounded-full bg-[#6AB439]" />

        <p className="text-sm font-medium text-white">
          {label}
        </p>
      </div>

      <div className={`grid gap-2 ${columns}`}>
        {options.map((option) => {
          const isActive = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                rounded-[10px] border px-4 py-3 text-sm font-medium
                transition-all duration-300 ease-out
                active:scale-[0.97]
                ${
                  isActive
                    ? 'border-[#6AB439] bg-[#6AB439]/15 text-white shadow-[0_0_0_4px_rgba(106,180,57,0.08)]'
                    : 'border-[#373737] bg-transparent text-[#999999] hover:border-[#4A4A4A] hover:bg-white/[0.02] hover:text-white'
                }
              `}
              aria-pressed={isActive}
              name={name}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}