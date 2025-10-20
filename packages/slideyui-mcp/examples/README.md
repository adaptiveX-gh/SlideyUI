# SlideyUI MCP Examples

This directory contains examples demonstrating various features of the SlideyUI MCP server.

## JSON Export Examples

### json-export-example.ts

Demonstrates how to export a presentation as JSON using the `export_presentation` tool.

This example shows:
- Creating a comprehensive presentation specification
- Exporting as JSON format
- Parsing and inspecting the exported JSON structure

**Usage:**
```bash
# From the slideyui-mcp directory
npx tsx examples/json-export-example.ts
```

### test-json-export.ts

Test suite for the JSON export functionality.

Includes tests for:
- Minimal presentation export
- Full presentation export with all options
- Error handling
- JSON format validation

**Usage:**
```bash
# From the slideyui-mcp directory
npx tsx examples/test-json-export.ts
```

## JSON Export Format

The JSON export provides a structured representation of presentation data:

```typescript
{
  version: "1.0.0",
  metadata: {
    title: string,
    author?: string,
    createdAt: string,  // ISO 8601 date
    slideCount: number,
    theme: string,
    aspectRatio: string,
    description?: string,
    tags?: string[]
  },
  slides: [
    {
      id: string,
      type: string,
      content: {...},  // Full slide content object
      index: number
    }
  ],
  config: {
    theme: string,
    aspectRatio: string,
    fontSize?: string,
    minify?: boolean,
    includeSlideyUICSS?: boolean,
    embedFonts?: boolean
  }
}
```

## Use Cases

The JSON export format is useful for:

1. **Programmatic Access**: Import presentation data into other applications
2. **Version Control**: Store presentation structure in a diffable format
3. **Templating**: Create presentation templates that can be modified programmatically
4. **Integration**: Pass presentation data between different systems via MCP
5. **Analysis**: Extract metadata and statistics from presentations
6. **Backup**: Archive presentation content in a portable format

## MCP Integration

To use the JSON export via MCP:

```typescript
// Via MCP client
const result = await client.callTool('export_presentation', {
  format: 'json',
  presentationData: {
    theme: 'corporate',
    title: 'My Presentation',
    slides: [
      { type: 'title', title: 'Welcome' }
    ]
  },
  filename: 'my-presentation'
});

// result.content contains the JSON string
const jsonData = JSON.parse(result.content);
```

## Notes

- JSON exports require the `presentationData` parameter (not `html`)
- The exported JSON is formatted with 2-space indentation for readability
- All optional fields are only included if they have defined values
- Slide IDs are auto-generated if not provided (format: `slide-{index + 1}`)
