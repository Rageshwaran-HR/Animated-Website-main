import React, { useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import EventDetails from "./pages/EventDetails";
import BackgroundAudio from "./components/BackgroundAudio";
import RegistrationForm from "./components/RegistrationForm";

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  React.useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      return;
    }

    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // Fallback for elements rendered after route change.
    const t = setTimeout(() => {
      const late = document.getElementById(id);
      if (late) late.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => clearTimeout(t);
  }, [hash, pathname]);

  return null;
};

const Home = () => {
  const homeRef = useRef(null);
  const [isHomeLoading, setIsHomeLoading] = useState(true);

  useEffect(() => {
    const root = homeRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const tracked = new Set();
    const loaded = new Set();

    const markLoaded = (videoEl) => {
      if (!videoEl || loaded.has(videoEl)) return;
      loaded.add(videoEl);
      if (tracked.size === 0 || loaded.size >= tracked.size) {
        setIsHomeLoading(false);
      }
    };

    const trackVideo = (videoEl) => {
      if (!videoEl || tracked.has(videoEl)) return;
      tracked.add(videoEl);

      // If already has enough data to render a frame, consider it "loaded".
      if (videoEl.readyState >= 2) {
        markLoaded(videoEl);
        return;
      }

      const onLoaded = () => markLoaded(videoEl);
      const onError = () => markLoaded(videoEl);

      videoEl.addEventListener("loadeddata", onLoaded, { once: true });
      videoEl.addEventListener("error", onError, { once: true });
    };

    const scan = (node) => {
      const base = node && node.nodeType === 1 ? node : root;
      const videos = base.querySelectorAll
        ? base.querySelectorAll("video")
        : [];
      videos.forEach(trackVideo);

      // If there are no videos at all, don't block rendering.
      if (tracked.size === 0) {
        setIsHomeLoading(false);
      }
    };

    // Start loading immediately.
    setIsHomeLoading(true);
    scan(root);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes?.forEach((n) => scan(n));
      }
    });

    observer.observe(root, { childList: true, subtree: true });

    // Safety: if reduced-motion is enabled, we still wait for videos but keep loader simple.
    // (No-op here; variable kept for clarity / future tweaks.)
    void prefersReduced;

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={homeRef} className="relative">
      {isHomeLoading && (
        <div className="flex-center fixed inset-0 z-[200] h-dvh w-screen overflow-y-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <BackgroundAudio />
      <Navbar />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events/:slug" element={<EventDetails />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
    </main>
  );
};

export default App;
