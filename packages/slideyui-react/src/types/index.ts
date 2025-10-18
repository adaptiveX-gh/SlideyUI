/**
 * SlideyUI React Component Types
 */

import { ReactNode } from 'react';

/**
 * Available theme options for presentations
 */
export type SlideTheme =
  | 'ocean'
  | 'sunset'
  | 'forest'
  | 'minimal'
  | 'corporate'
  | 'neon'
  | 'monochrome'
  | 'gradient-blue'
  | 'gradient-purple';

/**
 * Callout box types
 */
export type CalloutType = 'info' | 'key' | 'warning' | 'success' | 'question';

/**
 * Layout alignment options
 */
export type Alignment = 'left' | 'center' | 'right';

/**
 * Slide context state
 */
export interface SlideContextValue {
  /** Current slide index (0-based) */
  currentSlide: number;
  /** Total number of slides */
  totalSlides: number;
  /** Current theme */
  theme: SlideTheme;
  /** Navigate to specific slide */
  goToSlide: (index: number) => void;
  /** Navigate to next slide */
  nextSlide: () => void;
  /** Navigate to previous slide */
  previousSlide: () => void;
  /** Whether presenter mode is active */
  presenterMode: boolean;
  /** Toggle presenter mode */
  togglePresenterMode: () => void;
  /** Register a slide */
  registerSlide: () => number;
  /** Unregister a slide */
  unregisterSlide: () => void;
}

/**
 * Build step context for progressive disclosure
 */
export interface BuildStepContextValue {
  /** Current build step index */
  currentStep: number;
  /** Total build steps */
  totalSteps: number;
  /** Whether to show this step */
  isStepVisible: (step: number) => boolean;
  /** Advance to next step */
  nextStep: () => void;
  /** Go to previous step */
  previousStep: () => void;
  /** Reset to first step */
  resetSteps: () => void;
}

/**
 * Base props for all slide components
 */
export interface BaseSlideProps {
  /** Additional CSS classes */
  className?: string;
  /** Child elements */
  children?: ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Background color override */
  backgroundColor?: string;
}

/**
 * Deck component props
 */
export interface DeckProps {
  /** Presentation theme */
  theme?: SlideTheme;
  /** Child slides */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Initial slide index */
  initialSlide?: number;
  /** Enable keyboard navigation */
  enableKeyboard?: boolean;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Progress indicator position */
  progressPosition?: 'top' | 'bottom';
  /** Show slide numbers */
  showSlideNumbers?: boolean;
  /** Slide number position */
  slideNumberPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Callback when slide changes */
  onSlideChange?: (slideIndex: number) => void;
}

/**
 * Title slide props
 */
export interface TitleSlideProps extends BaseSlideProps {
  /** Main title */
  title: string;
  /** Subtitle */
  subtitle?: string;
  /** Author name */
  author?: string;
  /** Date or additional info */
  date?: string;
  /** Logo image URL */
  logo?: string;
  /** Logo alt text */
  logoAlt?: string;
  /** Text alignment */
  align?: Alignment;
}

/**
 * Content slide props
 */
export interface ContentSlideProps extends BaseSlideProps {
  /** Slide title */
  title?: string;
  /** Subtitle */
  subtitle?: string;
  /** Layout variant */
  layout?: 'default' | 'centered' | 'split' | 'grid';
  /** Show divider under title */
  divider?: boolean;
}

/**
 * Comparison slide props
 */
export interface ComparisonSlideProps extends BaseSlideProps {
  /** Slide title */
  title?: string;
  /** Left side label */
  leftLabel?: string;
  /** Right side label */
  rightLabel?: string;
  /** Left side content */
  leftContent: ReactNode;
  /** Right side content */
  rightContent: ReactNode;
  /** Comparison style */
  variant?: 'default' | 'vs' | 'arrows';
}

/**
 * Data slide props
 */
export interface DataSlideProps extends BaseSlideProps {
  /** Slide title */
  title?: string;
  /** Key insights */
  insights?: string[];
  /** Data source attribution */
  source?: string;
}

/**
 * Section slide props
 */
export interface SectionSlideProps extends BaseSlideProps {
  /** Section title */
  title: string;
  /** Section subtitle */
  subtitle?: string;
  /** Section number */
  number?: number | string;
  /** Text alignment */
  align?: Alignment;
}

