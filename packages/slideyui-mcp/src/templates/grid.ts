/**
 * Grid slide template
 *
 * Renders items in a flexible grid layout (2x2, 3x3, etc.)
 * Ideal for feature showcases, product grids, and card-based layouts.
 */

import type {
  GenerationOptions,
} from '../types/index.js';
import { escapeHTML } from '../utils/html.js';
import { generateIcon } from '../utils/icon-generator.js';

/**
 * Grid item interface matching schema
 */
interface GridItem {
  icon?: string;
  title: string;
  description?: string;
  image?: string;
}

/**
 * Grid slide spec interface matching schema
 */
interface GridSlideSpec {
  type: 'grid';
  id?: string;
  notes?: string;
  state?: 'generating' | 'complete' | 'error';
  title?: string;
  subtitle?: string;
  gridType?: '2x2' | '3x3' | '2x3' | '4x2' | 'auto';
  items: GridItem[];
  gap?: 'compact' | 'normal' | 'spacious';
}

/**
 * Feature card item interface matching schema
 */
interface FeatureCardItem {
  icon?: string;
  title: string;
  description: string;
  highlight?: boolean;
}

/**
 * Feature card slide spec interface matching schema
 */
interface FeatureCardSlideSpec {
  type: 'feature-cards';
  id?: string;
  notes?: string;
  state?: 'generating' | 'complete' | 'error';
  title?: string;
  subtitle?: string;
  features: FeatureCardItem[];
  columns?: '2' | '3' | '4' | 'auto';
  gap?: 'compact' | 'normal' | 'spacious';
}

/**
 * Render a single grid item
 */
function renderGridItem(item: GridItem, options: GenerationOptions): string {
  const title = escapeHTML(item.title);
  const description = item.description ? escapeHTML(item.description) : '';

  // Generate icon SVG if icon name is provided
  let iconHTML = '';
  if (item.icon) {
    // Check if icon is a valid icon name (simple heuristic: no < character)
    const isIconName = !item.icon.includes('<');
    if (isIconName) {
      try {
        const iconOptions: { size: number; color: string; theme?: any } = {
          size: 48,
          color: 'var(--slidey-color-primary)',
        };
        if (options.theme) {
          iconOptions.theme = options.theme;
        }
        iconHTML = generateIcon(item.icon as any, iconOptions);
      } catch {
        // If icon generation fails, treat as custom SVG
        iconHTML = item.icon;
      }
    } else {
      // Custom SVG content
      iconHTML = item.icon;
    }
  }

  // Image takes precedence over icon
  const visualHTML = item.image
    ? `<div class="slideyui-grid-item-image">
         <img src="${escapeHTML(item.image)}" alt="${title}" loading="lazy" />
       </div>`
    : iconHTML
    ? `<div class="slideyui-grid-item-icon" aria-hidden="true">${iconHTML}</div>`
    : '';

  return `
    <div class="slideyui-grid-item">
      ${visualHTML}
      <h3 class="slideyui-grid-item-title">${title}</h3>
      ${description ? `<p class="slideyui-grid-item-description">${description}</p>` : ''}
    </div>
  `;
}

/**
 * Get grid column classes based on grid type
 */
function getGridClasses(gridType: string, gap: string): string {
  const gapClass = gap === 'compact' ? 'gap-4' : gap === 'spacious' ? 'gap-10' : 'gap-6';

  switch (gridType) {
    case '2x2':
      return `grid grid-cols-2 ${gapClass}`;
    case '3x3':
      return `grid grid-cols-3 ${gapClass}`;
    case '2x3':
      return `grid grid-cols-2 ${gapClass}`;
    case '4x2':
      return `grid grid-cols-4 ${gapClass}`;
    case 'auto':
      return `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gapClass}`;
    default:
      return `grid grid-cols-2 ${gapClass}`;
  }
}

/**
 * Grid slide template
 */
