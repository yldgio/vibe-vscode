import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

/**
 * Create a stdio transport for the MCP server.
 */
export function createStdioTransport(): StdioServerTransport {
  return new StdioServerTransport();
}
