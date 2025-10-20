/**
 * Data slide template
 *
 * Renders slides with tables or charts.
 */

import type { DataSlideSpec, GenerationOptions, ChartData, Theme } from '../types/index.js';
import { escapeHTML } from '../utils/html.js';
import { renderChart } from '../utils/chart-renderer.js';

export function dataTemplate(
  spec: DataSlideSpec,
  options: GenerationOptions
): string {
  const title = escapeHTML(spec.title);

  let dataHTML = '';

  if (spec.dataType === 'table') {
    // Table data is always Record[] or string[][]
    if (isChartData(spec.data)) {
      dataHTML = renderChartError('Table type selected but chart data provided');
    } else {
      dataHTML = renderTable(spec.data);
    }
  } else if (spec.dataType === 'chart') {
    dataHTML = renderChartContent(spec, options);
  }

  return `
    <div class="slideyui-card slideyui-data-card">
      <div class="slideyui-card-header">
        <h2 class="slideyui-card-title">${title}</h2>
      </div>
      <div class="slideyui-card-content">
        ${dataHTML}
      </div>
    </div>
  `;
}

function renderTable(data: Record<string, unknown>[] | string[][]): string {
  if (data.length === 0) {
    return '<p>No data available</p>';
  }

  // Handle array of objects
  if (typeof data[0] === 'object' && !Array.isArray(data[0])) {
    const objData = data as Record<string, unknown>[];
    const headers = Object.keys(objData[0] ?? {});

    return `
      <table class="slideyui-table">
        <thead>
          <tr>
            ${headers.map((h) => `<th>${escapeHTML(h)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${objData
            .map(
              (row) => `
            <tr>
              ${headers.map((h) => `<td>${escapeHTML(String(row[h] ?? ''))}</td>`).join('')}
            </tr>
          `
            )
            .join('')}
        </tbody>
      </table>
    `;
  }

  // Handle 2D array
  const arrayData = data as string[][];
  const headers = arrayData[0];
  const rows = arrayData.slice(1);

  return `
    <table class="slideyui-table">
      <thead>
        <tr>
          ${headers?.map((h) => `<th>${escapeHTML(h)}</th>`).join('') ?? ''}
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
          <tr>
            ${row.map((cell) => `<td>${escapeHTML(cell)}</td>`).join('')}
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  `;
}

/**
 * Render chart content
 */
function renderChartContent(spec: DataSlideSpec, options: GenerationOptions): string {
  const chartType = spec.chartType ?? 'bar';

  // Validate that data is in ChartData format
  if (!isChartData(spec.data)) {
    return renderChartError(
      'Invalid chart data format. Expected { labels: string[], datasets: ChartDataset[] }'
    );
  }

  // Get theme from options, default to 'corporate' if not provided
  const theme: Theme = options.theme ?? 'corporate';

  try {
    return renderChart(chartType, spec.data, theme, {
      width: 1200,
      height: 600,
      showLegend: true,
      showGrid: true,
      showValues: false,
    });
  } catch (error) {
    return renderChartError(error instanceof Error ? error.message : 'Unknown error rendering chart');
  }
}

/**
 * Type guard to check if data is ChartData format
 */
function isChartData(data: unknown): data is ChartData {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    Array.isArray(obj.labels) &&
    Array.isArray(obj.datasets) &&
    obj.datasets.every((ds: unknown) => {
      if (typeof ds !== 'object' || ds === null) return false;
      const dataset = ds as Record<string, unknown>;
      return (
        typeof dataset.label === 'string' &&
        Array.isArray(dataset.data) &&
        dataset.data.every((v: unknown) => typeof v === 'number')
      );
    })
  );
}

/**
 * Render chart error message
 */
function renderChartError(message: string): string {
  return `
    <div class="slideyui-chart-error" style="padding: 2rem; text-align: center; color: #dc2626; background: #fef2f2; border: 2px solid #dc2626; border-radius: 8px;">
      <p style="font-size: 24px; font-weight: 600; margin-bottom: 1rem;">Chart Error</p>
      <p style="font-size: 20px;">${escapeHTML(message)}</p>
    </div>
  `;
}
