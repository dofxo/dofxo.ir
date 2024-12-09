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
            <div className="flex gap-2 items-center border bg-[var(--badge-bg-color)] px-2.5 py-1.5 rounded-full">
              <skill.icon color={skill.color} className="align-middle inline" />
              <span className="text-[12px] text-gray-600">{skill.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
