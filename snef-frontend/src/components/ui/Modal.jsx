// src/components/ui/Modal.jsx

export default function Modal({
  isOpen,
  title,
  children,
  actions,
  onClose,
  className = '',
}) {
  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[100] flex items-center justify-center
        bg-black/45 px-4 backdrop-blur-[6px]
        animate-[fadeIn_220ms_ease-out]
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div
        className={`
          w-full max-w-[620px] rounded-[10px]
          border border-[#373737] bg-[#0F0F0F]
          p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]
          animate-[modalIn_240ms_ease-out]
          md:p-8
          ${className}
        `}
        onClick={(event) => event.stopPropagation()}
      >
        {title && (
          <h2
            id="modal-title"
            className="mb-6 text-center text-xl font-semibold text-white"
          >
            {title}
          </h2>
        )}

        <div>{children}</div>

        {actions && (
          <div className="mt-7 flex justify-center">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}