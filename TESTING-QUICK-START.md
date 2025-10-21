# Testing Quick Start Guide

This is a quick reference for running and understanding the SlideyUI test suite.

---

## Quick Commands

### Run All Tests
```bash
# From monorepo root
npm test --workspaces

# With coverage
npm run test:coverage --workspaces
```

### Run Tests by Package
```bash
# MCP Server (SVG generation tests)
cd packages/slideyui-mcp && npm test

# React Components
cd packages/slideyui-react && npm test

# Svelte Components
cd packages/slideyui-svelte && npm test

# Core (themes, layouts)
cd packages/slideyui-core && npm test
```

### Run Specific Test File
```bash
npm test path/to/file.test.ts
```

### Watch Mode
```bash
npm test -- --watch
```

### UI Mode
```bash
npm run test:ui
```

---

## What's Been Created

### ✓ Phase 1: SVG Generation (175+ tests)

**Created Test Files:**
1. `packages/slideyui-mcp/src/utils/svg-builder.test.ts` (40+ tests)
2. `packages/slideyui-mcp/src/utils/icon-generator.test.ts` (50+ tests)
3. `packages/slideyui-mcp/src/utils/pattern-generator.test.ts` (45+ tests)
4. `packages/slideyui-mcp/src/tools/generate-svg.test.ts` (40+ tests)

**Status:** ✓ Tests created, waiting for implementation

---

## What Needs to Be Done

### 1. Implement SVG Utilities (Required for Phase 1 tests to pass)

Create these files to match the test specs:
- `packages/slideyui-mcp/src/utils/svg-builder.ts`
- `packages/slideyui-mcp/src/utils/icon-generator.ts`
- `packages/slideyui-mcp/src/utils/pattern-generator.ts`
- `packages/slideyui-mcp/src/tools/generate-svg.ts`

**Tip:** Tests define the API. Implement features to make tests pass (TDD approach).

### 2. Install Test Dependencies for Other Packages

```bash
# React
cd packages/slideyui-react
npm install --save-dev @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom vitest @vitest/coverage-v8

# Svelte
cd packages/slideyui-svelte
npm install --save-dev @testing-library/svelte @testing-library/jest-dom jsdom vitest @vitest/coverage-v8

# Core
cd packages/slideyui-core
npm install --save-dev vitest @vitest/coverage-v8 postcss
```

### 3. Create Remaining Test Files

Use specifications in `TEST-COVERAGE-PLAN.md` to create:
- Component tests (MediaCard, BasicLayouts)
- Theme system tests (presets, utils)
- Integration tests

**Implementation examples provided in TEST-COVERAGE-PLAN.md**

---

## Test Files Reference

| File | Tests | Coverage | Status |
|------|-------|----------|--------|
| **Phase 1: SVG Generation** ||||
| svg-builder.test.ts | 40+ | SVGBuilder utility | ✓ Created |
| icon-generator.test.ts | 50+ | 26 icons | ✓ Created |
| pattern-generator.test.ts | 45+ | 11 patterns | ✓ Created |
| generate-svg.test.ts | 40+ | MCP tool | ✓ Created |
| **Phase 2: Components** ||||
| MediaCard.test.tsx | 25+ | React SVG support | Spec provided |
| MediaCard.test.ts | 25+ | Svelte SVG support | Spec provided |
| BasicLayouts.test.tsx | 20+ | React density | Spec provided |
| BasicLayouts.test.ts | 20+ | Svelte density | Spec provided |
| **Phase 3: Theming** ||||
| presets.test.ts | 15+ | Design presets | Spec provided |
| utils.test.ts | 20+ | Theme utilities | Spec provided |
| index.test.ts | 15+ | Plugin config | Spec provided |
| **Phase 4: Integration** ||||
| enhancement-integration.test.ts | 15+ | E2E features | Spec provided |

---

## Coverage Goals

| Package | Target | Current |
|---------|--------|---------|
| @slideyui/mcp | 90%+ | TBD (tests created) |
| @slideyui/react | 85%+ | TBD (specs provided) |
| @slideyui/svelte | 85%+ | TBD (specs provided) |
| @slideyui/core | 85%+ | TBD (specs provided) |

---

## Test Patterns

### All tests follow:
- **Arrange-Act-Assert** pattern
- **Descriptive naming** (behavior-focused)
- **Independence** (no shared state)
- **Comprehensive** (happy path + edge cases)

### Example:
```typescript
it('generates icon with custom size', () => {
  // Arrange
  const size = 64;

  // Act
  const svg = generateIcon('check', { size });

  // Assert
  expect(svg).toContain('width="64"');
  expect(svg).toContain('height="64"');
});
```

---

## Common Issues

### Tests Won't Run
**Problem:** Implementation files don't exist yet
**Solution:** Create implementation files matching test specs

### Import Errors
**Problem:** Missing dependencies
**Solution:** Run `npm install` in package directory

### Coverage Too Low
**Problem:** Missing test cases
**Solution:** Check TEST-COVERAGE-PLAN.md for required scenarios

---

## Documentation

- **TEST-COVERAGE-PLAN.md** - Complete test plan with specs
- **TEST-SUMMARY-REPORT.md** - Detailed summary and status
- **TESTING-QUICK-START.md** - This file

---

## Next Steps

1. Implement SVG utilities (make Phase 1 tests pass)
2. Run Phase 1 tests: `cd packages/slideyui-mcp && npm test`
3. Verify coverage: `npm run test:coverage`
4. Install dependencies for other packages
5. Implement remaining tests using specs
6. Run full suite: `npm test --workspaces`

---

**Quick tip:** Start with `npm test -- --watch` to get instant feedback while implementing!