/**
 * Callout box props
 */
export interface SlideCalloutProps {
  /** Callout type */
  type?: CalloutType;
  /** Callout title */
  title?: string;
  /** Content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Icon (optional, defaults based on type) */
  icon?: ReactNode;
}

/**
 * Quote block props
 */
export interface SlideQuoteProps {
  /** Quote text */
  children: ReactNode;
  /** Author name */
  author?: string;
  /** Author title/source */
  source?: string;
  /** Additional CSS classes */
  className?: string;
  /** Quote style */
  variant?: 'default' | 'large' | 'minimal';
}

/**
 * Timeline event
 */
export interface TimelineEvent {
  /** Event title */
  title: string;
  /** Event description */
  description?: string;
  /** Event date/time */
  date?: string;
  /** Event icon */
  icon?: ReactNode;
}

/**
 * Timeline props
 */
export interface SlideTimelineProps {
  /** Timeline events */
  events: TimelineEvent[];
  /** Additional CSS classes */
  className?: string;
  /** Timeline orientation */
  orientation?: 'vertical' | 'horizontal';
  /** Timeline variant */
  variant?: 'default' | 'minimal' | 'detailed';
}

/**
 * Code block props
 */
export interface SlideCodeProps {
  /** Code content */
  children?: string;
  /** Programming language */
  language?: string;
  /** Show line numbers */
  lineNumbers?: boolean;
  /** Highlighted lines (e.g., "1,3-5") */
  highlightLines?: string;
  /** Additional CSS classes */
  className?: string;
  /** File name */
  fileName?: string;
}

/**
 * Poll option
 */
export interface PollOption {
  /** Option label */
  label: string;
  /** Option value */
  value: string;
  /** Vote percentage (0-100) */
  percentage?: number;
}

/**
 * Poll props
 */
export interface SlidePollProps {
  /** Poll question */
  question: string;
  /** Poll options */
  options: PollOption[];
  /** Show results */
  showResults?: boolean;
  /** Allow multiple selections */
  multiple?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Callback when option selected */
  onVote?: (value: string | string[]) => void;
}

/**
 * Slide list props
 */
