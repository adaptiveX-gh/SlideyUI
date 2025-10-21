# SlideyUI Enhancement Specification
## SVG Generation & Advanced Theming System

**Version:** 1.0
**Date:** 2025-10-20
**Status:** Investigation Complete - Ready for Implementation

---

## Executive Summary

This specification addresses the core question: **"How might we enhance the SlideyUI MCP server to generate embedded SVG graphics and support more flexible, custom styling so presentations look as polished as manually-crafted slides without requiring HTML rewrites?"**

Based on comprehensive codebase investigation and research, we propose a **three-phase enhancement plan** that introduces:

1. **SVG Generation Capability** - MCP server tools for generating contextual graphics
2. **Enhanced Theme System** - More powerful theming with design presets and custom CSS
3. **Flexible Layout Engine** - Layout density controls to eliminate "cramped" feeling

**Key Finding:** SlideyUI's current architecture is well-positioned for these enhancements. The AI-first design, CSS custom property system, and component architecture require **minimal breaking changes** to support these features.

---

## Investigation Findings Summary

### 1. Current MCP Server Architecture

**Strengths:**
- 16 slide templates covering most presentation needs
- 5 MCP tools (create_presentation, create_custom_theme, add_slide, update_slide, export_presentation)
- Comprehensive Zod schema validation
- Pure SVG chart rendering (6 chart types) with theme-aware colors
- 94%+ test coverage

**Gaps:**
- No SVG generation beyond charts (no icons, diagrams, illustrations)
- MediaCard only supports external image URLs (no inline SVG)
- Custom themes stored in-memory only (not persisted)
- Limited export formats (HTML, PDF-HTML, JSON - no PowerPoint/Google Slides)

**File Structure:**
```
packages/slideyui-mcp/
├── src/
│   ├── server.ts              # MCP server entry point
│   ├── tools/                 # 5 tool implementations
│   ├── templates/             # 16 slide type templates
│   ├── utils/
│   │   └── chart-renderer.ts  # Pure SVG chart generation (EXCELLENT)
│   ├── schema/                # Zod schemas
│   └── resources/             # Theme/template metadata
```

**Key Code Pattern (Chart Renderer - Line references from investigation):**
The existing `chart-renderer.ts` uses **pure SVG string generation** - this is optimal for AI/LLM code generation and should be extended (not replaced).

---

### 2. Theme System Architecture

**Strengths:**
- 5 predefined themes (Corporate, Pitch Deck, Academic, Workshop, Startup)
- CSS custom property system (`--slidey-*` variables)
- 11 required color properties with accessibility validation
- Typography configuration (display, body, mono fonts)
- Spacing scale (8pt grid system)
- Feature flags (citations, gradients, animations, etc.)
- Theme switching via class (`.theme-*`) or data attribute (`data-theme="*"`)

**Gaps:**
- Themes are monolithic (no composition or inheritance)
- No "design presets" within themes (minimal, corporate, creative)
- Limited custom CSS injection points
- Typography scale is hardcoded (no configurable type scales)
- No dark mode / light mode variants

**File Structure:**
```
packages/slideyui-core/src/
├── themes.ts                   # 5 theme definitions
├── types.ts                    # Theme interface & types
├── utils.ts                    # Theme utilities (validation, CSS generation)
└── index.ts                    # Tailwind plugin integration
```

**Theme Application Flow:**
```
Theme Object → generateCSSVariables() → CSS Custom Properties → Component CSS Classes
```

**Extension Points:**
- `resolveConfig()` supports partial theme overrides
- `validateTheme()` ensures color/font completeness
- CSS variables enable runtime theming without recompilation

---

### 3. Media & Card Component System

**Strengths:**
- MediaCard supports images and videos with flexible layouts
- Extensive card variants (ContentCard, DataCard, QuoteCard, SplitCard, etc.)
- Border and shadow controls already implemented (bordered, shadow props)
- Comprehensive padding system (compact, default, spacious, none)
- Text density variants (minimal, concise, detailed, extensive)
- AI integration via `data-card-state` attributes (generating, selected, error, complete)

**Gaps:**
- **No inline SVG support** - MediaCard only uses `<img>` and `<video>` tags
- No SVG type differentiation (SVG treated same as PNG/JPG)
- No error handling for broken images (missing `onError` handler)
- No responsive images (no srcset support)
- No AI-generated visual content component type

**File Structure:**
```
packages/slideyui-react/src/components/cards/
├── CardContainer.tsx           # Base Layer 0 primitive
├── MediaCard.tsx               # Images/videos (NO SVG)
├── ContentCard.tsx             # Text-heavy cards
├── DataCard.tsx                # Metrics/charts
└── QuoteCard.tsx               # Testimonials
```

