# @slideyui/mcp

**MCP Server for AI-Powered Presentation Generation**

`@slideyui/mcp` is a Model Context Protocol (MCP) server that enables AI agents to generate professional presentations using the SlideyUI component library. This package provides a framework-agnostic approach to presentation generation, outputting standalone HTML files with embedded CSS.

## Features

- **MCP Protocol Integration**: Full support for Model Context Protocol, enabling seamless integration with AI agents
- **Framework-Agnostic**: Generates standalone HTML with embedded SlideyUI CSS classes
- **Template System**: Extensible template architecture for different slide types
- **Schema Validation**: Zod-based schema validation for presentation structure
- **Streaming Support**: Progressive content generation with state feedback
- **Export Ready**: Outputs work in browsers, PDF, and PowerPoint imports

## Architecture

```
@slideyui/mcp
├── server/          # MCP server implementation
├── schema/          # Zod schemas for presentation structure
├── generator/       # HTML generation engine
├── templates/       # Slide type templates
├── tools/           # MCP tool implementations
└── utils/           # Shared utilities
```

### Design Principles

1. **AI-First**: Every API is optimized for LLM reasoning and token efficiency
2. **Standalone Output**: No runtime dependencies in generated HTML
3. **Composable Templates**: Mix and match slide types freely
4. **State Awareness**: Built-in feedback for generation progress
5. **Type Safety**: Full TypeScript support with runtime validation

## Installation

```bash
npm install @slideyui/mcp
```

## Usage

### As MCP Server

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "slideyui": {
      "command": "npx",
      "args": ["@slideyui/mcp"]
    }
  }
}
```

### Programmatic Usage

```typescript
import { generatePresentation } from '@slideyui/mcp';

const presentation = await generatePresentation({
  theme: 'corporate',
  slides: [
    {
      type: 'title',
      title: 'My Presentation',
      subtitle: 'An AI-generated deck'
    },
    {
      type: 'content',
      title: 'Key Points',
      content: ['Point 1', 'Point 2', 'Point 3']
    }
  ]
});

// presentation.html contains standalone HTML
// presentation.metadata contains generation info
```

## Testing

This package includes a comprehensive test suite with 94%+ test coverage.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

### Test Structure

The test suite includes:

- **Unit Tests**: All utilities, templates, schemas, and tools (290+ tests)
- **Integration Tests**: End-to-end workflows and complex scenarios (11 tests)
- **Chart Renderer Tests**: All 6 chart types with edge cases (80+ tests)
- **Template Tests**: All 16 slide types with HTML safety (70+ tests)
- **Schema Validation Tests**: Comprehensive Zod schema testing (60+ tests)

### Coverage Goals

- Minimum 80% code coverage (currently 94%+)
- 100% coverage for critical paths (tools, templates, generator)
- All public APIs tested

See the [test files](./src/__tests__) for examples and patterns.

## MCP Resources

The server exposes read-only resources that clients can fetch to discover capabilities, themes, templates, and examples.

### Resource Types

#### 1. Theme Resources

Discover available presentation themes and their properties.

**List all themes:**
```
URI: slideyui://themes
Returns: JSON array of all 5 themes with metadata
```

**Individual theme:**
```
URI: slideyui://themes/{theme-name}
Examples:
  - slideyui://themes/corporate
  - slideyui://themes/pitch-deck
  - slideyui://themes/academic
  - slideyui://themes/workshop
  - slideyui://themes/startup

Returns: Detailed theme information including:
  - Color palette (primary, secondary, accent)
  - Typography settings
  - Use cases
  - Best practices
