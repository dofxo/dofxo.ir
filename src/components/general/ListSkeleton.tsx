const barClass =
	"rounded-full bg-[var(--hover-color)]";

/* Card-shaped placeholder — used by grids of cards (homepage projects, vault). */
const CardSkeleton = () => (
	<div
		aria-hidden="true"
		className="animate-pulse w-full max-w-[345px] rounded-[10px] border border-[var(--shadow-color)] bg-[var(--bg-color)] shadow-sm shadow-[var(--shadow-color)] p-5 flex flex-col gap-3"
	>
		<div className={`${barClass} h-[15px] w-1/3`} />
		<div className="flex flex-col gap-2">
			<div className={`${barClass} h-[12px] w-full`} />
			<div className={`${barClass} h-[12px] w-11/12`} />
			<div className={`${barClass} h-[12px] w-3/5`} />
		</div>
		<div className="flex gap-2 flex-wrap">
			<div className={`${barClass} h-[20px] w-14`} />
			<div className={`${barClass} h-[20px] w-20`} />
			<div className={`${barClass} h-[20px] w-12`} />
		</div>
		<div className="flex justify-end border-t border-[var(--shadow-color)] pt-3">
			<div className={`${barClass} h-[12px] w-16`} />
		</div>
	</div>
);

/* Full-width row placeholder — used by the /admin projects list. */
const RowSkeleton = () => (
	<div
		aria-hidden="true"
		className="animate-pulse w-full rounded-[10px] border border-[var(--shadow-color)] bg-[var(--bg-color)] shadow-sm shadow-[var(--shadow-color)] px-5 py-4 flex items-center justify-between gap-4"
	>
		<div className="flex flex-col gap-2.5 min-w-0">
			<div className={`${barClass} h-[14px] w-56 max-w-full`} />
			<div className={`${barClass} h-[12px] w-40 max-w-full`} />
			<div className="flex items-center gap-3">
				<div className={`${barClass} h-[20px] w-20`} />
				<div className={`${barClass} h-[12px] w-44 max-w-full`} />
			</div>
		</div>
		<div className="flex items-center gap-2 shrink-0">
			<div className={`${barClass} h-8 w-8 rounded-full`} />
			<div className={`${barClass} h-8 w-8 rounded-full`} />
		</div>
	</div>
);

const ListSkeleton = ({
	variant = "card",
	count = 6,
}: {
	/* "card" mirrors grids of cards, "row" mirrors full-width list rows. */
	variant?: "card" | "row";
	count?: number;
}) => (
	<div
		className={
			variant === "row"
				? "w-full flex flex-col gap-3"
				: "w-full flex gap-5 flex-wrap justify-center md:justify-start"
		}
	>
		{Array.from({ length: count }, (_, i) =>
			variant === "row" ? <RowSkeleton key={i} /> : <CardSkeleton key={i} />,
		)}
	</div>
);

export default ListSkeleton;
