import MiniSliderControls from './MiniSliderControls';

export default function SponsorShelfHeader({
  titleId,
  title,
  activeIndex,
  total,
  onPrevious,
  onNext,
  onSelect,
}) {
  return (
    <header className="mb-7 flex items-center justify-between gap-5 md:mb-10">
      <h2
        id={titleId}
        className="text-2xl font-semibold leading-tight text-white md:text-3xl"
      >
        {title}
      </h2>

      <MiniSliderControls
        activeIndex={activeIndex}
        total={total}
        onPrevious={onPrevious}
        onNext={onNext}
        onSelect={onSelect}
        className="shrink-0"
      />
    </header>
  );
}
