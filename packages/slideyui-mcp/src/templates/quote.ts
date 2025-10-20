/**
 * Quote slide template
 *
 * Renders slides with pull quotes and testimonials.
 */

import type { QuoteSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function quoteTemplate(
  spec: QuoteSlideSpec,
  _options: GenerationOptions
): string {
  const quote = renderMarkdown(escapeHTML(spec.quote));
  const author = renderMarkdown(escapeHTML(spec.author));
  const context = spec.context ? renderMarkdown(escapeHTML(spec.context)) : '';

  return `
    <div class="slideyui-card slideyui-quote-card">
      <div class="slideyui-card-content">
        <blockquote class="slideyui-quote">
          <p class="slideyui-quote-text">"${quote}"</p>
          <footer class="slideyui-quote-footer">
            <cite class="slideyui-quote-author">${author}</cite>
            ${context ? `<span class="slideyui-quote-context">${context}</span>` : ''}
          </footer>
        </blockquote>
      </div>
    </div>
  `;
}
