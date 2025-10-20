/**
 * Section header slide template
 *
 * Renders section divider slides with title and optional subtitle.
 */

import type { SectionHeaderSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function sectionHeaderTemplate(
  spec: SectionHeaderSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const subtitle = spec.subtitle ? renderMarkdown(escapeHTML(spec.subtitle)) : '';

  return `
    <div class="slideyui-card slideyui-section-header-card">
      <div class="slideyui-card-content">
        <h1 class="slideyui-section-title">${title}</h1>
        ${subtitle ? `<p class="slideyui-section-subtitle">${subtitle}</p>` : ''}
      </div>
    </div>
  `;
}
