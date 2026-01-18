import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import type { Dirent } from "node:fs";
import type { AssetType } from "./types.js";

/**
 * Discovered file with its asset type and repo-relative path.
 */
export interface DiscoveredFile {
  /** Absolute path to the file */
  absolutePath: string;
  /** Repo-relative path using forward slashes (e.g., ".github/prompts/code-review.prompt.md") */
  relativePath: string;
  /** Asset type derived from the file location */
  type: AssetType;
}

/**
 * Asset discovery configuration.
 */
interface AssetConfig {
  dir: string;
  pattern: RegExp;
  recursive: boolean;
}

/**
 * Get asset discovery configuration for a given type.
 * Uses switch statement to avoid object injection sink.
 */
function getAssetConfig(type: AssetType): AssetConfig {
  switch (type) {
    case "prompt":
      return {
        dir: ".github/prompts",
        pattern: /\.prompt\.md$/,
        recursive: false,
      };
    case "agent":
      return {
        dir: ".github/agents",
        pattern: /\.agent\.md$/,
        recursive: false,
      };
    case "instruction":
      return {
        dir: ".github/instructions",
        pattern: /\.instructions\.md$/,
        recursive: false,
      };
    case "skill":
      return {
        dir: ".github/skills",
        pattern: /SKILL\.md$/,
        recursive: true,
      };
  }
}

/**
 * All supported asset types.
 */
const ASSET_TYPES: readonly AssetType[] = ["prompt", "agent", "instruction", "skill"] as const;

/**
 * Convert Windows path separators to forward slashes for consistent IDs.
 */
function toForwardSlashes(path: string): string {
  return path.replace(/\\/g, "/");
}

/**
 * Check if an error is a "directory not found" error.
 */
function isNotFoundError(error: unknown): boolean {
  return error instanceof Error && "code" in error && error.code === "ENOENT";
}

/**
 * Recursively find all files matching a pattern in a directory.
 */
async function findFilesRecursive(
  dir: string,
  pattern: RegExp,
  files: string[] = []
): Promise<string[]> {
  let entries: Dirent[];
  try {
    // Path is constructed from known constants - only scans .github asset directories
    // nosemgrep: javascript.lang.security.audit.path-traversal.path-traversal-non-literal-fs-access
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      // Directory doesn't exist - this is expected for optional directories
      return files;
    }
    // Log unexpected errors (permissions, I/O, etc.)
    console.error(`Error reading directory ${dir}:`, error);
    return files;
  }

  for (const entry of entries) {
    const entryName = entry.name as string;
    const fullPath = join(dir, entryName);
    if (entry.isDirectory()) {
      await findFilesRecursive(fullPath, pattern, files);
    } else if (entry.isFile() && pattern.test(entryName)) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Find all files in a directory matching a pattern (non-recursive).
 */
async function findFilesFlat(dir: string, pattern: RegExp): Promise<string[]> {
  const files: string[] = [];

  let entries: Dirent[];
  try {
    // Path is constructed from known constants - only scans .github asset directories
    // nosemgrep: javascript.lang.security.audit.path-traversal.path-traversal-non-literal-fs-access
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      // Directory doesn't exist - this is expected for optional directories
      return files;
    }
    // Log unexpected errors (permissions, I/O, etc.)
    console.error(`Error reading directory ${dir}:`, error);
    return files;
  }

  for (const entry of entries) {
    const entryName = entry.name as string;
    if (entry.isFile() && pattern.test(entryName)) {
      files.push(join(dir, entryName));
    }
  }

  return files;
}

/**
 * Discover all asset files of a specific type in the repository.
 */
async function discoverAssetType(
  repoRoot: string,
  assetType: AssetType
): Promise<DiscoveredFile[]> {
  const config = getAssetConfig(assetType);
  const assetDir = join(repoRoot, config.dir);

  const absolutePaths = config.recursive
    ? await findFilesRecursive(assetDir, config.pattern)
    : await findFilesFlat(assetDir, config.pattern);

  return absolutePaths.map((absolutePath) => ({
    absolutePath,
    relativePath: toForwardSlashes(relative(repoRoot, absolutePath)),
    type: assetType,
  }));
}

/**
 * Discover all asset files in the repository.
 * Scans all known asset directories and returns discovered files.
 */
export async function discoverAssets(repoRoot: string): Promise<DiscoveredFile[]> {
  const results = await Promise.all(
    ASSET_TYPES.map((type) => discoverAssetType(repoRoot, type))
  );

  return results.flat();
}

/**
 * Discover assets of a specific type.
 */
export async function discoverAssetsByType(
  repoRoot: string,
  type: AssetType
): Promise<DiscoveredFile[]> {
  return discoverAssetType(repoRoot, type);
}
