# Error Guide & Troubleshooting

Common errors and how to fix them.

## Table of Contents

1. [Content Field Errors](#content-field-errors)
2. [Schema Validation Errors](#schema-validation-errors)
3. [Type Mismatch Errors](#type-mismatch-errors)
4. [Missing Required Fields](#missing-required-fields)
5. [Chart Errors](#chart-errors)
6. [Theme Errors](#theme-errors)
7. [Media & URL Errors](#media--url-errors)
8. [Color & Styling Errors](#color--styling-errors)
9. [Performance Issues](#performance-issues)

---

## Content Field Errors

### "content must be an array" Error

**Problem:** You provided content as a string instead of an array.

**Incorrect:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: 'Single item'  // Wrong!
}
```

**Correct:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: ['Single item']  // Wrap in array
}
```

**Why:** The schema requires content as an array to support both single and multiple items consistently.

**Solution:** Always wrap content in square brackets `[...]`, even for single items.

---

### "content: expected array, received string" (Two-Column)

**Problem:** In two-column slides, you didn't use arrays for list/text content.

**Incorrect:**
```typescript
{
  type: 'two-column',
  leftColumn: {
    type: 'list',
    content: 'Single item'  // Wrong for list!
  }
}
```

**Correct:**
```typescript
{
  type: 'two-column',
  leftColumn: {
    type: 'list',
    content: ['Item 1', 'Item 2']  // Array for list
  },
  rightColumn: {
    type: 'image',
    content: 'https://example.com/image.jpg'  // String for image
  }
}
```

**Key difference:**
- `type: 'text'` or `type: 'list'` → content must be `string[]`
- `type: 'image'` → content must be single `string` (URL)

---

### "content: expected string, received array" (Image)

**Problem:** You provided an array for image content instead of a single URL.

**Incorrect:**
```typescript
{
  type: 'two-column',
  leftColumn: {
    type: 'image',
    content: ['https://example.com/image.jpg']  // Wrong!
  }
}
```

**Correct:**
```typescript
{
  type: 'two-column',
  leftColumn: {
    type: 'image',
    content: 'https://example.com/image.jpg'  // Single URL
  }
}
```

---

## Schema Validation Errors

### "Discriminator value for key 'type' does not match"

**Problem:** The slide type you specified doesn't match the actual schema structure.

**Incorrect:**
```typescript
{
  type: 'content',
  title: 'Points',
  // Missing required 'content' field
}
```

**Correct:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: ['Point 1', 'Point 2']
}
```

**Solution:** Verify all required fields for your slide type. See [SLIDE-TYPES.md](./SLIDE-TYPES.md) for required fields per type.

---

### "Theme name must be lowercase alphanumeric with hyphens only"

**Problem:** Custom theme name has invalid characters.

**Incorrect:**
```typescript
{
  name: 'My_Theme',        // Underscore not allowed
  displayName: 'My Theme'
}
```

**Correct:**
```typescript
{
  name: 'my-theme',        // Lowercase, hyphens only
  displayName: 'My Theme'  // displayName can have spaces
}
```

**Valid pattern:** `[a-z0-9]+(-[a-z0-9]+)*`

---

### "Color must be a valid hex color (e.g., #FF5733)"

**Problem:** Color format is incorrect.

**Incorrect:**
```typescript
{
  colors: {
    primary: '#fff',           // Too short
    secondary: 'rgb(255,0,0)', // Wrong format
    accent: 'blue'             // Named colors not supported
  }
}
```

**Correct:**
```typescript
{
  colors: {
    primary: '#FFFFFF',        // 6-digit hex
    secondary: '#FF0000',      // 6-digit hex
    accent: '#0066CC'          // 6-digit hex
  }
}
```

**Valid format:** `#RRGGBB` where R, G, B are 0-9 or A-F (case insensitive)

---

## Type Mismatch Errors

### "Invalid enum value. Expected 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter'"

**Problem:** Chart type is misspelled or not supported.

**Incorrect:**
```typescript
{
  type: 'data',
  title: 'Chart',
  dataType: 'chart',
  chartType: 'column'  // Not supported!
}
```

**Correct:**
```typescript
{
  type: 'data',
  title: 'Chart',
  dataType: 'chart',
  chartType: 'bar'  // Use supported types
}
```

**Supported chart types:** `bar`, `line`, `pie`, `area`, `doughnut`, `scatter`

---

### "Invalid enum value. Expected 'corporate' | 'pitch-deck' | 'academic' | 'workshop' | 'startup'"

**Problem:** Theme name is misspelled or invalid.

**Incorrect:**
```typescript
{
  theme: 'corporate-theme'  // Wrong format!
}
```

**Correct:**
```typescript
{
  theme: 'corporate'  // Use predefined theme name
}
```

**Available themes:** `corporate`, `pitch-deck`, `academic`, `workshop`, `startup`

---

### "Expected 'compact' | 'normal' | 'spacious'"

**Problem:** Layout density value is invalid.

**Incorrect:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: ['Item 1'],
  layoutDensity: 'large'  // Invalid!
}
```

**Correct:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: ['Item 1'],
  layoutDensity: 'spacious'  // Valid value
}
```

**Valid values:** `compact`, `normal`, `spacious`

---

## Missing Required Fields

### Content Slide Missing Content

**Problem:**
```typescript
{
  type: 'content',
  title: 'Points'
  // Missing: content
}
```

**Error:** `content: String required`

**Fix:** Add the content field:
```typescript
{
  type: 'content',
  title: 'Points',
  content: ['Point 1', 'Point 2']
}
```

---

### Comparison Slide Missing Columns

**Problem:**
```typescript
{
  type: 'comparison',
  title: 'Comparison'
  // Missing: leftTitle, leftContent, rightTitle, rightContent
}
```

**Error:** `leftTitle: String required`

**Fix:** Add all required fields:
```typescript
{
  type: 'comparison',
  title: 'Comparison',
  leftTitle: 'Option A',
  leftContent: ['Point 1', 'Point 2'],
  rightTitle: 'Option B',
  rightContent: ['Point 3', 'Point 4']
}
```

---

### Two-Column Missing One Column

**Problem:**
```typescript
{
  type: 'two-column',
  leftColumn: {...}
  // Missing: rightColumn
}
```

**Error:** `rightColumn: Object required`

**Fix:** Provide both columns:
```typescript
{
  type: 'two-column',
  leftColumn: {
    type: 'text',
    content: ['Left item']
  },
  rightColumn: {
    type: 'text',
    content: ['Right item']
  }
}
```

---

## Chart Errors

### "data: Array must contain at least 1 item" (Chart Data)

**Problem:** No datasets provided for chart.

**Incorrect:**
```typescript
{
  type: 'data',
  title: 'Chart',
  dataType: 'chart',
  chartType: 'bar',
  data: {
    labels: ['Q1', 'Q2'],
    datasets: []  // Empty datasets!
  }
}
```

**Correct:**
```typescript
{
  type: 'data',
  title: 'Chart',
  dataType: 'chart',
  chartType: 'bar',
  data: {
    labels: ['Q1', 'Q2'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 200]
      }
    ]
  }
}
```

---

### "Data array length must match labels length"

**Problem:** Number of data points doesn't match labels.

**Incorrect:**
```typescript
{
  data: {
    labels: ['Q1', 'Q2', 'Q3'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 200]  // Only 2 values for 3 labels!
      }
    ]
  }
}
```

**Correct:**
```typescript
{
  data: {
    labels: ['Q1', 'Q2', 'Q3'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 200, 300]  // Match label count
      }
    ]
  }
}
```

---

### "Chart metrics: Array must contain at least 1 item"

**Problem:** No metrics provided for chart-with-metrics slide.

**Incorrect:**
```typescript
{
  type: 'chart-with-metrics',
  title: 'Performance',
  chart: {...},
  metrics: []  // Empty metrics!
}
```

**Correct:**
```typescript
{
  type: 'chart-with-metrics',
  title: 'Performance',
  chart: {...},
  metrics: [
    {
      label: 'Revenue',
      value: '$1M'
    }
  ]
}
```

---

## Theme Errors

### "Theme name cannot conflict with predefined themes"

**Problem:** Custom theme name uses a reserved name.

**Incorrect:**
```typescript
{
  name: 'corporate',  // Reserved!
  displayName: 'Corporate Custom'
}
```

**Correct:**
```typescript
{
  name: 'corporate-custom',  // Add suffix
  displayName: 'Corporate Custom'
}
```

---

### Custom Theme Colors Missing

**Problem:** Hex colors aren't provided in correct format.

**Incorrect:**
```typescript
{
  colors: {
    primary: 'blue'  // Named color not allowed
  }
}
```

**Correct:**
```typescript
{
  colors: {
    primary: '#0066FF'  // Hex format
  }
}
```

**Note:** Only primary color is required. Others auto-generate from it.

---

## Media & URL Errors

### "mediaUrl must be a valid URL"

**Problem:** Image/video URL is invalid.

**Incorrect:**
```typescript
{
  type: 'media',
  mediaType: 'image',
  mediaUrl: 'not-a-url'
}
```

**Correct:**
```typescript
{
  type: 'media',
  mediaType: 'image',
  mediaUrl: 'https://example.com/image.jpg'
}
```

**Valid URL format:** Must start with `http://` or `https://`

---

### "SVG content is empty"

**Problem:** SVG slide without SVG content.

**Incorrect:**
```typescript
{
  type: 'media',
  mediaType: 'svg'
  // Missing: svgContent
}
```

**Correct:**
```typescript
{
  type: 'media',
  mediaType: 'svg',
  svgContent: '<svg>...</svg>'
}
```

---

## Color & Styling Errors

### Overlay Colors Invalid

**Problem:** Overlay colors not in theme palette.

**Incorrect:**
```typescript
{
  overlay: {
    colors: ['primary', 'invalid-color']  // 'invalid-color' doesn't exist
  }
}
```

**Correct:**
```typescript
{
  overlay: {
    colors: ['primary', 'secondary']  // Use theme colors
  }
}
```

**Valid theme colors:** `primary`, `secondary`, `accent`

---

### Custom Overlay Colors Not Hex

**Problem:** Custom overlay color not in hex format.

**Incorrect:**
```typescript
{
  overlay: {
    customColors: ['blue', 'red']  // Named colors not allowed
  }
}
```

**Correct:**
```typescript
{
  overlay: {
    customColors: ['#0000FF', '#FF0000']  // Hex format
  }
}
```

---

## Performance Issues

### "Presentation too large"

**Problem:** Generated HTML is very large (usually >10MB).

**Causes:**
- Embedded high-resolution images
- Many large datasets
- Complex SVG graphics
- Not minifying CSS

**Solutions:**

1. **Use minification:**
```typescript
{
  theme: 'corporate',
  title: 'My Presentation',
  slides: [...],
  options: {
    minify: true  // Enable minification
  }
}
```

2. **Optimize images:**
- Use compressed image URLs
- Use smaller resolution images (e.g., 800px wide max)
- Consider placeholder + progressive loading

3. **Simplify charts:**
- Reduce number of datasets
- Use simpler chart types
- Aggregate data instead of showing all points

---

### "Charts not rendering"

**Problem:** Charts appear blank or don't display.

**Causes:**
- Invalid chart data
- Missing dataset labels
- Browser compatibility issue

**Solutions:**

1. **Verify data format:**
```typescript
// Correct format
{
  labels: ['Q1', 'Q2'],
  datasets: [
    {
      label: 'Revenue',
      data: [100, 200]
    }
  ]
}
```

2. **Test in different browser:**
- Charts use SVG rendering
- Very old browsers may not support SVG

3. **Check console errors:**
- Open browser DevTools (F12)
- Check Console tab for JavaScript errors

---

### "Slide content is cut off"

**Problem:** Text or content doesn't fit on slide.

**Causes:**
- Font size too large
- Content too verbose
- Layout too dense

**Solutions:**

1. **Use compact layout:**
```typescript
{
  type: 'content',
  title: 'Points',
  content: [...],
  layoutDensity: 'compact'  // Reduce spacing
}
```

2. **Reduce content:**
- Limit bullet points to 5 max
- Use shorter descriptions
- Consider multiple slides

3. **Use different layout:**
- Two-column for more content
- Process slides for sequential items
- Separate high-density content into 2 slides

---

## Getting Help

If you encounter an error not listed here:

1. **Check [SLIDE-TYPES.md](./SLIDE-TYPES.md)** - Verify all required fields for your slide type
2. **Check [API-REFERENCE.md](./API-REFERENCE.md)** - Review complete schema documentation
3. **Review examples** - Look at working examples in [QUICK-START.md](./QUICK-START.md)
4. **Check the schema** - Look at `packages/slideyui-mcp/src/schema/index.ts` for Zod validation rules

---

## Common Patterns to Avoid

### Don't: Mix content types in arrays

```typescript
// Wrong
content: ['Text', 123, true]
```

### Don't: Use null or undefined for optional fields

```typescript
// Wrong
{
  subtitle: undefined,
  author: null
}

// Correct - just omit the field
{
  title: 'Presentation'
}
```

### Don't: Forget to wrap even single content items

```typescript
// Wrong
content: 'Single item'

// Correct
content: ['Single item']
```

### Don't: Use reserved theme names

```typescript
// Wrong
name: 'corporate'

// Correct
name: 'corporate-dark'
```

---

**Still stuck?** See [USER-GUIDE.md](./USER-GUIDE.md) for best practices and advanced patterns.
