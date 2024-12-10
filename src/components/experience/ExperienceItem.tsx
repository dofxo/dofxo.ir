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
    <div className="flex flex-col gap-2">
      <span className="text-[10px] text-gray-500">{time}</span>
      <h3 className="text-[var(--text-color)]">{title}</h3>
      <p className="text-[var(--text-secondary-color)] text-[12px]">
        {description}
      </p>
      <p className="text-[var(--primary)]">{place}</p>
    </div>
  );
};

export default ExperienceItem;
