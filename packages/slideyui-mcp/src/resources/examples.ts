/**
 * Examples resource handler
 *
 * Provides complete example presentations that can be used as templates
 * or learning resources.
 */

import type {
  Resource,
  ResourceContent,
  ResourceHandler,
  ExampleMetadata,
} from './types.js';
import type { PresentationSpec } from '../types/index.js';

/**
 * Example presentation specifications
 */
const EXAMPLE_PRESENTATIONS: Record<string, ExampleMetadata> = {
  business: {
    category: 'business',
    displayName: 'Business Quarterly Review',
    description:
      'Complete quarterly business review presentation with financial data, metrics, and strategic updates',
    slideCount: 8,
    theme: 'corporate',
    tags: ['business', 'quarterly', 'financial', 'corporate'],
    presentation: {
      theme: 'corporate',
      title: 'Q4 2024 Business Review',
      slides: [
        {
          type: 'title',
          title: 'Q4 2024 Business Review',
          subtitle: 'Strategic Performance & Financial Update',
          author: 'Executive Team',
          date: 'December 2024',
        },
        {
          type: 'section-header',
          title: 'Financial Performance',
          subtitle: 'Revenue, growth, and key metrics',
        },
        {
          type: 'chart-with-metrics',
          title: 'Quarterly Revenue Performance',
          chart: {
            type: 'line',
            data: {
              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
              datasets: [
                {
                  label: 'Revenue',
                  data: [2.1, 2.4, 2.8, 3.2],
                },
                {
                  label: 'Target',
                  data: [2.0, 2.3, 2.7, 3.0],
                },
              ],
            },
          },
          metrics: [
            {
              label: 'Total Revenue',
              value: '$3.2M',
              change: { value: 14, direction: 'up' },
            },
            {
              label: 'Growth Rate',
              value: '52%',
              change: { value: 8, direction: 'up' },
            },
            {
              label: 'Profit Margin',
              value: '28%',
              change: { value: 3, direction: 'up' },
            },
          ],
          layout: 'chart-left',
        },
        {
          type: 'data',
          title: 'Revenue by Product Line',
          dataType: 'chart',
          chartType: 'bar',
          data: {
            labels: ['Enterprise', 'Professional', 'Starter', 'Add-ons'],
            datasets: [
              {
                label: 'Q4 Revenue ($M)',
                data: [1.5, 0.9, 0.5, 0.3],
              },
            ],
          },
        },
        {
          type: 'section-header',
          title: 'Strategic Initiatives',
          subtitle: 'Key projects and achievements',
        },
        {
          type: 'three-column',
          title: 'Q4 Achievements',
          columns: [
            {
              heading: 'Product',
              icon: '🚀',
              content: [
                'Launched Enterprise tier',
                'Released mobile apps',
                'Added 12 integrations',
              ],
            },
            {
              heading: 'Growth',
              icon: '📈',
              content: [
                '40% customer growth',
                'Expanded to 3 new markets',
                'Partnership with TechCorp',
              ],
            },
            {
              heading: 'Team',
              icon: '👥',
              content: [
                'Hired 15 new team members',
                'Opened Austin office',
                'Employee satisfaction: 92%',
              ],
            },
          ],
        },
        {
          type: 'timeline',
          title: 'Q1 2025 Roadmap',
          events: [
            {
              date: 'January',
              title: 'Platform 2.0',
              description: 'Major platform upgrade with new features',
            },
            {
              date: 'February',
              title: 'API Launch',
              description: 'Public API and developer platform',
            },
            {
              date: 'March',
              title: 'European Expansion',
              description: 'Launch in UK, Germany, and France',
            },
          ],
          orientation: 'horizontal',
        },
        {
          type: 'content',
          title: 'Key Takeaways',
          content: [
            'Exceeded revenue targets by 14% in Q4',
            'Successfully launched Enterprise product line',
            'Strong momentum entering 2025',
            'Strategic focus on international expansion',
          ],
        },
      ],
      options: {
        aspectRatio: '16:9',
        fontSize: 'default',
      },
      metadata: {
        author: 'Executive Team',
        date: 'December 2024',
        description: 'Q4 2024 quarterly business review',
        tags: ['business', 'quarterly', 'financial'],
      },
    },
  },
  pitch: {
    category: 'pitch',
    displayName: 'Startup Pitch Deck',
    description:
      'Investor pitch deck for a startup, including problem, solution, market, and financial projections',
    slideCount: 10,
    theme: 'pitch-deck',
    tags: ['startup', 'pitch', 'investment', 'fundraising'],
    presentation: {
      theme: 'pitch-deck',
      title: 'Company Pitch Deck',
      slides: [
        {
          type: 'hero',
          title: 'Transforming Team Collaboration',
          subtitle: 'The AI-powered workspace for modern teams',
          callToAction: {
            text: 'Join the Revolution',
          },
        },
        {
          type: 'content',
          title: 'The Problem',
          content: [
            'Teams waste 2.5 hours daily on inefficient communication',
            'Information scattered across 10+ different tools',
            'Critical context lost in endless message threads',
            'Decision-making slowed by information silos',
          ],
        },
        {
          type: 'two-column',
          title: 'Our Solution',
          leftColumn: {
            type: 'image',
            content: 'https://via.placeholder.com/600x400',
          },
          rightColumn: {
            type: 'list',
            content: [
              'AI-powered unified workspace',
              'Automatic context extraction',
              'Real-time collaboration',
              'Intelligent search across all content',
              'Seamless integrations',
            ],
          },
          columnRatio: '50-50',
        },
        {
          type: 'data',
          title: 'Market Opportunity',
          dataType: 'chart',
          chartType: 'area',
          data: {
            labels: ['2024', '2025', '2026', '2027', '2028'],
            datasets: [
              {
                label: 'TAM ($B)',
                data: [45, 58, 72, 89, 110],
              },
            ],
          },
        },
        {
          type: 'product-overview',
          title: 'Professional Plan',
          description: 'Everything your team needs to collaborate effectively',
          features: [
            'Unlimited team members',
            'AI-powered insights',
            'Advanced security & compliance',
            'Priority support',
            'Custom integrations',
          ],
          pricing: {
            price: '$29',
            period: 'per user/month',
            cta: 'Start 14-day trial',
          },
          layout: 'image-left',
        },
        {
          type: 'three-column',
          title: 'Traction',
          columns: [
            {
              heading: '10K+',
              content: 'Active users across 500+ companies',
            },
            {
              heading: '40%',
              content: 'Month-over-month user growth',
            },
            {
              heading: '95%',
              content: 'Customer satisfaction score',
            },
          ],
        },
        {
          type: 'comparison',
          title: 'Competitive Advantage',
          leftTitle: 'Traditional Tools',
          leftContent: [
            'Multiple disconnected apps',
            'Manual information gathering',
            'Reactive workflow',
            'Limited intelligence',
          ],
          rightTitle: 'Our Platform',
          rightContent: [
            'Unified workspace',
            'AI-powered automation',
            'Proactive insights',
            'Advanced intelligence',
          ],
        },
        {
          type: 'content',
          title: 'Business Model',
          content: [
            'Freemium SaaS with seat-based pricing',
            'Professional: $29/user/month',
            'Enterprise: Custom pricing',
            'Average contract value: $12K annually',
            'Net revenue retention: 125%',
          ],
        },
        {
          type: 'data',
          title: 'Financial Projections',
          dataType: 'chart',
          chartType: 'bar',
          data: {
            labels: ['2024', '2025', '2026'],
            datasets: [
              {
                label: 'Revenue ($M)',
                data: [1.2, 4.5, 12.0],
              },
            ],
          },
        },
        {
          type: 'content',
          title: 'The Ask',
          content: [
            'Raising $5M Series A',
            'Accelerate product development',
            'Scale go-to-market team',
            'Expand to enterprise segment',
            'Strong investor interest from top-tier VCs',
          ],
        },
      ],
      options: {
        aspectRatio: '16:9',
        fontSize: 'default',
      },
    },
  },
  academic: {
    category: 'academic',
    displayName: 'Research Presentation',
    description:
      'Academic research presentation with methodology, findings, and conclusions',
    slideCount: 7,
    theme: 'academic',
    tags: ['research', 'academic', 'science', 'university'],
    presentation: {
      theme: 'academic',
      title: 'Research Presentation',
      slides: [
        {
          type: 'title',
          title: 'Machine Learning for Climate Prediction',
          subtitle: 'A Novel Approach to Long-term Forecasting',
          author: 'Dr. Sarah Chen, Department of Computer Science',
          date: 'December 2024',
        },
        {
          type: 'content',
          title: 'Research Objectives',
          content: [
            'Develop improved climate prediction models using ML',
            'Increase accuracy of 10-year forecasts',
            'Reduce computational requirements',
            'Enable real-time regional predictions',
          ],
        },
        {
          type: 'two-column',
          title: 'Methodology',
          leftColumn: {
            type: 'list',
            content: [
              'Data Collection',
              '- 50 years historical data',
              '- 1000+ weather stations',
              '- Satellite observations',
            ],
          },
          rightColumn: {
            type: 'list',
            content: [
              'Model Architecture',
              '- Ensemble neural networks',
              '- Transfer learning',
              '- Attention mechanisms',
            ],
          },
          columnRatio: '50-50',
        },
        {
          type: 'data',
          title: 'Model Performance Comparison',
          dataType: 'chart',
          chartType: 'bar',
          data: {
            labels: ['Baseline', 'Traditional ML', 'Our Model'],
            datasets: [
              {
                label: 'Accuracy (%)',
                data: [72, 81, 89],
              },
            ],
          },
        },
        {
          type: 'data',
          title: 'Temperature Prediction Results',
          dataType: 'chart',
          chartType: 'line',
          data: {
            labels: ['2024', '2025', '2026', '2027', '2028', '2029', '2030'],
            datasets: [
              {
                label: 'Predicted',
                data: [14.8, 15.0, 15.2, 15.4, 15.6, 15.8, 16.0],
              },
              {
                label: 'Baseline',
                data: [14.8, 14.9, 15.1, 15.3, 15.5, 15.7, 15.9],
              },
            ],
          },
        },
        {
          type: 'content',
          title: 'Key Findings',
          content: [
            '17% improvement in prediction accuracy',
            '60% reduction in computational time',
            'Effective for regional-scale predictions',
            'Validated across multiple climate zones',
          ],
        },
        {
          type: 'content',
          title: 'Conclusions & Future Work',
          content: [
            'ML shows significant promise for climate prediction',
            'Model generalizes well to different regions',
            'Future work: integration with policy models',
            'Next phase: real-time prediction system',
          ],
        },
      ],
      options: {
        aspectRatio: '16:9',
        fontSize: 'default',
      },
    },
  },
  workshop: {
    category: 'workshop',
    displayName: 'Training Workshop',
    description: 'Interactive training workshop presentation with exercises and activities',
    slideCount: 6,
    theme: 'workshop',
    tags: ['training', 'workshop', 'education', 'learning'],
    presentation: {
      theme: 'workshop',
      title: 'Effective Communication Workshop',
      slides: [
        {
          type: 'title',
          title: 'Effective Communication Skills',
          subtitle: 'Workshop for Team Leaders',
          author: 'Training Department',
          date: 'December 2024',
        },
        {
          type: 'content',
          title: 'Today\'s Agenda',
          content: [
            'Understanding communication styles (30 min)',
            'Active listening techniques (45 min)',
            'Giving effective feedback (30 min)',
            'Practical exercises (45 min)',
          ],
        },
        {
          type: 'four-column',
          title: 'Communication Styles',
          columns: [
            {
              heading: 'Direct',
              icon: '🎯',
              content: 'Clear, concise, to-the-point',
            },
            {
              heading: 'Analytical',
              icon: '📊',
              content: 'Data-driven, detailed, logical',
            },
            {
              heading: 'Supportive',
              icon: '🤝',
              content: 'Empathetic, collaborative, warm',
            },
            {
              heading: 'Expressive',
              icon: '✨',
              content: 'Enthusiastic, creative, engaging',
            },
          ],
        },
        {
          type: 'process',
          title: 'Active Listening Framework',
          steps: [
            {
              title: 'Focus',
              description: 'Give full attention to the speaker',
            },
            {
              title: 'Understand',
              description: 'Seek to comprehend their perspective',
            },
            {
              title: 'Clarify',
              description: 'Ask questions to confirm understanding',
            },
            {
              title: 'Respond',
              description: 'Provide thoughtful feedback',
            },
          ],
          layout: 'horizontal',
        },
        {
          type: 'comparison',
          title: 'Feedback: Do\'s and Don\'ts',
          leftTitle: 'Ineffective Feedback',
          leftContent: [
            'Vague and general',
            'Focused on person, not behavior',
            'Only negative points',
            'No actionable steps',
          ],
          rightTitle: 'Effective Feedback',
          rightContent: [
            'Specific and concrete',
            'Behavior-focused',
            'Balanced (positive + constructive)',
            'Clear action items',
          ],
        },
        {
          type: 'content',
          title: 'Key Takeaways',
          content: [
            'Adapt your style to your audience',
            'Practice active listening daily',
            'Give timely, specific feedback',
            'Remember: communication is a skill that improves with practice',
          ],
        },
      ],
      options: {
        aspectRatio: '16:9',
        fontSize: 'large',
      },
    },
  },
};

