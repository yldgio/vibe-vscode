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
 * Asset discovery patterns per type.
 */
const ASSET_PATTERNS: Record<AssetType, { dir: string; pattern: RegExp; recursive: boolean }> = {
  prompt: {
    dir: ".github/prompts",
    pattern: /\.prompt\.md$/,
    recursive: false,
  },
  agent: {
    dir: ".github/agents",
    pattern: /\.agent\.md$/,
    recursive: false,
  },
  instruction: {
    dir: ".github/instructions",
    pattern: /\.instructions\.md$/,
    recursive: false,
  },
  skill: {
    dir: ".github/skills",
    pattern: /SKILL\.md$/,
    recursive: true,
  },
};

/**
 * Convert Windows path separators to forward slashes for consistent IDs.
 */
function toForwardSlashes(path: string): string {
  return path.split("\\").join("/");
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
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    // Directory doesn't exist or isn't readable
    return files;
  }

  for (const entry of entries) {
    const entryName = String(entry.name);
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
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    // Directory doesn't exist or isn't readable
    return files;
  }

  for (const entry of entries) {
    const entryName = String(entry.name);
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
  const config = ASSET_PATTERNS[assetType];
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
  const assetTypes: AssetType[] = ["prompt", "agent", "instruction", "skill"];

  const results = await Promise.all(
    assetTypes.map((type) => discoverAssetType(repoRoot, type))
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
