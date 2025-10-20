/**
 * Validation utilities
 */

import { PresentationSchema } from '../schema/index.js';
import type { PresentationSpec } from '../types/index.js';

/**
 * Validate a presentation specification
 *
 * @param spec - Presentation spec to validate
 * @returns Validation result
 */
export function validatePresentation(spec: unknown): {
  valid: boolean;
  errors?: string[];
  data?: PresentationSpec;
} {
  try {
    const data = PresentationSchema.parse(spec);
    return {
      valid: true,
      data: data as PresentationSpec,
    };
  } catch (error) {
    const errors =
      error instanceof Error
        ? [error.message]
        : ['Unknown validation error'];

    return {
      valid: false,
      errors,
    };
  }
}

/**
 * Check if a presentation meets quality standards
 *
 * @param spec - Presentation specification
 * @returns Quality check result with warnings
 */
export function checkPresentationQuality(spec: PresentationSpec): {
  warnings: string[];
  score: number;
} {
  const warnings: string[] = [];
  let score = 100;

  // Check slide count
  if (spec.slides.length < 3) {
    warnings.push('Presentation has fewer than 3 slides');
    score -= 10;
  }

  if (spec.slides.length > 50) {
    warnings.push('Presentation has more than 50 slides - consider splitting');
    score -= 5;
  }

  // Check for title slide
  if (spec.slides[0]?.type !== 'title') {
    warnings.push('Presentation should start with a title slide');
    score -= 10;
  }

  // Check for metadata
  if (!spec.metadata?.author) {
    warnings.push('Consider adding author metadata');
    score -= 5;
  }

  // Check content quality
  for (const slide of spec.slides) {
    if (slide.type === 'content') {
      const content = Array.isArray(slide.content)
        ? slide.content
        : [slide.content];

      if (content.length > 7) {
        warnings.push(
          `Slide "${slide.title}" has too many bullet points (${content.length}). Consider splitting.`
        );
        score -= 5;
      }
    }
  }

  return {
    warnings,
    score: Math.max(0, score),
  };
}
