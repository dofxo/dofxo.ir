import { MainContext } from "@/context";
import { Sun, Moon, Share2 } from "lucide-react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import SectionLink from "./general/SectionLink";
import { socials } from "@/data/socials";

const navLinks = [
  { key: "navSkills", href: "#skills" },
  { key: "navExperience", href: "#experience" },
  { key: "navProjects", href: "#projects" },
] as const;

const Header = () => {
  const { theme, setTheme, translations, lang, setLang } = useContext(MainContext);

  const toggleLang = () => {
    const newLang = lang === "fa" ? "en" : "fa";
    setLang(newLang);
  };

  return (
    <header className="nav-glass sticky top-0 z-[1000]">
      <div className="container flex h-16 items-center justify-between">
        {/* logo */}
        <Link
          to="/"
          className="font-display text-[22px] font-bold tracking-tight gradient-text"
        >
          {`</dofxo>`}
        </Link>

        {/* section anchors — desktop only */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <SectionLink
              key={link.key}
              href={link.href}
              className="text-[14px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--primary)]"
            >
              {translations[link.key]}
            </SectionLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* language switcher */}
          <button onClick={toggleLang} className="icon-btn" title={translations.switchLanguage}>
            {lang === "fa" ? (
              <ReactCountryFlag countryCode="US" svg style={{ fontSize: "1.1rem" }} />
            ) : (
              <ReactCountryFlag countryCode="IR" svg style={{ fontSize: "1.1rem" }} />
            )}
            <span className="hidden text-[13px] font-medium sm:inline">
              {lang === "fa" ? "EN" : "فا"}
            </span>
          </button>

          {/* theme switch */}
          <button
            className="icon-btn"
            onClick={() => setTheme((prev: string) => (prev === "light" ? "dark" : "light"))}
            title={theme === "dark" ? translations.lightMode : translations.darkMode}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* social media popover */}
          <Popover>
            <PopoverTrigger className="icon-btn" title={translations.socialMedia}>
              <Share2 size={16} />
            </PopoverTrigger>
            <PopoverContent
              align="end"
              sideOffset={10}
              className="w-64 rounded-2xl border border-[var(--ring-subtle)] bg-[var(--surface-0)] p-4 shadow-[var(--elev-hover)]"
            >
              <h5 className="mb-3 text-[13px] font-bold text-[var(--text-color)]">
                {translations.socialMedia}
              </h5>
              <div className="flex flex-col gap-2">
                {socials.map((icon, idx) => (
                  <a
                    key={idx}
                    href={icon.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-xl border border-[var(--ring-subtle)] bg-[var(--surface-1)] px-3.5 py-2.5 text-[13px] font-medium text-[var(--text-color)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
                  >
                    <icon.icon size={16} className="text-[var(--primary)]" />
                    <span>{icon.text[lang]}</span>
                  </a>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;