import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    // Don't play audio on registration page
    if (pathname === "/register") {
      audioEl.pause();
      return;
    }

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
  }, [pathname]);

  return (
    <audio
      id="hero-audio"
      ref={audioRef}
      className="hidden"
      src="/audio/hero-4.mp3"
      preload="auto"
      volume={0.9}
    />
  );
};

export default BackgroundAudio;
