import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { MainContext } from "@/context";
import { LayoutDashboard } from "lucide-react";
import VaultGate from "@/components/vault/VaultGate";
import AdminDashboard from "./AdminDashboard";
import { adminCopy } from "./adminText";
import { isUnlocked, markLocked, markUnlocked } from "@/components/vault/vaultStorage";

const AdminPage = () => {
	const { lang } = useContext(MainContext);
	const t = adminCopy[lang];

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
		<main>
			<Helmet>
				<title>{t.docTitle}</title>
			</Helmet>

			<div className="container pt-[50px] pb-[60px] flex flex-col items-center gap-10">
				<div className="flex flex-col items-center gap-3 text-center">
					<div className="flex items-center gap-2.5">
						<LayoutDashboard size={26} color="var(--primary)" />
						<h1 className="text-[var(--text-color)] font-bold text-[24px] md:text-[28px]">
							{t.title}
						</h1>
					</div>
					<p className="text-[var(--text-secondary-color)] text-[13px] leading-6 max-w-[420px]">
						{t.subtitle}
					</p>
				</div>

				{unlocked ? (
					<AdminDashboard onLock={handleLock} />
				) : (
					<VaultGate onUnlock={handleUnlock} />
				)}
			</div>
		</main>
	);
};

export default AdminPage;
