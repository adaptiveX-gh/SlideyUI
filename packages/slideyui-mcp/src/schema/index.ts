/**
 * Zod schemas for runtime validation of presentation specifications
 *
 * These schemas provide type-safe validation for all presentation data
 * and are used by MCP tools to validate input.
 */

import { z } from 'zod';

/**
 * Theme schema
 */
export const ThemeSchema = z.enum([
  'corporate',
  'pitch-deck',
  'academic',
  'workshop',
  'startup',
]);

/**
 * Aspect ratio schema
 */
export const AspectRatioSchema = z.enum(['16:9', '4:3']);

/**
 * Font size schema
 */
export const FontSizeSchema = z.enum(['default', 'large', 'xlarge']);

/**
 * Card state schema
 */
export const CardStateSchema = z.enum(['generating', 'complete', 'error']);

/**
 * Base slide schema
 */
const BaseSlideSchema = z.object({
  id: z.string().optional(),
  notes: z.string().optional(),
  state: CardStateSchema.optional(),
});

/**
 * Title slide schema
 */
export const TitleSlideSchema = BaseSlideSchema.extend({
  type: z.literal('title'),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  author: z.string().optional(),
  date: z.string().optional(),
});

/**
 * Content slide schema
 */
export const ContentSlideSchema = BaseSlideSchema.extend({
  type: z.literal('content'),
  title: z.string().min(1),
  content: z.union([z.array(z.string()), z.string()]),
  layout: z.enum(['single-column', 'two-column']).optional(),
});

/**
 * Media slide schema
 */
export const MediaSlideSchema = BaseSlideSchema.extend({
  type: z.literal('media'),
  title: z.string().optional(),
  mediaUrl: z.string().url(),
  mediaType: z.enum(['image', 'video', 'embed']),
  caption: z.string().optional(),
  layout: z.enum(['full-bleed', 'contained', 'split']).optional(),
});

/**
 * Chart dataset schema
 */
export const ChartDatasetSchema = z.object({
  label: z.string(),
  data: z.array(z.number()),
  backgroundColor: z.union([z.string(), z.array(z.string())]).optional(),
  borderColor: z.string().optional(),
  borderWidth: z.number().optional(),
});

/**
 * Chart data schema (standard format for all chart types)
 */
export const ChartDataSchema = z.object({
  labels: z.array(z.string()),
  datasets: z.array(ChartDatasetSchema).min(1),
});

/**
 * Data slide schema
 */
export const DataSlideSchema = BaseSlideSchema.extend({
  type: z.literal('data'),
  title: z.string().min(1),
  data: z.union([
    z.array(z.record(z.unknown())),
    z.array(z.array(z.string())),
    ChartDataSchema,
  ]),
  dataType: z.enum(['table', 'chart']),
  chartType: z.enum(['bar', 'line', 'pie', 'area', 'doughnut', 'scatter']).optional(),
});

/**
 * Quote slide schema
 */
export const QuoteSlideSchema = BaseSlideSchema.extend({
  type: z.literal('quote'),
  quote: z.string().min(1),
  author: z.string().min(1),
  context: z.string().optional(),
});

/**
 * Timeline slide schema
 */
export const TimelineSlideSchema = BaseSlideSchema.extend({
  type: z.literal('timeline'),
  title: z.string().min(1),
  events: z.array(
    z.object({
      date: z.string(),
      title: z.string(),
      description: z.string().optional(),
    })
  ).default([]),
  orientation: z.enum(['horizontal', 'vertical']).optional(),
});

/**
 * Comparison slide schema
 */
export const ComparisonSlideSchema = BaseSlideSchema.extend({
  type: z.literal('comparison'),
  title: z.string().min(1),
  leftTitle: z.string().default(''),
  leftContent: z.array(z.string()).default([]),
  rightTitle: z.string().default(''),
  rightContent: z.array(z.string()).default([]),
});

/**
 * Process slide schema
 */
export const ProcessSlideSchema = BaseSlideSchema.extend({
  type: z.literal('process'),
  title: z.string().min(1),
  steps: z.array(
    z.object({
      title: z.string(),
      description: z.string().optional(),
    })
  ),
  layout: z.enum(['horizontal', 'vertical', 'grid']).optional(),
});

/**
 * Section header slide schema
 */
export const SectionHeaderSlideSchema = BaseSlideSchema.extend({
  type: z.literal('section-header'),
  title: z.string().min(1),
  subtitle: z.string().optional(),
});

/**
 * Blank slide schema
 */
export const BlankSlideSchema = BaseSlideSchema.extend({
  type: z.literal('blank'),
  content: z.string().optional(),
});

/**
 * Hero slide schema
 */
