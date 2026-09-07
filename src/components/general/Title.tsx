import type { ReactNode } from "react";

const Title = ({ title, icon }: { title: string; icon?: ReactNode }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-3">
        {icon && (
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[var(--ring-subtle)] bg-[var(--surface-1)] text-[var(--primary)] shadow-[var(--elev)]">
            {icon}
          </span>
        )}
        <h2 className="text-[22px] font-extrabold tracking-tight text-[var(--text-color)] md:text-[25px]">
          {title}
        </h2>
      </div>
      <span
        className="h-1 w-16 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)]"
        aria-hidden="true"
      />
    </div>
  );
};

export default Title;