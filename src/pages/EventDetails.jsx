import React, { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { getEventBySlug } from "../data/events";
import AnimatedTitle from "../components/AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const InfoCard = ({ label, value }) => (
  <div className="border-hsla rounded-2xl bg-black/30 p-5">
    <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/70">
      {label}
    </p>
    <p className="mt-2 font-zentry text-2xl leading-[0.95] text-blue-50 md:text-3xl">
      {value || "TBA"}
    </p>
  </div>
);

const EventDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const videoRef = useRef(null);

  const event = useMemo(() => getEventBySlug(slug), [slug]);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const setAudioSource = (source) => {
      try {
        document.documentElement.dataset.audioSource = source;
        document.dispatchEvent(
          new CustomEvent("audio-source-change", { detail: { source } })
        );
      } catch {
        // ignore
      }
    };

    // Default: use site music unless we confirm video has audio.
    setAudioSource("site");

    const bgAudio = document.getElementById("hero-audio");
    const bgWasPlaying = !!bgAudio && !bgAudio.paused;
    let pausedBg = false;
    let usingVideoAudio = false;
    let disposed = false;
    let pendingTimer;

    const videoHasAudio = (el) => {
      try {
        // Standard-ish: supported in some browsers.
        if (el.audioTracks && typeof el.audioTracks.length === "number") {
          return el.audioTracks.length > 0;
        }
        // Firefox.
        if (typeof el.mozHasAudio === "boolean") return el.mozHasAudio;
        // WebKit: becomes > 0 when audio is decoded.
        if (typeof el.webkitAudioDecodedByteCount === "number") {
          return el.webkitAudioDecodedByteCount > 0;
        }
      } catch {
        // ignore
      }
      return null;
    };

    const tryPlay = async (el) => {
      try {
        await el.play();
      } catch {
        // Autoplay may be blocked.
      }
    };

    const activateVideoAudio = async () => {
      if (!videoEl || disposed) return;
      videoEl.muted = false;
      videoEl.volume = 0.9;
      await tryPlay(videoEl);
    };

    const keepSiteMusic = async () => {
      if (!bgAudio || disposed) return;
      await tryPlay(bgAudio);
    };

    const switchToVideoAudio = async () => {
      usingVideoAudio = true;

      setAudioSource("video");

      if (bgAudio && !bgAudio.paused) {
        bgAudio.pause();
        pausedBg = true;
      }

      // Try immediately; if blocked, the first interaction handler will retry.
      await activateVideoAudio();
    };

    const decideAudio = async () => {
      if (!videoEl || disposed) return;

      // Ensure the video itself is playing (muted autoplay should work).
      await tryPlay(videoEl);

      const has = videoHasAudio(videoEl);
      if (has === true) {
        await switchToVideoAudio();
        return;
      }

      if (has === false) {
        // No audio track -> keep website bg music.
        setAudioSource("site");
        return;
      }

      // Unknown: wait a bit and re-check (WebKit decoded bytes often update after playback starts).
      pendingTimer = window.setTimeout(async () => {
        if (disposed) return;
        const hasLater = videoHasAudio(videoEl);
        if (hasLater === true) {
          await switchToVideoAudio();
        } else if (hasLater === false) {
          setAudioSource("site");
        }
      }, 1200);
    };

    const onFirstInteraction = () => {
      if (disposed) return;
      if (usingVideoAudio) {
        activateVideoAudio();
      } else {
        keepSiteMusic();
      }
      window.removeEventListener("pointerdown", onFirstInteraction);
    };

    // Always allow first interaction to start whichever audio is active.
    window.addEventListener("pointerdown", onFirstInteraction, { passive: true });

    // Decide once the media is ready.
    if (videoEl.readyState >= 2) {
      decideAudio();
    } else {
      videoEl.addEventListener("loadeddata", decideAudio, { once: true });
    }

    return () => {
      disposed = true;
      window.removeEventListener("pointerdown", onFirstInteraction);
      if (pendingTimer) window.clearTimeout(pendingTimer);

      // Reset source on leaving this page.
      setAudioSource("site");

      // Restore bg music if we paused it for this page.
      if (pausedBg && bgAudio && bgWasPlaying) {
        tryPlay(bgAudio);
      }

      // Leave video muted on teardown to preserve autoplay behavior on next load.
      if (videoEl) videoEl.muted = true;
    };
  }, [slug, event?.videoSrc]);

  useGSAP(
    () => {
      if (!pageRef.current) return;

      const cards = pageRef.current.querySelectorAll("[data-animate='card']");
      if (!cards.length) return;

      gsap.from(cards, {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: pageRef }
  );

  const onRegister = () => {
    if (!event?.details?.registerTo) {
      navigate("/#contact");
      return;
    }

    const target = event.details.registerTo;
    if (/^https?:\/\//i.test(target)) {
      window.open(target, "_blank", "noopener,noreferrer");
      return;
    }

    navigate(target);
  };

  if (!event) {
    return (
      <section className="min-h-dvh w-screen bg-black text-blue-50">
        <div className="mx-auto max-w-5xl px-6 py-28">
          <p className="font-general text-[10px] uppercase tracking-widest text-blue-300">
            Event
          </p>
          <h1 className="special-font mt-5 font-zentry text-5xl leading-[0.9] md:text-[6rem]">
            Not fo<b>u</b>nd
          </h1>
          <p className="mt-6 max-w-xl font-circular-web text-blue-50/70">
            The event page you’re looking for doesn’t exist (or the link is
            outdated).
          </p>
          <div className="mt-10">
            <button
              className="nav-hover-btn ms-0"
              onClick={() => navigate("/#tracks")}
              type="button"
            >
              Back to Events
            </button>
          </div>
          <p className="mt-8 text-xs text-blue-50/40">{location.pathname}</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={pageRef} className="min-h-dvh w-screen bg-black text-blue-50">
      <div className="relative">
        <div className="absolute inset-0">
          <video
            id="event-hero-video"
            ref={videoRef}
            src={event.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="h-[46vh] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-28">
          <p className="font-general text-[10px] uppercase tracking-widest text-blue-300">
            {event.track} Event
          </p>

          <AnimatedTitle
            title={event.name
              .split(" ")
              .map((w) => w)
              .join(" ")}
            align="start"
            containerClass="mt-6 pointer-events-none relative z-10 !text-blue-50 !px-0 sm:!px-0 !text-5xl md:!text-6xl"
          />

          <p className="mt-6 max-w-2xl font-circular-web text-blue-50/75">
            {event.short}
          </p>

          <div className="mt-10">
            <Button
              id="event-register"
              title="Register"
              containerClass="bg-blue-300"
              onClick={onRegister}
            />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div data-animate="card">
              <InfoCard label="Prize" value={event.details?.prize} />
            </div>
            <div data-animate="card">
              <InfoCard
                label="Timings"
                value={
                  Array.isArray(event.details?.timings)
                    ? event.details.timings[0]
                    : event.details?.timings
                }
              />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 pb-24 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-blue-50">
                Overview
              </p>
              <p className="mt-3 font-circular-web text-blue-50/70">
                {event.details?.overview}
              </p>

              <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                Format
              </p>
              <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                {(event.details?.format || []).map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-blue-300">▸</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                Timings
              </p>
              {Array.isArray(event.details?.timings) && event.details.timings.length ? (
                <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                  {event.details.timings.map((line) => (
                    <li key={line} className="flex gap-3">
                      <span className="text-blue-300">▸</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 font-circular-web text-blue-50/70">
                  {event.details?.timings || "TBA"}
                </p>
              )}
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-blue-50">
                Rules
              </p>
              <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                {(event.details?.rules || []).map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-blue-300">▸</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                Judging
              </p>
              <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                {(event.details?.judging || []).map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-blue-300">▸</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                Registration
              </p>
              <p className="mt-3 font-circular-web text-blue-50/70">
                {event.details?.registration}
              </p>

              <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                Contacts
              </p>
              {Array.isArray(event.details?.contacts) && event.details.contacts.length ? (
                <div className="mt-3 grid gap-3">
                  {event.details.contacts.map((c) => (
                    <div
                      key={`${c.name}-${c.phone || c.email || "contact"}`}
                      className="border-hsla rounded-2xl bg-black/25 p-4"
                    >
                      <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/70">
                        {c.role || "Coordinator"}
                      </p>
                      <p className="mt-2 font-zentry text-xl leading-[0.95] text-blue-50">
                        {c.name}
                      </p>
                      <div className="mt-2 font-circular-web text-sm text-blue-50/70">
                        {c.phone ? <p>Phone: {c.phone}</p> : null}
                        {c.email ? <p>Email: {c.email}</p> : null}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 font-circular-web text-blue-50/70">
                  Contacts will be announced soon.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
