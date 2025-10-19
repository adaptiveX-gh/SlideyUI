<script lang="ts">
  import { CardContainer, TwoColumnLayout } from '@slideyui/svelte';
</script>

<div class="prose max-w-none">
  <h1>Bullet-With-Icons Example</h1>
  <p>
    This example demonstrates a responsive two-column layout with a title on the left and icon-based
    bullet points on the right. The layout is theme-aware and uses the "cards within cards"
    architecture for maximum flexibility.
  </p>

  <h2>Live Demo</h2>
  <p>
    The slide below showcases a common presentation pattern: a bold statement or question on the
    left, with supporting points highlighted by icons on the right.
  </p>

  <div class="not-prose mb-12">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full p-8 lg:p-12">
        <!-- Left Column: Title and Description -->
        <div class="flex flex-col justify-center space-y-6">
          <h2 class="text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
            Problem
          </h2>
          <p class="text-lg lg:text-xl text-gray-600 leading-relaxed">
            A problem needs to be discussed further and in detail because this problem is the main
            foundation in the initial development of a product, service, and decision making.
            Without a well-defined problem, it will have an impact on a job that is unfocused,
            unmanaged, and less relevant.
          </p>
        </div>

        <!-- Right Column: Clean Cards -->
        <div class="flex flex-col justify-center space-y-3 lg:space-y-4">
          <!-- Card 1 -->
          <div
            class="flex items-center gap-4 p-4 lg:p-5 rounded-lg lg:rounded-xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-300"
          >
            <div class="flex-shrink-0 text-2xl lg:text-3xl">📊</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base lg:text-lg font-bold text-gray-900 mb-0.5">Data Silos</h3>
              <p class="text-xs lg:text-sm text-gray-500 leading-snug">
                Teams struggle with fragmented data across multiple systems
              </p>
            </div>
          </div>

          <!-- Card 2 -->
          <div
            class="flex items-center gap-4 p-4 lg:p-5 rounded-lg lg:rounded-xl bg-white border-2 border-gray-100 hover:border-secondary hover:shadow-lg transition-all duration-300"
          >
            <div class="flex-shrink-0 text-2xl lg:text-3xl">⏱️</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base lg:text-lg font-bold text-gray-900 mb-0.5">
                Manual Processes
              </h3>
              <p class="text-xs lg:text-sm text-gray-500 leading-snug">
                Hours wasted on repetitive tasks that could be automated
              </p>
            </div>
          </div>

          <!-- Card 3 -->
          <div
            class="flex items-center gap-4 p-4 lg:p-5 rounded-lg lg:rounded-xl bg-white border-2 border-gray-100 hover:border-accent hover:shadow-lg transition-all duration-300"
          >
            <div class="flex-shrink-0 text-2xl lg:text-3xl">💡</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base lg:text-lg font-bold text-gray-900 mb-0.5">Lack of Insights</h3>
              <p class="text-xs lg:text-sm text-gray-500 leading-snug">
                Difficulty extracting actionable insights from raw data
              </p>
            </div>
          </div>

          <!-- Card 4 -->
          <div
            class="flex items-center gap-4 p-4 lg:p-5 rounded-lg lg:rounded-xl bg-white border-2 border-gray-100 hover:border-primary hover:shadow-lg transition-all duration-300"
          >
            <div class="flex-shrink-0 text-2xl lg:text-3xl">🔄</div>
            <div class="flex-1 min-w-0">
              <h3 class="text-base lg:text-lg font-bold text-gray-900 mb-0.5">
                Poor Collaboration
              </h3>
              <p class="text-xs lg:text-sm text-gray-500 leading-snug">
                Disconnected teams working in isolation without visibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li><strong>Clean White Cards:</strong> Light background with subtle gray borders for a professional look</li>
    <li><strong>Descriptive Paragraph:</strong> Contextual text on the left explains the section</li>
    <li><strong>Fully Responsive:</strong> All text, spacing, and card sizes adapt to screen size using Tailwind's <code>lg:</code> breakpoints</li>
    <li><strong>Hover Effects:</strong> Cards respond with colored borders and shadows on hover</li>
    <li><strong>Icon-First Layout:</strong> Large emoji icons (responsive from 2xl to 3xl) draw immediate attention</li>
    <li><strong>Compact Cards:</strong> Horizontal layout with titles and descriptions side-by-side with icons</li>
    <li><strong>Smooth Transitions:</strong> All interactions use smooth 300ms transitions</li>
    <li><strong>Mobile Optimized:</strong> Grid stacks to single column on small screens</li>
  </ul>

  <h2>Usage</h2>
  <p>This pattern works well for:</p>
  <ul>
    <li>Problem/Solution slides</li>
    <li>Feature highlights</li>
    <li>Benefits presentations</li>
    <li>Process steps</li>
    <li>Key takeaways</li>
  </ul>

  <h2>Code Example</h2>
  <pre><code>{`<CardContainer aspectRatio="16/9" bordered={true}>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full p-8 lg:p-12">
    <!-- Left: Title and Paragraph -->
    <div class="flex flex-col justify-center space-y-6">
      <h2 class="text-5xl lg:text-6xl font-bold text-gray-900">
        Problem
      </h2>
      <p class="text-lg lg:text-xl text-gray-600 leading-relaxed">
        A problem needs to be discussed further and in detail...
      </p>
    </div>

    <!-- Right: Clean Cards -->
    <div class="flex flex-col justify-center space-y-3 lg:space-y-4">
      <div class="flex items-center gap-4 p-4 lg:p-5 rounded-lg lg:rounded-xl
                  bg-white border-2 border-gray-100
                  hover:border-primary hover:shadow-lg
                  transition-all duration-300">
        <div class="flex-shrink-0 text-2xl lg:text-3xl">📊</div>
        <div class="flex-1 min-w-0">
          <h3 class="text-base lg:text-lg font-bold text-gray-900 mb-0.5">
            Data Silos
          </h3>
          <p class="text-xs lg:text-sm text-gray-500 leading-snug">
            Teams struggle with fragmented data
          </p>
        </div>
      </div>
      <!-- More cards... -->
    </div>
  </div>
</CardContainer>`}</code></pre>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Change hover colors:</strong> Modify <code>hover:border-primary</code> to use <code>secondary</code> or <code>accent</code> for variety
    </li>
    <li><strong>Adjust spacing:</strong> Change <code>space-y-4</code> to control vertical spacing between cards</li>
    <li><strong>Card padding:</strong> Modify <code>p-5</code> to adjust internal card padding</li>
    <li><strong>Icon size:</strong> Adjust <code>text-3xl</code> on icons for different sizes</li>
    <li><strong>Add animations:</strong> Combine with SlideyUI's build steps for progressive reveal</li>
    <li><strong>Shadow intensity:</strong> Change <code>hover:shadow-md</code> to <code>shadow-lg</code> or <code>shadow-xl</code> for more depth</li>
  </ul>

  <h2>Responsive Behavior</h2>
  <p>
    On screens below 480px (portrait phones), the TwoColumnLayout automatically stacks into a
    single column. The "Problem" title appears above the bullet points, maintaining readability on
    all devices.
  </p>
</div>
