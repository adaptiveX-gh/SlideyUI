/**
 * Two-column slide template
 *
 * Renders flexible two-column layouts supporting text, images, or lists
 * in each column with configurable column ratios.
 */

import type { TwoColumnSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

/**
 * Render column content based on type
 */
function renderColumnContent(
  type: 'text' | 'image' | 'list',
  content: string | string[]
): string {
  if (type === 'image' && typeof content === 'string') {
    return `
      <div class="slideyui-image-container">
        <img src="${escapeHTML(content)}" alt="" class="slideyui-image" />
      </div>
    `;
  }

  if (type === 'list') {
    const items = Array.isArray(content) ? content : [content];
    return `
      <ul class="slideyui-list">
        ${items.map((item) => `<li>${escapeHTML(item)}</li>`).join('\n')}
      </ul>
    `;
  }

  // Default to text
  const text = Array.isArray(content) ? content.join('\n\n') : content;
  return `<div class="slideyui-text">${escapeHTML(text)}</div>`;
}

/**
 * Get grid column classes based on ratio
 */
function getColumnClasses(ratio: string): [string, string] {
  switch (ratio) {
    case '60-40':
      return ['col-span-12 md:col-span-7', 'col-span-12 md:col-span-5'];
    case '40-60':
      return ['col-span-12 md:col-span-5', 'col-span-12 md:col-span-7'];
    case '70-30':
      return ['col-span-12 md:col-span-8', 'col-span-12 md:col-span-4'];
    case '30-70':
      return ['col-span-12 md:col-span-4', 'col-span-12 md:col-span-8'];
    case '50-50':
    default:
      return ['col-span-12 md:col-span-6', 'col-span-12 md:col-span-6'];
  }
}

export function twoColumnTemplate(
  spec: TwoColumnSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? escapeHTML(spec.title) : '';
  const ratio = spec.columnRatio ?? '50-50';
  const [leftClass, rightClass] = getColumnClasses(ratio);

  const leftContent = renderColumnContent(
    spec.leftColumn.type,
    spec.leftColumn.content
  );
  const rightContent = renderColumnContent(
    spec.rightColumn.type,
    spec.rightColumn.content
  );

  return `
    <div class="slideyui-card slideyui-two-column-card">
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
        <div class="grid grid-cols-12 gap-6 md:gap-8">
          <div class="${leftClass}">
            ${leftContent}
          </div>
          <div class="${rightClass}">
            ${rightContent}
          </div>
        </div>
      </div>
    </div>
  `;
}
