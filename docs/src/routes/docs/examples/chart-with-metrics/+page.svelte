<script lang="ts">
  import { CardContainer } from '@slideyui/svelte';
  import { onMount } from 'svelte';

  let chartContainer: HTMLElement;

  onMount(async () => {
    // Dynamically import ApexCharts (client-side only)
    const ApexCharts = (await import('apexcharts')).default;

    const options = {
      chart: {
        type: 'line',
        height: '100%',
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          easing: 'easeinout',
          speed: 800
        }
      },
      series: [
        {
          name: 'Artificial Intelligence',
          data: [10, 15, 25, 35, 45, 55, 60, 65, 70, 72]
        },
        {
          name: 'Internet Of Things',
          data: [8, 12, 20, 30, 40, 48, 52, 56, 58, 60]
        },
        {
          name: 'Others',
          data: [5, 10, 18, 28, 38, 45, 50, 55, 57, 58]
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 5,
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      colors: ['#3b82f6', '#06b6d4', '#f59e0b'],
      xaxis: {
        categories: ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029'],
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: '#6b7280'
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        min: 0,
        max: 80,
        tickAmount: 4,
        labels: {
          style: {
            fontSize: '12px',
            fontWeight: 500,
            colors: '#9ca3af'
          }
        }
      },
      grid: {
        borderColor: '#e5e7eb',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'left',
        fontSize: '13px',
        fontWeight: 500,
        markers: {
          width: 10,
          height: 10,
          radius: 12
        },
        itemMargin: {
          horizontal: 15,
          vertical: 8
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true,
        theme: 'light'
      }
    };

    const chart = new ApexCharts(chartContainer, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  });
</script>

<div class="prose max-w-none">
  <h1>Chart With Metrics Slide</h1>
  <p>
    This layout demonstrates a comprehensive data presentation pattern combining a multi-series line
    chart with key metric cards. Perfect for showing trends alongside specific growth statistics,
    this layout is ideal for quarterly reports, traction slides, and performance reviews.
  </p>

  <h2>Live Demo</h2>
  <p>
    The slide below showcases how to present complex data with context. The left side displays a
    trend chart showing multiple data series over time, while the right side provides narrative
    context and highlights key metrics with prominent growth cards.
  </p>

  <div class="not-prose mb-12">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 h-full p-8 lg:p-12">
        <!-- Left Column: Title and Chart -->
        <div class="flex flex-col space-y-6">
          <h2 class="text-4xl lg:text-6xl font-bold text-blue-600 leading-tight">
            Company Traction
          </h2>

          <div class="flex-1 min-h-[300px] lg:min-h-[400px]">
            <div bind:this={chartContainer} class="w-full h-full"></div>
          </div>
        </div>

        <!-- Right Column: Description and Metrics -->
        <div class="flex flex-col space-y-6 lg:space-y-8">
          <!-- Description Text -->
          <div>
            <p class="text-sm lg:text-base text-blue-700 leading-relaxed">
              Traction is a period where the company is feeling momentum during its development
              period. If traction momentum is not harnessed, sales figures can decline and the
              customer base can shrink. In general, companies will judge success by the amount of
              revenue and new customers they receive.
            </p>
          </div>

          <!-- Metrics Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <!-- Card 1: Artificial Intelligence -->
            <div class="bg-white rounded-lg p-4 lg:p-5 shadow-md border border-gray-100">
              <div class="mb-2">
                <span
                  class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded"
                >
                  Artificial Intelligence
                </span>
              </div>
              <div class="mb-1">
                <div class="text-2xl lg:text-3xl font-bold text-blue-600">+1000%</div>
                <div class="text-sm font-medium text-gray-700">growth</div>
              </div>
              <p class="text-xs text-gray-500 leading-snug">
                Artificial Intelligence growth over the period.
              </p>
            </div>

            <!-- Card 2: Internet Of Things -->
            <div class="bg-white rounded-lg p-4 lg:p-5 shadow-md border border-gray-100">
              <div class="mb-2">
                <span
                  class="inline-block px-3 py-1 text-xs font-semibold text-white bg-cyan-500 rounded"
                >
                  Internet Of Things
                </span>
              </div>
              <div class="mb-1">
                <div class="text-2xl lg:text-3xl font-bold text-cyan-500">+550%</div>
                <div class="text-sm font-medium text-gray-700">growth</div>
              </div>
              <p class="text-xs text-gray-500 leading-snug">
                Internet Of Things growth over the period.
              </p>
            </div>

            <!-- Card 3: Others -->
            <div class="bg-white rounded-lg p-4 lg:p-5 shadow-md border border-gray-100">
              <div class="mb-2">
                <span
                  class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded"
                >
                  Others
                </span>
              </div>
              <div class="mb-1">
                <div class="text-2xl lg:text-3xl font-bold text-blue-600">+550%</div>
                <div class="text-sm font-medium text-gray-700">growth</div>
              </div>
              <p class="text-xs text-gray-500 leading-snug">Others growth over the period.</p>
            </div>
          </div>
        </div>
      </div>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li>
      <strong>Multi-Series Chart:</strong> ApexCharts line chart with 3 data series showing trends over
      time
    </li>
    <li><strong>Responsive Grid:</strong> Two-column on desktop, stacks on mobile</li>
    <li><strong>Metric Cards:</strong> Three prominent growth stat cards with category badges</li>
    <li>
      <strong>Color-Coded:</strong> Consistent colors across chart lines and metric cards (blue, cyan,
      orange)
    </li>
    <li>
      <strong>Professional Typography:</strong> Large title, readable body text, bold metric numbers
    </li>
    <li><strong>Theme-Aware:</strong> Uses SlideyUI's color system with blue accent theme</li>
    <li>
      <strong>Flexible Layout:</strong> Chart and metrics adapt to content and screen size
    </li>
  </ul>

  <h2>Use Cases</h2>
  <p>This layout pattern is perfect for:</p>
  <ul>
    <li>
      <strong>Pitch Decks:</strong> Showcase traction and growth metrics to investors
    </li>
    <li>
      <strong>Quarterly Business Reviews:</strong> Present performance trends with key highlights
    </li>
    <li>
      <strong>Product Updates:</strong> Show adoption rates and usage growth across categories
    </li>
    <li>
      <strong>Sales Presentations:</strong> Demonstrate market growth and opportunity size
    </li>
    <li>
      <strong>Annual Reports:</strong> Visualize year-over-year growth with supporting metrics
    </li>
    <li>
      <strong>Investor Updates:</strong> Combine trend data with specific achievement highlights
    </li>
  </ul>

  <h2>Code Example (Svelte)</h2>
  <pre><code>{`<script lang="ts">
  import { CardContainer } from '@slideyui/svelte';
  import { onMount } from 'svelte';

  let chartContainer: HTMLElement;

  onMount(async () => {
    const ApexCharts = (await import('apexcharts')).default;

    const options = {
      chart: {
        type: 'line',
        height: '100%',
        toolbar: { show: false }
      },
      series: [
        {
          name: 'Artificial Intelligence',
          data: [10, 15, 25, 35, 45, 55, 60, 65, 70, 72]
        },
        {
          name: 'Internet Of Things',
          data: [8, 12, 20, 30, 40, 48, 52, 56, 58, 60]
        },
        {
          name: 'Others',
          data: [5, 10, 18, 28, 38, 45, 50, 55, 57, 58]
        }
      ],
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#3b82f6', '#06b6d4', '#f59e0b'],
      legend: { position: 'bottom' }
      // ... more options
    };

    const chart = new ApexCharts(chartContainer, options);
    chart.render();

    return () => chart.destroy();
  });
</script>

<CardContainer aspectRatio="16/9" bordered={true}>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full p-12">
    <!-- Left: Title and Chart -->
    <div class="flex flex-col space-y-6">
      <h2 class="text-6xl font-bold text-blue-600">
        Company Traction
      </h2>
      <div class="flex-1 min-h-[400px]">
        <div bind:this={chartContainer} class="w-full h-full"></div>
      </div>
    </div>

    <!-- Right: Description and Metrics -->
    <div class="flex flex-col space-y-8">
      <p class="text-base text-blue-700 leading-relaxed">
        Traction is a period where the company is feeling momentum...
      </p>

      <!-- Metrics Cards -->
      <div class="grid grid-cols-3 gap-4">
        <div class="bg-white rounded-lg p-5 shadow-md border">
          <span class="px-3 py-1 text-xs font-semibold
                       text-white bg-blue-600 rounded">
            Artificial Intelligence
          </span>
          <div class="text-3xl font-bold text-blue-600 mt-2">
            +1000%
          </div>
          <div class="text-sm font-medium text-gray-700">growth</div>
          <p class="text-xs text-gray-500 mt-1">
            AI growth over the period.
          </p>
        </div>
        <!-- More cards... -->
      </div>
    </div>
  </div>
</CardContainer>`}</code></pre>

  <h2>React Implementation</h2>
  <pre><code>{`import { CardContainer } from '@slideyui/react';
import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

export default function ChartWithMetrics() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: 'line',
        height: '100%',
        toolbar: { show: false }
      },
      series: [
        {
          name: 'Artificial Intelligence',
          data: [10, 15, 25, 35, 45, 55, 60, 65, 70, 72]
        },
        {
          name: 'Internet Of Things',
          data: [8, 12, 20, 30, 40, 48, 52, 56, 58, 60]
        },
        {
          name: 'Others',
          data: [5, 10, 18, 28, 38, 45, 50, 55, 57, 58]
        }
      ],
      stroke: { curve: 'smooth', width: 3 },
      colors: ['#3b82f6', '#06b6d4', '#f59e0b'],
      legend: { position: 'bottom' }
      // ... more options
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <CardContainer aspectRatio="16/9" bordered>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full p-12">
        {/* Left: Title and Chart */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-6xl font-bold text-blue-600">
            Company Traction
          </h2>
          <div className="flex-1 min-h-[400px]">
            <div ref={chartRef} className="w-full h-full" />
          </div>
        </div>

        {/* Right: Description and Metrics */}
        <div className="flex flex-col space-y-8">
          <p className="text-base text-blue-700 leading-relaxed">
            Traction is a period where the company is feeling momentum...
          </p>

          {/* Metrics Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-5 shadow-md border">
              <span className="px-3 py-1 text-xs font-semibold
                               text-white bg-blue-600 rounded">
                Artificial Intelligence
              </span>
              <div className="text-3xl font-bold text-blue-600 mt-2">
                +1000%
              </div>
              <div className="text-sm font-medium text-gray-700">growth</div>
              <p className="text-xs text-gray-500 mt-1">
                AI growth over the period.
              </p>
            </div>
            {/* More cards... */}
          </div>
        </div>
      </div>
    </CardContainer>
  );
}`}</code></pre>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Chart colors:</strong> Modify the <code>colors</code> array to match your brand palette
    </li>
    <li>
      <strong>Data series:</strong> Add or remove series in the <code>series</code> array for different
      datasets
    </li>
    <li>
      <strong>Metric cards:</strong> Adjust the grid to <code>grid-cols-2</code> or <code
        >grid-cols-4</code
      > for different card counts
    </li>
    <li>
      <strong>Badge colors:</strong> Change <code>bg-blue-600</code>, <code>bg-cyan-500</code> to match
      chart colors
    </li>
    <li>
      <strong>Growth values:</strong> Update percentage values and descriptions dynamically
    </li>
    <li>
      <strong>Chart type:</strong> Change to <code>type: 'area'</code> for filled area charts or <code
        >type: 'bar'</code
      > for bar comparisons
    </li>
  </ul>

  <h2>Design Patterns</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">Color Consistency</h3>
        <p class="text-sm">
          The chart line colors match the metric card badges and values, creating visual
          cohesion. Blue (#3b82f6) for AI, Cyan (#06b6d4) for IoT, and Orange (#f59e0b) for Others.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">Visual Hierarchy</h3>
        <p class="text-sm">
          Large title draws attention, chart shows the big picture, and metric cards highlight
          specific achievements. The eye flows naturally from left to right, top to bottom.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">Data + Context</h3>
        <p class="text-sm">
          The descriptive paragraph provides context for the data, explaining what traction means
          and why it matters. This combination of visualization and explanation enhances
          understanding.
        </p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title">Metric Card Structure</h3>
        <p class="text-sm">
          Each metric card follows a consistent pattern: category badge → large percentage → growth
          label → description. This structure is scannable and makes comparisons easy.
        </p>
      </div>
    </div>
  </div>

  <h2>Chart Configuration Options</h2>
  <p>ApexCharts provides extensive customization options:</p>
  <ul>
    <li>
      <strong>Curve style:</strong> <code>stroke.curve</code> - 'smooth', 'straight', 'stepline'
    </li>
    <li>
      <strong>Markers:</strong> Show/hide data point markers with <code>markers.size</code>
    </li>
    <li>
      <strong>Legend position:</strong> 'top', 'bottom', 'left', 'right' via <code
        >legend.position</code
      >
    </li>
    <li>
      <strong>Grid lines:</strong> Customize with <code>grid.strokeDashArray</code> and colors
    </li>
    <li>
      <strong>Tooltips:</strong> Configure hover behavior and data display
    </li>
    <li>
      <strong>Animations:</strong> Control speed and easing with <code>chart.animations</code>
    </li>
  </ul>

  <h2>Installation</h2>
  <p>To use ApexCharts in your project, install it via npm:</p>
  <pre><code>npm install apexcharts</code></pre>

  <h2>Responsive Behavior</h2>
  <p>
    On mobile devices (below 1024px), the layout stacks vertically: title and chart on top,
    description and metrics below. The metric cards also stack on very small screens (below 640px)
    for optimal readability.
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
      <strong>Pro Tip:</strong> Use this layout for investor pitch decks and quarterly reports where
      you need to show both the trend and the specific growth numbers. The combination of visualization
      and metrics creates a compelling narrative.
    </div>
  </div>
</div>
