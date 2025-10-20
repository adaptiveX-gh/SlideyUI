/**
 * Blank slide template
 *
 * Renders empty slides with optional custom content.
 */

import type { BlankSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

export function blankTemplate(
  spec: BlankSlideSpec,
  _options: GenerationOptions
): string {
  const content = spec.content ? escapeHTML(spec.content) : '';

  return `
    <div class="slideyui-card slideyui-blank-card">
      <div class="slideyui-card-content">
        ${content ? `<div class="slideyui-blank-content">${content}</div>` : ''}
      </div>
    </div>
  `;
}
