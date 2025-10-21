/**
 * Tests for SVG Builder utility
 */

import { describe, it, expect } from 'vitest';
import { SVGBuilder } from './svg-builder.js';

describe('SVGBuilder', () => {
  describe('Initialization', () => {
    it('creates SVG with specified dimensions', () => {
      const builder = new SVGBuilder({ width: 800, height: 600 });
      const svg = builder.toSVGString();

      expect(svg).toContain('<svg');
      expect(svg).toContain('width="800"');
      expect(svg).toContain('height="600"');
      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('creates SVG with viewBox for responsiveness', () => {
      const builder = new SVGBuilder({ width: 400, height: 300 });
      const svg = builder.toSVGString();

      expect(svg).toContain('viewBox="0 0 400 300"');
    });

    it('applies theme colors when specified', () => {
      const builder = new SVGBuilder({
        width: 100,
        height: 100,
        theme: 'corporate'
      });
      const svg = builder.addCircle(50, 50, 25, 'primary').toSVGString();

      // Should resolve 'primary' to corporate theme color
      expect(svg).toContain('#1e40af');
    });

    it('applies custom className when specified', () => {
      const builder = new SVGBuilder({
        width: 100,
        height: 100,
        className: 'custom-svg'
      });
      const svg = builder.toSVGString();

      expect(svg).toContain('class="custom-svg"');
    });
  });

  describe('Circle Methods', () => {
    it('adds a circle with specified properties', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addCircle(100, 100, 50, '#ff0000').toSVGString();

      expect(svg).toContain('<circle');
      expect(svg).toContain('cx="100"');
      expect(svg).toContain('cy="100"');
      expect(svg).toContain('r="50"');
      expect(svg).toContain('fill="#ff0000"');
    });

    it('uses default fill color when not specified', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addCircle(50, 50, 25).toSVGString();

      expect(svg).toContain('<circle');
      expect(svg).toContain('fill="currentColor"');
    });

    it('supports method chaining for multiple circles', () => {
      const builder = new SVGBuilder({ width: 300, height: 300 });
      const svg = builder
        .addCircle(50, 50, 25, '#ff0000')
        .addCircle(100, 100, 30, '#00ff00')
        .addCircle(150, 150, 35, '#0000ff')
        .toSVGString();

      const circleCount = (svg.match(/<circle/g) || []).length;
      expect(circleCount).toBe(3);
      expect(svg).toContain('#ff0000');
      expect(svg).toContain('#00ff00');
      expect(svg).toContain('#0000ff');
    });
  });

  describe('Rectangle Methods', () => {
    it('adds a rectangle with specified properties', () => {
      const builder = new SVGBuilder({ width: 400, height: 300 });
      const svg = builder.addRect(10, 20, 100, 80, '#00ff00').toSVGString();

      expect(svg).toContain('<rect');
      expect(svg).toContain('x="10"');
      expect(svg).toContain('y="20"');
      expect(svg).toContain('width="100"');
      expect(svg).toContain('height="80"');
      expect(svg).toContain('fill="#00ff00"');
    });

    it('supports rounded corners', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addRect(10, 10, 100, 100, '#000000', { rx: 10, ry: 10 }).toSVGString();

      expect(svg).toContain('rx="10"');
      expect(svg).toContain('ry="10"');
    });

    it('supports stroke options', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addRect(10, 10, 100, 100, 'none', {
        stroke: '#ff0000',
        strokeWidth: 3
      }).toSVGString();

      expect(svg).toContain('stroke="#ff0000"');
      expect(svg).toContain('stroke-width="3"');
    });
  });

  describe('Text Methods', () => {
    it('adds text with specified properties', () => {
      const builder = new SVGBuilder({ width: 400, height: 200 });
      const svg = builder.addText('Hello World', 200, 100, {
        fontSize: 24,
        textAnchor: 'middle'
      }).toSVGString();

      expect(svg).toContain('<text');
      expect(svg).toContain('x="200"');
      expect(svg).toContain('y="100"');
      expect(svg).toContain('font-size="24"');
      expect(svg).toContain('text-anchor="middle"');
      expect(svg).toContain('Hello World');
    });

    it('escapes HTML in text content', () => {
      const builder = new SVGBuilder({ width: 200, height: 100 });
      const svg = builder.addText('<script>alert("xss")</script>', 100, 50).toSVGString();

      expect(svg).not.toContain('<script>');
      expect(svg).toContain('&lt;script&gt;');
    });

    it('supports font family and weight', () => {
      const builder = new SVGBuilder({ width: 300, height: 150 });
      const svg = builder.addText('Bold Text', 150, 75, {
        fontFamily: 'Arial, sans-serif',
        fontWeight: 'bold'
      }).toSVGString();

      expect(svg).toContain('font-family="Arial, sans-serif"');
      expect(svg).toContain('font-weight="bold"');
    });

    it('supports text color (fill)', () => {
      const builder = new SVGBuilder({ width: 200, height: 100 });
      const svg = builder.addText('Colored', 100, 50, {
        fill: '#ff5733'
      }).toSVGString();

      expect(svg).toContain('fill="#ff5733"');
    });
  });

  describe('Path Methods', () => {
    it('adds a path with specified data', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const pathData = 'M 10 10 L 90 90 L 10 90 Z';
      const svg = builder.addPath(pathData, '#0000ff').toSVGString();

      expect(svg).toContain('<path');
      expect(svg).toContain(`d="${pathData}"`);
      expect(svg).toContain('fill="#0000ff"');
    });

    it('supports stroke without fill', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const pathData = 'M 10 10 L 90 90';
      const svg = builder.addPath(pathData, 'none', '#ff0000', { strokeWidth: 2 }).toSVGString();

      expect(svg).toContain('fill="none"');
      expect(svg).toContain('stroke="#ff0000"');
      expect(svg).toContain('stroke-width="2"');
    });

    it('supports line caps and joins', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addPath('M 10 10 L 90 90', 'none', '#000', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }).toSVGString();

      expect(svg).toContain('stroke-linecap="round"');
      expect(svg).toContain('stroke-linejoin="round"');
    });
  });

  describe('Gradient Methods', () => {
    it('adds a linear gradient', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addGradient('grad1', [
        { offset: '0%', color: '#ff0000' },
        { offset: '100%', color: '#0000ff' }
      ]).toSVGString();

      expect(svg).toContain('<linearGradient');
      expect(svg).toContain('id="grad1"');
      expect(svg).toContain('offset="0%"');
      expect(svg).toContain('stop-color="#ff0000"');
      expect(svg).toContain('offset="100%"');
      expect(svg).toContain('stop-color="#0000ff"');
    });

    it('uses gradient as fill', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder
        .addGradient('myGrad', [
          { offset: '0%', color: '#000' },
          { offset: '100%', color: '#fff' }
        ])
        .addRect(10, 10, 100, 100, 'url(#myGrad)')
        .toSVGString();

      expect(svg).toContain('fill="url(#myGrad)"');
    });

    it('supports gradient opacity', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addGradient('grad2', [
        { offset: '0%', color: '#ff0000', opacity: 1 },
        { offset: '100%', color: '#0000ff', opacity: 0.5 }
      ]).toSVGString();

      expect(svg).toContain('stop-opacity="1"');
      expect(svg).toContain('stop-opacity="0.5"');
    });
  });

  describe('Group Methods', () => {
    it('creates a group with multiple elements', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder
        .startGroup({ id: 'myGroup', className: 'icon' })
        .addCircle(50, 50, 25)
        .addRect(75, 25, 50, 50)
        .endGroup()
        .toSVGString();

      expect(svg).toContain('<g');
      expect(svg).toContain('id="myGroup"');
      expect(svg).toContain('class="icon"');
      expect(svg).toContain('</g>');
    });

    it('supports nested groups', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder
        .startGroup({ id: 'outer' })
        .addCircle(50, 50, 20)
        .startGroup({ id: 'inner' })
        .addRect(75, 75, 30, 30)
        .endGroup()
        .endGroup()
        .toSVGString();

      const groupCount = (svg.match(/<g/g) || []).length;
      expect(groupCount).toBe(2);
      expect(svg).toContain('id="outer"');
      expect(svg).toContain('id="inner"');
    });

    it('applies transforms to groups', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder
        .startGroup({ transform: 'rotate(45 100 100)' })
        .addRect(75, 75, 50, 50)
        .endGroup()
        .toSVGString();

      expect(svg).toContain('transform="rotate(45 100 100)"');
    });
  });

  describe('Theme Color Resolution', () => {
    it('resolves corporate theme colors', () => {
      const builder = new SVGBuilder({ width: 100, height: 100, theme: 'corporate' });
      const svg = builder
        .addCircle(25, 25, 10, 'primary')
        .addCircle(50, 50, 10, 'secondary')
        .addCircle(75, 75, 10, 'accent')
        .toSVGString();

      expect(svg).toContain('#1e40af'); // Corporate primary
    });

    it('resolves pitch-deck theme colors', () => {
      const builder = new SVGBuilder({ width: 100, height: 100, theme: 'pitch-deck' });
      const svg = builder.addCircle(50, 50, 25, 'primary').toSVGString();

      expect(svg).toContain('#7c3aed'); // Pitch-deck primary
    });

    it('resolves startup theme colors', () => {
      const builder = new SVGBuilder({ width: 100, height: 100, theme: 'startup' });
      const svg = builder.addCircle(50, 50, 25, 'primary').toSVGString();

      expect(svg).toContain('#0ea5e9'); // Startup primary
    });

    it('passes through hex colors unchanged', () => {
      const builder = new SVGBuilder({ width: 100, height: 100, theme: 'corporate' });
      const svg = builder.addCircle(50, 50, 25, '#ff5733').toSVGString();

      expect(svg).toContain('#ff5733');
    });

    it('passes through color names unchanged', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });
      const svg = builder.addCircle(50, 50, 25, 'red').toSVGString();

      expect(svg).toContain('fill="red"');
    });
  });

  describe('Composability', () => {
    it('chains multiple operations fluently', () => {
      const builder = new SVGBuilder({ width: 400, height: 300, theme: 'corporate' });
      const svg = builder
        .addRect(0, 0, 400, 300, '#f5f5f5')
        .addGradient('bg', [
          { offset: '0%', color: 'primary' },
          { offset: '100%', color: 'accent' }
        ])
        .addCircle(200, 150, 80, 'url(#bg)')
        .addText('Welcome', 200, 150, { fontSize: 32, textAnchor: 'middle', fill: 'white' })
        .toSVGString();

      expect(svg).toContain('<svg');
      expect(svg).toContain('<rect');
      expect(svg).toContain('<linearGradient');
      expect(svg).toContain('<circle');
      expect(svg).toContain('<text');
      expect(svg).toContain('Welcome');
    });

    it('builds a complex icon', () => {
      const builder = new SVGBuilder({ width: 48, height: 48 });
      const svg = builder
        .addCircle(24, 24, 20, 'none', { stroke: 'currentColor', strokeWidth: 2 })
        .addPath('M 24 14 L 24 24 L 30 30', 'none', 'currentColor', {
          strokeWidth: 2,
          strokeLinecap: 'round'
        })
        .toSVGString();

      expect(svg).toContain('width="48"');
      expect(svg).toContain('height="48"');
      expect(svg).toContain('<circle');
      expect(svg).toContain('<path');
    });
  });

  describe('Error Handling', () => {
    it('handles invalid dimensions gracefully', () => {
      expect(() => {
        new SVGBuilder({ width: 0, height: 100 });
      }).toThrow('Width and height must be positive numbers');

      expect(() => {
        new SVGBuilder({ width: 100, height: -50 });
      }).toThrow('Width and height must be positive numbers');
    });

    it('handles unknown theme gracefully', () => {
      const builder = new SVGBuilder({ width: 100, height: 100, theme: 'invalid' as any });
      // Should fall back to corporate or use currentColor
      const svg = builder.addCircle(50, 50, 25, 'primary').toSVGString();
      expect(svg).toContain('<circle');
    });

    it('validates circle parameters', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });

      expect(() => {
        builder.addCircle(50, 50, -10);
      }).toThrow('Radius must be positive');
    });

    it('validates rectangle parameters', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });

      expect(() => {
        builder.addRect(10, 10, -50, 50);
      }).toThrow('Width and height must be positive');
    });
  });

  describe('SVG Output Quality', () => {
    it('generates valid SVG structure', () => {
      const builder = new SVGBuilder({ width: 200, height: 200 });
      const svg = builder.addCircle(100, 100, 50).toSVGString();

      expect(svg).toMatch(/<svg[^>]*>[\s\S]*<\/svg>/);
    });

    it('includes proper XML namespace', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });
      const svg = builder.toSVGString();

      expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"');
    });

    it('escapes special characters in attributes', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });
      const svg = builder.addText('Test "quotes" & <tags>', 50, 50).toSVGString();

      expect(svg).toContain('&lt;');
      expect(svg).toContain('&gt;');
      expect(svg).toContain('&amp;');
    });

    it('produces minified output when requested', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });
      const svg = builder.addCircle(50, 50, 25).toSVGString({ minify: true });

      // Minified output should have less whitespace
      expect(svg).not.toContain('\n  ');
    });

    it('produces pretty output by default', () => {
      const builder = new SVGBuilder({ width: 100, height: 100 });
      const svg = builder.addCircle(50, 50, 25).toSVGString();

      // Pretty output should have indentation
      expect(svg).toContain('\n');
    });
  });
});
