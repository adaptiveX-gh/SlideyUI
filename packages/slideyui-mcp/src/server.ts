/**
 * MCP Server Entry Point
 *
 * Starts the Model Context Protocol server for SlideyUI presentation generation.
 * This server exposes tools that AI agents can use to create presentations.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';

import { registerTools } from './tools/index.js';
import { handleToolCall } from './tools/handler.js';
import { resourceRegistry } from './resources/index.js';

/**
 * Initialize and start the MCP server
 */
async function main() {
  // Create MCP server instance
  const server = new Server(
    {
      name: '@slideyui/mcp',
      version: '0.1.0',
    },
    {
      capabilities: {
        tools: {},
        resources: {},
      },
    }
  );

  // Register all available tools
  const tools = registerTools();

  // Handle list_tools request
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map(
      (tool): Tool => ({
        name: tool.name,
        description: tool.description,
        inputSchema: tool.inputSchema,
      })
    ),
  }));

  // Handle call_tool request
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    try {
      const result = await handleToolCall(
        request.params.name,
        request.params.arguments ?? {}
      );

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                error: errorMessage,
                tool: request.params.name,
              },
              null,
              2
            ),
          },
        ],
        isError: true,
      };
    }
  });

  // Handle list_resources request
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    try {
      const resources = resourceRegistry.listAll();

      return {
        resources: resources.map((resource) => ({
          uri: resource.uri,
          name: resource.name,
          description: resource.description,
          mimeType: resource.mimeType,
        })),
      };
    } catch (error) {
      console.error('Error listing resources:', error);
      return { resources: [] };
    }
  });

  // Handle read_resource request
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    try {
      const uri = request.params.uri;
      const resourceContent = resourceRegistry.read(uri);

      return {
        contents: [
          {
            uri: resourceContent.uri,
            mimeType: resourceContent.mimeType,
            text: resourceContent.text,
            blob: resourceContent.blob,
          },
        ],
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      throw new Error(`Failed to read resource: ${errorMessage}`);
    }
  });

  // Start server with stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('SlideyUI MCP server started successfully');
}

// Run server
main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
