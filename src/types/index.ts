export interface projectType {
	title: { fa: string; en: string };
	description: { fa: string; en: string };
	role: string;
	websiteLink?: string;
	sourceCode?: string;
	skills?: string[];
}

export type projectsType = projectType[];

export interface Credential {
	id: string;
	service: string;
	account: string;
	password: string;
	note?: string;
	createdAt: number;
	updatedAt: number;
}

export interface CredentialPayload {
	service: string;
	account: string;
	password: string;
	note: string;
}
