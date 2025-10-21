/**
 * Core type definitions for SlideyUI MCP
 *
 * These types define the structure of presentations, slides, and generation options.
 * All types are framework-agnostic and designed for optimal AI reasoning.
 */

/**
 * Available presentation themes
 */
export type Theme =
  | 'corporate'
  | 'pitch-deck'
  | 'academic'
  | 'workshop'
  | 'startup';

/**
 * Aspect ratio options for presentations
 */
export type AspectRatio = '16:9' | '4:3';

/**
 * Font size presets optimized for projection
 */
export type FontSize = 'default' | 'large' | 'xlarge';

/**
 * Layout density options for controlling spacing
 */
export type LayoutDensity = 'compact' | 'normal' | 'spacious';

/**
 * Theme mode options (light/dark/auto)
 */
export type ThemeMode = 'light' | 'dark' | 'auto';

/**
 * Design preset names for theme variations
 */
export type DesignPreset = string;

/**
 * Available slide types
 */
export type SlideType =
  | 'title'
  | 'content'
  | 'media'
  | 'data'
  | 'quote'
  | 'timeline'
  | 'comparison'
  | 'process'
  | 'section-header'
  | 'blank'
  | 'hero'
  | 'two-column'
  | 'three-column'
  | 'four-column'
  | 'chart-with-metrics'
  | 'product-overview'
  | 'grid'
  | 'feature-cards'
  | 'team'
  | 'pricing'
  | 'code';

/**
 * Card state for generation feedback
 */
export type CardState = 'generating' | 'complete' | 'error';

/**
 * Base slide specification
 */
export interface BaseSlideSpec {
  type: SlideType;
  id?: string;
  notes?: string;
  state?: CardState;
}

/**
 * Title slide specification
 */
export interface TitleSlideSpec extends BaseSlideSpec {
  type: 'title';
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
}

/**
 * Content slide specification
 */
export interface ContentSlideSpec extends BaseSlideSpec {
  type: 'content';
  title: string;
  content: string[] | string;
  layout?: 'single-column' | 'two-column';
}

/**
 * Overlay configuration for media slides
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
 * Text style configuration for media slides
 */
export interface TextStyleConfig {
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  color?: string;
  shadow?: boolean;
  maxWidth?: string;
}

/**
 * Print configuration for media slides
 */
export interface PrintConfig {
  /** High-resolution image URL for print output (300dpi recommended) */
  mediaUrl?: string;
  /** Enable/disable printing of this slide */
  enabled?: boolean;
  /** Print quality: 'high' uses 300dpi images, 'medium' uses 150dpi, 'screen' uses 72dpi */
  quality?: 'high' | 'medium' | 'screen';
}

/**
 * Image loading configuration for progressive enhancement
 */
export interface LoadingConfig {
  /** Loading strategy: 'progressive' (blur-up), 'eager' (immediate), 'lazy' (on-demand) */
  strategy?: 'progressive' | 'eager' | 'lazy';
  /** Placeholder configuration */
  placeholder?: {
    /** Placeholder type */
    type?: 'blur' | 'color' | 'none';
    /** Low-resolution thumbnail URL for blur-up effect */
    thumbnail?: string;
    /** Solid color placeholder (hex format) */
    color?: string;
  };
  /** Preload image on deck initialization */
  preload?: boolean;
}

/**
 * Responsive image configuration for srcset generation
 */
export interface ResponsiveConfig {
  /** Enable automatic srcset generation from base URL */
  autoGenerate?: boolean;
  /** Manually specify srcset (overrides auto-generation) */
  srcset?: string;
  /** Sizes attribute for responsive images */
  sizes?: string;
  /** Breakpoints in pixels for auto-generation [400, 800, 1200, 1920, 2560] */
  breakpoints?: number[];
  /** Image formats to generate (e.g., ['webp', 'jpg']) */
  formats?: Array<'webp' | 'jpg' | 'png' | 'avif'>;
  /** Quality levels per breakpoint */
  qualities?: Record<number, number>;
}

/**
 * Video playback configuration
 */
export interface VideoConfig {
  /** Auto-play video (muted required for most browsers) */
  autoplay?: boolean;
  /** Loop video playback */
  loop?: boolean;
  /** Mute audio (required for autoplay) */
  muted?: boolean;
  /** Show video controls */
  controls?: boolean;
  /** Playback rate (0.5 = half speed, 2.0 = double speed) */
  playbackRate?: number;
  /** Poster image URL (displayed before video loads) */
  poster?: string;
  /** When to play: 'visible' (when slide visible), 'manual', 'immediate' */
  playOn?: 'visible' | 'manual' | 'immediate';
  /** When to pause: 'hidden' (when slide hidden), 'never' */
  pauseOn?: 'hidden' | 'never';
  /** Fallback image if video fails to load */
  fallbackImage?: string;
}

