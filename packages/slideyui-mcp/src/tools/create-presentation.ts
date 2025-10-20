/**
 * create_presentation tool
 *
 * Creates a complete presentation from a specification.
 */

import { PresentationSchema } from '../schema/index.js';
import { generatePresentation } from '../generator/index.js';
import type { PresentationSpec } from '../types/index.js';

export const createPresentationTool = {
  name: 'create_presentation',
  description:
    'Generate a complete standalone HTML presentation from a structured specification. ' +
    'Returns HTML that can be saved to a file and opened in any browser. ' +
    'Includes embedded CSS, navigation controls, and print support.',

  inputSchema: {
    type: 'object',
    properties: {
      theme: {
        type: 'string',
        enum: ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'],
        description: 'Presentation theme (corporate, pitch-deck, academic, workshop, startup)',
      },
      title: {
        type: 'string',
        description: 'Presentation title (shown in browser tab)',
        minLength: 1,
      },
      slides: {
        type: 'array',
        description: 'Array of slide specifications',
        items: {
          type: 'object',
          properties: {
            type: {
              type: 'string',
              enum: [
                'title',
                'content',
                'media',
                'data',
                'quote',
                'timeline',
                'comparison',
                'process',
                'section-header',
                'blank',
              ],
            },
          },
          required: ['type'],
        },
        minItems: 1,
      },
      options: {
        type: 'object',
        description: 'Optional generation settings',
        properties: {
          aspectRatio: {
            type: 'string',
            enum: ['16:9', '4:3'],
            description: 'Slide aspect ratio (default: 16:9)',
          },
          fontSize: {
            type: 'string',
            enum: ['default', 'large', 'xlarge'],
            description: 'Base font size (default, large, xlarge)',
          },
          minify: {
            type: 'boolean',
            description: 'Minify output HTML (default: true)',
          },
        },
      },
      metadata: {
        type: 'object',
        description: 'Optional presentation metadata',
        properties: {
          author: { type: 'string' },
          date: { type: 'string' },
          version: { type: 'string' },
          description: { type: 'string' },
          tags: {
            type: 'array',
            items: { type: 'string' },
          },
        },
      },
    },
    required: ['theme', 'title', 'slides'],
  },

  async handler(args: Record<string, unknown>) {
    // Validate input
    const spec = PresentationSchema.parse(args) as PresentationSpec;

    // Generate presentation
    const result = await generatePresentation(spec);

    return {
      success: true,
      html: result.html,
      metadata: result.metadata,
      message: `Generated ${result.metadata.slideCount} slides using ${result.metadata.theme} theme`,
    };
  },
};
