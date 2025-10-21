/**
 * SlideyUI Utility Functions
 * Helper functions for plugin configuration and theme management
 */

import type { SlideyUIConfig, ResolvedConfig, Theme, ThemeId } from './types';
import { getTheme, isValidTheme } from './themes';
import { corporateTheme } from './themes';
import { getPreset, isValidPreset, applyPreset } from './presets';

/**
 * Deep merge two objects with type safety
 */
function deepMerge<T extends Record<string, any>>(target: T, source: Partial<T>): T {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else if (sourceValue !== undefined) {
        result[key] = sourceValue as T[Extract<keyof T, string>];
      }
    }
  }

  return result;
}

/**
 * Resolve user configuration with defaults
 */
export function resolveConfig(config: SlideyUIConfig = {}): ResolvedConfig {
  // Determine base theme
  let baseTheme: Theme;

  if (typeof config.theme === 'string') {
    if (isValidTheme(config.theme)) {
      baseTheme = getTheme(config.theme);
    } else {
      console.warn(`Unknown theme "${config.theme}", falling back to "corporate"`);
      baseTheme = corporateTheme;
    }
  } else if (config.theme && typeof config.theme === 'object') {
    // Merge custom theme with corporate as base
    baseTheme = deepMerge(corporateTheme, config.theme as Partial<Theme>);
  } else {
    baseTheme = corporateTheme;
  }

  // Apply design preset if specified
  if (config.preset) {
    if (isValidPreset(config.preset)) {
      const preset = getPreset(config.preset);
      if (preset) {
        baseTheme = applyPreset(baseTheme, preset);
        if (process.env.NODE_ENV === 'development') {
          console.log(`📦 SlideyUI: Applied preset "${preset.name}"`);
        }
      }
    } else {
      console.warn(`Unknown preset "${config.preset}", ignoring`);
    }
  }

  // Apply color overrides
  if (config.colors) {
    baseTheme = {
      ...baseTheme,
      colors: { ...baseTheme.colors, ...config.colors },
    };
  }

  // Apply feature overrides
  if (config.features) {
    baseTheme = {
      ...baseTheme,
      features: { ...baseTheme.features, ...config.features },
    };
  }

  return {
    theme: baseTheme,
    defaultRatio: config.defaultRatio || baseTheme.slideRatio,
    prefix: config.prefix || 'slidey',
    includeBase: config.includeBase !== false,
    includeComponents: config.includeComponents !== false,
    includeUtilities: config.includeUtilities !== false,
  };
}

/**
 * Generate CSS variables from theme
 * @param theme - The theme to generate variables for
 * @param prefix - Variable prefix (default: 'slidey')
 * @param mode - Optional mode to use (light/dark). If not specified, uses base colors
 */
