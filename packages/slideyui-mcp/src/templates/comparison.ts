/**
 * Comparison slide template
 *
 * Renders slides with side-by-side comparisons.
 */

import type { ComparisonSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function comparisonTemplate(
  spec: ComparisonSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const leftTitle = renderMarkdown(escapeHTML(spec.leftTitle));
  const rightTitle = renderMarkdown(escapeHTML(spec.rightTitle));

  const leftContent = spec.leftContent
    .map((item) => `<li>${renderMarkdown(escapeHTML(item))}</li>`)
    .join('');
  const rightContent = spec.rightContent
    .map((item) => `<li>${renderMarkdown(escapeHTML(item))}</li>`)
    .join('');

  return `
    <div class="slideyui-card slideyui-comparison-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        <div class="slideyui-comparison-grid">
          <div class="slideyui-comparison-column">
            <h3 class="slideyui-comparison-heading">${leftTitle}</h3>
            <ul class="slideyui-list">
              ${leftContent}
            </ul>
          </div>
          <div class="slideyui-comparison-divider"></div>
          <div class="slideyui-comparison-column">
            <h3 class="slideyui-comparison-heading">${rightTitle}</h3>
            <ul class="slideyui-list">
              ${rightContent}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
}
