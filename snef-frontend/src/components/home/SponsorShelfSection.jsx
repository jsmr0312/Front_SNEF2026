import { useMemo, useState } from 'react';

import { getSponsorShelfById } from '../../data/sponsors/sponsorShelves';
import SponsorShelfHeader from './SponsorShelfHeader';
import SponsorShelfViewport from './SponsorShelfViewport';

export default function SponsorShelfSection({
  shelf = getSponsorShelfById('oro'),
}) {
  const [activeColumn, setActiveColumn] = useState(0);

  const shelfColumns = useMemo(
    () => createShelfColumns(shelf),
    [shelf],
  );

  if (!shelf || shelfColumns.length === 0) {
    return null;
  }

  const lastColumnIndex = shelfColumns.length - 1;
  const safeActiveColumn = Math.min(activeColumn, lastColumnIndex);

  const goToPrevious = () => {
    setActiveColumn((currentColumn) => Math.max(currentColumn - 1, 0));
  };

  const goToNext = () => {
    setActiveColumn((currentColumn) =>
      Math.min(currentColumn + 1, lastColumnIndex),
    );
  };

  const selectColumn = (columnIndex) => {
    setActiveColumn(Math.min(Math.max(columnIndex, 0), lastColumnIndex));
  };

  return (
    <section
      className="
        snef-layout-container py-8 md:py-12
      "
      aria-labelledby={`${shelf.id}-sponsor-shelf-title`}
    >
      <SponsorShelfHeader
        titleId={`${shelf.id}-sponsor-shelf-title`}
        title={shelf.title}
        activeIndex={safeActiveColumn}
        total={shelfColumns.length}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSelect={selectColumn}
      />

      <SponsorShelfViewport
        shelf={shelf}
        shelfColumns={shelfColumns}
        activeColumn={safeActiveColumn}
      />
    </section>
  );
}

function createShelfColumns(shelf) {
  if (!shelf) {
    return [];
  }

  if (shelf.layout === 'row-fill') {
    return createRowFillColumns({
      sponsors: shelf.sponsors ?? [],
      rowCount: shelf.rowCount ?? 2,
    });
  }

  return (shelf.sponsors ?? []).map((sponsor) => ({
    id: sponsor.id,
    entries: sponsor.movies
      .slice(0, shelf.moviesPerSponsor)
      .map((movie) => ({
        sponsor,
        movie,
      })),
  }));
}

function createRowFillColumns({ sponsors, rowCount }) {
  const normalizedRowCount = Math.max(rowCount, 1);
  const columnsCount = Math.ceil(sponsors.length / normalizedRowCount);
  const shelfColumns = [];

  for (let columnIndex = 0; columnIndex < columnsCount; columnIndex += 1) {
    const entries = [];

    for (let rowIndex = 0; rowIndex < normalizedRowCount; rowIndex += 1) {
      const sponsor = sponsors[columnIndex + rowIndex * columnsCount];
      const movie = sponsor?.movies?.[0];

      if (sponsor && movie) {
        entries.push({
          sponsor,
          movie,
        });
      }
    }

    shelfColumns.push({
      id: `column-${columnIndex}`,
      entries,
    });
  }

  return shelfColumns;
}
