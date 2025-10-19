<script lang="ts">
  import { ContentCard, Divider } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const basicUsageCode = `<!-- Simple horizontal divider -->
<Divider />

<!-- Divider with text -->
<Divider>OR</Divider>

<!-- Colored dividers -->
<Divider variant="primary">Section Break</Divider>
<Divider variant="accent">Next Topic</Divider>`;

  const reactUsageCode = `import { Divider } from '@slideyui/react';

// Simple horizontal divider
<Divider />

// Divider with text
<Divider>OR</Divider>

// Colored dividers
<Divider variant="primary">Section Break</Divider>
<Divider variant="accent">Next Topic</Divider>`;

  const dividerVerticalCode = `<div class="flex gap-4 h-64">
  <ContentCard title="Left Section" class="flex-1">
    <p>Content on the left</p>
  </ContentCard>

  <Divider orientation="vertical" />

  <ContentCard title="Right Section" class="flex-1">
    <p>Content on the right</p>
  </ContentCard>
</div>`;

  const dividerCardCode = `<ContentCard title="Product Features" aspectRatio="16/9">
  <div class="space-y-4">
    <div>
      <h4 class="font-semibold mb-2">Performance</h4>
      <p>Lightning-fast processing with optimized algorithms</p>
    </div>

    <Divider>Security</Divider>

    <div>
      <p>Enterprise-grade encryption and compliance</p>
    </div>

    <Divider />

    <div>
      <h4 class="font-semibold mb-2">Scalability</h4>
      <p>Seamlessly handle growth from startup to enterprise</p>
    </div>
  </div>
</ContentCard>`;

  const colorVariantsCode = `<!-- Default divider uses border color -->
<Divider />

<!-- Primary variant for main sections -->
<Divider variant="primary">Main Section</Divider>

<!-- Secondary variant for sub-sections -->
<Divider variant="secondary">Sub-Section</Divider>

<!-- Accent variant for highlights -->
<Divider variant="accent">Highlight</Divider>`;
</script>

