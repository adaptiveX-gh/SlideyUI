<script lang="ts">
  import { ContentCard, CardGrid } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';

  const fontSizesCode = `<ContentCard title="Typography Scale">
  <div class="space-y-2">
    <p class="text-xs">The quick brown fox... (text-xs)</p>
    <p class="text-sm">The quick brown fox... (text-sm)</p>
    <p class="text-base">The quick brown fox... (text-base)</p>
    <p class="text-lg">The quick brown fox... (text-lg)</p>
    <p class="text-xl">The quick brown fox... (text-xl)</p>
    <p class="text-2xl">The quick brown fox... (text-2xl)</p>
    <p class="text-3xl">The quick brown fox... (text-3xl)</p>
  </div>
</ContentCard>`;

  const fontWeightsCode = `<ContentCard title="Weight Variations">
  <div class="space-y-2">
    <p class="font-light">Light text (font-light)</p>
    <p class="font-normal">Normal text (font-normal)</p>
    <p class="font-medium">Medium text (font-medium)</p>
    <p class="font-semibold">Semibold text (font-semibold)</p>
    <p class="font-bold">Bold text (font-bold)</p>
    <p class="font-extrabold">Extra bold text (font-extrabold)</p>
  </div>
</ContentCard>`;

  const textColorsCode = `<ContentCard title="Color Utilities">
  <div class="space-y-2">
    <p class="text-gray-500">Gray text (text-gray-500)</p>
    <p class="text-blue-600">Blue text (text-blue-600)</p>
    <p class="text-green-600">Green text (text-green-600)</p>
    <p class="text-red-600">Red text (text-red-600)</p>
    <p class="text-purple-600">Purple text (text-purple-600)</p>
  </div>
</ContentCard>`;

  const gradientTextCode = `<h3 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Beautiful gradient text
</h3>
<h3 class="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
  Another gradient example
</h3>
<h3 class="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
  Multi-color gradient
</h3>`;

  const lineHeightsCode = `<ContentCard title="Leading Utilities">
  <div class="space-y-4">
    <p class="leading-tight">Leading tight: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p class="leading-normal">Leading normal: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p class="leading-relaxed">Leading relaxed: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <p class="leading-loose">Leading loose: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</ContentCard>`;

  const letterSpacingCode = `<ContentCard title="Tracking Utilities">
  <div class="space-y-2">
    <p class="tracking-tighter">Tighter tracking (tracking-tighter)</p>
    <p class="tracking-tight">Tight tracking (tracking-tight)</p>
    <p class="tracking-normal">Normal tracking (tracking-normal)</p>
    <p class="tracking-wide">Wide tracking (tracking-wide)</p>
    <p class="tracking-wider">Wider tracking (tracking-wider)</p>
    <p class="tracking-widest">Widest tracking (tracking-widest)</p>
  </div>
</ContentCard>`;

  const textAlignmentCode = `<div class="grid grid-cols-3 gap-4">
  <ContentCard title="Left Aligned">
    <p class="text-left">This text is aligned to the left side of the card.</p>
  </ContentCard>
  <ContentCard title="Center Aligned">
    <p class="text-center">This text is centered within the card.</p>
  </ContentCard>
  <ContentCard title="Right Aligned">
    <p class="text-right">This text is aligned to the right side of the card.</p>
  </ContentCard>
</div>`;

  const textTransformCode = `<ContentCard title="Transform Utilities">
  <div class="space-y-2">
    <p class="uppercase">Uppercase text (uppercase)</p>
    <p class="lowercase">LOWERCASE TEXT (lowercase)</p>
    <p class="capitalize">capitalize each word (capitalize)</p>
    <p class="normal-case">Normal Case Text (normal-case)</p>
  </div>
</ContentCard>`;

  const proseCode = `<ContentCard title="Prose Content" class="prose prose-lg max-w-none">
  <h1>Article Title</h1>
  <p class="lead">This is a lead paragraph with larger text.</p>
  <p>Regular paragraph text with proper spacing and line height. The prose plugin automatically styles all common HTML elements.</p>

  <h2>Subheading</h2>
  <p>More content here with <strong>bold text</strong> and <em>italic text</em>.</p>

  <ul>
    <li>Automatically styled lists</li>
    <li>With proper spacing</li>
    <li>And markers</li>
  </ul>

  <blockquote>
    A beautifully styled blockquote with proper indentation and styling.
  </blockquote>
</ContentCard>`;
</script>

