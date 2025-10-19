<script lang="ts">
  import { ContentCard, CardGrid } from '@slideyui/svelte';
  import { browser } from '$app/environment';

  let ApexCharts = $state<typeof import('apexcharts').default | null>(null);

  let basicPieContainer: HTMLElement;
  let donutContainer: HTMLElement;
  let semiDonutContainer: HTMLElement;
  let gradientDonutContainer: HTMLElement;
  let basicPieChart: ApexCharts | null = null;
  let donutChart: ApexCharts | null = null;
  let semiDonutChart: ApexCharts | null = null;
  let gradientDonutChart: ApexCharts | null = null;

  // Get theme colors from CSS variables
  function getThemeColors() {
    if (!browser) return { primary: '#3b82f6', secondary: '#8b5cf6', accent: '#10b981', text: '#1f2937', background: '#ffffff' };

    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    return {
      primary: computedStyle.getPropertyValue('--slidey-color-primary').trim() || '#3b82f6',
      secondary: computedStyle.getPropertyValue('--slidey-color-secondary').trim() || '#8b5cf6',
      accent: computedStyle.getPropertyValue('--slidey-color-accent').trim() || '#10b981',
      text: computedStyle.getPropertyValue('--slidey-color-text').trim() || '#1f2937',
      background: computedStyle.getPropertyValue('--slidey-color-background').trim() || '#ffffff'
    };
  }

  // Basic Pie Chart Configuration
  const basicPieOptions = {
    series: [44, 55, 13, 33],
    chart: {
      type: 'pie',
      height: 350,
      fontFamily: 'inherit',
      background: 'transparent'
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D'],
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
    legend: {
      position: 'bottom',
      fontSize: '16px',
      labels: {
        colors: '#64748b'
      }
    },
    dataLabels: {
      style: {
        fontSize: '16px',
        fontWeight: 600
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          height: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  // Donut Chart Configuration
  const donutOptions = {
    series: [42, 26, 19, 13],
    chart: {
      type: 'donut',
      height: 350,
      fontFamily: 'inherit',
      background: 'transparent'
    },
    labels: ['Desktop', 'Tablet', 'Mobile', 'Other'],
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
    legend: {
      position: 'bottom',
      fontSize: '16px',
      labels: {
        colors: '#64748b'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              fontSize: '18px',
              fontWeight: 600
            },
            value: {
              fontSize: '28px',
              fontWeight: 700,
              formatter: (val: string) => `${val}%`
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              formatter: () => '100%'
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px'
      }
    }
  };

  // Semi-Donut Chart Configuration
  const semiDonutOptions = {
    series: [76],
    chart: {
      type: 'radialBar',
      height: 350,
      fontFamily: 'inherit',
      background: 'transparent'
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '70%'
        },
        track: {
          background: '#e5e7eb',
          strokeWidth: '100%'
        },
        dataLabels: {
          name: {
            fontSize: '18px',
            fontWeight: 600,
            offsetY: -10
          },
          value: {
            fontSize: '36px',
            fontWeight: 700,
            offsetY: -40,
            formatter: (val: number) => `${val}%`
          }
        }
      }
    },
    colors: ['#10b981'],
    labels: ['Progress'],
    stroke: {
      lineCap: 'round'
    }
  };

  // Gradient Donut Chart Configuration
  const gradientDonutOptions = {
    series: [35, 28, 22, 15],
    chart: {
      type: 'donut',
      height: 350,
      fontFamily: 'inherit',
      background: 'transparent'
    },
    labels: ['Q1 Revenue', 'Q2 Revenue', 'Q3 Revenue', 'Q4 Revenue'],
    colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.8,
        stops: [0, 100]
      }
    },
    legend: {
      position: 'bottom',
      fontSize: '16px',
      labels: {
        colors: '#64748b'
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              fontSize: '18px',
              fontWeight: 600
            },
            value: {
              fontSize: '28px',
              fontWeight: 700,
              formatter: (val: string) => `$${val}M`
            },
            total: {
              show: true,
              label: 'Total',
              fontSize: '16px',
              fontWeight: 600,
              formatter: (w: any) => {
                const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                return `$${total}M`;
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px'
      }
    }
  };

  $effect(() => {
    if (!browser) return;

    // Load ApexCharts if not already loaded
    if (!ApexCharts) {
      import('apexcharts').then(module => {
        ApexCharts = module.default;
      });
      return; // Exit early, effect will re-run when ApexCharts becomes reactive
    }

    if (basicPieContainer && !basicPieChart) {
      basicPieChart = new ApexCharts(basicPieContainer, basicPieOptions);
      basicPieChart.render();
    }

    if (donutContainer && !donutChart) {
      donutChart = new ApexCharts(donutContainer, donutOptions);
      donutChart.render();
    }

    if (semiDonutContainer && !semiDonutChart) {
      semiDonutChart = new ApexCharts(semiDonutContainer, semiDonutOptions);
      semiDonutChart.render();
    }

    if (gradientDonutContainer && !gradientDonutChart) {
      gradientDonutChart = new ApexCharts(gradientDonutContainer, gradientDonutOptions);
      gradientDonutChart.render();
    }

    return () => {
      basicPieChart?.destroy();
      donutChart?.destroy();
      semiDonutChart?.destroy();
      gradientDonutChart?.destroy();
    };
  });

  const basicPieCode = `import ApexCharts from 'apexcharts';
import { ContentCard } from '@slideyui/svelte';

let chartContainer: HTMLElement;
let chart: ApexCharts | null = null;

const options = {
  series: [44, 55, 13, 33],
  chart: {
    type: 'pie',
    height: 350,
    fontFamily: 'inherit',
    background: 'transparent'
  },
  labels: ['Team A', 'Team B', 'Team C', 'Team D'],
  colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
  legend: {
    position: 'bottom',
    fontSize: '16px'
  },
  dataLabels: {
    style: {
      fontSize: '16px',
      fontWeight: 600
    }
  }
};

$effect(() => {
  if (chartContainer && !chart) {
    chart = new ApexCharts(chartContainer, options);
    chart.render();
  }

  return () => {
    chart?.destroy();
  };
});

// Template
<ContentCard title="Team Performance">
  <div bind:this={chartContainer}></div>
</ContentCard>`;

  const donutCode = `const donutOptions = {
  series: [42, 26, 19, 13],
  chart: {
    type: 'donut',
    height: 350,
    fontFamily: 'inherit',
    background: 'transparent'
  },
  labels: ['Desktop', 'Tablet', 'Mobile', 'Other'],
  colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: {
            fontSize: '18px',
            fontWeight: 600
          },
          value: {
            fontSize: '28px',
            fontWeight: 700,
            formatter: (val: string) => \`\${val}%\`
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '16px',
            fontWeight: 600,
            formatter: () => '100%'
          }
        }
      }
    }
  }
};`;

  const semiDonutCode = `const semiDonutOptions = {
  series: [76],
  chart: {
    type: 'radialBar',
    height: 350,
    fontFamily: 'inherit',
    background: 'transparent'
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      hollow: {
        size: '70%'
      },
      track: {
        background: '#e5e7eb',
        strokeWidth: '100%'
      },
      dataLabels: {
        name: {
          fontSize: '18px',
          fontWeight: 600,
          offsetY: -10
        },
        value: {
          fontSize: '36px',
          fontWeight: 700,
          offsetY: -40,
          formatter: (val: number) => \`\${val}%\`
        }
      }
    }
  },
  colors: ['#10b981'],
  labels: ['Progress'],
  stroke: {
    lineCap: 'round'
  }
};`;

  const gradientCode = `const gradientDonutOptions = {
  series: [35, 28, 22, 15],
  chart: {
    type: 'donut',
    height: 350,
    fontFamily: 'inherit',
    background: 'transparent'
  },
  labels: ['Q1 Revenue', 'Q2 Revenue', 'Q3 Revenue', 'Q4 Revenue'],
  colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      shadeIntensity: 0.5,
      gradientToColors: ['#60a5fa', '#a78bfa', '#34d399', '#fbbf24'],
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 0.8,
      stops: [0, 100]
    }
  },
  plotOptions: {
    pie: {
      donut: {
        size: '60%',
        labels: {
          show: true,
          value: {
            formatter: (val: string) => \`$\${val}M\`
          },
          total: {
            show: true,
            label: 'Total',
            formatter: (w: any) => {
              const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
              return \`$\${total}M\`;
            }
          }
        }
      }
    }
  }
};`;
</script>

<svelte:head>
  <title>Pie Charts - SlideyUI Documentation</title>
</svelte:head>

<div class="prose max-w-none">
  <h1>Pie & Donut Charts</h1>
  <p class="lead text-xl text-base-content/80 my-6">
    Professional pie and donut charts powered by ApexCharts, optimized for presentations. Perfect
    for showing proportional data, market share, category distributions, and progress metrics.
  </p>

  <div class="alert alert-info my-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path></svg
    >
    <div>
      <h4 class="font-bold">ApexCharts Integration</h4>
      <p class="text-sm">
        These charts use ApexCharts and are automatically theme-aware, adapting to your
        presentation's color scheme. All charts are optimized for projection with large, readable
        fonts (minimum 16px).
      </p>
    </div>
  </div>

  <h2>Basic Pie Chart</h2>
  <p>
    A classic pie chart for displaying categorical data as proportional slices. Perfect for showing
    team performance, market share, or any categorical distribution.
  </p>

  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <ContentCard
        title="Team Performance"
        subtitle="Sales distribution by team"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div bind:this={basicPieContainer}></div>
        </div>
      </ContentCard>

      <ContentCard
        title="Market Share Analysis"
        subtitle="Q4 2024 Results"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4 flex flex-col gap-4">
          <div class="stats stats-vertical shadow">
            <div class="stat">
              <div class="stat-title">Leader</div>
              <div class="stat-value text-2xl text-primary">Team B</div>
              <div class="stat-desc">38.2% market share</div>
            </div>
            <div class="stat">
              <div class="stat-title">Total Teams</div>
              <div class="stat-value text-2xl">4</div>
              <div class="stat-desc">Competing in market</div>
            </div>
          </div>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre class="bg-base-300 p-4 rounded-lg overflow-x-auto"><code>{basicPieCode}</code></pre>
    </div>
  </details>

  <h2>Donut Chart</h2>
  <p>
    Donut charts provide a center area for displaying aggregate information while maintaining the
    proportional visualization. Ideal for device analytics, traffic sources, or any data where you
    want to emphasize the total.
  </p>

  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <ContentCard
        title="Device Analytics"
        subtitle="User traffic by device type"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div bind:this={donutContainer}></div>
        </div>
      </ContentCard>

      <ContentCard
        title="Key Insights"
        subtitle="Device usage patterns"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div class="space-y-4">
            <div class="alert alert-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>Desktop leads with 42% of traffic</span>
            </div>
            <div class="alert alert-info">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-current shrink-0 w-6 h-6"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path></svg
              >
              <span>Mobile + Tablet = 45% combined</span>
            </div>
            <div class="stat bg-base-200 rounded-lg">
              <div class="stat-title">Optimization Target</div>
              <div class="stat-value text-2xl">Mobile</div>
              <div class="stat-desc">Focus area for Q1 2025</div>
            </div>
          </div>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre class="bg-base-300 p-4 rounded-lg overflow-x-auto"><code>{donutCode}</code></pre>
    </div>
  </details>

  <h2>Radial Bar (Semi-Donut)</h2>
  <p>
    Radial bar charts (also called gauge charts) are perfect for showing progress, completion
    rates, or single metrics as a percentage. The semi-circular design is ideal for KPI dashboards
    and goal tracking.
  </p>

  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <ContentCard
        title="Project Completion"
        subtitle="Current sprint progress"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div bind:this={semiDonutContainer}></div>
        </div>
      </ContentCard>

      <ContentCard
        title="Sprint Metrics"
        subtitle="Week 3 of 4"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div class="space-y-4">
            <div class="stats stats-vertical shadow w-full">
              <div class="stat">
                <div class="stat-figure text-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-8 h-8 stroke-current"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path></svg
                  >
                </div>
                <div class="stat-title">Tasks Completed</div>
                <div class="stat-value text-success">32/42</div>
                <div class="stat-desc">76% completion rate</div>
              </div>

              <div class="stat">
                <div class="stat-title">Days Remaining</div>
                <div class="stat-value text-2xl">7</div>
                <div class="stat-desc">On track for deadline</div>
              </div>
            </div>

            <progress class="progress progress-success w-full" value="76" max="100"></progress>
          </div>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre class="bg-base-300 p-4 rounded-lg overflow-x-auto"><code>{semiDonutCode}</code></pre>
    </div>
  </details>

  <h2>Gradient Donut Chart</h2>
  <p>
    Add visual polish with gradient fills. Perfect for financial presentations, quarterly reports,
    or any data where you want to create visual hierarchy and emphasis through color gradients.
  </p>

  <div class="not-prose my-8">
    <CardGrid columns={{ sm: 1, md: 2 }} gap="lg">
      <ContentCard
        title="Annual Revenue"
        subtitle="Quarterly breakdown - 2024"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div bind:this={gradientDonutContainer}></div>
        </div>
      </ContentCard>

      <ContentCard
        title="Financial Summary"
        subtitle="Year-end performance"
        aspectRatio="16/9"
        bordered={true}
        shadow={true}
      >
        <div class="p-4">
          <div class="space-y-4">
            <div class="stats shadow w-full">
              <div class="stat">
                <div class="stat-figure text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    class="inline-block w-8 h-8 stroke-current"
                    ><path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path></svg
                  >
                </div>
                <div class="stat-title">Total Revenue</div>
                <div class="stat-value text-primary">$100M</div>
                <div class="stat-desc">Up 22% from 2023</div>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-2">
              <div class="stat bg-base-200 rounded-lg place-items-center">
                <div class="stat-title">Best Quarter</div>
                <div class="stat-value text-xl">Q1</div>
              </div>
              <div class="stat bg-base-200 rounded-lg place-items-center">
                <div class="stat-title">Growth</div>
                <div class="stat-value text-xl">+18%</div>
              </div>
            </div>
          </div>
        </div>
      </ContentCard>
    </CardGrid>
  </div>

  <details class="collapse collapse-arrow bg-base-200 my-4">
    <summary class="collapse-title font-medium">View Code</summary>
    <div class="collapse-content">
      <pre class="bg-base-300 p-4 rounded-lg overflow-x-auto"><code>{gradientCode}</code></pre>
    </div>
  </details>

  <h2>Chart Configuration Options</h2>

  <h3>Common Options</h3>
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
        <td><code>number[]</code></td>
        <td>Array of data values for each slice</td>
      </tr>
      <tr>
        <td><code>labels</code></td>
        <td><code>string[]</code></td>
        <td>Labels for each data point</td>
      </tr>
      <tr>
        <td><code>colors</code></td>
        <td><code>string[]</code></td>
        <td>Custom colors for each slice (hex, rgb, or theme vars)</td>
      </tr>
      <tr>
        <td><code>chart.type</code></td>
        <td><code>'pie' | 'donut' | 'radialBar'</code></td>
        <td>Chart type variant</td>
      </tr>
      <tr>
        <td><code>chart.height</code></td>
        <td><code>number</code></td>
        <td>Chart height in pixels</td>
      </tr>
      <tr>
        <td><code>legend.position</code></td>
        <td><code>'top' | 'bottom' | 'left' | 'right'</code></td>
        <td>Legend placement</td>
      </tr>
    </tbody>
  </table>

  <h3>Donut-Specific Options</h3>
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
        <td><code>plotOptions.pie.donut.size</code></td>
        <td><code>string</code></td>
        <td>Donut hole size (e.g., '65%')</td>
      </tr>
      <tr>
        <td><code>plotOptions.pie.donut.labels.show</code></td>
        <td><code>boolean</code></td>
        <td>Show/hide center labels</td>
      </tr>
      <tr>
        <td><code>plotOptions.pie.donut.labels.total</code></td>
        <td><code>object</code></td>
        <td>Configuration for total label in center</td>
      </tr>
    </tbody>
  </table>

  <h2>Best Practices</h2>

  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
    <div class="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <div>
        <h4 class="font-bold">Do: Limit Slices</h4>
        <p class="text-sm">Keep to 5-7 slices maximum for readability</p>
      </div>
    </div>

    <div class="alert alert-success">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        /></svg
      >
      <div>
        <h4 class="font-bold">Do: Use Contrasting Colors</h4>
        <p class="text-sm">Ensure adjacent slices have distinct colors</p>
      </div>
    </div>

    <div class="alert alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
      >
      <div>
        <h4 class="font-bold">Avoid: Too Many Categories</h4>
        <p class="text-sm">Group small slices into "Other" category</p>
      </div>
    </div>

    <div class="alert alert-warning">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        /></svg
      >
      <div>
        <h4 class="font-bold">Avoid: 3D Effects</h4>
        <p class="text-sm">Stick to flat design for clarity</p>
      </div>
    </div>
  </div>

  <h2>Presentation Tips</h2>
  <ul>
    <li>
      <strong>Start with the largest slice:</strong> Order data by size to make the chart easier to
      read
    </li>
    <li>
      <strong>Use donut charts for emphasis:</strong> The center area is perfect for highlighting
      totals or key metrics
    </li>
    <li>
      <strong>Combine with stats:</strong> Pair charts with ContentCard grids showing detailed
      statistics
    </li>
    <li>
      <strong>Radial bars for single metrics:</strong> Use gauge-style charts for progress,
      completion, or goal tracking
    </li>
    <li>
      <strong>Gradients for polish:</strong> Add visual interest to financial or quarterly data
      presentations
    </li>
    <li>
      <strong>Font sizes matter:</strong> All charts use 16px minimum font size for projection
      readability
    </li>
  </ul>

  <h2>Accessibility</h2>
  <p>All charts include:</p>
  <ul>
    <li>Semantic data labels with proper font sizing (16px minimum)</li>
    <li>High contrast colors meeting WCAG AAA standards</li>
    <li>Theme-aware colors that adapt to light/dark modes</li>
    <li>Responsive sizing for different screen dimensions</li>
    <li>Legend placement optimized for readability</li>
  </ul>

  <h2>Integration with SlideyUI</h2>
  <p>
    Charts work seamlessly with SlideyUI's card system. Wrap charts in ContentCard components for
    consistent styling, aspect ratios, and presentation modes. Use CardGrid for multi-chart layouts.
  </p>

  <div class="alert alert-info my-6">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      class="stroke-current shrink-0 w-6 h-6"
      ><path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      ></path></svg
    >
    <div>
      <h4 class="font-bold">Clean Up on Destroy</h4>
      <p class="text-sm">
        Always call <code>chart?.destroy()</code> in the cleanup function to prevent memory leaks
        when components unmount.
      </p>
    </div>
  </div>

  <h2>Resources</h2>
  <ul>
    <li>
      <a
        href="https://apexcharts.com/javascript-chart-demos/pie-charts/"
        target="_blank"
        rel="noopener noreferrer"
        class="link link-primary">ApexCharts Pie Chart Documentation</a
      >
    </li>
    <li>
      <a
        href="https://apexcharts.com/docs/options/plotoptions/pie/"
        target="_blank"
        rel="noopener noreferrer"
        class="link link-primary">Pie/Donut Plot Options</a
      >
    </li>
    <li>
      <a
        href="https://apexcharts.com/docs/options/plotoptions/radialbar/"
        target="_blank"
        rel="noopener noreferrer"
        class="link link-primary">Radial Bar Options</a
      >
    </li>
  </ul>

  <h2>Next Steps</h2>
  <div class="flex gap-4 my-8">
    <a href="/docs/components" class="btn btn-primary"> View All Components </a>
    <a href="/docs/examples" class="btn btn-outline"> Example Presentations </a>
  </div>
</div>
