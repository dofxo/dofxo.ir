import type { Credential, CredentialPayload } from "@/types";
import { supabase } from "@/lib/supabase";

const CREDENTIALS_TABLE = "credentials";
const SETTINGS_TABLE = "settings";
const UNLOCK_KEY = "dofxo.vault.unlocked";

const db = () => {
	if (!supabase) {
		throw new Error("Supabase is not configured.");
	}
	return supabase;
};

export type UnlockResult = { ok: true } | { ok: false; reason: "wrong" | "unset" | "error" };

export const isUnlocked = () => sessionStorage.getItem(UNLOCK_KEY) === "1";

export const markUnlocked = () => sessionStorage.setItem(UNLOCK_KEY, "1");

export const markLocked = () => sessionStorage.removeItem(UNLOCK_KEY);

const getVaultPassword = async (): Promise<string | null> => {
	const { data, error } = await db().from(SETTINGS_TABLE).select("*").eq("name", "vault_password").maybeSingle();
	if (error) throw error;
	return data?.value ?? null;
};

export const unlockVault = async (password: string): Promise<UnlockResult> => {
	try {
		const stored = await getVaultPassword();
		if (stored === null) return { ok: false, reason: "unset" };
		if (password !== stored) return { ok: false, reason: "wrong" };
		return { ok: true };
	} catch {
		return { ok: false, reason: "error" };
	}
};

interface CredentialRow {
	id: string;
	service: string;
	account: string;
	password: string;
	note: string | null;
	created_at: string;
	updated_at: string;
}

const toCredential = (row: CredentialRow): Credential => ({
	id: row.id,
	service: row.service,
	account: row.account,
	password: row.password,
	note: row.note ?? undefined,
	createdAt: Date.parse(row.created_at),
	updatedAt: Date.parse(row.updated_at),
});

export const fetchCredentials = async (): Promise<Credential[]> => {
	const { data, error } = await db().from(CREDENTIALS_TABLE).select("*").order("created_at", { ascending: false });
	if (error) throw error;
	return (data ?? []).map(toCredential);
};

export const createCredential = async (payload: CredentialPayload): Promise<Credential> => {
	const { data, error } = await db()
		.from(CREDENTIALS_TABLE)
		.insert({
			service: payload.service,
			account: payload.account,
			password: payload.password,
			note: payload.note || null,
		})
		.select()
		.single();
	if (error) throw error;
	return toCredential(data as CredentialRow);
};

export const updateCredential = async (id: string, payload: CredentialPayload): Promise<Credential> => {
	const { data, error } = await db()
		.from(CREDENTIALS_TABLE)
		.update({
			service: payload.service,
			account: payload.account,
			password: payload.password,
			note: payload.note || null,
			updated_at: new Date().toISOString(),
		})
		.eq("id", id)
		.select()
		.single();
	if (error) throw error;
	return toCredential(data as CredentialRow);
};

export const deleteCredential = async (id: string): Promise<void> => {
	const { error } = await db().from(CREDENTIALS_TABLE).delete().eq("id", id);
	if (error) throw error;
};
