<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import ComponentPreview from '$lib/components/ComponentPreview.svelte';

  const calloutCode = `<div class="callout callout-info">
  <div class="callout-title">Key Insight</div>
  <p>Important information that needs emphasis</p>
</div>`;

  const quoteCode = `<blockquote class="slide-quote">
  <p>"Design is not just what it looks like. Design is how it works."</p>
  <footer>— Steve Jobs</footer>
</blockquote>`;

  const timelineCode = `<div class="timeline">
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h3>2020</h3>
      <p>Company founded</p>
    </div>
  </div>
  <div class="timeline-item">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <h3>2023</h3>
      <p>Series A funding</p>
    </div>
  </div>
</div>`;
</script>

<svelte:head>
  <title>Components - SlideyUI Documentation</title>
</svelte:head>

<h1>Component Library</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Specialized components designed for presentations. Every component is optimized for readability,
  visual impact, and presentation flow.
</p>

<h2>Callouts</h2>

<p>
  Highlight important information with visual callouts. Available in multiple variants for
  different message types.
</p>

<ComponentPreview title="Info Callout" code={calloutCode}>
  <div class="alert alert-info">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <div>
      <div class="font-bold">Key Insight</div>
      <div class="text-sm">Important information that needs emphasis</div>
    </div>
  </div>
</ComponentPreview>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="alert alert-success">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Success callout for positive outcomes</span>
  </div>

  <div class="alert alert-warning">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    <span>Warning for cautions or caveats</span>
  </div>

  <div class="alert alert-error">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <span>Error for problems to avoid</span>
  </div>

  <div class="alert">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>Neutral callout for general info</span>
  </div>
</div>

<h2>Quotes</h2>

<p>Display testimonials, customer feedback, or notable quotes.</p>

<ComponentPreview title="Quote Component" code={quoteCode}>
  <figure class="bg-base-200 p-8 rounded-lg border-l-4 border-primary">
    <blockquote class="text-2xl italic mb-4">
      "Design is not just what it looks like. Design is how it works."
    </blockquote>
    <figcaption class="text-base-content/70">— Steve Jobs</figcaption>
  </figure>
</ComponentPreview>

<h2>Stats & Metrics</h2>

<p>Highlight key numbers and statistics.</p>

<div class="stats shadow w-full my-6">
  <div class="stat">
    <div class="stat-figure text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
    <div class="stat-title">Revenue Growth</div>
    <div class="stat-value">340%</div>
    <div class="stat-desc">Year over year</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-secondary">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
    </div>
    <div class="stat-title">Active Users</div>
    <div class="stat-value">12.4K</div>
    <div class="stat-desc">Up 22% this month</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-accent">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
    </div>
    <div class="stat-title">Satisfaction</div>
    <div class="stat-value">98%</div>
    <div class="stat-desc">Customer rating</div>
  </div>
</div>

<CodeBlock
  code={`<div class="stats shadow">
  <div class="stat">
    <div class="stat-title">Metric Name</div>
    <div class="stat-value">31K</div>
    <div class="stat-desc">Description</div>
  </div>
</div>`}
  lang="html"
/>

<h2>Progress Indicators</h2>

<p>Show progress through presentations or multi-step processes.</p>

<div class="my-6">
  <progress class="progress progress-primary w-full mb-2" value="70" max="100"></progress>
  <progress class="progress progress-secondary w-full mb-2" value="40" max="100"></progress>
  <progress class="progress progress-accent w-full mb-2" value="90" max="100"></progress>
</div>

<h2>Badges & Tags</h2>

<p>Label content or indicate status.</p>

<div class="flex flex-wrap gap-2 my-6">
  <div class="badge badge-primary">Primary</div>
  <div class="badge badge-secondary">Secondary</div>
  <div class="badge badge-accent">Accent</div>
  <div class="badge badge-success">Success</div>
  <div class="badge badge-warning">Warning</div>
  <div class="badge badge-error">Error</div>
  <div class="badge badge-lg">Large Badge</div>
  <div class="badge badge-outline">Outline</div>
</div>

<h2>Cards</h2>

<p>Group related content in visual containers.</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
  <div class="card bg-base-200 shadow-xl">
    <figure class="px-10 pt-10">
      <div class="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl">
        🚀
      </div>
    </figure>
    <div class="card-body items-center text-center">
      <h3 class="card-title">Fast</h3>
      <p>Lightning quick performance</p>
    </div>
  </div>

  <div class="card bg-base-200 shadow-xl">
    <figure class="px-10 pt-10">
      <div class="w-24 h-24 rounded-full bg-secondary flex items-center justify-center text-4xl">
        🎨
      </div>
    </figure>
    <div class="card-body items-center text-center">
      <h3 class="card-title">Beautiful</h3>
      <p>Stunning visual design</p>
    </div>
  </div>

  <div class="card bg-base-200 shadow-xl">
    <figure class="px-10 pt-10">
      <div class="w-24 h-24 rounded-full bg-accent flex items-center justify-center text-4xl">
        ⚡
      </div>
    </figure>
    <div class="card-body items-center text-center">
      <h3 class="card-title">Powerful</h3>
      <p>Feature-rich capabilities</p>
    </div>
  </div>
</div>

<h2>Steps & Timelines</h2>

<p>Show sequential processes or chronological events.</p>

<ul class="steps steps-vertical lg:steps-horizontal w-full my-6">
  <li class="step step-primary">Register</li>
  <li class="step step-primary">Choose plan</li>
  <li class="step">Purchase</li>
  <li class="step">Receive Product</li>
</ul>

<h2>Comparison Tables</h2>

<p>Compare features, options, or data points.</p>

<div class="overflow-x-auto my-6">
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Feature</th>
        <th>Basic</th>
        <th>Pro</th>
        <th>Enterprise</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Users</td>
        <td>1</td>
        <td>10</td>
        <td>Unlimited</td>
      </tr>
      <tr>
        <td>Storage</td>
        <td>10 GB</td>
        <td>100 GB</td>
        <td>1 TB</td>
      </tr>
      <tr>
        <td>Support</td>
        <td>Email</td>
        <td>Priority</td>
        <td>24/7 Dedicated</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Code Blocks</h2>

<p>Display code examples with syntax highlighting.</p>

<CodeBlock
  code={`const presentation = new SlideyUI({
  theme: 'corporate',
  aspectRatio: '16:9'
});

presentation.addSlide({
  layout: 'title',
  content: {
    heading: 'Hello World',
    subtitle: 'Getting started with SlideyUI'
  }
});`}
  lang="javascript"
  filename="presentation.js"
/>

<h2>Next Steps</h2>

<div class="flex gap-4 my-8">
  <a href="/docs/utilities" class="btn btn-primary">
    Utility Classes
  </a>
  <a href="/docs/examples" class="btn btn-outline">
    View Examples
  </a>
</div>
