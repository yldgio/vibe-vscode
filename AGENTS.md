# AGENTS.md - Instructions for AI Coding Agents

> This file provides guidelines for AI agents (GitHub Copilot, Claude, OpenCode, etc.) operating in this repository.
> **Keep this file updated** when relevant changes occur (new tools, conventions, structure changes).

## Repository Overview

This repository contains GitHub Copilot customizations: prompts, agents, instructions, skills, and chatmodes.
An MCP server is being developed in `./mcp/` to expose these assets to MCP-compatible clients.

## Quick Reference

| Item | Value |
|------|-------|
| Package Manager | **npm** (standard, no extra dependencies) |
| Primary Languages | TypeScript, Markdown |
| Node Version | 20+ |
| Design Docs | `mcp/docs/DESIGN.md` |

---

## Build / Lint / Test Commands

### MCP Server (`./mcp/`)

```bash
# Install dependencies
cd mcp && npm install

# Development (stdio transport)
npm run dev

# Development (HTTP transport)
npm run dev:http

# Build for production
npm run build

# Start production (stdio)
npm run start

# Start production (HTTP)
npm run start:http
```

### Running Tests

```bash
# Run all tests
npm test

# Run single test file
npm test -- path/to/test.spec.ts

# Run tests matching pattern
npm test -- --grep "asset registry"

# E2E tests with Playwright
npx playwright test

# Single Playwright test
npx playwright test tests/example.spec.ts
```

---

## Git Conventions

### Commit Format: Conventional Commits (REQUIRED)

```
type(scope): concise description

- Optional bullet points for context
- Keep them short and direct
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`

**Examples**:
```
feat: add list_assets MCP tool
fix(registry): handle missing directories gracefully
docs: update DESIGN.md with transport decisions
chore(deps): update @modelcontextprotocol/sdk to 1.2.0
```

### Atomic Commits

- **One logical change per commit** - don't bundle unrelated changes
- **Small, focused commits** - easier to review and revert
- **Complete commits** - each commit should leave the repo in a working state
- **Reference issues** - use `Closes #7` or `Refs #8` in commit body

### Branch Naming

```
feature/<feature-name>    # New features
fix/<bug-description>     # Bug fixes
docs/<what-changed>       # Documentation updates
refactor/<what-changed>   # Code refactoring
```

### Workflow

**Before starting any new feature or change:**

```bash
# 1. Always start from main with latest changes
git checkout main
git fetch --all
git pull

# 2. Create feature branch
git checkout -b feature/<feature-name>
```

**During development:**

1. Make atomic commits following conventional commit format
2. Push regularly to remote
3. Keep commits small and focused

**Before creating PR:**

```bash
# Ensure you have latest main
git fetch origin main
git rebase origin/main

# Resolve any conflicts, then push
git push --force-with-lease
```

**Complete workflow:**

1. `git checkout main && git fetch --all && git pull`
2. `git checkout -b feature/my-feature`
3. Make changes with atomic conventional commits
4. `git push -u origin feature/my-feature`
5. Create PR when ready
6. Rebase on `main` before merging if needed

---

## Code Style Guidelines

### TypeScript

```typescript
// Imports: grouped and ordered
import { Server } from "@modelcontextprotocol/sdk";  // External packages
import { AssetRegistry } from "../services/asset-registry";  // Internal modules
import type { Asset, AssetType } from "./types";  // Type imports last

// Naming conventions
const isLoading = true;           // camelCase for variables (use auxiliary verbs)
const MAX_RETRY_COUNT = 3;        // UPPER_SNAKE_CASE for constants
type AssetType = "prompt" | "agent";  // PascalCase for types
interface AssetRegistry { }       // PascalCase for interfaces
function loadAsset() { }          // camelCase for functions

// Prefer explicit types for function signatures
function getAsset(id: string): Asset | undefined { }

// Use early returns to reduce nesting
function processAsset(asset: Asset | null): string {
  if (!asset) return "";
  if (asset.type !== "prompt") return "";
  return asset.content;
}
```

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| TypeScript modules | `kebab-case.ts` | `asset-registry.ts` |
| Test files | `*.spec.ts` or `*.test.ts` | `asset-registry.spec.ts` |
| Types/interfaces | `types.ts` or `*.types.ts` | `types.ts` |
| Markdown content | `kebab-case.md` | `code-review.prompt.md` |

### Directory Structure

```
src/
├── index.ts           # Entry point
├── server.ts          # Core server logic
├── config.ts          # Configuration
├── services/          # Business logic
├── tools/             # MCP tool implementations
├── transports/        # Transport adapters
└── types/             # TypeScript interfaces
```

### Error Handling

```typescript
// Always handle errors explicitly
try {
  const asset = await loadAsset(id);
  return asset;
} catch (error) {
  logger.error({ error, assetId: id }, "Failed to load asset");
  throw new AssetNotFoundError(`Asset not found: ${id}`);
}

// Use Result pattern for expected failures
function getAsset(id: string): Result<Asset, AssetError> {
  if (!id) return { ok: false, error: new InvalidIdError() };
  // ...
}
```

### Functional Style Preferred

```typescript
// Prefer pure functions
const filterByType = (assets: Asset[], type: AssetType): Asset[] =>
  assets.filter(a => a.type === type);

// Avoid classes when functions suffice
// Prefer composition over inheritance
// Use immutable data patterns (spread, map, filter)
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `mcp/docs/DESIGN.md` | MCP server design specification (source of truth) |
| `.github/copilot-instructions.md` | GitHub Copilot behavior settings |
| `.github/instructions/*.md` | Language-specific coding guidelines |
| `.github/agents/*.agent.md` | Specialized agent definitions |
| `.github/prompts/*.prompt.md` | Reusable prompts |
| `.github/skills/*/SKILL.md` | Skill definitions |

---

## Available Agents

Use these specialized agents for specific tasks:

| Agent | Purpose |
|-------|---------|
| `@prd` | Product Requirements Documents |
| `@plan` | Implementation planning |
| `@tdd` | Test-Driven Development |
| `@devops` | DevSecOps and deployment |
| `@lyra` | AI prompt optimization |

---

## Security Requirements

- **Validate all inputs** at system boundaries
- **Never hardcode secrets** - use environment variables
- **Sanitize outputs** to prevent injection
- **Never commit** `.env`, credentials, or API keys
- **Log errors** without exposing sensitive data

---

## When Updating This File

Update `AGENTS.md` when:
- New build/test commands are added
- Code conventions change
- New tools or agents are introduced
- Directory structure changes significantly
- New security requirements are added

---

## Reference Links

- [MCP Server Design](./mcp/docs/DESIGN.md) - Architecture and tool schemas
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
- [MCP Protocol](https://modelcontextprotocol.io/) - Model Context Protocol docs
