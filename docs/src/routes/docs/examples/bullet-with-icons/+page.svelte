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
      <TwoColumnLayout class="p-12">
        {#snippet left()}
          <div class="h-full flex flex-col justify-center pr-8">
            <h2
              class="text-5xl font-bold leading-tight"
              style="color: var(--slidey-color-primary)"
            >
              Problem
            </h2>
          </div>
        {/snippet}

        {#snippet right()}
          <div class="h-full flex flex-col justify-center space-y-6">
            <!-- Bullet Point 1 -->
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                style="background-color: var(--slidey-color-primary)"
              >
                📊
              </div>
              <div class="flex-1 pt-2">
                <h3 class="text-2xl font-semibold mb-2" style="color: var(--slidey-color-text)">
                  Data Silos
                </h3>
                <p class="text-lg opacity-80" style="color: var(--slidey-color-text)">
                  Teams struggle with fragmented data across multiple systems
                </p>
              </div>
            </div>

            <!-- Bullet Point 2 -->
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                style="background-color: var(--slidey-color-secondary)"
              >
                ⏱️
              </div>
              <div class="flex-1 pt-2">
                <h3 class="text-2xl font-semibold mb-2" style="color: var(--slidey-color-text)">
                  Manual Processes
                </h3>
                <p class="text-lg opacity-80" style="color: var(--slidey-color-text)">
                  Hours wasted on repetitive tasks that could be automated
                </p>
              </div>
            </div>

            <!-- Bullet Point 3 -->
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl"
                style="background-color: var(--slidey-color-accent)"
              >
                💡
              </div>
              <div class="flex-1 pt-2">
                <h3 class="text-2xl font-semibold mb-2" style="color: var(--slidey-color-text)">
                  Lack of Insights
                </h3>
                <p class="text-lg opacity-80" style="color: var(--slidey-color-text)">
                  Difficulty extracting actionable insights from raw data
                </p>
              </div>
            </div>
          </div>
        {/snippet}
      </TwoColumnLayout>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li><strong>Responsive Design:</strong> Stacks to single column on mobile devices (below 480px)</li>
    <li><strong>Theme-Aware:</strong> Uses CSS custom properties to adapt to any SlideyUI theme</li>
    <li>
      <strong>Icon Highlights:</strong> Colored circular badges draw attention to each point
    </li>
    <li><strong>Cards Within Cards:</strong> Uses CardContainer with nested TwoColumnLayout</li>
    <li><strong>Flexible Content:</strong> Easy to customize text, icons, and number of bullets</li>
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
  <pre><code>{`<CardContainer aspectRatio="16/9">
  <TwoColumnLayout class="p-12">
    {#snippet left()}
      <div class="h-full flex flex-col justify-center pr-8">
        <h2 class="text-5xl font-bold" style="color: var(--slidey-color-primary)">
          Problem
        </h2>
      </div>
    {/snippet}

    {#snippet right()}
      <div class="h-full flex flex-col justify-center space-y-6">
        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
            style="background-color: var(--slidey-color-primary)"
          >
            📊
          </div>
          <div class="flex-1 pt-2">
            <h3 class="text-2xl font-semibold mb-2">Data Silos</h3>
            <p class="text-lg opacity-80">
              Teams struggle with fragmented data
            </p>
          </div>
        </div>
        <!-- More bullet points... -->
      </div>
    {/snippet}
  </TwoColumnLayout>
</CardContainer>`}</code></pre>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Change icons:</strong> Replace emoji with SVG icons or icon fonts for more
      professional look
    </li>
    <li><strong>Adjust spacing:</strong> Modify <code>space-y-6</code> to control vertical spacing</li>
    <li><strong>Add animations:</strong> Combine with SlideyUI's build steps for progressive reveal</li>
    <li>
      <strong>Color variations:</strong> Use different theme colors (primary, secondary, accent) for
      visual hierarchy
    </li>
  </ul>

  <h2>Responsive Behavior</h2>
  <p>
    On screens below 480px (portrait phones), the TwoColumnLayout automatically stacks into a
    single column. The "Problem" title appears above the bullet points, maintaining readability on
    all devices.
  </p>
</div>
