import type {
  Asset,
  AssetSummary,
  AssetType,
  ListAssetsInput,
  ListAssetsOutput,
  GetAssetInput,
  GetAssetOutput,
  SearchAssetsInput,
  SearchAssetsOutput,
} from "./types.js";
import { discoverAssets } from "./file-discovery.js";
import { loadAssets } from "./asset-loader.js";

/**
 * Asset registry that discovers and manages repository assets.
 * Assets are loaded once at initialization and stored in memory.
 * 
 * Use `createAssetRegistry()` to create an initialized instance.
 * Direct instantiation requires calling `initialize()` before use.
 */
export class AssetRegistry {
  private readonly repoRoot: string;
  private assets: Map<string, Asset> = new Map();
  private initialized = false;

  constructor(repoRoot: string) {
    this.repoRoot = repoRoot;
  }

  /**
   * Ensure the registry is initialized before use.
   * Throws an error if called before initialize().
   */
  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("AssetRegistry not initialized. Call initialize() first or use createAssetRegistry().");
    }
  }

  /**
   * Initialize the registry by discovering and loading all assets.
   * Must be called before using other methods.
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    console.error(`Discovering assets in ${this.repoRoot}...`);
    
    const discoveredFiles = await discoverAssets(this.repoRoot);
    console.error(`Found ${discoveredFiles.length} asset files`);
    
    const loadedAssets = await loadAssets(discoveredFiles);
    console.error(`Loaded ${loadedAssets.length} assets`);
    
    // Store assets in a Map for fast lookup by ID
    for (const asset of loadedAssets) {
      this.assets.set(asset.id, asset);
    }
    
    this.initialized = true;
    
    // Log summary by type
    const summary = this.getAssetSummaryByType();
    for (const [type, count] of Object.entries(summary)) {
      console.error(`  ${type}: ${count}`);
    }
  }

  /**
   * Get count of assets by type.
   */
  private getAssetSummaryByType(): Record<string, number> {
    const summary: Record<string, number> = {};
    for (const asset of this.assets.values()) {
      summary[asset.type] = (summary[asset.type] || 0) + 1;
    }
    return summary;
  }

  /**
   * Get the repository root path.
   */
  getRepoRoot(): string {
    return this.repoRoot;
  }

  /**
   * List assets with optional filtering.
   * @throws Error if registry is not initialized
   */
  listAssets(input: ListAssetsInput): ListAssetsOutput {
    this.ensureInitialized();
    
    let assets = Array.from(this.assets.values());

    // Filter by type if specified
    if (input.type) {
      assets = assets.filter((a) => a.type === input.type);
    }

    // Filter by locale if specified
    if (input.locale) {
      assets = assets.filter((a) => a.locale === input.locale);
    }

    const summaries: AssetSummary[] = assets.map((a) => ({
      id: a.id,
      type: a.type,
      name: a.name,
      path: a.path,
      locale: a.locale,
      description: a.metadata?.description,
    }));

    return {
      assets: summaries,
      count: summaries.length,
    };
  }

  /**
   * Get a single asset by ID.
   * @throws Error if registry is not initialized
   */
  getAsset(input: GetAssetInput): GetAssetOutput | null {
    this.ensureInitialized();
    
    const asset = this.assets.get(input.id);

    if (!asset) {
      return null;
    }

    return {
      id: asset.id,
      type: asset.type,
      name: asset.name,
      path: asset.path,
      locale: asset.locale,
      content: asset.content,
      encoding: asset.encoding,
    };
  }

  /**
   * Search assets by keywords.
   * Matches against name, path, title, and description.
   * All keywords must match (AND logic).
   * @throws Error if registry is not initialized
   */
  searchAssets(input: SearchAssetsInput): SearchAssetsOutput {
    this.ensureInitialized();
    
    const keywords = input.keywords.toLowerCase().split(/\s+/).filter(Boolean);

    if (keywords.length === 0) {
      return { assets: [], count: 0 };
    }

    let assets = Array.from(this.assets.values());

    // Filter by type if specified
    if (input.type) {
      assets = assets.filter((a) => a.type === input.type);
    }

    // Search by keywords in name, path, title, and description
    const matches = assets.filter((asset) => {
      const searchableText = [
        asset.name,
        asset.path,
        asset.metadata?.title,
        asset.metadata?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      // All keywords must match
      return keywords.every((keyword) => searchableText.includes(keyword));
    });

    const summaries: AssetSummary[] = matches.map((a) => ({
      id: a.id,
      type: a.type,
      name: a.name,
      path: a.path,
      locale: a.locale,
      description: a.metadata?.description,
    }));

    return {
      assets: summaries,
      count: summaries.length,
    };
  }
}

/**
 * Create and initialize an AssetRegistry.
 * This is the preferred way to create a registry.
 */
export async function createAssetRegistry(repoRoot: string): Promise<AssetRegistry> {
  const registry = new AssetRegistry(repoRoot);
  await registry.initialize();
  return registry;
}
