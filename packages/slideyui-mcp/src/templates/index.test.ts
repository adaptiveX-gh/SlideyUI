/**
 * Tests for slide templates
 */

import { describe, it, expect } from 'vitest';
import {
  getTemplate,
  hasTemplate,
  getAllTemplateTypes,
  titleTemplate,
  contentTemplate,
  mediaTemplate,
  dataTemplate,
  quoteTemplate,
  timelineTemplate,
  comparisonTemplate,
  processTemplate,
  sectionHeaderTemplate,
  blankTemplate,
  heroTemplate,
  twoColumnTemplate,
  threeColumnTemplate,
  fourColumnTemplate,
  chartWithMetricsTemplate,
  productOverviewTemplate,
} from './index.js';
import type { GenerationOptions } from '../types/index.js';

const defaultOptions: GenerationOptions = {
  aspectRatio: '16:9',
  fontSize: 'default',
  minify: false,
};

describe('Template Registry', () => {
  it('has all 16 templates registered', () => {
    const types = getAllTemplateTypes();
    expect(types).toHaveLength(16);
  });

  it('can retrieve templates by type', () => {
    const template = getTemplate('title');
    expect(template).toBeDefined();
    expect(typeof template).toBe('function');
  });

  it('throws error for unknown template type', () => {
    expect(() => getTemplate('invalid' as any)).toThrow('Template not found');
  });

  it('checks if template exists', () => {
    expect(hasTemplate('title')).toBe(true);
    expect(hasTemplate('invalid' as any)).toBe(false);
  });

  it('returns all template types', () => {
    const types = getAllTemplateTypes();
    expect(types).toContain('title');
    expect(types).toContain('content');
    expect(types).toContain('media');
    expect(types).toContain('data');
  });
});

describe('Title Template', () => {
  it('renders with only title', () => {
    const html = titleTemplate({ type: 'title', title: 'Test Title' }, defaultOptions);
    expect(html).toContain('Test Title');
    expect(html).toContain('slideyui-title');
  });

  it('renders with all fields', () => {
    const html = titleTemplate(
      {
        type: 'title',
        title: 'Main Title',
        subtitle: 'Subtitle Here',
        author: 'John Doe',
        date: '2024-01-01',
      },
      defaultOptions
    );
    expect(html).toContain('Main Title');
    expect(html).toContain('Subtitle Here');
    expect(html).toContain('John Doe');
    expect(html).toContain('2024-01-01');
  });

  it('escapes HTML in title', () => {
    const html = titleTemplate(
      { type: 'title', title: '<script>alert("xss")</script>' },
      defaultOptions
    );
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });

  it('handles optional fields gracefully', () => {
    const html = titleTemplate({ type: 'title', title: 'Title Only' }, defaultOptions);
    expect(html).toContain('Title Only');
    expect(html).not.toContain('slideyui-metadata');
  });
});

describe('Content Template', () => {
  it('renders with bullet points', () => {
    const html = contentTemplate(
      {
        type: 'content',
        title: 'Features',
        content: ['Feature 1', 'Feature 2', 'Feature 3'],
      },
      defaultOptions
    );
    expect(html).toContain('Features');
    expect(html).toContain('Feature 1');
    expect(html).toContain('slideyui-list');
    expect(html).toContain('<li>');
  });

  it('renders with paragraph text', () => {
    const html = contentTemplate(
      {
        type: 'content',
        title: 'Description',
        content: 'This is a paragraph of text.',
      },
      defaultOptions
    );
    expect(html).toContain('This is a paragraph');
    expect(html).toContain('slideyui-text');
    expect(html).not.toContain('<li>');
  });

  it('applies two-column layout', () => {
    const html = contentTemplate(
      {
        type: 'content',
        title: 'Test',
        content: ['Point 1'],
        layout: 'two-column',
      },
      defaultOptions
    );
    expect(html).toContain('slideyui-layout-two-column');
  });

  it('escapes HTML in content', () => {
    const html = contentTemplate(
      {
        type: 'content',
        title: 'Test',
        content: ['<img src=x onerror=alert(1)>'],
      },
      defaultOptions
    );
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img');
  });
});

