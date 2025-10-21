/**
 * SlideyUI Design Presets System
 * Pre-configured theme variations for specific presentation types
 */

import type { Theme, ThemeId, ColorPalette, SpacingPreferences, ThemeFeatures, HeroDefaults } from './types';

/**
 * Design preset interface - extends a base theme with specific overrides
 */
export interface DesignPreset {
  /** Unique preset identifier */
  id: string;
  /** Human-readable name */
  name: string;
  /** Description of when to use this preset */
  description: string;
  /** Base theme to extend */
  baseTheme: ThemeId;
  /** Theme property overrides */
  overrides: {
    colors?: Partial<ColorPalette>;
    spacing?: Partial<SpacingPreferences>;
    features?: Partial<ThemeFeatures>;
    heroDefaults?: Partial<HeroDefaults>;
  };
}

/**
 * Tech Startup Pitch Preset
 * Bold, modern, gradient-heavy for funding pitches
 */
export const techStartupPreset: DesignPreset = {
  id: 'tech-startup',
  name: 'Tech Startup Pitch',
  description: 'Bold, modern, gradient-heavy for funding pitches',
  baseTheme: 'startup',
  overrides: {
    spacing: {
      slidePadding: 4,
      contentGap: 3,
    },
    features: {
      gradients: true,
      animations: true,
      dataVisualization: true,
      interactivity: true,
    },
    heroDefaults: {
      overlay: {
        type: 'gradient',
        colors: ['primary', 'secondary'],
        direction: '45deg',
        opacity: 0.85,
      },
      textStyle: {
        position: 'center',
        color: 'white',
        shadow: true,
      },
    },
  },
};

/**
 * Academic Research Preset
 * Conservative, citation-heavy, serif fonts
 */
export const academicResearchPreset: DesignPreset = {
  id: 'academic-research',
  name: 'Academic Research Paper',
  description: 'Conservative, citation-heavy, serif fonts for academic presentations',
  baseTheme: 'academic',
  overrides: {
    colors: {
      background: '#faf7f2', // Warmer paper tone
    },
    features: {
      citations: true,
      gradients: false,
      animations: false,
      codeHighlight: true,
      dataVisualization: true,
    },
    spacing: {
      slidePadding: 2.5,
      contentGap: 1.5,
    },
  },
};

/**
 * Sales Demo Preset
 * Clean, modern, data-driven with metrics
 */
export const salesDemoPreset: DesignPreset = {
  id: 'sales-demo',
  name: 'Sales Product Demo',
  description: 'Clean, modern, data-driven with metrics for product demonstrations',
  baseTheme: 'corporate',
  overrides: {
    features: {
      dataVisualization: true,
      interactivity: true,
      animations: true,
      gradients: true,
    },
    spacing: {
      contentGap: 2.5,
      slidePadding: 3.5,
    },
    colors: {
      accent: '#10b981', // Green for positive metrics
    },
  },
};

/**
 * Workshop Interactive Preset
 * Playful, colorful, exercise-focused
 */
export const workshopInteractivePreset: DesignPreset = {
  id: 'workshop-interactive',
  name: 'Interactive Workshop',
  description: 'Playful, colorful, exercise-focused for hands-on learning',
  baseTheme: 'workshop',
  overrides: {
    features: {
      interactivity: true,
      animations: true,
      codeHighlight: true,
      gradients: true,
    },
    spacing: {
      slidePadding: 3,
      contentGap: 2.5,
    },
    heroDefaults: {
      overlay: {
        type: 'gradient',
        colors: ['primary', 'accent'],
        direction: '135deg',
        opacity: 0.75,
      },
      textStyle: {
        position: 'center',
        color: 'white',
        shadow: true,
      },
    },
  },
};

/**
 * Design presets registry
 */
export const designPresets: Record<string, DesignPreset> = {
  'tech-startup': techStartupPreset,
  'academic-research': academicResearchPreset,
  'sales-demo': salesDemoPreset,
  'workshop-interactive': workshopInteractivePreset,
};

/**
 * Get a design preset by ID
 */
export function getPreset(id: string): DesignPreset | undefined {
  return designPresets[id];
}

/**
 * Get all available preset IDs
 */
export function getPresetIds(): string[] {
  return Object.keys(designPresets);
}

/**
 * Check if a preset ID is valid
 */
export function isValidPreset(id: string): boolean {
  return id in designPresets;
}

/**
 * Apply a design preset to a base theme
 * Deep merges the preset overrides with the base theme
 */
export function applyPreset(baseTheme: Theme, preset: DesignPreset): Theme {
  const result: Theme = { ...baseTheme };

  // Apply color overrides
  if (preset.overrides.colors) {
    result.colors = { ...result.colors, ...preset.overrides.colors };
  }

  // Apply spacing overrides
  if (preset.overrides.spacing) {
    result.spacing = { ...result.spacing, ...preset.overrides.spacing };
  }

  // Apply feature overrides
  if (preset.overrides.features) {
    result.features = { ...result.features, ...preset.overrides.features };
  }

  // Apply hero defaults overrides (deep merge)
  if (preset.overrides.heroDefaults) {
    if (!result.heroDefaults) {
      result.heroDefaults = preset.overrides.heroDefaults as any;
    } else {
      // Deep merge hero defaults
      result.heroDefaults = {
        overlay: {
          ...result.heroDefaults.overlay,
          ...(preset.overrides.heroDefaults.overlay || {}),
        },
        textStyle: {
          ...result.heroDefaults.textStyle,
          ...(preset.overrides.heroDefaults.textStyle || {}),
        },
      };
    }
  }

  return result;
}