/**
 * Media slide specification
 *
 * @remarks
 * When using SVG content (mediaType: 'svg'):
 * - Set `svgContent` to the raw SVG markup (NOT escaped - will be rendered as-is)
 * - Set `svgType` to 'inline' for direct SVG embedding or 'data-uri' for data URIs
 * - SVG content is NEVER HTML-escaped to allow proper rendering
 * - For hero/hero-card layouts, SVG can be used as background without mediaUrl
 * - Security: Only use SVG content from trusted sources (no user input)
 *
 * @example
 * ```typescript
 * // Inline SVG in contained layout
 * const slide: MediaSlideSpec = {
 *   type: 'media',
 *   mediaType: 'svg',
 *   svgContent: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>',
 *   svgType: 'inline',
 *   layout: 'contained'
 * };
 *
 * // SVG as hero background
 * const heroSlide: MediaSlideSpec = {
 *   type: 'media',
 *   mediaType: 'svg',
 *   svgContent: '<svg viewBox="0 0 800 600">...</svg>',
 *   svgType: 'inline',
 *   layout: 'hero',
 *   title: 'Hero with SVG Background'
 * };
 * ```
 */
export interface MediaSlideSpec extends BaseSlideSpec {
  type: 'media';
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'embed' | 'svg';
  /**
   * Raw SVG markup for mediaType: 'svg'
   * IMPORTANT: This content is rendered as-is without HTML escaping.
   * Only use SVG from trusted sources to prevent XSS attacks.
   */
  svgContent?: string;
  /**
   * SVG rendering mode:
   * - 'inline': Inject SVG directly as HTML (allows CSS styling, animations)
   * - 'data-uri': Encode as data URI in img/background-image (more isolated)
   */
  svgType?: 'inline' | 'data-uri';
  caption?: string;
  layout?: 'contained' | 'hero' | 'hero-card' | 'split' | 'full-bleed';
  overlay?: OverlayConfig;
  textStyle?: TextStyleConfig;
  print?: PrintConfig;
  loading?: LoadingConfig;
  responsive?: ResponsiveConfig;
  video?: VideoConfig;
}

/**
 * Chart dataset for chart visualizations
 */
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
}

/**
 * Chart data structure (standard format for all chart types)
 */
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

/**
 * Data slide specification
 */
export interface DataSlideSpec extends BaseSlideSpec {
  type: 'data';
  title: string;
  data: Record<string, unknown>[] | string[][] | ChartData;
  dataType: 'table' | 'chart';
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter';
}

/**
 * Quote slide specification
 */
export interface QuoteSlideSpec extends BaseSlideSpec {
  type: 'quote';
  quote: string;
  author: string;
  context?: string;
}

/**
 * Timeline event specification with roadmap features
 */
export interface TimelineEvent {
  date: string;
  title: string;
  description?: string;
  status?: 'planned' | 'in-progress' | 'completed';
  progress?: number;
  milestone?: boolean;
  quarter?: string;
  dependencies?: number[];
}

/**
 * Timeline slide specification
 * Supports both basic timeline and enhanced roadmap features
 */
export interface TimelineSlideSpec extends BaseSlideSpec {
  type: 'timeline';
  title: string;
  events: TimelineEvent[];
  orientation?: 'horizontal' | 'vertical';
  mode?: 'timeline' | 'roadmap';
  showProgress?: boolean;
  groupBy?: 'none' | 'quarter' | 'month' | 'year';
}

/**
 * Comparison slide specification
 */
export interface ComparisonSlideSpec extends BaseSlideSpec {
  type: 'comparison';
  title: string;
  leftTitle: string;
  leftContent: string[];
  rightTitle: string;
  rightContent: string[];
}

/**
 * Process slide specification
 */
export interface ProcessSlideSpec extends BaseSlideSpec {
  type: 'process';
  title: string;
  steps: Array<{
    title: string;
    description?: string;
  }>;
  layout?: 'horizontal' | 'vertical' | 'grid';
}

/**
 * Section header slide specification
 */
export interface SectionHeaderSlideSpec extends BaseSlideSpec {
  type: 'section-header';
  title: string;
  subtitle?: string;
}

/**
 * Blank slide specification
 */
