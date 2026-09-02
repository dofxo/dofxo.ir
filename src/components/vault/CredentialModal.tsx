import { MainContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { X, Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { vaultCopy } from "./vaultText";
import type { Credential, CredentialPayload } from "@/types";

const serviceSuggestions = [
	"Steam",
	"Epic Games",
	"Rockstar",
	"PlayStation",
	"Xbox",
	"Gmail",
	"Discord",
	"GitHub",
	"Instagram",
	"X (Twitter)",
];

export type { CredentialPayload };

const inputClass =
	"w-full rounded-[10px] bg-[var(--hover-color)] text-[var(--text-color)] placeholder:text-[var(--text-secondary-color)] text-sm px-4 py-2.5 outline-none border border-transparent focus:border-[var(--primary)] transition";

const labelClass = "text-[var(--text-color)] text-[13px] font-medium mb-1.5 block";

const CredentialModal = ({
	credential,
	onClose,
	onSave,
}: {
	credential: Credential | null;
	onClose: () => void;
	onSave: (payload: CredentialPayload) => Promise<boolean>;
}) => {
	const { lang } = useContext(MainContext);
	const t = vaultCopy[lang];
	const isEdit = !!credential;

	const [service, setService] = useState("");
	const [account, setAccount] = useState("");
	const [password, setPassword] = useState("");
	const [note, setNote] = useState("");
	const [show, setShow] = useState(false);
	const [saving, setSaving] = useState(false);
	const [errors, setErrors] = useState<{ service?: boolean; account?: boolean; password?: boolean }>({});

	useEffect(() => {
		if (credential) {
			setService(credential.service);
			setAccount(credential.account);
			setPassword(credential.password);
			setNote(credential.note ?? "");
		}
	}, [credential]);

	useEffect(() => {
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [onClose]);

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		const nextErrors = {
			service: service.trim().length === 0,
			account: account.trim().length === 0,
			password: password.length === 0,
		};
		setErrors(nextErrors);
		if (nextErrors.service || nextErrors.account || nextErrors.password) return;

		setSaving(true);
		try {
			const ok = await onSave({
				service: service.trim(),
				account: account.trim(),
				password,
				note: note.trim(),
			});
			if (ok) onClose();
		} finally {
			setSaving(false);
		}
	};

	return (
		<div
			className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
			onMouseDown={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div className="w-full max-w-[430px] max-h-[88vh] overflow-y-auto rounded-[20px] border border-[var(--shadow-color)] bg-[var(--bg-color)] shadow-xl p-6 md:p-7">
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center gap-2.5">
						<KeyRound size={20} color="var(--primary)" />
						<h3 className="text-[var(--text-color)] font-bold text-[16px]">
							{isEdit ? t.editTitle : t.addTitle}
						</h3>
					</div>
					<button
						onClick={onClose}
						aria-label="close"
						className="p-1.5 rounded-full hover:bg-[var(--hover-color)] transition"
					>
						<X size={18} color="var(--text-secondary-color)" />
					</button>
				</div>

				<form onSubmit={submit} className="flex flex-col gap-4">
					<div>
						<label className={labelClass}>{t.service}</label>
						<input
							value={service}
							onChange={(e) => {
								setService(e.target.value);
								setErrors((p) => ({ ...p, service: false }));
							}}
							placeholder="Steam / Rockstar / Gmail..."
							list="vault-service-suggestions"
							className={inputClass}
							autoFocus
						/>
						<datalist id="vault-service-suggestions">
							{serviceSuggestions.map((s) => (
								<option key={s} value={s} />
							))}
						</datalist>
						{errors.service && <p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>}
					</div>

					<div>
						<label className={labelClass}>{t.account}</label>
						<input
							value={account}
							onChange={(e) => {
								setAccount(e.target.value);
								setErrors((p) => ({ ...p, account: false }));
							}}
							placeholder="name@email.com / username"
							dir="ltr"
							className={`${inputClass} text-end`}
						/>
						{errors.account && <p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>}
					</div>

					<div>
						<label className={labelClass}>{t.password}</label>
						<div className="relative">
							<input
								type={show ? "text" : "password"}
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
									setErrors((p) => ({ ...p, password: false }));
								}}
								placeholder="••••••••"
								dir="ltr"
								className={`${inputClass} pe-11`}
							/>
							<button
								type="button"
								onClick={() => setShow((s) => !s)}
								aria-label={show ? t.hidePassword : t.showPassword}
								className="absolute end-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-[var(--badge-bg-color)] transition"
							>
								{show ? (
									<EyeOff size={17} color="var(--text-secondary-color)" />
								) : (
									<Eye size={17} color="var(--text-secondary-color)" />
								)}
							</button>
						</div>
						{errors.password && <p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>}
					</div>

					<div>
						<label className={labelClass}>{t.noteOptional}</label>
						<textarea
							value={note}
							onChange={(e) => setNote(e.target.value)}
							rows={2}
							placeholder={t.note}
							className={`${inputClass} resize-none`}
						/>
					</div>

					<div className="flex items-center justify-end gap-3 mt-2">
					<Button
						type="button"
						variant="ghost"
						onClick={onClose}
						disabled={saving}
						className="text-[var(--text-color)] hover:bg-[var(--hover-color)]"
					>
						{t.cancel}
					</Button>
					<Button
						type="submit"
						disabled={saving}
						className="rounded-[20px] bg-[var(--primary)] text-[var(--button-text-color)] hover:opacity-90"
					>
						{saving ? t.loading : t.save}
					</Button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CredentialModal;
