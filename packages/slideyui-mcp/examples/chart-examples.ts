/**
 * Example chart data for testing SlideyUI chart rendering
 *
 * These examples demonstrate the proper ChartData format for all
 * supported chart types.
 */

import type { PresentationSpec, ChartData } from '../src/types/index.js';

/**
 * Bar chart example - Sales by quarter
 */
export const barChartData: ChartData = {
  labels: ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'],
  datasets: [
    {
      label: 'Revenue',
      data: [45000, 52000, 58000, 65000],
    },
    {
      label: 'Expenses',
      data: [32000, 35000, 38000, 40000],
    },
  ],
};

/**
 * Line chart example - Website traffic over time
 */
export const lineChartData: ChartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Page Views',
      data: [12500, 15800, 18200, 21000, 24500, 28000],
      borderColor: '#1e40af',
    },
    {
      label: 'Unique Visitors',
      data: [4200, 5100, 5800, 6500, 7200, 8000],
      borderColor: '#0891b2',
    },
  ],
};

/**
 * Area chart example - Cumulative revenue
 */
export const areaChartData: ChartData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Product A',
      data: [8000, 17000, 27000, 38000],
    },
    {
      label: 'Product B',
      data: [5000, 11000, 18000, 26000],
    },
  ],
};

/**
 * Pie chart example - Market share distribution
 */
export const pieChartData: ChartData = {
  labels: ['Our Product', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
  datasets: [
    {
      label: 'Market Share',
      data: [35, 25, 20, 12, 8],
      backgroundColor: ['#1e40af', '#0891b2', '#64748b', '#0f766e', '#94a3b8'],
    },
  ],
};

/**
 * Doughnut chart example - Budget allocation
 */
export const doughnutChartData: ChartData = {
  labels: ['Engineering', 'Marketing', 'Sales', 'Operations', 'R&D'],
  datasets: [
    {
      label: 'Budget Allocation',
      data: [45, 20, 15, 12, 8],
      backgroundColor: ['#1e40af', '#0891b2', '#64748b', '#0f766e', '#0369a1'],
    },
  ],
};

/**
 * Scatter chart example - Performance metrics
 */
export const scatterChartData: ChartData = {
  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
  datasets: [
    {
      label: 'Productivity Score',
      data: [85, 92, 78, 95, 88],
      backgroundColor: '#1e40af',
    },
  ],
};

/**
 * Complete presentation with all chart types
 */
export const chartExamplesPresentation: PresentationSpec = {
  theme: 'corporate',
  title: 'Chart Examples - SlideyUI',
  slides: [
    {
      type: 'title',
      title: 'SlideyUI Chart Examples',
      subtitle: 'Beautiful, Projection-Ready Data Visualizations',
      author: 'SlideyUI Team',
      date: new Date().toLocaleDateString(),
    },
    {
      type: 'data',
      title: 'Bar Chart - Quarterly Revenue',
      data: barChartData,
      dataType: 'chart',
      chartType: 'bar',
    },
    {
      type: 'data',
      title: 'Line Chart - Traffic Growth',
      data: lineChartData,
      dataType: 'chart',
      chartType: 'line',
    },
    {
      type: 'data',
      title: 'Area Chart - Cumulative Revenue',
      data: areaChartData,
      dataType: 'chart',
      chartType: 'area',
    },
    {
      type: 'data',
      title: 'Pie Chart - Market Share',
      data: pieChartData,
      dataType: 'chart',
      chartType: 'pie',
    },
    {
      type: 'data',
      title: 'Doughnut Chart - Budget Allocation',
      data: doughnutChartData,
      dataType: 'chart',
      chartType: 'doughnut',
    },
    {
      type: 'data',
      title: 'Scatter Chart - Team Performance',
      data: scatterChartData,
      dataType: 'chart',
      chartType: 'scatter',
    },
    {
      type: 'section-header',
      title: 'Thank You',
      subtitle: 'Charts powered by SlideyUI',
    },
  ],
  options: {
    aspectRatio: '16:9',
    fontSize: 'default',
    minify: false,
  },
  metadata: {
    author: 'SlideyUI Team',
    description: 'Example presentation showcasing all chart types',
    tags: ['charts', 'data-visualization', 'examples'],
  },
};

/**
 * Simple single-chart presentation for quick testing
 */
export const simpleChartPresentation: PresentationSpec = {
  theme: 'startup',
  title: 'Q4 Performance Report',
  slides: [
    {
      type: 'title',
      title: 'Q4 Performance Report',
      subtitle: 'Year-End Results',
    },
    {
      type: 'data',
      title: 'Revenue Growth',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: '2023',
            data: [42000, 48000, 52000, 58000],
          },
          {
            label: '2024',
            data: [45000, 52000, 58000, 65000],
          },
        ],
      },
      dataType: 'chart',
      chartType: 'bar',
    },
  ],
};

/**
 * Pitch deck with charts - demonstrating real-world usage
 */
export const pitchDeckWithCharts: PresentationSpec = {
  theme: 'pitch-deck',
  title: 'Series A Pitch Deck',
  slides: [
    {
      type: 'title',
      title: 'Acme Analytics',
      subtitle: 'AI-Powered Business Intelligence',
      author: 'Jane Doe, CEO',
    },
    {
      type: 'content',
      title: 'The Problem',
      content: [
        'Traditional analytics tools are too complex',
        'Data teams spend 80% of time on data prep',
        'Business users cannot self-serve insights',
        'Critical decisions delayed by weeks',
      ],
    },
    {
      type: 'data',
      title: 'Market Growth',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
        datasets: [
          {
            label: 'Market Size ($B)',
            data: [15, 22, 32, 48, 68, 95],
          },
        ],
      },
      dataType: 'chart',
      chartType: 'area',
    },
    {
      type: 'data',
      title: 'Customer Acquisition',
      data: {
        labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'],
        datasets: [
          {
            label: 'Active Customers',
            data: [12, 28, 52, 89, 145, 220],
            borderColor: '#7c3aed',
          },
        ],
      },
      dataType: 'chart',
      chartType: 'line',
    },
    {
      type: 'data',
      title: 'Revenue Breakdown',
      data: {
        labels: ['Enterprise', 'Mid-Market', 'SMB', 'Self-Service'],
        datasets: [
          {
            label: 'Revenue Share',
            data: [55, 25, 15, 5],
            backgroundColor: ['#7c3aed', '#ec4899', '#f59e0b', '#8b5cf6'],
          },
        ],
      },
      dataType: 'chart',
      chartType: 'pie',
    },
    {
      type: 'section-header',
      title: 'The Ask',
      subtitle: '$5M Series A to scale GTM and product',
    },
  ],
  metadata: {
    author: 'Jane Doe',
    description: 'Series A funding pitch deck',
    tags: ['pitch-deck', 'funding', 'analytics'],
  },
};
