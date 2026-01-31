# GitHub Copilot Configuration Directory

This directory contains all GitHub Copilot customizations for the repository, including instructions, agents, prompts, and skills.

## 📂 Directory Structure

```
.github/
├── PROGRESSIVE_DISCLOSURE.md      # Guide to progressive disclosure pattern
├── copilot-instructions.md        # Core Copilot instructions (always loaded)
├── agents/                        # Specialized AI agents
├── prompts/                       # Reusable prompt templates
├── instructions/                  # Language/framework-specific guidelines
├── skills/                        # Copilot skills for specific workflows
└── chatmodes/                     # [DEPRECATED] Use agents/ instead
```

## 🎯 File Types and Their Roles

### Core Files

#### `copilot-instructions.md`
- **Always loaded** into every GitHub Copilot session
- Defines universal coding standards and preferences
- Keep concise (< 100 lines ideally)
- **Role in LLM:** Acts as system prompt enhancement

#### `PROGRESSIVE_DISCLOSURE.md`
- Comprehensive guide to the progressive disclosure pattern
- Explains best practices for structuring AI agent context
- Reference material for maintaining this repository

### Specialized Directories

#### `agents/` - Domain-Specific AI Agents

Specialized agents invoked with `@` mentions in Copilot Chat:

| Agent | Invoke with | Purpose |
|-------|-------------|---------|
| PRD Assistant | `@prd` | Create Product Requirements Documents |
| Implementation Planner | `@plan` | Generate implementation plans |
| TDD Assistant | `@tdd` | Test-Driven Development workflow |
| DevOps Expert | `@devops` | DevSecOps and deployment strategies |
| Prompt Optimizer | `@lyra` | AI prompt optimization |

**Files:** `{role}.agent.md`  
**Role in LLM:** Loaded as role-based system prompt when agent is invoked

#### `prompts/` - Reusable Prompt Templates

On-demand templates for common development tasks:

- `create-prd.prompt.md` - PRD creation workflow
- `generate-tasks.prompt.md` - Task breakdown from PRD
- `code-review-checklist.prompt.md` - Code review standards
- `setup.prompt.md` - Project setup guidance
- `test-eng-csharp.prompt.md` - C# test generation

**Usage:** Invoke via slash commands in Copilot Chat (e.g., `/create-prd`)  
**Role in LLM:** Loaded as user prompt template when invoked

#### `instructions/` - Language/Framework Guidelines

Detailed coding standards loaded when working with specific technologies:

| File | When Loaded | Purpose |
|------|-------------|---------|
| `general-coding.instructions.md` | Always relevant | Universal coding practices |
| `react-ts.instructions.md` | `**/*.ts`, `**/*.tsx` | React + TypeScript standards |
| `csharp-dotnet.instructions.md` | `**/*.cs`, `**/*.csproj` | C# + .NET guidelines |
| `git.instructions.md` | Git operations | Git workflow and commits |
| `work-items.instructions.md` | Azure DevOps | Agile work item creation |

**Role in LLM:** Contextual instructions based on file patterns

#### `skills/` - Specialized Workflows

Pre-built skills for specific development tasks:

- `appinsights-instrumentation` - Azure Application Insights
- `azure-resource-visualizer` - Azure infrastructure
- `azure-role-selector` - Azure RBAC configuration
- `frontend-design` - UI/UX patterns
- `canvas-design` - HTML5 Canvas graphics
- `docx` - Word document generation
- `mcp-builder` - MCP server development

**Usage:** Automatically applied by Copilot when relevant, or reference explicitly  
**Role in LLM:** Provides domain-specific knowledge and patterns

## 🔍 How Copilot Uses These Files

### Context Loading Hierarchy

1. **Always Loaded (Base Context)**
   - `copilot-instructions.md`
   - Copilot's built-in system instructions

2. **Conditionally Loaded (File Pattern Matching)**
   - Instructions matching current file type
   - Example: Editing `App.tsx` → loads `react-ts.instructions.md`

3. **On-Demand (Explicit Invocation)**
   - Agents via `@agent-name`
   - Prompts via slash commands
   - Skills when explicitly referenced

### Progressive Disclosure in Action

**Example: Editing a React Component**

```
Context Window:
┌─────────────────────────────────────────┐
│ ✓ copilot-instructions.md (123 lines)  │ ← Always loaded
│ ✓ react-ts.instructions.md (90 lines)  │ ← Auto-loaded for .tsx
│ ✓ Current file content                 │ ← File being edited
│ ✓ Related files (if open)              │ ← Additional context
└─────────────────────────────────────────┘

Available but NOT loaded:
• csharp-dotnet.instructions.md (not relevant)
• git.instructions.md (reference if needed)
• All agents (invoke with @ when needed)
• All prompts (invoke with / when needed)
```

This approach maximizes context efficiency while keeping detailed guidance accessible.

## 📝 Best Practices

### Writing New Instructions

1. **Keep Core Files Minimal**
   - `copilot-instructions.md` should be < 100 lines
   - Focus on universal, always-relevant information
   - Reference detailed docs instead of inline content

2. **Use Progressive Disclosure**
   - Core info in root files
   - Details in specific instruction files
   - Advanced topics in separate docs

3. **Be Specific and Actionable**
   ```markdown
   ✅ DO: "Validate all user inputs before processing"
   ❌ DON'T: "Consider security when appropriate"
   ```

4. **Reference, Don't Repeat**
   ```markdown
   ✅ DO: "Follow git workflow in .github/instructions/git.instructions.md"
   ❌ DON'T: [Copy entire git workflow here]
   ```

### Creating New Agents

1. Create file: `.github/agents/{role}.agent.md`
2. Define clear purpose and expertise
3. Include specific tools and capabilities
4. Add usage examples
5. Update this README

### Creating New Prompts

1. Create file: `.github/prompts/{action}.prompt.md`
2. Add YAML frontmatter with metadata
3. Include clear instructions and examples
4. Support variables when needed
5. Test with actual workflows

## 🔄 Maintenance

### When to Update

Update these configurations when:

- **New technologies** are added to the stack
- **Coding standards** change or evolve
- **New workflows** become standard practice
- **Performance issues** arise from context bloat
- **Team feedback** identifies gaps or problems

### Regular Reviews

- **Monthly:** Review `copilot-instructions.md` for relevance
- **Quarterly:** Audit all instruction files for accuracy
- **Per Sprint:** Update based on team feedback
- **On Issues:** When Copilot suggestions don't meet expectations

### Optimization Checklist

- [ ] Core files under 100 lines?
- [ ] No repeated information across files?
- [ ] All references still valid?
- [ ] Outdated information removed?
- [ ] Examples still relevant?
- [ ] New patterns documented?

## 📚 Additional Resources

- [Progressive Disclosure Pattern](./PROGRESSIVE_DISCLOSURE.md) - Comprehensive guide
- [GitHub Copilot Docs](https://docs.github.com/en/copilot) - Official documentation
- [Awesome Copilot](https://github.com/github/awesome-copilot) - Community examples
- [HumanLayer Blog](https://www.hlyr.dev/blog/writing-a-good-claude-md) - Best practices
- [VS Code Prompt Files](https://code.visualstudio.com/docs/copilot/customization/prompt-files) - Prompt file guide

## 🤝 Contributing

When adding new configurations:

1. Follow existing naming conventions
2. Keep files focused and concise
3. Add appropriate frontmatter/metadata
4. Update this README
5. Test with actual Copilot sessions
6. Document any new patterns

---

**Last Updated:** 2026-01-31  
**Maintained by:** Repository contributors

For questions or suggestions, open an issue or discussion.
