import { MainContext } from "@/context";
import { HeartIcon, ArrowUp } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import SectionLink from "./general/SectionLink";

const Footer = () => {
  const { translations } = useContext(MainContext);

  const navLinks = [
    { key: "navSkills", href: "#skills" },
    { key: "navExperience", href: "#experience" },
    { key: "navProjects", href: "#projects" },
  ];

  return (
    <footer className="border-t border-[var(--ring-subtle)] py-7">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <span className="flex items-center gap-1.5 text-[13px] text-[var(--text-secondary)]">
          {translations.designedVia}
          <HeartIcon
            size={14}
            className="fill-[var(--accent)] text-[var(--accent)]"
          />
        </span>

        <span className="text-[12.5px] text-[var(--text-soft)]">
          {translations.copyRight} {new Date().getFullYear()} ©{" "}
          <Link to="/" className="font-medium text-[var(--text-color)] transition-colors hover:text-[var(--primary)]">
            {translations.name}
          </Link>
        </span>

        <div className="flex items-center gap-4">
          {navLinks.map((link) => (
            <SectionLink
              key={link.key}
              href={link.href}
              className="text-[12.5px] text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              {translations[link.key]}
            </SectionLink>
          ))}
          <a
            href="#top"
            aria-label={translations.backToTop}
            className="grid h-8 w-8 place-items-center rounded-full border border-[var(--ring-subtle)] bg-[var(--surface-1)] text-[var(--text-secondary)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ArrowUp size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;