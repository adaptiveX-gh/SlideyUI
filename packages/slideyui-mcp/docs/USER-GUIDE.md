# User Guide

Complete guide to using the SlideyUI MCP server with best practices, tools, and advanced patterns.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Available Tools](#available-tools)
3. [Theme System](#theme-system)
4. [Advanced Patterns](#advanced-patterns)
5. [SVG Generation](#svg-generation)
6. [Layout Strategies](#layout-strategies)
7. [Performance Optimization](#performance-optimization)
8. [Best Practices](#best-practices)
9. [Common Workflows](#common-workflows)
10. [Resources](#resources)

---

## Getting Started

### Installation

As MCP Server:
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

Programmatically:
```bash
npm install @slideyui/mcp
```

### Your First Call

**With Claude (via MCP):**
> Create a presentation titled "My First Deck" using the corporate theme with a title slide

**Programmatically:**
```typescript
import { generatePresentation } from '@slideyui/mcp';

const result = await generatePresentation({
  theme: 'corporate',
  title: 'My First Deck',
  slides: [
    {
      type: 'title',
      title: 'Welcome',
      subtitle: 'Let\'s get started'
    }
  ]
});

console.log(result.html); // Your presentation!
```

---

## Available Tools

The MCP server provides 6 tools for presentation creation and customization.

### 1. create_presentation

**Purpose:** Generate a complete presentation from specification.

**Input:**
```typescript
{
  theme: 'corporate' | 'pitch-deck' | 'academic' | 'workshop' | 'startup',
  title: string,
  slides: SlideSpec[],
  options?: GenerationOptions,
  metadata?: PresentationMetadata
}
```

**Output:**
```typescript
{
  html: string,           // Complete HTML presentation
  metadata: {
    slideCount: number,
    theme: Theme,
    generatedAt: string,
    size: number
  },
  warnings?: string[]     // Any validation warnings
}
```

**Example:**
```typescript
const result = await createPresentation({
  theme: 'pitch-deck',
  title: 'Product Launch',
  slides: [
    { type: 'title', title: 'Introducing X', subtitle: 'Coming soon' },
    { type: 'content', title: 'Key Features', content: ['Feature 1', 'Feature 2'] }
  ],
  options: {
    aspectRatio: '16:9',
    fontSize: 'large'
  }
});
```

**Best for:**
- Creating full presentations from scratch
- Generating from templates or examples
- Batch creation of multiple decks

---

### 2. add_slide

**Purpose:** Add a new slide to an existing presentation.

**Input:**
```typescript
{
  html: string,           // Existing presentation HTML
  slide: SlideSpec,       // Slide to add
  position?: number       // Where to insert (default: at end)
}
```

**Output:**
```typescript
{
  html: string,           // Updated presentation HTML
  metadata: {
    slideCount: number,
    // ... other metadata
  }
}
```

**Example:**
```typescript
// Start with existing presentation
let presentation = existingPresentationHtml;

// Add a new slide
const result = await addSlide({
  html: presentation,
  slide: {
    type: 'content',
    title: 'New Content',
    content: ['Added later']
  }
});

presentation = result.html;
```

**Best for:**
- Building presentations incrementally
- Adding slides after initial generation
- Dynamic presentation assembly

---

### 3. update_slide

**Purpose:** Modify an existing slide by position.

**Input:**
```typescript
{
  html: string,           // Current presentation HTML
  slideIndex: number,     // Slide to update (0-based)
  updates: Partial<SlideSpec>  // Fields to update
}
```

**Output:**
```typescript
{
  html: string,           // Updated presentation HTML
  metadata: { /* ... */ }
}
```

**Example:**
```typescript
const result = await updateSlide({
  html: presentation,
  slideIndex: 1,          // Update second slide
  updates: {
    title: 'New Title',
    content: ['Updated content']
  }
});
```

**Best for:**
- Fixing typos in existing slides
- Updating content after generation
- A/B testing different slide variations

---

### 4. export_presentation

**Purpose:** Export presentation in different formats.

**Input (HTML export):**
```typescript
{
  format: 'html',
  html: string,
  filename: string
}
```

**Input (JSON export):**
```typescript
{
  format: 'json',
  presentationData: PresentationSpec,
  filename: string
}
```

**Output:**
```typescript
{
  content: string,        // File content (HTML or JSON)
  filename: string,       // Filename with extension
  size: number
}
```

**Examples:**

Export to HTML file:
```typescript
const result = await exportPresentation({
  format: 'html',
  html: presentationHtml,
  filename: 'my-presentation'
});

// Write to file
fs.writeFileSync(`${result.filename}`, result.content);
```

Export to JSON:
```typescript
const result = await exportPresentation({
  format: 'json',
  presentationData: {
    theme: 'corporate',
    title: 'My Presentation',
    slides: [...]
  },
  filename: 'my-presentation'
});
```

**Best for:**
- Saving presentations to files
- Converting formats
- Archiving presentation data

---

### 5. create_custom_theme

**Purpose:** Create a custom brand-specific theme.

**Input:**
```typescript
{
  name: string,           // Unique theme identifier (lowercase, hyphens)
  displayName: string,    // Human-readable name
  colors: {
    primary: string,      // Required hex color
    secondary?: string,   // Optional hex color
    accent?: string,      // Optional hex color
    background?: string,  // Optional, defaults to white
    foreground?: string,  // Optional, auto-calculated for contrast
    muted?: string,       // Optional, auto-generated
    mutedForeground?: string,
    border?: string
  },
  typography?: TypographyScale,  // Optional custom fonts
  metadata?: {
    author?: string,
    createdAt?: string,
    description?: string,
    tags?: string[]
  }
}
```

**Output:**
```typescript
{
  name: string,
  displayName: string,
  success: boolean,
  message: string
}
```

**Example - Minimal (only primary color):**
```typescript
const result = await createCustomTheme({
  name: 'acme-corp',
  displayName: 'ACME Corporation',
  colors: {
    primary: '#FF5733'
    // Secondary, accent, etc. auto-generate
  }
});
```

**Example - Full customization:**
```typescript
const result = await createCustomTheme({
  name: 'tech-startup',
  displayName: 'TechStartup Brand',
  colors: {
    primary: '#0066CC',
    secondary: '#00CC99',
    accent: '#FF6600',
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    border: '#E0E0E0'
  },
  typography: {
    hero: {
      min: '3rem',
      preferred: '8vw',
      max: '6rem',
      weight: 800,
      lineHeight: 1.1
    },
    h1: {
      min: '2rem',
      preferred: '5vw',
      max: '4rem',
      weight: 700
    }
  },
  metadata: {
    author: 'Design Team',
    description: 'Official brand theme for TechStartup',
    tags: ['brand', 'corporate', 'tech']
  }
});
```

**Best for:**
- Brand consistency
- Custom color schemes
- Organization-specific themes

---

### 6. generate_svg

**Purpose:** Generate SVG graphics for use in presentations.

**Input:**
```typescript
{
  type: 'icon' | 'pattern' | 'chart' | 'diagram' | 'custom',

  // Icon generation
  iconName?: 'briefcase' | 'chart-line' | 'check' | ... (30 icons),

  // Pattern generation
  patternType?: 'dots' | 'grid' | 'waves' | 'blobs' | ... (11 patterns),
  patternDensity?: 'low' | 'medium' | 'high',
  patternOpacity?: number,  // 0-1

  // Chart generation
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter',
  chartData?: ChartData,

  // Custom SVG
  customInstructions?: string,

  // Common options
  width?: number,
  height?: number,
  theme?: Theme,
  style?: 'default' | 'hand-drawn' | 'minimal',
  color?: string,  // Hex color override
  backgroundColor?: string  // Hex color override
}
```

**Output:**
```typescript
{
  svg: string,            // Raw SVG content
  dataUri: string,        // Data URI for <img src={dataUri}>
  width: number,
  height: number
}
```

**Examples:**

Icon:
```typescript
const result = await generateSVG({
  type: 'icon',
  iconName: 'briefcase',
  width: 100,
  height: 100,
  color: '#0066CC'
});
```

Pattern (background):
```typescript
const result = await generateSVG({
  type: 'pattern',
  patternType: 'dots',
  width: 800,
  height: 600,
  patternDensity: 'medium',
  patternOpacity: 0.1,
  backgroundColor: '#FFFFFF'
});
```

Chart (embedded in slide):
```typescript
const result = await generateSVG({
  type: 'chart',
  chartType: 'bar',
  chartData: {
    labels: ['A', 'B', 'C'],
    datasets: [{
      label: 'Values',
      data: [10, 20, 15]
    }]
  },
  theme: 'corporate'
});
```

**Best for:**
- Adding custom graphics to presentations
- Generating background patterns
- Creating unique visual elements

---

## Theme System

### Predefined Themes

5 production-ready themes, each optimized for specific use cases:

#### 1. Corporate
- **Colors:** Professional blues and grays
- **Typography:** Clean sans-serif
- **Best for:** Business presentations, reports, stakeholder meetings
- **Characteristics:** Formal, trustworthy, professional

**Example:**
```typescript
{
  theme: 'corporate',
  title: 'Q4 Financial Review'
}
```

#### 2. Pitch Deck
- **Colors:** Vibrant purples, pinks, oranges
- **Typography:** Modern, bold
- **Best for:** Startup pitches, product launches, investor presentations
- **Characteristics:** Energetic, modern, attention-grabbing

**Example:**
```typescript
{
  theme: 'pitch-deck',
  title: 'Series A Funding Deck'
}
```

#### 3. Academic
- **Colors:** Traditional navy, brown, green
- **Typography:** Academic serif
- **Best for:** Research presentations, conference talks, university lectures
- **Characteristics:** Authoritative, scholarly, formal

**Example:**
```typescript
{
  theme: 'academic',
  title: 'Machine Learning Research'
}
```

#### 4. Workshop
- **Colors:** Bright blues, greens, oranges
- **Typography:** Friendly, approachable
- **Best for:** Training, workshops, team meetings, educational content
- **Characteristics:** Approachable, engaging, friendly

**Example:**
```typescript
{
  theme: 'workshop',
  title: 'Communication Skills Workshop'
}
```

#### 5. Startup
- **Colors:** Modern sky blue, violet, cyan
- **Typography:** Contemporary sans-serif
- **Best for:** Tech startups, product demos, team presentations
- **Characteristics:** Modern, innovative, tech-forward

**Example:**
```typescript
{
  theme: 'startup',
  title: 'AI Innovation Platform'
}
```

### Custom Themes

Create brand-specific themes:

```typescript
const customTheme = await createCustomTheme({
  name: 'my-brand',
  displayName: 'My Brand',
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    accent: '#FFE66D'
  }
});

// Then use in presentation
const result = await createPresentation({
  theme: 'my-brand',  // Use custom theme
  title: 'My Presentation'
});
```

---

## Advanced Patterns

### Pattern 1: Multi-Section Presentations

Organize long presentations with section headers:

```typescript
{
  theme: 'corporate',
  title: 'Annual Business Review',
  slides: [
    // Title
    { type: 'title', title: 'Annual Business Review', date: '2024' },

    // Section 1
    { type: 'section-header', title: 'Financial Performance' },
    { type: 'data', title: 'Revenue', dataType: 'chart', chartType: 'bar', data: {...} },
    { type: 'chart-with-metrics', title: 'Key Metrics', chart: {...}, metrics: [...] },

    // Section 2
    { type: 'section-header', title: 'Strategic Initiatives' },
    { type: 'timeline', title: '2025 Roadmap', events: [...] },
    { type: 'process', title: 'Execution Strategy', steps: [...] },

    // Conclusion
    { type: 'hero', title: 'Forward Together' }
  ]
}
```

**Benefits:**
- Clear narrative structure
- Easy to navigate mentally
- Professional organization

---

### Pattern 2: Problem-Solution-Proof

Effective pitch structure:

```typescript
{
  theme: 'pitch-deck',
  title: 'Product Pitch',
  slides: [
    // Title
    { type: 'hero', title: 'Revolutionary Solution' },

    // Problem (emotional connection)
    {
      type: 'content',
      title: 'The Problem',
      content: [
        'Users spend 3 hours daily on manual tasks',
        'Current solutions lack automation',
        'Time cost: $50K+ per employee annually'
      ]
    },

    // Solution (vision)
    {
      type: 'two-column',
      title: 'Our Solution',
      leftColumn: { type: 'image', content: 'https://...' },
      rightColumn: { type: 'list', content: ['Feature 1', 'Feature 2'] }
    },

    // Proof (credibility)
    {
      type: 'three-column',
      title: 'Traction',
      columns: [
        { heading: 'Users', content: '10K+' },
        { heading: 'Growth', content: '40% MoM' },
        { heading: 'NPS', content: '72' }
      ]
    },

    // Ask (call to action)
    { type: 'content', title: 'The Ask', content: ['$5M Series A'] }
  ]
}
```

---

### Pattern 3: Data-Heavy Report

For metrics and analysis:

```typescript
{
  theme: 'corporate',
  title: 'Q4 Report',
  slides: [
    { type: 'title', title: 'Q4 2024 Report' },

    // Overview with key metrics
    {
      type: 'chart-with-metrics',
      title: 'Executive Summary',
      chart: { type: 'line', data: {...} },
      metrics: [...]
    },

    // Detailed breakdowns
    { type: 'data', title: 'Revenue by Segment', dataType: 'chart', chartType: 'bar', data: {...} },
    { type: 'data', title: 'Customer Breakdown', dataType: 'chart', chartType: 'pie', data: {...} },

    // Analysis
    { type: 'comparison', title: 'YoY Comparison', leftTitle: 'Q4 2023', rightTitle: 'Q4 2024', ... },

    // Takeaways
    { type: 'content', title: 'Key Takeaways', content: [...] }
  ]
}
```

---

### Pattern 4: Comparison-Based Content

For A/B or competitive analysis:

```typescript
{
  type: 'comparison',
  title: 'Before vs After',
  leftTitle: 'Legacy System',
  leftContent: [
    'Manual processes',
    '5 days to complete',
    'Error-prone',
    'No visibility'
  ],
  rightTitle: 'New System',
  rightContent: [
    'Automated workflows',
    '2 hours to complete',
    'Built-in validations',
    'Real-time dashboards'
  ]
}
```

---

## SVG Generation

### Available Icons (30 total)

Business:
- `briefcase` - Work/business
- `chart-line` - Trends
- `chart-bar` - Comparisons
- `pie-chart` - Proportions
- `trend-up` - Growth
- `trend-down` - Decline

Communication:
- `mail` - Email
- `phone` - Telephone
- `message` - Chat/messaging
- `users` - Team/group
- `calendar` - Scheduling

Actions:
- `check` - Success/approve
- `x` - Close/deny
- `arrow-right` - Next/forward
- `arrow-left` - Previous/back
- `plus` - Add
- `minus` - Remove

Media:
- `image` - Images
- `video` - Videos
- `download` - Download
- `upload` - Upload

Status:
- `alert` - Alert
- `info` - Information
- `success` - Success
- `error` - Error
- `warning` - Warning

General:
- `star` - Favorite/rating
- `heart` - Like/favorite
- `settings` - Configuration
- `search` - Search

### Available Patterns (11 total)

- `dots` - Polka dots
- `grid` - Grid lines
- `diagonal-lines` - Diagonal stripes
- `waves` - Wave pattern
- `gradient-mesh` - Mesh gradient
- `chevron` - Chevron pattern
- `hexagon` - Hexagon tiles
- `blobs` - Blob shapes
- `noise` - Noise texture
- `particles` - Particle effect
- `rays` - Radial rays

### SVG in Slides

Use generated SVG in media slides:

```typescript
// Generate SVG first
const iconSvg = await generateSVG({
  type: 'icon',
  iconName: 'chart-line',
  width: 200,
  height: 200,
  color: '#0066CC'
});

// Use in presentation
{
  type: 'media',
  mediaType: 'svg',
  svgContent: iconSvg.svg,
  title: 'Analytics'
}
```

---

## Layout Strategies

### Dense Information (Compact)

For conveying maximum information:

```typescript
{
  type: 'content',
  title: 'All Features',
  content: [
    'Feature 1 - description',
    'Feature 2 - description',
    'Feature 3 - description',
    'Feature 4 - description',
    'Feature 5 - description'
  ],
  layoutDensity: 'compact'
}
```

### Standard (Normal - Default)

For balanced readability:

```typescript
{
  type: 'content',
  title: 'Key Points',
  content: [
    'Point 1 - description',
    'Point 2 - description',
    'Point 3 - description'
  ],
  layoutDensity: 'normal'
}
```

### Spacious Layout

For maximum readability at distance:

```typescript
{
  type: 'content',
  title: 'Important Message',
  content: [
    'Critical information',
    'Action item',
    'Key takeaway'
  ],
  layoutDensity: 'spacious'
}
```

**Guide:**
- **Spacious:** Projection, audience >50 people, critical content
- **Normal:** Standard presentations, audience 10-50 people
- **Compact:** Handouts, printed materials, high information density needed

---

## Performance Optimization

### Minify Output

For smaller file sizes:

```typescript
{
  theme: 'corporate',
  title: 'My Presentation',
  slides: [...],
  options: {
    minify: true  // Reduces CSS and HTML size
  }
}
```

**Impact:** 30-50% size reduction

### Optimize Images

**Use compressed images:**
```typescript
{
  type: 'media',
  mediaType: 'image',
  mediaUrl: 'https://example.com/image-800x600-compressed.jpg'  // Smaller
}
```

**Guidelines:**
- Max 800px width for display images
- Use JPEG for photos (better compression)
- Use PNG for graphics
- Compress before uploading

### Limit Datasets

**For charts, use 2-3 datasets max:**

```typescript
// Good - clear comparison
{
  datasets: [
    { label: 'Revenue', data: [...] },
    { label: 'Target', data: [...] }
  ]
}

// Avoid - too many lines
{
  datasets: [
    { label: 'Revenue', ... },
    { label: 'Target', ... },
    { label: 'Projection', ... },
    { label: 'Industry Average', ... },
    { label: 'Previous Year', ... }
  ]
}
```

### Aggregate Data

**Instead of:**
```typescript
{
  labels: ['Jan 1', 'Jan 2', 'Jan 3', ..., 'Dec 31'],  // 365 data points
  datasets: [{ data: [...] }]
}
```

**Use:**
```typescript
{
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{ data: [...] }]  // 12 data points, easier to read
}
```

---

## Best Practices

### 1. Content Hierarchy

Use slide types to create clear hierarchy:

```typescript
// Level 1: High-level overview
{ type: 'section-header', title: 'Revenue' }

// Level 2: Key metric
{ type: 'chart-with-metrics', title: 'Q4 Performance', ... }

// Level 3: Detailed breakdown
{ type: 'data', title: 'Revenue by Product', ... }
```

### 2. Consistent Styling

Use consistent patterns for related content:

```typescript
// All financial reports use 'corporate' theme
// All pitches use 'pitch-deck' theme
// All academic talks use 'academic' theme
```

### 3. Information Balance

Distribute content evenly:

```typescript
// Bad - first 3 slides full, last 3 empty
[10 items, 8 items, 12 items, 0, 0, 0]

// Good - consistent across all slides
[5 items, 4 items, 6 items, 5 items, 5 items, 4 items]
```

### 4. Visual Variety

Mix slide types to maintain engagement:

```typescript
// Alternate between:
- Text-heavy (content)
- Visual (media/data)
- Text-light (quote/blank)
- Structural (section-header/timeline)
```

### 5. Readability at Distance

Always assume projection:

```typescript
// At 50 feet, 24px = readable
// At 50 feet, 16px = too small
// Use 'large' or 'xlarge' fontSize for distant audiences

{
  options: {
    fontSize: 'xlarge'  // Larger default sizing
  }
}
```

### 6. Color Contrast

Use high contrast:

```typescript
// Good - high contrast
content: 'Dark text on light background'

// Avoid - low contrast
content: 'Light gray text on white background'
```

### 7. Call-to-Action

Include clear next steps:

```typescript
{
  type: 'hero',
  title: 'Ready to Get Started?',
  callToAction: {
    text: 'Visit example.com',
    url: 'https://example.com/signup'
  }
}
```

---

## Common Workflows

### Workflow 1: Generate + Export

```typescript
const result = await createPresentation({
  theme: 'corporate',
  title: 'My Presentation',
  slides: [...]
});

const exported = await exportPresentation({
  format: 'html',
  html: result.html,
  filename: 'my-presentation'
});

fs.writeFileSync(`${exported.filename}`, exported.content);
```

### Workflow 2: Incremental Building

```typescript
let presentation = await createPresentation({
  theme: 'pitch-deck',
  title: 'Pitch Deck',
  slides: [
    { type: 'title', title: 'Intro' }
  ]
});

// Add problem
presentation = await addSlide({
  html: presentation.html,
  slide: { type: 'content', title: 'Problem', content: [...] }
});

// Add solution
presentation = await addSlide({
  html: presentation.html,
  slide: { type: 'content', title: 'Solution', content: [...] }
});
```

### Workflow 3: Template-Based Generation

Use examples as templates:

```typescript
// Fetch business example (via resources)
const businessExample = await resourceRegistry.read('slideyui://examples/business');

// Use as base
const presentation = await createPresentation(businessExample.presentation);

// Update specific slides
const updated = await updateSlide({
  html: presentation.html,
  slideIndex: 0,
  updates: { title: 'My Company Q4 Review' }
});
```

### Workflow 4: Data-Driven Presentations

Generate from data:

```typescript
async function generateReportFromData(data) {
  const slides = [
    { type: 'title', title: data.title },
    {
      type: 'chart-with-metrics',
      title: 'Overview',
      chart: { type: 'line', data: data.chartData },
      metrics: data.metrics
    }
  ];

  // Add detailed breakdown for each metric
  for (const metric of data.metrics) {
    slides.push({
      type: 'data',
      title: metric.label,
      dataType: 'chart',
      chartType: 'bar',
      data: metric.detailed
    });
  }

  return createPresentation({
    theme: 'corporate',
    title: data.title,
    slides
  });
}
```

---

## Resources

### Documentation Files
- [Quick Start](./QUICK-START.md) - 5-minute guide
- [Slide Types](./SLIDE-TYPES.md) - All 16 slide types with examples
- [Errors](./ERRORS.md) - Troubleshooting and common issues
- [API Reference](./API-REFERENCE.md) - Complete schema documentation

### MCP Resources (via resourceRegistry)
- `slideyui://themes` - All available themes
- `slideyui://themes/corporate` - Individual theme details
- `slideyui://templates` - All slide templates
- `slideyui://capabilities` - Server capabilities
- `slideyui://examples` - Example presentations

### Tools
- `create_presentation` - Generate full presentation
- `add_slide` - Add slide to existing presentation
- `update_slide` - Modify existing slide
- `export_presentation` - Export in different formats
- `create_custom_theme` - Create brand theme
- `generate_svg` - Generate SVG graphics

---

**Ready to dive deeper?** See [API-REFERENCE.md](./API-REFERENCE.md) for complete type definitions and schema documentation.
