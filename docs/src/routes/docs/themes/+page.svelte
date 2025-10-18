<script lang="ts">
  import ThemeShowcase from '$lib/components/ThemeShowcase.svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const themeUsage = `<div class="card theme-corporate">
  <h1>Corporate Theme</h1>
  <p>Professional and clean</p>
</div>`;

  const themes = [
    {
      name: 'Corporate',
      description: 'Professional and trustworthy. Perfect for business presentations, quarterly reviews, and stakeholder meetings.',
      colors: {
        primary: '#1e40af',
        secondary: '#64748b',
        accent: '#0891b2',
        neutral: '#334155',
        background: '#ffffff',
        text: '#0f172a',
      },
      fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
        code: 'Fira Code, monospace',
      },
    },
    {
      name: 'Pitch Deck',
      description: 'Bold and energetic. Designed for startup pitches, fundraising, and high-stakes presentations.',
      colors: {
        primary: '#7c3aed',
        secondary: '#ec4899',
        accent: '#f59e0b',
        neutral: '#1f2937',
        background: '#0f172a',
        text: '#f8fafc',
      },
      fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Inter, sans-serif',
        code: 'Fira Code, monospace',
      },
    },
    {
      name: 'Academic',
      description: 'Scholarly and authoritative. Ideal for research presentations, conference talks, and educational content.',
      colors: {
        primary: '#991b1b',
        secondary: '#92400e',
        accent: '#047857',
        neutral: '#44403c',
        background: '#fafaf9',
        text: '#1c1917',
      },
      fonts: {
        heading: 'Merriweather, serif',
        body: 'Source Sans Pro, sans-serif',
        code: 'Source Code Pro, monospace',
      },
    },
    {
      name: 'Workshop',
      description: 'Friendly and approachable. Great for training sessions, tutorials, and interactive workshops.',
      colors: {
        primary: '#059669',
        secondary: '#0284c7',
        accent: '#ea580c',
        neutral: '#404040',
        background: '#ffffff',
        text: '#171717',
      },
      fonts: {
        heading: 'Nunito, sans-serif',
        body: 'Open Sans, sans-serif',
        code: 'JetBrains Mono, monospace',
      },
    },
  ];
</script>

<svelte:head>
  <title>Themes - SlideyUI Documentation</title>
</svelte:head>

<h1>Presentation Themes</h1>

<p class="lead text-xl text-base-content/80 my-6">
  SlideyUI includes professionally designed themes optimized for different presentation contexts. Each theme provides a complete color palette, typography system, and component styling.
</p>

<h2>Using Themes</h2>

<p>Apply a theme to any card or section using the theme class:</p>

<CodeBlock code={themeUsage} lang="html" />

<div class="alert my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Mix and Match</h4>
    <p class="text-sm">You can use different themes for different sections of your presentation.</p>
  </div>
</div>

<h2>Available Themes</h2>

<div class="space-y-12 my-8">
  {#each themes as theme}
    <div>
      <ThemeShowcase
        themeName={theme.name}
        colors={theme.colors}
        fonts={theme.fonts}
      />
      <p class="mt-4 text-base-content/70">{theme.description}</p>
    </div>
  {/each}
</div>

<h2>Theme Features</h2>

<p>Every SlideyUI theme includes:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Color System</h3>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>Primary, secondary, and accent colors</li>
        <li>Semantic colors for success, warning, error</li>
        <li>WCAG AA contrast ratios</li>
        <li>Dark mode variants</li>
      </ul>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Typography</h3>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>Display, heading, and body type scales</li>
        <li>Optimized for projection and distance viewing</li>
        <li>Code-friendly monospace fonts</li>
        <li>Responsive sizing</li>
      </ul>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Components</h3>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>All components styled for theme</li>
        <li>Consistent spacing and sizing</li>
        <li>Interactive states (hover, focus, active)</li>
        <li>Print-friendly styling</li>
      </ul>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title">Customization</h3>
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>Override colors via CSS variables</li>
        <li>Extend with custom utilities</li>
        <li>Create brand-specific variants</li>
        <li>Programmatic theme generation</li>
      </ul>
    </div>
  </div>
</div>

<h2>Customizing Themes</h2>

<p>You can customize any theme or create your own by extending the Tailwind config:</p>

<CodeBlock
  code={`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-primary': '#your-color',
      }
    }
  },
  plugins: [
    require('slideyui')({
      themes: {
        custom: {
          primary: '#your-color',
          secondary: '#your-color',
          // ... more theme options
        }
      }
    })
  ]
}`}
  lang="javascript"
  filename="tailwind.config.js"
/>

<h2>Theme Selection Guide</h2>

<div class="overflow-x-auto my-8">
  <table class="table table-zebra">
    <thead>
      <tr>
        <th>Theme</th>
        <th>Best For</th>
        <th>Mood</th>
        <th>Audience</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="font-semibold">Corporate</td>
        <td>Business presentations, reports</td>
        <td>Professional, trustworthy</td>
        <td>Executives, stakeholders</td>
      </tr>
      <tr>
        <td class="font-semibold">Pitch Deck</td>
        <td>Startup pitches, fundraising</td>
        <td>Bold, energetic, ambitious</td>
        <td>Investors, partners</td>
      </tr>
      <tr>
        <td class="font-semibold">Academic</td>
        <td>Research talks, conferences</td>
        <td>Scholarly, authoritative</td>
        <td>Academics, researchers</td>
      </tr>
      <tr>
        <td class="font-semibold">Workshop</td>
        <td>Training, tutorials, demos</td>
        <td>Friendly, approachable</td>
        <td>Students, learners</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Switching Themes</h2>

<p>You can switch themes dynamically in your presentation:</p>

<CodeBlock
  code={`<!-- Different sections, different themes -->
<section class="theme-corporate">
  <div class="card">
    <h1>Q4 Financial Results</h1>
  </div>
</section>

<section class="theme-pitch">
  <div class="card">
    <h1>Our Vision for 2025</h1>
  </div>
</section>`}
  lang="html"
/>

<div class="alert alert-info my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <span>Themes cascade down. All child elements inherit the theme unless overridden.</span>
</div>

<h2>Next Steps</h2>

<div class="flex gap-4 my-8">
  <a href="/docs/layouts" class="btn btn-primary">
    Explore Layouts
  </a>
  <a href="/docs/typography" class="btn btn-outline">
    Typography System
  </a>
</div>
