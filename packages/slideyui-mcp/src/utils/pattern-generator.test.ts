/**
 * Tests for pattern generator utility
 */

import { describe, it, expect } from 'vitest';
import { generatePattern, type PatternType, type PatternOptions } from './pattern-generator.js';

// All pattern types from spec
const PATTERN_TYPES: PatternType[] = [
  // Geometric
  'dots', 'grid', 'diagonal-lines', 'chevron', 'hexagon',
  // Organic
  'waves', 'blobs', 'noise',
  // Abstract
  'gradient-mesh', 'particles', 'rays'
];

describe('Pattern Generator', () => {
  describe('Pattern Library Coverage', () => {
    it('generates all pattern types', () => {
      const options: PatternOptions = {
        width: 800,
        height: 600,
        theme: 'corporate'
      };

      PATTERN_TYPES.forEach(patternType => {
        const svg = generatePattern(patternType, options);
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
      });
    });

    it('all patterns have valid SVG structure', () => {
      const options: PatternOptions = { width: 400, height: 300 };

      PATTERN_TYPES.forEach(patternType => {
        const svg = generatePattern(patternType, options);
        expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
        expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      });
    });

    it('all patterns have viewBox', () => {
      const options: PatternOptions = { width: 800, height: 600 };

      PATTERN_TYPES.forEach(patternType => {
        const svg = generatePattern(patternType, options);
        expect(svg).toContain('viewBox="0 0 800 600"');
      });
    });
  });

  describe('Pattern Dimensions', () => {
    it('uses specified width and height', () => {
      const svg = generatePattern('dots', { width: 1920, height: 1080 });
      expect(svg).toContain('width="1920"');
      expect(svg).toContain('height="1080"');
      expect(svg).toContain('viewBox="0 0 1920 1080"');
    });

    it('handles standard presentation sizes', () => {
      const sizes = [
        { width: 1920, height: 1080 }, // 16:9
        { width: 1024, height: 768 },  // 4:3
        { width: 800, height: 600 },   // Small 4:3
      ];

      sizes.forEach(({ width, height }) => {
        const svg = generatePattern('grid', { width, height });
        expect(svg).toContain(`width="${width}"`);
        expect(svg).toContain(`height="${height}"`);
      });
    });
  });

  describe('Pattern Density', () => {
    it('supports low density', () => {
      const svg = generatePattern('dots', {
        width: 800,
        height: 600,
        density: 'low'
      });

      expect(svg).toContain('<svg');
      // Low density should have fewer pattern elements
    });

    it('supports medium density (default)', () => {
      const svg = generatePattern('dots', {
        width: 800,
        height: 600,
        density: 'medium'
      });

      expect(svg).toContain('<svg');
    });

    it('supports high density', () => {
      const svg = generatePattern('dots', {
        width: 800,
        height: 600,
        density: 'high'
      });

      expect(svg).toContain('<svg');
      // High density should have more pattern elements
    });

    it('high density has more elements than low density', () => {
      const lowDensity = generatePattern('dots', {
        width: 400,
        height: 300,
        density: 'low'
      });

      const highDensity = generatePattern('dots', {
        width: 400,
        height: 300,
        density: 'high'
      });

      const lowCircles = (lowDensity.match(/<circle/g) || []).length;
      const highCircles = (highDensity.match(/<circle/g) || []).length;

      expect(highCircles).toBeGreaterThan(lowCircles);
    });
  });

  describe('Pattern Opacity', () => {
    it('uses default opacity of 0.1', () => {
      const svg = generatePattern('dots', { width: 400, height: 300 });
      expect(svg).toContain('opacity="0.1"');
    });

    it('accepts custom opacity', () => {
      const svg = generatePattern('dots', {
        width: 400,
        height: 300,
        opacity: 0.5
      });
      expect(svg).toContain('opacity="0.5"');
    });

    it('supports very subtle opacity', () => {
      const svg = generatePattern('grid', {
        width: 400,
        height: 300,
        opacity: 0.05
      });
      expect(svg).toContain('opacity="0.05"');
    });

    it('supports higher opacity', () => {
      const svg = generatePattern('waves', {
        width: 400,
        height: 300,
        opacity: 0.8
      });
      expect(svg).toContain('opacity="0.8"');
    });
  });

  describe('Theme Integration', () => {
    it('applies corporate theme colors', () => {
      const svg = generatePattern('dots', {
        width: 400,
        height: 300,
        theme: 'corporate'
      });
      expect(svg).toContain('#1e40af'); // Corporate primary
    });

    it('applies pitch-deck theme colors', () => {
      const svg = generatePattern('gradient-mesh', {
        width: 400,
        height: 300,
        theme: 'pitch-deck'
      });
      expect(svg).toContain('#7c3aed'); // Pitch-deck primary
    });

    it('applies startup theme colors', () => {
      const svg = generatePattern('rays', {
        width: 400,
        height: 300,
        theme: 'startup'
      });
      expect(svg).toContain('#0ea5e9'); // Startup primary
    });

    it('applies academic theme colors', () => {
      const svg = generatePattern('grid', {
        width: 400,
        height: 300,
        theme: 'academic'
      });
      expect(svg).toContain('#1e3a8a'); // Academic primary
    });

    it('applies workshop theme colors', () => {
      const svg = generatePattern('chevron', {
        width: 400,
        height: 300,
        theme: 'workshop'
      });
      expect(svg).toContain('#2563eb'); // Workshop primary
    });
  });

  describe('Geometric Patterns', () => {
    it('generates dots pattern', () => {
      const svg = generatePattern('dots', { width: 400, height: 300 });
      expect(svg).toContain('<circle'); // Dots are circles
    });

    it('generates grid pattern', () => {
      const svg = generatePattern('grid', { width: 400, height: 300 });
      expect(svg).toContain('<line'); // Grid uses lines
    });

    it('generates diagonal-lines pattern', () => {
      const svg = generatePattern('diagonal-lines', { width: 400, height: 300 });
      expect(svg).toContain('<line'); // Diagonal lines
    });

    it('generates chevron pattern', () => {
      const svg = generatePattern('chevron', { width: 400, height: 300 });
      expect(svg).toContain('<path'); // Chevrons are paths
    });

    it('generates hexagon pattern', () => {
      const svg = generatePattern('hexagon', { width: 400, height: 300 });
      expect(svg).toContain('<path'); // Hexagons are paths
    });
  });

  describe('Organic Patterns', () => {
    it('generates waves pattern', () => {
      const svg = generatePattern('waves', { width: 800, height: 600 });
      expect(svg).toContain('<path'); // Waves are paths with curves
      expect(svg).toMatch(/[Cc]/); // Cubic bezier curves
    });

    it('generates blobs pattern', () => {
      const svg = generatePattern('blobs', { width: 800, height: 600 });
      expect(svg).toMatch(/<circle|<ellipse|<path/); // Blobs can be various shapes
    });

    it('generates noise pattern', () => {
      const svg = generatePattern('noise', { width: 400, height: 300 });
      expect(svg).toMatch(/<circle|<rect/); // Noise uses small shapes
    });
  });

  describe('Abstract Patterns', () => {
    it('generates gradient-mesh pattern', () => {
      const svg = generatePattern('gradient-mesh', { width: 800, height: 600 });
      expect(svg).toContain('linearGradient'); // Uses gradients
      expect(svg).toMatch(/<rect|<path/);
    });

    it('generates particles pattern', () => {
      const svg = generatePattern('particles', { width: 800, height: 600 });
      expect(svg).toContain('<circle'); // Particles are circles
    });

    it('generates rays pattern', () => {
      const svg = generatePattern('rays', { width: 800, height: 600 });
      expect(svg).toContain('<path'); // Rays are paths radiating from center
    });
  });

  describe('Pattern Definitions', () => {
    it('uses <pattern> element for repeating patterns', () => {
      const svg = generatePattern('dots', { width: 400, height: 300 });
      expect(svg).toContain('<pattern');
      expect(svg).toContain('patternUnits');
    });

    it('defines pattern in <defs> section', () => {
      const svg = generatePattern('grid', { width: 400, height: 300 });
      expect(svg).toContain('<defs>');
      expect(svg).toContain('</defs>');
    });

    it('references pattern in rect fill', () => {
      const svg = generatePattern('dots', { width: 400, height: 300 });
      expect(svg).toContain('url(#');
      expect(svg).toContain('<rect'); // Background rect using pattern
    });
  });

  describe('Advanced Options', () => {
    it('supports custom background color', () => {
      const svg = generatePattern('dots', {
        width: 400,
        height: 300,
        backgroundColor: '#f5f5f5'
      });
      expect(svg).toContain('#f5f5f5');
    });

    it('supports transparent background', () => {
      const svg = generatePattern('dots', {
        width: 400,
        height: 300,
        backgroundColor: 'transparent'
      });
      expect(svg).toContain('transparent');
    });

    it('supports custom pattern color', () => {
      const svg = generatePattern('grid', {
        width: 400,
        height: 300,
        color: '#ff5733'
      });
      expect(svg).toContain('#ff5733');
    });

    it('supports rotation', () => {
      const svg = generatePattern('diagonal-lines', {
        width: 400,
        height: 300,
        rotation: 45
      });
      expect(svg).toContain('rotate(45'); // Transform applied
    });

    it('supports scale', () => {
      const svg = generatePattern('dots', {
        width: 400,
        height: 300,
        scale: 1.5
      });
      expect(svg).toContain('scale(1.5'); // Transform applied
    });
  });

  describe('Error Handling', () => {
    it('throws error for unknown pattern type', () => {
      expect(() => {
        generatePattern('invalid' as PatternType, { width: 400, height: 300 });
      }).toThrow('Unknown pattern type');
    });

    it('validates width is positive', () => {
      expect(() => {
        generatePattern('dots', { width: 0, height: 300 });
      }).toThrow('Width and height must be positive');

      expect(() => {
        generatePattern('dots', { width: -100, height: 300 });
      }).toThrow('Width and height must be positive');
    });

    it('validates height is positive', () => {
      expect(() => {
        generatePattern('dots', { width: 400, height: 0 });
      }).toThrow('Width and height must be positive');
    });

    it('validates opacity range', () => {
      expect(() => {
        generatePattern('dots', { width: 400, height: 300, opacity: 1.5 });
      }).toThrow('Opacity must be between 0 and 1');

      expect(() => {
        generatePattern('dots', { width: 400, height: 300, opacity: -0.1 });
      }).toThrow('Opacity must be between 0 and 1');
    });

    it('validates density value', () => {
      expect(() => {
        generatePattern('dots', {
          width: 400,
          height: 300,
          density: 'invalid' as any
        });
      }).toThrow('Density must be low, medium, or high');
    });
  });

  describe('SVG Output Quality', () => {
    it('generates valid SVG markup', () => {
      PATTERN_TYPES.forEach(patternType => {
        const svg = generatePattern(patternType, { width: 400, height: 300 });
        expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
      });
    });

    it('includes proper xmlns namespace', () => {
      const svg = generatePattern('dots', { width: 400, height: 300 });
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('produces optimized output', () => {
      const svg = generatePattern('dots', {
        width: 1920,
        height: 1080,
        density: 'high'
      });
      // Even with high density, should be reasonable size
      expect(svg.length).toBeLessThan(100000); // 100KB limit
    });

    it('uses presentation attributes efficiently', () => {
      const svg = generatePattern('grid', { width: 400, height: 300 });
      // Should use pattern element to avoid repetition
      expect(svg).toContain('<pattern');
    });
  });

  describe('Use Cases', () => {
    it('generates subtle background for hero slide', () => {
      const svg = generatePattern('dots', {
        width: 1920,
        height: 1080,
        theme: 'corporate',
        opacity: 0.05,
        density: 'low'
      });

      expect(svg).toContain('opacity="0.05"');
      expect(svg).toContain('width="1920"');
    });

    it('generates decorative pattern for section divider', () => {
      const svg = generatePattern('waves', {
        width: 1920,
        height: 200,
        theme: 'pitch-deck',
        opacity: 0.15
      });

      expect(svg).toContain('height="200"');
      expect(svg).toContain('opacity="0.15"');
    });

    it('generates energetic background for startup pitch', () => {
      const svg = generatePattern('particles', {
        width: 1920,
        height: 1080,
        theme: 'startup',
        opacity: 0.2,
        density: 'high'
      });

      expect(svg).toContain('#0ea5e9'); // Startup theme
      expect(svg).toContain('opacity="0.2"');
    });

    it('generates professional grid for data slide', () => {
      const svg = generatePattern('grid', {
        width: 1920,
        height: 1080,
        theme: 'corporate',
        opacity: 0.08,
        density: 'medium'
      });

      expect(svg).toContain('opacity="0.08"');
    });
  });

  describe('Performance', () => {
    it('generates patterns quickly', () => {
      const start = Date.now();

      PATTERN_TYPES.forEach(patternType => {
        generatePattern(patternType, { width: 800, height: 600 });
      });

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(1000); // All patterns in under 1 second
    });

    it('handles high density without performance issues', () => {
      const start = Date.now();

      const svg = generatePattern('dots', {
        width: 1920,
        height: 1080,
        density: 'high'
      });

      const duration = Date.now() - start;
      expect(duration).toBeLessThan(500); // Under 500ms even for large high-density
      expect(svg).toContain('<svg');
    });
  });
});
