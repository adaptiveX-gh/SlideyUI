/**
 * create_custom_theme tool
 *
 * Creates and registers a custom theme with auto-generated colors
 * from a primary brand color.
 */

import { CustomThemeSchema, PREDEFINED_THEMES } from '../schema/index.js';
import { generateThemeColors, validateAccessibility } from '../utils/colors.js';
import { registerTheme, hasTheme } from '../utils/theme-registry.js';
import type { CustomTheme } from '../schema/index.js';

/**
 * Options for theme creation
 */
interface CreateCustomThemeOptions {
  /**
   * Validate accessibility and return warnings
   * @default true
   */
  validateAccessibility?: boolean;

  /**
   * Auto-generate missing color shades from primary color
   * @default true
   */
  autoGenerateShades?: boolean;

  /**
   * Base theme to use for color harmony generation
   * @default 'analogous'
   */
  baseTheme?: 'complementary' | 'analogous' | 'triadic' | 'monochromatic';

  /**
   * Background color override (defaults to white)
   */
  background?: string;
}

export const createCustomThemeTool = {
  name: 'create_custom_theme',
  description:
    'Create a custom presentation theme with brand-specific colors. ' +
    'Provide a primary color and the tool will auto-generate a complete, ' +
    'accessible color palette using color theory. Returns the complete theme ' +
    'with all colors resolved and accessibility warnings if any.',

  inputSchema: {
    type: 'object' as const,
    properties: {
      name: {
        type: 'string',
        description:
          'Unique theme identifier (lowercase, alphanumeric with hyphens). ' +
          'Cannot conflict with predefined themes: ' + PREDEFINED_THEMES.join(', '),
        pattern: '^[a-z0-9]+(-[a-z0-9]+)*$',
      },
      displayName: {
        type: 'string',
        description: 'Human-readable theme name (e.g., "ACME Healthcare", "Tech Startup 2024")',
        minLength: 1,
      },
      colors: {
        type: 'object',
        description:
          'Theme color palette. Only primary color is required; ' +
          'other colors will be auto-generated for optimal contrast and harmony.',
        properties: {
          primary: {
            type: 'string',
            description: 'Primary brand color in hex format (e.g., "#3b82f6")',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          secondary: {
            type: 'string',
            description: 'Secondary brand color (optional, auto-generated if not provided)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          accent: {
            type: 'string',
            description: 'Accent color for highlights (optional, auto-generated if not provided)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          background: {
            type: 'string',
            description: 'Background color (optional, defaults to white)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          foreground: {
            type: 'string',
            description: 'Text color (optional, auto-calculated for contrast)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          muted: {
            type: 'string',
            description: 'Muted/disabled element color (optional, auto-generated)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          mutedForeground: {
            type: 'string',
            description: 'Text color for muted elements (optional, auto-generated)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
          border: {
            type: 'string',
            description: 'Border color (optional, auto-generated)',
            pattern: '^#[0-9A-Fa-f]{6}$',
          },
        },
        required: ['primary'],
      },
      metadata: {
        type: 'object',
        description: 'Optional theme metadata',
        properties: {
          author: {
            type: 'string',
            description: 'Theme creator/author',
          },
          description: {
            type: 'string',
            description: 'Theme description',
          },
          tags: {
            type: 'array',
            items: { type: 'string' },
            description: 'Tags for categorizing/searching themes',
          },
        },
      },
      options: {
        type: 'object',
        description: 'Theme generation options',
        properties: {
          validateAccessibility: {
            type: 'boolean',
            description: 'Check WCAG contrast ratios and return warnings (default: true)',
            default: true,
          },
          autoGenerateShades: {
            type: 'boolean',
            description: 'Auto-generate missing colors from primary (default: true)',
            default: true,
          },
          baseTheme: {
            type: 'string',
            enum: ['complementary', 'analogous', 'triadic', 'monochromatic'],
            description: 'Color harmony to use for auto-generation (default: analogous)',
            default: 'analogous',
          },
          background: {
            type: 'string',
            pattern: '^#[0-9A-Fa-f]{6}$',
            description: 'Background color override (defaults to white)',
          },
        },
      },
    },
    required: ['name', 'displayName', 'colors'],
  },

  async handler(args: Record<string, unknown>) {
    // Extract options
    const options = (args.options as CreateCustomThemeOptions) || {};
    const shouldValidate = options.validateAccessibility !== false;
    const shouldAutoGenerate = options.autoGenerateShades !== false;

    // Validate input against schema
    const input = CustomThemeSchema.parse({
      name: args.name,
      displayName: args.displayName,
      colors: args.colors,
      metadata: args.metadata,
    });

    // Check if theme already exists
    if (hasTheme(input.name)) {
      return {
        success: false,
        error: `Theme "${input.name}" already exists. Choose a different name or use update_theme.`,
      };
    }

    // Auto-generate missing colors if enabled
    let completeColors = { ...input.colors };

    if (shouldAutoGenerate) {
      // Generate complete palette from primary color
      const bgColor = options.background ?? input.colors.background;
      const generatedColors = generateThemeColors(input.colors.primary, {
        ...(bgColor && { background: bgColor }),
        preferredHarmony: options.baseTheme ?? 'analogous',
      });

      // Merge user-provided colors with generated colors
      // User-provided colors take precedence
      completeColors = {
        primary: input.colors.primary,
        secondary: input.colors.secondary || generatedColors.secondary,
        accent: input.colors.accent || generatedColors.accent,
        background: input.colors.background || generatedColors.background,
        foreground: input.colors.foreground || generatedColors.foreground,
        muted: input.colors.muted || generatedColors.muted,
        mutedForeground: input.colors.mutedForeground || generatedColors.mutedForeground,
        border: input.colors.border || generatedColors.border,
      };
    } else {
      // Ensure required colors are present
      if (!completeColors.background) {
        completeColors.background = '#ffffff';
      }
      if (!completeColors.foreground) {
        completeColors.foreground = '#0f172a';
      }
      if (!completeColors.accent) {
        completeColors.accent = completeColors.primary;
      }
      if (!completeColors.muted) {
        completeColors.muted = '#f1f5f9';
      }
      if (!completeColors.mutedForeground) {
        completeColors.mutedForeground = '#64748b';
      }
      if (!completeColors.border) {
        completeColors.border = '#e2e8f0';
      }
    }

    // Ensure all required colors are set
    const finalColors = {
      primary: completeColors.primary,
      secondary: completeColors.secondary ?? '#64748b',
      accent: completeColors.accent ?? completeColors.primary,
      background: completeColors.background ?? '#ffffff',
      foreground: completeColors.foreground ?? '#0f172a',
      muted: completeColors.muted ?? '#f1f5f9',
      mutedForeground: completeColors.mutedForeground ?? '#64748b',
      border: completeColors.border ?? '#e2e8f0',
    };

    // Create complete theme object
    const completeTheme: CustomTheme = {
      name: input.name,
      displayName: input.displayName,
      colors: finalColors,
      metadata: input.metadata,
    };

    // Validate accessibility if enabled
    const warnings: string[] = [];
    if (shouldValidate) {
      // Type assertion: we know all colors are set because finalColors has defaults
      const accessibilityWarnings = validateAccessibility({
        colors: finalColors as Required<typeof finalColors>,
      });
      warnings.push(...accessibilityWarnings);
    }

    // Register the theme
    try {
      registerTheme(completeTheme);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to register theme',
      };
    }

    // Generate color palette preview
    const colorPreview = [
      `Theme "${completeTheme.displayName}" (${completeTheme.name})`,
      '',
      'Color Palette:',
      `  Primary:          ${completeTheme.colors.primary}`,
      `  Secondary:        ${completeTheme.colors.secondary}`,
      `  Accent:           ${completeTheme.colors.accent}`,
      `  Background:       ${completeTheme.colors.background}`,
      `  Foreground:       ${completeTheme.colors.foreground}`,
      `  Muted:            ${completeTheme.colors.muted}`,
      `  Muted Foreground: ${completeTheme.colors.mutedForeground}`,
      `  Border:           ${completeTheme.colors.border}`,
    ].join('\n');

    // Return success response
    return {
      success: true,
      theme: completeTheme,
      warnings: warnings.length > 0 ? warnings : undefined,
      preview: colorPreview,
      message:
        warnings.length > 0
          ? `Theme "${completeTheme.name}" created with ${warnings.length} accessibility warning(s)`
          : `Theme "${completeTheme.name}" created successfully`,
    };
  },
};
