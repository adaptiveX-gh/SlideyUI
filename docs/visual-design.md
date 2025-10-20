# SlideyUI Visual Design Examples

This document serves as a reference for visual design patterns implemented in SlideyUI examples.

## Product Overview Pattern

**File**: `docs/src/routes/docs/examples/product-overview/+page.svelte`

**Design Pattern**: 2×3 Product Grid Layout

### Visual Characteristics
- Large title at top ("Product Overview") using primary color
- 6 product cards in responsive grid (1 col mobile → 2 col tablet → 3 col desktop)
- Each card contains:
  - Product image (landscape, fixed height with object-cover)
  - Product name in primary color (bold)
  - Description text with 80% opacity

### Implementation Details

**Layout Structure:**
```
┌────────────────────────────────────┐
│  Product Overview (Title)          │
├──────────┬──────────┬──────────────┤
│ [Image]  │ [Image]  │ [Image]      │
│ Title    │ Title    │ Title        │
│ Desc...  │ Desc...  │ Desc...      │
├──────────┼──────────┼──────────────┤
│ [Image]  │ [Image]  │ [Image]      │
│ Title    │ Title    │ Title        │
│ Desc...  │ Desc...  │ Desc...      │
└──────────┴──────────┴──────────────┘
```

**Key Components:**
- `CardContainer` with `aspectRatio="16/9"` and `autoScale={true}`
- CSS Grid with responsive columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Theme-aware colors: `bg-base-100`, `bg-base-200`, `text-primary`, `text-base-content`

**Auto-Scaling Typography:**
- Main title: `clamp(2rem, 4vw, 3rem)` = 32-48px
- Product titles: `clamp(1rem, 1.5vw, 1.25rem)` = 16-20px
- Descriptions: `clamp(0.75rem, 1vw, 0.875rem)` = 12-14px

**Responsive Breakpoints:**
- Mobile: 1 column (vertical stack)
- Tablet (md): 2 columns
- Desktop (lg): 3 columns

**Theme Awareness:**
- Background: `bg-base-100` (main), `bg-base-200` (cards)
- Text: `text-base-content opacity-80` for descriptions
- Accent: `text-primary` for titles
- Works in both light and dark modes

### Use Cases
- Product catalogs and feature showcases
- Service offering overviews
- Team member introductions
- Portfolio/case study displays
- Module/section navigation
- Comparison grids

### Design Fidelity: 9/10
- ✓ Exact layout match (2×3 grid)
- ✓ Proper auto-scaling with container queries
- ✓ Theme-aware styling
- ✓ Responsive across all devices
- ✓ Fluid typography with clamp()
- Note: Used Unsplash placeholder images instead of original images

---

## Image With Description Pattern

**File**: `docs/src/routes/docs/examples/image-with-description/+page.svelte`

**Design Pattern**: 40/60 Split Image + Text Layout

### Visual Characteristics
- Full-height image on left (40% width)
- Text content on right (60% width)
- Large title with primary color
- Paragraph description with increased line-height for readability

### Implementation Details

**Layout Structure:**
```
┌────────┬──────────────────────┐
│        │  Title (Large)       │
│ Image  │                      │
│ (Full  │  Description text... │
│ Height)│  ...with ample       │
│        │  ...whitespace       │
└────────┴──────────────────────┘
```

**Key Components:**
- 5-column grid: image = 2 cols (40%), text = 3 cols (60%)
- `CardContainer` with `autoScale={true}`
- Theme colors: `bg-base-100`, `text-primary`, `text-base-content`

**Auto-Scaling Typography:**
- Title: `clamp(2rem, 4vw, 3.5rem)` = 32-56px
- Body: `clamp(1rem, 1.5vw, 1.25rem)` = 16-20px

**Use Cases:**
- Presentation openings and chapter introductions
- Background context slides
- Product showcases
- About/team slides

---

*More design patterns will be documented here as they are implemented.*