**Current MediaCard Props:**
```typescript
interface MediaCardProps {
  src: string;                          // External URL only
  mediaType?: 'image' | 'video';        // No 'svg' option
  objectFit?: 'cover' | 'contain' | 'fill';
  overlay?: ReactNode;
  asBackground?: boolean;
  // Missing: svgContent, svgType, onError, fallback
}
```

---

### 4. Layout & Spacing System

**Strengths:**
- 8pt grid spacing scale (xs: 8px → 3xl: 64px)
- Safe zones (5% padding) for projection compatibility
- Responsive padding that adapts to screen size
- Hierarchy through density presets
- 11 layout patterns (content, 2-col, 3-col, 4-col, split, grid, hero)

**Areas That Feel "Cramped":**
1. **Multi-column layouts** - `.card-layout-2col` uses 48px gap (feels tight at 1920px width)
2. **Grid inconsistency** - 4-col uses 32px gap, 2-col uses 48px gap
3. **Content area spacing** - Internal sections use only 24px gap
4. **Bullet lists** - 24px spacing with 24px+ fonts creates tight rhythm

**File Structure:**
```
packages/slideyui-core/src/
├── base.css                    # Spacing scale, safe zones
├── layouts.css                 # 11 layout classes
└── components.css              # Card padding, density variants
```

**Current Spacing System:**
```css
:root {
  /* Spacing Scale */
  --card-spacing-xs: 0.5rem;   /* 8px */
  --card-spacing-sm: 0.75rem;  /* 12px */
  --card-spacing-md: 1rem;     /* 16px */
  --card-spacing-lg: 1.5rem;   /* 24px */
  --card-spacing-xl: 2rem;     /* 32px - DEFAULT */
  --card-spacing-2xl: 3rem;    /* 48px - Spacious */
  --card-spacing-3xl: 4rem;    /* 64px - Extra spacious */

  /* Safe Zones */
  --slidey-safe-padding: 5%;
  --slidey-danger-zone: 2%;
}
```

**Gap Opportunities:**
- No "layout density" system (compact, normal, spacious)
- Gap multipliers are hardcoded per layout type
- No user control over layout breathing room

---

### 5. SVG Generation Research

**Top Recommendations (from search-specialist agent):**

| Library | Use Case | Bundle Size | Server-Side | LLM-Friendly | Rating |
|---------|----------|-------------|-------------|--------------|--------|
| **SVG.js + svgdom** | Complex layouts, icons, patterns | 11.5 KB | Yes | 9/10 | ⭐⭐⭐⭐⭐ |
| **Visx** | React data visualization | 50-200 KB | No | 9/10 | ⭐⭐⭐⭐ |
| **Rough.js** | Hand-drawn/sketchy style | 9 KB | Yes | 9/10 | ⭐⭐⭐⭐ |
| **Current (Pure SVG)** | Simple charts (keep this!) | 0 KB | Yes | 8/10 | ⭐⭐⭐⭐⭐ |
| **D3.js** | Advanced viz | 300+ KB | Maybe | 5/10 | ⭐⭐ (Skip) |

**Key Finding:** Your existing `chart-renderer.ts` pure SVG approach is **excellent** and should be **extended, not replaced**. It's optimal for:
- Simplicity aids LLM reasoning
- Zero dependencies = reliability
- Works in PDF, PowerPoint, web exports
- Perfect for medium-complexity charts (your current 6 types)

**Recommendation:** Add SVG.js for complex cases, keep pure SVG for charts.

---

## Enhancement Plan

### Phase 1: SVG Generation Capability (Priority: HIGH)

#### 1.1 Add SVG Builder Utility to MCP Server

**File:** `packages/slideyui-mcp/src/utils/svg-builder.ts` (NEW)

**Purpose:** Composable SVG generation using SVG.js for complex layouts, icons, and patterns.

**Implementation:**
```typescript
import { SVG } from '@svgdotjs/svg.js';
import { createSVGWindow } from 'svgdom';
import { registerWindow } from '@svgdotjs/svg.js';

// Server-side SVG setup
const window = createSVGWindow();
const document = window.document;
registerWindow(window, document);

export interface SVGBuilderOptions {
  width: number;
  height: number;
  theme?: string;  // Theme colors from context
  className?: string;
}

export class SVGBuilder {
  private canvas: any;
  private themeColors: Record<string, string>;

  constructor(options: SVGBuilderOptions) {
    this.canvas = SVG(document.documentElement);
    this.canvas.size(options.width, options.height);
    // Apply theme colors
  }

  // Composable methods
  addCircle(x: number, y: number, radius: number, fill?: string): this;
  addRect(x: number, y: number, width: number, height: number, fill?: string): this;
  addText(text: string, x: number, y: number, options?: TextOptions): this;
  addPath(pathData: string, fill?: string, stroke?: string): this;
  addGradient(id: string, stops: GradientStop[]): this;

  // Export
  toSVGString(): string;
}
```

