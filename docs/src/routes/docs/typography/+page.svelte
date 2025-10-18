<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Typography - SlideyUI Documentation</title>
</svelte:head>

<h1>Typography System</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Typography optimized for presentation viewing. Large, readable fonts with proper spacing
  designed for projectors, conference rooms, and distance viewing.
</p>

<h2>Type Scale</h2>

<p>
  SlideyUI uses a presentation-optimized type scale. Sizes are significantly larger than typical
  web typography because your audience is viewing from a distance.
</p>

<div class="space-y-6 my-8 p-6 bg-base-200 rounded-lg">
  <div>
    <div class="text-6xl font-bold mb-2">Display</div>
    <code class="text-sm">.slide-display | 4rem (64px)</code>
  </div>

  <div>
    <div class="text-5xl font-bold mb-2">Heading</div>
    <code class="text-sm">.slide-heading | 3rem (48px)</code>
  </div>

  <div>
    <div class="text-4xl font-bold mb-2">Title</div>
    <code class="text-sm">.slide-title | 2.25rem (36px)</code>
  </div>

  <div>
    <div class="text-2xl mb-2">Subtitle</div>
    <code class="text-sm">.slide-subtitle | 1.5rem (24px)</code>
  </div>

  <div>
    <div class="text-xl mb-2">Body Large</div>
    <code class="text-sm">.slide-body-lg | 1.25rem (20px)</code>
  </div>

  <div>
    <div class="text-lg mb-2">Body</div>
    <code class="text-sm">.slide-body | 1.125rem (18px)</code>
  </div>

  <div>
    <div class="text-base mb-2">Caption</div>
    <code class="text-sm">.slide-caption | 1rem (16px)</code>
  </div>
</div>

<h2>Font Families</h2>

<p>Each theme includes optimized font pairings:</p>

<div class="overflow-x-auto my-6">
  <table class="table">
    <thead>
      <tr>
        <th>Theme</th>
        <th>Headings</th>
        <th>Body</th>
        <th>Code</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Corporate</td>
        <td>Inter</td>
        <td>Inter</td>
        <td>Fira Code</td>
      </tr>
      <tr>
        <td>Pitch Deck</td>
        <td>Poppins</td>
        <td>Inter</td>
        <td>Fira Code</td>
      </tr>
      <tr>
        <td>Academic</td>
        <td>Merriweather</td>
        <td>Source Sans Pro</td>
        <td>Source Code Pro</td>
      </tr>
      <tr>
        <td>Workshop</td>
        <td>Nunito</td>
        <td>Open Sans</td>
        <td>JetBrains Mono</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Usage Examples</h2>

<h3>Slide Headings</h3>

<CodeBlock
  code={`<div class="slide">
  <h1 class="slide-heading">Main Slide Heading</h1>
  <p class="slide-subtitle">Supporting subtitle text</p>
</div>`}
  lang="html"
/>

<div class="slide-preview p-12 text-center my-6">
  <h1 class="text-5xl font-bold mb-4">Main Slide Heading</h1>
  <p class="text-2xl text-base-content/70">Supporting subtitle text</p>
</div>

<h3>Body Content</h3>

<CodeBlock
  code={`<div class="slide">
  <h2 class="slide-title">Section Title</h2>
  <div class="slide-body">
    <p class="slide-body-lg">
      Large body text for emphasis and readability.
    </p>
    <p class="slide-body">
      Standard body text for details and descriptions.
    </p>
  </div>
</div>`}
  lang="html"
/>

<h2>List Styles</h2>

<p>Lists are styled for presentation readability:</p>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title mb-4">Bullet List</h3>
      <ul class="space-y-3 text-lg">
        <li>First key point</li>
        <li>Second key point</li>
        <li>Third key point</li>
      </ul>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <h3 class="card-title mb-4">Numbered List</h3>
      <ol class="space-y-3 text-lg list-decimal list-inside">
        <li>First step</li>
        <li>Second step</li>
        <li>Third step</li>
      </ol>
    </div>
  </div>
</div>

