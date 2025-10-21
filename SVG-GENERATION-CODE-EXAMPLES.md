# SVG Generation - Code Examples & Patterns

Quick reference implementations for SVG.js, Rough.js, Visx, and pure SVG approaches.

---

## 1. Pure SVG String Generation (Current SlideyUI Approach)

**When to use:** Simple charts, icons, patterns. Currently in `chart-renderer.ts`.

```typescript
// Simple bar chart as SVG string
function renderSimpleChart(data: { labels: string[]; values: number[] }): string {
  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;

  // Background
  svg += `<rect width="${width}" height="${height}" fill="white"/>`;

  // Grid
  for (let i = 0; i <= 5; i++) {
    const y = padding + (chartHeight / 5) * i;
    svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
  }

  // Bars
  const barWidth = chartWidth / data.labels.length - 10;
  const maxValue = Math.max(...data.values);
  const scale = chartHeight / maxValue;

  data.values.forEach((value, i) => {
    const x = padding + i * (chartWidth / data.labels.length) + 5;
    const barHeight = value * scale;
    const y = height - padding - barHeight;

    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#3b82f6" rx="4"/>`;
  });

  // Axes
  svg += `<line x1="${padding}" y1="${padding}" x2="${padding}" y2="${height - padding}" stroke="#000" stroke-width="2"/>`;
  svg += `<line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="#000" stroke-width="2"/>`;

  svg += `</svg>`;
  return svg;
}
```

**Pros:**
- No dependencies
- Full control
- Easy to inline in HTML
- Fast rendering

**Cons:**
- Gets unwieldy with complex charts
- Hard to compose reusable pieces
- String manipulation is error-prone

---

## 2. SVG.js + svgdom (Server-Side, Recommended for MCP)

**Installation:**
```bash
npm install @svgdotjs/svg.js svgdom
```

### Example 1: Basic Chart Builder

```typescript
import { SVG, Svg } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';

function createChartSvg(): string {
  // Create headless DOM
  const window = createSVGWindow();
  const document = window.document;

  // Create SVG canvas
  const canvas = SVG(document.documentElement) as Svg;
  canvas.attr('viewBox', '0 0 800 400').attr('xmlns', 'http://www.w3.org/2000/svg');

  // Add title
  canvas.text('Sales by Quarter').move(400, 20).font({ size: 24, weight: 'bold' });

  // Add bars
  const barX = [100, 250, 400, 550];
  const barHeights = [150, 200, 180, 220];

  barX.forEach((x, i) => {
    canvas
      .rect(80, barHeights[i])
      .move(x, 200 - barHeights[i])
      .fill('#3b82f6')
      .radius(4);
  });

  // Export to string
  return canvas.svg();
}

// Output: Complete SVG as string, ready to embed
console.log(createChartSvg());
```

### Example 2: Composable Builder Class

```typescript
import { SVG, Svg, Container } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import type { Theme } from './types';

class ChartBuilder {
  private canvas: Svg;
  private width: number;
  private height: number;
  private theme: Theme;
  private padding = { top: 60, right: 40, bottom: 80, left: 80 };

  constructor(width: number, height: number, theme: Theme) {
    const window = createSVGWindow();
    const document = window.document;
    this.canvas = SVG(document.documentElement) as Svg;
    this.width = width;
    this.height = height;
    this.theme = theme;

    this.canvas.attr('viewBox', `0 0 ${width} ${height}`);
    this.canvas.attr('xmlns', 'http://www.w3.org/2000/svg');
  }

  private getChartArea() {
    return {
      x: this.padding.left,
      y: this.padding.top,
      width: this.width - this.padding.left - this.padding.right,
      height: this.height - this.padding.top - this.padding.bottom,
    };
  }

  addTitle(title: string): this {
    this.canvas
      .text(title)
      .move(this.width / 2, 30)
      .font({ size: 28, weight: '600' })
      .attr('text-anchor', 'middle')
      .fill(this.theme.colors.text);

    return this;
  }