**Dependencies to add:**
```json
{
  "dependencies": {
    "@svgdotjs/svg.js": "^3.2.4",
    "svgdom": "^0.1.19"
  }
}
```

**Usage Example:**
```typescript
const builder = new SVGBuilder({ width: 800, height: 600, theme: 'corporate' });
const svg = builder
  .addRect(0, 0, 800, 600, 'var(--slidey-background)')
  .addCircle(400, 300, 100, 'var(--slidey-primary)')
  .addText('Hello World', 400, 300, { fontSize: 24, textAnchor: 'middle' })
  .toSVGString();
```

---

#### 1.2 Icon Generator

**File:** `packages/slideyui-mcp/src/utils/icon-generator.ts` (NEW)

**Purpose:** Generate semantic SVG icons from theme colors.

**Icon Library (26 icons minimum):**
```
Business: briefcase, chart-line, chart-bar, pie-chart, trend-up, trend-down
Communication: mail, phone, message, users, calendar
Actions: check, x, arrow-right, arrow-left, plus, minus
Media: image, video, download, upload
Status: alert, info, success, error, warning
General: star, heart, settings, search
```

**Implementation Pattern:**
```typescript
export interface IconOptions {
  size?: number;        // Default: 48
  color?: string;       // Default: currentColor
  strokeWidth?: number; // Default: 2
  theme?: string;       // Auto-apply theme colors
}

export function generateIcon(name: IconName, options: IconOptions = {}): string {
  const builder = new SVGBuilder({
    width: options.size || 48,
    height: options.size || 48,
    theme: options.theme,
  });

  switch (name) {
    case 'check':
      return builder
        .addPath('M20 6L9 17l-5-5', undefined, options.color || 'currentColor')
        .toSVGString();
    // ... 25 more icons
  }
}
```

---

#### 1.3 Pattern Generator

**File:** `packages/slideyui-mcp/src/utils/pattern-generator.ts` (NEW)

**Purpose:** Generate background patterns for hero slides and decorative elements.

**Pattern Types:**
```
Geometric: dots, grid, diagonal-lines, chevron, hexagon
Organic: waves, blobs, noise
Abstract: gradient-mesh, particles, rays
```

**Implementation:**
```typescript
export type PatternType = 'dots' | 'grid' | 'diagonal-lines' | 'waves' | 'gradient-mesh';

export interface PatternOptions {
  width: number;
  height: number;
  theme?: string;
  opacity?: number;       // 0-1, default 0.1
  density?: 'low' | 'medium' | 'high';
}

export function generatePattern(type: PatternType, options: PatternOptions): string {
  // Returns SVG pattern string
}
```

**Usage in Hero Slides:**
```typescript
const heroSpec: HeroSlideSpec = {
  type: 'hero',
  title: 'Welcome',
  backgroundPattern: generatePattern('dots', {
    width: 1920,
    height: 1080,
    theme: 'corporate',
    opacity: 0.05,
  }),
};
```

---

#### 1.4 Extend MediaCard for SVG Support

**File:** `packages/slideyui-react/src/components/cards/MediaCard.tsx` (EDIT)

**Changes:**
```typescript
export interface MediaCardProps extends Omit<CardContainerProps, 'children'> {
  src?: string;                         // Make optional
  svgContent?: string;                  // NEW: Inline SVG string
  svgType?: 'image' | 'interactive';   // NEW: Rendering mode
  mediaType?: 'image' | 'video' | 'svg'; // NEW: Add 'svg' type
  alt?: string;
  caption?: ReactNode;
  objectFit?: 'cover' | 'contain' | 'fill';
  overlay?: ReactNode;
  asBackground?: boolean;
  fallbackImage?: string;               // NEW: Error fallback
  onError?: (error: Error) => void;     // NEW: Error handler
  // ... rest
}
```

**Implementation:**
```tsx
export function MediaCard({
  src,
  svgContent,
  svgType = 'image',
  mediaType = 'image',
  fallbackImage,
  onError,
  ...props
}: MediaCardProps) {
  // SVG rendering
  if (mediaType === 'svg' && svgContent) {
    if (svgType === 'interactive') {
      return (
        <CardContainer {...props}>
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </CardContainer>
      );
    } else {
      // Render as data URI
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
      return (
        <CardContainer {...props}>
          <img src={dataUri} alt={alt} className="w-full h-full object-contain" />
        </CardContainer>
      );
    }
  }

  // Image with error handling
  if (mediaType === 'image') {
    return (
      <CardContainer {...props}>
        <img
          src={src}
          alt={alt}
          onError={(e) => {
            if (fallbackImage) {
              e.currentTarget.src = fallbackImage;
            }
            onError?.(new Error(`Failed to load image: ${src}`));
          }}
          className={clsx('w-full h-full', objectFitClasses[objectFit])}
          loading="lazy"
        />
      </CardContainer>
    );
  }

  // Video (existing code)
  // ...
}
```

