# SlideyUI

<div align="center">
  <h3>An AI-first presentation component library</h3>
  <p>Build beautiful, readable presentations optimized for projection</p>
</div>

---

## What is SlideyUI?

**SlideyUI is an AI-First presentation component library built on Tailwind CSS.** Unlike traditional UI frameworks designed for web applications, SlideyUI reimagines every component for the unique constraints and opportunities of building presentations through MCP servers and AI code generation tools.

Built with a **card-based architecture** for modern, AI-first presentation apps (think [Gamma.app](https://gamma.app)), SlideyUI provides presentation-optimized components that work seamlessly with:

- **🤖 AI Code Generation** - Designed for LLMs to generate presentations programmatically
- **🔌 MCP Servers** - Native support for Model Context Protocol integration
- **📡 Streaming Content** - Real-time updates as AI generates slides
- **🎯 State Tracking** - Built-in data attributes for generation states (generating, complete, error)
- **🧩 Composable Primitives** - Layer 0 components that AI can reason about and combine

### Why AI-First?

Traditional UI libraries optimize for human developers building web apps. SlideyUI optimizes for **AI agents building presentations**:

- **Semantic Component Names** - `ContentCard`, `MediaCard`, `DataCard` are obvious to LLMs
- **Minimal Configuration** - Sensible defaults reduce token usage in prompts
- **Presentation Constraints** - 24px+ fonts, high contrast, aspect ratios handled automatically
- **State-Aware Styling** - `data-card-state` attributes provide visual feedback during generation
- **MCP-Ready** - Easy integration with Claude Desktop, Cline, and other MCP clients

Every component is also optimized for human-readable presentations:

- **📺 Readability at Distance** - Conference rooms, large screens, projectors
- **📐 Visual Hierarchy** - Clear reading order (what reads first, second, third)
- **✏️ Card-Based Editing** - Individual cards that can be rearranged and edited
- **📤 Export-Friendly** - PDF, PowerPoint, Keynote compatible

## Architecture Overview

SlideyUI uses a **cards-only architecture** designed for modern presentation apps:

```
┌─────────────────────────────────────────────────┐
│ Application Layer (Your AI/Editing App)        │
├─────────────────────────────────────────────────┤
│ Card Components (Layer 0 Primitives)           │
│ - ContentCard, MediaCard, DataCard, etc.       │
├─────────────────────────────────────────────────┤
│ Layout Primitives                               │
│ - CardContainer, CardGrid, CardStack           │
├─────────────────────────────────────────────────┤
│ Presentation System                             │
│ - Presentation context, keyboard nav, states    │
├─────────────────────────────────────────────────┤
│ Tailwind CSS Plugin (Core Styles)              │
│ - Themes, utilities, presentation defaults      │
└─────────────────────────────────────────────────┘
```

### Modern API (Recommended)
- **Cards**: ContentCard, MediaCard, SplitCard, DataCard, QuoteCard
- **Layouts**: CardContainer, CardGrid, CardStack
- **Container**: Presentation (replaces Deck)

### Legacy API (Deprecated)
- Deck, TitleSlide, ContentSlide, ComparisonSlide, DataSlide
- **Note**: These will be removed in v1.0.0. See migration guide below.

## Features

### AI & MCP Integration
- 🤖 **LLM-Optimized Components** - Semantic naming and minimal config for AI code generation
- 🔌 **MCP Server Ready** - Built-in support for Model Context Protocol
- 📡 **Streaming Support** - Real-time card updates during AI generation
- 🎯 **State Management** - Visual feedback via `data-card-state` attributes
- 🧠 **Token Efficient** - Sensible defaults reduce prompt complexity

### Presentation Excellence
- 🎨 **Presentation Themes** - Corporate, Pitch Deck, Academic, Workshop, Startup
- 📐 **Card-Based Layouts** - ContentCard, MediaCard, SplitCard, DataCard, QuoteCard
- 📝 **Optimized Typography** - Large, readable fonts with proper spacing (minimum 24px)
- 🎯 **Presentation Utilities** - Animations, progress indicators, speaker notes
- 🧩 **Specialized Components** - Callouts, quotes, timelines, code blocks, polls
- 📱 **Multiple Aspect Ratios** - 16:9, 4:3, 16:10, vertical (9:16)
- ♿ **Accessible** - WCAG compliant with proper contrast and readability

## Quick Start

### Installation

```bash
# For React applications
npm install @slideyui/react @slideyui/core tailwindcss

# For SvelteKit applications (docs/demos)
npm install @slideyui/svelte @slideyui/core tailwindcss
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

### React Usage (Modern API)

```jsx
import { Presentation, ContentCard, MediaCard, SplitCard } from '@slideyui/react';
import 'slideyui/dist/index.css';

function MyPresentation() {
  return (
    <Presentation theme="pitch-deck" showProgress showCardNumbers>
      {/* Hero card */}
      <ContentCard
        title="The Future of AI"
        subtitle="Building Tomorrow, Today"
        variant="featured"
        footer={
          <div className="text-center">
            <p className="text-2xl font-medium">Jane Doe</p>
            <p className="text-xl opacity-70">October 2024</p>
          </div>
        }
        aspectRatio="16/9"
      />

      {/* Content card */}
      <ContentCard title="Key Points" aspectRatio="16/9">
        <ul className="slide-list">
          <li>AI will transform every industry</li>
          <li>Focus on responsible development</li>
          <li>Human-AI collaboration is key</li>
        </ul>
      </ContentCard>

      {/* Split comparison card */}
      <SplitCard
        divider
        aspectRatio="16/9"
        left={
          <div className="p-8">
            <h3 className="text-3xl font-bold mb-4">Before</h3>
            <ul className="slide-list">
              <li>Manual processes</li>
              <li>High costs</li>
            </ul>
          </div>
        }
        right={
          <div className="p-8">
            <h3 className="text-3xl font-bold mb-4">After</h3>
            <ul className="slide-list">
              <li>Automation</li>
              <li>Efficiency gains</li>
            </ul>
          </div>
        }
      />
    </Presentation>
  );
}
```

### Card Grid Layout (AI-First Apps)

Build Gamma-style card interfaces for editing:

```jsx
import { CardGrid, ContentCard, MediaCard } from '@slideyui/react';

function PresentationEditor({ slides }) {
  return (
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      {slides.map(slide => (
        <ContentCard
          key={slide.id}
          title={slide.title}
          aspectRatio="16/9"
          interactive
          data-card-id={slide.id}
          data-card-state={slide.isGenerating ? 'generating' : 'complete'}
        >
          {slide.content}
        </ContentCard>
      ))}
    </CardGrid>
  );
}
```

### AI Code Generation Example

SlideyUI is designed to be generated by AI tools and MCP servers:

```typescript
// Example: AI-generated presentation via MCP server
// The AI can easily reason about card types and generate appropriate content

import { Presentation, ContentCard, DataCard, SplitCard } from '@slideyui/react';

function AIGeneratedPresentation({ topic, data }) {
  return (
    <Presentation theme="startup" showProgress>
      {/* AI generates hero card */}
      <ContentCard
        title={data.title}
        subtitle={data.subtitle}
        variant="featured"
        aspectRatio="16/9"
        data-card-id="hero"
        data-card-state="complete"
      />

      {/* AI streams content into cards */}
      {data.sections.map((section, i) => (
        <ContentCard
          key={section.id}
          title={section.title}
          aspectRatio="16/9"
          data-card-id={section.id}
          data-card-state={section.isGenerating ? 'generating' : 'complete'}
        >
          {section.content}
        </ContentCard>
      ))}

      {/* AI generates data visualizations */}
      <DataCard
        variant="metric"
        title="Key Metrics"
        value={data.metrics.revenue}
        trend="up"
        trendValue="+24%"
        aspectRatio="16/9"
      />
    </Presentation>
  );
}
```

### MCP Server Integration

Use SlideyUI with Claude Desktop, Cline, or custom MCP clients:

```typescript
// Example MCP tool for generating SlideyUI presentations
{
  name: "create_presentation_card",
  description: "Generate a presentation card with SlideyUI",
  inputSchema: {
    type: "object",
    properties: {
      cardType: {
        type: "string",
        enum: ["ContentCard", "MediaCard", "DataCard", "SplitCard", "QuoteCard"]
      },
      title: { type: "string" },
      content: { type: "string" },
      aspectRatio: { type: "string", default: "16/9" }
    }
  }
}
```

### Migration from Legacy API

If you're using the old Deck/Slide components:

```jsx
// ❌ Old (Deprecated)
import { Deck, TitleSlide, ContentSlide } from '@slideyui/react';

<Deck theme="pitch-deck">
  <TitleSlide title="My Talk" subtitle="An overview" />
  <ContentSlide title="Key Points">...</ContentSlide>
</Deck>

// ✅ New (Recommended)
import { Presentation, ContentCard } from '@slideyui/react';

<Presentation theme="pitch-deck">
  <ContentCard title="My Talk" subtitle="An overview" variant="featured" aspectRatio="16/9" />
  <ContentCard title="Key Points" aspectRatio="16/9">...</ContentCard>
</Presentation>
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

- **`@slideyui/core`** (formerly `slideyui`) - Core Tailwind CSS plugin with themes and utilities
- **`@slideyui/react`** - React components for building full presentation applications
- **`@slideyui/svelte`** - SvelteKit components for documentation and demos
- **`docs`** - Documentation website (SvelteKit with live demos)

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
│   ├── slideyui-core/          # Tailwind CSS plugin
│   │   ├── src/
│   │   │   ├── index.ts        # Main plugin entry, CSS-in-JS generation
│   │   │   ├── themes.ts       # 5 presentation themes
│   │   │   ├── types.ts        # TypeScript types
│   │   │   ├── utils.ts        # Config resolution, theme helpers
│   │   │   ├── base.css        # Base slide styles
│   │   │   ├── components.css  # Component utilities (callouts, cards, etc.)
│   │   │   ├── layouts.css     # Layout utilities (content, two-column, etc.)
│   │   │   ├── typography.css  # Typography scale
│   │   │   └── animations.css  # Animations and transitions
│   │   └── package.json
│   │
│   ├── slideyui-react/         # React components
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── cards/      # ✨ Modern card components (START HERE)
│   │   │   │   │   ├── CardContainer.tsx
│   │   │   │   │   ├── CardGrid.tsx
│   │   │   │   │   ├── ContentCard.tsx
│   │   │   │   │   ├── MediaCard.tsx
│   │   │   │   │   ├── SplitCard.tsx
│   │   │   │   │   ├── DataCard.tsx
│   │   │   │   │   └── QuoteCard.tsx
│   │   │   │   ├── Presentation.tsx  # Modern presentation container
│   │   │   │   ├── Deck.tsx          # ⚠️ Deprecated (wraps Presentation)
│   │   │   │   ├── TitleSlide.tsx    # ⚠️ Deprecated (wraps ContentCard)
│   │   │   │   └── ...               # Other content components
│   │   │   ├── context/
│   │   │   │   ├── PresentationContext.tsx  # ✅ Active context
│   │   │   │   └── BuildStepContext.tsx     # ✅ Active context
│   │   │   ├── hooks/
│   │   │   │   ├── useBuildSteps.ts
│   │   │   │   └── usePresenterMode.ts
│   │   │   └── types/
│   │   │       └── index.ts    # All TypeScript types
│   │   ├── CARDS.md            # 📖 Card system documentation
│   │   ├── REFACTOR_PLAN.md    # 📖 Migration guide
│   │   └── package.json
│   │
│   └── slideyui-svelte/        # 🆕 SvelteKit components (for docs/demos)
│       ├── src/lib/
│       │   ├── components/
│       │   │   ├── CardContainer.svelte
│       │   │   ├── CardGrid.svelte
│       │   │   ├── ContentCard.svelte
│       │   │   ├── MediaCard.svelte
│       │   │   └── DataCard.svelte
│       │   └── index.ts        # Component exports
│       ├── README.md           # Svelte package documentation
│       └── package.json
│
├── docs/                       # Documentation site (SvelteKit)
│   ├── src/
│   │   ├── routes/
│   │   │   ├── docs/
│   │   │   │   ├── components/
│   │   │   │   ├── examples/
│   │   │   │   └── cards/      # Card component showcase
│   │   │   └── +page.svelte
│   │   └── lib/
│   │       └── components/
│   │           ├── LiveCardDemo.svelte      # 🆕 Interactive card demo
│   │           └── ComponentPreview.svelte  # Preview wrapper
│   ├── USING_SLIDEYUI_SVELTE.md  # 📖 Guide for using Svelte components
│   └── package.json
│
├── CLAUDE.md                   # 🤖 Project instructions for AI assistants
└── package.json                # Workspace root
```

**Key Files for Onboarding:**
- `CLAUDE.md` - Project overview and conventions
- `packages/slideyui-react/CARDS.md` - Card system documentation
- `packages/slideyui-react/REFACTOR_PLAN.md` - Migration guide from legacy API
- `packages/slideyui-react/src/components/index.tsx` - Component exports with helpful comments

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
