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
    const shutdown = async (): Promise<void> => {
      console.error("\nShutting down...");
      try {
        await httpTransport.close();
      } catch (error) {
        console.error("Error during shutdown:", error);
      }
      process.exit(0);
    };

    process.on("SIGINT", () => void shutdown());
    process.on("SIGTERM", () => void shutdown());

    // Wait for SSE connection and connect server with timeout
    const maxWaitMs = 300_000; // 5 minutes - long timeout for development
    const pollIntervalMs = 100;

    const waitForConnection = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        const startTime = Date.now();

        const check = (): void => {
          if (httpTransport.transport) {
            resolve();
            return;
          }

          if (Date.now() - startTime >= maxWaitMs) {
            reject(new Error("Timeout waiting for SSE connection"));
            return;
          }

          setTimeout(check, pollIntervalMs);
        };

        check();
      });
    };

    // Don't block - just log when connection is established
    waitForConnection()
      .then(async () => {
        console.error("SSE client connected");
        try {
          await server.connect(httpTransport.transport!);
        } catch (error) {
          console.error("Failed to connect MCP server to transport:", error);
          process.exit(1);
        }
      })
      .catch((error) => {
        console.error("Connection error:", error.message);
      });
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