**Svelte Parity:**
Create `packages/slideyui-svelte/src/lib/components/MediaCard.svelte` with equivalent implementation.

---

#### 1.5 Add MCP Tool: `generate_svg`

**File:** `packages/slideyui-mcp/src/tools/generate-svg.ts` (NEW)

**Tool Schema:**
```typescript
const GenerateSVGSchema = z.object({
  type: z.enum(['icon', 'pattern', 'chart', 'diagram', 'custom']),

  // Icon generation
  iconName: z.enum([...26 icon names]).optional(),

  // Pattern generation
  patternType: z.enum(['dots', 'grid', 'waves', 'gradient-mesh']).optional(),

  // Chart (use existing chart-renderer)
  chartType: z.enum(['bar', 'line', 'pie', 'area', 'doughnut', 'scatter']).optional(),
  chartData: ChartDataSchema.optional(),

  // Custom SVG via builder
  customInstructions: z.string().optional(),

  // Common options
  width: z.number().default(800),
  height: z.number().default(600),
  theme: z.string().optional(),
  style: z.enum(['default', 'hand-drawn', 'minimal']).default('default'),
});
```

**Implementation:**
```typescript
export async function handleGenerateSVG(params: z.infer<typeof GenerateSVGSchema>) {
  switch (params.type) {
    case 'icon':
      return generateIcon(params.iconName!, {
        size: Math.min(params.width, params.height),
        theme: params.theme,
      });

    case 'pattern':
      return generatePattern(params.patternType!, {
        width: params.width,
        height: params.height,
        theme: params.theme,
      });

    case 'chart':
      // Use existing chart-renderer.ts
      return renderChart({
        type: params.chartType!,
        data: params.chartData!,
        theme: params.theme!,
        width: params.width,
        height: params.height,
      });

    case 'custom':
      // AI-generated SVG via builder
      const builder = new SVGBuilder({
        width: params.width,
        height: params.height,
        theme: params.theme,
      });
      // ... parse customInstructions and build SVG
      return builder.toSVGString();
  }
}
```

**Register in MCP Server:**
```typescript
// In src/tools/index.ts
export const tools = [
  {
    name: 'generate_svg',
    description: 'Generate SVG graphics (icons, patterns, charts, diagrams)',
    inputSchema: zodToJsonSchema(GenerateSVGSchema),
  },
  // ... existing tools
];
```

---

#### 1.6 Optional: Add Rough.js for Hand-Drawn Style

**File:** `packages/slideyui-mcp/src/utils/rough-renderer.ts` (NEW)

**Purpose:** Hand-drawn, sketchy aesthetic for Workshop and Startup themes.

**Dependencies:**
```json
{
  "dependencies": {
    "roughjs": "^4.6.6"
  }
}
```

**Implementation:**
```typescript
import rough from 'roughjs';

export function renderRoughSVG(instructions: SVGInstruction[], options: RoughOptions): string {
  const rc = rough.svg(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));

  // ... build rough SVG elements

  return svgElement.outerHTML;
}
```

**Usage:**
```typescript
// In generate_svg tool
if (params.style === 'hand-drawn') {
  return renderRoughSVG(instructions, { roughness: 1.5, bowing: 1 });
}
```

---

### Phase 2: Enhanced Theme System (Priority: MEDIUM)

#### 2.1 Design Presets

**File:** `packages/slideyui-core/src/presets.ts` (NEW)

**Purpose:** Pre-configured theme variations for specific presentation types.

**Implementation:**
```typescript
export interface DesignPreset {
  id: string;
  name: string;
  description: string;
  baseTheme: ThemeId;
  overrides: {
    colors?: Partial<ColorPalette>;
    spacing?: Partial<SpacingPreferences>;
    features?: Partial<ThemeFeatures>;
    heroDefaults?: Partial<HeroDefaults>;
  };
}

export const designPresets: Record<string, DesignPreset> = {
  'tech-startup': {
    id: 'tech-startup',
    name: 'Tech Startup Pitch',
    description: 'Bold, modern, gradient-heavy for funding pitches',
    baseTheme: 'startup',
    overrides: {
      spacing: { slidePadding: 4, contentGap: 3 },
      features: { gradients: true, animations: true },
    },
  },

  'academic-research': {
    id: 'academic-research',
    name: 'Academic Research Paper',
    description: 'Conservative, citation-heavy, serif fonts',
    baseTheme: 'academic',
    overrides: {
      colors: { background: '#faf7f2' },  // Warmer paper tone
      features: { citations: true, gradients: false, animations: false },
    },
  },

  'sales-demo': {
    id: 'sales-demo',
    name: 'Sales Product Demo',
    description: 'Clean, modern, data-driven with metrics',
    baseTheme: 'corporate',
    overrides: {
      features: { dataVisualization: true, interactivity: true },
      spacing: { contentGap: 2.5 },
    },
  },

  'workshop-interactive': {
    id: 'workshop-interactive',
    name: 'Interactive Workshop',
    description: 'Playful, colorful, exercise-focused',
    baseTheme: 'workshop',
    overrides: {
      features: { interactivity: true, animations: true },
    },
  },
};
```

