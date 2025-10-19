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

  // Code examples
  const blankLayoutCode = `<BlankLayout>
  <!-- Your custom content here -->
  <div class="p-8">
    <h1>Custom Layout</h1>
    <p>Build your own layout from scratch</p>
  </div>
</BlankLayout>`;

  const twoColumnCode = `<TwoColumnLayout>
  {#snippet left()}
    <h3>Left Column</h3>
    <p>Content for the left side</p>
  {/snippet}

  {#snippet right()}
    <h3>Right Column</h3>
    <p>Content for the right side</p>
  {/snippet}
</TwoColumnLayout>`;

  const threeColumnCode = `<ThreeColumnLayout>
  {#snippet first()}
    <h3>Column 1</h3>
    <p>First column content</p>
  {/snippet}

  {#snippet second()}
    <h3>Column 2</h3>
    <p>Second column content</p>
  {/snippet}

  {#snippet third()}
    <h3>Column 3</h3>
    <p>Third column content</p>
  {/snippet}
</ThreeColumnLayout>`;

  const fourColumnCode = `<FourColumnLayout>
  {#snippet first()}
    <h3>Column 1</h3>
  {/snippet}

  {#snippet second()}
    <h3>Column 2</h3>
  {/snippet}

  {#snippet third()}
    <h3>Column 3</h3>
  {/snippet}

  {#snippet fourth()}
    <h3>Column 4</h3>
  {/snippet}
</FourColumnLayout>`;

  const twoColumnWithHeadingsCode = `<TwoColumnWithHeadingsLayout>
  {#snippet leftHeading()}
    Features
  {/snippet}

  {#snippet leftContent()}
    <ul>
      <li>Easy to use</li>
      <li>Fully responsive</li>
    </ul>
  {/snippet}

  {#snippet rightHeading()}
    Benefits
  {/snippet}

  {#snippet rightContent()}
    <ul>
      <li>Save time</li>
      <li>Look professional</li>
    </ul>
  {/snippet}
</TwoColumnWithHeadingsLayout>`;

  const threeColumnWithHeadingsCode = `<ThreeColumnWithHeadingsLayout>
  {#snippet firstHeading()}
    Step 1
  {/snippet}

  {#snippet firstContent()}
    <p>First step description</p>
  {/snippet}

  {#snippet secondHeading()}
    Step 2
  {/snippet}

  {#snippet secondContent()}
    <p>Second step description</p>
  {/snippet}

  {#snippet thirdHeading()}
    Step 3
  {/snippet}

  {#snippet thirdContent()}
    <p>Third step description</p>
  {/snippet}
</ThreeColumnWithHeadingsLayout>`;

  const imageAndTextCode = `<ImageAndTextLayout
  image="https://images.unsplash.com/photo-1..."
  imageAlt="Description"
>
  <h2>Image on Left</h2>
  <p>Text content appears on the right side.</p>
  <p>Perfect for product showcases.</p>
</ImageAndTextLayout>`;

  const textAndImageCode = `<TextAndImageLayout
  image="https://images.unsplash.com/photo-1..."
  imageAlt="Description"
>
  <h2>Text on Left</h2>
  <p>Image appears on the right side.</p>
  <p>Great for feature highlights.</p>
</TextAndImageLayout>`;

  const titleWithBulletsCode = `<TitleWithBulletsLayout
  items={[
    'First bullet point',
    'Second bullet point',
    'Third bullet point',
    'Fourth bullet point'
  ]}
>
  {#snippet title()}
    Key Takeaways
  {/snippet}
</TitleWithBulletsLayout>`;

  const titleWithBulletsAndImageCode = `<TitleWithBulletsAndImageLayout
  image="https://images.unsplash.com/photo-1..."
  imageAlt="Description"
  items={[
    'Feature one',
    'Feature two',
    'Feature three'
  ]}
>
  {#snippet title()}
    Product Features
  {/snippet}
</TitleWithBulletsAndImageLayout>`;
</script>

<svelte:head>
  <title>Basic Layouts - SlideyUI</title>
