/**
 * SVG Generation Examples
 *
 * Demonstrates usage of the generate_svg MCP tool for creating
 * icons, patterns, charts, diagrams, and custom SVG graphics.
 */

import { generateSVGTool } from '../src/tools/generate-svg.js';

/**
 * Example 1: Generate an icon
 */
async function exampleGenerateIcon() {
  console.log('\n=== Example 1: Generate Icon ===');

  const result = await generateSVGTool.handler({
    type: 'icon',
    iconName: 'check',
    size: 64,
    color: '#10b981',
    theme: 'corporate',
  });

  console.log('Result:', result);
  if (result.success) {
    console.log('SVG Length:', result.svg.length, 'characters');
    console.log('SVG Preview:', result.svg.substring(0, 200) + '...');
  }
}

/**
 * Example 2: Generate a pattern
 */
async function exampleGeneratePattern() {
  console.log('\n=== Example 2: Generate Pattern ===');

  const result = await generateSVGTool.handler({
    type: 'pattern',
    patternType: 'dots',
    width: 1920,
    height: 1080,
    theme: 'startup',
    opacity: 0.05,
    density: 'medium',
  });

  console.log('Result:', result);
  if (result.success) {
    console.log('SVG Length:', result.svg.length, 'characters');
  }
}

/**
 * Example 3: Generate a chart
 */
async function exampleGenerateChart() {
  console.log('\n=== Example 3: Generate Chart ===');

  const result = await generateSVGTool.handler({
    type: 'chart',
    chartType: 'bar',
    chartData: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Revenue',
          data: [65, 75, 85, 95],
          backgroundColor: '#1e40af',
        },
      ],
    },
    width: 800,
    height: 400,
    theme: 'corporate',
  });

  console.log('Result:', result);
  if (result.success) {
    console.log('SVG Length:', result.svg.length, 'characters');
  }
}

/**
 * Example 4: Generate multiple icons for a presentation
 */
async function exampleMultipleIcons() {
  console.log('\n=== Example 4: Multiple Icons ===');

  const icons = ['briefcase', 'users', 'chart-line', 'star'];

  for (const iconName of icons) {
    const result = await generateSVGTool.handler({
      type: 'icon',
      iconName,
      size: 48,
      color: '#7c3aed',
      theme: 'pitch-deck',
    });

    if (result.success) {
      console.log(`${iconName}: Generated successfully`);
    }
  }
}

/**
 * Example 5: Generate pattern for hero slide background
 */
async function exampleHeroPattern() {
  console.log('\n=== Example 5: Hero Slide Pattern ===');

  const result = await generateSVGTool.handler({
    type: 'pattern',
    patternType: 'gradient-mesh',
    width: 1920,
    height: 1080,
    theme: 'startup',
    opacity: 0.1,
    color: 'primary',
  });

  console.log('Result:', result);
  if (result.success) {
    console.log('Pattern generated for hero slide background');
  }
}

/**
 * Example 6: Generate status icons
 */
async function exampleStatusIcons() {
  console.log('\n=== Example 6: Status Icons ===');

  const statusIcons = [
    { name: 'success', color: '#10b981' },
    { name: 'error', color: '#ef4444' },
    { name: 'warning', color: '#f59e0b' },
    { name: 'info', color: '#3b82f6' },
  ];

  for (const icon of statusIcons) {
    const result = await generateSVGTool.handler({
      type: 'icon',
      iconName: icon.name,
      size: 32,
      color: icon.color,
      strokeWidth: 2,
    });

    if (result.success) {
      console.log(`${icon.name}: ${icon.color}`);
    }
  }
}

/**
 * Example 7: Generate diagram placeholder
 */
async function exampleDiagram() {
  console.log('\n=== Example 7: Diagram ===');

  const result = await generateSVGTool.handler({
    type: 'diagram',
    width: 800,
    height: 600,
    theme: 'academic',
  });

  console.log('Result:', result);
  if (result.success) {
    console.log('Diagram generated successfully');
  }
}

/**
 * Example 8: Generate custom SVG
 */
async function exampleCustomSVG() {
  console.log('\n=== Example 8: Custom SVG ===');

  const result = await generateSVGTool.handler({
    type: 'custom',
    customInstructions: 'Welcome to SlideyUI',
    width: 600,
    height: 400,
    theme: 'workshop',
  });

  console.log('Result:', result);
  if (result.success) {
    console.log('Custom SVG generated');
  }
}

/**
 * Run all examples
 */
async function runAllExamples() {
  try {
    await exampleGenerateIcon();
    await exampleGeneratePattern();
    await exampleGenerateChart();
    await exampleMultipleIcons();
    await exampleHeroPattern();
    await exampleStatusIcons();
    await exampleDiagram();
    await exampleCustomSVG();

    console.log('\n All examples completed successfully!');
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run examples if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllExamples();
}

export {
  exampleGenerateIcon,
  exampleGeneratePattern,
  exampleGenerateChart,
  exampleMultipleIcons,
  exampleHeroPattern,
  exampleStatusIcons,
  exampleDiagram,
  exampleCustomSVG,
};
