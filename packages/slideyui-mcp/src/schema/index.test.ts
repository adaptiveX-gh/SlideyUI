/**
 * Tests for Zod schemas
 */

import { describe, it, expect } from 'vitest';
import {
  ThemeSchema,
  AspectRatioSchema,
  FontSizeSchema,
  CardStateSchema,
  TitleSlideSchema,
  ContentSlideSchema,
  MediaSlideSchema,
  DataSlideSchema,
  QuoteSlideSchema,
  TimelineSlideSchema,
  ComparisonSlideSchema,
  ProcessSlideSchema,
  SectionHeaderSlideSchema,
  BlankSlideSchema,
  HeroSlideSchema,
  TwoColumnSlideSchema,
  ThreeColumnSlideSchema,
  FourColumnSlideSchema,
  ChartWithMetricsSlideSchema,
  ProductOverviewSlideSchema,
  SlideSchema,
  GenerationOptionsSchema,
  PresentationMetadataSchema,
  PresentationSchema,
  ChartDataSchema,
} from './index.js';

describe('Schema Validation', () => {
  describe('Basic Schemas', () => {
    it('validates valid themes', () => {
      expect(ThemeSchema.parse('corporate')).toBe('corporate');
      expect(ThemeSchema.parse('pitch-deck')).toBe('pitch-deck');
      expect(ThemeSchema.parse('academic')).toBe('academic');
      expect(ThemeSchema.parse('workshop')).toBe('workshop');
      expect(ThemeSchema.parse('startup')).toBe('startup');
    });

    it('rejects invalid themes', () => {
      expect(() => ThemeSchema.parse('invalid')).toThrow();
      expect(() => ThemeSchema.parse('')).toThrow();
      expect(() => ThemeSchema.parse(123)).toThrow();
    });

    it('validates aspect ratios', () => {
      expect(AspectRatioSchema.parse('16:9')).toBe('16:9');
      expect(AspectRatioSchema.parse('4:3')).toBe('4:3');
    });

    it('rejects invalid aspect ratios', () => {
      expect(() => AspectRatioSchema.parse('21:9')).toThrow();
      expect(() => AspectRatioSchema.parse('widescreen')).toThrow();
    });

    it('validates font sizes', () => {
      expect(FontSizeSchema.parse('default')).toBe('default');
      expect(FontSizeSchema.parse('large')).toBe('large');
      expect(FontSizeSchema.parse('xlarge')).toBe('xlarge');
    });

    it('validates card states', () => {
      expect(CardStateSchema.parse('generating')).toBe('generating');
      expect(CardStateSchema.parse('complete')).toBe('complete');
      expect(CardStateSchema.parse('error')).toBe('error');
    });
  });

  describe('TitleSlideSchema', () => {
    it('validates minimal title slide', () => {
      const slide = { type: 'title', title: 'Welcome' };
      const result = TitleSlideSchema.parse(slide);
      expect(result.title).toBe('Welcome');
    });

    it('validates title slide with all fields', () => {
      const slide = {
        type: 'title',
        title: 'Presentation Title',
        subtitle: 'Subtitle Here',
        author: 'John Doe',
        date: '2024-01-01',
      };
      const result = TitleSlideSchema.parse(slide);
      expect(result.subtitle).toBe('Subtitle Here');
      expect(result.author).toBe('John Doe');
    });

    it('rejects title slide without title', () => {
      expect(() => TitleSlideSchema.parse({ type: 'title' })).toThrow();
    });

    it('rejects title slide with empty title', () => {
      expect(() => TitleSlideSchema.parse({ type: 'title', title: '' })).toThrow();
    });
  });

  describe('ContentSlideSchema', () => {
    it('validates content slide with array content', () => {
      const slide = {
        type: 'content',
        title: 'Points',
        content: ['Point 1', 'Point 2', 'Point 3'],
      };
      const result = ContentSlideSchema.parse(slide);
      expect(result.content).toHaveLength(3);
    });

    it('validates content slide with string content', () => {
      const slide = {
        type: 'content',
        title: 'Paragraph',
        content: 'This is a paragraph of text.',
      };
      const result = ContentSlideSchema.parse(slide);
      expect(typeof result.content).toBe('string');
    });

    it('validates layout option', () => {
      const slide = {
        type: 'content',
        title: 'Two Columns',
        content: ['Point 1'],
        layout: 'two-column',
      };
      const result = ContentSlideSchema.parse(slide);
      expect(result.layout).toBe('two-column');
    });

    it('rejects invalid layout', () => {
      const slide = {
        type: 'content',
        title: 'Test',
        content: ['Point'],
        layout: 'three-column',
      };
      expect(() => ContentSlideSchema.parse(slide)).toThrow();
    });
  });

  describe('MediaSlideSchema', () => {
    it('validates media slide with required fields', () => {
      const slide = {
        type: 'media',
        mediaUrl: 'http://example.com/image.jpg',
        mediaType: 'image',
      };
      const result = MediaSlideSchema.parse(slide);
      expect(result.mediaUrl).toBe('http://example.com/image.jpg');
    });

    it('validates media slide with all fields', () => {
      const slide = {
        type: 'media',
        title: 'Product Image',
        mediaUrl: 'https://example.com/product.jpg',
        mediaType: 'image',
        caption: 'Our flagship product',
        layout: 'contained',
      };
      const result = MediaSlideSchema.parse(slide);
      expect(result.caption).toBe('Our flagship product');
    });

    it('rejects invalid media URL', () => {
      const slide = {
        type: 'media',
        mediaUrl: 'not-a-url',
        mediaType: 'image',
      };
      expect(() => MediaSlideSchema.parse(slide)).toThrow();
    });

    it('validates all media types', () => {
      const types = ['image', 'video', 'embed'];
      types.forEach((mediaType) => {
        const slide = {
          type: 'media',
          mediaUrl: 'http://example.com/file',
          mediaType,
        };
        expect(() => MediaSlideSchema.parse(slide)).not.toThrow();
      });
    });
  });

  describe('ChartDataSchema', () => {
    it('validates chart data with single dataset', () => {
      const data = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Revenue',
            data: [100, 200, 150, 300],
          },
        ],
      };
      const result = ChartDataSchema.parse(data);
      expect(result.datasets).toHaveLength(1);
    });

    it('validates chart data with multiple datasets', () => {
      const data = {
        labels: ['Jan', 'Feb', 'Mar'],
        datasets: [
          { label: 'Series 1', data: [1, 2, 3] },
          { label: 'Series 2', data: [4, 5, 6] },
        ],
      };
      const result = ChartDataSchema.parse(data);
      expect(result.datasets).toHaveLength(2);
    });

    it('validates chart data with colors', () => {
      const data = {
        labels: ['A', 'B'],
        datasets: [
          {
            label: 'Data',
            data: [1, 2],
            backgroundColor: ['#ff0000', '#00ff00'],
            borderColor: '#000000',
            borderWidth: 2,
          },
        ],
      };
      const result = ChartDataSchema.parse(data);
      expect(result.datasets[0].backgroundColor).toEqual(['#ff0000', '#00ff00']);
    });

    it('rejects chart data without datasets', () => {
      const data = {
        labels: ['A', 'B'],
        datasets: [],
      };
      expect(() => ChartDataSchema.parse(data)).toThrow();
    });
  });

  describe('DataSlideSchema', () => {
    it('validates data slide with table', () => {
      const slide = {
        type: 'data',
        title: 'Results',
        data: [
          { name: 'Alice', score: 95 },
          { name: 'Bob', score: 87 },
        ],
        dataType: 'table',
      };
      const result = DataSlideSchema.parse(slide);
      expect(result.dataType).toBe('table');
    });

    it('validates data slide with chart', () => {
      const slide = {
        type: 'data',
        title: 'Growth',
        data: {
          labels: ['Q1', 'Q2'],
          datasets: [{ label: 'Revenue', data: [100, 200] }],
        },
        dataType: 'chart',
        chartType: 'bar',
      };
      const result = DataSlideSchema.parse(slide);
      expect(result.chartType).toBe('bar');
    });

    it('validates all chart types', () => {
      const chartTypes = ['bar', 'line', 'pie', 'area', 'doughnut', 'scatter'];
      chartTypes.forEach((chartType) => {
        const slide = {
          type: 'data',
          title: 'Chart',
          data: {
            labels: ['A'],
            datasets: [{ label: 'Data', data: [1] }],
          },
          dataType: 'chart',
          chartType,
        };
        expect(() => DataSlideSchema.parse(slide)).not.toThrow();
      });
    });
  });

  describe('QuoteSlideSchema', () => {
    it('validates quote slide', () => {
      const slide = {
        type: 'quote',
        quote: 'The only way to do great work is to love what you do.',
        author: 'Steve Jobs',
      };
      const result = QuoteSlideSchema.parse(slide);
      expect(result.author).toBe('Steve Jobs');
    });

    it('validates quote with context', () => {
      const slide = {
        type: 'quote',
        quote: 'To be or not to be',
        author: 'William Shakespeare',
        context: 'Hamlet, Act 3 Scene 1',
      };
      const result = QuoteSlideSchema.parse(slide);
      expect(result.context).toBe('Hamlet, Act 3 Scene 1');
    });

    it('rejects quote without author', () => {
      expect(() =>
        QuoteSlideSchema.parse({
          type: 'quote',
          quote: 'Some quote',
        })
      ).toThrow();
    });
  });

  describe('TimelineSlideSchema', () => {
    it('validates timeline slide', () => {
      const slide = {
        type: 'timeline',
        title: 'Company History',
        events: [
          { date: '2010', title: 'Founded' },
          { date: '2015', title: 'Series A', description: '$10M raised' },
          { date: '2020', title: 'IPO' },
        ],
      };
      const result = TimelineSlideSchema.parse(slide);
      expect(result.events).toHaveLength(3);
    });

    it('validates timeline orientation', () => {
      const slide = {
        type: 'timeline',
        title: 'Timeline',
        events: [{ date: '2024', title: 'Event' }],
        orientation: 'vertical',
      };
      const result = TimelineSlideSchema.parse(slide);
      expect(result.orientation).toBe('vertical');
    });
  });

  describe('ComparisonSlideSchema', () => {
    it('validates comparison slide', () => {
      const slide = {
        type: 'comparison',
        title: 'Before vs After',
        leftTitle: 'Before',
        leftContent: ['Slow', 'Expensive', 'Complex'],
        rightTitle: 'After',
        rightContent: ['Fast', 'Affordable', 'Simple'],
      };
      const result = ComparisonSlideSchema.parse(slide);
      expect(result.leftContent).toHaveLength(3);
      expect(result.rightContent).toHaveLength(3);
    });
  });

  describe('ProcessSlideSchema', () => {
    it('validates process slide', () => {
      const slide = {
        type: 'process',
        title: 'Our Process',
        steps: [
          { title: 'Discover', description: 'Research phase' },
          { title: 'Design', description: 'Create mockups' },
          { title: 'Develop', description: 'Build product' },
        ],
      };
      const result = ProcessSlideSchema.parse(slide);
      expect(result.steps).toHaveLength(3);
    });

    it('validates process layouts', () => {
      const layouts = ['horizontal', 'vertical', 'grid'];
      layouts.forEach((layout) => {
        const slide = {
          type: 'process',
          title: 'Process',
          steps: [{ title: 'Step 1' }],
          layout,
        };
        expect(() => ProcessSlideSchema.parse(slide)).not.toThrow();
      });
    });
  });

  describe('Advanced Slide Schemas', () => {
    it('validates hero slide', () => {
      const slide = {
        type: 'hero',
        title: 'Welcome',
        subtitle: 'Get started today',
        backgroundImage: 'https://example.com/bg.jpg',
        callToAction: {
          text: 'Sign Up',
          url: 'https://example.com/signup',
        },
      };
      const result = HeroSlideSchema.parse(slide);
      expect(result.callToAction?.text).toBe('Sign Up');
    });

    it('validates two-column slide', () => {
      const slide = {
        type: 'two-column',
        title: 'Features',
        leftColumn: {
          type: 'list',
          content: ['Feature 1', 'Feature 2'],
        },
        rightColumn: {
          type: 'image',
          content: 'https://example.com/image.jpg',
        },
        columnRatio: '60-40',
      };
      const result = TwoColumnSlideSchema.parse(slide);
      expect(result.columnRatio).toBe('60-40');
    });

    it('validates three-column slide', () => {
      const slide = {
        type: 'three-column',
        columns: [
          { heading: 'Column 1', content: 'Text 1' },
          { heading: 'Column 2', content: ['List', 'Items'] },
          { heading: 'Column 3', icon: '⭐', content: 'Text 3' },
        ],
      };
      const result = ThreeColumnSlideSchema.parse(slide);
      expect(result.columns).toHaveLength(3);
    });

    it('validates four-column slide', () => {
      const slide = {
        type: 'four-column',
        title: 'Features',
        columns: [
          { heading: 'Fast', content: 'Lightning speed' },
          { heading: 'Secure', content: 'Bank-level security' },
          { heading: 'Scalable', content: 'Grows with you' },
          { heading: 'Simple', content: 'Easy to use' },
        ],
      };
      const result = FourColumnSlideSchema.parse(slide);
      expect(result.columns).toHaveLength(4);
    });

    it('validates chart with metrics slide', () => {
      const slide = {
        type: 'chart-with-metrics',
        title: 'Performance',
        chart: {
          type: 'line',
          data: { labels: ['A'], datasets: [{ label: 'Data', data: [1] }] },
        },
        metrics: [
          { label: 'Revenue', value: '$1M', change: { value: 15, direction: 'up' } },
          { label: 'Users', value: '10K' },
        ],
      };
      const result = ChartWithMetricsSlideSchema.parse(slide);
      expect(result.metrics).toHaveLength(2);
    });

    it('validates product overview slide', () => {
      const slide = {
        type: 'product-overview',
        title: 'Our Product',
        productImage: 'https://example.com/product.jpg',
        description: 'Amazing product',
        features: ['Feature 1', 'Feature 2', 'Feature 3'],
        pricing: {
          price: '$99',
          period: 'month',
          cta: 'Buy Now',
        },
      };
      const result = ProductOverviewSlideSchema.parse(slide);
      expect(result.features).toHaveLength(3);
    });
  });

  describe('SlideSchema (Discriminated Union)', () => {
    it('correctly discriminates slide types', () => {
      const slides = [
        { type: 'title', title: 'Title' },
        { type: 'content', title: 'Content', content: ['Point'] },
        { type: 'quote', quote: 'Quote', author: 'Author' },
      ];

      slides.forEach((slide) => {
        expect(() => SlideSchema.parse(slide)).not.toThrow();
      });
    });

    it('provides helpful error for invalid slide', () => {
      const invalidSlide = {
        type: 'title',
        // missing required title field
      };

      expect(() => SlideSchema.parse(invalidSlide)).toThrow();
    });
  });

  describe('PresentationSchema', () => {
    it('validates complete presentation', () => {
      const presentation = {
        theme: 'corporate',
        title: 'My Presentation',
        slides: [
          { type: 'title', title: 'Welcome' },
          { type: 'content', title: 'Overview', content: ['Point 1'] },
        ],
        options: {
          aspectRatio: '16:9',
          fontSize: 'large',
          minify: true,
        },
        metadata: {
          author: 'John Doe',
          date: '2024-01-01',
          version: '1.0',
        },
      };

      const result = PresentationSchema.parse(presentation);
      expect(result.slides).toHaveLength(2);
    });

    it('validates minimal presentation', () => {
      const presentation = {
        theme: 'startup',
        title: 'Quick Deck',
        slides: [{ type: 'title', title: 'Hello' }],
      };

      expect(() => PresentationSchema.parse(presentation)).not.toThrow();
    });

    it('rejects presentation with no slides', () => {
      const presentation = {
        theme: 'corporate',
        title: 'Empty',
        slides: [],
      };

      expect(() => PresentationSchema.parse(presentation)).toThrow();
    });
  });
});
