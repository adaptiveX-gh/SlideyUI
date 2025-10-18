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
