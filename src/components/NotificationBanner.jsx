import { useEffect, useState, useRef } from "react";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const NotificationBanner = () => {
  const message = "⚠️ Important Notice: On-spot registration is available for ₹100, and you can purchase food from the mess.";
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const bannerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsBannerVisible(true);
    } else if (currentScrollY > lastScrollY) {
      setIsBannerVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsBannerVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(bannerRef.current, {
      y: isBannerVisible ? 0 : -100,
      opacity: isBannerVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isBannerVisible]);

  return (
    <div 
      ref={bannerRef}
      className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-red-600 via-orange-600 to-red-600 shadow-lg overflow-hidden"
    >
      <div className="relative flex items-center py-3">
        {/* Scrolling Text Container */}
        <div className="scrolling-text-wrapper-full">
          <div className="scrolling-text">
            {/* Repeat the message multiple times for seamless loop */}
            <span className="font-general text-sm font-semibold text-white whitespace-nowrap sm:text-base">
              {message}
            </span>
            <span className="font-general text-sm font-semibold text-white whitespace-nowrap sm:text-base ml-20">
              {message}
            </span>
            <span className="font-general text-sm font-semibold text-white whitespace-nowrap sm:text-base ml-20">
              {message}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationBanner;
