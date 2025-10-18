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
  BuildStepState,
} from './types';
