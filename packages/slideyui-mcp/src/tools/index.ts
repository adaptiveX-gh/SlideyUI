/**
 * MCP tool registry
 *
 * Registers and exports all MCP tools for presentation generation.
 */

import type { Tool } from '@modelcontextprotocol/sdk/types.js';

// Tool implementations
import { createPresentationTool } from './create-presentation.js';
import { createCustomThemeTool } from './create-custom-theme.js';
import { addSlideTool } from './add-slide.js';
import { updateSlideTool } from './update-slide.js';
import { exportPresentationTool } from './export-presentation.js';

/**
 * All available MCP tools
 */
export const tools = [
  createPresentationTool,
  createCustomThemeTool,
  addSlideTool,
  updateSlideTool,
  exportPresentationTool,
];

/**
 * Register all tools and return tool definitions
 */
export function registerTools(): Tool[] {
  return tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  }));
}

/**
 * Export individual tool implementations
 */
export {
  createPresentationTool,
  createCustomThemeTool,
  addSlideTool,
  updateSlideTool,
  exportPresentationTool,
};
