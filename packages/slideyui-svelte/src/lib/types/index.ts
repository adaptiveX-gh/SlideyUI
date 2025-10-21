/**
 * SlideyUI Svelte Component Types
 */

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
 * Card aspect ratio options
 */
export type CardAspectRatio = '16/9' | '4/3' | '1/1' | '3/2' | 'auto';

/**
 * Card layout mode
 */
export type CardLayoutMode = 'preview' | 'thumbnail' | 'full';

/**
 * Layout density options
 */
export type LayoutDensity = 'compact' | 'normal' | 'spacious';

/**
 * Text density options for content cards
 */
export type TextDensity = 'minimal' | 'concise' | 'detailed' | 'extensive';

/**
 * Card padding size options
 */
export type CardPadding = 'compact' | 'default' | 'spacious' | 'none';

/**
 * Presentation context value
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
 * Presentation component props
 */
export interface PresentationProps {
  /** Theme */
  theme?: SlideTheme;
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
  /** Additional CSS classes */
  className?: string;
}

/**
 * Callout box types
 */
export type CalloutType = 'info' | 'key' | 'warning' | 'success' | 'question';

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
 * Build step state
 */
export interface BuildStepState {
  /** Current build step index */
  currentStep: number;
  /** Total build steps */
  totalSteps: number;
}

/**
 * Media card props (image/video/SVG focused)
 */
export interface MediaCardProps {
  /** Media source (image or video URL) - optional if svgContent is provided */
  src?: string;
  /** Inline SVG content string */
  svgContent?: string;
  /** SVG rendering mode - 'image' renders as data URI, 'interactive' allows DOM access */
  svgType?: 'image' | 'interactive';
  /** Alt text for accessibility */
  alt?: string;
  /** Media type */
  mediaType?: 'image' | 'video' | 'svg';
  /** Title overlay */
  title?: string;
  /** Caption */
  caption?: string;
  /** Whether media should be a background */
  asBackground?: boolean;
  /** Fallback image URL if media fails to load */
  fallbackImage?: string;
  /** Error handler callback */
  onError?: (error: Error) => void;
  /** Padding size variant (typically 'none' for full-bleed media) */
  padding?: CardPadding;
  /** Aspect ratio for the card */
  aspectRatio?: CardAspectRatio;
  /** Layout mode */
  mode?: CardLayoutMode;
  /** Layout density for controlling spacing */
  layoutDensity?: LayoutDensity;
  /** Whether to show card border */
  bordered?: boolean;
  /** Whether to show shadow */
  shadow?: boolean;
  /** Interactive state (for AI apps to style differently) */
  interactive?: boolean;
  /** Custom data attributes (for AI apps) */
  cardId?: string;
  cardState?: 'generating' | 'selected' | 'error' | 'complete';
  /** Additional CSS classes */
  class?: string;
}
