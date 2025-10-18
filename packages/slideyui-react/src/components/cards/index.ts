/**
 * SlideyUI Card Components
 * Layer 0 primitives for AI-first presentation apps
 *
 * ARCHITECTURE OVERVIEW:
 *
 * Cards are the foundation of SlideyUI's modern architecture. They provide
 * presentation-optimized layouts that work in three modes:
 * - **Preview** (default): For editing UIs and card galleries
 * - **Thumbnail**: Extra small for navigation
 * - **Full**: Presentation-ready full-screen
 *
 * COMPONENT HIERARCHY:
 *
 * 1. **Layout Primitives** (Building blocks)
 *    - CardContainer: Base container with aspect ratio control
 *    - CardGrid: Responsive grid for organizing cards
 *    - CardStack: Layered cards for progressive disclosure
 *
 * 2. **Specialized Variants** (Ready-to-use components)
 *    - ContentCard: Text-heavy cards (most common)
 *    - MediaCard: Image/video focused cards
 *    - SplitCard: Two-column layouts
 *    - DataCard: Metrics and charts
 *    - QuoteCard: Pull quotes and testimonials
 *
 * 3. **Utilities**
 *    - CardNotes: Speaker notes for cards
 *
 * DESIGN PHILOSOPHY:
 * - All cards use presentation-optimized defaults (24px+ fonts, high contrast)
 * - Cards are aspect-ratio aware (16:9, 4:3, etc.)
 * - State tracking via data-attributes (for AI app integration)
 * - Minimal opinions - compose freely with Tailwind utilities
 *
 * EXAMPLE USAGE:
 * ```tsx
 * import { CardGrid, ContentCard, MediaCard } from '@slideyui/react';
 *
 * <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
 *   <ContentCard title="Introduction" aspectRatio="16/9">
 *     <p>Welcome to the presentation</p>
 *   </ContentCard>
 *   <MediaCard src="/hero.jpg" caption="Our product" aspectRatio="16/9" />
 * </CardGrid>
 * ```
 *
 * For complete documentation, see: packages/slideyui-react/CARDS.md
 */

// ============================================================================
// Layout Primitives (Building blocks)
// ============================================================================

export { CardContainer } from './CardContainer';
export { CardGrid } from './CardGrid';
export { CardStack } from './CardStack';

// ============================================================================
// Specialized Card Variants (Ready-to-use)
// ============================================================================

export { ContentCard } from './ContentCard';
export { MediaCard } from './MediaCard';
export { SplitCard } from './SplitCard';
export { DataCard } from './DataCard';
export { QuoteCard } from './QuoteCard';
export { EmbedCard } from './EmbedCard';

// ============================================================================
// Card Utilities
// ============================================================================

export { CardNotes } from './CardNotes';
export { EmbeddedCard } from './EmbeddedCard';
