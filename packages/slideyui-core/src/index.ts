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
export * from './presets';
export { resolveConfig, generateCSSVariables, generateThemeExtension, createDerivedTheme } from './utils';

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
      padding: 'var(--card-padding) !important',
      background: 'var(--slidey-background)',
      // Border and shadow are now controlled by component props
      borderRadius: '0.5rem',
      boxSizing: 'border-box',
      overflow: 'hidden',
    },
    '.slide-card-compact': {
      padding: 'var(--card-padding-compact)',
    },
    '.slide-card-spacious': {
      padding: 'var(--card-padding-spacious)',
    },
    '.slide-card-flush': {
      padding: '0',
    },
    '.slide-card-header': {
      marginBottom: 'var(--card-spacing-md)',
      padding: '0',
    },
    '.slide-card-title': {
      fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
      fontWeight: '600',
    },
    '.slide-card-description': {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      color: 'var(--slidey-muted-foreground)',
    },
    '.slide-card-body': {
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
    },
    '.slide-card-footer': {
      marginTop: 'var(--card-spacing-lg)',
      paddingTop: 'var(--card-spacing-md)',
      borderTop: '1px solid var(--slidey-border)',
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

      // Prepare root CSS variables
      const rootVars: Record<string, string> = {
        ...cssVars,
        '--slidey-safe-padding': '5%',
        '--slidey-danger-zone': '2%',
        '--slidey-font-min': '24px',
        '--slidey-line-height-base': '1.4',
        // Card spacing scale (8pt grid system)
        '--card-spacing-xs': '0.5rem',   // 8px
        '--card-spacing-sm': '0.75rem',  // 12px
        '--card-spacing-md': '1rem',     // 16px
        '--card-spacing-lg': '1.5rem',   // 24px
        '--card-spacing-xl': '2rem',     // 32px
        '--card-spacing-2xl': '3rem',    // 48px
        '--card-spacing-3xl': '4rem',    // 64px
        // Card padding defaults
        '--card-padding': 'var(--card-spacing-xl)',          // 32px default
        '--card-padding-compact': 'var(--card-spacing-lg)',  // 24px compact
        '--card-padding-spacious': 'var(--card-spacing-2xl)', // 48px spacious
      };

      // Merge custom CSS variables if provided
      if (userConfig.customCSS) {
        Object.assign(rootVars, userConfig.customCSS);
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎨 SlideyUI: Injected ${Object.keys(userConfig.customCSS).length} custom CSS variables`);
        }
      }

      // Add CSS variables to :root
      addBase({
        ':root': rootVars,
      });

      // Add per-theme variable classes so themes can be applied via class or data attribute
      const themeSelectors: Record<string, Record<string, string>> = {};
      for (const id of getThemeIds()) {
        const theme = getTheme(id);

        // Generate base theme variables (light mode by default)
        const lightVars = generateCSSVariables(theme, config.prefix, 'light');
        themeSelectors[`.theme-${id}`] = lightVars;
        themeSelectors[`[data-theme="${id}"]`] = lightVars;

        // Generate dark mode variables if theme has dark mode support
        if (theme.modes?.dark) {
          const darkVars = generateCSSVariables(theme, config.prefix, 'dark');
          themeSelectors[`[data-theme="${id}"][data-theme-mode="dark"]`] = darkVars;
          themeSelectors[`.theme-${id}[data-theme-mode="dark"]`] = darkVars;

          // Also support auto mode with prefers-color-scheme
          themeSelectors[`@media (prefers-color-scheme: dark)`] = {
            ...themeSelectors[`@media (prefers-color-scheme: dark)`],
            [`[data-theme="${id}"]:not([data-theme-mode="light"])`]: darkVars,
            [`.theme-${id}:not([data-theme-mode="light"])`]: darkVars,
          } as any;
        }
      }

      // Add DaisyUI dark theme support (for themes that aren't SlideyUI themes)
      // These selectors handle DaisyUI's built-in dark themes
      const daisyDarkThemes = ['dark', 'business', 'night', 'forest', 'black', 'dracula', 'halloween', 'coffee'];
      for (const darkTheme of daisyDarkThemes) {
        themeSelectors[`[data-theme="${darkTheme}"]`] = {
          '--slidey-primary': '#60a5fa', // blue-400
          '--slidey-primary-foreground': '#ffffff',
          '--slidey-secondary': '#94a3b8', // slate-400
          '--slidey-secondary-foreground': '#0f172a',
          '--slidey-accent': '#22d3ee', // cyan-400
          '--slidey-accent-foreground': '#0f172a',
          '--slidey-background': '#0f172a', // slate-900
          '--slidey-foreground': '#f8fafc', // slate-50
          '--slidey-muted': '#1e293b', // slate-800
          '--slidey-muted-foreground': '#94a3b8', // slate-400
          '--slidey-border': '#334155', // slate-700
        };
      }

      addBase(themeSelectors);

      // Inject custom CSS layers if provided
      if (userConfig.cssLayers) {
        if (userConfig.cssLayers.animations) {
          addBase({ '@layer animations': userConfig.cssLayers.animations } as any);
        }
        if (userConfig.cssLayers.utilities) {
          addUtilities(userConfig.cssLayers.utilities as any);
        }
        if (userConfig.cssLayers.components) {
          addComponents(userConfig.cssLayers.components as any);
        }
        if (process.env.NODE_ENV === 'development') {
          const layerCount = Object.keys(userConfig.cssLayers).length;
          console.log(`📝 SlideyUI: Injected ${layerCount} custom CSS layer(s)`);
        }
      }

      // Add base slide styles
      if (config.includeBase) {
        addBase(getBaseStyles());
      }

      // Add component styles
      if (config.includeComponents) {
        const componentStyles = {
          ...getAspectRatioStyles(),
          ...getLayoutStyles(),
          ...getComponentStyles(),
          ...getAnimationStyles(),
        };
        console.log('🔍 SlideyUI: Adding', Object.keys(componentStyles).length, 'component classes');
        console.log('🔍 SlideyUI: .slide-card class defined:', !!componentStyles['.slide-card']);
        addComponents(componentStyles);
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