export function generateCSSVariables(
  theme: Theme,
  prefix: string = 'slidey',
  mode?: 'light' | 'dark'
): Record<string, string> {
  const vars: Record<string, string> = {};

  // Determine which colors to use
  let colors = theme.colors;
  if (mode && theme.modes && theme.modes[mode]) {
    // Merge base colors with mode-specific overrides
    colors = { ...theme.colors, ...theme.modes[mode] };
  }

  // Color variables
  vars[`--${prefix}-primary`] = colors.primary;
  vars[`--${prefix}-primary-foreground`] = colors.primaryForeground;
  vars[`--${prefix}-secondary`] = colors.secondary;
  vars[`--${prefix}-secondary-foreground`] = colors.secondaryForeground;
  vars[`--${prefix}-accent`] = colors.accent;
  vars[`--${prefix}-accent-foreground`] = colors.accentForeground;
  vars[`--${prefix}-background`] = colors.background;
  vars[`--${prefix}-foreground`] = colors.foreground;
  vars[`--${prefix}-muted`] = colors.muted;
  vars[`--${prefix}-muted-foreground`] = colors.mutedForeground;
  vars[`--${prefix}-border`] = colors.border;

  // Gradient variables (if available)
  if (colors.gradient) {
    vars[`--${prefix}-gradient-from`] = colors.gradient.from;
    vars[`--${prefix}-gradient-to`] = colors.gradient.to;
    if (colors.gradient.via) {
      vars[`--${prefix}-gradient-via`] = colors.gradient.via;
    }
  }

  // Font variables (not mode-specific)
  vars[`--${prefix}-font-display`] = theme.fonts.display.join(', ');
  vars[`--${prefix}-font-body`] = theme.fonts.body.join(', ');
  if (theme.fonts.mono) {
    vars[`--${prefix}-font-mono`] = theme.fonts.mono.join(', ');
  }

  // Spacing variables (not mode-specific)
  vars[`--${prefix}-spacing-base`] = `${theme.spacing.base}rem`;
  vars[`--${prefix}-spacing-padding`] = `${theme.spacing.slidePadding}rem`;
  vars[`--${prefix}-spacing-gap`] = `${theme.spacing.contentGap}rem`;

  // Animation duration based on style (not mode-specific)
  const animationDurations: Record<string, string> = {
    none: '0ms',
    subtle: '300ms',
    dynamic: '500ms',
    energetic: '700ms',
  };
  vars[`--${prefix}-animation-duration`] = animationDurations[theme.animationStyle];

  // Typography scale variables (if configured, not mode-specific)
  if (theme.typography) {
    // Hero text
    vars[`--${prefix}-text-hero`] = `clamp(${theme.typography.hero.min}, ${theme.typography.hero.preferred}, ${theme.typography.hero.max})`;
    vars[`--${prefix}-text-hero-weight`] = theme.typography.hero.weight.toString();
    vars[`--${prefix}-text-hero-lh`] = theme.typography.hero.lineHeight.toString();

    // H1
    vars[`--${prefix}-text-h1`] = `clamp(${theme.typography.h1.min}, ${theme.typography.h1.preferred}, ${theme.typography.h1.max})`;
    vars[`--${prefix}-text-h1-weight`] = theme.typography.h1.weight.toString();
    vars[`--${prefix}-text-h1-lh`] = theme.typography.h1.lineHeight.toString();

    // H2
    vars[`--${prefix}-text-h2`] = `clamp(${theme.typography.h2.min}, ${theme.typography.h2.preferred}, ${theme.typography.h2.max})`;
    vars[`--${prefix}-text-h2-weight`] = theme.typography.h2.weight.toString();
    vars[`--${prefix}-text-h2-lh`] = theme.typography.h2.lineHeight.toString();

    // H3
    vars[`--${prefix}-text-h3`] = `clamp(${theme.typography.h3.min}, ${theme.typography.h3.preferred}, ${theme.typography.h3.max})`;
    vars[`--${prefix}-text-h3-weight`] = theme.typography.h3.weight.toString();
    vars[`--${prefix}-text-h3-lh`] = theme.typography.h3.lineHeight.toString();

    // Body
    vars[`--${prefix}-text-body`] = `clamp(${theme.typography.body.min}, ${theme.typography.body.preferred}, ${theme.typography.body.max})`;
    vars[`--${prefix}-text-body-weight`] = theme.typography.body.weight.toString();
    vars[`--${prefix}-text-body-lh`] = theme.typography.body.lineHeight.toString();

    // Caption
    vars[`--${prefix}-text-caption`] = `clamp(${theme.typography.caption.min}, ${theme.typography.caption.preferred}, ${theme.typography.caption.max})`;
    vars[`--${prefix}-text-caption-weight`] = theme.typography.caption.weight.toString();
    vars[`--${prefix}-text-caption-lh`] = theme.typography.caption.lineHeight.toString();
  }

  return vars;
}

/**
 * Convert CSS variables object to CSS string
 */
export function cssVariablesToString(vars: Record<string, string>): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join('\n    ');
}

/**
 * Generate Tailwind theme extensions from SlideyUI theme
 */
export function generateThemeExtension(theme: Theme) {
  return {
    colors: {
      'slide-primary': theme.colors.primary,
      'slide-primary-foreground': theme.colors.primaryForeground,
      'slide-secondary': theme.colors.secondary,
      'slide-secondary-foreground': theme.colors.secondaryForeground,
      'slide-accent': theme.colors.accent,
      'slide-accent-foreground': theme.colors.accentForeground,
      'slide-background': theme.colors.background,
      'slide-foreground': theme.colors.foreground,
      'slide-muted': theme.colors.muted,
      'slide-muted-foreground': theme.colors.mutedForeground,
      'slide-border': theme.colors.border,
    },
    fontFamily: {
      'slide-display': theme.fonts.display,
      'slide-body': theme.fonts.body,
      'slide-mono': theme.fonts.mono || ['monospace'],
    },
    spacing: {
      'slide-base': `${theme.spacing.base}rem`,
      'slide-padding': `${theme.spacing.slidePadding}rem`,
      'slide-gap': `${theme.spacing.contentGap}rem`,
    },
  };
}

