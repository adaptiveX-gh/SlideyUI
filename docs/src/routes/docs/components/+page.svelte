<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import ComponentPreview from '$lib/components/ComponentPreview.svelte';
  import { CardGrid, ContentCard, DataCard, MediaCard } from '@slideyui/svelte';

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

  const contentCardCode = `import { ContentCard } from 'slideyui-react';

<ContentCard
  title="Welcome"
  subtitle="Getting started with cards"
  badge={<span className="badge badge-primary">New</span>}
  footer={<p>Learn more →</p>}
>
  <p className="slide-body">Card content goes here</p>
</ContentCard>`;

  const splitCardCode = `import { SplitCard } from 'slideyui-react';

<SplitCard
  title="Comparison"
  leftContent={
    <>
      <h3>Option A</h3>
      <ul><li>Feature 1</li><li>Feature 2</li></ul>
    </>
  }
  rightContent={
    <>
      <h3>Option B</h3>
      <ul><li>Feature 1</li><li>Feature 2</li></ul>
    </>
  }
/>`;

  const dataCardCode = `import { DataCard } from 'slideyui-react';

<DataCard title="Metrics">
  <div className="stats shadow">
    <div className="stat">
      <div className="stat-title">Revenue</div>
      <div className="stat-value">$2.4M</div>
    </div>
  </div>
</DataCard>`;

  const quoteCardCode = `import { QuoteCard } from 'slideyui-react';

<QuoteCard
  quote="Design is not just what it looks like. Design is how it works."
  author="Steve Jobs"
  title="On Design"
/>`;
</script>

<svelte:head>
  <title>Components - SlideyUI Documentation</title>
</svelte:head>

<h1>Component Library</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Card-based components designed for modern presentations. Every component works in both editing (CardGrid)
  and presentation (Presentation) modes, optimized for readability and visual impact.
</p>

<div class="alert alert-success my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">New Card Architecture</h4>
    <p class="text-sm">SlideyUI now focuses on flexible card components that adapt to both editing and presentation contexts.</p>
  </div>
</div>

<h2>Card Components (Primary)</h2>

<p class="my-4">
  Card components are the foundation of SlideyUI. They work seamlessly in both CardGrid (editing) and
  Presentation (full-screen) modes.
</p>

<h3 class="text-2xl font-bold mt-8 mb-4">ContentCard</h3>
<p>General-purpose card for text content with header, body, and footer sections.</p>

<div class="bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-lg my-6">
  <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
    <ContentCard
      title="Example Card"
      subtitle="With subtitle"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <div slot="badge">
        <span class="badge badge-primary">New</span>
      </div>
      <p class="text-xl">This is the card content area. Use it for lists, paragraphs, or any content.</p>
      <div slot="footer">
        <p class="text-sm">Footer content here →</p>
      </div>
    </ContentCard>

    <ContentCard
      title="Minimal Variant"
      aspectRatio="16/9"
      interactive={true}
      variant="minimal"
    >
      <p class="text-xl">Cards support different variants for different visual styles.</p>
    </ContentCard>
  </CardGrid>
</div>

<details class="collapse collapse-arrow bg-base-200 my-4">
  <summary class="collapse-title font-medium">View Code (React)</summary>
  <div class="collapse-content">
    <CodeBlock code={contentCardCode} lang="tsx" />
  </div>
</details>

<h3 class="text-2xl font-bold mt-8 mb-4">SplitCard</h3>
<p>Two-column card for comparisons, before/after, or side-by-side content.</p>
<CodeBlock code={splitCardCode} lang="tsx" />

<h3 class="text-2xl font-bold mt-8 mb-4">DataCard</h3>
<p>Optimized for displaying metrics, charts, and data visualizations.</p>

<div class="bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-lg my-6">
  <CardGrid columns={{ sm: 1, md: 3 }} gap="lg">
    <DataCard
      variant="metric"
      title="Revenue"
      value="$2.4M"
      label="Total Revenue"
      trend="up"
      trendValue="+24%"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    />

    <DataCard
      variant="metric"
      title="Users"
      value="12.4K"
      label="Active Users"
      trend="up"
      trendValue="+22%"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    />

    <DataCard
      variant="metric"
      title="Satisfaction"
      value="98%"
      label="Customer Rating"
      trend="neutral"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    />
  </CardGrid>
</div>

<details class="collapse collapse-arrow bg-base-200 my-4">
  <summary class="collapse-title font-medium">View Code (React)</summary>
  <div class="collapse-content">
    <CodeBlock code={dataCardCode} lang="tsx" />
  </div>
</details>

<h3 class="text-2xl font-bold mt-8 mb-4">QuoteCard</h3>
<p>Display testimonials, quotes, or featured text with proper attribution.</p>
<CodeBlock code={quoteCardCode} lang="tsx" />

<div class="divider my-12"></div>

<div class="alert alert-warning my-6">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <div>
    <h4 class="font-bold">Legacy Components Deprecated</h4>
    <p class="text-sm">The following components are deprecated: <strong>Deck, TitleSlide, ContentSlide, ComparisonSlide, DataSlide, SpeakerNotes</strong>. Use card components with Presentation wrapper instead.</p>
  </div>
</div>

<h2>Supporting Components</h2>

<p class="my-4">
  These components can be used inside card content or as standalone elements.
</p>

<h3 class="text-2xl font-bold mt-8 mb-4">Callouts</h3>

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

<h3 class="text-2xl font-bold mt-8 mb-4">MediaCard</h3>

<p>Display images, videos, or visual content with optional captions and overlays.</p>

<div class="bg-gradient-to-br from-base-100 to-base-200 p-8 rounded-lg my-6">
  <CardGrid columns={{ sm: 1, md: 3 }} gap="lg">
    <MediaCard
      title="Fast"
      caption="Lightning quick performance"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <div class="w-full h-48 bg-primary/20 flex items-center justify-center text-6xl">
        🚀
      </div>
    </MediaCard>

    <MediaCard
      title="Beautiful"
      caption="Stunning visual design"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <div class="w-full h-48 bg-secondary/20 flex items-center justify-center text-6xl">
        🎨
      </div>
    </MediaCard>

    <MediaCard
      title="Powerful"
      caption="Feature-rich capabilities"
      aspectRatio="16/9"
      interactive={true}
      bordered={true}
      shadow={true}
    >
      <div class="w-full h-48 bg-accent/20 flex items-center justify-center text-6xl">
        ⚡
      </div>
    </MediaCard>
  </CardGrid>
</div>

<p class="text-sm text-base-content/70 mt-4">
  💡 Hover over the cards to see interactive effects! MediaCard works with images, videos, or custom media elements.
</p>

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