export const HeroSlideSchema = BaseSlideSchema.extend({
  type: z.literal('hero'),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  backgroundImage: z.string().url().optional(),
  backgroundGradient: z.string().optional(),
  callToAction: z
    .object({
      text: z.string(),
      url: z.string().url().optional(),
    })
    .optional(),
});

/**
 * Two-column slide schema
 */
export const TwoColumnSlideSchema = BaseSlideSchema.extend({
  type: z.literal('two-column'),
  title: z.string().optional(),
  leftColumn: z.object({
    type: z.enum(['text', 'image', 'list']),
    content: z.union([z.string(), z.array(z.string())]),
  }),
  rightColumn: z.object({
    type: z.enum(['text', 'image', 'list']),
    content: z.union([z.string(), z.array(z.string())]),
  }),
  columnRatio: z.enum(['50-50', '60-40', '40-60', '70-30', '30-70']).optional(),
});

/**
 * Three-column slide schema
 */
export const ThreeColumnSlideSchema = BaseSlideSchema.extend({
  type: z.literal('three-column'),
  title: z.string().optional(),
  columns: z.tuple([
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.union([z.string(), z.array(z.string())]),
    }),
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.union([z.string(), z.array(z.string())]),
    }),
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.union([z.string(), z.array(z.string())]),
    }),
  ]),
});

/**
 * Four-column slide schema
 */
export const FourColumnSlideSchema = BaseSlideSchema.extend({
  type: z.literal('four-column'),
  title: z.string().optional(),
  columns: z.tuple([
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.string(),
    }),
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.string(),
    }),
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.string(),
    }),
    z.object({
      heading: z.string().optional(),
      icon: z.string().optional(),
      content: z.string(),
    }),
  ]),
});

/**
 * Chart with metrics slide schema
 */
export const ChartWithMetricsSlideSchema = BaseSlideSchema.extend({
  type: z.literal('chart-with-metrics'),
  title: z.string().min(1),
  chart: z.object({
    type: z.enum(['line', 'bar', 'pie', 'area']),
    data: z.record(z.unknown()),
  }),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.union([z.string(), z.number()]),
      change: z
        .object({
          value: z.number(),
          direction: z.enum(['up', 'down']),
        })
        .optional(),
    })
  ),
  layout: z.enum(['chart-left', 'chart-right', 'chart-top']).optional(),
});

/**
 * Product overview slide schema
 */
export const ProductOverviewSlideSchema = BaseSlideSchema.extend({
  type: z.literal('product-overview'),
  title: z.string().min(1),
  productImage: z.string().url().optional(),
  description: z.string().optional(),
  features: z.array(z.string()).min(1),
  pricing: z
    .object({
      price: z.string(),
      period: z.string().optional(),
      cta: z.string().optional(),
    })
    .optional(),
  layout: z.enum(['image-left', 'image-right', 'image-top']).optional(),
});

/**
 * Union schema for all slide types
 */
export const SlideSchema = z.discriminatedUnion('type', [
  TitleSlideSchema,
  ContentSlideSchema,
  MediaSlideSchema,
  DataSlideSchema,
  QuoteSlideSchema,
  TimelineSlideSchema,
  ComparisonSlideSchema,
  ProcessSlideSchema,
  SectionHeaderSlideSchema,
  BlankSlideSchema,
  HeroSlideSchema,
  TwoColumnSlideSchema,
  ThreeColumnSlideSchema,
  FourColumnSlideSchema,
  ChartWithMetricsSlideSchema,
  ProductOverviewSlideSchema,
]);

/**
 * Generation options schema
 */
export const GenerationOptionsSchema = z.object({
  aspectRatio: AspectRatioSchema.optional(),
  fontSize: FontSizeSchema.optional(),
  minify: z.boolean().optional(),
  includeSlideyUICSS: z.boolean().optional(),
  embedFonts: z.boolean().optional(),
  theme: ThemeSchema.optional(),
});

/**
 * Presentation metadata schema
 */
export const PresentationMetadataSchema = z.object({
  author: z.string().optional(),
  date: z.string().optional(),
  version: z.string().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Complete presentation schema
 */
export const PresentationSchema = z.object({
  theme: ThemeSchema,
  title: z.string().min(1),
  slides: z.array(SlideSchema).min(1),
  options: GenerationOptionsSchema.optional(),
  metadata: PresentationMetadataSchema.optional(),
});

/**
 * Generation result schema
 */
export const GenerationResultSchema = z.object({
  html: z.string(),
  metadata: z.object({
    slideCount: z.number(),
    theme: ThemeSchema,
    generatedAt: z.string(),
    size: z.number(),
  }),
  warnings: z.array(z.string()).optional(),
});
