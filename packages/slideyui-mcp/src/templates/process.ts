/**
 * Process slide template
 *
 * Renders slides with step-by-step workflows.
 */

import type { ProcessSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

export function processTemplate(
  spec: ProcessSlideSpec,
  _options: GenerationOptions
): string {
  const title = escapeHTML(spec.title);
  const layout = spec.layout ?? 'horizontal';
  const layoutClass = `slideyui-process-${layout}`;

  const stepsHTML = spec.steps
    .map(
      (step, index) => `
    <div class="slideyui-process-step">
      <div class="slideyui-process-number">${index + 1}</div>
      <div class="slideyui-process-content">
        <h3 class="slideyui-process-title">${escapeHTML(step.title)}</h3>
        ${step.description ? `<p class="slideyui-process-description">${escapeHTML(step.description)}</p>` : ''}
      </div>
    </div>
  `
    )
    .join('');

  return `
    <div class="slideyui-card slideyui-process-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        <div class="slideyui-process ${layoutClass}">
          ${stepsHTML}
        </div>
      </div>
    </div>
  `;
}
