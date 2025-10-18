<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const examples = [
    {
      title: 'Corporate Presentation',
      description: 'Professional business presentation with Q4 results',
      theme: 'corporate',
      slides: 12,
      code: `<section class="theme-corporate">
  <!-- Title Slide -->
  <div class="slide slide-title">
    <h1 class="slide-heading">Q4 2024 Results</h1>
    <p class="slide-subtitle">Financial Performance Review</p>
  </div>

  <!-- Content Slide -->
  <div class="slide slide-content">
    <h2 class="slide-title">Key Metrics</h2>
    <div class="stats shadow">
      <div class="stat">
        <div class="stat-title">Revenue</div>
        <div class="stat-value">$2.4M</div>
        <div class="stat-desc">↗︎ 340% growth</div>
      </div>
    </div>
  </div>
</section>`,
    },
    {
      title: 'Startup Pitch Deck',
      description: 'Bold pitch deck for Series A fundraising',
      theme: 'pitch',
      slides: 15,
      code: `<section class="theme-pitch">
  <!-- Title Slide -->
  <div class="slide slide-title">
    <h1 class="slide-heading">Revolutionizing Presentations</h1>
    <p class="slide-subtitle">Seed Round | $2M Ask</p>
  </div>

  <!-- Problem Slide -->
  <div class="slide slide-content">
    <h2 class="slide-title">The Problem</h2>
    <ul class="slide-list">
      <li>Traditional presentation tools are outdated</li>
      <li>Developers want code-based workflows</li>
      <li>No modern, web-first solutions</li>
    </ul>
  </div>

  <!-- Solution Slide -->
  <div class="slide slide-content">
    <h2 class="slide-title">Our Solution</h2>
    <p class="slide-body-lg">
      SlideyUI brings presentation design into the modern web era
    </p>
  </div>
</section>`,
    },
    {
      title: 'Academic Conference Talk',
      description: 'Research presentation with citations and data',
      theme: 'academic',
      slides: 20,
      code: `<section class="theme-academic">
  <!-- Title Slide -->
  <div class="slide slide-title">
    <h1 class="slide-heading">
      Machine Learning in Healthcare
    </h1>
    <p class="slide-subtitle">
      Dr. Jane Smith | University of Technology
    </p>
  </div>

  <!-- Content with Citation -->
  <div class="slide slide-content">
    <h2 class="slide-title">Literature Review</h2>
    <blockquote class="slide-quote">
      "AI models show 95% accuracy in diagnosis"
    </blockquote>
    <p class="slide-caption">— Smith et al., 2024</p>
  </div>
</section>`,
    },
    {
      title: 'Technical Workshop',
      description: 'Interactive coding workshop with live demos',
      theme: 'workshop',
      slides: 25,
      code: `<section class="theme-workshop">
  <!-- Title Slide -->
  <div class="slide slide-title">
    <h1 class="slide-heading">Intro to React Hooks</h1>
    <p class="slide-subtitle">Hands-on Workshop</p>
  </div>

  <!-- Code Example Slide -->
  <div class="slide slide-content">
    <h2 class="slide-title">useState Hook</h2>
    <pre class="mockup-code"><code>function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;button onClick={() => setCount(count + 1)}&gt;
      Count: {count}
    &lt;/button&gt;
  );
}</code></pre>
  </div>
</section>`,
    },
  ];

  const fullExample = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Presentation</title>
  <link rel="stylesheet" href="/slideyui.css">
</head>
<body>
  <div class="presentation theme-corporate">
    <div class="slide slide-title">
      <h1 class="slide-heading">Product Launch 2025</h1>
      <p class="slide-subtitle">Introducing Our Latest Innovation</p>
    </div>

    <div class="slide slide-section">
      <h2 class="slide-heading">The Journey</h2>
    </div>

    <div class="slide slide-two-column">
      <h2 class="slide-title">Market Opportunity</h2>
      <div class="slide-columns">
        <div class="slide-column">
          <h3>Current Market</h3>
          <ul>
            <li>Total market size</li>
            <li>Annual growth rate</li>
            <li>Current solutions</li>
          </ul>
        </div>
        <div class="slide-column">
          <h3>Our Position</h3>
          <ul>
            <li>Unique value proposition</li>
            <li>Competitive advantage</li>
            <li>Strategic partnerships</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="slide slide-content">
      <h2 class="slide-title">Traction</h2>
      <div class="stats shadow">
        <div class="stat">
          <div class="stat-title">Users</div>
          <div class="stat-value">10K+</div>
          <div class="stat-desc">Monthly active</div>
        </div>
      </div>
    </div>

    <div class="slide slide-title">
      <h1 class="slide-heading">Let's Build Together</h1>
      <p class="slide-subtitle">contact@company.com</p>
    </div>
  </div>

  <script src="/slideyui.js"><\/script>
