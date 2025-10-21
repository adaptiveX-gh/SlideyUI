# Phase 1: SVG Generation Utilities - Usage Examples

## Overview

Phase 1 of the SlideyUI Enhancement Plan implements SVG generation capabilities for the MCP server. This document provides complete usage examples for all new utilities.

## Dependencies Installed

```json
{
  "@svgdotjs/svg.js": "^3.2.4",
  "svgdom": "^0.1.19",
  "roughjs": "^4.6.6"
}
```

## 1. SVGBuilder - Composable SVG Construction

### Basic Usage

```typescript
import { SVGBuilder } from '@slideyui/mcp/utils';

// Create a simple SVG
const builder = new SVGBuilder({ width: 800, height: 600, theme: 'corporate' });

const svg = builder
  .addRect(0, 0, 800, 600, 'var(--slidey-background)')
  .addCircle(400, 300, 100, 'var(--slidey-primary)')
  .addText('Hello World', 400, 300, {
    fontSize: 24,
    textAnchor: 'middle',
    dominantBaseline: 'middle'
  })
  .toSVGString();
```

### Advanced Example - Custom Diagram

```typescript
import { SVGBuilder } from '@slideyui/mcp/utils';

const diagram = new SVGBuilder({
  width: 1200,
  height: 800,
  theme: 'startup'
});

// Add background
diagram.addRect(0, 0, 1200, 800, '#f0f9ff');

// Add process flow boxes
const boxWidth = 200;
const boxHeight = 100;
const spacing = 100;

for (let i = 0; i < 3; i++) {
  const x = 100 + i * (boxWidth + spacing);
  const y = 350;

  diagram
    .addRect(x, y, boxWidth, boxHeight, 'var(--slidey-primary)', undefined, 8)
    .addText(`Step ${i + 1}`, x + boxWidth / 2, y + boxHeight / 2, {
      fontSize: 20,
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      fill: '#ffffff'
    });

  // Add arrow between boxes
  if (i < 2) {
    const arrowX = x + boxWidth + 20;
    diagram.addLine(arrowX, y + boxHeight / 2, arrowX + 60, y + boxHeight / 2, '#64748b', 2);
  }
}

const diagramSVG = diagram.toSVGString();
```

### With Gradients

```typescript
const builder = new SVGBuilder({ width: 600, height: 400, theme: 'pitch-deck' });

// Add linear gradient
builder.addLinearGradient(
  'heroGradient',
  [
    { offset: 0, color: '#7c3aed', opacity: 1 },
    { offset: 0.5, color: '#ec4899', opacity: 1 },
    { offset: 1, color: '#f59e0b', opacity: 1 }
  ],
  0, 0, 1, 1
);

// Use gradient
builder.addRect(0, 0, 600, 400, 'url(#heroGradient)');

const gradientSVG = builder.toSVGString();
```

## 2. Icon Generator - 26 Semantic Icons

### Available Icons

**Business:** briefcase, chart-line, chart-bar, pie-chart, trend-up, trend-down
**Communication:** mail, phone, message, users, calendar
**Actions:** check, x, arrow-right, arrow-left, plus, minus
**Media:** image, video, download, upload
**Status:** alert, info, success, error, warning
**General:** star, heart, settings, search

### Basic Icon Generation

```typescript
import { generateIcon } from '@slideyui/mcp/utils';

// Simple icon with defaults (48px, currentColor)
const checkIcon = generateIcon('check');

// Custom size and color
const largeRedX = generateIcon('x', {
  size: 64,
  color: '#dc2626'
});

// Theme-aware icon
const themeIcon = generateIcon('briefcase', {
  size: 48,
  theme: 'corporate',
  useThemeColor: true  // Uses theme's primary color
});
```

### Icons in Presentations

```typescript
// Use icons in slide content
const slideContent = `
  <div class="card-layout-bullets">
    <ul>
      <li>
        ${generateIcon('check', { size: 32, color: '#10b981' })}
        <span>Task completed successfully</span>
      </li>
      <li>
        ${generateIcon('trend-up', { size: 32, color: '#0ea5e9' })}
        <span>Revenue increased 23%</span>
      </li>
      <li>
        ${generateIcon('users', { size: 32, color: '#7c3aed' })}
        <span>User base grew to 10K</span>
      </li>
    </ul>
  </div>
`;
```

### Icon Grid Example

```typescript
import { SVGBuilder, generateIcon } from '@slideyui/mcp/utils';

const iconNames = ['check', 'x', 'star', 'heart', 'search', 'settings'];
const grid = new SVGBuilder({ width: 300, height: 200 });

iconNames.forEach((name, i) => {
  const x = (i % 3) * 100 + 50;
  const y = Math.floor(i / 3) * 100 + 50;

  // Icons are embedded as inline SVG
  const icon = generateIcon(name as any, { size: 48, color: '#1e40af' });
  // Note: Would need to parse and embed SVG elements here for actual usage
});
```

## 3. Pattern Generator - Background Patterns

### Available Patterns

