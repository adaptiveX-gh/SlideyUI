# Using @slideyui/svelte in Documentation

This guide shows how to use the `@slideyui/svelte` package to create live, interactive demos in the SlideyUI documentation site.

## Installation

The package is already installed as a workspace dependency. To use it in your docs:

```svelte
<script>
  import { CardGrid, ContentCard, DataCard, MediaCard } from '@slideyui/svelte';
</script>
```

## Example: Interactive Card Demo

Here's how to create an interactive demo that users can customize:

```svelte
<!-- docs/src/routes/docs/cards/+page.svelte -->
<script>
  import LiveCardDemo from '$lib/components/LiveCardDemo.svelte';
  import ComponentPreview from '$lib/components/ComponentPreview.svelte';
</script>

<h1>Card Components</h1>

<ComponentPreview
  title="Interactive Card Demo"
  description="Try adjusting the settings to see how cards respond"
>
  <LiveCardDemo />
</ComponentPreview>
```

## Example: Simple Static Demo

For simpler examples without controls:

```svelte
<script>
  import { CardGrid, ContentCard } from '@slideyui/svelte';
  import ComponentPreview from '$lib/components/ComponentPreview.svelte';
</script>

<ComponentPreview title="ContentCard Example">
  <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
    <ContentCard title="Example" aspectRatio="16/9">
      <p class="text-2xl">This is a live example!</p>
    </ContentCard>

    <ContentCard title="Another Card" aspectRatio="16/9" variant="featured">
      <ul class="slide-list">
        <li>Feature 1</li>
        <li>Feature 2</li>
      </ul>
    </ContentCard>
  </CardGrid>
</ComponentPreview>
```

## Example: AI Generation State Demo

Show how cards handle AI generation states:

```svelte
<script>
  import { ContentCard } from '@slideyui/svelte';
  import { onMount } from 'svelte';

  let cardState = 'generating';
  let content = '';

  onMount(async () => {
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    content = 'Generated content appears here!';
    cardState = 'complete';
  });
</script>

<ContentCard
  title="AI Generated Card"
  aspectRatio="16/9"
  cardId="demo-card"
  cardState={cardState}
>
  {#if cardState === 'generating'}
    <div class="animate-pulse text-lg">Generating content...</div>
  {:else}
    <p class="text-2xl">{content}</p>
  {/if}
</ContentCard>
```

## Benefits

1. **Live Examples**: Users see real, working components instead of screenshots
2. **Interactive**: Users can adjust settings and see changes immediately
3. **Code Preview**: Show the actual code being used
4. **SSR Support**: Components render on the server for better performance
5. **Consistency**: Uses the same Tailwind plugin as @slideyui/react

## Available Components

All components from the React package have been ported:

- `CardContainer` - Base container
- `CardGrid` - Responsive grid layout
- `ContentCard` - Text-heavy cards
- `MediaCard` - Image/video cards
- `DataCard` - Metrics and charts

See the full API reference in `packages/slideyui-svelte/README.md`.
