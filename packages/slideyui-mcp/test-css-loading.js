/**
 * Test script for CSS loading functionality
 * Run with: node test-css-loading.js
 */

import { readFile, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { constants } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function fileExists(path) {
  try {
    await access(path, constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

function getCSSPaths() {
  return [
    // 1. Try built package in node_modules (production)
    resolve(__dirname, '../../../node_modules/@slideyui/core/dist/slideyui.css'),

    // 2. Try workspace package dist (monorepo development)
    resolve(__dirname, '../slideyui-core/dist/slideyui.css'),
    resolve(__dirname, '../slideyui-core/dist/index.css'),

    // 3. Try workspace package source files (fallback to source)
    resolve(__dirname, '../slideyui-core/src/index.css'),
  ];
}

async function loadCSSFromFile() {
  const paths = getCSSPaths();

  console.log('Testing CSS file paths:');
  for (const cssPath of paths) {
    const exists = await fileExists(cssPath);
    console.log(`  ${exists ? '✓' : '✗'} ${cssPath}`);

    if (exists) {
      try {
        const css = await readFile(cssPath, 'utf-8');
        console.log(`\n✓ Successfully loaded CSS from: ${cssPath}`);
        console.log(`  CSS size: ${css.length} bytes`);
        return css;
      } catch (error) {
        console.log(`  ✗ Error reading file: ${error.message}`);
      }
    }
  }

  return null;
}

async function loadCSSFromSource() {
  const srcDir = resolve(__dirname, '../slideyui-core/src');
  const sourceFiles = [
    'base.css',
    'components.css',
    'layouts.css',
    'typography.css',
    'animations.css',
  ];

  console.log('\nTesting CSS source files:');
  const cssBlocks = [];

  for (const file of sourceFiles) {
    const filePath = join(srcDir, file);
    const exists = await fileExists(filePath);
    console.log(`  ${exists ? '✓' : '✗'} ${filePath}`);

    if (exists) {
      try {
        const content = await readFile(filePath, 'utf-8');
        cssBlocks.push(content);
        console.log(`    Loaded ${content.length} bytes`);
      } catch (error) {
        console.log(`    Error: ${error.message}`);
      }
    }
  }

  if (cssBlocks.length > 0) {
    const totalCSS = cssBlocks.join('\n\n');
    console.log(`\n✓ Successfully loaded CSS from ${cssBlocks.length} source files`);
    console.log(`  Total CSS size: ${totalCSS.length} bytes`);
    return totalCSS;
  }

  return null;
}

async function main() {
  console.log('='.repeat(60));
  console.log('CSS Loading Test for SlideyUI MCP Server');
  console.log('='.repeat(60));
  console.log();

  // Test Strategy 1: Load from built file
  console.log('STRATEGY 1: Load from built package\n');
  const fileCSS = await loadCSSFromFile();

  if (!fileCSS) {
    console.log('\n✗ No built CSS file found, trying source files...\n');

    // Test Strategy 2: Load from source files
    console.log('STRATEGY 2: Load from source files\n');
    const sourceCSS = await loadCSSFromSource();

    if (!sourceCSS) {
      console.log('\n✗ No source CSS files found');
      console.log('   Will use embedded CSS constant as fallback\n');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('Test complete!');
  console.log('='.repeat(60));
}

main().catch(console.error);
