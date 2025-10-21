/**
 * Media slide template
 *
 * Renders slides with images, videos, or embedded content.
 * Supports multiple layouts including hero slides with full-bleed backgrounds.
 */

import type { MediaSlideSpec, GenerationOptions } from '../types/index.js';
import { escapeHTML, renderMarkdown } from '../utils/html.js';
import { generateOverlayCSS } from '../utils/colors.js';
import { generatePictureElement } from '../utils/responsive.js';

/**
 * Render video element with full configuration
 */
function renderVideoElement(spec: MediaSlideSpec, className: string = ''): string {
  const videoConfig = spec.video || {};
  const {
    autoplay = true,
    loop = true,
    muted = true,
    controls = false,
    playbackRate = 1.0,
    poster,
    playOn = 'visible',
    pauseOn = 'hidden',
    fallbackImage,
  } = videoConfig;

  const mediaUrl = escapeHTML(spec.mediaUrl);
  const posterAttr = poster ? ` poster="${escapeHTML(poster)}"` : '';
  const classAttr = className ? ` class="${className}"` : '';

  // Build video attributes
  const attrs = [
    autoplay ? 'autoplay' : '',
    loop ? 'loop' : '',
    muted ? 'muted' : '',
    controls ? 'controls' : '',
    'playsinline', // Important for mobile autoplay
  ].filter(Boolean).join(' ');

  // Data attributes for JavaScript playback control
  const dataAttrs = [
    `data-play-on="${playOn}"`,
    `data-pause-on="${pauseOn}"`,
    playbackRate !== 1.0 ? `data-playback-rate="${playbackRate}"` : '',
    fallbackImage ? `data-fallback-image="${escapeHTML(fallbackImage)}"` : '',
  ].filter(Boolean).join(' ');

  return `
    <video${classAttr} ${attrs} ${dataAttrs}${posterAttr}>
      <source src="${mediaUrl}" type="video/mp4">
      <source src="${mediaUrl.replace('.mp4', '.webm')}" type="video/webm">
      ${fallbackImage ? `<img src="${escapeHTML(fallbackImage)}" alt="Video not supported" />` : ''}
      Your browser does not support video playback.
    </video>
  `.trim();
}

/**
 * Render hero layout for media slides
 *
 * Creates a full-bleed background with overlay and centered text
 */
function renderHeroLayout(spec: MediaSlideSpec, options: GenerationOptions): string {
  const title = spec.title ? escapeHTML(spec.title) : '';
  const subtitle = spec.subtitle ? escapeHTML(spec.subtitle) : '';
  const mediaUrl = escapeHTML(spec.mediaUrl);
  const theme = options.theme || 'corporate';

  // Extract text style configuration with defaults
  const textStyle = spec.textStyle || {};
  const position = textStyle.position || 'center';
  const align = textStyle.align || 'center';
  const color = textStyle.color || 'white';
  const shadow = textStyle.shadow !== false; // default true
  const maxWidth = textStyle.maxWidth || '900px';

  // Extract overlay configuration with defaults
  const overlay = spec.overlay || {};
  const overlayCSS = generateOverlayCSS(overlay, theme);
  const showOverlay = overlayCSS !== 'none';

  // Build shadow class
  const shadowClass = shadow ? 'slideyui-hero-text-shadow' : '';

  // Build color class
  const colorClass = color === 'white' ? 'slideyui-hero-text-white' : 'slideyui-hero-text-dark';

  // Extract print configuration
  const printConfig = spec.print || {};
  const printUrl = printConfig.mediaUrl ? escapeHTML(printConfig.mediaUrl) : '';
  const dataPrintUrl = printUrl ? `data-print-url="${printUrl}"` : '';

  // Extract loading configuration
  const loadingConfig = spec.loading || {};
  const loadingState = loadingConfig.strategy === 'lazy' ? 'loading' : 'loaded';

  // Build inline styles
  let inlineStyles = `background-image: url('${mediaUrl}');`;
  if (printUrl) {
    inlineStyles += ` --print-bg-image: url('${printUrl}');`;
  }
  if (loadingConfig.placeholder?.color) {
    inlineStyles += ` --hero-placeholder-color: ${loadingConfig.placeholder.color};`;
  }

  // Determine if this is a video background
  const isVideo = spec.mediaType === 'video';
  let backgroundContent = '';

  if (isVideo) {
    // Render video as background
    backgroundContent = renderVideoElement(spec, 'slideyui-hero-video-bg');
  }

  return `
    <div class="slideyui-hero-background${isVideo ? ' slideyui-hero-video' : ''}" style="${isVideo ? '' : inlineStyles}" data-loading-state="${loadingState}"${dataPrintUrl ? ' ' + dataPrintUrl : ''}>
      ${isVideo ? backgroundContent : ''}
      ${showOverlay ? `
      <div class="slideyui-hero-overlay" style="background: ${overlayCSS}; ${isVideo ? 'opacity: 0.5;' : ''}"></div>
      ` : ''}
      <div class="slideyui-hero-content slideyui-hero-content-${position}">
        <div style="max-width: ${maxWidth}; text-align: ${align};">
          ${title ? `<h1 class="slideyui-hero-title ${shadowClass} ${colorClass}" style="color: ${color};">${title}</h1>` : ''}
          ${subtitle ? `<p class="slideyui-hero-subtitle ${shadowClass} ${colorClass}" style="color: ${color};">${subtitle}</p>` : ''}
        </div>
      </div>
    </div>
  `;
}

