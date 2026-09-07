import { useContext } from "react";
import { ExternalLink, Github } from "lucide-react";
import { MainContext } from "@/context";
import { ProjectItem } from "@/types";

type Props = {
  project: ProjectItem;
  lang: "fa" | "en";
  index?: number;
};

export default function ProjectCard({ project, lang, index = 0 }: Props) {
  const { translations } = useContext(MainContext);

  const title = project.title[lang];
  const description = project.description[lang];
  const tags = project.skills ?? [];

  return (
    <article className="group relative rounded-2xl border border-[var(--ring-subtle)] bg-[var(--surface-0)] p-5 shadow-[var(--elev)] transition-colors hover:border-[var(--primary)]/50 hover:shadow-[var(--elev-hover)] md:p-6">
      <div className="grid items-start gap-5 md:grid-cols-[40px_1fr_auto]">
        {/* index */}
        <div className="hidden pt-[3px] md:block" aria-hidden="true">
          <span className="font-display inline-block min-w-[2ch] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] bg-clip-text px-1 text-center text-[20px] font-semibold leading-none text-transparent">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* main content */}
        <div className="flex min-w-0 flex-col gap-2.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span
              className="font-display inline-block min-w-[2ch] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] bg-clip-text px-1 text-center text-[15px] font-semibold leading-none text-transparent md:hidden"
              aria-hidden="true"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="text-[16px] font-semibold leading-snug text-[var(--text-color)] transition-colors group-hover:text-[var(--primary)] md:text-[16.5px]">
              {title}
            </h3>
            {project.role && (
              <span className="role-pill">
                <span className="pulse-dot" />
                {project.role}
              </span>
            )}
          </div>

          <p className="max-w-2xl text-[13px] leading-[1.8] text-[var(--text-secondary)]">
            {description}
          </p>

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag, i) => (
                <span key={i} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* actions */}
        <div className="flex items-center gap-2 md:flex-col md:gap-2">
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action"
              aria-label={`${title}: ${translations.openWebsite}`}
              title={project.websiteLink}
            >
              <ExternalLink size={15} />
            </a>
          )}
          {project.sourceCode && (
            <a
              href={project.sourceCode}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-action"
              aria-label={`${title}: ${translations.viewSource}`}
            >
              <Github size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}