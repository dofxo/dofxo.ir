import { useContext, useEffect, useState } from "react";
import { Download, ArrowDown } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import { SiReact, SiTypescript } from "react-icons/si";
import { MainContext } from "@/context";
import { socials } from "@/data/socials";

const token = import.meta.env.VITE_GITHUB_TOKEN;

const HeroSection = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const { translations, lang } = useContext(MainContext);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const response = await fetch("https://api.github.com/users/dofxo", {
          headers: token ? { Authorization: token } : {},
        });
        if (!response.ok) return;
        const { avatar_url } = await response.json();
        if (active && avatar_url) setAvatarUrl(avatar_url);
      } catch {
        /* fall back to monogram */
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const github = socials[0];

  return (
    <section className="relative overflow-hidden pb-10 pt-14 md:pt-20">
      {/* aurora blobs */}
      <div
        className="pointer-events-none absolute -end-28 -top-28 h-80 w-80 rounded-full bg-[var(--glow-1)] blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -start-32 bottom-0 h-80 w-80 rounded-full bg-[var(--glow-2)] blur-[110px]"
        aria-hidden="true"
      />

      <div className="container relative grid items-center gap-12 md:grid-cols-2 md:gap-8">
        {/* text side */}
        <div className="text-center md:text-start">
          <Fade duration={500} triggerOnce>
            <h1 className="font-display text-[38px] font-bold leading-[1.1] text-[var(--text-color)] md:text-[52px]">
              {translations.name}
            </h1>
          </Fade>

          <Fade delay={80} duration={500} triggerOnce>
            <h2 className="mt-3 text-[18px] font-bold text-[var(--primary)] md:text-[22px]">
              {translations.jobTitle}
            </h2>
          </Fade>

          <Fade delay={200} duration={500} triggerOnce>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <a href="/resume.pdf" download className="btn-gradient">
                <Download size={16} />
                {translations.downloadResume}
              </a>
              <a
                href={github.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <github.icon size={16} />
                {github.text[lang]}
              </a>
            </div>
          </Fade>
        </div>

        {/* avatar side */}
        <div className="flex justify-center md:justify-end">
          <Fade duration={600} triggerOnce>
            <div className="relative h-56 w-56 md:h-72 md:w-72">
              {/* gradient backdrop */}
              <div
                className="absolute inset-0 rotate-6 rounded-[36px] bg-gradient-to-tr from-[var(--primary)] via-[var(--accent)] to-transparent opacity-80"
                aria-hidden="true"
              />
              {/* frame */}
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[36px] border border-[var(--ring-subtle)] bg-[var(--surface-0)] shadow-[var(--elev-hover)]">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={translations.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="font-display text-[96px] font-bold gradient-text md:text-[120px]">
                    {translations.name[0]}
                  </span>
                )}
              </div>

              {/* floating chips */}
              <div
                className="absolute -bottom-4 -start-4 flex items-center gap-2 rounded-2xl border border-[var(--ring-subtle)] bg-[var(--surface-0)] px-3.5 py-2.5 shadow-[var(--elev)]"
                aria-hidden="true"
              >
                <SiReact className="h-4 w-4" color="#61DAFB" />
                <span className="text-[11px] font-semibold text-[var(--text-color)]">
                  {translations.chipReact}
                </span>
              </div>
              <div
                className="absolute -top-4 -end-4 flex items-center gap-2 rounded-2xl border border-[var(--ring-subtle)] bg-[var(--surface-0)] px-3.5 py-2.5 shadow-[var(--elev)]"
                aria-hidden="true"
              >
                <SiTypescript className="h-4 w-4" color="#3178C6" />
                <span className="text-[11px] font-semibold text-[var(--text-color)]">
                  {translations.chipTypeScript}
                </span>
              </div>
            </div>
          </Fade>
        </div>
      </div>

      {/* scroll hint */}
      <a
        href="#skills"
        aria-label={translations.navSkills}
        className="mx-auto mt-12 hidden w-fit animate-bounce rounded-full border border-[var(--ring-subtle)] bg-[var(--surface-0)] p-3 text-[var(--text-secondary)] shadow-[var(--elev)] transition-colors hover:text-[var(--primary)] md:block"
      >
        <ArrowDown size={16} />
      </a>
    </section>
  );
};

export default HeroSection;