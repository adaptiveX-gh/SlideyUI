/**
 * HTML utilities
 */

/**
 * Escape HTML special characters
 *
 * @param unsafe - Unsafe string that may contain HTML
 * @returns HTML-escaped string
 */
export function escapeHTML(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Unescape HTML entities
 *
 * @param safe - HTML-escaped string
 * @returns Unescaped string
 */
export function unescapeHTML(safe: string): string {
  return safe
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

/**
 * Strip HTML tags from a string
 *
 * @param html - HTML string
 * @returns Plain text
 */
export function stripHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * Sanitize HTML attributes
 *
 * @param attr - Attribute value
 * @returns Sanitized attribute value
 */
export function sanitizeAttribute(attr: string): string {
  return attr.replace(/[^\w\s-]/g, '');
}

/**
 * Render basic markdown patterns to HTML
 *
 * Converts common markdown syntax (bold, italic, code, line breaks) to HTML.
 * This function MUST receive pre-escaped HTML to prevent XSS attacks.
 *
 * @param text - HTML-escaped text that may contain markdown syntax
 * @returns HTML string with markdown converted to tags
 */
export function renderMarkdown(text: string): string {
  if (!text) return '';

  return (
    text
      // Bold: **text** or __text__
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      // Italic: *text* or _text_ (must come after bold to avoid conflicts)
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/_(.+?)_/g, '<em>$1</em>')
      // Code: `text`
      .replace(/`(.+?)`/g, '<code>$1</code>')
      // Line breaks: preserve newlines as <br>
      .replace(/\n/g, '<br>')
  );
}
