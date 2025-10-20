/**
 * Four-column slide template
 *
 * Renders four equal-width columns in a grid layout, ideal for
 * showcasing metrics, features, logos, or stats. Responsive layout
 * switches to 2x2 grid on mobile devices.
 */

import type {
  FourColumnSlideSpec,
  GenerationOptions,
} from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

/**
 * Render a single column
 */
function renderColumn(column: {
  heading?: string;
  icon?: string;
  content: string;
}): string {
  const heading = column.heading ? escapeHTML(column.heading) : '';
  const icon = column.icon ? escapeHTML(column.icon) : '';
  const content = escapeHTML(column.content);

  return `
    <div class="slideyui-column-item">
      ${icon ? `<div class="slideyui-column-icon" aria-hidden="true">${icon}</div>` : ''}
      ${heading ? `<h3 class="slideyui-column-heading">${heading}</h3>` : ''}
      <div class="slideyui-column-content">
        <div class="slideyui-text">${content}</div>
      </div>
    </div>
  `;
}

export function fourColumnTemplate(
  spec: FourColumnSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? escapeHTML(spec.title) : '';

  const columnsHTML = spec.columns
    .map((column) => renderColumn(column))
    .join('\n');

  return `
    <div class="slideyui-card slideyui-four-column-card">
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
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          ${columnsHTML}
        </div>
      </div>
    </div>
  `;
}
