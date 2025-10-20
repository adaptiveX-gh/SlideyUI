/**
 * Theme resource handler
 *
 * Provides theme metadata and previews via MCP resources.
 */

import type {
  Resource,
  ResourceContent,
  ResourceHandler,
  ThemeMetadata,
} from './types.js';
import type { Theme } from '../types/index.js';

/**
 * Theme metadata database
 */
const THEME_METADATA: Record<Theme, ThemeMetadata> = {
  corporate: {
    name: 'corporate',
    displayName: 'Corporate',
    description:
      'Professional theme for business presentations with a clean, corporate aesthetic. Features a sophisticated blue palette and traditional typography.',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#0ea5e9',
      background: '#ffffff',
      foreground: '#1e293b',
    },
    typography: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      headingSizes: ['48px', '36px', '24px'],
    },
    useCases: [
      'Business presentations',
      'Quarterly reports',
      'Stakeholder meetings',
      'Executive briefings',
      'Board presentations',
    ],
  },
  'pitch-deck': {
    name: 'pitch-deck',
    displayName: 'Pitch Deck',
    description:
      'Modern, high-impact theme for startup pitches and investor presentations. Bold gradients and dynamic typography command attention.',
    colors: {
      primary: '#9333ea',
      secondary: '#ec4899',
      accent: '#f59e0b',
      background: '#ffffff',
      foreground: '#1e293b',
    },
    typography: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      headingSizes: ['56px', '40px', '28px'],
    },
    useCases: [
      'Startup pitches',
      'Investor presentations',
      'Product launches',
      'Funding rounds',
      'Demo days',
    ],
  },
  academic: {
    name: 'academic',
    displayName: 'Academic',
    description:
      'Traditional theme for academic and research presentations. Classic serif typography and scholarly color palette convey authority and credibility.',
    colors: {
      primary: '#1e40af',
      secondary: '#78716c',
      accent: '#059669',
      background: '#ffffff',
      foreground: '#1c1917',
    },
    typography: {
      fontFamily: 'Georgia, "Times New Roman", serif',
      headingSizes: ['44px', '34px', '26px'],
    },
    useCases: [
      'Research presentations',
      'Academic conferences',
      'Thesis defenses',
      'Scientific talks',
      'Educational lectures',
    ],
  },
  workshop: {
    name: 'workshop',
    displayName: 'Workshop',
    description:
      'Friendly, approachable theme for training sessions and workshops. Warm colors and clear typography create an engaging learning environment.',
    colors: {
      primary: '#0891b2',
      secondary: '#84cc16',
      accent: '#f97316',
      background: '#ffffff',
      foreground: '#1e293b',
    },
    typography: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      headingSizes: ['52px', '38px', '26px'],
    },
    useCases: [
      'Training sessions',
      'Workshops',
      'Team meetings',
      'Internal presentations',
      'Skill-building sessions',
    ],
  },
  startup: {
    name: 'startup',
    displayName: 'Startup',
    description:
      'Bold, energetic theme for startup culture and modern tech companies. Vibrant colors and contemporary design reflect innovation and dynamism.',
    colors: {
      primary: '#0ea5e9',
      secondary: '#8b5cf6',
      accent: '#06b6d4',
      background: '#ffffff',
      foreground: '#1e293b',
    },
    typography: {
      fontFamily:
        'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
      headingSizes: ['54px', '42px', '28px'],
    },
    useCases: [
      'Company all-hands',
      'Product roadmaps',
      'Team presentations',
      'Startup culture',
      'Tech talks',
    ],
  },
};

/**
 * Theme resource handler
 */
export class ThemeResourceHandler implements ResourceHandler {
  private readonly baseUri = 'slideyui://themes';

  /**
   * List all theme resources
   */
  list(): Resource[] {
    const themes = Object.keys(THEME_METADATA) as Theme[];

    return [
      {
        uri: this.baseUri,
        name: 'All Themes',
        description: 'List of all available presentation themes',
        mimeType: 'application/json',
      },
      ...themes.map((theme) => ({
        uri: `${this.baseUri}/${theme}`,
        name: THEME_METADATA[theme].displayName,
        description: THEME_METADATA[theme].description,
        mimeType: 'application/json',
      })),
    ];
  }

  /**
   * Read theme resource
   */
  read(uri: string): ResourceContent {
    if (uri === this.baseUri) {
      // Return list of all themes
      const themes = Object.values(THEME_METADATA);
      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(themes, null, 2),
      };
    }

    // Extract theme name from URI
    const themeName = uri.replace(`${this.baseUri}/`, '') as Theme;

    if (!THEME_METADATA[themeName]) {
      throw new Error(`Theme not found: ${themeName}`);
    }

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(THEME_METADATA[themeName], null, 2),
    };
  }

  /**
   * Check if URI is a theme resource
   */
  canHandle(uri: string): boolean {
    return uri.startsWith(this.baseUri);
  }
}

/**
 * Get theme metadata by name
 */
export function getThemeMetadata(theme: Theme): ThemeMetadata {
  return THEME_METADATA[theme];
}

/**
 * Get all theme names
 */
export function getAllThemeNames(): Theme[] {
  return Object.keys(THEME_METADATA) as Theme[];
}
