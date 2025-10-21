/**
 * generate_svg tool
 *
 * Generates SVG graphics (icons, patterns, charts, diagrams) for presentations.
 * Routes to appropriate utility based on SVG type.
 */

import { z } from 'zod';
import { generateIcon, type IconName } from '../utils/icon-generator.js';
import { generatePattern, type PatternType } from '../utils/pattern-generator.js';
import { renderChart, type ChartType, type ChartData } from '../utils/chart-renderer.js';
import { SVGBuilder } from '../utils/svg-builder.js';
import type { Theme } from '../types/index.js';

/**
 * Icon names schema (26 icons)
 */
const IconNameSchema = z.enum([
  'briefcase',
  'chart-line',
  'chart-bar',
  'pie-chart',
  'trend-up',
  'trend-down',
  'mail',
  'phone',
  'message',
  'users',
  'calendar',
  'check',
  'x',
  'arrow-right',
  'arrow-left',
  'plus',
  'minus',
  'image',
  'video',
  'download',
  'upload',
  'alert',
  'info',
  'success',
  'error',
  'warning',
  'star',
  'heart',
  'settings',
  'search',
]);

/**
 * Pattern types schema
 */
const PatternTypeSchema = z.enum([
  'dots',
  'grid',
  'diagonal-lines',
  'waves',
  'gradient-mesh',
  'hexagon',
  'circles',
]);

/**
 * Chart types schema
 */
const ChartTypeSchema = z.enum(['bar', 'line', 'pie', 'area', 'doughnut', 'scatter']);

/**
 * Chart data schema
 */
const ChartDataSchema = z.object({
  labels: z.array(z.string()),
  datasets: z.array(
    z.object({
      label: z.string(),
      data: z.array(z.number()),
      backgroundColor: z.union([z.string(), z.array(z.string())]).optional(),
      borderColor: z.string().optional(),
      borderWidth: z.number().optional(),
    })
  ),
});

/**
 * Generate SVG tool schema
 */
export const GenerateSVGSchema = z.object({
  type: z.enum(['icon', 'pattern', 'chart', 'diagram', 'custom']),
  iconName: IconNameSchema.optional(),
  patternType: PatternTypeSchema.optional(),
  chartType: ChartTypeSchema.optional(),
  chartData: ChartDataSchema.optional(),
  customInstructions: z.string().optional(),
  width: z.number().default(800),
  height: z.number().default(600),
  theme: z.enum(['corporate', 'pitch-deck', 'academic', 'workshop', 'startup']).optional(),
  style: z.enum(['default', 'hand-drawn', 'minimal']).default('default'),
  color: z.string().optional(),
  strokeWidth: z.number().optional(),
  size: z.number().optional(),
  density: z.enum(['low', 'medium', 'high']).optional(),
  opacity: z.number().min(0).max(1).optional(),
});

export type GenerateSVGParams = z.infer<typeof GenerateSVGSchema>;

/**
 * Generate SVG tool definition
 */
