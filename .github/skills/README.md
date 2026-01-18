# GitHub Copilot Skills

This directory contains curated AI skills that extend GitHub Copilot's capabilities with specialized knowledge and patterns for common development tasks.

## What are Skills?

Skills are markdown files that provide GitHub Copilot with specialized knowledge, patterns, and best practices for specific tasks. They follow the [GitHub Copilot Skills specification](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills).

## Available Skills

### Azure & Cloud (GitHub Copilot)

#### appinsights-instrumentation
Automates Azure Application Insights integration for monitoring and telemetry in ASP.NET Core and Node.js applications.

**Use when:** Adding monitoring, telemetry, or performance tracking to applications

#### azure-resource-visualizer
Creates visual representations of Azure infrastructure using Mermaid diagrams, PlantUML, and architecture patterns.

**Use when:** Documenting cloud architecture, creating infrastructure diagrams, mapping resource dependencies

#### azure-role-selector
Guides selection and configuration of Azure RBAC roles following least-privilege principles.

**Use when:** Setting up permissions, configuring Managed Identity, implementing security best practices

### Frontend & Design

#### frontend-design
Creates production-grade, distinctive user interfaces with modern UX/UI patterns and accessibility.

**Use when:** Building web interfaces, implementing design systems, creating responsive layouts

#### canvas-design
Builds interactive HTML5 Canvas visualizations, graphics, and animations.

**Use when:** Creating data visualizations, building interactive graphics, implementing animations

### Document Generation

#### docx
Generates and manipulates Microsoft Word documents programmatically using JavaScript/TypeScript or Python.

**Use when:** Creating reports, generating contracts, automating document workflows

### Extensibility

#### mcp-builder
Builds Model Context Protocol (MCP) servers to extend GitHub Copilot with custom tools and data sources.

**Use when:** Creating custom integrations, exposing proprietary data to AI, building reusable tools

## How to Use

Skills are automatically available to GitHub Copilot when present in the `.github/skills/` directory. Reference them in your prompts:

```
@workspace Use the appinsights-instrumentation skill to add telemetry to my ASP.NET Core app
```

Or simply describe what you want to do, and Copilot will use the relevant skills automatically:

```
Add Application Insights monitoring to this application
```

## Skill Structure

Each skill directory contains a `SKILL.md` file with:

- **YAML frontmatter**: Name and description
- **When to Use**: Clear use case guidance
- **Capabilities**: What the skill can help with
- **Code Examples**: Practical implementation patterns
- **Best Practices**: Security, performance, and quality guidance
- **References**: Links to official documentation

## Contributing

To add a new skill:

1. Create a new directory under `.github/skills/`
2. Add a `SKILL.md` file following the format of existing skills
3. Include YAML frontmatter with name and description
4. Provide clear examples and use cases
5. Follow best practices for security and code quality

## References

- [GitHub Copilot Skills Documentation](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [GitHub Copilot Extensibility](https://docs.github.com/en/copilot)
