/**
 * Responsive image utilities
 * Generates srcset and handles CDN transformations
 */

import type { ResponsiveConfig } from '../types/index.js';

/**
 * Default breakpoints for responsive images
 */
const DEFAULT_BREAKPOINTS = [400, 800, 1200, 1920, 2560];

/**
 * Default quality levels per breakpoint
 */
const DEFAULT_QUALITIES: Record<number, number> = {
  400: 75,
  800: 80,
  1200: 80,
  1920: 85,
  2560: 85,
};

/**
 * CDN handlers for popular image services
 */
interface CDNHandler {
  detect: (url: string) => boolean;
  transform: (url: string, width: number, quality: number, format?: string) => string;
}

const CDN_HANDLERS: Record<string, CDNHandler> = {
  unsplash: {
    detect: (url) => url.includes('images.unsplash.com'),
    transform: (url, width, quality, format) => {
      const params = new URLSearchParams();
      params.set('w', width.toString());
      params.set('q', quality.toString());
      if (format) params.set('fm', format);
      return `${url.split('?')[0]}?${params.toString()}`;
    },
  },
  cloudinary: {
    detect: (url) => url.includes('cloudinary.com'),
    transform: (url, width, quality, format) => {
      // Cloudinary URL pattern: .../upload/...
      const transformations = `w_${width},q_${quality}${format ? `,f_${format}` : ''}`;
      return url.replace('/upload/', `/upload/${transformations}/`);
    },
  },
  imgix: {
    detect: (url) => url.includes('imgix.net'),
    transform: (url, width, quality, format) => {
      const params = new URLSearchParams();
      params.set('w', width.toString());
      params.set('q', quality.toString());
      if (format) params.set('fm', format);
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}${params.toString()}`;
    },
  },
};

/**
 * Detect which CDN (if any) is hosting the image
 */
function detectCDN(url: string): CDNHandler | null {
  for (const handler of Object.values(CDN_HANDLERS)) {
    if (handler.detect(url)) {
      return handler;
    }
  }
  return null;
}

/**
 * Generate srcset string from a base URL
 */
export function generateSrcset(
  baseUrl: string,
  config: ResponsiveConfig = {}
): string {
  const {
    autoGenerate = true,
    srcset: manualSrcset,
    breakpoints = DEFAULT_BREAKPOINTS,
    qualities = DEFAULT_QUALITIES,
    formats = ['jpg'],
  } = config;

  // If manual srcset provided, use it
  if (manualSrcset) {
    return manualSrcset;
  }

  // Don't auto-generate if disabled
  if (!autoGenerate) {
    return '';
  }

  const cdnHandler = detectCDN(baseUrl);

  // If no CDN detected, return empty (can't auto-generate without CDN support)
  if (!cdnHandler) {
    return '';
  }

  // Generate srcset for primary format (last in formats array)
  const primaryFormat = formats[formats.length - 1];
  const srcsetEntries = breakpoints.map((width) => {
    const quality = qualities[width] || DEFAULT_QUALITIES[width] || 80;
    const url = cdnHandler.transform(baseUrl, width, quality, primaryFormat);
    return `${url} ${width}w`;
  });

  return srcsetEntries.join(', ');
}

/**
 * Generate picture element with multiple formats
 */
export function generatePictureElement(
  baseUrl: string,
  config: ResponsiveConfig = {},
  alt: string = ''
): string {
  const {
    autoGenerate = true,
    breakpoints = DEFAULT_BREAKPOINTS,
    qualities = DEFAULT_QUALITIES,
    formats = ['webp', 'jpg'],
    sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px',
  } = config;

  if (!autoGenerate) {
    return `<img src="${baseUrl}" alt="${alt}" />`;
  }

  const cdnHandler = detectCDN(baseUrl);

  // If no CDN, use basic img tag
  if (!cdnHandler) {
    return `<img src="${baseUrl}" alt="${alt}" />`;
  }

  // Generate source elements for each format (except the last, which is fallback)
  const sourceElements = formats.slice(0, -1).map((format) => {
    const srcsetEntries = breakpoints.map((width) => {
      const quality = qualities[width] || DEFAULT_QUALITIES[width] || 80;
      const url = cdnHandler.transform(baseUrl, width, quality, format);
      return `${url} ${width}w`;
    });

    const mimeType = format === 'jpg' ? 'image/jpeg' : `image/${format}`;
    return `<source type="${mimeType}" srcset="${srcsetEntries.join(', ')}" sizes="${sizes}" />`;
  });

  // Fallback img with last format
  const fallbackFormat = formats[formats.length - 1];
  const fallbackSrcset = breakpoints.map((width) => {
    const quality = qualities[width] || DEFAULT_QUALITIES[width] || 80;
    const url = cdnHandler.transform(baseUrl, width, quality, fallbackFormat);
    return `${url} ${width}w`;
  });

  return `
<picture>
  ${sourceElements.join('\n  ')}
  <img src="${baseUrl}" srcset="${fallbackSrcset.join(', ')}" sizes="${sizes}" alt="${alt}" />
</picture>`.trim();
}

/**
 * Generate responsive background image CSS
 */
export function generateResponsiveBackgroundCSS(
  baseUrl: string,
  config: ResponsiveConfig = {}
): string {
  const {
    autoGenerate = true,
    breakpoints = DEFAULT_BREAKPOINTS,
    qualities = DEFAULT_QUALITIES,
    formats = ['webp', 'jpg'],
  } = config;

  if (!autoGenerate) {
    return `background-image: url('${baseUrl}');`;
  }

  const cdnHandler = detectCDN(baseUrl);

  if (!cdnHandler) {
    return `background-image: url('${baseUrl}');`;
  }

  // Generate media queries for different breakpoints
  const format = formats[formats.length - 1]; // Use primary format
  const mediaQueries = breakpoints
    .slice()
    .reverse()
    .map((width, index) => {
      const quality = qualities[width] || DEFAULT_QUALITIES[width] || 80;
      const url = cdnHandler.transform(baseUrl, width, quality, format);

      if (index === breakpoints.length - 1) {
        // Smallest breakpoint - no media query
        return `background-image: url('${url}');`;
      } else {
        // Larger breakpoints
        return `@media (min-width: ${width}px) { background-image: url('${url}'); }`;
      }
    });

  return mediaQueries.join('\n');
}
