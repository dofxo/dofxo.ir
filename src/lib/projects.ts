import type { ProjectItem, ProjectPayload } from "@/types";
import { supabase } from "./supabase";

const TABLE = "projects";

const db = () => {
	if (!supabase) {
		throw new Error("Supabase is not configured.");
	}
	return supabase;
};

interface ProjectRow {
	id: string;
	title_fa: string;
	title_en: string;
	description_fa: string;
	description_en: string;
	role: string;
	website_link: string | null;
	source_code: string | null;
	skills: string[] | null;
}

const rowToItem = (row: ProjectRow): ProjectItem => ({
	id: row.id,
	title: { fa: row.title_fa, en: row.title_en },
	description: { fa: row.description_fa, en: row.description_en },
	role: row.role,
	websiteLink: row.website_link ?? undefined,
	sourceCode: row.source_code ?? undefined,
	skills: row.skills ?? undefined,
});

const toRow = (payload: ProjectPayload, sortOrder?: number) => ({
	title_fa: payload.title.fa,
	title_en: payload.title.en,
	description_fa: payload.description.fa,
	description_en: payload.description.en,
	role: payload.role,
	website_link: payload.websiteLink?.trim() || null,
	source_code: payload.sourceCode?.trim() || null,
	skills: payload.skills?.length ? payload.skills : [],
	...(sortOrder !== undefined ? { sort_order: sortOrder } : {}),
});

export const fetchProjects = async (): Promise<ProjectItem[]> => {
	const { data, error } = await db()
		.from(TABLE)
		.select("*")
		.order("sort_order", { ascending: true })
		.order("created_at", { ascending: true });
	if (error) throw error;
	return (data ?? []).map(rowToItem);
};

const maxSortOrder = async (): Promise<number> => {
	const { data, error } = await db()
		.from(TABLE)
		.select("sort_order")
		.order("sort_order", { ascending: false })
		.limit(1)
		.maybeSingle();
	if (error) throw error;
	return data?.sort_order ?? -1;
};

export const createProject = async (
	payload: ProjectPayload,
): Promise<ProjectItem> => {
	const sortOrder = (await maxSortOrder()) + 1;
	const { data, error } = await db()
		.from(TABLE)
		.insert(toRow(payload, sortOrder))
		.select()
		.single();
	if (error) throw error;
	return rowToItem(data as ProjectRow);
};

export const updateProject = async (
	id: string,
	payload: ProjectPayload,
): Promise<ProjectItem> => {
	const { data, error } = await db()
		.from(TABLE)
		.update({ ...toRow(payload), updated_at: new Date().toISOString() })
		.eq("id", id)
		.select()
		.single();
	if (error) throw error;
	return rowToItem(data as ProjectRow);
};

export const deleteProject = async (id: string): Promise<void> => {
	const { error } = await db().from(TABLE).delete().eq("id", id);
	if (error) throw error;
};
