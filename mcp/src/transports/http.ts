import { createServer, IncomingMessage, ServerResponse } from "node:http";
import type { Server as HttpServer } from "node:http";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

/**
 * HTTP transport wrapper that handles SSE connections.
 */
export interface HttpTransport {
  server: HttpServer;
  transport: SSEServerTransport | null;
  start(): Promise<void>;
  close(): Promise<void>;
}

/**
 * Create an HTTP transport for the MCP server.
 * Uses Server-Sent Events (SSE) for the MCP protocol.
 * Note: Phase 2 implementation supports single connection only.
 */
export function createHttpTransport(port: number): HttpTransport {
  let sseTransport: SSEServerTransport | null = null;

  const httpServer = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
      const url = new URL(req.url || "/", `http://localhost:${port}`);

      // Health check endpoint
      if (url.pathname === "/health" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok" }));
        return;
      }

      // SSE endpoint for MCP connections
      if (url.pathname === "/sse" && req.method === "GET") {
        // Phase 2: Single connection only - reject if already connected
        if (sseTransport) {
          res.writeHead(409, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "SSE connection already active" }));
          return;
        }

        sseTransport = new SSEServerTransport("/message", res);

        // Clean up transport reference when connection closes
        res.on("close", () => {
          sseTransport = null;
          console.error("SSE client disconnected");
        });

        return;
      }

      // Message endpoint for client-to-server messages
      if (url.pathname === "/message" && req.method === "POST") {
        if (!sseTransport) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "No active SSE connection" }));
          return;
        }

        // Let the SSE transport handle the message
        try {
          await sseTransport.handlePostMessage(req, res);
        } catch (error) {
          console.error("Error handling POST message:", error);
          if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Internal server error" }));
          }
        }
        return;
      }

      // 404 for unknown routes
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Not found" }));
    } catch (error) {
      console.error("Unhandled error in HTTP request handler:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      } else if (!res.writableEnded) {
        res.end();
      }
    }
  });

  return {
    server: httpServer,
    get transport() {
      return sseTransport;
    },
    start(): Promise<void> {
      return new Promise((resolve) => {
        httpServer.listen(port, () => {
          console.error(`MCP HTTP server listening on http://localhost:${port}`);
          console.error(`  SSE endpoint: http://localhost:${port}/sse`);
          console.error(`  Health check: http://localhost:${port}/health`);
          resolve();
        });
      });
    },
    close(): Promise<void> {
      return new Promise((resolve, reject) => {
        httpServer.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
  };
}
