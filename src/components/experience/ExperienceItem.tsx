import { MapPin } from "lucide-react";

const ExperienceItem = ({
  time,
  title,
  description,
  place,
}: {
  time: string;
  title: string;
  description: string;
  place: string;
}) => {
  return (
    <article className="group rounded-2xl border border-[var(--ring-subtle)] bg-[var(--surface-0)] p-5 shadow-[var(--elev)] transition-all hover:-translate-y-px hover:border-[var(--primary)]/50 hover:shadow-[var(--elev-hover)] md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="time-badge">{time}</span>
        <span className="text-[11.5px] font-medium text-[var(--text-soft)]">
          {description}
        </span>
      </div>
      <h3 className="mt-3.5 text-[15.5px] font-bold text-[var(--text-color)] transition-colors group-hover:text-[var(--primary)] md:text-[17px]">
        {title}
      </h3>
      <p className="mt-1.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--text-secondary)]">
        <MapPin size={13} className="text-[var(--accent)]" />
        {place}
      </p>
    </article>
  );
};

export default ExperienceItem;