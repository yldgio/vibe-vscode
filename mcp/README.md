# vibe-vscode MCP Server

An MCP (Model Context Protocol) server that exposes the vibe-vscode repository's AI customization assets (prompts, agents, instructions, and skills) to MCP-compatible clients.

## Quick Start

```bash
# Install dependencies
cd mcp
npm install

# Run with stdio transport (default)
npm run start

# Run with HTTP transport
npm run start:http
```

## Available Tools

| Tool | Description |
|------|-------------|
| `list_assets` | Lists all repository assets with optional filtering by type and locale |
| `get_asset` | Retrieves a specific asset by ID with full content |
| `search_assets` | Searches assets by keywords |

## CLI Options

| Option | Default | Description |
|--------|---------|-------------|
| `--http` | `false` | Use HTTP transport instead of stdio |
| `--port <port>` | `3000` | HTTP server port (only with `--http`) |
| `--repo-root <path>` | Current directory | Repository root path |
| `--help` | - | Show usage information |

## Client Configuration

### Claude CLI

Add to `~/.claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "vibe-vscode": {
      "command": "npx",
      "args": ["tsx", "/path/to/vibe-vscode/mcp/src/index.ts"],
      "env": {}
    }
  }
}
```

### VS Code GitHub Copilot (stdio)

Create `.vscode/mcp.json` in your workspace:

```json
{
  "servers": {
    "vibe-vscode": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "${workspaceFolder}/mcp/src/index.ts"]
    }
  }
}
```

### VS Code GitHub Copilot (HTTP)

First start the HTTP server:

```bash
cd mcp && npm run start:http
```

Then add to `.vscode/mcp.json`:

```json
{
  "servers": {
    "vibe-vscode": {
      "type": "http",
      "url": "http://localhost:3000/sse"
    }
  }
}
```

### OpenCode

Add to `opencode.json`:

```json
{
  "mcp": {
    "vibe-vscode": {
      "command": "npx",
      "args": ["tsx", "./mcp/src/index.ts"]
    }
  }
}
```

## Development

```bash
# Development with auto-reload
npm run dev

# Type check
npm run typecheck

# Build for production
npm run build

# Run production build
node dist/index.js
```

## Project Structure

```
mcp/
├── src/
│   ├── index.ts           # Entry point, CLI parsing
│   ├── server.ts          # MCP server factory
│   ├── config.ts          # Configuration management
│   ├── transports/        # Transport adapters (stdio, HTTP)
│   ├── services/          # Asset registry and types
│   └── tools/             # MCP tool implementations
├── docs/
│   └── DESIGN.md          # Design specification
├── package.json
└── tsconfig.json
```

## Requirements

- Node.js 20+
- npm 10+

## Phase Status

This is a **Phase 3** implementation with real filesystem asset discovery.

The server discovers and loads all assets from:
- `.github/prompts/*.prompt.md` (17 prompts)
- `.github/agents/*.agent.md` (5 agents)
- `.github/instructions/*.instructions.md` (8 instructions)
- `.github/skills/*/SKILL.md` (7 skills)

Assets are loaded once at startup. Changes to files require a server restart.

## License

MIT
