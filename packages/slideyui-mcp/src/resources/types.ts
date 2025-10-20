/**
 * Resource type definitions for MCP resources
 *
 * Resources provide read-only data that clients can fetch to discover
 * capabilities, themes, templates, and example presentations.
 */

/**
 * MCP Resource definition
 */
export interface Resource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

/**
 * Resource content wrapper
 */
export interface ResourceContent {
  uri: string;
  mimeType: string;
  text?: string;
  blob?: string;
}

/**
 * Resource handler interface
 */
export interface ResourceHandler {
  /**
   * List all resources provided by this handler
   */
  list(): Resource[];

  /**
   * Read a specific resource by URI
   *
   * @param uri - Resource URI to read
   * @returns Resource content
   * @throws Error if resource not found
   */
  read(uri: string): ResourceContent;

  /**
   * Check if this handler can handle a given URI
   *
   * @param uri - Resource URI to check
   * @returns True if this handler can handle the URI
   */
  canHandle(uri: string): boolean;
}

/**
 * Theme metadata
 */
export interface ThemeMetadata {
  name: string;
  displayName: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
  };
  typography: {
    fontFamily: string;
    headingSizes: string[];
  };
  useCases: string[];
  preview?: string;
}

/**
 * Template metadata
 */
export interface TemplateMetadata {
  type: string;
  displayName: string;
  description: string;
  category: string;
  requiredFields: string[];
  optionalFields: string[];
  schema: Record<string, string>;
  example: Record<string, unknown>;
  preview?: string;
}

/**
 * Server capabilities metadata
 */
export interface CapabilitiesMetadata {
  version: string;
  tools: string[];
  templates: number;
  themes: number;
  chartTypes: string[];
  exportFormats: string[];
  aspectRatios: string[];
}

/**
 * Example presentation metadata
 */
export interface ExampleMetadata {
  category: string;
  displayName: string;
  description: string;
  slideCount: number;
  theme: string;
  tags: string[];
  presentation: Record<string, unknown>;
}
