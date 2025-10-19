<script lang="ts">
  import { ContentCard, CardGrid } from '@slideyui/svelte';
  import { browser } from '$app/environment';

  let ApexCharts = $state<typeof import('apexcharts').default | null>(null);

  let basicBarChart: HTMLElement;
  let groupedBarChart: HTMLElement;
  let stackedBarChart: HTMLElement;
  let horizontalBarChart: HTMLElement;

  let basicChartInstance: ApexCharts | null = null;
  let groupedChartInstance: ApexCharts | null = null;
  let stackedChartInstance: ApexCharts | null = null;
  let horizontalChartInstance: ApexCharts | null = null;

  // Helper to get theme-aware colors
  function getThemeColors() {
    if (!browser) return { text: '#000', grid: '#e5e7eb', primary: '#3b82f6', secondary: '#8b5cf6', accent: '#f59e0b' };

    const isDark = document.documentElement.classList.contains('dark') ||
                   document.documentElement.getAttribute('data-theme')?.includes('dark');

    return {
      text: isDark ? '#e5e7eb' : '#374151',
      grid: isDark ? '#374151' : '#e5e7eb',
      primary: getComputedStyle(document.documentElement).getPropertyValue('--slidey-color-primary') || '#3b82f6',
      secondary: getComputedStyle(document.documentElement).getPropertyValue('--slidey-color-secondary') || '#8b5cf6',
      accent: getComputedStyle(document.documentElement).getPropertyValue('--slidey-color-accent') || '#f59e0b',
    };
  }

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

    const colors = getThemeColors();

    // Basic Bar Chart
    if (basicBarChart && !basicChartInstance) {
      const basicOptions = {
        series: [{
          name: 'Sales',
          data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
        }],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          foreColor: colors.text
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            columnWidth: '55%',
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: [colors.primary],
        xaxis: {
          categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Sales (thousands)',
            style: {
              color: colors.text,
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        grid: {
          borderColor: colors.grid
        },
        tooltip: {
          theme: 'dark'
        }
      };

      basicChartInstance = new ApexCharts(basicBarChart, basicOptions);
      basicChartInstance.render();
    }

    // Grouped Bar Chart
    if (groupedBarChart && !groupedChartInstance) {
      const groupedOptions = {
        series: [{
          name: 'Product A',
          data: [44, 55, 41, 67, 22, 43]
        }, {
          name: 'Product B',
          data: [13, 23, 20, 8, 13, 27]
        }, {
          name: 'Product C',
          data: [11, 17, 15, 15, 21, 14]
        }],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          foreColor: colors.text
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            borderRadius: 4,
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        colors: [colors.primary, colors.secondary, colors.accent],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Revenue (thousands)',
            style: {
              color: colors.text,
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        fill: {
          opacity: 1
        },
        grid: {
          borderColor: colors.grid
        },
        legend: {
          labels: {
            colors: colors.text
          }
        },
        tooltip: {
          theme: 'dark',
          y: {
            formatter: function (val: number) {
              return "$" + val + "k"
            }
          }
        }
      };

      groupedChartInstance = new ApexCharts(groupedBarChart, groupedOptions);
      groupedChartInstance.render();
    }

    // Stacked Bar Chart
    if (stackedBarChart && !stackedChartInstance) {
      const stackedOptions = {
        series: [{
          name: 'Design',
          data: [44, 55, 41, 67, 22, 43, 21, 49]
        }, {
          name: 'Development',
          data: [13, 23, 20, 8, 13, 27, 33, 12]
        }, {
          name: 'Testing',
          data: [11, 17, 15, 15, 21, 14, 15, 13]
        }, {
          name: 'Deployment',
          data: [21, 7, 25, 13, 22, 8, 12, 16]
        }],
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          toolbar: {
            show: false
          },
          foreColor: colors.text
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 4,
          },
        },
        colors: [colors.primary, colors.secondary, colors.accent, '#ec4899'],
        xaxis: {
          categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4'],
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        yaxis: {
          title: {
            text: 'Hours',
            style: {
              color: colors.text,
              fontSize: '14px'
            }
          },
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40,
          labels: {
            colors: colors.text
          }
        },
        fill: {
          opacity: 1
        },
        grid: {
          borderColor: colors.grid
        },
        tooltip: {
          theme: 'dark'
        }
      };

      stackedChartInstance = new ApexCharts(stackedBarChart, stackedOptions);
      stackedChartInstance.render();
    }

    // Horizontal Bar Chart
    if (horizontalBarChart && !horizontalChartInstance) {
      const horizontalOptions = {
        series: [{
          name: 'Users',
          data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        }],
        chart: {
          type: 'bar',
          height: 350,
          toolbar: {
            show: false
          },
          foreColor: colors.text
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: [colors.secondary],
        xaxis: {
          categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
            'United States', 'China', 'Germany'
          ],
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: colors.text,
              fontSize: '14px'
            }
          }
        },
        grid: {
          borderColor: colors.grid
        },
        tooltip: {
          theme: 'dark'
        }
      };

      horizontalChartInstance = new ApexCharts(horizontalBarChart, horizontalOptions);
      horizontalChartInstance.render();
    }

    // Cleanup on unmount
    return () => {
      basicChartInstance?.destroy();
      groupedChartInstance?.destroy();
      stackedChartInstance?.destroy();
      horizontalChartInstance?.destroy();
    };
  });