export interface BlankSlideSpec extends BaseSlideSpec {
  type: 'blank';
  content?: string;
}

/**
 * Hero slide specification
 */
export interface HeroSlideSpec extends BaseSlideSpec {
  type: 'hero';
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  callToAction?: {
    text: string;
    url?: string;
  };
}

/**
 * Two-column slide specification
 */
export interface TwoColumnSlideSpec extends BaseSlideSpec {
  type: 'two-column';
  title?: string;
  leftColumn: {
    type: 'text' | 'image' | 'list';
    content: string | string[];
  };
  rightColumn: {
    type: 'text' | 'image' | 'list';
    content: string | string[];
  };
  columnRatio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70';
  layoutDensity?: LayoutDensity;
}

/**
 * Three-column slide specification
 */
export interface ThreeColumnSlideSpec extends BaseSlideSpec {
  type: 'three-column';
  title?: string;
  columns: [
    {
      heading?: string;
      icon?: string;
      content: string | string[];
    },
    {
      heading?: string;
      icon?: string;
      content: string | string[];
    },
    {
      heading?: string;
      icon?: string;
      content: string | string[];
    }
  ];
  layoutDensity?: LayoutDensity;
}

/**
 * Four-column slide specification
 */
export interface FourColumnSlideSpec extends BaseSlideSpec {
  type: 'four-column';
  title?: string;
  columns: [
    {
      heading?: string;
      icon?: string;
      content: string;
    },
    {
      heading?: string;
      icon?: string;
      content: string;
    },
    {
      heading?: string;
      icon?: string;
      content: string;
    },
    {
      heading?: string;
      icon?: string;
      content: string;
    }
  ];
  layoutDensity?: LayoutDensity;
}

/**
 * Chart with metrics slide specification
 */
export interface ChartWithMetricsSlideSpec extends BaseSlideSpec {
  type: 'chart-with-metrics';
  title: string;
  chart: {
    type: 'line' | 'bar' | 'pie' | 'area';
    data: Record<string, unknown>;
  };
  metrics: Array<{
    label: string;
    value: string | number;
    change?: {
      value: number;
      direction: 'up' | 'down';
    };
  }>;
  layout?: 'chart-left' | 'chart-right' | 'chart-top';
}

/**
 * Product overview slide specification
 */
export interface ProductOverviewSlideSpec extends BaseSlideSpec {
  type: 'product-overview';
  title: string;
  productImage?: string;
  description?: string;
  features: string[];
  pricing?: {
    price: string;
    period?: string;
    cta?: string;
  };
  layout?: 'image-left' | 'image-right' | 'image-top';
}

/**
 * Grid item specification
 */
export interface GridItem {
  icon?: string;
  title: string;
  description?: string;
  image?: string;
}

/**
 * Grid slide specification
 */
export interface GridSlideSpec extends BaseSlideSpec {
  type: 'grid';
  title?: string;
  subtitle?: string;
  gridType?: '2x2' | '3x3' | '2x3' | '4x2' | 'auto';
  items: GridItem[];
  gap?: LayoutDensity;
}

/**
 * Feature card item specification
 */
export interface FeatureCardItem {
  icon?: string;
  title: string;
  description: string;
  highlight?: boolean;
}

/**
 * Feature card slide specification
 */
export interface FeatureCardSlideSpec extends BaseSlideSpec {
  type: 'feature-cards';
  title?: string;
  subtitle?: string;
  features: FeatureCardItem[];
  columns?: '2' | '3' | '4' | 'auto';
  gap?: LayoutDensity;
}

/**
 * Team member specification
 */
export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  bio?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

/**
 * Team slide specification
 */
export interface TeamSlideSpec extends BaseSlideSpec {
  type: 'team';
  title?: string;
  members: TeamMember[];
  layout?: 'grid' | 'carousel' | 'highlight';
}

/**
 * Pricing plan specification
 */
export interface PricingPlan {
  name: string;
  price: string | number;
  period?: string;
  features: string[];
  cta?: string;
  recommended?: boolean;
}

/**
 * Pricing slide specification
 */
export interface PricingSlideSpec extends BaseSlideSpec {
  type: 'pricing';
  title?: string;
  plans: PricingPlan[];
  highlight?: number;
}

/**
 * Code slide specification
 */
export interface CodeSlideSpec extends BaseSlideSpec {
  type: 'code';
  title?: string;
  language: string;
  code: string;
  highlights?: number[];
  filename?: string;
  theme?: 'dark' | 'light' | 'auto';
}