- **dots** - Dot grid pattern
- **grid** - Line grid pattern
- **diagonal-lines** - Diagonal stripe pattern
- **waves** - Sinusoidal wave pattern
- **gradient-mesh** - Radial gradient mesh

### Basic Pattern Usage

```typescript
import { generatePattern } from '@slideyui/mcp/utils';

// Simple dots pattern
const dotsPattern = generatePattern('dots', {
  width: 1920,
  height: 1080,
  theme: 'corporate',
  opacity: 0.1,
  density: 'medium'
});

// Grid pattern with high density
const gridPattern = generatePattern('grid', {
  width: 1920,
  height: 1080,
  theme: 'workshop',
  opacity: 0.15,
  density: 'high',
  color: '#2563eb'
});
```

### Hero Slide with Pattern Background

```typescript
import { generatePattern } from '@slideyui/mcp/utils';

const heroSlide = {
  type: 'hero',
  title: 'Welcome to SlideyUI',
  subtitle: 'AI-First Presentation Framework',
  // Use pattern as background
  backgroundPattern: generatePattern('gradient-mesh', {
    width: 1920,
    height: 1080,
    theme: 'startup',
    opacity: 0.12,
    density: 'low'
  })
};
```

### Pattern Density Comparison

```typescript
// Low density - fewer elements, more spacing
const lowDensity = generatePattern('dots', {
  width: 800,
  height: 600,
  density: 'low',     // spacing: 80px, size: 4px
  opacity: 0.1
});

// Medium density - balanced
const mediumDensity = generatePattern('dots', {
  width: 800,
  height: 600,
  density: 'medium',  // spacing: 50px, size: 6px
  opacity: 0.1
});

// High density - more elements, tighter spacing
const highDensity = generatePattern('dots', {
  width: 800,
  height: 600,
  density: 'high',    // spacing: 30px, size: 8px
  opacity: 0.1
});
```

### Custom Background Color

```typescript
const pattern = generatePattern('waves', {
  width: 1920,
  height: 1080,
  theme: 'academic',
  opacity: 0.08,
  backgroundColor: '#faf7f2'  // Warm paper tone
});
```

## 4. Rough Renderer - Hand-Drawn Style

### Basic Rough Shapes

```typescript
import { renderRoughSVG } from '@slideyui/mcp/utils';

// Simple rough rectangle
const roughRect = renderRoughSVG(
  [
    {
      type: 'rectangle',
      x: 50,
      y: 50,
      width: 200,
      height: 100,
      fill: '#0ea5e9',
      stroke: '#0369a1',
      strokeWidth: 2
    }
  ],
  {
    width: 300,
    height: 200,
    roughness: 1.5,
    bowing: 2
  }
);
```

### Workshop-Style Diagram

```typescript
import { renderRoughSVG } from '@slideyui/mcp/utils';

const workshopDiagram = renderRoughSVG(
  [
    // Idea bubble
    {
      type: 'circle',
      x: 150,
      y: 150,
      radius: 50,
      fill: '#fef3c7',
      stroke: '#f59e0b',
      strokeWidth: 3
    },
    // Arrow
    {
      type: 'line',
      x1: 200,
      y1: 150,
      x2: 300,
      y2: 150,
      stroke: '#64748b',
      strokeWidth: 2
    },
    // Action box
    {
      type: 'rectangle',
      x: 300,
      y: 100,
      width: 150,
      height: 100,
      fill: '#a7f3d0',
      stroke: '#10b981',
      strokeWidth: 3,
      fillStyle: 'cross-hatch'
    }
  ],
  {
    width: 600,
    height: 300,
    roughness: 2,
    bowing: 1.5,
    theme: 'workshop'
  }
);
```

### Startup Pitch - Sketchy Chart

```typescript
import { renderRoughSVG } from '@slideyui/mcp/utils';

const dataPoints = [30, 45, 40, 60, 70, 85];
const barWidth = 40;
const spacing = 20;

const instructions = dataPoints.map((height, i) => ({
  type: 'rectangle' as const,
  x: 50 + i * (barWidth + spacing),
  y: 200 - height,
  width: barWidth,
  height: height,
  fill: '#a78bfa',
  stroke: '#7c3aed',
  strokeWidth: 2
}));

const roughChart = renderRoughSVG(instructions, {
  width: 500,
  height: 250,
  roughness: 1.2,
  bowing: 1,
  fillStyle: 'hachure',
  hachureGap: 8
});
```

### Fill Style Variations

