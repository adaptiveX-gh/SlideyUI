# Testing SlideyUI MCP Server with Claude Desktop

## Quick Start Guide

### Step 1: Verify Configuration ✅

Your Claude Desktop is already configured! The config file is at:
```
C:\Users\scale\AppData\Roaming\Claude\claude_desktop_config.json
```

Contents:
```json
{
  "mcpServers": {
    "slideyui": {
      "command": "node",
      "args": [
        "D:\\Users\\scale\\Code\\SlideyUI\\packages\\slideyui-mcp\\dist\\server.js"
      ],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### Step 2: Restart Claude Desktop (REQUIRED)

**IMPORTANT**: You must completely restart Claude Desktop for the MCP server to load.

1. **Close Claude Desktop completely**
   - Click the X to close the window
   - Check the system tray and close it there if running
   - Make sure no Claude.exe processes are running (Task Manager if needed)

2. **Reopen Claude Desktop**
   - Launch from Start Menu or Desktop
   - Wait for it to fully load

3. **The SlideyUI MCP server will automatically connect**
   - No additional steps needed
   - Connection happens in the background

---

## Step 3: Test the Connection

### Test 1: Check Tools are Available

Open a new conversation in Claude Desktop and type:

```
What MCP tools do you have available?
```

**Expected Response:**
Claude should mention having access to SlideyUI tools:
- `create_presentation` - Create complete presentations
- `add_slide` - Add individual slides
- `update_slide` - Update existing slides
- `export_presentation` - Export to HTML/PDF-HTML/JSON

If Claude **doesn't mention SlideyUI tools**, see Troubleshooting below.

---

### Test 2: Discover Themes

```
Can you list the presentation themes available in SlideyUI?
```

**Expected Response:**
Claude should query the `slideyui://themes` resource and show you all 5 themes:
1. **Corporate** - Professional business presentations
2. **Pitch Deck** - Startup and investor presentations
3. **Academic** - Research and educational presentations
4. **Workshop** - Training and workshop materials
5. **Startup** - Bold, modern startup presentations

---

### Test 3: Discover Templates

```
What slide templates are available in SlideyUI?
```

**Expected Response:**
Claude should query `slideyui://templates` and list all 16 templates:

**Title & Impact:**
- title, hero

**Content:**
- content, two-column, three-column, four-column

**Data & Metrics:**
- data, chart-with-metrics

**Special Purpose:**
- media, quote, timeline, comparison, process, section-header, product-overview, blank

---

### Test 4: Create a Simple Presentation

```
Create a simple 3-slide presentation about AI using SlideyUI:
- Title slide: "The Future of AI"
- Content slide with 3 benefits of AI
- Quote slide with a famous AI quote

Use the corporate theme and export as HTML. Save it to my desktop.
```

