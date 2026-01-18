import { z } from "zod";
import { AssetRegistry } from "../services/asset-registry.js";
import type { ListAssetsInput, AssetType } from "../services/types.js";

/**
 * Zod schema for list_assets input.
 */
export const listAssetsSchema = {
  type: z.enum(["prompt", "agent", "instruction", "skill", "chatmode"]).optional()
    .describe("Filter by asset type"),
  locale: z.string().optional()
    .describe("Filter by locale (e.g., 'it' for Italian)"),
};

/**
 * Tool metadata for list_assets.
 */
export const listAssetsToolName = "list_assets";
export const listAssetsToolDescription = "Lists all repository assets with optional filtering by type and locale.";

/**
 * Handler for list_assets tool.
 */
export function handleListAssets(
  registry: AssetRegistry,
  input: { type?: string; locale?: string }
): { content: Array<{ type: "text"; text: string }> } {
  const typedInput: ListAssetsInput = {
    type: input.type as AssetType | undefined,
    locale: input.locale,
  };

  const result = registry.listAssets(typedInput);

  return {
    content: [
      {
        type: "text",
        text: JSON.stringify(result, null, 2),
      },
    ],
  };
}
