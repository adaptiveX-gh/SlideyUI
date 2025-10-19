<script lang="ts">
  import { ContentCard, CardGrid } from '@slideyui/svelte';
  import CodeBlock from '$lib/components/CodeBlock.svelte';
  import { browser } from '$app/environment';

  let ApexCharts = $state<typeof import('apexcharts').default | null>(null);

  // Chart references
  let basicLineChartEl: HTMLElement;
  let multiLineChartEl: HTMLElement;
  let steppedLineChartEl: HTMLElement;
  let dataLabelsLineChartEl: HTMLElement;
  let gradientLineChartEl: HTMLElement;
  let dashedLineChartEl: HTMLElement;

  // Chart instances
  let basicLineChart: ApexCharts | null = null;
  let multiLineChart: ApexCharts | null = null;
  let steppedLineChart: ApexCharts | null = null;
  let dataLabelsLineChart: ApexCharts | null = null;
  let gradientLineChart: ApexCharts | null = null;
  let dashedLineChart: ApexCharts | null = null;

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

    // Initialize Basic Line Chart
    if (basicLineChartEl && !basicLineChart) {
      const basicOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'Revenue',
          data: [31, 40, 28, 51, 42, 82, 56, 71, 96, 110, 125, 140]
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'line' as const,
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth' as const,
          width: 3
        },
        title: {
          text: 'Revenue Growth',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Monthly performance trajectory',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          type: 'category' as const
        },
        yaxis: {
          ...getThemeOptions().yaxis,
          opposite: false,
          labels: {
            formatter: (val: number) => `$${val}K`
          }
        },
        colors: ['#3b82f6']
      };

      basicLineChart = new ApexCharts(basicLineChartEl, basicOptions);
      basicLineChart.render();
    }

    // Initialize Multi-Line Chart
    if (multiLineChartEl && !multiLineChart) {
      const multiOptions = {
        ...getThemeOptions(),
        series: [
          {
            name: 'Product A',
            data: [44, 55, 41, 67, 22, 43, 38, 52, 64, 73, 58, 71]
          },
          {
            name: 'Product B',
            data: [13, 23, 20, 8, 13, 27, 33, 42, 31, 45, 52, 58]
          },
          {
            name: 'Product C',
            data: [11, 17, 15, 15, 21, 14, 25, 28, 35, 38, 42, 47]
          }
        ],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'line' as const,
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth' as const,
          width: 3
        },
        title: {
          text: 'Product Sales Comparison',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Multi-series trend analysis',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        markers: {
          size: 5,
          hover: {
            size: 7
          }
        },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      };

      multiLineChart = new ApexCharts(multiLineChartEl, multiOptions);
      multiLineChart.render();
    }

    // Initialize Stepped Line Chart
    if (steppedLineChartEl && !steppedLineChart) {
      const steppedOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'Service Level',
          data: [34, 34, 44, 44, 54, 54, 58, 58, 62, 62, 68, 68]
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'line' as const
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'stepline' as const,
          width: 3
        },
        title: {
          text: 'Service Level Agreement',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Stepped line for discrete changes',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
          ...getThemeOptions().yaxis,
          labels: {
            formatter: (val: number) => `${val}%`
          }
        },
        colors: ['#8b5cf6']
      };

      steppedLineChart = new ApexCharts(steppedLineChartEl, steppedOptions);
      steppedLineChart.render();
    }

    // Initialize Data Labels Line Chart
    if (dataLabelsLineChartEl && !dataLabelsLineChart) {
      const dataLabelsOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'Growth Rate',
          data: [2.3, 3.1, 4.5, 5.2, 6.8, 7.5, 8.2, 9.1, 10.5, 11.2, 12.8, 14.3]
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'line' as const
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '12px',
            fontWeight: 600
          },
          background: {
            enabled: true,
            borderRadius: 4,
            padding: 4,
            opacity: 0.9,
            foreColor: isDarkMode ? '#1f2937' : '#ffffff',
            borderColor: isDarkMode ? '#3b82f6' : '#3b82f6'
          },
          formatter: (val: number) => `${val.toFixed(1)}%`
        },
        stroke: {
          curve: 'smooth' as const,
          width: 3
        },
        title: {
          text: 'Year-over-Year Growth',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'With data label annotations',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        markers: {
          size: 6,
          colors: ['#3b82f6'],
          strokeColors: isDarkMode ? '#1f2937' : '#ffffff',
          strokeWidth: 2
        },
        colors: ['#3b82f6']
      };

      dataLabelsLineChart = new ApexCharts(dataLabelsLineChartEl, dataLabelsOptions);
      dataLabelsLineChart.render();
    }

    // Initialize Gradient Line Chart
    if (gradientLineChartEl && !gradientLineChart) {
      const gradientOptions = {
        ...getThemeOptions(),
        series: [{
          name: 'User Engagement',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 142, 165, 189]
        }],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'line' as const,
          zoom: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth' as const,
          width: 4,
          colors: ['url(#gradient)']
        },
        title: {
          text: 'User Engagement Metrics',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Gradient stroke visualization',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yaxis: {
          ...getThemeOptions().yaxis,
          labels: {
            formatter: (val: number) => `${val}K`
          }
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            gradientToColors: ['#10b981'],
            shadeIntensity: 1,
            type: 'horizontal',
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100, 100]
          }
        },
        colors: ['#3b82f6'],
        markers: {
          size: 6,
          colors: ['#3b82f6'],
          strokeColors: isDarkMode ? '#1f2937' : '#ffffff',
          strokeWidth: 2,
          hover: {
            size: 8
          }
        }
      };

      gradientLineChart = new ApexCharts(gradientLineChartEl, gradientOptions);
      gradientLineChart.render();
    }

    // Initialize Dashed Line Chart
    if (dashedLineChartEl && !dashedLineChart) {
      const dashedOptions = {
        ...getThemeOptions(),
        series: [
          {
            name: 'Actual',
            data: [44, 55, 41, 67, 22, 43, 38, 52, 64, 73, 58, 71]
          },
          {
            name: 'Forecast',
            data: [null, null, null, null, null, null, null, null, 64, 78, 85, 92]
          }
        ],
        chart: {
          ...getThemeOptions().chart,
          height: 350,
          type: 'line' as const
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth' as const,
          width: [3, 3],
          dashArray: [0, 8]
        },
        title: {
          text: 'Sales Forecast vs Actual',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        subtitle: {
          text: 'Dashed line for projected data',
          align: 'left' as const,
          style: {
            color: isDarkMode ? '#a6adbb' : '#373d3f'
          }
        },
        xaxis: {
          ...getThemeOptions().xaxis,
          type: 'category' as const,
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        markers: {
          size: 5,
          hover: {
            size: 7
          }
        },
        colors: ['#3b82f6', '#ef4444']
      };

      dashedLineChart = new ApexCharts(dashedLineChartEl, dashedOptions);
      dashedLineChart.render();
    }

    // Cleanup function
    return () => {
      basicLineChart?.destroy();
      multiLineChart?.destroy();
      steppedLineChart?.destroy();
      dataLabelsLineChart?.destroy();
      gradientLineChart?.destroy();
      dashedLineChart?.destroy();

      basicLineChart = null;
      multiLineChart = null;
      steppedLineChart = null;
      dataLabelsLineChart = null;
      gradientLineChart = null;
      dashedLineChart = null;
    };
  });

  // Code examples
  const basicLineCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [{
    name: 'Revenue',
    data: [31, 40, 28, 51, 42, 82, 56, 71, 96, 110, 125, 140]
  }],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: true
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  title: {
    text: 'Revenue Growth',
    align: 'left'
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yaxis: {
    labels: {
      formatter: (val) => \`$\${val}K\`
    }
  },
  colors: ['#3b82f6']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const multiLineCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [
    {
      name: 'Product A',
      data: [44, 55, 41, 67, 22, 43, 38, 52, 64, 73, 58, 71]
    },
    {
      name: 'Product B',
      data: [13, 23, 20, 8, 13, 27, 33, 42, 31, 45, 52, 58]
    },
    {
      name: 'Product C',
      data: [11, 17, 15, 15, 21, 14, 25, 28, 35, 38, 42, 47]
    }
  ],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: true
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 5,
    hover: {
      size: 7
    }
  },
  colors: ['#3b82f6', '#10b981', '#f59e0b']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const steppedLineCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [{
    name: 'Service Level',
    data: [34, 34, 44, 44, 54, 54, 58, 58, 62, 62, 68, 68]
  }],
  chart: {
    height: 350,
    type: 'line'
  },
  stroke: {
    curve: 'stepline', // Creates stepped line effect
    width: 3
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  },
  yaxis: {
    labels: {
      formatter: (val) => \`\${val}%\`
    }
  },
  colors: ['#8b5cf6']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const dataLabelsLineCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [{
    name: 'Growth Rate',
    data: [2.3, 3.1, 4.5, 5.2, 6.8, 7.5, 8.2, 9.1, 10.5, 11.2, 12.8, 14.3]
  }],
  chart: {
    height: 350,
    type: 'line'
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '12px',
      fontWeight: 600
    },
    background: {
      enabled: true,
      borderRadius: 4,
      padding: 4,
      opacity: 0.9
    },
    formatter: (val) => \`\${val.toFixed(1)}%\`
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  markers: {
    size: 6,
    colors: ['#3b82f6'],
    strokeWidth: 2
  },
  colors: ['#3b82f6']
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const gradientLineCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [{
    name: 'User Engagement',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 142, 165, 189]
  }],
  chart: {
    height: 350,
    type: 'line',
    zoom: {
      enabled: true
    }
  },
  stroke: {
    curve: 'smooth',
    width: 4
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      gradientToColors: ['#10b981'],
      shadeIntensity: 1,
      type: 'horizontal',
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100, 100]
    }
  },
  colors: ['#3b82f6'],
  markers: {
    size: 6,
    hover: {
      size: 8
    }
  },
  yaxis: {
    labels: {
      formatter: (val) => \`\${val}K\`
    }
  }
};

const chart = new ApexCharts(document.querySelector('#chart'), options);
chart.render();`;

  const dashedLineCode = `import ApexCharts from 'apexcharts';

const options = {
  series: [
    {
      name: 'Actual',
      data: [44, 55, 41, 67, 22, 43, 38, 52, 64, 73, 58, 71]
    },
    {
      name: 'Forecast',
      data: [null, null, null, null, null, null, null, null, 64, 78, 85, 92]
    }
  ],
  chart: {
    height: 350,
    type: 'line'
  },
  stroke: {
    curve: 'smooth',
    width: [3, 3],
    dashArray: [0, 8] // First line solid, second dashed
  },
  markers: {
    size: 5
  },
  colors: ['#3b82f6', '#ef4444']
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
          type: 'line'
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
<\/script>

<ContentCard title="Sales Trend" aspectRatio="16/9">
  <div bind:this={chartEl}></div>
</ContentCard>`;
</script>

<svelte:head>
  <title>Line Charts - SlideyUI Components</title>
</svelte:head>

<div class="prose max-w-none">
  <h1>Line Charts</h1>
  <p class="lead text-xl text-base-content/80 my-6">
    Line charts visualize trends, patterns, and changes over time. Perfect for showing growth trajectories,
    comparative analysis, and continuous data in presentations. Built with ApexCharts for interactive,
    theme-aware visualizations optimized for projection.
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

  <!-- Basic Line Chart -->
  <div class="not-prose my-8">
    <ContentCard
      title="Basic Line Chart"
      subtitle="Simple single-series line chart with smooth curves"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={basicLineChartEl} class="w-full"></div>

      <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
        <p class="text-sm text-base-content/70">
          Use basic line charts for single-metric trends over time. Smooth curves create an elegant visualization.
        </p>
      </div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <CodeBlock code={basicLineCode} lang="javascript" />
    </div>
  </details>

  <!-- Multi-Line Chart -->
  <div class="not-prose my-8">
    <ContentCard
      title="Multi-Line Chart"
      subtitle="Compare multiple data series on the same axis"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={multiLineChartEl} class="w-full"></div>

      <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
        <p class="text-sm text-base-content/70">
          Perfect for comparing trends across products, regions, or time periods. Keep to 3-4 series maximum.
        </p>
      </div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <CodeBlock code={multiLineCode} lang="javascript" />
    </div>
  </details>

  <!-- 2-Column Grid Layout -->
  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <!-- Stepped Line Chart -->
      <ContentCard
        title="Stepped Line Chart"
        subtitle="Discrete value changes with stepline curve"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={steppedLineChartEl} class="w-full"></div>

        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm text-base-content/70">
            Stepped lines show abrupt changes. Ideal for pricing tiers or service levels.
          </p>
        </div>
      </ContentCard>

      <!-- Data Labels Line Chart -->
      <ContentCard
        title="Line Chart with Data Labels"
        subtitle="Display exact values on data points"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={dataLabelsLineChartEl} class="w-full"></div>

        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm text-base-content/70">
            Enable data labels when exact values are critical. Use sparingly to avoid clutter.
          </p>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-medium">Stepped Line Code</summary>
      <div class="collapse-content">
        <CodeBlock code={steppedLineCode} lang="javascript" />
      </div>
    </details>

    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-medium">Data Labels Code</summary>
      <div class="collapse-content">
        <CodeBlock code={dataLabelsLineCode} lang="javascript" />
      </div>
    </details>
  </div>

  <!-- Second 2-Column Grid -->
  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <!-- Gradient Line Chart -->
      <ContentCard
        title="Gradient Line Chart"
        subtitle="Visual polish with gradient stroke colors"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={gradientLineChartEl} class="w-full"></div>

        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm text-base-content/70">
            Add visual interest with gradient strokes. Great for highlighting positive trends.
          </p>
        </div>
      </ContentCard>

      <!-- Dashed Line Chart -->
      <ContentCard
        title="Dashed Line Chart"
        subtitle="Differentiate actual vs projected data"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={dashedLineChartEl} class="w-full"></div>

        <div slot="footer" class="mt-4 pt-4 border-t border-base-300">
          <p class="text-sm text-base-content/70">
            Use dashed lines for forecasts or projections to distinguish from historical data.
          </p>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-medium">Gradient Line Code</summary>
      <div class="collapse-content">
        <CodeBlock code={gradientLineCode} lang="javascript" />
      </div>
    </details>

    <details class="collapse collapse-arrow bg-base-200">
      <summary class="collapse-title font-medium">Dashed Line Code</summary>
      <div class="collapse-content">
        <CodeBlock code={dashedLineCode} lang="javascript" />
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
          <td>Controls line smoothness and shape</td>
        </tr>
        <tr>
          <td><code class="text-sm">stroke.width</code></td>
          <td><code class="text-sm">number</code></td>
          <td>Line thickness (3-4 recommended for presentations)</td>
        </tr>
        <tr>
          <td><code class="text-sm">stroke.dashArray</code></td>
          <td><code class="text-sm">number | number[]</code></td>
          <td>Creates dashed lines. 0 for solid, 8 for dashed</td>
        </tr>
        <tr>
          <td><code class="text-sm">markers.size</code></td>
          <td><code class="text-sm">number</code></td>
          <td>Size of data point markers (5-6 recommended)</td>
        </tr>
        <tr>
          <td><code class="text-sm">chart.zoom.enabled</code></td>
          <td><code class="text-sm">boolean</code></td>
          <td>Enable click-and-drag zoom functionality</td>
        </tr>
        <tr>
          <td><code class="text-sm">dataLabels.enabled</code></td>
          <td><code class="text-sm">boolean</code></td>
          <td>Show/hide value labels on data points</td>
        </tr>
        <tr>
          <td><code class="text-sm">colors</code></td>
          <td><code class="text-sm">string[]</code></td>
          <td>Array of colors for series</td>
        </tr>
        <tr>
          <td><code class="text-sm">fill.type</code></td>
          <td><code class="text-sm">'solid' | 'gradient'</code></td>
          <td>Line color fill type</td>
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
          <li>Use line charts for trends over time or continuous data</li>
          <li>Keep line width 3-4px for projection visibility</li>
          <li>Use smooth curves for natural data patterns</li>
          <li>Enable zoom for detailed data exploration</li>
          <li>Limit multi-line charts to 3-4 series maximum</li>
          <li>Use dashed lines to differentiate forecast from actual</li>
          <li>Add markers to highlight individual data points</li>
          <li>Use consistent colors within a presentation</li>
        </ul>
      </div>
    </div>

    <div class="card bg-error/10 border border-error">
      <div class="card-body">
        <h3 class="card-title text-error">Don't</h3>
        <ul class="space-y-2">
          <li>Use line charts for discrete categories (use bar charts)</li>
          <li>Overlap too many series (reduces clarity)</li>
          <li>Use very thin lines (hard to see from distance)</li>
          <li>Mix different curve types in one chart</li>
          <li>Use similar colors for different series</li>
          <li>Show data labels on every point (clutters the chart)</li>
          <li>Forget to label axes appropriately</li>
          <li>Use default colors without considering theme</li>
        </ul>
      </div>
    </div>
  </div>

  <h2>Common Use Cases</h2>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-8 not-prose">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Growth Trends</h3>
        <p class="text-sm">Track revenue, users, or KPIs over time. Perfect for investor presentations.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Performance Metrics</h3>
        <p class="text-sm">Show system performance, load times, or operational metrics over periods.</p>
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
        <h3 class="card-title text-lg">Forecasting</h3>
        <p class="text-sm">Show historical data alongside projections using dashed lines.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Market Trends</h3>
        <p class="text-sm">Visualize stock prices, market share, or competitive positioning.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Progress Tracking</h3>
        <p class="text-sm">Monitor project milestones, sprint velocity, or goal completion.</p>
      </div>
    </div>
  </div>

  <h2>Line Chart Variants</h2>

  <div class="overflow-x-auto my-6">
    <table class="table">
      <thead>
        <tr>
          <th>Variant</th>
          <th>Best For</th>
          <th>Key Configuration</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Basic Line</strong></td>
          <td>Single metric trends, simple time series</td>
          <td><code>stroke.curve: 'smooth'</code></td>
        </tr>
        <tr>
          <td><strong>Multi-Line</strong></td>
          <td>Comparing multiple series, competitive analysis</td>
          <td>Multiple series with distinct colors</td>
        </tr>
        <tr>
          <td><strong>Stepped Line</strong></td>
          <td>Discrete changes, pricing tiers, service levels</td>
          <td><code>stroke.curve: 'stepline'</code></td>
        </tr>
        <tr>
          <td><strong>With Data Labels</strong></td>
          <td>Exact values matter, key metrics to emphasize</td>
          <td><code>dataLabels.enabled: true</code></td>
        </tr>
        <tr>
          <td><strong>Gradient Line</strong></td>
          <td>Visual polish, highlighting growth</td>
          <td><code>fill.type: 'gradient'</code></td>
        </tr>
        <tr>
          <td><strong>Dashed Line</strong></td>
          <td>Forecasts vs actuals, projected data</td>
          <td><code>stroke.dashArray: [0, 8]</code></td>
        </tr>
      </tbody>
    </table>
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
    <li>Interactive markers for data point identification</li>
  </ul>

  <div class="alert alert-warning my-6">
    <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <div>
      <h4 class="font-bold">Color Blindness Consideration</h4>
      <p class="text-sm">Use distinct line styles (solid vs dashed) or markers in addition to colors for color-blind accessibility.</p>
    </div>
  </div>

  <h2>Performance Tips</h2>

  <ul class="my-4">
    <li><strong>Limit data points:</strong> For presentations, 50-150 points per series is usually sufficient</li>
    <li><strong>Destroy charts:</strong> Always destroy chart instances in cleanup functions</li>
    <li><strong>Lazy loading:</strong> Load ApexCharts only when charts are visible</li>
    <li><strong>Simplify animations:</strong> Reduce animation duration for faster renders</li>
    <li><strong>Use responsive sizing:</strong> Let charts resize naturally within containers</li>
    <li><strong>Optimize markers:</strong> Reduce marker size or hide them for dense datasets</li>
  </ul>

  <h2>Presentation Tips</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 not-prose">
    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Tell a Story</h3>
        <p class="text-sm">Use line charts to show progression, improvement, or trends. The visual trajectory naturally guides the narrative.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Highlight Key Points</h3>
        <p class="text-sm">Use markers or data labels on critical data points to draw attention to specific achievements or events.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Color for Meaning</h3>
        <p class="text-sm">Use green gradients for positive growth, red for declines, blue for neutral trends. Consistent color language helps comprehension.</p>
      </div>
    </div>

    <div class="card bg-base-200">
      <div class="card-body">
        <h3 class="card-title text-lg">Simplify Complex Data</h3>
        <p class="text-sm">For multi-line charts, use a clear legend and limit to 3-4 series. Too many lines create visual noise.</p>
      </div>
    </div>
  </div>

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
    <a href="/docs/components/charts" class="btn btn-primary">
      All Chart Types
    </a>
  </div>
</div>