<svelte:head>
  <title>Typography Utilities - SlideyUI Documentation</title>
</svelte:head>

<div class="container mx-auto px-6 py-12">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">Typography Utilities</h1>
    <p class="text-xl text-base-content/70 max-w-3xl">
      Use Tailwind's typography utilities to style text within SlideyUI cards. Create beautiful, readable presentations with complete control over fonts, sizes, colors, and more.
    </p>
  </header>

  <!-- Font Sizes -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Font Sizes</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Tailwind provides a comprehensive type scale. Remember: presentations need larger text than typical web content for distance viewing.
    </p>

    <ContentCard title="Typography Scale" class="mb-4">
      <div class="space-y-4">
        <div>
          <p class="text-xs">The quick brown fox jumps over the lazy dog</p>
          <code class="text-xs text-base-content/60">text-xs (12px)</code>
        </div>
        <div>
          <p class="text-sm">The quick brown fox jumps over the lazy dog</p>
          <code class="text-xs text-base-content/60">text-sm (14px)</code>
        </div>
        <div>
          <p class="text-base">The quick brown fox jumps over the lazy dog</p>
          <code class="text-xs text-base-content/60">text-base (16px)</code>
        </div>
        <div>
          <p class="text-lg">The quick brown fox jumps over the lazy dog</p>
          <code class="text-xs text-base-content/60">text-lg (18px)</code>
        </div>
        <div>
          <p class="text-xl">The quick brown fox jumps over the lazy dog</p>
          <code class="text-xs text-base-content/60">text-xl (20px)</code>
        </div>
        <div>
          <p class="text-2xl">The quick brown fox jumps over the lazy dog</p>
          <code class="text-xs text-base-content/60">text-2xl (24px)</code>
        </div>
        <div>
          <p class="text-3xl">The quick brown fox jumps</p>
          <code class="text-xs text-base-content/60">text-3xl (30px)</code>
        </div>
        <div>
          <p class="text-4xl">The quick brown fox</p>
          <code class="text-xs text-base-content/60">text-4xl (36px)</code>
        </div>
        <div>
          <p class="text-5xl">Quick brown fox</p>
          <code class="text-xs text-base-content/60">text-5xl (48px)</code>
        </div>
        <div>
          <p class="text-6xl">Big Text</p>
          <code class="text-xs text-base-content/60">text-6xl (60px)</code>
        </div>
      </div>
    </ContentCard>

    <div class="alert alert-warning my-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <div>
        <h4 class="font-bold">Presentation Best Practice</h4>
        <p class="text-sm">For presentation slides, use a minimum of <code class="bg-warning/20 px-1 py-0.5 rounded">text-lg</code> (18px) for body content and <code class="bg-warning/20 px-1 py-0.5 rounded">text-2xl</code> (24px) or larger for headings.</p>
      </div>
    </div>

    <CodeBlock code={fontSizesCode} lang="html" />
  </section>

  <!-- Font Weights -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Font Weights</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Control text weight from thin to black for proper hierarchy and emphasis.
    </p>

    <ContentCard title="Weight Variations" class="mb-4">
      <div class="space-y-3 text-xl">
        <p class="font-thin">The quick brown fox jumps over the lazy dog (font-thin)</p>
        <p class="font-extralight">The quick brown fox jumps over the lazy dog (font-extralight)</p>
        <p class="font-light">The quick brown fox jumps over the lazy dog (font-light)</p>
        <p class="font-normal">The quick brown fox jumps over the lazy dog (font-normal)</p>
        <p class="font-medium">The quick brown fox jumps over the lazy dog (font-medium)</p>
        <p class="font-semibold">The quick brown fox jumps over the lazy dog (font-semibold)</p>
        <p class="font-bold">The quick brown fox jumps over the lazy dog (font-bold)</p>
        <p class="font-extrabold">The quick brown fox jumps over the lazy dog (font-extrabold)</p>
        <p class="font-black">The quick brown fox jumps over the lazy dog (font-black)</p>
      </div>
    </ContentCard>

    <CodeBlock code={fontWeightsCode} lang="html" />
  </section>

  <!-- Text Colors & Gradients -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Text Colors</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Apply colors to text for emphasis and visual hierarchy.
    </p>

    <ContentCard title="Color Utilities" class="mb-8">
      <div class="space-y-3 text-2xl">
        <p class="text-gray-500">Gray text (text-gray-500)</p>
        <p class="text-blue-600">Blue text (text-blue-600)</p>
        <p class="text-green-600">Green text (text-green-600)</p>
        <p class="text-red-600">Red text (text-red-600)</p>
        <p class="text-purple-600">Purple text (text-purple-600)</p>
        <p class="text-amber-600">Amber text (text-amber-600)</p>
        <p class="text-cyan-600">Cyan text (text-cyan-600)</p>
        <p class="text-pink-600">Pink text (text-pink-600)</p>
      </div>
    </ContentCard>

    <CodeBlock code={textColorsCode} lang="html" />

    <h3 class="text-2xl font-semibold mb-4 mt-12">Gradient Text</h3>
    <p class="text-base-content/70 mb-4">Create stunning gradient text effects for slide titles.</p>

    <ContentCard title="Text Gradients" class="mb-4">
      <div class="space-y-6">
        <h3 class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Beautiful gradient text
        </h3>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Another gradient example
        </h3>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
          Multi-color gradient
        </h3>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Rainbow gradient effect
        </h3>
      </div>
    </ContentCard>

    <CodeBlock code={gradientTextCode} lang="html" />
  </section>

  <!-- Line Heights & Letter Spacing -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Line Heights & Letter Spacing</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Control vertical spacing and character spacing for optimal readability.
    </p>

    <h3 class="text-2xl font-semibold mb-4">Line Heights</h3>
    <p class="text-base-content/70 mb-4">Adjust line spacing with <code class="bg-base-200 px-2 py-1 rounded">leading-*</code> utilities.</p>

    <ContentCard title="Leading Utilities" class="mb-8">
      <div class="space-y-6">
        <div>
          <p class="text-sm font-mono text-base-content/60 mb-2">leading-tight</p>
          <p class="leading-tight text-lg">Leading tight: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
        <div>
          <p class="text-sm font-mono text-base-content/60 mb-2">leading-normal</p>
          <p class="leading-normal text-lg">Leading normal: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
        <div>
          <p class="text-sm font-mono text-base-content/60 mb-2">leading-relaxed</p>
          <p class="leading-relaxed text-lg">Leading relaxed: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
        <div>
          <p class="text-sm font-mono text-base-content/60 mb-2">leading-loose</p>
          <p class="leading-loose text-lg">Leading loose: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
        </div>
      </div>
    </ContentCard>

    <div class="mb-12">
      <CodeBlock code={lineHeightsCode} lang="html" />
    </div>

    <h3 class="text-2xl font-semibold mb-4">Letter Spacing</h3>
    <p class="text-base-content/70 mb-4">Adjust character spacing with <code class="bg-base-200 px-2 py-1 rounded">tracking-*</code> utilities.</p>

    <ContentCard title="Tracking Utilities" class="mb-4">
      <div class="space-y-3 text-xl">
        <p class="tracking-tighter">Tighter tracking (tracking-tighter)</p>
        <p class="tracking-tight">Tight tracking (tracking-tight)</p>
        <p class="tracking-normal">Normal tracking (tracking-normal)</p>
        <p class="tracking-wide">Wide tracking (tracking-wide)</p>
        <p class="tracking-wider">Wider tracking (tracking-wider)</p>
        <p class="tracking-widest">Widest tracking (tracking-widest)</p>
      </div>
    </ContentCard>

    <CodeBlock code={letterSpacingCode} lang="html" />
  </section>

  <!-- Text Alignment & Transform -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Text Alignment & Transform</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Control text alignment and casing for different presentation needs.
    </p>

    <h3 class="text-2xl font-semibold mb-4">Text Alignment</h3>

    <div class="grid grid-cols-3 gap-4 mb-8">
      <ContentCard title="Left Aligned">
        <p class="text-left text-lg">This text is aligned to the left side of the card. Perfect for body content and lists.</p>
      </ContentCard>
      <ContentCard title="Center Aligned">
        <p class="text-center text-lg">This text is centered within the card. Great for titles and quotes.</p>
      </ContentCard>
      <ContentCard title="Right Aligned">
        <p class="text-right text-lg">This text is aligned to the right side of the card. Good for attributions.</p>
      </ContentCard>
    </div>

    <div class="mb-12">
      <CodeBlock code={textAlignmentCode} lang="html" />
    </div>

    <h3 class="text-2xl font-semibold mb-4">Text Transform</h3>

    <h3 class="text-2xl font-semibold mb-4">Text Transform</h3>

    <ContentCard title="Transform Utilities" class="mb-4">
      <div class="space-y-3 text-xl">
        <p class="uppercase">Uppercase text (uppercase)</p>
        <p class="lowercase">LOWERCASE TEXT (lowercase)</p>
        <p class="capitalize">capitalize each word (capitalize)</p>
        <p class="normal-case">Normal Case Text (normal-case)</p>
      </div>
    </ContentCard>

    <CodeBlock code={textTransformCode} lang="html" />
  </section>

  <!-- Text Decoration & Style -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Text Decoration & Style</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Add underlines, strikethroughs, and other decorative styles.
    </p>

    <ContentCard title="Decoration Utilities">
      <div class="space-y-4 text-xl">
        <p class="underline">Underlined text (underline)</p>
        <p class="overline">Overline text (overline)</p>
        <p class="line-through">Strikethrough text (line-through)</p>
        <p class="no-underline text-blue-600">No underline despite being blue (no-underline)</p>
        <p class="italic">Italic text (italic)</p>
        <p class="not-italic">Not italic text (not-italic)</p>
      </div>
    </ContentCard>
  </section>

  <!-- Lists -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Lists</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Style lists with proper spacing and markers for presentation clarity.
    </p>

    <div class="grid grid-cols-2 gap-6">
      <ContentCard title="Bullet List">
        <ul class="space-y-3 text-lg list-disc list-inside">
          <li>First key point</li>
          <li>Second key point</li>
          <li>Third key point</li>
          <li>Fourth key point</li>
        </ul>
      </ContentCard>

      <ContentCard title="Numbered List">
        <ol class="space-y-3 text-lg list-decimal list-inside">
          <li>First step</li>
          <li>Second step</li>
          <li>Third step</li>
          <li>Fourth step</li>
        </ol>
      </ContentCard>

      <ContentCard title="Custom Bullet Style">
        <ul class="space-y-3 text-lg">
          <li class="flex items-start gap-2">
            <span class="text-primary text-2xl">✓</span>
            <span>Custom checkmark bullets</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary text-2xl">✓</span>
            <span>More visual emphasis</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-primary text-2xl">✓</span>
            <span>Great for feature lists</span>
          </li>
        </ul>
      </ContentCard>

      <ContentCard title="Icon Bullets">
        <ul class="space-y-3 text-lg">
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Lightning fast performance</span>
          </li>
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>100% reliable</span>
          </li>
          <li class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>Fully customizable</span>
          </li>
        </ul>
      </ContentCard>
    </div>
  </section>

  <!-- Prose (Tailwind Typography Plugin) -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Prose Styling</h2>
    <p class="text-lg text-base-content/70 mb-8">
      The <code class="bg-base-200 px-2 py-1 rounded">@tailwindcss/typography</code> plugin provides automatic styling for rich text content.
    </p>

    <ContentCard title="Prose Content Example" class="prose prose-lg max-w-none mb-4">
      <h1>Main Article Title</h1>
      <p class="lead">This is a lead paragraph with larger, emphasized text to draw attention to the opening of your content.</p>
      <p>Regular paragraph text with proper spacing and line height. The prose plugin automatically styles all common HTML elements with beautiful defaults optimized for readability.</p>

      <h2>Section Heading</h2>
      <p>More content here with <strong>bold text</strong>, <em>italic text</em>, and <a href="#links">links</a>.</p>

      <h3>Features</h3>
      <ul>
        <li>Automatically styled lists</li>
        <li>With proper spacing between items</li>
        <li>And appropriate markers</li>
      </ul>

      <blockquote>
        A beautifully styled blockquote with proper indentation, styling, and visual emphasis. Perfect for highlighting quotes or important callouts.
      </blockquote>

      <h3>Code Examples</h3>
      <p>Inline code like <code>const x = 5;</code> is automatically styled.</p>

      <pre><code>function greeting(name) {'{'}
  return 'Hello, ' + name + '!';
{'}'}</code></pre>
    </ContentCard>

    <CodeBlock code={proseCode} lang="html" />

    <div class="alert alert-info mt-6">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div>
        <h4 class="font-bold">Prose Sizes</h4>
        <p class="text-sm">Available sizes: <code class="bg-info/20 px-1 py-0.5 rounded">prose-sm</code>, <code class="bg-info/20 px-1 py-0.5 rounded">prose</code> (default), <code class="bg-info/20 px-1 py-0.5 rounded">prose-lg</code>, <code class="bg-info/20 px-1 py-0.5 rounded">prose-xl</code>, <code class="bg-info/20 px-1 py-0.5 rounded">prose-2xl</code></p>
      </div>
    </div>
  </section>

  <!-- Typography Best Practices -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Typography Best Practices</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="card bg-success/10 border border-success">
        <div class="card-body">
          <h3 class="card-title text-success">Do</h3>
          <ul class="space-y-2">
            <li>Use large, bold headings (text-3xl or larger)</li>
            <li>Keep sentences short and concise</li>
            <li>Use high contrast colors for readability</li>
            <li>Limit to 2-3 font weights per presentation</li>
            <li>Use consistent spacing throughout</li>
            <li>Test readability from a distance</li>
            <li>Use text-lg or larger for body content</li>
          </ul>
        </div>
      </div>

      <div class="card bg-error/10 border border-error">
        <div class="card-body">
          <h3 class="card-title text-error">Don't</h3>
          <ul class="space-y-2">
            <li>Use small font sizes (below text-base)</li>
            <li>Write long paragraphs of text</li>
            <li>Mix too many font families</li>
            <li>Use low contrast color combinations</li>
            <li>Rely on color alone to convey meaning</li>
            <li>Use all caps for long passages</li>
            <li>Cram too much text on one slide</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Combining Typography Utilities -->
  <section class="mb-16">
    <h2 class="text-3xl font-bold mb-6">Combining Utilities</h2>
    <p class="text-lg text-base-content/70 mb-8">
      Mix and match typography utilities to create expressive text styles.
    </p>

    <div class="grid grid-cols-2 gap-6">
      <ContentCard title="Presentation Title" variant="featured">
        <h2 class="text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
          Stunning Title
        </h2>
        <p class="text-xl text-center text-base-content/60 mt-4">
          With beautiful subtitle
        </p>
      </ContentCard>

      <ContentCard title="Emphasis Card">
        <div class="text-center">
          <p class="text-7xl font-black text-green-600">98%</p>
          <p class="text-2xl font-semibold mt-2 tracking-wide uppercase text-base-content/70">
            Success Rate
          </p>
        </div>
      </ContentCard>

      <ContentCard title="Quote Slide">
        <blockquote class="text-3xl italic text-center leading-relaxed text-base-content/80">
          "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <p class="text-right text-lg font-semibold mt-6 text-base-content/60">
          — Steve Jobs
        </p>
      </ContentCard>

      <ContentCard title="Feature Highlight">
        <div class="space-y-4">
          <h3 class="text-3xl font-bold tracking-tight">
            Key Features
          </h3>
          <ul class="space-y-3 text-xl">
            <li class="flex items-center gap-3">
              <span class="text-3xl">⚡</span>
              <span class="font-medium">Lightning fast</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-3xl">🎨</span>
              <span class="font-medium">Beautiful design</span>
            </li>
            <li class="flex items-center gap-3">
              <span class="text-3xl">🚀</span>
              <span class="font-medium">Easy to use</span>
            </li>
          </ul>
        </div>
      </ContentCard>
    </div>
  </section>

  <!-- Next Steps -->
  <section>
    <h2 class="text-3xl font-bold mb-6">Next Steps</h2>
    <div class="flex gap-4">
      <a href="/docs/layouts" class="btn btn-primary">
        Layout Utilities
      </a>
      <a href="/docs/cards" class="btn btn-outline">
        Explore Cards
      </a>
      <a href="/docs/themes" class="btn btn-outline">
        View Themes
      </a>
    </div>
  </section>
</div>
