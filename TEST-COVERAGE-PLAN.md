# SlideyUI Enhancement Test Coverage Plan

**Generated:** 2025-10-20
**Status:** Comprehensive Test Specification
**Target Coverage:** 90%+

---

## Overview

This document provides a comprehensive test plan for all enhancement phases (SVG Generation, Enhanced Theming, Layout Density). Tests are organized by package and feature area.

---

## Phase 1: SVG Generation Tests

### 1.1 SVG Builder Tests ✓ CREATED

**File:** `packages/slideyui-mcp/src/utils/svg-builder.test.ts`

**Coverage:**
- [x] Initialization with dimensions and theme
- [x] Circle, rectangle, text, path methods
- [x] Gradient generation and application
- [x] Group elements and transforms
- [x] Theme color resolution (all 5 themes)
- [x] Method chaining and composability
- [x] Error handling (invalid dimensions, parameters)
- [x] SVG output quality (valid markup, escaping, minification)

**Test Count:** 40+ tests
**Key Scenarios:**
- All shape primitives work correctly
- Theme colors resolve properly
- Composability enables complex SVG creation
- Error handling prevents invalid output

---

### 1.2 Icon Generator Tests ✓ CREATED

**File:** `packages/slideyui-mcp/src/utils/icon-generator.test.ts`

**Coverage:**
- [x] All 26 required icons generate valid SVG
- [x] Icon sizing (default 48x48, custom sizes)
- [x] Color application (currentColor, custom, theme)
- [x] Stroke properties (width, caps, joins)
- [x] Theme integration (all 5 themes)
- [x] Icon category coverage (business, communication, actions, media, status, general)
- [x] Accessibility (title, aria-label, decorative mode)
- [x] Error handling (unknown icons, invalid params)

**Test Count:** 50+ tests
**Key Scenarios:**
- Every icon in library renders correctly
- Consistent styling across all icons
- Theme colors apply properly
- Accessibility features work

---

### 1.3 Pattern Generator Tests ✓ CREATED

**File:** `packages/slideyui-mcp/src/utils/pattern-generator.test.ts`

**Coverage:**
- [x] All 11 pattern types generate valid SVG
- [x] Pattern dimensions (standard presentation sizes)
- [x] Density levels (low, medium, high)
- [x] Opacity control (0-1 range)
- [x] Theme integration (all 5 themes)
- [x] Pattern categories (geometric, organic, abstract)
- [x] Pattern definitions (<pattern> element, <defs>)
- [x] Advanced options (background color, rotation, scale)
- [x] Use cases (hero backgrounds, dividers, decorative)
- [x] Performance (generation speed, output size)

**Test Count:** 45+ tests
**Key Scenarios:**
- All pattern types render correctly
- Density affects element count
- Theme colors apply to patterns
- Performance is acceptable for large patterns

---

### 1.4 MCP Tool Tests ✓ CREATED

**File:** `packages/slideyui-mcp/src/tools/generate-svg.test.ts`

**Coverage:**
- [x] Schema validation for all SVG types
- [x] Icon generation (all 26 icons)
- [x] Pattern generation (all 11 patterns)
- [x] Chart generation (integration with chart-renderer)
- [x] Custom SVG generation
- [x] Style variations (default, hand-drawn, minimal)
- [x] Theme application
- [x] Error handling (missing params, invalid types)
- [x] Output quality (valid SVG, escaping, responsive)
- [x] Performance (generation speed)

**Test Count:** 40+ tests
**Key Scenarios:**
- MCP tool delegates to correct generators
- Schema validation prevents invalid inputs
- Integration with existing chart renderer works
- All SVG types produce valid output

---

### 1.5 MediaCard Tests (React) - TO CREATE

**File:** `packages/slideyui-react/src/components/cards/MediaCard.test.tsx`

**Coverage Needed:**
- [ ] Backward compatibility (image, video modes)
- [ ] SVG rendering in interactive mode
- [ ] SVG rendering in image mode (data URI)
- [ ] Error handling with fallback
- [ ] Caption and title overlays
- [ ] Object fit options
- [ ] Background mode
- [ ] Accessibility (alt text, ARIA)

