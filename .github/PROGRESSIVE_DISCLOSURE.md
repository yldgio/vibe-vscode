# Progressive Disclosure Pattern for AI Coding Agents

> **Key Principle:** Structure agent context so the AI only receives the information it needs to solve the current problem, rather than overwhelming it with all possible instructions at once.

## Table of Contents

- [What is Progressive Disclosure?](#what-is-progressive-disclosure)
- [Why It Matters](#why-it-matters)
- [The Role of Each Prompt File Type](#the-role-of-each-prompt-file-type)
- [Best Practices](#best-practices)
- [File Organization Structure](#file-organization-structure)
- [Examples](#examples)
- [How This Repository Implements Progressive Disclosure](#how-this-repository-implements-progressive-disclosure)
- [References](#references)

---

## What is Progressive Disclosure?

**Progressive disclosure** is a design pattern for structuring AI agent context that prevents cognitive overload by presenting only relevant information at the right time. Instead of cramming all possible instructions into a single file, you create a layered context system where:

1. **Core information** is always available (WHAT, WHY, HOW)
2. **Detailed instructions** are referenced and loaded only when needed
3. **Task-specific guidance** lives in separate, focused files

This pattern is especially important because:
- Large Language Models (LLMs) are stateless—they "forget" between sessions
- Performance degrades with too much irrelevant information in the context window
- More instructions ≠ better results (performance degrades past ~150-200 focused instructions)

---

## Why It Matters

### Context Window Efficiency

LLMs have a limited context window. When you overload it with:
- Hundreds of lines of style guides
- Every edge case ever encountered
- Detailed instructions for tasks not currently relevant

...you waste valuable context space that could be used for:
- Understanding the current task deeply
- Analyzing relevant code files
- Planning effective solutions

### Agent Performance

Studies show that agent performance actually **decreases** when given too many instructions. The sweet spot is:
- **Root instruction file:** Under 60 lines (universal, always-relevant info)
- **Task-specific files:** Focused, single-purpose documents
- **Referenced on-demand:** Loaded only when the agent needs them

---

## The Role of Each Prompt File Type

GitHub Copilot uses several types of files to provide context to the AI. Understanding their roles helps you structure information effectively.

### 1. Instruction Files (`.github/copilot-instructions.md`)

**Role:** System-level, persistent context for ALL Copilot interactions

**Characteristics:**
- **Always loaded** into every Copilot chat or suggestion session
- **Scope:** Repository-wide or organization-wide
- **Purpose:** Define universal coding standards, preferences, and rules
- **Best for:** 
  - Tech stack overview
  - Critical security requirements
  - Code style preferences
  - Always-applicable conventions

**In the LLM Context:**
- Acts as **system prompt** enhancement
- Merged with Copilot's base system instructions
- Always present in the context window

**Example content:**
```markdown
## Tech Stack
- React + TypeScript (strict mode)
- TailwindCSS for styling
- pnpm as package manager

## Universal Rules
- Always validate user inputs
- Use descriptive variable names with auxiliary verbs (isLoading, hasError)
- Follow WCAG 2.1 AA accessibility standards
```

### 2. Prompt Files (`.github/prompts/*.prompt.md`)

**Role:** Reusable, task-specific templates executed on-demand

**Characteristics:**
- **Loaded on request** via slash commands in Copilot Chat
- **Scope:** Task or workflow-specific
- **Purpose:** Standardize common, repeatable development tasks
- **Best for:**
  - Test generation templates
  - Code scaffolding
  - Code review checklists
  - Refactoring workflows

**In the LLM Context:**
- Acts as **user prompt** templates
- Can reference variables (`${file}`, `${selection}`)
- Can invoke specific tools
- Only loaded when explicitly called

**Example file structure:**
```markdown
---
name: create-component
description: Scaffold a new React component following our standards
tools: [codegen]
argument-hint: Component name
---

Create a new React functional component in TypeScript:
- Use named export
- Include TypeScript interfaces for props
- Add accessibility attributes
- Include basic tests
```

### 3. Agent Files (`.github/agents/*.agent.md`)

**Role:** Specialized AI agents with domain-specific knowledge

**Characteristics:**
- **Loaded when agent is invoked** (e.g., `@prd`, `@tdd`)
- **Scope:** Domain or workflow-specific
- **Purpose:** Provide expert assistance for specific development phases
- **Best for:**
  - Product requirements (PRD agent)
  - Implementation planning (Plan agent)
  - Test-driven development (TDD agent)
  - DevOps tasks (DevOps agent)

**In the LLM Context:**
- Acts as **role-based system prompt**
- Defines agent personality, expertise, and approach
- Includes specific tools and capabilities for that domain

### 4. Supplemental Documentation Files

**Role:** Detailed, reference documentation loaded as needed

**Characteristics:**
- **Referenced but not auto-loaded**
- **Scope:** Specific workflows, edge cases, or detailed processes
- **Purpose:** Provide deep information when relevant
- **Best for:**
  - Build and deployment processes
  - Complex testing procedures
  - Architecture decision records
  - Detailed style guides

**In the LLM Context:**
- **Not automatically included** in context
- Agent can **choose to load** when task requires it
- Keeps main context clean and focused

**Example organization:**
```
.github/
├── docs/
│   ├── building.md          # Build process details
│   ├── testing.md           # Testing guidelines
│   ├── deployment.md        # Deployment procedures
│   └── architecture.md      # Architecture decisions
```

---

## Best Practices

### 1. Keep Root Instructions Minimal

**✅ DO:**
```markdown
# AGENTS.md or copilot-instructions.md

## Repository Overview
This is a monorepo with backend (/api), frontend (/web), and shared libraries (/lib).
Tech stack: Node.js, Next.js, TypeScript, PostgreSQL.

## How to Work
- Build commands: See .github/docs/building.md
- Testing: See .github/docs/testing.md
- Style guide: See .github/docs/style.md
```

**❌ DON'T:**
```markdown
# AGENTS.md

## Repository Overview
[200 lines of detailed explanation of every directory and file]

## Build Process
[150 lines of every possible build command and edge case]

## Style Guide
[300 lines of every formatting rule, exception, and example]
```

### 2. Use Layered Context

**Structure information in layers:**

1. **Layer 1 (Always Present):** Universal, critical information
   - Tech stack
   - Project purpose
   - Key architectural decisions
   - Critical security requirements

2. **Layer 2 (Referenced):** Task-specific details
   - Build processes
   - Testing procedures
   - Deployment workflows
   - Detailed style guides

3. **Layer 3 (On-Demand):** Specialized knowledge
   - Edge case handling
   - Historical context
   - Complex debugging procedures
   - Legacy system documentation

### 3. Reference, Don't Repeat

**✅ DO:**
```markdown
## Testing
Run tests using the procedures in `.github/docs/testing.md`.
```

**❌ DON'T:**
```markdown
## Testing
To run unit tests:
1. Install dependencies with npm install
2. Set up test database with...
[50 more lines]
```

### 4. Let the Agent Plan and Research

Encourage the agent to use a "research-plan-implement" workflow:

1. **Research:** Load relevant context files
2. **Plan:** Create focused implementation plan
3. **Implement:** Execute with appropriate context

**Example instruction:**
```markdown
When starting a new task:
1. Review relevant documentation from .github/docs/
2. Create a focused plan
3. Load only the context needed for current step
```

### 5. Avoid Instruction Bloat

**Warning signs of bloat:**
- Root instruction file over 100 lines
- Repeating information across multiple files
- Including historical context that's no longer relevant
- Documenting every edge case ever encountered
- Adding "just in case" information

**Solutions:**
- Archive historical context separately
- Use references instead of duplication
- Focus on current, actionable guidance
- Remove outdated information regularly

### 6. Use Specific, Actionable Language

**✅ DO:**
```markdown
- Validate all user inputs before processing
- Use TypeScript strict mode
- Add accessibility attributes to interactive elements
```

**❌ DON'T:**
```markdown
- It's important to think about security
- We generally prefer type safety when possible
- Consider accessibility if relevant
```

---

## File Organization Structure

### Recommended Structure

```
.github/
├── copilot-instructions.md          # Core, always-loaded instructions (< 60 lines)
├── agents/                           # Specialized agents
│   ├── prd.agent.md
│   ├── plan.agent.md
│   └── tdd.agent.md
├── prompts/                          # On-demand prompt templates
│   ├── create-component.prompt.md
│   ├── generate-tests.prompt.md
│   └── code-review.prompt.md
├── instructions/                     # Language/framework-specific
│   ├── react-ts.instructions.md
│   ├── csharp-dotnet.instructions.md
│   └── general-coding.instructions.md
└── docs/                            # Detailed reference docs
    ├── building.md
    ├── testing.md
    ├── deployment.md
    └── architecture.md
```

### File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Instructions | `{topic}.instructions.md` | `react-ts.instructions.md` |
| Prompts | `{action}.prompt.md` | `create-component.prompt.md` |
| Agents | `{role}.agent.md` | `tdd.agent.md` |
| Docs | `{topic}.md` | `testing.md` |

---

## Examples

### Example 1: Good Progressive Disclosure

**Root file (AGENTS.md):** 45 lines
```markdown
# Project Overview
Collaborative document editing platform with real-time sync.
Tech: Node.js, React, PostgreSQL, Redis.

# Key Rules
- Always validate inputs
- Use TypeScript strict mode
- Follow security guidelines in .github/docs/security.md

# How to Work
- Build: See .github/docs/building.md
- Test: See .github/docs/testing.md
- Deploy: See .github/docs/deployment.md
```

**Supplemental files:**
- `.github/docs/building.md` - Build processes (80 lines)
- `.github/docs/testing.md` - Testing procedures (120 lines)
- `.github/docs/security.md` - Security guidelines (150 lines)

**Result:** Agent loads core context always, pulls in detailed docs only when needed.

### Example 2: Poor Progressive Disclosure

**Root file (AGENTS.md):** 450 lines
```markdown
# Project Overview
[200 lines of detailed history and explanations]

# Build Process
[100 lines of every build command and edge case]

# Testing
[150 lines of every test scenario]

[More sections with excessive detail...]
```

**Result:** Context window filled with potentially irrelevant information, degraded performance.

---

## How This Repository Implements Progressive Disclosure

This repository follows the progressive disclosure pattern:

### Core Files (Always Loaded)

1. **`AGENTS.md`** (281 lines - could be optimized further)
   - Repository overview
   - Build commands
   - Git conventions
   - Code style guidelines
   - Key file references

2. **`.github/copilot-instructions.md`** (124 lines)
   - Response identity
   - Project context
   - Code generation guidelines
   - Universal coding standards

### Task-Specific Files (Loaded on Demand)

1. **Instructions** (`.github/instructions/`)
   - `general-coding.instructions.md` - Universal coding practices
   - `react-ts.instructions.md` - React/TypeScript specific
   - `csharp-dotnet.instructions.md` - C#/.NET specific
   - `git.instructions.md` - Git workflow
   - `work-items.instructions.md` - Azure DevOps

2. **Agents** (`.github/agents/`)
   - `prd.agent.md` - Product Requirements Documents
   - `plan.agent.md` - Implementation planning
   - `tdd.agent.md` - Test-Driven Development
   - `devops.agent.md` - DevSecOps expertise

3. **Prompts** (`.github/prompts/`)
   - `create-prd.prompt.md` - PRD creation template
   - `generate-tasks.prompt.md` - Task generation
   - `code-review-checklist.prompt.md` - Code review

### Future Optimization

Consider moving detailed content from `AGENTS.md` to:
- `.github/docs/git-workflow.md` - Git conventions
- `.github/docs/code-style.md` - Style guidelines
- `.github/docs/testing.md` - Testing procedures

This would reduce `AGENTS.md` to ~60 lines while keeping detailed info accessible.

---

## References

### Key Concepts
- **Progressive Disclosure:** Presenting information incrementally based on relevance
- **Layered Context:** Organizing information in hierarchical tiers
- **Context Window:** The limited amount of text an LLM can process at once
- **System Prompt:** Instructions that define AI behavior and capabilities
- **User Prompt:** Specific task or question from the user

### External Resources

- [Writing a good CLAUDE.md - HumanLayer Blog](https://www.hlyr.dev/blog/writing-a-good-claude-md)
- [Stop Bloating Your CLAUDE.md](https://alexop.dev/posts/stop-bloating-your-claude-md-progressive-disclosure-ai-coding-tools/)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [Use Prompt Files in VS Code](https://code.visualstudio.com/docs/copilot/customization/prompt-files)
- [Configure Custom Instructions](https://docs.github.com/en/copilot/how-tos/configure-custom-instructions)
- [Awesome Copilot Repository](https://github.com/github/awesome-copilot)

### Related Files in This Repository

- `AGENTS.md` - Main agent instructions
- `.github/copilot-instructions.md` - GitHub Copilot configuration
- `.github/instructions/` - Language-specific coding guidelines
- `.github/agents/` - Specialized agent definitions
- `.github/prompts/` - Reusable prompt templates

---

**Last Updated:** 2026-01-31

**Maintainers:** Keep this document updated as best practices evolve and the repository structure changes.