describe('Media Template', () => {
  it('renders image slide', () => {
    const html = mediaTemplate(
      {
        type: 'media',
        mediaUrl: 'https://example.com/image.jpg',
        mediaType: 'image',
      },
      defaultOptions
    );
    expect(html).toContain('image.jpg');
    expect(html).toContain('img');
  });

  it('includes caption when provided', () => {
    const html = mediaTemplate(
      {
        type: 'media',
        title: 'Product Shot',
        mediaUrl: 'https://example.com/product.jpg',
        mediaType: 'image',
        caption: 'Our flagship product',
      },
      defaultOptions
    );
    expect(html).toContain('Our flagship product');
  });

  it('renders video slide', () => {
    const html = mediaTemplate(
      {
        type: 'media',
        mediaUrl: 'https://example.com/video.mp4',
        mediaType: 'video',
      },
      defaultOptions
    );
    expect(html).toContain('video');
  });

  it('renders embed slide', () => {
    const html = mediaTemplate(
      {
        type: 'media',
        mediaUrl: 'https://www.youtube.com/embed/123',
        mediaType: 'embed',
      },
      defaultOptions
    );
    expect(html).toContain('iframe');
  });
});

describe('Data Template', () => {
  it('renders table with array data', () => {
    const html = dataTemplate(
      {
        type: 'data',
        title: 'Results',
        data: [
          ['Name', 'Score'],
          ['Alice', '95'],
          ['Bob', '87'],
        ],
        dataType: 'table',
      },
      defaultOptions
    );
    expect(html).toContain('table');
    expect(html).toContain('Alice');
    expect(html).toContain('95');
  });

  it('renders table with object data', () => {
    const html = dataTemplate(
      {
        type: 'data',
        title: 'Results',
        data: [
          { name: 'Alice', score: 95 },
          { name: 'Bob', score: 87 },
        ],
        dataType: 'table',
      },
      defaultOptions
    );
    expect(html).toContain('table');
    expect(html).toContain('Alice');
  });

  it('renders chart', () => {
    const html = dataTemplate(
      {
        type: 'data',
        title: 'Growth',
        data: {
          labels: ['Q1', 'Q2', 'Q3'],
          datasets: [{ label: 'Revenue', data: [100, 200, 150] }],
        },
        dataType: 'chart',
        chartType: 'bar',
      },
      defaultOptions
    );
    expect(html).toContain('svg');
    expect(html).toContain('Q1');
  });
});

describe('Quote Template', () => {
  it('renders quote with author', () => {
    const html = quoteTemplate(
      {
        type: 'quote',
        quote: 'Innovation distinguishes between a leader and a follower.',
        author: 'Steve Jobs',
      },
      defaultOptions
    );
    expect(html).toContain('Innovation distinguishes');
    expect(html).toContain('Steve Jobs');
    expect(html).toContain('slideyui-quote');
  });

  it('includes context when provided', () => {
    const html = quoteTemplate(
      {
        type: 'quote',
        quote: 'To be or not to be',
        author: 'William Shakespeare',
        context: 'Hamlet, Act 3',
      },
      defaultOptions
    );
    expect(html).toContain('Hamlet, Act 3');
  });

  it('escapes HTML in quote', () => {
    const html = quoteTemplate(
      {
        type: 'quote',
        quote: '<script>alert("xss")</script>',
        author: 'Hacker',
      },
      defaultOptions
    );
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
  });
});

describe('Timeline Template', () => {
  it('renders timeline events', () => {
    const html = timelineTemplate(
      {
        type: 'timeline',
        title: 'Company History',
        events: [
          { date: '2010', title: 'Founded' },
          { date: '2015', title: 'Series A', description: '$10M raised' },
          { date: '2020', title: 'IPO' },
        ],
      },
      defaultOptions
    );
    expect(html).toContain('2010');
    expect(html).toContain('Founded');
    expect(html).toContain('Series A');
  });

  it('applies horizontal orientation', () => {
    const html = timelineTemplate(
      {
        type: 'timeline',
        title: 'Timeline',
        events: [{ date: '2024', title: 'Event' }],
        orientation: 'horizontal',
      },
      defaultOptions
    );
    expect(html).toContain('slideyui-timeline');
  });
});

describe('Comparison Template', () => {
  it('renders two-column comparison', () => {
    const html = comparisonTemplate(
      {
        type: 'comparison',
        title: 'Before vs After',
        leftTitle: 'Before',
        leftContent: ['Slow', 'Expensive'],
        rightTitle: 'After',
        rightContent: ['Fast', 'Affordable'],
      },
      defaultOptions
    );
    expect(html).toContain('Before');
    expect(html).toContain('After');
    expect(html).toContain('Slow');
    expect(html).toContain('Fast');
  });

  it('escapes HTML in comparison items', () => {
    const html = comparisonTemplate(
      {
        type: 'comparison',
        title: 'Test',
        leftTitle: 'A',
        leftContent: ['<b>bold</b>'],
        rightTitle: 'B',
        rightContent: ['normal'],
      },
      defaultOptions
    );
    expect(html).not.toContain('<b>');
    expect(html).toContain('&lt;b&gt;');
  });
});

