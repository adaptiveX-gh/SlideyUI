/**
 * update_slide tool
 *
 * Update an existing slide (for editing workflows).
 */

import { SlideSchema, GenerationOptionsSchema } from '../schema/index.js';
import { generateSlide } from '../generator/index.js';
import type { SlideSpec, GenerationOptions } from '../types/index.js';

export const updateSlideTool = {
  name: 'update_slide',
  description:
    'Regenerate HTML for a slide with updated content. ' +
    'Use this when modifying an existing slide in a presentation.',

  inputSchema: {
    type: 'object' as const,
    properties: {
      slideId: {
        type: 'string',
        description: 'ID of the slide to update',
      },
      slide: {
        type: 'object',
        description: 'Updated slide specification',
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
    },
    required: ['slideId', 'slide'],
  },

  async handler(args: Record<string, unknown>) {
    try {
      const slideId = args.slideId as string;
      const slide = SlideSchema.parse(args.slide) as SlideSpec;
      const options = args.options
        ? (GenerationOptionsSchema.parse(args.options) as GenerationOptions)
        : {};

      // Ensure slide has the correct ID
      slide.id = slideId;

      // Generate updated slide HTML
      const html = generateSlide(slide, options);

      return {
        success: true,
        html,
        slideId,
        slideType: slide.type,
        message: `Updated slide ${slideId}`,
      };
    } catch (error) {
      // Import error formatter dynamically to avoid circular dependencies
      const { formatValidationError } = await import('../utils/error-formatter.js');
      const formatted = formatValidationError(error);

      throw new Error(
        `Slide update failed:\n\n${formatted.details || formatted.message}`
      );
    }
  },
};
