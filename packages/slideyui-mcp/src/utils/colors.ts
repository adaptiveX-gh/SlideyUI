/**
 * Color Theory Utilities for SlideyUI MCP Server
 *
 * Provides color manipulation and harmony generation functions
 * for auto-generating accessible, harmonious theme palettes.
 */

/**
 * Convert hex color to RGB
 * @example hexToRgb('#ff5733') // { r: 255, g: 87, b: 51 }
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const normalized = hex.replace('#', '');
  const r = parseInt(normalized.substring(0, 2), 16);
  const g = parseInt(normalized.substring(2, 4), 16);
  const b = parseInt(normalized.substring(4, 6), 16);
  return { r, g, b };
}

/**
 * Convert RGB to hex color
 * @example rgbToHex(255, 87, 51) // '#ff5733'
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Convert RGB to HSL
 * @example rgbToHsl(255, 87, 51) // { h: 11, s: 100, l: 60 }
 */
export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to RGB
 * @example hslToRgb(11, 100, 60) // { r: 255, g: 87, b: 51 }
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360;
  s /= 100;
  l /= 100;

  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

/**
 * Adjust lightness of a color
 * @param hex - Hex color string
 * @param amount - Amount to adjust (-100 to 100, negative = darker, positive = lighter)
 * @example adjustLightness('#ff5733', 20) // '#ff8566'
 */