  addGrid(lines: number = 5): this {
    const area = this.getChartArea();
    const spacing = area.height / lines;

    for (let i = 0; i <= lines; i++) {
      this.canvas.line(area.x, area.y + i * spacing, area.x + area.width, area.y + i * spacing)
        .stroke({ color: '#e5e7eb', width: 1 });
    }

    return this;
  }

  addBars(values: number[], labels: string[], color?: string): this {
    const area = this.getChartArea();
    const max = Math.max(...values);
    const barWidth = area.width / values.length - 10;

    values.forEach((value, i) => {
      const barHeight = (value / max) * area.height;
      const x = area.x + i * (area.width / values.length) + 5;
      const y = area.y + area.height - barHeight;

      // Bar
      this.canvas.rect(barWidth, barHeight)
        .move(x, y)
        .fill(color || this.theme.colors.primary)
        .radius(4);

      // Label
      this.canvas.text(labels[i] || '')
        .move(x + barWidth / 2, area.y + area.height + 20)
        .font({ size: 18 })
        .attr('text-anchor', 'middle')
        .fill(this.theme.colors.text);
    });

    return this;
  }

  addAxes(): this {
    const area = this.getChartArea();

    // Y-axis
    this.canvas.line(area.x, area.y, area.x, area.y + area.height)
      .stroke({ color: '#000', width: 2 });

    // X-axis
    this.canvas.line(area.x, area.y + area.height, area.x + area.width, area.y + area.height)
      .stroke({ color: '#000', width: 2 });

    return this;
  }

  addLegend(items: Array<{ label: string; color: string }>): this {
    const legendY = this.height - 40;
    const itemSpacing = (this.width - 100) / items.length;

    items.forEach((item, i) => {
      const x = 50 + i * itemSpacing;

      // Color box
      this.canvas.rect(20, 20)
        .move(x, legendY)
        .fill(item.color)
        .radius(2);

      // Label
      this.canvas.text(item.label)
        .move(x + 30, legendY + 15)
        .font({ size: 16 })
        .fill(this.theme.colors.text);
    });

    return this;
  }

  build(): string {
    return this.canvas.svg();
  }
}

// Usage:
const theme = { colors: { primary: '#3b82f6', text: '#000000' } };
const svg = new ChartBuilder(800, 400, theme)
  .addTitle('Sales by Quarter')
  .addGrid(5)
  .addBars([100, 150, 120, 180], ['Q1', 'Q2', 'Q3', 'Q4'])
  .addAxes()
  .addLegend([{ label: 'Revenue', color: '#3b82f6' }])
  .build();
```

### Example 3: Line Chart with Paths

```typescript
import { SVG, Svg } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';

function renderLineChart(data: number[], labels: string[]): string {
  const window = createSVGWindow();
  const document = window.document;
  const canvas = SVG(document.documentElement) as Svg;

  const width = 800;
  const height = 400;
  const padding = 60;
  const chartWidth = width - 2 * padding;
  const chartHeight = height - 2 * padding;

  canvas.attr('viewBox', `0 0 ${width} ${height}`);

  // Calculate scale
  const max = Math.max(...data);
  const min = Math.min(...data, 0);
  const range = max - min;
  const scale = chartHeight / range;

  // Build path
  let pathData = '';
  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - (value - min) * scale;
    pathData += i === 0 ? `M${x} ${y}` : ` L${x} ${y}`;
  });

  // Draw path
  canvas.path(pathData)
    .fill('none')
    .stroke({ color: '#3b82f6', width: 3 })
    .attr('stroke-linecap', 'round')
    .attr('stroke-linejoin', 'round');

  // Draw points
  data.forEach((value, i) => {
    const x = padding + (i / (data.length - 1)) * chartWidth;
    const y = height - padding - (value - min) * scale;

    canvas.circle(8)
      .move(x - 4, y - 4)
      .fill('#3b82f6')
      .stroke({ color: '#fff', width: 2 });
  });

  return canvas.svg();
}
```

---

## 3. Rough.js (Hand-Drawn Style Graphics)

**Installation:**
```bash
npm install roughjs
```

### Example 1: Hand-Drawn Chart

```typescript
import rough from 'roughjs';

