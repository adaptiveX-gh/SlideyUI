# SlideyUI

<div align="center">
  <h3>A presentation-first component library built on Tailwind CSS</h3>
  <p>Build beautiful, readable presentations optimized for projection</p>
</div>

---

## What is SlideyUI?

SlideyUI reimagines UI components for the unique constraints and opportunities of presentations. Instead of building web pages, you're building slides. Every component is optimized for:

- **Readability at distance** - Conference rooms, large screens, projectors
- **Visual hierarchy** - Clear reading order (what reads first, second, third)
- **Presentation flow** - Smooth transitions, builds, and reveals
- **Export-friendly** - PDF, PowerPoint, Keynote compatible

## Features

- 🎨 **Presentation Themes** - Corporate, Pitch Deck, Academic, Workshop, Startup
- 📐 **Smart Layouts** - Title slides, content slides, comparisons, data visualizations
- 📝 **Optimized Typography** - Large, readable fonts with proper spacing (minimum 24px)
- 🎯 **Slide Utilities** - Animations, progress indicators, speaker notes
- 🧩 **Specialized Components** - Callouts, quotes, timelines, code blocks, polls
- 📱 **Multiple Aspect Ratios** - 16:9, 4:3, 16:10, vertical (9:16)
- ♿ **Accessible** - WCAG compliant with proper contrast and readability

## Quick Start

### Installation

```bash
npm install slideyui tailwindcss
```

### Tailwind CSS Configuration

```js
// tailwind.config.js
import slideyUI from 'slideyui';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  plugins: [
    slideyUI({
      theme: 'corporate', // or 'pitch-deck', 'academic', 'workshop', 'startup'
      defaultRatio: '16:9',
    }),
  ],
};
```

### React Usage

```jsx
import { Deck, TitleSlide, ContentSlide, ComparisonSlide } from '@slideyui/react';
import 'slideyui/dist/index.css';

function MyPresentation() {
  return (
    <Deck theme="pitch-deck" showProgress showSlideNumbers>
      <TitleSlide
        title="The Future of AI"
        subtitle="Building Tomorrow, Today"
        author="Jane Doe"
        date="October 2024"
      />

      <ContentSlide title="Key Points">
        <ul className="slide-list">
          <li>AI will transform every industry</li>
          <li>Focus on responsible development</li>
          <li>Human-AI collaboration is key</li>
        </ul>
      </ContentSlide>

      <ComparisonSlide
        title="Traditional vs AI-Powered"
        left={{
          title: "Before",
          content: <ul><li>Manual processes</li><li>High costs</li></ul>
        }}
        right={{
          title: "After",
          content: <ul><li>Automation</li><li>Efficiency gains</li></ul>
        }}
      />
    </Deck>
  );
}
```

## Documentation

Visit the [documentation site](http://localhost:5173) for full documentation, examples, and guides:

- [Introduction](http://localhost:5173/docs/intro) - Learn about SlideyUI
- [Installation](http://localhost:5173/docs/install) - Step-by-step setup
- [Themes](http://localhost:5173/docs/themes) - Explore presentation themes
- [Layouts](http://localhost:5173/docs/layouts) - Slide layout templates
- [Components](http://localhost:5173/docs/components) - Component library
- [Examples](http://localhost:5173/docs/examples) - Complete presentations

## Packages

This monorepo contains:

- **`slideyui`** - Core Tailwind CSS plugin with themes and utilities
- **`@slideyui/react`** - React components for building presentations
- **`docs`** - Documentation website (SvelteKit)

## Available Themes

```js
// Corporate - Professional, conservative
slideyUI({ theme: 'corporate' })

// Pitch Deck - Dynamic, vibrant for startups
slideyUI({ theme: 'pitch-deck' })

// Academic - Traditional, dense for education
slideyUI({ theme: 'academic' })

// Workshop - Interactive, playful for training
slideyUI({ theme: 'workshop' })

// Startup - Modern, energetic for tech
slideyUI({ theme: 'startup' })
```

## Component Showcase

### Callouts

```jsx
import { Callout } from '@slideyui/react';

<Callout type="key">
  This is the most important point!
</Callout>
```

### Quotes

```jsx
import { Quote } from '@slideyui/react';

<Quote
  quote="Design is not just what it looks like. Design is how it works."
  author="Steve Jobs"
  role="Apple Co-founder"
/>
```

### Code Blocks

```jsx
import { CodeBlock } from '@slideyui/react';

<CodeBlock
  language="javascript"
  code={`function greet(name) {
  return \`Hello, \${name}!\`;
}`}
/>
```

## Development

### Prerequisites

- Node.js 18+
- npm or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/slideyui.git
cd slideyui

# Install dependencies
npm install

# Start development server (docs site)
npm run dev

# Build all packages
npm run build

# Build individual packages
npm run build:core    # Build core plugin
npm run build:react   # Build React components
npm run build:docs    # Build documentation site
```

### Project Structure

```
slideyui/
├── packages/
│   ├── slideyui-core/      # Tailwind CSS plugin
│   │   ├── src/
│   │   │   ├── index.ts
│   │   │   ├── themes.ts
│   │   │   ├── base.css
│   │   │   ├── components.css
│   │   │   ├── typography.css
│   │   │   └── animations.css
│   │   └── package.json
│   │
│   └── slideyui-react/     # React components
│       ├── src/
│       │   ├── components/
│       │   ├── hooks/
│       │   ├── context/
│       │   └── types/
│       └── package.json
│
├── docs/                   # Documentation site
│   ├── src/
│   │   ├── routes/
│   │   └── lib/
│   └── package.json
│
├── examples/              # Example presentations
└── package.json          # Workspace root
```

## Philosophy

SlideyUI follows these core principles:

1. **Projection-First**: Every design decision optimizes for readability at distance
2. **Minimum 24px Font**: Never go below this for slide content
3. **Safe Zones**: 5% padding keeps content away from screen edges
4. **High Contrast**: WCAG AAA compliance for all text
5. **Progressive Disclosure**: Build slides step-by-step with animations
6. **Export-Ready**: Presentations work in PDF, PowerPoint, and web

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

## License

MIT License - see [LICENSE](./LICENSE) for details

## Acknowledgments

- Inspired by [DaisyUI](https://daisyui.com) for the Tailwind plugin architecture
- Built with [Tailwind CSS](https://tailwindcss.com)
- React components powered by [React](https://react.dev)
- Documentation built with [SvelteKit](https://kit.svelte.dev)

---

<div align="center">
  <p>Made with ❤️ for presenters everywhere</p>
  <p>
    <a href="http://localhost:5173">Documentation</a> •
    <a href="http://localhost:5173/docs/examples">Examples</a> •
    <a href="https://github.com/yourusername/slideyui">GitHub</a>
  </p>
</div>
