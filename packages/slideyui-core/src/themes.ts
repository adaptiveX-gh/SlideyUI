/**
 * SlideyUI Theme System
 * Defines presentation themes optimized for different contexts
 */

import type { Theme, ThemeId } from './types';

/**
 * Corporate Theme
 * Professional, conservative styling for business presentations
 */
export const corporateTheme: Theme = {
  id: 'corporate',
  name: 'Corporate',
  description: 'Professional and conservative for business presentations',
  slideRatio: '16:9',
  colors: {
    primary: '#1e40af', // Deep blue
    primaryForeground: '#ffffff',
    secondary: '#64748b', // Slate gray
    secondaryForeground: '#ffffff',
    accent: '#0891b2', // Cyan
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#0f172a',
    muted: '#f1f5f9',
    mutedForeground: '#64748b',
    border: '#e2e8f0',
  },
  fonts: {
    display: ['Inter', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  spacing: {
    base: 1,
    slidePadding: 3,
    contentGap: 2,
  },
  animationStyle: 'subtle',
  features: {
    citations: true,
    interactivity: false,
    gradients: false,
    animations: true,
    codeHighlight: true,
    dataVisualization: true,
  },
  heroDefaults: {
    overlay: {
      type: 'gradient',
      colors: ['primary', 'secondary'],
      direction: '135deg',
      opacity: 0.7,
    },
    textStyle: {
      position: 'center',
      color: 'white',
      shadow: true,
    },
  },
  modes: {
    light: {
      primary: '#1e40af',
      primaryForeground: '#ffffff',
      secondary: '#64748b',
      secondaryForeground: '#ffffff',
      accent: '#0891b2',
      accentForeground: '#ffffff',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f1f5f9',
      mutedForeground: '#64748b',
      border: '#e2e8f0',
    },
    dark: {
      primary: '#60a5fa', // Lighter blue for dark backgrounds
      primaryForeground: '#0f172a',
      secondary: '#94a3b8', // Lighter slate
      secondaryForeground: '#0f172a',
      accent: '#22d3ee', // Brighter cyan
      accentForeground: '#0f172a',
      background: '#0f172a', // Dark slate
      foreground: '#f1f5f9', // Light text
      muted: '#1e293b',
      mutedForeground: '#cbd5e1',
      border: '#334155',
    },
  },
};

/**
 * Pitch Deck Theme
 * Dynamic and vibrant for startup pitches and sales
 */
export const pitchDeckTheme: Theme = {
  id: 'pitch-deck',
  name: 'Pitch Deck',
  description: 'Dynamic and vibrant for pitches and sales',
  slideRatio: '16:9',
  colors: {
    primary: '#7c3aed', // Vibrant purple
    primaryForeground: '#ffffff',
    secondary: '#ec4899', // Pink
    secondaryForeground: '#ffffff',
    accent: '#f59e0b', // Amber
    accentForeground: '#000000',
    background: '#0f172a', // Dark background
    foreground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    border: '#334155',
    gradient: {
      from: '#7c3aed',
      via: '#ec4899',
      to: '#f59e0b',
    },
  },
  fonts: {
    display: ['Poppins', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'monospace'],
  },
  spacing: {
    base: 1,
    slidePadding: 4,
    contentGap: 3,
  },
  animationStyle: 'energetic',
  features: {
    citations: false,
    interactivity: true,
    gradients: true,
    animations: true,
    codeHighlight: false,
    dataVisualization: true,
  },
  heroDefaults: {
    overlay: {
      type: 'gradient',
      colors: ['primary', 'accent'],
      direction: '45deg',
      opacity: 0.9,
    },
    textStyle: {
      position: 'center',
      color: 'white',
      shadow: true,
    },
  },
  modes: {
    light: {
      primary: '#9333ea', // Vibrant purple
      primaryForeground: '#ffffff',
      secondary: '#ec4899', // Pink
      secondaryForeground: '#ffffff',
      accent: '#f59e0b', // Amber
      accentForeground: '#000000',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#f3f4f6',
      mutedForeground: '#6b7280',
      border: '#e5e7eb',
      gradient: {
        from: '#9333ea',
        via: '#ec4899',
        to: '#f59e0b',
      },
    },
    dark: {
      primary: '#a855f7', // Lighter purple
      primaryForeground: '#ffffff',
      secondary: '#f472b6', // Lighter pink
      secondaryForeground: '#ffffff',
      accent: '#fbbf24', // Lighter amber
      accentForeground: '#000000',
      background: '#0f172a', // Dark slate
      foreground: '#f8fafc',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      gradient: {
        from: '#a855f7',
        via: '#f472b6',
        to: '#fbbf24',
      },
    },
  },
};

/**
 * Academic Theme
 * Traditional and dense for educational and research presentations
 */
export const academicTheme: Theme = {
  id: 'academic',
  name: 'Academic',
  description: 'Traditional and dense for educational content',
  slideRatio: '4:3',
  colors: {
    primary: '#1e3a8a', // Navy blue
    primaryForeground: '#ffffff',
    secondary: '#92400e', // Brown
    secondaryForeground: '#ffffff',
    accent: '#065f46', // Green
    accentForeground: '#ffffff',
    background: '#fefce8', // Cream
    foreground: '#1c1917',
    muted: '#fef3c7',
    mutedForeground: '#78716c',
    border: '#d6d3d1',
  },
  fonts: {
    display: ['Crimson Pro', 'Georgia', 'serif'],
    body: ['Source Sans Pro', 'system-ui', 'sans-serif'],
    mono: ['Source Code Pro', 'monospace'],
  },
  spacing: {
    base: 0.875,
    slidePadding: 2.5,
    contentGap: 1.5,
  },
  animationStyle: 'subtle',
  features: {
    citations: true,
    interactivity: false,
    gradients: false,
    animations: false,
    codeHighlight: true,
    dataVisualization: true,
  },
  heroDefaults: {
    overlay: {
      type: 'solid',
      colors: ['primary'],
      opacity: 0.5,
    },
    textStyle: {
      position: 'bottom',
      color: 'white',
      shadow: true,
    },
  },
  modes: {
    light: {
      primary: '#1e3a8a', // Navy blue
      primaryForeground: '#ffffff',
      secondary: '#92400e', // Brown
      secondaryForeground: '#ffffff',
      accent: '#065f46', // Green
      accentForeground: '#ffffff',
      background: '#fefce8', // Cream
      foreground: '#1c1917',
      muted: '#fef3c7',
      mutedForeground: '#78716c',
      border: '#d6d3d1',
    },
    dark: {
      primary: '#60a5fa', // Light blue
      primaryForeground: '#1e3a8a',
      secondary: '#fbbf24', // Light amber (instead of brown)
      secondaryForeground: '#78350f',
      accent: '#34d399', // Light green
      accentForeground: '#065f46',
      background: '#1c1917', // Very dark brown
      foreground: '#fef3c7', // Cream text
      muted: '#292524',
      mutedForeground: '#a8a29e',
      border: '#44403c',
    },
  },
};

/**
 * Workshop Theme
 * Interactive and playful for hands-on sessions
 */
export const workshopTheme: Theme = {
  id: 'workshop',
  name: 'Workshop',
  description: 'Interactive and playful for hands-on sessions',
  slideRatio: '16:9',
  colors: {
    primary: '#2563eb', // Bright blue
    primaryForeground: '#ffffff',
    secondary: '#10b981', // Green
    secondaryForeground: '#ffffff',
    accent: '#f97316', // Orange
    accentForeground: '#ffffff',
    background: '#f0fdfa',
    foreground: '#134e4a',
    muted: '#ccfbf1',
    mutedForeground: '#14b8a6',
    border: '#5eead4',
  },
  fonts: {
    display: ['Nunito', 'system-ui', 'sans-serif'],
    body: ['Open Sans', 'system-ui', 'sans-serif'],
    mono: ['Roboto Mono', 'monospace'],
  },
  spacing: {
    base: 1,
    slidePadding: 3,
    contentGap: 2.5,
  },
  animationStyle: 'dynamic',
  features: {
    citations: false,
    interactivity: true,
    gradients: true,
    animations: true,
    codeHighlight: true,
    dataVisualization: false,
  },
  heroDefaults: {
    overlay: {
      type: 'gradient',
      colors: ['primary', 'accent'],
      direction: '135deg',
      opacity: 0.7,
    },
    textStyle: {
      position: 'center',
      color: 'white',
      shadow: true,
    },
  },
  modes: {
    light: {
      primary: '#2563eb', // Bright blue
      primaryForeground: '#ffffff',
      secondary: '#10b981', // Green
      secondaryForeground: '#ffffff',
      accent: '#f97316', // Orange
      accentForeground: '#ffffff',
      background: '#f0fdfa', // Cyan tint
      foreground: '#134e4a',
      muted: '#ccfbf1',
      mutedForeground: '#14b8a6',
      border: '#5eead4',
    },
    dark: {
      primary: '#60a5fa', // Light blue
      primaryForeground: '#1e3a8a',
      secondary: '#34d399', // Light green
      secondaryForeground: '#065f46',
      accent: '#fb923c', // Light orange
      accentForeground: '#7c2d12',
      background: '#134e4a', // Dark teal
      foreground: '#f0fdfa', // Light cyan
      muted: '#0f766e',
      mutedForeground: '#99f6e4',
      border: '#14b8a6',
    },
  },
};

/**
 * Startup Theme
 * Modern and energetic for tech companies and innovation
 */
export const startupTheme: Theme = {
  id: 'startup',
  name: 'Startup',
  description: 'Modern and energetic for tech companies',
  slideRatio: '16:9',
  colors: {
    primary: '#0ea5e9', // Sky blue
    primaryForeground: '#ffffff',
    secondary: '#8b5cf6', // Violet
    secondaryForeground: '#ffffff',
    accent: '#06b6d4', // Cyan
    accentForeground: '#ffffff',
    background: '#ffffff',
    foreground: '#020617',
    muted: '#f1f5f9',
    mutedForeground: '#475569',
    border: '#cbd5e1',
    gradient: {
      from: '#0ea5e9',
      via: '#8b5cf6',
      to: '#06b6d4',
    },
  },
  fonts: {
    display: ['Space Grotesk', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  spacing: {
    base: 1,
    slidePadding: 3.5,
    contentGap: 2,
  },
  animationStyle: 'dynamic',
  features: {
    citations: false,
    interactivity: true,
    gradients: true,
    animations: true,
    codeHighlight: true,
    dataVisualization: true,
  },
  heroDefaults: {
    overlay: {
      type: 'gradient',
      colors: ['primary', 'secondary'],
      direction: '135deg',
      opacity: 0.75,
    },
    textStyle: {
      position: 'center',
      color: 'white',
      shadow: true,
    },
  },
  modes: {
    light: {
      primary: '#0ea5e9', // Sky blue
      primaryForeground: '#ffffff',
      secondary: '#8b5cf6', // Violet
      secondaryForeground: '#ffffff',
      accent: '#06b6d4', // Cyan
      accentForeground: '#ffffff',
      background: '#ffffff',
      foreground: '#020617',
      muted: '#f1f5f9',
      mutedForeground: '#475569',
      border: '#cbd5e1',
      gradient: {
        from: '#0ea5e9',
        via: '#8b5cf6',
        to: '#06b6d4',
      },
    },
    dark: {
      primary: '#38bdf8', // Lighter sky blue
      primaryForeground: '#0c4a6e',
      secondary: '#a78bfa', // Lighter violet
      secondaryForeground: '#4c1d95',
      accent: '#22d3ee', // Lighter cyan
      accentForeground: '#164e63',
      background: '#020617', // Very dark slate
      foreground: '#f8fafc',
      muted: '#1e293b',
      mutedForeground: '#94a3b8',
      border: '#334155',
      gradient: {
        from: '#38bdf8',
        via: '#a78bfa',
        to: '#22d3ee',
      },
    },
  },
};

/**
 * Theme registry for lookup by ID
 */
export const themes: Record<ThemeId, Theme> = {
  corporate: corporateTheme,
  'pitch-deck': pitchDeckTheme,
  academic: academicTheme,
  workshop: workshopTheme,
  startup: startupTheme,
};

/**
 * Custom theme registry for user-registered themes
 * Allows runtime theme registration without modifying the core theme set
 */
const customThemeRegistry: Map<string, Theme> = new Map();

/**
 * Get a theme by ID with type safety
 * Checks both built-in and custom themes
 */
export function getTheme(id: ThemeId | string): Theme {
  // Check built-in themes first
  if (id in themes) {
    return themes[id as ThemeId];
  }

  // Check custom theme registry
  const customTheme = customThemeRegistry.get(id);
  if (customTheme) {
    return customTheme;
  }

  // Fallback to corporate theme
  console.warn(`Theme "${id}" not found, using corporate theme as fallback`);
  return themes.corporate;
}

/**
 * Register a custom theme
 * Allows users to add their own themes at runtime
 *
 * @param theme - The theme object to register
 * @throws Error if theme is invalid
 *
 * @example
 * ```ts
 * const myTheme = createDerivedTheme('corporate', {
 *   colors: { primary: '#FF5733' }
 * }, { id: 'my-brand', name: 'My Brand' });
 *
 * registerTheme(myTheme);
 * ```
 */
export function registerTheme(theme: Theme): void {
  // Validate theme has required properties
  if (!theme.id || !theme.name || !theme.colors || !theme.fonts) {
    throw new Error('Invalid theme: missing required properties (id, name, colors, fonts)');
  }

  // Warn if overwriting existing theme
  if (theme.id in themes) {
    console.warn(`Overwriting built-in theme "${theme.id}" with custom theme`);
  } else if (customThemeRegistry.has(theme.id)) {
    console.warn(`Overwriting custom theme "${theme.id}"`);
  }

  customThemeRegistry.set(theme.id, theme);
}

/**
 * Get all available theme IDs (built-in + custom)
 */
export function getThemeIds(): string[] {
  const builtInIds = Object.keys(themes) as ThemeId[];
  const customIds = Array.from(customThemeRegistry.keys());
  return [...builtInIds, ...customIds];
}

/**
 * Check if a theme ID is valid (exists in built-in or custom registry)
 */
export function isValidTheme(id: string): boolean {
  return id in themes || customThemeRegistry.has(id);
}

/**
 * Unregister a custom theme
 * Cannot remove built-in themes
 *
 * @param id - The theme ID to unregister
 * @returns true if theme was removed, false if not found
 */
export function unregisterTheme(id: string): boolean {
  if (id in themes) {
    console.warn(`Cannot unregister built-in theme "${id}"`);
    return false;
  }

  return customThemeRegistry.delete(id);
}

/**
 * Clear all custom themes
 * Does not affect built-in themes
 */
export function clearCustomThemes(): void {
  customThemeRegistry.clear();
}
