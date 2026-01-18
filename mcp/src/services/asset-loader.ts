import { readFile } from "node:fs/promises";
import { basename, dirname } from "node:path";
import type { Asset, AssetMetadata, AssetType } from "./types.js";
import type { DiscoveredFile } from "./file-discovery.js";

/**
 * Extension patterns for each asset type.
 * Used to derive the name from the filename.
 */
const EXTENSION_PATTERNS: Record<AssetType, RegExp> = {
  prompt: /\.prompt\.md$/,
  agent: /\.agent\.md$/,
  instruction: /\.instructions\.md$/,
  skill: /SKILL\.md$/,
};

/**
 * Pattern to detect locale in filenames (e.g., "create-prd.it.prompt.md").
 * Captures: [1] = base name, [2] = locale code
 */
const LOCALE_PATTERN = /^(.+?)\.([a-z]{2})\.(?:prompt|agent|instructions)\.md$/;

/**
 * Pattern to match YAML frontmatter at the start of a file.
 * Captures the content between --- delimiters.
 */
const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/;

/**
 * Generate the stable asset ID.
 * Format: "{type}:{relativePath}"
 */
function generateAssetId(type: AssetType, relativePath: string): string {
  return `${type}:${relativePath}`;
}

/**
 * Derive the human-readable name from the file path.
 * 
 * Rules:
 * - Prompts/Agents/Instructions: Filename without extension (and locale)
 * - Skills: Parent folder name
 */
function deriveName(type: AssetType, relativePath: string): string {
  const fileName = basename(relativePath);
  
  if (type === "skill") {
    // For skills, use the parent folder name
    // e.g., ".github/skills/mcp-builder/SKILL.md" -> "mcp-builder"
    const parentDir = dirname(relativePath);
    return basename(parentDir);
  }
  
  // Check for locale pattern first
  const localeMatch = fileName.match(LOCALE_PATTERN);
  if (localeMatch && localeMatch[1]) {
    return localeMatch[1]; // Return base name without locale
  }
  
  // Remove the extension pattern
  const extensionPattern = EXTENSION_PATTERNS[type];
  return fileName.replace(extensionPattern, "");
}

/**
 * Extract locale code from filename if present.
 * Returns undefined if no locale is detected.
 */
function extractLocale(type: AssetType, relativePath: string): string | undefined {
  // Skills don't have locale variants
  if (type === "skill") {
    return undefined;
  }
  
  const fileName = basename(relativePath);
  const localeMatch = fileName.match(LOCALE_PATTERN);
  
  return localeMatch ? localeMatch[2] : undefined;
}

/**
 * Parse YAML frontmatter from file content.
 * Returns extracted metadata or undefined if no valid frontmatter.
 * 
 * Note: Simple key-value parser, doesn't handle nested YAML.
 */
function parseFrontmatter(content: string): AssetMetadata | undefined {
  const match = content.match(FRONTMATTER_PATTERN);
  if (!match) {
    return undefined;
  }
  
  const frontmatterText = match[1];
  if (!frontmatterText) {
    return undefined;
  }
  
  const metadata: AssetMetadata = {};
  
  // Simple line-by-line parsing for common keys
  const lines = frontmatterText.split(/\r?\n/);
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    
    // Match key: value or key: "value" or key: 'value', requiring paired quotes when present
    const keyValueMatch = trimmed.match(/^(\w+):\s*(?:"([^"]*)"|'([^']*)'|(.+))\s*$/);
    if (!keyValueMatch) continue;
    
    const key = keyValueMatch[1];
    const value = keyValueMatch[2] ?? keyValueMatch[3] ?? keyValueMatch[4];
    if (!key || value === undefined) continue;
    
    switch (key.toLowerCase()) {
      case "title":
        metadata.title = value;
        break;
      case "description":
        metadata.description = value;
        break;
      case "tags":
        // Handle comma-separated tags or simple array syntax
        metadata.tags = value
          .replace(/^\[|\]$/g, "") // Remove array brackets if present
          .split(",")
          .map((rawTag) => {
            const trimmedTag = rawTag.trim();
            if (trimmedTag.length < 2) return trimmedTag;

            const firstChar = trimmedTag[0];
            const lastChar = trimmedTag[trimmedTag.length - 1];
            const isQuoteChar = (ch: string | undefined): boolean => ch === "'" || ch === '"';

            if (isQuoteChar(firstChar) && firstChar === lastChar) {
              // Only strip quotes when they form a matching pair
              return trimmedTag.slice(1, -1);
            }

            // Leave malformed or unquoted tags unchanged
            return trimmedTag;
          })
          .filter(Boolean);
        break;
    }
  }
  
  // Return undefined if no metadata was extracted
  if (!metadata.title && !metadata.description && !metadata.tags) {
    return undefined;
  }
  
  return metadata;
}

/**
 * Load a single asset from the filesystem.
 * Reads the file, parses frontmatter, and creates the Asset object.
 */
export async function loadAsset(file: DiscoveredFile): Promise<Asset | null> {
  try {
    const content = await readFile(file.absolutePath, "utf-8");
    
    const asset: Asset = {
      id: generateAssetId(file.type, file.relativePath),
      type: file.type,
      name: deriveName(file.type, file.relativePath),
      path: file.relativePath,
      content,
      encoding: "utf-8",
    };
    
    // Add optional fields
    const locale = extractLocale(file.type, file.relativePath);
    if (locale) {
      asset.locale = locale;
    }
    
    const metadata = parseFrontmatter(content);
    if (metadata) {
      asset.metadata = metadata;
    }
    
    return asset;
  } catch (error) {
    // Log error and skip this file
    console.error(`Failed to load asset ${file.relativePath}:`, error);
    return null;
  }
}

/**
 * Load multiple assets from discovered files.
 * Skips files that fail to load.
 */
export async function loadAssets(files: DiscoveredFile[]): Promise<Asset[]> {
  const results = await Promise.all(files.map(loadAsset));
  
  // Filter out null values (failed loads)
  return results.filter((asset): asset is Asset => asset !== null);
}
