/**
 * Tests for HTML utilities
 */

import { describe, it, expect } from 'vitest';
import { escapeHTML, unescapeHTML, stripHTML, sanitizeAttribute } from './html.js';

describe('HTML Utilities', () => {
  describe('escapeHTML', () => {
    it('escapes HTML special characters', () => {
      const input = '<script>alert("XSS")</script>';
      const output = escapeHTML(input);
      expect(output).toBe('&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
    });

    it('escapes ampersands', () => {
      expect(escapeHTML('Tom & Jerry')).toBe('Tom &amp; Jerry');
    });

    it('escapes single quotes', () => {
      expect(escapeHTML("It's great")).toBe('It&#039;s great');
    });

    it('escapes double quotes', () => {
      expect(escapeHTML('Say "hello"')).toBe('Say &quot;hello&quot;');
    });

    it('escapes less than and greater than', () => {
      expect(escapeHTML('1 < 2 > 0')).toBe('1 &lt; 2 &gt; 0');
    });

    it('handles empty strings', () => {
      expect(escapeHTML('')).toBe('');
    });

    it('handles strings with no special characters', () => {
      expect(escapeHTML('Hello World')).toBe('Hello World');
    });

    it('escapes multiple special characters in order', () => {
      const input = '&<>"\'';
      const output = escapeHTML(input);
      expect(output).toBe('&amp;&lt;&gt;&quot;&#039;');
    });
  });

  describe('unescapeHTML', () => {
    it('unescapes HTML entities', () => {
      const input = '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;';
      const output = unescapeHTML(input);
      expect(output).toBe('<script>alert("XSS")</script>');
    });

    it('unescapes ampersands', () => {
      expect(unescapeHTML('Tom &amp; Jerry')).toBe('Tom & Jerry');
    });

    it('unescapes single quotes', () => {
      expect(unescapeHTML('It&#039;s great')).toBe("It's great");
    });

    it('unescapes double quotes', () => {
      expect(unescapeHTML('Say &quot;hello&quot;')).toBe('Say "hello"');
    });

    it('unescapes less than and greater than', () => {
      expect(unescapeHTML('1 &lt; 2 &gt; 0')).toBe('1 < 2 > 0');
    });

    it('handles empty strings', () => {
      expect(unescapeHTML('')).toBe('');
    });

    it('handles strings with no entities', () => {
      expect(unescapeHTML('Hello World')).toBe('Hello World');
    });

    it('is the inverse of escapeHTML', () => {
      const original = '<div class="test">Hello & "World"</div>';
      const escaped = escapeHTML(original);
      const unescaped = unescapeHTML(escaped);
      expect(unescaped).toBe(original);
    });
  });

  describe('stripHTML', () => {
    it('removes HTML tags', () => {
      const input = '<p>Hello <strong>World</strong></p>';
      const output = stripHTML(input);
      expect(output).toBe('Hello World');
    });

    it('removes self-closing tags', () => {
      const input = 'Line 1<br/>Line 2<hr/>Line 3';
      const output = stripHTML(input);
      expect(output).toBe('Line 1Line 2Line 3');
    });

    it('removes tags with attributes', () => {
      const input = '<a href="http://example.com" class="link">Click</a>';
      const output = stripHTML(input);
      expect(output).toBe('Click');
    });

    it('handles nested tags', () => {
      const input = '<div><p><span>Nested</span></p></div>';
      const output = stripHTML(input);
      expect(output).toBe('Nested');
    });

    it('handles empty strings', () => {
      expect(stripHTML('')).toBe('');
    });

    it('handles strings with no tags', () => {
      expect(stripHTML('Plain text')).toBe('Plain text');
    });

    it('preserves text content only', () => {
      const input = '<h1>Title</h1><p>Paragraph with <em>emphasis</em> and <strong>bold</strong>.</p>';
      const output = stripHTML(input);
      expect(output).toBe('TitleParagraph with emphasis and bold.');
    });
  });

  describe('sanitizeAttribute', () => {
    it('removes special characters from attributes', () => {
      const input = 'hello<>world';
      const output = sanitizeAttribute(input);
      expect(output).toBe('helloworld');
    });

    it('allows alphanumeric characters', () => {
      expect(sanitizeAttribute('abc123')).toBe('abc123');
    });

    it('allows spaces', () => {
      expect(sanitizeAttribute('hello world')).toBe('hello world');
    });

    it('allows hyphens', () => {
      expect(sanitizeAttribute('my-attribute')).toBe('my-attribute');
    });

    it('allows underscores', () => {
      expect(sanitizeAttribute('my_attribute')).toBe('my_attribute');
    });

    it('removes quotes', () => {
      expect(sanitizeAttribute('test"value')).toBe('testvalue');
    });

    it('removes angle brackets', () => {
      expect(sanitizeAttribute('test<script>')).toBe('testscript');
    });

    it('handles empty strings', () => {
      expect(sanitizeAttribute('')).toBe('');
    });

    it('removes slashes and other special chars', () => {
      expect(sanitizeAttribute('test/path\\file')).toBe('testpathfile');
    });
  });

  describe('Edge Cases', () => {
    it('escapeHTML handles Unicode characters', () => {
      const input = '你好 <世界>';
      const output = escapeHTML(input);
      expect(output).toBe('你好 &lt;世界&gt;');
    });

    it('stripHTML preserves Unicode text', () => {
      const input = '<p>你好世界</p>';
      const output = stripHTML(input);
      expect(output).toBe('你好世界');
    });

    it('handles very long strings efficiently', () => {
      const longString = '<p>' + 'a'.repeat(10000) + '</p>';
      const output = stripHTML(longString);
      expect(output.length).toBe(10000);
    });
  });
});
