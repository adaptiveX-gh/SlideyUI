# @slideyui/svelte

**SvelteKit components for SlideyUI - perfect for embedding live demos in documentation.**

This package provides Svelte/SvelteKit versions of SlideyUI's card components, making it easy to create interactive presentation demos in your SvelteKit documentation site.

## Installation

```bash
npm install @slideyui/svelte @slideyui/core
```

## Quick Start

```svelte
<script>
  import { CardGrid, ContentCard, MediaCard, DataCard } from '@slideyui/svelte';
</script>

<!-- Card grid for editing view -->
<CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
  <ContentCard title="Welcome" aspectRatio="16/9">
    <p class="text-2xl">Introduction to SlideyUI</p>
  </ContentCard>

  <MediaCard
    src="/images/demo.jpg"
    caption="Beautiful presentations"
    aspectRatio="16/9"
  />

  <DataCard
    variant="metric"
    title="Revenue"
    value="$1.2M"
    trend="up"
    trendValue="+24%"
    aspectRatio="16/9"
  />
</CardGrid>
```

## Components

### Layout Primitives

- **`<CardContainer>`** - Base card with aspect ratio control
- **`<CardGrid>`** - Responsive grid for organizing cards

### Specialized Cards

- **`<ContentCard>`** - Text-heavy presentations
- **`<MediaCard>`** - Image/video focused
- **`<DataCard>`** - Metrics and charts

## Why Svelte Components?

The `@slideyui/svelte` package is specifically designed for:

1. **Documentation Sites** - Embed live, interactive examples in your SvelteKit docs
2. **Component Previews** - Show real working components instead of static screenshots
3. **Interactive Demos** - Let users explore card configurations in real-time
4. **Server-Side Rendering** - Full SSR support for better performance

## Example: Documentation Demo

```svelte
<script>
  import { CardGrid, ContentCard } from '@slideyui/svelte';

  let selectedTheme = 'corporate';
  let showBorders = true;
  let interactive = true;
</script>

<div>
  <h3>Try it yourself:</h3>

  <!-- Controls -->
  <div class="controls mb-4">
    <label>
      <input type="checkbox" bind:checked={showBorders} />
      Show Borders
    </label>
    <label>
      <input type="checkbox" bind:checked={interactive} />
      Interactive
    </label>
  </div>

  <!-- Live Demo -->
  <CardGrid columns={{ sm: 1, md: 2 }} gap="md">
    <ContentCard
      title="Demo Card"
      aspectRatio="16/9"
      bordered={showBorders}
      {interactive}
    >
      <p>This is a live demo!</p>
    </ContentCard>
  </CardGrid>
</div>
```

## AI-First Features

All components support AI integration features:

```svelte
<ContentCard
  title="Generated Content"
  aspectRatio="16/9"
  cardId="card-123"
  cardState="generating"
>
  {#if isGenerating}
    <div class="animate-pulse">Generating...</div>
  {:else}
    <p>{aiGeneratedContent}</p>
  {/if}
</ContentCard>
```

**State values:**
- `generating` - Pulse animation during AI generation
- `selected` - Ring highlight for selected cards
- `error` - Red border for errors
- `complete` - Green border for completion

## Props Reference

### CardContainer

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `aspectRatio` | `'16/9' \| '4/3' \| '1/1' \| '3/2' \| 'auto'` | `'16/9'` | Card aspect ratio |
| `mode` | `'preview' \| 'thumbnail' \| 'full'` | `'preview'` | Display mode |
| `bordered` | `boolean` | `true` | Show border |
| `shadow` | `boolean` | `true` | Show shadow |
| `interactive` | `boolean` | `false` | Add hover effects |
| `cardId` | `string?` | - | For AI app tracking |
| `cardState` | `'generating' \| 'selected' \| 'error' \| 'complete'?` | - | Visual state |

### CardGrid

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `number \| { sm, md, lg, xl }?` | - | Responsive columns |
| `gap` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Grid gap size |
| `minCardWidth` | `string?` | - | For auto-fit grids |
| `autoFlow` | `'row' \| 'column' \| 'dense'` | `'row'` | Grid auto-flow |

### ContentCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string?` | - | Card title |
| `subtitle` | `string?` | - | Card subtitle |
| `variant` | `'default' \| 'featured' \| 'minimal'` | `'default'` | Card style |
| ...CardContainer props | - | - | Inherits all CardContainer props |

**Slots:**
- `default` - Main content
- `icon` - Icon next to title
- `badge` - Badge in header
- `footer` - Footer content

## Usage in SlideyUI Docs

This package is used in the SlideyUI documentation site to provide live, interactive examples:

```svelte
<!-- docs/src/routes/docs/components/+page.svelte -->
<script>
  import { CardGrid, ContentCard, DataCard } from '@slideyui/svelte';
</script>

<section class="component-demo">
  <h2>ContentCard Demo</h2>
  <p>Here's a live example you can interact with:</p>

  <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
    <ContentCard title="Example Card" aspectRatio="16/9" interactive>
      <p class="text-2xl">Try hovering over me!</p>
    </ContentCard>
  </CardGrid>
</section>
```

## TypeScript Support

Full TypeScript support is included. Import types as needed:

```typescript
import type { CardContainerProps, CardGridProps } from '@slideyui/svelte';
```

## Requirements

- Svelte 4.0+ or Svelte 5.0+
- SvelteKit (for documentation sites)
- Tailwind CSS 3.4+
- `@slideyui/core` (for Tailwind plugin)

## License

MIT

## Related Packages

- **`@slideyui/react`** - React components for building full presentation apps
- **`@slideyui/core`** - Tailwind CSS plugin with themes and styles
