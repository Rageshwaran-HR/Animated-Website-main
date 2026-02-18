import { useEffect, useState } from "react";

const NotificationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const message = "⚠️ Important Notice: On-spot registration is available for ₹100, and can purchase food from the mess.";

  useEffect(() => {
    const handleScroll = () => {
      // Get the hero section height (viewport height)
      const heroHeight = window.innerHeight;
      const scrollY = window.scrollY;

      // Hide when scrolled past hero section
      if (scrollY > heroHeight) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-red-600 via-orange-600 to-red-600 shadow-lg overflow-hidden">
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
