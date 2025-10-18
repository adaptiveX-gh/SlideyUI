/**
 * SlideyUI Utility Functions
 * Helper functions for plugin configuration and theme management
 */

import type { SlideyUIConfig, ResolvedConfig, Theme } from './types';
import { getTheme, isValidTheme } from './themes';
import { corporateTheme } from './themes';

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
 */
export function generateCSSVariables(theme: Theme, prefix: string = 'slidey'): Record<string, string> {
  const vars: Record<string, string> = {};

  // Color variables
  vars[`--${prefix}-primary`] = theme.colors.primary;
  vars[`--${prefix}-primary-foreground`] = theme.colors.primaryForeground;
  vars[`--${prefix}-secondary`] = theme.colors.secondary;
  vars[`--${prefix}-secondary-foreground`] = theme.colors.secondaryForeground;
  vars[`--${prefix}-accent`] = theme.colors.accent;
  vars[`--${prefix}-accent-foreground`] = theme.colors.accentForeground;
  vars[`--${prefix}-background`] = theme.colors.background;
  vars[`--${prefix}-foreground`] = theme.colors.foreground;
  vars[`--${prefix}-muted`] = theme.colors.muted;
  vars[`--${prefix}-muted-foreground`] = theme.colors.mutedForeground;
  vars[`--${prefix}-border`] = theme.colors.border;

  // Gradient variables (if available)
  if (theme.colors.gradient) {
    vars[`--${prefix}-gradient-from`] = theme.colors.gradient.from;
    vars[`--${prefix}-gradient-to`] = theme.colors.gradient.to;
    if (theme.colors.gradient.via) {
      vars[`--${prefix}-gradient-via`] = theme.colors.gradient.via;
    }
  }

  // Font variables
  vars[`--${prefix}-font-display`] = theme.fonts.display.join(', ');
  vars[`--${prefix}-font-body`] = theme.fonts.body.join(', ');
  if (theme.fonts.mono) {
    vars[`--${prefix}-font-mono`] = theme.fonts.mono.join(', ');
  }

  // Spacing variables
  vars[`--${prefix}-spacing-base`] = `${theme.spacing.base}rem`;
  vars[`--${prefix}-spacing-padding`] = `${theme.spacing.slidePadding}rem`;
  vars[`--${prefix}-spacing-gap`] = `${theme.spacing.contentGap}rem`;

  // Animation duration based on style
  const animationDurations: Record<string, string> = {
    none: '0ms',
    subtle: '300ms',
    dynamic: '500ms',
    energetic: '700ms',
  };
  vars[`--${prefix}-animation-duration`] = animationDurations[theme.animationStyle];

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