**Usage in MCP:**
```typescript
// New parameter in create_presentation and create_custom_theme
preset?: string;  // 'tech-startup', 'academic-research', etc.

// Apply preset
if (params.preset) {
  const preset = designPresets[params.preset];
  theme = applyPreset(getTheme(preset.baseTheme), preset.overrides);
}
```

**Tailwind Plugin:**
```javascript
slideyUI({
  preset: 'tech-startup',  // Automatically applies preset
})
```

---

#### 2.2 Custom CSS Injection

**File:** `packages/slideyui-core/src/index.ts` (EDIT)

**Purpose:** Allow users to inject custom CSS for brand-specific styling.

**Config Extension:**
```typescript
export interface SlideyUIConfig {
  theme?: ThemeId | Partial<Theme>;
  preset?: string;  // NEW
  customCSS?: Record<string, string>;  // NEW
  cssLayers?: {  // NEW
    animations?: string;
    utilities?: string;
    components?: string;
  };
  // ... existing options
}
```

**Usage:**
```javascript
slideyUI({
  theme: 'corporate',
  customCSS: {
    '--brand-gradient-angle': '45deg',
    '--custom-transition': 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--brand-shadow': '0 10px 30px rgba(0, 0, 0, 0.15)',
  },
  cssLayers: {
    animations: `
      @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
    `,
  },
})
```

**Implementation in Plugin:**
```typescript
export function plugin(config: SlideyUIConfig = {}): PluginAPI {
  return function ({ addBase, addComponents, addUtilities }) {
    const resolved = resolveConfig(config);

    // Inject custom CSS variables
    if (config.customCSS) {
      addBase({
        ':root': config.customCSS,
      });
    }

    // Inject CSS layers
    if (config.cssLayers?.animations) {
      addBase({ [`@layer animations`]: config.cssLayers.animations });
    }

    // ... existing code
  };
}
```

---

#### 2.3 Typography Scale System

**File:** `packages/slideyui-core/src/types.ts` (EDIT)

**Purpose:** Configurable type scales instead of hardcoded sizes.

**Type Definition:**
```typescript
export interface TypographyScale {
  hero: {
    min: string;       // clamp min value
    preferred: string; // clamp preferred (vw)
    max: string;       // clamp max value
    weight: number;
    lineHeight: number;
  };
  h1: { min: string; preferred: string; max: string; weight: number; lineHeight: number; };
  h2: { min: string; preferred: string; max: string; weight: number; lineHeight: number; };
  h3: { min: string; preferred: string; max: string; weight: number; lineHeight: number; };
  body: { min: string; preferred: string; max: string; weight: number; lineHeight: number; };
  caption: { min: string; preferred: string; max: string; weight: number; lineHeight: number; };
}

export interface Theme {
  // ... existing properties
  typography?: TypographyScale;  // NEW: Optional override
}
```

**CSS Generation:**
```typescript
// In generateCSSVariables()
if (theme.typography) {
  vars[`--${prefix}-text-hero`] = `clamp(${theme.typography.hero.min}, ${theme.typography.hero.preferred}, ${theme.typography.hero.max})`;
  vars[`--${prefix}-text-hero-weight`] = theme.typography.hero.weight.toString();
  vars[`--${prefix}-text-hero-lh`] = theme.typography.hero.lineHeight.toString();
  // ... repeat for h1, h2, h3, body, caption
}
```

**Usage in CSS:**
```css
.slide-text-hero {
  font-size: var(--slidey-text-hero, clamp(3rem, 8vw, 6rem));
  font-weight: var(--slidey-text-hero-weight, 800);
  line-height: var(--slidey-text-hero-lh, 1.1);
}
```

---

#### 2.4 Theme Inheritance / Composition

**File:** `packages/slideyui-core/src/utils.ts` (EDIT)

**Purpose:** Create themes by extending base themes.

