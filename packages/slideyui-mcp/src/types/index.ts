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
  | 'product-overview';

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
 * Media slide specification
 */
export interface MediaSlideSpec extends BaseSlideSpec {
  type: 'media';
  title?: string;
  mediaUrl: string;
  mediaType: 'image' | 'video' | 'embed';
  caption?: string;
  layout?: 'full-bleed' | 'contained' | 'split';
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
 * Timeline slide specification
 */
export interface TimelineSlideSpec extends BaseSlideSpec {
  type: 'timeline';
  title: string;
  events: Array<{
    date: string;
    title: string;
    description?: string;
  }>;
  orientation?: 'horizontal' | 'vertical';
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
  | ProductOverviewSlideSpec;

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
  minify?: boolean;
  includeSlideyUICSS?: boolean;
  embedFonts?: boolean;
  theme?: Theme;
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
