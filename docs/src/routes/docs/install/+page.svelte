<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const installCmd = `npm install slideyui tailwindcss`;
  const configCode = `// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,svelte,vue}'
  ],
  plugins: [
    require('slideyui')
  ]
}`;

  const cssCode = `@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';`;

  const htmlCode = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Presentation</title>
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <div class="card slide-title theme-corporate">
    <h1 class="slide-heading">Hello SlideyUI</h1>
    <p class="slide-subtitle">Your first presentation slide</p>
  </div>
</body>
</html>`;

  const reactCode = `npm install @slideyui/react`;
  const reactUsage = `import { Slide, SlideHeading } from '@slideyui/react';

function App() {
  return (
    <Slide variant="title" theme="corporate">
      <SlideHeading>Hello SlideyUI</SlideHeading>
      <p className="slide-subtitle">Your first presentation slide</p>
    </Slide>
  );
}`;

  const viteCode = `npm create vite@latest my-presentation -- --template react
cd my-presentation
npm install
npm install slideyui tailwindcss @slideyui/react
npx tailwindcss init`;
</script>

<svelte:head>
  <title>Installation - SlideyUI Documentation</title>
</svelte:head>

<h1>Installation</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Get started with SlideyUI in your project. This guide covers installation for different setups and frameworks.
</p>

<div class="alert alert-success my-6">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>SlideyUI requires Node.js 16+ and Tailwind CSS 3+</span>
</div>

<h2>Quick Start</h2>

<p>The fastest way to get started is with npm:</p>

<h3>1. Install Dependencies</h3>

<CodeBlock code={installCmd} />

<h3>2. Configure Tailwind CSS</h3>

<p>Add SlideyUI to your Tailwind configuration:</p>

<CodeBlock code={configCode} lang="javascript" filename="tailwind.config.js" />

<div class="alert my-4">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Content Paths</h4>
    <p class="text-sm">Make sure your content paths include all files where you'll use SlideyUI classes.</p>
  </div>
</div>

<h3>3. Import Tailwind CSS</h3>

<p>Create or update your main CSS file:</p>

<CodeBlock code={cssCode} lang="css" filename="styles.css" />

<h3>4. Build Your First Slide</h3>

<CodeBlock code={htmlCode} lang="html" filename="index.html" />

<h2>Framework Integration</h2>

<p>SlideyUI works with any framework that supports Tailwind CSS. Here are guides for popular frameworks:</p>

<div class="tabs tabs-boxed my-6">
  <a class="tab tab-active">React</a>
  <a class="tab">Vue</a>
  <a class="tab">Svelte</a>
  <a class="tab">Next.js</a>
</div>

<h3>React</h3>

<p>For React projects, we recommend using the official React components package:</p>

<h4>Install React Components</h4>

<CodeBlock code={reactCode} />

<h4>Usage</h4>

<CodeBlock code={reactUsage} lang="jsx" filename="App.jsx" />

<p>The React components provide type-safe props and better developer experience with autocomplete.</p>

<h2>Starting from Scratch</h2>

<p>If you're starting a new project, here's a complete setup with Vite:</p>

<CodeBlock code={viteCode} />

<p>Then follow the configuration steps above to add SlideyUI to your Tailwind config.</p>

<h2>CDN Usage (Not Recommended)</h2>

<div class="alert alert-warning my-6">
  <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
  <div>
    <h4 class="font-bold">Limited Customization</h4>
    <p class="text-sm">CDN builds include all styles but don't support theme customization or tree-shaking.</p>
  </div>
</div>

<p>For quick prototypes only, you can use the CDN:</p>

<CodeBlock code={`<link href="https://cdn.jsdelivr.net/npm/slideyui@latest/dist/slideyui.min.css" rel="stylesheet">`} lang="html" />

<h2>Verify Installation</h2>

<p>To verify SlideyUI is working, create a simple slide:</p>

<div class="mockup-browser border border-base-300 my-6">
  <div class="mockup-browser-toolbar">
    <div class="input">http://localhost:3000</div>
  </div>
  <div class="flex justify-center px-4 py-16 bg-base-200">
    <div class="slide-preview w-full max-w-3xl p-12 text-center">
      <h1 class="text-5xl font-bold text-primary mb-4">It Works!</h1>
      <p class="text-2xl text-base-content/70">SlideyUI is successfully installed</p>
    </div>
  </div>
</div>

<h2>Troubleshooting</h2>

<div class="collapse collapse-arrow bg-base-200 my-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">
    Classes not applying
  </div>
  <div class="collapse-content">
    <p>Make sure your content paths in tailwind.config.js include all files using SlideyUI classes. Run your build process to regenerate the CSS.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 my-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">
    Import errors
  </div>
  <div class="collapse-content">
    <p>Ensure you've installed both 'slideyui' and 'tailwindcss'. Check your package.json to confirm both packages are listed.</p>
  </div>
</div>

<div class="collapse collapse-arrow bg-base-200 my-2">
  <input type="checkbox" />
  <div class="collapse-title text-lg font-medium">
    Styles look wrong
  </div>
  <div class="collapse-content">
    <p>Clear your build cache and restart your dev server. Some bundlers cache Tailwind output aggressively.</p>
  </div>
</div>

<h2>Next Steps</h2>

<p>Now that SlideyUI is installed, explore the features:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
  <a href="/docs/themes" class="card bg-base-200 hover:bg-base-300 transition-colors">
    <div class="card-body">
      <h3 class="card-title">Explore Themes</h3>
      <p>Choose from professional presentation themes</p>
    </div>
  </a>

  <a href="/docs/layouts" class="card bg-base-200 hover:bg-base-300 transition-colors">
    <div class="card-body">
      <h3 class="card-title">Slide Layouts</h3>
      <p>Pre-built layouts for common slide patterns</p>
    </div>
  </a>

  <a href="/docs/components" class="card bg-base-200 hover:bg-base-300 transition-colors">
    <div class="card-body">
      <h3 class="card-title">Components</h3>
      <p>Specialized presentation components</p>
    </div>
  </a>

  <a href="/docs/examples" class="card bg-base-200 hover:bg-base-300 transition-colors">
    <div class="card-body">
      <h3 class="card-title">View Examples</h3>
      <p>Complete example presentations</p>
    </div>
  </a>
</div>
