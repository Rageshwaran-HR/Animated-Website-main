import { useEffect, useRef } from "react";

const BackgroundAudio = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const tryPlay = async () => {
      try {
        await audioEl.play();
      } catch {
        // Autoplay may be blocked until a user gesture.
      }
    };

    const onFirstInteraction = () => {
      tryPlay();
      window.removeEventListener("pointerdown", onFirstInteraction);
    };

    // Attempt immediate play; if blocked, play on first click/tap.
    tryPlay();
    window.addEventListener("pointerdown", onFirstInteraction, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction);
    };
  }, []);

  return (
    <audio
      id="hero-audio"
      ref={audioRef}
      className="hidden"
      src="/audio/hero-4.mp3"
      preload="none"
      volume={0.9}
    />
  );
};

export default BackgroundAudio;
