import { ArrowUp } from "lucide-react";
import { useState } from "react";

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  window.addEventListener("scroll", () => {
    if (window.scrollY > 380) setShow(true);
    else setShow(false);
  });
  return show ? (
    <ArrowUp
      size={35}
      color="var(--text-color)"
      className="fixed left-5 md:left-10 bottom-5 md:bottom-10 rounded-full p-2 border bg-[var(--bg-color)] cursor-pointer"
      onClick={() => window.scrollTo(0, 0)}
    />
  ) : null;
};

export default ScrollToTop;
