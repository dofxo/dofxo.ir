import type { MouseEvent, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth" });
};

/**
 * Header/footer anchor that always ends up on the home page section.
 * On the home page it just smooth-scrolls; anywhere else it navigates
 * to "/" first and scrolls once the home page has mounted.
 */
const SectionLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const sectionId = href.replace(/^#/, "");

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      scrollToSection(sectionId);
      return;
    }
    navigate("/");
    // give the home page a moment to render before scrolling
    window.setTimeout(() => scrollToSection(sectionId), 120);
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default SectionLink;