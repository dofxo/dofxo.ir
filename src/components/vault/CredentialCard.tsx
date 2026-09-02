import { useContext, useState } from "react";
import { MainContext } from "@/context";
import { Copy, Check, Eye, EyeOff, Pencil, Trash2, Lock } from "lucide-react";
import { vaultCopy } from "./vaultText";
import type { Credential } from "@/types";

const palette = ["#1F509A", "#0e9f6e", "#b91c1c", "#6d28d9", "#b45309", "#0e7490", "#be185d", "#4d7c0f"];

const colorFor = (service: string) => {
	const sum = Array.from(service).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
	return palette[sum % palette.length];
};

const masked = (password: string) =>
	password.length > 24 ? "•".repeat(24) + "…" : "•".repeat(password.length);

const CredentialCard = ({
	credential,
	onEdit,
	onDelete,
}: {
	credential: Credential;
	onEdit: () => void;
	onDelete: () => void;
}) => {
	const { lang } = useContext(MainContext);
	const t = vaultCopy[lang];

	const [revealed, setRevealed] = useState(false);
	const [copied, setCopied] = useState(false);
	const [confirming, setConfirming] = useState(false);

	const copyPassword = async () => {
		try {
			await navigator.clipboard.writeText(credential.password);
		} catch {
			/* clipboard unavailable — ignore */
		}
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	};

	return (
		<div className="rounded-[10px] border border-[var(--shadow-color)] bg-[var(--bg-color)] p-5 flex flex-col gap-4 shadow-sm shadow-[var(--shadow-color)]">
			<div className="flex items-center gap-3 min-w-0">
				<div
					className="w-11 h-11 rounded-[12px] flex items-center justify-center shrink-0 text-white font-bold text-[16px]"
					style={{ backgroundColor: colorFor(credential.service) }}
				>
					{(credential.service.trim()[0] ?? "?").toUpperCase()}
				</div>
				<div className="min-w-0">
					<h4 className="text-[var(--text-color)] font-bold text-[15px] truncate">
						{credential.service}
					</h4>
					<p className="text-[var(--text-secondary-color)] text-[12px] truncate mt-0.5">
						{credential.account}
					</p>
				</div>
			</div>

			<div className="rounded-[10px] bg-[var(--hover-color)] px-3.5 py-2.5 flex items-center gap-2">
				<Lock size={14} color="var(--text-secondary-color)" className="shrink-0" />
				<p
					dir="ltr"
					className="flex-1 min-w-0 text-[var(--text-color)] text-[13px] font-medium truncate"
					title={revealed ? credential.password : undefined}
				>
					{revealed ? credential.password : masked(credential.password)}
				</p>
				<button
					onClick={() => setRevealed((r) => !r)}
					aria-label={revealed ? t.hidePassword : t.showPassword}
					className="p-1.5 rounded-full hover:bg-[var(--badge-bg-color)] transition shrink-0"
				>
					{revealed ? (
						<EyeOff size={15} color="var(--text-secondary-color)" />
					) : (
						<Eye size={15} color="var(--text-secondary-color)" />
					)}
				</button>
				<button
					onClick={copyPassword}
					aria-label={t.copyPassword}
					className="p-1.5 rounded-full hover:bg-[var(--badge-bg-color)] transition shrink-0"
				>
					{copied ? (
						<Check size={15} color="var(--primary)" />
					) : (
						<Copy size={15} color="var(--text-secondary-color)" />
					)}
				</button>
			</div>

			{credential.note && (
				<p className="text-[var(--text-secondary-color)] text-[12px] leading-5 border-s-2 border-[var(--primary)] ps-2.5">
					{credential.note}
				</p>
			)}

			{confirming ? (
				<div className="mt-auto rounded-[10px] border border-red-300 bg-red-50 dark:bg-red-950/30 px-3.5 py-3 flex items-center justify-between gap-2">
					<p className="text-red-500 text-[12px] font-medium">{t.deleteQuestion}</p>
					<div className="flex items-center gap-1.5 shrink-0">
						<button
							onClick={() => {
								onDelete();
								setConfirming(false);
							}}
							className="text-red-500 border border-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-full px-2.5 py-1 text-[11px] font-bold transition"
						>
							{t.yesDelete}
						</button>
						<button
							onClick={() => setConfirming(false)}
							className="text-[var(--text-secondary-color)] hover:bg-[var(--badge-bg-color)] rounded-full px-2.5 py-1 text-[11px] font-bold transition"
						>
							{t.noDelete}
						</button>
					</div>
				</div>
			) : (
				<div className="mt-auto flex items-center justify-end border-t border-[var(--shadow-color)] pt-3">
					<div className="flex items-center gap-1">
						<button
							onClick={onEdit}
							aria-label={t.edit}
							className="p-2 rounded-full hover:bg-[var(--hover-color)] transition"
						>
							<Pencil size={15} color="var(--text-secondary-color)" />
						</button>
						<button
							onClick={() => setConfirming(true)}
							aria-label={t.delete}
							className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-950/40 transition"
						>
							<Trash2 size={15} color="#ef4444" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CredentialCard;
