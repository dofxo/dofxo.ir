import Title from "../general/Title";
import { Code, GithubIcon } from "lucide-react";
import Project from "./Project";
import { Button } from "@/components/ui/button";
import { AttentionSeeker } from "react-awesome-reveal";
import { MainContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { fetchProjects } from "@/lib/projects";
import type { ProjectItem } from "@/types";

const Projects = () => {
  const { lang, translations } = useContext(MainContext);
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    let active = true;
    fetchProjects()
      .then((items) => {
        if (active) setProjects(items);
      })
      .catch((err) => {
        console.error("Failed to load projects:", err);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <div className="container flex flex-col gap-5 items-center">
        <Title title={translations.project} icon={<Code color="var(--primary)" />} />
        <div
          id="projects"
          className="flex gap-5 flex-wrap justify-center md:justify-start"
        >
          {projects.map((project) => (
            <AttentionSeeker key={project.id} duration={1500} effect="headShake">
              <Project
                title={project.title[lang]}
                description={project.description[lang]}
                sourceCode={project.sourceCode}
                role={project.role}
                websiteLink={project.websiteLink}
                skills={project.skills}
              />
            </AttentionSeeker>
          ))}
        </div>
        <Button variant="outline" asChild className="w-fit rounded-full mt-5">
          <a
            href="https://github.com/dofxo/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon color="var(--text-color)" />
            <span className="text-[var(--text-color)] ">{translations.viewMore}</span>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Projects;
