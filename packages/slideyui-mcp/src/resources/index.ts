/**
 * Resource registry and management
 *
 * Central registry for all MCP resources. Handles resource discovery,
 * routing, and dispatching to appropriate handlers.
 */

import type { Resource, ResourceContent, ResourceHandler } from './types.js';
import { ThemeResourceHandler } from './themes.js';
import { TemplateResourceHandler } from './templates.js';
import { CapabilitiesResourceHandler } from './capabilities.js';
import { ExamplesResourceHandler } from './examples.js';

/**
 * Resource registry
 */
export class ResourceRegistry {
  private handlers: ResourceHandler[] = [];

  constructor() {
    // Register all resource handlers
    this.registerHandler(new ThemeResourceHandler());
    this.registerHandler(new TemplateResourceHandler());
    this.registerHandler(new CapabilitiesResourceHandler());
    this.registerHandler(new ExamplesResourceHandler());
  }

  /**
   * Register a resource handler
   */
  registerHandler(handler: ResourceHandler): void {
    this.handlers.push(handler);
  }

  /**
   * List all available resources
   */
  listAll(): Resource[] {
    const resources: Resource[] = [];

    for (const handler of this.handlers) {
      resources.push(...handler.list());
    }

    return resources;
  }

  /**
   * Read a resource by URI
   *
   * @param uri - Resource URI to read
   * @returns Resource content
   * @throws Error if no handler can handle the URI
   */
  read(uri: string): ResourceContent {
    for (const handler of this.handlers) {
      if (handler.canHandle(uri)) {
        return handler.read(uri);
      }
    }

    throw new Error(`No handler found for resource: ${uri}`);
  }

  /**
   * Check if a resource exists
   *
   * @param uri - Resource URI to check
   * @returns True if resource exists
   */
  exists(uri: string): boolean {
    return this.handlers.some((handler) => handler.canHandle(uri));
  }
}

/**
 * Singleton instance of resource registry
 */
export const resourceRegistry = new ResourceRegistry();

/**
 * Export resource types and handlers
 */
export type { Resource, ResourceContent, ResourceHandler } from './types.js';
export { ThemeResourceHandler } from './themes.js';
export { TemplateResourceHandler } from './templates.js';
export { CapabilitiesResourceHandler } from './capabilities.js';
export { ExamplesResourceHandler } from './examples.js';

/**
 * Export metadata types
 */
export type {
  ThemeMetadata,
  TemplateMetadata,
  CapabilitiesMetadata,
  ExampleMetadata,
} from './types.js';

/**
 * Export utility functions
 */
export { getThemeMetadata, getAllThemeNames } from './themes.js';
export { getTemplateMetadata, getAllTemplateTypes } from './templates.js';
export { getCapabilities } from './capabilities.js';
export { getExample, getAllExampleCategories } from './examples.js';
