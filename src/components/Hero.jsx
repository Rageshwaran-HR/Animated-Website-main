import { useEffect, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const eventStart = new Date("2026-02-21T00:00:00");

    const pad2 = (value) => String(value).padStart(2, "0");

    const update = () => {
      const now = new Date();
      const diffMs = Math.max(0, eventStart.getTime() - now.getTime());

      const totalSeconds = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      const seconds = totalSeconds % 60;

      setCountdown({
        days: pad2(days),
        hours: pad2(hours),
        minutes: pad2(minutes),
        seconds: pad2(seconds),
      });
    };

    update();
    const intervalId = setInterval(update, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <video
          src="https://res.cloudinary.com/domxvnuqp/video/upload/q_auto,f_auto/v1767445104/heron_fq37uh.mp4"
          autoPlay
          loop
          muted
          className="absolute left-0 top-0 z-0 size-full object-cover object-center"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-slate-950/65 via-slate-950/30 to-slate-950/65"
        />

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          Sympo<b>s</b>ium
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="pt-24 px-5 sm:pt-28 sm:px-10">
            <div className="max-w-xl">
              <h1 className="special-font hero-heading text-blue-100">
                Ozm<b>e</b>nta&apos;26
              </h1>

              <div className="mt-3 flex max-w-xl flex-col gap-5">
                <div className="w-fit rounded-md border-hsla bg-slate-950/30 px-3 py-2 backdrop-blur-sm">
                  <div className="mb-2 inline-flex rounded-full border-hsla bg-slate-950/35 px-3 py-1 font-general text-[10px] uppercase tracking-widest text-blue-300">
                    National Level Symposium
                  </div>
                  <p className="special-font font-zentry font-black uppercase leading-[0.95] text-blue-50 sm:text-xl md:text-2xl">
                    Velammal Engineering College
                  </p>
                  <p className="mt-1 font-general text-xs uppercase tracking-widest text-blue-50/85 sm:text-sm">
                    Department of CSE · Feb 21, 2026
                  </p>
                </div>

                <Button
                  id="watch-trailer"
                  title="Register Now"
                  leftIcon={<TiLocationArrow />}
                  containerClass="!bg-yellow-300 flex-center gap-1"
                  onClick={() => {
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSfHHf-ixnm_ej1KKgZUmUb6opoGqwmY3j8XLe-jT7zpTPXJAg/viewform?usp=sharing&ouid=117566611305738243195",
                      "_blank"
                    );
                  }}
                />

                <div className="w-fit rounded-md border-hsla bg-slate-950/35 px-4 py-4 text-blue-50">
                  <p className="font-general text-[10px] uppercase tracking-widest text-blue-50/80">
                    Event Countdown
                  </p>
                  <div className="mt-3 flex items-stretch gap-2">
                    <div className="border-hsla rounded-md bg-slate-950/30 px-4 py-3">
                      <p className="font-zentry text-3xl leading-none text-blue-50 md:text-4xl">
                        {countdown.days}
                      </p>
                    </div>

                    <div className="flex items-center px-1">
                      <span className="font-zentry text-3xl leading-none text-blue-50/70 md:text-4xl">
                        :
                      </span>
                    </div>

                    <div className="border-hsla rounded-md bg-slate-950/30 px-4 py-3">
                      <p className="font-zentry text-3xl leading-none text-blue-50 md:text-4xl">
                        {countdown.hours}
                      </p>
                    </div>

                    <div className="flex items-center px-1">
                      <span className="font-zentry text-3xl leading-none text-blue-50/70 md:text-4xl">
                        :
                      </span>
                    </div>

                    <div className="border-hsla rounded-md bg-slate-950/30 px-4 py-3">
                      <p className="font-zentry text-3xl leading-none text-blue-50 md:text-4xl">
                        {countdown.minutes}
                      </p>
                    </div>

                    <div className="flex items-center px-1">
                      <span className="font-zentry text-3xl leading-none text-blue-50/70 md:text-4xl">
                        :
                      </span>
                    </div>

                    <div className="border-hsla rounded-md bg-slate-950/30 px-4 py-3">
                      <p className="font-zentry text-3xl leading-none text-blue-50 md:text-4xl">
                        {countdown.seconds}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
