<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const features = [
    {
      title: 'Presentation Themes',
      description: 'Professional themes optimized for different presentation contexts - corporate meetings, pitch decks, academic talks, and more.',
      icon: '🎨',
    },
    {
      title: 'Smart Layouts',
      description: 'Pre-built slide layouts for common patterns: title slides, content slides, comparisons, timelines, and data visualizations.',
      icon: '📐',
    },
    {
      title: 'Optimized Typography',
      description: 'Large, readable fonts with proper spacing designed for viewing on projectors and large screens from a distance.',
      icon: '📝',
    },
    {
      title: 'Slide Utilities',
      description: 'Built-in animations, progress indicators, speaker notes, and slide numbering to enhance your presentation flow.',
      icon: '🎯',
    },
    {
      title: 'Specialized Components',
      description: 'Components designed for presentations: callouts, quotes, code blocks, polls, and interactive elements.',
      icon: '🧩',
    },
    {
      title: 'Export Ready',
      description: 'Generate presentation-ready outputs: PDF exports, PowerPoint compatibility, and high-quality images.',
      icon: '📦',
    },
  ];

  const installCode = `npm install slideyui tailwindcss`;

  const configCode = `// tailwind.config.js
module.exports = {
  plugins: [
    require('slideyui')
  ]
}`;

  const usageCode = `<div class="slide slide-title theme-corporate">
  <h1 class="slide-heading">Welcome to SlideyUI</h1>
  <p class="slide-subtitle">Build presentations with Tailwind CSS</p>
</div>`;
</script>

<svelte:head>
  <title>SlideyUI - Presentation-First Component Library</title>
  <meta name="description" content="A presentation-first component library built on Tailwind CSS. Create professional presentations with optimized themes, layouts, and components." />
</svelte:head>

<!-- Hero Section -->
<section class="hero min-h-[80vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
  <div class="hero-content text-center">
    <div class="max-w-4xl">
      <h1 class="text-5xl md:text-7xl font-bold mb-6">
        <span class="text-primary">Slidey</span><span>UI</span>
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-base-content/80">
        A presentation-first component library built on Tailwind CSS
      </p>
      <p class="text-lg mb-8 max-w-2xl mx-auto">
        Create professional presentations with themes, layouts, and components optimized for
        readability at distance, visual hierarchy, and presentation flow.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/docs/intro" class="btn btn-primary btn-lg">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg">
          Live Demo
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <a href="/docs/examples" class="btn btn-outline btn-lg">
          View Examples
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-20 px-4 bg-base-100">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-4xl font-bold text-center mb-4">Why SlideyUI?</h2>
    <p class="text-center text-lg text-base-content/70 mb-16 max-w-2xl mx-auto">
      Every component is designed specifically for presentations, not web pages. Focus on your
      content while we handle the design.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="card bg-base-200 shadow-lg hover:shadow-xl transition-shadow">
          <div class="card-body">
            <div class="text-4xl mb-4">{feature.icon}</div>
            <h3 class="card-title text-xl">{feature.title}</h3>
            <p class="text-base-content/70">{feature.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Quick Start Section -->
<section class="py-20 px-4 bg-base-200">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-4xl font-bold text-center mb-4">Quick Start</h2>
    <p class="text-center text-lg text-base-content/70 mb-12">
      Get up and running in minutes with npm and Tailwind CSS
    </p>

    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold mb-3">1. Install SlideyUI</h3>
        <CodeBlock code={installCode} />
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3">2. Configure Tailwind</h3>
        <CodeBlock code={configCode} lang="javascript" filename="tailwind.config.js" />
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3">3. Build Your First Slide</h3>
        <CodeBlock code={usageCode} lang="html" />
      </div>
    </div>

    <div class="text-center mt-12">
      <a href="/docs/install" class="btn btn-primary btn-lg">
        Read Full Installation Guide
      </a>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-20 px-4 bg-gradient-to-br from-primary to-secondary text-primary-content">
  <div class="max-w-4xl mx-auto text-center">
    <h2 class="text-4xl font-bold mb-6">Ready to Build Better Presentations?</h2>
    <p class="text-xl mb-8 opacity-90">
      Join developers and designers using SlideyUI to create professional presentations
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/docs/intro" class="btn btn-neutral btn-lg">
        Read Documentation
      </a>
      <a
        href="https://github.com/yourusername/slideyui"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-outline btn-lg text-primary-content border-primary-content hover:bg-primary-content hover:text-primary"
      >
        Star on GitHub
      </a>
    </div>
  </div>
</section>
