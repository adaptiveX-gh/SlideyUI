# @slideyui/react

**AI-First React components for building presentations with LLMs and MCP servers.**

Unlike traditional UI libraries designed for web applications, `@slideyui/react` reimagines every component for the unique constraints and opportunities of building presentations through AI code generation tools and Model Context Protocol servers.

## Why AI-First?

- **🤖 LLM-Optimized**: Semantic component names (`ContentCard`, `MediaCard`, `DataCard`) that AI agents understand
- **🔌 MCP-Ready**: Built-in support for Model Context Protocol integration with Claude Desktop, Cline, etc.
- **📡 Streaming Support**: Real-time card updates as AI generates content
- **🎯 State Tracking**: Visual feedback via `data-card-state` attributes (generating, complete, error)
- **🧠 Token Efficient**: Sensible defaults reduce prompt complexity

## Installation

```bash
npm install @slideyui/react @slideyui/core
```

## Quick Start: Cards-Only System

SlideyUI uses **one component system** - cards work in both editing (Gamma-style grids) and presentation (full-screen) modes.

**Same cards, different views!** This makes it perfect for AI tools that generate presentations incrementally.

### Editing Mode - Organize Cards

```tsx
import { CardGrid, ContentCard, DataCard } from '@slideyui/react';

function Editor() {
  return (
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      <ContentCard title="Welcome" aspectRatio="16/9">
        <p className="text-2xl">Introduction</p>
      </ContentCard>

      <DataCard
        variant="metric"
        title="Revenue"
        value="$1.2M"
        trend="up"
        trendValue="+24%"
      />
    </CardGrid>
  );
}
```

### Presentation Mode - Full-Screen

```tsx
import { Presentation, ContentCard, DataCard } from '@slideyui/react';

function Present() {
  return (
    <Presentation theme="corporate" showProgress presenterMode>
      <ContentCard title="Welcome">
        <p className="text-2xl">Introduction</p>
      </ContentCard>

      <DataCard
        variant="metric"
        title="Revenue"
        value="$1.2M"
        trend="up"
        trendValue="+24%"
      />
    </Presentation>
  );
}
```

## AI Code Generation Example

Perfect for MCP servers and AI agents:

```tsx
import { Presentation, ContentCard, DataCard } from '@slideyui/react';

// AI can easily reason about card types and generate appropriate content
function AIGeneratedPresentation({ data }) {
  return (
    <Presentation theme="startup" showProgress>
      {data.cards.map((card) => {
        // AI determines card type based on content
        if (card.type === 'metric') {
          return (
            <DataCard
              key={card.id}
              variant="metric"
              title={card.title}
              value={card.value}
              trend={card.trend}
              data-card-state={card.isGenerating ? 'generating' : 'complete'}
            />
          );
        }

        return (
          <ContentCard
            key={card.id}
            title={card.title}
            aspectRatio="16/9"
            data-card-state={card.isGenerating ? 'generating' : 'complete'}
          >
            {card.content}
          </ContentCard>
        );
      })}
    </Presentation>
  );
}
```

## Components

### Presentation System

- **`Presentation`** - Full-screen card presentation with navigation (replaces `Deck`)
  - Keyboard controls (arrows, space, P for presenter mode)
  - Progress indicator
  - Card numbers
  - Presenter mode with speaker notes

### Card Components

**Layout Primitives:**
- `CardContainer` - Base card with aspect ratio control
- `CardGrid` - Responsive grid for organizing cards
- `CardStack` - Layered card layouts

**Specialized Cards:**
- `ContentCard` - Text-heavy presentations
- `MediaCard` - Image/video focused
- `SplitCard` - Two-column layouts
- `DataCard` - Metrics and charts
- `QuoteCard` - Pull quotes and testimonials

**Card Utilities:**
- `CardNotes` - Speaker notes for cards

### Content Components (Usable Within Cards)

- `Callout` - Callout boxes
- `Quote` - Quote blocks
- `Timeline` - Timeline component
- `CodeBlock` - Code blocks
- `Poll` - Interactive polls
- `BuildStep` - Progressive disclosure

### Legacy Components (Deprecated)

⚠️ **These will be removed in v1.0.0. Use cards instead.**

- ~~`Deck`~~ → Use `Presentation`
- ~~`TitleSlide`~~ → Use `ContentCard` with `variant="featured"`
- ~~`ContentSlide`~~ → Use `ContentCard`
- ~~`ComparisonSlide`~~ → Use `SplitCard`
- ~~`DataSlide`~~ → Use `DataCard`
- ~~`SpeakerNotes`~~ → Use `CardNotes`

## Key Features

### AI & MCP Integration
✅ **LLM-Optimized Components** - Semantic naming that AI agents understand
✅ **MCP Server Ready** - Built for Model Context Protocol integration
✅ **Streaming Support** - Real-time updates during AI generation
✅ **State Management** - Visual feedback via `data-card-state` attributes
✅ **Token Efficient** - Sensible defaults reduce prompt complexity

### Presentation Excellence
✅ **Cards-Only Architecture** - One component system for editing and presenting
✅ **Keyboard Navigation** - Full presentation controls (arrows, space, P for presenter mode)
✅ **Presenter Mode** - Speaker notes, controls overlay, metadata
✅ **Responsive Grids** - Auto-fit or explicit columns for editing view
✅ **Presentation-Optimized** - 24px minimum fonts, high contrast, 16:9 aspect ratios
✅ **TypeScript** - Full type definitions included

## Documentation

- **[PRESENTATION.md](./PRESENTATION.md)** - Complete guide to presentation mode
- **[CARDS.md](./CARDS.md)** - Card component API reference
- **[Main Docs](https://slideyui.com/docs)** - Full documentation site

## Hooks

- `usePresentationContext` - Access presentation state (current card, navigation)
- ~~`useSlideNavigation`~~ - Deprecated, use `usePresentationContext`
- ~~`useSlideContext`~~ - Deprecated, use `usePresentationContext`
- `useBuildSteps` - Manage build steps (progressive disclosure)

## Migration Guide

### From v0.x (Slides) to v1.0 (Cards)

**Before:**
```tsx
<Deck theme="corporate">
  <TitleSlide title="Welcome" />
  <ContentSlide title="Features">
    <ul><li>Item</li></ul>
  </ContentSlide>
</Deck>
```

**After:**
```tsx
<Presentation theme="corporate">
  <ContentCard title="Welcome" variant="featured">
    <h1 className="text-5xl">Welcome</h1>
  </ContentCard>
  <ContentCard title="Features">
    <ul className="slide-list"><li>Item</li></ul>
  </ContentCard>
</Presentation>
```

See [PRESENTATION.md](./PRESENTATION.md) for complete migration guide.

## License

MIT
