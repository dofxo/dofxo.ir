import { projects } from "@/data/projects";
import Title from "../general/Title";
import { Code, GithubIcon } from "lucide-react";
import Project from "./Project";
import { Button } from "@/components/ui/button";
import { AttentionSeeker } from "react-awesome-reveal";
import { MainContext } from "@/context";
import { useContext } from "react";

const Projects = () => {
  const {lang,translations} = useContext(MainContext)
  return (
    <section>
      <div className="container flex flex-col gap-5 items-center">
        <Title title={translations.project} icon={<Code color="var(--primary)" />} />
        <div
          id="projects"
          className="flex gap-5 flex-wrap justify-center md:justify-start"
        >
          {projects.map((project, idx) => (
            <AttentionSeeker key={idx} duration={1500} effect="headShake">
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
