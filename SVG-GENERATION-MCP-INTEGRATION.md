# SVG Generation - MCP Server Integration Guide

Detailed walkthrough for integrating SVG.js, Rough.js, and chart generation into your existing MCP server.

---

## Overview

Your current MCP server structure:
```
packages/slideyui-mcp/src/
├── server.ts                  # Main MCP entry point
├── tools/                     # Tool handlers
│   ├── index.ts              # Tool registration
│   ├── add-slide.ts          # Add individual slides
│   ├── create-presentation.ts
│   └── ...
├── generator/
│   └── index.ts              # HTML generation
└── utils/
    └── chart-renderer.ts      # Pure SVG charts (EXCELLENT)
```

**Goal:** Extend with SVG.js + Rough.js support while maintaining backward compatibility.

---

## Step 1: Add Dependencies

```bash
cd packages/slideyui-mcp
npm install @svgdotjs/svg.js svgdom rough
npm install --save-dev @types/roughjs
```

**package.json additions:**
```json
{
  "dependencies": {
    "@svgdotjs/svg.js": "^3.2.5",
    "svgdom": "^0.1.10",
    "roughjs": "^0.8.0"
  },
  "devDependencies": {
    "@types/roughjs": "^0.8.1"
  }
}
```

---

## Step 2: Create SVG Builder Utility

**File:** `packages/slideyui-mcp/src/utils/svg-builder.ts`

