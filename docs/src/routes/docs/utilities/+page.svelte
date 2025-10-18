<script lang="ts">
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Utilities - SlideyUI Documentation</title>
</svelte:head>

<h1>Utility Classes</h1>

<p class="lead text-xl text-base-content/80 my-6">
  Presentation-specific utility classes that extend Tailwind CSS with functionality designed
  for slides, transitions, and interactive presentations.
</p>

<h2>Aspect Ratios</h2>

<p>
  Control slide aspect ratios for different display formats. SlideyUI defaults to 16:9 but
  supports multiple ratios.
</p>

<div class="overflow-x-auto my-6">
  <table class="table">
    <thead>
      <tr>
        <th>Class</th>
        <th>Ratio</th>
        <th>Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.aspect-16-9</code></td>
        <td>16:9</td>
        <td>Modern widescreen (default)</td>
      </tr>
      <tr>
        <td><code>.aspect-4-3</code></td>
        <td>4:3</td>
        <td>Classic projector format</td>
      </tr>
      <tr>
        <td><code>.aspect-square</code></td>
        <td>1:1</td>
        <td>Social media posts</td>
      </tr>
      <tr>
        <td><code>.aspect-story</code></td>
        <td>9:16</td>
        <td>Mobile/vertical video</td>
      </tr>
    </tbody>
  </table>
</div>

<CodeBlock
  code={`<div class="slide aspect-16-9">
  <!-- 16:9 widescreen slide -->
</div>

<div class="slide aspect-4-3">
  <!-- 4:3 traditional slide -->
</div>`}
  lang="html"
/>

<h2>Animations</h2>

<p>Entrance and exit animations for slide elements.</p>

<h3>Entrance Animations</h3>

<div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
  <div class="card bg-base-200">
    <div class="card-body">
      <code class="mb-2">.animate-fade-in</code>
      <p class="text-sm">Fade in smoothly</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <code class="mb-2">.animate-slide-up</code>
      <p class="text-sm">Slide in from bottom</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <code class="mb-2">.animate-slide-right</code>
      <p class="text-sm">Slide in from left</p>
    </div>
  </div>

  <div class="card bg-base-200">
    <div class="card-body">
      <code class="mb-2">.animate-zoom-in</code>
      <p class="text-sm">Zoom in from center</p>
    </div>
  </div>
</div>

<CodeBlock
  code={`<div class="slide">
  <h1 class="animate-fade-in">Title appears smoothly</h1>
  <p class="animate-slide-up animation-delay-1">
    Content appears after title
  </p>
</div>`}
  lang="html"
/>

<h3>Animation Delays</h3>

<p>Control the timing of animations for sequential reveals:</p>

<div class="overflow-x-auto my-6">
  <table class="table">
    <thead>
      <tr>
        <th>Class</th>
        <th>Delay</th>
      </tr>
    </thead>
    <tbody>
      <tr><td><code>.animation-delay-1</code></td><td>0.2s</td></tr>
      <tr><td><code>.animation-delay-2</code></td><td>0.4s</td></tr>
      <tr><td><code>.animation-delay-3</code></td><td>0.6s</td></tr>
      <tr><td><code>.animation-delay-4</code></td><td>0.8s</td></tr>
      <tr><td><code>.animation-delay-5</code></td><td>1.0s</td></tr>
    </tbody>
  </table>
</div>

<h2>Speaker Notes</h2>

<p>Add presenter notes that don't appear in the main presentation:</p>

<CodeBlock
  code={`<div class="slide">
  <h1>Slide Content</h1>

  <aside class="speaker-notes">
    Remember to mention the Q4 results here.
    Emphasize the 30% growth metric.
  </aside>
</div>`}
  lang="html"
/>

<div class="alert my-6">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  <div>
    <h4 class="font-bold">Presenter View</h4>
    <p class="text-sm">Speaker notes are hidden by default but can be displayed in presenter mode.</p>
  </div>
</div>

<h2>Slide Numbers</h2>

<p>Automatically number slides for easy reference:</p>

<CodeBlock
  code={`<div class="slide">
  <div class="slide-number">1</div>
  <!-- Slide content -->
</div>`}
  lang="html"
/>

<h2>Progress Indicators</h2>

<p>Show presentation progress to your audience:</p>

<CodeBlock
  code={`<!-- Top progress bar -->
<div class="slide-progress" style="width: 45%"></div>

<!-- Dot indicators -->
<div class="slide-dots">
  <span class="dot active"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>`}
  lang="html"
/>

<h2>Print Utilities</h2>

<p>Control appearance when printing or exporting to PDF:</p>

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
        <td><code>.print-only</code></td>
        <td>Only visible when printing</td>
      </tr>
      <tr>
        <td><code>.screen-only</code></td>
        <td>Hidden when printing</td>
      </tr>
      <tr>
        <td><code>.page-break-after</code></td>
        <td>Force page break after element</td>
      </tr>
      <tr>
        <td><code>.no-page-break</code></td>
        <td>Prevent page break within element</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Visibility Controls</h2>

