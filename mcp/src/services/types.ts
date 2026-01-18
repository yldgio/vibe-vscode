/**
 * Asset types supported by the MCP server.
 */
export type AssetType = "prompt" | "agent" | "instruction" | "skill" | "chatmode";

/**
 * Represents an AI customization asset.
 */
export interface Asset {
  /** Stable ID: "{type}:{relativePath}" */
  id: string;

  /** Asset type */
  type: AssetType;

  /** Human-readable name derived from filename */
  name: string;

  /** Repo-relative path */
  path: string;

  /** Locale code (e.g., "it") for localized variants */
  locale?: string;

  /** Raw file content */
  content: string;

  /** Content encoding */
  encoding: "utf-8" | "base64";

  /** Optional metadata extracted from frontmatter */
  metadata?: AssetMetadata;
}

/**
 * Optional metadata that may be extracted from asset frontmatter.
 */
export interface AssetMetadata {
  title?: string;
  description?: string;
  tags?: string[];
}

/**
 * Lightweight asset summary (without content).
 */
export interface AssetSummary {
  id: string;
  type: AssetType;
  name: string;
  path: string;
  locale?: string;
  description?: string;
}

/**
 * Tool input for list_assets.
 */
export interface ListAssetsInput {
  type?: AssetType;
  locale?: string;
}

/**
 * Tool output for list_assets.
 */
export interface ListAssetsOutput {
  assets: AssetSummary[];
  count: number;
}

/**
 * Tool input for get_asset.
 */
export interface GetAssetInput {
  id: string;
}

/**
 * Tool output for get_asset.
 */
export interface GetAssetOutput {
  id: string;
  type: AssetType;
  name: string;
  path: string;
  locale?: string;
  content: string;
  encoding: "utf-8" | "base64";
}

/**
 * Tool input for search_assets.
 */
export interface SearchAssetsInput {
  keywords: string;
  type?: AssetType;
}

/**
 * Tool output for search_assets.
 */
export interface SearchAssetsOutput {
  assets: AssetSummary[];
  count: number;
}