/**
 * Union type of all slide specifications
 */
export type SlideSpec =
  | TitleSlideSpec
  | ContentSlideSpec
  | MediaSlideSpec
  | DataSlideSpec
  | QuoteSlideSpec
  | TimelineSlideSpec
  | ComparisonSlideSpec
  | ProcessSlideSpec
  | SectionHeaderSlideSpec
  | BlankSlideSpec
  | HeroSlideSpec
  | TwoColumnSlideSpec
  | ThreeColumnSlideSpec
  | FourColumnSlideSpec
  | ChartWithMetricsSlideSpec
  | ProductOverviewSlideSpec
  | GridSlideSpec
  | FeatureCardSlideSpec
  | TeamSlideSpec
  | PricingSlideSpec
  | CodeSlideSpec;

/**
 * Complete presentation specification
 */
export interface PresentationSpec {
  theme: Theme;
  title: string;
  slides: SlideSpec[];
  options?: GenerationOptions;
  metadata?: PresentationMetadata;
}

/**
 * Generation options
 */
export interface GenerationOptions {
  aspectRatio?: AspectRatio;
  fontSize?: FontSize;
  layoutDensity?: LayoutDensity;
  preset?: DesignPreset;
  minify?: boolean;
  includeSlideyUICSS?: boolean;
  embedFonts?: boolean;
  theme?: Theme;
  mode?: ThemeMode;
}

/**
 * Presentation metadata
 */
export interface PresentationMetadata {
  author?: string;
  date?: string;
  version?: string;
  description?: string;
  tags?: string[];
}

/**
 * Result of presentation generation
 */
export interface GenerationResult {
  html: string;
  metadata: {
    slideCount: number;
    theme: Theme;
    generatedAt: string;
    size: number;
  };
  warnings?: string[];
}

/**
 * Slide template function signature
 */
export type SlideTemplate<T extends BaseSlideSpec = BaseSlideSpec> = (
  spec: T,
  options: GenerationOptions
) => string;

/**
 * Icon names for SVG generation
 */
export type IconName =
  | 'briefcase'
  | 'chart-line'
  | 'chart-bar'
  | 'pie-chart'
  | 'trend-up'
  | 'trend-down'
  | 'mail'
  | 'phone'
  | 'message'
  | 'users'
  | 'calendar'
  | 'check'
  | 'x'
  | 'arrow-right'
  | 'arrow-left'
  | 'plus'
  | 'minus'
  | 'image'
  | 'video'
  | 'download'
  | 'upload'
  | 'alert'
  | 'info'
  | 'success'
  | 'error'
  | 'warning'
  | 'star'
  | 'heart'
  | 'settings'
  | 'search';

/**
 * Pattern types for SVG generation
 */
export type PatternType =
  | 'dots'
  | 'grid'
  | 'diagonal-lines'
  | 'waves'
  | 'gradient-mesh'
  | 'chevron'
  | 'hexagon'
  | 'blobs'
  | 'noise'
  | 'particles'
  | 'rays';

/**
 * SVG generation specification
 */
export interface SVGGenerationSpec {
  type: 'icon' | 'pattern' | 'chart' | 'diagram' | 'custom';

  // Icon generation
  iconName?: IconName;

  // Pattern generation
  patternType?: PatternType;
  patternDensity?: 'low' | 'medium' | 'high';
  patternOpacity?: number;

  // Chart generation
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter';
  chartData?: ChartData;

  // Custom SVG
  customInstructions?: string;

  // Common options
  width?: number;
  height?: number;
  theme?: Theme;
  style?: 'default' | 'hand-drawn' | 'minimal';

  // Color overrides
  color?: string;
  backgroundColor?: string;
}

/**
 * Typography scale level configuration
 */
export interface TypographyScaleLevel {
  min?: string;
  preferred?: string;
  max?: string;
  weight?: number;
  lineHeight?: number;
}

/**
 * Typography scale configuration
 */
export interface TypographyScale {
  hero?: TypographyScaleLevel;
  h1?: TypographyScaleLevel;
  h2?: TypographyScaleLevel;
  h3?: TypographyScaleLevel;
  body?: TypographyScaleLevel;
  caption?: TypographyScaleLevel;
}

/**
 * Custom theme specification
 */
export interface CustomTheme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
    muted?: string;
    mutedForeground?: string;
    border?: string;
  };
  typography?: TypographyScale;
  metadata?: {
    author?: string;
    createdAt?: string;
    description?: string;
    tags?: string[];
  };
}
