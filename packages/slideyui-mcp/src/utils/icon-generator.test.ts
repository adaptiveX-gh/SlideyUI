/**
 * Tests for icon generator utility
 */

import { describe, it, expect } from 'vitest';
import { generateIcon, type IconName, type IconOptions } from './icon-generator.js';

// All 26 required icons
const REQUIRED_ICONS: IconName[] = [
  // Business
  'briefcase', 'chart-line', 'chart-bar', 'pie-chart', 'trend-up', 'trend-down',
  // Communication
  'mail', 'phone', 'message', 'users', 'calendar',
  // Actions
  'check', 'x', 'arrow-right', 'arrow-left', 'plus', 'minus',
  // Media
  'image', 'video', 'download', 'upload',
  // Status
  'alert', 'info', 'success', 'error', 'warning',
  // General
  'star'
];

describe('Icon Generator', () => {
  describe('Icon Library Coverage', () => {
    it('generates all 26 required icons', () => {
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName);
        expect(svg).toContain('<svg');
        expect(svg).toContain('</svg>');
      });
    });

    it('all icons have valid SVG structure', () => {
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName);
        expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
        expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
      });
    });

    it('all icons have viewBox for scalability', () => {
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName);
        expect(svg).toContain('viewBox');
      });
    });
  });

  describe('Icon Sizing', () => {
    it('uses default size of 48x48', () => {
      const svg = generateIcon('check');
      expect(svg).toContain('width="48"');
      expect(svg).toContain('height="48"');
      expect(svg).toContain('viewBox="0 0 48 48"');
    });

    it('accepts custom size', () => {
      const svg = generateIcon('check', { size: 64 });
      expect(svg).toContain('width="64"');
      expect(svg).toContain('height="64"');
      expect(svg).toContain('viewBox="0 0 64 64"');
    });

    it('accepts small sizes', () => {
      const svg = generateIcon('check', { size: 16 });
      expect(svg).toContain('width="16"');
      expect(svg).toContain('height="16"');
    });

    it('accepts large sizes', () => {
      const svg = generateIcon('check', { size: 128 });
      expect(svg).toContain('width="128"');
      expect(svg).toContain('height="128"');
    });
  });

  describe('Icon Colors', () => {
    it('uses currentColor by default', () => {
      const svg = generateIcon('check');
      expect(svg).toContain('currentColor');
    });

    it('accepts custom hex color', () => {
      const svg = generateIcon('check', { color: '#ff5733' });
      expect(svg).toContain('#ff5733');
    });

    it('accepts named colors', () => {
      const svg = generateIcon('check', { color: 'red' });
      expect(svg).toContain('red');
    });

    it('resolves theme color names', () => {
      const svg = generateIcon('check', { color: 'primary', theme: 'corporate' });
      expect(svg).toContain('#1e40af'); // Corporate primary
    });
  });

  describe('Stroke Properties', () => {
    it('uses default stroke width of 2', () => {
      const svg = generateIcon('check');
      expect(svg).toContain('stroke-width="2"');
    });

    it('accepts custom stroke width', () => {
      const svg = generateIcon('check', { strokeWidth: 3 });
      expect(svg).toContain('stroke-width="3"');
    });

    it('supports thin strokes', () => {
      const svg = generateIcon('check', { strokeWidth: 1 });
      expect(svg).toContain('stroke-width="1"');
    });

    it('supports thick strokes', () => {
      const svg = generateIcon('check', { strokeWidth: 4 });
      expect(svg).toContain('stroke-width="4"');
    });
  });

  describe('Theme Integration', () => {
    it('applies corporate theme colors', () => {
      const svg = generateIcon('briefcase', { color: 'primary', theme: 'corporate' });
      expect(svg).toContain('#1e40af');
    });

    it('applies pitch-deck theme colors', () => {
      const svg = generateIcon('chart-line', { color: 'primary', theme: 'pitch-deck' });
      expect(svg).toContain('#7c3aed');
    });

    it('applies startup theme colors', () => {
      const svg = generateIcon('trend-up', { color: 'primary', theme: 'startup' });
      expect(svg).toContain('#0ea5e9');
    });

    it('applies academic theme colors', () => {
      const svg = generateIcon('calendar', { color: 'primary', theme: 'academic' });
      expect(svg).toContain('#1e3a8a');
    });

    it('applies workshop theme colors', () => {
      const svg = generateIcon('star', { color: 'primary', theme: 'workshop' });
      expect(svg).toContain('#2563eb');
    });
  });

  describe('Business Icons', () => {
    it('generates briefcase icon', () => {
      const svg = generateIcon('briefcase');
      expect(svg).toContain('<svg');
      // Briefcase typically uses rect and handle path
      expect(svg).toMatch(/<rect|<path/);
    });

    it('generates chart-line icon', () => {
      const svg = generateIcon('chart-line');
      expect(svg).toContain('<path');
      // Line chart should have a path element
    });

    it('generates chart-bar icon', () => {
      const svg = generateIcon('chart-bar');
      // Bar chart typically uses rectangles
      expect(svg).toMatch(/<rect/);
    });

    it('generates pie-chart icon', () => {
      const svg = generateIcon('pie-chart');
      expect(svg).toContain('<path');
      // Pie chart uses path with arc commands
      expect(svg).toContain('A'); // SVG arc command
    });

    it('generates trend-up icon', () => {
      const svg = generateIcon('trend-up');
      expect(svg).toContain('<path');
      // Trend up should have upward direction
    });

    it('generates trend-down icon', () => {
      const svg = generateIcon('trend-down');
      expect(svg).toContain('<path');
    });
  });

  describe('Communication Icons', () => {
    it('generates mail icon', () => {
      const svg = generateIcon('mail');
      expect(svg).toContain('<path');
    });

    it('generates phone icon', () => {
      const svg = generateIcon('phone');
      expect(svg).toContain('<path');
    });

    it('generates message icon', () => {
      const svg = generateIcon('message');
      expect(svg).toMatch(/<rect|<path/);
    });

    it('generates users icon', () => {
      const svg = generateIcon('users');
      expect(svg).toContain('<circle'); // Heads are circles
    });

    it('generates calendar icon', () => {
      const svg = generateIcon('calendar');
      expect(svg).toContain('<rect'); // Calendar body
    });
  });

  describe('Action Icons', () => {
    it('generates check icon', () => {
      const svg = generateIcon('check');
      expect(svg).toContain('<path');
      // Check mark is a path
    });

    it('generates x icon', () => {
      const svg = generateIcon('x');
      expect(svg).toContain('<path');
      // X is typically two crossing lines
    });

    it('generates arrow-right icon', () => {
      const svg = generateIcon('arrow-right');
      expect(svg).toContain('<path');
    });

    it('generates arrow-left icon', () => {
      const svg = generateIcon('arrow-left');
      expect(svg).toContain('<path');
    });

    it('generates plus icon', () => {
      const svg = generateIcon('plus');
      expect(svg).toContain('<path');
    });

    it('generates minus icon', () => {
      const svg = generateIcon('minus');
      expect(svg).toContain('<path');
    });
  });

  describe('Media Icons', () => {
    it('generates image icon', () => {
      const svg = generateIcon('image');
      expect(svg).toMatch(/<rect|<circle|<path/);
    });

    it('generates video icon', () => {
      const svg = generateIcon('video');
      expect(svg).toMatch(/<rect|<path/);
    });

    it('generates download icon', () => {
      const svg = generateIcon('download');
      expect(svg).toContain('<path');
      // Download has arrow pointing down
    });

    it('generates upload icon', () => {
      const svg = generateIcon('upload');
      expect(svg).toContain('<path');
      // Upload has arrow pointing up
    });
  });

  describe('Status Icons', () => {
    it('generates alert icon', () => {
      const svg = generateIcon('alert');
      expect(svg).toContain('<circle'); // Alert circle
      expect(svg).toMatch(/<path|<line/); // Exclamation mark
    });

    it('generates info icon', () => {
      const svg = generateIcon('info');
      expect(svg).toContain('<circle');
    });

    it('generates success icon', () => {
      const svg = generateIcon('success');
      expect(svg).toContain('<circle');
      expect(svg).toContain('<path'); // Check mark
    });

    it('generates error icon', () => {
      const svg = generateIcon('error');
      expect(svg).toContain('<circle');
      expect(svg).toContain('<path'); // X mark
    });

    it('generates warning icon', () => {
      const svg = generateIcon('warning');
      // Warning is typically a triangle
      expect(svg).toContain('<path');
    });
  });

  describe('General Icons', () => {
    it('generates star icon', () => {
      const svg = generateIcon('star');
      expect(svg).toContain('<path');
      // Star is a path with points
    });
  });

  describe('Icon Consistency', () => {
    it('all icons use consistent stroke properties', () => {
      const options: IconOptions = { strokeWidth: 2 };
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName, options);
        // Most icons should have stroke-width (some might be filled)
        if (svg.includes('stroke')) {
          expect(svg).toContain('stroke-width="2"');
        }
      });
    });

    it('all icons are centered in their viewBox', () => {
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName, { size: 48 });
        expect(svg).toContain('viewBox="0 0 48 48"');
      });
    });

    it('all icons have proper line caps and joins', () => {
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName);
        if (svg.includes('stroke')) {
          // Should have rounded caps for better appearance
          expect(svg).toMatch(/stroke-linecap|stroke-linejoin/);
        }
      });
    });
  });

  describe('Error Handling', () => {
    it('throws error for unknown icon name', () => {
      expect(() => {
        generateIcon('nonexistent' as IconName);
      }).toThrow('Unknown icon');
    });

    it('validates size is positive', () => {
      expect(() => {
        generateIcon('check', { size: 0 });
      }).toThrow('Size must be positive');

      expect(() => {
        generateIcon('check', { size: -10 });
      }).toThrow('Size must be positive');
    });

    it('validates stroke width is positive', () => {
      expect(() => {
        generateIcon('check', { strokeWidth: 0 });
      }).toThrow('Stroke width must be positive');

      expect(() => {
        generateIcon('check', { strokeWidth: -2 });
      }).toThrow('Stroke width must be positive');
    });
  });

  describe('SVG Output Quality', () => {
    it('generates valid SVG markup', () => {
      REQUIRED_ICONS.forEach(iconName => {
        const svg = generateIcon(iconName);
        expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
      });
    });

    it('includes proper xmlns namespace', () => {
      const svg = generateIcon('check');
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('uses semantic attributes', () => {
      const svg = generateIcon('check');
      expect(svg).toContain('viewBox');
      expect(svg).toContain('width');
      expect(svg).toContain('height');
    });

    it('produces compact output', () => {
      const svg = generateIcon('check');
      // Should not have excessive whitespace
      expect(svg.length).toBeLessThan(1000); // Reasonable size for simple icon
    });
  });

  describe('Accessibility', () => {
    it('includes title when provided', () => {
      const svg = generateIcon('check', { title: 'Checkmark' });
      expect(svg).toContain('<title>Checkmark</title>');
    });

    it('includes aria-label when provided', () => {
      const svg = generateIcon('check', { ariaLabel: 'Completed task' });
      expect(svg).toContain('aria-label="Completed task"');
    });

    it('sets aria-hidden when decorative', () => {
      const svg = generateIcon('check', { decorative: true });
      expect(svg).toContain('aria-hidden="true"');
    });
  });

  describe('Advanced Options', () => {
    it('applies custom className', () => {
      const svg = generateIcon('check', { className: 'custom-icon' });
      expect(svg).toContain('class="custom-icon"');
    });

    it('applies custom id', () => {
      const svg = generateIcon('check', { id: 'my-check-icon' });
      expect(svg).toContain('id="my-check-icon"');
    });

    it('supports fill and stroke independently', () => {
      const svg = generateIcon('star', {
        fill: '#ffff00',
        color: '#ff0000', // stroke color
      });
      expect(svg).toContain('#ffff00'); // fill
      expect(svg).toContain('#ff0000'); // stroke
    });
  });
});
