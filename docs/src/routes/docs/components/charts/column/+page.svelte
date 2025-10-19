<script lang="ts">
  import { ContentCard } from '@slideyui/svelte';
  import { browser } from '$app/environment';

  let ApexCharts = $state<typeof import('apexcharts').default | null>(null);

  let basicChartEl: HTMLElement;
  let groupedChartEl: HTMLElement;
  let stackedChartEl: HTMLElement;
  let dataLabelsChartEl: HTMLElement;

  // Theme detection
  let isDarkMode = $state(false);

  // Theme detection
  $effect(() => {
    if (!browser) return;
    isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
  });

  // Basic Column Chart
  $effect(() => {
    if (!browser) return;

    // Load ApexCharts if not already loaded
    if (!ApexCharts) {
      import('apexcharts').then(module => {
        ApexCharts = module.default;
      });
      return; // Exit early, effect will re-run when ApexCharts becomes reactive
    }

    if (!basicChartEl) return;

    const options = {
      series: [{
        name: 'Revenue',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 71, 68, 74]
      }],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent',
        foreColor: isDarkMode ? '#a6adba' : '#373d3f',
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
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
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      yaxis: {
        title: {
          text: '$ (thousands)',
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        },
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#3b82f6']
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light',
        y: {
          formatter: function (val: number) {
            return "$ " + val + " thousand"
          }
        }
      },
      grid: {
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
      }
    };

    const chart = new ApexCharts(basicChartEl, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  });

  // Grouped Column Chart
  $effect(() => {
    if (!browser) return;

    // Load ApexCharts if not already loaded
    if (!ApexCharts) {
      import('apexcharts').then(module => {
        ApexCharts = module.default;
      });
      return; // Exit early, effect will re-run when ApexCharts becomes reactive
    }

    if (!groupedChartEl) return;

    const options = {
      series: [
        {
          name: 'Q1',
          data: [44, 55, 41, 67, 22, 43]
        },
        {
          name: 'Q2',
          data: [13, 23, 20, 8, 13, 27]
        },
        {
          name: 'Q3',
          data: [11, 17, 15, 15, 21, 14]
        },
        {
          name: 'Q4',
          data: [21, 7, 25, 13, 22, 8]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent',
        foreColor: isDarkMode ? '#a6adba' : '#373d3f',
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
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
      xaxis: {
        categories: ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F'],
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Sales',
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        },
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light',
        y: {
          formatter: function (val: number) {
            return val + " units"
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '14px',
        fontFamily: 'inherit',
        labels: {
          colors: isDarkMode ? '#a6adba' : '#373d3f'
        }
      },
      grid: {
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
      }
    };

    const chart = new ApexCharts(groupedChartEl, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  });

  // Stacked Column Chart
  $effect(() => {
    if (!browser) return;

    // Load ApexCharts if not already loaded
    if (!ApexCharts) {
      import('apexcharts').then(module => {
        ApexCharts = module.default;
      });
      return; // Exit early, effect will re-run when ApexCharts becomes reactive
    }

    if (!stackedChartEl) return;

    const options = {
      series: [
        {
          name: 'Product A',
          data: [44, 55, 41, 67, 22, 43, 21, 49]
        },
        {
          name: 'Product B',
          data: [13, 23, 20, 8, 13, 27, 33, 12]
        },
        {
          name: 'Product C',
          data: [11, 17, 15, 15, 21, 14, 15, 13]
        }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        background: 'transparent',
        foreColor: isDarkMode ? '#a6adba' : '#373d3f',
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: '55%',
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
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Total Sales',
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        },
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light',
        y: {
          formatter: function (val: number) {
            return val + " units"
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        fontSize: '14px',
        fontFamily: 'inherit',
        labels: {
          colors: isDarkMode ? '#a6adba' : '#373d3f'
        }
      },
      grid: {
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
      }
    };

    const chart = new ApexCharts(stackedChartEl, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  });

  // Column Chart with Data Labels
  $effect(() => {
    if (!browser) return;

    // Load ApexCharts if not already loaded
    if (!ApexCharts) {
      import('apexcharts').then(module => {
        ApexCharts = module.default;
      });
      return; // Exit early, effect will re-run when ApexCharts becomes reactive
    }

    if (!dataLabelsChartEl) return;

    const options = {
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent',
        foreColor: isDarkMode ? '#a6adba' : '#373d3f',
        toolbar: {
          show: true,
          tools: {
            download: true,
            zoom: false,
            zoomin: false,
            zoomout: false,
            pan: false,
            reset: false
          }
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
          dataLabels: {
            position: 'top',
          },
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [isDarkMode ? '#a6adba' : '#373d3f']
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        position: 'bottom',
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Inflation Rate (%)',
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        },
        labels: {
          style: {
            fontSize: '14px',
            fontFamily: 'inherit'
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#8b5cf6']
      },
      tooltip: {
        theme: isDarkMode ? 'dark' : 'light',
        y: {
          formatter: function (val: number) {
            return val + "%"
          }
        }
      },
      grid: {
        borderColor: isDarkMode ? '#374151' : '#e5e7eb',
      }
    };

    const chart = new ApexCharts(dataLabelsChartEl, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  });
</script>

<svelte:head>
  <title>Column Charts - SlideyUI Documentation</title>
</svelte:head>

<div class="prose max-w-none">
  <h1>Column Charts</h1>
  <p>
    Column charts are perfect for comparing data across categories or showing trends over time. Built with ApexCharts and wrapped in ContentCard components for seamless integration with SlideyUI presentations.
  </p>

  <div class="alert alert-info my-6">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <div>
      <div class="font-bold">Theme-Aware Charts</div>
      <div class="text-sm">All charts automatically adapt to light and dark themes for optimal presentation visibility.</div>
    </div>
  </div>

  <h2>Basic Column Chart</h2>
  <p>A simple single-series column chart showing monthly revenue data. Perfect for presenting sales trends or performance metrics.</p>

  <div class="not-prose mb-8">
    <ContentCard
      title="Monthly Revenue"
      subtitle="2024 Sales Performance"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={basicChartEl}></div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre><code>{`<script lang="ts">
  import { onMount } from 'svelte';
  import { ContentCard } from '@slideyui/svelte';
  import ApexCharts from 'apexcharts';

  let chartEl: HTMLElement;
  let isDarkMode = $state(false);

  $effect(() => {
    if (!chartEl) return;

    const options = {
      series: [{
        name: 'Revenue',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 71, 68, 74]
      }],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent',
        foreColor: isDarkMode ? '#a6adba' : '#373d3f'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      },
      yaxis: {
        title: { text: '$ (thousands)' }
      },
      fill: {
        opacity: 1,
        colors: ['#3b82f6']
      }
    };

    const chart = new ApexCharts(chartEl, options);
    chart.render();

    return () => chart.destroy();
  });
<\/script>

<ContentCard title="Monthly Revenue" aspectRatio="16/9">
  <div bind:this={chartEl}></div>
</ContentCard>`}</code></pre>
    </div>
  </details>

  <h2>Grouped Column Chart</h2>
  <p>Compare multiple data series side-by-side with grouped columns. Ideal for showing quarterly comparisons or product performance across different metrics.</p>

  <div class="not-prose mb-8">
    <ContentCard
      title="Quarterly Sales by Product"
      subtitle="Year-over-year comparison"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={groupedChartEl}></div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre><code>{`<script lang="ts">
  import ApexCharts from 'apexcharts';
  import { ContentCard } from '@slideyui/svelte';

  let chartEl: HTMLElement;

  $effect(() => {
    if (!chartEl) return;

    const options = {
      series: [
        { name: 'Q1', data: [44, 55, 41, 67, 22, 43] },
        { name: 'Q2', data: [13, 23, 20, 8, 13, 27] },
        { name: 'Q3', data: [11, 17, 15, 15, 21, 14] },
        { name: 'Q4', data: [21, 7, 25, 13, 22, 8] }
      ],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 4
        }
      },
      xaxis: {
        categories: ['Product A', 'Product B', 'Product C',
                    'Product D', 'Product E', 'Product F']
      },
      fill: {
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    };

    const chart = new ApexCharts(chartEl, options);
    chart.render();

    return () => chart.destroy();
  });
<\/script>

<ContentCard title="Quarterly Sales" aspectRatio="16/9">
  <div bind:this={chartEl}></div>
</ContentCard>`}</code></pre>
    </div>
  </details>

  <h2>Stacked Column Chart</h2>
  <p>Show composition and total values together with stacked columns. Perfect for displaying parts of a whole or cumulative data over time.</p>

  <div class="not-prose mb-8">
    <ContentCard
      title="Product Sales Distribution"
      subtitle="Cumulative monthly performance"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={stackedChartEl}></div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre><code>{`<script lang="ts">
  import ApexCharts from 'apexcharts';
  import { ContentCard } from '@slideyui/svelte';

  let chartEl: HTMLElement;

  $effect(() => {
    if (!chartEl) return;

    const options = {
      series: [
        { name: 'Product A', data: [44, 55, 41, 67, 22, 43, 21, 49] },
        { name: 'Product B', data: [13, 23, 20, 8, 13, 27, 33, 12] },
        { name: 'Product C', data: [11, 17, 15, 15, 21, 14, 15, 13] }
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 4,
          columnWidth: '55%'
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
      },
      yaxis: {
        title: { text: 'Total Sales' }
      },
      fill: {
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    };

    const chart = new ApexCharts(chartEl, options);
    chart.render();

    return () => chart.destroy();
  });
<\/script>

<ContentCard title="Product Sales" aspectRatio="16/9">
  <div bind:this={chartEl}></div>
</ContentCard>`}</code></pre>
    </div>
  </details>

  <h2>Column Chart with Data Labels</h2>
  <p>Display values directly on the columns for immediate data visibility. Useful when exact values are important to communicate.</p>

  <div class="not-prose mb-8">
    <ContentCard
      title="Inflation Rate 2024"
      subtitle="Monthly percentage changes"
      aspectRatio="16/9"
      bordered={true}
      shadow={true}
    >
      <div bind:this={dataLabelsChartEl}></div>
    </ContentCard>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre><code>{`<script lang="ts">
  import ApexCharts from 'apexcharts';
  import { ContentCard } from '@slideyui/svelte';

  let chartEl: HTMLElement;
  let isDarkMode = $state(false);

  $effect(() => {
    if (!chartEl) return;

    const options = {
      series: [{
        name: 'Inflation',
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }],
      chart: {
        type: 'bar',
        height: 350,
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '60%',
          dataLabels: { position: 'top' }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val + "%",
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [isDarkMode ? '#a6adba' : '#373d3f']
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      yaxis: {
        title: { text: 'Inflation Rate (%)' }
      },
      fill: {
        colors: ['#8b5cf6']
      }
    };

    const chart = new ApexCharts(chartEl, options);
    chart.render();

    return () => chart.destroy();
  });
<\/script>

<ContentCard title="Inflation Rate" aspectRatio="16/9">
  <div bind:this={chartEl}></div>
</ContentCard>`}</code></pre>
    </div>
  </details>

  <h2>Configuration Options</h2>

  <h3>Common Props</h3>
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
        <td><code>series</code></td>
        <td><code>Array</code></td>
        <td>Data series to display in the chart</td>
      </tr>
      <tr>
        <td><code>chart.type</code></td>
        <td><code>'bar'</code></td>
        <td>Chart type for column charts</td>
      </tr>
      <tr>
        <td><code>chart.height</code></td>
        <td><code>number</code></td>
        <td>Chart height in pixels</td>
      </tr>
      <tr>
        <td><code>chart.stacked</code></td>
        <td><code>boolean</code></td>
        <td>Enable stacked columns</td>
      </tr>
      <tr>
        <td><code>plotOptions.bar.horizontal</code></td>
        <td><code>boolean</code></td>
        <td>false for column, true for bar chart</td>
      </tr>
      <tr>
        <td><code>plotOptions.bar.columnWidth</code></td>
        <td><code>string</code></td>
        <td>Width of columns (e.g., '55%')</td>
      </tr>
      <tr>
        <td><code>plotOptions.bar.borderRadius</code></td>
        <td><code>number</code></td>
        <td>Rounded corners on columns</td>
      </tr>
      <tr>
        <td><code>dataLabels.enabled</code></td>
        <td><code>boolean</code></td>
        <td>Show values on columns</td>
      </tr>
      <tr>
        <td><code>xaxis.categories</code></td>
        <td><code>Array</code></td>
        <td>X-axis labels</td>
      </tr>
      <tr>
        <td><code>fill.colors</code></td>
        <td><code>Array</code></td>
        <td>Column colors</td>
      </tr>
    </tbody>
  </table>

  <h2>Best Practices</h2>
  <ul>
    <li><strong>Limit categories:</strong> Use 6-12 columns for optimal readability on slides</li>
    <li><strong>Choose colors wisely:</strong> Use contrasting colors that work in both light and dark themes</li>
    <li><strong>Add context:</strong> Include descriptive titles and axis labels</li>
    <li><strong>Use data labels sparingly:</strong> Only when exact values are critical</li>
    <li><strong>Stack meaningfully:</strong> Ensure stacked data adds up to a meaningful total</li>
    <li><strong>Consistent spacing:</strong> Maintain uniform column widths for clean appearance</li>
  </ul>

  <h2>Presentation Tips</h2>
  <ul>
    <li><strong>Highlight key data:</strong> Use different colors to emphasize important columns</li>
    <li><strong>Tell a story:</strong> Choose chart type based on what you want to emphasize (comparison vs. composition)</li>
    <li><strong>Simplify:</strong> Remove unnecessary grid lines and decorations for cleaner slides</li>
    <li><strong>Responsive sizing:</strong> Charts automatically scale within ContentCard containers</li>
    <li><strong>Theme consistency:</strong> Charts adapt to SlideyUI themes automatically</li>
  </ul>

  <h2>Accessibility</h2>
  <p>Column charts include:</p>
  <ul>
    <li>Theme-aware color schemes for optimal visibility</li>
    <li>Interactive tooltips with detailed data values</li>
    <li>Responsive design that works on all screen sizes</li>
    <li>High contrast colors meeting WCAG standards</li>
    <li>Readable font sizes for presentation viewing</li>
  </ul>

  <h2>Advanced Examples</h2>
  <p>For more advanced column chart configurations, visit the <a href="https://apexcharts.com/javascript-chart-demos/column-charts/" target="_blank" rel="noopener noreferrer">ApexCharts Column Charts documentation</a>.</p>

  <h2>Next Steps</h2>
  <div class="flex gap-4 my-8">
    <a href="/docs/components" class="btn btn-primary">
      View All Components
    </a>
    <a href="https://apexcharts.com/docs/" target="_blank" rel="noopener noreferrer" class="btn btn-outline">
      ApexCharts Docs
    </a>
  </div>
</div>
