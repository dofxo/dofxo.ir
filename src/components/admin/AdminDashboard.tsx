import { useCallback, useContext, useEffect, useState } from "react";
import { MainContext } from "@/context";
import {
	Plus,
	Unlock,
	FolderKanban,
	AlertTriangle,
	Pencil,
	Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminProjectModal from "./AdminProjectModal";
import { adminCopy } from "./adminText";
import ListSkeleton from "../general/ListSkeleton";
import {
	createProject,
	deleteProject,
	fetchProjects,
	updateProject,
} from "@/lib/projects";
import type { ProjectItem, ProjectPayload } from "@/types";

const AdminDashboard = ({ onLock }: { onLock: () => void }) => {
	const { lang } = useContext(MainContext);
	const t = adminCopy[lang];

	const [projects, setProjects] = useState<ProjectItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [dbError, setDbError] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<ProjectItem | null>(null);
	const [confirmingId, setConfirmingId] = useState<string | null>(null);

	const load = useCallback(async () => {
		setLoading(true);
		setDbError(false);
		try {
			const list = await fetchProjects();
			setProjects(list);
		} catch {
			setDbError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const openAdd = () => {
		setEditing(null);
		setModalOpen(true);
	};

	const openEdit = (project: ProjectItem) => {
		setEditing(project);
		setModalOpen(true);
	};

	const handleSave = async (payload: ProjectPayload): Promise<boolean> => {
		try {
			if (editing) {
				const updated = await updateProject(editing.id, payload);
				setProjects((prev) =>
					prev.map((p) => (p.id === updated.id ? updated : p)),
				);
			} else {
				const created = await createProject(payload);
				setProjects((prev) => [...prev, created]);
			}
			setDbError(false);
			return true;
		} catch {
			setDbError(true);
			return false;
		}
	};

	const handleDelete = async (id: string) => {
		try {
			await deleteProject(id);
			setProjects((prev) => prev.filter((p) => p.id !== id));
			setDbError(false);
		} catch {
			setDbError(true);
		}
		setConfirmingId(null);
	};

	return (
		<div className="w-full flex flex-col gap-6">
			{/* header row */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<h2 className="title">
						<FolderKanban size={20} color="var(--primary)" />
						<span>{t.projects}</span>
					</h2>
					<span className="rounded-full bg-[var(--badge-bg-color)] text-[var(--text-color)] text-[11px] font-bold px-3 py-1">
						{t.projectCount(projects.length)}
					</span>
				</div>

				<div className="flex items-center gap-2.5">
					<Button
						variant="ghost"
						onClick={onLock}
						className="text-[var(--text-color)] hover:bg-[var(--hover-color)] rounded-full"
					>
						<Unlock size={16} />
						<span>{t.lock}</span>
					</Button>
					<Button
						onClick={openAdd}
						className="rounded-full bg-[var(--primary)] text-[var(--button-text-color)] hover:opacity-90"
					>
						<Plus size={16} />
						<span>{t.add}</span>
					</Button>
				</div>
			</div>

			{/* db error banner */}
			{dbError && projects.length > 0 && (
				<div className="flex items-center justify-between gap-3 rounded-[10px] border border-red-300 bg-red-50 dark:bg-red-950/30 px-4 py-3">
					<div className="flex items-center gap-2 min-w-0">
						<AlertTriangle size={16} className="text-red-500 shrink-0" />
						<p className="text-red-500 text-[12px] leading-5">{t.error}</p>
					</div>
					<button
						type="button"
						onClick={load}
						className="shrink-0 text-red-500 border border-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full px-3 py-1 text-[11px] font-bold transition"
					>
						{t.retry}
					</button>
				</div>
			)}

			{/* list */}
			{loading ? (
				<ListSkeleton variant="row" count={6} />
			) : dbError && projects.length === 0 ? (
				<div className="w-full rounded-[16px] border border-red-300 bg-red-50 dark:bg-red-950/30 py-14 flex flex-col items-center gap-4 text-center px-6">
					<div className="w-[64px] h-[64px] rounded-full bg-[var(--badge-bg-color)] flex items-center justify-center">
						<AlertTriangle size={26} color="#ef4444" />
					</div>
					<p className="text-red-500 text-[12px] leading-5 max-w-[320px]">
						{t.error}
					</p>
					<Button
						onClick={load}
						variant="outline"
						className="rounded-full text-red-500 border-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
					>
						{t.retry}
					</Button>
				</div>
			) : projects.length === 0 ? (
				<div className="w-full rounded-[16px] border border-dashed border-[var(--shadow-color)] py-16 flex flex-col items-center gap-4 text-center px-6">
					<div className="w-[64px] h-[64px] rounded-full bg-[var(--badge-bg-color)] flex items-center justify-center">
						<FolderKanban size={28} color="var(--text-secondary-color)" />
					</div>
					<p className="text-[var(--text-secondary-color)] text-[12px] leading-5 max-w-[320px]">
						{t.empty}
					</p>
					<Button
						onClick={openAdd}
						variant="outline"
						className="rounded-full text-[var(--text-color)] border-[var(--shadow-color)]"
					>
						<Plus size={15} color="var(--primary)" />
						<span>{t.add}</span>
					</Button>
				</div>
			) : (
				<div className="flex flex-col gap-3 w-full">
					{projects.map((p) => (
						<div
							key={p.id}
							className="rounded-[10px] border border-[var(--shadow-color)] bg-[var(--bg-color)] px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between shadow-sm shadow-[var(--shadow-color)]"
						>
							<div className="min-w-0 flex flex-col gap-1.5">
								<div className="flex flex-wrap items-center gap-x-4 gap-y-1">
									<span className="flex items-center gap-1.5 min-w-0">
										<span className="shrink-0 rounded-md bg-[var(--badge-bg-color)] text-[var(--text-secondary-color)] text-[10px] font-bold px-1.5 py-0.5 uppercase">
											fa
										</span>
										<span className="text-[var(--text-color)] font-bold text-[14px] truncate">
											{p.title.fa}
										</span>
									</span>
									<span className="flex items-center gap-1.5 min-w-0">
										<span className="shrink-0 rounded-md bg-[var(--badge-bg-color)] text-[var(--text-secondary-color)] text-[10px] font-bold px-1.5 py-0.5 uppercase">
											en
										</span>
										<span className="text-[var(--text-secondary-color)] font-normal text-[12px] truncate">
											{p.title.en}
										</span>
									</span>
								</div>
								<p className="flex items-center gap-2.5 min-w-0">
									<span className="shrink-0 rounded-full border border-[var(--shadow-color)] bg-[var(--badge-bg-color)] text-[var(--text-color)] text-[11px] font-medium px-2.5 py-0.5">
										{p.role}
									</span>
									{p.websiteLink && (
										<a
											href={p.websiteLink}
											target="_blank"
											rel="noopener noreferrer"
											className="truncate text-[var(--text-secondary-color)] text-[12px] hover:text-[var(--primary)] hover:underline underline-offset-2 transition"
										>
											{p.websiteLink}
										</a>
									)}
								</p>
							</div>

							{confirmingId === p.id ? (
								<div className="flex items-center gap-2 shrink-0 rounded-full border border-red-300 bg-red-50 dark:bg-red-950/30 px-3 py-1.5">
									<span className="text-red-500 text-[12px] font-medium">
										{t.deleteQuestion}
									</span>
									<button
										type="button"
										onClick={() => handleDelete(p.id)}
										className="text-red-500 border border-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full px-2.5 py-0.5 text-[11px] font-bold transition"
									>
										{t.yesDelete}
									</button>
									<button
										type="button"
										onClick={() => setConfirmingId(null)}
										className="text-[var(--text-secondary-color)] hover:bg-[var(--badge-bg-color)] rounded-full px-2.5 py-0.5 text-[11px] font-bold transition"
									>
										{t.noDelete}
									</button>
								</div>
							) : (
								<div className="flex items-center gap-1 shrink-0">
									<button
										type="button"
										onClick={() => openEdit(p)}
										aria-label={t.edit}
										className="p-2 rounded-full hover:bg-[var(--hover-color)] transition"
									>
										<Pencil size={15} color="var(--text-secondary-color)" />
									</button>
									<button
										type="button"
										onClick={() => setConfirmingId(p.id)}
										aria-label={t.delete}
										className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/40 transition"
									>
										<Trash2 size={15} color="#ef4444" />
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			)}

			{modalOpen && (
				<AdminProjectModal
					project={editing}
					onClose={() => setModalOpen(false)}
					onSave={handleSave}
				/>
			)}
		</div>
	);
};

export default AdminDashboard;
