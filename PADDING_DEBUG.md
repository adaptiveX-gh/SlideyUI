# Padding Debug Summary

## Issue
Card padding not visible - text flush against edges on all cards

## Root Cause
The `.slide-card` CSS class exists in the Tailwind plugin but may not be applying properly.

## What We've Done
1. ✅ Added CSS variables to `packages/slideyui-core/src/index.ts` (lines 547-566)
2. ✅ Added `.slide-card`, `.slide-card-compact`, `.slide-card-spacious`, `.slide-card-flush` classes
3. ✅ Rebuilt `@slideyui/core` package
4. ✅ Verified CSS variables exist in built output
5. ✅ Cleaned and rebuilt docs

## Next Steps to Debug

###  1. Verify CardContainer applies `.slide-card`
Check `packages/slideyui-svelte/src/lib/components/CardContainer.svelte` line 39 - should have `'slide-card'` in class list

### 2. Check if Tailwind is stripping the class
The issue might be that Tailwind's JIT mode isn't seeing `.slide-card` being used and is tree-shaking it out.

**Solution**: The classes from the plugin should be in the `@layer components` directive, which prevents tree-shaking.

### 3. Verify the plugin is loading
Check browser DevTools:
- Open http://localhost:5176/docs/layouts
- Inspect a ContentCard element
- Check computed styles for `.slide-card`
- Look for `--card-padding` CSS variable in :root

## The Real Issue

Looking at the plugin code, I see we're using `addComponents()` which should work, BUT we need to verify the docs are actually using the updated core package.

Check: Does `docs/node_modules/@slideyui/core` have the latest code?
