<script lang="ts">
  import { ContentCard, CardGrid, MediaCard, DataCard } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const flexRowCode = `<div class="flex gap-4">
  <ContentCard title="Card 1" class="flex-1">
    <p>Equal width with flex-1</p>
  </ContentCard>
  <ContentCard title="Card 2" class="flex-1">
    <p>Equal width with flex-1</p>
  </ContentCard>
  <ContentCard title="Card 3" class="flex-1">
    <p>Equal width with flex-1</p>
  </ContentCard>
</div>`;

  const flexColCode = `<div class="flex flex-col gap-4 max-w-md">
  <ContentCard title="Card 1">
    <p>Stacked vertically</p>
  </ContentCard>
  <ContentCard title="Card 2">
    <p>Stacked vertically</p>
  </ContentCard>
  <ContentCard title="Card 3">
    <p>Stacked vertically</p>
  </ContentCard>
</div>`;

  const flexDifferentSizesCode = `<div class="flex gap-4">
  <ContentCard title="1/4" class="flex-[1]">
    <p>flex-[1]</p>
  </ContentCard>
  <ContentCard title="2/4" class="flex-[2]">
    <p>flex-[2] - Takes twice the space</p>
  </ContentCard>
  <ContentCard title="1/4" class="flex-[1]">
    <p>flex-[1]</p>
  </ContentCard>
</div>`;

  const justifyAlignCode = `<div class="flex justify-between items-center gap-4 h-64 bg-base-200 p-4 rounded-lg">
  <ContentCard title="Start" class="w-48">
    <p>Aligned center</p>
  </ContentCard>
  <ContentCard title="Center" class="w-48">
    <p>Aligned center</p>
  </ContentCard>
  <ContentCard title="End" class="w-48">
    <p>Aligned center</p>
  </ContentCard>
</div>`;

  const gridOf2Code = `<div class="grid grid-cols-2 gap-4">
  <ContentCard title="1/2">
    <p>First column</p>
  </ContentCard>
  <ContentCard title="2/2">
    <p>Second column</p>
  </ContentCard>
</div>`;

  const gridOf3Code = `<div class="grid grid-cols-3 gap-6">
  <ContentCard title="1/3" />
  <ContentCard title="2/3" />
  <ContentCard title="3/3" />
</div>`;

  const gridOf4Code = `<div class="grid grid-cols-4 gap-4">
  <ContentCard title="1/4" />
  <ContentCard title="2/4" />
  <ContentCard title="3/4" />
  <ContentCard title="4/4" />
</div>`;

  const responsiveGridCode = `<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  <ContentCard title="Card 1">
    <p>Responsive grid</p>
  </ContentCard>
  <ContentCard title="Card 2">
    <p>Responsive grid</p>
  </ContentCard>
  <ContentCard title="Card 3">
    <p>Responsive grid</p>
  </ContentCard>
  <ContentCard title="Card 4">
    <p>Responsive grid</p>
  </ContentCard>
  <ContentCard title="Card 5">
    <p>Responsive grid</p>
  </ContentCard>
  <ContentCard title="Card 6">
    <p>Responsive grid</p>
  </ContentCard>
</div>`;

  const gridSpansCode = `<div class="grid grid-cols-6 gap-4">
  <ContentCard title="Span 3" class="col-span-3">
    <p>Takes 3 columns</p>
  </ContentCard>
  <ContentCard title="Span 2" class="col-span-2">
    <p>Takes 2 columns</p>
  </ContentCard>
  <ContentCard title="Span 1" class="col-span-1">
    <p>1 col</p>
  </ContentCard>
  <ContentCard title="Span 2" class="col-span-2">
    <p>Takes 2 columns</p>
  </ContentCard>
  <ContentCard title="Span 4" class="col-span-4">
    <p>Takes 4 columns</p>
  </ContentCard>
</div>`;

  const aspectRatioCode = `<div class="grid grid-cols-3 gap-4">
  <ContentCard title="Square" aspectRatio="1/1">
    <p>1:1 aspect ratio</p>
  </ContentCard>
  <ContentCard title="4:3" aspectRatio="4/3">
    <p>4:3 aspect ratio</p>
  </ContentCard>
  <ContentCard title="16:9" aspectRatio="16/9">
    <p>16:9 aspect ratio</p>
  </ContentCard>
</div>`;
</script>

