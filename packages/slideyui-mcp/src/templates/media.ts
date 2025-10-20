/**
 * Media slide template
 *
 * Renders slides with images, videos, or embedded content.
 */

import type { MediaSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';

export function mediaTemplate(
  spec: MediaSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? renderMarkdown(escapeHTML(spec.title)) : '';
  const caption = spec.caption ? renderMarkdown(escapeHTML(spec.caption)) : '';
  const layout = spec.layout ?? 'contained';
  const layoutClass = `slideyui-layout-${layout}`;

  let mediaHTML = '';
  switch (spec.mediaType) {
    case 'image':
      mediaHTML = `<img src="${escapeHTML(spec.mediaUrl)}" alt="${caption}" class="slideyui-media-image">`;
      break;
    case 'video':
      mediaHTML = `
        <video src="${escapeHTML(spec.mediaUrl)}" controls class="slideyui-media-video">
          Your browser does not support video playback.
        </video>
      `;
      break;
    case 'embed':
      mediaHTML = `
        <iframe src="${escapeHTML(spec.mediaUrl)}" class="slideyui-media-embed" frameborder="0" allowfullscreen>
        </iframe>
      `;
      break;
  }

  return `
    <div class="slideyui-card slideyui-media-card ${layoutClass}">
      ${title ? `<div class="slideyui-card-header"><h2 class="slideyui-card-title">${title}</h2></div>` : ''}
      <div class="slideyui-card-content">
        <div class="slideyui-media-container">
          ${mediaHTML}
        </div>
        ${caption ? `<p class="slideyui-caption">${caption}</p>` : ''}
      </div>
    </div>
  `;
}
