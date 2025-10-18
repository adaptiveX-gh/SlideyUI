# SlideyUI Gamma-Parity Plan

This plan outlines the features and APIs SlideyUI needs to support to achieve parity with Gamma's card system while staying true to SlideyUI's composable architecture.

## Objectives

- Provide a card-first presentation model with nesting, collapsible content, and rich embeds.
- Enable one-click redesign via themes and per-card style tokens.
- Expose analytics hooks for card-level engagement and interactivity.
- Keep APIs minimal, composable, and backward-compatible with current components.

## Current Capabilities (from repo)

- Core Tailwind plugin with presentation styles, utilities, layouts, and themes: `packages/slideyui-core/src/index.ts`, `themes.ts`.
- Card primitives and variants: `CardContainer`, `CardGrid`, `CardStack`, `ContentCard`, `MediaCard`, `SplitCard`, `DataCard`, `QuoteCard`, `CardNotes`.
- Full-screen presentation wrapper: `Presentation` + `PresentationContext` with keyboard navigation, progress, and presenter controls.
- Interactivity utilities: `BuildStepProvider`/`BuildStep` (progressive reveal), `Poll` (local-state voting with `onVote`).
- Theming: multiple presets and CSS variables; aspect ratio-aware components; responsive grids.

## Gaps vs. Gamma and Planned Features

1. Nesting, Collapsible Structure, and Footnotes
   - New: `CollapsibleSection` component for card bodies with accessible toggle behavior.
   - New: `EmbeddedCard` style variant of `CardContainer` with compact header/footer, inset border, and hierarchical spacing.
   - New: `Footnote` + `Footnotes` components for inline references and card-level notes.
   - Docs: authoring patterns for nested cards and toggles.

2. Rich Media and Web Embeds
   - New: `EmbedCard` with `provider: 'youtube'|'tiktok'|'vimeo'|'custom'` and `src`/`embedHtml`.
   - Responsive container with safe sandbox attributes; unified `objectFit`/`aspectRatio` props.
   - Optional overlay controls: play/pause/mute for videos; keyboard/focus management.

3. AI-Friendly Text Density and Structure
   - Add `density: 'minimal'|'concise'|'detailed'|'extensive'` prop to `ContentCard` (and shared mixin for others) to adjust font sizes, line height, spacing, list compaction.
   - Section schema hooks: stable DOM structure/roles, `data-card-id`, and anchor IDs for sub-sections.

4. Analytics and Instrumentation
   - Event contract: `onCardView`, `onCardHide`, `onInteraction` from `PresentationProvider` and card components.
   - Dwell time tracking per card; optional throttled scroll/hover events for interactive cards.
   - Pluggable reporter interface (`AnalyticsProvider`) with no vendor lock-in.

5. Presenter UX
   - Add Home/End bindings in `usePresentationKeyboard` (first/last).
   - Add `Overview` grid mode to jump to cards; expose `onNavigate` hook.
   - Optional presenter panel area for notes/time/next preview (slots in `Presentation`).

6. Theming and One-Click Redesign
   - Theme presets for card visuals (headers, borders, shadows) switchable via `theme` or per-card `variant`.
   - Style tokens per card (e.g., `tone`, `contrast`, `elevation`) that map to theme variables.

7. Accessibility
   - A11y checklist and roles for all new components; captions/subtitles for videos; focus order; ARIA for collapsibles.

## Implementation Roadmap (Phased)

Phase 1: Foundations (Low-risk, high impact)
- CollapsibleSection component and styles
- EmbeddedCard variant styles
- Home/End navigation in `usePresentationKeyboard`
- Text density prop on `ContentCard`

Phase 2: Rich Embeds & Analytics
- EmbedCard for YouTube/TikTok/Vimeo/Custom
- AnalyticsProvider + basic hooks (card view/dwell, interactions)

Phase 3: Presenter & Theming Enhancements
- Overview mode in Presentation
- Card style tokens and theme presets expansion

Phase 4: Footnotes & Docs
- Footnote/Footnotes components with numbering and back-links
- Documentation with examples and best practices

## API Sketches

### CollapsibleSection
```tsx
<ContentCard title="FAQ">
  <CollapsibleSection title="What is SlideyUI?" defaultOpen>
    <p>SlideyUI is a card-first UI system...</p>
  </CollapsibleSection>
  <CollapsibleSection title="How do I embed media?">
    <p>Use the EmbedCard with provider...</p>
  </CollapsibleSection>
</ContentCard>
```
Props: `title`, `defaultOpen?`, `id?`, `onToggle?(open: boolean)`

### EmbeddedCard
```tsx
<ContentCard title="Overview">
  <EmbeddedCard>
    <ContentCard title="Details" variant="minimal">...</ContentCard>
  </EmbeddedCard>
</ContentCard>
```
Props: wraps any `CardContainer` child and applies inset styling

### EmbedCard
```tsx
<EmbedCard provider="youtube" src="https://youtu.be/abc123" aspectRatio="16/9" />
<EmbedCard provider="tiktok" src="https://www.tiktok.com/@user/video/123" />
<EmbedCard provider="custom" embedHtml={htmlString} sandbox />
```
Props: `provider`, `src`, `embedHtml?`, `aspectRatio?`, `allowFullscreen?`, `sandbox?`, `title?`

### Text Density
```tsx
<ContentCard title="Summary" density="concise">
  <ul>...</ul>
</ContentCard>
```
Prop: `density` affects typography/spacing via CSS variables

### Analytics Provider
```tsx
<AnalyticsProvider reporter={myReporter}>
  <Presentation onCardChange={...}>...</Presentation>
</AnalyticsProvider>
```
Events: `cardView`, `cardHide`, `interaction` (componentName, action, metadata)

## Acceptance Criteria

- CollapsibleSection is keyboard accessible (Enter/Space toggles), announces expanded state, and supports deep linking via `id`.
- EmbedCard renders YouTube/TikTok/Vimeo responsively and passes Lighthouse a11y checks; `custom` mode safely sandboxes.
- Density prop adjusts text scale/spacing across `ContentCard` without breaking layout at `preview`, `thumbnail`, and `full` modes.
- Analytics hooks fire reliably with accurate indices and dwell times (±10% tolerance).
- Home/End navigation works in `Presentation`; no conflicts with inputs.
- Backward compatibility: no breaking changes to existing exported components.

## Risks and Mitigations

- Provider embeds can change: keep provider adapters modular and versioned; include graceful fallback.
- Analytics performance: throttle/respect idle visibility; no heavy work on the main thread.
- Theming drift: guard with visual regression examples in docs; keep tokens mapped to CSS variables.

## Next Steps

- Approve Phase 1 scope.
- Implement CollapsibleSection + text density and Home/End keys.
- Start provider adapter for YouTube (most common) and stub analytics interface.
