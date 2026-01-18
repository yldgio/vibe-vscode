import { resolve } from "node:path";

/**
 * Server configuration.
 */
export interface ServerConfig {
  /** Repository root path */
  repoRoot: string;

  /** Use HTTP transport instead of stdio */
  http: boolean;

  /** HTTP server port (only used with http: true) */
  port: number;
}

/**
 * Default configuration values.
 */
const defaults: ServerConfig = {
  repoRoot: process.cwd(),
  http: false,
  port: 3000,
};

/**
 * Parse command-line arguments into configuration.
 */
export function parseArgs(args: string[]): ServerConfig {
  const config: ServerConfig = { ...defaults };

  for (let i = 0; i < args.length; i++) {
    const arg: string | undefined = args[i];
    if (arg === undefined) continue;

    switch (arg) {
      case "--http":
        config.http = true;
        break;

      case "--port": {
        i++;
        const portValue: string | undefined = args[i];
        if (portValue === undefined) {
          throw new Error("--port requires a value");
        }
        const port = parseInt(portValue, 10);
        if (isNaN(port) || port < 1 || port > 65535) {
          throw new Error(`Invalid port: ${portValue}`);
        }
        config.port = port;
        break;
      }

      case "--repo-root": {
        i++;
        const rootValue: string | undefined = args[i];
        if (rootValue === undefined) {
          throw new Error("--repo-root requires a value");
        }
        config.repoRoot = resolve(rootValue);
        break;
      }

      case "--help":
      case "-h":
        printHelp();
        process.exit(0);
        break; // unreachable but satisfies linter

      default:
        if (arg.startsWith("-")) {
          console.error(`Unknown option: ${arg}`);
          printHelp();
          process.exit(1);
        }
    }
  }

  // Warn if --port is used without --http
  if (config.port !== defaults.port && !config.http) {
    console.error("Warning: --port is ignored without --http");
  }

  return config;
}

/**
 * Print usage information.
 */
function printHelp(): void {
  console.log(`
vibe-vscode MCP Server

Usage: npx tsx src/index.ts [options]

Options:
  --http          Use HTTP transport instead of stdio (default: stdio)
  --port <port>   HTTP server port (default: 3000, only with --http)
  --repo-root <path>  Repository root path (default: current directory)
  --help, -h      Show this help message

Examples:
  npx tsx src/index.ts                    # stdio transport
  npx tsx src/index.ts --http             # HTTP on port 3000
  npx tsx src/index.ts --http --port 8080 # HTTP on port 8080
  npx tsx src/index.ts --repo-root /path/to/repo
`);
}
