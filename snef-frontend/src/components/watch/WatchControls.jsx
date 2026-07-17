import { Pause, Play } from 'lucide-react';

export default function WatchControls({
  isPlaying,
  progress,
  onTogglePlay,
  disabled = false,
}) {
  const Icon = isPlaying ? Pause : Play;
  const progressPercent = Math.max(0, Math.min(progress, 1)) * 100;

  return (
    <div className="watch-controls">
      <button
        type="button"
        className="watch-controls__button"
        onClick={onTogglePlay}
        disabled={disabled}
        aria-label={isPlaying ? 'Pausar pelicula' : 'Reproducir pelicula'}
      >
        <Icon size={34} fill="currentColor" strokeWidth={0} />
      </button>

      <div
        className="watch-controls__track"
        aria-label={`Progreso ${Math.round(progressPercent)}%`}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progressPercent)}
      >
        <div
          className="watch-controls__progress"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
