/**
 * Tests for MCP tools
 */

import { describe, it, expect } from 'vitest';
import { createPresentationTool } from './create-presentation.js';
import { addSlideTool } from './add-slide.js';
import { updateSlideTool } from './update-slide.js';
import { exportPresentationTool } from './export-presentation.js';

describe('create_presentation Tool', () => {
  describe('Happy Path', () => {
    it('creates presentation with minimal input', async () => {
      const result = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test Presentation',
        slides: [{ type: 'title', title: 'Welcome' }],
      });

      expect(result.success).toBe(true);
      expect(result.html.toLowerCase()).toContain('<!doctype html>');
      expect(result.html).toContain('Welcome');
      expect(result.metadata.slideCount).toBe(1);
      expect(result.metadata.theme).toBe('corporate');
    });

    it('creates presentation with multiple slides', async () => {
      const result = await createPresentationTool.handler({
        theme: 'startup',
        title: 'My Deck',
        slides: [
          { type: 'title', title: 'Title' },
          { type: 'content', title: 'Content', content: ['Point 1', 'Point 2'] },
          { type: 'quote', quote: 'Great quote', author: 'Someone' },
        ],
      });

      expect(result.success).toBe(true);
      expect(result.metadata.slideCount).toBe(3);
    });

    it('applies all themes correctly', async () => {
      const themes = ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'];

      for (const theme of themes) {
        const result = await createPresentationTool.handler({
          theme,
          title: 'Test',
          slides: [{ type: 'title', title: 'Test' }],
        });

        expect(result.success).toBe(true);
        expect(result.metadata.theme).toBe(theme);
        expect(result.html).toContain(`data-theme="${theme}"`);
      }
    });

    it('includes metadata in presentation', async () => {
      const result = await createPresentationTool.handler({
        theme: 'academic',
        title: 'Research',
        slides: [{ type: 'title', title: 'Title' }],
        metadata: {
          author: 'Dr. Smith',
          date: '2024-01-01',
          version: '1.0',
        },
      });

      expect(result.success).toBe(true);
      expect(result.html).toContain('Dr. Smith');
    });

    it('applies generation options', async () => {
      const result = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
        options: {
          aspectRatio: '4:3',
          fontSize: 'large',
          minify: false,
        },
      });

      expect(result.success).toBe(true);
      expect(result.html).toContain('slideyui-aspect-4-3');
      expect(result.html).toContain('slideyui-text-large');
    });

    it('generates minified HTML by default', async () => {
      const result = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      });

      // Minified HTML should be more compact
      expect(result.html).toBeTruthy();
      expect(result.metadata.size).toBeGreaterThan(0);
    });
  });

  describe('Error Handling', () => {
    it('rejects invalid theme', async () => {
      await expect(
        createPresentationTool.handler({
          theme: 'invalid',
          title: 'Test',
          slides: [{ type: 'title', title: 'Title' }],
        })
      ).rejects.toThrow();
    });

    it('rejects empty title', async () => {
      await expect(
        createPresentationTool.handler({
          theme: 'corporate',
          title: '',
          slides: [{ type: 'title', title: 'Title' }],
        })
      ).rejects.toThrow();
    });

    it('rejects empty slides array', async () => {
      await expect(
        createPresentationTool.handler({
          theme: 'corporate',
          title: 'Test',
          slides: [],
        })
      ).rejects.toThrow();
    });

    it('rejects missing required fields', async () => {
      await expect(
        createPresentationTool.handler({
          theme: 'corporate',
          title: 'Test',
          // Missing slides
        })
      ).rejects.toThrow();
    });

    it('rejects invalid slide type', async () => {
      await expect(
        createPresentationTool.handler({
          theme: 'corporate',
          title: 'Test',
          slides: [{ type: 'invalid-type', title: 'Title' }],
        })
      ).rejects.toThrow();
    });

    it('rejects invalid aspect ratio', async () => {
      await expect(
        createPresentationTool.handler({
          theme: 'corporate',
          title: 'Test',
          slides: [{ type: 'title', title: 'Title' }],
          options: { aspectRatio: '21:9' },
        })
      ).rejects.toThrow();
    });
  });

  describe('Output Validation', () => {
    it('generates valid HTML structure', async () => {
      const result = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      });

      expect(result.html.toLowerCase()).toContain('<!doctype html>');
      expect(result.html).toContain('<html');
      expect(result.html).toContain('<head>');
      expect(result.html).toContain('<body>');
      expect(result.html).toContain('</html>');
    });

    it('includes navigation JavaScript', async () => {
      const result = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      });

      expect(result.html).toContain('<script>');
      expect(result.html).toContain('nextSlide');
      expect(result.html).toContain('prevSlide');
      expect(result.html).toContain('showSlide');
    });

    it('includes print styles', async () => {
      const result = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      });

      expect(result.html).toContain('@media print');
      expect(result.html).toContain('page-break-after');
    });

    it('sets correct metadata', async () => {
      const result = await createPresentationTool.handler({
        theme: 'pitch-deck',
        title: 'Deck',
        slides: [
          { type: 'title', title: 'Slide 1' },
          { type: 'content', title: 'Slide 2', content: ['Point'] },
        ],
      });

      expect(result.metadata.slideCount).toBe(2);
      expect(result.metadata.theme).toBe('pitch-deck');
      expect(result.metadata.generatedAt).toBeTruthy();
      expect(result.metadata.size).toBeGreaterThan(0);
    });
  });
});

