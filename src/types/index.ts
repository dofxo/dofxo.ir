export interface projectType {
	title: { fa: string; en: string };
	description: { fa: string; en: string };
	role: string;
	websiteLink?: string;
	sourceCode?: string;
	skills?: string[];
}

export type projectsType = projectType[];
