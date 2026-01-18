import { z } from "zod";
import { AssetRegistry } from "../services/asset-registry.js";
import type { SearchAssetsInput, AssetType } from "../services/types.js";

/**
 * Zod schema for search_assets input.
 */
export const searchAssetsSchema = {
  keywords: z.string()
    .describe("Search keywords (space-separated)"),
  type: z.enum(["prompt", "agent", "instruction", "skill", "chatmode"]).optional()
    .describe("Filter by asset type"),
};

/**
 * Tool metadata for search_assets.
 */
export const searchAssetsToolName = "search_assets";
export const searchAssetsToolDescription = "Searches assets by keywords.";

/**
 * Handler for search_assets tool.
 */
export function handleSearchAssets(
  registry: AssetRegistry,
  input: { keywords: string; type?: string }
): { content: Array<{ type: "text"; text: string }>; isError?: boolean } {
  const typedInput: SearchAssetsInput = {
    keywords: input.keywords,
    type: input.type as AssetType | undefined,
  };

  if (!typedInput.keywords) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: "Keywords are required" }),
        },
      ],
      isError: true,
    };
  }

  const result = registry.searchAssets(typedInput);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
