# Layout Testing Guidelines

## Proper Usage of Basic Layouts

### Key Principles:
1. **Always use layouts inside CardContainer** - Layouts need a defined container
2. **Layouts take full width/height** - They will fill their parent container
3. **Add padding to the layout itself** - Not to individual columns
4. **Content should have visual boundaries** - Use background colors or borders to see column structure
5. **Test at different viewport sizes** - Columns stack at 480px

### Example Structure:

```svelte
<CardContainer aspectRatio="16/9" bordered={true}>
  <TwoColumnLayout class="p-8">
    {#snippet left()}
      <div class="bg-primary/10 rounded p-4 h-full flex items-center justify-center">
        <p>Left Content</p>
      </div>
    {/snippet}

    {#snippet right()}
      <div class="bg-secondary/10 rounded p-4 h-full flex items-center justify-center">
        <p>Right Content</p>
      </div>
    {/snippet}
  </TwoColumnLayout>
</CardContainer>
```

### What Makes a Good Layout Example:
- ✅ Clear visual boundaries (background colors, borders)
- ✅ Content fills the height of columns
- ✅ Proper padding on layout and content
- ✅ Demonstrates the grid structure clearly
- ❌ Don't leave columns empty or transparent
- ❌ Don't add conflicting flex/grid to content
- ❌ Don't forget aspect ratio on CardContainer
