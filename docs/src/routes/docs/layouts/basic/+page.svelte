<script lang="ts">
  import {
    BlankLayout,
    TwoColumnLayout,
    ThreeColumnLayout,
    FourColumnLayout,
    TwoColumnWithHeadingsLayout,
    ThreeColumnWithHeadingsLayout,
    ImageAndTextLayout,
    TextAndImageLayout,
    TitleWithBulletsLayout,
    TitleWithBulletsAndImageLayout,
    CardContainer
  } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  // Code examples with proper structure
  const twoColumnCode = `<CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
  <TwoColumnLayout class="p-8">
    {#snippet left()}
      <div class="bg-primary/10 rounded p-6 h-full flex flex-col justify-center">
        <h3 class="font-bold mb-4" style="font-size: clamp(1.25rem, 2vw, 1.5rem);">Left Column</h3>
        <p style="font-size: clamp(1rem, 1.5vw, 1.125rem);">Content for the left side</p>
      </div>
    {/snippet}

    {#snippet right()}
      <div class="bg-secondary/10 rounded p-6 h-full flex flex-col justify-center">
        <h3 class="font-bold mb-4" style="font-size: clamp(1.25rem, 2vw, 1.5rem);">Right Column</h3>
        <p style="font-size: clamp(1rem, 1.5vw, 1.125rem);">Content for the right side</p>
      </div>
    {/snippet}
  </TwoColumnLayout>
</CardContainer>`;

  const threeColumnCode = `<CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
  <ThreeColumnLayout class="p-8">
    {#snippet first()}
      <div class="bg-primary/10 rounded p-4 h-full flex flex-col justify-center">
        <h3 class="font-bold mb-2" style="font-size: clamp(1.125rem, 1.75vw, 1.25rem);">Column 1</h3>
        <p style="font-size: clamp(0.875rem, 1.25vw, 1rem);">First column</p>
      </div>
    {/snippet}

    {#snippet second()}
      <div class="bg-accent/10 rounded p-4 h-full flex flex-col justify-center">
        <h3 class="font-bold mb-2" style="font-size: clamp(1.125rem, 1.75vw, 1.25rem);">Column 2</h3>
        <p style="font-size: clamp(0.875rem, 1.25vw, 1rem);">Second column</p>
      </div>
    {/snippet}

    {#snippet third()}
      <div class="bg-secondary/10 rounded p-4 h-full flex flex-col justify-center">
        <h3 class="font-bold mb-2" style="font-size: clamp(1.125rem, 1.75vw, 1.25rem);">Column 3</h3>
        <p style="font-size: clamp(0.875rem, 1.25vw, 1rem);">Third column</p>
      </div>
    {/snippet}
  </ThreeColumnLayout>
</CardContainer>`;
</script>

<svelte:head>
  <title>Basic Layouts - SlideyUI</title>
</svelte:head>

<h1>Basic Layouts</h1>

<p class="lead">
  Pre-built layout components for common presentation patterns. These layouts use CSS Grid
  to create responsive, flexible layouts optimized for 16:9 presentations.
</p>

<div class="alert alert-info my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h3 class="font-bold">Important!</h3>
    <div class="text-sm">All layouts must be wrapped in a CardContainer with an aspect ratio. Content should have background colors or borders to visualize the grid structure.</div>
  </div>
</div>

<div class="divider my-8"></div>

