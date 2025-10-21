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

  if (!spec.mediaUrl) {
    return '';
  }

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
  const theme = options.theme || 'corporate';

  // For hero layout, mediaUrl OR svgContent is required
  if (!spec.mediaUrl && !spec.svgContent) {
    return '';
  }

  const mediaUrl = spec.mediaUrl ? escapeHTML(spec.mediaUrl) : '';

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
  let inlineStyles = '';
  if (mediaUrl) {
    inlineStyles = `background-image: url('${mediaUrl}');`;
  }
  if (printUrl) {
    inlineStyles += ` --print-bg-image: url('${printUrl}');`;
  }
  if (loadingConfig.placeholder?.color) {
    inlineStyles += ` --hero-placeholder-color: ${loadingConfig.placeholder.color};`;
  }

  // Determine background type and content
  const isVideo = spec.mediaType === 'video';
  const isSVG = spec.mediaType === 'svg';
  let backgroundContent = '';

  if (isVideo) {
    // Render video as background
    backgroundContent = renderVideoElement(spec, 'slideyui-hero-video-bg');
  } else if (isSVG && spec.svgContent) {
    // Render SVG as background (UNESCAPED - raw HTML)
    const svgType = spec.svgType || 'inline';
    if (svgType === 'inline') {
      // Inject SVG directly as background element
      backgroundContent = `<div class="slideyui-hero-svg-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">${spec.svgContent}</div>`;
    } else {
      // Use data URI for background-image
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(spec.svgContent)}`;
      inlineStyles = `background-image: url('${dataUri}'); background-size: cover; background-position: center;`;
    }
  }

  return `
    <div class="slideyui-hero-background${isVideo ? ' slideyui-hero-video' : ''}${isSVG ? ' slideyui-hero-svg' : ''}" style="${(isVideo || (isSVG && spec.svgType === 'inline')) ? '' : inlineStyles}" data-loading-state="${loadingState}"${dataPrintUrl ? ' ' + dataPrintUrl : ''}>
      ${isVideo || isSVG ? backgroundContent : ''}
      ${showOverlay ? `
      <div class="slideyui-hero-overlay" style="background: ${overlayCSS}; ${isVideo || isSVG ? 'opacity: 0.5;' : ''}"></div>
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
 * Render hero-card layout for media slides
 *
 * Card-based hero with background image and overlay
 * Keeps the card structure but adds hero styling
 */
function renderHeroCardLayout(spec: MediaSlideSpec, _options: GenerationOptions): string {
  const title = spec.title ? escapeHTML(spec.title) : '';
  const subtitle = spec.subtitle ? escapeHTML(spec.subtitle) : '';

  // Require either mediaUrl OR svgContent
  if (!spec.mediaUrl && !spec.svgContent) {
    return '';
  }

  const mediaUrl = spec.mediaUrl ? escapeHTML(spec.mediaUrl) : '';
  const isSVG = spec.mediaType === 'svg';

  // Extract overlay configuration
  const overlay = spec.overlay || {};

  // Build inline styles and content
  let inlineStyles = '';
  let svgBackgroundContent = '';

  if (isSVG && spec.svgContent) {
    // Handle SVG content
    const svgType = spec.svgType || 'inline';
    if (svgType === 'inline') {
      // SVG as inline background element (UNESCAPED)
      svgBackgroundContent = `<div class="slideyui-card-hero-svg-bg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">${spec.svgContent}</div>`;
    } else {
      // SVG as data URI background-image
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(spec.svgContent)}`;
      inlineStyles = `background-image: url('${dataUri}'); background-size: cover; background-position: center;`;
    }
  } else if (mediaUrl) {
    // Handle regular image URL
    inlineStyles = `background-image: url('${mediaUrl}');`;
  }

  // Add custom overlay if specified
  if (overlay.customColors && overlay.customColors.length > 0) {
    const customColors = overlay.customColors;
    const gradientColors = customColors.map((color, index) => {
      return `${color} ${(index / (customColors.length - 1)) * 100}%`;
    }).join(', ');

    if (isSVG && spec.svgType === 'inline') {
      // For inline SVG, add overlay as separate element
      svgBackgroundContent += `<div class="slideyui-card-hero-overlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(${overlay.direction || '135deg'}, ${gradientColors}); z-index: 1;"></div>`;
    } else {
      // For image/data-uri SVG, use CSS gradient overlay
      const parts = inlineStyles.split('background-image:');
      const secondPart = parts[1];
      const bgImage = secondPart ? secondPart.split(';')[0] : '';
      inlineStyles = `background-image: linear-gradient(${overlay.direction || '135deg'}, ${gradientColors}), ${bgImage};`;
    }
  }

  return `
    <div class="slideyui-card slideyui-card-hero${isSVG ? ' slideyui-card-hero-svg' : ''}" style="${inlineStyles}">
      ${svgBackgroundContent}
      <div class="slideyui-card-hero-content" style="position: relative; z-index: 2;">
        ${title ? `<h1 class="slideyui-card-hero-title">${title}</h1>` : ''}
        ${subtitle ? `<p class="slideyui-card-hero-subtitle">${subtitle}</p>` : ''}
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
      if (responsiveConfig.autoGenerate !== false && spec.mediaUrl) {
        // Generate picture element with srcset
        mediaHTML = generatePictureElement(
          spec.mediaUrl,
          responsiveConfig,
          caption || title || ''
        );
        // Add wrapper styling
        mediaHTML = `<div class="slideyui-media-image" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">${mediaHTML}</div>`;
      } else if (spec.mediaUrl) {
        // Standard img tag
        mediaHTML = `<img src="${escapeHTML(spec.mediaUrl)}" alt="${caption || title}" class="slideyui-media-image" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">`;
      }
      break;
    case 'video':
      // Use enhanced video rendering with full config
      const videoHTML = renderVideoElement(spec, 'slideyui-media-video');
      mediaHTML = `<div style="max-width: 100%; height: auto; display: block; margin: 0 auto;">${videoHTML}</div>`;
      break;
    case 'svg':
      // Render SVG content inline or as data URI
      if (spec.svgContent) {
        const svgType = spec.svgType || 'inline';
        if (svgType === 'inline') {
          // Render SVG directly in HTML
          mediaHTML = `<div class="slideyui-media-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">${spec.svgContent}</div>`;
        } else {
          // Render as data URI in img tag
          const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(spec.svgContent)}`;
          mediaHTML = `<img src="${dataUri}" alt="${caption || title}" class="slideyui-media-svg" style="max-width: 100%; height: auto; display: block; margin: 0 auto;">`;
        }
      }
      break;
    case 'embed':
      if (spec.mediaUrl) {
        mediaHTML = `
          <iframe src="${escapeHTML(spec.mediaUrl)}" class="slideyui-media-embed" frameborder="0" allowfullscreen style="width: 100%; height: 500px; border: none;">
          </iframe>
        `;
      }
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
    case 'hero-card':
      return renderHeroCardLayout(spec, options);
    case 'contained':
    case 'split':
    case 'full-bleed':
    default:
      // For now, treat all non-hero layouts as contained
      // Future phases will implement split and full-bleed
      return renderContainedLayout(spec);
  }
}