<p>Show or hide elements based on presentation state:</p>

<CodeBlock
  code={`<!-- Hidden until revealed -->
<div class="hidden reveal-on-click">
  Content appears on click
</div>

<!-- Fade out after showing -->
<div class="fade-out-after">
  Temporary content
</div>`}
  lang="html"
/>

<h2>Spacing Utilities</h2>

<p>Presentation-optimized spacing for better visual hierarchy:</p>

<div class="overflow-x-auto my-6">
  <table class="table">
    <thead>
      <tr>
        <th>Class</th>
        <th>Size</th>
        <th>Use Case</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>.slide-gap-sm</code></td>
        <td>1rem</td>
        <td>Tight spacing between related items</td>
      </tr>
      <tr>
        <td><code>.slide-gap</code></td>
        <td>2rem</td>
        <td>Default spacing (recommended)</td>
      </tr>
      <tr>
        <td><code>.slide-gap-lg</code></td>
        <td>4rem</td>
        <td>Section breaks, emphasis</td>
      </tr>
      <tr>
        <td><code>.slide-gap-xl</code></td>
        <td>6rem</td>
        <td>Major section dividers</td>
      </tr>
    </tbody>
  </table>
</div>

<h2>Emphasis Utilities</h2>

<p>Draw attention to important content:</p>

<div class="space-y-4 my-6">
  <div class="p-4 bg-base-200 rounded-lg">
    <code class="mb-2">.highlight</code>
    <p class="text-sm mt-2">
      This is <span class="bg-warning text-warning-content px-2 rounded">highlighted text</span> for emphasis
    </p>
  </div>

  <div class="p-4 bg-base-200 rounded-lg">
    <code class="mb-2">.pulse</code>
    <p class="text-sm mt-2">
      <span class="animate-pulse text-primary font-bold">Pulsing attention grabber</span>
    </p>
  </div>

  <div class="p-4 bg-base-200 rounded-lg">
    <code class="mb-2">.spotlight</code>
    <p class="text-sm mt-2">
      <span class="bg-primary text-primary-content px-4 py-2 rounded-lg shadow-lg">Spotlighted content</span>
    </p>
  </div>
</div>

<h2>Alignment Helpers</h2>

<p>Precise positioning for slide elements:</p>

<div class="grid grid-cols-3 gap-4 my-6">
  <div class="card bg-base-200 h-32 flex items-start justify-center p-4">
    <code class="text-xs">.align-top</code>
  </div>
  <div class="card bg-base-200 h-32 flex items-center justify-center p-4">
    <code class="text-xs">.align-center</code>
  </div>
  <div class="card bg-base-200 h-32 flex items-end justify-center p-4">
    <code class="text-xs">.align-bottom</code>
  </div>
</div>

<h2>Background Utilities</h2>

<p>Special background treatments for slides:</p>

<div class="space-y-4 my-6">
  <div class="p-8 bg-gradient-to-r from-primary to-secondary text-primary-content rounded-lg">
    <code>.bg-gradient</code> - Gradient backgrounds
  </div>

  <div class="p-8 bg-base-200 bg-opacity-50 backdrop-blur rounded-lg">
    <code>.bg-blur</code> - Blurred backgrounds
  </div>

  <div class="p-8 bg-base-100 shadow-2xl rounded-lg">
    <code>.bg-elevated</code> - Elevated card effect
  </div>
</div>

<h2>Interactive Utilities</h2>

<p>For interactive presentations and live demos:</p>

<CodeBlock
  code={`<!-- Clickable areas -->
<div class="interactive-zone" onclick="nextSlide()">
  Click anywhere to advance
</div>

<!-- Hover effects -->
<div class="hover-highlight">
  Highlights on mouse over
</div>

<!-- Focus states for accessibility -->
<button class="focus-ring">
  Accessible button
</button>`}
  lang="html"
/>

<h2>Best Practices</h2>

<div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
  <div class="card bg-success/10 border border-success">
    <div class="card-body">
      <h3 class="card-title text-success">Do</h3>
      <ul class="space-y-2 text-sm">
        <li>Use animations sparingly</li>
        <li>Test print output before presenting</li>
        <li>Include speaker notes for complex slides</li>
        <li>Use consistent spacing throughout</li>
        <li>Test interactive elements</li>
      </ul>
    </div>
  </div>

  <div class="card bg-error/10 border border-error">
    <div class="card-body">
      <h3 class="card-title text-error">Don't</h3>
      <ul class="space-y-2 text-sm">
        <li>Overuse animations (distracting)</li>
        <li>Forget to test in presenter mode</li>
        <li>Mix aspect ratios in one deck</li>
        <li>Rely only on color for emphasis</li>
        <li>Use auto-play without testing</li>
      </ul>
    </div>
  </div>
</div>

<h2>Next Steps</h2>

<div class="flex gap-4 my-8">
  <a href="/docs/examples" class="btn btn-primary">
    View Examples
  </a>
  <a href="/docs/intro" class="btn btn-outline">
    Back to Introduction
  </a>
</div>