</svelte:head>

<h1>Basic Layouts</h1>

<p class="lead">
  Pre-built layout components for common presentation patterns. These layouts work perfectly
  inside cards and slides, optimized for 16:9 presentations.
</p>

<div class="divider my-8"></div>

<!-- Blank Layout -->
<h2 id="blank-layout">Blank Layout</h2>
<p>
  An empty canvas for building custom layouts. Just a simple wrapper with full width and height.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <BlankLayout>
      <div class="flex items-center justify-center h-full bg-gradient-to-br from-primary/10 to-secondary/10">
        <div class="text-center">
          <h2 class="text-4xl font-bold mb-4">Custom Content</h2>
          <p class="text-xl">Build anything you want</p>
        </div>
      </div>
    </BlankLayout>
  </CardContainer>
</div>

<CodeBlock code={blankLayoutCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Two Column Layout -->
<h2 id="two-column">Two Column Layout</h2>
<p>
  Simple two-column layout with equal width columns.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <TwoColumnLayout class="p-8">
      {#snippet left()}
        <div class="p-6 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-2xl font-bold mb-4">Left Column</h3>
          <p>Content for the left side of the layout.</p>
        </div>
      {/snippet}

      {#snippet right()}
        <div class="p-6 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-2xl font-bold mb-4">Right Column</h3>
          <p>Content for the right side of the layout.</p>
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
  Three equal-width columns for organizing content.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <ThreeColumnLayout class="p-8">
      {#snippet first()}
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-xl font-bold mb-2">Column 1</h3>
          <p>First column content</p>
        </div>
      {/snippet}

      {#snippet second()}
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-xl font-bold mb-2">Column 2</h3>
          <p>Second column content</p>
        </div>
      {/snippet}

      {#snippet third()}
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-xl font-bold mb-2">Column 3</h3>
          <p>Third column content</p>
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
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-lg font-bold mb-2">Col 1</h3>
          <p class="text-sm">Content</p>
        </div>
      {/snippet}

      {#snippet second()}
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-lg font-bold mb-2">Col 2</h3>
          <p class="text-sm">Content</p>
        </div>
      {/snippet}

      {#snippet third()}
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-lg font-bold mb-2">Col 3</h3>
          <p class="text-sm">Content</p>
        </div>
      {/snippet}

      {#snippet fourth()}
        <div class="p-4 bg-base-200 rounded-lg h-full flex flex-col justify-center">
          <h3 class="text-lg font-bold mb-2">Col 4</h3>
          <p class="text-sm">Content</p>
        </div>
      {/snippet}
    </FourColumnLayout>
  </CardContainer>
</div>

<CodeBlock code={fourColumnCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Two Column With Headings -->
<h2 id="two-column-headings">Two Column with Headings</h2>
<p>
  Two columns, each with its own heading - perfect for comparisons or feature lists.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <TwoColumnWithHeadingsLayout class="p-8">
      {#snippet leftHeading()}
        Features
      {/snippet}

      {#snippet leftContent()}
        <ul class="list-disc list-inside space-y-2">
          <li>Easy to use</li>
          <li>Fully responsive</li>
          <li>Customizable</li>
        </ul>
      {/snippet}

      {#snippet rightHeading()}
        Benefits
      {/snippet}

      {#snippet rightContent()}
        <ul class="list-disc list-inside space-y-2">
          <li>Save time</li>
          <li>Look professional</li>
          <li>Impress audiences</li>
        </ul>
      {/snippet}
    </TwoColumnWithHeadingsLayout>
  </CardContainer>
</div>

<CodeBlock code={twoColumnWithHeadingsCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Three Column With Headings -->
<h2 id="three-column-headings">Three Column with Headings</h2>
<p>
  Three columns with headings - ideal for step-by-step processes.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <ThreeColumnWithHeadingsLayout class="p-8">
      {#snippet firstHeading()}
        Step 1
      {/snippet}

      {#snippet firstContent()}
        <p>Install the package from npm</p>
      {/snippet}

      {#snippet secondHeading()}
        Step 2
      {/snippet}

      {#snippet secondContent()}
        <p>Configure your project</p>
      {/snippet}

      {#snippet thirdHeading()}
        Step 3
      {/snippet}

      {#snippet thirdContent()}
        <p>Start building!</p>
      {/snippet}
    </ThreeColumnWithHeadingsLayout>
  </CardContainer>
</div>

<CodeBlock code={threeColumnWithHeadingsCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Image and Text -->
<h2 id="image-and-text">Image and Text Layout</h2>
<p>
  Image on the left, text content on the right - perfect for product showcases.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <ImageAndTextLayout
      image="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"
      imageAlt="Abstract colorful background"
    >
      <div class="p-8">
        <h2 class="text-3xl font-bold mb-4">Beautiful Design</h2>
        <p class="text-lg mb-4">Create stunning presentations with ease.</p>
        <p>Combine images with compelling text to tell your story.</p>
      </div>
    </ImageAndTextLayout>
  </CardContainer>
</div>

<CodeBlock code={imageAndTextCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Text and Image -->
<h2 id="text-and-image">Text and Image Layout</h2>
<p>
  Text content on the left, image on the right - great for feature highlights.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <TextAndImageLayout
      image="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800"
      imageAlt="Modern office workspace"
    >
      <div class="p-8">
        <h2 class="text-3xl font-bold mb-4">Professional Tools</h2>
        <p class="text-lg mb-4">Everything you need to succeed.</p>
        <p>Powerful features designed for modern presentations.</p>
      </div>
    </TextAndImageLayout>
  </CardContainer>
</div>

<CodeBlock code={textAndImageCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Title with Bullets -->
<h2 id="title-with-bullets">Title with Bullets Layout</h2>
<p>
  A title at the top with a bulleted list below - the classic presentation layout.
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

<CodeBlock code={titleWithBulletsCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Title with Bullets and Image -->
<h2 id="title-bullets-image">Title with Bullets and Image Layout</h2>
<p>
  Title and bullets on the left, supporting image on the right - combines the best of both worlds.
</p>

<div class="my-6">
  <CardContainer aspectRatio="16/9" bordered={true}>
    <TitleWithBulletsAndImageLayout
      class="p-8"
      image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"
      imageAlt="Data visualization"
      items={[
        'AI-powered generation',
        'Real-time collaboration',
        'Beautiful templates',
        'Export to any format'
      ]}
    >
      {#snippet title()}
        Product Features
      {/snippet}
    </TitleWithBulletsAndImageLayout>
  </CardContainer>
</div>

<CodeBlock code={titleWithBulletsAndImageCode} language="svelte" />

<div class="divider my-8"></div>

<!-- Usage Guide -->
<h2>Usage Tips</h2>

<h3>Inside Cards</h3>
<p>
  All basic layouts work seamlessly inside CardContainer components:
</p>

<CodeBlock code={`<CardContainer aspectRatio="16/9">
  <TwoColumnLayout>
    <!-- Your content -->
  </TwoColumnLayout>
</CardContainer>`} language="svelte" />

<h3>Responsive Design</h3>
<p>
  These layouts are optimized for 16:9 presentations but will adapt to different aspect ratios.
  The column layouts will stack vertically on smaller screens.
</p>

<h3>Customization</h3>
<p>
  All layouts accept a <code>class</code> prop for additional styling:
</p>

<CodeBlock code={`<TwoColumnLayout class="bg-primary text-primary-content">
  <!-- Styled content -->
</TwoColumnLayout>`} language="svelte" />

<div class="divider my-8"></div>

<h2>React Usage</h2>

<p>
  These layouts are also available in the React package with identical APIs.
  Instead of Svelte snippets, use React children and props:
</p>

<CodeBlock code={`import { TwoColumnLayout } from '@slideyui/react';

<TwoColumnLayout
  left={<div><h3>Left</h3><p>Content</p></div>}
  right={<div><h3>Right</h3><p>Content</p></div>}
/>`} language="tsx" />
