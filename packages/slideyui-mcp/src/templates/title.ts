/**
 * Title slide template
 *
 * Renders opening slides with title, subtitle, author, and date.
 */

import type { TitleSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function titleTemplate(
  spec: TitleSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const subtitle = spec.subtitle ? renderMarkdown(escapeHTML(spec.subtitle)) : '';
  const author = spec.author ? renderMarkdown(escapeHTML(spec.author)) : '';
  const date = spec.date ? renderMarkdown(escapeHTML(spec.date)) : '';

  return `
    <div class="slideyui-card slideyui-title-card">
      <div class="slideyui-card-content">
        <h1 class="slideyui-title">${title}</h1>
        ${subtitle ? `<p class="slideyui-subtitle">${subtitle}</p>` : ''}
        ${
          author || date
            ? `
          <div class="slideyui-metadata">
            ${author ? `<span class="slideyui-author">${author}</span>` : ''}
            ${date ? `<span class="slideyui-date">${date}</span>` : ''}
          </div>
        `
            : ''
        }
      </div>
    </div>
  `;
}
