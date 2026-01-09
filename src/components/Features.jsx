import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EVENTS } from "../data/events";
import AnimatedTitle from "./AnimatedTitle";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

/* =========================
   Bento Tilt Wrapper
========================= */
const BentoTilt = ({ children, className = "" }) => {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    el.style.transform = `
      perspective(900px)
      rotateX(${y * 8}deg)
      rotateY(${x * -8}deg)
      scale(0.97)
    `;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

/* =========================
   Bento Card
========================= */
const BentoCard = ({ src, title, description }) => {
  return (
    <div className="relative h-full w-full">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-end p-6 text-blue-50">
        <h3 className="text-xl md:text-2xl font-bold tracking-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-2 max-w-sm text-sm text-blue-100/80">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

/* =========================
   Features Section
========================= */
const Features = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        gsap.from(".features-subtext", {
          y: 16,
          opacity: 0,
          duration: 0.65,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        });
      }, sectionRef);

      return () => ctx.revert();
    },
    { scope: sectionRef }
  );

  const technicalEvents = EVENTS.filter((e) => e.track === "Technical");
  const nonTechEvents = EVENTS.filter((e) => e.track === "Non-Tech");
  const featuredEvents = EVENTS.filter((e) => e.track === "Featured");

  const techLayout = [
    "md:col-span-7 md:row-span-2",
    "md:col-span-5 md:row-span-1",
    "md:col-span-5 md:row-span-1",
    "md:col-span-6 md:row-span-1",
    "md:col-span-6 md:row-span-1",
    "md:col-span-12 md:row-span-1",
  ];

  const nonTechLayout = [
    "md:col-span-6 md:row-span-2",
    "md:col-span-6 md:row-span-2",
    "md:col-span-4 md:row-span-1",
    "md:col-span-4 md:row-span-1",
    "md:col-span-4 md:row-span-1",
    "md:col-span-6 md:row-span-2",
    "md:col-span-6 md:row-span-2",
  ];

  const renderGrid = (events, layout) => (
    <div className="mt-10 grid grid-cols-1 gap-6 auto-rows-[14rem] sm:grid-cols-2 sm:auto-rows-[16rem] md:grid-cols-12 md:auto-rows-[18rem]">
      {events.map((event, i) =>
        (() => {
          const layoutClass = layout?.[i] ?? "md:col-span-6 md:row-span-1";

          return (
            <BentoTilt
              key={event.name}
              className={`border border-white/10 bg-slate-950 ${layoutClass} cursor-pointer`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/events/${event.slug}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/events/${event.slug}`);
                  }
                }}
                className="h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70"
              >
                <BentoCard
                  src={event.videoSrc}
                  title={event.name}
                  description={event.short}
                />
              </div>
            </BentoTilt>
          );
        })()
      )}
    </div>
  );

  return (
    <section ref={sectionRef} id="tracks" className="bg-slate-950 pb-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="py-32">
          <AnimatedTitle
            title="Ev<b>e</b>nts"
            align="start"
            containerClass="pointer-events-none relative z-10 !text-blue-50 !px-0 sm:!px-0 !text-5xl md:!text-6xl"
          />

          <p
            className="features-subtext mt-6 max-w-3xl font-circular-web text-blue-50/70 
            text-1xl sm:text-2xl md:text-3xl font-bold"
          >
            Ozmenta&apos;26 brings together intense technical battles and fun
            non-technical challenges.
          </p>

          {/* Technical */}
          <AnimatedTitle
            title="Tech<b>n</b>ical Ev<b>e</b>nts"
            align="start"
            containerClass="mt-16 pointer-events-none relative z-10 !text-blue-50 !px-0 sm:!px-0 !text-3xl md:!text-4xl !leading-[.9]"
          />
          {renderGrid(technicalEvents, techLayout)}

          {/* Non Technical */}
          <AnimatedTitle
            title="Non-T<b>e</b>ch Ev<b>e</b>nts"
            align="start"
            containerClass="mt-20 pointer-events-none relative z-10 !text-blue-50 !px-0 sm:!px-0 !text-3xl md:!text-4xl !leading-[.9]"
          />
          {renderGrid(nonTechEvents, nonTechLayout)}

          {/* Featured Events Section */}
          <AnimatedTitle
            title="Feat<b>u</b>red Events"
            align="start"
            containerClass="mt-20 pointer-events-none relative z-10 !text-blue-50 !px-0 sm:!px-0 !text-3xl md:!text-4xl !leading-[.9]"
          />
          {renderGrid(featuredEvents, [
            "md:col-span-6 md:row-span-2",
            "md:col-span-6 md:row-span-2",
          ])}
        </div>
      </div>
    </section>
  );
};

export default Features;
