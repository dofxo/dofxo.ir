import Title from "../general/Title";
import { BriefcaseBusinessIcon } from "lucide-react";
import { Timeline } from "antd";
import ExperienceItem from "./ExperienceItem";

const Experience = () => {
  const timelineItems = [
    {
      children: (
        <ExperienceItem
          title="FrontEnd Developer"
          time="1403 - 1402"
          description="تمام وقت"
          place="آژانس وبلاین"
        />
      ),
      color: "var(--primary)",
    },
    {
      children: (
        <ExperienceItem
          title="دیپلم"
          time="1400 - 1396"
          description="ریاضی و فیزیک"
          place="دبیرستان سعادت بوشهر"
        />
      ),
      color: "var(--primary)",
    },
    {
      children: (
        <ExperienceItem
          title="کارشناسی"
          time="1404 - 1400"
          description="مهندسی کامپیوتر"
          place="دانشگاه آزاد اسلامی بوشهر"
        />
      ),
      color: "var(--primary)",
    },
  ];
  return (
    <section>
      <div className="container flex flex-col gap-10">
        <Title
          title="تجربه کاری و تحصیلات"
          icon={<BriefcaseBusinessIcon color="var(--primary)" />}
        />
        <Timeline items={timelineItems} />
      </div>
    </section>
  );
};

export default Experience;
