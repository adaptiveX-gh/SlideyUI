/**
 * Utility functions for HTML generation and processing
 */

export { embedCSS } from './css.js';
export { minifyHTML } from './minify.js';
export { validatePresentation } from './validation.js';
export { escapeHTML } from './html.js';
export { hexToRgba, getThemeColor, generateOverlayCSS } from './colors.js';
export { generateSrcset, generatePictureElement, generateResponsiveBackgroundCSS } from './responsive.js';

// Note: VideoPlaybackManager is a client-side utility and not exported here
// It should be included directly in the browser via a <script> tag