**Implementation:**
```typescript
export function createDerivedTheme(
  baseThemeId: ThemeId,
  overrides: Partial<Theme>,
  options?: {
    id?: string;
    name?: string;
    description?: string;
  }
): Theme {
  const baseTheme = getTheme(baseThemeId);

  return {
    ...baseTheme,
    id: options?.id || `${baseThemeId}-custom`,
    name: options?.name || `${baseTheme.name} (Custom)`,
    description: options?.description || baseTheme.description,
    colors: { ...baseTheme.colors, ...overrides.colors },
    fonts: { ...baseTheme.fonts, ...overrides.fonts },
    spacing: { ...baseTheme.spacing, ...overrides.spacing },
    features: { ...baseTheme.features, ...overrides.features },
    heroDefaults: overrides.heroDefaults
      ? { ...baseTheme.heroDefaults, ...overrides.heroDefaults }
      : baseTheme.heroDefaults,
    typography: overrides.typography
      ? { ...baseTheme.typography, ...overrides.typography }
      : baseTheme.typography,
  };
}
```

**Usage:**
```typescript
const myTheme = createDerivedTheme('corporate', {
  colors: {
    primary: '#FF5733',
    accent: '#00D4FF',
  },
  spacing: {
    slidePadding: 4,
  },
}, {
  id: 'my-brand',
  name: 'My Brand Theme',
  description: 'Custom corporate theme with brand colors',
});

// Register and use
registerTheme(myTheme);
```

---

### Phase 3: Flexible Layout Engine (Priority: HIGH)

#### 3.1 Layout Density System

**File:** `packages/slideyui-core/src/types.ts` (EDIT)

**Purpose:** User-controllable layout spacing.

**Type Definition:**
```typescript
export type LayoutDensity = 'compact' | 'normal' | 'spacious';

export interface LayoutDensityPreset {
  id: LayoutDensity;
  name: string;
  description: string;
  gapMultiplier: number;        // Multiplied by --slidey-spacing-gap
  heroGapMultiplier: number;    // Hero-specific gap
  cellMinHeight: string;        // Minimum grid cell height
  itemCountRange: [number, number];  // Recommended item count
}

export const layoutDensityPresets: Record<LayoutDensity, LayoutDensityPreset> = {
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Data-dense presentations, dashboards',
    gapMultiplier: 1,
    heroGapMultiplier: 1.5,
    cellMinHeight: '150px',
    itemCountRange: [6, 12],
  },
  normal: {
    id: 'normal',
    name: 'Normal',
    description: 'Balanced for most presentations',
    gapMultiplier: 1.5,
    heroGapMultiplier: 2,
    cellMinHeight: '200px',
    itemCountRange: [4, 8],
  },
  spacious: {
    id: 'spacious',
    name: 'Spacious',
    description: 'Premium presentations, fewer items',
    gapMultiplier: 2,
    heroGapMultiplier: 2.5,
    cellMinHeight: '250px',
    itemCountRange: [2, 6],
  },
};
```

---

#### 3.2 CSS Implementation

**File:** `packages/slideyui-core/src/components.css` (EDIT)

**Add After Line 2545:**
```css
/* ========================================================================
   * Layout Density System
   * Control spacing across all layout types based on density preset
   * ======================================================================== */

/* Compact Density - Data-dense presentations */
[data-layout-density="compact"] {
  --layout-gap-multiplier: 1;
  --layout-hero-gap-multiplier: 1.5;
}

[data-layout-density="compact"] .card-layout-2col {
  gap: calc(var(--slidey-spacing-gap) * 1);  /* 32px */
}

[data-layout-density="compact"] .card-layout-3col {
  gap: calc(var(--slidey-spacing-gap) * 1);
}

[data-layout-density="compact"] .card-layout-4col {
  gap: calc(var(--slidey-spacing-gap) * 0.75);  /* 24px */
}

[data-layout-density="compact"] .card-layout-split {
  gap: calc(var(--slidey-spacing-gap) * 1.5);
}

[data-layout-density="compact"] .card-layout-bullets li {
  gap: calc(var(--slidey-spacing-gap) * 0.5);
  margin-bottom: 0.25rem;
}

/* Normal Density (DEFAULT) - Balanced presentations */
[data-layout-density="normal"] {
  --layout-gap-multiplier: 1.5;
  --layout-hero-gap-multiplier: 2;
}

[data-layout-density="normal"] .card-layout-2col {
  gap: calc(var(--slidey-spacing-gap) * 1.5);  /* 48px */
}

[data-layout-density="normal"] .card-layout-3col {
  gap: calc(var(--slidey-spacing-gap) * 1.5);
}

[data-layout-density="normal"] .card-layout-4col {
  gap: calc(var(--slidey-spacing-gap) * 1);  /* 32px */
}

/* Spacious Density - Premium presentations, fewer items */
[data-layout-density="spacious"] {
  --layout-gap-multiplier: 2;
  --layout-hero-gap-multiplier: 2.5;
}

[data-layout-density="spacious"] .card-layout-2col {
  gap: calc(var(--slidey-spacing-gap) * 2);  /* 64px */
}

[data-layout-density="spacious"] .card-layout-3col {
  gap: calc(var(--slidey-spacing-gap) * 1.75);  /* 56px */
}

[data-layout-density="spacious"] .card-layout-4col {
  gap: calc(var(--slidey-spacing-gap) * 1.5);  /* 48px */
}

[data-layout-density="spacious"] .card-layout-split {
  gap: calc(var(--slidey-spacing-gap) * 2.5);  /* 80px */
}

[data-layout-density="spacious"] .card-layout-bullets li {
  gap: calc(var(--slidey-spacing-gap) * 1);
  margin-bottom: 0.75rem;
}

/* Hero split adjustments */
[data-layout-density="compact"] .card-hero-split {
  gap: calc(var(--slidey-spacing-gap) * 1.5);
}

[data-layout-density="normal"] .card-hero-split {
  gap: calc(var(--slidey-spacing-gap) * 2);
}

[data-layout-density="spacious"] .card-hero-split {
  gap: calc(var(--slidey-spacing-gap) * 2.5);
}
```

