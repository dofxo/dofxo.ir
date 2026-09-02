import { MainContext } from "@/context";
import { useContext, useEffect, useState } from "react";
import { X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { adminCopy } from "./adminText";
import type { ProjectItem, ProjectPayload } from "@/types";

const inputClass =
	"w-full rounded-[10px] bg-[var(--hover-color)] text-[var(--text-color)] placeholder:text-[var(--text-secondary-color)] text-sm px-4 py-2.5 outline-none border border-transparent focus:border-[var(--primary)] transition";
const labelClass = "text-[var(--text-color)] text-[13px] font-medium mb-1.5 block";

const AdminProjectModal = ({
	project,
	onClose,
	onSave,
}: {
	project: ProjectItem | null;
	onClose: () => void;
	onSave: (payload: ProjectPayload) => Promise<boolean>;
}) => {
	const { lang } = useContext(MainContext);
	const t = adminCopy[lang];
	const isEdit = !!project;

	const [titleFa, setTitleFa] = useState("");
	const [titleEn, setTitleEn] = useState("");
	const [descriptionFa, setDescriptionFa] = useState("");
	const [descriptionEn, setDescriptionEn] = useState("");
	const [role, setRole] = useState("");
	const [websiteLink, setWebsiteLink] = useState("");
	const [sourceCode, setSourceCode] = useState("");
	const [skills, setSkills] = useState("");
	const [saving, setSaving] = useState(false);
	const [errors, setErrors] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (project) {
			setTitleFa(project.title.fa);
			setTitleEn(project.title.en);
			setDescriptionFa(project.description.fa);
			setDescriptionEn(project.description.en);
			setRole(project.role);
			setWebsiteLink(project.websiteLink ?? "");
			setSourceCode(project.sourceCode ?? "");
			setSkills((project.skills ?? []).join(", "));
		}
	}, [project]);

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
			titleFa: titleFa.trim().length === 0,
			titleEn: titleEn.trim().length === 0,
			descriptionFa: descriptionFa.trim().length === 0,
			descriptionEn: descriptionEn.trim().length === 0,
		};
		setErrors(nextErrors);
		if (Object.values(nextErrors).some(Boolean)) return;

		setSaving(true);
		try {
			const ok = await onSave({
				title: { fa: titleFa.trim(), en: titleEn.trim() },
				description: {
					fa: descriptionFa.trim(),
					en: descriptionEn.trim(),
				},
				role: role.trim(),
				websiteLink: websiteLink.trim() || undefined,
				sourceCode: sourceCode.trim() || undefined,
				skills: skills
					.split(",")
					.map((s) => s.trim())
					.filter(Boolean),
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
			<div className="w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-[20px] border border-[var(--shadow-color)] bg-[var(--bg-color)] shadow-xl p-6 md:p-7">
				<div className="flex items-center justify-between mb-5">
					<div className="flex items-center gap-2.5">
						<Briefcase size={20} color="var(--primary)" />
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
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className={labelClass}>{t.titleFa}</label>
							<input
								value={titleFa}
								onChange={(e) => {
									setTitleFa(e.target.value);
									setErrors((p) => ({ ...p, titleFa: false }));
								}}
								className={inputClass}
							/>
							{errors.titleFa && (
								<p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>
							)}
						</div>
						<div>
							<label className={labelClass}>{t.titleEn}</label>
							<input
								value={titleEn}
								onChange={(e) => {
									setTitleEn(e.target.value);
									setErrors((p) => ({ ...p, titleEn: false }));
								}}
								dir="ltr"
								className={`${inputClass} text-end`}
							/>
							{errors.titleEn && (
								<p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>
							)}
						</div>
					</div>

					<div>
						<label className={labelClass}>{t.descriptionFa}</label>
						<textarea
							value={descriptionFa}
							onChange={(e) => {
								setDescriptionFa(e.target.value);
								setErrors((p) => ({ ...p, descriptionFa: false }));
							}}
							rows={4}
							className={`${inputClass} resize-none`}
						/>
						{errors.descriptionFa && (
							<p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>
						)}
					</div>

					<div>
						<label className={labelClass}>{t.descriptionEn}</label>
						<textarea
							value={descriptionEn}
							onChange={(e) => {
								setDescriptionEn(e.target.value);
								setErrors((p) => ({ ...p, descriptionEn: false }));
							}}
							rows={4}
							dir="ltr"
							className={`${inputClass} resize-none text-end`}
						/>
						{errors.descriptionEn && (
							<p className="text-red-500 text-[11px] mt-1.5">{t.required}</p>
						)}
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className={labelClass}>{t.role}</label>
							<input
								value={role}
								onChange={(e) => setRole(e.target.value)}
								placeholder="Developer / FrontEnd Developer"
								className={inputClass}
							/>
						</div>
						<div>
							<label className={labelClass}>{t.skills}</label>
							<input
								value={skills}
								onChange={(e) => setSkills(e.target.value)}
								placeholder="React, TypeScript, Tailwind"
								dir="ltr"
								className={`${inputClass} text-end`}
							/>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<div>
							<label className={labelClass}>{t.websiteLink}</label>
							<input
								value={websiteLink}
								onChange={(e) => setWebsiteLink(e.target.value)}
								placeholder="https://..."
								dir="ltr"
								className={`${inputClass} text-end`}
							/>
						</div>
						<div>
							<label className={labelClass}>{t.sourceCode}</label>
							<input
								value={sourceCode}
								onChange={(e) => setSourceCode(e.target.value)}
								placeholder="https://github.com/..."
								dir="ltr"
								className={`${inputClass} text-end`}
							/>
						</div>
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

export default AdminProjectModal;