**Test Count:** ~25 tests
**Implementation:**
```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MediaCard } from './MediaCard';

describe('MediaCard - SVG Support', () => {
  it('renders SVG in interactive mode', () => {
    const svgContent = '<svg><circle cx="50" cy="50" r="40" /></svg>';
    const { container } = render(
      <MediaCard
        mediaType="svg"
        svgContent={svgContent}
        svgType="interactive"
        alt="Test Circle"
      />
    );

    expect(container.querySelector('circle')).toBeInTheDocument();
  });

  it('renders SVG as data URI in image mode', () => {
    const svgContent = '<svg><rect x="0" y="0" width="100" height="100" /></svg>';
    render(
      <MediaCard
        mediaType="svg"
        svgContent={svgContent}
        svgType="image"
        alt="Test Rectangle"
      />
    );

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', expect.stringContaining('data:image/svg+xml'));
  });

  it('handles error with fallback image', () => {
    const onError = vi.fn();
    render(
      <MediaCard
        src="/invalid.jpg"
        fallbackImage="/fallback.jpg"
        onError={onError}
        alt="Test"
      />
    );

    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(onError).toHaveBeenCalled();
    expect(img).toHaveAttribute('src', '/fallback.jpg');
  });

  // ... more tests
});
```

---

### 1.6 MediaCard Tests (Svelte) - TO CREATE

**File:** `packages/slideyui-svelte/src/lib/components/MediaCard.test.ts`

**Coverage Needed:**
- Mirror all React MediaCard tests
- Svelte-specific rendering tests
- Verify package parity

**Test Count:** ~25 tests (same as React)

---

## Phase 2: Theme System Tests

### 2.1 Design Presets Tests - TO CREATE

**File:** `packages/slideyui-core/src/presets.test.ts`

**Coverage Needed:**
- [ ] All preset definitions exist
- [ ] Preset application to base themes
- [ ] Override merging logic
- [ ] Preset validation
- [ ] Use cases (tech-startup, academic-research, sales-demo, workshop-interactive)

**Test Count:** ~15 tests
**Implementation:**
```typescript
import { describe, it, expect } from 'vitest';
import { designPresets, applyPreset } from './presets';
import { getTheme } from './themes';

describe('Design Presets', () => {
  it('has all required presets', () => {
    expect(designPresets['tech-startup']).toBeDefined();
    expect(designPresets['academic-research']).toBeDefined();
    expect(designPresets['sales-demo']).toBeDefined();
    expect(designPresets['workshop-interactive']).toBeDefined();
  });

  it('applies preset overrides to base theme', () => {
    const baseTheme = getTheme('startup');
    const preset = designPresets['tech-startup'];
    const result = applyPreset(baseTheme, preset.overrides);

    expect(result.spacing.slidePadding).toBe(4);
    expect(result.features.gradients).toBe(true);
  });

  it('preserves base theme properties not in overrides', () => {
    const baseTheme = getTheme('corporate');
    const preset = designPresets['sales-demo'];
    const result = applyPreset(baseTheme, preset.overrides);

    expect(result.colors.primary).toBe(baseTheme.colors.primary);
    expect(result.fonts.display).toBe(baseTheme.fonts.display);
  });

  // ... more tests
});
```

---

### 2.2 Theme Utils Tests - TO EDIT

**File:** `packages/slideyui-core/src/utils.test.ts` (NEW)

**Coverage Needed:**
- [ ] createDerivedTheme() creates valid themes
- [ ] Typography scale generation
- [ ] Custom CSS injection
- [ ] Theme inheritance chain
- [ ] Validation of derived themes

**Test Count:** ~20 tests
**Implementation:**
```typescript
import { describe, it, expect } from 'vitest';
import { createDerivedTheme, generateTypographyScale } from './utils';

describe('Theme Utils', () => {
  it('creates derived theme from base', () => {
    const derived = createDerivedTheme('corporate', {
      colors: { primary: '#ff5733' }
    }, {
      id: 'custom-corp',
      name: 'Custom Corporate'
    });

    expect(derived.id).toBe('custom-corp');
    expect(derived.colors.primary).toBe('#ff5733');
    expect(derived.colors.background).toBe(getTheme('corporate').colors.background);
  });

  it('generates typography scale with clamp values', () => {
    const scale = generateTypographyScale({
      hero: { min: '3rem', preferred: '8vw', max: '6rem' },
      // ... other levels
    });

    expect(scale['--slidey-text-hero']).toContain('clamp');
    expect(scale['--slidey-text-hero']).toContain('3rem');
    expect(scale['--slidey-text-hero']).toContain('8vw');
    expect(scale['--slidey-text-hero']).toContain('6rem');
  });

  // ... more tests
});
```

---

### 2.3 Tailwind Plugin Tests - TO CREATE

**File:** `packages/slideyui-core/src/index.test.ts`

