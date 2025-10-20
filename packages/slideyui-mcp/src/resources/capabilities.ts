/**
 * Capabilities resource handler
 *
 * Provides server capabilities and feature information via MCP resources.
 */

import type {
  Resource,
  ResourceContent,
  ResourceHandler,
  CapabilitiesMetadata,
} from './types.js';
import { getAllThemeNames } from './themes.js';
import { getAllTemplateTypes } from './templates.js';

/**
 * Server capabilities
 */
const CAPABILITIES: CapabilitiesMetadata = {
  version: '0.1.0',
  tools: ['create_presentation', 'add_slide', 'update_slide', 'export_presentation'],
  templates: 16,
  themes: 5,
  chartTypes: ['bar', 'line', 'area', 'pie', 'doughnut', 'scatter'],
  exportFormats: ['html', 'pdf-html', 'json'],
  aspectRatios: ['16:9', '4:3'],
};

/**
 * Capabilities resource handler
 */
export class CapabilitiesResourceHandler implements ResourceHandler {
  private readonly baseUri = 'slideyui://capabilities';

  /**
   * List capabilities resource
   */
  list(): Resource[] {
    return [
      {
        uri: this.baseUri,
        name: 'Server Capabilities',
        description:
          'Complete list of server capabilities including tools, templates, themes, and supported formats',
        mimeType: 'application/json',
      },
    ];
  }

  /**
   * Read capabilities resource
   */
  read(uri: string): ResourceContent {
    if (uri !== this.baseUri) {
      throw new Error(`Unknown capabilities resource: ${uri}`);
    }

    // Get current counts dynamically
    const capabilities = {
      ...CAPABILITIES,
      templates: getAllTemplateTypes().length,
      themes: getAllThemeNames().length,
    };

    // Add detailed information
    const detailedCapabilities = {
      ...capabilities,
      description: 'SlideyUI MCP Server for AI-powered presentation generation',
      features: {
        'AI-First Design': 'Optimized for LLM reasoning and token efficiency',
        'Framework Agnostic': 'Generates standalone HTML with embedded CSS',
        'Production Charts': 'Full SVG chart rendering with projection optimization',
        'Theme System': '5 professional themes for different use cases',
        'Export Options': 'HTML, PDF-ready HTML, and JSON formats',
        'Type Safety': 'Full TypeScript support with Zod validation',
      },
      limits: {
        maxSlidesPerPresentation: 'unlimited',
        maxChartDataPoints: 1000,
        supportedImageFormats: ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'],
        supportedVideoFormats: ['mp4', 'webm', 'ogg'],
      },
      templateCategories: [
        'Title & Impact',
        'Content',
        'Data & Metrics',
        'Process & Timeline',
        'Media',
        'Product',
      ],
    };

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(detailedCapabilities, null, 2),
    };
  }

  /**
   * Check if URI is a capabilities resource
   */
  canHandle(uri: string): boolean {
    return uri === this.baseUri;
  }
}

/**
 * Get server capabilities
 */
export function getCapabilities(): CapabilitiesMetadata {
  return {
    ...CAPABILITIES,
    templates: getAllTemplateTypes().length,
    themes: getAllThemeNames().length,
  };
}