<!-- Two Column Layout -->
<h2 id="two-column">Two Column Layout</h2>
<p>
  Creates two equal-width columns using CSS Grid. Perfect for comparisons or side-by-side content.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
    <TwoColumnLayout class="p-8">
      {#snippet left()}
        <div class="bg-primary/10 border-2 border-primary/30 rounded-lg p-6 h-full flex flex-col justify-center">
          <h3 class="font-bold mb-4 text-primary" style="font-size: clamp(1.25rem, 2vw, 1.5rem);">Left Column</h3>
          <p style="font-size: clamp(1rem, 1.5vw, 1.125rem);">This is the left side content. The grid automatically creates equal-width columns.</p>
        </div>
      {/snippet}

      {#snippet right()}
        <div class="bg-secondary/10 border-2 border-secondary/30 rounded-lg p-6 h-full flex flex-col justify-center">
          <h3 class="font-bold mb-4 text-secondary" style="font-size: clamp(1.25rem, 2vw, 1.5rem);">Right Column</h3>
          <p style="font-size: clamp(1rem, 1.5vw, 1.125rem);">This is the right side content. Both columns stretch to fill the container height.</p>
        </div>
      {/snippet}
    </TwoColumnLayout>
  </CardContainer>
</div>

<CodeBlock code={twoColumnCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Three Column Layout -->
<h2 id="three-column">Three Column Layout</h2>
<p>
  Three equal-width columns for organizing related content.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
    <ThreeColumnLayout class="p-8">
      {#snippet first()}
        <div class="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 h-full flex flex-col justify-center text-center">
          <h3 class="font-bold mb-2 text-primary" style="font-size: clamp(1.125rem, 1.75vw, 1.25rem);">Column 1</h3>
          <p style="font-size: clamp(0.875rem, 1.25vw, 1rem);">First column content</p>
        </div>
      {/snippet}

      {#snippet second()}
        <div class="bg-accent/10 border-2 border-accent/30 rounded-lg p-4 h-full flex flex-col justify-center text-center">
          <h3 class="font-bold mb-2 text-accent" style="font-size: clamp(1.125rem, 1.75vw, 1.25rem);">Column 2</h3>
          <p style="font-size: clamp(0.875rem, 1.25vw, 1rem);">Second column content</p>
        </div>
      {/snippet}

      {#snippet third()}
        <div class="bg-secondary/10 border-2 border-secondary/30 rounded-lg p-4 h-full flex flex-col justify-center text-center">
          <h3 class="font-bold mb-2 text-secondary" style="font-size: clamp(1.125rem, 1.75vw, 1.25rem);">Column 3</h3>
          <p style="font-size: clamp(0.875rem, 1.25vw, 1rem);">Third column content</p>
        </div>
      {/snippet}
    </ThreeColumnLayout>
  </CardContainer>
</div>

<CodeBlock code={threeColumnCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Four Column Layout -->
<h2 id="four-column">Four Column Layout</h2>
<p>
  Four equal-width columns for dense information layouts.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
    <FourColumnLayout class="p-8">
      {#snippet first()}
        <div class="bg-primary/10 border border-primary/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="mb-2" style="font-size: clamp(2rem, 3vw, 2.5rem);">📊</div>
          <h3 class="font-bold" style="font-size: clamp(1rem, 1.5vw, 1.125rem);">Stats</h3>
        </div>
      {/snippet}

      {#snippet second()}
        <div class="bg-accent/10 border border-accent/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="mb-2" style="font-size: clamp(2rem, 3vw, 2.5rem);">⚡</div>
          <h3 class="font-bold" style="font-size: clamp(1rem, 1.5vw, 1.125rem);">Speed</h3>
        </div>
      {/snippet}

      {#snippet third()}
        <div class="bg-secondary/10 border border-secondary/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="mb-2" style="font-size: clamp(2rem, 3vw, 2.5rem);">🎯</div>
          <h3 class="font-bold" style="font-size: clamp(1rem, 1.5vw, 1.125rem);">Goals</h3>
        </div>
      {/snippet}

      {#snippet fourth()}
        <div class="bg-info/10 border border-info/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="mb-2" style="font-size: clamp(2rem, 3vw, 2.5rem);">✨</div>
          <h3 class="font-bold" style="font-size: clamp(1rem, 1.5vw, 1.125rem);">Magic</h3>
        </div>
      {/snippet}
    </FourColumnLayout>
  </CardContainer>
</div>

<div class="divider my-8"></div>

<!-- Two Column With Headings -->
<h2 id="two-column-headings">Two Column with Headings</h2>
<p>
  Two columns with styled headings - uses the <code>.card-layout-col</code> class for proper structure.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
    <TwoColumnWithHeadingsLayout class="p-8">
      {#snippet leftHeading()}
        <span style="font-size: clamp(1.25rem, 2vw, 1.5rem);">Features</span>
      {/snippet}

      {#snippet leftContent()}
        <ul class="space-y-2" style="font-size: clamp(1rem, 1.5vw, 1.125rem);">
          <li>✓ Easy to use</li>
          <li>✓ Fully responsive</li>
          <li>✓ Customizable</li>
        </ul>
      {/snippet}

      {#snippet rightHeading()}
        <span style="font-size: clamp(1.25rem, 2vw, 1.5rem);">Benefits</span>
      {/snippet}

      {#snippet rightContent()}
        <ul class="space-y-2" style="font-size: clamp(1rem, 1.5vw, 1.125rem);">
          <li>✓ Save time</li>
          <li>✓ Look professional</li>
          <li>✓ Impress audiences</li>
        </ul>
      {/snippet}
    </TwoColumnWithHeadingsLayout>
  </CardContainer>
</div>

<div class="divider my-8"></div>

<!-- Title with Bullets -->
<h2 id="title-bullets">Title with Bullets</h2>
<p>
  Classic presentation layout with title and bullet points.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
    <TitleWithBulletsLayout
      class="p-8"
      items={[
        'Clear and concise bullet points',
        'Perfect for key takeaways',
        'Easy to scan and understand',
        'Professional appearance'
      ]}
    >
      {#snippet title()}
        <span style="font-size: clamp(1.5rem, 3vw, 2rem);">Key Takeaways</span>
      {/snippet}
    </TitleWithBulletsLayout>
  </CardContainer>
</div>

<div class="divider my-8"></div>

<h2>Responsive Behavior</h2>
<p>
  All column layouts automatically stack vertically on screens smaller than 1024px (tablets and mobile devices).
  On larger desktop screens (1024px and above), columns display side-by-side. This ensures optimal readability
  across all device sizes.
</p>

<div class="divider my-8"></div>

<h2>Auto-Scaling and Auto-Sizing</h2>

<p class="my-4">
  All examples above use <code>autoScale={true}</code> and fluid typography with <code>clamp()</code> to ensure content scales smoothly across different screen sizes.
</p>

<div class="alert alert-success my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h3 class="font-bold">Auto-Scaling with autoScale={true}</h3>
    <div class="text-sm">CardContainer uses CSS transform scaling based on container width. This proportionally scales all content while maintaining aspect ratios.</div>
  </div>
</div>

<div class="alert alert-success my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h3 class="font-bold">Fluid Typography with clamp()</h3>
    <div class="text-sm">Using <code>font-size: clamp(min, preferred, max)</code> ensures text scales smoothly between minimum and maximum sizes based on viewport width, preventing text from being too small or too large.</div>
  </div>
</div>

<h3>Typography Ranges Used</h3>
<ul class="list-disc list-inside space-y-2 my-4">
  <li><strong>2-Column Headings:</strong> <code>clamp(1.25rem, 2vw, 1.5rem)</code> = 20-24px</li>
  <li><strong>2-Column Body:</strong> <code>clamp(1rem, 1.5vw, 1.125rem)</code> = 16-18px</li>
  <li><strong>3-Column Headings:</strong> <code>clamp(1.125rem, 1.75vw, 1.25rem)</code> = 18-20px</li>
  <li><strong>3-Column Body:</strong> <code>clamp(0.875rem, 1.25vw, 1rem)</code> = 14-16px</li>
  <li><strong>4-Column Icons:</strong> <code>clamp(2rem, 3vw, 2.5rem)</code> = 32-40px</li>
  <li><strong>4-Column Text:</strong> <code>clamp(1rem, 1.5vw, 1.125rem)</code> = 16-18px</li>
</ul>

<div class="divider my-8"></div>

<h2>Best Practices</h2>

<ul class="list-disc list-inside space-y-2 my-4">
  <li><strong>Always wrap layouts in CardContainer</strong> - Layouts need a defined container with aspect ratio</li>
  <li><strong>Enable auto-scaling</strong> - Use <code>autoScale={true}</code> for responsive transform-based scaling</li>
  <li><strong>Use fluid typography</strong> - Replace fixed sizes like <code>text-2xl</code> with <code>clamp()</code> for smooth scaling</li>
  <li><strong>Add padding to the layout</strong> - Use <code>class="p-8"</code> for comfortable spacing</li>
  <li><strong>Style column content</strong> - Add backgrounds, borders, or padding to make columns visible</li>
  <li><strong>Use flex for vertical centering</strong> - Add <code>flex flex-col justify-center</code> to center content</li>
  <li><strong>Test responsive behavior</strong> - Resize your browser to see both auto-scaling and column stacking</li>
</ul>