function renderRoughChart(
  canvasElement: HTMLCanvasElement,
  data: number[],
  labels: string[]
): void {
  // Note: Rough.js works with DOM canvas elements
  // For server-side, you'll need to generate SVG strings manually
  // (see pattern examples below)

  const rc = rough.canvas(canvasElement);
  const width = 800;
  const height = 400;

  // Draw sketchy bar chart
  const barWidth = width / data.length - 10;
  const max = Math.max(...data);

  data.forEach((value, i) => {
    const x = i * (width / data.length);
    const barHeight = (value / max) * 300;
    const y = height - barHeight;

    // Sketchy rectangle
    rc.rectangle(x, y, barWidth, barHeight, {
      fill: '#3b82f6',
      roughness: 1.5,
      fillWeight: 2,
      bowing: 1,
    });
  });
}

// Server-side: Generate sketchy SVG as string
function renderRoughChartSvg(data: number[], labels: string[]): string {
  const width = 800;
  const height = 400;
  const max = Math.max(...data);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>`;
  svg += `<filter id="roughen">
            <feTurbulence type="fractalNoise" baseFrequency="0.1" numOctaves="4" seed="1"/>
            <feDisplacementMap in="SourceGraphic" scale="1.5"/>
          </filter>`;
  svg += `</defs>`;

  const barWidth = width / data.length - 10;

  data.forEach((value, i) => {
    const x = i * (width / data.length);
    const barHeight = (value / max) * 300;
    const y = height - barHeight;

    // Bar with sketchy effect
    svg += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}"
                  fill="#3b82f6" filter="url(#roughen)" opacity="0.9"/>`;

    // Sketchy outline
    svg += `<path d="M${x} ${y}L${x + barWidth} ${y}L${x + barWidth} ${y + barHeight}L${x} ${y + barHeight}Z"
                   stroke="#1e40af" stroke-width="2" fill="none" filter="url(#roughen)"/>`;
  });

  svg += `</svg>`;
  return svg;
}
```

### Example 2: Rough.js Geometry Shapes

```typescript
import rough from 'roughjs';

function renderRoughGeometry(): string {
  // Hand-drawn style shapes
  let svg = `<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg"
                style="filter: url(#roughFilter);">`;

  svg += `<defs>`;
  // SVG filter to simulate hand-drawn effect
  svg += `<filter id="roughFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise"/>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" xChannelSelector="R" yChannelSelector="G"/>
          </filter>`;
  svg += `</defs>`;

  // Sketchy circle
  svg += `<circle cx="150" cy="100" r="50" stroke="#000" stroke-width="2" fill="none" filter="url(#roughFilter)"/>`;

  // Sketchy rectangle
  svg += `<path d="M50 200L250 200L250 300L50 300Z" stroke="#000" stroke-width="2" fill="none" filter="url(#roughFilter)"/>`;

  // Sketchy line
  svg += `<path d="M300 50L500 350" stroke="#000" stroke-width="3" fill="none" filter="url(#roughFilter)"/>`;

  svg += `</svg>`;
  return svg;
}
```

---

## 4. Visx (React Visualization Primitives)

**Installation:**
```bash
npm install @visx/shape @visx/scale @visx/axis @visx/responsive
```

### Example 1: Simple Bar Chart Component

```typescript
import React from 'react';
import { BarGroup } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

interface DataPoint {
  x: string;
  y: number;
}

interface BarChartProps {
  data: DataPoint[];
  width: number;
  height: number;
  title?: string;
}

