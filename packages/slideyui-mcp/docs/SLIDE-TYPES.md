# Slide Types Reference

Complete documentation of all 16 slide types with examples, layouts, and use cases.

## Table of Contents

- [Title & Impact Slides](#title--impact-slides)
  - [Title](#title)
  - [Hero](#hero)
  - [Section Header](#section-header)
- [Content Slides](#content-slides)
  - [Content](#content)
  - [Quote](#quote)
  - [Blank](#blank)
- [Layout Slides](#layout-slides)
  - [Two-Column](#two-column)
  - [Three-Column](#three-column)
  - [Four-Column](#four-column)
- [Data & Metrics](#data--metrics)
  - [Data](#data)
  - [Chart with Metrics](#chart-with-metrics)
- [Process & Timeline](#process--timeline)
  - [Timeline](#timeline)
  - [Process](#process)
  - [Comparison](#comparison)
- [Media & Products](#media--products)
  - [Media](#media)
  - [Product Overview](#product-overview)

---

## Title & Impact Slides

### Title

**Description:** The opening slide of your presentation. Perfect for introducing the topic, author, and date.

**Type:** `'title'`

**Required Fields:**
- `title: string` - Main presentation title

**Optional Fields:**
- `subtitle?: string` - Subtitle or tagline
- `author?: string` - Presentation author
- `date?: string` - Date or version info

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

**Visual Layout:**

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│    Q4 2024 Business Review              │
│    Strategic Performance & Financial    │
│    Update                               │
│                                         │
│                                         │
│    Executive Team                       │
│    December 2024                        │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Opening slide for any presentation
- Conference talk introductions
- Meeting agendas
- Report title pages

**Best Practices:**
- Keep title concise (5-7 words)
- Use subtitle to provide context
- Include author for credibility
- Date helps track presentation version

---

### Hero

**Description:** Full-screen impact slide with large title, optional background image, and call-to-action. Perfect for attention-grabbing moments.

**Type:** `'hero'`

**Required Fields:**
- `title: string` - Large display text

**Optional Fields:**
- `subtitle?: string` - Supporting text below title
- `backgroundImage?: string` - Hero background image URL
- `backgroundGradient?: string` - CSS gradient override
- `callToAction?: { text: string; url?: string }` - CTA button

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

**Visual Layout:**

```
┌─────────────────────────────────────────┐
│    (Background Image)                   │
│                                         │
│                                         │
│    Transforming Team Collaboration      │
│                                         │
│    The AI-powered workspace for         │
│    modern teams                         │
│                                         │
│         [Get Started]                   │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Section breaks in presentations
- Call-to-action moments
- Product launch announcements
- Pitch deck opening/closing
- Conference talk climax

**Best Practices:**
- Use high-quality, relevant background images
- Keep text short and punchy
- Include CTA when appropriate
- Test readability over background

---

### Section Header

**Description:** Visual divider and new section introduction. Simpler than Hero, used to organize presentation flow.

**Type:** `'section-header'`

**Required Fields:**
- `title: string` - Section title

**Optional Fields:**
- `subtitle?: string` - Section description

**Example:**

```typescript
{
  type: 'section-header',
  title: 'Financial Performance',
  subtitle: 'Revenue, growth, and key metrics'
}
```

**Visual Layout:**

```
┌─────────────────────────────────────────┐
│                                         │
│                                         │
│    Financial Performance                │
│                                         │
│    Revenue, growth, and key metrics     │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Breaking presentation into chapters
- Transitioning between topics
- Organizing long presentations
- Visual section breaks

**Best Practices:**
- Use consistently throughout presentation
- Keep titles to 2-4 words
- Match section structure to outline
- Use before major topic shifts

---

## Content Slides

### Content

**Description:** The workhorse slide. Perfect for bullet points, lists, and text content. Projection-optimized with readable font sizes.

**Type:** `'content'`

**Required Fields:**
- `title: string` - Slide title
- `content: string[]` - Array of content items (always array, even for single item)

**Optional Fields:**
- `layout?: 'single-column' | 'two-column'` - Content layout (default: single-column)
- `layoutDensity?: 'compact' | 'normal' | 'spacious'` - Spacing between items

**Important:** Content must ALWAYS be an array:

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
    'AI-powered automation saves 3+ hours daily',
    'Integrates with 500+ business tools',
    'Enterprise-grade security and compliance',
    'Dedicated support team'
  ],
  layoutDensity: 'spacious'
}
```

**Visual Layout (single-column):**

```
┌─────────────────────────────────────────┐
│ Key Features                            │
│                                         │
│ • AI-powered automation saves 3+ hours  │
│   daily                                 │
│                                         │
│ • Integrates with 500+ business tools   │
│                                         │
│ • Enterprise-grade security and         │
│   compliance                            │
│                                         │
│ • Dedicated support team                │
└─────────────────────────────────────────┘
```

**Visual Layout (two-column):**

```
┌─────────────────────────────────────────┐
│ Key Features                            │
│                                         │
│ • Feature 1        │ • Feature 3        │
│                    │                    │
│ • Feature 2        │ • Feature 4        │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Key points or feature lists
- Agenda slides
- Discussion points
- Summary slides
- Step-by-step instructions

**Best Practices:**
- Keep bullets concise (1-2 lines each)
- Use 3-5 bullets for readability
- Avoid over-elaboration in bullet text
- Use consistent formatting
- Two-column for comparative lists

---

### Quote

**Description:** Pull quote or testimonial slide. Great for adding credibility and breaking up content slides.

**Type:** `'quote'`

**Required Fields:**
- `quote: string` - The quote text
- `author: string` - Who said it

**Optional Fields:**
- `context?: string` - Additional context (title, company, etc.)

**Example:**

```typescript
{
  type: 'quote',
  quote: 'This tool transformed how our team collaborates. We\'re now 3x more productive.',
  author: 'Sarah Chen',
  context: 'VP Product, TechCorp'
}
```

**Visual Layout:**

```
┌─────────────────────────────────────────┐
│                                         │
│    "This tool transformed how our       │
│     team collaborates. We're now        │
│     3x more productive."                │
│                                         │
│                           — Sarah Chen  │
│                             VP Product, │
│                             TechCorp    │
│                                         │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Customer testimonials
- Expert quotes
- Powerful statements
- Adding variety to content
- Building credibility

**Best Practices:**
- Use quotes that support your message
- Include attribution for credibility
- Keep quote under 2-3 sentences
- Use real quotes when possible

---

### Blank

**Description:** Empty canvas for custom content. Useful for creating unique layouts or custom designs.

**Type:** `'blank'`

**Optional Fields:**
- `content?: string` - Optional content (custom HTML-safe text)

**Example:**

```typescript
{
  type: 'blank',
  content: 'Custom content here'
}
```

**Visual Layout:**

```
┌─────────────────────────────────────────┐
│                                         │
│    (Empty slide - use for custom        │
│     content or designs)                 │
│                                         │
│                                         │
│                                         │
│                                         │
│                                         │
└─────────────────────────────────────────┘
```

**Use Cases:**
- Custom layouts
- Image-only slides
- Breathing room in presentation
- Creative freedom
- Animation placeholders

---

## Layout Slides

### Two-Column

**Description:** Split slide into left and right columns. Each column can contain text, lists, or images.

**Type:** `'two-column'`

**Required Fields:**
- `leftColumn: { type: 'text' | 'image' | 'list'; content: string | string[] }`
- `rightColumn: { type: 'text' | 'image' | 'list'; content: string | string[] }`

**Optional Fields:**
- `title?: string` - Optional slide title
- `columnRatio?: '50-50' | '60-40' | '40-60' | '70-30' | '30-70'` - Column width ratio (default: 50-50)
- `layoutDensity?: 'compact' | 'normal' | 'spacious'` - Spacing

**Important:** Even single items must be in arrays:

```typescript
// For content: 'text', 'list' - always use array
content: ['Item 1', 'Item 2']

// For content: 'image' - use single URL string
content: 'https://example.com/image.jpg'
```

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
      'Easy integration',
      '24/7 support'
    ]
  },
  columnRatio: '50-50'
}
```

**Visual Layout (50-50):**

```
┌────────────────────┬────────────────────┐
│ Our Solution       │                    │
├────────────────────┼────────────────────┤
│                    │ • AI-powered       │
│                    │   automation       │
│   [Product]        │                    │
│    Image           │ • 70% time         │
│                    │   savings          │
│                    │                    │
│                    │ • Easy             │
│                    │   integration      │
│                    │                    │
│                    │ • 24/7 support     │
└────────────────────┴────────────────────┘
```

**Visual Layout (60-40):**

```
┌──────────────────────────┬──────────────┐
│        Image             │ • Point 1    │
│        (60%)             │              │
│                          │ • Point 2    │
│                          │              │
│                          │ • Point 3    │
└──────────────────────────┴──────────────┘
```

**Use Cases:**
- Product + description
- Process + results
- Problem + solution
- Image + explanation
- Comparison layouts

**Best Practices:**
- Match column ratio to content balance
- Use images on left for left-to-right reading flow
- Keep text lists to 3-5 items
- Ensure text fits at projection size

---

### Three-Column

**Description:** Divide slide into three equal columns. Great for comparing options or showing progression.

**Type:** `'three-column'`

**Required Fields:**
- `columns: [Column, Column, Column]` - Three column objects with this structure:
  - `content: string | string[]` - Column content (required)
  - `heading?: string` - Column heading
  - `icon?: string` - Optional emoji or icon

**Optional Fields:**
- `title?: string` - Slide title
- `layoutDensity?: 'compact' | 'normal' | 'spacious'` - Spacing

**Example:**

```typescript
{
  type: 'three-column',
  title: 'Our Success Metrics',
  columns: [
    {
      heading: 'Growth',
      icon: '📈',
      content: [
        'Revenue: $3.2M',
        'Year-over-year: +52%',
        'Customers: 1,200+'
      ]
    },
    {
      heading: 'Team',
      icon: '👥',
      content: [
        'Headcount: 45',
        'Locations: 3',
        'Satisfaction: 4.8/5'
      ]
    },
    {
      heading: 'Impact',
      icon: '🌟',
      content: [
        'Hours saved: 50K+',
        'NPS Score: 72',
        'Retention: 95%'
      ]
    }
  ]
}
```

**Visual Layout:**

```
┌──────────────┬──────────────┬──────────────┐
│ Our Success Metrics                       │
├──────────────┼──────────────┼──────────────┤
│ 📈 Growth    │ 👥 Team     │ 🌟 Impact   │
│              │              │              │
│ • Revenue:   │ • Headcount: │ • Hours      │
│   $3.2M      │   45         │   saved:     │
│              │              │   50K+       │
│ • Year-over- │ • Locations: │              │
│   year:      │   3          │ • NPS Score: │
│   +52%       │              │   72         │
│              │ • Satisfaction
│ • Customers: │   4.8/5      │ • Retention: │
│   1,200+     │              │   95%        │
└──────────────┴──────────────┴──────────────┘
```

**Use Cases:**
- Three-way comparisons
- Sequential steps
- Team/department breakdowns
- Metrics dashboards
- Feature highlights (3 features)
- Success traction

**Best Practices:**
- Use emojis to visually differentiate columns
- Keep content balanced across columns
- 2-4 items per column for readability
- Ensure column headings are parallel structure

---

### Four-Column

**Description:** Divide slide into four equal columns. Perfect for showing four options, features, or quadrants.

**Type:** `'four-column'`

**Required Fields:**
- `columns: [Column, Column, Column, Column]` - Four column objects with this structure:
  - `content: string` - Column content (single string, no array)
  - `heading?: string` - Column heading
  - `icon?: string` - Optional emoji or icon

**Optional Fields:**
- `title?: string` - Slide title
- `layoutDensity?: 'compact' | 'normal' | 'spacious'` - Spacing

**Important:** In four-column, content is a single string, not an array:

```typescript
// Correct - single string
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
      content: 'Clear, concise, to-the-point communication'
    },
    {
      heading: 'Analytical',
      icon: '📊',
      content: 'Data-driven, detailed, logical approach'
    },
    {
      heading: 'Supportive',
      icon: '🤝',
      content: 'Empathetic, collaborative, warm interaction'
    },
    {
      heading: 'Expressive',
      icon: '✨',
      content: 'Enthusiastic, creative, engaging presentation'
    }
  ]
}
```

**Visual Layout:**

```
┌────────┬────────┬────────┬────────┐
│ Communication Styles               │
├────────┼────────┼────────┼────────┤
│ 🎯     │ 📊     │ 🤝     │ ✨     │
│ Direct │ Anal.  │ Support│Express │
│        │        │        │        │
│ Clear, │ Data-  │ Empath │ Enthus │
│ concis │ driven │etic,   │ iastic,│
│ e,     │ detail │ collab │creative│
│ to-the │ ed,    │ orative│ engag. │
│ point  │ logical│ warm   │ present│
└────────┴────────┴────────┴────────┘
```

**Use Cases:**
- Four feature comparison
- Matrix layouts (2x2 thinking)
- Communication/personality types
- Quadrant analysis
- Four-part frameworks

**Best Practices:**
- Use distinct icons for visual separation
- Keep heading parallel structure
- Content should be concise
- Ensure equal visual weight

---

## Data & Metrics

### Data

**Description:** Display tabular data or charts. Supports 6 chart types with automatic theme styling.

**Type:** `'data'`

**Required Fields:**
- `title: string` - Slide title
- `dataType: 'table' | 'chart'` - Data representation type
- `data: Record<string, any>[] | string[][] | ChartData` - Data to display

**Optional Fields (for charts):**
- `chartType?: 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter'` - Chart type (required when dataType is 'chart')

**Chart Data Format:**

```typescript
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

**Example - Line Chart (Trends):**

```typescript
{
  type: 'data',
  title: 'Traffic Growth',
  dataType: 'chart',
  chartType: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Page Views',
        data: [12500, 15800, 18200, 21000, 24500, 28000],
        borderColor: '#1e40af'
      }
    ]
  }
}
```

**Example - Pie Chart (Proportions):**

```typescript
{
  type: 'data',
  title: 'Market Share',
  dataType: 'chart',
  chartType: 'pie',
  data: {
    labels: ['Our Product', 'Competitor A', 'Competitor B', 'Others'],
    datasets: [
      {
        label: 'Market Share',
        data: [35, 25, 20, 20],
        backgroundColor: ['#1e40af', '#0891b2', '#64748b', '#94a3b8']
      }
    ]
  }
}
```

**Example - Area Chart (Cumulative):**

```typescript
{
  type: 'data',
  title: 'Cumulative Signups',
  dataType: 'chart',
  chartType: 'area',
  data: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Total Signups',
        data: [100, 350, 750, 1200]
      }
    ]
  }
}
```

**Supported Chart Types:**

| Chart Type | Best For | Example |
|-----------|----------|---------|
| `bar` | Comparing values | Revenue by product |
| `line` | Trends over time | Website traffic |
| `area` | Cumulative data | Total growth |
| `pie` | Proportions | Market share |
| `doughnut` | Proportions with center | Budget allocation |
| `scatter` | Correlation | Price vs value |

**Visual Layout:**

```
┌─────────────────────────────────────┐
│ Quarterly Revenue                   │
│                                     │
│  |  ╱──────                         │
│  │ ╱        ╲                       │
│  ├───────────┴────────              │
│  │              ╲    ╱              │
│  └───────────────╲──╱               │
│  Q1  Q2  Q3  Q4                     │
│                                     │
│  ■ Revenue  ■ Expenses              │
└─────────────────────────────────────┘
```

**Use Cases:**
- Financial reports
- Performance metrics
- Market analysis
- Sales data
- Trends and forecasts
- Comparative analysis

**Best Practices:**
- Use appropriate chart type for data
- Keep datasets to 2-3 for clarity
- Label axes clearly
- Use theme colors automatically
- Ensure charts are readable at projection size

---

### Chart with Metrics

**Description:** Combine a chart with key performance indicators. Shows trend + context.

**Type:** `'chart-with-metrics'`

**Required Fields:**
- `title: string` - Slide title
- `chart: { type: 'line' | 'bar' | 'pie' | 'area'; data: Record<string, any> }` - Chart configuration
- `metrics: Array<{ label: string; value: string | number; change?: { value: number; direction: 'up' | 'down' } }>` - KPI metrics

**Optional Fields:**
- `layout?: 'chart-left' | 'chart-right' | 'chart-top'` - Where to position chart

**Example:**

```typescript
{
  type: 'chart-with-metrics',
  title: 'Quarterly Revenue Performance',
  chart: {
    type: 'line',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Revenue',
          data: [2.1, 2.4, 2.8, 3.2]
        },
        {
          label: 'Target',
          data: [2.0, 2.3, 2.7, 3.0]
        }
      ]
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
    },
    {
      label: 'Profit Margin',
      value: '28%',
      change: { value: 3, direction: 'up' }
    }
  ],
  layout: 'chart-left'
}
```

**Visual Layout (chart-left):**

```
┌─────────────────────────────────────┐
│ Quarterly Revenue Performance       │
├──────────────────┬──────────────────┤
│                  │ Total Revenue    │
│   [Chart]        │ $3.2M ↑ 14%      │
│                  │                  │
│                  │ Growth Rate      │
│                  │ 52% ↑ 8%         │
│                  │                  │
│                  │ Profit Margin    │
│                  │ 28% ↑ 3%         │
└──────────────────┴──────────────────┘
```

**Use Cases:**
- Executive dashboards
- Financial reviews
- Performance reports
- Quarterly updates
- KPI reviews

**Best Practices:**
- Use metrics that complement chart data
- Show trends with change indicators
- Limit to 3 metrics
- Position chart for good visual balance

---

## Process & Timeline

### Timeline

**Description:** Show sequence of events chronologically. Great for roadmaps, milestones, and history.

**Type:** `'timeline'`

**Required Fields:**
- `title: string` - Slide title
- `events: Array<{ date: string; title: string; description?: string }>` - Timeline events

**Optional Fields:**
- `orientation?: 'horizontal' | 'vertical'` - Timeline direction (default: horizontal)

**Example:**

```typescript
{
  type: 'timeline',
  title: '2025 Roadmap',
  events: [
    {
      date: 'January',
      title: 'Platform 2.0',
      description: 'Major platform upgrade with new features'
    },
    {
      date: 'February',
      title: 'API Launch',
      description: 'Public API and developer platform'
    },
    {
      date: 'March',
      title: 'European Expansion',
      description: 'Launch in UK, Germany, and France'
    }
  ],
  orientation: 'horizontal'
}
```

**Visual Layout (horizontal):**

```
┌─────────────────────────────────────┐
│ 2025 Roadmap                        │
│                                     │
│  January ─── February ─── March     │
│  Platform    API Launch  Europe     │
│  2.0         Public API  Expans.    │
│  Upgrade     & Dev Plt   Launch     │
│  Platform    New API &   UK, DE,    │
│  2.0         Access      FR         │
└─────────────────────────────────────┘
```

**Visual Layout (vertical):**

```
┌─────────────────────────────────┐
│ 2025 Roadmap                    │
│                                 │
│  • January: Platform 2.0        │
│    Major upgrade...             │
│                                 │
│  • February: API Launch         │
│    Public API...                │
│                                 │
│  • March: European Expansion    │
│    Launch in UK...              │
└─────────────────────────────────┘
```

**Use Cases:**
- Product roadmaps
- Project timelines
- Company history
- Career progression
- Event schedules
- Milestones

**Best Practices:**
- Use horizontal for 3-4 events
- Use vertical for 4+ events
- Keep event titles short
- Include dates for clarity

---

### Process

**Description:** Show step-by-step workflow or methodology. Shows progression through stages.

**Type:** `'process'`

**Required Fields:**
- `title: string` - Slide title
- `steps: Array<{ title: string; description?: string }>` - Process steps

**Optional Fields:**
- `layout?: 'horizontal' | 'vertical' | 'grid'` - Display layout (default: horizontal)

**Example:**

```typescript
{
  type: 'process',
  title: 'Our Onboarding Process',
  steps: [
    {
      title: 'Sign Up',
      description: 'Create your account'
    },
    {
      title: 'Configure',
      description: 'Set up your workspace'
    },
    {
      title: 'Integrate',
      description: 'Connect your tools'
    },
    {
      title: 'Launch',
      description: 'Start using today'
    }
  ],
  layout: 'horizontal'
}
```

**Visual Layout (horizontal):**

```
┌────────────────────────────────────┐
│ Our Onboarding Process             │
│                                    │
│  1. Sign Up  2. Configure          │
│     Create       Set up your       │
│     account      workspace         │
│        │              │            │
│  4. Launch ← ← 3. Integrate        │
│     Start        Connect           │
│     using        your              │
│     today        tools             │
└────────────────────────────────────┘
```

**Visual Layout (vertical):**

```
┌────────────────────────────────────┐
│ Our Onboarding Process             │
│                                    │
│  1. Sign Up - Create your account  │
│        ↓                           │
│  2. Configure - Set up workspace   │
│        ↓                           │
│  3. Integrate - Connect tools      │
│        ↓                           │
│  4. Launch - Start using today     │
└────────────────────────────────────┘
```

**Use Cases:**
- Workflows and processes
- Onboarding steps
- Product features
- Instructions
- Methodology
- Frameworks

**Best Practices:**
- 3-5 steps for clarity
- Use horizontal for 3-4 steps
- Use vertical for 4+ steps
- Keep step descriptions concise

---

### Comparison

**Description:** Side-by-side comparison of two things (before/after, old/new, pros/cons).

**Type:** `'comparison'`

**Required Fields:**
- `title: string` - Slide title
- `leftTitle: string` - Left column title
- `leftContent: string[]` - Left column items (array)
- `rightTitle: string` - Right column title
- `rightContent: string[]` - Right column items (array)

**Example:**

```typescript
{
  type: 'comparison',
  title: 'Before vs After',
  leftTitle: 'Traditional Tools',
  leftContent: [
    'Multiple disconnected apps',
    'Manual information gathering',
    'Reactive workflow',
    'Limited intelligence'
  ],
  rightTitle: 'Our Platform',
  rightContent: [
    'Unified workspace',
    'AI-powered automation',
    'Proactive insights',
    'Advanced intelligence'
  ]
}
```

**Visual Layout:**

```
┌────────────────┬────────────────┐
│ Before vs After                 │
├────────────────┼────────────────┤
│ Traditional    │ Our Platform   │
│ Tools          │                │
│                │                │
│ • Multiple     │ • Unified      │
│   disconn.     │   workspace    │
│                │                │
│ • Manual info  │ • AI-powered   │
│   gathering    │   automation   │
│                │                │
│ • Reactive     │ • Proactive    │
│   workflow     │   insights     │
│                │                │
│ • Limited      │ • Advanced     │
│   intellig.    │   intellig.    │
└────────────────┴────────────────┘
```

**Use Cases:**
- Before/after comparisons
- Competitive advantages
- Old vs new approaches
- Pros and cons
- Feature comparisons

**Best Practices:**
- Parallel structure in content
- Match number of items per side
- Use clear, opposing language
- Keep items aligned

---

## Media & Products

### Media

**Description:** Display images, videos, or embedded content. Supports multiple layouts and overlay options.

**Type:** `'media'`

**Required Fields:**
- `mediaType: 'image' | 'video' | 'embed' | 'svg'` - Type of media

**Optional Fields:**
- `title?: string` - Optional slide title
- `subtitle?: string` - Optional subtitle
- `mediaUrl?: string` - Media URL (for image, video, embed)
- `svgContent?: string` - Raw SVG (for svg type)
- `caption?: string` - Caption below media
- `layout?: 'contained' | 'hero' | 'hero-card' | 'split' | 'full-bleed'` - Layout style
- `overlay?: OverlayConfig` - Overlay configuration
- `textStyle?: TextStyleConfig` - Text styling

**Example - Image Slide:**

```typescript
{
  type: 'media',
  title: 'Product Features',
  mediaType: 'image',
  mediaUrl: 'https://example.com/product.jpg',
  caption: 'Our flagship product',
  layout: 'contained'
}
```

**Example - Video Slide:**

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

**Example - Hero Image with Overlay:**

```typescript
{
  type: 'media',
  mediaType: 'image',
  mediaUrl: 'https://example.com/hero.jpg',
  layout: 'hero-card',
  title: 'Transform Your Workflow',
  subtitle: 'AI-powered productivity',
  overlay: {
    enabled: true,
    type: 'gradient',
    colors: ['primary', 'secondary'],
    opacity: 0.7
  }
}
```

**Layout Options:**

| Layout | Purpose |
|--------|---------|
| `contained` | Image in fixed size with padding |
| `hero` | Full slide background |
| `hero-card` | Hero with text overlay card |
| `split` | Split screen layout |
| `full-bleed` | Extends to edges |

**Use Cases:**
- Product screenshots
- Demonstrations
- Testimonial videos
- Background images
- Custom graphics
- Brand assets

---

### Product Overview

**Description:** Showcase a product with image, description, features, and pricing.

**Type:** `'product-overview'`

**Required Fields:**
- `title: string` - Product name
- `features: string[]` - Feature list (array)

**Optional Fields:**
- `productImage?: string` - Product image URL
- `description?: string` - Product description
- `pricing?: { price: string; period?: string; cta?: string }` - Pricing info
- `layout?: 'image-left' | 'image-right' | 'image-top'` - Image position

**Example:**

```typescript
{
  type: 'product-overview',
  title: 'Professional Plan',
  description: 'Everything your team needs to collaborate effectively',
  productImage: 'https://example.com/product.jpg',
  features: [
    'Unlimited team members',
    'AI-powered insights',
    'Advanced security & compliance',
    'Priority support',
    'Custom integrations'
  ],
  pricing: {
    price: '$29',
    period: 'per user/month',
    cta: 'Start 14-day trial'
  },
  layout: 'image-left'
}
```

**Visual Layout (image-left):**

```
┌──────────────┬───────────────────┐
│ Professional Plan                 │
├──────────────┼───────────────────┤
│              │ Everything your   │
│   [Image]    │ team needs...     │
│              │                   │
│              │ • Unlimited team  │
│              │ • AI-powered      │
│              │ • Advanced        │
│              │   security        │
│              │ • Priority        │
│              │   support         │
│              │ • Custom          │
│              │   integrations    │
│              │                   │
│              │ $29 per user/mth  │
│              │ [Start Trial]      │
└──────────────┴───────────────────┘
```

**Use Cases:**
- Product pitches
- Pricing pages
- Feature showcases
- Sales decks
- Product launches
- Tier comparisons

**Best Practices:**
- Focus on key features (5-7 max)
- Include clear pricing
- Use high-quality product image
- Strong CTA for conversions

---

## Summary Table

| Type | Best For | Required | Optional |
|------|----------|----------|----------|
| **title** | Opening slide | title | subtitle, author, date |
| **hero** | Impact moments | title | subtitle, background, CTA |
| **section-header** | Chapter breaks | title | subtitle |
| **content** | Bullet points | title, content | layout, layoutDensity |
| **quote** | Testimonials | quote, author | context |
| **blank** | Custom layout | - | content |
| **two-column** | Comparisons | columns | title, ratio, density |
| **three-column** | 3-way split | columns | title, density |
| **four-column** | 4-way split | columns | title, density |
| **data** | Charts/tables | title, dataType, data | chartType |
| **chart-with-metrics** | KPI views | title, chart, metrics | layout |
| **timeline** | Events/roadmap | title, events | orientation |
| **process** | Workflows | title, steps | layout |
| **comparison** | Before/after | title, left*, right* | - |
| **media** | Images/video | mediaType | url, caption, layout |
| **product-overview** | Product pitch | title, features | image, description |

---

**Need examples?** Check [QUICK-START.md](./QUICK-START.md) for copyable code samples, or [USER-GUIDE.md](./USER-GUIDE.md) for advanced patterns.
