/**
 * Example: Export Presentation as JSON
 *
 * Demonstrates how to use the export_presentation tool with JSON format
 * to get structured presentation data for programmatic access.
 */

import { exportPresentationTool } from '../src/tools/export-presentation.js';
import type { PresentationSpec } from '../src/types/index.js';

// Example presentation specification
const presentationSpec: PresentationSpec = {
  theme: 'corporate',
  title: 'Quarterly Business Review',
  slides: [
    {
      type: 'title',
      title: 'Q4 2024 Business Review',
      subtitle: 'Performance Highlights and Strategic Initiatives',
      author: 'Jane Smith',
      date: '2024-12-15',
    },
    {
      type: 'content',
      title: 'Key Achievements',
      content: [
        'Revenue grew 25% year-over-year',
        'Launched 3 new product features',
        'Expanded to 5 new markets',
        'Customer satisfaction score: 4.8/5.0',
      ],
    },
    {
      type: 'data',
      title: 'Revenue Breakdown by Region',
      dataType: 'chart',
      chartType: 'bar',
      data: [
        { region: 'North America', revenue: 450000 },
        { region: 'Europe', revenue: 320000 },
        { region: 'Asia Pacific', revenue: 280000 },
        { region: 'Latin America', revenue: 150000 },
      ],
    },
    {
      type: 'timeline',
      title: 'Product Roadmap 2025',
      events: [
        {
          date: 'Q1 2025',
          title: 'Mobile App Launch',
          description: 'iOS and Android applications',
        },
        {
          date: 'Q2 2025',
          title: 'AI Integration',
          description: 'Smart recommendations engine',
        },
        {
          date: 'Q3 2025',
          title: 'Enterprise Features',
          description: 'Advanced security and compliance',
        },
      ],
    },
    {
      type: 'quote',
      quote: 'This has been our strongest quarter yet. The team has delivered exceptional results.',
      author: 'John Doe',
      context: 'CEO, Annual Meeting',
    },
  ],
  options: {
    aspectRatio: '16:9',
    fontSize: 'default',
    minify: false,
    includeSlideyUICSS: true,
    embedFonts: true,
  },
  metadata: {
    author: 'Jane Smith',
    date: '2024-12-15',
    version: '1.0',
    description: 'Quarterly business review presentation highlighting Q4 2024 performance',
    tags: ['business', 'quarterly-review', 'q4-2024', 'performance'],
  },
};

async function exportAsJSON() {
  try {
    // Export the presentation as JSON
    const result = await exportPresentationTool.handler({
      format: 'json',
      presentationData: presentationSpec,
      filename: 'quarterly-review-q4-2024',
    });

    console.log('Export successful!');
    console.log('Format:', result.format);
    console.log('Filename:', result.filename);
    console.log('Content Type:', result.contentType);
    console.log('Instructions:', result.instructions);
    console.log('\nJSON Output:\n');
    console.log(result.content);

    // Parse the JSON to verify structure
    const exportedData = JSON.parse(result.content);
    console.log('\n--- Exported Data Summary ---');
    console.log('Version:', exportedData.version);
    console.log('Title:', exportedData.metadata.title);
    console.log('Author:', exportedData.metadata.author);
    console.log('Slide Count:', exportedData.metadata.slideCount);
    console.log('Theme:', exportedData.metadata.theme);
    console.log('Aspect Ratio:', exportedData.metadata.aspectRatio);
    console.log('Created At:', exportedData.metadata.createdAt);
    console.log('Tags:', exportedData.metadata.tags?.join(', '));
    console.log('\nSlides:');
    exportedData.slides.forEach((slide: any, index: number) => {
      console.log(`  ${index + 1}. ${slide.type} (ID: ${slide.id})`);
    });

  } catch (error) {
    console.error('Export failed:', error);
    throw error;
  }
}

// Run the example
exportAsJSON();