```

**Example Response:**
```json
{
  "name": "corporate",
  "displayName": "Corporate",
  "description": "Professional theme for business presentations...",
  "colors": {
    "primary": "#2563eb",
    "secondary": "#64748b",
    "accent": "#0ea5e9",
    "background": "#ffffff",
    "foreground": "#1e293b"
  },
  "typography": {
    "fontFamily": "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    "headingSizes": ["48px", "36px", "24px"]
  },
  "useCases": [
    "Business presentations",
    "Quarterly reports",
    "Stakeholder meetings"
  ]
}
```

#### 2. Template Resources

Explore all available slide templates with schemas and examples.

**List all templates:**
```
URI: slideyui://templates
Returns: JSON with all 16 templates grouped by category
```

**Individual template:**
```
URI: slideyui://templates/{template-type}
Examples:
  - slideyui://templates/hero
  - slideyui://templates/two-column
  - slideyui://templates/chart-with-metrics
  - slideyui://templates/product-overview

Returns: Complete template specification including:
  - Required and optional fields
  - Schema definition
  - Working example
  - Category and use cases
```

**Example Response:**
```json
{
  "type": "hero",
  "displayName": "Hero Slide",
  "description": "Full-screen impact slide with large title...",
  "category": "Title & Impact",
  "requiredFields": ["title"],
  "optionalFields": ["subtitle", "backgroundImage", "callToAction"],
  "schema": {
    "type": "\"hero\"",
    "title": "string",
    "subtitle": "string (optional)",
    "backgroundImage": "string (optional)",
    "callToAction": "object { text: string, url?: string } (optional)"
  },
  "example": {
    "type": "hero",
    "title": "Welcome to the Future",
    "subtitle": "Revolutionizing collaboration",
    "callToAction": {
      "text": "Get Started",
      "url": "https://example.com"
    }
  }
}
```

**Template Categories:**
- **Title & Impact**: title, hero, section-header
- **Content**: content, two-column, three-column, four-column, quote, comparison, blank
- **Data & Metrics**: data, chart-with-metrics
- **Process & Timeline**: timeline, process
- **Media**: media
- **Product**: product-overview

#### 3. Capabilities Resource

Discover what the server can do.

**Server capabilities:**
```
URI: slideyui://capabilities
Returns: Complete server capability information
```

**Example Response:**
```json
{
  "version": "0.1.0",
  "tools": [
    "create_presentation",
    "add_slide",
    "update_slide",
    "export_presentation"
  ],
  "templates": 16,
  "themes": 5,
  "chartTypes": ["bar", "line", "area", "pie", "doughnut", "scatter"],
  "exportFormats": ["html", "pdf-html", "json"],
  "aspectRatios": ["16:9", "4:3"],
  "features": {
    "AI-First Design": "Optimized for LLM reasoning...",
    "Framework Agnostic": "Generates standalone HTML...",
    "Production Charts": "Full SVG chart rendering..."
  }
}
```

#### 4. Example Resources

Get complete example presentations for different use cases.

**List all examples:**
```
URI: slideyui://examples
Returns: JSON array of all example presentations
```

**Individual example:**
```
URI: slideyui://examples/{category}
Examples:
  - slideyui://examples/business (Quarterly business review)
  - slideyui://examples/pitch (Startup pitch deck)
  - slideyui://examples/academic (Research presentation)
  - slideyui://examples/workshop (Training workshop)

