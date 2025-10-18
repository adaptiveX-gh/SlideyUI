/**
 * SlideyUI React Components
 * Export all components for easy importing
 */

// Main deck and slide components
export { Deck } from './Deck';
export { TitleSlide } from './TitleSlide';
export { ContentSlide } from './ContentSlide';
export { ComparisonSlide } from './ComparisonSlide';
export { DataSlide } from './DataSlide';

// Content components
export { Callout } from './Callout';
export { Quote } from './Quote';
export { Timeline } from './Timeline';
export { CodeBlock } from './CodeBlock';
export { Poll } from './Poll';

// Interactive components
export { BuildStep } from './BuildStep';

// UI components
export { SlideProgress } from './SlideProgress';
export { SlideNumber } from './SlideNumber';
export { SpeakerNotes } from './SpeakerNotes';

// Re-export types
export type {
  DeckProps,
  TitleSlideProps,
  ContentSlideProps,
  ComparisonSlideProps,
  DataSlideProps,
  SlideCalloutProps,
  SlideQuoteProps,
  SlideTimelineProps,
  TimelineEvent,
  SlideCodeProps,
  SlidePollProps,
  PollOption,
  BuildStepProps,
  SlideProgressProps,
  SlideNumberProps,
  SpeakerNotesProps,
  SlideTheme,
  CalloutType,
  Alignment,
} from '../types';
