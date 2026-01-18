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

  const handleRequest = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
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

        try {
          sseTransport = new SSEServerTransport("/message", res);
          
          // Start the SSE transport to send initial endpoint event
          await sseTransport.start();

          // Clean up transport reference when connection closes
          res.on("close", () => {
            sseTransport = null;
            console.error("SSE client disconnected");
          });
        } catch (error) {
          console.error("Failed to start SSE transport:", error);
          sseTransport = null;
          if (!res.headersSent) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to establish SSE connection" }));
          }
        }

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
  };

  const httpServer = createServer((req: IncomingMessage, res: ServerResponse) => {
    handleRequest(req, res).catch((error) => {
      console.error("Unhandled error in request handler:", error);
      if (!res.headersSent) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error" }));
      } else if (!res.writableEnded) {
        res.end();
      }
    });
  });

  return {
    server: httpServer,
    get transport() {
      return sseTransport;
    },
    start(): Promise<void> {
      return new Promise((resolve, reject) => {
        httpServer.once("error", reject);
        httpServer.listen(port, () => {
          httpServer.removeListener("error", reject);
          console.error(`MCP HTTP server listening on http://localhost:${port}`);
          console.error(`  SSE endpoint: http://localhost:${port}/sse`);
          console.error(`  Health check: http://localhost:${port}/health`);
          resolve();
        });
      });
    },
    close(): Promise<void> {
      return new Promise((resolve, reject) => {
        // Close SSE transport first to terminate active connections
        const closeTransport = sseTransport?.close?.().catch((err) => {
          console.error("Error closing SSE transport:", err);
        }) ?? Promise.resolve();

        closeTransport.finally(() => {
          httpServer.close((err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      });
    },
  };
}
