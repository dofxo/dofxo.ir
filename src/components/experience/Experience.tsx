import Title from "../general/Title";
import { BriefcaseBusinessIcon } from "lucide-react";
import ExperienceItem from "./ExperienceItem";
import { useContext } from "react";
import { MainContext } from "@/context";

const Experience = () => {
  const { translations } = useContext(MainContext);

  const items = [
    {
      title: translations.projects.saadat.title,
      time: "1400 - 1396",
      description: translations.projects.saadat.description,
      place: translations.projects.saadat.place,
    },
    {
      title: translations.projects.uni.title,
      time: "1404 - 1400",
      description: translations.projects.uni.description,
      place: translations.projects.uni.place,
    },
    {
      title: translations.projects.webline.title,
      time: "1403 - 1402",
      description: translations.projects.webline.description,
      place: translations.projects.webline.place,
    },
  ];

  return (
    <section id="experience" className="scroll-mt-24 py-14 md:py-16">
      <div className="container flex flex-col items-center gap-12">
        <Title
          title={translations.experience}
          icon={<BriefcaseBusinessIcon size={18} />}
        />

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
};

export default Experience;