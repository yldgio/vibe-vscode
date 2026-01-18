# MCP Server Design Document

> **Phase 1 Deliverable** - Requirements and design for the vibe-vscode MCP server.
> 
> Related Issue: [#7 - MCP Server (Phase 1)](https://github.com/yldgio/vibe-vscode/issues/7)

## Table of Contents

1. [Overview](#overview)
2. [Target Clients](#target-clients)
3. [Asset Inventory](#asset-inventory)
4. [Transport Architecture](#transport-architecture)
5. [MCP Tools](#mcp-tools)
6. [Asset Model](#asset-model)
7. [Client Configuration](#client-configuration)
8. [Project Structure](#project-structure)
9. [Reference Implementation](#reference-implementation)

---

## Overview

This MCP server exposes the repository's AI customization assets (prompts, agents, instructions, skills, and chatmodes) to MCP-compatible clients. It is inspired by Microsoft's [awesome-copilot](https://github.com/microsoft/mcp-dotnet-samples/tree/main/awesome-copilot) implementation.

### Goals

- Expose all `.github/` assets via MCP protocol
- Support multiple MCP clients (Claude CLI, VS Code Copilot, OpenCode)
- Run locally with minimal configuration
- Provide raw file content (no rendering/transformation)

### Non-Goals (MVP)

- Hot reload of assets
- Authentication/authorization
- Remote/hosted deployment
- HTTP REST API (deferred to Phase 4)

---

## Target Clients

The MCP server must work with these clients:

| Client | Transport | Priority | Status |
|--------|-----------|----------|--------|
| Claude CLI | stdio | High | Planned |
| VS Code GitHub Copilot | stdio | High | Planned |
| VS Code GitHub Copilot | HTTP/SSE | Medium | Planned |
| OpenCode | stdio | High | Planned |
| GitHub Copilot CLI | stdio | Medium | Planned |

### Transport Compatibility Matrix

| Transport | Claude CLI | VS Code Copilot | OpenCode | Copilot CLI |
|-----------|------------|-----------------|----------|-------------|
| stdio | Yes | Yes | Yes | Yes |
| HTTP/SSE | No | Yes | TBD | TBD |

**Decision**: Implement **stdio as primary transport** with **HTTP/SSE as secondary** for flexibility.

---

## Asset Inventory

Current repository assets to be exposed:

| Category | Count | Path Pattern | File Extension |
|----------|-------|--------------|----------------|
| Prompts | 17 | `.github/prompts/` | `*.prompt.md` |
| Agents | 5 | `.github/agents/` | `*.agent.md` |
| Instructions | 8 | `.github/instructions/` | `*.instructions.md` |
| Skills | 7 | `.github/skills/*/` | `SKILL.md` |
| Chat Modes | 5 | `.github/chatmodes/` | `*.chatmode.md` |
| **Total** | **42** | | |

### Detailed Asset List

#### Prompts (17)
```
.github/prompts/
├── ado-pipelines.prompt.md
├── bicep.prompt.md
├── code-review-checklist.prompt.md
├── code-review.prompt.md
├── create-prd.it.prompt.md        # Italian locale
├── create-prd.prompt.md
├── devops.prompt.md
├── e2e_test.prompt.md
├── generate-tasks.it.prompt.md    # Italian locale
├── generate-tasks.prompt.md
├── git.prompt.md
├── process-task-list.it.prompt.md # Italian locale
├── process-task-list.prompt.md
├── rest-api-review.prompt.md
├── setup.prompt.md
├── tech-stack.prompt.md
└── test-eng-csharp.prompt.md
```

#### Agents (5)
```
.github/agents/
├── devops.agent.md
├── lyra.agent.md
├── plan.agent.md
├── prd.agent.md
└── tdd.agent.md
```

#### Instructions (8)
```
.github/instructions/
├── csharp-dotnet.instructions.md
├── general-coding.instructions.md
├── git.instructions.md
├── gitflow.instructions.md
├── githubflow.instructions.md
├── memory.instructions.md
├── react-ts.instructions.md
└── work-items.instructions.md
```

#### Skills (7)
```
.github/skills/
├── appinsights-instrumentation/SKILL.md
├── azure-resource-visualizer/SKILL.md
├── azure-role-selector/SKILL.md
├── canvas-design/SKILL.md
├── docx/SKILL.md
├── frontend-design/SKILL.md
└── mcp-builder/SKILL.md
```

#### Chat Modes (5)
```
.github/chatmodes/
├── devops.chatmode.md
├── lyra.chatmode.md
├── Plan.chatmode.md
├── PRD.chatmode.md
└── TDD.chatmode.md
```

### Localized Assets

Three prompts have Italian (`.it.`) localized variants:

| Base Name | Locales |
|-----------|---------|
| `create-prd` | `en` (default), `it` |
| `generate-tasks` | `en` (default), `it` |
| `process-task-list` | `en` (default), `it` |

---

## Transport Architecture

### Dual Transport Design

```
                    ┌─────────────────────────────────────┐
                    │           MCP Server                │
                    │         (vibe-vscode)               │
                    └─────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │                               │
            ┌───────▼───────┐               ┌───────▼───────┐
            │     stdio     │               │     HTTP      │
            │   Transport   │               │   Transport   │
            │   (default)   │               │  (--http)     │
            └───────────────┘               └───────────────┘
                    │                               │
        ┌───────────┼───────────┐                   │
        │           │           │                   │
   ┌────▼────┐ ┌────▼────┐ ┌────▼────┐       ┌─────▼─────┐
   │ Claude  │ │ VS Code │ │OpenCode │       │  VS Code  │
   │   CLI   │ │ Copilot │ │         │       │  Copilot  │
   └─────────┘ └─────────┘ └─────────┘       │  (HTTP)   │
                                              └───────────┘
```

### Entry Points

```bash
# stdio transport (default)
npm run start
npx tsx src/index.ts

# HTTP transport (port 3000)
npm run start:http
npx tsx src/index.ts --http

# Custom repo root
npx tsx src/index.ts --repo-root /path/to/repo

# Custom HTTP port
npx tsx src/index.ts --http --port 8080
```

### CLI Arguments

| Argument | Default | Description |
|----------|---------|-------------|
| `--http` | `false` | Enable HTTP transport instead of stdio |
| `--port` | `3000` | HTTP server port (only with `--http`) |
| `--repo-root` | `process.cwd()` | Repository root path |
| `--help` | - | Show usage information |

---

## MCP Tools

### Tool: `list_assets`

Lists all repository assets with optional filtering.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "type": {
      "type": "string",
      "enum": ["prompt", "agent", "instruction", "skill", "chatmode"],
      "description": "Filter by asset type"
    },
    "locale": {
      "type": "string",
      "description": "Filter by locale (e.g., 'it' for Italian)"
    }
  }
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "assets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" },
          "name": { "type": "string" },
          "path": { "type": "string" },
          "locale": { "type": "string" },
          "description": { "type": "string" }
        }
      }
    },
    "count": { "type": "number" }
  }
}
```

**Example:**
```json
// Request
{ "type": "prompt" }

// Response
{
  "assets": [
    {
      "id": "prompt:.github/prompts/code-review.prompt.md",
      "type": "prompt",
      "name": "code-review",
      "path": ".github/prompts/code-review.prompt.md",
      "description": "Code review checklist"
    }
  ],
  "count": 17
}
```

### Tool: `get_asset`

Retrieves a specific asset by ID with full content.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": {
      "type": "string",
      "description": "Asset ID (e.g., 'prompt:.github/prompts/code-review.prompt.md')"
    }
  },
  "required": ["id"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "type": { "type": "string" },
    "name": { "type": "string" },
    "path": { "type": "string" },
    "locale": { "type": "string" },
    "content": { "type": "string" },
    "encoding": { "type": "string", "enum": ["utf-8", "base64"] }
  }
}
```

**Example:**
```json
// Request
{ "id": "prompt:.github/prompts/code-review.prompt.md" }

// Response
{
  "id": "prompt:.github/prompts/code-review.prompt.md",
  "type": "prompt",
  "name": "code-review",
  "path": ".github/prompts/code-review.prompt.md",
  "content": "---\nmode: agent\n---\n# Code Review\n...",
  "encoding": "utf-8"
}
```

### Tool: `search_assets`

Searches assets by keywords.

**Input Schema:**
```json
{
  "type": "object",
  "properties": {
    "keywords": {
      "type": "string",
      "description": "Search keywords (space-separated)"
    },
    "type": {
      "type": "string",
      "enum": ["prompt", "agent", "instruction", "skill", "chatmode"],
      "description": "Filter by asset type"
    }
  },
  "required": ["keywords"]
}
```

**Output Schema:**
```json
{
  "type": "object",
  "properties": {
    "assets": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string" },
          "type": { "type": "string" },
          "name": { "type": "string" },
          "path": { "type": "string" },
          "description": { "type": "string" }
        }
      }
    },
    "count": { "type": "number" }
  }
}
```

**Example:**
```json
// Request
{ "keywords": "devops azure" }

// Response
{
  "assets": [
    {
      "id": "agent:.github/agents/devops.agent.md",
      "type": "agent",
      "name": "devops",
      "path": ".github/agents/devops.agent.md"
    },
    {
      "id": "prompt:.github/prompts/devops.prompt.md",
      "type": "prompt",
      "name": "devops",
      "path": ".github/prompts/devops.prompt.md"
    }
  ],
  "count": 2
}
```

---

## Asset Model

### TypeScript Interface

```typescript
type AssetType = "prompt" | "agent" | "instruction" | "skill" | "chatmode";

interface Asset {
  /** Stable ID: "{type}:{relativePath}" */
  id: string;
  
  /** Asset type */
  type: AssetType;
  
  /** Human-readable name derived from filename */
  name: string;
  
  /** Repo-relative path */
  path: string;
  
  /** Locale code (e.g., "it") for localized variants */
  locale?: string;
  
  /** Raw file content */
  content: string;
  
  /** Content encoding */
  encoding: "utf-8" | "base64";
  
  /** Optional metadata extracted from frontmatter */
  metadata?: {
    title?: string;
    description?: string;
    tags?: string[];
  };
}
```

### ID Generation

Asset IDs follow the pattern `{type}:{relativePath}`:

| Asset | Generated ID |
|-------|--------------|
| `.github/prompts/code-review.prompt.md` | `prompt:.github/prompts/code-review.prompt.md` |
| `.github/agents/devops.agent.md` | `agent:.github/agents/devops.agent.md` |
| `.github/skills/mcp-builder/SKILL.md` | `skill:.github/skills/mcp-builder/SKILL.md` |

### Name Derivation

| Asset Type | Rule | Example |
|------------|------|---------|
| Prompt | Filename without `.prompt.md` | `code-review.prompt.md` → `code-review` |
| Agent | Filename without `.agent.md` | `devops.agent.md` → `devops` |
| Instruction | Filename without `.instructions.md` | `git.instructions.md` → `git` |
| Skill | Parent folder name | `mcp-builder/SKILL.md` → `mcp-builder` |
| ChatMode | Filename without `.chatmode.md` | `lyra.chatmode.md` → `lyra` |

### Locale Extraction

Files matching `{name}.{locale}.{type}.md` extract the locale:

| File | Name | Locale |
|------|------|--------|
| `create-prd.it.prompt.md` | `create-prd` | `it` |
| `create-prd.prompt.md` | `create-prd` | *(none)* |

---

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

Create `.vscode/mcp.json` in workspace:

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

```json
{
  "servers": {
    "vibe-vscode": {
      "type": "http",
      "url": "http://localhost:3000/mcp"
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

---

## Project Structure

```
./mcp/
├── docs/
│   └── DESIGN.md              # This document
├── src/
│   ├── index.ts               # Entry point, CLI parsing
│   ├── server.ts              # MCP server factory
│   ├── config.ts              # Configuration management
│   ├── transports/
│   │   ├── index.ts           # Transport factory
│   │   ├── stdio.ts           # stdio transport
│   │   └── http.ts            # HTTP/SSE transport
│   ├── services/
│   │   ├── asset-registry.ts  # Asset discovery & registry
│   │   ├── asset-loader.ts    # File loading
│   │   └── types.ts           # TypeScript interfaces
│   └── tools/
│       ├── index.ts           # Tool registration
│       ├── list-assets.ts     # list_assets tool
│       ├── get-asset.ts       # get_asset tool
│       └── search-assets.ts   # search_assets tool
├── package.json
├── tsconfig.json
└── README.md
```

---

## Reference Implementation

This design is inspired by Microsoft's [awesome-copilot](https://github.com/microsoft/mcp-dotnet-samples/tree/main/awesome-copilot) MCP server.

### Alignment with awesome-copilot

| awesome-copilot | vibe-vscode | Notes |
|-----------------|-------------|-------|
| `Program.cs` | `src/index.ts` | Entry point with transport switching |
| `--http` flag | `--http` flag | Same CLI pattern |
| `MetadataService` | `AssetRegistry` | Asset discovery service |
| `MetadataTool` | `tools/*.ts` | MCP tool definitions |
| `search_instructions` | `search_assets` | Search tool |
| `load_instruction` | `get_asset` | Asset retrieval |

### Key Differences

| Aspect | awesome-copilot | vibe-vscode |
|--------|-----------------|-------------|
| Runtime | .NET 9 | Node.js 20+ |
| Data Source | Remote GitHub API | Local filesystem |
| Asset Types | 4 (chatmodes, instructions, prompts, agents) | 5 (+ skills) |
| Caching | In-memory from JSON | In-memory from filesystem |

---

## Appendix: Decision Log

### Transport: Why stdio + HTTP?

- **stdio**: Universal client support, simplest integration, no network configuration
- **HTTP**: Enables remote scenarios, container deployments, web-based tools

### Tools vs Resources: Why Tools only?

- **Maximum compatibility**: All MCP clients support tools
- **Simpler implementation**: No resource lifecycle management
- **Sufficient for MVP**: Can add resources in Phase 4 if needed

### Node.js vs .NET: Why Node.js?

- **MCP SDK**: Official `@modelcontextprotocol/sdk` is Node.js-native
- **Ecosystem**: npm packages for file operations, glob patterns
- **Developer experience**: TypeScript provides good type safety
- **Portability**: Runs anywhere Node.js is installed
