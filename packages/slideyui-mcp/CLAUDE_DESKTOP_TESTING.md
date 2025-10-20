# Testing SlideyUI MCP Server with Claude Desktop

## Setup Complete ✅

The SlideyUI MCP server has been configured in Claude Desktop:
- **Config Location**: `C:\Users\scale\AppData\Roaming\Claude\claude_desktop_config.json`
- **Server Path**: `D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\dist\server.js`

## Step 1: Restart Claude Desktop

**IMPORTANT**: You must restart Claude Desktop for the MCP server to load.

1. Close Claude Desktop completely (check system tray)
2. Reopen Claude Desktop
3. The SlideyUI MCP server should automatically connect

## Step 2: Verify Connection

In a new conversation in Claude Desktop, type:

```
What MCP tools do you have available?
```

You should see the SlideyUI tools listed:
- `create_presentation`
- `add_slide`
- `update_slide`
- `export_presentation`

## Step 3: Test Resources (Discovery)

Try discovering available themes:

```
Can you show me what presentation themes are available in SlideyUI?
```

Claude should query the `slideyui://themes` resource and show you all 5 themes.

Try discovering templates:

```
What slide templates are available in SlideyUI?
```

Claude should query `slideyui://templates` and show all 16 templates.

## Step 4: Test Creating a Simple Presentation

Ask Claude to create a simple presentation:

```
Create a simple 3-slide presentation about AI using SlideyUI with the corporate theme.
Include a title slide, a content slide with 3 bullet points, and a quote slide.
Export it as HTML and save it to my desktop.
```

This will test:
- ✅ `create_presentation` tool
- ✅ Multiple slide types
- ✅ Theme application
- ✅ HTML export

## Step 5: Test Chart Generation

Create a presentation with charts:

```
Create a presentation with a bar chart showing quarterly revenue:
Q1: $100k, Q2: $150k, Q3: $200k, Q4: $250k
Use the pitch-deck theme and export as HTML.
```

This will test:
- ✅ Chart rendering (SVG generation)
- ✅ Data visualization
- ✅ Theme colors applied to charts

## Step 6: Test Advanced Templates

Try the new advanced templates:

```
Create a hero slide with the title "Welcome to the Future" and a call-to-action button that says "Get Started".
Then create a two-column slide comparing features vs benefits.
Export as JSON.
```

This will test:
- ✅ Hero template
- ✅ Two-column template
- ✅ JSON export format

## Step 7: Test JSON Export and Iteration

Create iteratively:

```
1. Create a presentation with just a title slide
2. Add a chart-with-metrics slide showing our growth
3. Add a product-overview slide for our SaaS product
4. Export as JSON so I can see the data structure
```

This will test:
- ✅ `add_slide` tool
- ✅ Iterative building
- ✅ Advanced templates (chart-with-metrics, product-overview)
- ✅ JSON export

## Expected Results

### Tools Available
- `create_presentation` - Creates complete presentations
- `add_slide` - Adds individual slides
- `update_slide` - Updates existing slides
- `export_presentation` - Exports to HTML/PDF-HTML/JSON

### Resources Available
- `slideyui://themes` - List all 5 themes
- `slideyui://themes/{name}` - Get specific theme details
- `slideyui://templates` - List all 16 templates
- `slideyui://templates/{type}` - Get specific template details
- `slideyui://capabilities` - Server capabilities
- `slideyui://examples` - Example presentations
- `slideyui://examples/{category}` - Specific example

### Features Working
- ✅ 16 slide templates
- ✅ 6 chart types (bar, line, area, pie, doughnut, scatter)
- ✅ 5 themes (corporate, pitch-deck, academic, workshop, startup)
- ✅ 3 export formats (HTML, PDF-HTML, JSON)
- ✅ SVG charts with theme colors
- ✅ Responsive layouts
- ✅ Print-ready output

## Troubleshooting

### MCP Server Not Connecting

If the server doesn't connect:

1. **Check Claude Desktop logs**:
   - Location: `C:\Users\scale\AppData\Roaming\Claude\logs\`
   - Look for MCP-related errors

2. **Verify the server runs standalone**:
   ```bash
   node D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\dist\server.js
   ```
   - Should show: "SlideyUI MCP Server running..."
   - Press Ctrl+C to stop

3. **Check the config file**:
   ```bash
   cat "C:\Users\scale\AppData\Roaming\Claude\claude_desktop_config.json"
   ```
   - Verify JSON is valid
   - Check path to server.js is correct

4. **Rebuild the server**:
   ```bash
   cd D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp
   npm run build
   ```

### Tools Not Showing

If Claude says it doesn't have the tools:

1. Restart Claude Desktop (completely close and reopen)
2. Check the MCP server is in the config
3. Try asking: "What MCP servers are connected?"

### Charts Not Rendering

If charts show as placeholders:

1. Check that the `data` field is properly structured
2. Verify chart type is one of: bar, line, area, pie, doughnut, scatter
3. Try the test examples in the conversation above

### CSS Not Loading

If presentations look unstyled:

1. Run the CSS test:
   ```bash
   cd D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp
   node test-css-loading.js
   ```
2. Should show CSS loaded from source files (~75KB)

## Success Criteria

You'll know it's working when:

- ✅ Claude shows SlideyUI tools in its available tools
- ✅ You can create presentations with multiple slides
- ✅ Charts render as beautiful SVG graphics
- ✅ Themes apply colors and styling correctly
- ✅ HTML exports open in browser with full styling
- ✅ JSON exports show complete data structure
- ✅ Resources provide theme and template discovery

## Example Test Conversation

Here's a complete test conversation you can have with Claude Desktop:

```
User: What SlideyUI presentation themes are available?

Claude: [Queries slideyui://themes resource]
Here are the 5 available themes:
1. Corporate - Professional business presentations
2. Pitch Deck - Startup and investor presentations
3. Academic - Research and educational presentations
4. Workshop - Training and workshop materials
5. Startup - Bold, modern startup presentations

User: Create a 5-slide pitch deck about an AI startup called "SmartFlow"
that helps automate business workflows. Include:
- Hero slide with company name
- Two-column slide comparing problem vs solution
- Chart showing 300% month-over-month growth
- Product overview slide with key features
- Quote slide from a happy customer

Use the pitch-deck theme and export as HTML.

Claude: [Uses create_presentation tool with all 5 slides]
I've created your pitch deck! Here's what was generated:
- Title: SmartFlow - Automate Your Business
- 5 slides using hero, two-column, chart, product-overview, and quote templates
- Pitch-deck theme with bold colors
- Chart rendered with SVG showing your growth metrics
- Exported as standalone HTML file

The presentation is ready to use!

User: Can you also export it as JSON so I can see the data structure?

Claude: [Uses export_presentation tool with format: 'json']
Here's the JSON export showing the complete presentation structure...
```

## Next Steps

After successful testing:

1. **Try More Complex Presentations**: Test all 16 templates
2. **Test All Themes**: Create presentations in each theme
3. **Test All Chart Types**: bar, line, area, pie, doughnut, scatter
4. **PDF Export**: Try exporting as PDF-HTML and printing to PDF
5. **Integration**: Use the MCP server from other applications

Enjoy creating beautiful, AI-generated presentations with SlideyUI! 🎉