describe('Process Template', () => {
  it('renders process steps', () => {
    const html = processTemplate(
      {
        type: 'process',
        title: 'Our Process',
        steps: [
          { title: 'Discover' },
          { title: 'Design', description: 'Create mockups' },
          { title: 'Develop' },
        ],
      },
      defaultOptions
    );
    expect(html).toContain('Discover');
    expect(html).toContain('Design');
    expect(html).toContain('Create mockups');
  });

  it('applies grid layout', () => {
    const html = processTemplate(
      {
        type: 'process',
        title: 'Steps',
        steps: [{ title: 'Step 1' }],
        layout: 'grid',
      },
      defaultOptions
    );
    expect(html).toContain('slideyui-process');
  });
});

describe('Section Header Template', () => {
  it('renders section header', () => {
    const html = sectionHeaderTemplate(
      {
        type: 'section-header',
        title: 'Part 2',
      },
      defaultOptions
    );
    expect(html).toContain('Part 2');
    expect(html).toContain('slideyui-section-header');
  });

  it('includes subtitle when provided', () => {
    const html = sectionHeaderTemplate(
      {
        type: 'section-header',
        title: 'Introduction',
        subtitle: 'Getting Started',
      },
      defaultOptions
    );
    expect(html).toContain('Getting Started');
  });
});

describe('Blank Template', () => {
  it('renders empty slide', () => {
    const html = blankTemplate({ type: 'blank' }, defaultOptions);
    expect(html).toContain('slideyui-blank');
  });

  it('includes custom content when provided', () => {
    const html = blankTemplate(
      { type: 'blank', content: '<div>Custom HTML</div>' },
      defaultOptions
    );
    expect(html).toContain('Custom HTML');
  });
});

describe('Hero Template', () => {
  it('renders hero slide', () => {
    const html = heroTemplate(
      {
        type: 'hero',
        title: 'Welcome',
        subtitle: 'Get started today',
      },
      defaultOptions
    );
    expect(html).toContain('Welcome');
    expect(html).toContain('Get started today');
  });

  it('includes call to action', () => {
    const html = heroTemplate(
      {
        type: 'hero',
        title: 'Join Us',
        callToAction: {
          text: 'Sign Up',
          url: 'https://example.com/signup',
        },
      },
      defaultOptions
    );
    expect(html).toContain('Sign Up');
    expect(html).toContain('example.com/signup');
  });

  it('applies background image', () => {
    const html = heroTemplate(
      {
        type: 'hero',
        title: 'Test',
        backgroundImage: 'https://example.com/bg.jpg',
      },
      defaultOptions
    );
    expect(html).toContain('bg.jpg');
  });
});

describe('Two-Column Template', () => {
  it('renders two columns', () => {
    const html = twoColumnTemplate(
      {
        type: 'two-column',
        leftColumn: { type: 'text', content: 'Left text' },
        rightColumn: { type: 'text', content: 'Right text' },
      },
      defaultOptions
    );
    expect(html).toContain('Left text');
    expect(html).toContain('Right text');
  });

  it('renders list in column', () => {
    const html = twoColumnTemplate(
      {
        type: 'two-column',
        leftColumn: { type: 'list', content: ['Item 1', 'Item 2'] },
        rightColumn: { type: 'text', content: 'Text' },
      },
      defaultOptions
    );
    expect(html).toContain('Item 1');
    expect(html).toContain('<li>');
  });

  it('applies column ratio', () => {
    const html = twoColumnTemplate(
      {
        type: 'two-column',
        leftColumn: { type: 'text', content: 'A' },
        rightColumn: { type: 'text', content: 'B' },
        columnRatio: '60-40',
      },
      defaultOptions
    );
    expect(html).toContain('slideyui-two-column');
  });
});

describe('Three-Column Template', () => {
  it('renders three columns', () => {
    const html = threeColumnTemplate(
      {
        type: 'three-column',
        columns: [
          { heading: 'Column 1', content: 'Text 1' },
          { heading: 'Column 2', content: 'Text 2' },
          { heading: 'Column 3', content: 'Text 3' },
        ],
      },
      defaultOptions
    );
    expect(html).toContain('Column 1');
    expect(html).toContain('Column 2');
    expect(html).toContain('Column 3');
  });

  it('includes icons when provided', () => {
    const html = threeColumnTemplate(
      {
        type: 'three-column',
        columns: [
          { icon: '🚀', content: 'Fast' },
          { icon: '🔒', content: 'Secure' },
          { icon: '⚡', content: 'Powerful' },
        ],
      },
      defaultOptions
    );
    expect(html).toContain('🚀');
    expect(html).toContain('🔒');
    expect(html).toContain('⚡');
  });
});

