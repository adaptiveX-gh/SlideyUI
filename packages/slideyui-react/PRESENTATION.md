# SlideyUI - Cards-Only Presentation System

SlideyUI has evolved to a **cards-only architecture**. The same card components work beautifully in both editing mode (Gamma-style grids) and presentation mode (full-screen).

## Philosophy: One Component System

**Before (Deprecated):**
```tsx
// Editing: Build with one set of components
<div className="grid">
  <Card>Content</Card>
</div>

// Presenting: Convert to different components
<Deck>
  <ContentSlide>Content</ContentSlide>
</Deck>
```

**Now (Cards-Only):**
```tsx
// Editing: Gamma-style card grid
<CardGrid columns={{ md: 2, lg: 3 }}>
  <ContentCard>Content</ContentCard>
</CardGrid>

// Presenting: Same cards, full-screen wrapper
<Presentation>
  <ContentCard>Content</ContentCard>
</Presentation>
```

## Two Modes, One Component

### Editing Mode - Card Grid

Build and organize your presentation in a Gamma-style interface:

```tsx
import { CardGrid, ContentCard, DataCard, MediaCard } from '@slideyui/react';

function Editor({ slides }) {
  return (
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      <ContentCard
        title="Welcome"
        aspectRatio="16/9"
        interactive
        data-card-id="slide-1"
        data-card-state="complete"
      >
        <p className="text-2xl">Introduction content</p>
      </ContentCard>

      <DataCard
        variant="metric"
        title="Revenue"
        value="$1.2M"
        trend="up"
        trendValue="+24%"
      />

      <MediaCard
        src="/images/hero.jpg"
        alt="Product photo"
        caption="Our flagship product"
      />
    </CardGrid>
  );
}
```

### Presentation Mode - Full-Screen

Present the same cards full-screen with navigation:

```tsx
import { Presentation, ContentCard, DataCard, MediaCard } from '@slideyui/react';

function PresentationView() {
  return (
    <Presentation
      theme="corporate"
      showProgress
      showCardNumbers
      presenterMode
      enableKeyboard
    >
      <ContentCard title="Welcome">
        <p className="text-2xl">Introduction content</p>
        <CardNotes>Remember to mention the new features!</CardNotes>
      </ContentCard>

      <DataCard
        variant="metric"
        title="Revenue"
        value="$1.2M"
        trend="up"
        trendValue="+24%"
      />

      <MediaCard
        src="/images/hero.jpg"
        alt="Product photo"
        caption="Our flagship product"
      />
    </Presentation>
  );
}
```

## Presentation Component API

### Props

```tsx
interface PresentationProps {
  children: ReactNode;          // Card components to present
  theme?: SlideTheme;            // Visual theme (default: 'minimal')
  initialCard?: number;          // Starting card index (default: 0)
  enableKeyboard?: boolean;      // Keyboard navigation (default: true)
  showProgress?: boolean;        // Progress bar (default: false)
  progressPosition?: 'top' | 'bottom';  // Where to show progress
  showCardNumbers?: boolean;     // Show card numbers (default: false)
  cardNumberPosition?: string;   // Number position (default: 'bottom-right')
  onCardChange?: (index) => void;  // Callback when card changes
  presenterMode?: boolean;       // Show controls (default: false)
}
```

### Keyboard Controls

When `enableKeyboard` is true:

| Key | Action |
|-----|--------|
| →, ↓, Space, PageDown | Next card |
| ←, ↑, PageUp | Previous card |
| P | Toggle presenter mode |
| Home | First card |
| End | Last card |

### Presenter Mode

Enable `presenterMode` to show:
- **Controls overlay** - Previous/Next buttons with card counter
- **Speaker notes** - Via `<CardNotes>` component
- **Card metadata** - Hidden in normal view

```tsx
<Presentation presenterMode>
  <ContentCard title="Product Launch">
    <h2>Big Announcement</h2>
    <CardNotes>
      <ul>
        <li>Mention the beta signup</li>
        <li>Show demo if time permits</li>
        <li>Q&A at the end</li>
      </ul>
    </CardNotes>
  </ContentCard>
</Presentation>
```

## Building an AI-First App

Here's how to build a complete Gamma-style presentation app:

