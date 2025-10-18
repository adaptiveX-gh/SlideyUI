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