export function BarChart({ data, width, height, title }: BarChartProps) {
  const margin = { top: 60, right: 40, bottom: 80, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Scales
  const xScale = scaleBand<string>({
    range: [0, innerWidth],
    domain: data.map(d => d.x),
    padding: 0.2,
  });

  const yScale = scaleLinear<number>({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map(d => d.y))],
  });

  return (
    <svg width={width} height={height}>
      {/* Title */}
      {title && (
        <text
          x={width / 2}
          y={30}
          textAnchor="middle"
          fontSize={28}
          fontWeight={600}
          fill="#000"
        >
          {title}
        </text>
      )}

      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Grid lines */}
        {yScale.ticks(5).map(tick => (
          <line
            key={`grid-${tick}`}
            x1={0}
            y1={yScale(tick)}
            x2={innerWidth}
            y2={yScale(tick)}
            stroke="#e5e7eb"
            strokeWidth={1}
          />
        ))}

        {/* Bars */}
        {data.map(d => (
          <rect
            key={d.x}
            x={xScale(d.x)}
            y={yScale(d.y)}
            width={xScale.bandwidth()}
            height={innerHeight - yScale(d.y)}
            fill="#3b82f6"
            rx={4}
          />
        ))}

        {/* Axes */}
        <AxisLeft scale={yScale} />
        <AxisBottom scale={xScale} top={innerHeight} />
      </g>
    </svg>
  );
}

// Usage:
const data = [
  { x: 'Q1', y: 100 },
  { x: 'Q2', y: 150 },
  { x: 'Q3', y: 120 },
  { x: 'Q4', y: 180 },
];

export default function App() {
  return <BarChart data={data} width={1200} height={600} title="Sales by Quarter" />;
}
```

### Example 2: Line Chart with Visx

```typescript
import React from 'react';
import { LinePath } from '@visx/shape';
import { scaleLinear } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';

interface LineChartProps {
  data: Array<{ x: number; y: number }>;
  width: number;
  height: number;
}

export function LineChart({ data, width, height }: LineChartProps) {
  const margin = { top: 40, right: 40, bottom: 80, left: 80 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear({
    range: [0, innerWidth],
    domain: [Math.min(...data.map(d => d.x)), Math.max(...data.map(d => d.x))],
  });

  const yScale = scaleLinear({
    range: [innerHeight, 0],
    domain: [0, Math.max(...data.map(d => d.y))],
  });

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Line */}
        <LinePath
          data={data}
          x={d => xScale(d.x)}
          y={d => yScale(d.y)}
          stroke="#3b82f6"
          strokeWidth={3}
          shapeRendering="geometricPrecision"
        />

        {/* Points */}
        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d.x)}
            cy={yScale(d.y)}
            r={6}
            fill="#3b82f6"
            stroke="#fff"
            strokeWidth={2}
          />
        ))}

        {/* Axes */}
        <AxisLeft scale={yScale} />
        <AxisBottom scale={xScale} top={innerHeight} />
      </g>
    </svg>
  );
}
```

---

## 5. Recharts (Simplest React Approach)

**Installation:**
```bash
npm install recharts
```

```typescript
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Q1', revenue: 100, profit: 40 },
  { name: 'Q2', revenue: 150, profit: 60 },
  { name: 'Q3', revenue: 120, profit: 50 },
  { name: 'Q4', revenue: 180, profit: 80 },
];

export function SimpleBarChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" stackId="a" fill="#3b82f6" />
        <Bar dataKey="profit" stackId="a" fill="#10b981" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

---

## 6. Pattern Generation (Backgrounds)

### SVG Patterns for Slide Backgrounds