---

#### 3.3 React Component Updates

**File:** `packages/slideyui-react/src/types/index.ts` (EDIT)

```typescript
export interface CardContainerProps {
  aspectRatio?: '16/9' | '4/3' | '1/1' | '3/2' | 'auto';
  mode?: 'preview' | 'thumbnail' | 'full';
  layoutDensity?: 'compact' | 'normal' | 'spacious';  // NEW
  // ... existing props
}
```

**File:** `packages/slideyui-react/src/components/cards/CardContainer.tsx` (EDIT)

```tsx
export function CardContainer({
  aspectRatio = '16/9',
  mode = 'preview',
  layoutDensity = 'normal',  // NEW
  className = '',
  children,
  // ... other props
}: CardContainerProps) {
  return (
    <div
      className={clsx('slide-card', className)}
      data-layout-density={layoutDensity}  // NEW
      data-card-id={cardId}
      data-card-state={cardState}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        border: bordered ? '1px solid var(--slidey-border)' : undefined,
        boxShadow: shadow ? '0 2px 8px rgba(0, 0, 0, 0.1)' : undefined,
      }}
    >
      {children}
    </div>
  );
}
```

**File:** `packages/slideyui-react/src/components/layouts/BasicLayouts.tsx` (EDIT)

```tsx
export interface TwoColumnLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  density?: 'compact' | 'normal' | 'spacious';  // NEW
  className?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  density = 'normal',  // NEW
  className = '',
  ...props
}) => {
  return (
    <div
      className={clsx('card-layout-2col', className)}
      data-layout-density={density}  // NEW
      {...props}
    >
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

// Apply to ThreeColumnLayout, FourColumnLayout, SplitLayout, etc.
```

**Svelte Parity:**
Update all Svelte layout components with `layoutDensity` prop.

---

#### 3.4 MCP Schema Updates

**File:** `packages/slideyui-mcp/src/schema/index.ts` (EDIT)

```typescript
export const GenerationOptionsSchema = z.object({
  aspectRatio: z.enum(['16:9', '4:3', '9:16', '1:1']).default('16:9'),
  fontSize: z.enum(['default', 'large', 'xlarge']).default('default'),
  layoutDensity: z.enum(['compact', 'normal', 'spacious']).default('normal'),  // NEW
  minify: z.boolean().default(true),
  includeSlideyUICSS: z.boolean().default(true),
  embedFonts: z.boolean().default(true),
  theme: z.string().default('corporate'),
});
```

**Usage in MCP:**
```typescript
// AI can now specify layout density
const presentation = await createPresentation({
  theme: 'corporate',
  title: 'Q4 Results',
  slides: [
    {
      type: 'two-column',
      left: { /* ... */ },
      right: { /* ... */ },
      layoutDensity: 'spacious',  // NEW
    },
  ],
  options: {
    layoutDensity: 'spacious',  // Global default
  },
});
```

---

## Implementation Timeline

### Phase 1: SVG Generation (8-12 hours)

| Task | Time | Files |
|------|------|-------|
| Add SVG.js + svgdom dependencies | 0.5h | package.json |
| Create SVGBuilder utility | 2h | svg-builder.ts |
| Create icon generator (26 icons) | 3h | icon-generator.ts |
| Create pattern generator | 2h | pattern-generator.ts |
| Update MediaCard for SVG support | 1.5h | MediaCard.tsx, MediaCard.svelte |
| Add generate_svg MCP tool | 2h | generate-svg.ts |
| Add Rough.js support (optional) | 1h | rough-renderer.ts |
| Tests | 2h | *.test.ts |

**Total: 14 hours (12 hours without Rough.js)**

---

### Phase 2: Enhanced Theming (6-8 hours)

