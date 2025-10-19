<script lang="ts">
  import { ContentCard, CardGrid } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import { browser } from '$app/environment';

  let ApexCharts = $state<typeof import('apexcharts').default | null>(null);

  // Chart references
  let basicAreaChartEl: HTMLElement;
  let splineAreaChartEl: HTMLElement;
  let datetimeAreaChartEl: HTMLElement;
  let negativeAreaChartEl: HTMLElement;

  // Chart instances
  let basicAreaChart: ApexCharts | null = null;
  let splineAreaChart: ApexCharts | null = null;
  let datetimeAreaChart: ApexCharts | null = null;
  let negativeAreaChart: ApexCharts | null = null;

  // Theme detection
  let isDarkMode = $state(false);

  // Load ApexCharts dynamically and initialize charts
  $effect(() => {
    if (!browser) return;

    // Load ApexCharts if not already loaded
    if (!ApexCharts) {
      import('apexcharts').then(module => {
        ApexCharts = module.default;
      });
      return; // Exit early, effect will re-run when ApexCharts becomes reactive
    }

    // Now ApexCharts is loaded, initialize charts

    // Detect theme
    const theme = document.documentElement.getAttribute('data-theme');
    isDarkMode = theme === 'dark' || theme?.includes('dark') || false;

    // Common theme-aware options
    const getThemeOptions = () => ({
      chart: {
        background: 'transparent',
        foreColor: isDarkMode ? '#a6adbb' : '#373d3f',
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        }
      },
      grid: {
        borderColor: isDarkMode ? '#2d3748' : '#e2e8f0'
      },
      xaxis: {
        labels: {
          style: {
            colors: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        }
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light'
      },
      legend: {
        labels: {
          colors: isDarkMode ? '#a6adbb' : '#373d3f'
        }
      }
    });

    // Initialize Basic Area Chart
    if (basicAreaChartEl && !basicAreaChart) {
      const basicOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'Revenue',
          data: [31000, 40000, 28000, 51000, 42000, 82000, 56000, 71000, 96000]
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'area' as const,
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight' as const,
          width: 2
        },
        title: {
          text: 'Revenue Growth',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Monthly Performance',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const
        },
        yaxis: {
          ...getThemeOptions().yaxis,
          opposite: false,
          labels: {
            formatter: (val: number) => `$${(val / 1000).toFixed(0)}K`
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 90, 100]
          }
        },
        colors: ['#3b82f6']
      };

      basicAreaChart = new ApexCharts(basicAreaChartEl, basicOptions);
      basicAreaChart.render();
    }

    // Initialize Spline Area Chart
    if (splineAreaChartEl && !splineAreaChart) {
      const splineOptions = {
        ...getThemeOptions(),
        series: [
          {
            name: 'Product A',
            data: [44, 55, 41, 67, 22, 43, 21, 41, 56]
          },
          {
            name: 'Product B',
            data: [13, 23, 20, 8, 13, 27, 33, 12, 31]
          },
          {
            name: 'Product C',
            data: [11, 17, 15, 15, 21, 14, 15, 13, 18]
          }
        ],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'area' as const
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth' as const,
          width: 2
        },
        title: {
          text: 'Product Sales Comparison',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Multi-series with smooth curves',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 90, 100]
          }
        },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      };

      splineAreaChart = new ApexCharts(splineAreaChartEl, splineOptions);
      splineAreaChart.render();
    }

    // Initialize Datetime Area Chart
    if (datetimeAreaChartEl && !datetimeAreaChart) {
      // Generate datetime data
      const generateDayWiseTimeSeries = (baseval: number, count: number, yrange: { min: number; max: number }) => {
        let i = 0;
        const series = [];
        while (i < count) {
          const x = baseval;
          const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
          series.push([x, y]);
          baseval += 86400000; // 1 day in milliseconds
          i++;
        }
        return series;
      };

      const datetimeOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'Active Users',
          data: generateDayWiseTimeSeries(new Date('11 Feb 2024').getTime(), 90, { min: 10000, max: 60000 })
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'area' as const,
          zoom: {
            autoScaleYaxis: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth' as const,
          width: 2
        },
        title: {
          text: 'Active Users Over Time',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Time-series data with date axis',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'datetime' as const
        },
        yaxis: {
          ...getThemeOptions().yaxis,
          labels: {
            formatter: (val: number) => `${(val / 1000).toFixed(0)}K`
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.5,
            opacityTo: 0.2,
            stops: [0, 100]
          }
        },
        colors: ['#8b5cf6']
      };

      datetimeAreaChart = new ApexCharts(datetimeAreaChartEl, datetimeOptions);
      datetimeAreaChart.render();
    }

    // Initialize Negative Values Area Chart
    if (negativeAreaChartEl && !negativeAreaChart) {
      const negativeOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'Profit/Loss',
          data: [12, -18, 24, -32, 15, 28, -45, 35, 48, -12, 25, 38]
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'area' as const
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight' as const,
          width: 2
        },
        title: {
          text: 'Quarterly Profit/Loss',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Handling positive and negative values',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Q1-Jan', 'Q1-Feb', 'Q1-Mar', 'Q2-Apr', 'Q2-May', 'Q2-Jun', 'Q3-Jul', 'Q3-Aug', 'Q3-Sep', 'Q4-Oct', 'Q4-Nov', 'Q4-Dec']
        },
        yaxis: {
          ...getThemeOptions().yaxis,
          labels: {
            formatter: (val: number) => `$${val}M`
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.6,
            opacityTo: 0.2,
            stops: [0, 100]
          }
        },
        colors: ['#ef4444']
      };

      negativeAreaChart = new ApexCharts(negativeAreaChartEl, negativeOptions);
      negativeAreaChart.render();
    }

    // Cleanup function
    return () => {
      basicAreaChart?.destroy();
      splineAreaChart?.destroy();
      datetimeAreaChart?.destroy();
      negativeAreaChart?.destroy();

      basicAreaChart = null;
      splineAreaChart = null;
      datetimeAreaChart = null;
      negativeAreaChart = null;
    };
  });

  // Code examples
  const basicAreaCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [{
    name: 'Revenue',
    data: [31000, 40000, 28000, 51000, 42000, 82000, 56000, 71000, 96000]
  }],
  chart: {
    height: 350,
    type: 'area',
    zoom: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  title: {
    text: 'Revenue Growth',
    align: 'left'
  },
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
  yaxis: {
    labels: {
      formatter: (val) => \`$\${(val / 1000).toFixed(0)}K\`
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.3,
      stops: [0, 90, 100]
    }
  },
  colors: ['#3b82f6']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const splineAreaCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [
    {
      name: 'Product A',
      data: [44, 55, 41, 67, 22, 43, 21, 41, 56]
    },
    {
      name: 'Product B',
      data: [13, 23, 20, 8, 13, 27, 33, 12, 31]
    },
    {
      name: 'Product C',
      data: [11, 17, 15, 15, 21, 14, 15, 13, 18]
    }
  ],
  chart: {
    height: 350,
    type: 'area'
  },
  stroke: {
    curve: 'smooth', // Creates spline/smooth curves
    width: 2
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.1,
      stops: [0, 90, 100]
    }
  },
  colors: ['#3b82f6', '#10b981', '#f59e0b']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const datetimeAreaCode = `import ApexCharts from 'apexcharts';

// Generate time-series data
const generateTimeSeries = (baseval, count, yrange) => {
  let i = 0;
  const series = [];
  while (i < count) {
    const x = baseval;
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
    series.push([x, y]);
    baseval += 86400000; // 1 day in milliseconds
    i++;
  }
  return series;
};

const options = {
  series: [{
    name: 'Active Users',
    data: generateTimeSeries(new Date('11 Feb 2024').getTime(), 90, { min: 10000, max: 60000 })
  }],
  chart: {
    height: 350,
    type: 'area',
    zoom: {
      autoScaleYaxis: true
    }
  },
  xaxis: {
    type: 'datetime' // Enables datetime formatting
  },
  yaxis: {
    labels: {
      formatter: (val) => \`\${(val / 1000).toFixed(0)}K\`
    }
  },
  colors: ['#8b5cf6']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const negativeAreaCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [{
    name: 'Profit/Loss',
    data: [12, -18, 24, -32, 15, 28, -45, 35, 48, -12, 25, 38]
  }],
  chart: {
    height: 350,
    type: 'area'
  },
  stroke: {
    curve: 'straight',
    width: 2
  },
  xaxis: {
    categories: ['Q1-Jan', 'Q1-Feb', 'Q1-Mar', 'Q2-Apr', 'Q2-May', 'Q2-Jun',
                 'Q3-Jul', 'Q3-Aug', 'Q3-Sep', 'Q4-Oct', 'Q4-Nov', 'Q4-Dec']
  },
  yaxis: {
    labels: {
      formatter: (val) => \`$\${val}M\`
    }
  },
  colors: ['#ef4444']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const svelteUsageCode = `<script lang="ts">
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
          type: 'area'
        },
        stroke: {
          curve: 'smooth'
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
<\/script>

<ContentCard title="Sales Overview" aspectRatio="16/9">
  <div bind:this={chartEl}></div>
</ContentCard>`;
</script>

<svelte:head>
  <title>Area Charts - SlideyUI Components</title>
</svelte:head>

<div class="prose max-w-none">
  <h1>Area Charts</h1>
  <p class="lead text-xl text-base-content/80 my-6">
    Area charts visualize quantitative data over continuous intervals or time periods. Perfect for showing trends,
    comparisons, and cumulative values in presentations. Built with ApexCharts for interactive, theme-aware visualizations.
  </p>

  <div class="alert alert-info my-6">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <h4 class="font-bold">Interactive Charts</h4>
      <p class="text-sm">All charts are interactive. Try zooming, panning, and hovering over data points to explore.</p>
    </div>
  </div>

  <h2>Chart Examples</h2>
  <p class="my-4">
    Click and drag to zoom, use toolbar buttons to reset, and hover over data points for details.
  </p>

  <!-- Basic Area Chart -->
  <div class="not-prose my-8">
    <ContentCard
      title="Basic Area Chart"
      subtitle="Simple single-series area chart with gradient fill"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={basicAreaChartEl} class="w-full"></div>

      <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
        <p class="text-sm text-base-content/70">
          Use basic area charts for single-metric trends. The gradient fill emphasizes the area under the curve.
        </p>
      </div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <CodeBlock code={basicAreaCode} lang="javascript" />
    </div>
  </details>

  <!-- Spline Area Chart -->
  <div class="not-prose my-8">
    <ContentCard
      title="Spline Area Chart"
      subtitle="Multi-series with smooth curves for comparison"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={splineAreaChartEl} class="w-full"></div>

      <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
        <p class="text-sm text-base-content/70">
          Smooth curves create a more organic feel. Perfect for comparing multiple data series in presentations.
        </p>
      </div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <CodeBlock code={splineAreaCode} lang="javascript" />
    </div>
  </details>

  <!-- 2-Column Grid Layout -->
  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <!-- Datetime Area Chart -->
      <ContentCard
        title="Datetime Area Chart"
        subtitle="Time-series data with automatic date formatting"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={datetimeAreaChartEl} class="w-full"></div>

        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm text-base-content/70">
            DateTime axis automatically formats dates. Ideal for time-series analytics.
          </p>
        </div>
      </ContentCard>

      <!-- Negative Values Area Chart -->
      <ContentCard
        title="Negative Values Area Chart"
        subtitle="Handle both positive and negative data points"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={negativeAreaChartEl} class="w-full"></div>

        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm text-base-content/70">
            Area charts can display negative values. Great for profit/loss or deviation charts.
          </p>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-medium">Datetime Chart Code</summary>
      <div class="collapse-content">
        <CodeBlock code={datetimeAreaCode} lang="javascript" />
      </div>
    </details>

    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-medium">Negative Values Chart Code</summary>
      <div class="collapse-content">
        <CodeBlock code={negativeAreaCode} lang="javascript" />
      </div>
    </details>
  </div>

  <h2>Using with SlideyUI Cards</h2>
  <p class="my-4">
    Wrap charts in ContentCard components for consistent presentation styling. Charts automatically adapt to the card's theme.
  </p>

  <CodeBlock code={svelteUsageCode} lang="svelte" />

  <h2>Chart Configuration Options</h2>

  <div class="overflow-x-auto my-6">
    <table class="table">
      <thead>
        <tr>
          <th>Option</th>
          <th>Type</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code class="text-sm">stroke.curve</code></td>
          <td><code class="text-sm">'straight' | 'smooth' | 'stepline'</code></td>
          <td>Controls line smoothness. Use 'smooth' for spline areas.</td>
        </tr>
        <tr>
          <td><code class="text-sm">fill.type</code></td>
          <td><code class="text-sm">'solid' | 'gradient' | 'pattern'</code></td>
          <td>Fill style for the area. Gradient is most common.</td>
        </tr>
        <tr>
          <td><code class="text-sm">xaxis.type</code></td>
          <td><code class="text-sm">'category' | 'datetime' | 'numeric'</code></td>
          <td>X-axis data type. Use 'datetime' for time-series.</td>
        </tr>
        <tr>
          <td><code class="text-sm">chart.zoom.enabled</code></td>
          <td><code class="text-sm">boolean</code></td>
          <td>Enable click-and-drag zoom functionality.</td>
        </tr>
        <tr>
          <td><code class="text-sm">dataLabels.enabled</code></td>
          <td><code class="text-sm">boolean</code></td>
          <td>Show/hide value labels on data points.</td>
        </tr>
        <tr>
          <td><code class="text-sm">colors</code></td>
          <td><code class="text-sm">string[]</code></td>
          <td>Array of colors for series. Uses theme colors by default.</td>
        </tr>
      </tbody>
    </table>
  </div>

  <h2>Theme Awareness</h2>
  <p class="my-4">
    Charts automatically adapt to light/dark themes. The examples above use theme-aware colors and adjust
    text colors, grid lines, and tooltips based on the active theme.
  </p>

  <div class="alert alert-success my-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <div>
      <h4 class="font-bold">Try switching themes!</h4>
      <p class="text-sm">Toggle between light and dark themes to see charts automatically adapt their styling.</p>
    </div>
  </div>

  <h2>Best Practices</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
    <div class="card bg-success/10 border border-success">
      <div class="card-body">
        <h3 class="card-title text-success">Do</h3>
        <ul class="space-y-2">
          <li>Use area charts for trends over time or continuous data</li>
          <li>Keep gradient fills subtle for readability</li>
          <li>Use smooth curves for natural data patterns</li>
          <li>Enable zoom for detailed data exploration</li>
          <li>Limit multi-series charts to 3-4 series maximum</li>
          <li>Format axis labels appropriately (K, M for large numbers)</li>
          <li>Use consistent colors within a presentation</li>
        </ul>
      </div>
    </div>

    <div class="card bg-error/10 border border-error">
      <div class="card-body">
        <h3 class="card-title text-error">Don't</h3>
        <ul class="space-y-2">
          <li>Use area charts for discrete categories (use bar charts)</li>
          <li>Overlap too many series (reduces clarity)</li>
          <li>Use very opaque fills (obscures overlapping data)</li>
          <li>Forget to label axes appropriately</li>
          <li>Use default colors without considering theme</li>
          <li>Show every data point label (clutters the chart)</li>
          <li>Mix different chart types unnecessarily</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Common Use Cases</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Revenue Trends</h3>
        <p class="text-sm">Track financial metrics over quarters or years. Perfect for investor presentations.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">User Growth</h3>
        <p class="text-sm">Show active users, signups, or engagement metrics over time.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Performance Metrics</h3>
        <p class="text-sm">Display system performance, load times, or operational metrics.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Comparative Analysis</h3>
        <p class="text-sm">Compare multiple products, regions, or segments side-by-side.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Seasonal Trends</h3>
        <p class="text-sm">Visualize patterns across seasons, months, or business cycles.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Forecasting</h3>
        <p class="text-sm">Show historical data alongside projections and predictions.</p>
      </div>
    </div>
  </div>

  <h2>Accessibility</h2>
  <p class="my-4">
    ApexCharts includes built-in accessibility features:
  </p>

  <ul class="my-4">
    <li>Keyboard navigation support</li>
    <li>Screen reader compatible tooltips</li>
    <li>High contrast mode support</li>
    <li>ARIA labels for chart elements</li>
    <li>Proper color contrast ratios</li>
  </ul>

  <div class="alert alert-warning my-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
      <h4 class="font-bold">Color Blindness Consideration</h4>
      <p class="text-sm">Use distinct colors and consider adding patterns or labels for color-blind accessibility.</p>
    </div>
  </div>

  <h2>Performance Tips</h2>

  <ul class="my-4">
    <li><strong>Limit data points:</strong> For presentations, 50-100 points per series is usually sufficient</li>
    <li><strong>Destroy charts:</strong> Always destroy chart instances in cleanup functions</li>
    <li><strong>Lazy loading:</strong> Load ApexCharts only when charts are visible</li>
    <li><strong>Simplify animations:</strong> Reduce animation duration for faster renders</li>
    <li><strong>Use responsive sizing:</strong> Let charts resize naturally within containers</li>
  </ul>

  <h2>Installation</h2>

  <p class="my-4">Install ApexCharts via npm:</p>

  <CodeBlock code="npm install apexcharts" lang="bash" />

  <p class="my-4">Import in your Svelte component:</p>

  <CodeBlock code="import ApexCharts from 'apexcharts';" lang="javascript" />

  <h2>Next Steps</h2>

  <div class="flex gap-4 my-8 flex-wrap">
    <a href="https://apexcharts.com/docs/options/chart/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
      ApexCharts Docs
    </a>
    <a href="/docs/components/cards" class="btn btn-outline">
      Card Components
    </a>
    <a href="/docs/examples" class="btn btn-primary">
      View Examples
    </a>
  </div>
</div>
