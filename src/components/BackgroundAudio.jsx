import { useEffect, useRef, useState } from "react";

const BackgroundAudio = () => {
  const audioRef = useRef(null);
  const [isPlayAttempted, setIsPlayAttempted] = useState(false);

  useEffect(() => {
    const audioEl = audioRef.current;
    if (!audioEl) return;

    const tryPlay = async () => {
      try {
        // Ensure audio is loaded before playing
        if (audioEl.readyState < 2) {
          // readyState < 2 means not enough data
          audioEl.load();
        }
        await audioEl.play();
        setIsPlayAttempted(true);
      } catch (error) {
        // Autoplay blocked - will play on first user interaction
        console.log("Autoplay blocked, waiting for user interaction");
      }
    };

    const onFirstInteraction = async () => {
      if (!isPlayAttempted) {
        await tryPlay();
        window.removeEventListener("pointerdown", onFirstInteraction);
        window.removeEventListener("click", onFirstInteraction);
      }
    };

    // Small delay to ensure audio element is ready
    const playTimer = setTimeout(() => {
      tryPlay();
    }, 500);

    // Fallback: play on first user interaction
    window.addEventListener("pointerdown", onFirstInteraction, {
      passive: true,
    });
    window.addEventListener("click", onFirstInteraction, { passive: true });

    return () => {
      clearTimeout(playTimer);
      window.removeEventListener("pointerdown", onFirstInteraction);
      window.removeEventListener("click", onFirstInteraction);
    };
  }, [isPlayAttempted]);

  return (
    <audio
      id="hero-audio"
      ref={audioRef}
      className="hidden"
      src="/audio/hero-4.mp3"
      preload="auto"
      volume="0.9"
      autoPlay={false}
    />
  );
};

export default BackgroundAudio;