describe('add_slide Tool', () => {
  describe('Happy Path', () => {
    it('generates slide HTML', async () => {
      const result = await addSlideTool.handler({
        slide: {
          type: 'content',
          title: 'New Slide',
          content: ['Point 1', 'Point 2'],
        },
      });

      expect(result.success).toBe(true);
      expect(result.html).toContain('New Slide');
      expect(result.html).toContain('Point 1');
      expect(result.slideType).toBe('content');
    });

    it('generates slide with index', async () => {
      const result = await addSlideTool.handler({
        slide: { type: 'title', title: 'Title' },
        index: 5,
      });

      expect(result.success).toBe(true);
      expect(result.html).toContain('slide-5');
    });

    it('applies generation options', async () => {
      const result = await addSlideTool.handler({
        slide: { type: 'title', title: 'Title' },
        options: {
          aspectRatio: '4:3',
          fontSize: 'xlarge',
        },
      });

      expect(result.success).toBe(true);
      expect(result.html).toBeTruthy();
    });

    it('generates all slide types', async () => {
      const slideTypes = [
        { type: 'title', title: 'Title' },
        { type: 'content', title: 'Content', content: ['Point'] },
        { type: 'quote', quote: 'Quote', author: 'Author' },
        { type: 'section-header', title: 'Section' },
        { type: 'blank' },
      ];

      for (const slide of slideTypes) {
        const result = await addSlideTool.handler({ slide: slide as any });
        expect(result.success).toBe(true);
        expect(result.slideType).toBe(slide.type);
      }
    });
  });

  describe('Error Handling', () => {
    it('rejects invalid slide type', async () => {
      await expect(
        addSlideTool.handler({
          slide: { type: 'invalid-type' },
        })
      ).rejects.toThrow();
    });

    it('rejects slide with missing required fields', async () => {
      await expect(
        addSlideTool.handler({
          slide: { type: 'title' }, // Missing title
        })
      ).rejects.toThrow();
    });

    it('rejects missing slide parameter', async () => {
      await expect(addSlideTool.handler({})).rejects.toThrow();
    });
  });

  describe('Output Validation', () => {
    it('generates slide with proper wrapper', async () => {
      const result = await addSlideTool.handler({
        slide: { type: 'title', title: 'Test' },
      });

      expect(result.html).toContain('<div class="slideyui-slide"');
      expect(result.html).toContain('id="slide-');
    });

    it('includes slide content', async () => {
      const result = await addSlideTool.handler({
        slide: {
          type: 'content',
          title: 'Features',
          content: ['Feature 1', 'Feature 2', 'Feature 3'],
        },
      });

      expect(result.html).toContain('Feature 1');
      expect(result.html).toContain('Feature 2');
      expect(result.html).toContain('Feature 3');
    });
  });
});

