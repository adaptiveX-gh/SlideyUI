# @slideyui/react

React components for SlideyUI - A presentation-first component library built on Tailwind CSS.

## Installation

```bash
npm install @slideyui/react
```

## Usage

```jsx
import { Deck, TitleSlide, ContentSlide, SlideCallout } from '@slideyui/react';

function MyPresentation() {
  return (
    <Deck theme="ocean">
      <TitleSlide
        title="Welcome to SlideyUI"
        subtitle="Build beautiful presentations with React"
        author="Your Name"
        date="2025"
      />

      <ContentSlide title="Key Features">
        <SlideCallout type="key">
          Fully composable React components
        </SlideCallout>
      </ContentSlide>
    </Deck>
  );
}
```

## Components

### Layouts
- `Deck` - Main presentation wrapper
- `TitleSlide` - Hero slide with title, subtitle, author
- `ContentSlide` - Main content slide
- `ComparisonSlide` - Side-by-side comparison
- `DataSlide` - Chart/data visualization
- `SectionSlide` - Section divider

### Content
- `SlideCallout` - Callout boxes
- `SlideQuote` - Quote blocks
- `SlideTimeline` - Timeline component
- `SlideCode` - Code blocks
- `SlidePoll` - Interactive polls
- `SlideList` - Animated lists

### Utilities
- `BuildStep` - Progressive disclosure
- `SlideProgress` - Progress indicator
- `SpeakerNotes` - Speaker notes
- `SlideNumber` - Slide numbers

## Hooks

- `useSlideNavigation` - Handle navigation
- `useSlideContext` - Access slide state
- `useBuildSteps` - Manage build steps
- `usePresenterMode` - Toggle presenter view

## License

MIT
