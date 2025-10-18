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
