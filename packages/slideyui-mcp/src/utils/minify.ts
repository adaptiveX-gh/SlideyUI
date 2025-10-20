/**
 * HTML minification utilities
 */

import { minify } from 'html-minifier-terser';

/**
 * Minify HTML output
 *
 * @param html - HTML to minify
 * @returns Minified HTML
 */
export async function minifyHTML(html: string): Promise<string> {
  try {
    return await minify(html, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true,
    });
  } catch (error) {
    // If minification fails, return original HTML
    console.error('HTML minification failed:', error);
    return html;
  }
}

/**
 * Pretty print HTML (opposite of minify)
 *
 * @param html - HTML to format
 * @returns Formatted HTML
 */
export function prettyHTML(html: string): string {
  // Simple indentation (html-minifier-terser doesn't have a prettify option)
  let formatted = html;
  let indent = 0;
  const indentSize = 2;

  formatted = formatted.replace(/>\s*</g, '>\n<');

  const lines = formatted.split('\n');
  const result: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Decrease indent for closing tags
    if (trimmed.startsWith('</')) {
      indent = Math.max(0, indent - indentSize);
    }

    result.push(' '.repeat(indent) + trimmed);

    // Increase indent for opening tags
    if (
      trimmed.startsWith('<') &&
      !trimmed.startsWith('</') &&
      !trimmed.endsWith('/>')
    ) {
      indent += indentSize;
    }
  }

  return result.join('\n');
}
