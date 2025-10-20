#!/usr/bin/env node

/**
 * Test Script for SlideyUI MCP Server
 *
 * This script tests the MCP protocol by sending requests to the server
 * and verifying the responses. Run this before testing with Claude Desktop.
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🧪 Testing SlideyUI MCP Server Protocol\n');

// Start the MCP server
const serverPath = join(__dirname, 'dist', 'server.js');
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

let responseBuffer = '';
let testsPassed = 0;
let testsFailed = 0;

// Handle server output
server.stdout.on('data', (data) => {
  responseBuffer += data.toString();

  // Try to parse JSON-RPC responses
  const lines = responseBuffer.split('\n');
  responseBuffer = lines.pop() || ''; // Keep incomplete line

  lines.forEach(line => {
    if (line.trim()) {
      try {
        const response = JSON.parse(line);
        handleResponse(response);
      } catch (e) {
        // Not JSON, probably a log message
        if (line.includes('started successfully')) {
          console.log('✅ Server started successfully\n');
          runTests();
        }
      }
    }
  });
});

server.stderr.on('data', (data) => {
  console.error('❌ Server error:', data.toString());
});

server.on('close', (code) => {
  console.log(`\n📊 Test Results:`);
  console.log(`   ✅ Passed: ${testsPassed}`);
  console.log(`   ❌ Failed: ${testsFailed}`);
  console.log(`   📈 Total:  ${testsPassed + testsFailed}`);

  if (testsFailed === 0) {
    console.log('\n🎉 All tests passed! MCP server is ready for Claude Desktop.\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Some tests failed. Check the output above.\n');
    process.exit(1);
  }
});

let currentTest = '';

function handleResponse(response) {
  if (response.result) {
    if (currentTest === 'list_tools') {
      console.log('✅ Test 1: list_tools');
      const tools = response.result.tools || [];
      console.log(`   Found ${tools.length} tools:`);
      tools.forEach(tool => {
        console.log(`   - ${tool.name}: ${tool.description.substring(0, 60)}...`);
      });

      const expectedTools = ['create_presentation', 'add_slide', 'update_slide', 'export_presentation'];
      const foundTools = tools.map(t => t.name);
      const allFound = expectedTools.every(t => foundTools.includes(t));

      if (allFound) {
        testsPassed++;
        console.log('   ✅ All expected tools found\n');
      } else {
        testsFailed++;
        console.log('   ❌ Missing tools:', expectedTools.filter(t => !foundTools.includes(t)), '\n');
      }

      currentTest = '';
      runNextTest();
    } else if (currentTest === 'list_resources') {
      console.log('✅ Test 2: list_resources');
      const resources = response.result.resources || [];
      console.log(`   Found ${resources.length} resources:`);
      resources.slice(0, 10).forEach(resource => {
        console.log(`   - ${resource.uri}: ${resource.name}`);
      });
      if (resources.length > 10) {
        console.log(`   ... and ${resources.length - 10} more`);
      }

      if (resources.length > 0) {
        testsPassed++;
        console.log('   ✅ Resources available\n');
      } else {
        testsFailed++;
        console.log('   ❌ No resources found\n');
      }

      currentTest = '';
      runNextTest();
    } else if (currentTest === 'read_theme_resource') {
      console.log('✅ Test 3: read_resource (theme)');
      const contents = response.result.contents || [];
      if (contents.length > 0) {
        const content = JSON.parse(contents[0].text);
        console.log(`   Theme: ${content.name}`);
        console.log(`   Display Name: ${content.displayName}`);
        console.log(`   Description: ${content.description.substring(0, 60)}...`);
        testsPassed++;
        console.log('   ✅ Theme resource read successfully\n');
      } else {
        testsFailed++;
        console.log('   ❌ No content returned\n');
      }

      currentTest = '';
      runNextTest();
    } else if (currentTest === 'create_simple_presentation') {
      console.log('✅ Test 4: create_presentation');
      const content = response.result.content || [];
      if (content.length > 0) {
        const result = content[0];
        console.log(`   Content length: ${result.text.length} characters`);
        console.log(`   Contains HTML: ${result.text.includes('<!DOCTYPE html>') ? 'Yes' : 'No'}`);
        testsPassed++;
        console.log('   ✅ Presentation created successfully\n');
      } else {
        testsFailed++;
        console.log('   ❌ No presentation content returned\n');
      }

      currentTest = '';

      // All tests complete, shutdown server
      setTimeout(() => {
        server.kill();
      }, 500);
    }
  } else if (response.error) {
    console.error(`❌ Test failed: ${currentTest}`);
    console.error(`   Error: ${response.error.message}`);
    testsFailed++;
    currentTest = '';
    runNextTest();
  }
}

let testIndex = 0;
const tests = [
  sendListTools,
  sendListResources,
  sendReadThemeResource,
  sendCreatePresentation
];

function runTests() {
  testIndex = 0;
  runNextTest();
}

function runNextTest() {
  if (testIndex < tests.length) {
    setTimeout(() => {
      tests[testIndex]();
      testIndex++;
    }, 100);
  }
}

function sendRequest(method, params = {}) {
  const request = {
    jsonrpc: '2.0',
    id: Date.now(),
    method,
    params
  };

  server.stdin.write(JSON.stringify(request) + '\n');
}

function sendListTools() {
  currentTest = 'list_tools';
  console.log('🧪 Test 1: Listing available tools...');
  sendRequest('tools/list');
}

function sendListResources() {
  currentTest = 'list_resources';
  console.log('🧪 Test 2: Listing available resources...');
  sendRequest('resources/list');
}

function sendReadThemeResource() {
  currentTest = 'read_theme_resource';
  console.log('🧪 Test 3: Reading theme resource...');
  sendRequest('resources/read', { uri: 'slideyui://themes/corporate' });
}

function sendCreatePresentation() {
  currentTest = 'create_simple_presentation';
  console.log('🧪 Test 4: Creating a simple presentation...');
  sendRequest('tools/call', {
    name: 'create_presentation',
    arguments: {
      title: 'Test Presentation',
      slides: [
        {
          type: 'title',
          title: 'Welcome',
          subtitle: 'A test presentation'
        },
        {
          type: 'content',
          title: 'Key Points',
          layout: 'single-column',
          items: ['Point 1', 'Point 2', 'Point 3']
        }
      ],
      theme: 'corporate'
    }
  });
}

// Timeout after 10 seconds
setTimeout(() => {
  console.error('\n⏱️  Test timeout - server not responding');
  server.kill();
  process.exit(1);
}, 10000);