<svelte:head>
  <title>Layout Utilities - SlideyUI Documentation</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Layout Utilities</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      SlideyUI cards work seamlessly with Tailwind CSS layout utilities. Use Flexbox, Grid, spacing, and sizing classes to create any layout you need for your presentations.
    </p>
  </header>

  <!-- Flexbox Layouts -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Flexbox Layouts</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Flexbox is perfect for creating responsive, flexible layouts. Use flex utilities to control direction, alignment, and spacing.
    </p>

    <div class="space-y-12">
      <!-- Flex Row -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Flex Row (Horizontal)</h3>
        <p class="text-base-content/70 mb-4">Use <code class="bg-base-200 px-2 py-1 rounded">flex</code> and <code class="bg-base-200 px-2 py-1 rounded">gap-4</code> to create horizontal layouts with equal spacing.</p>

        <div class="flex gap-4 mb-4">
          <ContentCard title="Card 1" class="flex-1" aspectRatio="4/3">
            <p class="text-lg">Equal width with flex-1</p>
          </ContentCard>
          <ContentCard title="Card 2" class="flex-1" aspectRatio="4/3">
            <p class="text-lg">Equal width with flex-1</p>
          </ContentCard>
          <ContentCard title="Card 3" class="flex-1" aspectRatio="4/3">
            <p class="text-lg">Equal width with flex-1</p>
          </ContentCard>
        </div>

        <CodeBlock code={flexRowCode} lang="html" />
      </div>

      <!-- Flex Column -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Flex Column (Vertical)</h3>
        <p class="text-base-content/70 mb-4">Use <code class="bg-base-200 px-2 py-1 rounded">flex-col</code> to stack cards vertically.</p>

        <div class="flex flex-col gap-4 max-w-md mb-4">
          <ContentCard title="Card 1">
            <p class="text-lg">Stacked vertically</p>
          </ContentCard>
          <ContentCard title="Card 2">
            <p class="text-lg">Stacked vertically</p>
          </ContentCard>
          <ContentCard title="Card 3">
            <p class="text-lg">Stacked vertically</p>
          </ContentCard>
        </div>

        <CodeBlock code={flexColCode} lang="html" />
      </div>

      <!-- Flex with Different Sizes -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Flex with Different Proportions</h3>
        <p class="text-base-content/70 mb-4">Use <code class="bg-base-200 px-2 py-1 rounded">flex-[n]</code> to control relative sizing.</p>

        <div class="flex gap-4 mb-4">
          <ContentCard title="1/4" class="flex-[1]" aspectRatio="4/3">
            <p class="text-lg">flex-[1]</p>
          </ContentCard>
          <ContentCard title="2/4" class="flex-[2]" aspectRatio="4/3">
            <p class="text-lg">flex-[2] - Takes twice the space</p>
          </ContentCard>
          <ContentCard title="1/4" class="flex-[1]" aspectRatio="4/3">
            <p class="text-lg">flex-[1]</p>
          </ContentCard>
        </div>

        <CodeBlock code={flexDifferentSizesCode} lang="html" />
      </div>

      <!-- Justify & Align -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Justify & Align</h3>
        <p class="text-base-content/70 mb-4">Control alignment with <code class="bg-base-200 px-2 py-1 rounded">justify-*</code> and <code class="bg-base-200 px-2 py-1 rounded">items-*</code>.</p>

        <div class="flex justify-between items-center gap-4 h-64 bg-base-200 p-4 rounded-lg mb-4">
          <ContentCard title="Start" class="w-48">
            <p class="text-lg">Aligned center</p>
          </ContentCard>
          <ContentCard title="Center" class="w-48">
            <p class="text-lg">Aligned center</p>
          </ContentCard>
          <ContentCard title="End" class="w-48">
            <p class="text-lg">Aligned center</p>
          </ContentCard>
        </div>

        <CodeBlock code={justifyAlignCode} lang="html" />
      </div>
    </div>
  </section>

  <!-- Grid Layouts -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Grid Layouts</h2>
    <p class="text-lg text-base-content/70 mb-8">
      CSS Grid provides powerful two-dimensional layouts. Perfect for creating structured presentation slides.
    </p>

    <div class="space-y-12">
      <!-- Grid of 2 -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Grid of 2</h3>
        <p class="text-base-content/70 mb-4">Two equal columns with <code class="bg-base-200 px-2 py-1 rounded">grid-cols-2</code>.</p>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <ContentCard title="1/2" aspectRatio="16/9">
            <p class="text-lg">First column</p>
          </ContentCard>
          <ContentCard title="2/2" aspectRatio="16/9">
            <p class="text-lg">Second column</p>
          </ContentCard>
        </div>

        <CodeBlock code={gridOf2Code} lang="html" />
      </div>

      <!-- Grid of 3 -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Grid of 3</h3>
        <p class="text-base-content/70 mb-4">Three equal columns with <code class="bg-base-200 px-2 py-1 rounded">grid-cols-3</code>.</p>

        <div class="grid grid-cols-3 gap-6 mb-4">
          <ContentCard title="1/3" aspectRatio="4/3">
            <p class="text-lg">Column 1</p>
          </ContentCard>
          <ContentCard title="2/3" aspectRatio="4/3">
            <p class="text-lg">Column 2</p>
          </ContentCard>
          <ContentCard title="3/3" aspectRatio="4/3">
            <p class="text-lg">Column 3</p>
          </ContentCard>
        </div>

        <CodeBlock code={gridOf3Code} lang="html" />
      </div>

      <!-- Grid of 4 -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Grid of 4</h3>
        <p class="text-base-content/70 mb-4">Four equal columns with <code class="bg-base-200 px-2 py-1 rounded">grid-cols-4</code>.</p>

        <div class="grid grid-cols-4 gap-4 mb-4">
          <ContentCard title="1/4" aspectRatio="1/1">
            <p class="text-base">Col 1</p>
          </ContentCard>
          <ContentCard title="2/4" aspectRatio="1/1">
            <p class="text-base">Col 2</p>
          </ContentCard>
          <ContentCard title="3/4" aspectRatio="1/1">
            <p class="text-base">Col 3</p>
          </ContentCard>
          <ContentCard title="4/4" aspectRatio="1/1">
            <p class="text-base">Col 4</p>
          </ContentCard>
        </div>

        <CodeBlock code={gridOf4Code} lang="html" />
      </div>

      <!-- Responsive Grid -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Responsive Grid</h3>
        <p class="text-base-content/70 mb-4">Adapt to screen size with responsive breakpoints.</p>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
          <ContentCard title="Card 1" aspectRatio="4/3">
            <p class="text-lg">Responsive grid</p>
          </ContentCard>
          <ContentCard title="Card 2" aspectRatio="4/3">
            <p class="text-lg">Responsive grid</p>
          </ContentCard>
          <ContentCard title="Card 3" aspectRatio="4/3">
            <p class="text-lg">Responsive grid</p>
          </ContentCard>
          <ContentCard title="Card 4" aspectRatio="4/3">
            <p class="text-lg">Responsive grid</p>
          </ContentCard>
          <ContentCard title="Card 5" aspectRatio="4/3">
            <p class="text-lg">Responsive grid</p>
          </ContentCard>
          <ContentCard title="Card 6" aspectRatio="4/3">
            <p class="text-lg">Responsive grid</p>
          </ContentCard>
        </div>

        <CodeBlock code={responsiveGridCode} lang="html" />
      </div>

      <!-- Grid with Spans -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Grid with Column Spans</h3>
        <p class="text-base-content/70 mb-4">Use <code class="bg-base-200 px-2 py-1 rounded">col-span-*</code> to make cards span multiple columns.</p>

        <div class="grid grid-cols-6 gap-4 mb-4">
          <ContentCard title="Span 3" class="col-span-3" aspectRatio="16/9">
            <p class="text-lg">Takes 3 columns</p>
          </ContentCard>
          <ContentCard title="Span 2" class="col-span-2" aspectRatio="16/9">
            <p class="text-lg">Takes 2 columns</p>
          </ContentCard>
          <ContentCard title="Span 1" class="col-span-1" aspectRatio="16/9">
            <p class="text-base">1 col</p>
          </ContentCard>
          <ContentCard title="Span 2" class="col-span-2" aspectRatio="16/9">
            <p class="text-lg">Takes 2 columns</p>
          </ContentCard>
          <ContentCard title="Span 4" class="col-span-4" aspectRatio="16/9">
            <p class="text-lg">Takes 4 columns</p>
          </ContentCard>
        </div>

        <CodeBlock code={gridSpansCode} lang="html" />
      </div>
    </div>
  </section>

  <!-- Spacing & Sizing -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Spacing & Sizing</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Control gaps, margins, padding, and sizing with Tailwind utilities.
    </p>

    <div class="space-y-12">
      <!-- Gap Sizes -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Gap Sizes</h3>
        <p class="text-base-content/70 mb-4">Control spacing between cards with <code class="bg-base-200 px-2 py-1 rounded">gap-*</code>.</p>

        <div class="space-y-8">
          <div>
            <p class="text-sm font-mono mb-2 text-base-content/70">gap-2 (0.5rem / 8px)</p>
            <div class="flex gap-2">
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Tight spacing</p>
              </ContentCard>
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Tight spacing</p>
              </ContentCard>
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Tight spacing</p>
              </ContentCard>
            </div>
          </div>

          <div>
            <p class="text-sm font-mono mb-2 text-base-content/70">gap-4 (1rem / 16px)</p>
            <div class="flex gap-4">
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Normal spacing</p>
              </ContentCard>
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Normal spacing</p>
              </ContentCard>
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Normal spacing</p>
              </ContentCard>
            </div>
          </div>

          <div>
            <p class="text-sm font-mono mb-2 text-base-content/70">gap-8 (2rem / 32px)</p>
            <div class="flex gap-8">
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Loose spacing</p>
              </ContentCard>
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Loose spacing</p>
              </ContentCard>
              <ContentCard title="Card" class="flex-1" aspectRatio="4/3">
                <p>Loose spacing</p>
              </ContentCard>
            </div>
          </div>
        </div>
      </div>

      <!-- Max Width Containers -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Max Width Containers</h3>
        <p class="text-base-content/70 mb-4">Constrain card width with <code class="bg-base-200 px-2 py-1 rounded">max-w-*</code>.</p>

        <div class="space-y-4">
          <ContentCard title="max-w-sm" class="max-w-sm">
            <p>Small max width (24rem)</p>
          </ContentCard>
          <ContentCard title="max-w-md" class="max-w-md">
            <p>Medium max width (28rem)</p>
          </ContentCard>
          <ContentCard title="max-w-lg" class="max-w-lg">
            <p>Large max width (32rem)</p>
          </ContentCard>
          <ContentCard title="max-w-2xl" class="max-w-2xl">
            <p>2XL max width (42rem)</p>
          </ContentCard>
        </div>
      </div>

      <!-- Height Utilities -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Height Utilities</h3>
        <p class="text-base-content/70 mb-4">Control card height with <code class="bg-base-200 px-2 py-1 rounded">h-*</code>.</p>

        <div class="flex gap-4">
          <ContentCard title="h-32" class="h-32 flex-1">
            <p>Fixed height 8rem</p>
          </ContentCard>
          <ContentCard title="h-48" class="h-48 flex-1">
            <p>Fixed height 12rem</p>
          </ContentCard>
          <ContentCard title="h-64" class="h-64 flex-1">
            <p>Fixed height 16rem</p>
          </ContentCard>
        </div>
      </div>
    </div>
  </section>

  <!-- Aspect Ratios -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Aspect Ratios</h2>
    <p class="text-lg text-base-content/70 mb-8">
      SlideyUI cards support built-in aspect ratios for consistent presentation layouts.
    </p>

    <div class="grid grid-cols-3 gap-4 mb-4">
      <ContentCard title="Square" aspectRatio="1/1">
        <p class="text-lg">1:1 aspect ratio</p>
      </ContentCard>
      <ContentCard title="4:3" aspectRatio="4/3">
        <p class="text-lg">4:3 aspect ratio</p>
      </ContentCard>
      <ContentCard title="16:9" aspectRatio="16/9">
        <p class="text-lg">16:9 aspect ratio</p>
      </ContentCard>
    </div>

    <CodeBlock code={aspectRatioCode} lang="html" />
  </section>

  <!-- Mixed Layout Example -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Mixed Layout Example</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Combine different utilities to create complex, presentation-ready layouts.
    </p>

    <div class="grid grid-cols-12 gap-4">
      <ContentCard title="Hero Card" class="col-span-8" aspectRatio="16/9" variant="featured">
        <p class="text-xl">Main content takes 2/3 of the width</p>
        <ul class="mt-4 space-y-2">
          <li>Use col-span-8 for emphasis</li>
          <li>Combine with variant="featured"</li>
          <li>Perfect for key messages</li>
        </ul>
      </ContentCard>

      <div class="col-span-4 flex flex-col gap-4">
        <DataCard
          title="Metric 1"
          value="42K"
          label="Total Views"
          trend="up"
          aspectRatio="4/3"
        />
        <DataCard
          title="Metric 2"
          value="98%"
          label="Success Rate"
          trend="up"
          aspectRatio="4/3"
        />
      </div>
    </div>
  </section>

  <!-- Padding Variants -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Padding Variants</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Control internal spacing with the <code class="bg-base-200 px-2 py-1 rounded">padding</code> prop. Choose from compact, default, spacious, or none for full control.
    </p>

    <div class="space-y-8">
      <!-- Compact Padding -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Compact Padding</h3>
        <p class="text-base-content/70 mb-4">Perfect for dense layouts with multiple cards.</p>

        <div class="grid grid-cols-3 gap-4 mb-4">
          <ContentCard title="Compact 1" padding="compact" aspectRatio="4/3">
            <p class="text-base">Tighter spacing for information-dense slides.</p>
          </ContentCard>
          <ContentCard title="Compact 2" padding="compact" aspectRatio="4/3">
            <p class="text-base">Uses 24px padding by default.</p>
          </ContentCard>
          <ContentCard title="Compact 3" padding="compact" aspectRatio="4/3">
            <p class="text-base">Scales responsively on smaller screens.</p>
          </ContentCard>
        </div>

        <CodeBlock code={`<ContentCard title="Compact Card" padding="compact">
  <p>Tighter spacing for information-dense slides.</p>
</ContentCard>`} lang="html" />
      </div>

      <!-- Default Padding -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Default Padding</h3>
        <p class="text-base-content/70 mb-4">Balanced spacing for most use cases (32px base).</p>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <ContentCard title="Default Padding" padding="default" aspectRatio="16/9">
            <p class="text-lg">Balanced spacing that works for most presentation scenarios.</p>
            <ul class="mt-4 space-y-2">
              <li>32px base padding</li>
              <li>Scales to 48px on large screens</li>
              <li>Comfortable reading experience</li>
            </ul>
          </ContentCard>
          <ContentCard title="Another Card" padding="default" aspectRatio="16/9">
            <p class="text-lg">Consistent spacing across your presentation maintains visual harmony.</p>
          </ContentCard>
        </div>

        <CodeBlock code={`<ContentCard title="Balanced Card" padding="default">
  <p>Perfect for most presentation use cases.</p>
</ContentCard>`} lang="html" />
      </div>

      <!-- Spacious Padding -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">Spacious Padding</h3>
        <p class="text-base-content/70 mb-4">Generous breathing room for impactful slides (48px base).</p>

        <ContentCard title="Spacious Padding" padding="spacious" aspectRatio="16/9" variant="featured" class="mb-4">
          <p class="text-2xl mb-4">Generous spacing creates visual impact.</p>
          <p class="text-lg">Use spacious padding for:</p>
          <ul class="mt-4 space-y-2 text-lg">
            <li>Key messages and important slides</li>
            <li>Large metrics and data visualizations</li>
            <li>Quotes and testimonials</li>
          </ul>
        </ContentCard>

        <CodeBlock code={`<ContentCard title="Key Message" padding="spacious" variant="featured">
  <p class="text-2xl">Generous spacing creates impact.</p>
</ContentCard>

<DataCard title="Revenue" value="$1.2M" padding="spacious" variant="metric" />`} lang="html" />
      </div>

      <!-- None (Flush) Padding -->
      <div>
        <h3 class="text-2xl font-semibold mb-4">None (Flush) Padding</h3>
        <p class="text-base-content/70 mb-4">Zero padding for full-bleed media and custom layouts.</p>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <MediaCard
            src="https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&auto=format&fit=crop"
            alt="Office"
            padding="none"
            aspectRatio="16/9"
          />
          <div class="border border-base-300 rounded-lg overflow-hidden">
            <ContentCard title="Split Layout" padding="none" bordered={false}>
              <div class="grid grid-cols-2 divide-x divide-base-300">
                <div class="p-6">
                  <p>Left section with custom padding</p>
                </div>
                <div class="p-6">
                  <p>Right section with custom padding</p>
                </div>
              </div>
            </ContentCard>
          </div>
        </div>

        <CodeBlock code={`<!-- Full-bleed image -->
<MediaCard src="/image.jpg" padding="none" />

<!-- Custom layout with manual padding -->
<ContentCard padding="none">
  <div class="grid grid-cols-2">
    <div class="p-6">Left with custom padding</div>
    <div class="p-6">Right with custom padding</div>
  </div>
</ContentCard>`} lang="html" />
      </div>

      <!-- Responsive Padding -->
      <div class="alert alert-info">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <h4 class="font-bold">Responsive Padding</h4>
          <p class="text-sm">All padding variants scale automatically on different screen sizes. Compact becomes 16px on mobile, while spacious grows to 64px on large displays.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Best Practices -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Best Practices</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-success/10 border border-success">
        <div class="card-body">
          <h3 class="card-title text-success">Do</h3>
          <ul class="space-y-2">
            <li>Use consistent gap sizes throughout your presentation</li>
            <li>Leverage aspect ratios for predictable layouts</li>
            <li>Use grid for structured layouts</li>
            <li>Use flexbox for flexible, responsive layouts</li>
            <li>Test on different screen sizes</li>
            <li>Use spacious padding for key messages and metrics</li>
            <li>Use compact padding for information-dense slides</li>
            <li>Use padding="none" for full-bleed media</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Mix too many different gap sizes</li>
            <li>Create overly complex grid structures</li>
            <li>Forget about mobile responsiveness</li>
            <li>Use fixed widths when flex/grid would be better</li>
            <li>Overcrowd slides with too many cards</li>
            <li>Mix padding variants randomly without intent</li>
            <li>Use compact padding for slides with large text</li>
            <li>Forget that padding scales on large displays</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Next Steps -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Next Steps</h2>
    <div class="flex gap-4">
      <a href="/docs/typography" class="btn btn-primary">
        Typography Utilities
      </a>
      <a href="/docs/cards" class="btn btn-outline">
        Explore Cards
      </a>
      <a href="/docs/components" class="btn btn-outline">
        View All Components
      </a>
    </div>
  </section>
</div>
