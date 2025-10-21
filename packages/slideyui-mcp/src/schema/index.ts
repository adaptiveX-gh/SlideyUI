/**
 * Zod schemas for runtime validation of presentation specifications
 *
 * These schemas provide type-safe validation for all presentation data
 * and are used by MCP tools to validate input.
 */

import { z } from 'zod';

/**
 * Predefined theme names
 * Exported for validation and tooling purposes
 */
export const PREDEFINED_THEMES = [
  'corporate',
  'pitch-deck',
  'academic',
  'workshop',
  'startup',
] as const;

/**
 * Hex color regex pattern (e.g., #FF5733)
 */
const HEX_COLOR_REGEX = /^#[0-9A-Fa-f]{6}$/;

/**
 * Custom theme name regex pattern (lowercase alphanumeric with hyphens)
 */
const THEME_NAME_REGEX = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/**
 * Custom theme schema
 *
 * Allows users to define brand-specific presentation themes with custom colors.
 * Required fields: name, displayName, and primary color.
 * Optional fields will be auto-generated based on the primary color for optimal contrast.
 *
 * @example
 * ```typescript
 * const customTheme: CustomTheme = {
 *   name: "acme-corp",
 *   displayName: "ACME Corporation",
 *   colors: {
 *     primary: "#FF5733",
 *     secondary: "#33C4FF",
 *     accent: "#FFC300"
 *   },
 *   metadata: {
 *     author: "Design Team",
 *     description: "Official ACME brand colors",
 *     tags: ["corporate", "brand"]
 *   }
 * };
 * ```
 */
