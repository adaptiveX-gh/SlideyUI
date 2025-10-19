<script lang="ts">
  import { CardContainer } from '@slideyui/svelte';
</script>

<div class="prose max-w-none">
  <h1>Bullet With Icons Description Grid</h1>
  <p>
    This example demonstrates a responsive layout with descriptive text on the left and a grid of
    icon-based cards on the right. Perfect for showcasing features, benefits, market segments, or
    any categorized information in a presentation.
  </p>

  <h2>Live Demo</h2>
  <p>
    The slide below uses a 2-column grid of cards to display multiple categories or features,
    making it ideal for business presentations, product showcases, and market analysis slides.
  </p>

  <div class="not-prose mb-12">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full p-8 lg:p-12">
        <!-- Left Column: Title and Description -->
        <div class="flex flex-col justify-center space-y-6">
          <h2 class="text-4xl lg:text-5xl font-bold leading-tight text-primary">
            Businesses struggle
          </h2>
          <p class="text-base lg:text-lg text-gray-600 leading-relaxed">
            Show that we offer a solution that solves the problems previously described and
            identified. Make sure that the solutions we offer uphold the values of effectiveness,
            efficiency, and are highly relevant to the market situation and society is here and
            what is hsd sdksdf klfdsIkf lkfIkfsdkIf.
          </p>
        </div>

        <!-- Right Column: 2x3 Grid of Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 content-center">
          <!-- Card 1: Market -->
          <div
            class="flex flex-col items-center text-center p-5 lg:p-6 rounded-lg lg:rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">✓✓</div>
            <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">Market</h3>
            <div class="w-12 h-1 bg-primary rounded mb-3"></div>
            <p class="text-xs lg:text-sm text-gray-600 leading-snug">
              Innovative and widely accepted. Innovative and widely accepted. Innovative and widely
              accepted.
            </p>
          </div>

          <!-- Card 2: Industry -->
          <div
            class="flex flex-col items-center text-center p-5 lg:p-6 rounded-lg lg:rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">⚙️</div>
            <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">Industry</h3>
            <div class="w-12 h-1 bg-primary rounded mb-3"></div>
            <p class="text-xs lg:text-sm text-gray-600 leading-snug">
              Based on sound market decisions.
            </p>
          </div>

          <!-- Card 3: SEM -->
          <div
            class="flex flex-col items-center text-center p-5 lg:p-6 rounded-lg lg:rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">▶️</div>
            <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">SEM</h3>
            <div class="w-12 h-1 bg-primary rounded mb-3"></div>
            <p class="text-xs lg:text-sm text-gray-600 leading-snug">
              Driven by precise data and analysis.
            </p>
          </div>

          <!-- Card 4: End User -->
          <div
            class="flex flex-col items-center text-center p-5 lg:p-6 rounded-lg lg:rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">👥</div>
            <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">End User</h3>
            <div class="w-12 h-1 bg-primary rounded mb-3"></div>
            <p class="text-xs lg:text-sm text-gray-600 leading-snug">
              Focused on real user impact.
            </p>
          </div>

          <!-- Card 5: Industry -->
          <div
            class="flex flex-col items-center text-center p-5 lg:p-6 rounded-lg lg:rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">⚙️</div>
            <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">Industry</h3>
            <div class="w-12 h-1 bg-primary rounded mb-3"></div>
            <p class="text-xs lg:text-sm text-gray-600 leading-snug">
              Based on sound market decisions.
            </p>
          </div>

          <!-- Card 6: SEM -->
          <div
            class="flex flex-col items-center text-center p-5 lg:p-6 rounded-lg lg:rounded-xl bg-blue-50 hover:bg-blue-100 transition-all duration-300"
          >
            <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">▶️</div>
            <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">SEM</h3>
            <div class="w-12 h-1 bg-primary rounded mb-3"></div>
            <p class="text-xs lg:text-sm text-gray-600 leading-snug">
              Driven by precise data and analysis.
            </p>
          </div>
        </div>
      </div>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li>
      <strong>Grid Layout:</strong> 2-column grid that automatically adapts to single column on mobile
    </li>
    <li>
      <strong>Centered Icons:</strong> Large, eye-catching icons with consistent sizing
    </li>
    <li>
      <strong>Visual Separator:</strong> Colored underline divider between title and description
    </li>
    <li>
      <strong>Light Background:</strong> Subtle blue tint (bg-blue-50) for card distinction
    </li>
    <li>
      <strong>Hover Effects:</strong> Smooth background color transition on hover
    </li>
    <li>
      <strong>Fully Responsive:</strong> All elements scale proportionally using Tailwind's breakpoints
    </li>
    <li>
      <strong>Centered Content:</strong> Text-centered layout for professional appearance
    </li>
    <li>
      <strong>Vertical Alignment:</strong> Grid uses content-center for proper vertical centering
    </li>
  </ul>

  <h2>Usage</h2>
  <p>This pattern works well for:</p>
  <ul>
    <li>Market segmentation presentations</li>
    <li>Feature comparisons across categories</li>
    <li>Service offerings overview</li>
    <li>Product benefits by user type</li>
    <li>Technology stack presentations</li>
    <li>Business model canvas sections</li>
  </ul>

  <h2>Code Example</h2>
  <pre><code>{`<CardContainer aspectRatio="16/9" bordered={true}>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full p-8 lg:p-12">
    <!-- Left: Title and Description -->
    <div class="flex flex-col justify-center space-y-6">
      <h2 class="text-4xl lg:text-5xl font-bold text-primary">
        Businesses struggle
      </h2>
      <p class="text-base lg:text-lg text-gray-600 leading-relaxed">
        Show that we offer a solution...
      </p>
    </div>

    <!-- Right: 2x3 Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 content-center">
      <div class="flex flex-col items-center text-center p-5 lg:p-6
                  rounded-lg lg:rounded-xl bg-blue-50
                  hover:bg-blue-100 transition-all duration-300">
        <div class="text-4xl lg:text-5xl mb-3 lg:mb-4 text-primary">✓✓</div>
        <h3 class="text-lg lg:text-xl font-bold text-gray-900 mb-2">Market</h3>
        <div class="w-12 h-1 bg-primary rounded mb-3"></div>
        <p class="text-xs lg:text-sm text-gray-600 leading-snug">
          Innovative and widely accepted.
        </p>
      </div>
      <!-- More cards... -->
    </div>
  </div>
</CardContainer>`}</code></pre>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Background colors:</strong> Change <code>bg-blue-50</code> to other colors like
      <code>bg-green-50</code>, <code>bg-purple-50</code>, or <code>bg-gray-50</code>
    </li>
    <li>
      <strong>Divider color:</strong> Match the underline (<code>bg-primary</code>) to your theme or
      use different colors per card
    </li>
    <li>
      <strong>Grid columns:</strong> Adjust <code>sm:grid-cols-2</code> to <code>sm:grid-cols-3</code>
      for 3 columns
    </li>
    <li>
      <strong>Icon size:</strong> Modify <code>text-4xl lg:text-5xl</code> for different icon sizes
    </li>
    <li>
      <strong>Card spacing:</strong> Change <code>gap-3 lg:gap-4</code> to control spacing between
      cards
    </li>
    <li>
      <strong>Hover effects:</strong> Add shadows, scale transforms, or border changes on hover
    </li>
  </ul>

  <h2>Responsive Behavior</h2>
  <p>The layout adapts across three breakpoints:</p>
  <ul>
    <li>
      <strong>Mobile (&lt;640px):</strong> Single column layout with both left text and grid cards stacked
      vertically. Cards display in single column.
    </li>
    <li>
      <strong>Small screens (640px-1024px):</strong> Still single main column, but cards form 2-column
      grid using <code>sm:grid-cols-2</code>
    </li>
    <li>
      <strong>Large screens (1024px+):</strong> Two-column layout with text on left and 2x3 card grid
      on right
    </li>
  </ul>

  <h2>Design Notes</h2>
  <ul>
    <li>
      The underline divider (<code>w-12 h-1 bg-primary</code>) creates visual hierarchy and polish
    </li>
    <li>Text-centered layout works best when cards have similar content length</li>
    <li>The <code>content-center</code> utility ensures the grid vertically centers with the left text</li>
    <li>Light background (<code>bg-blue-50</code>) provides subtle distinction without overwhelming</li>
    <li>
      Hover effect uses background color change for interactivity without shadow complexity
    </li>
  </ul>
</div>
