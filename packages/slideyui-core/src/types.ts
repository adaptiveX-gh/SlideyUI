/**
 * SlideyUI Core Type Definitions
 * Comprehensive TypeScript types for the presentation framework
 */

/**
 * Available aspect ratios for slides
 */
export type SlideRatio = '16:9' | '4:3' | '9:16' | '1:1';

/**
 * Animation intensity levels
 */
export type AnimationStyle = 'none' | 'subtle' | 'dynamic' | 'energetic';

/**
 * Theme identifiers
 */
export type ThemeId = 'corporate' | 'pitch-deck' | 'academic' | 'workshop' | 'startup';

/**
 * Color palette definition for a theme
 */
export interface ColorPalette {
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  /** Optional gradient definitions */
  gradient?: {
    from: string;
    to: string;
    via?: string;
  };
}

/**
 * Font family configuration
 */
export interface FontFamilies {
  display: string[];
  body: string[];
  mono?: string[];
}

/**
 * Spacing preferences for a theme
 */
export interface SpacingPreferences {
  /** Base unit in rem */
  base: number;
  /** Slide padding multiplier */
  slidePadding: number;
  /** Content gap multiplier */
  contentGap: number;
}

/**
 * Special features enabled for a theme
 */
export interface ThemeFeatures {
  citations?: boolean;
  interactivity?: boolean;
  gradients?: boolean;
  animations?: boolean;
  codeHighlight?: boolean;
  dataVisualization?: boolean;
}

/**
 * Complete theme definition
 */
export interface Theme {
  /** Unique theme identifier */
  id: ThemeId;
  /** Human-readable theme name */
  name: string;
  /** Theme description */
  description: string;
  /** Default slide aspect ratio */
  slideRatio: SlideRatio;
  /** Color palette */
  colors: ColorPalette;
  /** Font families */
  fonts: FontFamilies;
  /** Spacing configuration */
  spacing: SpacingPreferences;
  /** Animation style */
  animationStyle: AnimationStyle;
  /** Special features */
  features: ThemeFeatures;
}

/**
 * Plugin configuration options
 */
export interface SlideyUIConfig {
  /** Selected theme ID or custom theme object */
  theme?: ThemeId | Partial<Theme>;
  /** Override default slide ratio */
  defaultRatio?: SlideRatio;
  /** Custom color overrides */
  colors?: Partial<ColorPalette>;
  /** Enable/disable specific features */
  features?: Partial<ThemeFeatures>;
  /** Custom CSS variable prefix (default: 'slidey') */
  prefix?: string;
  /** Include base styles (default: true) */
  includeBase?: boolean;
  /** Include component styles (default: true) */
  includeComponents?: boolean;
  /** Include utilities (default: true) */
  includeUtilities?: boolean;
}

/**
 * Resolved configuration with all defaults applied
 */
export interface ResolvedConfig {
  theme: Theme;
  defaultRatio: SlideRatio;
  prefix: string;
  includeBase: boolean;
  includeComponents: boolean;
  includeUtilities: boolean;
}