/**
 * Validate theme configuration
 */
export function validateTheme(theme: Partial<Theme>): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (theme.colors) {
    const requiredColors = [
      'primary',
      'primaryForeground',
      'secondary',
      'secondaryForeground',
      'accent',
      'accentForeground',
      'background',
      'foreground',
      'muted',
      'mutedForeground',
      'border',
    ];

    for (const color of requiredColors) {
      if (!(color in theme.colors)) {
        errors.push(`Missing required color: ${color}`);
      }
    }
  }

  if (theme.fonts) {
    if (!theme.fonts.display || !Array.isArray(theme.fonts.display) || theme.fonts.display.length === 0) {
      errors.push('Invalid or missing display font family');
    }
    if (!theme.fonts.body || !Array.isArray(theme.fonts.body) || theme.fonts.body.length === 0) {
      errors.push('Invalid or missing body font family');
    }
  }

  if (theme.spacing) {
    if (typeof theme.spacing.base !== 'number' || theme.spacing.base <= 0) {
      errors.push('Invalid base spacing value');
    }
    if (typeof theme.spacing.slidePadding !== 'number' || theme.spacing.slidePadding < 0) {
      errors.push('Invalid slide padding value');
    }
    if (typeof theme.spacing.contentGap !== 'number' || theme.spacing.contentGap < 0) {
      errors.push('Invalid content gap value');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Create a derived theme by extending a base theme with overrides
 * Supports theme inheritance and composition
 *
 * @param baseThemeId - The base theme to extend
 * @param overrides - Partial theme properties to override
 * @param options - Optional metadata for the derived theme
 * @returns A new theme object with overrides applied
 *
 * @example
 * ```ts
 * const myTheme = createDerivedTheme('corporate', {
 *   colors: {
 *     primary: '#FF5733',
 *     accent: '#00D4FF',
 *   },
 *   spacing: {
 *     slidePadding: 4,
 *   },
 * }, {
 *   id: 'my-brand',
 *   name: 'My Brand Theme',
 *   description: 'Custom corporate theme with brand colors',
 * });
 * ```
 */
export function createDerivedTheme(
  baseThemeId: ThemeId,
  overrides: Partial<Theme>,
  options?: {
    id?: string;
    name?: string;
    description?: string;
  }
): Theme {
  const baseTheme = getTheme(baseThemeId);

  // Deep merge hero defaults if provided
  let heroDefaults = baseTheme.heroDefaults;
  if (overrides.heroDefaults && baseTheme.heroDefaults) {
    heroDefaults = {
      overlay: {
        ...baseTheme.heroDefaults.overlay,
        ...(overrides.heroDefaults.overlay || {}),
      },
      textStyle: {
        ...baseTheme.heroDefaults.textStyle,
        ...(overrides.heroDefaults.textStyle || {}),
      },
    };
  } else if (overrides.heroDefaults) {
    heroDefaults = overrides.heroDefaults as any;
  }

  // Deep merge typography if provided
  let typography = baseTheme.typography;
  if (overrides.typography) {
    if (baseTheme.typography) {
      typography = {
        hero: { ...baseTheme.typography.hero, ...(overrides.typography.hero || {}) },
        h1: { ...baseTheme.typography.h1, ...(overrides.typography.h1 || {}) },
        h2: { ...baseTheme.typography.h2, ...(overrides.typography.h2 || {}) },
        h3: { ...baseTheme.typography.h3, ...(overrides.typography.h3 || {}) },
        body: { ...baseTheme.typography.body, ...(overrides.typography.body || {}) },
        caption: { ...baseTheme.typography.caption, ...(overrides.typography.caption || {}) },
      };
    } else {
      typography = overrides.typography;
    }
  }

  return {
    ...baseTheme,
    id: (options?.id || `${baseThemeId}-custom`) as ThemeId,
    name: options?.name || `${baseTheme.name} (Custom)`,
    description: options?.description || baseTheme.description,
    colors: { ...baseTheme.colors, ...overrides.colors },
    fonts: { ...baseTheme.fonts, ...overrides.fonts },
    spacing: { ...baseTheme.spacing, ...overrides.spacing },
    features: { ...baseTheme.features, ...overrides.features },
    animationStyle: overrides.animationStyle || baseTheme.animationStyle,
    slideRatio: overrides.slideRatio || baseTheme.slideRatio,
    heroDefaults,
    typography,
  };
}
