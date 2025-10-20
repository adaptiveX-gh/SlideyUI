/**
 * Template resource handler
 *
 * Provides slide template metadata, schemas, and examples via MCP resources.
 */

import type {
  Resource,
  ResourceContent,
  ResourceHandler,
  TemplateMetadata,
} from './types.js';
import type { SlideType } from '../types/index.js';

/**
 * Template metadata database
 */
const TEMPLATE_METADATA: Record<SlideType, TemplateMetadata> = {
  title: {
    type: 'title',
    displayName: 'Title Slide',
    description:
      'Opening slide with main title, subtitle, author, and date. Perfect for presentation covers.',
    category: 'Title & Impact',
    requiredFields: ['title'],
    optionalFields: ['subtitle', 'author', 'date', 'notes', 'state'],
    schema: {
      type: '"title"',
      title: 'string',
      subtitle: 'string (optional)',
      author: 'string (optional)',
      date: 'string (optional)',
    },
    example: {
      type: 'title',
      title: 'AI-Powered Product Strategy',
      subtitle: 'Quarterly Review - Q4 2024',
      author: 'Product Team',
      date: 'December 2024',
    },
  },
  hero: {
    type: 'hero',
    displayName: 'Hero Slide',
    description:
      'Full-screen impact slide with large title, subtitle, and optional call-to-action. Supports background images and gradients.',
    category: 'Title & Impact',
    requiredFields: ['title'],
    optionalFields: [
      'subtitle',
      'backgroundImage',
      'backgroundGradient',
      'callToAction',
    ],
    schema: {
      type: '"hero"',
      title: 'string',
      subtitle: 'string (optional)',
      backgroundImage: 'string (optional)',
      backgroundGradient: 'string (optional)',
      callToAction: 'object { text: string, url?: string } (optional)',
    },
    example: {
      type: 'hero',
      title: 'Welcome to the Future',
      subtitle: 'Revolutionizing the way teams collaborate',
      callToAction: {
        text: 'Get Started',
        url: 'https://example.com',
      },
    },
  },
  content: {
    type: 'content',
    displayName: 'Content Slide',
    description:
      'Standard content slide with title and bullet points or paragraphs. Supports single and two-column layouts.',
    category: 'Content',
    requiredFields: ['title', 'content'],
    optionalFields: ['layout', 'notes', 'state'],
    schema: {
      type: '"content"',
      title: 'string',
      content: 'string[] | string',
      layout: '"single-column" | "two-column" (optional)',
    },
    example: {
      type: 'content',
      title: 'Key Features',
      content: [
        'Real-time collaboration',
        'AI-powered suggestions',
        'Cross-platform support',
        'Enterprise security',
      ],
    },
  },
  'two-column': {
    type: 'two-column',
    displayName: 'Two Column Layout',
    description:
      'Side-by-side two-column layout supporting text, images, and lists. Flexible column ratios.',
    category: 'Content',
    requiredFields: ['leftColumn', 'rightColumn'],
    optionalFields: ['title', 'columnRatio'],
    schema: {
      type: '"two-column"',
      title: 'string (optional)',
      leftColumn: 'object { type: "text" | "image" | "list", content: string | string[] }',
      rightColumn: 'object { type: "text" | "image" | "list", content: string | string[] }',
      columnRatio: '"50-50" | "60-40" | "40-60" | "70-30" | "30-70" (optional)',
    },
    example: {
      type: 'two-column',
      title: 'Before and After',
      leftColumn: {
        type: 'list',
        content: ['Manual processes', 'Data silos', 'Slow decision making'],
      },
      rightColumn: {
        type: 'list',
        content: ['Automated workflows', 'Unified data platform', 'Real-time insights'],
      },
      columnRatio: '50-50',
    },
  },
  'three-column': {
    type: 'three-column',
    displayName: 'Three Column Layout',
    description:
      'Three equal-width columns with optional headings and icons. Perfect for feature comparisons.',
    category: 'Content',
    requiredFields: ['columns'],
    optionalFields: ['title'],
    schema: {
      type: '"three-column"',
      title: 'string (optional)',
      columns: 'array of 3 objects { heading?: string, icon?: string, content: string | string[] }',
    },
    example: {
      type: 'three-column',
      title: 'Our Services',
      columns: [
        {
          heading: 'Consulting',
          icon: '🎯',
          content: 'Expert guidance for your digital transformation journey',
        },
        {
          heading: 'Development',
          icon: '⚡',
          content: 'Custom software solutions built to scale',
        },
        {
          heading: 'Support',
          icon: '🛟',
          content: '24/7 dedicated support for peace of mind',
        },
      ],
    },
  },
  'four-column': {
    type: 'four-column',
    displayName: 'Four Column Layout',
    description:
      'Four equal-width columns with optional headings and icons. Ideal for showcasing multiple items.',
    category: 'Content',
    requiredFields: ['columns'],
    optionalFields: ['title'],
    schema: {
      type: '"four-column"',
      title: 'string (optional)',
      columns: 'array of 4 objects { heading?: string, icon?: string, content: string }',
    },
    example: {
      type: 'four-column',
      title: 'Quarterly Goals',
      columns: [
        { heading: 'Q1', icon: '📈', content: 'Launch new product line' },
        { heading: 'Q2', icon: '🌍', content: 'Expand to EU markets' },
        { heading: 'Q3', icon: '🤝', content: 'Strategic partnerships' },
        { heading: 'Q4', icon: '🎉', content: 'Celebrate milestones' },
      ],
    },
  },
  media: {
    type: 'media',
    displayName: 'Media Slide',
    description:
      'Display images, videos, or embedded content with optional title and caption. Multiple layout options.',
    category: 'Media',
    requiredFields: ['mediaUrl', 'mediaType'],
    optionalFields: ['title', 'caption', 'layout'],
    schema: {
      type: '"media"',
      title: 'string (optional)',
      mediaUrl: 'string',
      mediaType: '"image" | "video" | "embed"',
      caption: 'string (optional)',
      layout: '"full-bleed" | "contained" | "split" (optional)',
    },
    example: {
      type: 'media',
      title: 'Product Demo',
      mediaUrl: 'https://example.com/demo.mp4',
      mediaType: 'video',
      caption: 'Watch how our platform transforms workflows',
      layout: 'contained',
    },
  },
  quote: {
    type: 'quote',
    displayName: 'Quote Slide',
    description:
      'Large pull quote with attribution. Perfect for testimonials, customer feedback, or impactful statements.',
    category: 'Content',
    requiredFields: ['quote', 'author'],
    optionalFields: ['context'],
    schema: {
      type: '"quote"',
      quote: 'string',
      author: 'string',
      context: 'string (optional)',
    },
    example: {
      type: 'quote',
      quote:
        'This platform has completely transformed how our team collaborates. We\'ve seen a 50% increase in productivity.',
      author: 'Sarah Johnson',
      context: 'CEO, TechCorp',
    },
  },
  data: {
    type: 'data',
    displayName: 'Data Slide',
    description:
      'Display tables or charts (bar, line, pie, area, doughnut, scatter). Full chart rendering with projection-optimized styling.',
    category: 'Data & Metrics',
    requiredFields: ['title', 'data', 'dataType'],
    optionalFields: ['chartType'],
    schema: {
      type: '"data"',
      title: 'string',
      data: 'Record<string, unknown>[] | string[][] | ChartData',
      dataType: '"table" | "chart"',
      chartType: '"bar" | "line" | "pie" | "area" | "doughnut" | "scatter" (optional)',
    },
    example: {
      type: 'data',
      title: 'Quarterly Revenue',
      dataType: 'chart',
      chartType: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Revenue',
            data: [45000, 52000, 58000, 65000],
          },
        ],
      },
    },
  },
  'chart-with-metrics': {
    type: 'chart-with-metrics',
    displayName: 'Chart with Metrics',
    description:
      'Combined chart and KPI metrics display. Shows key numbers alongside visual data representation.',
    category: 'Data & Metrics',
    requiredFields: ['title', 'chart', 'metrics'],
    optionalFields: ['layout'],
    schema: {
      type: '"chart-with-metrics"',
      title: 'string',
      chart: 'object { type: "line" | "bar" | "pie" | "area", data: Record<string, unknown> }',
      metrics: 'array of objects { label: string, value: string | number, change?: { value: number, direction: "up" | "down" } }',
      layout: '"chart-left" | "chart-right" | "chart-top" (optional)',
    },
    example: {
      type: 'chart-with-metrics',
      title: 'Performance Dashboard',
      chart: {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{ label: 'Users', data: [1200, 1800, 2400, 3200] }],
        },
      },
      metrics: [
        { label: 'Total Users', value: '3,200', change: { value: 33, direction: 'up' } },
        { label: 'Revenue', value: '$128K', change: { value: 15, direction: 'up' } },
        { label: 'Churn Rate', value: '2.1%', change: { value: 0.5, direction: 'down' } },
      ],
    },
  },
  timeline: {
    type: 'timeline',
    displayName: 'Timeline Slide',
    description:
      'Display events chronologically with dates, titles, and descriptions. Horizontal or vertical orientation.',
    category: 'Process & Timeline',
    requiredFields: ['title', 'events'],
    optionalFields: ['orientation'],
    schema: {
      type: '"timeline"',
      title: 'string',
      events: 'array of objects { date: string, title: string, description?: string }',
      orientation: '"horizontal" | "vertical" (optional)',
    },
    example: {
      type: 'timeline',
      title: 'Product Roadmap',
      events: [
        { date: 'Q1 2024', title: 'Beta Launch', description: 'Initial release to early adopters' },
        { date: 'Q2 2024', title: 'Public Launch', description: 'Full market availability' },
        { date: 'Q3 2024', title: 'Mobile Apps', description: 'iOS and Android release' },
        { date: 'Q4 2024', title: 'Enterprise', description: 'Enterprise features rollout' },
      ],
    },
  },
  process: {
    type: 'process',
    displayName: 'Process Slide',
    description:
      'Step-by-step process flow with titles and descriptions. Multiple layout options (horizontal, vertical, grid).',
    category: 'Process & Timeline',
    requiredFields: ['title', 'steps'],
    optionalFields: ['layout'],
    schema: {
      type: '"process"',
      title: 'string',
      steps: 'array of objects { title: string, description?: string }',
      layout: '"horizontal" | "vertical" | "grid" (optional)',
    },
    example: {
      type: 'process',
      title: 'Our Methodology',
      steps: [
        { title: 'Discover', description: 'Research and understand your needs' },
        { title: 'Design', description: 'Create tailored solutions' },
        { title: 'Develop', description: 'Build and iterate' },
        { title: 'Deploy', description: 'Launch and support' },
      ],
      layout: 'horizontal',
    },
  },
  comparison: {
    type: 'comparison',
    displayName: 'Comparison Slide',
    description:
      'Side-by-side comparison of two options, products, or approaches. Clear visual differentiation.',
    category: 'Content',
    requiredFields: ['title', 'leftTitle', 'leftContent', 'rightTitle', 'rightContent'],
    optionalFields: [],
    schema: {
      type: '"comparison"',
      title: 'string',
      leftTitle: 'string',
      leftContent: 'string[]',
      rightTitle: 'string',
      rightContent: 'string[]',
    },
    example: {
      type: 'comparison',
      title: 'Old vs New Approach',
      leftTitle: 'Traditional Method',
      leftContent: ['Manual data entry', 'Weekly reports', 'Limited visibility'],
      rightTitle: 'Our Solution',
      rightContent: ['Automated data sync', 'Real-time dashboards', 'Complete transparency'],
    },
  },
  'product-overview': {
    type: 'product-overview',
    displayName: 'Product Overview',
    description:
      'Comprehensive product showcase with image, description, features, and pricing. Multiple layout options.',
    category: 'Product',
    requiredFields: ['title', 'features'],
    optionalFields: ['productImage', 'description', 'pricing', 'layout'],
    schema: {
      type: '"product-overview"',
      title: 'string',
      productImage: 'string (optional)',
      description: 'string (optional)',
      features: 'string[]',
      pricing: 'object { price: string, period?: string, cta?: string } (optional)',
      layout: '"image-left" | "image-right" | "image-top" (optional)',
    },
    example: {
      type: 'product-overview',
      title: 'Professional Plan',
      productImage: 'https://example.com/product.png',
      description: 'Everything you need to scale your team',
      features: [
        'Unlimited projects',
        'Advanced analytics',
        'Priority support',
        'Custom integrations',
      ],
      pricing: {
        price: '$49',
        period: 'per user/month',
        cta: 'Start free trial',
      },
    },
  },
  'section-header': {
    type: 'section-header',
    displayName: 'Section Header',
    description:
      'Visual divider between presentation sections with title and optional subtitle.',
    category: 'Title & Impact',
    requiredFields: ['title'],
    optionalFields: ['subtitle'],
    schema: {
      type: '"section-header"',
      title: 'string',
      subtitle: 'string (optional)',
    },
    example: {
      type: 'section-header',
      title: 'Market Analysis',
      subtitle: 'Current trends and opportunities',
    },
  },
  blank: {
    type: 'blank',
    displayName: 'Blank Slide',
    description:
      'Empty slide for custom content or live demonstrations. Optional placeholder content.',
    category: 'Content',
    requiredFields: [],
    optionalFields: ['content'],
    schema: {
      type: '"blank"',
      content: 'string (optional)',
    },
    example: {
      type: 'blank',
      content: 'Custom content area',
    },
  },
};