```typescript
/**
 * SVG Builder for complex, composable graphics
 *
 * Uses SVG.js + svgdom for server-side generation
 * Exports to string for embedding in slides
 */

import { SVG, Svg } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import type { Theme } from '../types/index.js';

export interface SvgBuilderOptions {
  width?: number;
  height?: number;
  theme?: Theme;
}

/**
 * Main SVG builder class
 *
 * Fluent API for composing SVG graphics
 * Example:
 *   new SvgBuilder(1200, 600, theme)
 *     .addTitle('Chart')
 *     .addGrid(5)
 *     .addBars([10, 20, 30], ['A', 'B', 'C'])
 *     .toSvg()
 */
export class SvgBuilder {
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

    // Set viewBox for responsiveness
    this.canvas.attr('viewBox', `0 0 ${width} ${height}`);
    this.canvas.attr('xmlns', 'http://www.w3.org/2000/svg');
    this.canvas.attr('style', 'max-width: 100%; height: auto; font-family: system-ui, sans-serif;');
  }

  /**
   * Get the chart area (accounting for padding)
   */
  private getChartArea() {
    return {
      x: this.padding.left,
      y: this.padding.top,
      width: this.width - this.padding.left - this.padding.right,
      height: this.height - this.padding.top - this.padding.bottom,
    };
  }

  /**
   * Add title to chart
   */
  addTitle(title: string): this {
    this.canvas
      .text(title)
      .move(this.width / 2, 30)
      .font({ size: 28, weight: '600' })
      .attr('text-anchor', 'middle')
      .fill(this.theme.colors.text);

    return this;
  }

  /**
   * Add grid lines for reference
   */
  addGrid(lines: number = 5, color?: string): this {
    const area = this.getChartArea();
    const spacing = area.height / lines;
    const gridColor = color || '#e5e7eb';

    for (let i = 0; i <= lines; i++) {
      this.canvas.line(area.x, area.y + i * spacing, area.x + area.width, area.y + i * spacing)
        .stroke({ color: gridColor, width: 1 });
    }

    return this;
  }

  /**
   * Add bar chart
   */
  addBars(
    values: number[],
    labels: string[],
    options?: { color?: string; animate?: boolean }
  ): this {
    const area = this.getChartArea();
    const max = Math.max(...values);
    const barWidth = area.width / values.length - 10;
    const color = options?.color || this.theme.colors.primary;

    values.forEach((value, i) => {
      const barHeight = (value / max) * area.height;
      const x = area.x + i * (area.width / values.length) + 5;
      const y = area.y + area.height - barHeight;

      // Bar
      this.canvas.rect(barWidth, barHeight)
        .move(x, y)
        .fill(color)
        .radius(4);

      // Label
      if (labels[i]) {
        this.canvas.text(labels[i])
          .move(x + barWidth / 2, area.y + area.height + 20)
          .font({ size: 18 })
          .attr('text-anchor', 'middle')
          .fill(this.theme.colors.text);
      }
    });

    return this;
  }

  /**
   * Add line chart
   */
  addLine(
    values: number[],
    labels: string[],
    options?: { color?: string; strokeWidth?: number }
  ): this {
    const area = this.getChartArea();
    const max = Math.max(...values);
    const min = Math.min(...values, 0);
    const range = max - min;
    const color = options?.color || this.theme.colors.primary;
    const strokeWidth = options?.strokeWidth || 3;

    // Build path
    let pathData = '';
    values.forEach((value, i) => {
      const x = area.x + (i / (values.length - 1 || 1)) * area.width;
      const y = area.y + area.height - ((value - min) / range) * area.height;
      pathData += i === 0 ? `M${x} ${y}` : ` L${x} ${y}`;
    });

    // Draw line
    this.canvas.path(pathData)
      .fill('none')
      .stroke({ color, width: strokeWidth })
      .attr('stroke-linecap', 'round')
      .attr('stroke-linejoin', 'round');

    // Draw points
    values.forEach((value, i) => {
      const x = area.x + (i / (values.length - 1 || 1)) * area.width;
      const y = area.y + area.height - ((value - min) / range) * area.height;

      this.canvas.circle(8)
        .move(x - 4, y - 4)
        .fill(color)
        .stroke({ color: '#fff', width: 2 });
    });

    return this;
  }

  /**
   * Add axis lines
   */
  addAxes(): this {
    const area = this.getChartArea();

    // Y-axis
    this.canvas.line(area.x, area.y, area.x, area.y + area.height)
      .stroke({ color: '#374151', width: 2 });

    // X-axis
    this.canvas.line(area.x, area.y + area.height, area.x + area.width, area.y + area.height)
      .stroke({ color: '#374151', width: 2 });

    return this;
  }

  /**
   * Add legend
   */
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

  /**
   * Add text annotation
   */
  addText(text: string, x: number, y: number, options?: { fontSize?: number; bold?: boolean }): this {
    this.canvas.text(text)
      .move(x, y)
      .font({
        size: options?.fontSize || 16,
        weight: options?.bold ? '600' : '400',
      })
      .fill(this.theme.colors.text);

    return this;
  }

  /**
   * Add rectangle shape
   */
  addRect(x: number, y: number, width: number, height: number, color: string, rx?: number): this {
    this.canvas.rect(width, height)
      .move(x, y)
      .fill(color)
      .radius(rx || 0);

    return this;
  }

  /**
   * Export to SVG string
   */
  toSvg(): string {
    return this.canvas.svg();
  }
}

/**
 * Helper function for quick chart creation
 */
export function buildChart(params: {
  title: string;
  type: 'bar' | 'line';
  data: number[];
  labels: string[];
  theme: Theme;
  width?: number;
  height?: number;
}): string {
  const builder = new SvgBuilder(params.width || 1200, params.height || 600, params.theme);

  builder.addTitle(params.title);
  builder.addGrid(5);

  if (params.type === 'bar') {
    builder.addBars(params.data, params.labels);
  } else {
    builder.addLine(params.data, params.labels);
  }

  builder.addAxes();
  builder.addLegend([{ label: params.type.toUpperCase(), color: params.theme.colors.primary }]);

  return builder.toSvg();
}
```

---

## Step 3: Create Pattern Generator

**File:** `packages/slideyui-mcp/src/utils/pattern-generator.ts`

