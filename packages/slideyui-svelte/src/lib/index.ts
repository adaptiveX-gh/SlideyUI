/**
 * @slideyui/svelte
 * SvelteKit components for SlideyUI - AI-First presentation library
 *
 * ONBOARDING GUIDE FOR NEW DEVELOPERS:
 *
 * SlideyUI uses a **card-based architecture** for modern, AI-first presentation apps.
 * These Svelte components are perfect for embedding live demos in SvelteKit documentation.
 *
 * CORE CONCEPTS:
 * 1. **Cards** - Layer 0 primitives (CardContainer, ContentCard, MediaCard, DataCard)
 * 2. **CardGrid** - Layout system for organizing cards
 * 3. **AI-Ready** - Built-in support for state tracking and streaming content
 *
 * QUICK START:
 * ```svelte
 * <script>
 *   import { CardGrid, ContentCard, MediaCard } from '@slideyui/svelte';
 * </script>
 *
 * <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
 *   <ContentCard title="Welcome" aspectRatio="16/9">
 *     <p>Your content here</p>
 *   </ContentCard>
 *   <MediaCard src="/image.jpg" caption="Beautiful view" aspectRatio="16/9" />
 * </CardGrid>
 * ```
 */

// ============================================================================
// Layout Primitives
// ============================================================================

export { default as CardContainer } from './components/CardContainer.svelte';
export { default as CardGrid } from './components/CardGrid.svelte';

// ============================================================================
// Theme System
// ============================================================================

export { default as ThemeModeSwitcher } from './components/ThemeModeSwitcher.svelte';

// ============================================================================
// Specialized Card Components
// ============================================================================

export { default as ContentCard } from './components/ContentCard.svelte';
export { default as MediaCard } from './components/MediaCard.svelte';
export { default as DataCard } from './components/DataCard.svelte';
export { default as SplitCard } from './components/SplitCard.svelte';
export { default as QuoteCard } from './components/QuoteCard.svelte';
export { default as CardStack } from './components/CardStack.svelte';
export { default as CardNotes } from './components/CardNotes.svelte';

// ============================================================================
// Phase 1 Components (Gamma Parity)
// ============================================================================

export { default as CollapsibleSection } from './components/CollapsibleSection.svelte';
export { default as EmbeddedCard } from './components/EmbeddedCard.svelte';

// ============================================================================
// Phase 2 Components (Rich Media)
// ============================================================================

export { default as EmbedCard } from './components/EmbedCard.svelte';

// ============================================================================
// Content Components (MEDIUM Priority - Ported)
// ============================================================================

export { default as Callout } from './components/Callout.svelte';
export { default as Quote } from './components/Quote.svelte';
export { default as Timeline } from './components/Timeline.svelte';
export { default as CodeBlock } from './components/CodeBlock.svelte';
export { default as Poll } from './components/Poll.svelte';

// ============================================================================
// Interactive Components
// ============================================================================

export { default as BuildStep } from './components/BuildStep.svelte';

// ============================================================================
// UI Components (Slide Navigation)
// ============================================================================

export { default as SlideProgress } from './components/SlideProgress.svelte';
export { default as SlideNumber } from './components/SlideNumber.svelte';

// ============================================================================
// Layout Components
// ============================================================================

export { default as Divider } from './components/Divider.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as FooterSection } from './components/FooterSection.svelte';
export { default as FooterLink } from './components/FooterLink.svelte';
export { default as FooterSocial } from './components/FooterSocial.svelte';
export { default as FooterNewsletter } from './components/FooterNewsletter.svelte';
export { default as FooterLegal } from './components/FooterLegal.svelte';
export { default as Header } from './components/Header.svelte';
export { default as HeaderBrand } from './components/HeaderBrand.svelte';
export { default as HeaderNav } from './components/HeaderNav.svelte';
export { default as HeaderLink } from './components/HeaderLink.svelte';
export { default as HeaderActions } from './components/HeaderActions.svelte';
export { default as HeaderButton } from './components/HeaderButton.svelte';
export { default as HeaderSearch } from './components/HeaderSearch.svelte';
export { default as HeaderDropdown } from './components/HeaderDropdown.svelte';
export { default as HeaderDropdownItem } from './components/HeaderDropdownItem.svelte';
export { default as HeaderDropdownDivider } from './components/HeaderDropdownDivider.svelte';
export { default as Hero } from './components/Hero.svelte';
export { default as HeroContent } from './components/HeroContent.svelte';
export { default as HeroTitle } from './components/HeroTitle.svelte';
export { default as HeroSubtitle } from './components/HeroSubtitle.svelte';
export { default as HeroActions } from './components/HeroActions.svelte';
export { default as HeroButton } from './components/HeroButton.svelte';
export { default as HeroSplit } from './components/HeroSplit.svelte';
export { default as HeroFigure } from './components/HeroFigure.svelte';
export { default as List } from './components/List.svelte';
export { default as ListItem } from './components/ListItem.svelte';

// ============================================================================
// Basic Layouts (Card Templates)
// ============================================================================

export { default as BlankLayout } from './components/layouts/BlankLayout.svelte';
export { default as TwoColumnLayout } from './components/layouts/TwoColumnLayout.svelte';
export { default as ThreeColumnLayout } from './components/layouts/ThreeColumnLayout.svelte';
export { default as FourColumnLayout } from './components/layouts/FourColumnLayout.svelte';
export { default as TwoColumnWithHeadingsLayout } from './components/layouts/TwoColumnWithHeadingsLayout.svelte';
export { default as ThreeColumnWithHeadingsLayout } from './components/layouts/ThreeColumnWithHeadingsLayout.svelte';
export { default as ImageAndTextLayout } from './components/layouts/ImageAndTextLayout.svelte';
export { default as TextAndImageLayout } from './components/layouts/TextAndImageLayout.svelte';
export { default as TitleWithBulletsLayout } from './components/layouts/TitleWithBulletsLayout.svelte';
export { default as TitleWithBulletsAndImageLayout } from './components/layouts/TitleWithBulletsAndImageLayout.svelte';

// ============================================================================
// Presentation System
// ============================================================================

export { default as Presentation } from './components/Presentation.svelte';
export { default as PresentationProgress } from './components/PresentationProgress.svelte';
export { default as PresentationNumber } from './components/PresentationNumber.svelte';
export { default as PresentationControls } from './components/PresentationControls.svelte';

// Presentation Store
export {
  createPresentationStore,
  setPresentationContext,
  getPresentationContext,
  presentationKeyboard,
  type PresentationState,
  type PresentationStore,
} from './stores/presentation';

// BuildStep Store
export {
  createBuildStepStore,
  setBuildStepContext,
  getBuildStepContext,
  type BuildStepState,
  type BuildStepStore,
} from './stores/buildStep';

// ============================================================================
// Analytics (Stores & Actions)
// ============================================================================

export {
	createAnalyticsStore,
	setAnalyticsContext,
	getAnalyticsContext
} from './stores/analytics';

export type { AnalyticsEvent, AnalyticsConfig, CardMetrics } from './stores/analytics';

export { cardView, cardDwell, cardInteraction } from './actions/analytics';
export type { CardViewOptions } from './actions/analytics';

// ============================================================================
// TypeScript Types
// ============================================================================

export type {
  SlideTheme,
  CardAspectRatio,
  CardLayoutMode,
  TextDensity,
  PresentationContextValue,
  PresentationProps,
  CalloutType,
  TimelineEvent,
  PollOption,
} from './types';
