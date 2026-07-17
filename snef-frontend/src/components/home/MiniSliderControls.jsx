import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function MiniSliderControls({
  activeIndex,
  total,
  onPrevious,
  onNext,
  onSelect,
  className = '',
}) {
  if (total <= 1) {
    return null;
  }

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === total - 1;
  const dots = Array.from({ length: total }, (_, index) => index);

  return (
    <div
      className={`snef-mini-slider-control ${className}`}
      aria-label="Controles del carrusel"
    >
      <MiniSliderButton
        label="Ver columna anterior"
        isDisabled={isFirstSlide}
        onClick={onPrevious}
      >
        <ArrowLeft aria-hidden="true" size={18} strokeWidth={2.25} />
      </MiniSliderButton>

      <div
        className="flex items-center justify-center gap-1.5"
        aria-label="Estado del carrusel"
      >
        {dots.map((dotIndex) => {
          const isActive = dotIndex === activeIndex;

          return (
            <button
              key={dotIndex}
              type="button"
              className={`
                h-2 rounded-full transition-all duration-300 ease-out
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-4 focus-visible:outline-[#22ADE4]
                ${
                  isActive
                    ? 'w-5 bg-[#8DCD21]'
                    : 'w-2 bg-[#3E3E3E] hover:bg-[#666666]'
                }
              `}
              aria-label={`Ver columna ${dotIndex + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelect(dotIndex)}
            />
          );
        })}
      </div>

      <MiniSliderButton
        label="Ver columna siguiente"
        isDisabled={isLastSlide}
        onClick={onNext}
      >
        <ArrowRight aria-hidden="true" size={18} strokeWidth={2.25} />
      </MiniSliderButton>
    </div>
  );
}

function MiniSliderButton({
  children,
  label,
  isDisabled = false,
  onClick,
}) {
  return (
    <button
      type="button"
      title={label}
      disabled={isDisabled}
      className={`
        inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full
        bg-[#1A1A1A] text-white transition-all duration-300 ease-out
        hover:bg-[#242424] hover:text-[#8DCD21]
        focus-visible:outline focus-visible:outline-2
        focus-visible:outline-offset-4 focus-visible:outline-[#22ADE4]
        active:scale-95
        ${isDisabled ? 'pointer-events-none opacity-40' : 'opacity-100'}
      `}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
