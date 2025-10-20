/**
 * export_presentation tool
 *
 * Export presentation in various formats.
 */

import type { PresentationSpec } from '../types/index.js';

/**
 * JSON export format structure
 */
interface PresentationJSONExport {
  version: string;
  metadata: {
    title: string;
    author?: string;
    createdAt: string;
    slideCount: number;
    theme: string;
    aspectRatio: string;
    description?: string;
    tags?: string[];
  };
  slides: Array<{
    id: string;
    type: string;
    content: Record<string, unknown>;
    index: number;
  }>;
  config: {
    theme: string;
    aspectRatio: string;
    fontSize?: string;
    minify?: boolean;
    includeSlideyUICSS?: boolean;
    embedFonts?: boolean;
  };
}

export const exportPresentationTool = {
  name: 'export_presentation',
  description:
    'Export a presentation in various formats. Supports HTML, PDF-ready HTML, and JSON data format. ' +
    'Use JSON format to get the presentation data structure for programmatic access.',

  inputSchema: {
    type: 'object',
    properties: {
      html: {
        type: 'string',
        description: 'Presentation HTML to export (required for html and pdf-html formats)',
      },
      presentationData: {
        type: 'object',
        description:
          'Presentation specification object (required for json format). Should include theme, title, slides, options, and metadata.',
      },
      format: {
        type: 'string',
        enum: ['html', 'pdf-html', 'json'],
        description:
          'Export format: html (standalone HTML), pdf-html (HTML optimized for PDF conversion), json (structured data)',
      },
      filename: {
        type: 'string',
        description: 'Desired filename (without extension)',
      },
    },
    required: ['format'],
  },

  async handler(args: Record<string, unknown>) {
    const html = args.html as string | undefined;
    const presentationData = args.presentationData as PresentationSpec | undefined;
    const format = args.format as string;
    const filename = (args.filename as string) || 'presentation';

    let exportedContent: string;
    let extension: string;
    let contentType: string;
    let instructions: string;

    switch (format) {
      case 'html':
        if (!html) {
          throw new Error('html parameter is required for html format');
        }
        exportedContent = html;
        extension = 'html';
        contentType = 'text/html';
        instructions = 'Save to .html file and open in any browser';
        break;

      case 'pdf-html':
        if (!html) {
          throw new Error('html parameter is required for pdf-html format');
        }
        exportedContent = addPDFStyles(html);
        extension = 'html';
        contentType = 'text/html';
        instructions = 'Open in browser and use Print to PDF (Cmd/Ctrl+P)';
        break;

      case 'json':
        if (!presentationData) {
          throw new Error('presentationData parameter is required for json format');
        }
        exportedContent = generateJSONExport(presentationData);
        extension = 'json';
        contentType = 'application/json';
        instructions = 'Save to .json file for programmatic access or import';
        break;

      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    return {
      success: true,
      content: exportedContent,
      filename: `${filename}.${extension}`,
      format,
      contentType,
      message: `Exported presentation as ${format}`,
      instructions,
    };
  },
};

/**
 * Generate JSON export from presentation specification
 *
 * Creates a structured JSON representation of the presentation including
 * metadata, slides, and configuration options.
 *
 * @param spec - Presentation specification
 * @returns JSON string of the presentation data
 */
function generateJSONExport(spec: PresentationSpec): string {
  const now = new Date().toISOString();

  // Build slide data with proper structure
  const slides = spec.slides.map((slide, index) => ({
    id: slide.id || `slide-${index + 1}`,
    type: slide.type,
    content: { ...slide } as Record<string, unknown>,
    index,
  }));

  // Build metadata object with optional properties
  const metadata: PresentationJSONExport['metadata'] = {
    title: spec.title,
    createdAt: spec.metadata?.date || now,
    slideCount: spec.slides.length,
    theme: spec.theme,
    aspectRatio: spec.options?.aspectRatio || '16:9',
  };

  // Add optional metadata fields only if they exist
  if (spec.metadata?.author !== undefined) {
    metadata.author = spec.metadata.author;
  }
  if (spec.metadata?.description !== undefined) {
    metadata.description = spec.metadata.description;
  }
  if (spec.metadata?.tags !== undefined) {
    metadata.tags = spec.metadata.tags;
  }

  // Build config object with optional properties
  const config: PresentationJSONExport['config'] = {
    theme: spec.theme,
    aspectRatio: spec.options?.aspectRatio || '16:9',
  };

  // Add optional config fields only if they exist
  if (spec.options?.fontSize !== undefined) {
    config.fontSize = spec.options.fontSize;
  }
  if (spec.options?.minify !== undefined) {
    config.minify = spec.options.minify;
  }
  if (spec.options?.includeSlideyUICSS !== undefined) {
    config.includeSlideyUICSS = spec.options.includeSlideyUICSS;
  }
  if (spec.options?.embedFonts !== undefined) {
    config.embedFonts = spec.options.embedFonts;
  }

  // Build the export object
  const exportData: PresentationJSONExport = {
    version: '1.0.0',
    metadata,
    slides,
    config,
  };

  // Return formatted JSON with 2-space indentation for readability
  return JSON.stringify(exportData, null, 2);
}

function addPDFStyles(html: string): string {
  const pdfStyles = `
    <style>
      @media print {
        @page {
          size: 11in 8.5in;
          margin: 0;
        }

        body {
          margin: 0;
          padding: 0;
        }

        .slideyui-slide {
          width: 100%;
          height: 100vh;
          page-break-after: always;
          page-break-inside: avoid;
        }

        .slideyui-slide:last-child {
          page-break-after: auto;
        }
      }
    </style>
  `;

  // Insert before closing </head> tag
  return html.replace('</head>', `${pdfStyles}\n</head>`);
}