<svelte:head>
  <title>Divider - SlideyUI Components</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Divider</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      A presentation-optimized divider component for separating content sections, both horizontally and vertically, with optional text labels.
    </p>
  </header>

  <!-- Installation -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Installation</h2>
    <p class="text-lg text-base-content/70 mb-4">
      The Divider component is included in both <code class="bg-base-200 px-2 py-1 rounded">@slideyui/react</code> and <code class="bg-base-200 px-2 py-1 rounded">@slideyui/svelte</code> packages.
    </p>

    <div class="tabs tabs-boxed w-fit mb-4">
      <button class="tab tab-active">Svelte</button>
      <button class="tab">React</button>
    </div>

    <CodeBlock code={`import { Divider } from '@slideyui/svelte';`} lang="typescript" />
  </section>

  <!-- Basic Usage -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Basic Usage</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Dividers can be used with or without text content. When text is provided, it appears centered in the divider line.
    </p>

    <div class="bg-base-100 p-8 rounded-lg border border-base-300 mb-4">
      <div class="max-w-2xl mx-auto space-y-4">
        <p class="text-lg">Content before divider</p>
        <Divider />
        <p class="text-lg">Content after simple divider</p>
        <Divider>OR</Divider>
        <p class="text-lg">Content after divider with text</p>
      </div>
    </div>

    <CodeBlock code={basicUsageCode} lang="svelte" />
  </section>

  <!-- Horizontal Dividers -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Horizontal Dividers</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Horizontal dividers (default orientation) are perfect for separating content sections vertically in your presentations.
    </p>

    <div class="bg-base-100 p-8 rounded-lg border border-base-300 mb-4">
      <div class="max-w-2xl mx-auto">
        <ContentCard title="Section 1" aspectRatio="auto">
          <p class="text-lg">First section of your presentation</p>
        </ContentCard>

        <Divider />

        <ContentCard title="Section 2" aspectRatio="auto">
          <p class="text-lg">Second section after a simple divider</p>
        </ContentCard>

        <Divider>OR</Divider>

        <ContentCard title="Alternative Section" aspectRatio="auto">
          <p class="text-lg">Use text in dividers to add context</p>
        </ContentCard>

        <Divider variant="accent">Key Takeaway</Divider>

        <ContentCard title="Important Section" variant="featured" aspectRatio="auto">
          <p class="text-lg">Colored dividers draw attention to important sections</p>
        </ContentCard>
      </div>
    </div>

    <CodeBlock code={basicUsageCode} lang="svelte" />
  </section>

  <!-- Vertical Dividers -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Vertical Dividers</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Vertical dividers are ideal for side-by-side comparisons and split-screen layouts in presentations.
    </p>

    <div class="bg-base-100 p-8 rounded-lg border border-base-300 mb-4">
      <div class="flex gap-4 h-80">
        <ContentCard title="Left Section" class="flex-1" aspectRatio="auto">
          <p class="text-lg mb-4">Content on the left side</p>
          <ul class="space-y-2">
            <li>Feature A</li>
            <li>Feature B</li>
            <li>Feature C</li>
          </ul>
        </ContentCard>

        <Divider orientation="vertical" />

        <ContentCard title="Right Section" class="flex-1" aspectRatio="auto">
          <p class="text-lg mb-4">Content on the right side</p>
          <ul class="space-y-2">
            <li>Feature X</li>
            <li>Feature Y</li>
            <li>Feature Z</li>
          </ul>
        </ContentCard>
      </div>
    </div>

    <CodeBlock code={dividerVerticalCode} lang="svelte" />
  </section>

  <!-- Dividers within Cards -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Dividers within Cards</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Use dividers inside cards to organize content into logical sections without creating separate cards.
    </p>

    <div class="max-w-3xl mx-auto mb-4">
      <ContentCard title="Product Features" aspectRatio="16/9" variant="featured">
        <div class="text-lg space-y-4">
          <div>
            <h4 class="font-semibold mb-2">Performance</h4>
            <p>Lightning-fast processing with optimized algorithms</p>
          </div>

          <Divider>Security</Divider>

          <div>
            <p>Enterprise-grade encryption and compliance</p>
          </div>

          <Divider />

          <div>
            <h4 class="font-semibold mb-2">Scalability</h4>
            <p>Seamlessly handle growth from startup to enterprise</p>
          </div>
        </div>
      </ContentCard>
    </div>

    <CodeBlock code={dividerCardCode} lang="svelte" />
  </section>

  <!-- Color Variants -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Color Variants</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Use color variants to emphasize different types of content sections and maintain visual hierarchy.
    </p>

    <div class="bg-base-100 p-8 rounded-lg border border-base-300 mb-4">
      <div class="max-w-2xl mx-auto space-y-4">
        <p class="text-lg">Default divider uses border color</p>
        <Divider />

        <p class="text-lg">Primary variant for main sections</p>
        <Divider variant="primary">Main Section</Divider>

        <p class="text-lg">Secondary variant for sub-sections</p>
        <Divider variant="secondary">Sub-Section</Divider>

        <p class="text-lg">Accent variant for highlights</p>
        <Divider variant="accent">Highlight</Divider>
      </div>
    </div>

    <CodeBlock code={colorVariantsCode} lang="svelte" />
  </section>

  <!-- API Reference -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">API Reference</h2>

    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>Prop</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code class="text-sm">children</code></td>
            <td><code class="text-sm">ReactNode | string</code></td>
            <td><code class="text-sm">undefined</code></td>
            <td>Optional text content to display in the center of the divider</td>
          </tr>
          <tr>
            <td><code class="text-sm">orientation</code></td>
            <td><code class="text-sm">'horizontal' | 'vertical'</code></td>
            <td><code class="text-sm">'horizontal'</code></td>
            <td>Orientation of the divider</td>
          </tr>
          <tr>
            <td><code class="text-sm">variant</code></td>
            <td><code class="text-sm">'primary' | 'secondary' | 'accent'</code></td>
            <td><code class="text-sm">undefined</code></td>
            <td>Color variant of the divider</td>
          </tr>
          <tr>
            <td><code class="text-sm">className</code></td>
            <td><code class="text-sm">string</code></td>
            <td><code class="text-sm">undefined</code></td>
            <td>Additional CSS classes for customization</td>
          </tr>
        </tbody>
      </table>
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
            <li>Use dividers to separate logical sections within cards</li>
            <li>Add text to dividers to provide context between sections</li>
            <li>Use vertical dividers for side-by-side comparisons</li>
            <li>Use color variants to emphasize important sections</li>
            <li>Keep divider text concise (1-3 words)</li>
            <li>Ensure sufficient spacing around dividers</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Overuse dividers - they should clarify, not clutter</li>
            <li>Use vertical dividers without sufficient height</li>
            <li>Mix multiple divider color variants on the same slide</li>
            <li>Use long text labels that break the visual flow</li>
            <li>Stack dividers too close together</li>
            <li>Use dividers when separate cards would be clearer</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Framework Examples -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Framework Examples</h2>

    <div class="space-y-8">
      <div>
        <h3 class="text-2xl font-semibold mb-4">React</h3>
        <CodeBlock code={reactUsageCode} lang="tsx" />
      </div>

      <div>
        <h3 class="text-2xl font-semibold mb-4">Svelte</h3>
        <CodeBlock code={basicUsageCode} lang="svelte" />
      </div>
    </div>
  </section>

  <!-- Next Steps -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Related</h2>
    <div class="flex gap-4">
      <a href="/docs/components" class="btn btn-outline">
        All Components
      </a>
      <a href="/docs/cards" class="btn btn-outline">
        Cards
      </a>
      <a href="/docs/layouts" class="btn btn-outline">
        Layout Utilities
      </a>
    </div>
  </section>
</div>