**Coverage Needed:**
- [ ] Plugin initialization
- [ ] Custom CSS injection
- [ ] CSS layers (animations, utilities, components)
- [ ] Theme resolution
- [ ] Preset application via config

**Test Count:** ~15 tests

---

## Phase 3: Layout Density Tests

### 3.1 Layout Density CSS Tests - TO CREATE

**File:** `packages/slideyui-core/src/components.test.ts` (NEW - CSS tests)

**Coverage Needed:**
- [ ] Density presets generate correct CSS variables
- [ ] Gap calculations for each density
- [ ] All layout types respect density
- [ ] data-layout-density attribute application

**Test Count:** ~20 tests
**Note:** CSS testing may require PostCSS parsing or snapshot testing

---

### 3.2 BasicLayouts Tests (React) - TO CREATE

**File:** `packages/slideyui-react/src/components/layouts/BasicLayouts.test.tsx`

**Coverage Needed:**
- [ ] TwoColumnLayout with density prop
- [ ] ThreeColumnLayout with density prop
- [ ] FourColumnLayout with density prop
- [ ] SplitLayout with density prop
- [ ] Gap calculations verify correctly
- [ ] data-layout-density attribute set

**Test Count:** ~20 tests
**Implementation:**
```tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { TwoColumnLayout } from './BasicLayouts';

describe('BasicLayouts - Density', () => {
  it('applies compact density', () => {
    const { container } = render(
      <TwoColumnLayout
        left={<div>Left</div>}
        right={<div>Right</div>}
        density="compact"
      />
    );

    const layout = container.firstChild;
    expect(layout).toHaveAttribute('data-layout-density', 'compact');
  });

  it('applies normal density by default', () => {
    const { container } = render(
      <TwoColumnLayout
        left={<div>Left</div>}
        right={<div>Right</div>}
      />
    );

    const layout = container.firstChild;
    expect(layout).toHaveAttribute('data-layout-density', 'normal');
  });

  it('applies spacious density', () => {
    const { container } = render(
      <TwoColumnLayout
        left={<div>Left</div>}
        right={<div>Right</div>}
        density="spacious"
      />
    );

    const layout = container.firstChild;
    expect(layout).toHaveAttribute('data-layout-density', 'spacious');
  });

  // ... test all layout types
});
```

---

### 3.3 BasicLayouts Tests (Svelte) - TO CREATE

**File:** `packages/slideyui-svelte/src/lib/components/layouts/BasicLayouts.test.ts`

**Coverage Needed:**
- Mirror all React BasicLayouts tests
- Verify package parity

**Test Count:** ~20 tests

---

### 3.4 MCP Schema Updates Test - TO EDIT

**File:** `packages/slideyui-mcp/src/schema/index.test.ts` (EDIT)

**Coverage Needed:**
- [ ] GenerationOptionsSchema includes layoutDensity
- [ ] layoutDensity defaults to 'normal'
- [ ] layoutDensity validates enum values
- [ ] Slide specs accept layoutDensity prop

**Test Count:** ~10 additional tests

---

## Phase 4: Integration Tests

### 4.1 End-to-End Presentation Generation - TO CREATE

**File:** `packages/slideyui-mcp/src/__tests__/enhancement-integration.test.ts`

**Coverage Needed:**
- [ ] Create presentation with SVG icons
- [ ] Create presentation with SVG patterns
- [ ] Create presentation with custom theme preset
- [ ] Create presentation with layout density
- [ ] Create presentation combining all features
- [ ] Export presentation with embedded SVGs
- [ ] Verify SVG embedding in HTML output
- [ ] Verify theme preset application
- [ ] Verify layout density CSS

