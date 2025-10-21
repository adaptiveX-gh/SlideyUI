# Phase 2: Enhanced Theme System - Usage Examples

This document provides practical, copy-paste examples for all Phase 2 features.

---

## Table of Contents

1. [Design Presets](#1-design-presets)
2. [Custom CSS Variables](#2-custom-css-variables)
3. [Custom CSS Layers](#3-custom-css-layers)
4. [Typography Scales](#4-typography-scales)
5. [Theme Composition](#5-theme-composition)
6. [Theme Registry](#6-theme-registry)
7. [Advanced Examples](#7-advanced-examples)

---

## 1. Design Presets

### Basic Preset Usage

```javascript
// tailwind.config.js
import slideyUI from '@slideyui/core';

export default {
  plugins: [
    slideyUI({
      preset: 'tech-startup', // Auto-applies to startup theme
    }),
  ],
};
```

### All Available Presets

```javascript
// Tech Startup Pitch
slideyUI({ preset: 'tech-startup' })

// Academic Research
slideyUI({ preset: 'academic-research' })

// Sales Demo
slideyUI({ preset: 'sales-demo' })

// Workshop Interactive
slideyUI({ preset: 'workshop-interactive' })
```

### Preset with Theme Override

```javascript
slideyUI({
  theme: 'corporate',     // Base theme
  preset: 'sales-demo',   // Preset overrides
});
```

---

## 2. Custom CSS Variables

### Brand Colors

```javascript
slideyUI({
  theme: 'corporate',
  customCSS: {
    '--brand-primary': '#1E3A8A',
    '--brand-secondary': '#F59E0B',
    '--brand-accent': '#10B981',
  },
});
```

### Brand Spacing

```javascript
slideyUI({
  theme: 'startup',
  customCSS: {
    '--brand-padding-sm': '1.5rem',
    '--brand-padding': '3rem',
    '--brand-padding-lg': '5rem',
    '--brand-gap': '2rem',
  },
});
```

### Brand Effects

```javascript
slideyUI({
  theme: 'pitch-deck',
  customCSS: {
    '--brand-shadow': '0 10px 40px rgba(0, 0, 0, 0.15)',
    '--brand-shadow-hover': '0 20px 60px rgba(0, 0, 0, 0.25)',
    '--brand-transition': 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    '--brand-border-radius': '16px',
  },
});
```

### Complete Brand Kit

```javascript
slideyUI({
  theme: 'corporate',
  customCSS: {
    // Colors
    '--brand-navy': '#0A2540',
    '--brand-blue': '#0066FF',
    '--brand-cyan': '#00D4FF',
    '--brand-green': '#00C896',
    '--brand-yellow': '#FFB800',

    // Gradients
    '--brand-gradient-primary': 'linear-gradient(135deg, #0066FF, #00D4FF)',
    '--brand-gradient-success': 'linear-gradient(135deg, #00C896, #00FFB3)',

    // Typography
    '--brand-font-heading': '"Poppins", sans-serif',
    '--brand-font-body': '"Inter", sans-serif',

    // Spacing
    '--brand-space-xs': '0.5rem',
    '--brand-space-sm': '1rem',
    '--brand-space-md': '2rem',
    '--brand-space-lg': '3rem',
    '--brand-space-xl': '5rem',

    // Effects
    '--brand-shadow-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
    '--brand-shadow-md': '0 8px 24px rgba(0, 0, 0, 0.12)',
    '--brand-shadow-lg': '0 16px 48px rgba(0, 0, 0, 0.16)',
    '--brand-transition-fast': '150ms ease',
    '--brand-transition-base': '300ms ease',
    '--brand-transition-slow': '500ms ease',
  },
});
```

---

## 3. Custom CSS Layers

### Custom Animations

```javascript
slideyUI({
  theme: 'startup',
  cssLayers: {
    animations: `
      @keyframes slideInLeft {
        from {
          transform: translateX(-100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }

      @keyframes fadeInUp {
        from {
          transform: translateY(20px);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }

      @keyframes pulse {
        0%, 100% {
          opacity: 1;
        }
        50% {
          opacity: 0.6;
        }
      }

      @keyframes shimmer {
        0% {
          background-position: -1000px 0;
        }
        100% {
          background-position: 1000px 0;
        }
      }
    `,
  },
});
```

### Custom Utilities

```javascript
slideyUI({
  theme: 'corporate',
  cssLayers: {
    utilities: `
      /* Brand Gradient Text */
      .brand-gradient-text {
        background: var(--brand-gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      /* Glassmorphism */
      .glass {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      /* Animated Underline */
      .animated-underline {
        position: relative;
      }
      .animated-underline::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: var(--slidey-accent);
        transition: width 300ms ease;
      }
      .animated-underline:hover::after {
        width: 100%;
      }

      /* Hover Lift */
      .hover-lift {
        transition: transform 300ms ease, box-shadow 300ms ease;
      }
      .hover-lift:hover {
        transform: translateY(-4px);
        box-shadow: var(--brand-shadow-lg);
      }
    `,
  },
});
```

### Custom Components

```javascript
slideyUI({
  theme: 'startup',
  cssLayers: {
    components: `
      /* Brand Card */
      .brand-card {
        background: var(--slidey-background);
        border: 2px solid var(--slidey-border);
        border-radius: var(--brand-border-radius, 12px);
        padding: var(--brand-space-lg, 3rem);
        box-shadow: var(--brand-shadow-md);
        transition: var(--brand-transition-base);
      }

      .brand-card:hover {
        border-color: var(--slidey-primary);
        box-shadow: var(--brand-shadow-lg);
        transform: translateY(-2px);
      }

      /* Metric Display */
      .metric {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .metric-value {
        font-size: clamp(2.5rem, 6vw, 5rem);
        font-weight: 800;
        color: var(--slidey-primary);
        line-height: 1;
      }

      .metric-label {
        font-size: clamp(1rem, 2vw, 1.5rem);
        color: var(--slidey-muted-foreground);
        text-transform: uppercase;
        letter-spacing: 0.1em;
      }

      /* Feature Grid */
      .feature-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--brand-gap, 2rem);
      }

      .feature-item {
        padding: var(--brand-space-md, 2rem);
        background: var(--slidey-muted);
        border-radius: 8px;
        transition: background 200ms ease;
      }

      .feature-item:hover {
        background: var(--slidey-background);
      }
    `,
  },
});
```

---

## 4. Typography Scales

### Custom Typography Scale

```typescript
import { createDerivedTheme, registerTheme } from '@slideyui/core';

const customTheme = createDerivedTheme('corporate', {
  typography: {
    hero: {
      min: '3.5rem',
      preferred: '9vw',
      max: '7rem',
      weight: 900,
      lineHeight: 1.05,
    },
    h1: {
      min: '2.5rem',
      preferred: '6vw',
      max: '5rem',
      weight: 800,
      lineHeight: 1.1,
    },
    h2: {
      min: '2rem',
      preferred: '4.5vw',
      max: '3.5rem',
      weight: 700,
      lineHeight: 1.2,
    },
    h3: {
      min: '1.5rem',
      preferred: '3.5vw',
      max: '2.5rem',
      weight: 600,
      lineHeight: 1.3,
    },
    body: {
      min: '1.25rem',
      preferred: '2.5vw',
      max: '2rem',
      weight: 400,
      lineHeight: 1.5,
    },
    caption: {
      min: '1rem',
      preferred: '1.75vw',
      max: '1.5rem',
      weight: 400,
      lineHeight: 1.4,
    },
  },
}, {
  id: 'custom-typography',
  name: 'Custom Typography Theme',
});

registerTheme(customTheme);
```

### Large Display Typography

```typescript
const largeDisplayTheme = createDerivedTheme('startup', {
  typography: {
    hero: {
      min: '4rem',
      preferred: '12vw',
      max: '10rem',
      weight: 900,
      lineHeight: 1.0,
    },
    h1: {
      min: '3rem',
      preferred: '8vw',
      max: '6rem',
      weight: 800,
      lineHeight: 1.1,
    },
    // ... other levels
  },
}, {
  id: 'large-display',
  name: 'Large Display Theme',
});
```

### Compact Typography

```typescript
const compactTheme = createDerivedTheme('academic', {
  typography: {
    hero: {
      min: '2.5rem',
      preferred: '6vw',
      max: '4.5rem',
      weight: 700,
      lineHeight: 1.2,
    },
    h1: {
      min: '2rem',
      preferred: '4.5vw',
      max: '3.5rem',
      weight: 700,
      lineHeight: 1.25,
    },
    // ... other levels
  },
}, {
  id: 'compact',
  name: 'Compact Typography Theme',
});
```

---

## 5. Theme Composition

### Extend with Color Changes

```typescript
import { createDerivedTheme, registerTheme } from '@slideyui/core';

const myBrandTheme = createDerivedTheme('corporate', {
  colors: {
    primary: '#FF5733',
    accent: '#00D4FF',
  },
}, {
  id: 'my-brand',
  name: 'My Brand Theme',
});

registerTheme(myBrandTheme);
```

### Extend with Features

```typescript
const presentationTheme = createDerivedTheme('academic', {
  features: {
    gradients: true,
    animations: true,
    dataVisualization: true,
  },
  spacing: {
    slidePadding: 4,
    contentGap: 3,
  },
}, {
  id: 'modern-academic',
  name: 'Modern Academic Theme',
});
```

### Complete Custom Theme

```typescript
const conferenceTheme = createDerivedTheme('corporate', {
  colors: {
    primary: '#2E3A59',
    primaryForeground: '#FFFFFF',
    secondary: '#5D6D7E',
    secondaryForeground: '#FFFFFF',
    accent: '#F39C12',
    accentForeground: '#000000',
    background: '#FFFFFF',
    foreground: '#1A1A1A',
    muted: '#F5F5F5',
    mutedForeground: '#6C757D',
    border: '#E0E0E0',
  },
  fonts: {
    display: ['Montserrat', 'sans-serif'],
    body: ['Open Sans', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  spacing: {
    base: 1,
    slidePadding: 4,
    contentGap: 3,
  },
  features: {
    citations: true,
    gradients: true,
    animations: true,
    dataVisualization: true,
  },
  typography: {
    hero: {
      min: '3.5rem',
      preferred: '8vw',
      max: '6.5rem',
      weight: 800,
      lineHeight: 1.1,
    },
    // ... rest of typography
  },
}, {
  id: 'conference-2025',
  name: 'Conference 2025',
  description: 'Professional conference presentation theme',
});

registerTheme(conferenceTheme);
```

---

## 6. Theme Registry

### Register Multiple Themes

```typescript
import { registerTheme, getThemeIds } from '@slideyui/core';

// Register themes
registerTheme(myBrandTheme);
registerTheme(clientTheme);
registerTheme(conferenceTheme);

// List all available themes
console.log(getThemeIds());
// ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup',
//  'my-brand', 'client', 'conference-2025']
```

### Dynamic Theme Loading

```typescript
import { registerTheme, getTheme } from '@slideyui/core';

// Load theme from API
async function loadCustomTheme(themeId: string) {
  const response = await fetch(`/api/themes/${themeId}`);
  const themeData = await response.json();

  const customTheme = createDerivedTheme(
    themeData.baseTheme,
    themeData.overrides,
    { id: themeId, name: themeData.name }
  );

  registerTheme(customTheme);
  return customTheme;
}

// Use it
const theme = await loadCustomTheme('client-abc');
```

### Unregister Themes

```typescript
import { unregisterTheme, clearCustomThemes } from '@slideyui/core';

// Remove a single theme
unregisterTheme('my-brand');

// Clear all custom themes
clearCustomThemes();
```

---

## 7. Advanced Examples

### Multi-Brand Platform

```typescript
// themes/brands.ts
import { createDerivedTheme, registerTheme } from '@slideyui/core';

const brands = {
  'acme-corp': {
    colors: {
      primary: '#E63946',
      accent: '#F1FAEE',
    },
  },
  'tech-inc': {
    colors: {
      primary: '#457B9D',
      accent: '#A8DADC',
    },
  },
  'green-co': {
    colors: {
      primary: '#2D6A4F',
      accent: '#95D5B2',
    },
  },
};

// Register all brand themes
Object.entries(brands).forEach(([id, config]) => {
  const theme = createDerivedTheme('corporate', config, {
    id,
    name: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
  });
  registerTheme(theme);
});

export { brands };
```

### Preset + Typography + Custom CSS

```javascript
// tailwind.config.js
import slideyUI from '@slideyui/core';
import { createDerivedTheme, registerTheme } from '@slideyui/core';

// Create custom theme
const myTheme = createDerivedTheme('startup', {
  typography: {
    hero: {
      min: '4rem',
      preferred: '10vw',
      max: '8rem',
      weight: 900,
      lineHeight: 1.05,
    },
    // ... rest
  },
}, { id: 'my-custom', name: 'My Custom Theme' });

registerTheme(myTheme);

export default {
  plugins: [
    slideyUI({
      theme: 'my-custom',           // Use custom theme
      preset: 'tech-startup',       // Apply preset
      customCSS: {                  // Add brand CSS
        '--brand-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      },
      cssLayers: {                  // Add custom utilities
        utilities: `
          .brand-hero {
            background: var(--brand-gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }
        `,
      },
    }),
  ],
};
```

### Theme Variants

```typescript
// themes/variants.ts
import { createDerivedTheme } from '@slideyui/core';

const baseTheme = 'corporate';

export const variants = {
  light: createDerivedTheme(baseTheme, {
    colors: {
      background: '#FFFFFF',
      foreground: '#1A1A1A',
    },
  }, { id: 'corporate-light', name: 'Corporate Light' }),

  dark: createDerivedTheme(baseTheme, {
    colors: {
      background: '#1A1A1A',
      foreground: '#FFFFFF',
      muted: '#2D2D2D',
      border: '#404040',
    },
  }, { id: 'corporate-dark', name: 'Corporate Dark' }),

  highContrast: createDerivedTheme(baseTheme, {
    colors: {
      background: '#000000',
      foreground: '#FFFFFF',
      primary: '#FFFFFF',
      accent: '#FFFF00',
      border: '#FFFFFF',
    },
  }, { id: 'corporate-high-contrast', name: 'Corporate High Contrast' }),
};

// Register all variants
Object.values(variants).forEach(registerTheme);
```

### Responsive Typography

```typescript
const responsiveTheme = createDerivedTheme('corporate', {
  typography: {
    hero: {
      min: '2.5rem',    // Mobile
      preferred: '8vw',  // Responsive
      max: '6rem',       // Desktop
      weight: 800,
      lineHeight: 1.1,
    },
    h1: {
      min: '2rem',
      preferred: '5vw',
      max: '4rem',
      weight: 700,
      lineHeight: 1.2,
    },
    h2: {
      min: '1.75rem',
      preferred: '4vw',
      max: '3rem',
      weight: 600,
      lineHeight: 1.3,
    },
    h3: {
      min: '1.5rem',
      preferred: '3vw',
      max: '2.5rem',
      weight: 600,
      lineHeight: 1.3,
    },
    body: {
      min: '1.125rem',  // 18px minimum for readability
      preferred: '2vw',
      max: '1.75rem',
      weight: 400,
      lineHeight: 1.6,
    },
    caption: {
      min: '0.875rem',
      preferred: '1.5vw',
      max: '1.25rem',
      weight: 400,
      lineHeight: 1.5,
    },
  },
}, {
  id: 'responsive',
  name: 'Responsive Typography Theme',
});
```

---

## Usage in React Components

```tsx
// Use custom CSS variables in components
import React from 'react';

export function BrandCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="brand-card"
      style={{
        background: 'var(--slidey-background)',
        borderColor: 'var(--brand-primary)',
        padding: 'var(--brand-space-lg)',
      }}
    >
      {children}
    </div>
  );
}

export function MetricDisplay({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric">
      <div className="metric-value" style={{ color: 'var(--brand-primary)' }}>
        {value}
      </div>
      <div className="metric-label">{label}</div>
    </div>
  );
}
```

---

## Testing Your Configuration

```typescript
// test-theme.ts
import { getTheme, getPreset, createDerivedTheme } from '@slideyui/core';

// Test preset
const preset = getPreset('tech-startup');
console.log('Preset:', preset);

// Test theme
const theme = getTheme('corporate');
console.log('Theme:', theme);

// Test derived theme
const custom = createDerivedTheme('corporate', {
  colors: { primary: '#FF5733' },
}, { id: 'test', name: 'Test Theme' });
console.log('Custom theme:', custom);
```

---

## Best Practices

1. **Use Presets First** - Start with a preset, then customize
2. **Semantic Variables** - Name custom CSS variables semantically (e.g., `--brand-primary` not `--blue`)
3. **Fallback Values** - Always provide fallbacks in CSS: `var(--custom-value, fallback)`
4. **Type Safety** - Use TypeScript for theme configuration
5. **Test Responsiveness** - Test typography scales at different viewport sizes
6. **Document Custom Variables** - Keep a reference of all custom CSS variables
7. **Version Control** - Store theme configurations in version control

---

## Troubleshooting

### Preset Not Applied

```javascript
// ❌ Wrong - theme doesn't match preset
slideyUI({
  theme: 'corporate',
  preset: 'tech-startup', // Preset is for startup theme
});

// ✅ Correct - let preset determine theme
slideyUI({
  preset: 'tech-startup',
});
```

### Custom CSS Not Working

```javascript
// ❌ Wrong - missing '--' prefix
slideyUI({
  customCSS: {
    'brand-color': '#FF5733', // Won't work
  },
});

// ✅ Correct - CSS variables need '--' prefix
slideyUI({
  customCSS: {
    '--brand-color': '#FF5733',
  },
});
```

### Typography Scale Not Applied

```typescript
// ❌ Wrong - missing required properties
const theme = createDerivedTheme('corporate', {
  typography: {
    hero: {
      min: '3rem',
      // Missing: preferred, max, weight, lineHeight
    },
  },
});

// ✅ Correct - all properties provided
const theme = createDerivedTheme('corporate', {
  typography: {
    hero: {
      min: '3rem',
      preferred: '8vw',
      max: '6rem',
      weight: 800,
      lineHeight: 1.1,
    },
  },
});
```

---

## Further Reading

- **PHASE-2-IMPLEMENTATION.md** - Complete technical documentation
- **ENHANCEMENT-SPEC.md** - Original enhancement specification
- **SlideyUI Documentation** - Full component and API reference

---

**Last Updated:** 2025-10-20
**Version:** 1.0
