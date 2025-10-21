/**
 * Slide template registry and template implementations
 *
 * This module provides a registry of slide templates that convert
 * slide specifications into HTML using SlideyUI CSS classes.
 */

import type { SlideType, SlideTemplate } from '../types/index.js';

// Import individual template implementations
import { titleTemplate } from './title.js';
import { contentTemplate } from './content.js';
import { mediaTemplate } from './media.js';
import { dataTemplate } from './data.js';
import { quoteTemplate } from './quote.js';
import { timelineTemplate } from './timeline.js';
import { comparisonTemplate } from './comparison.js';
import { processTemplate } from './process.js';
import { sectionHeaderTemplate } from './section-header.js';
import { blankTemplate } from './blank.js';
import { heroTemplate } from './hero.js';
import { twoColumnTemplate } from './two-column.js';
import { threeColumnTemplate } from './three-column.js';
import { fourColumnTemplate } from './four-column.js';
import { chartWithMetricsTemplate } from './chart-with-metrics.js';
import { productOverviewTemplate } from './product-overview.js';
import { gridTemplate, featureCardTemplate } from './grid.js';
import { teamTemplate } from './team.js';
import { pricingTemplate } from './pricing.js';
import { codeTemplate } from './code.js';

/**
 * Template registry mapping slide types to template functions
 */
const templateRegistry = new Map<SlideType, SlideTemplate>([
  ['title', titleTemplate as SlideTemplate],
  ['content', contentTemplate as SlideTemplate],
  ['media', mediaTemplate as SlideTemplate],
  ['data', dataTemplate as SlideTemplate],
  ['quote', quoteTemplate as SlideTemplate],
  ['timeline', timelineTemplate as SlideTemplate],
  ['comparison', comparisonTemplate as SlideTemplate],
  ['process', processTemplate as SlideTemplate],
  ['section-header', sectionHeaderTemplate as SlideTemplate],
  ['blank', blankTemplate as SlideTemplate],
  ['hero', heroTemplate as SlideTemplate],
  ['two-column', twoColumnTemplate as SlideTemplate],
  ['three-column', threeColumnTemplate as SlideTemplate],
  ['four-column', fourColumnTemplate as SlideTemplate],
  ['chart-with-metrics', chartWithMetricsTemplate as SlideTemplate],
  ['product-overview', productOverviewTemplate as SlideTemplate],
  ['grid', gridTemplate as SlideTemplate],
  ['feature-cards', featureCardTemplate as SlideTemplate],
  ['team', teamTemplate as SlideTemplate],
  ['pricing', pricingTemplate as SlideTemplate],
  ['code', codeTemplate as SlideTemplate],
]);

/**
 * Get a slide template by type
 *
 * @param type - Slide type
 * @returns Template function
 * @throws Error if template not found
 */
export function getTemplate(type: SlideType): SlideTemplate {
  const template = templateRegistry.get(type);
  if (!template) {
    throw new Error(`Template not found for slide type: ${type}`);
  }
  return template;
}

/**
 * Register a custom template
 *
 * @param type - Slide type
 * @param template - Template function
 */
export function registerTemplate(
  type: SlideType,
  template: SlideTemplate
): void {
  templateRegistry.set(type, template);
}

/**
 * Check if a template exists for a given type
 *
 * @param type - Slide type
 * @returns True if template exists
 */
export function hasTemplate(type: SlideType): boolean {
  return templateRegistry.has(type);
}

/**
 * Get all registered template types
 *
 * @returns Array of slide types
 */
export function getAllTemplateTypes(): SlideType[] {
  return Array.from(templateRegistry.keys());
}

/**
 * Export the template registry for advanced use cases
 */
export const SlideTemplateRegistry = templateRegistry;

/**
 * Export individual templates for direct use
 */
export {
  titleTemplate,
  contentTemplate,
  mediaTemplate,
  dataTemplate,
  quoteTemplate,
  timelineTemplate,
  comparisonTemplate,
  processTemplate,
  sectionHeaderTemplate,
  blankTemplate,
  heroTemplate,
  twoColumnTemplate,
  threeColumnTemplate,
  fourColumnTemplate,
  chartWithMetricsTemplate,
  productOverviewTemplate,
  gridTemplate,
  featureCardTemplate,
  teamTemplate,
  pricingTemplate,
  codeTemplate,
};