**Test Count:** ~15 tests
**Implementation:**
```typescript
import { describe, it, expect } from 'vitest';
import { createPresentation, addSlide, generateHTML } from '../generator';
import { generateIcon } from '../utils/icon-generator';
import { generatePattern } from '../utils/pattern-generator';

describe('Enhancement Integration Tests', () => {
  it('creates presentation with SVG icons', async () => {
    const presentation = await createPresentation({
      title: 'Icon Test',
      theme: 'corporate',
      slides: []
    });

    const iconSVG = generateIcon('briefcase', { size: 64, theme: 'corporate' });

    await addSlide(presentation.id, {
      type: 'media',
      mediaType: 'svg',
      svgContent: iconSVG,
      title: 'Business Icon'
    });

    const html = await generateHTML(presentation.id);
    expect(html).toContain('<svg');
    expect(html).toContain('briefcase');
  });

  it('creates presentation with background patterns', async () => {
    const presentation = await createPresentation({
      title: 'Pattern Test',
      theme: 'startup',
      slides: []
    });

    const patternSVG = generatePattern('dots', {
      width: 1920,
      height: 1080,
      theme: 'startup',
      opacity: 0.05
    });

    await addSlide(presentation.id, {
      type: 'hero',
      title: 'Welcome',
      backgroundPattern: patternSVG
    });

    const html = await generateHTML(presentation.id);
    expect(html).toContain('<svg');
    expect(html).toContain('pattern');
  });

  it('applies design preset to presentation', async () => {
    const presentation = await createPresentation({
      title: 'Preset Test',
      preset: 'tech-startup',
      slides: []
    });

    const html = await generateHTML(presentation.id);
    // Should have tech-startup specific styles
    expect(html).toContain('gradient');
  });

  it('applies layout density to all slides', async () => {
    const presentation = await createPresentation({
      title: 'Density Test',
      theme: 'corporate',
      options: {
        layoutDensity: 'spacious'
      },
      slides: [
        {
          type: 'two-column',
          left: { content: 'Left' },
          right: { content: 'Right' }
        }
      ]
    });

    const html = await generateHTML(presentation.id);
    expect(html).toContain('data-layout-density="spacious"');
  });

  it('combines SVG, theme preset, and layout density', async () => {
    const iconSVG = generateIcon('trend-up', { size: 48, theme: 'startup' });
    const patternSVG = generatePattern('rays', {
      width: 1920,
      height: 1080,
      theme: 'startup',
      opacity: 0.1
    });

    const presentation = await createPresentation({
      title: 'Full Feature Test',
      preset: 'tech-startup',
      options: {
        layoutDensity: 'spacious'
      },
      slides: [
        {
          type: 'hero',
          title: 'Growth',
          backgroundPattern: patternSVG
        },
        {
          type: 'media',
          mediaType: 'svg',
          svgContent: iconSVG,
          title: 'Success Metrics'
        }
      ]
    });

    const html = await generateHTML(presentation.id);

    // Verify all features present
    expect(html).toContain('data-layout-density="spacious"');
    expect(html).toContain('<svg'); // Icons and patterns
    expect(html).toContain('gradient'); // Tech-startup preset
  });
});
```

---

## Test Infrastructure Requirements

### Package Updates Needed

#### 1. packages/slideyui-react/package.json

