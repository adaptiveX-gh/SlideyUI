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
  const twoColumnCode = `<CardContainer aspectRatio="16/9" bordered={true}>
  <TwoColumnLayout class="p-8">
    {#snippet left()}
      <div class="bg-primary/10 rounded p-6 h-full flex flex-col justify-center">
        <h3 class="text-2xl font-bold mb-4">Left Column</h3>
        <p>Content for the left side</p>
      </div>
    {/snippet}

    {#snippet right()}
      <div class="bg-secondary/10 rounded p-6 h-full flex flex-col justify-center">
        <h3 class="text-2xl font-bold mb-4">Right Column</h3>
        <p>Content for the right side</p>
      </div>
    {/snippet}
  </TwoColumnLayout>
</CardContainer>`;

  const threeColumnCode = `<CardContainer aspectRatio="16/9" bordered={true}>
  <ThreeColumnLayout class="p-8">
    {#snippet first()}
      <div class="bg-primary/10 rounded p-4 h-full flex flex-col justify-center">
        <h3 class="text-xl font-bold mb-2">Column 1</h3>
        <p>First column</p>
      </div>
    {/snippet}

    {#snippet second()}
      <div class="bg-accent/10 rounded p-4 h-full flex flex-col justify-center">
        <h3 class="text-xl font-bold mb-2">Column 2</h3>
        <p>Second column</p>
      </div>
    {/snippet}

    {#snippet third()}
      <div class="bg-secondary/10 rounded p-4 h-full flex flex-col justify-center">
        <h3 class="text-xl font-bold mb-2">Column 3</h3>
        <p>Third column</p>
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
  <CardContainer aspectRatio="16/9" bordered={true}>
    <TwoColumnLayout class="p-8">
      {#snippet left()}
        <div class="bg-primary/10 border-2 border-primary/30 rounded-lg p-6 h-full flex flex-col justify-center">
          <h3 class="text-2xl font-bold mb-4 text-primary">Left Column</h3>
          <p>This is the left side content. The grid automatically creates equal-width columns.</p>
        </div>
      {/snippet}

      {#snippet right()}
        <div class="bg-secondary/10 border-2 border-secondary/30 rounded-lg p-6 h-full flex flex-col justify-center">
          <h3 class="text-2xl font-bold mb-4 text-secondary">Right Column</h3>
          <p>This is the right side content. Both columns stretch to fill the container height.</p>
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
  <CardContainer aspectRatio="16/9" bordered={true}>
    <ThreeColumnLayout class="p-8">
      {#snippet first()}
        <div class="bg-primary/10 border-2 border-primary/30 rounded-lg p-4 h-full flex flex-col justify-center text-center">
          <h3 class="text-xl font-bold mb-2 text-primary">Column 1</h3>
          <p class="text-sm">First column content</p>
        </div>
      {/snippet}

      {#snippet second()}
        <div class="bg-accent/10 border-2 border-accent/30 rounded-lg p-4 h-full flex flex-col justify-center text-center">
          <h3 class="text-xl font-bold mb-2 text-accent">Column 2</h3>
          <p class="text-sm">Second column content</p>
        </div>
      {/snippet}

      {#snippet third()}
        <div class="bg-secondary/10 border-2 border-secondary/30 rounded-lg p-4 h-full flex flex-col justify-center text-center">
          <h3 class="text-xl font-bold mb-2 text-secondary">Column 3</h3>
          <p class="text-sm">Third column content</p>
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
  <CardContainer aspectRatio="16/9" bordered={true}>
    <FourColumnLayout class="p-8">
      {#snippet first()}
        <div class="bg-primary/10 border border-primary/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="text-4xl mb-2">📊</div>
          <h3 class="text-lg font-bold">Stats</h3>
        </div>
      {/snippet}

      {#snippet second()}
        <div class="bg-accent/10 border border-accent/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="text-4xl mb-2">⚡</div>
          <h3 class="text-lg font-bold">Speed</h3>
        </div>
      {/snippet}

      {#snippet third()}
        <div class="bg-secondary/10 border border-secondary/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="text-4xl mb-2">🎯</div>
          <h3 class="text-lg font-bold">Goals</h3>
        </div>
      {/snippet}

      {#snippet fourth()}
        <div class="bg-info/10 border border-info/30 rounded-lg p-3 h-full flex flex-col justify-center items-center text-center">
          <div class="text-4xl mb-2">✨</div>
          <h3 class="text-lg font-bold">Magic</h3>
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
  <CardContainer aspectRatio="16/9" bordered={true}>
    <TwoColumnWithHeadingsLayout class="p-8">
      {#snippet leftHeading()}
        Features
      {/snippet}

      {#snippet leftContent()}
        <ul class="space-y-2">
          <li>✓ Easy to use</li>
          <li>✓ Fully responsive</li>
          <li>✓ Customizable</li>
        </ul>
      {/snippet}

      {#snippet rightHeading()}
        Benefits
      {/snippet}

      {#snippet rightContent()}
        <ul class="space-y-2">
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
  <CardContainer aspectRatio="16/9" bordered={true}>
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
        Key Takeaways
      {/snippet}
    </TitleWithBulletsLayout>
  </CardContainer>
</div>

<div class="divider my-8"></div>

<h2>Responsive Behavior</h2>
<p>
  All column layouts automatically stack vertically on screens smaller than 480px (portrait phones).
  On larger screens, columns display side-by-side as designed.
</p>

<div class="divider my-8"></div>

<h2>Best Practices</h2>

<ul class="list-disc list-inside space-y-2 my-4">
  <li><strong>Always wrap layouts in CardContainer</strong> - Layouts need a defined container with aspect ratio</li>
  <li><strong>Add padding to the layout</strong> - Use <code>class="p-8"</code> for comfortable spacing</li>
  <li><strong>Style column content</strong> - Add backgrounds, borders, or padding to make columns visible</li>
  <li><strong>Use flex for vertical centering</strong> - Add <code>flex flex-col justify-center</code> to center content</li>
  <li><strong>Test responsive behavior</strong> - Resize your browser to see columns stack on small screens</li>
</ul>
