import { useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { getEventBySlug } from "../data/events";
import AnimatedTitle from "../components/AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const MetaItem = ({ label, value }) => (
  <div className="min-w-0">
    <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/60">
      {label}
    </p>
    <p className="mt-1 truncate font-zentry text-xl leading-[0.95] text-blue-50 md:text-2xl">
      {value || "TBA"}
    </p>
  </div>
);

const isMeaningfulValue = (value) => {
  if (value == null) return false;
  if (Array.isArray(value)) return value.some(isMeaningfulValue);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return false;
    return !/^(tba|tbd)$/i.test(trimmed);
  }
  return true;
};

const getPrimaryTimeValue = (details) => {
  if (isMeaningfulValue(details?.time)) return details.time;
  if (Array.isArray(details?.timings)) {
    const first = details.timings.find(isMeaningfulValue);
    return first;
  }
  if (isMeaningfulValue(details?.timings)) return details.timings;
  return undefined;
};

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
    window.addEventListener("pointerdown", onFirstInteraction, {
      passive: true,
    });

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
        delay: 0.25,
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

  const metaItems = [
    { label: "Date", value: event.details?.date },
    { label: "Time", value: getPrimaryTimeValue(event.details) },
    { label: "Team Size", value: event.details?.teamSize },
  ].filter((item) => isMeaningfulValue(item.value));

  const timings = event.details?.timings;
  const showTimingsSection =
    (Array.isArray(timings) &&
      timings.filter(isMeaningfulValue).length &&
      (timings.filter(isMeaningfulValue).length > 1 ||
        !isMeaningfulValue(event.details?.time))) ||
    (!Array.isArray(timings) &&
      !isMeaningfulValue(event.details?.time) &&
      isMeaningfulValue(timings));

  const contacts = Array.isArray(event.details?.contacts)
    ? event.details.contacts.filter((c) => isMeaningfulValue(c?.name))
    : [];
  const displayedContacts = contacts.slice(0, 2);
  const remainingContactNames = contacts.slice(2).map((c) => c.name).filter(Boolean);

  return (
    <section
      ref={pageRef}
      className="min-h-dvh w-screen bg-slate-950 text-blue-50 pt-0"
    >
      <div className="relative w-full">
        <div className="relative h-[50vh] w-full">
          <video
            id="event-hero-video"
            ref={videoRef}
            src={event.videoSrc}
            autoPlay
            muted
            playsInline
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/50 to-slate-950" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 pt-8">
          <button
            onClick={() => {
              sessionStorage.setItem('scrollToSection', 'tracks');
              navigate("/");
            }}
            type="button"
            className="nav-hover-btn mb-6 ms-0 inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>Back to Events</span>
          </button>

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

          {metaItems.length ? (
            <div
              data-animate="card"
              className="border-hsla mt-12 rounded-2xl bg-slate-950/35 p-5 md:p-6"
            >
              <div className="grid gap-6 sm:grid-cols-3">
                {metaItems.map((item) => (
                  <MetaItem
                    key={item.label}
                    label={item.label}
                    value={item.value}
                  />
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={onRegister}
              type="button"
              className="group relative overflow-hidden rounded-lg border-2 border-blue-400 bg-slate-950 px-8 py-3 font-general text-sm uppercase text-blue-300 transition-all duration-300 hover:bg-blue-500 hover:text-black hover:shadow-[0_0_20px_rgba(96,165,250,0.5)]"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Register Now</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 pb-24 md:grid-cols-2">
            {event.slug === "workshop" ? (
              <div className="col-span-1 md:col-span-2 flex items-center justify-center py-20">
                <p className="special-font font-zentry text-5xl md:text-6xl text-blue-50 text-center">
                  To be announced
                </p>
              </div>
            ) : (
              <>
                <div>
                  <p className="text-xs uppercase tracking-widest text-blue-50">
                    Overview
                  </p>
                  {isMeaningfulValue(event.details?.overview) ? (
                    <p className="mt-3 font-circular-web text-blue-50/70">
                      {event.details?.overview}
                    </p>
                  ) : null}

                  {Array.isArray(event.details?.rounds) &&
                  event.details.rounds.length ? (
                    <>
                      <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                        Rounds
                      </p>
                      <div className="mt-4 space-y-6">
                        {event.details.rounds.map((round) => (
                          <div
                            key={round.name}
                            className="border-l border-white/10 pl-4"
                          >
                            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                              <p className="font-zentry text-xl leading-[0.95] text-blue-50">
                                {round.name}
                              </p>
                              {round.duration ? (
                                <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/60">
                                  {round.duration}
                                </p>
                              ) : null}
                            </div>

                            {round.objective ? (
                              <p className="mt-2 font-circular-web text-sm text-blue-50/70">
                                {round.objective}
                              </p>
                            ) : null}

                            {Array.isArray(round.judging) &&
                            round.judging.length ? (
                              <ul className="mt-3 space-y-2 font-circular-web text-sm text-blue-50/70">
                                {round.judging.map((line) => (
                                  <li key={line} className="flex gap-3">
                                    <span className="text-blue-300">▸</span>
                                    <span>{line}</span>
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}

                  {Array.isArray(event.details?.format) &&
                  event.details.format.length ? (
                    <>
                      <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                        Format
                      </p>
                      <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                        {event.details.format.map((line) => (
                          <li key={line} className="flex gap-3">
                            <span className="text-blue-300">▸</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {showTimingsSection ? (
                    <>
                      <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                        Timings
                      </p>
                      {Array.isArray(timings) ? (
                        <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                          {timings.filter(isMeaningfulValue).map((line) => (
                            <li key={line} className="flex gap-3">
                              <span className="text-blue-300">▸</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 font-circular-web text-blue-50/70">
                          {timings}
                        </p>
                      )}
                    </>
                  ) : null}
                </div>

                <div>
                  {Array.isArray(event.details?.rules) &&
                  event.details.rules.length ? (
                    <>
                      <p className="text-xs uppercase tracking-widest text-blue-50">
                        Rules
                      </p>
                      <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                        {event.details.rules.map((line) => (
                          <li key={line} className="flex gap-3">
                            <span className="text-blue-300">▸</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {Array.isArray(event.details?.judging) &&
                  event.details.judging.length ? (
                    <>
                      <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                        Judging
                      </p>
                      <ul className="mt-3 space-y-2 font-circular-web text-blue-50/70">
                        {event.details.judging.map((line) => (
                          <li key={line} className="flex gap-3">
                            <span className="text-blue-300">▸</span>
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {displayedContacts.length ? (
                    <>
                      <p className="mt-10 text-xs uppercase tracking-widest text-blue-50">
                        Student Coordinators
                      </p>
                      <div className="border-hsla mt-3 overflow-hidden rounded-2xl bg-black/20">
                        <ul className="divide-y divide-white/10">
                          {displayedContacts.map((c) => (
                            <li
                              key={`${c.name}-${c.phone || c.email || "contact"}`}
                              className="p-4"
                            >
                              <p className="font-zentry text-xl leading-[0.95] text-blue-50">
                                {c.name}
                              </p>
                              <p className="mt-2 font-circular-web text-sm text-blue-50/70">
                                {c.phone || c.email}
                              </p>
                            </li>
                          ))}

                          {remainingContactNames.length > 0 ? (
                            <>
                              {remainingContactNames.map((name) => (
                                <li key={name} className="p-4">
                                  <p className="font-zentry text-xl leading-[0.95] text-blue-50">
                                    {name}
                                  </p>
                                </li>
                              ))}
                            </>
                          ) : null}
                        </ul>
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
