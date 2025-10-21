# SVG Generation Libraries for SlideyUI - Comprehensive Research Report

**Date:** October 20, 2025
**Context:** AI-First presentation component library built on Tailwind CSS
**Focus:** Programmatic SVG generation for presentation slides via MCP server

---

## Executive Summary

For SlideyUI's AI-first presentation generation, **SVG.js with svgdom** is the optimal choice for Node.js/MCP server-side generation, while **Visx** should be the React recommendation for client-side visualization. Your existing pure-SVG approach in `chart-renderer.ts` is excellent for simple charts but will benefit from declarative abstractions as complexity grows.

**Key Findings:**
- Pure SVG string concatenation works but lacks composability and LLM reasoning
- SVG.js + svgdom enables headless server-side generation with clean API
- D3.js is overkill for presentation contexts; Visx provides better LLM ergonomics
- Rough.js is ideal for "informal" presentation themes (Workshop, Startup)
- No existing "SVG template library" - opportunity for SlideyUI to pioneer this

---

## Part 1: Top SVG Generation Libraries Comparison

### 1. **SVG.js** - RECOMMENDED for Server-Side (Node.js/MCP)

**Overview:**
Lightweight (11.5 KB), dependency-free library for manipulating SVG programmatically. Works on both browser and Node.js (with svgdom).

**Pros:**
- Clean, declarative API that LLMs can easily reason about
- Works headless on Node.js via `svgdom` library
- Strong TypeScript support with bundled `svg.js.d.ts`
- Minimal dependencies (no D3, no bloat)
- Direct SVG string serialization via `.svg()` method
- Active maintenance (GitHub: 11.5k stars)

**Cons:**
- Smaller ecosystem than D3.js
- Less specialized for data visualization
- Learning curve for complex transformations

**Example Use Case for SlideyUI:**
```typescript
import { SVG } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';

// Server-side chart generation
const window = createSVGWindow();
const document = window.document;
const canvas = SVG(document.documentElement);

const group = canvas.group()
  .attr('id', 'chart-bars');

// Add bar chart elements
data.forEach((value, i) => {
  group.rect(value * scale, 50)
    .move(i * 100, 100)
    .fill(colors[i]);
});

// Export as string
const svgString = canvas.svg(); // Ready for embedding in slide
```

**MCP Integration:** Excellent - clean async-friendly API, no DOM required.

---

### 2. **D3.js** - NOT RECOMMENDED (Overkill for Presentations)

**Overview:**
Powerful data visualization library using declarative data-binding paradigm.

**Pros:**
- Industry standard for complex data visualizations
- Extensive ecosystem of plugins
- Handles complex transformations elegantly
- Good TypeScript support

**Cons:**
- **STEEP LEARNING CURVE** - Not ideal for LLM code generation
- Heavy bundle (300+ KB uncompressed)
- Imperative/functional hybrid makes prompting difficult
- Server-side requires jsdom which is unstable
- Overkill for presentation-optimized charts
- Your existing pure-SVG approach is simpler

