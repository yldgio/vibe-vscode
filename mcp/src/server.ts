import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { createAssetRegistry, AssetRegistry } from "./services/asset-registry.js";
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
 * Register all MCP tools with the server.
 */
function registerTools(server: McpServer, registry: AssetRegistry): void {
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
}

/**
 * Create and configure the MCP server with all tools registered.
 * Discovers and loads all assets from the repository at startup.
 */
export async function createMcpServer(repoRoot: string): Promise<McpServer> {
  const server = new McpServer({
    name: "vibe-vscode",
    version: "0.1.0",
  });

  // Initialize asset registry (discovers and loads all assets)
  const registry = await createAssetRegistry(repoRoot);

  // Register all tools
  registerTools(server, registry);

  return server;
}
