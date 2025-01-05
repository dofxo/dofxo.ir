export interface projectType {
  title: string;
  description: string;
  role: string;
  websiteLink?: string;
  sourceCode?: string;
  skills?: string[];
}

export type projectsType = projectType[];