export const CustomThemeSchema = z.object({
  /**
   * Unique theme identifier (lowercase, alphanumeric with hyphens only)
   * Must not conflict with predefined themes: corporate, pitch-deck, academic, workshop, startup
   */
  name: z
    .string()
    .regex(
      THEME_NAME_REGEX,
      'Theme name must be lowercase alphanumeric with hyphens only'
    )
    .refine(
      (name) => !PREDEFINED_THEMES.includes(name as any),
      'Theme name cannot conflict with predefined themes'
    ),

  /**
   * Human-readable theme name displayed in UI
   */
  displayName: z.string().min(1, 'Display name is required'),

  /**
   * Theme color palette
   * Only primary color is required; others will be auto-generated if not provided
   */
  colors: z.object({
    /**
     * Primary brand color (required, hex format)
     */
    primary: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Primary color must be a valid hex color (e.g., #FF5733)'),

    /**
     * Secondary brand color (optional, hex format)
     * Auto-generated from primary if not provided
     */
    secondary: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Secondary color must be a valid hex color (e.g., #33C4FF)')
      .optional(),

    /**
     * Accent color for highlights and CTAs (optional, hex format)
     * Auto-generated from primary if not provided
     */
    accent: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Accent color must be a valid hex color (e.g., #FFC300)')
      .optional(),

    /**
     * Background color (optional, hex format)
     * Defaults to white (#FFFFFF) if not provided
     */
    background: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Background color must be a valid hex color')
      .optional(),

    /**
     * Foreground/text color (optional, hex format)
     * Auto-calculated for optimal contrast against background if not provided
     */
    foreground: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Foreground color must be a valid hex color')
      .optional(),

    /**
     * Muted/disabled element color (optional, hex format)
     * Auto-generated from primary if not provided
     */
    muted: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Muted color must be a valid hex color')
      .optional(),

    /**
     * Text color for muted elements (optional, hex format)
     * Auto-generated for contrast against muted background if not provided
     */
    mutedForeground: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Muted foreground color must be a valid hex color')
      .optional(),

    /**
     * Border color (optional, hex format)
     * Auto-generated from primary if not provided
     */
    border: z
      .string()
      .regex(HEX_COLOR_REGEX, 'Border color must be a valid hex color')
      .optional(),
  }),

  /**
   * Optional metadata about the theme
   */
  metadata: z
    .object({
      /**
       * Theme creator/author
       */
      author: z.string().optional(),

      /**
       * Theme creation date (ISO 8601 format)
       */
      createdAt: z.string().datetime().optional(),

      /**
       * Theme description
       */
      description: z.string().optional(),

      /**
       * Tags for categorizing/searching themes
       */
      tags: z.array(z.string()).optional(),
    })
    .optional(),
});

/**
 * Theme schema
 * Supports both predefined themes (corporate, pitch-deck, etc.) and custom theme names
 */
export const ThemeSchema = z.union([
  z.enum(PREDEFINED_THEMES),
  z.string().regex(THEME_NAME_REGEX, 'Custom theme name must be lowercase alphanumeric with hyphens'),
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
 * Media slide overlay configuration schema
 */
export const OverlayConfigSchema = z.object({
  enabled: z.boolean().optional().default(true),
  type: z.enum(['gradient', 'solid', 'none']).optional().default('gradient'),
  colors: z.array(z.enum(['primary', 'secondary', 'accent'])).optional(),
  customColors: z.array(z.string().regex(HEX_COLOR_REGEX, 'Custom color must be a valid hex color (e.g., #FF5733)')).optional(),
  opacity: z.number().min(0).max(1).optional().default(0.7),
  direction: z.string().optional().default('135deg'),
});

/**
 * Media slide text style configuration schema
 */
export const TextStyleConfigSchema = z.object({
  position: z.enum(['center', 'top', 'bottom', 'left', 'right']).optional().default('center'),
  align: z.enum(['left', 'center', 'right']).optional().default('center'),
  color: z.string().optional().default('white'),
  shadow: z.boolean().optional().default(true),
  maxWidth: z.string().optional().default('900px'),
});

/**
 * Print configuration schema for media slides
 */
export const PrintConfigSchema = z.object({
  mediaUrl: z.string().url().optional(),
  enabled: z.boolean().optional().default(true),
  quality: z.enum(['high', 'medium', 'screen']).optional().default('high'),
});

/**
 * Loading configuration schema for progressive image loading
 */
export const LoadingConfigSchema = z.object({
  strategy: z.enum(['progressive', 'eager', 'lazy']).optional().default('progressive'),
  placeholder: z.object({
    type: z.enum(['blur', 'color', 'none']).optional().default('color'),
    thumbnail: z.string().url().optional(),
    color: z.string().regex(HEX_COLOR_REGEX, 'Placeholder color must be a valid hex color').optional(),
  }).optional(),
  preload: z.boolean().optional().default(false),
});

/**
 * Responsive image configuration schema
 */
export const ResponsiveConfigSchema = z.object({
  autoGenerate: z.boolean().optional().default(true),
  srcset: z.string().optional(),
  sizes: z.string().optional().default('(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1920px'),
  breakpoints: z.array(z.number()).optional().default([400, 800, 1200, 1920, 2560]),
  formats: z.array(z.enum(['webp', 'jpg', 'png', 'avif'])).optional().default(['webp', 'jpg']),
  qualities: z.record(z.number()).optional(),
});

/**
 * Video configuration schema
 */
export const VideoConfigSchema = z.object({
  autoplay: z.boolean().optional().default(true),
  loop: z.boolean().optional().default(true),
  muted: z.boolean().optional().default(true),
  controls: z.boolean().optional().default(false),
  playbackRate: z.number().min(0.25).max(2.0).optional().default(1.0),
  poster: z.string().url().optional(),
  playOn: z.enum(['visible', 'manual', 'immediate']).optional().default('visible'),
  pauseOn: z.enum(['hidden', 'never']).optional().default('hidden'),
  fallbackImage: z.string().url().optional(),
});

/**
 * Media slide schema
 */
export const MediaSlideSchema = BaseSlideSchema.extend({
  type: z.literal('media'),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  mediaUrl: z.string().url(),
  mediaType: z.enum(['image', 'video', 'embed']),
  caption: z.string().optional(),
  layout: z.enum(['contained', 'hero', 'split', 'full-bleed']).optional().default('contained'),
  overlay: OverlayConfigSchema.optional(),
  textStyle: TextStyleConfigSchema.optional(),
  print: PrintConfigSchema.optional(),
  loading: LoadingConfigSchema.optional(),
  responsive: ResponsiveConfigSchema.optional(),
  video: VideoConfigSchema.optional(),
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

// ============================================================================
// Type Exports
// ============================================================================

/**
 * Custom theme type inferred from schema
 */
export type CustomTheme = z.infer<typeof CustomThemeSchema>;

/**
 * Theme name type - supports both predefined and custom themes
 */
export type ThemeName = z.infer<typeof ThemeSchema>;

/**
 * Slide type inferred from schema
 */
export type Slide = z.infer<typeof SlideSchema>;

/**
 * Presentation type inferred from schema
 */
export type Presentation = z.infer<typeof PresentationSchema>;

/**
 * Generation options type inferred from schema
 */
export type GenerationOptions = z.infer<typeof GenerationOptionsSchema>;

/**
 * Generation result type inferred from schema
 */
export type GenerationResult = z.infer<typeof GenerationResultSchema>;

/**
 * Overlay configuration type inferred from schema
 */
export type OverlayConfig = z.infer<typeof OverlayConfigSchema>;

/**
 * Text style configuration type inferred from schema
 */
export type TextStyleConfig = z.infer<typeof TextStyleConfigSchema>;
