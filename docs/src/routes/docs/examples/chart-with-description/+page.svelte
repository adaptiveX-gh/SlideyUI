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
          name: 'value',
          data: [
            { x: 'A', y: 65 },
            { x: 'B', y: 42 },
            { x: 'C', y: 75 },
            { x: 'D', y: 30 }
          ]
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 6,
        colors: ['#3b82f6'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 8
        }
      },
      colors: ['#3b82f6'],
      xaxis: {
        categories: ['A', 'B', 'C', 'D'],
        labels: {
          style: {
            fontSize: '14px',
            fontWeight: 600,
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
            fontSize: '14px',
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
          right: 20,
          bottom: 10,
          left: 10
        }
      },
      dataLabels: {
        enabled: true,
        offsetY: -10,
        style: {
          fontSize: '12px',
          fontWeight: 600,
          colors: ['#3b82f6']
        },
        background: {
          enabled: false
        }
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
  <h1>Chart or Table With Description</h1>
  <p>
    This layout demonstrates a clean two-column presentation pattern with a bold title and
    description on the left, and a data visualization (chart or table) on the right. This pattern
    is ideal for presenting data insights, trends, or comparisons with context.
  </p>

  <h2>Live Demo</h2>
  <p>
    The slide below showcases how to combine descriptive text with visual data. The left side
    provides context and explanation, while the right side presents the data in an easy-to-digest
    visual format using ApexCharts.
  </p>

  <div class="not-prose mb-12">
    <CardContainer aspectRatio="16/9" bordered={true}>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 h-full p-8 lg:p-16">
        <!-- Left Column: Title and Description -->
        <div class="flex flex-col justify-center space-y-6 lg:space-y-8">
          <h2
            class="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent"
          >
            Data Table or Chart
          </h2>
          <p class="text-xl lg:text-2xl text-blue-700 leading-relaxed font-medium">
            Present structured information in a flexible table or visualize it with a chart.
          </p>
        </div>

        <!-- Right Column: Chart -->
        <div class="flex items-center justify-center">
          <div class="w-full h-full min-h-[300px] lg:min-h-[400px]">
            <div bind:this={chartContainer} class="w-full h-full"></div>
          </div>
        </div>
      </div>
    </CardContainer>
  </div>

  <h2>Features</h2>
  <ul>
    <li>
      <strong>ApexCharts Integration:</strong> Modern, interactive charts with smooth animations
    </li>
    <li><strong>Responsive Layout:</strong> Two-column on desktop, stacks on mobile</li>
    <li>
      <strong>Theme-Aware:</strong> Uses SlideyUI's color system with blue gradient accent
    </li>
    <li>
      <strong>Flexible Content:</strong> Left side for context, right side for data visualization
    </li>
    <li><strong>Clean Typography:</strong> Large, readable fonts optimized for presentations</li>
    <li><strong>Professional Design:</strong> Minimal distractions, focus on the data</li>
    <li>
      <strong>16:9 Aspect Ratio:</strong> Perfect for presentation slides and large displays
    </li>
  </ul>

  <h2>Use Cases</h2>
  <p>This layout pattern works exceptionally well for:</p>
  <ul>
    <li><strong>Quarterly Reports:</strong> Show revenue trends with context</li>
    <li><strong>Performance Metrics:</strong> Visualize KPIs alongside explanations</li>
    <li><strong>Data Analysis:</strong> Present findings with supporting narrative</li>
    <li><strong>Comparative Studies:</strong> Display data comparisons with interpretation</li>
    <li><strong>Research Presentations:</strong> Combine methodology descriptions with results</li>
    <li><strong>Business Reviews:</strong> Pair strategic insights with supporting data</li>
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
      series: [{
        name: 'value',
        data: [
          { x: 'A', y: 65 },
          { x: 'B', y: 42 },
          { x: 'C', y: 75 },
          { x: 'D', y: 30 }
        ]
      }],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      colors: ['#3b82f6']
      // ... more options
    };

    const chart = new ApexCharts(chartContainer, options);
    chart.render();

    return () => chart.destroy();
  });
</script>

<CardContainer aspectRatio="16/9" bordered={true}>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full p-16">
    <!-- Left: Title and Description -->
    <div class="flex flex-col justify-center space-y-8">
      <h2 class="text-7xl font-bold bg-gradient-to-r from-blue-600
                 to-blue-800 bg-clip-text text-transparent">
        Data Table or Chart
      </h2>
      <p class="text-2xl text-blue-700 font-medium">
        Present structured information in a flexible table
        or visualize it with a chart.
      </p>
    </div>

    <!-- Right: Chart -->
    <div class="flex items-center justify-center">
      <div bind:this={chartContainer} class="w-full h-full min-h-[400px]"></div>
    </div>
  </div>
