/**
 * Simple test for JSON export functionality
 *
 * Run this file to verify the JSON export works correctly
 * Usage: node --loader ts-node/esm test-json-export.ts
 */

import { exportPresentationTool } from '../src/tools/export-presentation.js';
import type { PresentationSpec } from '../src/types/index.js';

// Minimal presentation for testing
const minimalPresentation: PresentationSpec = {
  theme: 'corporate',
  title: 'Test Presentation',
  slides: [
    {
      type: 'title',
      title: 'Test Slide',
      subtitle: 'Testing JSON Export',
    },
  ],
};

// Comprehensive presentation for testing
const fullPresentation: PresentationSpec = {
  theme: 'pitch-deck',
  title: 'Full Test Presentation',
  slides: [
    {
      type: 'title',
      id: 'slide-1',
      title: 'Welcome',
      subtitle: 'A comprehensive test',
      author: 'Test Author',
    },
    {
      type: 'content',
      id: 'slide-2',
      title: 'Features',
      content: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
  ],
  options: {
    aspectRatio: '16:9',
    fontSize: 'large',
    minify: true,
  },
  metadata: {
    author: 'Test Author',
    date: '2024-12-01',
    description: 'A test presentation',
    tags: ['test', 'example'],
  },
};

async function runTests() {
  console.log('=== Testing JSON Export Functionality ===\n');

  // Test 1: Minimal presentation
  console.log('Test 1: Minimal Presentation Export');
  try {
    const result1 = await exportPresentationTool.handler({
      format: 'json',
      presentationData: minimalPresentation,
    });

    console.log('✓ Export successful');
    console.log('  Filename:', result1.filename);
    console.log('  Content Type:', result1.contentType);

    const data1 = JSON.parse(result1.content);
    console.log('✓ JSON is valid');
    console.log('  Version:', data1.version);
    console.log('  Slide Count:', data1.metadata.slideCount);
    console.log('  Theme:', data1.metadata.theme);
    console.log();
  } catch (error) {
    console.error('✗ Test 1 failed:', error);
    process.exit(1);
  }

  // Test 2: Full presentation with all options
  console.log('Test 2: Full Presentation Export');
  try {
    const result2 = await exportPresentationTool.handler({
      format: 'json',
      presentationData: fullPresentation,
      filename: 'custom-name',
    });

    console.log('✓ Export successful');
    console.log('  Filename:', result2.filename);

    const data2 = JSON.parse(result2.content);
    console.log('✓ JSON is valid');
    console.log('  Version:', data2.version);
    console.log('  Title:', data2.metadata.title);
    console.log('  Author:', data2.metadata.author);
    console.log('  Slide Count:', data2.metadata.slideCount);
    console.log('  Tags:', data2.metadata.tags?.join(', '));
    console.log('  Aspect Ratio:', data2.config.aspectRatio);
    console.log('  Font Size:', data2.config.fontSize);
    console.log();

    // Verify all slides are present
    if (data2.slides.length !== fullPresentation.slides.length) {
      throw new Error('Slide count mismatch');
    }
    console.log('✓ All slides exported correctly');

    // Verify slide structure
    data2.slides.forEach((slide: any, index: number) => {
      if (!slide.id || !slide.type || !slide.content || slide.index !== index) {
        throw new Error(`Slide ${index} has invalid structure`);
      }
    });
    console.log('✓ Slide structure is correct');
    console.log();
  } catch (error) {
    console.error('✗ Test 2 failed:', error);
    process.exit(1);
  }

  // Test 3: Error handling - missing presentationData
  console.log('Test 3: Error Handling');
  try {
    await exportPresentationTool.handler({
      format: 'json',
      // Missing presentationData
    });
    console.error('✗ Should have thrown error for missing presentationData');
    process.exit(1);
  } catch (error) {
    console.log('✓ Correctly throws error for missing presentationData');
    console.log();
  }

  // Test 4: Verify JSON format matches specification
  console.log('Test 4: JSON Format Validation');
  try {
    const result4 = await exportPresentationTool.handler({
      format: 'json',
      presentationData: fullPresentation,
    });

    const data = JSON.parse(result4.content);

    // Check required fields
    const requiredMetadataFields = ['title', 'createdAt', 'slideCount', 'theme', 'aspectRatio'];
    requiredMetadataFields.forEach(field => {
      if (!(field in data.metadata)) {
        throw new Error(`Missing required metadata field: ${field}`);
      }
    });
    console.log('✓ All required metadata fields present');

    // Check slides structure
    data.slides.forEach((slide: any) => {
      if (!slide.id || !slide.type || !slide.content || typeof slide.index !== 'number') {
        throw new Error('Invalid slide structure');
      }
    });
    console.log('✓ Slides have correct structure');

    // Check config
    if (!data.config.theme || !data.config.aspectRatio) {
      throw new Error('Missing required config fields');
    }
    console.log('✓ Config has required fields');
    console.log();
  } catch (error) {
    console.error('✗ Test 4 failed:', error);
    process.exit(1);
  }

  console.log('=== All Tests Passed! ===');
  console.log('\nJSON export format is working correctly.');
}

// Run tests
runTests().catch(error => {
  console.error('Test suite failed:', error);
  process.exit(1);
});
