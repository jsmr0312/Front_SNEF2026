import { useRef, useState } from 'react';

import CinemaHeroCard from './CinemaHeroCard';
import SliderControls from './SliderControls';

const SIDE_CARD_OFFSET_PERCENT = 92;
const SIDE_CARD_SCALE = 0.78;
const SIDE_CARD_OPACITY = 0.55;
const FAR_CARD_OPACITY = 0;
const CARD_TRANSITION = [
  'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)',
  'opacity 450ms ease',
  'filter 450ms ease',
].join(', ');

export default function CinemaHeroSlider({ sponsors = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartXRef = useRef(null);
  const lastIndex = Math.max(sponsors.length - 1, 0);
  const safeActiveIndex = Math.min(activeIndex, lastIndex);

  if (!sponsors.length) {
    return null;
  }

  const goToPrevious = () => {
    setActiveIndex((currentIndex) => Math.max(currentIndex - 1, 0));
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => Math.min(currentIndex + 1, lastIndex));
  };

  const selectSponsor = (sponsorIndex) => {
    setActiveIndex(Math.min(Math.max(sponsorIndex, 0), lastIndex));
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.changedTouches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    const touchStartX = touchStartXRef.current;
    touchStartXRef.current = null;

    if (touchStartX == null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) < 44) {
      return;
    }

    if (swipeDistance < 0) {
      goToNext();
    } else {
      goToPrevious();
    }
  };

  return (
    <div className="cinema-hero-slider relative">
      <div
        className="
          cinema-hero-slider__viewport
          relative left-1/2 w-screen max-w-[1800px] -translate-x-1/2
          overflow-hidden px-4 md:px-8
        "
        aria-live="polite"
      >
        <div
          className="
            cinema-hero-slider__stage
            relative mx-auto aspect-[540/630] w-full max-w-[540px]
            md:aspect-[2400/870] md:max-w-[1540px]
          "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartXRef.current = null;
          }}
        >
          {sponsors.map((sponsor, index) => {
            const position = index - safeActiveIndex;
            const distance = Math.abs(position);
            const isActive = position === 0;
            const isVisible = distance <= 1;
            const scale = isActive ? 1 : SIDE_CARD_SCALE;
            const opacity = !isVisible
              ? FAR_CARD_OPACITY
              : isActive
                ? 1
                : SIDE_CARD_OPACITY;

            return (
              <CinemaHeroCard
                key={sponsor.id}
                sponsor={sponsor}
                isActive={isActive}
                onSelect={() => selectSponsor(index)}
                style={{
                  filter: isActive ? 'none' : 'brightness(0.65)',
                  opacity,
                  pointerEvents: isVisible ? 'auto' : 'none',
                  transform: `translateX(calc(-50% + ${position * SIDE_CARD_OFFSET_PERCENT}%)) scale(${scale})`,
                  transition: CARD_TRANSITION,
                  visibility: isVisible ? 'visible' : 'hidden',
                  zIndex: 20 - distance,
                }}
              />
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="
            cinema-hero-slider__edge
            pointer-events-none absolute inset-y-0 right-0 z-40 w-24
            bg-gradient-to-r from-transparent via-[#141414]/70 to-[#141414]
            md:w-48 lg:w-64
          "
        />

        <div
          aria-hidden="true"
          className="
            cinema-hero-slider__edge
            pointer-events-none absolute inset-y-0 left-0 z-40 hidden w-24
            bg-gradient-to-l from-transparent to-[#141414]
            opacity-45 md:block lg:w-36
          "
        />
      </div>

      <SliderControls
        activeIndex={safeActiveIndex}
        total={sponsors.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSelect={selectSponsor}
        itemLabel="sponsor"
      />
    </div>
  );
}
