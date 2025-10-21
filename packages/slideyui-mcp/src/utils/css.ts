/**
 * CSS embedding utilities
 *
 * Handles embedding SlideyUI CSS into generated HTML presentations.
 * Uses a multi-tier fallback strategy for maximum reliability.
 */

import { readFile, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { constants } from 'node:fs';
import { getTheme } from './theme-registry.js';
import type { CustomTheme } from '../schema/index.js';

/**
 * Embedded SlideyUI CSS - Full styles from @slideyui/core source files
 * This serves as the ultimate fallback when file loading fails.
 *
 * Generated from:
 * - base.css
 * - components.css
 * - layouts.css
 * - typography.css
 * - animations.css
 */
const EMBEDDED_SLIDEYUI_CSS = `
/**
 * SlideyUI Core Styles
 * Embedded version for MCP server
 */

/* Base Tailwind Reset */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

/* CSS Custom Properties for theming - Default Corporate Theme */
:root {
  --slidey-primary: #1e40af;
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: #64748b;
  --slidey-secondary-foreground: #ffffff;
  --slidey-accent: #0891b2;
  --slidey-accent-foreground: #ffffff;
  --slidey-background: #ffffff;
  --slidey-foreground: #0f172a;
  --slidey-muted: #f1f5f9;
  --slidey-muted-foreground: #64748b;
  --slidey-border: #e2e8f0;

  /* Spacing Scale (8pt grid system) */
  --card-spacing-xs: 0.5rem;   /* 8px */
  --card-spacing-sm: 0.75rem;  /* 12px */
  --card-spacing-md: 1rem;     /* 16px */
  --card-spacing-lg: 1.5rem;   /* 24px */
  --card-spacing-xl: 2rem;     /* 32px */
  --card-spacing-2xl: 3rem;    /* 48px */
  --card-spacing-3xl: 4rem;    /* 64px */

  /* Card Padding Defaults */
  --card-padding: var(--card-spacing-xl);
  --card-padding-compact: var(--card-spacing-lg);
  --card-padding-spacious: var(--card-spacing-2xl);

  /* Legacy Spacing */
  --slidey-spacing-base: 1rem;
  --slidey-spacing-padding: 3rem;
  --slidey-spacing-gap: 2rem;

  /* Safe zones */
  --slidey-safe-padding: 5%;
  --slidey-danger-zone: 2%;

  /* Minimum readable sizes */
  --slidey-font-min: 24px;
  --slidey-line-height-base: 1.4;
}

/* Theme-specific color overrides */
[data-theme="corporate"] {
  --slidey-primary: #1e40af;
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: #64748b;
  --slidey-secondary-foreground: #ffffff;
  --slidey-accent: #0891b2;
  --slidey-accent-foreground: #ffffff;
  --slidey-background: #ffffff;
  --slidey-foreground: #0f172a;
  --slidey-muted: #f1f5f9;
  --slidey-muted-foreground: #64748b;
  --slidey-border: #e2e8f0;
}

[data-theme="pitch-deck"] {
  --slidey-primary: #7c3aed;
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: #ec4899;
  --slidey-secondary-foreground: #ffffff;
  --slidey-accent: #f59e0b;
  --slidey-accent-foreground: #000000;
  --slidey-background: #0f172a;
  --slidey-foreground: #f8fafc;
  --slidey-muted: #1e293b;
  --slidey-muted-foreground: #94a3b8;
  --slidey-border: #334155;
}

[data-theme="academic"] {
  --slidey-primary: #1e3a8a;
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: #92400e;
  --slidey-secondary-foreground: #ffffff;
  --slidey-accent: #065f46;
  --slidey-accent-foreground: #ffffff;
  --slidey-background: #fefce8;
  --slidey-foreground: #1c1917;
  --slidey-muted: #fef3c7;
  --slidey-muted-foreground: #78716c;
  --slidey-border: #d6d3d1;
}

[data-theme="workshop"] {
  --slidey-primary: #ea580c;
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: #fb923c;
  --slidey-secondary-foreground: #000000;
  --slidey-accent: #fdba74;
  --slidey-accent-foreground: #000000;
  --slidey-background: #ffffff;
  --slidey-foreground: #1e293b;
  --slidey-muted: #fff7ed;
  --slidey-muted-foreground: #78716c;
  --slidey-border: #fed7aa;
}

[data-theme="startup"] {
  --slidey-primary: #10b981;
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: #34d399;
  --slidey-secondary-foreground: #000000;
  --slidey-accent: #6ee7b7;
  --slidey-accent-foreground: #000000;
  --slidey-background: #ffffff;
  --slidey-foreground: #1e293b;
  --slidey-muted: #f0fdf4;
  --slidey-muted-foreground: #64748b;
  --slidey-border: #bbf7d0;
}

/* Slide Container Base */
.slide, .card {
  position: relative;
  width: 100%;
  background-color: var(--slidey-background);
  color: var(--slidey-foreground);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* Aspect Ratios */
.slide-ratio-16-9 { aspect-ratio: 16 / 9; }
.slide-ratio-4-3 { aspect-ratio: 4 / 3; }
.slide-ratio-9-16 { aspect-ratio: 9 / 16; }
.slide-ratio-1-1 { aspect-ratio: 1 / 1; }

/* Safe Zone */
.slide-safe-zone {
  padding: var(--slidey-safe-padding);
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Content Container */
.slide-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--slidey-spacing-gap);
  padding: var(--slidey-spacing-padding);
  position: relative;
  z-index: 1;
}

/* Typography */
.slide-text-hero, .card-text-hero {
  font-size: clamp(3rem, 8vw, 6rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--slidey-foreground);
}

.slide-text-header, .card-text-header {
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--slidey-foreground);
}

.slide-text-body, .card-text-body {
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  line-height: 1.5;
  font-weight: 400;
  color: var(--slidey-foreground);
}

/* Headings */
h1, h2, h3, h4, h5, h6,
.slideyui-title,
.slideyui-heading-1,
.slideyui-heading-2,
.slideyui-heading-3 {
  color: var(--slidey-primary);
  font-weight: 700;
}

/* Cards */
.slideyui-card {
  background-color: var(--slidey-background);
  color: var(--slidey-foreground);
  border: 1px solid var(--slidey-border);
  border-radius: 0.5rem;
  padding: var(--card-padding);
}

.slideyui-card-title {
  color: var(--slidey-accent);
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 600;
  margin-bottom: var(--card-spacing-md);
}

.slideyui-card-content {
  color: var(--slidey-foreground);
}

/* Card Component */
.slide-card {
  padding: var(--card-padding);
  background: var(--slidey-background);
  color: var(--slidey-foreground);
  border-radius: 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--slidey-border);
}

.slide-card-header {
  margin-bottom: var(--card-spacing-md);
  padding: 0;
}

.slide-card-title {
  font-size: clamp(1.25rem, 2.5vw, 2rem);
  font-weight: 600;
  color: var(--slidey-accent);
}

.slide-card-body {
  font-size: clamp(1rem, 2vw, 1.5rem);
  color: var(--slidey-foreground);
}

.slide-card-footer {
  margin-top: var(--card-spacing-lg);
  padding-top: var(--card-spacing-md);
  border-top: 1px solid var(--slidey-border);
  color: var(--slidey-muted-foreground);
}

/* Layouts */
.slide-layout-content {
  display: flex;
  flex-direction: column;
  gap: var(--slidey-spacing-gap);
  padding: var(--slidey-spacing-padding);
}

.slide-layout-two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--slidey-spacing-gap) * 2);
  padding: var(--slidey-spacing-padding);
  align-items: center;
}

/* Animations */
.slide-enter-fade {
  animation: slideEnterFade 500ms ease-out;
}

@keyframes slideEnterFade {
  from { opacity: 0; }
  to { opacity: 1; }
}

.slide-build {
  opacity: 0;
  transform: translateY(1rem);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}

.slide-build.active {
  opacity: 1;
  transform: translateY(0);
}

/* Utilities */
.slide-p-safe { padding: var(--slidey-safe-padding); }
.slide-flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.slide-gap { gap: var(--slidey-spacing-gap); }
.slide-z-background { z-index: 0; }
.slide-z-content { z-index: 1; }
.slide-z-overlay { z-index: 2; }

/* Additional component styling for themed elements */
.slideyui-subtitle {
  color: var(--slidey-muted-foreground);
  font-size: clamp(1rem, 2vw, 1.5rem);
}

.slideyui-text {
  color: var(--slidey-foreground);
}

.slideyui-accent {
  color: var(--slidey-accent);
}

.slideyui-muted {
  color: var(--slidey-muted-foreground);
  background-color: var(--slidey-muted);
}

/* Lists and bullets */
ul, ol {
  color: var(--slidey-foreground);
}

li {
  color: var(--slidey-foreground);
}

/* Links */
a {
  color: var(--slidey-accent);
  text-decoration: underline;
}

a:hover {
  color: var(--slidey-primary);
}

/* Code blocks */
code, pre {
  background-color: var(--slidey-muted);
  color: var(--slidey-foreground);
  border: 1px solid var(--slidey-border);
}

/* Blockquotes */
blockquote {
  border-left: 4px solid var(--slidey-accent);
  color: var(--slidey-foreground);
  background-color: var(--slidey-muted);
  padding: var(--card-spacing-md);
  margin: var(--card-spacing-lg) 0;
}

/* Tables */
table {
  border-color: var(--slidey-border);
  color: var(--slidey-foreground);
}

th {
  background-color: var(--slidey-muted);
  color: var(--slidey-foreground);
  border: 1px solid var(--slidey-border);
}

td {
  border: 1px solid var(--slidey-border);
  color: var(--slidey-foreground);
}

/* Horizontal rules */
hr {
  border-color: var(--slidey-border);
}

/* Hero Slide Layouts */
.slideyui-hero-background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.slideyui-hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.slideyui-hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 5%;
  box-sizing: border-box;
}

/* Text positioning variants */
.slideyui-hero-content-center {
  justify-content: center;
  align-items: center;
}

.slideyui-hero-content-top {
  justify-content: flex-start;
  align-items: center;
  padding-top: 10%;
}

.slideyui-hero-content-bottom {
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10%;
}

.slideyui-hero-content-left {
  justify-content: center;
  align-items: flex-start;
}

.slideyui-hero-content-right {
  justify-content: center;
  align-items: flex-end;
}

/* Hero typography */
.slideyui-hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 1rem 0;
}

.slideyui-hero-subtitle {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  line-height: 1.3;
  font-weight: 400;
  margin: 0;
  opacity: 0.95;
}

/* Hero text shadow for better readability */
.slideyui-hero-text-shadow {
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.4),
               0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Hero text color variants */
.slideyui-hero-text-white {
  color: #ffffff;
}

.slideyui-hero-text-dark {
  color: var(--slidey-foreground);
}

/* Print optimization for hero slides */
@media print {
  .slideyui-hero-background {
    page-break-inside: avoid;
    break-inside: avoid;
  }

  .slideyui-hero-overlay {
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }
}
`;

/**
 * Possible paths to the SlideyUI core CSS file
 * Ordered by preference (most specific to most general)
 */
function getCSSPaths(): string[] {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  return [
    // 1. Try built package in node_modules (production)
    resolve(__dirname, '../../../../node_modules/@slideyui/core/dist/slideyui.css'),

    // 2. Try workspace package dist (monorepo development)
    resolve(__dirname, '../../../slideyui-core/dist/slideyui.css'),
    resolve(__dirname, '../../../slideyui-core/dist/index.css'),

    // 3. Try workspace package source files (fallback to source)
    resolve(__dirname, '../../../slideyui-core/src/index.css'),

    // 4. Try relative to MCP package root
    resolve(__dirname, '../../node_modules/@slideyui/core/dist/slideyui.css'),
  ];
}

/**
 * Check if a file exists and is readable
 */
async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Attempt to load CSS from file system
 *
 * @returns CSS content or null if not found
 */
async function loadCSSFromFile(): Promise<string | null> {
  const paths = getCSSPaths();

  for (const cssPath of paths) {
    try {
      if (await fileExists(cssPath)) {
        const css = await readFile(cssPath, 'utf-8');
        console.log(`✓ Loaded SlideyUI CSS from: ${cssPath}`);
        return css;
      }
    } catch (error) {
      // Continue to next path
      continue;
    }
  }

  return null;
}

/**
 * Load CSS from source files and concatenate
 * This is a fallback when the built CSS is not available
 */
async function loadCSSFromSource(): Promise<string | null> {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const srcDir = resolve(__dirname, '../../../slideyui-core/src');

  const sourceFiles = [
    'base.css',
    'components.css',
    'layouts.css',
    'typography.css',
    'animations.css',
  ];

  try {
    const cssBlocks: string[] = [];

    for (const file of sourceFiles) {
      const filePath = join(srcDir, file);
      if (await fileExists(filePath)) {
        const content = await readFile(filePath, 'utf-8');
        cssBlocks.push(content);
      }
    }

    if (cssBlocks.length > 0) {
      console.log(`✓ Loaded SlideyUI CSS from ${cssBlocks.length} source files`);
      return cssBlocks.join('\n\n');
    }
  } catch (error) {
    // Fall through to next strategy
  }

  return null;
}

/**
 * Get minimal CSS with theme colors
 * Used as a last resort fallback
 *
 * @param theme - Theme name
 * @returns Minimal CSS string
 * @internal
 */
export function getMinimalCSS(theme: string): string {
  const colors = getThemeColors(theme);

  return `
    /* SlideyUI Minimal Fallback CSS */
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --text: ${colors.text};
    }

    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: ${colors.background};
      color: ${colors.text};
    }

    .slide, .card {
      background: ${colors.background};
      color: ${colors.text};
      padding: 2rem;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    h1, h2, h3 {
      color: ${colors.primary};
      margin: 0 0 1rem 0;
    }

    h1 { font-size: 3rem; font-weight: 800; }
    h2 { font-size: 2rem; font-weight: 700; }
    h3 { font-size: 1.5rem; font-weight: 600; }

    p, li {
      font-size: 1.25rem;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    ul, ol {
      padding-left: 2rem;
    }

    .slide-card {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.5rem;
      padding: 2rem;
    }
  `;
}

/**
 * Theme colors interface
 */
interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

/**
 * Theme color definitions
 */
const THEME_COLORS: Record<string, ThemeColors> = {
  corporate: {
    primary: '#1e40af',
    secondary: '#64748b',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b',
  },
  'pitch-deck': {
    primary: '#7c3aed',
    secondary: '#a855f7',
    accent: '#c084fc',
    background: '#ffffff',
    text: '#1e293b',
  },
  academic: {
    primary: '#0f172a',
    secondary: '#475569',
    accent: '#94a3b8',
    background: '#ffffff',
    text: '#1e293b',
  },
  workshop: {
    primary: '#ea580c',
    secondary: '#fb923c',
    accent: '#fdba74',
    background: '#ffffff',
    text: '#1e293b',
  },
  startup: {
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#6ee7b7',
    background: '#ffffff',
    text: '#1e293b',
  },
};

/**
 * Get theme color palette
 */
function getThemeColors(theme: string): ThemeColors {
  return THEME_COLORS[theme] ?? THEME_COLORS.corporate!;
}

/**
 * Generate CSS custom properties for a custom theme
 *
 * Creates a [data-theme="theme-name"] CSS block with all color variables
 * mapped from the custom theme's color palette.
 *
 * @param theme - Custom theme object
 * @returns CSS string with theme variables
 *
 * @example
 * const css = generateCustomThemeCSS(myTheme);
 * // Returns:
 * // [data-theme="my-theme"] {
 * //   --slidey-primary: #3b82f6;
 * //   ...
 * // }
 */
export function generateCustomThemeCSS(theme: CustomTheme): string {
  const { name, colors } = theme;

  return `
/* Custom Theme: ${theme.displayName} */
[data-theme="${name}"] {
  --slidey-primary: ${colors.primary};
  --slidey-primary-foreground: #ffffff;
  --slidey-secondary: ${colors.secondary};
  --slidey-secondary-foreground: #ffffff;
  --slidey-accent: ${colors.accent};
  --slidey-accent-foreground: #000000;
  --slidey-background: ${colors.background};
  --slidey-foreground: ${colors.foreground};
  --slidey-muted: ${colors.muted};
  --slidey-muted-foreground: ${colors.mutedForeground};
  --slidey-border: ${colors.border};
}
`;
}

/**
 * Get Tailwind CDN link as ultimate fallback
 * This ensures presentations always have some baseline styling
 */
function getTailwindCDN(): string {
  return `<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          primary: '#1e40af',
          secondary: '#64748b',
          accent: '#3b82f6',
        }
      }
    }
  }
</script>`;
}

/**
 * Embed SlideyUI CSS for a specific theme
 *
 * Multi-tier fallback strategy:
 * 1. Try to load from built package (dist/slideyui.css)
 * 2. Try to load from source files (src/*.css)
 * 3. Use embedded CSS constant
 * 4. Fall back to minimal CSS with theme colors
 *
 * For custom themes, appends custom theme CSS to the base CSS.
 *
 * @param theme - Theme name (predefined or custom)
 * @returns CSS string with custom theme CSS appended if applicable
 */
export async function embedCSS(theme: string): Promise<string> {
  // Strategy 1: Try to load from built file
  let baseCSS = await loadCSSFromFile();

  // Strategy 2: Try to load from source files
  if (!baseCSS) {
    baseCSS = await loadCSSFromSource();
  }

  // Strategy 3: Use embedded CSS constant
  if (!baseCSS) {
    console.warn('⚠ Using embedded SlideyUI CSS (built files not found)');
    baseCSS = EMBEDDED_SLIDEYUI_CSS;
  }

  // Check if this is a custom theme
  const customTheme = getTheme(theme);
  if (customTheme) {
    // Append custom theme CSS to base CSS
    const customThemeCSS = generateCustomThemeCSS(customTheme);
    return baseCSS + '\n\n' + customThemeCSS;
  }

  // Return base CSS for predefined themes
  return baseCSS;
}

/**
 * Embed CSS as <style> tag
 */
export async function embedCSSTag(theme: string): Promise<string> {
  const css = await embedCSS(theme);
  return `<style>${css}</style>`;
}

/**
 * Get complete HTML head content with CSS and optional Tailwind CDN
 *
 * @param theme - Theme name
 * @param includeTailwindCDN - Whether to include Tailwind CDN as fallback (default: false)
 * @returns HTML head content
 */
export async function getHTMLHead(theme: string, includeTailwindCDN = false): Promise<string> {
  const css = await embedCSS(theme);
  const tailwindCDN = includeTailwindCDN ? getTailwindCDN() : '';

  return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>${css}</style>
    ${tailwindCDN}
  `.trim();
}
