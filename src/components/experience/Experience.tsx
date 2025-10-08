import Title from "../general/Title";
import { BriefcaseBusinessIcon } from "lucide-react";
import { Timeline } from "antd";
import ExperienceItem from "./ExperienceItem";
import { useContext } from "react";
import { MainContext } from "@/context";

const Experience = () => {

  const {translations} = useContext(MainContext)
  const timelineItems = [
    {
      children: (
        <ExperienceItem
          title={translations.projects.webline.title}
          time="1403 - 1402"
          description={translations.projects.webline.description}
          place={translations.projects.webline.place}
        />
      ),
      color: "var(--primary)",
    },
    {
      children: (
        <ExperienceItem
          title={translations.projects.saadat.title}
          time="1400 - 1396"
          description={translations.projects.saadat.description}
          place={translations.projects.saadat.place}
        />
      ),
      color: "var(--primary)",
    },
    {
      children: (
        <ExperienceItem
          title={translations.projects.uni.title}
          time="1404 - 1400"
          description={translations.projects.uni.description}
          place={translations.projects.uni.place}
        />
      ),
      color: "var(--primary)",
    },
  ];
  return (
    <section>
      <div className="container flex flex-col gap-10">
        <Title
          title={translations.experience}
          icon={<BriefcaseBusinessIcon color="var(--primary)" />}
        />
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
};

export default Experience;