/**
 * Render contained layout for media slides
 *
 * Traditional card-based layout with media and optional caption
 */
function renderContainedLayout(spec: MediaSlideSpec): string {
  const title = spec.title ? renderMarkdown(escapeHTML(spec.title)) : '';
  const caption = spec.caption ? renderMarkdown(escapeHTML(spec.caption)) : '';
  const responsiveConfig = spec.responsive || {};

  let mediaHTML = '';
  switch (spec.mediaType) {
    case 'image':
      // Use responsive images if configured
      if (responsiveConfig.autoGenerate !== false) {
        // Generate picture element with srcset
        mediaHTML = generatePictureElement(
          spec.mediaUrl,
          responsiveConfig,
          caption || title || ''
        );
        // Add wrapper styling
        mediaHTML = `<div class="slideyui-media-image" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">${mediaHTML}</div>`;
      } else {
        // Standard img tag
        mediaHTML = `<img src="${escapeHTML(spec.mediaUrl)}" alt="${caption || title}" class="slideyui-media-image" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">`;
      }
      break;
    case 'video':
      // Use enhanced video rendering with full config
      const videoHTML = renderVideoElement(spec, 'slideyui-media-video');
      mediaHTML = `<div style="max-width: 100%; height: auto; display: block; margin: 0 auto;">${videoHTML}</div>`;
      break;
    case 'embed':
      mediaHTML = `
        <iframe src="${escapeHTML(spec.mediaUrl)}" class="slideyui-media-embed" frameborder="0" allowfullscreen style="width: 100%; height: 500px; border: none;">
        </iframe>
      `;
      break;
  }

  return `
    <div class="slideyui-card slideyui-media-card">
      ${title ? `<div class="slideyui-card-header"><h2 class="slideyui-card-title">${title}</h2></div>` : ''}
      <div class="slideyui-card-content">
        <div class="slideyui-media-container">
          ${mediaHTML}
        </div>
        ${caption ? `<p class="slideyui-caption" style="margin-top: 1rem; font-size: 1rem; color: var(--slidey-muted-foreground); text-align: center;">${caption}</p>` : ''}
      </div>
    </div>
  `;
}

/**
 * Main media template function
 */
export function mediaTemplate(
  spec: MediaSlideSpec,
  options: GenerationOptions
): string {
  const layout = spec.layout ?? 'contained';

  // Route to appropriate layout renderer
  switch (layout) {
    case 'hero':
      return renderHeroLayout(spec, options);
    case 'contained':
    case 'split':
    case 'full-bleed':
    default:
      // For now, treat all non-hero layouts as contained
      // Future phases will implement split and full-bleed
      return renderContainedLayout(spec);
  }
}
