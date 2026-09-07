import { useContext, useEffect, useState } from "react";
import { Code, Github } from "lucide-react";
import { MainContext } from "@/context";
import { fetchProjects } from "@/lib/projects";
import type { ProjectItem } from "@/types";
import Title from "../general/Title";
import ListSkeleton from "../general/ListSkeleton";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { lang, translations } = useContext(MainContext);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((items) => {
        if (active) setProjects(items);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="projects" className="scroll-mt-24 py-14 md:py-16">
      <div className="container flex flex-col items-center gap-12">
        <Title title={translations.project} icon={<Code size={18} />} />

        <div className="flex w-full max-w-4xl flex-col gap-7">
          {loading ? (
            <ListSkeleton count={4} variant="row" />
          ) : (
            projects.map((project, i) => (
              <div
                key={project.id}
                className="rise-in"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <ProjectCard project={project} lang={lang} index={i} />
              </div>
            ))
          )}
        </div>

        <a
          href="https://github.com/dofxo/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline"
        >
          <Github size={16} />
          {translations.viewMore}
        </a>
      </div>
    </section>
  );
};

export default Projects;