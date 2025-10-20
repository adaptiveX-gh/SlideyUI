# Quick Test Guide - SlideyUI + Claude Desktop

## 🚀 Quick Start (3 Steps)

### 1. Restart Claude Desktop
- Close completely (check system tray)
- Reopen Claude Desktop
- Wait for it to load

### 2. Verify Connection
In a new conversation, type:
```
What MCP tools do you have available?
```

**Expected**: Claude mentions `create_presentation`, `add_slide`, `update_slide`, `export_presentation`

### 3. Create Your First Presentation
```
Create a simple 3-slide presentation about AI:
- Title slide: "The Future of AI"
- Content slide with 3 benefits of AI
- Quote slide with a famous AI quote

Use the corporate theme and export as HTML.
```

**Expected**: Claude creates a presentation and exports HTML

---

## ✅ Success = You'll See

1. Claude lists SlideyUI tools ✅
2. Creates multi-slide presentations ✅
3. Charts render as SVG graphics ✅
4. Themes apply colors correctly ✅
5. HTML exports work in browser ✅

---

## ❌ Problems?

**Tools not showing?**
→ Restart Claude Desktop (completely close and reopen)

**Still not working?**
→ Check config: `C:\Users\scale\AppData\Roaming\Claude\claude_desktop_config.json`
→ Test server: `node D:\Users\scale\Code\SlideyUI\packages\slideyui-mcp\dist\server.js`

**Need more help?**
→ See detailed guide: `TESTING_WITH_CLAUDE_DESKTOP.md`
→ Check logs: `C:\Users\scale\AppData\Roaming\Claude\logs\`

---

## 🎯 Test These Features

**Basic Creation**:
```
Create a 2-slide presentation with a title and content slide
```

**Themes**:
```
Show me all available themes
```

**Charts**:
```
Create a bar chart showing Q1: 100, Q2: 150, Q3: 200
```

**Advanced Templates**:
```
Create a hero slide with a call-to-action button
```

**JSON Export**:
```
Export the presentation as JSON
```

---

## 📊 What's Available

- **16 slide templates** (title, hero, content, charts, etc.)
- **6 chart types** (bar, line, area, pie, doughnut, scatter)
- **5 themes** (corporate, pitch-deck, academic, workshop, startup)
- **3 export formats** (HTML, PDF-HTML, JSON)
- **25+ resources** (theme/template discovery)

---

**Ready!** Restart Claude Desktop and start creating! 🎉
