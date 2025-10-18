# SlideyUI Cards - Layer 0 Primitives for AI-First Presentation Apps

SlideyUI Cards are presentation-optimized building blocks **designed specifically for AI code generation and MCP servers**. Unlike traditional UI components built for human developers, SlideyUI Cards are optimized for LLMs to reason about, generate, and compose into presentations.

## Philosophy

Cards are **Layer 0 primitives** designed for AI agents:

### AI-First Design
- **Semantic naming**: `ContentCard`, `MediaCard`, `DataCard` are obvious to LLMs
- **Minimal configuration**: Sensible defaults reduce token usage in prompts
- **State-aware**: Built-in `data-card-state` for generation feedback
- **MCP-ready**: Easy integration with Model Context Protocol servers
- **Token efficient**: Common use cases require minimal props

### Presentation-Optimized
- **Aspect ratio control**: 16:9, 4:3, and other presentation formats
- **Flexible composition**: Stack, grid, and container primitives
- **Visual feedback**: Auto-styling based on generation state
- **Export-ready**: Works in PDF, PowerPoint, and web

### Minimal Opinions
- AI apps add their own editing logic
- Cards provide structure, not behavior
- Compose freely with Tailwind utilities

## Layout Primitives

### CardContainer

Base container with aspect ratio control and presentation modes.

```tsx
import { CardContainer } from '@slideyui/react';

// Simple card with 16:9 aspect ratio
<CardContainer aspectRatio="16/9" shadow bordered>
  <div className="p-6">
    <h2>Your Content</h2>
  </div>
</CardContainer>

// Interactive card with state tracking (for AI apps)
<CardContainer
  aspectRatio="16/9"
  interactive
  data-card-id="card-123"
  data-card-state="generating" // "generating" | "selected" | "error" | "complete"
>
  <div className="p-6">AI-generated content...</div>
</CardContainer>
```

**Props:**
- `aspectRatio`: '16/9' | '4/3' | '1/1' | '3/2' | 'auto'
- `mode`: 'preview' | 'thumbnail' | 'full'
- `bordered`: boolean - Show border
- `shadow`: boolean - Show shadow
- `interactive`: boolean - Add hover effects
- `data-card-id`: string - For AI app tracking
- `data-card-state`: string - Auto-styles based on state

### CardGrid

Responsive grid layout for organizing multiple cards.

```tsx
import { CardGrid, CardContainer } from '@slideyui/react';

// Auto-fit grid with minimum card width
<CardGrid minCardWidth="300px" gap="md">
  {slides.map(slide => (
    <CardContainer key={slide.id} aspectRatio="16/9">
      {slide.content}
    </CardContainer>
  ))}
</CardGrid>

// Responsive column layout
<CardGrid
  columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}
  gap="lg"
>
  {cards}
</CardGrid>
```

**Props:**
- `columns`: number | { sm, md, lg, xl }
- `gap`: 'sm' | 'md' | 'lg' | 'xl'
- `minCardWidth`: string (for auto-fit)
- `autoFlow`: 'row' | 'column' | 'dense'

### CardStack

Layered card layout for progressive disclosure effects.

```tsx
import { CardStack, CardContainer } from '@slideyui/react';

<CardStack offset="md" expandOnHover>
  <CardContainer>Layer 1</CardContainer>
  <CardContainer>Layer 2</CardContainer>
  <CardContainer>Layer 3</CardContainer>
</CardStack>
```

## Specialized Card Variants

### ContentCard

Text-heavy cards with structured layouts.

```tsx
import { ContentCard } from '@slideyui/react';

<ContentCard
  title="Key Features"
  subtitle="What makes us different"
  badge={<span className="slide-badge">New</span>}
  icon={<Star className="w-6 h-6" />}
  footer={<p className="text-sm">Learn more →</p>}
  aspectRatio="16/9"
>
  <ul className="slide-list">
    <li>24px minimum font sizes</li>
    <li>High contrast colors</li>
    <li>5% safe zones</li>
  </ul>
</ContentCard>
```

### MediaCard

