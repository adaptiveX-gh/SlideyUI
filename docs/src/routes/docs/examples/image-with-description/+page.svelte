<script lang="ts">
  import { CardContainer } from '@slideyui/svelte';
</script>

<div class="prose max-w-none">
  <h1>Image With Description</h1>
  <p>
    This layout demonstrates a clean two-column presentation pattern with a prominent image on the
    left and descriptive text content on the right. This pattern is ideal for introducing topics,
    setting context, or combining visual storytelling with explanatory content.
  </p>

  <h2>Live Demo</h2>
  <p>
    The slide below showcases how to combine impactful imagery with narrative text. The left side
    features a full-height image that draws attention, while the right side provides a title and
    detailed description in a readable, professional format.
  </p>

  <div class="not-prose mb-12">
    <CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full">
        <!-- Left Column: Image (40% width = 2 cols) -->
        <div class="lg:col-span-2 h-full">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=900&fit=crop"
            alt="Desert highway leading through red rock mountains"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Right Column: Title and Description (60% width = 3 cols) -->
        <div class="lg:col-span-3 flex flex-col justify-center p-8 lg:p-16 bg-base-100">
          <h2
            class="font-bold leading-tight text-primary mb-6 lg:mb-8"
            style="font-size: clamp(2rem, 4vw, 3.5rem);"
          >
            Image With Description
          </h2>
          <p
            class="text-base-content leading-relaxed"
            style="font-size: clamp(1rem, 1.5vw, 1.25rem); line-height: 1.8;"
          >
            In the presentation session, the background/introduction can be filled with information
            that is arranged systematically and effectively with respect to an interesting topic to
            be used as material for discussion at the opening of the presentation session. The
            introduction can provide a general overview for those who are listening to your
            presentation so that the key words on the topic of discussion are emphasized during this
            background/introductory presentation session.
          </p>
        </div>
      </div>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li><strong>Full-Height Image:</strong> Image fills entire left column for visual impact</li>
    <li><strong>40/60 Split:</strong> Asymmetric layout (2:3 grid ratio) creates visual interest</li>
    <li>
      <strong>Auto-Scaling Typography:</strong> Title and body text use fluid clamp() for responsive
      sizing
    </li>
    <li><strong>Theme-Aware:</strong> Uses base-100 background and base-content text colors</li>
    <li><strong>Responsive Layout:</strong> Stacks vertically on mobile, side-by-side on desktop</li>
    <li>
      <strong>Generous Padding:</strong> Ample whitespace (p-8 lg:p-16) ensures readability
    </li>
    <li><strong>Primary Color Accent:</strong> Title uses theme's primary color for emphasis</li>
  </ul>

  <h2>Use Cases</h2>
  <p>This layout pattern works exceptionally well for:</p>
  <ul>
    <li><strong>Presentation Openings:</strong> Set the tone with compelling imagery</li>
    <li><strong>Chapter Introductions:</strong> Visual transition between sections</li>
    <li><strong>Background Context:</strong> Explain the "why" behind your topic</li>
    <li><strong>Product Showcases:</strong> Feature product photos with descriptions</li>
    <li><strong>Location-Based Content:</strong> Show place imagery with travel or venue details</li>
    <li><strong>About/Team Slides:</strong> Personal photos with bio information</li>
  </ul>

  <h2>Code Example (Svelte)</h2>
  <pre><code>{`<`}{`script lang="ts">`}{`
  import { CardContainer } from '@slideyui/svelte';
`}{`</script>`}{`

<CardContainer aspectRatio="16/9" bordered={true} autoScale={true}>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full">
    <!-- Left: Image (40% = 2 cols out of 5) -->
    <div class="lg:col-span-2 h-full">
      <img
        src="/your-image.jpg"
        alt="Descriptive alt text"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Right: Text (60% = 3 cols out of 5) -->
    <div class="lg:col-span-3 flex flex-col justify-center
                p-8 lg:p-16 bg-base-100">
      <h2 class="font-bold leading-tight text-primary mb-8"
          style="font-size: clamp(2rem, 4vw, 3.5rem);">
        Image With Description
      </h2>
      <p class="text-base-content leading-relaxed"
         style="font-size: clamp(1rem, 1.5vw, 1.25rem);
                line-height: 1.8;">
        Your descriptive text content goes here. This will scale
        responsively while maintaining readability.
      </p>
    </div>
  </div>
</CardContainer>`}</code></pre>

  <h2>React Implementation</h2>
  <pre><code>{`import { CardContainer } from '@slideyui/react';

export default function ImageWithDescription() {
  return (
    <CardContainer aspectRatio="16/9" bordered autoScale>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 h-full">
        {/* Left: Image (40% = 2 cols) */}
        <div className="lg:col-span-2 h-full">
          <img
            src="/your-image.jpg"
            alt="Descriptive alt text"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right: Text (60% = 3 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-center
                        p-8 lg:p-16 bg-base-100">
          <h2 className="font-bold leading-tight text-primary mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Image With Description
          </h2>
          <p className="text-base-content leading-relaxed"
             style={{
               fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
               lineHeight: '1.8'
             }}>
            Your descriptive text content goes here.
          </p>
        </div>
      </div>
    </CardContainer>
  );
}`}</code></pre>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Adjust image ratio:</strong> Change <code>lg:col-span-2</code> and <code
        >lg:col-span-3</code
      > to modify the split (e.g., 50/50 would be col-span-2.5 each, or use grid-cols-2)
    </li>
    <li>
      <strong>Image position:</strong> Swap the column order to put image on the right instead
    </li>
    <li>
      <strong>Font sizes:</strong> Adjust the <code>clamp()</code> min/max values for different text
      scales
    </li>
    <li>
      <strong>Padding:</strong> Modify <code>p-8 lg:p-16</code> to control whitespace density
    </li>
    <li>
      <strong>Image fit:</strong> Use <code>object-contain</code> instead of <code
        >object-cover</code
      > to show full image without cropping
    </li>
    <li>
      <strong>Background:</strong> Add gradient or pattern to text column: <code
        >bg-gradient-to-r from-base-100 to-base-200</code
      >
    </li>
  </ul>

  <h2>Typography Scaling</h2>
  <p>The layout uses fluid typography that auto-scales:</p>
  <ul>
    <li>
      <strong>Title:</strong> <code>clamp(2rem, 4vw, 3.5rem)</code> = 32px to 56px range
    </li>
    <li>
      <strong>Body:</strong> <code>clamp(1rem, 1.5vw, 1.25rem)</code> = 16px to 20px range
    </li>
    <li><strong>Line height:</strong> 1.8 for optimal readability of paragraph text</li>
  </ul>
  <p>
    Combined with <code>autoScale={true}</code> on the CardContainer, text smoothly resizes based on
    both viewport width and container scaling transforms.
  </p>

  <h2>Image Recommendations</h2>
  <ul>
    <li><strong>Aspect Ratio:</strong> Vertical or square images work best (3:4 or 1:1)</li>
    <li>
      <strong>Resolution:</strong> Minimum 800x900px for quality on large displays
    </li>
    <li><strong>Format:</strong> WebP for best quality/size ratio, fallback to JPEG</li>
    <li>
      <strong>Focal Point:</strong> Ensure important content is centered (will crop top/bottom on
      some screens)
    </li>
    <li><strong>Contrast:</strong> Use images with enough contrast from text background</li>
  </ul>

  <h2>Responsive Behavior</h2>
  <p>
    On mobile devices (below 1024px), the layout stacks vertically: image on top, text below. The
    grid changes from <code>grid-cols-5</code> to <code>grid-cols-1</code>, ensuring content
    remains readable on small screens.
  </p>

  <div class="alert alert-info mt-8">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path>
    </svg>
    <div>
      <strong>Pro Tip:</strong> Use high-quality, royalty-free images from Unsplash, Pexels, or your
      own photography library. The image should support your message, not distract from it.
    </div>
  </div>
</div>