| Task | Time | Files |
|------|------|-------|
| Create design presets | 1.5h | presets.ts |
| Add custom CSS injection | 1h | index.ts (plugin) |
| Implement typography scale | 2h | types.ts, utils.ts, typography.css |
| Add theme inheritance/composition | 1.5h | utils.ts |
| Update MCP schema for presets | 0.5h | schema/index.ts |
| Tests | 1.5h | *.test.ts |

**Total: 8 hours**

---

### Phase 3: Layout Density (4-6 hours)

| Task | Time | Files |
|------|------|-------|
| Define LayoutDensity types | 0.5h | types.ts |
| Implement CSS density system | 2h | components.css |
| Update CardContainer | 0.5h | CardContainer.tsx, CardContainer.svelte |
| Update all layout components | 1.5h | BasicLayouts.tsx, BasicLayouts.svelte |
| Update MCP schema | 0.5h | schema/index.ts |
| Tests | 1h | *.test.ts |

**Total: 6 hours**

---

**Grand Total: 26-28 hours of implementation**

---

## Testing Strategy

### Unit Tests

1. **SVG Generation**
   - Test SVGBuilder composability
   - Validate all 26 icon outputs
   - Test pattern generation with different densities
   - Validate theme color application

2. **Theme System**
   - Test preset application
   - Validate custom CSS injection
   - Test typography scale generation
   - Test theme inheritance

3. **Layout Density**
   - Test gap calculations for each density
   - Validate responsive breakpoints
   - Test nested card spacing

### Integration Tests

1. **MCP Server**
   - Test generate_svg tool with all types
   - Test presentation generation with new features
   - Validate schema parsing

2. **React Components**
   - Test MediaCard with SVG content
   - Test layout components with density prop
   - Test CardContainer with layoutDensity

3. **Svelte Components**
   - Mirror all React integration tests
   - Verify framework parity

### E2E Tests

1. **Full Presentation Generation**
   - Create presentation with SVG graphics
   - Apply design preset
   - Use layout density presets
   - Export to HTML/PDF

2. **Theme Switching**
   - Runtime theme switching with custom CSS
   - Typography scale responsiveness

---

## Breaking Changes Assessment

### None (100% Backward Compatible)

All enhancements are **additive only**:

- ✅ New optional props with sensible defaults
- ✅ Existing APIs unchanged
- ✅ Default behavior preserved
- ✅ All new features are opt-in

**Migration Path:** Zero migration required. Existing code continues to work unchanged.

---

## Success Metrics

### Before (Current State)

- ✅ 16 slide templates
- ✅ 5 themes
- ✅ 6 chart types (pure SVG)
- ✅ Image/video media only
- ✅ Fixed layout gaps
- ✅ Monolithic themes

### After (Target State)

- ✅ 16 slide templates (unchanged)
- ✅ 5 base themes + unlimited derived themes
- ✅ 6 chart types + icons + patterns + diagrams
- ✅ Image/video/SVG media support
- ✅ 3 layout density presets (compact, normal, spacious)
- ✅ Design presets for common presentation types
- ✅ Custom CSS injection
- ✅ Configurable typography scales

**Polished Output:** Presentations generated via MCP should be indistinguishable from manually-crafted slides.

---

## Documentation Requirements

1. **API Documentation**
   - SVGBuilder API reference
   - Icon library catalog (26 icons with previews)
   - Pattern library catalog
   - Layout density guide
   - Design preset catalog

2. **Usage Examples**
   - MCP tool examples for each SVG type
   - Theme customization examples
   - Layout density examples

3. **Migration Guide**
   - How to adopt new features (even though backward compatible)
   - Best practices for AI-generated presentations

---

## Future Enhancements (Out of Scope)

These were identified but deferred:

1. **Dark Mode Support** - Theme modes (light/dark variants)
2. **PowerPoint Export** - Native .pptx generation (complex, requires separate library)
3. **Advanced Animations** - Beyond subtle/dynamic/energetic
4. **Interactive Elements** - Click handlers, form inputs
5. **Persistent Custom Themes** - File system storage for custom themes
6. **Advanced Diagrams** - Flowcharts, network graphs, mind maps (consider Mermaid.js integration)

---

## Conclusion

This specification provides a comprehensive, implementable plan to enhance SlideyUI with:

1. **SVG Generation** - Enabling rich, contextual graphics without external image URLs
2. **Enhanced Theming** - More powerful customization with presets and CSS injection
3. **Flexible Layouts** - Eliminating "cramped" feeling with layout density controls

**All enhancements are 100% backward compatible and align with SlideyUI's AI-first design philosophy.**

**Total Implementation Time: 26-28 hours**

**Recommendation: Proceed with Phase 1 (SVG Generation) first, as it provides the highest value for AI-generated presentations.**

---

**Document Version:** 1.0
**Last Updated:** 2025-10-20
**Next Review:** After Phase 1 implementation
