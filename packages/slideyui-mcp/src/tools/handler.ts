/**
 * Tool call handler
 *
 * Routes tool calls to appropriate implementations.
 */

import { tools } from './index.js';

/**
 * Handle a tool call by name
 *
 * @param toolName - Name of the tool to call
 * @param args - Tool arguments
 * @returns Tool execution result
 */
export async function handleToolCall(
  toolName: string,
  args: Record<string, unknown>
): Promise<unknown> {
  const tool = tools.find((t) => t.name === toolName);

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  // Execute the tool's handler
  return await tool.handler(args);
}
