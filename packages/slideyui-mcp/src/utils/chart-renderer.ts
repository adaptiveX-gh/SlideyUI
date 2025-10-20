/**
 * Chart rendering utility for SlideyUI presentations
 *
 * Generates inline SVG charts optimized for:
 * - Projection displays (24px minimum fonts, high contrast)
 * - Print/PDF export (vector graphics)
 * - Theme integration (SlideyUI color palettes)
 * - AI generation (simple, semantic data structures)
 *
 * Uses pure SVG (no external dependencies) for maximum compatibility.
 */

import type { Theme } from '../types/index.js';

/**
 * Chart data format (standard structure for all chart types)
 */
export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

/**
 * Dataset definition
 */
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
}

/**
 * Chart configuration options
 */
export interface ChartOptions {
  width?: number;
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  showValues?: boolean;
  title?: string;
}

/**
 * Supported chart types
 */
export type ChartType = 'bar' | 'line' | 'pie' | 'area' | 'doughnut' | 'scatter';

/**
 * Theme-aware color palettes for charts
 */
const themeColors: Record<Theme, string[]> = {
  corporate: ['#1e40af', '#0891b2', '#64748b', '#0f766e', '#0369a1', '#1e3a8a'],
  'pitch-deck': ['#7c3aed', '#ec4899', '#f59e0b', '#8b5cf6', '#d946ef', '#fb923c'],
  academic: ['#1e3a8a', '#92400e', '#065f46', '#7c2d12', '#14532d', '#1e40af'],
  workshop: ['#2563eb', '#10b981', '#f97316', '#14b8a6', '#06b6d4', '#f59e0b'],
  startup: ['#0ea5e9', '#8b5cf6', '#06b6d4', '#3b82f6', '#a855f7', '#0284c7'],
};

/**
 * Get theme colors for chart elements
 */
function getThemeColors(theme: Theme): string[] {
  return themeColors[theme] || themeColors.corporate;
}

/**
 * Generate colors for datasets
 */
function generateColors(count: number, theme: Theme): string[] {
  const colors = getThemeColors(theme);
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
}

/**
 * Main chart rendering function
 */
export function renderChart(
  chartType: ChartType,
  data: ChartData,
  theme: Theme,
  options: ChartOptions = {}
): string {
  const {
    width = 1200,
    height = 600,
    showLegend = true,
    showGrid = true,
    showValues = false,
    title,
  } = options;

  // Validate data
  if (!data.labels || data.labels.length === 0) {
    return renderError('No labels provided');
  }
  if (!data.datasets || data.datasets.length === 0) {
    return renderError('No datasets provided');
  }

  // Route to appropriate renderer
  switch (chartType) {
    case 'bar':
      return renderBarChart(data, theme, width, height, showLegend, showGrid, showValues, title);
    case 'line':
      return renderLineChart(data, theme, width, height, showLegend, showGrid, showValues, title);
    case 'area':
      return renderAreaChart(data, theme, width, height, showLegend, showGrid, showValues, title);
    case 'pie':
      return renderPieChart(data, theme, width, height, showLegend, showValues, title);
    case 'doughnut':
      return renderDoughnutChart(data, theme, width, height, showLegend, showValues, title);
    case 'scatter':
      return renderScatterChart(data, theme, width, height, showLegend, showGrid, showValues, title);
    default:
      return renderError(`Unsupported chart type: ${chartType}`);
  }
}

/**
 * Render error message
 */
function renderError(message: string): string {
  return `
    <div style="padding: 2rem; text-align: center; color: #dc2626;">
      <p style="font-size: 24px; font-weight: 600;">Chart Error</p>
      <p style="font-size: 20px;">${escapeHtml(message)}</p>
    </div>
  `;
}

/**
 * Escape HTML entities
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Render bar chart
 */
