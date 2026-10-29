import Title from "../general/Title";
import { BriefcaseBusinessIcon, GraduationCap } from "lucide-react";
import ExperienceItem from "./ExperienceItem";
import { useContext, type ReactNode } from "react";
import { MainContext } from "@/context";

type TimelineItem = {
  title: string;
  time: string;
  description: string;
  place: string;
};

const Timeline = ({
  id,
  title,
  icon,
  items,
  className,
}: {
  id: string;
  title: string;
  icon: ReactNode;
  items: TimelineItem[];
  className: string;
}) => (
  <section id={id} className={`scroll-mt-24 ${className}`}>
    <div className="container flex flex-col items-center gap-12">
      <Title title={title} icon={icon} />

      <div className="relative w-full max-w-2xl">
        {/* timeline rail */}
        <div
          className="absolute bottom-4 start-[7px] top-4 w-px bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-transparent"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-7">
          {items.map((item, i) => (
            <div key={i} className="relative ps-12 md:ps-16">
              {/* node */}
              <span
                className="absolute start-0 top-2 h-4 w-4 rounded-full bg-[var(--primary)] shadow-[0_0_0_4px_var(--bg-color),0_0_0_5px_var(--ring-subtle)]"
                aria-hidden="true"
              />
              <ExperienceItem {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Experience = () => {
  const { translations, lang } = useContext(MainContext);

  // Jalali (fa) vs Gregorian (en) year ranges
  const times = {
    saadat: { fa: "1400 - 1396", en: "2017 - 2021" },
    uni: { fa: "1404 - 1400", en: "2021 - 2025" },
    master: { fa: "1405 - اکنون", en: "2026 - Present" },
    webline: { fa: "1403 - 1402", en: "2023 - 2024" },
  };

  const workItems = [
    {
      title: translations.projects.webline.title,
      time: times.webline[lang],
      description: translations.projects.webline.description,
      place: translations.projects.webline.place,
    },
  ];

  const educationItems = [
    {
      title: translations.projects.saadat.title,
      time: times.saadat[lang],
      description: translations.projects.saadat.description,
      place: translations.projects.saadat.place,
    },
    {
      title: translations.projects.uni.title,
      time: times.uni[lang],
      description: translations.projects.uni.description,
      place: translations.projects.uni.place,
    },
    {
      title: translations.projects.master.title,
      time: times.master[lang],
      description: translations.projects.master.description,
      place: translations.projects.master.place,
    },
  ];

  return (
    <>
      <Timeline
        id="experience"
        className="pt-14 pb-10 md:pt-16 md:pb-12"
        title={translations.workExperience}
        icon={<BriefcaseBusinessIcon size={18} />}
        items={workItems}
      />

      <Timeline
        id="education"
        className="pt-10 pb-14 md:pt-12 md:pb-16"
        title={translations.education}
        icon={<GraduationCap size={18} />}
        items={educationItems}
      />
    </>
  );
};

export default Experience;