import { skills } from "@/data/skills";
import { Rocket } from "lucide-react";
import { useContext } from "react";
import { MainContext } from "@/context";

const Skills = () => {
  const { theme } = useContext(MainContext);
  return (
    <section>
      <div className="container flex flex-col gap-10">
        <h2 className="title">
          <Rocket color="var(--primary)" />
          <span> مهارت های من</span>
        </h2>
        <div className="skills flex gap-5 flex-wrap">
          {skills.map((skill, idx) => (
            <img
              src={skill.icon}
              alt={skill.text}
              className="border-[var(--primary)] rounded-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
