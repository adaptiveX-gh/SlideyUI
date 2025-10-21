# Error Message Improvements

This document summarizes the error message improvements made to the SlideyUI MCP server.

## Problem Statement

Users reported confusing, deeply nested union errors that were hard to parse:
- Not clear that 'content' needed to be an array even for single items
- Distinction between different slide types and required fields was unclear
- Deeply nested validation errors were cryptic

## Solution Overview

We implemented a comprehensive error formatting system with:
1. Custom error formatter utility (`error-formatter.ts`)
2. Schema examples library (`schema/examples.ts`)
3. Enhanced Zod schemas with descriptions
4. Automatic error formatting in all tool handlers
5. Comprehensive test suite

## Example Improvements

### Example 1: Content Array Error

#### Before ❌
```
Invalid discriminated union. Invalid value at path: slides[0].content
Expected array, received string
```

#### After ✅
```
❌ Error at: slides.0.content
   The 'content' field must be an array. Wrap single items in brackets: ["Your content"]

💡 Example:
   Content must be an array:
   "content": ["First point", "Second point", "Third point"]

   Even for a single item:
   "content": ["Single point"]
```

### Example 2: Missing Slide Type

#### Before ❌
```
Invalid discriminated union discriminator value. Expected 'title' | 'content' | 'media' | ...
```

#### After ✅
```
❌ Error at: slides.0.type
   Invalid slide type. Must be one of: title, content, media, data, quote, timeline, comparison, process, section-header, blank, hero, two-column, three-column, four-column, chart-with-metrics, product-overview

💡 Example:
   Valid slide with explicit type:
   {
     "type": "content",
     "title": "My Slide",
     "content": ["Point 1", "Point 2"]
   }
```

### Example 3: Invalid Theme

#### Before ❌
```
Invalid enum value. Expected 'corporate' | 'pitch-deck' | 'academic' | 'workshop' | 'startup', received 'invalid-theme'
```

#### After ✅
```
❌ Error at: theme
   Invalid value "invalid-theme". Expected one of: corporate, pitch-deck, academic, workshop, startup

💡 Example:
   "theme": "corporate"

   Available themes: corporate, pitch-deck, academic, workshop, startup
```

### Example 4: Missing Required Field

#### Before ❌
```
Required at "slides[0].title"
```

#### After ✅
```
❌ Error at: slides.0.title
   Missing required field. Expected string, but field was not provided.

💡 Example:
   "title": "Your Slide Title Here"
```

### Example 5: Invalid URL Format

#### Before ❌
```
Invalid url at "slides[0].mediaUrl"
```

#### After ✅
```
❌ Error at: slides.0.mediaUrl
   Must be a valid URL (e.g., https://example.com).

💡 Example:
   ✅ Correct examples:
     - "https://example.com/image.jpg"
     - "https://www.youtube.com/embed/VIDEO_ID"
     - "https://unsplash.com/photos/abc123"

   ❌ Wrong:
     - "example.com/image.jpg" (missing protocol)
     - "//example.com/image.jpg" (missing protocol)
```

## Implementation Details

### 1. Error Formatter Utility (`utils/error-formatter.ts`)

Transforms Zod errors into human-readable messages with:
- Clear error location (path)
- Contextual error messages based on field type
- Relevant examples
- Common error pattern recognition

Key functions:
- `formatZodError(error: ZodError): string` - Main formatting function
- `formatValidationError(error: unknown)` - Generic error formatter
- `ERROR_MESSAGES` - Library of pre-written helpful messages

### 2. Schema Examples (`schema/examples.ts`)

Provides valid examples for:
- All 21 slide types
- Complete presentation structures
- Common patterns and use cases

Exports:
- `SCHEMA_EXAMPLES` - Object with examples for each slide type
- `PRESENTATION_EXAMPLES` - Complete presentation examples
- `getSlideExample(type: string)` - Helper to retrieve examples
- `formatExample(example: unknown)` - JSON formatter

### 3. Enhanced Zod Schemas (`schema/index.ts`)

Added to all schemas:
- `.describe()` for field-level documentation
- Custom error messages via `.min()`, `.max()`, etc.
- JSDoc examples showing correct usage
- `.transform()` to auto-fix common mistakes (e.g., string → array)

Example enhancement:
```typescript
export const ContentSlideSchema = BaseSlideSchema.extend({
  type: z.literal('content').describe('Slide type must be "content"'),
  title: z.string().min(1, 'Title is required and cannot be empty'),
  content: z.union([z.array(z.string()), z.string()])
    .describe('Content must be an array of strings, even for single items')
    .transform((val) => typeof val === 'string' ? [val] : val),
});
```