Add testing dependencies:
```json
{
  "devDependencies": {
    "@testing-library/react": "^14.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "@vitejs/plugin-react": "^4.2.0",
    "jsdom": "^23.0.0",
    "vitest": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

#### 2. packages/slideyui-svelte/package.json

Add testing dependencies:
```json
{
  "devDependencies": {
    "@testing-library/svelte": "^4.0.0",
    "@testing-library/jest-dom": "^6.1.0",
    "@testing-library/user-event": "^14.5.0",
    "vitest": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "jsdom": "^23.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

#### 3. packages/slideyui-core/package.json

Add testing dependencies:
```json
{
  "devDependencies": {
    "vitest": "^1.0.0",
    "@vitest/coverage-v8": "^1.0.0",
    "postcss": "^8.4.0"
  },
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

## Test Execution Plan

### Phase 1: SVG Generation (COMPLETED)
```bash
cd packages/slideyui-mcp
npm test src/utils/svg-builder.test.ts
npm test src/utils/icon-generator.test.ts
npm test src/utils/pattern-generator.test.ts
npm test src/tools/generate-svg.test.ts
```

**Expected Results:**
- 175+ tests passing
- 90%+ coverage of new SVG utilities

---

### Phase 2: Component Tests (TO RUN)
```bash
# React
cd packages/slideyui-react
npm test src/components/cards/MediaCard.test.tsx
npm test src/components/layouts/BasicLayouts.test.tsx

# Svelte
cd packages/slideyui-svelte
npm test src/lib/components/MediaCard.test.ts
npm test src/lib/components/layouts/BasicLayouts.test.ts
```

**Expected Results:**
- 90+ tests passing
- Verify package parity between React and Svelte

---

### Phase 3: Theme Tests (TO RUN)
```bash
cd packages/slideyui-core
npm test src/presets.test.ts
npm test src/utils.test.ts
npm test src/index.test.ts
```

**Expected Results:**
- 50+ tests passing
- 90%+ coverage of theme system

---

### Phase 4: Integration Tests (TO RUN)
```bash
cd packages/slideyui-mcp
npm test src/__tests__/enhancement-integration.test.ts
```

**Expected Results:**
- 15+ tests passing
- End-to-end feature verification

---

### Full Suite Execution
```bash
# From monorepo root
npm test --workspaces

# With coverage
npm run test:coverage --workspaces
```

**Expected Overall Results:**
- 400+ total tests
- 90%+ overall coverage
- All packages passing

---

## Coverage Goals

### By Package

| Package | Target Coverage | Test Count | Status |
|---------|----------------|------------|--------|
| @slideyui/mcp | 90%+ | 200+ | ✓ SVG tests created |
| @slideyui/react | 85%+ | 50+ | Pending |
| @slideyui/svelte | 85%+ | 50+ | Pending |
| @slideyui/core | 85%+ | 50+ | Pending |

### By Feature

| Feature | Target Coverage | Test Count | Status |
|---------|----------------|------------|--------|
| SVG Generation | 95%+ | 135+ | ✓ Complete |
| Icon Library | 100% | 50+ | ✓ Complete |
| Pattern Library | 100% | 45+ | ✓ Complete |
| MCP Tool | 90%+ | 40+ | ✓ Complete |
| MediaCard SVG | 85%+ | 25+ | Pending |
| Theme Presets | 90%+ | 15+ | Pending |
| Theme Utils | 90%+ | 20+ | Pending |
| Layout Density | 85%+ | 40+ | Pending |
| Integration | 80%+ | 15+ | Pending |

---

## Edge Cases & Error Scenarios

### Critical Test Scenarios

1. **SVG Security**
   - XSS prevention in SVG content
   - HTML escaping in all text
   - Sanitization of user inputs

2. **Theme Fallbacks**
   - Unknown theme names
   - Invalid color values
   - Missing theme properties

3. **Layout Edge Cases**
   - Zero-width/height elements
   - Extreme density values
   - Nested layouts

4. **Performance**
   - Large pattern generation
   - High-density layouts
   - Multiple SVG embeds

5. **Browser Compatibility**
   - SVG data URI support
   - CSS custom property fallbacks
   - Layout density in older browsers

---

## Next Steps

### Immediate Actions Required

1. **Install Test Dependencies**
   ```bash
   cd packages/slideyui-react && npm install --save-dev @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom vitest @vitest/coverage-v8
   cd packages/slideyui-svelte && npm install --save-dev @testing-library/svelte @testing-library/jest-dom jsdom vitest @vitest/coverage-v8
   cd packages/slideyui-core && npm install --save-dev vitest @vitest/coverage-v8 postcss
   ```

2. **Create Test Files**
   - MediaCard.test.tsx (React)
   - MediaCard.test.ts (Svelte)
   - BasicLayouts.test.tsx (React)
   - BasicLayouts.test.ts (Svelte)
   - presets.test.ts (Core)
   - utils.test.ts (Core)
   - enhancement-integration.test.ts (MCP)

3. **Run Test Suites**
   - Verify all existing tests still pass
   - Run new SVG generation tests
   - Verify coverage thresholds

4. **Generate Coverage Report**
   ```bash
   npm run test:coverage --workspaces
   ```

---

## Success Criteria

### Test Suite Complete When:

- [x] All 4 SVG generation test files created
- [ ] All component test files created (React + Svelte)
- [ ] All theme system test files created
- [ ] Integration test file created
- [ ] All tests passing
- [ ] 90%+ coverage achieved
- [ ] No failing edge cases
- [ ] Performance benchmarks met
- [ ] Package parity verified

---

## Notes

### Testing Best Practices Followed

1. **Arrange-Act-Assert Pattern**
   - Clear test structure
   - Minimal setup/teardown
   - Explicit assertions

2. **Test Naming**
   - Descriptive test names
   - Behavior-focused (not implementation)
   - Clear intent

3. **Test Independence**
   - No shared state
   - Tests can run in any order
   - Isolated test cases

4. **Coverage Focus**
   - Critical paths tested first
   - Edge cases included
   - Error scenarios covered

5. **Package Parity**
   - React and Svelte tests mirror each other
   - Same test scenarios
   - Equivalent assertions

---

## Conclusion

This comprehensive test plan provides:
- **175+ tests already created** for SVG generation
- **Clear specifications** for remaining 225+ tests
- **Detailed implementation examples**
- **Coverage tracking by feature and package**
- **Success criteria and next steps**

The test suite is designed to:
- Ensure all enhancement features work correctly
- Prevent regressions during development
- Verify package parity between frameworks
- Provide confidence in code quality

**Current Status:** Phase 1 (SVG Generation) tests complete. Ready to proceed with component, theme, and integration tests.