```typescript
/**
 * Generate SVG patterns for slide backgrounds
 *
 * Creates reusable pattern definitions for:
 * - Decorative backgrounds
 * - Visual texture overlays
 * - Branded pattern assets
 */

import type { Theme } from '../types/index.js';

export type PatternType = 'dots' | 'grid' | 'diagonal' | 'waves' | 'hexagon' | 'geometric';

export interface PatternOptions {
  scale?: number;
  opacity?: number;
  spacing?: number;
  angle?: number;
}

/**
 * Generate SVG pattern definition
 */
function generatePatternDef(
  id: string,
  type: PatternType,
  color: string,
  options: PatternOptions = {}
): string {
  const { scale = 1, opacity = 0.2, spacing = 40, angle = 0 } = options;

  let pattern = `<pattern id="${id}" patternUnits="userSpaceOnUse"`;

  switch (type) {
    case 'dots':
      pattern += ` width="${spacing * scale}" height="${spacing * scale}">`;
      pattern += `<circle cx="${(spacing * scale) / 2}" cy="${(spacing * scale) / 2}" r="${3 * scale}" fill="${color}" opacity="${opacity}"/>`;
      break;

    case 'grid':
      pattern += ` width="${spacing * scale}" height="${spacing * scale}">`;
      pattern += `<path d="M ${spacing * scale} 0 L 0 0 0 ${spacing * scale}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      break;

    case 'diagonal':
      pattern += ` width="${30 * scale}" height="${30 * scale}">`;
      pattern += `<line x1="0" y1="0" x2="${30 * scale}" y2="${30 * scale}" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      pattern += `<line x1="${30 * scale}" y1="0" x2="0" y2="${30 * scale}" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      break;

    case 'waves':
      pattern += ` width="${60 * scale}" height="${60 * scale}">`;
      pattern += `<path d="M0,${30 * scale} Q${15 * scale},${20 * scale} ${30 * scale},${30 * scale} T${60 * scale},${30 * scale}" stroke="${color}" stroke-width="1" fill="none" opacity="${opacity}"/>`;
      break;

    case 'hexagon':
      const size = spacing * scale;
      const points = generateHexagonPoints(size / 2, size / 2, size / 3);
      pattern += ` width="${size}" height="${size}">`;
      pattern += `<polygon points="${points}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      break;

    case 'geometric':
      pattern += ` width="${spacing * scale}" height="${spacing * scale}">`;
      pattern += `<circle cx="${(spacing * scale) / 2}" cy="${(spacing * scale) / 2}" r="${8 * scale}" fill="none" stroke="${color}" stroke-width="1" opacity="${opacity}"/>`;
      pattern += `<circle cx="${(spacing * scale) / 2}" cy="${(spacing * scale) / 2}" r="${4 * scale}" fill="${color}" opacity="${opacity}"/>`;
      break;
  }

  pattern += `</pattern>`;
  return pattern;
}

/**
 * Generate hexagon SVG points
 */
function generateHexagonPoints(cx: number, cy: number, radius: number): string {
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  return points.join(' ');
}

/**
 * Create background pattern SVG
 */
export function generateBackgroundPattern(
  type: PatternType,
  theme: Theme,
  width: number = 1200,
  height: number = 600,
  options?: PatternOptions
): string {
  const patternId = `pattern-${type}-${Date.now()}`;
  const color = theme.colors.secondary || theme.colors.primary;

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;">`;
  svg += `<defs>`;
  svg += generatePatternDef(patternId, type, color, options);
  svg += `</defs>`;
  svg += `<rect width="${width}" height="${height}" fill="url(#${patternId})"/>`;
  svg += `</svg>`;

  return svg;
}

/**
 * Generate multiple pattern layers for complex backgrounds
 */
