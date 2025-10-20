/**
 * @slideyui/mcp - MCP Server for AI-Powered Presentation Generation
 *
 * This package provides a Model Context Protocol (MCP) server that enables
 * AI agents to generate professional presentations using SlideyUI.
 *
 * @packageDocumentation
 */

// Core types
export type {
  PresentationSpec,
  SlideSpec,
  Theme,
  AspectRatio,
  FontSize,
  GenerationOptions,
  GenerationResult,
  SlideType,
} from './types/index.js';

// Schema exports
export {
  PresentationSchema,
  SlideSchema,
  ThemeSchema,
} from './schema/index.js';

// Generator exports
export {
  generatePresentation,
  generateSlide,
  generateStandaloneHTML,
} from './generator/index.js';

// Template exports
export {
  SlideTemplateRegistry,
  registerTemplate,
  getTemplate,
} from './templates/index.js';

// Utility exports
export {
  embedCSS,
  minifyHTML,
  validatePresentation,
} from './utils/index.js';
