import React, { Suspense, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundAudio from "./components/BackgroundAudio";

// Lazy load heavy components
const Hero = React.lazy(() => import("./components/Hero"));
const About = React.lazy(() => import("./components/About"));
const Features = React.lazy(() => import("./components/Features"));
const Story = React.lazy(() => import("./components/Story"));
const Contact = React.lazy(() => import("./components/Contact"));
const Footer = React.lazy(() => import("./components/Footer"));
const EventDetails = React.lazy(() => import("./pages/EventDetails"));

const ScrollToHash = () => {
  const { hash, pathname, state } = useLocation();

  React.useEffect(() => {
    // Check sessionStorage for scroll target (from EventDetails back button)
    const scrollTarget = sessionStorage.getItem('scrollToSection');
    if (scrollTarget && pathname === '/') {
      sessionStorage.removeItem('scrollToSection');
      
      // Retry logic to wait for lazy-loaded components
      let attempts = 0;
      const maxAttempts = 20;
      
      const tryScroll = () => {
        const el = document.getElementById(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 200);
        }
      };
      
      setTimeout(tryScroll, 300);
      return;
    }

    // Handle state-based scrolling (from EventDetails back button)
    if (state?.scrollTo) {
      const timeoutId = setTimeout(() => {
        const el = document.getElementById(state.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }

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
  }, [hash, pathname, state]);

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

      <Suspense fallback={null}>
        <Hero />
        <About />
        <Features />
        <Story />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  );
};

const App = () => {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <BackgroundAudio />
      <Navbar />
      <ScrollToHash />
      <Suspense fallback={<div className="h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:slug" element={<EventDetails />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
