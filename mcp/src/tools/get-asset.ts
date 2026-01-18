import { z } from "zod";
import { AssetRegistry } from "../services/asset-registry.js";
import type { GetAssetInput } from "../services/types.js";

/**
 * Zod schema for get_asset input.
 */
export const getAssetSchema = {
  id: z.string()
    .describe("Asset ID (e.g., 'prompt:.github/prompts/code-review.prompt.md')"),
};

/**
 * Tool metadata for get_asset.
 */
export const getAssetToolName = "get_asset";
export const getAssetToolDescription = "Retrieves a specific asset by ID with full content.";

/**
 * Handler for get_asset tool.
 */
export function handleGetAsset(
  registry: AssetRegistry,
  input: { id: string }
): { content: Array<{ type: "text"; text: string }>; isError?: boolean } {
  const typedInput: GetAssetInput = {
    id: input.id,
  };

  if (!typedInput.id) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: "Asset ID is required" }),
        },
      ],
      isError: true,
    };
  }

  const result = registry.getAsset(typedInput);

  if (!result) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: `Asset not found: ${typedInput.id}` }),
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