Returns: Complete presentation specification ready to use with create_presentation tool
```

**Example Response:**
```json
{
  "metadata": {
    "displayName": "Business Quarterly Review",
    "description": "Complete quarterly business review...",
    "slideCount": 8,
    "theme": "corporate",
    "tags": ["business", "quarterly", "financial"]
  },
  "presentation": {
    "theme": "corporate",
    "title": "Q4 2024 Business Review",
    "slides": [
      {
        "type": "title",
        "title": "Q4 2024 Business Review",
        "subtitle": "Strategic Performance & Financial Update"
      }
      // ... more slides
    ]
  }
}
```

### Using Resources

Resources help AI agents discover capabilities without trial-and-error:

1. **Discovery**: List available themes, templates, and examples
2. **Learning**: Examine schemas and working examples
3. **Validation**: Check supported features before generating
4. **Inspiration**: Use example presentations as starting points

## MCP Tools

The server provides the following MCP tools:

### `create_presentation`

Generate a complete presentation from a structured specification.

**Input Schema:**
```typescript
{
  theme: 'corporate' | 'pitch-deck' | 'academic' | 'workshop' | 'startup';
  title: string;
  slides: Array<SlideSpec>;
  options?: {
    aspectRatio?: '16:9' | '4:3';
    fontSize?: 'default' | 'large' | 'xlarge';
  }
}
```

### `add_slide`

Add a new slide to an existing presentation.

### `update_slide`

Update an existing slide by index.

### `export_presentation`

Export presentation in various formats (HTML, PDF-ready HTML, JSON).

**Supported Formats:**

- `html` - Standalone HTML presentation (requires `html` parameter)
- `pdf-html` - HTML optimized for PDF conversion with print styles (requires `html` parameter)
- `json` - Structured JSON data format (requires `presentationData` parameter)

**JSON Export Format:**

The JSON export provides a structured representation of your presentation data:

```typescript
{
  version: "1.0.0",
  metadata: {
    title: string,
    author?: string,
    createdAt: string,  // ISO 8601 date
    slideCount: number,
    theme: string,
    aspectRatio: string,
    description?: string,
    tags?: string[]
  },
  slides: [
    {
      id: string,
      type: string,
      content: {...},  // Full slide content object
      index: number
    }
  ],
  config: {
    theme: string,
    aspectRatio: string,
    fontSize?: string,
    minify?: boolean,
    includeSlideyUICSS?: boolean,
    embedFonts?: boolean
  }
}
```

**Usage Example:**

```typescript
// Export as JSON
const result = await exportPresentation({
  format: 'json',
  presentationData: {
    theme: 'corporate',
    title: 'My Presentation',
    slides: [/* slide specs */],
    options: { aspectRatio: '16:9' },
    metadata: { author: 'John Doe' }
  },
  filename: 'my-presentation'
});

