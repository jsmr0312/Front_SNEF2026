// src/components/ui/Button.jsx

const baseClasses = `
  group relative inline-flex items-center justify-center gap-2 overflow-hidden
  font-medium text-white
  transition-all duration-300 ease-out
  active:scale-[0.97]
  disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100
`;

const variants = {
 primary: `
  rounded-full px-6 py-3
  bg-gradient-to-r from-[#6AB439] to-[#22ADE4]
  shadow-none
  hover:-translate-y-[2px]
  hover:shadow-[0_18px_45px_rgba(34,173,228,0.28)]
  before:absolute before:inset-0
  before:bg-white/15 before:opacity-0
  before:transition-opacity before:duration-300
  hover:before:opacity-100
`,

  secondary: `
    snef-gradient-border rounded-full px-6 py-3
    hover:-translate-y-[2px]
    hover:shadow-[0_16px_40px_rgba(106,180,57,0.16)]
    before:absolute before:inset-0
    before:bg-gradient-to-r before:from-[#6AB439]/10 before:to-[#22ADE4]/10
    before:opacity-0 before:transition-opacity before:duration-300
    hover:before:opacity-100
  `,

  primaryGreen: `
    rounded-[10px] bg-[#6AB439] px-5 py-3
    shadow-[0_10px_24px_rgba(106,180,57,0.18)]
    hover:-translate-y-[2px]
    hover:bg-[#78C947]
    hover:shadow-[0_16px_36px_rgba(106,180,57,0.25)]
  `,

  primaryBlue: `
    rounded-[10px] bg-[#22ADE4] px-5 py-3
    shadow-[0_10px_24px_rgba(34,173,228,0.18)]
    hover:-translate-y-[2px]
    hover:bg-[#32BDF2]
    hover:shadow-[0_16px_36px_rgba(34,173,228,0.25)]
  `,

  ghost: `
    rounded-full px-5 py-3 text-[#22ADE4]
    hover:-translate-y-[1px]
    hover:bg-white/5
    hover:text-white
  `,
};

const sizes = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {Icon && (
          <Icon
            size={20}
            color="white"
            strokeWidth={2.2}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        )}

        {children}
      </span>
    </button>
  );
}