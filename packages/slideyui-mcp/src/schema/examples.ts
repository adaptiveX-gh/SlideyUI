/**
 * Schema examples for error messages and documentation
 *
 * Provides valid examples for each slide type and common patterns.
 * These are referenced in error messages to help users fix validation issues.
 */

/**
 * Example slides organized by type
 */
export const SCHEMA_EXAMPLES = {
  /**
   * Title slide example
   */
  title: {
    type: 'title',
    title: 'Presentation Title',
    subtitle: 'Optional subtitle',
    author: 'Author Name',
    date: '2024-01-15',
  },

  /**
   * Content slide example
   */
  content: {
    type: 'content',
    title: 'Key Points',
    content: [
      'First important point',
      'Second important point',
      'Third important point',
    ],
    layout: 'single-column',
  },

  /**
   * Media slide example - image
   */
  mediaImage: {
    type: 'media',
    title: 'Image Slide',
    mediaUrl: 'https://example.com/image.jpg',
    mediaType: 'image',
    caption: 'Optional image caption',
    layout: 'contained',
  },

  /**
   * Media slide example - video
   */
  mediaVideo: {
    type: 'media',
    title: 'Video Slide',
    mediaUrl: 'https://example.com/video.mp4',
    mediaType: 'video',
    layout: 'contained',
    video: {
      autoplay: true,
      loop: true,
      muted: true,
      controls: false,
    },
  },

  /**
   * Media slide example - hero layout
   */
  mediaHero: {
    type: 'media',
    title: 'Hero Title',
    subtitle: 'Hero Subtitle',
    mediaUrl: 'https://example.com/background.jpg',
    mediaType: 'image',
    layout: 'hero',
    overlay: {
      enabled: true,
      type: 'gradient',
      opacity: 0.7,
    },
    textStyle: {
      position: 'center',
      align: 'center',
      color: 'white',
      shadow: true,
    },
  },

  /**
   * Data slide example - table
   */
  dataTable: {
    type: 'data',
    title: 'Sales Data',
    dataType: 'table',
    data: [
      { region: 'North', sales: 100000, growth: '+15%' },
      { region: 'South', sales: 85000, growth: '+8%' },
      { region: 'East', sales: 120000, growth: '+22%' },
    ],
  },

  /**
   * Data slide example - chart
   */
  dataChart: {
    type: 'data',
    title: 'Revenue Trends',
    dataType: 'chart',
    chartType: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Revenue',
          data: [12000, 15000, 13000, 18000, 22000, 25000],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
        },
      ],
    },
  },

  /**
   * Quote slide example
   */
  quote: {
    type: 'quote',
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
    context: 'Apple CEO',
  },

  /**
   * Timeline slide example
   */
  timeline: {
    type: 'timeline',
    title: 'Project Milestones',
    events: [
      {
        date: '2024-01',
        title: 'Project Kickoff',
        description: 'Initial planning and team formation',
      },
      {
        date: '2024-03',
        title: 'Alpha Release',
        description: 'First internal testing version',
      },
      {
        date: '2024-06',
        title: 'Beta Release',
        description: 'Public beta testing begins',
      },
      {
        date: '2024-09',
        title: 'Production Launch',
        description: 'Full product release',
      },
    ],
    orientation: 'horizontal',
  },

  /**
   * Comparison slide example
   */
  comparison: {
    type: 'comparison',
    title: 'Feature Comparison',
    leftTitle: 'Free Plan',
    leftContent: ['Basic features', '10 users', 'Email support', '5GB storage'],
    rightTitle: 'Pro Plan',
    rightContent: [
      'All features',
      'Unlimited users',
      '24/7 phone support',
      'Unlimited storage',
    ],
  },

  /**
   * Process slide example
   */
  process: {
    type: 'process',
    title: 'Our Methodology',
    steps: [
      {
        title: 'Research',
        description: 'Understand the problem and user needs',
      },
      {
        title: 'Design',
        description: 'Create wireframes and prototypes',
      },
      {
        title: 'Develop',
        description: 'Build the solution with best practices',
      },
      {
        title: 'Test',
        description: 'Validate with real users',
      },
      {
        title: 'Launch',
        description: 'Deploy and monitor performance',
      },
    ],
    layout: 'horizontal',
  },

  /**
   * Section header slide example
   */
  sectionHeader: {
    type: 'section-header',
    title: 'Part Two: Implementation',
    subtitle: 'Building the Solution',
  },

  /**
   * Blank slide example
   */
  blank: {
    type: 'blank',
    content: 'Custom HTML or markdown content here',
  },

  /**
   * Hero slide example
   */
  hero: {
    type: 'hero',
    title: 'Transform Your Business',
    subtitle: 'Innovative solutions for modern challenges',
    backgroundImage: 'https://example.com/hero-bg.jpg',
    callToAction: {
      text: 'Get Started',
      url: 'https://example.com/signup',
    },
  },

  /**
   * Two-column slide example
   */
  twoColumn: {
    type: 'two-column',
    title: 'Features & Benefits',
    leftColumn: {
      type: 'list',
      content: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    rightColumn: {
      type: 'text',
      content: 'Detailed explanation of how these features benefit your workflow.',
    },
    columnRatio: '50-50',
  },

  /**
   * Three-column slide example
   */
  threeColumn: {
    type: 'three-column',
    title: 'Our Services',
    columns: [
      {
        heading: 'Consulting',
        icon: 'briefcase',
        content: ['Strategic planning', 'Market analysis', 'Expert guidance'],
      },
      {
        heading: 'Development',
        icon: 'settings',
        content: ['Custom software', 'API integration', 'Cloud deployment'],
      },
      {
        heading: 'Support',
        icon: 'users',
        content: ['24/7 availability', 'Training', 'Maintenance'],
      },
    ],
  },

  /**
   * Four-column slide example
   */
  fourColumn: {
    type: 'four-column',
    title: 'Key Metrics',
    columns: [
      {
        heading: 'Users',
        icon: 'users',
        content: '10,000+',
      },
      {
        heading: 'Growth',
        icon: 'trend-up',
        content: '+250%',
      },
      {
        heading: 'Revenue',
        icon: 'chart-line',
        content: '$5M',
      },
      {
        heading: 'Rating',
        icon: 'star',
        content: '4.9/5',
      },
    ],
  },

  /**
   * Chart with metrics slide example
   */
  chartWithMetrics: {
    type: 'chart-with-metrics',
    title: 'Q4 Performance',
    chart: {
      type: 'line',
      data: {
        labels: ['Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Sales',
            data: [45000, 52000, 61000],
          },
        ],
      },
    },
    metrics: [
      {
        label: 'Total Revenue',
        value: '$158K',
        change: {
          value: 18,
          direction: 'up',
        },
      },
      {
        label: 'New Customers',
        value: '342',
        change: {
          value: 12,
          direction: 'up',
        },
      },
      {
        label: 'Churn Rate',
        value: '2.1%',
        change: {
          value: 0.5,
          direction: 'down',
        },
      },
    ],
    layout: 'chart-left',
  },

  /**
   * Product overview slide example
   */
  productOverview: {
    type: 'product-overview',
    title: 'Introducing Product X',
    productImage: 'https://example.com/product.png',
    description: 'Revolutionary product that solves your biggest challenges.',
    features: [
      'Easy to use interface',
      'Cloud-based synchronization',
      'Advanced security features',
      'Real-time collaboration',
    ],
    pricing: {
      price: '$99/month',
      period: 'per user',
      cta: 'Start Free Trial',
    },
    layout: 'image-left',
  },
} as const;

