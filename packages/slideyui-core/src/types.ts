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
 * Layout density presets for controlling spacing
 */
export type LayoutDensity = 'compact' | 'normal' | 'spacious';

/**
 * Layout density preset configuration
 */
export interface LayoutDensityPreset {
  id: LayoutDensity;
  name: string;
  description: string;
  gapMultiplier: number;
  heroGapMultiplier: number;
  cellMinHeight: string;
  itemCountRange: [number, number];
}

/**
 * Predefined layout density presets
 */
export const layoutDensityPresets: Record<LayoutDensity, LayoutDensityPreset> = {
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Data-dense presentations, dashboards',
    gapMultiplier: 1,
    heroGapMultiplier: 1.5,
    cellMinHeight: '150px',
    itemCountRange: [6, 12],
  },
  normal: {
    id: 'normal',
    name: 'Normal',
    description: 'Balanced for most presentations',
    gapMultiplier: 1.5,
    heroGapMultiplier: 2,
    cellMinHeight: '200px',
    itemCountRange: [4, 8],
  },
  spacious: {
    id: 'spacious',
    name: 'Spacious',
    description: 'Premium presentations, fewer items',
    gapMultiplier: 2,
    heroGapMultiplier: 2.5,
    cellMinHeight: '250px',
    itemCountRange: [2, 6],
  },
};

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
 * Theme mode (light/dark)
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

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
 * Hero layout overlay configuration
 */
export interface HeroOverlayDefaults {
  type: 'gradient' | 'solid' | 'none';
  colors: Array<'primary' | 'secondary' | 'accent'>;
  direction?: string;
  opacity: number;
}

/**
 * Hero layout text style configuration
 */
export interface HeroTextStyleDefaults {
  position: 'center' | 'top' | 'bottom' | 'left' | 'right';
  color: string;
  shadow: boolean;
}

/**
 * Hero layout defaults for a theme
 */
export interface HeroDefaults {
  overlay: HeroOverlayDefaults;
  textStyle: HeroTextStyleDefaults;
}

/**
 * Typography level definition with responsive sizing
 */
export interface TypographyLevel {
  /** Minimum font size (used in clamp) */
  min: string;
  /** Preferred font size (viewport-based, used in clamp) */
  preferred: string;
  /** Maximum font size (used in clamp) */
  max: string;
  /** Font weight */
  weight: number;
  /** Line height */
  lineHeight: number;
}

/**
 * Complete typography scale system
 * Configurable type scales instead of hardcoded sizes
 */
export interface TypographyScale {
  hero: TypographyLevel;
  h1: TypographyLevel;
  h2: TypographyLevel;
  h3: TypographyLevel;
  body: TypographyLevel;
  caption: TypographyLevel;
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
  /** Color palette (light mode by default) */
  colors: ColorPalette;
  /** Font families */
  fonts: FontFamilies;
  /** Spacing configuration */
  spacing: SpacingPreferences;
  /** Animation style */
  animationStyle: AnimationStyle;
  /** Special features */
  features: ThemeFeatures;
  /** Hero layout defaults */
  heroDefaults?: HeroDefaults;
  /** Typography scale configuration (optional override) */
  typography?: TypographyScale;
  /** Mode-specific color overrides (optional) */
  modes?: {
    light?: Partial<ColorPalette>;
    dark?: Partial<ColorPalette>;
  };
}

/**
 * Plugin configuration options
 */
export interface SlideyUIConfig {
  /** Selected theme ID or custom theme object */
  theme?: ThemeId | Partial<Theme>;
  /** Design preset to apply (tech-startup, academic-research, sales-demo, workshop-interactive) */
  preset?: string;
  /** Override default slide ratio */
  defaultRatio?: SlideRatio;
  /** Custom color overrides */
  colors?: Partial<ColorPalette>;
  /** Enable/disable specific features */
  features?: Partial<ThemeFeatures>;
  /** Custom CSS variables to inject */
  customCSS?: Record<string, string>;
  /** Custom CSS layers to inject */
  cssLayers?: {
    animations?: string;
    utilities?: string;
    components?: string;
  };
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