describe('Four-Column Template', () => {
  it('renders four columns', () => {
    const html = fourColumnTemplate(
      {
        type: 'four-column',
        columns: [
          { heading: 'A', content: '1' },
          { heading: 'B', content: '2' },
          { heading: 'C', content: '3' },
          { heading: 'D', content: '4' },
        ],
      },
      defaultOptions
    );
    expect(html).toContain('A');
    expect(html).toContain('B');
    expect(html).toContain('C');
    expect(html).toContain('D');
  });
});

describe('Chart with Metrics Template', () => {
  it('renders chart and metrics', () => {
    const html = chartWithMetricsTemplate(
      {
        type: 'chart-with-metrics',
        title: 'Performance',
        chart: {
          type: 'line',
          data: {
            labels: ['Q1', 'Q2'],
            datasets: [{ label: 'Revenue', data: [100, 200] }],
          },
        },
        metrics: [
          { label: 'Revenue', value: '$1M' },
          { label: 'Growth', value: '25%', change: { value: 10, direction: 'up' } },
        ],
      },
      defaultOptions
    );
    expect(html).toContain('Revenue');
    expect(html).toContain('$1M');
    expect(html).toContain('svg'); // Chart
  });
});

describe('Product Overview Template', () => {
  it('renders product overview', () => {
    const html = productOverviewTemplate(
      {
        type: 'product-overview',
        title: 'Our Product',
        features: ['Feature 1', 'Feature 2'],
      },
      defaultOptions
    );
    expect(html).toContain('Our Product');
    expect(html).toContain('Feature 1');
  });

  it('includes pricing information', () => {
    const html = productOverviewTemplate(
      {
        type: 'product-overview',
        title: 'Product',
        features: ['Feature'],
        pricing: {
          price: '$99',
          period: 'month',
          cta: 'Buy Now',
        },
      },
      defaultOptions
    );
    expect(html).toContain('$99');
    expect(html).toContain('month');
    expect(html).toContain('Buy Now');
  });
});

describe('HTML Safety', () => {
  it('all templates escape user content', () => {
    const xssString = '<script>alert("xss")</script>';

    const templates = [
      { type: 'title', title: xssString },
      { type: 'content', title: 'Test', content: [xssString] },
      { type: 'quote', quote: xssString, author: 'Test' },
    ];

    templates.forEach((spec: any) => {
      const template = getTemplate(spec.type);
      const html = template(spec, defaultOptions);
      expect(html).not.toContain('<script>');
      expect(html).toContain('&lt;script&gt;');
    });
  });
});

describe('CSS Classes', () => {
  it('all templates use slideyui- prefixed classes', () => {
    const templates = getAllTemplateTypes();

    templates.forEach((type) => {
      const template = getTemplate(type);
      let spec: any = { type };

      // Add required fields for each type
      if (type === 'title') spec.title = 'Test';
      if (type === 'content') {
        spec.title = 'Test';
        spec.content = ['Item'];
      }
      if (type === 'media') {
        spec.mediaUrl = 'https://example.com/test.jpg';
        spec.mediaType = 'image';
      }
      if (type === 'data') {
        spec.title = 'Test';
        spec.data = [['A']];
        spec.dataType = 'table';
      }
      if (type === 'quote') {
        spec.quote = 'Test';
        spec.author = 'Author';
      }
      if (type === 'timeline') {
        spec.title = 'Test';
        spec.events = [{ date: '2024', title: 'Event' }];
      }
      if (type === 'comparison') {
        spec.title = 'Test';
        spec.leftTitle = 'A';
        spec.leftContent = ['1'];
        spec.rightTitle = 'B';
        spec.rightContent = ['2'];
      }
      if (type === 'process') {
        spec.title = 'Test';
        spec.steps = [{ title: 'Step' }];
      }
      if (type === 'section-header') spec.title = 'Test';
      if (type === 'hero') spec.title = 'Test';
      if (type === 'two-column') {
        spec.leftColumn = { type: 'text', content: 'A' };
        spec.rightColumn = { type: 'text', content: 'B' };
      }
      if (type === 'three-column') {
        spec.columns = [
          { content: 'A' },
          { content: 'B' },
          { content: 'C' },
        ];
      }
      if (type === 'four-column') {
        spec.columns = [
          { content: 'A' },
          { content: 'B' },
          { content: 'C' },
          { content: 'D' },
        ];
      }
      if (type === 'chart-with-metrics') {
        spec.title = 'Test';
        spec.chart = {
          type: 'bar',
          data: { labels: ['A'], datasets: [{ label: 'Data', data: [1] }] },
        };
        spec.metrics = [{ label: 'Metric', value: '100' }];
      }
      if (type === 'product-overview') {
        spec.title = 'Test';
        spec.features = ['Feature'];
      }

      const html = template(spec, defaultOptions);
      expect(html).toContain('slideyui-');
    });
  });
});
