---
name: MCP Builder
description: Build Model Context Protocol (MCP) servers to extend GitHub Copilot and AI agents with custom tools and data sources
---

# MCP Builder

This skill helps you create Model Context Protocol (MCP) servers to extend GitHub Copilot and AI agent capabilities with custom tools, resources, and data sources.

## When to Use This Skill

Use this skill when you need to:
- Extend AI agents with custom functionality
- Connect AI to proprietary data sources
- Build reusable tools for AI workflows
- Create integrations with external APIs
- Implement custom prompts and resources for AI agents
- Enable AI agents to interact with domain-specific systems

## What is MCP?

Model Context Protocol (MCP) is an open protocol that standardizes how AI applications like GitHub Copilot connect to data sources and tools. It allows you to:
- **Expose tools**: Functions that GitHub Copilot and AI agents can call
- **Provide resources**: Data that AI can access
- **Define prompts**: Reusable prompt templates
- **Stream data**: Real-time updates to AI agents

## Quick Start

### Installation

```bash
# Create new MCP server
npm init -y
npm install @modelcontextprotocol/sdk

# Or with TypeScript
npm install --save-dev typescript @types/node
npx tsc --init
```

### Basic MCP Server

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Create server
const server = new Server(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool handlers
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get-weather",
        description: "Get current weather for a location",
        inputSchema: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "City name or zip code",
            },
          },
          required: ["location"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get-weather") {
    const { location } = request.params.arguments as { location: string };
    
    // Mock weather data (replace with actual API call)
    const weather = {
      location,
      temperature: 72,
      condition: "Sunny",
      humidity: 45,
    };
    
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(weather, null, 2),
        },
      ],
    };
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
```

## Building Tools

### Tool with External API

```typescript
import axios from "axios";

// GitHub repo info tool
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get-repo-info",
        description: "Get information about a GitHub repository",
        inputSchema: {
          type: "object",
          properties: {
            owner: {
              type: "string",
              description: "Repository owner (username or organization)",
            },
            repo: {
              type: "string",
              description: "Repository name",
            },
          },
          required: ["owner", "repo"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === "get-repo-info") {
    const { owner, repo } = request.params.arguments as {
      owner: string;
      repo: string;
    };
    
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}`
      );
      
      const info = {
        name: response.data.name,
        description: response.data.description,
        stars: response.data.stargazers_count,
        forks: response.data.forks_count,
        language: response.data.language,
        url: response.data.html_url,
      };
      
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(info, null, 2),
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error fetching repository: ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }
  
  throw new Error(`Unknown tool: ${request.params.name}`);
});
```

### Tool with Database Access

```typescript
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Database query tool
{
  name: "query-customers",
  description: "Query customer database",
  inputSchema: {
    type: "object",
    properties: {
      search: {
        type: "string",
        description: "Customer name or ID to search for",
      },
      limit: {
        type: "number",
        description: "Maximum number of results",
        default: 10,
      },
    },
    required: ["search"],
  },
}

// Handler
const result = await pool.query(
  "SELECT id, name, email FROM customers WHERE name ILIKE $1 LIMIT $2",
  [`%${search}%`, limit]
);

return {
  content: [
    {
      type: "text",
      text: JSON.stringify(result.rows, null, 2),
    },
  ],
};
```

## Providing Resources

Resources are data sources AI can read:

```typescript
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Enable resources capability
const server = new Server(
  {
    name: "docs-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
    },
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "docs://api-reference",
        name: "API Reference",
        description: "Complete API documentation",
        mimeType: "text/plain",
      },
      {
        uri: "docs://getting-started",
        name: "Getting Started Guide",
        description: "Quick start guide for new users",
        mimeType: "text/plain",
      },
    ],
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;
  
  if (uri === "docs://api-reference") {
    const content = await loadApiDocs();
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: content,
        },
      ],
    };
  }
  
  if (uri === "docs://getting-started") {
    const content = await loadGettingStarted();
    return {
      contents: [
        {
          uri,
          mimeType: "text/plain",
          text: content,
        },
      ],
    };
  }
  
  throw new Error(`Unknown resource: ${uri}`);
});
```

## Creating Prompts

Prompts are reusable templates:

```typescript
import {
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Enable prompts capability
const server = new Server(
  {
    name: "prompt-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      prompts: {},
    },
  }
);

// List available prompts
server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "code-review",
        description: "Review code for quality and best practices",
        arguments: [
          {
            name: "language",
            description: "Programming language",
            required: true,
          },
          {
            name: "code",
            description: "Code to review",
            required: true,
          },
        ],
      },
      {
        name: "summarize-text",
        description: "Summarize long text into key points",
        arguments: [
          {
            name: "text",
            description: "Text to summarize",
            required: true,
          },
          {
            name: "length",
            description: "Desired summary length (short/medium/long)",
            required: false,
          },
        ],
      },
    ],
  };
});

// Get prompt content
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  if (request.params.name === "code-review") {
    const { language, code } = request.params.arguments as {
      language: string;
      code: string;
    };
    
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Review this ${language} code for:
1. Code quality and readability
2. Best practices
3. Potential bugs
4. Security issues
5. Performance concerns

Code:
\`\`\`${language}
${code}
\`\`\`

Provide specific, actionable feedback.`,
          },
        },
      ],
    };
  }
  
  if (request.params.name === "summarize-text") {
    const { text, length = "medium" } = request.params.arguments as {
      text: string;
      length?: string;
    };
    
    const lengthGuide = {
      short: "3-5 bullet points",
      medium: "1-2 paragraphs",
      long: "detailed summary with sections",
    };
    
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Summarize the following text into ${lengthGuide[length]}:

${text}`,
          },
        },
      ],
    };
  }
  
  throw new Error(`Unknown prompt: ${request.params.name}`);
});
```

## Complete Example: File System Server

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as fs from "fs/promises";
import * as path from "path";

class FileSystemServer {
  private server: Server;
  private rootPath: string;
  
  constructor(rootPath: string) {
    this.rootPath = rootPath;
    
    this.server = new Server(
      {
        name: "filesystem-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );
    
    this.setupHandlers();
  }
  
  private setupHandlers() {
    // List tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: "read-file",
            description: "Read contents of a file",
            inputSchema: {
              type: "object",
              properties: {
                path: { type: "string", description: "File path" },
              },
              required: ["path"],
            },
          },
          {
            name: "write-file",
            description: "Write contents to a file",
            inputSchema: {
              type: "object",
              properties: {
                path: { type: "string", description: "File path" },
                content: { type: "string", description: "File content" },
              },
              required: ["path", "content"],
            },
          },
          {
            name: "list-directory",
            description: "List files in a directory",
            inputSchema: {
              type: "object",
              properties: {
                path: { type: "string", description: "Directory path" },
              },
              required: ["path"],
            },
          },
        ],
      };
    });
    
    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;
      
      switch (name) {
        case "read-file":
          return this.readFile(args.path as string);
        case "write-file":
          return this.writeFile(args.path as string, args.content as string);
        case "list-directory":
          return this.listDirectory(args.path as string);
        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
    
    // List resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      const files = await this.getAllFiles(this.rootPath);
      return {
        resources: files.map((filePath) => ({
          uri: `file://${filePath}`,
          name: path.basename(filePath),
          description: `File: ${path.relative(this.rootPath, filePath)}`,
          mimeType: "text/plain",
        })),
      };
    });
    
    // Read resource
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const uri = request.params.uri;
      if (uri.startsWith("file://")) {
        const filePath = uri.slice(7);
        const content = await fs.readFile(filePath, "utf-8");
        return {
          contents: [
            {
              uri,
              mimeType: "text/plain",
              text: content,
            },
          ],
        };
      }
      throw new Error(`Unknown resource: ${uri}`);
    });
  }
  
  private async readFile(filePath: string) {
    const fullPath = path.join(this.rootPath, filePath);
    const content = await fs.readFile(fullPath, "utf-8");
    return {
      content: [{ type: "text", text: content }],
    };
  }
  
  private async writeFile(filePath: string, content: string) {
    const fullPath = path.join(this.rootPath, filePath);
    await fs.writeFile(fullPath, content, "utf-8");
    return {
      content: [{ type: "text", text: `File written: ${filePath}` }],
    };
  }
  
  private async listDirectory(dirPath: string) {
    const fullPath = path.join(this.rootPath, dirPath);
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    const list = entries.map((entry) => ({
      name: entry.name,
      type: entry.isDirectory() ? "directory" : "file",
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
    };
  }
  
  private async getAllFiles(dir: string): Promise<string[]> {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(
      entries.map((entry) => {
        const fullPath = path.join(dir, entry.name);
        return entry.isDirectory() ? this.getAllFiles(fullPath) : [fullPath];
      })
    );
    return files.flat();
  }
  
  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("Filesystem MCP server running");
  }
}

