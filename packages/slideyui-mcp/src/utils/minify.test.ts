/**
 * Tests for minification utilities
 */

import { describe, it, expect } from 'vitest';
import { minifyHTML, prettyHTML } from './minify.js';

describe('Minification Utilities', () => {
  describe('minifyHTML', () => {
    it('removes whitespace between tags', async () => {
      const input = '<div>  <p>  Hello  </p>  </div>';
      const output = await minifyHTML(input);
      expect(output).not.toContain('  ');
      expect(output.length).toBeLessThan(input.length);
    });

    it('removes HTML comments', async () => {
      const input = '<div><!-- This is a comment --><p>Hello</p></div>';
      const output = await minifyHTML(input);
      expect(output).not.toContain('<!--');
      expect(output).not.toContain('-->');
    });

    it('preserves functionality after minification', async () => {
      const input = `
        <div class="container">
          <h1>Title</h1>
          <p>Paragraph</p>
        </div>
      `;
      const output = await minifyHTML(input);
      expect(output).toContain('<div class="container">');
      expect(output).toContain('<h1>Title</h1>');
      expect(output).toContain('<p>Paragraph</p>');
    });

    it('minifies inline CSS', async () => {
      const input = '<style>  body  {  margin:  0;  }  </style>';
      const output = await minifyHTML(input);
      expect(output.length).toBeLessThan(input.length);
      expect(output).toContain('body{margin:0}');
    });

    it('minifies inline JavaScript', async () => {
      const input = '<script>  var x  =  1;  console.log( x );  </script>';
      const output = await minifyHTML(input);
      expect(output.length).toBeLessThan(input.length);
    });

    it('removes redundant attributes', async () => {
      const input = '<script type="text/javascript">alert("test")</script>';
      const output = await minifyHTML(input);
      expect(output).not.toContain('type="text/javascript"');
    });

    it('uses short doctype', async () => {
      const input = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN"><html></html>';
      const output = await minifyHTML(input);
      expect(output).toContain('<!DOCTYPE html>');
    });

    it('handles empty input', async () => {
      const output = await minifyHTML('');
      expect(output).toBe('');
    });

    it('handles large documents', async () => {
      const largeDoc = '<div>' + '<p>Paragraph</p>'.repeat(1000) + '</div>';
      const output = await minifyHTML(largeDoc);
      expect(output.length).toBeLessThan(largeDoc.length);
      expect(output).toContain('<div>');
      expect(output).toContain('</div>');
    });

    it('returns original HTML on minification error', async () => {
      // Invalid HTML should still return something (original or best effort)
      const input = '<div><p>Unclosed tags';
      const output = await minifyHTML(input);
      expect(output).toBeTruthy();
    });
  });

  describe('prettyHTML', () => {
    it('adds line breaks between tags', () => {
      const input = '<div><p>Hello</p></div>';
      const output = prettyHTML(input);
      expect(output).toContain('\n');
      expect(output.split('\n').length).toBeGreaterThan(1);
    });

    it('indents nested elements', () => {
      const input = '<div><p>Hello</p></div>';
      const output = prettyHTML(input);
      const lines = output.split('\n');
      expect(lines[1]).toMatch(/^\s+/); // Second line should be indented
    });

    it('handles multiple levels of nesting', () => {
      const input = '<div><section><article><p>Hello</p></article></section></div>';
      const output = prettyHTML(input);
      const lines = output.split('\n').filter((l) => l.trim());
      expect(lines.length).toBeGreaterThanOrEqual(5);
    });

    it('handles self-closing tags', () => {
      const input = '<div><img src="test.jpg"/><p>Text</p></div>';
      const output = prettyHTML(input);
      expect(output).toContain('\n');
      expect(output).toContain('<img src="test.jpg"/>');
    });

    it('handles empty input', () => {
      const output = prettyHTML('');
      expect(output).toBe('');
    });

    it('removes empty lines', () => {
      const input = '<div>   <p>Hello</p>   </div>';
      const output = prettyHTML(input);
      const lines = output.split('\n');
      const emptyLines = lines.filter((l) => l.trim() === '');
      expect(emptyLines.length).toBe(0);
    });

    it('formats complete HTML document', () => {
      const input = '<html><head><title>Test</title></head><body><div><p>Content</p></div></body></html>';
      const output = prettyHTML(input);
      const lines = output.split('\n').filter((l) => l.trim());
      expect(lines.length).toBeGreaterThanOrEqual(7);
      expect(lines[0]).toBe('<html>');
      expect(lines[lines.length - 1]).toBe('</html>');
    });
  });

  describe('minifyHTML and prettyHTML integration', () => {
    it('minified HTML can be prettified', async () => {
      const original = `
        <html>
          <body>
            <div>
              <p>Hello World</p>
            </div>
          </body>
        </html>
      `;
      const minified = await minifyHTML(original);
      const prettified = prettyHTML(minified);

      // Should have proper structure after both operations
      expect(prettified).toContain('<html>');
      expect(prettified).toContain('<body>');
      expect(prettified).toContain('<div>');
      expect(prettified).toContain('<p>Hello World</p>');
    });

    it('prettified HTML can be minified', async () => {
      const compact = '<html><body><p>Test</p></body></html>';
      const prettified = prettyHTML(compact);
      const minified = await minifyHTML(prettified);

      expect(minified.length).toBeLessThan(prettified.length);
      expect(minified).toContain('<html>');
      expect(minified).toContain('<p>Test</p>');
    });
  });

  describe('Performance and Edge Cases', () => {
    it('handles very long tag names', async () => {
      const input = '<verylongtagname><anotherverylongtagname>Content</anotherverylongtagname></verylongtagname>';
      const output = await minifyHTML(input);
      expect(output).toContain('verylongtagname');
    });

    it('handles special characters in content', async () => {
      const input = '<p>&lt;&gt;&amp;&quot;&#039;</p>';
      const output = await minifyHTML(input);
      expect(output).toContain('&lt;');
      expect(output).toContain('&gt;');
      expect(output).toContain('&amp;');
    });

    it('preserves data attributes', async () => {
      const input = '<div data-test="value" data-another="test">Content</div>';
      const output = await minifyHTML(input);
      expect(output).toContain('data-test="value"');
      expect(output).toContain('data-another="test"');
    });
  });
});