describe('update_slide Tool', () => {
  describe('Happy Path', () => {
    it('updates slide with new content', async () => {
      const result = await updateSlideTool.handler({
        slideId: 'slide-3',
        slide: {
          type: 'content',
          title: 'Updated Content',
          content: ['New point 1', 'New point 2'],
        },
      });

      expect(result.success).toBe(true);
      expect(result.slideId).toBe('slide-3');
      expect(result.html).toContain('Updated Content');
      expect(result.slideType).toBe('content');
    });

    it('preserves slide ID', async () => {
      const result = await updateSlideTool.handler({
        slideId: 'custom-slide-id',
        slide: { type: 'title', title: 'Title' },
      });

      expect(result.html).toContain('id="custom-slide-id"');
    });

    it('applies generation options', async () => {
      const result = await updateSlideTool.handler({
        slideId: 'slide-1',
        slide: { type: 'title', title: 'Title' },
        options: {
          fontSize: 'large',
        },
      });

      expect(result.success).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('rejects missing slideId', async () => {
      await expect(
        updateSlideTool.handler({
          slide: { type: 'title', title: 'Title' },
        })
      ).rejects.toThrow();
    });

    it('rejects missing slide', async () => {
      await expect(
        updateSlideTool.handler({
          slideId: 'slide-1',
        })
      ).rejects.toThrow();
    });

    it('rejects invalid slide spec', async () => {
      await expect(
        updateSlideTool.handler({
          slideId: 'slide-1',
          slide: { type: 'content' }, // Missing required title
        })
      ).rejects.toThrow();
    });
  });

  describe('Output Validation', () => {
    it('generates updated slide HTML', async () => {
      const result = await updateSlideTool.handler({
        slideId: 'slide-2',
        slide: {
          type: 'quote',
          quote: 'Updated quote',
          author: 'New Author',
        },
      });

      expect(result.html).toContain('Updated quote');
      expect(result.html).toContain('New Author');
      expect(result.html).toContain('id="slide-2"');
    });
  });
});

describe('export_presentation Tool', () => {
  const sampleHTML = `
    <!DOCTYPE html>
    <html><head><title>Test</title></head>
    <body><div class="slideyui-slide">Content</div></body>
    </html>
  `;

  const samplePresentationData = {
    theme: 'corporate' as const,
    title: 'Test Presentation',
    slides: [
      { type: 'title' as const, title: 'Title Slide' },
      { type: 'content' as const, title: 'Content', content: ['Point 1'] },
    ],
    metadata: {
      author: 'John Doe',
      date: '2024-01-01',
    },
  };

  describe('HTML Export', () => {
    it('exports as HTML', async () => {
      const result = await exportPresentationTool.handler({
        html: sampleHTML,
        format: 'html',
      });

      expect(result.success).toBe(true);
      expect(result.content).toBe(sampleHTML);
      expect(result.format).toBe('html');
      expect(result.filename).toBe('presentation.html');
      expect(result.contentType).toBe('text/html');
    });

    it('uses custom filename', async () => {
      const result = await exportPresentationTool.handler({
        html: sampleHTML,
        format: 'html',
        filename: 'my-deck',
      });

      expect(result.filename).toBe('my-deck.html');
    });

    it('provides correct instructions', async () => {
      const result = await exportPresentationTool.handler({
        html: sampleHTML,
        format: 'html',
      });

      expect(result.instructions).toContain('browser');
    });
  });

  describe('PDF-HTML Export', () => {
    it('exports as PDF-ready HTML', async () => {
      const result = await exportPresentationTool.handler({
        html: sampleHTML,
        format: 'pdf-html',
      });

      expect(result.success).toBe(true);
      expect(result.format).toBe('pdf-html');
      expect(result.contentType).toBe('text/html');
    });

    it('adds PDF print styles', async () => {
      const result = await exportPresentationTool.handler({
        html: sampleHTML,
        format: 'pdf-html',
      });

      expect(result.content).toContain('@media print');
      expect(result.content).toContain('@page');
      expect(result.content).toContain('page-break-after');
    });

    it('provides print instructions', async () => {
      const result = await exportPresentationTool.handler({
        html: sampleHTML,
        format: 'pdf-html',
      });

      expect(result.instructions).toContain('Print to PDF');
    });
  });

  describe('JSON Export', () => {
    it('exports as JSON', async () => {
      const result = await exportPresentationTool.handler({
        presentationData: samplePresentationData,
        format: 'json',
      });

      expect(result.success).toBe(true);
      expect(result.format).toBe('json');
      expect(result.filename).toBe('presentation.json');
      expect(result.contentType).toBe('application/json');
    });

    it('generates valid JSON structure', async () => {
      const result = await exportPresentationTool.handler({
        presentationData: samplePresentationData,
        format: 'json',
      });

      const json = JSON.parse(result.content);

      expect(json.version).toBe('1.0.0');
      expect(json.metadata).toBeDefined();
      expect(json.slides).toBeDefined();
      expect(json.config).toBeDefined();
    });

    it('includes metadata in JSON', async () => {
      const result = await exportPresentationTool.handler({
        presentationData: samplePresentationData,
        format: 'json',
      });

      const json = JSON.parse(result.content);

      expect(json.metadata.title).toBe('Test Presentation');
      expect(json.metadata.author).toBe('John Doe');
      expect(json.metadata.slideCount).toBe(2);
      expect(json.metadata.theme).toBe('corporate');
    });

    it('includes slides in JSON', async () => {
      const result = await exportPresentationTool.handler({
        presentationData: samplePresentationData,
        format: 'json',
      });

      const json = JSON.parse(result.content);

      expect(json.slides).toHaveLength(2);
      expect(json.slides[0].type).toBe('title');
      expect(json.slides[1].type).toBe('content');
    });

    it('includes config in JSON', async () => {
      const result = await exportPresentationTool.handler({
        presentationData: {
          ...samplePresentationData,
          options: {
            aspectRatio: '4:3' as const,
            fontSize: 'large' as const,
            minify: true,
          },
        },
        format: 'json',
      });

      const json = JSON.parse(result.content);

      expect(json.config.theme).toBe('corporate');
      expect(json.config.aspectRatio).toBe('4:3');
      expect(json.config.fontSize).toBe('large');
      expect(json.config.minify).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('requires html for html format', async () => {
      await expect(
        exportPresentationTool.handler({
          format: 'html',
          // Missing html
        })
      ).rejects.toThrow('html parameter is required');
    });

    it('requires html for pdf-html format', async () => {
      await expect(
        exportPresentationTool.handler({
          format: 'pdf-html',
          // Missing html
        })
      ).rejects.toThrow('html parameter is required');
    });

    it('requires presentationData for json format', async () => {
      await expect(
        exportPresentationTool.handler({
          format: 'json',
          // Missing presentationData
        })
      ).rejects.toThrow('presentationData parameter is required');
    });

    it('rejects unsupported format', async () => {
      await expect(
        exportPresentationTool.handler({
          html: sampleHTML,
          format: 'pptx', // Unsupported
        })
      ).rejects.toThrow('Unsupported format');
    });

    it('requires format parameter', async () => {
      await expect(
        exportPresentationTool.handler({
          html: sampleHTML,
          // Missing format
        })
      ).rejects.toThrow();
    });
  });

  describe('Format Validation', () => {
    it('accepts all valid formats', async () => {
      const formats = ['html', 'pdf-html', 'json'];

      for (const format of formats) {
        const args =
          format === 'json'
            ? { presentationData: samplePresentationData, format }
            : { html: sampleHTML, format };

        const result = await exportPresentationTool.handler(args);
        expect(result.success).toBe(true);
        expect(result.format).toBe(format);
      }
    });
  });
});