// Run server
const server = new FileSystemServer(process.env.ROOT_PATH || "./");
server.start().catch(console.error);
```

## Configuration

### VS Code Configuration

Add your MCP server to VS Code settings for GitHub Copilot:

**Option 1: VS Code settings.json**

```json
{
  "github.copilot.mcpServers": {
    "filesystem": {
      "command": "node",
      "args": ["/path/to/filesystem-server/build/index.js"],
      "env": {
        "ROOT_PATH": "/path/to/allowed/directory"
      }
    }
  }
}
```

**Option 2: Workspace settings**

Create `.vscode/settings.json` in your project:

```json
{
  "github.copilot.mcpServers": {
    "project-tools": {
      "command": "node",
      "args": ["./tools/mcp-server.js"]
    }
  }
}
```

## Best Practices

### Error Handling
- Return meaningful error messages
- Use `isError: true` for error responses
- Log errors for debugging
- Validate inputs thoroughly

### Security
- Validate and sanitize all inputs
- Implement proper authentication if needed
- Restrict file system access to specific directories
- Never expose sensitive data
- Rate limit expensive operations

### Performance
- Cache frequently accessed data
- Use streaming for large datasets
- Implement pagination for lists
- Consider async operations

### Testing

```typescript
// Test tool handler
import { describe, it, expect } from "vitest";

describe("Weather Tool", () => {
  it("should return weather data", async () => {
    const result = await server.callTool("get-weather", {
      location: "San Francisco",
    });
    
    expect(result.content[0].type).toBe("text");
    expect(JSON.parse(result.content[0].text)).toHaveProperty("temperature");
  });
});
```

## Deployment

### npm Package

```json
{
  "name": "my-mcp-server",
  "version": "1.0.0",
  "type": "module",
  "main": "build/index.js",
  "bin": {
    "my-mcp-server": "build/index.js"
  },
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js"
  }
}
```

### Docker Container

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --production

COPY build ./build

CMD ["node", "build/index.js"]
```

## Resources

- [MCP Specification](https://spec.modelcontextprotocol.io/)
- [MCP SDK Documentation](https://github.com/modelcontextprotocol/sdk)
- [Example MCP Servers](https://github.com/modelcontextprotocol/servers)
- [GitHub Copilot Documentation](https://docs.github.com/en/copilot)
- [VS Code Extension API](https://code.visualstudio.com/api)

## References

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Building MCP Servers](https://docs.modelcontextprotocol.io/building-servers)
- [GitHub Copilot Extensibility](https://docs.github.com/en/copilot/building-copilot-extensions)
