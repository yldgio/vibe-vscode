#!/usr/bin/env node

import { parseArgs } from "./config.js";
import { createMcpServer } from "./server.js";
import { createStdioTransport, createHttpTransport } from "./transports/index.js";

/**
 * Main entry point for the vibe-vscode MCP server.
 */
async function main(): Promise<void> {
  const config = parseArgs(process.argv.slice(2));

  console.error(`vibe-vscode MCP Server v0.1.0`);
  console.error(`  Repo root: ${config.repoRoot}`);
  console.error(`  Transport: ${config.http ? `HTTP (port ${config.port})` : "stdio"}`);

  const server = createMcpServer(config.repoRoot);

  if (config.http) {
    // HTTP/SSE transport
    const httpTransport = createHttpTransport(config.port);
    await httpTransport.start();

    // Handle graceful shutdown
    process.on("SIGINT", async () => {
      console.error("\nShutting down...");
      await httpTransport.close();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.error("\nShutting down...");
      await httpTransport.close();
      process.exit(0);
    });

    // Wait for SSE connection and connect server
    // Note: In a real implementation, we'd need to handle multiple connections
    // For Phase 2, we're keeping it simple with a single connection model
    const checkConnection = setInterval(async () => {
      if (httpTransport.transport) {
        clearInterval(checkConnection);
        await server.connect(httpTransport.transport);
      }
    }, 100);
  } else {
    // stdio transport (default)
    const transport = createStdioTransport();
    await server.connect(transport);
  }
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
