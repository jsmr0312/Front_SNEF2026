// src/components/ui/FormInput.jsx

export default function FormInput({
  label,
  id,
  error,
  className = '',
  ...props
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

        <label
          htmlFor={id}
          className="
            text-sm font-medium text-white
            transition-colors duration-300 ease-out
            group-focus-within:text-white
          "
        >
          {label}
        </label>
      </div>

      <input
        id={id}
        className="
          w-full rounded-[10px] border border-[#373737]
          bg-transparent px-4 py-3 text-white outline-none
          transition-all duration-300 ease-out
          placeholder:text-[#999999]
          hover:border-[#4A4A4A]
          focus:border-[#6AB439]
          focus:bg-white/[0.02]
          focus:shadow-[0_0_0_4px_rgba(106,180,57,0.08)]
        "
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}