export function generateLayeredBackground(
  layers: Array<{ type: PatternType; opacity?: number; scale?: number }>,
  theme: Theme,
  width: number = 1200,
  height: number = 600
): string {
  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<defs>`;

  layers.forEach((layer, i) => {
    const patternId = `pattern-layer-${i}`;
    svg += generatePatternDef(patternId, layer.type, theme.colors.secondary, {
      opacity: layer.opacity || 0.1,
      scale: layer.scale || 1,
    });
  });

  svg += `</defs>`;

  layers.forEach((layer, i) => {
    svg += `<rect width="${width}" height="${height}" fill="url(#pattern-layer-${i})"/>`;
  });

  svg += `</svg>`;
  return svg;
}

/**
 * Export as attachment for slide use
 */
export function createPatternAsset(
  name: string,
  type: PatternType,
  theme: Theme,
  width?: number,
  height?: number
): {
  name: string;
  data: string;
  type: 'image/svg+xml';
} {
  return {
    name: `${name}.svg`,
    data: generateBackgroundPattern(type, theme, width, height),
    type: 'image/svg+xml',
  };
}
```

---

## Step 4: Create Icon Generator

**File:** `packages/slideyui-mcp/src/utils/icon-generator.ts`

```typescript
/**
 * Semantic icon generator for presentations
 *
 * Generates common presentation icons as SVG strings
 * Optimized for:
 * - Projection displays (readable at distance)
 * - AI code generation (semantic names)
 * - Theme integration (uses theme colors)
 */

import type { Theme } from '../types/index.js';

export type IconName =
  | 'arrow-right'
  | 'arrow-left'
  | 'arrow-up'
  | 'arrow-down'
  | 'chart-bar'
  | 'chart-line'
  | 'chart-pie'
  | 'checkmark'
  | 'close'
  | 'user'
  | 'users'
  | 'star'
  | 'heart'
  | 'bookmark'
  | 'download'
  | 'upload'
  | 'settings'
  | 'search'
  | 'bell'
  | 'envelope'
  | 'calendar'
  | 'clock'
  | 'target'
  | 'lightning'
  | 'lock'
  | 'unlock';

export interface IconOptions {
  size?: number;
  strokeWidth?: number;
  theme?: Theme;
}

/**
 * Generate icon SVG
 */
export function generateIcon(name: IconName, theme: Theme, options: IconOptions = {}): string {
  const size = options.size || 24;
  const strokeWidth = options.strokeWidth || 2;
  const color = theme.colors.primary;

  const icons: Record<IconName, (s: number, sw: number, c: string) => string> = {
    'arrow-right': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <path d="M${s * 0.2} ${s * 0.5}L${s * 0.8} ${s * 0.5}M${s * 0.6} ${s * 0.3}L${s * 0.8} ${s * 0.5}L${s * 0.6} ${s * 0.7}"
              stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    'chart-bar': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <rect x="${s * 0.15}" y="${s * 0.5}" width="${s * 0.15}" height="${s * 0.35}" fill="${c}"/>
        <rect x="${s * 0.4}" y="${s * 0.3}" width="${s * 0.15}" height="${s * 0.55}" fill="${c}"/>
        <rect x="${s * 0.65}" y="${s * 0.15}" width="${s * 0.15}" height="${s * 0.7}" fill="${c}"/>
      </svg>
    `,

    'chart-pie': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${s / 2}" cy="${s / 2}" r="${s / 2.5}" fill="none" stroke="${c}" stroke-width="${sw}"/>
        <path d="M${s / 2} ${s / 2}L${s * 0.8} ${s / 2}A${s / 2.5} ${s / 2.5} 0 0 0 ${s / 2} ${s * 0.2}Z" fill="${c}" opacity="0.3"/>
      </svg>
    `,

    'checkmark': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <path d="M${s * 0.2} ${s * 0.5}L${s * 0.4} ${s * 0.7}L${s * 0.8} ${s * 0.3}"
              stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    'close': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <line x1="${s * 0.2}" y1="${s * 0.2}" x2="${s * 0.8}" y2="${s * 0.8}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
        <line x1="${s * 0.8}" y1="${s * 0.2}" x2="${s * 0.2}" y2="${s * 0.8}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/>
      </svg>
    `,

    'user': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <circle cx="${s / 2}" cy="${s * 0.3}" r="${s * 0.15}" stroke="${c}" stroke-width="${sw}" fill="none"/>
        <path d="M${s * 0.2} ${s * 0.6}Q${s / 2} ${s * 0.5} ${s * 0.8} ${s * 0.6}L${s * 0.8} ${s * 0.9}L${s * 0.2} ${s * 0.9}Z"
              stroke="${c}" stroke-width="${sw}" fill="none" stroke-linejoin="round"/>
      </svg>
    `,

    'star': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <polygon points="${s / 2},${s * 0.1} ${s * 0.6},${s * 0.4} ${s * 0.9},${s * 0.4} ${s * 0.65},${s * 0.6} ${s * 0.75},${s * 0.9} ${s / 2},${s * 0.65} ${s * 0.25},${s * 0.9} ${s * 0.35},${s * 0.6} ${s * 0.1},${s * 0.4} ${s * 0.4},${s * 0.4}"
                  fill="${c}"/>
      </svg>
    `,

    // Add more icons...
    'arrow-left': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <path d="M${s * 0.8} ${s * 0.5}L${s * 0.2} ${s * 0.5}M${s * 0.4} ${s * 0.3}L${s * 0.2} ${s * 0.5}L${s * 0.4} ${s * 0.7}"
              stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    'arrow-up': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <path d="M${s * 0.5} ${s * 0.8}L${s * 0.5} ${s * 0.2}M${s * 0.3} ${s * 0.4}L${s * 0.5} ${s * 0.2}L${s * 0.7} ${s * 0.4}"
              stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    'arrow-down': (s, sw, c) => `
      <svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}" xmlns="http://www.w3.org/2000/svg">
        <path d="M${s * 0.5} ${s * 0.2}L${s * 0.5} ${s * 0.8}M${s * 0.3} ${s * 0.6}L${s * 0.5} ${s * 0.8}L${s * 0.7} ${s * 0.6}"
              stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `,

    // Remaining icons with placeholder implementations
    'chart-line': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M10,30 L20,10 L30,25 L40,5" stroke="${c}" fill="none" stroke-width="${sw}"/></svg>`,
    'users': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><circle cx="8" cy="8" r="4" fill="${c}"/><circle cx="20" cy="8" r="4" fill="${c}"/><path d="M4,14 Q8,12 12,14" stroke="${c}" fill="none"/><path d="M16,14 Q20,12 24,14" stroke="${c}" fill="none"/></svg>`,
    'heart': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s/2},${s*0.8} C${s*0.2},${s*0.5} ${s*0.1},${s*0.3} ${s*0.1},${s*0.2} A${s*0.15},${s*0.15} 0 0,1 ${s*0.25},${s*0.1} A${s*0.15},${s*0.15} 0 0,1 ${s/2},${s*0.3} A${s*0.15},${s*0.15} 0 0,1 ${s*0.75},${s*0.1} A${s*0.15},${s*0.15} 0 0,1 ${s*0.9},${s*0.2} C${s*0.9},${s*0.3} ${s*0.8},${s*0.5} ${s/2},${s*0.8}Z" fill="${c}"/>
    </svg>`,
    'bookmark': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s*0.3},${s*0.2} L${s*0.3},${s*0.8} L${s/2},${s*0.6} L${s*0.7},${s*0.8} L${s*0.7},${s*0.2} Z" stroke="${c}" fill="none" stroke-width="${sw}"/></svg>`,
    'download': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s/2},${s*0.5} L${s*0.3},${s*0.3} M${s/2},${s*0.5} L${s*0.7},${s*0.3}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/><line x1="${s*0.2}" y1="${s*0.8}" x2="${s*0.8}" y2="${s*0.8}" stroke="${c}" stroke-width="${sw}"/></svg>`,
    'upload': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s/2},${s*0.5} L${s*0.3},${s*0.7} M${s/2},${s*0.5} L${s*0.7},${s*0.7}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round"/><line x1="${s*0.2}" y1="${s*0.8}" x2="${s*0.8}" y2="${s*0.8}" stroke="${c}" stroke-width="${sw}"/></svg>`,
    'settings': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><circle cx="${s/2}" cy="${s/2}" r="${s*0.2}" stroke="${c}" fill="none" stroke-width="${sw}"/><circle cx="${s/2}" cy="${s*0.2}" r="${s*0.08}" fill="${c}"/><circle cx="${s*0.8}" cy="${s/2}" r="${s*0.08}" fill="${c}"/><circle cx="${s/2}" cy="${s*0.8}" r="${s*0.08}" fill="${c}"/><circle cx="${s*0.2}" cy="${s/2}" r="${s*0.08}" fill="${c}"/></svg>`,
    'search': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><circle cx="${s*0.4}" cy="${s*0.4}" r="${s*0.25}" stroke="${c}" fill="none" stroke-width="${sw}"/><line x1="${s*0.6}" y1="${s*0.6}" x2="${s*0.85}" y2="${s*0.85}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/></svg>`,
    'bell': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s*0.5},${s*0.1} A${s*0.3},${s*0.3} 0 0,1 ${s*0.8},${s*0.4} L${s*0.8},${s*0.6} Q${s*0.5},${s*0.75} ${s*0.2},${s*0.6} L${s*0.2},${s*0.4} A${s*0.3},${s*0.3} 0 0,1 ${s*0.5},${s*0.1}Z" stroke="${c}" fill="none" stroke-width="${sw}"/><line x1="${s*0.35}" y1="${s*0.8}" x2="${s*0.65}" y2="${s*0.8}" stroke="${c}" stroke-width="${sw}"/></svg>`,
    'envelope': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><rect x="${s*0.1}" y="${s*0.2}" width="${s*0.8}" height="${s*0.6}" stroke="${c}" fill="none" stroke-width="${sw}"/><path d="M${s*0.1},${s*0.2} L${s*0.5},${s*0.5} L${s*0.9},${s*0.2}" stroke="${c}" fill="none" stroke-width="${sw}"/></svg>`,
    'calendar': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><rect x="${s*0.15}" y="${s*0.25}" width="${s*0.7}" height="${s*0.6}" stroke="${c}" fill="none" stroke-width="${sw}"/><line x1="${s*0.3}" y1="${s*0.2}" x2="${s*0.3}" y2="${s*0.35}" stroke="${c}" stroke-width="${sw}"/><line x1="${s*0.7}" y1="${s*0.2}" x2="${s*0.7}" y2="${s*0.35}" stroke="${c}" stroke-width="${sw}"/><line x1="${s*0.15}" y1="${s*0.45}" x2="${s*0.85}" y2="${s*0.45}" stroke="${c}" stroke-width="${sw}"/></svg>`,
    'clock': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><circle cx="${s/2}" cy="${s/2}" r="${s*0.35}" stroke="${c}" fill="none" stroke-width="${sw}"/><line x1="${s/2}" y1="${s/2}" x2="${s/2}" y2="${s*0.25}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/><line x1="${s/2}" y1="${s/2}" x2="${s*0.7}" y2="${s/2}" stroke="${c}" stroke-width="${sw}" stroke-linecap="round"/></svg>`,
    'target': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><circle cx="${s/2}" cy="${s/2}" r="${s*0.4}" stroke="${c}" fill="none" stroke-width="${sw}"/><circle cx="${s/2}" cy="${s/2}" r="${s*0.25}" stroke="${c}" fill="none" stroke-width="${sw}"/><circle cx="${s/2}" cy="${s/2}" r="${s*0.1}" fill="${c}"/></svg>`,
    'lightning': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s/2},${s*0.1} L${s*0.65},${s*0.4} L${s*0.5},${s*0.4} L${s*0.7},${s*0.9} L${s*0.35},${s*0.5} L${s*0.5},${s*0.5} Z" fill="${c}"/></svg>`,
    'lock': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s*0.3},${s*0.5} L${s*0.3},${s*0.3} Q${s*0.3},${s*0.15} ${s/2},${s*0.15} Q${s*0.7},${s*0.15} ${s*0.7},${s*0.3} L${s*0.7},${s*0.5}" stroke="${c}" fill="none" stroke-width="${sw}"/><rect x="${s*0.3}" y="${s*0.5}" width="${s*0.4}" height="${s*0.35}" stroke="${c}" fill="none" stroke-width="${sw}"/><circle cx="${s/2}" cy="${s*0.7}" r="${s*0.05}" fill="${c}"/></svg>`,
    'unlock': (s, sw, c) => `<svg viewBox="0 0 ${s} ${s}" width="${s}" height="${s}"><path d="M${s*0.3},${s*0.5} L${s*0.3},${s*0.3} Q${s*0.3},${s*0.15} ${s/2},${s*0.15} Q${s*0.7},${s*0.15} ${s*0.7},${s*0.25} L${s*0.7},${s*0.5}" stroke="${c}" fill="none" stroke-width="${sw}"/><rect x="${s*0.3}" y="${s*0.5}" width="${s*0.4}" height="${s*0.35}" stroke="${c}" fill="none" stroke-width="${sw}"/><circle cx="${s/2}" cy="${s*0.7}" r="${s*0.05}" fill="${c}"/></svg>`,
  };

  const iconGenerator = icons[name];
  if (!iconGenerator) {
    console.warn(`Icon "${name}" not found, returning placeholder`);
    return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 3}" fill="${color}"/></svg>`;
  }

  return iconGenerator(size, strokeWidth, color);
}
```

---

## Step 5: Add MCP Tool for Advanced Charts

**File:** `packages/slideyui-mcp/src/tools/generate-chart.ts`

```typescript
/**
 * generate_chart tool
 *
 * Advanced chart generation using SVG.js for complex layouts
 */

