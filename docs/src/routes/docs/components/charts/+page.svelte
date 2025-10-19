<script lang="ts">
  import { ContentCard, CardGrid } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
  <title>Charts - SlideyUI Components</title>
</svelte:head>

<div class="prose max-w-none">
  <h1>ApexCharts Integration</h1>
  <p class="lead text-xl text-base-content/80 my-6">
    Professional, interactive data visualizations powered by ApexCharts. All chart types are theme-aware,
    optimized for presentations, and seamlessly integrate with SlideyUI's card system. Perfect for displaying
    metrics, trends, and data insights in your presentations.
  </p>

  <div class="alert alert-info my-6">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h4 class="font-bold">What is ApexCharts?</h4>
      <p class="text-sm">
        ApexCharts is a modern charting library that provides beautiful, interactive charts. SlideyUI integrates
        ApexCharts with theme awareness, responsive design, and presentation-optimized defaults.
      </p>
    </div>
  </div>

  <h2>Available Chart Types</h2>
  <p class="my-4">
    Click any chart card below to explore detailed examples, configuration options, and best practices.
  </p>

  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2, lg: 3 }} gap="lg">
      <!-- Area Charts Card -->
      <a href="/docs/components/charts/area" class="block transition-transform hover:scale-105">
        <ContentCard
          title="Area Charts"
          subtitle="Trends with filled regions"
          aspectRatio="4/3"
          bordered={true}
          shadow={true}
        >
          <div class="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-500/10 to-blue-600/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-blue-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p class="text-center text-sm">
              Visualize trends with gradient fills. Perfect for revenue growth, user metrics, and time-series data.
            </p>
          </div>
          <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">4 Variants</span>
              <span class="text-sm text-primary">View Examples →</span>
            </div>
          </div>
        </ContentCard>
      </a>

      <!-- Bar Charts Card -->
      <a href="/docs/components/charts/bar" class="block transition-transform hover:scale-105">
        <ContentCard
          title="Bar Charts"
          subtitle="Horizontal comparisons"
          aspectRatio="4/3"
          bordered={true}
          shadow={true}
        >
          <div class="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-purple-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-center text-sm">
              Compare categories with horizontal bars. Ideal for rankings, long labels, and direct comparisons.
            </p>
          </div>
          <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">4 Variants</span>
              <span class="text-sm text-primary">View Examples →</span>
            </div>
          </div>
        </ContentCard>
      </a>

      <!-- Column Charts Card -->
      <a href="/docs/components/charts/column" class="block transition-transform hover:scale-105">
        <ContentCard
          title="Column Charts"
          subtitle="Vertical data comparison"
          aspectRatio="4/3"
          bordered={true}
          shadow={true}
        >
          <div class="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-green-500/10 to-green-600/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p class="text-center text-sm">
              Display data with vertical columns. Perfect for monthly sales, quarterly results, and trends.
            </p>
          </div>
          <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">4 Variants</span>
              <span class="text-sm text-primary">View Examples →</span>
            </div>
          </div>
        </ContentCard>
      </a>

      <!-- Line Charts Card -->
      <a href="/docs/components/charts/line" class="block transition-transform hover:scale-105">
        <ContentCard
          title="Line Charts"
          subtitle="Continuous trends over time"
          aspectRatio="4/3"
          bordered={true}
          shadow={true}
        >
          <div class="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-cyan-500/10 to-cyan-600/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-cyan-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <p class="text-center text-sm">
              Show trends with continuous lines. Great for growth trajectories, forecasting, and comparative analysis.
            </p>
          </div>
          <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">6 Variants</span>
              <span class="text-sm text-primary">View Examples →</span>
            </div>
          </div>
        </ContentCard>
      </a>

      <!-- Pie Charts Card -->
      <a href="/docs/components/charts/pie" class="block transition-transform hover:scale-105">
        <ContentCard
          title="Pie & Donut Charts"
          subtitle="Proportional data visualization"
          aspectRatio="4/3"
          bordered={true}
          shadow={true}
        >
          <div class="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-orange-500/10 to-orange-600/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <p class="text-center text-sm">
              Show parts of a whole. Ideal for market share, category distribution, and progress metrics.
            </p>
          </div>
          <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">4 Variants</span>
              <span class="text-sm text-primary">View Examples →</span>
            </div>
          </div>
        </ContentCard>
      </a>

      <!-- More Coming Soon Card -->
      <ContentCard
        title="More Chart Types"
        subtitle="Additional visualizations"
        aspectRatio="4/3"
        bordered={true}
        shadow={true}
      >
        <div class="p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-500/10 to-slate-600/5">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <p class="text-center text-sm">
            Radar, scatter, heatmap, and more chart types coming soon. Built on ApexCharts for maximum flexibility.
          </p>
        </div>
        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Coming Soon</span>
            <span class="text-sm text-base-content/50">Stay Tuned</span>
          </div>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <h2>Quick Start</h2>

  <h3>Installation</h3>
  <p class="my-4">Install ApexCharts in your project:</p>

  <CodeBlock code="npm install apexcharts" lang="bash" />

  <h3>Basic Usage</h3>
  <p class="my-4">Here's a simple example of creating a chart with SlideyUI:</p>

  <CodeBlock code={`<script lang="ts">
  import { ContentCard } from '@slideyui/svelte';
  import ApexCharts from 'apexcharts';

  let chartEl: HTMLElement;
  let chart: ApexCharts | null = null;

  $effect(() => {
    if (chartEl && !chart) {
      const options = {
        series: [{
          name: 'Sales',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        }],
        chart: {
          height: 350,
          type: 'line',
          background: 'transparent'
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        colors: ['#3b82f6']
      };

      chart = new ApexCharts(chartEl, options);
      chart.render();
    }

    return () => {
      chart?.destroy();
      chart = null;
    };
  });
</script>

<ContentCard title="Sales Trend" aspectRatio="16/9" bordered={true}>
  <div bind:this={chartEl}></div>
</ContentCard>`} lang="svelte" />

  <h2>Key Features</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          Theme-Aware
        </h3>
        <p class="text-sm">
          All charts automatically adapt to light and dark themes, adjusting colors, text, and grid lines for optimal visibility.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Responsive Design
        </h3>
        <p class="text-sm">
          Charts scale beautifully across devices and screen sizes. Perfect for presentations on projectors, laptops, and tablets.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          Interactive
        </h3>
        <p class="text-sm">
          Built-in zoom, pan, tooltips, and hover effects. Engage your audience with interactive data exploration.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Presentation-Optimized
        </h3>
        <p class="text-sm">
          Large fonts (16px minimum), high contrast colors, and optimized layouts ensure clarity from any distance.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
          </svg>
          Card Integration
        </h3>
        <p class="text-sm">
          Seamlessly integrate with SlideyUI's ContentCard and CardGrid components for consistent presentation layouts.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Export Ready
        </h3>
        <p class="text-sm">
          Charts can be exported as PNG, SVG, or CSV. Download buttons built-in for easy sharing and documentation.
        </p>
      </div>
    </div>
  </div>

  <h2>Chart Selection Guide</h2>

  <div class="overflow-x-auto my-6">
    <table class="table">
      <thead>
        <tr>
          <th>Chart Type</th>
          <th>Best For</th>
          <th>When to Use</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Area</strong></td>
          <td>Trends with magnitude emphasis</td>
          <td>Revenue growth, cumulative metrics, time-series with volume</td>
        </tr>
        <tr>
          <td><strong>Bar</strong></td>
          <td>Category comparisons (horizontal)</td>
          <td>Rankings, long labels, country/product comparisons</td>
        </tr>
        <tr>
          <td><strong>Column</strong></td>
          <td>Category comparisons (vertical)</td>
          <td>Monthly sales, quarterly results, grouped metrics</td>
        </tr>
        <tr>
          <td><strong>Line</strong></td>
          <td>Continuous trends</td>
          <td>Stock prices, growth trajectories, multi-series comparison</td>
        </tr>
        <tr>
          <td><strong>Pie/Donut</strong></td>
          <td>Part-to-whole relationships</td>
          <td>Market share, category distribution, budget allocation</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Best Practices</h2>

  <ul class="my-4">
    <li><strong>Choose the right chart:</strong> Match chart type to your data and message (see guide above)</li>
    <li><strong>Keep it simple:</strong> Limit data series to 3-4 maximum for clarity</li>
    <li><strong>Use consistent colors:</strong> Maintain color schemes across slides for professional look</li>
    <li><strong>Label clearly:</strong> Ensure axes, legends, and titles are descriptive</li>
    <li><strong>Optimize for distance:</strong> Use large fonts (16px+) and high contrast colors</li>
    <li><strong>Clean up:</strong> Always destroy chart instances on component unmount</li>
    <li><strong>Test themes:</strong> Verify charts look good in both light and dark modes</li>
  </ul>

  <h2>Theme Integration</h2>
  <p class="my-4">
    All example pages show how to make charts theme-aware. Here's the basic pattern:
  </p>

  <CodeBlock code={`// Detect current theme
const theme = document.documentElement.getAttribute('data-theme');
const isDarkMode = theme === 'dark' || theme?.includes('dark');

// Apply theme-aware options
const themeOptions = {
  chart: {
    background: 'transparent',
    foreColor: isDarkMode ? '#a6adbb' : '#373d3f'
  },
  grid: {
    borderColor: isDarkMode ? '#2d3748' : '#e2e8f0'
  },
  tooltip: {
    theme: isDarkMode ? 'dark' : 'light'
  }
};`} lang="javascript" />

  <h2>Performance Considerations</h2>

  <div class="alert alert-warning my-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
      <h4 class="font-bold">Always Clean Up!</h4>
      <p class="text-sm">
        Call <code>chart?.destroy()</code> when components unmount to prevent memory leaks. Use Svelte's $effect cleanup pattern.
      </p>
    </div>
  </div>

  <ul class="my-4">
    <li><strong>Destroy on unmount:</strong> Return cleanup function from $effect</li>
    <li><strong>Limit data points:</strong> Keep datasets under 100-150 points for smooth interaction</li>
    <li><strong>Lazy load:</strong> Only render charts when visible on screen</li>
    <li><strong>Optimize animations:</strong> Reduce animation duration for large datasets</li>
    <li><strong>Responsive containers:</strong> Let charts resize within ContentCard naturally</li>
  </ul>

  <h2>Accessibility</h2>
  <p class="my-4">
    ApexCharts provides excellent accessibility features out of the box:
  </p>

  <ul class="my-4">
    <li>Keyboard navigation for interactive elements</li>
    <li>Screen reader support via ARIA labels</li>
    <li>High contrast color schemes</li>
    <li>Responsive tooltips with detailed information</li>
    <li>Exportable data for alternative consumption</li>
  </ul>

  <div class="alert alert-info my-6">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h4 class="font-bold">Color Blindness</h4>
      <p class="text-sm">
        Consider using patterns, textures, or different line styles in addition to colors to ensure charts are accessible to color-blind viewers.
      </p>
    </div>
  </div>

  <h2>Resources</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-8 not-prose">
    <a href="https://apexcharts.com/docs/" target="_blank" rel="noopener noreferrer" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title text-lg">ApexCharts Documentation</h3>
        <p class="text-sm">Complete API reference, examples, and configuration options</p>
      </div>
    </a>

    <a href="https://apexcharts.com/javascript-chart-demos/" target="_blank" rel="noopener noreferrer" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title text-lg">ApexCharts Examples</h3>
        <p class="text-sm">Interactive demos of all chart types and configurations</p>
      </div>
    </a>

    <a href="/docs/components/cards" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title text-lg">ContentCard Component</h3>
        <p class="text-sm">Learn about SlideyUI's card system for layout and styling</p>
      </div>
    </a>

    <a href="/docs/examples" class="card bg-base-200 hover:bg-base-300 transition-colors">
      <div class="card-body">
        <h3 class="card-title text-lg">Example Presentations</h3>
        <p class="text-sm">See charts in action within complete presentation examples</p>
      </div>
    </a>
  </div>

  <h2>Next Steps</h2>

  <div class="flex gap-4 my-8 flex-wrap">
    <a href="/docs/components/charts/line" class="btn btn-primary">
      Explore Line Charts
    </a>
    <a href="/docs/components/charts/area" class="btn btn-outline">
      Explore Area Charts
    </a>
    <a href="/docs/components/charts/pie" class="btn btn-outline">
      Explore Pie Charts
    </a>
    <a href="https://apexcharts.com/docs/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
      ApexCharts Docs
    </a>
  </div>
</div>
