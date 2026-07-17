import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import SponsorMovieCard from './SponsorMovieCard';

export default function SponsorShelfViewport({
  shelf,
  shelfColumns,
  activeColumn,
}) {
  const viewportRef = useRef(null);
  const columnRefs = useRef([]);
  const [trackOffset, setTrackOffset] = useState(0);

  const updateTrackOffset = useCallback(() => {
    const activeColumnElement = columnRefs.current[activeColumn];

    if (!activeColumnElement) {
      setTrackOffset(0);
      return;
    }

    setTrackOffset(activeColumnElement.offsetLeft);
  }, [activeColumn]);

  useLayoutEffect(() => {
    updateTrackOffset();
  }, [updateTrackOffset, shelfColumns.length]);

  useEffect(() => {
    window.addEventListener('resize', updateTrackOffset);

    return () => {
      window.removeEventListener('resize', updateTrackOffset);
    };
  }, [updateTrackOffset]);

  return (
    <div
      ref={viewportRef}
      className="sponsor-shelf-viewport relative overflow-hidden"
      aria-live="polite"
    >
      <div
        className="
          sponsor-shelf-track
          grid auto-cols-max grid-flow-col gap-7 transition-transform
          duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:gap-9
        "
        style={{ transform: `translate3d(-${trackOffset}px, 0, 0)` }}
      >
        {shelfColumns.map((column, columnIndex) => (
          <div
            key={column.id}
            ref={(element) => {
              columnRefs.current[columnIndex] = element;
            }}
            className="sponsor-shelf-column grid gap-7 md:gap-9"
            style={{
              gridTemplateRows: `repeat(${shelf.rowCount ?? column.entries.length}, max-content)`,
            }}
            aria-label={`Columna de pel\u00edculas ${columnIndex + 1}`}
          >
            {column.entries.map(({ sponsor, movie }) => (
              <SponsorMovieCard
                key={movie.id}
                sponsor={sponsor}
                movie={movie}
                aspectRatio={shelf.aspectRatio}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
