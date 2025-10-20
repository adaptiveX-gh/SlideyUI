/**
 * Tests for CSS utilities
 */

import { describe, it, expect } from 'vitest';
import { embedCSS } from './css.js';

describe('CSS Utilities', () => {
  describe('embedCSS', () => {
    it('returns CSS for corporate theme', async () => {
      const css = await embedCSS('corporate');
      expect(css).toBeTruthy();
      expect(typeof css).toBe('string');
      expect(css.length).toBeGreaterThan(0);
    });

    it('returns CSS for pitch-deck theme', async () => {
      const css = await embedCSS('pitch-deck');
      expect(css).toBeTruthy();
      expect(css.includes('primary')).toBe(true);
    });

    it('returns CSS for academic theme', async () => {
      const css = await embedCSS('academic');
      expect(css).toBeTruthy();
      expect(css.includes('primary')).toBe(true);
    });

    it('returns CSS for workshop theme', async () => {
      const css = await embedCSS('workshop');
      expect(css).toBeTruthy();
      expect(css.includes('primary')).toBe(true);
    });

    it('returns CSS for startup theme', async () => {
      const css = await embedCSS('startup');
      expect(css).toBeTruthy();
      expect(css.includes('primary')).toBe(true);
    });

    it('returns fallback CSS when core package not found', async () => {
      // This will likely use fallback since we're in test mode
      const css = await embedCSS('corporate');
      expect(css).toContain('SlideyUI');
      expect(css).toContain('.slideyui-card');
      expect(css).toContain('--primary');
      expect(css).toContain('--secondary');
      expect(css).toContain('--accent');
    });

    it('includes expected CSS classes in fallback', async () => {
      const css = await embedCSS('corporate');
      expect(css).toContain('.slideyui-card');
      expect(css).toContain('.slideyui-card-header');
      expect(css).toContain('.slideyui-card-title');
      expect(css).toContain('.slideyui-title');
      expect(css).toContain('.slideyui-subtitle');
      expect(css).toContain('.slideyui-list');
      expect(css).toContain('.slideyui-quote');
      expect(css).toContain('.slideyui-table');
    });

    it('includes correct colors for corporate theme', async () => {
      const css = await embedCSS('corporate');
      expect(css).toContain('#1e40af'); // Corporate primary
    });

    it('includes correct colors for pitch-deck theme', async () => {
      const css = await embedCSS('pitch-deck');
      expect(css).toContain('#7c3aed'); // Pitch-deck primary
    });

    it('includes correct colors for academic theme', async () => {
      const css = await embedCSS('academic');
      expect(css).toContain('#0f172a'); // Academic primary
    });

    it('includes correct colors for workshop theme', async () => {
      const css = await embedCSS('workshop');
      expect(css).toContain('#ea580c'); // Workshop primary
    });

    it('includes correct colors for startup theme', async () => {
      const css = await embedCSS('startup');
      expect(css).toContain('#10b981'); // Startup primary
    });

    it('defaults to corporate theme for unknown theme', async () => {
      const css = await embedCSS('unknown-theme');
      expect(css).toContain('#1e40af'); // Corporate primary (default)
    });

    it('includes responsive font sizes', async () => {
      const css = await embedCSS('corporate');
      expect(css).toContain('font-size');
      expect(css).toMatch(/font-size:\s*[\d.]+rem/);
    });

    it('includes styling for all slide components', async () => {
      const css = await embedCSS('corporate');

      const expectedClasses = [
        '.slideyui-card',
        '.slideyui-title',
        '.slideyui-subtitle',
        '.slideyui-list',
        '.slideyui-text',
        '.slideyui-quote',
        '.slideyui-table',
        '.slideyui-media-image',
        '.slideyui-media-video',
        '.slideyui-media-embed',
      ];

      for (const className of expectedClasses) {
        expect(css).toContain(className);
      }
    });
  });

  describe('Theme Colors', () => {
    it('each theme has unique primary color', async () => {
      const themes = ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'];
      const primaryColors = new Set<string>();

      for (const theme of themes) {
        const css = await embedCSS(theme);
        const match = css.match(/--primary:\s*(#[0-9a-f]{6})/i);
        if (match) {
          primaryColors.add(match[1].toLowerCase());
        }
      }

      // Each theme should have a unique primary color
      expect(primaryColors.size).toBe(5);
    });

    it('includes all required CSS custom properties', async () => {
      const css = await embedCSS('corporate');

      const requiredProperties = [
        '--primary',
        '--secondary',
        '--accent',
        '--background',
        '--text',
      ];

      for (const prop of requiredProperties) {
        expect(css).toContain(prop);
      }
    });
  });
});