export function gridTemplate(
  spec: GridSlideSpec,
  options: GenerationOptions
): string {
  const title = spec.title ? escapeHTML(spec.title) : '';
  const subtitle = spec.subtitle ? escapeHTML(spec.subtitle) : '';
  const gridType = spec.gridType || '2x2';
  const gap = spec.gap || 'normal';

  const gridClasses = getGridClasses(gridType, gap);
  const itemsHTML = spec.items
    .map((item) => renderGridItem(item, options))
    .join('\n');

  return `
    <div class="slideyui-card slideyui-grid-card" data-grid-type="${gridType}">
      ${
        title || subtitle
          ? `
        <div class="slideyui-card-header">
          ${title ? `<h2 class="slideyui-card-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="slideyui-card-subtitle">${subtitle}</p>` : ''}
        </div>
      `
          : ''
      }
      <div class="slideyui-card-content">
        <div class="${gridClasses}">
          ${itemsHTML}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render a single feature card
 */
function renderFeatureCard(feature: FeatureCardItem, options: GenerationOptions): string {
  const title = escapeHTML(feature.title);
  const description = escapeHTML(feature.description);
  const highlight = feature.highlight || false;

  // Generate icon SVG if icon name is provided
  let iconHTML = '';
  if (feature.icon) {
    const isIconName = !feature.icon.includes('<');
    if (isIconName) {
      try {
        const iconOptions: { size: number; color: string; theme?: any } = {
          size: 56,
          color: highlight ? 'var(--slidey-color-accent)' : 'var(--slidey-color-primary)',
        };
        if (options.theme) {
          iconOptions.theme = options.theme;
        }
        iconHTML = generateIcon(feature.icon as any, iconOptions);
      } catch {
        iconHTML = feature.icon;
      }
    } else {
      iconHTML = feature.icon;
    }
  }

  const highlightClass = highlight ? 'slideyui-feature-card-highlight' : '';

  return `
    <div class="slideyui-feature-card ${highlightClass}">
      ${iconHTML ? `<div class="slideyui-feature-card-icon" aria-hidden="true">${iconHTML}</div>` : ''}
      <h3 class="slideyui-feature-card-title">${title}</h3>
      <p class="slideyui-feature-card-description">${description}</p>
    </div>
  `;
}

/**
 * Get column classes for feature cards
 */
function getFeatureCardGridClasses(columns: string, gap: string): string {
  const gapClass = gap === 'compact' ? 'gap-4' : gap === 'spacious' ? 'gap-10' : 'gap-6';

  switch (columns) {
    case '2':
      return `grid grid-cols-1 md:grid-cols-2 ${gapClass}`;
    case '3':
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gapClass}`;
    case '4':
      return `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ${gapClass}`;
    case 'auto':
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gapClass}`;
    default:
      return `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ${gapClass}`;
  }
}

/**
 * Feature card slide template
 */
export function featureCardTemplate(
  spec: FeatureCardSlideSpec,
  options: GenerationOptions
): string {
  const title = spec.title ? escapeHTML(spec.title) : '';
  const subtitle = spec.subtitle ? escapeHTML(spec.subtitle) : '';
  const columns = spec.columns || '3';
  const gap = spec.gap || 'normal';

  const gridClasses = getFeatureCardGridClasses(columns, gap);
  const featuresHTML = spec.features
    .map((feature) => renderFeatureCard(feature, options))
    .join('\n');

  return `
    <div class="slideyui-card slideyui-feature-cards-card">
      ${
        title || subtitle
          ? `
        <div class="slideyui-card-header">
          ${title ? `<h2 class="slideyui-card-title">${title}</h2>` : ''}
          ${subtitle ? `<p class="slideyui-card-subtitle">${subtitle}</p>` : ''}
        </div>
      `
          : ''
      }
      <div class="slideyui-card-content">
        <div class="${gridClasses}">
          ${featuresHTML}
        </div>
      </div>
    </div>
  `;
}
