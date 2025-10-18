# @slideyui/svelte Development Guide

## Overview

This package provides SvelteKit versions of SlideyUI's card components, specifically designed for creating live, interactive demos in the documentation site.

## Why a Separate Svelte Package?

1. **Documentation Needs**: The docs site is built with SvelteKit and needs Svelte components
2. **Live Demos**: Show real, working components instead of static screenshots
3. **Interactive Examples**: Let users adjust settings and see changes in real-time
4. **Separation of Concerns**: Keep React and Svelte implementations separate
5. **Bundle Size**: Users only import what they need (React or Svelte)

## Architecture

```
@slideyui/svelte
├── src/lib/
│   ├── components/
│   │   ├── CardContainer.svelte   # Base container (Layer 0)
│   │   ├── CardGrid.svelte        # Grid layout
│   │   ├── ContentCard.svelte     # Text-heavy cards
│   │   ├── MediaCard.svelte       # Image/video cards
│   │   └── DataCard.svelte        # Metrics/charts
│   └── index.ts                   # Exports
├── package.json
├── README.md
└── svelte.config.js
```

## Component Parity with React

The Svelte components mirror the React API where possible:

### React Version
```tsx
<ContentCard
  title="Example"
  aspectRatio="16/9"
  bordered={true}
  interactive={true}
>
  <p>Content</p>
</ContentCard>
```

### Svelte Version
```svelte
<ContentCard
  title="Example"
  aspectRatio="16/9"
  bordered={true}
  interactive={true}
>
  <p>Content</p>
</ContentCard>
```

## Key Differences

1. **Slots vs Children**: Svelte uses named slots instead of React children props
2. **Reactivity**: Svelte uses `$:` for reactive statements instead of React hooks
3. **Props**: Svelte uses `export let` instead of TypeScript interfaces
4. **Styling**: Both use the same Tailwind classes from `@slideyui/core`

## Development Workflow

### Setup

```bash
cd packages/slideyui-svelte
npm install
```

### Building

```bash
npm run build      # Build and package
npm run check      # Type checking
```

### Using in Docs

The docs site can import components directly during development:

```svelte
<script>
  import { ContentCard, CardGrid } from '@slideyui/svelte';
</script>
```

## Adding New Components

1. Create component in `src/lib/components/`
2. Follow naming convention: `ComponentName.svelte`
3. Export from `src/lib/index.ts`
4. Add TypeScript props with `export let`
5. Document with JSDoc comments
6. Test in docs site

Example:

```svelte
<script lang="ts">
  /**
   * NewCard Component
   * Description of what it does
   */

  export let title: string;
  export let variant: 'default' | 'special' = 'default';
  let className: string = '';
  export { className as class };
</script>

<div class="new-card {className}">
  <h3>{title}</h3>
  <slot />
</div>
```

## Best Practices

1. **Keep API Consistent**: Match React component APIs where possible
2. **Use Tailwind Classes**: Leverage the same CSS from `@slideyui/core`
3. **Support All Props**: Include all card customization options
4. **TypeScript**: Use TypeScript for type safety
5. **Slots**: Provide named slots for flexibility
6. **Defaults**: Match React component defaults

## Testing

Test components by using them in the docs site:

1. Import component in a doc page
2. Create interactive demo with controls
3. Verify all props work correctly
4. Test responsive behavior
5. Check accessibility

## Publishing

The package is published alongside React components:

```bash
npm run build
npm publish
```

## Future Enhancements

- [ ] Add Presentation component for full-screen mode
- [ ] Add SplitCard component
- [ ] Add QuoteCard component
- [ ] Add CardStack component
- [ ] Add transition animations
- [ ] Add more interactive demos
- [ ] Create Svelte-specific features (transitions, stores, etc.)

## Notes

- This package is primarily for documentation, not for building full presentation apps
- For full presentation apps, use `@slideyui/react`
- Keep components simple and focused on demo/showcase use cases
- Prioritize ease of use in documentation context
