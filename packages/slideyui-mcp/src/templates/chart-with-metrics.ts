/**
 * Chart with metrics slide template
 *
 * Renders a chart alongside key performance metrics with trend indicators.
 * Supports multiple layout options and chart types.
 */

import type {
  ChartWithMetricsSlideSpec,
  GenerationOptions,
} from '../types/index.js';
import { escapeHTML } from '../utils/html.js';

/**
 * Render a single metric card
 */
function renderMetric(metric: {
  label: string;
  value: string | number;
  change?: {
    value: number;
    direction: 'up' | 'down';
  };
}): string {
  const label = escapeHTML(metric.label);
  const value = escapeHTML(String(metric.value));

  const changeHTML = metric.change
    ? `
      <div class="slideyui-metric-change slideyui-metric-change-${metric.change.direction}">
        <span class="slideyui-metric-arrow" aria-hidden="true">
          ${metric.change.direction === 'up' ? '↑' : '↓'}
        </span>
        <span class="slideyui-metric-change-value">
          ${Math.abs(metric.change.value)}%
        </span>
      </div>
    `
    : '';

  return `
    <div class="slideyui-metric-card">
      <div class="slideyui-metric-label">${label}</div>
      <div class="slideyui-metric-value">${value}</div>
      ${changeHTML}
    </div>
  `;
}

/**
 * Render chart placeholder (actual chart rendering would be done client-side)
 */
function renderChart(chart: {
  type: 'line' | 'bar' | 'pie' | 'area';
  data: Record<string, unknown>;
}): string {
  const chartType = escapeHTML(chart.type);
  const dataJson = escapeHTML(JSON.stringify(chart.data));

  return `
    <div class="slideyui-chart-container" data-chart-type="${chartType}" data-chart-data="${dataJson}">
      <div class="slideyui-chart-placeholder">
        <div class="slideyui-chart-icon" aria-hidden="true">📊</div>
        <p class="slideyui-chart-label">${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart</p>
      </div>
    </div>
  `;
}

/**
 * Get layout classes based on layout option
 */
function getLayoutClasses(layout: string): {
  chartClass: string;
  metricsClass: string;
} {
  switch (layout) {
    case 'chart-right':
      return {
        chartClass: 'col-span-12 md:col-span-8 order-2 md:order-2',
        metricsClass: 'col-span-12 md:col-span-4 order-1 md:order-1',
      };
    case 'chart-top':
      return {
        chartClass: 'col-span-12',
        metricsClass: 'col-span-12',
      };
    case 'chart-left':
    default:
      return {
        chartClass: 'col-span-12 md:col-span-8',
        metricsClass: 'col-span-12 md:col-span-4',
      };
  }
}

export function chartWithMetricsTemplate(
  spec: ChartWithMetricsSlideSpec,
  _options: GenerationOptions
): string {
  const title = escapeHTML(spec.title);
  const layout = spec.layout ?? 'chart-left';
  const { chartClass, metricsClass } = getLayoutClasses(layout);

  const chartHTML = renderChart(spec.chart);
  const metricsHTML = spec.metrics
    .map((metric) => renderMetric(metric))
    .join('\n');

  return `
    <div class="slideyui-card slideyui-chart-metrics-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        <div class="grid grid-cols-12 gap-6 md:gap-8">
          <div class="${chartClass}">
            ${chartHTML}
          </div>
          <div class="${metricsClass}">
            <div class="slideyui-metrics-grid grid grid-cols-1 gap-4">
              ${metricsHTML}
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
