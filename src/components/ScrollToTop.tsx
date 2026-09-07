import { MainContext } from "@/context";
import { ArrowUp } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  const { translations } = useContext(MainContext);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 380);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return show ? (
    <button
      aria-label={translations.backToTop}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 end-6 z-[999] grid h-11 w-11 place-items-center rounded-full bg-gradient-to-tr from-[var(--primary)] to-[var(--accent)] text-white shadow-[0_10px_26px_-8px_var(--primary)] transition-transform"
    >
      <ArrowUp size={19} />
    </button>
  ) : null;
};

export default ScrollToTop;