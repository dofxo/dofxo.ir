import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainContext } from "@/context";
import { ShieldCheck } from "lucide-react";
import VaultGate from "./VaultGate";
import VaultDashboard from "./VaultDashboard";
import { vaultCopy } from "./vaultText";
import { isUnlocked, markLocked, markUnlocked } from "./vaultStorage";

const VaultPage = () => {
	const { lang } = useContext(MainContext);
	const t = vaultCopy[lang];

	const [unlocked, setUnlocked] = useState(() => isUnlocked());

	const handleUnlock = () => {
		markUnlocked();
		setUnlocked(true);
	};

	const handleLock = () => {
		markLocked();
		setUnlocked(false);
	};

	return (
		<main className="pb-14">
			<Helmet>
				<title>{t.docTitle}</title>
			</Helmet>

			<div className="container my-[60px] flex flex-col items-center gap-10">
				<div className="flex flex-col items-center gap-3 text-center">
					<div className="flex items-center gap-2.5">
						<ShieldCheck size={26} color="var(--primary)" />
						<h1 className="text-[var(--text-color)] font-bold text-[24px] md:text-[28px]">
							{t.title}
						</h1>
					</div>
					<p className="text-[var(--text-secondary-color)] text-[13px] leading-6 max-w-[420px]">
						{t.subtitle}
					</p>
				</div>

				{unlocked ? (
					<VaultDashboard onLock={handleLock} />
				) : (
					<VaultGate onUnlock={handleUnlock} />
				)}
			</div>
		</main>
	);
};

export default VaultPage;
