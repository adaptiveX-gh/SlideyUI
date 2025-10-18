/**
 * SlideyUI Core - Tailwind CSS Plugin for Presentations
 *
 * A comprehensive Tailwind plugin optimized for creating presentation slides
 * with professional themes, responsive layouts, and projection-friendly styling.
 *
 * @example
 * ```js
 * // tailwind.config.js
 * import slideyUI from 'slideyui';
 *
 * export default {
 *   plugins: [
 *     slideyUI({
 *       theme: 'corporate',
 *       defaultRatio: '16:9',
 *     }),
 *   ],
 * };
 * ```
 */

import plugin from 'tailwindcss/plugin';
import type { SlideyUIConfig } from './types';
import { resolveConfig, generateCSSVariables, generateThemeExtension } from './utils';
import { getThemeIds, getTheme } from './themes';

// Import themes for re-export
export * from './types';
export * from './themes';
export { resolveConfig, generateCSSVariables, generateThemeExtension } from './utils';

/**
 * Generate base slide styles as CSS-in-JS objects
 */
function getBaseStyles() {
  return {
    '.slide, .card': {
      position: 'relative',
      width: '100%',
      backgroundColor: 'var(--slidey-background)',
      color: 'var(--slidey-foreground)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      textRendering: 'optimizeLegibility',
    },
    '.slide h1, .slide h2, .slide h3, .slide p, .slide li, .slide td, .slide th, .card h1, .card h2, .card h3, .card p, .card li, .card td, .card th': {
      minHeight: 'var(--slidey-font-min)',
      lineHeight: 'var(--slidey-line-height-base)',
    },
  };
}

/**
 * Generate aspect ratio styles
 */
function getAspectRatioStyles() {
  return {
    '.slide-ratio-16-9': { aspectRatio: '16 / 9' },
    '.slide-ratio-4-3': { aspectRatio: '4 / 3' },
    '.slide-ratio-9-16': { aspectRatio: '9 / 16' },
    '.slide-ratio-1-1': { aspectRatio: '1 / 1' },
  };
}

/**
 * Generate layout component styles
 *
 * ARCHITECTURE NOTE:
 * This generates CSS-in-JS for commonly used layout patterns.
 * Deprecated slide-specific layouts have been removed - legacy components
 * now use Tailwind utilities directly.
 */
function getLayoutStyles() {
  return {
    '.slide-layout-content': {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--slidey-spacing-gap)',
      padding: 'var(--slidey-spacing-padding)',
    },
    '.slide-layout-two-column': {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 'calc(var(--slidey-spacing-gap) * 2)',
      padding: 'var(--slidey-spacing-padding)',
      alignItems: 'center',
    },
    '.slide-content': {
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 'var(--slidey-spacing-gap)',
      padding: 'var(--slidey-spacing-padding)',
      position: 'relative',
      zIndex: '1',
    },
    '.slide-safe-zone': {
      padding: 'var(--slidey-safe-padding)',
      boxSizing: 'border-box',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  };
}

/**
 * Generate component styles
 */
function getComponentStyles() {
  return {
    '.slide-text-hero, .card-text-hero': {
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      lineHeight: '1.1',
      fontWeight: '800',
      letterSpacing: '-0.02em',
      textWrap: 'balance',
    },
    '.slide-text-header, .card-text-header': {
      fontSize: 'clamp(2rem, 5vw, 4rem)',
      lineHeight: '1.2',
      fontWeight: '700',
      letterSpacing: '-0.01em',
      textWrap: 'balance',
    },
    '.slide-text-body, .card-text-body': {
      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
      lineHeight: '1.5',
      fontWeight: '400',
      letterSpacing: '0',
    },
    '.slide-callout': {
      padding: 'calc(var(--slidey-spacing-gap) * 0.75)',
      borderRadius: '0.5rem',
      borderLeft: '4px solid var(--slidey-accent)',
      backgroundColor: 'var(--slidey-muted)',
      color: 'var(--slidey-foreground)',
      display: 'flex',
      gap: 'calc(var(--slidey-spacing-gap) * 0.5)',
    },
    '.slide-card': {
      padding: 'calc(var(--slidey-spacing-gap) * 1.5)',
      background: 'var(--slidey-background)',
      border: '1px solid var(--slidey-border)',
      borderRadius: '0.5rem',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    },
    '.slide-badge': {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25em 0.75em',
      fontSize: 'clamp(0.875rem, 1.5vw, 1.125rem)',
      fontWeight: '600',
      borderRadius: '9999px',
      background: 'var(--slidey-accent)',
      color: 'var(--slidey-accent-foreground)',
    },
  };
}

