import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollToTop() {
  const { pathname, hash, search } = useLocation();
  useEffect(() => {
    if (hash) {
      // Small delay to let the page render before scrolling to anchor
      const timer = setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 120);
      return () => clearTimeout(timer);
    } else {
      // Delay scroll to top so it runs AFTER the new page renders
      const timer = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [pathname, search, hash]);
  // // watch search so ?category= changes also scroll to top
  return null;
}
