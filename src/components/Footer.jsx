import { useRef } from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const COLLEGE_MAP_URL = "https://maps.app.goo.gl/NLPRBqJK2xNNX7xFA";

const links = [
  { href: "https://www.instagram.com/ozmenta_26", icon: <FaInstagram /> },
  {
    href: "https://www.linkedin.com/in/ozmenta-cse-09971a3a3",
    icon: <FaLinkedin />,
  },
];

const STUDENT_COORDINATORS = [
  { name: "Shailendra Kumar B", phone: "+91 9345356916" },
  { name: "Vyshhnavi NDD", phone: "+91 8778428081" },
  { name: "Akaash Srinivasan", phone: "+91 7305488743" },
  { name: "Shree Ranjani B", phone: "+91 7305491657" },
  { name: "Nandha Kumar R", phone: "+91 7418168704" },
  { name: "Monisha V", phone: "+91 8270223366" },
];

const TEACHER_COORDINATORS = [
  { name: "Dr. Usha M", position: "Associate Professor" },
  { name: "Mrs. Daya Florance D", position: "Assistant Professor" },
  { name: "Mrs. Aarthi K C", position: "Assistant Professor" },
  { name: "Mrs. Rohini C", position: "Assistant Professor" },
];

const Footer = () => {
  const locationRef = useRef(null);
  const mapTiltRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
        return;
      }

      const ctx = gsap.context(() => {
        gsap.from(".footer-location-card", {
          y: 18,
          opacity: 0,
          duration: 0.7,
          delay: 0.25,
          ease: "power2.out",
          scrollTrigger: {
            trigger: locationRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.from([".footer-location-copy", ".footer-location-map"], {
          y: 12,
          opacity: 0,
          duration: 0.65,
          delay: 0.25,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: locationRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      }, locationRef);

      return () => ctx.revert();
    },
    { scope: locationRef }
  );

  const onTiltMove = (e) => {
    const el = mapTiltRef.current;
    if (!el) return;

    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    el.style.transform = `
      perspective(900px)
      rotateX(${y * 8}deg)
      rotateY(${x * -8}deg)
      scale(0.98)
    `;
  };

  const onTiltLeave = () => {
    const el = mapTiltRef.current;
    if (!el) return;
    el.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <footer id="contact" className="w-screen bg-violet-300 py-6 text-black">
      <div className="container mx-auto px-4">
        <div
          ref={locationRef}
          className="footer-location-card mx-auto mb-6 max-w-7xl rounded-lg border border-white/10 bg-slate-950 px-5 py-6 text-blue-50 md:px-8 md:py-8"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
            {/* Coordinators Section */}
            <div className="md:col-span-5">
              <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/80 mb-6">
                Coordinators
              </p>

              {/* Student Coordinators */}
              <div className="mb-8">
                <p className="font-general text-xs uppercase tracking-widest text-blue-300 mb-4 font-bold">
                  Student Coordinators
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {STUDENT_COORDINATORS.map((coordinator, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-300 pl-4"
                    >
                      <p className="font-audiowide text-lg leading-tight text-blue-50">
                        {coordinator.name}
                      </p>
                      <p className="mt-1 font-circular-web text-sm text-blue-50/70">
                        Phone: {coordinator.phone}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Teacher Coordinators */}
              <div>
                <p className="font-general text-xs uppercase tracking-widest text-blue-300 mb-4 font-bold">
                  Staff Coordinators
                </p>
                <div className="space-y-4">
                  {TEACHER_COORDINATORS.map((coordinator, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-blue-300 pl-4"
                    >
                      <p className="font-audiowide text-lg leading-tight text-blue-50">
                        {coordinator.name}
                      </p>
                      <p className="mt-1 font-general text-[10px] uppercase tracking-widest text-blue-50/60">
                        {coordinator.position}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div
              ref={mapTiltRef}
              onMouseMove={onTiltMove}
              onMouseLeave={onTiltLeave}
              className="footer-location-map relative rounded-2xl transition-transform duration-300 ease-out will-change-transform md:col-span-7"
            >
              {/* College Location Text at Top */}
              <div className="mb-4">
                <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/80">
                  College Location
                </p>
                <p className="mt-2 max-w-md font-circular-web text-base text-blue-50/70">
                  Tap the map for directions.
                </p>

                <a
                  href={COLLEGE_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex w-fit items-center rounded-md border-hsla bg-slate-950/35 px-4 py-2 font-general text-[10px] uppercase tracking-widest text-blue-50 transition-colors duration-300 hover:bg-slate-950/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70"
                >
                  Open in Google Maps
                </a>
              </div>

              <a
                href={COLLEGE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cyber-map group relative block overflow-hidden rounded-md border border-white/10 transition-shadow duration-300 hover:ring-2 hover:ring-blue-300/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70"
                aria-label="Open college location in Google Maps"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/25 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50" />
                <div className="pointer-events-none absolute inset-0 bg-blue-300/20 opacity-0 mix-blend-screen transition-opacity duration-300 group-hover:opacity-100" />
                <div className="aspect-[16/9] w-full">
                  <img
                    src="/img/map.png"
                    alt="College location map"
                    className="h-full w-full object-cover filter transition duration-300 ease-out group-hover:scale-[1.04] group-hover:brightness-110 group-hover:contrast-150 group-hover:saturate-200 group-hover:hue-rotate-[-20deg]"
                    loading="lazy"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-4 md:flex-row">
          <p className="text-center text-sm font-light md:text-left">
            &copy; OZMENTA 26, All rights reserved
          </p>

          <div className="flex justify-center gap-4 md:justify-start">
            {links.map((link) => (
              <a
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black transition-colors duration-500 ease-in-out hover:text-white"
              >
                {link.icon}
              </a>
            ))}
          </div>

          <a
            href="#privacy-policy"
            className="text-center text-sm hover:underline md:text-right"
          >
            Privacy Policy
          </a>
        </div>

        <div className="mt-4 border-t border-black/10 pt-4 text-center">
          <p className="font-circular-web text-base text-black/70 md:text-lg">
            Website developed by{" "}
            <span className="font-zentry text-black">Rageshwaran R</span> (4th year),{" "}
            <span className="font-zentry text-black">Vishvaa K</span>,{" "}
            <span className="font-zentry text-black">James Jacob I</span>,{" "}
            <span className="font-zentry text-black">Vaaheesan S</span> (3rd years)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
