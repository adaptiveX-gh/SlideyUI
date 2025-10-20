/**
 * Hero slide template
 *
 * Renders full-screen impact slides with large title, subtitle,
 * and optional call-to-action. Supports background images or gradients.
 */

import type { HeroSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function heroTemplate(
  spec: HeroSlideSpec,
  _options: GenerationOptions
): string {
  const title = renderMarkdown(escapeHTML(spec.title));
  const subtitle = spec.subtitle ? renderMarkdown(escapeHTML(spec.subtitle)) : '';

  // Build background style
  let backgroundStyle = '';
  if (spec.backgroundImage) {
    backgroundStyle = `background-image: url('${escapeHTML(spec.backgroundImage)}'); background-size: cover; background-position: center;`;
  } else if (spec.backgroundGradient) {
    backgroundStyle = `background: ${escapeHTML(spec.backgroundGradient)};`;
  }

  // Build CTA button if provided
  const ctaHTML = spec.callToAction
    ? `
      <div class="slideyui-hero-cta mt-8">
        ${
          spec.callToAction.url
            ? `<a href="${escapeHTML(spec.callToAction.url)}" class="slideyui-btn slideyui-btn-primary slideyui-btn-lg">
                ${escapeHTML(spec.callToAction.text)}
              </a>`
            : `<button class="slideyui-btn slideyui-btn-primary slideyui-btn-lg">
                ${escapeHTML(spec.callToAction.text)}
              </button>`
        }
      </div>
    `
    : '';

  return `
    <div class="slideyui-card slideyui-hero-card" style="${backgroundStyle}">
      <div class="slideyui-hero-overlay">
        <div class="slideyui-hero-content">
          <h1 class="slideyui-hero-title">${title}</h1>
          ${subtitle ? `<p class="slideyui-hero-subtitle">${subtitle}</p>` : ''}
          ${ctaHTML}
        </div>
      </div>
    </div>
  `;
}