import { buildChart } from '../utils/svg-builder.js';
import { renderChart } from '../utils/chart-renderer.js';
import type { Theme } from '../types/index.js';

export const generateChartTool = {
  name: 'generate_chart',
  description:
    'Generate advanced charts with custom styling and layouts. Supports bar, line, area, pie, scatter charts.',

  inputSchema: {
    type: 'object' as const,
    properties: {
      chartType: {
        type: 'string',
        enum: ['bar', 'line', 'area', 'pie', 'scatter', 'doughnut'],
        description: 'Type of chart to generate',
      },
      title: {
        type: 'string',
        description: 'Chart title',
      },
      labels: {
        type: 'array',
        items: { type: 'string' },
        description: 'X-axis or category labels',
      },
      datasets: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            label: { type: 'string' },
            data: { type: 'array', items: { type: 'number' } },
            backgroundColor: { type: 'string' },
          },
          required: ['label', 'data'],
        },
        description: 'Data series',
      },
      theme: {
        type: 'string',
        enum: ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'],
        default: 'corporate',
        description: 'Theme for colors and styling',
      },
      width: {
        type: 'number',
        default: 1200,
        description: 'SVG width in pixels',
      },
      height: {
        type: 'number',
        default: 600,
        description: 'SVG height in pixels',
      },
      showLegend: {
        type: 'boolean',
        default: true,
      },
      showGrid: {
        type: 'boolean',
        default: true,
      },
      showValues: {
        type: 'boolean',
        default: false,
      },
    },
    required: ['chartType', 'labels', 'datasets', 'theme'],
  },

  async handler(args: Record<string, unknown>) {
    const chartType = args.chartType as string;
    const labels = args.labels as string[];
    const datasets = args.datasets as any[];
    const theme = args.theme as string;
    const width = (args.width as number) || 1200;
    const height = (args.height as number) || 600;
    const title = args.title as string | undefined;
    const showLegend = args.showLegend !== false;
    const showGrid = args.showGrid !== false;
    const showValues = args.showValues === true;

    // Use existing chart-renderer for backward compatibility
    const svg = renderChart(chartType as any, { labels, datasets }, theme as Theme, {
      width,
      height,
      title,
      showLegend,
      showGrid,
      showValues,
    });

    return {
      success: true,
      svg,
      chartType,
      title,
    };
  },
};
```

---

## Step 6: Register New Tools

**File:** `packages/slideyui-mcp/src/tools/index.ts` (Update)

```typescript
import { generateChartTool } from './generate-chart.js';
// ... other imports

