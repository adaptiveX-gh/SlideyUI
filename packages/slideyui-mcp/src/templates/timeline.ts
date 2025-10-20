/**
 * Timeline slide template
 *
 * Renders slides with chronological event sequences.
 */

import type { TimelineSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function timelineTemplate(
  spec: TimelineSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const orientation = spec.orientation ?? 'horizontal';
  const orientationClass = `slideyui-timeline-${orientation}`;

  const eventsHTML = spec.events
    .map(
      (event) => `
    <div class="slideyui-timeline-event">
      <div class="slideyui-timeline-marker"></div>
      <div class="slideyui-timeline-content">
        <span class="slideyui-timeline-date">${renderMarkdown(escapeHTML(event.date))}</span>
        <h3 class="slideyui-timeline-title">${renderMarkdown(escapeHTML(event.title))}</h3>
        ${event.description ? `<p class="slideyui-timeline-description">${renderMarkdown(escapeHTML(event.description))}</p>` : ''}
      </div>
    </div>
  `
    )
    .join('');

  return `
    <div class="slideyui-card slideyui-timeline-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        <div class="slideyui-timeline ${orientationClass}">
          ${eventsHTML}
        </div>
      </div>
    </div>
  `;
}
