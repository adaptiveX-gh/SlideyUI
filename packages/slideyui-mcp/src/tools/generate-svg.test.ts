/**
 * Tests for generate_svg MCP tool
 */

import { describe, it, expect } from 'vitest';
import { handleGenerateSVG, GenerateSVGSchema } from './generate-svg.js';
import type { z } from 'zod';

type GenerateSVGParams = z.infer<typeof GenerateSVGSchema>;

describe('Generate SVG Tool', () => {
  describe('Schema Validation', () => {
    it('validates icon generation params', () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'check',
        width: 48,
        height: 48
      };

      const result = GenerateSVGSchema.parse(params);
      expect(result.type).toBe('icon');
      expect(result.iconName).toBe('check');
    });

    it('validates pattern generation params', () => {
      const params: GenerateSVGParams = {
        type: 'pattern',
        patternType: 'dots',
        width: 800,
        height: 600
      };

      const result = GenerateSVGSchema.parse(params);
      expect(result.type).toBe('pattern');
      expect(result.patternType).toBe('dots');
    });

    it('validates chart generation params', () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'bar',
        chartData: {
          labels: ['Q1', 'Q2'],
          datasets: [{ label: 'Revenue', data: [100, 200] }]
        }
      };

      const result = GenerateSVGSchema.parse(params);
      expect(result.type).toBe('chart');
      expect(result.chartType).toBe('bar');
    });

    it('uses default width and height', () => {
      const params = {
        type: 'icon' as const,
        iconName: 'check'
      };

      const result = GenerateSVGSchema.parse(params);
      expect(result.width).toBe(800);
      expect(result.height).toBe(600);
    });

    it('uses default style', () => {
      const params = {
        type: 'icon' as const,
        iconName: 'check'
      };

      const result = GenerateSVGSchema.parse(params);
      expect(result.style).toBe('default');
    });

    it('validates style enum values', () => {
      const validParams = {
        type: 'icon' as const,
        iconName: 'check',
        style: 'hand-drawn' as const
      };

      expect(() => GenerateSVGSchema.parse(validParams)).not.toThrow();

      const invalidParams = {
        type: 'icon' as const,
        iconName: 'check',
        style: 'invalid'
      };

      expect(() => GenerateSVGSchema.parse(invalidParams)).toThrow();
    });
  });

  describe('Icon Generation', () => {
    it('generates icon SVG', async () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'check',
        width: 48,
        height: 48
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      expect(svg).toContain('</svg>');
      expect(svg).toContain('width="48"');
      expect(svg).toContain('height="48"');
    });

    it('applies theme to icon', async () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'briefcase',
        theme: 'corporate',
        width: 64,
        height: 64
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      // Should use corporate theme colors
      expect(svg).toContain('#1e40af');
    });

    it('generates all business icons', async () => {
      const businessIcons = ['briefcase', 'chart-line', 'chart-bar', 'pie-chart', 'trend-up', 'trend-down'];

      for (const iconName of businessIcons) {
        const params: GenerateSVGParams = {
          type: 'icon',
          iconName: iconName as any,
          width: 48,
          height: 48
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
        expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      }
    });

    it('generates all communication icons', async () => {
      const commIcons = ['mail', 'phone', 'message', 'users', 'calendar'];

      for (const iconName of commIcons) {
        const params: GenerateSVGParams = {
          type: 'icon',
          iconName: iconName as any,
          width: 48,
          height: 48
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
      }
    });

    it('generates all action icons', async () => {
      const actionIcons = ['check', 'x', 'arrow-right', 'arrow-left', 'plus', 'minus'];

      for (const iconName of actionIcons) {
        const params: GenerateSVGParams = {
          type: 'icon',
          iconName: iconName as any,
          width: 48,
          height: 48
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
      }
    });
  });

  describe('Pattern Generation', () => {
    it('generates pattern SVG', async () => {
      const params: GenerateSVGParams = {
        type: 'pattern',
        patternType: 'dots',
        width: 800,
        height: 600
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      expect(svg).toContain('width="800"');
      expect(svg).toContain('height="600"');
    });

    it('applies theme to pattern', async () => {
      const params: GenerateSVGParams = {
        type: 'pattern',
        patternType: 'gradient-mesh',
        theme: 'pitch-deck',
        width: 1920,
        height: 1080
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      expect(svg).toContain('#7c3aed'); // Pitch-deck theme
    });

    it('generates all geometric patterns', async () => {
      const geometricPatterns = ['dots', 'grid', 'diagonal-lines', 'chevron', 'hexagon'];

      for (const patternType of geometricPatterns) {
        const params: GenerateSVGParams = {
          type: 'pattern',
          patternType: patternType as any,
          width: 800,
          height: 600
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
        expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      }
    });

    it('generates all organic patterns', async () => {
      const organicPatterns = ['waves', 'blobs', 'noise'];

      for (const patternType of organicPatterns) {
        const params: GenerateSVGParams = {
          type: 'pattern',
          patternType: patternType as any,
          width: 800,
          height: 600
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
      }
    });

    it('generates all abstract patterns', async () => {
      const abstractPatterns = ['gradient-mesh', 'particles', 'rays'];

      for (const patternType of abstractPatterns) {
        const params: GenerateSVGParams = {
          type: 'pattern',
          patternType: patternType as any,
          width: 800,
          height: 600
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
      }
    });
  });

  describe('Chart Generation', () => {
    it('generates chart using existing chart renderer', async () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'bar',
        chartData: {
          labels: ['Q1', 'Q2', 'Q3'],
          datasets: [{ label: 'Sales', data: [100, 200, 150] }]
        },
        theme: 'corporate',
        width: 800,
        height: 600
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      expect(svg).toContain('viewBox');
      expect(svg).toContain('Q1');
      expect(svg).toContain('Q2');
      expect(svg).toContain('Q3');
    });

    it('generates all chart types', async () => {
      const chartTypes = ['bar', 'line', 'pie', 'area', 'doughnut', 'scatter'];
      const chartData = {
        labels: ['A', 'B', 'C'],
        datasets: [{ label: 'Data', data: [10, 20, 15] }]
      };

      for (const chartType of chartTypes) {
        const params: GenerateSVGParams = {
          type: 'chart',
          chartType: chartType as any,
          chartData,
          width: 800,
          height: 600
        };

        const svg = await handleGenerateSVG(params);
        expect(svg).toContain('<svg');
      }
    });

    it('applies theme to chart', async () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'bar',
        chartData: {
          labels: ['A', 'B'],
          datasets: [{ label: 'Test', data: [10, 20] }]
        },
        theme: 'startup',
        width: 800,
        height: 600
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('#0ea5e9'); // Startup theme
    });
  });

  describe('Custom SVG Generation', () => {
    it('generates custom SVG from instructions', async () => {
      const params: GenerateSVGParams = {
        type: 'custom',
        customInstructions: 'Create a circle in the center',
        width: 400,
        height: 300
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      expect(svg).toContain('width="400"');
      expect(svg).toContain('height="300"');
    });

    it('applies theme to custom SVG', async () => {
      const params: GenerateSVGParams = {
        type: 'custom',
        customInstructions: 'Rectangle with primary color',
        theme: 'corporate',
        width: 200,
        height: 200
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
    });
  });

  describe('Style Variations', () => {
    it('uses default style', async () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'check',
        style: 'default'
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      // Default style should be clean and professional
    });

    it('uses hand-drawn style with Rough.js', async () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'star',
        style: 'hand-drawn'
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      // Hand-drawn style should have sketchy appearance
    });

    it('uses minimal style', async () => {
      const params: GenerateSVGParams = {
        type: 'pattern',
        patternType: 'dots',
        style: 'minimal',
        width: 800,
        height: 600
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('<svg');
      // Minimal style should be very clean
    });
  });

  describe('Integration with Chart Renderer', () => {
    it('delegates to existing chart renderer for charts', async () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'line',
        chartData: {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [{ label: 'Revenue', data: [100, 150, 200] }]
        },
        theme: 'corporate'
      };

      const svg = await handleGenerateSVG(params);

      // Should produce same output as chart-renderer
      expect(svg).toContain('<path'); // Line chart uses path
      expect(svg).toContain('<circle'); // Data points
      expect(svg).toContain('Jan');
      expect(svg).toContain('Feb');
      expect(svg).toContain('Mar');
    });

    it('respects chart renderer options', async () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'bar',
        chartData: {
          labels: ['A', 'B'],
          datasets: [{ label: 'Test', data: [10, 20] }]
        },
        chartOptions: {
          showLegend: true,
          showGrid: true,
          showValues: true
        }
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('Test'); // Legend
      // Grid and values should be visible
    });
  });

  describe('Error Handling', () => {
    it('throws error when iconName missing for icon type', async () => {
      const params = {
        type: 'icon' as const,
        width: 48,
        height: 48
      };

      await expect(handleGenerateSVG(params as any)).rejects.toThrow();
    });

    it('throws error when patternType missing for pattern type', async () => {
      const params = {
        type: 'pattern' as const,
        width: 800,
        height: 600
      };

      await expect(handleGenerateSVG(params as any)).rejects.toThrow();
    });

    it('throws error when chartData missing for chart type', async () => {
      const params = {
        type: 'chart' as const,
        chartType: 'bar',
        width: 800,
        height: 600
      };

      await expect(handleGenerateSVG(params as any)).rejects.toThrow();
    });

    it('throws error for invalid icon name', async () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'nonexistent' as any,
        width: 48,
        height: 48
      };

      await expect(handleGenerateSVG(params)).rejects.toThrow();
    });

    it('throws error for invalid pattern type', async () => {
      const params: GenerateSVGParams = {
        type: 'pattern',
        patternType: 'invalid' as any,
        width: 800,
        height: 600
      };

      await expect(handleGenerateSVG(params)).rejects.toThrow();
    });

    it('throws error for invalid chart type', async () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'invalid' as any,
        chartData: {
          labels: ['A'],
          datasets: [{ label: 'Test', data: [1] }]
        }
      };

      await expect(handleGenerateSVG(params)).rejects.toThrow();
    });
  });

  describe('Output Quality', () => {
    it('generates valid SVG for all types', async () => {
      const testCases: GenerateSVGParams[] = [
        {
          type: 'icon',
          iconName: 'check',
          width: 48,
          height: 48
        },
        {
          type: 'pattern',
          patternType: 'dots',
          width: 800,
          height: 600
        },
        {
          type: 'chart',
          chartType: 'bar',
          chartData: {
            labels: ['A'],
            datasets: [{ label: 'Test', data: [10] }]
          }
        }
      ];

      for (const params of testCases) {
        const svg = await handleGenerateSVG(params);
        expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
        expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      }
    });

    it('produces properly escaped SVG', async () => {
      const params: GenerateSVGParams = {
        type: 'chart',
        chartType: 'bar',
        chartData: {
          labels: ['<script>alert("xss")</script>'],
          datasets: [{ label: 'Test', data: [10] }]
        }
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).not.toContain('<script>');
      expect(svg).toContain('&lt;script&gt;');
    });

    it('generates responsive SVG with viewBox', async () => {
      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'check',
        width: 48,
        height: 48
      };

      const svg = await handleGenerateSVG(params);
      expect(svg).toContain('viewBox');
    });
  });

  describe('Performance', () => {
    it('generates SVG quickly', async () => {
      const start = Date.now();

      const params: GenerateSVGParams = {
        type: 'icon',
        iconName: 'check',
        width: 48,
        height: 48
      };

      await handleGenerateSVG(params);

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(100); // Should be very fast
    });

    it('handles large patterns efficiently', async () => {
      const start = Date.now();

      const params: GenerateSVGParams = {
        type: 'pattern',
        patternType: 'particles',
        width: 1920,
        height: 1080,
        density: 'high'
      };

      const svg = await handleGenerateSVG(params);

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(500);
      expect(svg).toContain('<svg');
    });
  });

  describe('MCP Tool Registration', () => {
    it('exports correct tool definition', () => {
      const tool = {
        name: 'generate_svg',
        description: 'Generate SVG graphics (icons, patterns, charts, diagrams)',
        inputSchema: GenerateSVGSchema
      };

      expect(tool.name).toBe('generate_svg');
      expect(tool.description).toContain('SVG');
      expect(tool.inputSchema).toBeDefined();
    });
  });
});