function renderBarChart(
  data: ChartData,
  theme: Theme,
  width: number,
  height: number,
  showLegend: boolean,
  showGrid: boolean,
  showValues: boolean,
  title?: string
): string {
  const padding = { top: 60, right: 40, bottom: 100, left: 80 };
  const legendHeight = showLegend ? 60 : 0;
  const titleHeight = title ? 50 : 0;
  const chartHeight = height - padding.top - padding.bottom - legendHeight - titleHeight;
  const chartWidth = width - padding.left - padding.right;

  // Calculate max value and scale
  const allValues = data.datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues, 0);
  const minValue = Math.min(...allValues, 0);
  const valueRange = maxValue - minValue;
  const scale = valueRange > 0 ? chartHeight / valueRange : 1;

  // Bar configuration
  const barGroupWidth = chartWidth / data.labels.length;
  const barWidth = Math.min(barGroupWidth / data.datasets.length - 10, 60);
  const colors = generateColors(data.datasets.length, theme);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; font-family: system-ui, sans-serif;">`;

  // Title
  if (title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="28" font-weight="600" fill="#000">${escapeHtml(title)}</text>`;
  }

  const yOffset = titleHeight;

  // Grid lines
  if (showGrid) {
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + yOffset + (chartHeight / gridLines) * i;
      svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
    }
  }

  // Y-axis
  svg += `<line x1="${padding.left}" y1="${padding.top + yOffset}" x2="${padding.left}" y2="${padding.top + yOffset + chartHeight}" stroke="#374151" stroke-width="2"/>`;

  // X-axis
  const xAxisY = padding.top + yOffset + chartHeight;
  svg += `<line x1="${padding.left}" y1="${xAxisY}" x2="${width - padding.right}" y2="${xAxisY}" stroke="#374151" stroke-width="2"/>`;

  // Y-axis labels
  const yLabels = 5;
  for (let i = 0; i <= yLabels; i++) {
    const value = maxValue - (valueRange / yLabels) * i;
    const y = padding.top + yOffset + (chartHeight / yLabels) * i;
    svg += `<text x="${padding.left - 10}" y="${y + 6}" text-anchor="end" font-size="20" fill="#4b5563">${Math.round(value)}</text>`;
  }

  // Bars
  data.labels.forEach((label, labelIndex) => {
    const groupX = padding.left + labelIndex * barGroupWidth;

    data.datasets.forEach((dataset, datasetIndex) => {
      const value = dataset.data[labelIndex] ?? 0;
      const barHeight = Math.abs(value * scale);
      const barX = groupX + datasetIndex * (barWidth + 10) + barGroupWidth / 2 - (data.datasets.length * (barWidth + 10)) / 2;
      const barY = value >= 0 ? xAxisY - barHeight : xAxisY;

      const color = dataset.backgroundColor
        ? Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[labelIndex] ?? colors[datasetIndex]
          : dataset.backgroundColor
        : colors[datasetIndex];

      svg += `<rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" fill="${color}" rx="4"/>`;

      // Value labels
      if (showValues) {
        const textY = value >= 0 ? barY - 10 : barY + barHeight + 25;
        svg += `<text x="${barX + barWidth / 2}" y="${textY}" text-anchor="middle" font-size="18" font-weight="500" fill="#374151">${value}</text>`;
      }
    });

    // X-axis labels
    const labelX = groupX + barGroupWidth / 2;
    svg += `<text x="${labelX}" y="${xAxisY + 35}" text-anchor="middle" font-size="20" fill="#4b5563">${escapeHtml(label)}</text>`;
  });

  // Legend
  if (showLegend) {
    const legendY = height - legendHeight + 20;
    const legendItemWidth = 200;
    const legendStartX = width / 2 - (data.datasets.length * legendItemWidth) / 2;

    data.datasets.forEach((dataset, index) => {
      const x = legendStartX + index * legendItemWidth;
      const color = colors[index];

      svg += `<rect x="${x}" y="${legendY}" width="20" height="20" fill="${color}" rx="2"/>`;
      svg += `<text x="${x + 30}" y="${legendY + 16}" font-size="20" fill="#374151">${escapeHtml(dataset.label)}</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

/**
 * Render line chart
 */
function renderLineChart(
  data: ChartData,
  theme: Theme,
  width: number,
  height: number,
  showLegend: boolean,
  showGrid: boolean,
  showValues: boolean,
  title?: string
): string {
  const padding = { top: 60, right: 40, bottom: 100, left: 80 };
  const legendHeight = showLegend ? 60 : 0;
  const titleHeight = title ? 50 : 0;
  const chartHeight = height - padding.top - padding.bottom - legendHeight - titleHeight;
  const chartWidth = width - padding.left - padding.right;

  const allValues = data.datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues, 0);
  const minValue = Math.min(...allValues, 0);
  const valueRange = maxValue - minValue;
  const scale = valueRange > 0 ? chartHeight / valueRange : 1;

  const pointSpacing = chartWidth / (data.labels.length - 1 || 1);
  const colors = generateColors(data.datasets.length, theme);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; font-family: system-ui, sans-serif;">`;

  if (title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="28" font-weight="600" fill="#000">${escapeHtml(title)}</text>`;
  }

  const yOffset = titleHeight;

  // Grid
  if (showGrid) {
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + yOffset + (chartHeight / gridLines) * i;
      svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
    }
  }

  // Axes
  svg += `<line x1="${padding.left}" y1="${padding.top + yOffset}" x2="${padding.left}" y2="${padding.top + yOffset + chartHeight}" stroke="#374151" stroke-width="2"/>`;
  const xAxisY = padding.top + yOffset + chartHeight;
  svg += `<line x1="${padding.left}" y1="${xAxisY}" x2="${width - padding.right}" y2="${xAxisY}" stroke="#374151" stroke-width="2"/>`;

  // Y-axis labels
  const yLabels = 5;
  for (let i = 0; i <= yLabels; i++) {
    const value = maxValue - (valueRange / yLabels) * i;
    const y = padding.top + yOffset + (chartHeight / yLabels) * i;
    svg += `<text x="${padding.left - 10}" y="${y + 6}" text-anchor="end" font-size="20" fill="#4b5563">${Math.round(value)}</text>`;
  }

  // Lines and points
  data.datasets.forEach((dataset, datasetIndex) => {
    const color = dataset.borderColor || colors[datasetIndex];
    const pointColor = dataset.backgroundColor
      ? Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor[0]
        : dataset.backgroundColor
      : color;

    // Build path
    let pathD = '';
    dataset.data.forEach((value, index) => {
      const x = padding.left + index * pointSpacing;
      const y = xAxisY - (value - minValue) * scale;
      pathD += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    // Draw line
    svg += `<path d="${pathD}" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

    // Draw points
    dataset.data.forEach((value, index) => {
      const x = padding.left + index * pointSpacing;
      const y = xAxisY - (value - minValue) * scale;
      svg += `<circle cx="${x}" cy="${y}" r="8" fill="${pointColor}" stroke="#fff" stroke-width="2"/>`;

      if (showValues) {
        svg += `<text x="${x}" y="${y - 15}" text-anchor="middle" font-size="18" font-weight="500" fill="#374151">${value}</text>`;
      }
    });
  });

  // X-axis labels
  data.labels.forEach((label, index) => {
    const x = padding.left + index * pointSpacing;
    svg += `<text x="${x}" y="${xAxisY + 35}" text-anchor="middle" font-size="20" fill="#4b5563">${escapeHtml(label)}</text>`;
  });

  // Legend
  if (showLegend) {
    const legendY = height - legendHeight + 20;
    const legendItemWidth = 200;
    const legendStartX = width / 2 - (data.datasets.length * legendItemWidth) / 2;

    data.datasets.forEach((dataset, index) => {
      const x = legendStartX + index * legendItemWidth;
      const color = colors[index];

      svg += `<rect x="${x}" y="${legendY}" width="20" height="20" fill="${color}" rx="2"/>`;
      svg += `<text x="${x + 30}" y="${legendY + 16}" font-size="20" fill="#374151">${escapeHtml(dataset.label)}</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

/**
 * Render area chart
 */
function renderAreaChart(
  data: ChartData,
  theme: Theme,
  width: number,
  height: number,
  showLegend: boolean,
  showGrid: boolean,
  showValues: boolean,
  title?: string
): string {
  const padding = { top: 60, right: 40, bottom: 100, left: 80 };
  const legendHeight = showLegend ? 60 : 0;
  const titleHeight = title ? 50 : 0;
  const chartHeight = height - padding.top - padding.bottom - legendHeight - titleHeight;
  const chartWidth = width - padding.left - padding.right;

  const allValues = data.datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues, 0);
  const minValue = Math.min(...allValues, 0);
  const valueRange = maxValue - minValue;
  const scale = valueRange > 0 ? chartHeight / valueRange : 1;

  const pointSpacing = chartWidth / (data.labels.length - 1 || 1);
  const colors = generateColors(data.datasets.length, theme);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; font-family: system-ui, sans-serif;">`;

  if (title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="28" font-weight="600" fill="#000">${escapeHtml(title)}</text>`;
  }

  const yOffset = titleHeight;

  // Grid
  if (showGrid) {
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + yOffset + (chartHeight / gridLines) * i;
      svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
    }
  }

  // Axes
  svg += `<line x1="${padding.left}" y1="${padding.top + yOffset}" x2="${padding.left}" y2="${padding.top + yOffset + chartHeight}" stroke="#374151" stroke-width="2"/>`;
  const xAxisY = padding.top + yOffset + chartHeight;
  svg += `<line x1="${padding.left}" y1="${xAxisY}" x2="${width - padding.right}" y2="${xAxisY}" stroke="#374151" stroke-width="2"/>`;

  // Y-axis labels
  const yLabels = 5;
  for (let i = 0; i <= yLabels; i++) {
    const value = maxValue - (valueRange / yLabels) * i;
    const y = padding.top + yOffset + (chartHeight / yLabels) * i;
    svg += `<text x="${padding.left - 10}" y="${y + 6}" text-anchor="end" font-size="20" fill="#4b5563">${Math.round(value)}</text>`;
  }

  // Areas
  data.datasets.forEach((dataset, datasetIndex) => {
    const color = colors[datasetIndex];

    // Build area path
    let pathD = '';
    dataset.data.forEach((value, index) => {
      const x = padding.left + index * pointSpacing;
      const y = xAxisY - (value - minValue) * scale;
      pathD += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });

    // Close path to baseline
    const lastX = padding.left + (dataset.data.length - 1) * pointSpacing;
    pathD += ` L ${lastX} ${xAxisY} L ${padding.left} ${xAxisY} Z`;

    // Draw filled area with transparency
    svg += `<path d="${pathD}" fill="${color}" fill-opacity="0.3"/>`;

    // Draw line on top
    let linePath = '';
    dataset.data.forEach((value, index) => {
      const x = padding.left + index * pointSpacing;
      const y = xAxisY - (value - minValue) * scale;
      linePath += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });
    svg += `<path d="${linePath}" stroke="${color}" stroke-width="3" fill="none"/>`;
  });

  // X-axis labels
  data.labels.forEach((label, index) => {
    const x = padding.left + index * pointSpacing;
    svg += `<text x="${x}" y="${xAxisY + 35}" text-anchor="middle" font-size="20" fill="#4b5563">${escapeHtml(label)}</text>`;
  });

  // Legend
  if (showLegend) {
    const legendY = height - legendHeight + 20;
    const legendItemWidth = 200;
    const legendStartX = width / 2 - (data.datasets.length * legendItemWidth) / 2;

    data.datasets.forEach((dataset, index) => {
      const x = legendStartX + index * legendItemWidth;
      const color = colors[index];

      svg += `<rect x="${x}" y="${legendY}" width="20" height="20" fill="${color}" rx="2"/>`;
      svg += `<text x="${x + 30}" y="${legendY + 16}" font-size="20" fill="#374151">${escapeHtml(dataset.label)}</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

/**
 * Render pie chart
 */
function renderPieChart(
  data: ChartData,
  theme: Theme,
  width: number,
  height: number,
  showLegend: boolean,
  showValues: boolean,
  title?: string
): string {
  const titleHeight = title ? 50 : 0;
  const legendHeight = showLegend ? Math.min(data.labels.length * 35, 200) : 0;
  const chartSize = Math.min(width - 100, height - titleHeight - legendHeight - 100);
  const radius = chartSize / 2;
  const centerX = width / 2;
  const centerY = titleHeight + 50 + radius;

  // Use first dataset only for pie charts
  const dataset = data.datasets[0];
  if (!dataset) {
    return renderError('No dataset provided for pie chart');
  }

  const values = dataset.data;
  const total = values.reduce((sum, val) => sum + val, 0);
  const colors = generateColors(values.length, theme);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; font-family: system-ui, sans-serif;">`;

  if (title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="28" font-weight="600" fill="#000">${escapeHtml(title)}</text>`;
  }

  // Draw pie slices
  let currentAngle = -90; // Start at top

  values.forEach((value, index) => {
    const sliceAngle = (value / total) * 360;
    const startAngle = (currentAngle * Math.PI) / 180;
    const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const color = Array.isArray(dataset.backgroundColor)
      ? dataset.backgroundColor[index] ?? colors[index]
      : colors[index];

    const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    svg += `<path d="${pathD}" fill="${color}" stroke="#fff" stroke-width="3"/>`;

    // Value labels
    if (showValues) {
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelRadius = radius * 0.7;
      const labelX = centerX + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
      const labelY = centerY + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

      const percentage = ((value / total) * 100).toFixed(1);
      svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="22" font-weight="600" fill="#fff">${percentage}%</text>`;
    }

    currentAngle += sliceAngle;
  });

  // Legend
  if (showLegend) {
    const legendY = height - legendHeight - 20;
    const legendX = 50;

    data.labels.forEach((label, index) => {
      const y = legendY + index * 35;
      const color = colors[index];
      const value = values[index];
      const percentage = ((value / total) * 100).toFixed(1);

      svg += `<rect x="${legendX}" y="${y}" width="24" height="24" fill="${color}" rx="2"/>`;
      svg += `<text x="${legendX + 35}" y="${y + 18}" font-size="20" fill="#374151">${escapeHtml(label)} (${percentage}%)</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

/**
 * Render doughnut chart
 */
function renderDoughnutChart(
  data: ChartData,
  theme: Theme,
  width: number,
  height: number,
  showLegend: boolean,
  showValues: boolean,
  title?: string
): string {
  const titleHeight = title ? 50 : 0;
  const legendHeight = showLegend ? Math.min(data.labels.length * 35, 200) : 0;
  const chartSize = Math.min(width - 100, height - titleHeight - legendHeight - 100);
  const outerRadius = chartSize / 2;
  const innerRadius = outerRadius * 0.6;
  const centerX = width / 2;
  const centerY = titleHeight + 50 + outerRadius;

  const dataset = data.datasets[0];
  if (!dataset) {
    return renderError('No dataset provided for doughnut chart');
  }

  const values = dataset.data;
  const total = values.reduce((sum, val) => sum + val, 0);
  const colors = generateColors(values.length, theme);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; font-family: system-ui, sans-serif;">`;

  if (title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="28" font-weight="600" fill="#000">${escapeHtml(title)}</text>`;
  }

  let currentAngle = -90;

  values.forEach((value, index) => {
    const sliceAngle = (value / total) * 360;
    const startAngle = (currentAngle * Math.PI) / 180;
    const endAngle = ((currentAngle + sliceAngle) * Math.PI) / 180;

    // Outer arc
    const x1 = centerX + outerRadius * Math.cos(startAngle);
    const y1 = centerY + outerRadius * Math.sin(startAngle);
    const x2 = centerX + outerRadius * Math.cos(endAngle);
    const y2 = centerY + outerRadius * Math.sin(endAngle);

    // Inner arc
    const x3 = centerX + innerRadius * Math.cos(endAngle);
    const y3 = centerY + innerRadius * Math.sin(endAngle);
    const x4 = centerX + innerRadius * Math.cos(startAngle);
    const y4 = centerY + innerRadius * Math.sin(startAngle);

    const largeArc = sliceAngle > 180 ? 1 : 0;
    const color = Array.isArray(dataset.backgroundColor)
      ? dataset.backgroundColor[index] ?? colors[index]
      : colors[index];

    const pathD = `M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`;

    svg += `<path d="${pathD}" fill="${color}" stroke="#fff" stroke-width="3"/>`;

    if (showValues) {
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelRadius = (outerRadius + innerRadius) / 2;
      const labelX = centerX + labelRadius * Math.cos((labelAngle * Math.PI) / 180);
      const labelY = centerY + labelRadius * Math.sin((labelAngle * Math.PI) / 180);

      const percentage = ((value / total) * 100).toFixed(1);
      svg += `<text x="${labelX}" y="${labelY}" text-anchor="middle" font-size="22" font-weight="600" fill="#fff">${percentage}%</text>`;
    }

    currentAngle += sliceAngle;
  });

  // Center text
  svg += `<text x="${centerX}" y="${centerY}" text-anchor="middle" font-size="32" font-weight="600" fill="#374151">Total</text>`;
  svg += `<text x="${centerX}" y="${centerY + 35}" text-anchor="middle" font-size="36" font-weight="700" fill="#000">${total}</text>`;

  // Legend
  if (showLegend) {
    const legendY = height - legendHeight - 20;
    const legendX = 50;

    data.labels.forEach((label, index) => {
      const y = legendY + index * 35;
      const color = colors[index];
      const value = values[index];
      const percentage = ((value / total) * 100).toFixed(1);

      svg += `<rect x="${legendX}" y="${y}" width="24" height="24" fill="${color}" rx="2"/>`;
      svg += `<text x="${legendX + 35}" y="${y + 18}" font-size="20" fill="#374151">${escapeHtml(label)} (${percentage}%)</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}

/**
 * Render scatter chart
 */
function renderScatterChart(
  data: ChartData,
  theme: Theme,
  width: number,
  height: number,
  showLegend: boolean,
  showGrid: boolean,
  _showValues: boolean,
  title?: string
): string {
  const padding = { top: 60, right: 40, bottom: 100, left: 80 };
  const legendHeight = showLegend ? 60 : 0;
  const titleHeight = title ? 50 : 0;
  const chartHeight = height - padding.top - padding.bottom - legendHeight - titleHeight;
  const chartWidth = width - padding.left - padding.right;

  const allValues = data.datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues, 0);
  const minValue = Math.min(...allValues, 0);
  const valueRange = maxValue - minValue;
  const scale = valueRange > 0 ? chartHeight / valueRange : 1;

  const pointSpacing = chartWidth / (data.labels.length - 1 || 1);
  const colors = generateColors(data.datasets.length, theme);

  let svg = `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="max-width: 100%; height: auto; font-family: system-ui, sans-serif;">`;

  if (title) {
    svg += `<text x="${width / 2}" y="30" text-anchor="middle" font-size="28" font-weight="600" fill="#000">${escapeHtml(title)}</text>`;
  }

  const yOffset = titleHeight;

  // Grid
  if (showGrid) {
    const gridLines = 5;
    for (let i = 0; i <= gridLines; i++) {
      const y = padding.top + yOffset + (chartHeight / gridLines) * i;
      svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e5e7eb" stroke-width="1"/>`;
    }
  }

  // Axes
  svg += `<line x1="${padding.left}" y1="${padding.top + yOffset}" x2="${padding.left}" y2="${padding.top + yOffset + chartHeight}" stroke="#374151" stroke-width="2"/>`;
  const xAxisY = padding.top + yOffset + chartHeight;
  svg += `<line x1="${padding.left}" y1="${xAxisY}" x2="${width - padding.right}" y2="${xAxisY}" stroke="#374151" stroke-width="2"/>`;

  // Y-axis labels
  const yLabels = 5;
  for (let i = 0; i <= yLabels; i++) {
    const value = maxValue - (valueRange / yLabels) * i;
    const y = padding.top + yOffset + (chartHeight / yLabels) * i;
    svg += `<text x="${padding.left - 10}" y="${y + 6}" text-anchor="end" font-size="20" fill="#4b5563">${Math.round(value)}</text>`;
  }

  // Scatter points
  data.datasets.forEach((dataset, datasetIndex) => {
    const color = dataset.backgroundColor
      ? Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor[0]
        : dataset.backgroundColor
      : colors[datasetIndex];

    dataset.data.forEach((value, index) => {
      const x = padding.left + index * pointSpacing;
      const y = xAxisY - (value - minValue) * scale;
      svg += `<circle cx="${x}" cy="${y}" r="10" fill="${color}" opacity="0.7" stroke="#fff" stroke-width="2"/>`;
    });
  });

  // X-axis labels
  data.labels.forEach((label, index) => {
    const x = padding.left + index * pointSpacing;
    svg += `<text x="${x}" y="${xAxisY + 35}" text-anchor="middle" font-size="20" fill="#4b5563">${escapeHtml(label)}</text>`;
  });

  // Legend
  if (showLegend) {
    const legendY = height - legendHeight + 20;
    const legendItemWidth = 200;
    const legendStartX = width / 2 - (data.datasets.length * legendItemWidth) / 2;

    data.datasets.forEach((dataset, index) => {
      const x = legendStartX + index * legendItemWidth;
      const color = colors[index];

      svg += `<circle cx="${x + 10}" cy="${legendY + 10}" r="10" fill="${color}"/>`;
      svg += `<text x="${x + 30}" y="${legendY + 16}" font-size="20" fill="#374151">${escapeHtml(dataset.label)}</text>`;
    });
  }

  svg += `</svg>`;
  return svg;
}
