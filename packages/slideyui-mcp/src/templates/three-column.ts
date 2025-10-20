/**
 * Three-column slide template
 *
 * Renders three equal-width columns ideal for displaying features,
 * benefits, or team members. Supports optional icons and headings.
 */

import type {
  ThreeColumnSlideSpec,
  GenerationOptions,
} from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

/**
 * Render a single column
 */
function renderColumn(column: {
  heading?: string;
  icon?: string;
  content: string | string[];
}): string {
  const heading = column.heading ? escapeHTML(column.heading) : '';
  const icon = column.icon ? escapeHTML(column.icon) : '';

  // Render content as list if array, otherwise as text
  const contentHTML = Array.isArray(column.content)
    ? `
      <ul class="slideyui-list">
        ${column.content.map((item) => `<li>${escapeHTML(item)}</li>`).join('\n')}
      </ul>
    `
    : `<div class="slideyui-text">${escapeHTML(column.content)}</div>`;

  return `
    <div class="slideyui-column-item">
      ${icon ? `<div class="slideyui-column-icon" aria-hidden="true">${icon}</div>` : ''}
      ${heading ? `<h3 class="slideyui-column-heading">${heading}</h3>` : ''}
      <div class="slideyui-column-content">
        ${contentHTML}
      </div>
    </div>
  `;
}

export function threeColumnTemplate(
  spec: ThreeColumnSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? escapeHTML(spec.title) : '';

  const columnsHTML = spec.columns
    .map((column) => renderColumn(column))
    .join('\n');

  return `
    <div class="slideyui-card slideyui-three-column-card">
      ${
        title
          ? `
        <div class="slideyui-card-header">
          <h2 class="slideyui-card-title">${title}</h2>
        </div>
      `
          : ''
      }
      <div class="slideyui-card-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          ${columnsHTML}
        </div>
      </div>
    </div>
  `;
}