</body>
</html>`;
</script>

<svelte:head>
  <title>Examples - SlideyUI Documentation</title>
</svelte:head>

<h1>Example Presentations</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Complete examples showing how to build different types of presentations with SlideyUI.
  Each example includes full source code you can copy and customize.
</p>

<div class="alert alert-info my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Live Demo Available</h4>
    <p class="text-sm">Check out our <a href="/demo" class="link link-primary font-semibold">interactive live demo</a> to see SlideyUI in action with full keyboard navigation!</p>
  </div>
</div>

<h2>Example Gallery</h2>

<div class="space-y-8 my-8">
  {#each examples as example}
    <div class="card bg-base-200 shadow-xl">
      <div class="card-body">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="card-title text-2xl">{example.title}</h3>
            <p class="text-base-content/70 mt-2">{example.description}</p>
          </div>
          <div class="badge badge-primary">{example.slides} slides</div>
        </div>

        <div class="divider">Code Excerpt</div>

        <CodeBlock code={example.code} lang="html" />

        <div class="card-actions justify-end mt-4">
          <a href="/demo" class="btn btn-primary btn-sm">
            View Live Demo
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  {/each}
</div>

<h2>Complete Presentation Template</h2>

<p>
  A full presentation template showing common slide patterns and best practices:
</p>

<CodeBlock code={fullExample} lang="html" filename="presentation.html" />

<h2>Example Use Cases</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Product Launch</h3>
      <ul class="space-y-2 text-sm">
        <li>Market opportunity overview</li>
        <li>Product demo with screenshots</li>
        <li>Customer testimonials</li>
        <li>Pricing and availability</li>
        <li>Call to action</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Sales Pitch</h3>
      <ul class="space-y-2 text-sm">
        <li>Problem identification</li>
        <li>Solution presentation</li>
        <li>ROI calculator</li>
        <li>Case studies</li>
        <li>Next steps</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Technical Tutorial</h3>
      <ul class="space-y-2 text-sm">
        <li>Concept introduction</li>
        <li>Step-by-step instructions</li>
        <li>Code examples with syntax highlighting</li>
        <li>Common pitfalls</li>
        <li>Further resources</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Data Analysis</h3>
      <ul class="space-y-2 text-sm">
        <li>Executive summary</li>
        <li>Key metrics dashboard</li>
        <li>Trend analysis charts</li>
        <li>Insights and recommendations</li>
        <li>Action items</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Team Update</h3>
      <ul class="space-y-2 text-sm">
        <li>Previous period recap</li>
        <li>Current priorities</li>
        <li>Roadmap preview</li>
        <li>Team highlights</li>
        <li>Q&A preparation</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Conference Talk</h3>
      <ul class="space-y-2 text-sm">
        <li>Speaker introduction</li>
        <li>Topic overview</li>
        <li>Deep dive sections</li>
        <li>Live demos</li>
        <li>Resources and contact info</li>
      </ul>
      <div class="card-actions justify-end">
        <button class="btn btn-sm btn-outline">View Template</button>
      </div>
    </div>
  </div>
</div>

<h2>Presentation Structure Guide</h2>

<div class="timeline my-8">
  <div class="timeline-item">
    <div class="timeline-start">Opening</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Title Slide</strong> - Grab attention, set expectations
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Context</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Problem/Background</strong> - Why this matters
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Content</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Main Content</strong> - Your key points (3-5 sections)
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Evidence</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Data/Examples</strong> - Support your claims
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-start">Closing</div>
    <div class="timeline-middle">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 text-primary"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" /></svg>
    </div>
    <div class="timeline-end timeline-box">
      <strong>Call to Action</strong> - What happens next?
    </div>
  </div>
</div>

<h2>Tips for Great Presentations</h2>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Keep it Simple</div>
  <div class="collapse-content">
    <p>One idea per slide. If a slide feels crowded, split it into two slides.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Use Visuals</div>
  <div class="collapse-content">
    <p>Images, charts, and diagrams communicate faster than text. Use them liberally.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Practice Timing</div>
  <div class="collapse-content">
    <p>Aim for 1-2 minutes per slide. A 20-minute presentation should have 10-20 slides.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 mb-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">Test Your Setup</div>
  <div class="collapse-content">
    <p>Always test on the actual equipment before presenting. Check resolution, colors, and animations.</p>
  </div>
</div>

<h2>Download Templates</h2>

<div class="flex flex-wrap gap-4 my-8">
  <button class="btn btn-primary">
    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
    All Templates (ZIP)
  </button>
  <button class="btn btn-outline">Starter Template</button>
  <button class="btn btn-outline">Pitch Deck Template</button>
  <button class="btn btn-outline">Workshop Template</button>
</div>

<div class="divider my-12"></div>

<div class="text-center">
  <h2 class="text-2xl font-bold mb-4">Ready to Create Your Presentation?</h2>
  <p class="mb-6">Start with a template or build from scratch</p>
  <div class="flex gap-4 justify-center">
    <a href="/docs/intro" class="btn btn-primary">Get Started</a>
    <a href="https://github.com/yourusername/slideyui/tree/main/examples" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
      Browse GitHub Examples
    </a>
  </div>
</div>
