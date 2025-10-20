/**
 * Tests for validation utilities
 */

import { describe, it, expect } from 'vitest';
import { validatePresentation, checkPresentationQuality } from './validation.js';
import type { PresentationSpec } from '../types/index.js';

describe('Validation Utilities', () => {
  describe('validatePresentation', () => {
    it('validates a valid minimal presentation', () => {
      const spec = {
        theme: 'corporate',
        title: 'Test Presentation',
        slides: [
          {
            type: 'title',
            title: 'Welcome',
          },
        ],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(true);
      expect(result.data).toBeDefined();
      expect(result.errors).toBeUndefined();
    });

    it('validates a presentation with multiple slides', () => {
      const spec = {
        theme: 'startup',
        title: 'My Presentation',
        slides: [
          { type: 'title', title: 'Title Slide' },
          { type: 'content', title: 'Content', content: ['Point 1', 'Point 2'] },
          { type: 'quote', quote: 'Great quote', author: 'Someone' },
        ],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(true);
      expect(result.data?.slides.length).toBe(3);
    });

    it('validates presentation with metadata', () => {
      const spec = {
        theme: 'academic',
        title: 'Research Presentation',
        slides: [{ type: 'title', title: 'Title' }],
        metadata: {
          author: 'Dr. Smith',
          date: '2024-01-01',
          version: '1.0',
          description: 'Research findings',
          tags: ['research', 'science'],
        },
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(true);
      expect(result.data?.metadata?.author).toBe('Dr. Smith');
    });

    it('validates presentation with options', () => {
      const spec = {
        theme: 'workshop',
        title: 'Workshop',
        slides: [{ type: 'title', title: 'Title' }],
        options: {
          aspectRatio: '16:9',
          fontSize: 'large',
          minify: true,
        },
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(true);
      expect(result.data?.options?.aspectRatio).toBe('16:9');
    });

    it('rejects presentation without theme', () => {
      const spec = {
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors!.length).toBeGreaterThan(0);
    });

    it('rejects presentation without title', () => {
      const spec = {
        theme: 'corporate',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('rejects presentation without slides', () => {
      const spec = {
        theme: 'corporate',
        title: 'Test',
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('rejects presentation with empty slides array', () => {
      const spec = {
        theme: 'corporate',
        title: 'Test',
        slides: [],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('rejects invalid theme', () => {
      const spec = {
        theme: 'invalid-theme',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
    });

    it('rejects empty title', () => {
      const spec = {
        theme: 'corporate',
        title: '',
        slides: [{ type: 'title', title: 'Title' }],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
    });

    it('rejects slide without type', () => {
      const spec = {
        theme: 'corporate',
        title: 'Test',
        slides: [{ title: 'Title' }],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
    });

    it('rejects invalid aspect ratio', () => {
      const spec = {
        theme: 'corporate',
        title: 'Test',
        slides: [{ type: 'title', title: 'Title' }],
        options: {
          aspectRatio: '21:9',
        },
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(false);
    });
  });

  describe('checkPresentationQuality', () => {
    it('gives perfect score to well-structured presentation', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Great Presentation',
        slides: [
          { type: 'title', title: 'Introduction' },
          { type: 'content', title: 'Overview', content: ['Point 1', 'Point 2'] },
          { type: 'content', title: 'Details', content: ['Detail 1'] },
          { type: 'section-header', title: 'Summary' },
        ],
        metadata: {
          author: 'John Doe',
          date: '2024-01-01',
        },
      };

      const result = checkPresentationQuality(spec);
      expect(result.score).toBe(100);
      expect(result.warnings.length).toBe(0);
    });

    it('warns about too few slides', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Short Presentation',
        slides: [
          { type: 'title', title: 'Title' },
        ],
      };

      const result = checkPresentationQuality(spec);
      expect(result.score).toBeLessThan(100);
      expect(result.warnings.some((w) => w.includes('fewer than 3 slides'))).toBe(true);
    });

    it('warns about too many slides', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Long Presentation',
        slides: new Array(60).fill(null).map((_, i) => ({
          type: 'content',
          title: `Slide ${i}`,
          content: ['Content'],
        })),
        metadata: {
          author: 'Author',
        },
      };

      const result = checkPresentationQuality(spec);
      expect(result.score).toBeLessThan(100);
      expect(result.warnings.some((w) => w.includes('more than 50 slides'))).toBe(true);
    });

    it('warns when presentation does not start with title slide', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Presentation',
        slides: [
          { type: 'content', title: 'Content First', content: ['Oops'] },
          { type: 'title', title: 'Title Later' },
          { type: 'content', title: 'More Content', content: ['Point'] },
        ],
        metadata: {
          author: 'Author',
        },
      };

      const result = checkPresentationQuality(spec);
      expect(result.warnings.some((w) => w.includes('start with a title slide'))).toBe(true);
    });

    it('warns about missing author metadata', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Presentation',
        slides: [
          { type: 'title', title: 'Title' },
          { type: 'content', title: 'Content', content: ['Point'] },
          { type: 'content', title: 'More', content: ['Point'] },
        ],
      };

      const result = checkPresentationQuality(spec);
      expect(result.warnings.some((w) => w.includes('author metadata'))).toBe(true);
    });

    it('warns about slides with too many bullet points', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Presentation',
        slides: [
          { type: 'title', title: 'Title' },
          {
            type: 'content',
            title: 'Too Many Points',
            content: [
              'Point 1',
              'Point 2',
              'Point 3',
              'Point 4',
              'Point 5',
              'Point 6',
              'Point 7',
              'Point 8',
              'Point 9',
            ],
          },
        ],
        metadata: {
          author: 'Author',
        },
      };

      const result = checkPresentationQuality(spec);
      expect(result.warnings.some((w) => w.includes('too many bullet points'))).toBe(true);
    });

    it('calculates cumulative score correctly', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Problematic Presentation',
        slides: [
          { type: 'content', title: 'No title slide', content: ['Point'] },
          {
            type: 'content',
            title: 'Too many points',
            content: Array(10).fill('Point'),
          },
        ],
      };

      const result = checkPresentationQuality(spec);
      // Should have multiple deductions
      expect(result.score).toBeLessThan(100);
      expect(result.warnings.length).toBeGreaterThan(1);
    });

    it('never returns negative score', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Bad Presentation',
        slides: [
          { type: 'content', title: 'First', content: Array(10).fill('Point') },
        ],
      };

      const result = checkPresentationQuality(spec);
      expect(result.score).toBeGreaterThanOrEqual(0);
    });

    it('handles content slides with string content', () => {
      const spec: PresentationSpec = {
        theme: 'corporate',
        title: 'Presentation',
        slides: [
          { type: 'title', title: 'Title' },
          { type: 'content', title: 'Content', content: 'Single paragraph' },
          { type: 'content', title: 'More', content: 'Another paragraph' },
        ],
        metadata: {
          author: 'Author',
        },
      };

      const result = checkPresentationQuality(spec);
      // Should not warn about bullet points for string content
      expect(result.warnings.every((w) => !w.includes('bullet points'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('handles presentation with all slide types', () => {
      const spec = {
        theme: 'corporate',
        title: 'Complete Presentation',
        slides: [
          { type: 'title', title: 'Title' },
          { type: 'content', title: 'Content', content: ['Point'] },
          { type: 'media', mediaUrl: 'http://example.com/image.jpg', mediaType: 'image' },
          { type: 'data', title: 'Data', data: [['A', 'B']], dataType: 'table' },
          { type: 'quote', quote: 'Quote', author: 'Author' },
          { type: 'timeline', title: 'Timeline', events: [{ date: '2024', title: 'Event' }] },
          { type: 'comparison', title: 'Compare', leftTitle: 'A', leftContent: ['1'], rightTitle: 'B', rightContent: ['2'] },
          { type: 'process', title: 'Process', steps: [{ title: 'Step' }] },
          { type: 'section-header', title: 'Section' },
          { type: 'blank' },
        ],
      };

      const result = validatePresentation(spec);
      expect(result.valid).toBe(true);
    });
  });
});