</script>

<svelte:head>
  <title>Bar Charts - SlideyUI Documentation</title>
</svelte:head>

<div class="prose max-w-none">
  <h1>Bar Charts</h1>
  <p>
    Presentation-optimized bar charts using ApexCharts. Perfect for displaying comparisons, trends,
    and categorical data in presentations. All charts are theme-aware and automatically adapt to
    light/dark modes.
  </p>

  <div class="alert alert-info my-6">
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
      <h4 class="font-bold">ApexCharts Integration</h4>
      <p class="text-sm">
        These charts use ApexCharts library for interactive, responsive data visualization. Install
        with: <code>npm install apexcharts</code>
      </p>
    </div>
  </div>

  <h2>Chart Examples</h2>
  <p>
    All charts are wrapped in ContentCard components and use a 2-column grid layout for optimal
    presentation display.
  </p>

  <div class="not-prose mb-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <ContentCard
        title="Basic Bar Chart"
        subtitle="Simple vertical bars for single data series"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={basicBarChart} class="w-full"></div>
        <div slot="footer">
          <p class="text-sm text-base-content/70">
            Perfect for showing trends over time with a single metric
          </p>
        </div>
      </ContentCard>

      <ContentCard
        title="Grouped Bar Chart"
        subtitle="Compare multiple data series side by side"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={groupedBarChart} class="w-full"></div>
        <div slot="footer">
          <p class="text-sm text-base-content/70">
            Ideal for product comparisons or multi-metric analysis
          </p>
        </div>
      </ContentCard>

      <ContentCard
        title="Stacked Bar Chart"
        subtitle="Show composition and total values together"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={stackedBarChart} class="w-full"></div>
        <div slot="footer">
          <p class="text-sm text-base-content/70">
            Great for showing part-to-whole relationships over time
          </p>
        </div>
      </ContentCard>

      <ContentCard
        title="Horizontal Bar Chart"
        subtitle="Better for long category names"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div bind:this={horizontalBarChart} class="w-full"></div>
        <div slot="footer">
          <p class="text-sm text-base-content/70">
            Perfect for rankings, comparisons, and long labels
          </p>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <h2>Code Examples</h2>

  <h3>Basic Bar Chart</h3>
  <pre><code>{`<script lang="ts">
  import { onMount } from 'svelte';
  import { ContentCard } from '@slideyui/svelte';
  import ApexCharts from 'apexcharts';

  let chartElement: HTMLElement;
  let chartInstance: ApexCharts | null = null;

  $effect(() => {
    if (!chartElement) return;

    const options = {
      series: [{
        name: 'Sales',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
      }],
      chart: {
        type: 'bar',
        height: 350,
        toolbar: { show: false }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false
        }
      },
      colors: ['#3b82f6'],
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
      }
    };

    chartInstance = new ApexCharts(chartElement, options);
    chartInstance.render();

    return () => chartInstance?.destroy();
  });
<\/script>

<ContentCard title="Sales Trend" bordered={true}>
  <div bind:this={chartElement}></div>
</ContentCard>`}</code></pre>

  <h3>Grouped Bar Chart</h3>
  <pre><code>{`const options = {
  series: [
    { name: 'Product A', data: [44, 55, 41, 67, 22, 43] },
    { name: 'Product B', data: [13, 23, 20, 8, 13, 27] },
    { name: 'Product C', data: [11, 17, 15, 15, 21, 14] }
  ],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      borderRadius: 4
    }
  },
  colors: ['#3b82f6', '#8b5cf6', '#f59e0b'],
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  }
};`}</code></pre>

  <h3>Stacked Bar Chart</h3>
  <pre><code>{`const options = {
  series: [
    { name: 'Design', data: [44, 55, 41, 67, 22, 43, 21, 49] },
    { name: 'Development', data: [13, 23, 20, 8, 13, 27, 33, 12] },
    { name: 'Testing', data: [11, 17, 15, 15, 21, 14, 15, 13] }
  ],
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 4
    }
  },
  colors: ['#3b82f6', '#8b5cf6', '#f59e0b'],
  xaxis: {
    categories: ['Q1', 'Q2', 'Q3', 'Q4', 'Q1', 'Q2', 'Q3', 'Q4']
  },
  legend: {
    position: 'top'
  }
};`}</code></pre>

  <h3>Horizontal Bar Chart</h3>
  <pre><code>{`const options = {
  series: [{
    name: 'Users',
    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: false }
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      horizontal: true
    }
  },
  colors: ['#8b5cf6'],
  xaxis: {
    categories: [
      'South Korea', 'Canada', 'United Kingdom', 'Netherlands',
      'Italy', 'France', 'Japan', 'United States', 'China', 'Germany'
    ]
  }
};`}</code></pre>

  <h2>Theme Integration</h2>
  <p>
    Charts automatically adapt to SlideyUI themes by reading CSS custom properties. Here's how to
    make your charts theme-aware:
  </p>

  <pre><code>{`function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');

  return {
    text: isDark ? '#e5e7eb' : '#374151',
    grid: isDark ? '#374151' : '#e5e7eb',
    primary: getComputedStyle(document.documentElement)
      .getPropertyValue('--slidey-color-primary') || '#3b82f6',
    secondary: getComputedStyle(document.documentElement)
      .getPropertyValue('--slidey-color-secondary') || '#8b5cf6',
    accent: getComputedStyle(document.documentElement)
      .getPropertyValue('--slidey-color-accent') || '#f59e0b'
  };
}

// Use in chart options
const colors = getThemeColors();
const options = {
  chart: {
    foreColor: colors.text
  },
  colors: [colors.primary, colors.secondary, colors.accent],
  grid: {
    borderColor: colors.grid
  }
};`}</code></pre>

  <h2>Configuration Options</h2>

  <h3>Common Chart Options</h3>
  <table class="table-auto w-full">
    <thead>
      <tr>
        <th class="text-left">Option</th>
        <th class="text-left">Type</th>
        <th class="text-left">Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>chart.type</code></td>
        <td><code>'bar'</code></td>
        <td>Chart type (always 'bar' for bar charts)</td>
      </tr>
      <tr>
        <td><code>chart.height</code></td>
        <td><code>number</code></td>
        <td>Chart height in pixels (recommend 350 for presentations)</td>
      </tr>
      <tr>
        <td><code>chart.toolbar.show</code></td>
        <td><code>boolean</code></td>
        <td>Show/hide toolbar (recommend false for presentations)</td>
      </tr>
      <tr>
        <td><code>plotOptions.bar.horizontal</code></td>
        <td><code>boolean</code></td>
        <td>Vertical (false) or horizontal (true) bars</td>
      </tr>
      <tr>
        <td><code>plotOptions.bar.borderRadius</code></td>
        <td><code>number</code></td>
        <td>Rounded corners on bars (4-8 recommended)</td>
      </tr>
      <tr>
        <td><code>chart.stacked</code></td>
        <td><code>boolean</code></td>
        <td>Stack bars on top of each other</td>
      </tr>
      <tr>
        <td><code>colors</code></td>
        <td><code>string[]</code></td>
        <td>Array of hex colors for series</td>
      </tr>
    </tbody>
  </table>

  <h2>Best Practices</h2>
  <ul>
    <li>
      <strong>Keep it simple:</strong> Limit to 3-4 data series maximum for clarity in presentations
    </li>
    <li>
      <strong>Use color wisely:</strong> Leverage theme colors for consistency across slides
    </li>
    <li>
      <strong>Disable toolbars:</strong> Set <code>toolbar.show: false</code> for cleaner presentation
      mode
    </li>
    <li>
      <strong>Readable labels:</strong> Ensure 14px+ font size for axis labels in large rooms
    </li>
    <li>
      <strong>Choose the right type:</strong>
      <ul>
        <li>Basic: Single metric trends</li>
        <li>Grouped: Compare multiple metrics side-by-side</li>
        <li>Stacked: Show composition and totals</li>
        <li>Horizontal: Long category names or rankings</li>
      </ul>
    </li>
    <li>
      <strong>Wrap in ContentCard:</strong> Use SlideyUI cards for consistent styling and layout
    </li>
  </ul>

  <h2>Accessibility</h2>
  <p>ApexCharts provides built-in accessibility features:</p>
  <ul>
    <li>SVG-based rendering for crisp visuals at any size</li>
    <li>Interactive tooltips for data point details</li>
    <li>Legend support for series identification</li>
    <li>High contrast color support when using theme colors</li>
    <li>Responsive sizing that adapts to container width</li>
  </ul>

  <h2>Performance Considerations</h2>
  <ul>
    <li>
      <strong>Destroy on unmount:</strong> Always clean up chart instances to prevent memory leaks
    </li>
    <li>
      <strong>Limit data points:</strong> Keep datasets under 100 points for smooth interactions
    </li>
    <li>
      <strong>Disable animations:</strong> Set <code>chart.animations.enabled: false</code> for
      large datasets
    </li>
    <li>
      <strong>Use $effect:</strong> Svelte 5's $effect handles cleanup automatically when returning
      a function
    </li>
  </ul>

  <h2>Related Components</h2>
  <div class="flex gap-4 my-8">
    <a href="/docs/components/cards" class="btn btn-primary"> ContentCard Component </a>
    <a href="/docs/components" class="btn btn-outline"> All Components </a>
  </div>
</div>
