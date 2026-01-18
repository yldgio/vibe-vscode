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

/**
 * Stub asset registry for Phase 2.
 * Returns mock data to validate transport and client connectivity.
 * Real implementation will be added in Phase 3.
 */
export class AssetRegistry {
  private readonly repoRoot: string;
  private readonly stubAssets: Asset[];

  constructor(repoRoot: string) {
    this.repoRoot = repoRoot;

    // Phase 2 stub data - will be replaced with real discovery in Phase 3
    this.stubAssets = [
      {
        id: "prompt:.github/prompts/code-review.prompt.md",
        type: "prompt",
        name: "code-review",
        path: ".github/prompts/code-review.prompt.md",
        content: "# Code Review\n\nThis is stub content for Phase 2 testing.\n\nReal content will be loaded from the filesystem in Phase 3.",
        encoding: "utf-8",
      },
      {
        id: "agent:.github/agents/devops.agent.md",
        type: "agent",
        name: "devops",
        path: ".github/agents/devops.agent.md",
        content: "# DevOps Agent\n\nThis is stub content for Phase 2 testing.\n\nReal content will be loaded from the filesystem in Phase 3.",
        encoding: "utf-8",
      },
      {
        id: "instruction:.github/instructions/git.instructions.md",
        type: "instruction",
        name: "git",
        path: ".github/instructions/git.instructions.md",
        content: "# Git Instructions\n\nThis is stub content for Phase 2 testing.\n\nReal content will be loaded from the filesystem in Phase 3.",
        encoding: "utf-8",
      },
      {
        id: "skill:.github/skills/mcp-builder/SKILL.md",
        type: "skill",
        name: "mcp-builder",
        path: ".github/skills/mcp-builder/SKILL.md",
        content: "# MCP Builder Skill\n\nThis is stub content for Phase 2 testing.\n\nReal content will be loaded from the filesystem in Phase 3.",
        encoding: "utf-8",
      },
      {
        id: "chatmode:.github/chatmodes/lyra.chatmode.md",
        type: "chatmode",
        name: "lyra",
        path: ".github/chatmodes/lyra.chatmode.md",
        content: "# Lyra Chat Mode\n\nThis is stub content for Phase 2 testing.\n\nReal content will be loaded from the filesystem in Phase 3.",
        encoding: "utf-8",
      },
    ];
  }

  /**
   * Get the repository root path.
   */
  getRepoRoot(): string {
    return this.repoRoot;
  }

  /**
   * List assets with optional filtering.
   */
  listAssets(input: ListAssetsInput): ListAssetsOutput {
    let assets = this.stubAssets;

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
   */
  getAsset(input: GetAssetInput): GetAssetOutput | null {
    const asset = this.stubAssets.find((a) => a.id === input.id);

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
   */
  searchAssets(input: SearchAssetsInput): SearchAssetsOutput {
    const keywords = input.keywords.toLowerCase().split(/\s+/).filter(Boolean);

    if (keywords.length === 0) {
      return { assets: [], count: 0 };
    }

    let assets = this.stubAssets;

    // Filter by type if specified
    if (input.type) {
      assets = assets.filter((a) => a.type === input.type);
    }

    // Search by keywords in name, path, and content
    const matches = assets.filter((asset) => {
      const searchText = `${asset.name} ${asset.path} ${asset.content}`.toLowerCase();
      return keywords.some((keyword) => searchText.includes(keyword));
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