/**
 * Generate animation styles
 */
function getAnimationStyles() {
  return {
    '.slide-enter-fade': {
      animation: 'slideEnterFade var(--slidey-animation-duration, 500ms) ease-out',
    },
    '.slide-build': {
      opacity: '0',
      transform: 'translateY(1rem)',
      transition: 'opacity 400ms ease-out, transform 400ms ease-out',
    },
    '.slide-build.active': {
      opacity: '1',
      transform: 'translateY(0)',
    },
    '@keyframes slideEnterFade': {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
  };
}

/**
 * Generate utility styles
 */
function getUtilityStyles() {
  return {
    '.slide-p-safe': { padding: 'var(--slidey-safe-padding)' },
    '.slide-flex-center': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    '.slide-gap': { gap: 'var(--slidey-spacing-gap)' },
    '.slide-z-background': { zIndex: '0' },
    '.slide-z-content': { zIndex: '1' },
    '.slide-z-overlay': { zIndex: '2' },
  };
}

/**
 * Main SlideyUI plugin factory
 */
function slideyUI(userConfig: SlideyUIConfig = {}) {
  return plugin(
    function ({ addBase, addComponents, addUtilities }) {
      // Resolve configuration with defaults
      const config = resolveConfig(userConfig);
      const cssVars = generateCSSVariables(config.theme, config.prefix);

      // Add CSS variables to :root
      addBase({
        ':root': {
          ...cssVars,
          '--slidey-safe-padding': '5%',
          '--slidey-danger-zone': '2%',
          '--slidey-font-min': '24px',
          '--slidey-line-height-base': '1.4',
        },
      });

      // Add per-theme variable classes so themes can be applied via class or data attribute
      const themeSelectors: Record<string, Record<string, string>> = {};
      for (const id of getThemeIds()) {
        const tVars = generateCSSVariables(getTheme(id), config.prefix);
        themeSelectors[`.theme-${id}`] = tVars;
        themeSelectors[`[data-theme="${id}"]`] = tVars;
      }
      addBase(themeSelectors);

      // Add base slide styles
      if (config.includeBase) {
        addBase(getBaseStyles());
      }

      // Add component styles
      if (config.includeComponents) {
        addComponents({
          ...getAspectRatioStyles(),
          ...getLayoutStyles(),
          ...getComponentStyles(),
          ...getAnimationStyles(),
        });
      }

      // Add utility styles
      if (config.includeUtilities) {
        addUtilities(getUtilityStyles());
      }

      // Log theme information in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`\n✨ SlideyUI loaded with theme: ${config.theme.name}`);
        console.log(`   Aspect ratio: ${config.defaultRatio}`);
        console.log(`   Animation style: ${config.theme.animationStyle}`);
        console.log(`   Features enabled:`, Object.entries(config.theme.features)
          .filter(([_, enabled]) => enabled)
          .map(([feature]) => feature)
          .join(', ') || 'none');
      }
    },
    {
      theme: {
        extend: generateThemeExtension(resolveConfig(userConfig).theme),
      },
    }
  );
}

// Default export
export default slideyUI;

/**
 * Named export for CommonJS compatibility
 */
export { slideyUI };
