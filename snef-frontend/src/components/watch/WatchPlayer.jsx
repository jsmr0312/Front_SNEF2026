import { useEffect, useRef, useState } from 'react';

import WatchControls from './WatchControls';

const CLOUDINARY_CORE_SCRIPT =
  'https://unpkg.com/cloudinary-core/cloudinary-core-shrinkwrap.min.js';
const CLOUDINARY_PLAYER_SCRIPT =
  'https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js';
const CLOUDINARY_PLAYER_STYLES =
  'https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.css';
const SIMULATED_DURATION_SECONDS = 45;

let cloudinarySdkPromise;

function loadScript(src) {
  const existingScript = document.querySelector(`script[src="${src}"]`);

  if (existingScript) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function loadStylesheet(href) {
  const existingLink = document.querySelector(`link[href="${href}"]`);

  if (existingLink) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

function loadCloudinarySdk() {
  if (!cloudinarySdkPromise) {
    cloudinarySdkPromise = Promise.resolve()
      .then(() => loadStylesheet(CLOUDINARY_PLAYER_STYLES))
      .then(() => loadScript(CLOUDINARY_CORE_SCRIPT))
      .then(() => loadScript(CLOUDINARY_PLAYER_SCRIPT))
      .then(() => window.cloudinary);
  }

  return cloudinarySdkPromise;
}

export default function WatchPlayer({ movie, video, onEnded }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const lastAllowedTimeRef = useRef(0);
  const simulatedIntervalRef = useRef(null);
  const [playerId] = useState(`cloudinary-watch-player-${movie.id}`);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSdkReady, setIsSdkReady] = useState(false);
  const [hasSdkFailed, setHasSdkFailed] = useState(false);
  const isFallbackMode = video.provider !== 'cloudinary' || hasSdkFailed;

  useEffect(() => {
    let isMounted = true;

    if (video.provider !== 'cloudinary') {
      return undefined;
    }

    loadCloudinarySdk()
      .then((cloudinary) => {
        if (!isMounted || !videoRef.current || !cloudinary?.Cloudinary) {
          return;
        }

        const cld = cloudinary.Cloudinary.new({
          cloud_name: video.cloudName,
          secure: true,
        });
        const player = cld.videoPlayer(playerId, {
          autoplay: false,
          controls: false,
          fluid: true,
          muted: false,
          playsinline: true,
        });

        playerRef.current = player;
        player.source(video.publicId);

        const updateProgress = () => {
          const duration = player.duration?.() || 0;
          const currentTime = player.currentTime?.() || 0;

          if (duration > 0) {
            setProgress(currentTime / duration);
          }

          lastAllowedTimeRef.current = currentTime;
        };

        const preventSeeking = () => {
          const currentTime = player.currentTime?.() || 0;

          if (currentTime > lastAllowedTimeRef.current + 1.25) {
            player.currentTime(lastAllowedTimeRef.current);
          }
        };

        player.on('play', () => setIsPlaying(true));
        player.on('pause', () => setIsPlaying(false));
        player.on('timeupdate', updateProgress);
        player.on('seeking', preventSeeking);
        player.on('ended', onEnded);

        setIsSdkReady(true);
      })
      .catch(() => {
        if (isMounted) {
          setHasSdkFailed(true);
        }
      });

    return () => {
      isMounted = false;
      playerRef.current?.dispose?.();
      playerRef.current = null;
    };
  }, [onEnded, playerId, video]);

  useEffect(() => {
    if (!isFallbackMode || !isPlaying) {
      return undefined;
    }

    simulatedIntervalRef.current = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress =
          currentProgress + 1 / (SIMULATED_DURATION_SECONDS * 4);

        if (nextProgress >= 1) {
          window.clearInterval(simulatedIntervalRef.current);
          onEnded();
          return 1;
        }

        return nextProgress;
      });
    }, 250);

    return () => {
      window.clearInterval(simulatedIntervalRef.current);
    };
  }, [isFallbackMode, isPlaying, onEnded]);

  const togglePlayback = () => {
    if (isFallbackMode) {
      setIsPlaying((currentValue) => !currentValue);
      return;
    }

    if (!playerRef.current) {
      return;
    }

    if (isPlaying) {
      playerRef.current.pause();
    } else {
      playerRef.current.play();
    }
  };

  return (
    <section className="watch-player" aria-label={`Reproductor de ${movie.title}`}>
      <div className="watch-player__stage">
        <video
          id={playerId}
          ref={videoRef}
          className="watch-player__video cld-video-player"
          controls={false}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          playsInline
          tabIndex={-1}
        />

        {isFallbackMode && (
          <div className="watch-player__fallback">
            <iframe
              src={video.embedUrl}
              title={`Video de ${movie.title}`}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />

            <p>
              TODO: conectar el evento real ended de Cloudinary cuando el SDK
              este disponible en el entorno.
            </p>
          </div>
        )}

        {!isSdkReady && !isFallbackMode && (
          <p className="watch-player__loading">Preparando video...</p>
        )}
      </div>

      <WatchControls
        isPlaying={isPlaying}
        progress={progress}
        onTogglePlay={togglePlayback}
        disabled={!isSdkReady && !isFallbackMode}
      />
    </section>
  );
}