export interface SlideListProps {
  /** List items */
  items: ReactNode[];
  /** List variant */
  variant?: 'bullet' | 'numbered' | 'checkbox' | 'icon';
  /** Custom icon for bullet variant */
  icon?: ReactNode;
  /** Enable build animation (items appear one by one) */
  animated?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Build step props
 */
export interface BuildStepProps {
  /** Step number (when to appear) */
  step: number;
  /** Content to show */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Animation type */
  animation?: 'fade' | 'slide' | 'scale' | 'none';
}

/**
 * Progress indicator props
 */
export interface SlideProgressProps {
  /** Position */
  position?: 'top' | 'bottom';
  /** Additional CSS classes */
  className?: string;
  /** Show percentage */
  showPercentage?: boolean;
}

/**
 * Speaker notes props
 */
export interface SpeakerNotesProps {
  /** Notes content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Slide number props
 */
export interface SlideNumberProps {
  /** Position */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Additional CSS classes */
  className?: string;
  /** Show format (e.g., "1/10" or just "1") */
  format?: 'fraction' | 'current';
}

/**
 * Card aspect ratio options
 */
export type CardAspectRatio = '16/9' | '4/3' | '1/1' | '3/2' | 'auto';

/**
 * Card layout mode
 */
export type CardLayoutMode = 'preview' | 'thumbnail' | 'full';

/**
 * Base card container props
 */
export interface CardContainerProps {
  /** Aspect ratio for the card */
  aspectRatio?: CardAspectRatio;
  /** Layout mode */
  mode?: CardLayoutMode;
  /** Additional CSS classes */
  className?: string;
  /** Child elements */
  children?: ReactNode;
  /** Card background color */
  backgroundColor?: string;
  /** Card background image */
  backgroundImage?: string;
  /** Whether to show card border */
  bordered?: boolean;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Interactive state (for AI apps to style differently) */
  interactive?: boolean;
  /** Custom data attributes (for AI apps) */
  'data-card-id'?: string;
  'data-card-state'?: string;
  /** Enable container-based auto-scaling (Gamma.ai-style) */
  autoScale?: boolean;
  /** Enable fluid viewport-based scaling */
  fluidScale?: boolean;
}

/**
 * Card grid layout props
 */
export interface CardGridProps {
  /** Number of columns (responsive object or single number) */
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** Additional CSS classes */
  className?: string;
  /** Child card elements */
  children?: ReactNode;
  /** Auto-flow behavior */
  autoFlow?: 'row' | 'column' | 'dense';
  /** Minimum card width (for auto-fit grids) */
  minCardWidth?: string;
}

/**
 * Card stack props (for layered/overlapping cards)
 */
export interface CardStackProps {
  /** Stack direction */
  direction?: 'horizontal' | 'vertical';
  /** Offset between stacked cards */
  offset?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
  /** Child card elements */
  children?: ReactNode;
  /** Whether cards should fan out on hover */
  expandOnHover?: boolean;
}

/**
 * Text density options for content cards
 */
export type TextDensity = 'minimal' | 'concise' | 'detailed' | 'extensive';

/**
 * Card padding size options
 */
export type CardPadding = 'compact' | 'default' | 'spacious' | 'none';

/**
 * Content card props (text-heavy presentations)
 */
export interface ContentCardProps extends Omit<CardContainerProps, 'children'> {
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Card body content */
  children?: ReactNode;
  /** Badge/tag content */
  badge?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Header icon */
  icon?: ReactNode;
  /** Layout variant */
  variant?: 'default' | 'minimal' | 'featured';
  /** Text density for content (affects font size, line height, and spacing) */
  density?: TextDensity;
  /** Padding size variant */
  padding?: CardPadding;
}

/**
 * Media card props (image/video focused)
 */
export interface MediaCardProps extends Omit<CardContainerProps, 'children'> {
  /** Media source (image or video URL) */
  src: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Media type */
  mediaType?: 'image' | 'video';
  /** Title overlay */
  title?: string;
  /** Caption */
  caption?: ReactNode;
  /** Object fit for media */
  objectFit?: 'cover' | 'contain' | 'fill';
  /** Overlay content */
  overlay?: ReactNode;
  /** Whether media should be a background */
  asBackground?: boolean;
  /** Child content (if asBackground is true) */
  children?: ReactNode;
  /** Padding size variant (typically 'none' for full-bleed media) */
  padding?: CardPadding;
}

/**
 * Split card props (two-column layouts)
 */
export interface SplitCardProps extends Omit<CardContainerProps, 'children'> {
  /** Left side content */
  left: ReactNode;
  /** Right side content */
  right: ReactNode;
  /** Split ratio (percentage for left side) */
  split?: 50 | 60 | 40 | 70 | 30;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Visual divider between sections */
  divider?: boolean;
  /** Reverse the order */
  reverse?: boolean;
  /** Padding size variant */
  padding?: CardPadding;
}

/**
 * Data card props (metrics/charts/tables)
 */
export interface DataCardProps extends Omit<CardContainerProps, 'children'> {
  /** Card title */
  title?: string;
  /** Metric value */
  value?: string | number;
  /** Value label */
  label?: string;
  /** Trend indicator */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value */
  trendValue?: string;
  /** Chart or visualization content */
  children?: ReactNode;
  /** Footer info */
  footer?: ReactNode;
  /** Icon or avatar */
  icon?: ReactNode;
  /** Variant style */
  variant?: 'metric' | 'chart' | 'table';
  /** Padding size variant (metrics often use 'spacious') */
  padding?: CardPadding;
}

/**
 * Quote card props (pull quotes, testimonials)
 */
export interface QuoteCardProps extends Omit<CardContainerProps, 'children'> {
  /** Quote text */
  quote: ReactNode;
  /** Quote author */
  author?: string;
  /** Author title/source */
  source?: string;
  /** Author avatar */
  avatar?: string;
  /** Quote variant */
  variant?: 'default' | 'large' | 'minimal' | 'testimonial';
  /** Padding size variant */
  padding?: CardPadding;
}

/**
 * Embedded card props (hierarchical card nesting)
 */
export interface EmbeddedCardProps {
  /** Nested card content (typically other CardContainer-based components) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Presentation wrapper props (replaces Deck)
 */
export interface PresentationProps {
  /** Card children to present */
  children: ReactNode;
  /** Theme */
  theme?: SlideTheme;
  /** Additional CSS classes */
  className?: string;
  /** Initial card index */
  initialCard?: number;
  /** Enable keyboard navigation */
  enableKeyboard?: boolean;
  /** Show progress indicator */
  showProgress?: boolean;
  /** Progress indicator position */
  progressPosition?: 'top' | 'bottom';
  /** Show card numbers */
  showCardNumbers?: boolean;
  /** Card number position */
  cardNumberPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  /** Callback when card changes */
  onCardChange?: (cardIndex: number) => void;
  /** Enable presenter mode (speaker notes, controls) */
  presenterMode?: boolean;
}

/**
 * Presentation context (replaces SlideContext)
 */
export interface PresentationContextValue {
  /** Current card index (0-based) */
  currentCard: number;
  /** Total number of cards */
  totalCards: number;
  /** Current theme */
  theme: SlideTheme;
  /** Navigate to specific card */
  goToCard: (index: number) => void;
  /** Navigate to next card */
  nextCard: () => void;
  /** Navigate to previous card */
  previousCard: () => void;
  /** Whether presenter mode is active */
  presenterMode: boolean;
  /** Toggle presenter mode */
  togglePresenterMode: () => void;
  /** Whether in presentation mode (full-screen) */
  isPresentationMode: boolean;
}

/**
 * Collapsible section props (expandable content areas)
 */
export interface CollapsibleSectionProps {
  /** Section title */
  title: string;
  /** Whether section is open by default */
  defaultOpen?: boolean;
  /** HTML id for deep linking */
  id?: string;
  /** Callback when section is toggled */
  onToggle?: (open: boolean) => void;
  /** Content to show/hide */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Analytics event types for tracking card interactions
 */
export interface AnalyticsEvent {
  /** Type of analytics event */
  type: 'view' | 'interaction' | 'dwell';
  /** Unique identifier for the card */
  cardId: string;
  /** Timestamp when event occurred */
  timestamp: number;
  /** Optional metadata about the event */
  metadata?: Record<string, any>;
}

/**
 * Configuration for analytics tracking
 */
export interface AnalyticsConfig {
  /** Whether analytics tracking is enabled (default: true) */
  enabled?: boolean;
  /** Minimum time in ms before a view is counted (default: 1000) */
  dwellThreshold?: number;
  /** Callback function to handle analytics events */
  onEvent?: (event: AnalyticsEvent) => void;
}

/**
 * Embed provider types
 */
export type EmbedProvider = 'youtube' | 'vimeo' | 'tiktok' | 'custom';

/**
 * Embed card props (rich media embedding)
 */
export interface EmbedCardProps extends Omit<CardContainerProps, 'children'> {
  /** Embed provider type */
  provider: EmbedProvider;
  /** Embed iframe source URL */
  embedUrl: string;
  /** Title for accessibility and optional display */
  title?: string;
  /** Caption below embed */
  caption?: ReactNode;
  /** Allow fullscreen */
  allowFullscreen?: boolean;
  /** Autoplay media */
  autoplay?: boolean;
  /** Fallback content if embed fails */
  children?: ReactNode;
  /** Padding size variant (often 'none' for full-bleed embeds) */
  padding?: CardPadding;
}

/**
 * Card metrics tracked by analytics
 */
export interface CardMetrics {
  /** Number of times the card has been viewed */
  views: number;
  /** Number of interactions (clicks, hovers, etc.) */
  interactions: number;
  /** Total time spent viewing the card in milliseconds */
  totalDwellTime: number;
}

/**
 * Analytics context value provided by AnalyticsProvider
 */
export interface AnalyticsContextValue {
  /** Current analytics configuration */
  config: AnalyticsConfig;
  /** Track when a card becomes visible */
  trackView: (cardId: string, metadata?: Record<string, any>) => void;
  /** Track user interaction with a card */
  trackInteraction: (cardId: string, interactionType: string, metadata?: Record<string, any>) => void;
  /** Track time spent viewing a card */
  trackDwell: (cardId: string, duration: number, metadata?: Record<string, any>) => void;
  /** Get analytics metrics for a specific card */
  getCardMetrics: (cardId: string) => CardMetrics;
}
