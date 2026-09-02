import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { MainContext } from "@/context";
import {
	Plus,
	Search,
	Unlock,
	KeyRound,
	LockKeyhole,
	Loader2,
	AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import CredentialCard from "./CredentialCard";
import CredentialModal from "./CredentialModal";
import { vaultCopy } from "./vaultText";
import {
	createCredential,
	deleteCredential,
	fetchCredentials,
	updateCredential,
} from "./vaultStorage";
import type { Credential, CredentialPayload } from "@/types";

const VaultDashboard = ({ onLock }: { onLock: () => void }) => {
	const { lang } = useContext(MainContext);
	const t = vaultCopy[lang];

	const [credentials, setCredentials] = useState<Credential[]>([]);
	const [loading, setLoading] = useState(true);
	const [dbError, setDbError] = useState(false);
	const [query, setQuery] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [editing, setEditing] = useState<Credential | null>(null);

	const load = useCallback(async () => {
		setLoading(true);
		setDbError(false);
		try {
			const list = await fetchCredentials();
			setCredentials(list);
		} catch {
			setDbError(true);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return credentials;
		return credentials.filter(
			(c) =>
				c.service.toLowerCase().includes(q) ||
				c.account.toLowerCase().includes(q),
		);
	}, [credentials, query]);

	const openAdd = () => {
		setEditing(null);
		setModalOpen(true);
	};

	const openEdit = (credential: Credential) => {
		setEditing(credential);
		setModalOpen(true);
	};

	const handleSave = async (payload: CredentialPayload): Promise<boolean> => {
		try {
			if (editing) {
				const updated = await updateCredential(editing.id, payload);
				setCredentials((prev) =>
					prev.map((c) => (c.id === updated.id ? updated : c)),
				);
			} else {
				const created = await createCredential(payload);
				setCredentials((prev) => [created, ...prev]);
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
			await deleteCredential(id);
			setCredentials((prev) => prev.filter((c) => c.id !== id));
			setDbError(false);
		} catch {
			setDbError(true);
		}
	};

	return (
		<div className="w-full flex flex-col gap-6">
			{/* header row */}
			<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<h2 className="title">
						<KeyRound size={20} color="var(--primary)" />
						<span>{t.credentials}</span>
					</h2>
					<span className="rounded-full bg-[var(--badge-bg-color)] text-[var(--text-color)] text-[11px] font-bold px-3 py-1">
						{t.credentialCount(credentials.length)}
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

			{/* search */}
			<div className="relative w-full md:max-w-sm">
				<Search
					size={16}
					color="var(--text-secondary-color)"
					className="absolute start-3.5 top-1/2 -translate-y-1/2"
				/>
				<input
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder={t.searchPlaceholder}
					className="w-full rounded-full bg-[var(--hover-color)] text-[var(--text-color)] placeholder:text-[var(--text-secondary-color)] text-sm ps-10 pe-4 py-2.5 outline-none border border-transparent focus:border-[var(--primary)] transition"
				/>
			</div>

			{/* db error banner */}
			{dbError && credentials.length > 0 && (
				<div className="flex items-center justify-between gap-3 rounded-[10px] border border-red-300 bg-red-50 dark:bg-red-950/30 px-4 py-3">
					<div className="flex items-center gap-2 min-w-0">
						<AlertTriangle size={16} className="text-red-500 shrink-0" />
						<p className="text-red-500 text-[12px] leading-5">{t.dbError}</p>
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
				<div className="w-full py-16 flex items-center justify-center">
					<Loader2 size={26} color="var(--primary)" className="animate-spin" />
				</div>
			) : dbError && credentials.length === 0 ? (
				<div className="w-full rounded-[16px] border border-red-300 bg-red-50 dark:bg-red-950/30 py-14 flex flex-col items-center gap-4 text-center px-6">
					<div className="w-[64px] h-[64px] rounded-full bg-[var(--badge-bg-color)] flex items-center justify-center">
						<AlertTriangle size={26} color="#ef4444" />
					</div>
					<p className="text-red-500 text-[12px] leading-5 max-w-[320px]">
						{t.dbError}
					</p>
					<Button
						onClick={load}
						variant="outline"
						className="rounded-full text-red-500 border-red-300 hover:bg-red-100 dark:hover:bg-red-900/40"
					>
						{t.retry}
					</Button>
				</div>
			) : filtered.length === 0 ? (
				<div className="w-full rounded-[16px] border border-dashed border-[var(--shadow-color)] py-16 flex flex-col items-center gap-4 text-center px-6">
					<div className="w-[64px] h-[64px] rounded-full bg-[var(--badge-bg-color)] flex items-center justify-center">
						<LockKeyhole size={28} color="var(--text-secondary-color)" />
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
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
					{filtered.map((c) => (
						<CredentialCard
							key={c.id}
							credential={c}
							onEdit={() => openEdit(c)}
							onDelete={() => handleDelete(c.id)}
						/>
					))}
				</div>
			)}

			{modalOpen && (
				<CredentialModal
					credential={editing}
					onClose={() => setModalOpen(false)}
					onSave={handleSave}
				/>
			)}
		</div>
	);
};

export default VaultDashboard;
