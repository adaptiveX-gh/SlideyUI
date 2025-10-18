<svelte:head>
  <title>Introduction - SlideyUI Documentation</title>
</svelte:head>

<h1>Introduction to SlideyUI</h1>

<div class="alert alert-info my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>SlideyUI is currently in active development. APIs may change before the 1.0 release.</span>
</div>

<h2>What is SlideyUI?</h2>

<p>
  SlideyUI is a presentation-first component library built on Tailwind CSS. Unlike traditional UI frameworks designed for web applications, SlideyUI reimagines every component for the unique constraints and opportunities of presentations.
</p>

<h2>Why SlideyUI?</h2>

<p>
  When creating presentations, you face different challenges than building web pages:
</p>

<ul>
  <li><strong>Readability at Distance:</strong> Your audience isn't 18 inches from the screen. They're across a conference room, in an auditorium, or viewing over video call. Every component prioritizes large, clear typography and high contrast.</li>
  <li><strong>Visual Hierarchy:</strong> Presentations need immediate clarity about what reads first, second, and third. SlideyUI components guide the viewer's eye through intentional layout and spacing.</li>
  <li><strong>Presentation Flow:</strong> Unlike scrolling web pages, presentations are discrete slides with transitions. SlideyUI includes utilities for animations, builds, and progressive disclosure.</li>
  <li><strong>Export Requirements:</strong> Your presentation needs to work in PDF, PowerPoint, printed handouts, and live demos. SlideyUI components are designed to export cleanly.</li>
</ul>

<h2>Core Philosophy</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title text-lg">Content First</h3>
      <p class="text-sm">Your message is what matters. SlideyUI provides beautiful defaults that never overshadow your content.</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title text-lg">Tailwind Native</h3>
      <p class="text-sm">Built as a Tailwind CSS plugin. Use utility classes you already know, extended with presentation-specific variants.</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title text-lg">Context Aware</h3>
      <p class="text-sm">Different presentations need different styles. Switch between corporate, academic, pitch, and workshop themes instantly.</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title text-lg">Framework Agnostic</h3>
      <p class="text-sm">The core is pure CSS. Use with React, Vue, Svelte, or plain HTML. Optional framework-specific components available.</p>
    </div>
  </div>
</div>

<h2>Who Should Use SlideyUI?</h2>

<p>SlideyUI is perfect for:</p>

<ul>
  <li><strong>Developers</strong> who want to build presentations in code instead of dragging boxes in PowerPoint</li>
  <li><strong>Technical Presenters</strong> who need to include live code examples or interactive demos</li>
  <li><strong>Design Systems Teams</strong> creating presentation templates for their organization</li>
  <li><strong>Content Creators</strong> who value version control, reusability, and programmatic generation</li>
  <li><strong>Educators</strong> building course materials that need to be both presentable and web-accessible</li>
</ul>

<h2>What You Get</h2>

<div class="stats stats-vertical lg:stats-horizontal shadow my-8 w-full">
  <div class="stat">
    <div class="stat-title">Themes</div>
    <div class="stat-value text-primary">8+</div>
    <div class="stat-desc">Professional presentation themes</div>
  </div>

  <div class="stat">
    <div class="stat-title">Layouts</div>
    <div class="stat-value text-secondary">20+</div>
    <div class="stat-desc">Pre-built slide layouts</div>
  </div>

  <div class="stat">
    <div class="stat-title">Components</div>
    <div class="stat-value text-accent">50+</div>
    <div class="stat-desc">Specialized components</div>
  </div>
</div>

<h2>Next Steps</h2>

<p>Ready to get started? Here's your path forward:</p>

<div class="steps steps-vertical lg:steps-horizontal my-8 w-full">
  <a href="/docs/install" class="step step-primary">Install SlideyUI</a>
  <a href="/docs/themes" class="step">Choose a Theme</a>
  <a href="/docs/layouts" class="step">Pick a Layout</a>
  <a href="/docs/components" class="step">Add Components</a>
  <a href="/docs/examples" class="step">View Examples</a>
</div>

<div class="my-8">
  <a href="/docs/install" class="btn btn-primary btn-lg">
    Continue to Installation
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </a>
</div>
