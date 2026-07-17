import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function SliderControls({
  activeIndex,
  total,
  onPrevious,
  onNext,
  onSelect,
  itemLabel = 'pel\u00edcula',
  className = '',
}) {
  if (total <= 1) {
    return null;
  }

  const isFirstSlide = activeIndex === 0;
  const isLastSlide = activeIndex === total - 1;
  const dots = Array.from({ length: total }, (_, index) => index);

  return (
    <div className={`slider-controls mt-7 grid grid-cols-[48px_1fr_48px] items-center gap-4 px-1 md:mt-9 md:grid-cols-[1fr_auto_1fr] md:px-6 ${className}`}>
      <SliderArrowButton
        label={`Ver ${itemLabel} anterior`}
        isDisabled={isFirstSlide}
        onClick={onPrevious}
      >
        <ArrowLeft aria-hidden="true" size={28} strokeWidth={2} />
      </SliderArrowButton>

      <div
        className="flex items-center justify-center gap-1.5 justify-self-center"
        aria-label="Estado del slider"
      >
        {dots.map((dotIndex) => {
          const isActive = dotIndex === activeIndex;

          return (
            <button
              key={dotIndex}
              type="button"
              className={`
                h-3 rounded-full transition-all duration-500 ease-out
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
                focus-visible:outline-[#22ADE4]
                ${
                  isActive
                    ? 'w-8 bg-[#8DCD21] opacity-100'
                    : 'w-3 bg-[#343434] opacity-80 hover:bg-[#555555]'
                }
              `}
              aria-label={`Ver ${itemLabel} ${dotIndex + 1}`}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => onSelect(dotIndex)}
            />
          );
        })}
      </div>

      <SliderArrowButton
        label={`Ver ${itemLabel} siguiente`}
        isDisabled={isLastSlide}
        onClick={onNext}
        className="justify-self-end"
      >
        <ArrowRight aria-hidden="true" size={28} strokeWidth={2} />
      </SliderArrowButton>
    </div>
  );
}

function SliderArrowButton({
  children,
  label,
  isDisabled = false,
  onClick,
  className = '',
}) {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`
        inline-flex h-12 w-12 items-center justify-center rounded-full
        border border-white/5 bg-[#1A1A1A] text-white
        shadow-[0_14px_34px_rgba(0,0,0,0.26)]
        transition-all duration-300 ease-out
        hover:-translate-y-0.5 hover:bg-[#222222] hover:text-[#8DCD21]
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4
        focus-visible:outline-[#22ADE4]
        active:scale-95
        md:h-14 md:w-14
        ${
          isDisabled
            ? 'pointer-events-none opacity-0'
            : 'opacity-100'
        }
        ${className}
      `}
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
