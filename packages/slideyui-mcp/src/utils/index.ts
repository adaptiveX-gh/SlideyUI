/**
 * Utility functions for HTML generation and processing
 */

export { embedCSS } from './css.js';
export { minifyHTML } from './minify.js';
export { validatePresentation } from './validation.js';
export { escapeHTML } from './html.js';
export { hexToRgba, getThemeColor, generateOverlayCSS } from './colors.js';
export { generateSrcset, generatePictureElement, generateResponsiveBackgroundCSS } from './responsive.js';

// SVG Generation Utilities
export { SVGBuilder, createSVG } from './svg-builder.js';
export type { SVGBuilderOptions, TextOptions, GradientStop, PathOptions } from './svg-builder.js';

export { generateIcon } from './icon-generator.js';
export type { IconName, IconOptions } from './icon-generator.js';

export { generatePattern } from './pattern-generator.js';
export type { PatternType, PatternOptions } from './pattern-generator.js';

export { renderRoughSVG } from './rough-renderer.js';
export type { RoughOptions } from './rough-renderer.js';

// Note: VideoPlaybackManager is a client-side utility and not exported here
// It should be included directly in the browser via a <script> tag
