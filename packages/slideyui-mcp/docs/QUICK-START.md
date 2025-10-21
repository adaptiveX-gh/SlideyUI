# Quick Start Guide

Get your first presentation running in 5 minutes.

## Table of Contents

1. [Installation](#installation)
2. [Your First Presentation](#your-first-presentation)
3. [Adding Content](#adding-content)
4. [Themes](#themes)
5. [Next Steps](#next-steps)

## Installation

### Option 1: With Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%/Claude/claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "slideyui": {
      "command": "npx",
      "args": ["-y", "@slideyui/mcp"]
    }
  }
}
```

Then restart Claude Desktop.

### Option 2: Programmatic

```bash
npm install @slideyui/mcp
```

```typescript
import { generatePresentation } from '@slideyui/mcp';

// Use in your code
```

## Your First Presentation

### Step 1: Create a basic presentation

Ask Claude (if using MCP):
> Create a presentation with the title "My First Presentation" using the corporate theme. Add a title slide with the title "Welcome" and subtitle "Let's get started".

Or programmatically:

```typescript
import { generatePresentation } from '@slideyui/mcp';

const result = await generatePresentation({
  theme: 'corporate',
  title: 'My First Presentation',
  slides: [
    {
      type: 'title',
      title: 'Welcome',
      subtitle: "Let's get started"
    }
  ]
});

// result.html contains your presentation
console.log(result.html);
```

**Expected output:** An HTML file you can open in any browser.

### Step 2: Add a content slide

```typescript
const result = await generatePresentation({
  theme: 'corporate',
  title: 'My First Presentation',
  slides: [
    {
      type: 'title',
      title: 'Welcome',
      subtitle: "Let's get started"
    },
    {
      type: 'content',
      title: 'What We Cover',
      content: [
        'Getting started with SlideyUI',
        'Creating your first presentation',
        'Customizing with themes'
      ]
    }
  ]
});
```

### Step 3: Export to HTML

Save the HTML to a file:

```typescript
import fs from 'fs';

const result = await generatePresentation({
  theme: 'corporate',
  title: 'My First Presentation',
  slides: [
    {
      type: 'title',
      title: 'Welcome',
      subtitle: "Let's get started"
    },
    {
      type: 'content',
      title: 'What We Cover',
      content: [
        'Getting started with SlideyUI',
        'Creating your first presentation',
        'Customizing with themes'
      ]
    }
  ]
});

// Write to file
fs.writeFileSync('presentation.html', result.html);
console.log('Presentation saved to presentation.html');
```

Now open `presentation.html` in your browser!

## Adding Content

### Title Slides

```typescript
{
  type: 'title',
  title: 'My Topic',
  subtitle: 'Subtitle text',
  author: 'Your Name',
  date: 'December 2024'
}
```

### Content Slides (Bullet Points)

```typescript
{
  type: 'content',
  title: 'Key Points',
  content: [
    'First point',
    'Second point',
    'Third point'
  ]
}
```

**Important:** `content` must always be an array, even for single items:

```typescript
// Correct
content: ['Single item']

// Wrong
content: 'Single item'
```

### Hero Slides (Full Impact)

```typescript
{
  type: 'hero',
  title: 'Big Statement',
  subtitle: 'Supporting text',
  backgroundImage: 'https://example.com/image.jpg'
}
```

### Two-Column Layout

```typescript
{
  type: 'two-column',
  title: 'Comparison',
  leftColumn: {
    type: 'list',
    content: ['Left point 1', 'Left point 2']
  },
  rightColumn: {
    type: 'list',
    content: ['Right point 1', 'Right point 2']
  }
}
```

### Data & Charts

```typescript
{
  type: 'data',
  title: 'Q4 Revenue',
  dataType: 'chart',
  chartType: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 58000, 65000]
      }
    ]
  }
}
```

## Themes

Available themes:

1. **corporate** - Professional blue palette
2. **pitch-deck** - Modern and energetic
3. **academic** - Traditional academic style
4. **workshop** - Friendly and approachable
5. **startup** - Bold and contemporary

### Using a Theme

```typescript
{
  theme: 'pitch-deck', // Change this to use different theme
  title: 'My Presentation',
  slides: [...]
}
```

## Next Steps

1. **Learn all slide types** - See [SLIDE-TYPES.md](./SLIDE-TYPES.md) for 16+ slide types and examples
2. **Master the API** - Read [API-REFERENCE.md](./API-REFERENCE.md) for complete schema documentation
3. **Debug issues** - Check [ERRORS.md](./ERRORS.md) for common problems and solutions
4. **Explore advanced features** - See [USER-GUIDE.md](./USER-GUIDE.md) for best practices and advanced patterns

## Common Patterns

### Content Must Be an Array

Always provide content as an array:

```typescript
// Good
{
  type: 'content',
  title: 'Points',
  content: ['Item 1', 'Item 2', 'Item 3']
}

// Bad - will fail
{
  type: 'content',
  title: 'Points',
  content: 'Item 1'
}
```

### Images in Two-Column Slides

```typescript
{
  type: 'two-column',
  leftColumn: {
    type: 'image',
    content: 'https://example.com/image.jpg'
  },
  rightColumn: {
    type: 'list',
    content: ['Description 1', 'Description 2']
  }
}
```

### Using Layout Density

Control spacing:

```typescript
{
  type: 'content',
  title: 'Points',
  content: [...],
  layoutDensity: 'spacious' // 'compact', 'normal', or 'spacious'
}
```

## Full Example

Here's a complete 5-slide presentation:

```typescript
import { generatePresentation } from '@slideyui/mcp';
import fs from 'fs';

const result = await generatePresentation({
  theme: 'pitch-deck',
  title: 'Product Launch',
  slides: [
    // Slide 1: Title
    {
      type: 'title',
      title: 'Introducing Widget Pro',
      subtitle: 'The future of productivity',
      author: 'Product Team',
      date: 'January 2025'
    },

    // Slide 2: Problem
    {
      type: 'content',
      title: 'The Problem',
      content: [
        'Users spend 3+ hours daily on repetitive tasks',
        'Current tools lack automation',
        'Time wasted = Lost revenue'
      ]
    },

    // Slide 3: Solution with Two Columns
    {
      type: 'two-column',
      title: 'Our Solution',
      leftColumn: {
        type: 'image',
        content: 'https://via.placeholder.com/400x300'
      },
      rightColumn: {
        type: 'list',
        content: [
          'AI-powered automation',
          '70% time savings',
          'Easy integration',
          '24/7 support'
        ]
      }
    },

    // Slide 4: Traction (Three Columns)
    {
      type: 'three-column',
      title: 'Early Traction',
      columns: [
        {
          heading: 'Users',
          icon: '👥',
          content: '5,000+ active users'
        },
        {
          heading: 'Growth',
          icon: '📈',
          content: '40% month-over-month'
        },
        {
          heading: 'Satisfaction',
          icon: '⭐',
          content: '4.8/5 star rating'
        }
      ]
    },

    // Slide 5: Call to Action (Hero)
    {
      type: 'hero',
      title: 'Ready to Transform?',
      subtitle: 'Start your free 14-day trial',
      callToAction: {
        text: 'Get Started',
        url: 'https://example.com/signup'
      }
    }
  ]
});

// Save and open
fs.writeFileSync('product-launch.html', result.html);
console.log('Presentation created: product-launch.html');
```

Save this to a file and run it to generate your first multi-slide presentation!

---

**Need help?** See [ERRORS.md](./ERRORS.md) for troubleshooting or [USER-GUIDE.md](./USER-GUIDE.md) for advanced topics.