// result.content contains formatted JSON string
// result.filename is 'my-presentation.json'
```

## Templates

Built-in slide templates:

- **TitleSlide**: Opening slide with title and subtitle
- **ContentSlide**: Bullet points and text content
- **MediaSlide**: Images, videos, or embedded content
- **DataSlide**: Tables and charts (with full chart rendering)
- **QuoteSlide**: Pull quotes and testimonials
- **TimelineSlide**: Event sequences
- **ComparisonSlide**: Side-by-side comparisons
- **ProcessSlide**: Step-by-step workflows

### Chart Rendering

The `DataSlide` template supports production-quality chart rendering with inline SVG. All charts are:

- **Projection-optimized**: 24px minimum fonts, high contrast colors
- **Print-ready**: Pure SVG for crisp PDF export
- **Theme-aware**: Automatically match your presentation theme
- **Self-contained**: No external dependencies or CDN requirements

**Supported Chart Types:**

1. **Bar Charts**: Compare values across categories
2. **Line Charts**: Show trends over time
3. **Area Charts**: Display cumulative data
4. **Pie Charts**: Visualize proportions and percentages
5. **Doughnut Charts**: Show part-to-whole relationships with center space
6. **Scatter Charts**: Plot data point distributions

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

**Example - Line Chart:**

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

**Example - Pie Chart:**

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

**Chart Features:**

- **Automatic Theming**: Charts use colors from your presentation theme
- **Legend Support**: Automatic legend generation for multi-dataset charts
- **Grid Lines**: Optional grid lines for easier value reading
- **Value Labels**: Optional data point value display
- **Responsive Sizing**: Charts scale properly for different screen sizes
- **High DPI**: Vector graphics ensure crisp display on all screens

**Chart Customization:**

Charts automatically inherit styling from your presentation theme. Each theme provides its own color palette:

- **Corporate**: Professional blues and grays
- **Pitch Deck**: Vibrant purples, pinks, and oranges
- **Academic**: Traditional navy, brown, and green
- **Workshop**: Bright blues, greens, and oranges
- **Startup**: Modern sky blue, violet, and cyan

See `examples/chart-examples.ts` for complete working examples of all chart types.

## Themes

5 professionally designed themes optimized for projection:

1. **Corporate**: Professional blue palette
2. **Pitch Deck**: Modern gradient style
3. **Academic**: Traditional serif fonts
4. **Workshop**: Friendly and approachable
5. **Startup**: Bold and energetic

## CSS Loading Strategy

The MCP server uses a robust multi-tier fallback strategy to ensure presentations always have proper styling:

### Loading Tiers

1. **Built Package** (Production): Attempts to load CSS from `@slideyui/core/dist/slideyui.css` in node_modules
2. **Source Files** (Development): Falls back to loading individual CSS files from `@slideyui/core/src/*.css`
3. **Embedded CSS** (Ultimate Fallback): Uses pre-embedded CSS constant containing essential SlideyUI styles
4. **Minimal CSS** (Last Resort): Generates minimal theme-based CSS if all else fails

### How It Works

The CSS loading system automatically detects your environment:

```typescript
// Production: Looks for built package
node_modules/@slideyui/core/dist/slideyui.css

// Development: Falls back to source files
packages/slideyui-core/src/base.css
packages/slideyui-core/src/components.css
packages/slideyui-core/src/layouts.css
packages/slideyui-core/src/typography.css
packages/slideyui-core/src/animations.css

// Fallback: Uses embedded CSS constant
EMBEDDED_SLIDEYUI_CSS (in src/utils/css.ts)
```

### Testing CSS Loading

Run the CSS loading test to verify your environment:

```bash
node test-css-loading.js
```

Expected output:
```
STRATEGY 1: Load from built package
  ✓ Loaded SlideyUI CSS from: /path/to/dist/slideyui.css
  CSS size: XXXXX bytes
```

Or in development mode:
```
STRATEGY 2: Load from source files
  ✓ Loaded SlideyUI CSS from 5 source files
  Total CSS size: 75318 bytes
```

### Troubleshooting

If presentations lack proper styling:

1. **Check build status**: Ensure `@slideyui/core` is built (`npm run build` in monorepo root)
2. **Verify source files**: Confirm CSS files exist in `packages/slideyui-core/src/`
3. **Review logs**: Check console output for CSS loading messages:
   - `✓ Loaded SlideyUI CSS from: <path>` - Success
   - `⚠ Using embedded SlideyUI CSS (built files not found)` - Fallback mode
4. **Test loading**: Run `node test-css-loading.js` to diagnose

### Production Deployment

For production deployment:

1. Build the monorepo: `npm run build` (root level)
2. Ensure `@slideyui/core` package is built with CSS output
3. Package will automatically use built CSS for optimal performance

The embedded CSS fallback ensures presentations work even if build artifacts are missing.

## Development

```bash
# Install dependencies
npm install

# Build package
npm run build

# Run in development mode
npm run dev

# Type checking
npm run type-check

# Lint code
npm run lint

# Start MCP server
npm start

# Test CSS loading
node test-css-loading.js
```

## Documentation

Complete documentation for using the SlideyUI MCP server:

### Getting Started
- **[Quick Start](./docs/QUICK-START.md)** - 5-minute tutorial to create your first presentation
- **[User Guide](./docs/USER-GUIDE.md)** - Complete guide covering tools, themes, patterns, and best practices

### Reference
- **[Slide Types](./docs/SLIDE-TYPES.md)** - All 16 slide types with examples, layouts, and use cases
- **[API Reference](./docs/API-REFERENCE.md)** - Complete schema documentation and type definitions
- **[Error Guide](./docs/ERRORS.md)** - Common errors and troubleshooting solutions

### Examples

See [examples/](./examples/) directory for complete presentation examples.

## Integration with Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

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

## License

MIT License - see LICENSE file for details

## Contributing

Contributions welcome! Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

## Related Packages

- [@slideyui/core](../slideyui-core) - Core Tailwind CSS plugin
- [@slideyui/react](../slideyui-react) - React components
- [@slideyui/svelte](../slideyui-svelte) - Svelte components