Image and video-focused cards.

```tsx
import { MediaCard } from '@slideyui/react';

// Image with caption
<MediaCard
  src="/images/product.jpg"
  alt="Product photo"
  caption="Our flagship product"
  aspectRatio="16/9"
/>

// Background image with overlay content
<MediaCard
  src="/images/hero.jpg"
  asBackground
  aspectRatio="16/9"
>
  <div className="text-white text-center p-12">
    <h1 className="text-5xl font-bold">Welcome</h1>
    <p className="text-2xl mt-4">To the future of presentations</p>
  </div>
</MediaCard>
```

### SplitCard

Two-column layouts for comparisons or image+text.

```tsx
import { SplitCard } from '@slideyui/react';

// 60/40 split with divider
<SplitCard
  split={60}
  divider
  left={
    <div className="p-8">
      <h3 className="text-3xl mb-4">Before</h3>
      <p>Manual slide creation...</p>
    </div>
  }
  right={
    <div className="p-8">
      <h3 className="text-3xl mb-4">After</h3>
      <p>AI-powered generation...</p>
    </div>
  }
/>
```

### DataCard

Metrics, charts, and data visualizations.

```tsx
import { DataCard } from '@slideyui/react';

// Metric variant
<DataCard
  variant="metric"
  title="Revenue"
  value="$1.2M"
  label="Total Sales"
  trend="up"
  trendValue="+24%"
  icon={<DollarSign />}
/>

// Chart variant
<DataCard
  variant="chart"
  title="Growth Trend"
  footer="Data from Q1-Q4 2024"
>
  <LineChart data={chartData} />
</DataCard>
```

### QuoteCard

Pull quotes and testimonials.

```tsx
import { QuoteCard } from '@slideyui/react';

<QuoteCard
  quote="SlideyUI cards changed how we build presentations. Perfect for AI generation."
  author="Jane Doe"
  source="CEO, TechCorp"
  avatar="/avatars/jane.jpg"
  variant="testimonial"
/>
```

## AI Code Generation Examples

### Example 1: MCP Server Tool for Card Generation

Here's how an MCP server might expose SlideyUI cards as tools:

```typescript
// MCP Tool Definition for Claude Desktop/Cline
const slideyUITools = [
  {
    name: "create_content_card",
    description: "Generate a content-focused presentation card with title, body, and optional footer",
    inputSchema: {
      type: "object",
      properties: {
        title: { type: "string", description: "Card title" },
        subtitle: { type: "string", description: "Optional subtitle" },
        content: { type: "string", description: "Main card content (supports markdown)" },
        variant: {
          type: "string",
          enum: ["default", "featured", "minimal"],
          description: "Card style variant"
        },
        aspectRatio: {
          type: "string",
          enum: ["16/9", "4/3", "1/1"],
          default: "16/9"
        }
      },
      required: ["title", "content"]
    }
  },
  {
    name: "create_media_card",
    description: "Generate a card with image or video content",
    inputSchema: {
      type: "object",
      properties: {
        src: { type: "string", description: "Image or video URL" },
        caption: { type: "string", description: "Media caption" },
        alt: { type: "string", description: "Alt text for accessibility" },
        asBackground: { type: "boolean", description: "Use media as background" }
      },
      required: ["src"]
    }
  },
  {
    name: "create_data_card",
    description: "Generate a card for metrics or data visualization",
    inputSchema: {
      type: "object",
      properties: {
        variant: { type: "string", enum: ["metric", "chart"] },
        title: { type: "string" },
        value: { type: "string", description: "Primary metric value" },
        trend: { type: "string", enum: ["up", "down", "neutral"] },
        trendValue: { type: "string", description: "Trend indicator (e.g., '+24%')" }
      },
      required: ["title"]
    }
  }
];
```

### Example 2: AI Streaming Content Generation