/**
 * Complete presentation examples
 */
export const PRESENTATION_EXAMPLES = {
  /**
   * Minimal valid presentation
   */
  minimal: {
    theme: 'corporate',
    title: 'My Presentation',
    slides: [
      {
        type: 'title',
        title: 'Welcome',
        subtitle: 'A brief introduction',
      },
    ],
  },

  /**
   * Complete presentation with multiple slide types
   */
  complete: {
    theme: 'pitch-deck',
    title: 'Product Launch Presentation',
    slides: [
      {
        type: 'title',
        title: 'Product Launch 2024',
        subtitle: 'Introducing the Future',
        author: 'Product Team',
        date: '2024-01-15',
      },
      {
        type: 'content',
        title: 'Executive Summary',
        content: [
          'Market opportunity: $10B TAM',
          'Innovative solution approach',
          'Strong team and traction',
        ],
      },
      {
        type: 'media',
        title: 'Product Demo',
        mediaUrl: 'https://example.com/demo.jpg',
        mediaType: 'image',
        layout: 'contained',
      },
    ],
    options: {
      aspectRatio: '16:9',
      fontSize: 'default',
      layoutDensity: 'normal',
    },
    metadata: {
      author: 'Product Team',
      date: '2024-01-15',
      version: '1.0',
      description: 'Q1 2024 product launch presentation',
      tags: ['product', 'launch', '2024'],
    },
  },
} as const;

/**
 * Get example for a specific slide type
 *
 * @param slideType - Type of slide
 * @returns Example slide object or null if not found
 */
export function getSlideExample(slideType: string): unknown {
  // Map slide types to example keys
  const exampleMap: Record<string, keyof typeof SCHEMA_EXAMPLES> = {
    title: 'title',
    content: 'content',
    media: 'mediaImage',
    data: 'dataChart',
    quote: 'quote',
    timeline: 'timeline',
    comparison: 'comparison',
    process: 'process',
    'section-header': 'sectionHeader',
    blank: 'blank',
    hero: 'hero',
    'two-column': 'twoColumn',
    'three-column': 'threeColumn',
    'four-column': 'fourColumn',
    'chart-with-metrics': 'chartWithMetrics',
    'product-overview': 'productOverview',
  };

  const exampleKey = exampleMap[slideType];
  return exampleKey ? SCHEMA_EXAMPLES[exampleKey] : null;
}

/**
 * Format example as a JSON string
 *
 * @param example - Example object
 * @returns Formatted JSON string
 */
export function formatExample(example: unknown): string {
  return JSON.stringify(example, null, 2);
}
