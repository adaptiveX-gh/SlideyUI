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
<section class="hero min-h-[90vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 relative overflow-hidden">
  <div class="absolute inset-0 bg-grid-pattern opacity-5"></div>
  <div class="hero-content text-center relative z-10">
    <div class="max-w-5xl">
      <div class="badge badge-primary badge-lg mb-6 animate-bounce">v1.0.0 - Now Available!</div>
      <h1 class="text-6xl md:text-8xl font-black mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        SlideyUI
      </h1>
      <p class="text-2xl md:text-3xl mb-6 font-semibold text-base-content">
        A presentation-first component library built on Tailwind CSS
      </p>
      <p class="text-lg md:text-xl mb-10 max-w-3xl mx-auto text-base-content/70 leading-relaxed">
        Create professional presentations with themes, layouts, and components optimized for
        readability at distance, visual hierarchy, and presentation flow. Like DaisyUI, but for slides.
      </p>

      <!-- Stats -->
      <div class="stats stats-vertical lg:stats-horizontal shadow-xl bg-base-100 mb-10">
        <div class="stat">
          <div class="stat-figure text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path></svg>
          </div>
          <div class="stat-title">Professional Themes</div>
          <div class="stat-value text-primary">5</div>
          <div class="stat-desc">Corporate to Startup</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div class="stat-title">Components</div>
          <div class="stat-value text-secondary">13+</div>
          <div class="stat-desc">Ready to use</div>
        </div>

        <div class="stat">
          <div class="stat-figure text-accent">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </div>
          <div class="stat-title">Min Font Size</div>
          <div class="stat-value text-accent">24px</div>
          <div class="stat-desc">Projection-optimized</div>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <a href="/docs/intro" class="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all">
          Get Started
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
        <a href="http://localhost:5175" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all">
          Live Demo
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <a href="/docs/examples" class="btn btn-outline btn-lg shadow-lg hover:shadow-xl transition-all">
          View Examples
        </a>
      </div>
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-20 px-4 bg-base-100">
  <div class="max-w-6xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-black mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Why SlideyUI?</h2>
      <p class="text-xl text-base-content/70 max-w-3xl mx-auto">
        Every component is designed specifically for presentations, not web pages. Focus on your
        content while we handle the design.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="card bg-gradient-to-br from-base-200 to-base-300 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-base-300">
          <div class="card-body items-center text-center">
            <div class="text-6xl mb-4 transform hover:scale-110 transition-transform">{feature.icon}</div>
            <h3 class="card-title text-2xl font-bold mb-3">{feature.title}</h3>
            <p class="text-base-content/70 leading-relaxed">{feature.description}</p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Quick Start Section -->
<section class="py-20 px-4 bg-base-200">
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-5xl font-black mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">Quick Start</h2>
      <p class="text-xl text-base-content/70">
        Get up and running in minutes with npm and Tailwind CSS
      </p>
    </div>

    <div class="space-y-8">
      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center gap-4 mb-4">
            <div class="badge badge-primary badge-lg">1</div>
            <h3 class="text-2xl font-bold">Install SlideyUI</h3>
          </div>
          <CodeBlock code={installCode} />
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center gap-4 mb-4">
            <div class="badge badge-secondary badge-lg">2</div>
            <h3 class="text-2xl font-bold">Configure Tailwind</h3>
          </div>
          <CodeBlock code={configCode} lang="javascript" filename="tailwind.config.js" />
        </div>
      </div>

      <div class="card bg-base-100 shadow-xl">
        <div class="card-body">
          <div class="flex items-center gap-4 mb-4">
            <div class="badge badge-accent badge-lg">3</div>
            <h3 class="text-2xl font-bold">Build Your First Slide</h3>
          </div>
          <CodeBlock code={usageCode} lang="html" />
        </div>
      </div>
    </div>

    <div class="text-center mt-12">
      <a href="/docs/install" class="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all">
        Read Full Installation Guide →
      </a>
    </div>
  </div>
</section>

<!-- CTA Section -->
<section class="py-24 px-4 bg-gradient-to-br from-primary via-secondary to-accent text-primary-content relative overflow-hidden">
  <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
  <div class="max-w-4xl mx-auto text-center relative z-10">
    <h2 class="text-5xl md:text-6xl font-black mb-6 drop-shadow-lg">Ready to Build Better Presentations?</h2>
    <p class="text-xl md:text-2xl mb-10 opacity-95 drop-shadow">
      Join developers and designers using SlideyUI to create professional presentations
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <a href="/docs/intro" class="btn btn-neutral btn-lg shadow-2xl hover:scale-105 transition-transform">
        📚 Read Documentation
      </a>
      <a
        href="https://github.com/adaptiveX-gh/SlideyUI"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-outline btn-lg text-primary-content border-2 border-primary-content hover:bg-primary-content hover:text-primary shadow-2xl hover:scale-105 transition-all"
      >
        ⭐ Star on GitHub
      </a>
    </div>

    <!-- Additional Info -->
    <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <div class="bg-base-100/10 backdrop-blur-sm rounded-lg p-6">
        <div class="text-3xl font-bold mb-2">100% Free</div>
        <div class="opacity-90">Open source & MIT licensed</div>
      </div>
      <div class="bg-base-100/10 backdrop-blur-sm rounded-lg p-6">
        <div class="text-3xl font-bold mb-2">Zero Config</div>
        <div class="opacity-90">Works out of the box</div>
      </div>
      <div class="bg-base-100/10 backdrop-blur-sm rounded-lg p-6">
        <div class="text-3xl font-bold mb-2">Full Control</div>
        <div class="opacity-90">Customize everything</div>
      </div>
    </div>
  </div>
</section>