```tsx
import { CardGrid, ContentCard } from '@slideyui/react';
import { useState, useEffect } from 'react';

// Simulate AI streaming content into cards
function AIStreamingPresentation() {
  const [cards, setCards] = useState([
    { id: 1, title: "Introduction", content: "", state: "generating" },
    { id: 2, title: "Key Points", content: "", state: "pending" },
    { id: 3, title: "Conclusion", content: "", state: "pending" }
  ]);

  useEffect(() => {
    // Simulate AI streaming content
    streamAIContent(cards, setCards);
  }, []);

  return (
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      {cards.map(card => (
        <ContentCard
          key={card.id}
          title={card.title}
          aspectRatio="16/9"
          data-card-id={card.id}
          data-card-state={card.state}
          interactive
        >
          {card.content || <div className="animate-pulse">Generating...</div>}
        </ContentCard>
      ))}
    </CardGrid>
  );
}

// AI streaming simulation
async function streamAIContent(cards, setCards) {
  for (let i = 0; i < cards.length; i++) {
    const cardId = cards[i].id;

    // Mark as generating
    setCards(prev => prev.map(c =>
      c.id === cardId ? { ...c, state: "generating" } : c
    ));

    // Stream content (simulated)
    const generatedContent = await generateWithAI(cards[i].title);

    // Mark as complete
    setCards(prev => prev.map(c =>
      c.id === cardId
        ? { ...c, content: generatedContent, state: "complete" }
        : c
    ));
  }
}
```

### Example 3: Building a Gamma-Style Card Interface

Here's how an AI-first presentation app might use these primitives:

```tsx
import {
  CardGrid,
  ContentCard,
  MediaCard,
  DataCard
} from '@slideyui/react';

function PresentationEditor({ slides, onSlideUpdate, onSlideReorder }) {
  return (
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      {slides.map((slide, index) => {
        // AI app adds its own editing logic
        const CardComponent = slide.type === 'content' ? ContentCard
                           : slide.type === 'media' ? MediaCard
                           : DataCard;

        return (
          <CardComponent
            key={slide.id}
            {...slide.props}
            aspectRatio="16/9"
            interactive
            data-card-id={slide.id}
            data-card-state={slide.isGenerating ? 'generating' : 'complete'}
            className="group cursor-pointer"
          >
            {/* AI app renders preview content */}
            {slide.content}

            {/* AI app adds hover controls */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={() => onEdit(slide.id)}>Edit</button>
              <button onClick={() => onDelete(slide.id)}>Delete</button>
            </div>

            {/* AI app adds slide number badge */}
            <div className="absolute -top-3 -left-3">
              <span className="slide-badge">{index + 1}</span>
            </div>
          </CardComponent>
        );
      })}
    </CardGrid>
  );
}
```

## Card-to-Slide Transformation

Cards use the same presentation-optimized styles as full slides, so they naturally transform:

```tsx
// In card view (editing mode)
<CardGrid>
  <ContentCard title="Features" aspectRatio="16/9">
    <ul className="slide-list">
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </ContentCard>
</CardGrid>

// In presentation mode (full screen)
<Deck>
  <ContentSlide title="Features">
    <ul className="slide-list">
      <li>Feature 1</li>
      <li>Feature 2</li>
    </ul>
  </ContentSlide>
</Deck>
```

Both use the same typography scale, spacing, and color tokens for seamless transitions.

## State Management for AI Apps

Cards support data attributes for app-specific state:

```tsx
// AI app tracks generation state
<ContentCard
  data-card-id="abc123"
  data-card-state="generating" // Auto-applies pulse animation
>
  {streamingContent}
</ContentCard>

// User selects card for editing
<ContentCard
  data-card-id="abc123"
  data-card-state="selected" // Auto-applies ring highlight
  onClick={handleSelect}
>
  {content}
</ContentCard>

// AI generation complete
<ContentCard
  data-card-id="abc123"
  data-card-state="complete" // Auto-applies success styling
>
  {finalContent}
</ContentCard>
```

Supported states:
- `generating` - Pulse animation
- `selected` - Ring highlight
- `error` - Red border
- `complete` - Green border

## TypeScript Support

Full TypeScript definitions included:

