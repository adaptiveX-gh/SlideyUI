/**
 * SlideyUI React Components
 *
 * ONBOARDING GUIDE FOR NEW DEVELOPERS:
 *
 * SlideyUI uses a **card-based architecture** for modern, AI-first presentation apps.
 * Think Gamma.app - cards that can be edited individually and presented full-screen.
 *
 * CORE CONCEPTS:
 * 1. **Cards** - Layer 0 primitives (CardContainer, ContentCard, MediaCard, etc.)
 * 2. **Presentation** - Modern container for card-based presentations
 * 3. **Legacy Slides** - Deprecated components (Deck, TitleSlide, etc.) - avoid these
 *
 * QUICK START:
 * ```tsx
 * import { Presentation, ContentCard, MediaCard } from '@slideyui/react';
 *
 * <Presentation theme="ocean">
 *   <ContentCard title="Welcome" variant="featured">
 *     <p>Your content here</p>
 *   </ContentCard>
 *   <MediaCard src="/image.jpg" caption="Beautiful view" />
 * </Presentation>
 * ```
 *
 * For more details, see packages/slideyui-react/CARDS.md
 */

// ============================================================================
// MODERN API (Recommended for all new code)
// ============================================================================

// Presentation System (Cards-Based)
export { Presentation, usePresentationContext } from './Presentation';

// Analytics System
export { AnalyticsProvider, useAnalytics } from '../context/AnalyticsContext';
export type { AnalyticsProviderProps } from '../context/AnalyticsContext';

// Card Components (Layer 0 primitives for AI-first apps)
export {
  CardContainer,
  CardGrid,
  CardStack,
  ContentCard,
  MediaCard,
  SplitCard,
  DataCard,
  QuoteCard,
  EmbedCard,
  CardNotes,
  EmbeddedCard,
} from './cards';

// Content Components (Work with both cards and legacy slides)
export { Callout } from './Callout';
export { Quote } from './Quote';
export { Timeline } from './Timeline';
export { CodeBlock } from './CodeBlock';
export { Poll } from './Poll';
export { CollapsibleSection } from './CollapsibleSection';

// Interactive Components
export { BuildStep } from './BuildStep';

// UI Components (Work with Presentation context)
export { SlideProgress } from './SlideProgress';
export { SlideNumber } from './SlideNumber';

// Layout Components
export { Divider } from './layout/Divider';
export {
  Footer,
  FooterSection,
  FooterLink,
  FooterSocial,
  FooterNewsletter,
  FooterLegal,
} from './layout/Footer';
export {
  Header,
  HeaderBrand,
  HeaderNav,
  HeaderLink,
  HeaderActions,
  HeaderButton,
  HeaderSearch,
  HeaderDropdown,
  HeaderDropdownItem,
  HeaderDropdownDivider,
} from './layout/Header';
export {
  Hero,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  HeroActions,
  HeroButton,
  HeroSplit,
  HeroFigure,
} from './layout/Hero';

// ============================================================================
// LEGACY API (Deprecated - maintained for backwards compatibility only)
// These components will be removed in v1.0.0
// See migration guide in packages/slideyui-react/REFACTOR_PLAN.md
// ============================================================================

/** @deprecated Use Presentation component instead */
export { Deck } from './Deck';
/** @deprecated Use ContentCard with variant="featured" instead */
export { TitleSlide } from './TitleSlide';
/** @deprecated Use ContentCard instead */
export { ContentSlide } from './ContentSlide';
/** @deprecated Use SplitCard instead */
export { ComparisonSlide } from './ComparisonSlide';
/** @deprecated Use DataCard instead */
export { DataSlide } from './DataSlide';
/** @deprecated Use CardNotes instead */
export { SpeakerNotes } from './SpeakerNotes';

// Re-export types
export type {
  // Presentation types (NEW)
  PresentationProps,
  PresentationContextValue,
  // Analytics types
  AnalyticsEvent,
  AnalyticsConfig,
  AnalyticsContextValue,
  CardMetrics,
  // Card types
  CardContainerProps,
  CardGridProps,
  CardStackProps,
  ContentCardProps,
  MediaCardProps,
  SplitCardProps,
  DataCardProps,
  QuoteCardProps,
  EmbedCardProps,
  EmbedProvider,
  EmbeddedCardProps,
  CardAspectRatio,
  CardLayoutMode,
  TextDensity,
  // Legacy slide types (DEPRECATED)
  /** @deprecated */
  DeckProps,
  /** @deprecated */
  TitleSlideProps,
  /** @deprecated */
  ContentSlideProps,
  /** @deprecated */
  ComparisonSlideProps,
  /** @deprecated */
  DataSlideProps,
  /** @deprecated */
  SpeakerNotesProps,
  // Content component types (still useful)
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
  DividerProps,
  SlideTheme,
  CalloutType,
  Alignment,
  CollapsibleSectionProps,
} from '../types';
