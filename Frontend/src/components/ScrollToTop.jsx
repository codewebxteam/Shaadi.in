import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Jaise hi route (URL) change hoga, ye page ko top (0, 0) par bhej dega smoothly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // "smooth" bhi rakh sakte hain, but "instant" naye page load par natural lagta hai
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
