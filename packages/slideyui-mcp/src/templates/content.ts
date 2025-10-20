/**
 * Content slide template
 *
 * Renders slides with title and bullet points or text content.
 */

import type { ContentSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function contentTemplate(
  spec: ContentSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const layout = spec.layout ?? 'single-column';

  // Handle content as array or string
  const contentItems = Array.isArray(spec.content)
    ? spec.content
    : [spec.content];

  const contentHTML =
    contentItems.length === 1 && !Array.isArray(spec.content)
      ? `<p class="slideyui-text">${renderMarkdown(escapeHTML(contentItems[0] ?? ''))}</p>`
      : `
      <ul class="slideyui-list">
        ${contentItems.map((item) => `<li>${renderMarkdown(escapeHTML(item))}</li>`).join('\n')}
      </ul>
    `;

  const layoutClass =
    layout === 'two-column'
      ? 'slideyui-layout-two-column'
      : 'slideyui-layout-single-column';

  return `
    <div class="slideyui-card slideyui-content-card ${layoutClass}">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        ${contentHTML}
      </div>
    </div>
  `;
}