export function registerTools() {
  return [
    // ... existing tools
    generateChartTool,
  ];
}
```

---

## Step 7: Testing the Integration

**File:** `packages/slideyui-mcp/src/utils/svg-builder.test.ts`

```typescript
import { describe, it, expect } from 'vitest';
import { SvgBuilder, buildChart } from './svg-builder.js';
import type { Theme } from '../types/index.js';

const mockTheme: Theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    text: '#1f2937',
    background: '#f9fafb',
  },
};

describe('SvgBuilder', () => {
  it('should create SVG with title', () => {
    const builder = new SvgBuilder(800, 400, mockTheme);
    const svg = builder.addTitle('Test Chart').toSvg();

    expect(svg).toContain('Test Chart');
    expect(svg).toContain('<svg');
    expect(svg).toContain('</svg>');
  });

  it('should add bars to chart', () => {
    const builder = new SvgBuilder(800, 400, mockTheme);
    const svg = builder
      .addBars([10, 20, 30], ['A', 'B', 'C'])
      .toSvg();

    expect(svg).toContain('rect');
    expect(svg).toContain('#3b82f6'); // theme color
  });

  it('should add grid lines', () => {
    const builder = new SvgBuilder(800, 400, mockTheme);
    const svg = builder.addGrid(5).toSvg();

    expect(svg).toContain('line');
  });

  it('buildChart helper should work', () => {
    const svg = buildChart({
      title: 'Sales',
      type: 'bar',
      data: [100, 200, 150],
      labels: ['Q1', 'Q2', 'Q3'],
      theme: mockTheme,
    });

    expect(svg).toContain('Sales');
    expect(svg).toContain('Q1');
  });
});
```

---

## Step 8: Documentation Update

**File:** `packages/slideyui-mcp/README.md` (Add to Tools section)

```markdown
### Advanced SVG Tools

