/**
 * add_slide tool
 *
 * Add a new slide to an existing presentation (for iterative generation).
 */

import { SlideSchema, GenerationOptionsSchema } from '../schema/index.js';
import { generateSlide } from '../generator/index.js';
import type { SlideSpec, GenerationOptions } from '../types/index.js';

export const addSlideTool = {
  name: 'add_slide',
  description:
    'Generate HTML for a single slide that can be appended to an existing presentation. ' +
    'Useful for iterative presentation building or adding slides dynamically.',

  inputSchema: {
    type: 'object' as const,
    properties: {
      slide: {
        type: 'object',
        description: 'Slide specification',
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
      options: {
        type: 'object',
        description: 'Optional generation settings',
        properties: {
          aspectRatio: {
            type: 'string',
            enum: ['16:9', '4:3'],
          },
          fontSize: {
            type: 'string',
            enum: ['default', 'large', 'xlarge'],
          },
        },
      },
      index: {
        type: 'number',
        description: 'Slide index (for ID generation)',
      },
    },
    required: ['slide'],
  },

  async handler(args: Record<string, unknown>) {
    // Validate input
    const slide = SlideSchema.parse(args.slide) as SlideSpec;
    const options = args.options
      ? (GenerationOptionsSchema.parse(args.options) as GenerationOptions)
      : {};
    const index = typeof args.index === 'number' ? args.index : undefined;

    // Generate slide HTML
    const html = generateSlide(slide, options, index);

    return {
      success: true,
      html,
      slideType: slide.type,
      message: `Generated ${slide.type} slide`,
    };
  },
};