**Why Not D3 for SlideyUI:**
Your `chart-renderer.ts` already does what D3 does for presentations, but with **better SlideyUI integration**:
- Direct theme color awareness (vs. D3's generic approach)
- Projection-optimized defaults (24px fonts built-in)
- No external dependencies (faster MCP responses)

**When to Use D3:** Complex interactive dashboards, real-time stock tickers, advanced animations.

---

### 3. **Rough.js** - RECOMMENDED for Specific Themes

**Overview:**
Graphics library that renders shapes with hand-drawn, sketchy appearance. Under 9 KB gzipped.

**Pros:**
- Perfect for informal presentation aesthetics
- Works with both Canvas and SVG
- Simple, semantic API (easy for LLMs)
- Minimal configuration needed
- Ideal for "Workshop" and "Startup" themes

**Cons:**
- Single-purpose (hand-drawn style only)
- Not suitable for formal corporate presentations
- Limited to predefined shapes (no custom paths easily)

**Example - Sketchy Flow Diagram:**
```typescript
import rough from 'roughjs';

const rc = rough.svg(document.getElementById('canvas'));
const chart = rc.g([
  rc.rectangle(10, 10, 300, 200, { fill: 'blue', roughness: 2 }),
  rc.circle(150, 100, 50, { stroke: 'red', roughness: 1.5 }),
  rc.line(10, 10, 310, 210, { strokeWidth: 2 })
]);
```

**SlideyUI Integration:**
```typescript
// In theme definitions
export const workshopTheme = {
  chart: {
    roughness: 2,     // Sketchy appearance
    bowing: 1.5,      // Curved lines
    fillStyle: 'hachure'
  }
};
```

**Use Cases:**
- Workshop theme slide backgrounds
- Informal diagram generation
- Educational presentation graphics
- Brainstorming session slides

---

### 4. **Visx (by Airbnb)** - RECOMMENDED for React Client-Side

**Overview:**
Low-level visualization primitives for React built on D3.js concepts but with React's declarative model.

**Pros:**
- **Perfect for AI-generated React code** - simple, compositional components
- 30+ specialized packages (use only what you need)
- Strong TypeScript support
- Actively maintained (Nov 2024 release)
- Works seamlessly with SlideyUI React components
- LLM-friendly: `<BarChart><Bar data={...} /></BarChart>`

**Cons:**
- React-only (no Vue, Svelte in official packages)
- Requires understanding of React rendering patterns
- Lower-level than complete charting solutions

**Example - AI-Generated React Chart:**
```typescript
import { BarChart, Bar, XAxis, YAxis } from '@visx/shape';

export function DataSlide({ data }) {
  return (
    <svg width={1200} height={600}>
      <BarChart
        data={data}
        width={1100}
        height={500}
        margin={{ top: 20, right: 20, bottom: 20, left: 60 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="#3b82f6" />
      </BarChart>
    </svg>
  );
}
```

**Why Visx > Recharts for SlideyUI:**
- Recharts adds abstraction layer (slower, less control)
- Visx lets LLMs generate lower-level, more controllable code
- Better for projection-optimized customization
- Easier to integrate with SlideyUI themes

---

### 5. **Recharts** - GOOD Alternative (More High-Level)

**Overview:**
React-specific charting library built on D3.js with Recharts' own abstraction.

**Pros:**
- Simplest API for quick charts
- Excellent defaults for presentations
- Built-in responsive behavior
- Good TypeScript support

**Cons:**
- Less customizable than Visx
- React-only (vs. Visx's modularity)
- Opinionated styling (harder to enforce SlideyUI themes)

**Use Case:** If you want even simpler React components for less sophisticated charts.

---

### 6. **ECharts (Apache)** - For Complex Data Viz Only

**Overview:**
Industrial-grade visualization with Canvas/SVG/WebGL rendering options.

**Pros:**
- 20+ chart types out of the box
- Supports massive datasets efficiently
- Good server-side support

**Cons:**
- Very heavy (overkill for presentations)
- Opinionated styling (conflicts with SlideyUI theming)
- Large bundle impact

**Not Recommended** for SlideyUI unless handling 100k+ data points.

---

## Part 2: AI-Friendly Approach Recommendations

### What Works Best for LLM Code Generation

Based on research into LLM SVG generation (Chat2SVG, OmniSVG, StarVector projects):

**1. Declarative, Not Imperative**
```typescript
// GOOD - LLMs understand this easily
const chart = {
  type: 'bar',
  data: { labels: [...], datasets: [...] },
  options: { title: '...', theme: 'corporate' }
};
const svg = renderChart(chart);

// LESS IDEAL - Requires step-by-step reasoning
const canvas = SVG();
canvas.group().rect(50, 100).move(10, 10);
canvas.line(0, 0).to(100, 100);
// ... complex imperative steps
```

**2. Semantic, Not Magic**
```typescript
// GOOD - Clear intent
<Bar label="Revenue" value={100} color="primary" />
<Pie slices={[30, 40, 30]} labels={['A', 'B', 'C']} />

// LESS IDEAL - Unclear relationships
<path d="M10 20 L30 40 Q50 60..." fill="url(#pattern-xyz)" />
```

**3. Minimal Configuration**
```typescript
// GOOD - Defaults work, customization is obvious
renderChart('bar', data, 'corporate');  // Uses theme colors

// LESS IDEAL - Too many parameters
renderChart(data, {
  colorScale: scaleOrdinal().domain(...).range(...),
  axisFormat: d3.format('.2f'),
  strokeDasharray: '5,5',
  // ... 20 more options
});
```

---

## Part 3: Presentation-Specific Use Cases & Solutions

### Use Case 1: Icon Generation

**Status:** Existing solution via SVGR (converting static SVGs)

**AI-Generated Icons Recommendation:**
```typescript
// Simple geometric icon generator
function generateIcon(
  name: 'arrow' | 'chart' | 'user' | 'settings',
  theme: Theme
): string {
  const icons = {
    arrow: `<svg viewBox="0 0 24 24">
      <path d="M5 12h14M12 5l7 7-7 7"
            stroke="${theme.colors.primary}"
            stroke-width="2" fill="none"/>
    </svg>`,
    // ... more icons
  };
  return icons[name];
}
```

**For more complex icons:** Use Visx's path utilities or simple geometric functions.

---

### Use Case 2: Chart/Graph Generation

**Status:** Already excellent with `chart-renderer.ts`

**Recommendations:**
1. Keep pure SVG for simple charts (your current approach)
2. Add SVG.js abstractions for complex layouts
3. Consider Visx wrapper for React components

**Next Evolution:**
```typescript
// Create reusable SVG.js builders
class ChartBuilder {
  private canvas: Svg;
  private theme: Theme;

  constructor(width: number, height: number, theme: Theme) {
    // svgdom setup
  }

  addBar(x: number, y: number, value: number) {
    this.canvas.rect(value * this.scale, 50)
      .move(x, y)
      .fill(this.theme.colors.primary);
    return this;
  }

  addLegend(labels: string[]) {
    // Composable building blocks
    return this;
  }

  toSvg(): string {
    return this.canvas.svg();
  }
}
```

---

### Use Case 3: Abstract Background Patterns

**Status:** Opportunity for new feature

**SVG Pattern Recommendation:**
```typescript
function generatePattern(
  type: 'dots' | 'grid' | 'waves' | 'geometric',
  theme: Theme
): string {
  // Using Rough.js for hand-drawn patterns
  const rc = rough.svg(svgElement);

  if (type === 'dots') {
    const pattern = [];
    for (let i = 0; i < 20; i++) {
      pattern.push(rc.circle(i * 50, i * 50, 20, {
        fill: theme.colors.secondary,
        roughness: 1
      }));
    }
    return serialize(pattern);
  }
  // ... other patterns
}
```

---

### Use Case 4: Branded Graphic Templates

**Status:** Opportunity for new component system

**Template System Design:**
```typescript
// Define reusable templates in SVG.js
interface GraphicTemplate {
  name: string;
  theme: Theme;
  dimensions: [number, number];
  render: (context: TemplateContext) => Svg;
}

const heroImageTemplate: GraphicTemplate = {
  name: 'hero-image',
  theme: corporateTheme,
  dimensions: [1200, 600],
  render: (ctx) => {
    const canvas = SVG(ctx.document.documentElement);
    // Reusable layout components
    canvas.rect(1200, 600).fill(ctx.theme.colors.background);
    // Add branded elements, gradients, etc.
    return canvas;
  }
};
```

---

## Part 4: Template Systems & Libraries

### Existing Template Solutions

**1. W3C SVG Slidemaker (XSLT-based, 2001)**
- Historical interest only
- XSLT no longer recommended approach

**2. Aspose.Slides Libraries**
- Converts PowerPoint to SVG
- Not about generating SVGs for presentations
- Commercial/C#/.NET focused

**3. GitPitch**
- Uses SVG backgrounds for presentation templates
- Good inspiration but not a template library for generation

### Why There's No SVG Template Library for AI Generation

**The Gap:** No existing library specifically optimizes SVG generation for:
- AI/LLM code generation (declarative, semantic APIs)
- Projection display constraints (24px fonts, safe zones)
- MCP server integration (headless, streaming support)
- Multi-framework parity (React, Svelte, Vue)

**Opportunity:** SlideyUI could pioneer this with:
```typescript
// @slideyui/svg-templates - NEW PACKAGE IDEA

export interface SvgTemplate {
  render(params: TemplateParams): Promise<string>;
  toReact(): React.ReactComponent;
  toSvelte(): Svelte.Component;
}

export const templates = {
  heroImage: new HeroImageTemplate(),
  dataVisualization: new DataVizTemplate(),
  brandedBackground: new BrandedBackgroundTemplate(),
  // ... more
};
```

---

## Part 5: 2024/2025 Best Practices

### Latest Recommended Approaches

**1. Hybrid Rendering Strategy**
- Simple charts → Pure SVG strings (your current approach)
- Complex visualizations → SVG.js (server-side) or Visx (React client)
- Hand-drawn aesthetics → Rough.js layer on top

**2. Streaming-First Design**
Modern MCP servers benefit from streaming SVG generation:
```typescript
// Instead of: return entire SVG at end
// Do this:
async function* generateChartStream(data: ChartData) {
  yield '<svg ...>';
  yield '<defs><!-- gradients, patterns --></defs>';

  for (const point of data.points) {
    yield `<circle cx="${point.x}" cy="${point.y}" ... />`;
  }

  yield '</svg>';
}
```

**3. Schema-First Design**
Modern LLMs work better with formal schema definitions:
```typescript
// Use Zod or JSON Schema for chart specs
export const ChartSpecSchema = z.object({
  type: z.enum(['bar', 'line', 'pie']),
  title: z.string().max(100),
  data: z.object({
    labels: z.array(z.string()),
    datasets: z.array(z.object({
      label: z.string(),
      values: z.array(z.number()),
    }))
  }),
  options: z.object({
    showLegend: z.boolean().default(true),
    showGrid: z.boolean().default(true),
    theme: z.enum(['corporate', 'startup']).default('corporate'),
  }).partial(),
});

type ChartSpec = z.infer<typeof ChartSpecSchema>;
```

**4. Version Pinning for Reproducibility**
LLM-generated code benefits from stable dependencies:
```json
{
  "dependencies": {
    "svgdom": "^0.1.10",  // Pin for MCP reliability
    "@svgdotjs/svg.js": "^3.2.5",
    "rough": "^0.8.0"
  }
}
```

---

## Part 6: Integration with SlideyUI MCP Server

### Recommended Architecture

**Current State (Excellent Foundation):**
```
MCP Server
├── tools/
│   ├── add-slide.ts      ✓ Already set up
│   ├── create-presentation.ts
│   └── export-presentation.ts
├── generator/
│   └── index.ts          ✓ Generates HTML
└── utils/
    └── chart-renderer.ts ✓ Pure SVG charts
```

**Proposed Enhancement - Add SVG.js Layer:**
```
MCP Server
├── utils/
│   ├── chart-renderer.ts          (keep: simple charts)
│   ├── svg-builder.ts             (NEW: SVG.js abstractions)
│   ├── pattern-generator.ts       (NEW: backgrounds)
│   └── icon-generator.ts          (NEW: icons)
├── generators/
│   ├── chart-generator.ts         (NEW: complex charts via SVG.js)
│   └── graphic-generator.ts       (NEW: branded graphics)
└── templates/
    ├── icon-templates.ts          (NEW: icon defs)
    └── graphic-templates.ts       (NEW: background patterns)
```

### Code Example - SVG.js Integration for MCP

```typescript
// D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\utils\svg-builder.ts

import { SVG, Svg } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import type { Theme } from '../types/index.js';

/**
 * Server-side SVG builder using svg.js + svgdom
 *
 * Enables:
 * - Complex chart layouts
 * - Reusable component builders
 * - Easy LLM code generation
 */
export class SvgBuilder {
  private canvas: Svg;
  private theme: Theme;
  private width: number;
  private height: number;

  constructor(width: number, height: number, theme: Theme) {
    const window = createSVGWindow();
    const document = window.document;

    this.canvas = SVG(document.documentElement);
    this.theme = theme;
    this.width = width;
    this.height = height;

    // Base setup
    this.canvas
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('style', 'max-width: 100%; height: auto; font-family: system-ui, sans-serif;');
  }

  // Fluent API for composition
  addTitle(title: string): this {
    this.canvas.text(title)
      .attr('x', this.width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('font-size', 32)
      .attr('font-weight', '600')
      .attr('fill', this.theme.colors.text);
    return this;
  }

  addGrid(lines: number = 5): this {
    const spacing = this.height / lines;
    for (let i = 0; i <= lines; i++) {
      this.canvas.line(0, i * spacing, this.width, i * spacing)
        .stroke({
          color: '#e5e7eb',
          width: 1
        });
    }
    return this;
  }

  addBar(x: number, y: number, width: number, height: number, color: string, label?: string): this {
    const group = this.canvas.group();

    group.rect(width, height)
      .move(x, y)
      .fill(color)
      .attr('rx', 4);

    if (label) {
      group.text(label)
        .move(x + width / 2, y + height + 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', 20)
        .attr('fill', this.theme.colors.text);
    }

    return this;
  }

  addLegend(items: Array<{ label: string; color: string }>): this {
    const legendY = this.height - 60;
    const itemWidth = 200;
    const startX = (this.width - items.length * itemWidth) / 2;

    items.forEach((item, i) => {
      const x = startX + i * itemWidth;
      const group = this.canvas.group();

      group.rect(20, 20)
        .move(x, legendY)
        .fill(item.color);

      group.text(item.label)
        .move(x + 30, legendY + 15)
        .attr('font-size', 18)
        .attr('fill', this.theme.colors.text);
    });

    return this;
  }

  // Export as string for embedding in slide HTML
  toSvgString(): string {
    return this.canvas.svg();
  }

  // Alternative: Get the SVG element directly
  toElement() {
    return this.canvas.node;
  }
}

// Usage in tool:
export async function generateAdvancedChart(params: {
  title: string;
  data: ChartData;
  theme: Theme;
}) {
  const builder = new SvgBuilder(1200, 600, params.theme);

  builder
    .addTitle(params.title)
    .addGrid(5);

  // Build chart from data
  const barWidth = 1200 / params.data.labels.length;
  let x = 0;
  params.data.datasets[0].data.forEach((value, i) => {
    const height = (value / Math.max(...params.data.datasets[0].data)) * 400;
    builder.addBar(x, 500 - height, barWidth - 10, height, params.theme.colors.primary);
    x += barWidth;
  });

  builder.addLegend(params.data.datasets.map(ds => ({
    label: ds.label,
    color: ds.backgroundColor || params.theme.colors.primary
  })));

  return {
    svg: builder.toSvgString(),
    type: 'advanced-chart',
    success: true
  };
}
```

---

## Part 7: Code Examples - Implementation Patterns

### Example 1: Simple Icon Generator

**File:** `D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\utils\icon-generator.ts`

```typescript
import type { Theme } from '../types/index.js';

export function generateIcon(
  name: string,
  theme: Theme,
  size: number = 24
): string {
  const color = theme.colors.primary;

  const icons: Record<string, string> = {
    arrow: `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        <path d="M${size * 0.2} ${size * 0.5}h${size * 0.6}m-${size * 0.15} -${size * 0.15}l${size * 0.15} ${size * 0.15}l-${size * 0.15} ${size * 0.15}"
              stroke="${color}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    chart: `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        <rect x="${size * 0.2}" y="${size * 0.5}" width="${size * 0.12}" height="${size * 0.3}" fill="${color}"/>
        <rect x="${size * 0.4}" y="${size * 0.35}" width="${size * 0.12}" height="${size * 0.45}" fill="${color}"/>
        <rect x="${size * 0.6}" y="${size * 0.2}" width="${size * 0.12}" height="${size * 0.6}" fill="${color}"/>
      </svg>
    `,

    user: `
      <svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
        <circle cx="${size * 0.5}" cy="${size * 0.3}" r="${size * 0.15}" stroke="${color}" stroke-width="2" fill="none"/>
        <path d="M${size * 0.2} ${size * 0.55}Q${size * 0.5} ${size * 0.45} ${size * 0.8} ${size * 0.55}L${size * 0.8} ${size * 0.8}L${size * 0.2} ${size * 0.8}Z"
              stroke="${color}" stroke-width="2" fill="none"/>
      </svg>
    `,
  };

  return icons[name] || icons['chart'];
}
```

### Example 2: Pattern Generator with Rough.js

**File:** `D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\utils\pattern-generator.ts`

```typescript
import rough from 'roughjs';
import type { Theme } from '../types/index.js';

export function generateBackgroundPattern(
  type: 'dots' | 'grid' | 'waves',
  theme: Theme,
  width: number = 1200,
  height: number = 600
): string {
  // For server-side, we need to generate SVG string directly
  // (rough.js typically uses DOM, so we'll create pattern SVG manually)

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg"
               style="position: absolute; width: 100%; height: 100%; z-index: 0;">
             <defs>`;

  if (type === 'dots') {
    const patternSvg = `
      <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="3" fill="${theme.colors.secondary}" opacity="0.3"/>
      </pattern>
    `;
    svg += patternSvg + `</defs>
             <rect width="${width}" height="${height}" fill="url(#dots)"/>
           </svg>`;
  }

  else if (type === 'grid') {
    const patternSvg = `
      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="${theme.colors.secondary}" stroke-width="1" opacity="0.2"/>
      </pattern>
    `;
    svg += patternSvg + `</defs>
             <rect width="${width}" height="${height}" fill="url(#grid)"/>
           </svg>`;
  }

  else if (type === 'waves') {
    const patternSvg = `
      <pattern id="waves" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M0,30 Q15,20 30,30 T60,30"
              stroke="${theme.colors.secondary}" stroke-width="1" fill="none" opacity="0.3"/>
      </pattern>
    `;
    svg += patternSvg + `</defs>
             <rect width="${width}" height="${height}" fill="url(#waves)"/>
           </svg>`;
  }

  return svg;
}
```

### Example 3: React Component Using Visx

**File:** `D:\Users\scale\Code\SlideyUI\packages\slideyui-react\src\components\charts\DataVisualization.tsx`

```typescript
import React from 'react';
import { ScaleBand, ScaleLinear } from 'd3-scale';
import { BarSeries, LineSeries, XYChart } from '@visx/xychart';
import type { Theme } from '@slideyui/core';

interface DataVisualizationProps {
  type: 'bar' | 'line' | 'scatter';
  data: Array<{ label: string; value: number }>;
  theme: Theme;
  title?: string;
}

export function DataVisualization({
  type,
  data,
  theme,
  title,
}: DataVisualizationProps) {
  const width = 1200;
  const height = 600;

  return (
    <svg width={width} height={height} style={{ fontFamily: 'system-ui, sans-serif' }}>
      {title && (
        <text
          x={width / 2}
          y={30}
          textAnchor="middle"
          fontSize={32}
          fontWeight={600}
          fill={theme.colors.text}
        >
          {title}
        </text>
      )}

      <XYChart
        xScale={{ type: 'band', domain: data.map(d => d.label) }}
        yScale={{ type: 'linear', domain: [0, Math.max(...data.map(d => d.value))] }}
        width={width}
        height={height - 60}
        margin={{ top: 60, right: 40, bottom: 100, left: 80 }}
      >
        {type === 'bar' && (
          <BarSeries
            dataKey="value"
            data={data}
            fill={theme.colors.primary}
          />
        )}
        {type === 'line' && (
          <LineSeries
            dataKey="value"
            data={data}
            stroke={theme.colors.primary}
          />
        )}
      </XYChart>
    </svg>
  );
}
```

---

## Part 8: Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Add `svgdom` and `@svgdotjs/svg.js` to MCP dependencies
- [ ] Create `SvgBuilder` class for composable SVG generation
- [ ] Add unit tests for SVG.js integration
- [ ] Update `chart-renderer.ts` to use SvgBuilder for complex charts

### Phase 2: Advanced Features (Weeks 3-4)
- [ ] Implement icon generator with semantic names
- [ ] Create pattern generator for slide backgrounds
- [ ] Add Rough.js support for informal themes
- [ ] Streaming SVG generation for large charts

### Phase 3: React/Svelte Client-Side (Weeks 5-6)
- [ ] Add Visx to React package dependencies
- [ ] Create `<DataChart>` wrapper component for Visx
- [ ] Implement equivalent Svelte chart components
- [ ] Maintain feature parity across frameworks

### Phase 4: Template System (Weeks 7-8)
- [ ] Design `GraphicTemplate` interface
- [ ] Create branded template examples
- [ ] Document template creation for users
- [ ] Add MCP tool for custom template generation

### Phase 5: LLM Optimization (Weeks 9-10)
- [ ] Create comprehensive prompts for SVG generation
- [ ] Test with multiple LLM models (Claude, GPT-4, etc.)
- [ ] Document best practices for AI code generation
- [ ] Create example presentations generated entirely by AI

---

## Part 9: Comparison Matrix

| Feature | SVG.js | D3.js | Visx | Rough.js | Recharts | Chart.js |
|---------|--------|-------|------|----------|----------|----------|
| **LLM Friendliness** | Excellent | Fair | Excellent | Excellent | Good | Fair |
| **Server-Side (Node.js)** | Yes (svgdom) | Yes (jsdom) | No | Limited | No | No |
| **Bundle Size** | 11.5 KB | 300+ KB | Modular (50-200 KB) | 9 KB | 100+ KB | 80+ KB |
| **Presentation Ready** | Excellent | Good | Excellent | Good (informal) | Excellent | Good |
| **TypeScript Support** | Excellent | Good | Excellent | Good | Excellent | Good |
| **Learning Curve** | Low | Steep | Medium | Very Low | Medium | Medium |
| **Customization** | High | Very High | High | Medium | Medium | Medium |
| **React Integration** | Manual | D3 patterns | Native | Manual | Native | React wrapper |
| **Active Maintenance** | Yes (11.5k ⭐) | Yes (109k ⭐) | Yes (5.9k ⭐) | Yes (10k ⭐) | Yes (21.4k ⭐) | Yes (63k ⭐) |

---

## Part 10: Recommendations Summary

### For Your MCP Server (Immediate)
1. **Keep current approach** for simple charts - it's efficient and LLM-friendly
2. **Add SVG.js layer** for complex layouts and composability
3. **Skip D3.js** - your pure SVG approach is cleaner
4. **Add Rough.js** for Workshop/Startup theme variants

### For React Package (Next Phase)
1. **Adopt Visx** as primary visualization library
2. **Create wrapper components** maintaining SlideyUI API
3. **Document chart generation patterns** for LLMs

### For Template System (Future)
1. **Develop reusable GraphicTemplate interface**
2. **Create template library** for common slide patterns
3. **Publish as separate package** (`@slideyui/svg-templates`)

### For AI/LLM Integration (Ongoing)
1. **Use schema-driven chart specs** (Zod definitions)
2. **Prefer declarative over imperative** in APIs
3. **Provide semantic component names** for code generation
4. **Test outputs with multiple LLM models** regularly

---

## References

**Key Libraries:**
- SVG.js: https://svgjs.dev/docs/3.0/
- svgdom: https://github.com/svgdotjs/svgdom
- Rough.js: https://roughjs.com/
- Visx: https://visx-docs.vercel.app/
- Recharts: https://recharts.org/
- ECharts: https://echarts.apache.org/

**Research Papers:**
- "Empowering LLMs to Understand and Generate Complex Vector Graphics" (2024)
- Chat2SVG: Vector Graphics Generation with LLMs and Image Diffusion
- OmniSVG: A Unified Scalable Vector Graphics Generation Model

**MCP Resources:**
- Model Context Protocol: https://modelcontextprotocol.io/
- MCP Server Design Patterns: https://www.klavis.ai/blog/less-is-more-mcp-design-patterns-for-ai-agents

---

**Generated:** October 20, 2025
**For:** SlideyUI Project
**Status:** Ready for Implementation