<CodeBlock
  code={`<ul class="slide-list">
  <li>Increased spacing between items</li>
  <li>Larger text for distance viewing</li>
  <li>Clear visual hierarchy</li>
</ul>`}
  lang="html"
/>

<h2>Text Utilities</h2>

<p>Helper classes for common text treatments:</p>

<div class="overflow-x-auto my-6">
  <table class="table">
    <thead>
      <tr>
        <th>Class</th>
        <th>Purpose</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.text-emphasis</code></td>
        <td>Emphasize key words</td>
        <td><span class="font-bold text-primary">Important text</span></td>
      </tr>
      <tr>
        <td><code>.text-muted</code></td>
        <td>De-emphasize secondary text</td>
        <td><span class="text-base-content/60">Secondary text</span></td>
      </tr>
      <tr>
        <td><code>.text-quote</code></td>
        <td>Large quote text</td>
        <td><span class="text-3xl italic">"Quote text"</span></td>
      </tr>
      <tr>
        <td><code>.text-code</code></td>
        <td>Inline code</td>
        <td><code class="bg-base-300 px-2 py-1 rounded">const x = 5;</code></td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Alignment</h2>

<p>Text alignment classes optimized for slides:</p>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
  <div class="card bg-base-200">
    <div class="card-body text-left">
      <h4 class="card-title text-sm">Left Aligned</h4>
      <p class="text-sm"><code>.text-left</code></p>
      <p class="text-xs text-base-content/60 mt-2">Default for body content</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body text-center">
      <h4 class="card-title text-sm">Center Aligned</h4>
      <p class="text-sm"><code>.text-center</code></p>
      <p class="text-xs text-base-content/60 mt-2">For titles and quotes</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body text-right">
      <h4 class="card-title text-sm">Right Aligned</h4>
      <p class="text-sm"><code>.text-right</code></p>
      <p class="text-xs text-base-content/60 mt-2">For attributions</p>
    </div>
  </div>
</div>

<h2>Line Height</h2>

<p>
  SlideyUI uses relaxed line heights for better readability at distance. Line height
  automatically adjusts based on font size.
</p>

<div class="alert my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Readability Rule</h4>
    <p class="text-sm">Larger text = tighter line height. Smaller text = looser line height.</p>
  </div>
</div>

<h2>Code Blocks</h2>

<p>Syntax-highlighted code blocks optimized for presentations:</p>

<CodeBlock
  code={`function greeting(name) {
  return \`Hello, \${name}!\`;
}

console.log(greeting('SlideyUI'));`}
  lang="javascript"
  filename="example.js"
/>

<h2>Best Practices</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-success/10 border border-success">
    <div class="card-body">
      <h3 class="card-title text-success">Do</h3>
      <ul class="space-y-2 text-sm">
        <li>Use large, bold headings</li>
        <li>Keep sentences short</li>
        <li>Limit bullet points to 3-5 per slide</li>
        <li>Use high contrast colors</li>
        <li>Test readability from distance</li>
      </ul>
    </div>
  </div>

  <div class="card bg-error/10 border border-error">
    <div class="card-body">
      <h3 class="card-title text-error">Don't</h3>
      <ul class="space-y-2 text-sm">
        <li>Use small font sizes (&lt;18px)</li>
        <li>Write paragraphs of text</li>
        <li>Mix too many font families</li>
        <li>Use low contrast colors</li>
        <li>Rely on color alone for meaning</li>
      </ul>
    </div>
  </div>
</div>

<h2>Accessibility</h2>

<p>All typography classes meet WCAG AA standards:</p>

<ul>
  <li><strong>Contrast:</strong> Minimum 4.5:1 for body text, 3:1 for large text</li>
  <li><strong>Font Size:</strong> Minimum 18px for body content</li>
  <li><strong>Line Length:</strong> Maximum 80 characters for optimal reading</li>
  <li><strong>Spacing:</strong> Adequate spacing between lines and paragraphs</li>
</ul>

<h2>Next Steps</h2>

<div class="flex gap-4 my-8">
  <a href="/docs/components" class="btn btn-primary">
    Explore Components
  </a>
  <a href="/docs/utilities" class="btn btn-outline">
    View Utilities
  </a>
</div>
