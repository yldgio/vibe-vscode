# Migration Guide: Chatmodes to Copilot Agents

## Overview

This document tracks the migration from legacy **chatmodes** to the modern **Copilot agents** system. Chatmodes are deprecated and maintained only for compatibility purposes. All new development should use the Copilot agent format.

## What's the Difference?

### Legacy Chatmodes (Deprecated)
- **Location**: `.github/chatmodes/*.chatmode.md`
- **Purpose**: Originally designed as a compatibility layer for chat-based interactions
- **Naming Convention**: `[name].chatmode.md`
- **Status**: **DEPRECATED** - Use only for backward compatibility

### Copilot Agents (Current Standard)
- **Location**: `.github/agents/*.agent.md`
- **Purpose**: Modern Copilot-native system for specialized AI assistants
- **Naming Convention**: `[name].agent.md`
- **Status**: **ACTIVE** - Current standard for all new agents
- **Benefits**:
  - Better integration with GitHub Copilot
  - Consistent frontmatter format
  - Improved tooling support
  - Clearer separation of concerns

## Migration Status

### ✅ Completed Migrations

| Legacy Chatmode | New Agent | Status | Notes |
|----------------|-----------|--------|-------|
| `PRD.chatmode.md` | `.github/agents/prd.agent.md` | ✅ Migrated | Product Requirements Document assistant |
| `TDD.chatmode.md` | `.github/agents/tdd.agent.md` | ✅ Migrated | Test-Driven Development assistant |
| `Plan.chatmode.md` | `.github/agents/plan.agent.md` | ✅ Migrated | Implementation planning agent |
| `devops.chatmode.md` | `.github/agents/devops.agent.md` | ✅ Migrated | DevSecOps engineer expert |
| `lyra.chatmode.md` | `.github/agents/lyra.agent.md` | ✅ Migrated | AI prompt optimization specialist |

### 📋 Pending Migrations

| Item | Type | Location | Priority | Owner | Notes |
|------|------|----------|----------|-------|-------|
| _None_ | - | - | - | - | All chatmodes have been migrated |

## Migration Process

When migrating a chatmode to an agent, follow these steps:

### 1. Update Frontmatter
Convert from chatmode format to agent format:

**Before (Chatmode):**
```yaml
---
description: 'Agent description here'
tools: ['tool1', 'tool2', 'tool3']
---
```

**After (Agent):**
```yaml
---
agent: agent-name
description: 'Agent description here'
tools:
  - tool1
  - tool2
  - tool3
---
```

### 2. File Naming and Location
- Move file from `.github/chatmodes/` to `.github/agents/`
- Rename from `[Name].chatmode.md` to `[name].agent.md` (lowercase, kebab-case)
- Keep content structure intact (only update frontmatter)

### 3. Update References
Update all references in documentation and code:
- Search for `#[Name].chatmode.md` references
- Replace with `@agent-name` or agent reference format
- Update any workflow documentation

### 4. Testing
- Test the agent in VS Code with Copilot
- Verify all tools are accessible
- Confirm agent behavior matches expectations

### 5. Documentation
- Update this file with migration status
- Update relevant documentation (README, PRD-README, etc.)
- Add deprecation notices to old chatmode files if keeping for compatibility

## Using Agents vs Chatmodes

### ✅ Correct Usage (Agents)

```markdown
# In VS Code with GitHub Copilot
Use @prd to create a product requirements document
Use @tdd for test-driven development
Use @plan to generate an implementation plan
```

### ❌ Deprecated Usage (Chatmodes)

```markdown
# Legacy approach - DO NOT USE for new features
Use #PRD.chatmode.md
Use #TDD.chatmode.md
```

## Compatibility Layer

The legacy chatmode files are **deprecated** but may be retained temporarily for:
- Backward compatibility with existing workflows
- Transition period for teams
- Reference documentation

**Important**: All chatmode files should include a deprecation notice directing users to the new agent system.

## Cleanup Checklist

- [x] Create `.github/agents/` directory
- [x] Migrate all chatmode files to agent format
- [x] Create this migration documentation
- [x] Update PRD-README.md with agent terminology
- [x] Update README.md with agent references
- [ ] Add deprecation notices to chatmode files
- [ ] Remove chatmode directory after transition period
- [ ] Update all workflow documentation
- [ ] Verify no broken references remain

## Questions or Issues?

If you encounter issues during migration or have questions about the agent system:
1. Review the [GitHub Copilot Agent Specifications](https://docs.github.com/en/copilot)
2. Check existing agents in `.github/agents/` for examples
3. Consult PRD-README.md for updated workflows
4. Open an issue for technical support

## Deprecation Timeline

- **Phase 1** (Current): Agents created, chatmodes marked deprecated
- **Phase 2** (Next): Add deprecation warnings to all chatmode files
- **Phase 3** (Future): Remove chatmode directory after team adoption
- **Phase 4** (Final): Complete cleanup of all legacy references

---

**Last Updated**: 2026-01-18  
**Status**: Phase 1 - Agents created, migration in progress  
**Owner**: Copilot Team
