import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AssetRegistry } from "./services/asset-registry.js";
import {
  listAssetsSchema,
  listAssetsToolName,
  listAssetsToolDescription,
  handleListAssets,
  getAssetSchema,
  getAssetToolName,
  getAssetToolDescription,
  handleGetAsset,
  searchAssetsSchema,
  searchAssetsToolName,
  searchAssetsToolDescription,
  handleSearchAssets,
} from "./tools/index.js";

/**
 * Create and configure the MCP server with all tools registered.
 */
export function createMcpServer(repoRoot: string): McpServer {
  const server = new McpServer({
    name: "vibe-vscode",
    version: "0.1.0",
  });

  const registry = new AssetRegistry(repoRoot);

  // Register list_assets tool
  server.tool(
    listAssetsToolName,
    listAssetsToolDescription,
    listAssetsSchema,
    async (input) => handleListAssets(registry, input)
  );

  // Register get_asset tool
  server.tool(
    getAssetToolName,
    getAssetToolDescription,
    getAssetSchema,
    async (input) => handleGetAsset(registry, input)
  );

  // Register search_assets tool
  server.tool(
    searchAssetsToolName,
    searchAssetsToolDescription,
    searchAssetsSchema,
    async (input) => handleSearchAssets(registry, input)
  );

  return server;
}