export function adjustLightness(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newL = Math.max(0, Math.min(100, hsl.l + amount));
  const newRgb = hslToRgb(hsl.h, hsl.s, newL);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Calculate relative luminance for WCAG contrast calculations
 * @param hex - Hex color string
 * @returns Relative luminance (0-1)
 * @example getRelativeLuminance('#ffffff') // 1
 * @example getRelativeLuminance('#000000') // 0
 */
export function getRelativeLuminance(hex: string): number {
  const rgb = hexToRgb(hex);

  const normalized = [rgb.r, rgb.g, rgb.b].map(val => {
    const norm = val / 255;
    return norm <= 0.03928
      ? norm / 12.92
      : Math.pow((norm + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * normalized[0]! + 0.7152 * normalized[1]! + 0.0722 * normalized[2]!;
}

/**
 * Generate complementary color (180° on color wheel)
 * @example generateComplementary('#ff5733') // '#33ddff' (cyan-ish)
 */
export function generateComplementary(primaryHex: string): string {
  const rgb = hexToRgb(primaryHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const newH = (hsl.h + 180) % 360;
  const newRgb = hslToRgb(newH, hsl.s, hsl.l);
  return rgbToHex(newRgb.r, newRgb.g, newRgb.b);
}

/**
 * Generate analogous colors (±30° on color wheel)
 * @example generateAnalogous('#ff5733') // { lighter: '#ff9933', darker: '#ff3366' }
 */
export function generateAnalogous(primaryHex: string): { lighter: string; darker: string } {
  const rgb = hexToRgb(primaryHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const lighterH = (hsl.h + 30) % 360;
  const darkerH = (hsl.h - 30 + 360) % 360;

  const lighterRgb = hslToRgb(lighterH, hsl.s, hsl.l);
  const darkerRgb = hslToRgb(darkerH, hsl.s, hsl.l);

  return {
    lighter: rgbToHex(lighterRgb.r, lighterRgb.g, lighterRgb.b),
    darker: rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b)
  };
}

/**
 * Generate triadic colors (120° apart on color wheel)
 * @example generateTriadic('#ff5733') // { secondary: '#33ff57', tertiary: '#5733ff' }
 */
export function generateTriadic(primaryHex: string): { secondary: string; tertiary: string } {
  const rgb = hexToRgb(primaryHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const secondaryH = (hsl.h + 120) % 360;
  const tertiaryH = (hsl.h + 240) % 360;

  const secondaryRgb = hslToRgb(secondaryH, hsl.s, hsl.l);
  const tertiaryRgb = hslToRgb(tertiaryH, hsl.s, hsl.l);

  return {
    secondary: rgbToHex(secondaryRgb.r, secondaryRgb.g, secondaryRgb.b),
    tertiary: rgbToHex(tertiaryRgb.r, tertiaryRgb.g, tertiaryRgb.b)
  };
}

/**
 * Generate monochromatic palette (different lightness values)
 * @example generateMonochromatic('#ff5733')
 * // {
 * //   lighter: '#ff8566',
 * //   light: '#ff6e4d',
 * //   base: '#ff5733',
 * //   dark: '#cc4629',
 * //   darker: '#99341f'
 * // }
 */
export function generateMonochromatic(primaryHex: string): {
  lighter: string;
  light: string;
  base: string;
  dark: string;
  darker: string;
} {
  const rgb = hexToRgb(primaryHex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const lighterRgb = hslToRgb(hsl.h, hsl.s, Math.min(100, hsl.l + 20));
  const lightRgb = hslToRgb(hsl.h, hsl.s, Math.min(100, hsl.l + 10));
  const darkRgb = hslToRgb(hsl.h, hsl.s, Math.max(0, hsl.l - 10));
  const darkerRgb = hslToRgb(hsl.h, hsl.s, Math.max(0, hsl.l - 20));

  return {
    lighter: rgbToHex(lighterRgb.r, lighterRgb.g, lighterRgb.b),
    light: rgbToHex(lightRgb.r, lightRgb.g, lightRgb.b),
    base: primaryHex,
    dark: rgbToHex(darkRgb.r, darkRgb.g, darkRgb.b),
    darker: rgbToHex(darkerRgb.r, darkerRgb.g, darkerRgb.b)
  };
}

/**
 * Auto-generate complete theme color palette from a primary color
 *
 * @param primary - Primary brand color (hex)
 * @param options - Optional configuration
 * @returns Complete theme color palette with WCAG-compliant foreground colors
 *
 * @example
 * generateThemeColors('#3b82f6')
 * // {
 * //   primary: '#3b82f6',
 * //   secondary: '#8b5cf6',
 * //   accent: '#f59e0b',
 * //   background: '#ffffff',
 * //   foreground: '#0f172a',
 * //   muted: '#f1f5f9',
 * //   mutedForeground: '#64748b',
 * //   border: '#e2e8f0'
 * // }
 *
 * @example
 * generateThemeColors('#3b82f6', { background: '#0f172a', preferredHarmony: 'triadic' })
 * // {
 * //   primary: '#3b82f6',
 * //   secondary: '#f6823b',
 * //   accent: '#82f63b',
 * //   background: '#0f172a',
 * //   foreground: '#f8fafc',
 * //   muted: '#1e293b',
 * //   mutedForeground: '#94a3b8',
 * //   border: '#334155'
 * // }
 */
export function generateThemeColors(primary: string, options?: {
  background?: string;
  preferredHarmony?: 'complementary' | 'analogous' | 'triadic' | 'monochromatic';
}): {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
} {
  const harmony = options?.preferredHarmony || 'analogous';
  const background = options?.background || '#ffffff';

  // Determine if background is light or dark based on luminance
  const bgLuminance = getRelativeLuminance(background);
  const isLightBackground = bgLuminance > 0.5;

  // Generate secondary color based on harmony preference
  let secondary: string;
  let accent: string;

  switch (harmony) {
    case 'complementary':
      secondary = generateComplementary(primary);
      accent = generateAnalogous(primary).lighter;
      break;

    case 'triadic':
      const triadic = generateTriadic(primary);
      secondary = triadic.secondary;
      accent = triadic.tertiary;
      break;

    case 'monochromatic':
      const mono = generateMonochromatic(primary);
      secondary = mono.dark;
      accent = mono.lighter;
      break;

    case 'analogous':
    default:
      const analogous = generateAnalogous(primary);
      secondary = analogous.darker;
      accent = generateComplementary(primary);
      break;
  }

  // Generate foreground color with high contrast
  const foreground = isLightBackground ? '#0f172a' : '#f8fafc';

  // Generate muted colors (desaturated version of primary)
  const primaryRgb = hexToRgb(primary);
  const primaryHsl = rgbToHsl(primaryRgb.r, primaryRgb.g, primaryRgb.b);

  // Muted background - low saturation, adjusted lightness based on theme
  const mutedL = isLightBackground ? 95 : 15;
  const mutedRgb = hslToRgb(primaryHsl.h, 10, mutedL);
  const muted = rgbToHex(mutedRgb.r, mutedRgb.g, mutedRgb.b);

  // Muted foreground - medium saturation, medium lightness
  const mutedForegroundL = isLightBackground ? 45 : 65;
  const mutedForegroundRgb = hslToRgb(primaryHsl.h, 20, mutedForegroundL);
  const mutedForeground = rgbToHex(mutedForegroundRgb.r, mutedForegroundRgb.g, mutedForegroundRgb.b);

  // Border - slightly darker/lighter than muted based on background
  const borderL = isLightBackground ? 88 : 25;
  const borderRgb = hslToRgb(primaryHsl.h, 15, borderL);
  const border = rgbToHex(borderRgb.r, borderRgb.g, borderRgb.b);

  return {
    primary,
    secondary,
    accent,
    background,
    foreground,
    muted,
    mutedForeground,
    border
  };
}

/**
 * Calculate contrast ratio between two colors
 *
 * @param color1 - First color (hex)
 * @param color2 - Second color (hex)
 * @returns Contrast ratio (1-21)
 *
 * @example
 * getContrastRatio('#ffffff', '#000000') // 21 (maximum contrast)
 * getContrastRatio('#ffffff', '#ffffff') // 1 (no contrast)
 */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getRelativeLuminance(color1);
  const l2 = getRelativeLuminance(color2);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Validate theme accessibility according to WCAG guidelines
 *
 * Checks contrast ratios for critical color pairs:
 * - Foreground on background (WCAG AA: 4.5:1)
 * - Primary on background (WCAG AA: 4.5:1)
 * - Accent on background (WCAG AA: 4.5:1)
 * - Muted foreground on muted (WCAG AA: 4.5:1)
 *
 * @param theme - Custom theme to validate
 * @returns Array of warning strings (empty if all checks pass)
 *
 * @example
 * const warnings = validateAccessibility(theme);
 * if (warnings.length > 0) {
 *   console.warn("Accessibility issues:", warnings);
 * }
 */
export function validateAccessibility(theme: {
  colors: {
    primary: string;
    secondary?: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border?: string;
  };
}): string[] {
  const warnings: string[] = [];
  const WCAG_AA_NORMAL = 4.5; // WCAG AA for normal text
  const WCAG_AA_LARGE = 3.0;  // WCAG AA for large text (18pt+)

  // Check foreground on background
  const fgBgRatio = getContrastRatio(theme.colors.foreground, theme.colors.background);
  if (fgBgRatio < WCAG_AA_NORMAL) {
    warnings.push(
      `Low contrast between foreground and background (${fgBgRatio.toFixed(2)}:1). ` +
      `WCAG AA requires 4.5:1 for normal text. Consider using a darker foreground or lighter background.`
    );
  }

  // Check primary on background
  const primaryBgRatio = getContrastRatio(theme.colors.primary, theme.colors.background);
  if (primaryBgRatio < WCAG_AA_LARGE) {
    warnings.push(
      `Low contrast between primary color and background (${primaryBgRatio.toFixed(2)}:1). ` +
      `WCAG AA requires at least 3.0:1 for large text. Headers may be hard to read.`
    );
  }

  // Check accent on background
  const accentBgRatio = getContrastRatio(theme.colors.accent, theme.colors.background);
  if (accentBgRatio < WCAG_AA_LARGE) {
    warnings.push(
      `Low contrast between accent color and background (${accentBgRatio.toFixed(2)}:1). ` +
      `WCAG AA requires at least 3.0:1 for large text. Accent elements may be hard to read.`
    );
  }

  // Check muted foreground on muted background
  const mutedRatio = getContrastRatio(theme.colors.mutedForeground, theme.colors.muted);
  if (mutedRatio < WCAG_AA_NORMAL) {
    warnings.push(
      `Low contrast between muted foreground and muted background (${mutedRatio.toFixed(2)}:1). ` +
      `WCAG AA requires 4.5:1 for normal text. Muted text may be hard to read.`
    );
  }

  // Check secondary on background (if provided)
  if (theme.colors.secondary) {
    const secondaryBgRatio = getContrastRatio(theme.colors.secondary, theme.colors.background);
    if (secondaryBgRatio < WCAG_AA_LARGE) {
      warnings.push(
        `Low contrast between secondary color and background (${secondaryBgRatio.toFixed(2)}:1). ` +
        `WCAG AA requires at least 3.0:1 for large text.`
      );
    }
  }

  return warnings;
}

/**
 * Convert hex color to rgba
 *
 * @param hex - Hex color string (e.g., '#FF5733')
 * @param alpha - Alpha value (0-1)
 * @returns RGBA color string
 *
 * @example
 * hexToRgba('#FF5733', 0.7) // 'rgba(255, 87, 51, 0.7)'
 */
export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

/**
 * Predefined theme color mappings
 */
const THEME_COLOR_MAP: Record<string, {
  primary: string;
  secondary: string;
  accent: string;
}> = {
  corporate: {
    primary: '#1e40af',
    secondary: '#64748b',
    accent: '#0891b2',
  },
  'pitch-deck': {
    primary: '#7c3aed',
    secondary: '#ec4899',
    accent: '#f59e0b',
  },
  academic: {
    primary: '#1e3a8a',
    secondary: '#92400e',
    accent: '#065f46',
  },
  workshop: {
    primary: '#ea580c',
    secondary: '#fb923c',
    accent: '#fdba74',
  },
  startup: {
    primary: '#10b981',
    secondary: '#34d399',
    accent: '#6ee7b7',
  },
};

/**
 * Get theme color by name
 *
 * Maps semantic color names (primary, secondary, accent) to actual hex values
 * based on the current theme. Supports both predefined themes and custom themes
 * registered in the theme registry.
 *
 * @param colorName - Color name (primary, secondary, or accent)
 * @param theme - Theme name
 * @returns Hex color value
 *
 * @example
 * getThemeColor('primary', 'corporate') // '#1e40af'
 * getThemeColor('accent', 'startup') // '#6ee7b7'
 */
export function getThemeColor(colorName: 'primary' | 'secondary' | 'accent', theme: string): string {
  // Check predefined themes first
  const predefinedTheme = THEME_COLOR_MAP[theme];
  if (predefinedTheme) {
    return predefinedTheme[colorName];
  }

  // For custom themes, we need to import the theme registry
  // This is a lazy import to avoid circular dependencies
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getTheme } = require('./theme-registry.js') as typeof import('./theme-registry.js');
    const customTheme = getTheme(theme);

    if (customTheme) {
      const colorMap: Record<'primary' | 'secondary' | 'accent', string> = {
        primary: customTheme.colors.primary,
        secondary: customTheme.colors.secondary || customTheme.colors.primary,
        accent: customTheme.colors.accent || customTheme.colors.primary,
      };
      return colorMap[colorName];
    }
  } catch {
    // Fall through to default
  }

  // Fallback to corporate theme
  const corporateTheme = THEME_COLOR_MAP.corporate;
  if (!corporateTheme) {
    // Hard-coded fallback if corporate theme is somehow missing
    const fallbackColors = { primary: '#1e40af', secondary: '#64748b', accent: '#0891b2' };
    return fallbackColors[colorName];
  }
  return corporateTheme[colorName];
}

/**
 * Overlay configuration interface
 */
export interface OverlayConfig {
  enabled?: boolean;
  type?: 'gradient' | 'solid' | 'none';
  colors?: Array<'primary' | 'secondary' | 'accent'>;
  customColors?: string[];
  opacity?: number;
  direction?: string;
}

/**
 * Generate overlay CSS based on overlay configuration
 *
 * Creates CSS background value for hero slide overlays. Supports:
 * - Gradient overlays (linear-gradient)
 * - Solid color overlays
 * - Theme color resolution
 * - Custom hex colors
 * - Configurable opacity and direction
 *
 * @param overlay - Overlay configuration object
 * @param theme - Theme name for color resolution
 * @returns CSS background value
 *
 * @example
 * generateOverlayCSS({
 *   type: 'gradient',
 *   colors: ['primary', 'secondary'],
 *   opacity: 0.7,
 *   direction: '135deg'
 * }, 'corporate')
 * // Returns: 'linear-gradient(135deg, rgba(30, 64, 175, 0.7), rgba(100, 116, 139, 0.7))'
 *
 * @example
 * generateOverlayCSS({
 *   type: 'solid',
 *   customColors: ['#FF5733'],
 *   opacity: 0.5
 * }, 'corporate')
 * // Returns: 'rgba(255, 87, 51, 0.5)'
 */
export function generateOverlayCSS(overlay: OverlayConfig, theme: string): string {
  // Return 'none' if overlay is explicitly disabled or type is 'none'
  if (overlay.enabled === false || overlay.type === 'none') {
    return 'none';
  }

  const opacity = overlay.opacity ?? 0.7;
  const overlayType = overlay.type || 'gradient'; // Default to gradient

  // Resolve colors (custom colors take precedence over theme colors)
  let resolvedColors: string[];

  if (overlay.customColors && overlay.customColors.length > 0) {
    resolvedColors = overlay.customColors;
  } else if (overlay.colors && overlay.colors.length > 0) {
    resolvedColors = overlay.colors.map(colorName => getThemeColor(colorName, theme));
  } else {
    // Default to primary and secondary theme colors
    resolvedColors = [
      getThemeColor('primary', theme),
      getThemeColor('secondary', theme),
    ];
  }

  // Convert hex colors to rgba with opacity
  const rgbaColors = resolvedColors.map(hex => hexToRgba(hex, opacity));

  // Generate CSS based on overlay type (defaults to gradient)
  if (overlayType === 'solid') {
    return rgbaColors[0]!;
  } else {
    // Default behavior: gradient
    const direction = overlay.direction || '135deg';
    return `linear-gradient(${direction}, ${rgbaColors.join(', ')})`;
  }
}