### 4. Updated Validation (`utils/validation.ts`)

Enhanced `validatePresentation()` to:
- Return formatted error messages
- Preserve both raw and formatted errors
- Provide user-friendly output

Returns:
```typescript
{
  valid: boolean;
  errors?: string[];           // Raw error messages
  formattedError?: string;     // Human-readable formatted error
  data?: PresentationSpec;     // Parsed data if valid
}
```

### 5. Tool Handler Updates

All tool handlers now catch and format errors:
- `create-presentation.ts`
- `add-slide.ts`
- `update-slide.ts`
- `create-custom-theme.ts`

Pattern used:
```typescript
async handler(args: Record<string, unknown>) {
  try {
    const spec = PresentationSchema.parse(args);
    // ... tool logic
  } catch (error) {
    const { formatValidationError } = await import('../utils/error-formatter.js');
    const formatted = formatValidationError(error);
    throw new Error(`Validation failed:\n\n${formatted.details || formatted.message}`);
  }
}
```

## Error Formatting Features

### Context-Aware Messages

The formatter analyzes error context to provide relevant guidance:

- **Slide type errors**: Lists all valid slide types
- **Content field errors**: Explains array requirement with examples
- **URL errors**: Shows correct URL format examples
- **Required field errors**: Indicates what's missing
- **Enum errors**: Lists all valid options
- **Type errors**: Explains expected vs received types

### Automatic Example Suggestions

Based on error location and type, the formatter provides:
- Valid slide examples for the error context
- Field-specific examples
- Common pattern examples
- Before/after comparisons

### User-Friendly Formatting

All error messages use:
- ❌ emoji for errors
- 💡 emoji for examples
- Clear section headers
- Indented content for readability
- Consistent formatting

## Testing

Comprehensive test suite (`error-formatter.test.ts`) validates:
- Content array error formatting
- Missing type field handling
- Invalid slide type messages
- Missing required field errors
- Empty slides array errors
- Example inclusion in messages
- Real-world error scenarios
- Deeply nested validation errors

All 18 tests pass ✅

## Benefits

1. **Faster debugging**: Users can immediately see what's wrong
2. **Self-service**: Examples help users fix issues without documentation
3. **Better UX**: AI tools can parse and understand errors better
4. **Reduced support**: Clear messages reduce confusion
5. **Educational**: Users learn correct patterns from examples
6. **Consistent**: All tools provide the same quality of error messages

## Auto-Fix Features

The system includes automatic fixes for common mistakes:

1. **String → Array conversion**:
   - Before: `content: "Single item"` → Error
   - After: `content: "Single item"` → Automatically converted to `["Single item"]`

2. **Default values**: Many optional fields have sensible defaults
3. **Flexible input**: Accepts multiple valid formats

## Future Enhancements

Potential improvements:
1. Internationalization (i18n) support
2. Error severity levels (error/warning/info)
3. Quick-fix suggestions with code snippets
4. Link to documentation for each error type
5. Error aggregation (group related errors)
6. Custom error codes for programmatic handling

## Files Changed/Added

### New Files
- `packages/slideyui-mcp/src/utils/error-formatter.ts` - Error formatting utility
- `packages/slideyui-mcp/src/schema/examples.ts` - Schema examples library
- `packages/slideyui-mcp/src/utils/error-formatter.test.ts` - Test suite
- `packages/slideyui-mcp/ERROR_IMPROVEMENTS.md` - This document

### Modified Files
- `packages/slideyui-mcp/src/schema/index.ts` - Added descriptions and custom messages
- `packages/slideyui-mcp/src/utils/validation.ts` - Integrated error formatter
- `packages/slideyui-mcp/src/tools/create-presentation.ts` - Added error handling
- `packages/slideyui-mcp/src/tools/add-slide.ts` - Added error handling
- `packages/slideyui-mcp/src/tools/update-slide.ts` - Added error handling
- `packages/slideyui-mcp/src/tools/create-custom-theme.ts` - Added error handling

## Usage Example

```typescript
import { validatePresentation } from './utils/validation.js';

const result = validatePresentation({
  theme: 'corporate',
  title: 'My Presentation',
  slides: [
    {
      type: 'content',
      title: 'Key Points',
      content: 'Single point' // Will auto-convert to array
    }
  ]
});

if (!result.valid) {
  console.error(result.formattedError);
  // Shows: Clear, formatted error with examples
}
```

## Summary

The error message improvements transform cryptic Zod validation errors into actionable, user-friendly messages. Users now get:
- Clear indication of what's wrong
- Location of the error
- Expected vs actual values
- Valid examples
- Common patterns

This significantly improves the developer experience and reduces friction when using the MCP server.
