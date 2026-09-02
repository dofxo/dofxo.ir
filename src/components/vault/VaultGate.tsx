import { MainContext } from "@/context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSupabaseConfigured } from "@/lib/supabase";
import { unlockVault } from "./vaultStorage";
import { vaultCopy } from "./vaultText";

const VaultGate = ({ onUnlock }: { onUnlock: () => void }) => {
	const { lang } = useContext(MainContext);
	const t = vaultCopy[lang];

	const [value, setValue] = useState("");
	const [show, setShow] = useState(false);
	const [busy, setBusy] = useState(false);
	const [failReason, setFailReason] = useState<null | "wrong" | "unset" | "error">(null);

	const ready = isSupabaseConfigured();

	const submit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!ready || busy) return;
		setBusy(true);
		setFailReason(null);
		const result = await unlockVault(value);
		setBusy(false);
		if (result.ok) {
			onUnlock();
		} else {
			setFailReason(result.reason);
			setValue("");
		}
	};

	const failText =
		failReason === "wrong"
			? t.wrongPassword
			: failReason === "unset"
				? t.vaultNotSet
				: failReason === "error"
					? t.cannotConnect
					: null;

	return (
		<div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
			<div className="w-full max-w-[420px] rounded-[20px] border border-[var(--shadow-color)] shadow-lg shadow-[var(--shadow-color)] bg-[var(--bg-color)] px-6 py-9 md:p-10 flex flex-col items-center gap-6 text-center">
				<div className="w-[72px] h-[72px] rounded-full bg-[var(--badge-bg-color)] flex items-center justify-center">
					<Lock size={30} color="var(--primary)" />
				</div>

				<div>
					<h2 className="text-[var(--text-color)] font-bold text-[20px]">{t.restricted}</h2>
					<p className="text-[var(--text-secondary-color)] text-[13px] leading-6 mt-2 max-w-[300px]">
						{t.hint}
					</p>
				</div>

				{!ready && (
					<div className="w-full flex items-start gap-2 rounded-[10px] border border-red-300 bg-red-50 dark:bg-red-950/30 px-3.5 py-3 text-start">
						<AlertTriangle size={16} className="shrink-0 mt-0.5 text-red-500" />
						<p className="text-red-500 text-[12px] leading-5">{t.notConfigured}</p>
					</div>
				)}

				<form onSubmit={submit} className="w-full flex flex-col gap-4">
					<div className="relative">
						<input
							type={show ? "text" : "password"}
							value={value}
							onChange={(e) => {
								setValue(e.target.value);
								setFailReason(null);
							}}
							placeholder={t.passwordPlaceholder}
							autoFocus
							className="w-full rounded-[10px] bg-[var(--hover-color)] text-[var(--text-color)] placeholder:text-[var(--text-secondary-color)] text-sm px-4 py-2.5 pe-11 outline-none border border-transparent focus:border-[var(--primary)] transition"
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

					{failText && (
						<p className="text-red-500 text-[12px] -mt-2 text-start">{failText}</p>
					)}

					<Button
						type="submit"
						disabled={!ready || busy || value.length === 0}
						className="w-full rounded-[20px] bg-[var(--primary)] text-[var(--button-text-color)] hover:opacity-90"
					>
						{busy ? t.loading : t.unlock}
					</Button>
				</form>

				<Link
					to="/"
					className="text-[var(--text-secondary-color)] text-xs underline underline-offset-4 hover:text-[var(--primary)] transition"
				>
					{t.backHome}
				</Link>
			</div>
		</div>
	);
};

export default VaultGate;