```typescript
// Hachure (default) - parallel lines
const hachure = renderRoughSVG([
  { type: 'rectangle', x: 0, y: 0, width: 100, height: 100, fill: '#1e40af' }
], { fillStyle: 'hachure' });

// Cross-hatch - intersecting lines
const crossHatch = renderRoughSVG([
  { type: 'rectangle', x: 0, y: 0, width: 100, height: 100, fill: '#1e40af' }
], { fillStyle: 'cross-hatch' });

// Dots - dotted fill
const dots = renderRoughSVG([
  { type: 'rectangle', x: 0, y: 0, width: 100, height: 100, fill: '#1e40af' }
], { fillStyle: 'dots' });

// Zigzag - zigzag pattern
const zigzag = renderRoughSVG([
  { type: 'rectangle', x: 0, y: 0, width: 100, height: 100, fill: '#1e40af' }
], { fillStyle: 'zigzag' });

// Solid - no texture
const solid = renderRoughSVG([
  { type: 'rectangle', x: 0, y: 0, width: 100, height: 100, fill: '#1e40af' }
], { fillStyle: 'solid' });
```

## 5. Complete Integration Example

### MCP Slide Template with SVG Graphics

```typescript
import {
  SVGBuilder,
  generateIcon,
  generatePattern,
  renderRoughSVG
} from '@slideyui/mcp/utils';

// Create a feature comparison slide with custom graphics
function createFeatureSlide(theme: Theme) {
  // Background pattern
  const pattern = generatePattern('dots', {
    width: 1920,
    height: 1080,
    theme,
    opacity: 0.05,
    density: 'low'
  });

  // Feature icons
  const features = [
    { name: 'Fast', icon: 'trend-up', color: '#10b981' },
    { name: 'Secure', icon: 'success', color: '#0ea5e9' },
    { name: 'Scalable', icon: 'chart-line', color: '#7c3aed' }
  ];

  const featureIcons = features.map(f =>
    generateIcon(f.icon as any, { size: 64, color: f.color })
  ).join('');

  // Custom diagram
  const diagram = new SVGBuilder({ width: 800, height: 400, theme });
  diagram
    .addRect(0, 0, 800, 400, 'transparent')
    .addCircle(400, 200, 80, 'var(--slidey-primary)', 'var(--slidey-secondary)')
    .addText('Core', 400, 200, {
      fontSize: 24,
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      fill: '#ffffff'
    });

  const diagramSVG = diagram.toSVGString();

  return `
    <section class="slide" data-theme="${theme}" style="background-image: url('data:image/svg+xml,${encodeURIComponent(pattern)}')">
      <h1>Our Platform Features</h1>
      <div class="card-layout-3col">
        ${features.map((f, i) => `
          <div class="feature-card">
            ${featureIcons[i]}
            <h3>${f.name}</h3>
          </div>
        `).join('')}
      </div>
      <div class="diagram-container">
        ${diagramSVG}
      </div>
    </section>
  `;
}
```

## 6. Theme Color Integration

All utilities support theme-aware colors:

```typescript
// SVGBuilder
const builder = new SVGBuilder({ width: 800, height: 600, theme: 'corporate' });
builder.addRect(0, 0, 800, 600, 'var(--slidey-primary)');
// Theme color is automatically resolved to #1e40af

// Icon Generator
const icon = generateIcon('check', { theme: 'startup', useThemeColor: true });
// Uses startup theme's primary color (#0ea5e9)

// Pattern Generator
const pattern = generatePattern('grid', {
  width: 800,
  height: 600,
  theme: 'academic',
  // Automatically uses academic theme colors
});

// Rough Renderer
const rough = renderRoughSVG([
  { type: 'rectangle', x: 0, y: 0, width: 100, height: 100, fill: 'var(--slidey-primary)' }
], { theme: 'workshop' });
// Theme color is resolved before rendering
```

## 7. Export Formats

All utilities return SVG strings that work in:

- **HTML** - Direct embedding via `<img>` or inline SVG
- **PDF** - Vector graphics maintain quality
- **PowerPoint** - Can be embedded as images
- **Web** - Responsive and scalable

```typescript
// As inline SVG
const svg = generateIcon('check');
const html = `<div>${svg}</div>`;

// As data URI for img tag
const icon = generateIcon('star', { size: 48 });
const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(icon)}`;
const imgTag = `<img src="${dataUri}" alt="Star icon" />`;

// As CSS background
const pattern = generatePattern('dots', { width: 100, height: 100 });
const css = `background-image: url('data:image/svg+xml,${encodeURIComponent(pattern)}')`;
```

## 8. Performance Considerations

- All SVG generation is server-side (Node.js)
- No client-side JavaScript dependencies
- Lightweight output (typically < 5KB per graphic)
- Cacheable SVG strings
- Works in headless environments

## 9. TypeScript Support

Full TypeScript type definitions provided:

```typescript
import type {
  SVGBuilderOptions,
  TextOptions,
  GradientStop,
  PathOptions,
  IconName,
  IconOptions,
  PatternType,
  PatternDensity,
  PatternOptions,
  RoughOptions,
  SVGInstruction
} from '@slideyui/mcp/utils';
```

## Next Steps

Phase 1 provides the foundation for SVG generation. Future phases will add:

- **Phase 2**: Enhanced theme system with design presets
- **Phase 3**: Flexible layout density controls
- **MCP Tool**: `generate_svg` MCP server tool for AI-driven SVG creation

---

**Phase 1 Status:** ✅ Complete
**Last Updated:** 2025-10-20