/**
 * Template categories for organization
 */
export const TEMPLATE_CATEGORIES = {
  'Title & Impact': ['title', 'hero', 'section-header'],
  Content: ['content', 'two-column', 'three-column', 'four-column', 'quote', 'comparison', 'blank'],
  'Data & Metrics': ['data', 'chart-with-metrics'],
  'Process & Timeline': ['timeline', 'process'],
  Media: ['media'],
  Product: ['product-overview'],
} as const;

/**
 * Template resource handler
 */
export class TemplateResourceHandler implements ResourceHandler {
  private readonly baseUri = 'slideyui://templates';

  /**
   * List all template resources
   */
  list(): Resource[] {
    const templates = Object.keys(TEMPLATE_METADATA) as SlideType[];

    return [
      {
        uri: this.baseUri,
        name: 'All Templates',
        description: 'List of all available slide templates',
        mimeType: 'application/json',
      },
      ...templates.map((template) => ({
        uri: `${this.baseUri}/${template}`,
        name: TEMPLATE_METADATA[template].displayName,
        description: TEMPLATE_METADATA[template].description,
        mimeType: 'application/json',
      })),
    ];
  }

  /**
   * Read template resource
   */
  read(uri: string): ResourceContent {
    if (uri === this.baseUri) {
      // Return list of all templates grouped by category
      const templatesByCategory: Record<string, TemplateMetadata[]> = {};

      for (const [category, templateTypes] of Object.entries(TEMPLATE_CATEGORIES)) {
        templatesByCategory[category] = templateTypes.map(
          (type) => TEMPLATE_METADATA[type as SlideType]
        );
      }

      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(
          {
            totalTemplates: Object.keys(TEMPLATE_METADATA).length,
            categories: templatesByCategory,
            templates: Object.values(TEMPLATE_METADATA),
          },
          null,
          2
        ),
      };
    }

    // Extract template type from URI
    const templateType = uri.replace(`${this.baseUri}/`, '') as SlideType;

    if (!TEMPLATE_METADATA[templateType]) {
      throw new Error(`Template not found: ${templateType}`);
    }

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(TEMPLATE_METADATA[templateType], null, 2),
    };
  }

  /**
   * Check if URI is a template resource
   */
  canHandle(uri: string): boolean {
    return uri.startsWith(this.baseUri);
  }
}

/**
 * Get template metadata by type
 */
export function getTemplateMetadata(type: SlideType): TemplateMetadata {
  return TEMPLATE_METADATA[type];
}

/**
 * Get all template types
 */
export function getAllTemplateTypes(): SlideType[] {
  return Object.keys(TEMPLATE_METADATA) as SlideType[];
}
