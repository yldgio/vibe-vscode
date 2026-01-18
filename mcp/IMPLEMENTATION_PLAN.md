# Vibe VSCode MCP Server - Implementation Plan

## Overview

This document outlines the implementation plan for creating an MCP (Model Context Protocol) server for the Vibe VSCode repository. The MCP server will expose all prompts, agents, instructions, and skills from this repository, similar to the [awesome-copilot MCP server](https://github.com/microsoft/mcp-dotnet-samples/tree/main/awesome-copilot).

## Repository Resources to Expose

The MCP server will expose the following resources from the `.github` directory:

### Agents (5 files)
- `.github/agents/devops.agent.md` - DevSecOps Engineer expert
- `.github/agents/lyra.agent.md` - AI Prompt Optimization Specialist
- `.github/agents/plan.agent.md` - Implementation plan generator
- `.github/agents/prd.agent.md` - PRD Assistant
- `.github/agents/tdd.agent.md` - Test-Driven Development assistant

### Instructions (8 files)
- `.github/instructions/csharp-dotnet.instructions.md` - C# + .NET Development
- `.github/instructions/general-coding.instructions.md` - General coding best practices
- `.github/instructions/git.instructions.md` - Git commit instructions
- `.github/instructions/gitflow.instructions.md` - Gitflow workflow rules
- `.github/instructions/githubflow.instructions.md` - GitHub flow workflow rules
- `.github/instructions/memory.instructions.md` - Memory management
- `.github/instructions/react-ts.instructions.md` - React + TypeScript best practices
- `.github/instructions/work-items.instructions.md` - Azure DevOps work items

### Prompts (17 files)
- `.github/prompts/ado-pipelines.prompt.md`
- `.github/prompts/bicep.prompt.md`
- `.github/prompts/code-review-checklist.prompt.md`
- `.github/prompts/code-review.prompt.md`
- `.github/prompts/create-prd.it.prompt.md`
- `.github/prompts/create-prd.prompt.md`
- `.github/prompts/devops.prompt.md`
- `.github/prompts/e2e_test.prompt.md`
- `.github/prompts/generate-tasks.it.prompt.md`
- `.github/prompts/generate-tasks.prompt.md`
- `.github/prompts/git.prompt.md`
- `.github/prompts/process-task-list.it.prompt.md`
- `.github/prompts/process-task-list.prompt.md`
- `.github/prompts/rest-api-review.prompt.md`
- `.github/prompts/setup.prompt.md`
- `.github/prompts/tech-stack.prompt.md`
- `.github/prompts/test-eng-csharp.prompt.md`

### Skills (7 directories)
- `.github/skills/appinsights-instrumentation` - Application Insights instrumentation
- `.github/skills/azure-resource-visualizer` - Azure resource visualization
- `.github/skills/azure-role-selector` - Azure RBAC role selection
- `.github/skills/canvas-design` - HTML5 Canvas design
- `.github/skills/docx` - Microsoft Word document generation
- `.github/skills/frontend-design` - Frontend UI/UX design
- `.github/skills/mcp-builder` - MCP server building

### ChatModes (5 files) - DEPRECATED
Note: ChatModes are deprecated in favor of agents, but may still be included for compatibility.

## Technical Architecture

### Technology Stack
- **.NET 9 SDK** - Latest .NET version for MCP server
- **ModelContextProtocol.Server** - MCP SDK for .NET
- **ASP.NET Core** - For HTTP/SSE transport support
- **System.Text.Json** - For JSON serialization
- **Docker** - For containerization
- **Azure Container Apps** - For cloud deployment (optional)

### Project Structure

```
mcp/
├── src/
│   └── VibeVscode.McpServer/
│       ├── Program.cs
│       ├── VibeVscode.McpServer.csproj
│       ├── appsettings.json
│       ├── metadata.json (generated)
│       ├── Configurations/
│       │   └── VibeAppSettings.cs
│       ├── Models/
│       │   ├── Agent.cs
│       │   ├── Instruction.cs
│       │   ├── Prompt.cs
│       │   ├── Skill.cs
│       │   ├── Metadata.cs
│       │   └── MetadataResult.cs
│       ├── Services/
│       │   ├── IMetadataService.cs
│       │   └── MetadataService.cs
│       ├── Tools/
│       │   ├── MetadataTool.cs
│       │   └── ResourceMode.cs
│       └── Prompts/
│           └── MetadataPrompt.cs
├── scripts/
│   └── generate-metadata.js (or .cs)
├── .vscode/
│   ├── mcp.stdio.local.json
│   ├── mcp.http.local.json
│   ├── mcp.stdio.container.json
│   └── mcp.http.container.json
├── Dockerfile
├── .dockerignore
├── azure.yaml (optional)
└── README.md
```

## Implementation Phases

### Phase 1: Project Setup and Structure
**Objective**: Create the foundational .NET project structure

**Tasks**:
1. Create `mcp/src/VibeVscode.McpServer` directory
2. Initialize .NET 9 Web SDK project
3. Add NuGet package references:
   - ModelContextProtocol.Server
   - Microsoft.Extensions.Logging
   - System.Text.Json
4. Create basic folder structure (Models, Services, Tools, Prompts, Configurations)
5. Add `.gitignore` for .NET projects
6. Create initial `README.md` with project overview

**Acceptance Criteria**:
- Project builds successfully with `dotnet build`
- All directories are in place
- README documents the project structure

### Phase 2: Model Classes
**Objective**: Define data models for all resource types

**Tasks**:
1. Create `Models/Agent.cs` with properties: Filename, Title, Description
2. Create `Models/Instruction.cs` with properties: Filename, Title, Description
3. Create `Models/Prompt.cs` with properties: Filename, Title, Description
4. Create `Models/Skill.cs` with properties: Directory, Name, Description, Tags
5. Create `Models/Metadata.cs` to aggregate all resources
6. Create `Models/MetadataResult.cs` for tool responses
7. Create `Models/ResourceMode.cs` enum (Agents, Instructions, Prompts, Skills)

**Acceptance Criteria**:
- All models have proper JSON serialization attributes
- Models support nullable reference types
- XML documentation comments are complete

### Phase 3: Metadata Generation
**Objective**: Create automated metadata generation from repository files

**Tasks**:
1. Create `scripts/generate-metadata.js` or `scripts/generate-metadata.cs`
2. Scan `.github/agents/*.agent.md` files and extract frontmatter/title/description
3. Scan `.github/instructions/*.instructions.md` files
4. Scan `.github/prompts/*.prompt.md` files
5. Scan `.github/skills/*/` directories and README.md files
6. Generate `metadata.json` with all resource information
7. Add script to build process (via MSBuild target or CI/CD)
8. Ensure metadata.json is copied to output directory

**Acceptance Criteria**:
- Script successfully extracts metadata from all files
- Generated `metadata.json` is valid JSON
- metadata.json includes all 37+ resources
- Script can be run as part of `dotnet build`

### Phase 4: Metadata Service
**Objective**: Implement service layer for searching and loading resources

**Tasks**:
1. Create `Services/IMetadataService.cs` interface with methods:
   - `Task<Metadata> SearchAsync(string keywords, CancellationToken ct)`
   - `Task<string> LoadAsync(string directory, string filename, CancellationToken ct)`
2. Create `Services/MetadataService.cs` implementation:
   - Load and cache `metadata.json`
   - Implement keyword search across all resource types
   - Load resource files from `.github/` directory (local file system)
3. Add dependency injection registration in `Program.cs`
4. Add proper error handling and logging

**Acceptance Criteria**:
- Service loads metadata.json on startup
- Search filters resources by keywords in title/description
- Load returns file contents from local filesystem
- Service handles missing files gracefully
- All methods are async and support cancellation

### Phase 5: MCP Tools Implementation
**Objective**: Expose MCP tools for resource discovery and loading

**Tasks**:
1. Create `Tools/MetadataTool.cs` with `[McpServerToolType]` attribute
2. Implement `search_resources` tool:
   - Parameters: keywords (string)
   - Returns: MetadataResult with filtered agents, instructions, prompts, skills
   - Description: "Searches Vibe VSCode resources based on keywords"
3. Implement `load_resource` tool:
   - Parameters: mode (ResourceMode enum), filename (string)
   - Returns: File contents as string
   - Description: "Loads a specific resource file from the repository"
4. Add proper ComponentModel descriptions for all parameters
5. Register tool in dependency injection

**Acceptance Criteria**:
- Tools are discoverable via MCP protocol
- search_resources returns accurate filtered results
- load_resource returns actual file contents
- Error messages are user-friendly
- Tools work in both STDIO and HTTP modes

### Phase 6: MCP Prompts Implementation
**Objective**: Provide MCP prompts to help users discover resources

**Tasks**:
1. Create `Prompts/MetadataPrompt.cs` with `[McpServerPromptType]` attribute
2. Implement `get_search_prompt` prompt:
   - Parameters: keyword (string)
   - Returns: Formatted prompt for searching Vibe VSCode resources
   - Should guide users to search local `.github/` directories
3. Implement `get_usage_prompt` prompt (optional):
   - Provides guidance on using the MCP server
4. Register prompts in dependency injection

**Acceptance Criteria**:
- Prompts are discoverable via MCP protocol
- get_search_prompt returns helpful, formatted text
- Prompts reference the correct local directory structure
- Prompts explain how to compare with existing resources

### Phase 7: Application Configuration
**Objective**: Configure the MCP server application

**Tasks**:
1. Create `Configurations/VibeAppSettings.cs` with server configuration
2. Update `Program.cs`:
   - Support both STDIO and HTTP transports (--http flag)
   - Register all services, tools, and prompts
   - Configure JSON serialization options
   - Add OpenAPI/Swagger for HTTP mode
3. Create `appsettings.json` with default settings
4. Add logging configuration

**Acceptance Criteria**:
- Server starts in STDIO mode by default
- Server starts in HTTP mode with --http flag
- All dependencies are properly registered
- Logging works correctly
- Configuration can be overridden via appsettings.json

### Phase 8: Docker Support
**Objective**: Enable containerized deployment

**Tasks**:
1. Create `Dockerfile` for building container image
2. Create `.dockerignore` to exclude unnecessary files
3. Test container build: `docker build -t vibe-mcp:latest .`
4. Test container run: `docker run -i --rm -p 8080:8080 vibe-mcp:latest`
5. Document Docker usage in README

**Acceptance Criteria**:
- Container builds successfully
- Container runs in both STDIO and HTTP modes
- Container size is optimized
- Multi-stage build is used
- Health check endpoint works (for HTTP mode)

### Phase 9: VS Code Integration
**Objective**: Enable VS Code Agent Mode integration

**Tasks**:
1. Create `.vscode/mcp.stdio.local.json` for local STDIO mode
2. Create `.vscode/mcp.http.local.json` for local HTTP mode
3. Create `.vscode/mcp.stdio.container.json` for containerized STDIO mode
4. Create `.vscode/mcp.http.container.json` for containerized HTTP mode
5. Document configuration steps in README
6. Test MCP server discovery in VS Code
7. Test using tools and prompts from VS Code Agent Mode

**Acceptance Criteria**:
- MCP server appears in VS Code MCP server list
- Server can be started from VS Code
- Tools are accessible via hashtag syntax (#search_resources)
- Prompts are accessible via slash syntax (/mcp.vibe.get_search_prompt)
- Resources can be searched and loaded

### Phase 10: Documentation
**Objective**: Provide comprehensive documentation

**Tasks**:
1. Update `mcp/README.md` with:
   - Project overview and features
   - Prerequisites (.NET 9, VS Code, Docker)
   - Installation instructions
   - Usage examples
   - Available tools and prompts
   - Docker deployment
   - Troubleshooting section
2. Update root `README.md` to mention MCP server
3. Add code comments and XML documentation
4. Create CONTRIBUTING.md if needed
5. Add usage screenshots/GIFs

**Acceptance Criteria**:
- README covers all usage scenarios
- Installation steps are clear and tested
- Examples show how to use each tool and prompt
- Screenshots demonstrate the server in action
- Documentation is accurate and up-to-date

### Phase 11: Testing and Validation
**Objective**: Ensure the MCP server works correctly

**Tasks**:
1. Test metadata generation with all current resources
2. Test search_resources tool with various keywords
3. Test load_resource tool for each resource type
4. Test STDIO mode locally
5. Test HTTP mode locally
6. Test Docker container deployment
7. Test VS Code integration end-to-end
8. Verify error handling for edge cases
9. Performance test with large search results

**Acceptance Criteria**:
- All tools return expected results
- All resource types can be searched and loaded
- Error messages are helpful
- Performance is acceptable
- VS Code integration works smoothly
- No memory leaks or resource issues

### Phase 12: Optional Azure Deployment
**Objective**: Enable cloud deployment (optional)

**Tasks**:
1. Create `azure.yaml` for Azure Developer CLI
2. Create infrastructure files in `infra/` directory
3. Document Azure deployment process
4. Test deployment to Azure Container Apps
5. Create `.vscode/mcp.http.remote.json` for cloud deployment

**Acceptance Criteria**:
- Azure deployment succeeds with `azd up`
- Remote MCP server is accessible via HTTPS
- Configuration can be updated via environment variables
- Costs are documented

## Resource Requirements

### Development Environment
- .NET 9 SDK
- Visual Studio Code with C# Dev Kit
- Docker Desktop
- Git
- Node.js (for metadata generation script, if using JS)

### Optional for Azure Deployment
- Azure CLI
- Azure Developer CLI
- Azure subscription

## Success Metrics

1. **Completeness**: All 37+ resources are discoverable and loadable
2. **Functionality**: All MCP tools and prompts work correctly
3. **Integration**: VS Code Agent Mode can use the MCP server
4. **Documentation**: Clear README with examples
5. **Reliability**: Proper error handling and logging
6. **Performance**: Fast search and load operations
7. **Maintainability**: Clean code structure and documentation

## Timeline Estimate

- **Phase 1-2**: 2-4 hours (Project setup and models)
- **Phase 3**: 4-6 hours (Metadata generation script)
- **Phase 4-5**: 6-8 hours (Services and tools)
- **Phase 6-7**: 3-4 hours (Prompts and configuration)
- **Phase 8**: 2-3 hours (Docker support)
- **Phase 9**: 3-4 hours (VS Code integration)
- **Phase 10**: 3-4 hours (Documentation)
- **Phase 11**: 4-6 hours (Testing)
- **Phase 12**: 4-6 hours (Optional Azure deployment)

**Total**: 31-45 hours for core implementation + 4-6 hours for optional Azure deployment

## Risks and Mitigation

### Risk: Metadata extraction complexity
**Mitigation**: Start with simple frontmatter parsing, enhance later

### Risk: File path resolution issues
**Mitigation**: Use absolute paths, test on multiple platforms

### Risk: VS Code MCP integration issues
**Mitigation**: Follow official MCP .NET samples closely, test early

### Risk: Performance with many resources
**Mitigation**: Implement caching, optimize search algorithms

### Risk: Maintaining metadata.json in sync
**Mitigation**: Automate generation in build process, add CI/CD validation

## Future Enhancements

1. **Collections**: Group related resources (similar to awesome-copilot)
2. **Versioning**: Track resource versions and changes
3. **Favorites**: Allow users to mark favorite resources
4. **Statistics**: Track usage of resources via MCP server
5. **Auto-update**: Automatically update metadata when files change
6. **Web UI**: Create a web interface for browsing resources
7. **Export**: Export resources in different formats
8. **Validation**: Validate resource files for consistency

## References

- [MCP .NET Samples - Awesome Copilot](https://github.com/microsoft/mcp-dotnet-samples/tree/main/awesome-copilot)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [VS Code MCP Integration](https://code.visualstudio.com/docs/copilot/copilot-extensibility-overview)
