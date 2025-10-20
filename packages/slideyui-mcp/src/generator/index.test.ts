/**
 * Tests for presentation generator
 */

import { describe, it, expect } from 'vitest';
import { generatePresentation, generateSlide, generateStandaloneHTML } from './index.js';
import type { PresentationSpec, SlideSpec } from '../types/index.js';

describe('Presentation Generator', () => {
  describe('generatePresentation', () => {
    it('generates complete presentation', async () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Test Presentation',
        slides: [
          { type: 'title', title: 'Welcome' },
          { type: 'content', title: 'Agenda', content: ['Item 1', 'Item 2'] },
        ],
      };

      const result = await generatePresentation(spec);

      expect(result.html.toLowerCase()).toContain('<!doctype html>');
      expect(result.html).toContain('Welcome');
      expect(result.html).toContain('Agenda');
      expect(result.metadata.slideCount).toBe(2);
      expect(result.metadata.theme).toBe('corporate');
    });

    it('includes metadata in result', async () => {
      const spec: PresentationSpec = {
        theme: 'startup',
        title: 'Startup Deck',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const result = await generatePresentation(spec);

      expect(result.metadata.slideCount).toBe(1);
      expect(result.metadata.theme).toBe('startup');
      expect(result.metadata.generatedAt).toBeTruthy();
      expect(result.metadata.size).toBeGreaterThan(0);
    });

    it('applies default options', async () => {
      const spec: PresentationSpec = {
        theme: 'academic',
        title: 'Academic',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const result = await generatePresentation(spec);

      // Should use defaults: 16:9, default font, minified
      expect(result.html).toBeTruthy();
    });

    it('respects custom options', async () => {
      const spec: PresentationSpec = {
        theme: 'workshop',
        title: 'Workshop',
        slides: [{ type: 'title', title: 'Title' }],
        options: {
          aspectRatio: '4:3',
          fontSize: 'large',
          minify: false,
        },
      };

      const result = await generatePresentation(spec);

      expect(result.html).toContain('slideyui-aspect-4-3');
      expect(result.html).toContain('slideyui-text-large');
    });

    it('minifies by default', async () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const minified = await generatePresentation(spec);

      const unminifiedSpec: PresentationSpec = {
        ...spec,
        options: { minify: false },
      };

      const unminified = await generatePresentation(unminifiedSpec);

      expect(minified.html.length).toBeLessThan(unminified.html.length);
    });

    it('handles all themes', async () => {
      const themes = ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'] as const;

      for (const theme of themes) {
        const spec: PresentationSpec = {
          theme,
          title: 'Test',
          slides: [{ type: 'title', title: 'Title' }],
        };

        const result = await generatePresentation(spec);
        expect(result.metadata.theme).toBe(theme);
      }
    });
  });

  describe('generateSlide', () => {
    it('generates slide with ID', () => {
      const spec: SlideSpec = {
        type: 'title',
        title: 'Test Slide',
      };

      const html = generateSlide(spec, {}, 5);

      expect(html).toContain('id="slide-5"');
      expect(html).toContain('Test Slide');
    });

    it('uses custom slide ID if provided', () => {
      const spec: SlideSpec = {
        type: 'title',
        title: 'Test',
        id: 'custom-id',
      };

      const html = generateSlide(spec, {});

      expect(html).toContain('id="custom-id"');
    });

    it('includes state attribute when provided', () => {
      const spec: SlideSpec = {
        type: 'title',
        title: 'Test',
        state: 'generating',
      };

      const html = generateSlide(spec, {});

      expect(html).toContain('data-card-state="generating"');
    });

    it('wraps slide in slideyui-slide div', () => {
      const spec: SlideSpec = {
        type: 'content',
        title: 'Content',
        content: ['Point'],
      };

      const html = generateSlide(spec, {});

      expect(html).toContain('<div class="slideyui-slide"');
      expect(html).toContain('</div>');
    });

    it('generates all slide types', () => {
      const slides: SlideSpec[] = [
        { type: 'title', title: 'Title' },
        { type: 'content', title: 'Content', content: ['Point'] },
        { type: 'quote', quote: 'Quote', author: 'Author' },
        { type: 'section-header', title: 'Section' },
        { type: 'blank' },
      ];

      slides.forEach((spec, index) => {
        const html = generateSlide(spec, {}, index);
        expect(html).toContain('slideyui-slide');
      });
    });

    it('defaults to slide-0 when no index provided', () => {
      const spec: SlideSpec = {
        type: 'title',
        title: 'Test',
      };

      const html = generateSlide(spec, {});

      expect(html).toContain('id="slide-0"');
    });
  });

  describe('generateStandaloneHTML', () => {
    it('generates complete HTML document', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '<div>Slide</div>',
        options: {
          aspectRatio: '16:9',
          fontSize: 'default',
        },
      });

      expect(html).toContain('<!DOCTYPE html>');
      expect(html).toContain('<html lang="en">');
      expect(html).toContain('<head>');
      expect(html).toContain('<body>');
      expect(html).toContain('</html>');
    });

    it('includes title in head', async () => {
      const html = await generateStandaloneHTML({
        title: 'My Presentation',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('<title>My Presentation</title>');
    });

    it('includes theme attribute', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'pitch-deck',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('data-theme="pitch-deck"');
    });

    it('includes aspect ratio class', async () => {
      const html43 = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: { aspectRatio: '4:3' },
      });

      const html169 = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: { aspectRatio: '16:9' },
      });

      expect(html43).toContain('slideyui-aspect-4-3');
      expect(html169).toContain('slideyui-aspect-16-9');
    });

    it('includes font size class', async () => {
      const htmlLarge = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: { fontSize: 'large' },
      });

      const htmlXLarge = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: { fontSize: 'xlarge' },
      });

      expect(htmlLarge).toContain('slideyui-text-large');
      expect(htmlXLarge).toContain('slideyui-text-xlarge');
    });

    it('includes CSS when includeSlideyUICSS is true', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: { includeSlideyUICSS: true },
      });

      // Should include some CSS (either real or fallback)
      expect(html).toContain('<style>');
      expect(html).toContain('slideyui');
    });

    it('includes navigation JavaScript', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('<script>');
      expect(html).toContain('function showSlide');
      expect(html).toContain('function nextSlide');
      expect(html).toContain('function prevSlide');
      expect(html).toContain('addEventListener');
    });

    it('includes keyboard navigation', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('ArrowRight');
      expect(html).toContain('ArrowLeft');
      expect(html).toContain('Home');
      expect(html).toContain('End');
    });

    it('includes touch navigation', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('touchstart');
      expect(html).toContain('touchend');
    });

    it('includes print styles', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('@media print');
      expect(html).toContain('page-break-after');
    });

    it('includes metadata tags', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
        metadata: {
          author: 'John Doe',
          description: 'Test presentation',
        },
      });

      expect(html).toContain('<meta name="author"');
      expect(html).toContain('John Doe');
      expect(html).toContain('<meta name="description"');
    });

    it('includes generator meta tag', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('name="generator"');
      expect(html).toContain('SlideyUI MCP');
    });

    it('embeds slide HTML', async () => {
      const slideHTML = '<div class="slide-1">First Slide</div><div class="slide-2">Second Slide</div>';

      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML,
        options: {},
      });

      expect(html).toContain('First Slide');
      expect(html).toContain('Second Slide');
    });

    it('creates slideyui-deck wrapper', async () => {
      const html = await generateStandaloneHTML({
        title: 'Test',
        theme: 'corporate',
        slideHTML: '',
        options: {},
      });

      expect(html).toContain('<div class="slideyui-deck');
      expect(html).toContain('</div>'); // Closing the deck
    });
  });

  describe('Integration', () => {
    it('generates presentation end-to-end', async () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Complete Test',
        slides: [
          {
            type: 'title',
            title: 'Welcome to SlideyUI',
            subtitle: 'AI-First Presentations',
            author: 'Test Author',
          },
          {
            type: 'content',
            title: 'Features',
            content: [
              'Easy to use',
              'AI-powered',
              'Beautiful themes',
              'Export ready',
            ],
          },
          {
            type: 'quote',
            quote: 'Great presentations start with great tools.',
            author: 'Someone Smart',
          },
        ],
        options: {
          aspectRatio: '16:9',
          fontSize: 'large',
          minify: false,
        },
        metadata: {
          author: 'Test Author',
          date: '2024-01-01',
          version: '1.0',
        },
      };

      const result = await generatePresentation(spec);

      // Verify structure
      expect(result.html.toLowerCase()).toContain('<!doctype html>');
      expect(result.html).toContain('Welcome to SlideyUI');
      expect(result.html).toContain('Features');
      expect(result.html).toContain('Great presentations');

      // Verify metadata
      expect(result.metadata.slideCount).toBe(3);
      expect(result.metadata.theme).toBe('corporate');
      expect(result.metadata.generatedAt).toBeTruthy();
      expect(result.metadata.size).toBeGreaterThan(0);

      // Verify functionality
      expect(result.html).toContain('showSlide');
      expect(result.html).toContain('slideyui-deck');
    });

    it('generates presentation with all slide types', async () => {
      const spec: PresentationSpec = {
        theme: 'pitch-deck',
        title: 'All Slide Types',
        slides: [
          { type: 'title', title: 'Title' },
          { type: 'content', title: 'Content', content: ['Point'] },
          { type: 'media', mediaUrl: 'https://example.com/img.jpg', mediaType: 'image' },
          { type: 'data', title: 'Data', data: [['A', 'B']], dataType: 'table' },
          { type: 'quote', quote: 'Quote', author: 'Author' },
          { type: 'timeline', title: 'Timeline', events: [{ date: '2024', title: 'Event' }] },
          { type: 'comparison', title: 'Compare', leftTitle: 'A', leftContent: ['1'], rightTitle: 'B', rightContent: ['2'] },
          { type: 'process', title: 'Process', steps: [{ title: 'Step 1' }] },
          { type: 'section-header', title: 'Section' },
          { type: 'blank' },
        ],
      };

      const result = await generatePresentation(spec);

      expect(result.metadata.slideCount).toBe(10);
      expect(result.html).toContain('Title');
      expect(result.html).toContain('Content');
      expect(result.html).toContain('Quote');
    });
  });

  describe('Performance', () => {
    it('handles large presentations', async () => {
      const slides = Array.from({ length: 50 }, (_, i) => ({
        type: 'content' as const,
        title: `Slide ${i + 1}`,
        content: [`Content for slide ${i + 1}`],
      }));

      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Large Presentation',
        slides,
      };

      const result = await generatePresentation(spec);

      expect(result.metadata.slideCount).toBe(50);
      expect(result.html).toBeTruthy();
    });

    it('generates in reasonable time', async () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Test',
        slides: Array.from({ length: 20 }, (_, i) => ({
          type: 'content' as const,
          title: `Slide ${i}`,
          content: ['Point 1', 'Point 2', 'Point 3'],
        })),
      };

      const start = Date.now();
      await generatePresentation(spec);
      const duration = Date.now() - start;

      // Should complete in under 5 seconds
      expect(duration).toBeLessThan(5000);
    });
  });
});
