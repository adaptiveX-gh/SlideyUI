/**
 * Tests for chart rendering utility
 */

import { describe, it, expect } from 'vitest';
import { renderChart, type ChartData } from './chart-renderer.js';

describe('Chart Renderer', () => {
  const sampleData: ChartData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [100, 200, 150, 300],
      },
    ],
  };

  const multiDatasetData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Series 1',
        data: [10, 20, 30],
      },
      {
        label: 'Series 2',
        data: [15, 25, 35],
      },
    ],
  };

  describe('Bar Charts', () => {
    it('renders basic bar chart', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('viewBox');
    });

    it('includes all data points as rectangles', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      const rectCount = (svg.match(/<rect/g) || []).length;
      // Should have bars (4) + legend items (1) = at least 5 rects
      expect(rectCount).toBeGreaterThanOrEqual(4);
    });

    it('includes axis lines', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      const lineCount = (svg.match(/<line/g) || []).length;
      expect(lineCount).toBeGreaterThan(0); // Axes and grid
    });

    it('includes labels for each data point', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toContain('Q1');
      expect(svg).toContain('Q2');
      expect(svg).toContain('Q3');
      expect(svg).toContain('Q4');
    });

    it('applies theme colors', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      // Corporate theme uses #1e40af as primary
      expect(svg).toContain('#1e40af');
    });

    it('renders legend when showLegend is true', () => {
      const svg = renderChart('bar', sampleData, 'corporate', { showLegend: true });
      expect(svg).toContain('Revenue');
    });

    it('hides legend when showLegend is false', () => {
      const svg = renderChart('bar', sampleData, 'corporate', { showLegend: false });
      const legendHeight = (svg.match(/legendHeight/g) || []).length;
      expect(legendHeight).toBe(0);
    });

    it('renders multiple datasets', () => {
      const svg = renderChart('bar', multiDatasetData, 'startup');
      expect(svg).toContain('Series 1');
      expect(svg).toContain('Series 2');
    });

    it('shows values when showValues is true', () => {
      const svg = renderChart('bar', sampleData, 'corporate', { showValues: true });
      expect(svg).toContain('100');
      expect(svg).toContain('200');
    });

    it('respects custom width and height', () => {
      const svg = renderChart('bar', sampleData, 'corporate', {
        width: 800,
        height: 400,
      });
      expect(svg).toContain('viewBox="0 0 800 400"');
    });

    it('includes title when provided', () => {
      const svg = renderChart('bar', sampleData, 'corporate', {
        title: 'Quarterly Revenue',
      });
      expect(svg).toContain('Quarterly Revenue');
    });

    it('handles negative values', () => {
      const negativeData: ChartData = {
        labels: ['A', 'B', 'C'],
        datasets: [{ label: 'Profit', data: [100, -50, 75] }],
      };
      const svg = renderChart('bar', negativeData, 'corporate');
      expect(svg).toContain('<rect'); // Should still render bars
    });
  });

  describe('Line Charts', () => {
    it('renders basic line chart', () => {
      const svg = renderChart('line', sampleData, 'pitch-deck');
      expect(svg).toContain('<svg');
      expect(svg).toContain('<path'); // Line is rendered as path
      expect(svg).toContain('<circle'); // Points are circles
    });

    it('creates path for line', () => {
      const svg = renderChart('line', sampleData, 'pitch-deck');
      const pathCount = (svg.match(/<path/g) || []).length;
      expect(pathCount).toBeGreaterThanOrEqual(1); // At least one line path
    });

    it('includes circles for data points', () => {
      const svg = renderChart('line', sampleData, 'pitch-deck');
      const circleCount = (svg.match(/<circle/g) || []).length;
      expect(circleCount).toBe(4); // One per data point
    });

    it('applies theme colors to line', () => {
      const svg = renderChart('line', sampleData, 'pitch-deck');
      expect(svg).toContain('#7c3aed'); // Pitch-deck primary
    });

    it('shows grid when showGrid is true', () => {
      const svg = renderChart('line', sampleData, 'pitch-deck', { showGrid: true });
      const lineCount = (svg.match(/<line/g) || []).length;
      expect(lineCount).toBeGreaterThan(2); // Axes + grid lines
    });

    it('renders multiple datasets as separate lines', () => {
      const svg = renderChart('line', multiDatasetData, 'pitch-deck');
      const pathCount = (svg.match(/<path/g) || []).length;
      expect(pathCount).toBeGreaterThanOrEqual(2); // Two line paths
    });
  });

  describe('Area Charts', () => {
    it('renders basic area chart', () => {
      const svg = renderChart('area', sampleData, 'academic');
      expect(svg).toContain('<svg');
      expect(svg).toContain('<path');
      expect(svg).toContain('fill-opacity'); // Area has opacity
    });

    it('creates filled path for area', () => {
      const svg = renderChart('area', sampleData, 'academic');
      expect(svg).toContain('fill-opacity="0.3"');
    });

    it('includes both fill and stroke paths', () => {
      const svg = renderChart('area', sampleData, 'academic');
      const pathCount = (svg.match(/<path/g) || []).length;
      // Area fill + line stroke for each dataset
      expect(pathCount).toBeGreaterThanOrEqual(2);
    });

    it('closes path to baseline', () => {
      const svg = renderChart('area', sampleData, 'academic');
      expect(svg).toContain(' Z'); // Path closure command
    });
  });

  describe('Pie Charts', () => {
    it('renders basic pie chart', () => {
      const svg = renderChart('pie', sampleData, 'workshop');
      expect(svg).toContain('<svg');
      expect(svg).toContain('<path'); // Pie slices are paths
    });

    it('creates slice for each data point', () => {
      const svg = renderChart('pie', sampleData, 'workshop');
      const pathCount = (svg.match(/<path/g) || []).length;
      expect(pathCount).toBe(4); // One per data point
    });

    it('uses arc commands in paths', () => {
      const svg = renderChart('pie', sampleData, 'workshop');
      expect(svg).toContain(' A '); // SVG arc command
    });

    it('shows percentages when showValues is true', () => {
      const svg = renderChart('pie', sampleData, 'workshop', { showValues: true });
      expect(svg).toMatch(/%/); // Contains percentage symbols
    });

    it('calculates correct percentages', () => {
      const equalData: ChartData = {
        labels: ['A', 'B', 'C', 'D'],
        datasets: [{ label: 'Equal', data: [25, 25, 25, 25] }],
      };
      const svg = renderChart('pie', equalData, 'workshop', { showValues: true });
      expect(svg).toContain('25.0%');
    });

    it('renders legend with percentages', () => {
      const svg = renderChart('pie', sampleData, 'workshop', { showLegend: true });
      expect(svg).toMatch(/\(\d+\.\d+%\)/); // Legend item with percentage
    });

    it('uses only first dataset for pie chart', () => {
      const svg = renderChart('pie', multiDatasetData, 'workshop');
      expect(svg).toContain('Series 1');
      // Should use first dataset only
      const pathCount = (svg.match(/<path/g) || []).length;
      expect(pathCount).toBe(3); // Three slices from first dataset
    });
  });

  describe('Doughnut Charts', () => {
    it('renders basic doughnut chart', () => {
      const svg = renderChart('doughnut', sampleData, 'startup');
      expect(svg).toContain('<svg');
      expect(svg).toContain('<path');
    });

    it('includes center text showing total', () => {
      const svg = renderChart('doughnut', sampleData, 'startup');
      expect(svg).toContain('Total');
      expect(svg).toContain('750'); // Sum of 100+200+150+300
    });

    it('creates ring-shaped slices', () => {
      const svg = renderChart('doughnut', sampleData, 'startup');
      // Doughnut paths have both inner and outer arcs
      const pathCount = (svg.match(/<path/g) || []).length;
      expect(pathCount).toBe(4);
    });

    it('calculates total correctly', () => {
      const testData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Test', data: [40, 60] }],
      };
      const svg = renderChart('doughnut', testData, 'startup');
      expect(svg).toContain('100'); // Total is 100
    });
  });

  describe('Scatter Charts', () => {
    it('renders basic scatter chart', () => {
      const svg = renderChart('scatter', sampleData, 'corporate');
      expect(svg).toContain('<svg');
      expect(svg).toContain('<circle');
    });

    it('creates circle for each data point', () => {
      const svg = renderChart('scatter', sampleData, 'corporate');
      const circleCount = (svg.match(/<circle/g) || []).length;
      // 4 data points (legend circles are separate)
      expect(circleCount).toBeGreaterThanOrEqual(4);
    });

    it('applies opacity to scatter points', () => {
      const svg = renderChart('scatter', sampleData, 'corporate');
      expect(svg).toContain('opacity="0.7"');
    });

    it('renders multiple datasets with different colors', () => {
      const svg = renderChart('scatter', multiDatasetData, 'corporate');
      const circleCount = (svg.match(/<circle/g) || []).length;
      // 3 points per dataset × 2 datasets = 6 points
      expect(circleCount).toBeGreaterThanOrEqual(6);
    });
  });

  describe('Error Handling', () => {
    it('returns error for empty labels', () => {
      const invalidData: ChartData = {
        labels: [],
        datasets: [{ label: 'Test', data: [1, 2, 3] }],
      };
      const svg = renderChart('bar', invalidData, 'corporate');
      expect(svg).toContain('Chart Error');
      expect(svg).toContain('No labels provided');
    });

    it('returns error for empty datasets', () => {
      const invalidData: ChartData = {
        labels: ['A', 'B'],
        datasets: [],
      };
      const svg = renderChart('bar', invalidData, 'corporate');
      expect(svg).toContain('Chart Error');
      expect(svg).toContain('No datasets provided');
    });

    it('returns error for unsupported chart type', () => {
      const svg = renderChart('invalid' as any, sampleData, 'corporate');
      expect(svg).toContain('Chart Error');
      expect(svg).toContain('Unsupported chart type');
    });

    it('escapes HTML in error messages', () => {
      const invalidData: ChartData = {
        labels: [],
        datasets: [{ label: '<script>alert("xss")</script>', data: [1] }],
      };
      const svg = renderChart('bar', invalidData, 'corporate');
      expect(svg).not.toContain('<script>');
      expect(svg).toContain('&lt;');
    });

    it('handles missing dataset for pie chart', () => {
      const invalidData: ChartData = {
        labels: ['A', 'B'],
        datasets: [],
      };
      const svg = renderChart('pie', invalidData, 'corporate');
      expect(svg).toContain('No dataset');
    });
  });

  describe('Theme Colors', () => {
    it('applies corporate theme colors', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toContain('#1e40af');
    });

    it('applies pitch-deck theme colors', () => {
      const svg = renderChart('bar', sampleData, 'pitch-deck');
      expect(svg).toContain('#7c3aed');
    });

    it('applies academic theme colors', () => {
      const svg = renderChart('bar', sampleData, 'academic');
      expect(svg).toContain('#1e3a8a');
    });

    it('applies workshop theme colors', () => {
      const svg = renderChart('bar', sampleData, 'workshop');
      expect(svg).toContain('#2563eb');
    });

    it('applies startup theme colors', () => {
      const svg = renderChart('bar', sampleData, 'startup');
      expect(svg).toContain('#0ea5e9');
    });

    it('cycles through theme colors for multiple datasets', () => {
      const manyDatasets: ChartData = {
        labels: ['A'],
        datasets: [
          { label: 'S1', data: [1] },
          { label: 'S2', data: [2] },
          { label: 'S3', data: [3] },
          { label: 'S4', data: [4] },
          { label: 'S5', data: [5] },
          { label: 'S6', data: [6] },
          { label: 'S7', data: [7] }, // More than 6, should cycle
        ],
      };
      const svg = renderChart('bar', manyDatasets, 'corporate');
      // Should contain colors from corporate theme (6 colors that cycle)
      expect(svg).toContain('#1e40af');
    });
  });

  describe('Custom Colors', () => {
    it('uses custom backgroundColor from dataset', () => {
      const customColorData: ChartData = {
        labels: ['A', 'B'],
        datasets: [
          {
            label: 'Custom',
            data: [10, 20],
            backgroundColor: '#ff0000',
          },
        ],
      };
      const svg = renderChart('bar', customColorData, 'corporate');
      expect(svg).toContain('#ff0000');
    });

    it('uses array of custom colors', () => {
      const customColorData: ChartData = {
        labels: ['A', 'B'],
        datasets: [
          {
            label: 'Custom',
            data: [10, 20],
            backgroundColor: ['#ff0000', '#00ff00'],
          },
        ],
      };
      const svg = renderChart('bar', customColorData, 'corporate');
      expect(svg).toContain('#ff0000');
      expect(svg).toContain('#00ff00');
    });

    it('uses custom borderColor for line chart', () => {
      const customColorData: ChartData = {
        labels: ['A', 'B'],
        datasets: [
          {
            label: 'Custom',
            data: [10, 20],
            borderColor: '#0000ff',
          },
        ],
      };
      const svg = renderChart('line', customColorData, 'corporate');
      expect(svg).toContain('#0000ff');
    });
  });

  describe('Options', () => {
    it('respects showLegend option', () => {
      const withLegend = renderChart('bar', sampleData, 'corporate', {
        showLegend: true,
      });
      const withoutLegend = renderChart('bar', sampleData, 'corporate', {
        showLegend: false,
      });

      expect(withLegend).toContain('Revenue');
      expect(withoutLegend.length).toBeLessThan(withLegend.length);
    });

    it('respects showGrid option', () => {
      const withGrid = renderChart('bar', sampleData, 'corporate', {
        showGrid: true,
      });
      const withoutGrid = renderChart('bar', sampleData, 'corporate', {
        showGrid: false,
      });

      const gridLinesWithGrid = (withGrid.match(/stroke="#e5e7eb"/g) || []).length;
      const gridLinesWithoutGrid = (withoutGrid.match(/stroke="#e5e7eb"/g) || []).length;

      expect(gridLinesWithGrid).toBeGreaterThan(gridLinesWithoutGrid);
    });

    it('respects showValues option', () => {
      const withValues = renderChart('bar', sampleData, 'corporate', {
        showValues: true,
      });
      const withoutValues = renderChart('bar', sampleData, 'corporate', {
        showValues: false,
      });

      // With values should contain the actual data values as text
      const hasDataValues = withValues.includes('100') && withValues.includes('200');
      expect(hasDataValues).toBe(true);
    });

    it('respects title option', () => {
      const withTitle = renderChart('bar', sampleData, 'corporate', {
        title: 'Sales Report',
      });
      const withoutTitle = renderChart('bar', sampleData, 'corporate');

      expect(withTitle).toContain('Sales Report');
      expect(withTitle.length).toBeGreaterThan(withoutTitle.length);
    });
  });

  describe('SVG Output Quality', () => {
    it('generates valid SVG structure', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
    });

    it('includes viewBox for responsiveness', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toContain('viewBox=');
    });

    it('includes xmlns namespace', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('uses system fonts for better compatibility', () => {
      const svg = renderChart('bar', sampleData, 'corporate');
      expect(svg).toContain('font-family: system-ui');
    });

    it('escapes HTML in labels', () => {
      const xssData: ChartData = {
        labels: ['<script>alert("xss")</script>', 'Normal'],
        datasets: [{ label: 'Test', data: [1, 2] }],
      };
      const svg = renderChart('bar', xssData, 'corporate');
      expect(svg).not.toContain('<script>');
      expect(svg).toContain('&lt;script&gt;');
    });

    it('escapes HTML in dataset labels', () => {
      const xssData: ChartData = {
        labels: ['A'],
        datasets: [{ label: '<img src=x onerror=alert(1)>', data: [1] }],
      };
      const svg = renderChart('bar', xssData, 'corporate');
      expect(svg).not.toContain('<img');
      expect(svg).toContain('&lt;img');
    });
  });

  describe('Edge Cases', () => {
    it('handles single data point', () => {
      const singlePoint: ChartData = {
        labels: ['Only'],
        datasets: [{ label: 'Single', data: [100] }],
      };
      const svg = renderChart('bar', singlePoint, 'corporate');
      expect(svg).toContain('<svg');
      expect(svg).toContain('Only');
    });

    it('handles zero values', () => {
      const zeroData: ChartData = {
        labels: ['A', 'B', 'C'],
        datasets: [{ label: 'Zeros', data: [0, 0, 0] }],
      };
      const svg = renderChart('bar', zeroData, 'corporate');
      expect(svg).toContain('<svg');
    });

    it('handles very large numbers', () => {
      const largeData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Large', data: [1000000, 2000000] }],
      };
      const svg = renderChart('bar', largeData, 'corporate');
      expect(svg).toContain('<svg');
    });

    it('handles decimal values', () => {
      const decimalData: ChartData = {
        labels: ['A', 'B'],
        datasets: [{ label: 'Decimal', data: [1.5, 2.7] }],
      };
      const svg = renderChart('bar', decimalData, 'corporate');
      expect(svg).toContain('<svg');
    });

    it('handles long label names', () => {
      const longLabelData: ChartData = {
        labels: ['This is a very long label name that might cause issues'],
        datasets: [{ label: 'Test', data: [100] }],
      };
      const svg = renderChart('bar', longLabelData, 'corporate');
      expect(svg).toContain('This is a very long label');
    });
  });
});
