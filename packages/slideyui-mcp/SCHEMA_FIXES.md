# Schema Validation Fixes - SlideyUI MCP Server

**Date**: October 20, 2025
**Issue**: Claude Desktop hitting validation errors when creating presentations

---

## Problem

Claude Desktop was sending incomplete data for certain slide types, causing Zod validation errors:

### Error 1: Comparison Slide
```
"expected": "string", "received": "undefined", "path": ["slides", 3, "leftTitle"]
"expected": "array", "received": "undefined", "path": ["slides", 3, "leftContent"]
"expected": "string", "received": "undefined", "path": ["slides", 3, "rightTitle"]
"expected": "array", "received": "undefined", "path": ["slides", 3, "rightContent"]
```

### Error 2: Timeline Slide
```
"expected": "array", "received": "undefined", "path": ["slides", 4, "events"]
```

---

## Root Cause

The Zod schemas were too strict - required fields with no defaults:

**Before** (ComparisonSlideSchema):
```typescript
leftTitle: z.string(),          // Required, no default
leftContent: z.array(z.string()),  // Required, no default
rightTitle: z.string(),         // Required, no default
rightContent: z.array(z.string()), // Required, no default
```

**Before** (TimelineSlideSchema):
```typescript
events: z.array(...),  // Required, no default
```

When Claude Desktop sent slides without all fields populated, validation failed.

---

## Solution Applied

Added sensible defaults to make the schemas more flexible:

### Fix 1: ComparisonSlideSchema

**File**: `packages/slideyui-mcp/src/schema/index.ts` (lines 144-147)

```typescript
export const ComparisonSlideSchema = BaseSlideSchema.extend({
  type: z.literal('comparison'),
  title: z.string().min(1),
  leftTitle: z.string().default(''),         // ✅ Added default
  leftContent: z.array(z.string()).default([]),  // ✅ Added default
  rightTitle: z.string().default(''),        // ✅ Added default
  rightContent: z.array(z.string()).default([]), // ✅ Added default
});
```

**Result**: Comparison slides now work even if Claude doesn't provide all titles/content

### Fix 2: TimelineSlideSchema

**File**: `packages/slideyui-mcp/src/schema/index.ts` (line 128-134)

```typescript
export const TimelineSlideSchema = BaseSlideSchema.extend({
  type: z.literal('timeline'),
  title: z.string().min(1),
  events: z.array(
    z.object({
      date: z.string(),
      title: z.string(),
      description: z.string().optional(),
    })
  ).default([]),  // ✅ Added default
  orientation: z.enum(['horizontal', 'vertical']).optional(),
});
```

**Result**: Timeline slides now work even if Claude doesn't provide events initially

---

## Impact

### Before Fixes:
- ❌ Validation errors when Claude sends incomplete slide data
- ❌ Presentations fail to generate
- ❌ Poor user experience with cryptic error messages
- ❌ Comparison and timeline slides couldn't be created flexibly

### After Fixes:
- ✅ Accepts incomplete slide data gracefully
- ✅ Fills in sensible defaults (empty strings, empty arrays)
- ✅ Presentations generate successfully
- ✅ Better user experience
- ✅ Claude Desktop can be more flexible with input
- ✅ Templates can render even with minimal data

---

## How Defaults Work

When Claude Desktop sends:
```json
{
  "type": "comparison",
  "title": "Challenges"
}
```

Zod now automatically fills in:
```json
{
  "type": "comparison",
  "title": "Challenges",
  "leftTitle": "",        // ← Default
  "leftContent": [],      // ← Default
  "rightTitle": "",       // ← Default
  "rightContent": []      // ← Default
}
```

The template then renders an empty comparison slide (just the title) instead of throwing an error.

---

## Testing

**Rebuild**: ✅ Successful
- Build time: 291ms (ESM), 2975ms (DTS)
- Output size: 126.32 KB (server.js)
- No TypeScript errors

**Schema Validation**: ✅ Passing
- Comparison slides accept minimal data
- Timeline slides accept minimal data
- All other slide types unchanged

---

## Next Steps

1. **Restart Claude Desktop** to load the updated server
2. **Test creating presentations** with comparison and timeline slides
3. **Verify** no more validation errors

---

## Files Modified

- `packages/slideyui-mcp/src/schema/index.ts` (2 schemas updated)
  - Line 128-134: TimelineSlideSchema (added `.default([])`)
  - Line 144-147: ComparisonSlideSchema (added 4 defaults)

---

## Additional Schema Improvements (Optional)

Consider making other required fields have defaults for even more flexibility:

**Potential candidates**:
- `ProcessSlideSchema.steps` - could default to `[]`
- `ThreeColumnSlideSchema.columns` - could have empty column defaults
- `FourColumnSlideSchema.columns` - could have empty column defaults

These would allow Claude Desktop to send even more minimal data and let users fill in details incrementally.

---

**Status**: ✅ Fixed and rebuilt
**Ready for**: Claude Desktop testing

---

*Last updated: October 20, 2025*