export const generateSVGTool = {
  name: 'generate_svg',
  description:
    'Generate SVG graphics for presentations. Supports icons (26 semantic icons), ' +
    'patterns (geometric and organic backgrounds), charts (6 chart types via existing renderer), ' +
    'and custom SVG compositions. All outputs are theme-aware and optimized for projection displays.',

  inputSchema: {
    type: 'object' as const,
    properties: {
      type: {
        type: 'string',
        enum: ['icon', 'pattern', 'chart', 'diagram', 'custom'],
        description: 'Type of SVG to generate',
      },
      iconName: {
        type: 'string',
        enum: [
          'briefcase',
          'chart-line',
          'chart-bar',
          'pie-chart',
          'trend-up',
          'trend-down',
          'mail',
          'phone',
          'message',
          'users',
          'calendar',
          'check',
          'x',
          'arrow-right',
          'arrow-left',
          'plus',
          'minus',
          'image',
          'video',
          'download',
          'upload',
          'alert',
          'info',
          'success',
          'error',
          'warning',
          'star',
          'heart',
          'settings',
          'search',
        ],
        description: 'Icon name (required for type: icon)',
      },
      patternType: {
        type: 'string',
        enum: ['dots', 'grid', 'diagonal-lines', 'waves', 'gradient-mesh', 'hexagon', 'circles'],
        description: 'Pattern type (required for type: pattern)',
      },
      chartType: {
        type: 'string',
        enum: ['bar', 'line', 'pie', 'area', 'doughnut', 'scatter'],
        description: 'Chart type (required for type: chart)',
      },
      chartData: {
        type: 'object',
        description: 'Chart data with labels and datasets (required for type: chart)',
        properties: {
          labels: { type: 'array', items: { type: 'string' } },
          datasets: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                data: { type: 'array', items: { type: 'number' } },
              },
            },
          },
        },
      },
      customInstructions: {
        type: 'string',
        description: 'Custom SVG building instructions (for type: custom)',
      },
      width: {
        type: 'number',
        description: 'SVG width in pixels (default: 800)',
        default: 800,
      },
      height: {
        type: 'number',
        description: 'SVG height in pixels (default: 600)',
        default: 600,
      },
      theme: {
        type: 'string',
        enum: ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'],
        description: 'Theme for color palette',
      },
      style: {
        type: 'string',
        enum: ['default', 'hand-drawn', 'minimal'],
        description: 'Rendering style (default: default)',
        default: 'default',
      },
      color: {
        type: 'string',
        description: 'Icon or pattern color (hex or theme color name)',
      },
      strokeWidth: {
        type: 'number',
        description: 'Icon stroke width (default: 2)',
      },
      size: {
        type: 'number',
        description: 'Icon size in pixels (default: 48)',
      },
      density: {
        type: 'string',
        enum: ['low', 'medium', 'high'],
        description: 'Pattern density (default: medium)',
      },
      opacity: {
        type: 'number',
        description: 'Pattern opacity (0-1, default: 0.1)',
        minimum: 0,
        maximum: 1,
      },
    },
    required: ['type'],
  },

  async handler(args: Record<string, unknown>) {
    const params = GenerateSVGSchema.parse(args);

    try {
      let svg: string;

      switch (params.type) {
        case 'icon':
          if (!params.iconName) {
            throw new Error('iconName is required for type: icon');
          }
          svg = generateIcon(params.iconName as IconName, {
            size: params.size || 48,
            color: params.color || 'currentColor',
            strokeWidth: params.strokeWidth || 2,
            theme: params.theme as Theme,
            style: params.style === 'minimal' ? 'outline' : 'solid',
          });
          break;

        case 'pattern':
          if (!params.patternType) {
            throw new Error('patternType is required for type: pattern');
          }
          svg = generatePattern(params.patternType as PatternType, {
            width: params.width,
            height: params.height,
            theme: params.theme as Theme,
            opacity: params.opacity || 0.1,
            density: params.density || 'medium',
            color: params.color || 'primary',
          });
          break;

        case 'chart':
          if (!params.chartType || !params.chartData) {
            throw new Error('chartType and chartData are required for type: chart');
          }
          svg = renderChart(
            params.chartType as ChartType,
            params.chartData as ChartData,
            (params.theme as Theme) || 'corporate',
            {
              width: params.width,
              height: params.height,
              showLegend: true,
              showGrid: true,
              showValues: false,
            }
          );
          break;

        case 'diagram':
          const builder = new SVGBuilder({
            width: params.width,
            height: params.height,
            theme: params.theme as Theme,
          });
          svg = builder
            .addRect(100, 100, 200, 100, 'none', 'primary')
            .addText('Diagram', params.width / 2, params.height / 2, {
              fontSize: 24,
              textAnchor: 'middle',
              dominantBaseline: 'middle',
            })
            .toSVGString();
          break;

        case 'custom':
          const customBuilder = new SVGBuilder({
            width: params.width,
            height: params.height,
            theme: params.theme as Theme,
          });
          svg = customBuilder
            .addRect(0, 0, params.width, params.height, 'background')
            .addText(params.customInstructions || 'Custom SVG', params.width / 2, params.height / 2, {
              fontSize: 24,
              textAnchor: 'middle',
              dominantBaseline: 'middle',
            })
            .toSVGString();
          break;

        default:
          throw new Error(`Unknown SVG type: ${params.type}`);
      }

      return {
        success: true,
        svg,
        type: params.type,
        width: params.width,
        height: params.height,
        theme: params.theme || 'corporate',
        message: `Generated ${params.type} SVG successfully`,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate SVG',
      };
    }
  },
};
