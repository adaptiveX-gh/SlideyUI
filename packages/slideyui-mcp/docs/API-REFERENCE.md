# API Reference

Complete schema documentation for the SlideyUI MCP API.

## Table of Contents

1. [Core Types](#core-types)
2. [Presentation Structure](#presentation-structure)
3. [Slide Specifications](#slide-specifications)
4. [Generation Options](#generation-options)
5. [Tool Inputs & Outputs](#tool-inputs--outputs)
6. [Theme System](#theme-system)
7. [SVG Generation](#svg-generation)
8. [Validation Rules](#validation-rules)

---

## Core Types

### Theme

Available presentation themes.

```typescript
type Theme =
  | 'corporate'
  | 'pitch-deck'
  | 'academic'
  | 'workshop'
  | 'startup';
```

**Usage:**
```typescript
{
  theme: 'corporate'
}
```

---

### AspectRatio

Slide aspect ratio options.

```typescript
type AspectRatio = '16:9' | '4:3';
```

**Default:** `'16:9'` (widescreen)

**Usage:**
```typescript
{
  options: {
    aspectRatio: '16:9'
  }
}
```

---

### FontSize

Projection-optimized font size presets.

```typescript
type FontSize = 'default' | 'large' | 'xlarge';
```

**Recommendations:**
- `'default'` - Standard presentations, audience <50 people
- `'large'` - Room presentations, audience 50-100 people
- `'xlarge'` - Large auditoriums, audience >100 people

**Usage:**
```typescript
{
  options: {
    fontSize: 'large'
  }
}
```

---

### LayoutDensity

Control spacing and information density.

```typescript
type LayoutDensity = 'compact' | 'normal' | 'spacious';
```

**Meanings:**
- `'compact'` - Minimal spacing, maximum information
- `'normal'` - Balanced spacing and information (default)
- `'spacious'` - Generous spacing, minimal information

**Usage:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: [...],
  layoutDensity: 'spacious'
}
```

---

### CardState

Generation feedback state for cards.

```typescript
type CardState = 'generating' | 'complete' | 'error';
```

**Values:**
- `'generating'` - Currently generating content
- `'complete'` - Generation finished successfully
- `'error'` - Generation encountered an error

**Usage:**
```typescript
{
  type: 'title',
  title: 'My Slide',
  state: 'generating'
}
```

---

## Presentation Structure

### PresentationSpec

Complete presentation specification.

```typescript
interface PresentationSpec {
  theme: Theme;
  title: string;
  slides: SlideSpec[];
  options?: GenerationOptions;
  metadata?: PresentationMetadata;
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `theme` | `Theme` | Yes | Presentation theme |
| `title` | `string` | Yes | Presentation title |
| `slides` | `SlideSpec[]` | Yes | Array of slides (min 1) |
| `options` | `GenerationOptions` | No | Generation configuration |
| `metadata` | `PresentationMetadata` | No | Presentation metadata |

**Example:**
```typescript
{
  theme: 'corporate',
  title: 'Q4 Review',
  slides: [
    {
      type: 'title',
      title: 'Q4 2024 Review',
      subtitle: 'Financial Update'
    }
  ],
  metadata: {
    author: 'Finance Team',
    date: '2024-12-20'
  }
}
```

---

### PresentationMetadata

Presentation metadata and context.

```typescript
interface PresentationMetadata {
  author?: string;
  date?: string;
  version?: string;
  description?: string;
  tags?: string[];
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `author` | `string` | Presentation creator |
| `date` | `string` | Creation or publication date |
| `version` | `string` | Version identifier |
| `description` | `string` | Presentation description |
| `tags` | `string[]` | Categorization tags |

**Example:**
```typescript
{
  author: 'Executive Team',
  date: '2024-12-20',
  version: '2.0',
  description: 'Quarterly financial review',
  tags: ['quarterly', 'financial', 'corporate']
}
```

---

### GenerationOptions

Options for presentation generation.

```typescript
interface GenerationOptions {
  aspectRatio?: AspectRatio;
  fontSize?: FontSize;
  layoutDensity?: LayoutDensity;
  preset?: DesignPreset;
  minify?: boolean;
  includeSlideyUICSS?: boolean;
  embedFonts?: boolean;
  theme?: Theme;
}
```

**Fields:**

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `aspectRatio` | `AspectRatio` | `'16:9'` | Slide ratio |
| `fontSize` | `FontSize` | `'default'` | Font size preset |
| `layoutDensity` | `LayoutDensity` | `'normal'` | Content spacing |
| `preset` | `string` | None | Custom design preset |
| `minify` | `boolean` | `false` | Minify output CSS |
| `includeSlideyUICSS` | `boolean` | `true` | Include SlideyUI styles |
| `embedFonts` | `boolean` | `false` | Embed web fonts |
| `theme` | `Theme` | None | Override presentation theme |

**Example:**
```typescript
{
  aspectRatio: '16:9',
  fontSize: 'large',
  layoutDensity: 'spacious',
  minify: true
}
```

---

### GenerationResult

Result of presentation generation.

```typescript
interface GenerationResult {
  html: string;
  metadata: {
    slideCount: number;
    theme: Theme;
    generatedAt: string;
    size: number;
  };
  warnings?: string[];
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `html` | `string` | Complete HTML presentation |
| `metadata.slideCount` | `number` | Total number of slides |
| `metadata.theme` | `Theme` | Theme used |
| `metadata.generatedAt` | `string` | ISO 8601 timestamp |
| `metadata.size` | `number` | HTML size in bytes |
| `warnings` | `string[]` | Optional validation warnings |

**Example:**
```typescript
{
  html: '<html>...</html>',
  metadata: {
    slideCount: 5,
    theme: 'corporate',
    generatedAt: '2024-12-20T15:30:00Z',
    size: 150000
  }
}
```

---

## Slide Specifications

All slide types inherit from `BaseSlideSpec`:

```typescript
interface BaseSlideSpec {
  type: SlideType;
  id?: string;
  notes?: string;
  state?: CardState;
}
```

**Common fields for all slides:**

| Field | Type | Description |
|-------|------|-------------|
| `type` | `SlideType` | Slide type identifier |
| `id` | `string` | Optional slide identifier |
| `notes` | `string` | Speaker notes (not displayed) |
| `state` | `CardState` | Generation feedback state |

### TitleSlideSpec

Opening slide with title, subtitle, author, and date.

```typescript
interface TitleSlideSpec extends BaseSlideSpec {
  type: 'title';
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'title'` | Yes | Slide type |
| `title` | `string` | Yes | Main title |
| `subtitle` | `string` | No | Subtitle or tagline |
| `author` | `string` | No | Presentation author |
| `date` | `string` | No | Date or version |

**Example:**
```typescript
{
  type: 'title',
  title: 'Q4 2024 Business Review',
  subtitle: 'Strategic Performance & Financial Update',
  author: 'Executive Team',
  date: 'December 2024'
}
```

---

### ContentSlideSpec

Bullet points and text content.

```typescript
interface ContentSlideSpec extends BaseSlideSpec {
  type: 'content';
  title: string;
  content: string[] | string;
  layout?: 'single-column' | 'two-column';
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'content'` | Yes | Slide type |
| `title` | `string` | Yes | Slide title |
| `content` | `string[]` | Yes | Content items (always array) |
| `layout` | `'single-column' \| 'two-column'` | No | Content layout |

**Important:** Content must always be an array:
```typescript
// Correct
content: ['Item 1', 'Item 2']

// Wrong - will fail
content: 'Item 1'
```

**Example:**
```typescript
{
  type: 'content',
  title: 'Key Features',
  content: [
    'AI-powered automation',
    '70% time savings',
    'Easy integration',
    '24/7 support'
  ],
  layout: 'single-column'
}
```

---

### HeroSlideSpec

Full-screen impact slide.

```typescript
interface HeroSlideSpec extends BaseSlideSpec {
  type: 'hero';
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  callToAction?: {
    text: string;
    url?: string;
  };
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'hero'` | Yes | Slide type |
| `title` | `string` | Yes | Large title text |
| `subtitle` | `string` | No | Supporting text |
| `backgroundImage` | `string` | No | Background image URL |
| `backgroundGradient` | `string` | No | CSS gradient |
| `callToAction` | `{text, url?}` | No | CTA button |

**Example:**
```typescript
{
  type: 'hero',
  title: 'Transforming Team Collaboration',
  subtitle: 'The AI-powered workspace for modern teams',
  backgroundImage: 'https://example.com/hero-bg.jpg',
  callToAction: {
    text: 'Get Started',
    url: 'https://example.com/signup'
  }
}
```

---

### SectionHeaderSlideSpec

Chapter break and section introduction.

```typescript
interface SectionHeaderSlideSpec extends BaseSlideSpec {
  type: 'section-header';
  title: string;
  subtitle?: string;
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'section-header'` | Yes | Slide type |
| `title` | `string` | Yes | Section title |
| `subtitle` | `string` | No | Section description |

**Example:**
```typescript
{
  type: 'section-header',
  title: 'Financial Performance',
  subtitle: 'Revenue, growth, and key metrics'
}
```

---

### QuoteSlideSpec

Pull quote or testimonial.

```typescript
interface QuoteSlideSpec extends BaseSlideSpec {
  type: 'quote';
  quote: string;
  author: string;
  context?: string;
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'quote'` | Yes | Slide type |
| `quote` | `string` | Yes | Quote text |
| `author` | `string` | Yes | Quote attribution |
| `context` | `string` | No | Author title/company |

**Example:**
```typescript
{
  type: 'quote',
  quote: 'This tool transformed how our team collaborates. We\'re now 3x more productive.',
  author: 'Sarah Chen',
  context: 'VP Product, TechCorp'
}
```

---

### TwoColumnSlideSpec

Split slide with left and right columns.

```typescript
interface TwoColumnSlideSpec extends BaseSlideSpec {
  type: 'two-column';
  title?: string;
  leftColumn: {
    type: 'text' | 'image' | 'list';
    content: string | string[];
  };
  rightColumn: {
    type: 'text' | 'image' | 'list';
    content: string | string[];
  };
  columnRatio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70';
  layoutDensity?: LayoutDensity;
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'two-column'` | Yes | Slide type |
| `title` | `string` | No | Slide title |
| `leftColumn` | `Column` | Yes | Left column config |
| `rightColumn` | `Column` | Yes | Right column config |
| `columnRatio` | `string` | No | Column width ratio |
| `layoutDensity` | `LayoutDensity` | No | Content spacing |

**Column config:**
```typescript
interface Column {
  type: 'text' | 'image' | 'list';
  content: string | string[];
}
```

**Content rules:**
- `type: 'text'` or `'list'` → content must be `string[]`
- `type: 'image'` → content must be single `string` (URL)

**Example:**
```typescript
{
  type: 'two-column',
  title: 'Our Solution',
  leftColumn: {
    type: 'image',
    content: 'https://example.com/product.jpg'
  },
  rightColumn: {
    type: 'list',
    content: [
      'AI-powered automation',
      '70% time savings',
      'Easy integration'
    ]
  },
  columnRatio: '50-50'
}
```

---

### ThreeColumnSlideSpec

Three-way split slide.

```typescript
interface ThreeColumnSlideSpec extends BaseSlideSpec {
  type: 'three-column';
  title?: string;
  columns: [Column, Column, Column];
  layoutDensity?: LayoutDensity;
}

interface Column {
  heading?: string;
  icon?: string;
  content: string | string[];
}
```

**Example:**
```typescript
{
  type: 'three-column',
  title: 'Success Metrics',
  columns: [
    {
      heading: 'Growth',
      icon: '📈',
      content: [
        'Revenue: $3.2M',
        'Year-over-year: +52%'
      ]
    },
    {
      heading: 'Team',
      icon: '👥',
      content: [
        'Headcount: 45',
        'Locations: 3'
      ]
    },
    {
      heading: 'Impact',
      icon: '🌟',
      content: [
        'Hours saved: 50K+',
        'NPS Score: 72'
      ]
    }
  ]
}
```

---

### FourColumnSlideSpec

Four-way split slide.

```typescript
interface FourColumnSlideSpec extends BaseSlideSpec {
  type: 'four-column';
  title?: string;
  columns: [Column, Column, Column, Column];
  layoutDensity?: LayoutDensity;
}

interface Column {
  heading?: string;
  icon?: string;
  content: string;  // Single string, not array
}
```

**Important:** In four-column, content is a single string, not an array:

```typescript
// Correct - single string per column
content: 'Description text'

// Wrong - array not supported
content: ['Item 1', 'Item 2']
```

**Example:**
```typescript
{
  type: 'four-column',
  title: 'Communication Styles',
  columns: [
    {
      heading: 'Direct',
      icon: '🎯',
      content: 'Clear, concise communication'
    },
    {
      heading: 'Analytical',
      icon: '📊',
      content: 'Data-driven, detailed approach'
    },
    {
      heading: 'Supportive',
      icon: '🤝',
      content: 'Empathetic, collaborative'
    },
    {
      heading: 'Expressive',
      icon: '✨',
      content: 'Enthusiastic, creative'
    }
  ]
}
```

---

### DataSlideSpec

Tables and charts.

```typescript
interface DataSlideSpec extends BaseSlideSpec {
  type: 'data';
  title: string;
  data: Record<string, unknown>[] | string[][] | ChartData;
  dataType: 'table' | 'chart';
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter';
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
  }>;
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'data'` | Yes | Slide type |
| `title` | `string` | Yes | Slide title |
| `data` | See below | Yes | Data content |
| `dataType` | `'table' \| 'chart'` | Yes | Display type |
| `chartType` | `ChartType` | When chart | Chart type |

**Supported chart types:**
- `'bar'` - Bar chart
- `'line'` - Line chart
- `'area'` - Area chart
- `'pie'` - Pie chart
- `'doughnut'` - Doughnut chart
- `'scatter'` - Scatter plot

**Example - Bar Chart:**
```typescript
{
  type: 'data',
  title: 'Quarterly Revenue',
  dataType: 'chart',
  chartType: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 58000, 65000]
      },
      {
        label: 'Expenses',
        data: [32000, 35000, 38000, 40000]
      }
    ]
  }
}
```

---

### ChartWithMetricsSlideSpec

Chart with key performance indicators.

```typescript
interface ChartWithMetricsSlideSpec extends BaseSlideSpec {
  type: 'chart-with-metrics';
  title: string;
  chart: {
    type: 'line' | 'bar' | 'pie' | 'area';
    data: Record<string, unknown>;
  };
  metrics: Array<{
    label: string;
    value: string | number;
    change?: {
      value: number;
      direction: 'up' | 'down';
    };
  }>;
  layout?: 'chart-left' | 'chart-right' | 'chart-top';
}
```

**Fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `'chart-with-metrics'` | Yes | Slide type |
| `title` | `string` | Yes | Slide title |
| `chart` | `{type, data}` | Yes | Chart configuration |
| `metrics` | `Metric[]` | Yes | KPI metrics (min 1) |
| `layout` | `'chart-left' \| 'chart-right' \| 'chart-top'` | No | Chart position |

**Metric config:**
```typescript
interface Metric {
  label: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

**Example:**
```typescript
{
  type: 'chart-with-metrics',
  title: 'Q4 Performance',
  chart: {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [{
        label: 'Revenue',
        data: [2.1, 2.4, 2.8, 3.2]
      }]
    }
  },
  metrics: [
    {
      label: 'Total Revenue',
      value: '$3.2M',
      change: { value: 14, direction: 'up' }
    },
    {
      label: 'Growth Rate',
      value: '52%',
      change: { value: 8, direction: 'up' }
    }
  ],
  layout: 'chart-left'
}
```

---

### TimelineSlideSpec

Sequential events or milestones.

```typescript
interface TimelineSlideSpec extends BaseSlideSpec {
  type: 'timeline';
  title: string;
  events: Array<{
    date: string;
    title: string;
    description?: string;
  }>;
  orientation?: 'horizontal' | 'vertical';
}
```

**Example:**
```typescript
{
  type: 'timeline',
  title: '2025 Roadmap',
  events: [
    {
      date: 'January',
      title: 'Platform 2.0',
      description: 'Major platform upgrade'
    },
    {
      date: 'February',
      title: 'API Launch',
      description: 'Public API release'
    }
  ],
  orientation: 'horizontal'
}
```

---

### ProcessSlideSpec

Step-by-step workflow.

```typescript
interface ProcessSlideSpec extends BaseSlideSpec {
  type: 'process';
  title: string;
  steps: Array<{
    title: string;
    description?: string;
  }>;
  layout?: 'horizontal' | 'vertical' | 'grid';
}
```

**Example:**
```typescript
{
  type: 'process',
  title: 'Onboarding Process',
  steps: [
    {
      title: 'Sign Up',
      description: 'Create your account'
    },
    {
      title: 'Configure',
      description: 'Set up workspace'
    },
    {
      title: 'Launch',
      description: 'Start using'
    }
  ],
  layout: 'horizontal'
}
```

---

### ComparisonSlideSpec

Side-by-side comparison.

```typescript
interface ComparisonSlideSpec extends BaseSlideSpec {
  type: 'comparison';
  title: string;
  leftTitle: string;
  leftContent: string[];
  rightTitle: string;
  rightContent: string[];
}
```

**Example:**
```typescript
{
  type: 'comparison',
  title: 'Before vs After',
  leftTitle: 'Legacy System',
  leftContent: [
    'Manual processes',
    '5 days to complete',
    'Error-prone'
  ],
  rightTitle: 'New System',
  rightContent: [
    'Automated workflows',
    '2 hours to complete',
    'Built-in validations'
  ]
}
```

---

### MediaSlideSpec

Images, videos, or embedded content.

```typescript
interface MediaSlideSpec extends BaseSlideSpec {
  type: 'media';
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'embed' | 'svg';
  svgContent?: string;
  caption?: string;
  layout?: 'contained' | 'hero' | 'hero-card' | 'split' | 'full-bleed';
  overlay?: OverlayConfig;
  textStyle?: TextStyleConfig;
  print?: PrintConfig;
  loading?: LoadingConfig;
  responsive?: ResponsiveConfig;
  video?: VideoConfig;
}
```

**Example - Image:**
```typescript
{
  type: 'media',
  mediaType: 'image',
  mediaUrl: 'https://example.com/product.jpg',
  caption: 'Our flagship product',
  layout: 'contained'
}
```

**Example - Video:**
```typescript
{
  type: 'media',
  mediaType: 'video',
  mediaUrl: 'https://example.com/demo.mp4',
  video: {
    autoplay: true,
    muted: true,
    controls: false,
    loop: true
  }
}
```

---

### ProductOverviewSlideSpec

Product showcase with features and pricing.

```typescript
interface ProductOverviewSlideSpec extends BaseSlideSpec {
  type: 'product-overview';
  title: string;
  productImage?: string;
  description?: string;
  features: string[];
  pricing?: {
    price: string;
    period?: string;
    cta?: string;
  };
  layout?: 'image-left' | 'image-right' | 'image-top';
}
```

**Example:**
```typescript
{
  type: 'product-overview',
  title: 'Professional Plan',
  description: 'Everything your team needs',
  productImage: 'https://example.com/product.jpg',
  features: [
    'Unlimited team members',
    'AI-powered insights',
    'Priority support'
  ],
  pricing: {
    price: '$29',
    period: 'per user/month',
    cta: 'Start 14-day trial'
  },
  layout: 'image-left'
}
```

---

### BlankSlideSpec

Empty canvas for custom content.

```typescript
interface BlankSlideSpec extends BaseSlideSpec {
  type: 'blank';
  content?: string;
}
```

**Example:**
```typescript
{
  type: 'blank',
  content: 'Custom content here'
}
```

---

## Theme System

### CustomTheme

Brand-specific theme configuration.

```typescript
interface CustomTheme {
  name: string;
  displayName: string;
  colors: {
    primary: string;
    secondary?: string;
    accent?: string;
    background?: string;
    foreground?: string;
    muted?: string;
    mutedForeground?: string;
    border?: string;
  };
  typography?: TypographyScale;
  metadata?: {
    author?: string;
    createdAt?: string;
    description?: string;
    tags?: string[];
  };
}
```

**Validation Rules:**
- `name`: Lowercase alphanumeric with hyphens only (`[a-z0-9]+(-[a-z0-9]+)*`)
- `colors.primary`: Hex color required (`#RRGGBB`)
- Other colors: Hex format optional (auto-generated if not provided)

**Example:**
```typescript
{
  name: 'acme-corp',
  displayName: 'ACME Corporation',
  colors: {
    primary: '#FF5733',
    secondary: '#33C4FF',
    accent: '#FFC300'
  },
  typography: {
    hero: {
      min: '3rem',
      preferred: '8vw',
      max: '6rem',
      weight: 800,
      lineHeight: 1.1
    }
  },
  metadata: {
    author: 'Design Team',
    description: 'Official ACME brand colors',
    tags: ['corporate', 'brand']
  }
}
```

---

### TypographyScale

Custom typography configuration.

```typescript
interface TypographyScale {
  hero?: TypographyScaleLevel;
  h1?: TypographyScaleLevel;
  h2?: TypographyScaleLevel;
  h3?: TypographyScaleLevel;
  body?: TypographyScaleLevel;
  caption?: TypographyScaleLevel;
}

interface TypographyScaleLevel {
  min?: string;        // Minimum font size
  preferred?: string;  // Preferred font size (often relative unit)
  max?: string;        // Maximum font size
  weight?: number;     // Font weight (400-900)
  lineHeight?: number; // Line height multiplier
}
```

**Example:**
```typescript
{
  hero: {
    min: '3rem',
    preferred: '8vw',
    max: '6rem',
    weight: 800,
    lineHeight: 1.1
  },
  body: {
    min: '1rem',
    preferred: '1.2rem',
    max: '1.5rem',
    weight: 400,
    lineHeight: 1.6
  }
}
```

---

## SVG Generation

### SVGGenerationSpec

Configuration for SVG generation.

```typescript
interface SVGGenerationSpec {
  type: 'icon' | 'pattern' | 'chart' | 'diagram' | 'custom';

  // Icon
  iconName?: IconName;

  // Pattern
  patternType?: PatternType;
  patternDensity?: 'low' | 'medium' | 'high';
  patternOpacity?: number;

  // Chart
  chartType?: 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter';
  chartData?: ChartData;

  // Custom
  customInstructions?: string;

  // Common
  width?: number;
  height?: number;
  theme?: Theme;
  style?: 'default' | 'hand-drawn' | 'minimal';
  color?: string;
  backgroundColor?: string;
}
```

**Icon Names (30 total):**

Business:
- `'briefcase'`, `'chart-line'`, `'chart-bar'`, `'pie-chart'`, `'trend-up'`, `'trend-down'`

Communication:
- `'mail'`, `'phone'`, `'message'`, `'users'`, `'calendar'`

Actions:
- `'check'`, `'x'`, `'arrow-right'`, `'arrow-left'`, `'plus'`, `'minus'`

Media:
- `'image'`, `'video'`, `'download'`, `'upload'`

Status:
- `'alert'`, `'info'`, `'success'`, `'error'`, `'warning'`

General:
- `'star'`, `'heart'`, `'settings'`, `'search'`

**Pattern Types (11 total):**
- `'dots'`, `'grid'`, `'diagonal-lines'`, `'waves'`, `'gradient-mesh'`, `'chevron'`, `'hexagon'`, `'blobs'`, `'noise'`, `'particles'`, `'rays'`

**Example - Icon:**
```typescript
{
  type: 'icon',
  iconName: 'chart-line',
  width: 200,
  height: 200,
  color: '#0066CC',
  style: 'default'
}
```

**Example - Pattern:**
```typescript
{
  type: 'pattern',
  patternType: 'dots',
  width: 800,
  height: 600,
  patternDensity: 'medium',
  patternOpacity: 0.1,
  backgroundColor: '#FFFFFF'
}
```

---

## Validation Rules

### Content Field

**Rule:** Must always be an array, even for single items.

```typescript
// Valid
content: ['Single item']
content: ['Item 1', 'Item 2', 'Item 3']

// Invalid
content: 'Single item'  // Error
content: undefined      // Error
```

### Colors

**Rule:** Must be valid hex colors in format `#RRGGBB`

```typescript
// Valid
'#0066CC'    // Blue
'#FF5733'    // Red
'#00ff00'    // Green (lowercase OK)

// Invalid
'#fff'       // Too short
'blue'       // Named colors not allowed
'rgb(0,0,255)'  // RGB format not allowed
```

### Theme Names

**Rule:** Lowercase alphanumeric with hyphens only

```typescript
// Valid custom theme names
'my-theme'
'brand-2024'
'tech-startup'

// Invalid
'MyTheme'    // Uppercase not allowed
'my_theme'   // Underscores not allowed
'my.theme'   // Dots not allowed
'corporate'  // Reserved theme name
```

### Data Point Count

**Rule:** Number of data points must match labels count

```typescript
// Valid
{
  labels: ['Q1', 'Q2', 'Q3'],
  datasets: [{
    data: [100, 200, 300]  // 3 items match 3 labels
  }]
}

// Invalid
{
  labels: ['Q1', 'Q2', 'Q3'],
  datasets: [{
    data: [100, 200]  // Only 2 items for 3 labels!
  }]
}
```

### Minimum Array Lengths

- `slides`: Minimum 1 slide per presentation
- `datasets`: Minimum 1 dataset per chart
- `metrics`: Minimum 1 metric for chart-with-metrics
- `events`: Minimum 0 events (optional)
- `steps`: Minimum 0 steps (optional)

---

**For detailed usage examples, see [USER-GUIDE.md](./USER-GUIDE.md) and [SLIDE-TYPES.md](./SLIDE-TYPES.md).**
