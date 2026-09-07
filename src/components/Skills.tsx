import { MainContext } from "@/context";
import { mainSkills, additionalSkills } from "@/data/skills";
import { Rocket } from "lucide-react";
import { useContext } from "react";
import Title from "./general/Title";
import { Fade } from "react-awesome-reveal";

type Skill = (typeof mainSkills)[number];

const SkillGroup = ({ label, skills }: { label: string; skills: Skill[] }) => (
  <div className="flex flex-col items-center gap-4">
    <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--text-soft)]">
      {label}
    </span>
    <div className="flex flex-wrap justify-center gap-3">
      {skills.map((skill, idx) => (
        <Fade delay={idx * 30} duration={500} key={idx} triggerOnce>
          <div className="skill-chip">
            <skill.icon className="h-4 w-auto" color={skill.color} />
            <span>{skill.text}</span>
          </div>
        </Fade>
      ))}
    </div>
  </div>
);

const Skills = () => {
  const { translations } = useContext(MainContext);
  return (
    <section id="skills" className="scroll-mt-24 py-14 md:py-16">
      <div className="container flex flex-col items-center gap-12">
        <Title title={translations.mySkills} icon={<Rocket size={18} />} />
        <div className="flex w-full max-w-3xl flex-col gap-10">
          <SkillGroup label={translations.mainStack} skills={mainSkills} />
          <SkillGroup label={translations.additionalTools} skills={additionalSkills} />
        </div>
      </div>
    </section>
  );
};

export default Skills;