```tsx
import { useState } from 'react';
import {
  CardGrid,
  Presentation,
  ContentCard,
  MediaCard,
  DataCard,
  usePresentationContext
} from '@slideyui/react';

function App() {
  const [mode, setMode] = useState<'edit' | 'present'>('edit');
  const [slides, setSlides] = useState([
    { id: '1', type: 'content', title: 'Welcome', content: '...' },
    { id: '2', type: 'data', title: 'Metrics', value: '$1.2M' },
  ]);

  // Render cards based on slide data
  const renderCard = (slide) => {
    switch (slide.type) {
      case 'content':
        return (
          <ContentCard
            key={slide.id}
            title={slide.title}
            aspectRatio="16/9"
            interactive={mode === 'edit'}
            data-card-id={slide.id}
            data-card-state={slide.isGenerating ? 'generating' : 'complete'}
          >
            {slide.content}
          </ContentCard>
        );

      case 'data':
        return (
          <DataCard
            key={slide.id}
            variant="metric"
            title={slide.title}
            value={slide.value}
            trend={slide.trend}
          />
        );

      default:
        return null;
    }
  };

  const cards = slides.map(renderCard);

  return (
    <div>
      {/* Mode Switcher */}
      <div className="p-4 flex gap-4">
        <button onClick={() => setMode('edit')}>Edit Mode</button>
        <button onClick={() => setMode('present')}>Present Mode</button>
      </div>

      {/* Render appropriate view */}
      {mode === 'edit' ? (
        <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
          {cards}
        </CardGrid>
      ) : (
        <Presentation theme="corporate" showProgress presenterMode>
          {cards}
        </Presentation>
      )}
    </div>
  );
}
```

## Card Components Reference

All cards work in both modes:

### ContentCard
Text-heavy presentations with structured layouts.

```tsx
<ContentCard
  title="Key Features"
  subtitle="What makes us different"
  badge={<span className="slide-badge">New</span>}
  icon={<Star />}
  footer={<p>Learn more →</p>}
  aspectRatio="16/9"
>
  <ul className="slide-list">
    <li>Feature 1</li>
    <li>Feature 2</li>
  </ul>
</ContentCard>
```

### MediaCard
Image/video focused cards.

```tsx
<MediaCard
  src="/product.jpg"
  alt="Product photo"
  caption="Our flagship product"
  aspectRatio="16/9"
/>
```

### SplitCard
Two-column layouts.

```tsx
<SplitCard
  split={60}
  divider
  left={<img src="/before.jpg" />}
  right={<img src="/after.jpg" />}
/>
```

### DataCard
Metrics and charts.

```tsx
<DataCard
  variant="metric"
  title="Revenue"
  value="$1.2M"
  trend="up"
  trendValue="+24%"
/>
```

### QuoteCard
Pull quotes and testimonials.

```tsx
<QuoteCard
  quote="Best tool we've ever used"
  author="Jane Doe"
  source="CEO, TechCorp"
  avatar="/jane.jpg"
  variant="testimonial"
/>
```

## Migration from Legacy Slides

### Old (Deprecated)

```tsx
import { Deck, TitleSlide, ContentSlide } from '@slideyui/react';

<Deck theme="corporate">
  <TitleSlide title="Welcome" author="John" />
  <ContentSlide title="Features">
    <ul>
      <li>Feature 1</li>
    </ul>
  </ContentSlide>
</Deck>
```

### New (Cards-Only)

```tsx
import { Presentation, ContentCard } from '@slideyui/react';

<Presentation theme="corporate">
  <ContentCard
    title="Welcome"
    footer={<p className="text-lg">John Doe</p>}
    variant="featured"
  >
    <h1 className="text-5xl">Welcome</h1>
  </ContentCard>

  <ContentCard title="Features">
    <ul className="slide-list">
      <li>Feature 1</li>
    </ul>
  </ContentCard>
</Presentation>
```

## Advanced: Custom Card Types

Create your own specialized cards:

```tsx
import { CardContainer } from '@slideyui/react';

function CustomCard({ title, children, ...props }) {
  return (
    <CardContainer {...props}>
      <div className="p-8 flex flex-col h-full">
        <h2 className="text-3xl font-bold mb-6">{title}</h2>
        <div className="flex-1">{children}</div>
      </div>
    </CardContainer>
  );
}

// Use in both modes
<CardGrid>
  <CustomCard title="Custom">Content</CustomCard>
</CardGrid>

<Presentation>
  <CustomCard title="Custom">Content</CustomCard>
</Presentation>
```

## TypeScript Support

Full TypeScript definitions:

```tsx
import type {
  PresentationProps,
  PresentationContextValue,
  ContentCardProps,
  CardGridProps,
  CardAspectRatio
} from '@slideyui/react';

// Use context in custom components
import { usePresentationContext } from '@slideyui/react';

function CustomControl() {
  const { currentCard, totalCards, nextCard } = usePresentationContext();
  return <button onClick={nextCard}>{currentCard + 1} / {totalCards}</button>;
}
```

## Best Practices

1. **One Data Model** - Same slide data for editing and presenting
2. **Responsive Cards** - Always specify `aspectRatio="16/9"`
3. **Presentation-Ready Content** - Use 24px+ fonts, high contrast
4. **Interactive in Edit Mode** - Set `interactive={mode === 'edit'}`
5. **State Tracking** - Use `data-card-state` for visual feedback
6. **Speaker Notes** - Add `<CardNotes>` for presenter mode

## Next Steps

- See [CARDS.md](./CARDS.md) for complete card API reference
- Add drag-and-drop with `@dnd-kit`
- Implement AI content streaming
- Build collaborative editing
- Export to PDF/PowerPoint

SlideyUI: One component system, infinite possibilities! 🎴
