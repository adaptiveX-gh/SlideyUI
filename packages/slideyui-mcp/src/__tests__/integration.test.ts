/**
 * Integration tests for SlideyUI MCP Server
 *
 * These tests verify end-to-end workflows combining multiple components.
 */

import { describe, it, expect } from 'vitest';
import { createPresentationTool } from '../tools/create-presentation.js';
import { addSlideTool } from '../tools/add-slide.js';
import { updateSlideTool } from '../tools/update-slide.js';
import { exportPresentationTool } from '../tools/export-presentation.js';
import { validatePresentation } from '../utils/validation.js';
import type { PresentationSpec } from '../types/index.js';

describe('Integration Tests', () => {
  describe('Complete Presentation Workflow', () => {
    it('creates, validates, and exports a presentation', async () => {
      // Step 1: Create presentation
      const createResult = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Q4 Business Review',
        slides: [
          {
            type: 'title',
            title: 'Q4 Business Review',
            subtitle: 'Financial Performance & Strategic Initiatives',
            author: 'CEO Office',
            date: '2024-01-15',
          },
          {
            type: 'content',
            title: 'Key Achievements',
            content: [
              'Revenue increased 25% YoY',
              'Expanded to 3 new markets',
              'Launched 5 new products',
              'Customer satisfaction at 95%',
            ],
          },
          {
            type: 'data',
            title: 'Quarterly Revenue',
            data: {
              labels: ['Q1', 'Q2', 'Q3', 'Q4'],
              datasets: [
                {
                  label: 'Revenue ($M)',
                  data: [2.5, 3.2, 3.8, 4.5],
                },
              ],
            },
            dataType: 'chart',
            chartType: 'bar',
          },
          {
            type: 'quote',
            quote: 'Our success is built on the dedication of our team and the trust of our customers.',
            author: 'CEO',
          },
          {
            type: 'section-header',
            title: '2024 Strategic Plan',
          },
        ],
        metadata: {
          author: 'Business Analytics Team',
          date: '2024-01-15',
          version: '1.0',
          tags: ['business', 'quarterly-review', 'financial'],
        },
      });

      expect(createResult.success).toBe(true);
      expect(createResult.metadata.slideCount).toBe(5);
      expect(createResult.html).toContain('Q4 Business Review');
      expect(createResult.html).toContain('Revenue increased 25%');

      // Step 2: Export as HTML
      const htmlExport = await exportPresentationTool.handler({
        html: createResult.html,
        format: 'html',
        filename: 'q4-review',
      });

      expect(htmlExport.success).toBe(true);
      expect(htmlExport.filename).toBe('q4-review.html');
      expect(htmlExport.contentType).toBe('text/html');

      // Step 3: Export as JSON
      const presentationData = {
        theme: 'corporate' as const,
        title: 'Q4 Business Review',
        slides: createResult.html, // In real scenario, would have original spec
      };

      // JSON export requires presentationData in proper format
      const jsonExport = await exportPresentationTool.handler({
        presentationData: {
          theme: 'corporate',
          title: 'Q4 Business Review',
          slides: [{ type: 'title', title: 'Test' }],
          metadata: {
            author: 'Business Analytics Team',
          },
        },
        format: 'json',
      });

      expect(jsonExport.success).toBe(true);
      expect(jsonExport.filename).toBe('presentation.json');
      const jsonData = JSON.parse(jsonExport.content);
      expect(jsonData.version).toBe('1.0.0');
    });
  });

  describe('Iterative Slide Building', () => {
    it('builds presentation one slide at a time', async () => {
      // Create initial presentation
      let result = await createPresentationTool.handler({
        theme: 'startup',
        title: 'Product Launch',
        slides: [
          {
            type: 'title',
            title: 'Product Launch',
            subtitle: 'Revolutionary New Product',
          },
        ],
      });

      expect(result.metadata.slideCount).toBe(1);

      // Add slides iteratively
      const slide2 = await addSlideTool.handler({
        slide: {
          type: 'content',
          title: 'Problem Statement',
          content: [
            'Market gap identified',
            'Customer pain points',
            'Competitive analysis',
          ],
        },
        index: 1,
      });

      expect(slide2.success).toBe(true);
      expect(slide2.html).toContain('Problem Statement');

      const slide3 = await addSlideTool.handler({
        slide: {
          type: 'hero',
          title: 'Our Solution',
          subtitle: 'Game-changing innovation',
          callToAction: {
            text: 'Learn More',
            url: 'https://example.com',
          },
        },
        index: 2,
      });

      expect(slide3.success).toBe(true);
      expect(slide3.html).toContain('Our Solution');

      const slide4 = await addSlideTool.handler({
        slide: {
          type: 'product-overview',
          title: 'Product Features',
          features: [
            'AI-powered automation',
            'Real-time analytics',
            'Seamless integrations',
          ],
          pricing: {
            price: '$99',
            period: 'month',
            cta: 'Start Free Trial',
          },
        },
        index: 3,
      });

      expect(slide4.success).toBe(true);
      expect(slide4.html).toContain('Product Features');
    });
  });

  describe('Slide Updates', () => {
    it('creates presentation and updates slides', async () => {
      // Create initial presentation
      const initial = await createPresentationTool.handler({
        theme: 'academic',
        title: 'Research Findings',
        slides: [
          {
            type: 'title',
            title: 'Research Findings',
            author: 'Dr. Smith',
            id: 'title-slide',
          },
          {
            type: 'content',
            title: 'Methodology',
            content: ['Step 1', 'Step 2', 'Step 3'],
            id: 'methodology-slide',
          },
        ],
      });

      expect(initial.success).toBe(true);

      // Update methodology slide with more details
      const updated = await updateSlideTool.handler({
        slideId: 'methodology-slide',
        slide: {
          type: 'content',
          title: 'Methodology - Updated',
          content: [
            'Step 1: Data Collection',
            'Step 2: Statistical Analysis',
            'Step 3: Peer Review',
            'Step 4: Publication',
          ],
        },
      });

      expect(updated.success).toBe(true);
      expect(updated.html).toContain('Data Collection');
      expect(updated.html).toContain('Statistical Analysis');
    });
  });

  describe('All Themes Integration', () => {
    it('creates presentations in all themes', async () => {
      const themes = ['corporate', 'pitch-deck', 'academic', 'workshop', 'startup'] as const;

      for (const theme of themes) {
        const result = await createPresentationTool.handler({
          theme,
          title: `${theme} Presentation`,
          slides: [
            { type: 'title', title: `${theme} Theme Test` },
            {
              type: 'content',
              title: 'Theme Features',
              content: [
                'Custom color palette',
                'Optimized typography',
                'Professional styling',
              ],
            },
            {
              type: 'data',
              title: 'Sample Chart',
              data: {
                labels: ['A', 'B', 'C'],
                datasets: [{ label: 'Data', data: [10, 20, 15] }],
              },
              dataType: 'chart',
              chartType: 'bar',
            },
          ],
        });

        expect(result.success).toBe(true);
        expect(result.metadata.theme).toBe(theme);
        expect(result.html).toContain(`data-theme="${theme}"`);
        expect(result.html).toContain('Theme Features');
      }
    });
  });

  describe('All Slide Types Integration', () => {
    it('creates presentation with every slide type', async () => {
      const result = await createPresentationTool.handler({
        theme: 'workshop',
        title: 'Complete Slide Types Demo',
        slides: [
          { type: 'title', title: 'All Slide Types' },
          { type: 'content', title: 'Content', content: ['Point 1'] },
          { type: 'media', mediaUrl: 'https://example.com/img.jpg', mediaType: 'image' },
          { type: 'data', title: 'Table', data: [['A', 'B']], dataType: 'table' },
          { type: 'quote', quote: 'Quote text', author: 'Author' },
          { type: 'timeline', title: 'Timeline', events: [{ date: '2024', title: 'Event' }] },
          { type: 'comparison', title: 'Compare', leftTitle: 'A', leftContent: ['1'], rightTitle: 'B', rightContent: ['2'] },
          { type: 'process', title: 'Process', steps: [{ title: 'Step 1' }, { title: 'Step 2' }] },
          { type: 'section-header', title: 'New Section' },
          { type: 'blank', content: '<div>Custom content</div>' },
          { type: 'hero', title: 'Hero Slide', subtitle: 'Subtitle' },
          { type: 'two-column', leftColumn: { type: 'text', content: 'Left' }, rightColumn: { type: 'text', content: 'Right' } },
          { type: 'three-column', columns: [{ content: 'A' }, { content: 'B' }, { content: 'C' }] },
          { type: 'four-column', columns: [{ content: 'A' }, { content: 'B' }, { content: 'C' }, { content: 'D' }] },
          { type: 'chart-with-metrics', title: 'Metrics', chart: { type: 'bar', data: { labels: ['A'], datasets: [{ label: 'Data', data: [1] }] } }, metrics: [{ label: 'KPI', value: '100' }] },
          { type: 'product-overview', title: 'Product', features: ['Feature 1'] },
        ],
      });

      expect(result.success).toBe(true);
      expect(result.metadata.slideCount).toBe(16);
      expect(result.html).toContain('All Slide Types');
      expect(result.html).toContain('Hero Slide');
      expect(result.html).toContain('New Section');
    });
  });

  describe('Validation Integration', () => {
    it('validates presentation before generation', async () => {
      const validSpec = {
        theme: 'corporate',
        title: 'Valid Presentation',
        slides: [
          { type: 'title', title: 'Title' },
          { type: 'content', title: 'Content', content: ['Point'] },
        ],
      };

      const validation = validatePresentation(validSpec);
      expect(validation.valid).toBe(true);

      if (validation.valid) {
        const result = await createPresentationTool.handler(validSpec);
        expect(result.success).toBe(true);
      }
    });

    it('rejects invalid presentation', () => {
      const invalidSpec = {
        theme: 'invalid-theme',
        title: 'Test',
        slides: [],
      };

      const validation = validatePresentation(invalidSpec);
      expect(validation.valid).toBe(false);
      expect(validation.errors).toBeDefined();
    });
  });

  describe('Export Format Integration', () => {
    it('exports same presentation in multiple formats', async () => {
      const spec: PresentationSpec = {
        theme: 'pitch-deck',
        title: 'Multi-Format Export',
        slides: [
          { type: 'title', title: 'Title Slide' },
          { type: 'content', title: 'Content Slide', content: ['Point 1', 'Point 2'] },
        ],
        metadata: {
          author: 'Test Author',
        },
      };

      // Create presentation
      const presentation = await createPresentationTool.handler(spec);
      expect(presentation.success).toBe(true);

      // Export as HTML
      const htmlExport = await exportPresentationTool.handler({
        html: presentation.html,
        format: 'html',
      });
      expect(htmlExport.success).toBe(true);
      expect(htmlExport.format).toBe('html');

      // Export as PDF-HTML
      const pdfExport = await exportPresentationTool.handler({
        html: presentation.html,
        format: 'pdf-html',
      });
      expect(pdfExport.success).toBe(true);
      expect(pdfExport.content).toContain('@media print');

      // Export as JSON
      const jsonExport = await exportPresentationTool.handler({
        presentationData: spec,
        format: 'json',
      });
      expect(jsonExport.success).toBe(true);
      const jsonData = JSON.parse(jsonExport.content);
      expect(jsonData.slides).toHaveLength(2);
    });
  });

  describe('Complex Real-World Scenarios', () => {
    it('generates startup pitch deck', async () => {
      const result = await createPresentationTool.handler({
        theme: 'pitch-deck',
        title: 'Startup Pitch Deck',
        slides: [
          {
            type: 'hero',
            title: 'The Next Big Thing',
            subtitle: 'Revolutionizing the Industry',
            callToAction: { text: 'Join Us', url: 'https://example.com' },
          },
          {
            type: 'content',
            title: 'The Problem',
            content: [
              '80% of businesses struggle with X',
              'Current solutions are expensive',
              'Market gap of $10B',
            ],
          },
          {
            type: 'product-overview',
            title: 'Our Solution',
            features: [
              'AI-powered automation',
              '10x faster than competitors',
              'Enterprise-grade security',
            ],
            pricing: { price: '$99', period: 'month' },
          },
          {
            type: 'data',
            title: 'Market Traction',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{ label: 'Monthly Revenue ($K)', data: [10, 25, 45, 80, 120, 180] }],
            },
            dataType: 'chart',
            chartType: 'line',
          },
          {
            type: 'timeline',
            title: 'Roadmap',
            events: [
              { date: 'Q1 2024', title: 'Beta Launch' },
              { date: 'Q2 2024', title: 'Public Release' },
              { date: 'Q3 2024', title: 'Enterprise Features' },
              { date: 'Q4 2024', title: 'Series A' },
            ],
          },
          {
            type: 'comparison',
            title: 'Us vs Them',
            leftTitle: 'Competitors',
            leftContent: ['Slow', 'Expensive', 'Complex'],
            rightTitle: 'Our Product',
            rightContent: ['Fast', 'Affordable', 'Simple'],
          },
        ],
        metadata: {
          author: 'Startup Team',
          date: new Date().toISOString().split('T')[0],
        },
      });

      expect(result.success).toBe(true);
      expect(result.metadata.slideCount).toBe(6);
      expect(result.html).toContain('The Next Big Thing');
      expect(result.html).toContain('Market Traction');
      expect(result.html).toContain('Roadmap');
    });

    it('generates academic research presentation', async () => {
      const result = await createPresentationTool.handler({
        theme: 'academic',
        title: 'Research Presentation',
        slides: [
          {
            type: 'title',
            title: 'Novel Approach to X',
            subtitle: 'A Quantitative Study',
            author: 'Dr. Jane Smith',
            date: '2024-01-15',
          },
          {
            type: 'content',
            title: 'Research Questions',
            content: [
              'RQ1: Does X correlate with Y?',
              'RQ2: What factors influence Z?',
              'RQ3: Can we predict outcome W?',
            ],
          },
          {
            type: 'process',
            title: 'Methodology',
            steps: [
              { title: 'Literature Review', description: 'Analyzed 150 papers' },
              { title: 'Data Collection', description: 'N=500 participants' },
              { title: 'Statistical Analysis', description: 'Regression models' },
              { title: 'Validation', description: 'Peer review' },
            ],
            layout: 'vertical',
          },
          {
            type: 'data',
            title: 'Results',
            data: {
              labels: ['Control', 'Treatment A', 'Treatment B'],
              datasets: [
                { label: 'Outcome Measure', data: [5.2, 7.8, 9.1] },
              ],
            },
            dataType: 'chart',
            chartType: 'bar',
          },
          {
            type: 'quote',
            quote: 'These findings challenge the prevailing assumptions in the field.',
            author: 'Lead Researcher',
          },
        ],
      });

      expect(result.success).toBe(true);
      expect(result.html).toContain('Novel Approach');
      expect(result.html).toContain('Methodology');
    });
  });

  describe('Error Recovery', () => {
    it('handles partial failures gracefully', async () => {
      // Try to create presentation with invalid slide
      await expect(
        createPresentationTool.handler({
          theme: 'corporate',
          title: 'Test',
          slides: [
            { type: 'title', title: 'Valid Slide' },
            { type: 'content', title: 'Invalid' }, // Missing content
          ],
        })
      ).rejects.toThrow();

      // Should still work with valid slides
      const valid = await createPresentationTool.handler({
        theme: 'corporate',
        title: 'Test',
        slides: [
          { type: 'title', title: 'Valid Slide' },
          { type: 'content', title: 'Valid', content: ['Point'] },
        ],
      });

      expect(valid.success).toBe(true);
    });
  });
});