```typescript
interface PatternConfig {
  id: string;
  type: 'dots' | 'grid' | 'diagonal' | 'waves';
  color: string;
  opacity?: number;
  scale?: number;
}

function generateSvgPattern(config: PatternConfig): string {
  const { id, type, color, opacity = 0.2, scale = 1 } = config;

  let patternSvg = `<pattern id="${id}" x="0" y="0" patternUnits="userSpaceOnUse"`;

  switch (type) {
    case 'dots':
      patternSvg += ` width="${40 * scale}" height="${40 * scale}">`;
      patternSvg += `<circle cx="${20 * scale}" cy="${20 * scale}" r="${3 * scale}" fill="${color}" opacity="${opacity}"/>`;
      break;

    case 'grid':
      patternSvg += ` width="${50 * scale}" height="${50 * scale}">`;
      patternSvg += `<path d="M ${50 * scale} 0 L 0 0 0 ${50 * scale}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      break;

    case 'diagonal':
      patternSvg += ` width="${20 * scale}" height="${20 * scale}">`;
      patternSvg += `<path d="M0,0 l${20 * scale},${20 * scale} M${-5 * scale},${5 * scale} l${10 * scale},${10 * scale} M${15 * scale},${-15 * scale} l${10 * scale},${10 * scale}" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      break;

    case 'waves':
      patternSvg += ` width="${60 * scale}" height="${60 * scale}">`;
      patternSvg += `<path d="M0,${30 * scale} Q${15 * scale},${20 * scale} ${30 * scale},${30 * scale} T${60 * scale},${30 * scale}" stroke="${color}" stroke-width="1" fill="none" opacity="${opacity}"/>`;
      break;
  }

  patternSvg += `</pattern>`;
  return patternSvg;
}

// Usage:
const background = `
  <svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${generateSvgPattern({ id: 'bg-pattern', type: 'dots', color: '#3b82f6' })}
    </defs>
    <rect width="1200" height="600" fill="url(#bg-pattern)"/>
  </svg>
`;
```

---

## 7. Performance Considerations

### Large Dataset Handling

```typescript
// For 1000+ data points: Use Canvas (not SVG)
function renderLargeDataset(data: number[], width: number = 1200, height: number = 600) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const scale = height / Math.max(...data);

  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 2;
  ctx.beginPath();

  data.forEach((value, i) => {
    const x = (i / data.length) * width;
    const y = height - value * scale;
    ctx.lineTo(x, y);
  });

  ctx.stroke();

  // Convert to image for display
  return canvas.toDataURL('image/png');
}

// SVG vs Canvas trade-off:
// - SVG: Better for < 1000 elements, interactive, export-friendly
// - Canvas: Better for > 1000 elements, real-time updates, performance
```

### Streaming Large SVGs

```typescript
// For MCP server: Stream SVG generation
async function* generateLargeChartStream(dataIterator: AsyncIterable<number>) {
  yield '<svg viewBox="0 0 1200 600" xmlns="http://www.w3.org/2000/svg">';
  yield '<g>';

  let index = 0;
  for await (const value of dataIterator) {
    const x = index * 2;
    const y = 600 - value * 0.5;
    yield `<circle cx="${x}" cy="${y}" r="3" fill="#3b82f6"/>`;
    index++;
  }

  yield '</g>';
  yield '</svg>';
}
```

---

## 8. Theme Integration Patterns

```typescript
interface SlideyUITheme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    accent: string;
  };
}

function createThemedChart(data: any, theme: SlideyUITheme): string {
  // Use theme colors throughout
  return `
    <svg viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="400" fill="${theme.colors.background}"/>
      <!-- Chart uses theme.colors.primary for bars -->
      <!-- Text uses theme.colors.text -->
      <!-- Accents use theme.colors.accent -->
    </svg>
  `;
}

// Corporate theme example:
const corporateTheme: SlideyUITheme = {
  colors: {
    primary: '#1e40af',
    secondary: '#0891b2',
    text: '#1f2937',
    background: '#f9fafb',
    accent: '#0f766e',
  },
};

// Startup theme example:
const startupTheme: SlideyUITheme = {
  colors: {
    primary: '#0ea5e9',
    secondary: '#8b5cf6',
    text: '#0f172a',
    background: '#ffffff',
    accent: '#3b82f6',
  },
};
```

---

**Last Updated:** October 20, 2025
**Part of:** SVG Generation Research for SlideyUI