**Expected Response:**
Claude should:
1. Use the `create_presentation` tool
2. Generate 3 slides with the corporate theme
3. Export as HTML
4. Provide the HTML content (you'll need to save it manually or ask Claude to save it)

**Verification:**
- Open the HTML file in your browser
- Should see a styled presentation with navigation
- Corporate theme colors should be applied
- All 3 slides should be present

---

### Test 5: Create a Chart Presentation

```
Create a presentation showing quarterly revenue growth:
Q1: $100,000
Q2: $150,000
Q3: $200,000
Q4: $250,000

Use a bar chart, pitch-deck theme, and export as HTML.
```

**Expected Response:**
Claude should:
1. Create a data slide with a bar chart
2. Apply pitch-deck theme colors to the chart
3. Export as HTML with the chart rendered as SVG

**Verification:**
- Open the HTML file
- Chart should be visible (SVG graphics, not a placeholder)
- Bars should match the data values
- Theme colors should be applied

---

### Test 6: Test Advanced Templates

```
Create a hero slide with:
- Title: "Welcome to the Future"
- Subtitle: "Innovation starts here"
- CTA button: "Get Started"

Then create a two-column slide comparing:
- Left: Features (3 bullet points)
- Right: Benefits (3 bullet points)

Export as JSON.
```

**Expected Response:**
Claude should:
1. Create a hero slide with the call-to-action
2. Create a two-column comparison slide
3. Export as JSON format
4. Show the JSON structure

**Verification:**
- JSON should have complete metadata
- Both slides should be in the slides array
- All properties should be present

---

### Test 7: Full Pitch Deck

```
Create a complete startup pitch deck for "SmartFlow AI" - an AI-powered workflow automation tool:

1. Hero slide with company name and tagline
2. Two-column slide: Problem vs Our Solution
3. Product overview slide with 5 key features
4. Chart with metrics slide showing 300% MoM growth
5. Quote slide from a happy customer

Use the pitch-deck theme and export as HTML.
```

**Expected Response:**
Claude should create a 5-slide presentation using multiple advanced templates, with professional styling and charts.

---

## What You Should See

### ✅ Success Indicators

1. **Tools Available**: Claude confirms it has SlideyUI tools
2. **Resources Work**: Can list themes and templates
3. **Creates Presentations**: Generates HTML with styled slides
4. **Charts Render**: SVG charts appear in the output (not placeholders)
5. **Themes Apply**: Color schemes match the selected theme
6. **Exports Work**: HTML, PDF-HTML, and JSON formats all work

### ❌ Failure Indicators

1. **No Tools**: Claude doesn't know about SlideyUI tools
2. **Connection Error**: Error messages about MCP server
3. **Placeholders**: Charts show as text placeholders
4. **No Styling**: HTML has no CSS/styling
5. **Format Errors**: Export formats fail or produce errors

---

## Troubleshooting

### Issue: Tools Not Available

**Symptoms**: Claude doesn't mention SlideyUI tools when asked

**Solutions**:

1. **Check if you restarted Claude Desktop**
   - You MUST restart for MCP servers to load
   - Just closing the window isn't enough - kill the process

2. **Check the config file**:
   ```bash
   cat "C:\Users\scale\AppData\Roaming\Claude\claude_desktop_config.json"
   ```
   - Verify JSON is valid
   - Check the path is correct
   - Make sure there are no syntax errors

3. **Verify the server runs standalone**:
   ```bash
   node D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\dist\server.js
   ```
   - Should output: "SlideyUI MCP server started successfully"
   - Press Ctrl+C to stop
   - If this fails, the server has a problem

4. **Check Claude Desktop logs**:
   - Location: `C:\Users\scale\AppData\Roaming\Claude\logs\`
   - Look for the most recent log file
   - Search for "slideyui" or "MCP" errors

---

### Issue: Charts Show as Placeholders

**Symptoms**: Charts appear as text saying "Chart placeholder"

**This should NOT happen** - the MCP server has SVG chart rendering built-in.

**Solutions**:

1. **Verify chart data format**:
   ```
   Create a bar chart with this data:
   labels: ["A", "B", "C"]
   data: [10, 20, 30]
   ```

2. **Check the HTML output**:
   - Search for `<svg` in the HTML
   - Should see SVG elements, not placeholder text

3. **Try different chart types**:
   - bar, line, area, pie, doughnut, scatter

---

### Issue: No Styling in HTML

**Symptoms**: HTML file opens but has no colors or layout

**Solutions**:

1. **Check CSS is embedded**:
   - Open HTML in text editor
   - Search for `<style>`
   - Should see lots of CSS

2. **Run CSS test**:
   ```bash
   cd D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp
   node test-css-loading.js
   ```
   - Should show CSS loaded (~75KB)

---

### Issue: Server Crashes or Errors

**Symptoms**: Error messages when using tools

**Solutions**:

1. **Check Node version**:
   ```bash
   node --version
   ```
   - Should be v18 or higher

2. **Rebuild the server**:
   ```bash
   cd D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp
   npm run build
   ```

3. **Check for port conflicts**:
   - MCP uses stdio, not ports, so this is rare

---

## Advanced Testing

### Test JSON Export and Manipulation

```
Create a simple presentation, export as JSON, show me the JSON structure,
then modify it to add one more slide, and export as HTML.
```

Tests the full workflow of JSON manipulation.

### Test All Chart Types

```
Create 6 slides, one for each chart type (bar, line, area, pie, doughnut, scatter),
all showing the same data: [10, 20, 30, 40].
Use different themes for each slide.
```

Tests chart rendering and theme variation.

### Test Resource Discovery

```
Show me detailed information about the corporate theme, including
its color palette and use cases.
```

Tests resource reading capabilities.

---

## Checking Logs

If things aren't working, check the Claude Desktop logs:

**Windows Log Location**:
```
C:\Users\scale\AppData\Roaming\Claude\logs\
```

**What to look for**:
- MCP server connection messages
- SlideyUI tool registration
- Error messages about the server
- JSON-RPC communication errors

**Common log entries**:
- ✅ Good: "Connected to MCP server: slideyui"
- ✅ Good: "Registered tools: create_presentation, add_slide, ..."
- ❌ Bad: "Failed to start MCP server: slideyui"
- ❌ Bad: "Error: spawn node ENOENT"

---

## Success Checklist

Before considering the integration complete, verify:

- [ ] Claude Desktop shows SlideyUI tools when asked
- [ ] Resources (themes, templates) can be listed
- [ ] Can create a simple 2-3 slide presentation
- [ ] Charts render as SVG (not placeholders)
- [ ] All 5 themes work
- [ ] All 16 slide templates work
- [ ] HTML export works and opens in browser
- [ ] JSON export shows complete data structure
- [ ] PDF-HTML export works for printing
- [ ] Multiple presentations can be created in one conversation

---

## Getting Help

If you encounter issues:

1. **Check this troubleshooting guide first**
2. **Look at the example file**: `packages/slideyui-mcp/CLAUDE_DESKTOP_TESTING.md`
3. **Review server logs**: `C:\Users\scale\AppData\Roaming\Claude\logs\`
4. **Test server standalone**: `node dist/server.js`
5. **Verify CSS loading**: `node test-css-loading.js`
6. **Run tests**: `npm test` (in slideyui-mcp package)

---

## What's Working (Checklist)

The SlideyUI MCP server includes:

**✅ 4 MCP Tools**:
- create_presentation
- add_slide
- update_slide
- export_presentation

**✅ 25+ MCP Resources**:
- Theme discovery (5 themes)
- Template discovery (16 templates)
- Capabilities info
- Example presentations (4 examples)

**✅ 16 Slide Templates**:
- Basic: title, content, media, data, quote, blank
- Advanced: hero, two-column, three-column, four-column
- Specialized: timeline, comparison, process, section-header, chart-with-metrics, product-overview

**✅ 6 Chart Types**:
- Bar, Line, Area, Pie, Doughnut, Scatter (all SVG-rendered)

**✅ 5 Themes**:
- Corporate, Pitch Deck, Academic, Workshop, Startup

**✅ 3 Export Formats**:
- HTML (standalone), PDF-HTML (print-ready), JSON (data structure)

---

## Ready to Go! 🚀

Your SlideyUI MCP server is:
- ✅ Built and ready
- ✅ Configured in Claude Desktop
- ✅ Tested and verified standalone
- ✅ Documented with examples

**Now**: Restart Claude Desktop and start creating presentations!

Enjoy building beautiful, AI-generated presentations! 🎉