</CardContainer>`}</code></pre>

  <h2>React Implementation</h2>
  <pre><code>{`import { CardContainer } from '@slideyui/react';
import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

export default function ChartWithDescription() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const options = {
      chart: {
        type: 'line',
        height: '100%',
        toolbar: { show: false }
      },
      series: [{
        name: 'value',
        data: [
          { x: 'A', y: 65 },
          { x: 'B', y: 42 },
          { x: 'C', y: 75 },
          { x: 'D', y: 30 }
        ]
      }],
      stroke: {
        curve: 'smooth',
        width: 3
      },
      markers: {
        size: 6,
        colors: ['#3b82f6']
      },
      colors: ['#3b82f6']
      // ... more options
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <CardContainer aspectRatio="16/9" bordered>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 h-full p-16">
        {/* Left: Title and Description */}
        <div className="flex flex-col justify-center space-y-8">
          <h2 className="text-7xl font-bold bg-gradient-to-r from-blue-600
                         to-blue-800 bg-clip-text text-transparent">
            Data Table or Chart
          </h2>
          <p className="text-2xl text-blue-700 font-medium">
            Present structured information in a flexible table
            or visualize it with a chart.
          </p>
        </div>

        {/* Right: Chart */}
        <div className="flex items-center justify-center">
          <div ref={chartRef} className="w-full h-full min-h-[400px]" />
        </div>
      </div>
    </CardContainer>
  );
}`}</code></pre>

  <h2>Chart Types Supported</h2>
  <p>ApexCharts supports many chart types. Simply change the <code>type</code> property:</p>
  <ul>
    <li><strong>Line Charts:</strong> <code>type: 'line'</code> - Show trends over time</li>
    <li><strong>Bar Charts:</strong> <code>type: 'bar'</code> - Compare categories</li>
    <li><strong>Area Charts:</strong> <code>type: 'area'</code> - Emphasize magnitude</li>
    <li><strong>Pie Charts:</strong> <code>type: 'pie'</code> - Show proportions</li>
    <li><strong>Donut Charts:</strong> <code>type: 'donut'</code> - Modern pie alternative</li>
    <li>
      <strong>Scatter Plots:</strong> <code>type: 'scatter'</code> - Show correlations
    </li>
    <li>
      <strong>Radar Charts:</strong> <code>type: 'radar'</code> - Multi-dimensional comparisons
    </li>
  </ul>

  <h2>Customization Tips</h2>
  <ul>
    <li>
      <strong>Change colors:</strong> Modify the <code>colors</code> array to match your theme
    </li>
    <li>
      <strong>Adjust spacing:</strong> Change <code>gap-16</code> and <code>p-16</code> for different layouts
    </li>
    <li>
      <strong>Font sizes:</strong> Modify <code>text-7xl</code> and <code>text-2xl</code> for emphasis
    </li>
    <li>
      <strong>Chart style:</strong> Use <code>stroke.curve</code> options: 'smooth', 'straight', 'stepline'
    </li>
    <li>
      <strong>Grid patterns:</strong> Adjust <code>grid.strokeDashArray</code> for different line styles
    </li>
    <li>
      <strong>Gradient text:</strong> The title uses a gradient effect with <code>bg-gradient-to-r</code>
    </li>
  </ul>

  <h2>Table Alternative</h2>
  <p>
    You can also use a table instead of a chart on the right side. Here's an example using DaisyUI's
    table component:
  </p>
  <pre><code>{`<div class="flex items-center justify-center">
  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th class="text-lg">Category</th>
        <th class="text-lg">Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="text-xl">A</td>
        <td class="text-xl font-bold">65</td>
      </tr>
      <tr>
        <td class="text-xl">B</td>
        <td class="text-xl font-bold">42</td>
      </tr>
      <tr>
        <td class="text-xl">C</td>
        <td class="text-xl font-bold">75</td>
      </tr>
      <tr>
        <td class="text-xl">D</td>
        <td class="text-xl font-bold">30</td>
      </tr>
    </tbody>
  </table>
</div>`}</code></pre>

  <h2>Installation</h2>
  <p>To use ApexCharts in your project, install it via npm:</p>
  <pre><code>npm install apexcharts</code></pre>

  <h2>Responsive Behavior</h2>
  <p>
    On mobile devices (below 1024px), the layout automatically stacks into a single column. The
    title and description appear above the chart, ensuring readability on all screen sizes.
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
      <strong>Pro Tip:</strong> For static presentations, consider exporting the chart as an SVG or
      PNG to ensure consistent rendering across all devices and PDF exports.
    </div>
  </div>
</div>
