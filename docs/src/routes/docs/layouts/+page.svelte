<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import ComponentPreview from '$lib/components/ComponentPreview.svelte';

  const layouts = [
    {
      name: 'Title Slide',
      description: 'Opening slide with large heading and subtitle',
      code: `<div class="slide slide-title">
  <h1 class="slide-heading">Presentation Title</h1>
  <p class="slide-subtitle">Your Name | Date</p>
</div>`,
    },
    {
      name: 'Content Slide',
      description: 'Standard content slide with heading and body',
      code: `<div class="slide slide-content">
  <h2 class="slide-title">Slide Title</h2>
  <div class="slide-body">
    <ul>
      <li>First point</li>
      <li>Second point</li>
      <li>Third point</li>
    </ul>
  </div>
</div>`,
    },
    {
      name: 'Two Column',
      description: 'Split content into two equal columns',
      code: `<div class="slide slide-two-column">
  <h2 class="slide-title">Comparison</h2>
  <div class="slide-columns">
    <div class="slide-column">
      <h3>Column One</h3>
      <p>Content here</p>
    </div>
    <div class="slide-column">
      <h3>Column Two</h3>
      <p>Content here</p>
    </div>
  </div>
</div>`,
    },
    {
      name: 'Section Break',
      description: 'Transition slide between major sections',
      code: `<div class="slide slide-section">
  <h2 class="slide-heading">Section Title</h2>
  <p class="slide-subtitle">Brief description</p>
</div>`,
    },
  ];
</script>

<svelte:head>
  <title>Layouts - SlideyUI Documentation</title>
</svelte:head>

<h1>Slide Layouts</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Pre-built layout patterns for common slide types. Each layout is optimized for readability,
  visual hierarchy, and presentation flow.
</p>

<h2>Layout System</h2>

<p>
  SlideyUI layouts use a consistent class naming convention:
</p>

<ul>
  <li><code>.slide</code> - Base slide container (typically 16:9 aspect ratio)</li>
  <li><code>.slide-{`{type}`}</code> - Specific layout variant (title, content, section, etc.)</li>
  <li><code>.slide-{`{element}`}</code> - Semantic elements within slides (heading, body, columns)</li>
</ul>

<h2>Available Layouts</h2>

<div class="space-y-8 my-8">
  {#each layouts as layout}
    <div>
      <h3 class="text-2xl font-bold mb-2">{layout.name}</h3>
      <p class="text-base-content/70 mb-4">{layout.description}</p>

      <ComponentPreview code={layout.code}>
        <div class="slide-preview p-8">
          <div class="text-center">
            <div class="badge badge-primary mb-4">{layout.name} Preview</div>
            <p class="text-sm text-base-content/60">
              16:9 aspect ratio, optimized for projection
            </p>
          </div>
        </div>
      </ComponentPreview>
    </div>
  {/each}
</div>

<h2>Advanced Layouts</h2>

<p>More complex layouts for specialized content:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Three Column</h3>
      <p class="text-sm">Split content into three equal columns for comparisons or feature lists.</p>
      <code class="text-xs">.slide-three-column</code>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Image + Text</h3>
      <p class="text-sm">Large image on one side with text content on the other.</p>
      <code class="text-xs">.slide-image-text</code>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Quote</h3>
      <p class="text-sm">Full-screen quote or testimonial with attribution.</p>
      <code class="text-xs">.slide-quote</code>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Big Number</h3>
      <p class="text-sm">Highlight a key metric or statistic with large text.</p>
      <code class="text-xs">.slide-big-number</code>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Timeline</h3>
      <p class="text-sm">Display chronological events or roadmaps.</p>
      <code class="text-xs">.slide-timeline</code>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Before/After</h3>
      <p class="text-sm">Show transformation or comparison with side-by-side content.</p>
      <code class="text-xs">.slide-before-after</code>
    </div>
  </div>
</div>

<h2>Layout Guidelines</h2>

<div class="alert my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Best Practices</h4>
    <ul class="text-sm list-disc list-inside mt-2">
      <li>Use Title Slide for your opening</li>
      <li>Use Section Breaks between major topics</li>
      <li>Limit bullet points to 3-5 per slide</li>
      <li>Choose layouts that match your content structure</li>
    </ul>
  </div>
</div>

<h2>Responsive Layouts</h2>

<p>All layouts automatically adapt to different screen sizes:</p>

<CodeBlock
  code={`<!-- Responsive column layout -->
<div class="slide slide-two-column">
  <!-- On mobile: stacks vertically -->
  <!-- On desktop: side by side -->
  <div class="slide-columns">
    <div class="slide-column">Column 1</div>
    <div class="slide-column">Column 2</div>
  </div>
</div>`}
  lang="html"
/>

<h2>Custom Layouts</h2>

<p>Create your own layouts by combining SlideyUI utilities:</p>

<CodeBlock
  code={`<div class="slide">
  <div class="slide-header">
    <h2 class="slide-title">Custom Layout</h2>
  </div>
  <div class="slide-body grid grid-cols-2 gap-8">
    <div>Left content</div>
    <div>Right content</div>
  </div>
  <div class="slide-footer">
    Footer content
  </div>
</div>`}
  lang="html"
/>

<h2>Layout Utilities</h2>

<p>Helper classes for fine-tuning layouts:</p>

<div class="overflow-x-auto my-6">
  <table class="table">
    <thead>
      <tr>
        <th>Class</th>
        <th>Purpose</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.slide-center</code></td>
        <td>Center all content vertically and horizontally</td>
      </tr>
      <tr>
        <td><code>.slide-header</code></td>
        <td>Header area for title/branding</td>
      </tr>
      <tr>
        <td><code>.slide-body</code></td>
        <td>Main content area</td>
      </tr>
      <tr>
        <td><code>.slide-footer</code></td>
        <td>Footer for page numbers, logos, etc.</td>
      </tr>
      <tr>
        <td><code>.slide-columns</code></td>
        <td>Container for column layouts</td>
      </tr>
      <tr>
        <td><code>.slide-column</code></td>
        <td>Individual column within multi-column layout</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Next Steps</h2>

<div class="flex gap-4 my-8">
  <a href="/docs/typography" class="btn btn-primary">
    Typography System
  </a>
  <a href="/docs/components" class="btn btn-outline">
    View Components
  </a>
</div>
