import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";

const navItems = ["About", "Events", "Contact"];

const navToId = (label) => {
  const v = label.toLocaleLowerCase();
  if (v === "events" || v === "tracks") return "tracks";
  return v;
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  useEffect(() => {
    const getBgAudio = () => document.getElementById("hero-audio");
    const getEventVideo = () => document.getElementById("event-hero-video");
    const getSource = () => document.documentElement?.dataset?.audioSource;

    const isPlaying = (el) => {
      if (!el) return false;
      // Video counts as "playing audio" only when it’s unmuted.
      if (el.tagName === "VIDEO") {
        return !el.paused && !el.muted && (el.volume ?? 1) > 0;
      }
      return !el.paused;
    };

    let boundEl = null;
    let cleanup = null;

    const bindTo = (el) => {
      if (cleanup) cleanup();
      cleanup = null;
      boundEl = el;

      if (!el) return;

      const sync = () => {
        const playing = isPlaying(el);
        setIsIndicatorActive(playing);
      };

      sync();
      el.addEventListener("play", sync);
      el.addEventListener("pause", sync);
      el.addEventListener("volumechange", sync);

      cleanup = () => {
        el.removeEventListener("play", sync);
        el.removeEventListener("pause", sync);
        el.removeEventListener("volumechange", sync);
      };
    };

    const syncActive = () => {
      const source = getSource();
      const next = source === "video" ? getEventVideo() : getBgAudio();
      if (next !== boundEl) bindTo(next);
      const playing = isPlaying(next);
      setIsIndicatorActive(playing);
    };

    const onSourceChange = () => {
      // Allow DOM to settle after route transitions.
      setTimeout(syncActive, 0);
    };

    document.addEventListener("audio-source-change", onSourceChange);
    syncActive();

    return () => {
      document.removeEventListener("audio-source-change", onSourceChange);
      if (cleanup) cleanup();
    };
  }, []);

  const toggleAudioIndicator = async () => {
    const bgAudio = document.getElementById("hero-audio");
    const eventVideo = document.getElementById("event-hero-video");
    const source = document.documentElement?.dataset?.audioSource;

    const videoAudioOn =
      !!eventVideo &&
      !eventVideo.paused &&
      !eventVideo.muted &&
      (eventVideo.volume ?? 1) > 0;
    const siteAudioOn = !!bgAudio && !bgAudio.paused;

    try {
      // If EventDetails is using video audio, toggle mute/unmute WITHOUT pausing the video.
      if (source === "video" && eventVideo) {
        bgAudio?.pause();

        if (videoAudioOn) {
          eventVideo.muted = true;
          // Keep video playing for visuals.
          if (eventVideo.paused) await eventVideo.play();
          return;
        }

        // Turn on video audio.
        eventVideo.muted = false;
        eventVideo.volume = 0.9;
        await eventVideo.play();
        return;
      }

      // Default: site bg music toggle.
      if (siteAudioOn) {
        bgAudio?.pause();
        return;
      }

      // If a video exists (EventDetails page with no video audio), keep it muted but playing.
      if (eventVideo) {
        eventVideo.muted = true;
        if (eventVideo.paused) {
          try {
            await eventVideo.play();
          } catch {
            // ignore
          }
        }
      }

      await bgAudio?.play();
    } catch {
      // Ignore play() failures (autoplay restrictions, etc.)
    }
  };

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <div
      ref={navContainerRef}
      className="floating-nav fixed inset-x-0 top-16 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          <div className="flex items-center gap-7">
            <button
              type="button"
              onClick={goHome}
              className="cursor-pointer"
              aria-label="Go to home"
            >
              <img src="/img/logo.png" alt="logo" className="w-20" />
            </button>

            <span className="border-hsla rounded-full px-3 py-1 font-general text-[15px] uppercase tracking-widest text-blue-300">
              VEC
            </span>

            <Button
              id="product-button"
              title="symposium"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-300 md:flex hidden items-center justify-center gap-1"
              onClick={goHome}
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <Link
                  className="nav-hover-btn"
                  key={index}
                  to={`/#${navToId(item)}`}
                >
                  {item}
                </Link>
              ))}
              <Link className="nav-hover-btn" to="/transport">
                Transport
              </Link>
              <Link className="nav-hover-btn" to="/developers">
                Developers
              </Link>
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
              aria-label="Toggle music"
            >
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={`indicator-line ${isIndicatorActive ? "active" : ""}`}
                  style={{ animationDelay: `${bar * 0.1}s` }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
