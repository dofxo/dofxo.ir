import { MainContext } from "@/context";
import { skills } from "@/data/skills";
import { Rocket } from "lucide-react";
import { useContext } from "react";
import Title from "./general/Title";

const Skills = () => {
  const { theme } = useContext(MainContext);
  const iconsTextColor = theme === "light" ? "text-gray-900" : "text-gray-300";
  return (
    <section>
      <div className="container flex flex-col gap-10">
        <Title title="مهارت های من" icon={<Rocket color="var(--primary)" />} />
        <div className="skills flex gap-5 flex-wrap">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="flex gap-2 items-center border bg-[var(--badge-bg-color)] px-2.5 py-1.5 rounded-full"
            >
              <skill.icon color={skill.color} />
              <span className={`text-[12px] ${iconsTextColor}`}>
                {skill.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