#### generate_chart
Generate complex charts with custom styling using SVG.js.

**Parameters:**
- `chartType`: 'bar' | 'line' | 'area' | 'pie' | 'scatter' | 'doughnut'
- `title`: Chart title
- `labels`: Category labels
- `datasets`: Data series with labels and values
- `theme`: Theme for colors ('corporate', 'pitch-deck', 'academic', 'workshop', 'startup')
- `width`, `height`: SVG dimensions
- `showLegend`, `showGrid`, `showValues`: Display options

**Example:**
```json
{
  "chartType": "bar",
  "title": "Quarterly Revenue",
  "labels": ["Q1", "Q2", "Q3", "Q4"],
  "datasets": [
    {
      "label": "2024",
      "data": [100, 150, 120, 180]
    }
  ],
  "theme": "corporate"
}
```

### SVG.js Builder

For custom graphics, use the `SvgBuilder` class directly in custom tools:

```typescript
import { SvgBuilder } from './utils/svg-builder.js';

const svg = new SvgBuilder(1200, 600, theme)
  .addTitle('My Chart')
  .addGrid(5)
  .addBars([10, 20, 30], ['A', 'B', 'C'])
  .addLegend([{ label: 'Data', color: '#3b82f6' }])
  .toSvg();
```
```

---

## Deployment Checklist

- [ ] Install dependencies: `npm install @svgdotjs/svg.js svgdom roughjs`
- [ ] Create `svg-builder.ts` utility
- [ ] Create `pattern-generator.ts` utility
- [ ] Create `icon-generator.ts` utility
- [ ] Create `generate-chart.ts` tool
- [ ] Register new tool in `tools/index.ts`
- [ ] Add tests for SVG builder
- [ ] Update MCP server README
- [ ] Test with MCP client
- [ ] Verify SVG output embeds correctly in slides

---

**File Locations:**
- D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\utils\svg-builder.ts
- D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\utils\pattern-generator.ts
- D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\utils\icon-generator.ts
- D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\src\tools\generate-chart.ts

**Last Updated:** October 20, 2025