/**
 * Example categories
 */
export const EXAMPLE_CATEGORIES = ['business', 'pitch', 'academic', 'workshop'] as const;

/**
 * Examples resource handler
 */
export class ExamplesResourceHandler implements ResourceHandler {
  private readonly baseUri = 'slideyui://examples';

  /**
   * List all example resources
   */
  list(): Resource[] {
    const examples = Object.keys(EXAMPLE_PRESENTATIONS);

    return [
      {
        uri: this.baseUri,
        name: 'All Examples',
        description: 'List of all available example presentations',
        mimeType: 'application/json',
      },
      ...examples.map((example) => ({
        uri: `${this.baseUri}/${example}`,
        name: EXAMPLE_PRESENTATIONS[example].displayName,
        description: EXAMPLE_PRESENTATIONS[example].description,
        mimeType: 'application/json',
      })),
    ];
  }

  /**
   * Read example resource
   */
  read(uri: string): ResourceContent {
    if (uri === this.baseUri) {
      // Return list of all examples with metadata
      const examplesList = Object.entries(EXAMPLE_PRESENTATIONS).map(
        ([key, example]) => ({
          category: key,
          displayName: example.displayName,
          description: example.description,
          slideCount: example.slideCount,
          theme: example.theme,
          tags: example.tags,
          uri: `${this.baseUri}/${key}`,
        })
      );

      return {
        uri,
        mimeType: 'application/json',
        text: JSON.stringify(
          {
            totalExamples: examplesList.length,
            examples: examplesList,
          },
          null,
          2
        ),
      };
    }

    // Extract example category from URI
    const category = uri.replace(`${this.baseUri}/`, '');

    if (!EXAMPLE_PRESENTATIONS[category]) {
      throw new Error(`Example not found: ${category}`);
    }

    const example = EXAMPLE_PRESENTATIONS[category];

    return {
      uri,
      mimeType: 'application/json',
      text: JSON.stringify(
        {
          metadata: {
            displayName: example.displayName,
            description: example.description,
            slideCount: example.slideCount,
            theme: example.theme,
            tags: example.tags,
          },
          presentation: example.presentation,
        },
        null,
        2
      ),
    };
  }

  /**
   * Check if URI is an examples resource
   */
  canHandle(uri: string): boolean {
    return uri.startsWith(this.baseUri);
  }
}

/**
 * Get example by category
 */
export function getExample(category: string): PresentationSpec | undefined {
  const example = EXAMPLE_PRESENTATIONS[category];
  return example?.presentation as PresentationSpec;
}

/**
 * Get all example categories
 */
export function getAllExampleCategories(): string[] {
  return Object.keys(EXAMPLE_PRESENTATIONS);
}