```tsx
import type {
  CardContainerProps,
  CardGridProps,
  ContentCardProps,
  MediaCardProps,
  SplitCardProps,
  DataCardProps,
  QuoteCardProps,
  CardAspectRatio,
  CardLayoutMode
} from '@slideyui/react';
```

## Best Practices

### For AI/MCP Integration
1. **Use semantic props**: Prefer `variant="metric"` over `className="metric-card"`
2. **Minimize required props**: AI should generate cards with minimal configuration
3. **Provide clear enums**: Use TypeScript enums for AI to choose from valid options
4. **Support incremental updates**: Cards should handle partial/streaming content
5. **Track generation state**: Always use `data-card-state` for visual feedback
6. **Test with AI tools**: Verify cards are easy for LLMs to generate

### For Presentation Quality
1. **Always specify aspectRatio** for consistent card sizes
2. **Use data-card-id** for tracking in AI apps
3. **Use data-card-state** for visual feedback during generation
4. **Keep content presentation-ready** - 24px minimum fonts
5. **Compose freely** - Mix card types in same grid
6. **Test at full screen** - Cards should work as slides

### Token Efficiency Tips for AI Prompts
When instructing an AI to generate SlideyUI cards:

```
✅ Good (Token Efficient):
"Generate a ContentCard with title 'Introduction' and aspectRatio '16/9'"

❌ Bad (Verbose):
"Generate a ContentCard component with the following properties: title should be set to 'Introduction', aspectRatio should be set to '16/9', bordered should be true, shadow should be true, mode should be 'preview'..."
```

The AI can rely on sensible defaults, reducing prompt length and improving generation speed.

## MCP Server Implementation Guide

### Building an MCP Server for SlideyUI

Here's a complete example of an MCP server that exposes SlideyUI card generation:

```typescript
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  {
    name: "slideyui-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define card generation tools
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "create_slideyui_card",
      description: "Generate a SlideyUI presentation card",
      inputSchema: {
        type: "object",
        properties: {
          cardType: {
            type: "string",
            enum: ["ContentCard", "MediaCard", "DataCard", "SplitCard", "QuoteCard"],
            description: "Type of card to create"
          },
          title: { type: "string" },
          content: { type: "string" },
          aspectRatio: { type: "string", enum: ["16/9", "4/3", "1/1"], default: "16/9" },
          variant: { type: "string", description: "Card variant (depends on cardType)" }
        },
        required: ["cardType", "title"]
      }
    }
  ]
}));

// Handle card generation
server.setRequestHandler("tools/call", async (request) => {
  if (request.params.name === "create_slideyui_card") {
    const { cardType, title, content, aspectRatio, variant } = request.params.arguments;

    // Generate React code for the card
    const cardCode = generateCardCode(cardType, { title, content, aspectRatio, variant });

    return {
      content: [
        {
          type: "text",
          text: `Generated ${cardType}:\n\n${cardCode}`
        }
      ]
    };
  }

  throw new Error("Unknown tool");
});

function generateCardCode(cardType, props) {
  // Generate appropriate JSX based on card type
  switch (cardType) {
    case "ContentCard":
      return `<ContentCard
  title="${props.title}"
  aspectRatio="${props.aspectRatio}"
>
  ${props.content}
</ContentCard>`;

    case "DataCard":
      return `<DataCard
  variant="${props.variant || 'metric'}"
  title="${props.title}"
  aspectRatio="${props.aspectRatio}"
>
  ${props.content}
</DataCard>`;

    // ... other card types
  }
}

// Start server
const transport = new StdioServerTransport();
await server.connect(transport);
```

## Next Steps

### For AI App Developers
- Build MCP server for your presentation tool (see example above)
- Implement streaming content updates as AI generates
- Add drag-and-drop with @dnd-kit for card reordering
- Export to PDF/PowerPoint for sharing
- Build collaborative editing with real-time sync

### For AI Integration
- Test with Claude Desktop and Cline
- Optimize prompts for token efficiency
- Implement error handling for generation failures
- Add retry logic for incomplete cards
- Monitor generation states with analytics

**SlideyUI cards are the foundation - your AI app brings them to life!**
