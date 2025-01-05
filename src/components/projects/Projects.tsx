import { projects } from "@/data/projects";
import Title from "../general/Title";
import { Code, GithubIcon } from "lucide-react";
import Project from "./Project";
import { Button } from "@/components/ui/button";
import { AttentionSeeker } from "react-awesome-reveal";

const Projects = () => {
  return (
    <section>
      <div className="container flex flex-col gap-5 items-center">
        <Title title="پروژه ها" icon={<Code color="var(--primary)" />} />
        <div id="projects" className="flex gap-5 flex-wrap">
          {projects.map((project, idx) => (
            <AttentionSeeker key={idx} duration={1500} effect="headShake">
              <Project
                title={project.title}
                description={project.description}
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
            <span className="text-[var(--text-color)] ">مشاهده بیشتر</span>
          </a>
        </Button>
      </div>
    </section>
  );
};

export default Projects;
