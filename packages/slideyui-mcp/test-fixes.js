#!/usr/bin/env node

/**
 * Quick test to verify CSS theming and navigation fixes
 */

import { generatePresentation } from './dist/index.js';
import { writeFileSync } from 'fs';

console.log('🧪 Testing CSS Theming and Navigation Fixes\n');

// Test 1: Corporate Theme Colors
console.log('Test 1: Creating presentation with corporate theme...');
const corporatePresentation = {
  title: 'Corporate Theme Test',
  theme: 'corporate',
  slides: [
    {
      type: 'title',
      title: 'Corporate Theme Test',
      subtitle: 'Testing theme colors'
    },
    {
      type: 'content',
      title: 'Key Features',
      layout: 'single-column',
      items: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      type: 'data',
      title: 'Revenue Chart',
      dataType: 'chart',
      chartType: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3'],
        datasets: [{
          label: 'Revenue',
          data: [100, 150, 200]
        }]
      }
    }
  ]
};

try {
  const result = generatePresentation(corporatePresentation);

  // Check 1: Theme attribute present
  const hasThemeAttr = result.includes('data-theme="corporate"');
  console.log(`  ${hasThemeAttr ? '✅' : '❌'} data-theme="corporate" attribute: ${hasThemeAttr ? 'FOUND' : 'MISSING'}`);

  // Check 2: CSS variables defined
  const hasCSSVars = result.includes('--slidey-primary') && result.includes('--slidey-accent');
  console.log(`  ${hasCSSVars ? '✅' : '❌'} CSS variables defined: ${hasCSSVars ? 'YES' : 'NO'}`);

  // Check 3: CSS variables used in component styles
  const usesVarPrimary = result.includes('var(--slidey-primary)');
  const usesVarAccent = result.includes('var(--slidey-accent)');
  const usesVarBg = result.includes('var(--slidey-background)');
  console.log(`  ${usesVarPrimary ? '✅' : '❌'} Uses var(--slidey-primary): ${usesVarPrimary ? 'YES' : 'NO'}`);
  console.log(`  ${usesVarAccent ? '✅' : '❌'} Uses var(--slidey-accent): ${usesVarAccent ? 'YES' : 'NO'}`);
  console.log(`  ${usesVarBg ? '✅' : '❌'} Uses var(--slidey-background): ${usesVarBg ? 'YES' : 'NO'}`);

  // Check 4: No problematic :first-child rule
  const hasFirstChildBug = result.includes('.slideyui-slide:first-child { display: block');
  console.log(`  ${!hasFirstChildBug ? '✅' : '❌'} No :first-child bug: ${!hasFirstChildBug ? 'CLEAN' : 'STILL PRESENT'}`);

  // Check 5: Active slide styling
  const hasActiveStyle = result.includes('.slideyui-slide.active');
  console.log(`  ${hasActiveStyle ? '✅' : '❌'} Active slide styling: ${hasActiveStyle ? 'PRESENT' : 'MISSING'}`);

  // Save test file
  writeFileSync('test-corporate-theme.html', result);
  console.log(`  💾 Saved to: test-corporate-theme.html\n`);

} catch (error) {
  console.error('  ❌ Error:', error.message, '\n');
}

// Test 2: Pitch-Deck Theme (Dark Theme)
console.log('Test 2: Creating presentation with pitch-deck theme...');
const pitchDeckPresentation = {
  title: 'Pitch Deck Theme Test',
  theme: 'pitch-deck',
  slides: [
    {
      type: 'hero',
      title: 'Welcome to Our Startup',
      subtitle: 'Revolutionizing the industry',
      callToAction: {
        text: 'Get Started',
        url: '#'
      }
    },
    {
      type: 'two-column',
      title: 'Problem vs Solution',
      leftColumn: {
        type: 'text',
        content: 'The problem we solve'
      },
      rightColumn: {
        type: 'text',
        content: 'Our innovative solution'
      }
    }
  ]
};

try {
  const result = generatePresentation(pitchDeckPresentation);

  const hasThemeAttr = result.includes('data-theme="pitch-deck"');
  console.log(`  ${hasThemeAttr ? '✅' : '❌'} data-theme="pitch-deck" attribute: ${hasThemeAttr ? 'FOUND' : 'MISSING'}`);

  const hasPurpleColor = result.includes('#7c3aed');
  console.log(`  ${hasPurpleColor ? '✅' : '❌'} Purple theme color (#7c3aed): ${hasPurpleColor ? 'FOUND' : 'MISSING'}`);

  const hasDarkBg = result.includes('#0f172a');
  console.log(`  ${hasDarkBg ? '✅' : '❌'} Dark background (#0f172a): ${hasDarkBg ? 'FOUND' : 'MISSING'}`);

  writeFileSync('test-pitch-deck-theme.html', result);
  console.log(`  💾 Saved to: test-pitch-deck-theme.html\n`);

} catch (error) {
  console.error('  ❌ Error:', error.message, '\n');
}

// Test 3: Multi-slide Navigation
console.log('Test 3: Creating 5-slide presentation to test navigation...');
const multiSlidePresentation = {
  title: 'Navigation Test',
  theme: 'startup',
  slides: [
    { type: 'title', title: 'Slide 1' },
    { type: 'content', title: 'Slide 2', layout: 'single-column', items: ['Item 1'] },
    { type: 'content', title: 'Slide 3', layout: 'single-column', items: ['Item 2'] },
    { type: 'content', title: 'Slide 4', layout: 'single-column', items: ['Item 3'] },
    { type: 'content', title: 'Slide 5', layout: 'single-column', items: ['Item 4'] }
  ]
};

try {
  const result = generatePresentation(multiSlidePresentation);

  const slideCount = (result.match(/class="slideyui-slide"/g) || []).length;
  console.log(`  ${slideCount === 5 ? '✅' : '❌'} Slide count: ${slideCount} (expected 5)`);

  const hasNavigation = result.includes('showSlide(') && result.includes('currentSlide');
  console.log(`  ${hasNavigation ? '✅' : '❌'} Navigation JavaScript: ${hasNavigation ? 'PRESENT' : 'MISSING'}`);

  const hasKeyboardNav = result.includes('ArrowLeft') && result.includes('ArrowRight');
  console.log(`  ${hasKeyboardNav ? '✅' : '❌'} Keyboard navigation: ${hasKeyboardNav ? 'PRESENT' : 'MISSING'}`);

  writeFileSync('test-navigation.html', result);
  console.log(`  💾 Saved to: test-navigation.html\n`);

} catch (error) {
  console.error('  ❌ Error:', error.message, '\n');
}

console.log('📊 Test Summary:');
console.log('  Open the HTML files in your browser to verify:');
console.log('  - test-corporate-theme.html (blue corporate colors)');
console.log('  - test-pitch-deck-theme.html (purple with dark background)');
console.log('  - test-navigation.html (5 slides with working navigation)');
console.log('\n✅ All tests completed!\n');
