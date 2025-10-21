# Error Message Quick Reference

Quick lookup for common validation errors and their solutions.

## Content Field Errors

### Error: "Content must be an array"

**Problem**: Content field is a string instead of an array

❌ **Wrong**:
```json
{
  "type": "content",
  "title": "My Slide",
  "content": "Single point"
}
```

✅ **Correct**:
```json
{
  "type": "content",
  "title": "My Slide",
  "content": ["Single point"]
}
```

**Note**: The latest version auto-converts strings to arrays, but it's best to use arrays explicitly.

---

## Slide Type Errors

### Error: "Invalid slide type" or "Missing type field"

**Problem**: Slide is missing `type` field or has invalid value

❌ **Wrong**:
```json
{
  "title": "My Slide",
  "content": ["Point 1"]
}
```

✅ **Correct**:
```json
{
  "type": "content",
  "title": "My Slide",
  "content": ["Point 1"]
}
```

**Valid slide types**: title, content, media, data, quote, timeline, comparison, process, section-header, blank, hero, two-column, three-column, four-column, chart-with-metrics, product-overview, grid, feature-card, team, pricing, code

---

## Theme Errors

### Error: "Invalid theme name"

**Problem**: Theme name is not a predefined theme or custom theme

❌ **Wrong**:
```json
{
  "theme": "my-theme",
  "title": "Presentation"
}
```

✅ **Correct** (predefined):
```json
{
  "theme": "corporate",
  "title": "Presentation"
}
```

✅ **Correct** (custom - after creating):
```json
// First create the theme with create_custom_theme
{
  "theme": "my-custom-theme",
  "title": "Presentation"
}
```

**Predefined themes**: corporate, pitch-deck, academic, workshop, startup

---

## URL Errors

### Error: "Invalid URL format"

**Problem**: URL is missing protocol or malformed

❌ **Wrong**:
```json
{
  "type": "media",
  "mediaUrl": "example.com/image.jpg",
  "mediaType": "image"
}
```

✅ **Correct**:
```json
{
  "type": "media",
  "mediaUrl": "https://example.com/image.jpg",
  "mediaType": "image"
}
```

**Requirements**:
- Must include `https://` or `http://`
- Must be a valid URL format

---

## Required Field Errors

### Error: "Missing required field"

**Problem**: A required field is not provided

Common required fields by slide type:

**Title slide**:
- `type` (required)
- `title` (required)

**Content slide**:
- `type` (required)
- `title` (required)
- `content` (required)

**Media slide**:
- `type` (required)
- `mediaType` (required)
- `mediaUrl` (required for image/video/embed)

**Data slide**:
- `type` (required)
- `title` (required)
- `data` (required)
- `dataType` (required)

**Quote slide**:
- `type` (required)
- `quote` (required)
- `author` (required)

---

## Array Errors

### Error: "Array must contain at least 1 item"

**Problem**: Required array field is empty

❌ **Wrong**:
```json
{
  "theme": "corporate",
  "title": "Presentation",
  "slides": []
}
```

✅ **Correct**:
```json
{
  "theme": "corporate",
  "title": "Presentation",
  "slides": [
    {
      "type": "title",
      "title": "Welcome"
    }
  ]
}
```

---

## Hex Color Errors

### Error: "Invalid hex color format"

**Problem**: Color is not in 6-digit hex format

❌ **Wrong**:
```json
{
  "colors": {
    "primary": "FF5733"  // Missing #
  }
}
```

❌ **Wrong**:
```json
{
  "colors": {
    "primary": "#F00"  // Must be 6 digits
  }
}
```

✅ **Correct**:
```json
{
  "colors": {
    "primary": "#FF5733"
  }
}
```

---

## Enum Errors

### Error: "Invalid enum value"

**Problem**: Field value is not one of the allowed options

Common enums:

**Aspect Ratio**: `16:9`, `4:3`
**Font Size**: `default`, `large`, `xlarge`
**Layout Density**: `compact`, `normal`, `spacious`
**Media Type**: `image`, `video`, `embed`, `svg`
**Data Type**: `table`, `chart`
**Chart Type**: `bar`, `line`, `pie`, `area`, `doughnut`, `scatter`

---

## Nested Object Errors

### Error: Path like "slides.0.leftColumn.content"

**Problem**: Error in a nested object field

The error path shows the location:
- `slides.0` = First slide (index 0)
- `leftColumn` = Left column object
- `content` = Content field

❌ **Wrong**:
```json
{
  "type": "two-column",
  "leftColumn": {
    "type": "list",
    "content": "Not an array"  // Should be array
  }
}
```

✅ **Correct**:
```json
{
  "type": "two-column",
  "leftColumn": {
    "type": "list",
    "content": ["Item 1", "Item 2"]
  }
}
```

---

## Common Patterns

### Minimal Valid Presentation

```json
{
  "theme": "corporate",
  "title": "My Presentation",
  "slides": [
    {
      "type": "title",
      "title": "Welcome",
      "subtitle": "Getting Started"
    }
  ]
}
```

### Content Slide

```json
{
  "type": "content",
  "title": "Key Points",
  "content": [
    "First important point",
    "Second important point",
    "Third important point"
  ]
}
```

### Media Slide (Image)

```json
{
  "type": "media",
  "title": "Product Screenshot",
  "mediaUrl": "https://example.com/image.jpg",
  "mediaType": "image",
  "caption": "Our amazing product"
}
```

### Data Slide (Chart)

```json
{
  "type": "data",
  "title": "Revenue Growth",
  "dataType": "chart",
  "chartType": "line",
  "data": {
    "labels": ["Q1", "Q2", "Q3", "Q4"],
    "datasets": [
      {
        "label": "Revenue",
        "data": [100, 150, 180, 220]
      }
    ]
  }
}
```

### Two-Column Slide

```json
{
  "type": "two-column",
  "title": "Features vs Benefits",
  "leftColumn": {
    "type": "list",
    "content": ["Feature 1", "Feature 2", "Feature 3"]
  },
  "rightColumn": {
    "type": "text",
    "content": "These features provide significant value to users..."
  }
}
```

---

## Tips for Avoiding Errors

1. **Always include the `type` field** - It's required for every slide
2. **Use arrays for content** - Even single items should be in an array
3. **Include protocol in URLs** - Use `https://` or `http://`
4. **Use 6-digit hex colors** - Format: `#RRGGBB`
5. **Check required fields** - Each slide type has different requirements
6. **Validate before generating** - Use the validation utility to check
7. **Read error messages carefully** - They include examples and suggestions
8. **Start with examples** - Copy from `schema/examples.ts` and modify

---

## Getting Help

If you encounter an error not covered here:

1. **Read the full error message** - It includes context and examples
2. **Check the schema file** - `schema/index.ts` has all validation rules
3. **Look at examples** - `schema/examples.ts` has working examples
4. **Check the documentation** - Full API docs available
5. **Use TypeScript** - Type checking catches many errors before runtime

---

## Error Message Structure

All formatted errors follow this pattern:

```
❌ Error at: path.to.field
   Description of what's wrong

💡 Example:
   Correct usage example
```

- **Error location**: Shows exactly where the problem is
- **Description**: Explains what's wrong and what's expected
- **Example**: Shows the correct way to fix it
