/** 古いアップデートスクリプトを使うかどうか */
export const LEGACY_UPDATE = (Deno.env.get("LEGACY_UPDATE") ?? "") === "true";

export const LAKE_PACKAGE_DIRECTORY = Deno.env.get("LAKE_PACKAGE_DIRECTORY") ?? ".";