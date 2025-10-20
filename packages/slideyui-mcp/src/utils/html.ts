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
