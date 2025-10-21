/**
 * Error formatting utilities for better user experience
 *
 * Transforms cryptic Zod validation errors into actionable, human-readable messages
 * with examples and suggestions.
 */

import { ZodError, ZodIssue } from 'zod';
import { SCHEMA_EXAMPLES } from '../schema/examples.js';

/**
 * Format a Zod error into a human-readable message
 *
 * @param error - Zod validation error
 * @returns Formatted error message with helpful context
 */
export function formatZodError(error: ZodError): string {
  const messages: string[] = [];

  // Group errors by path for better organization
  const errorsByPath = new Map<string, ZodIssue[]>();

  for (const issue of error.issues) {
    const path = issue.path.join('.');
    const existing = errorsByPath.get(path) || [];
    existing.push(issue);
    errorsByPath.set(path, existing);
  }

  // Format each error group
  for (const [path, issues] of errorsByPath) {
    const formatted = formatErrorGroup(path, issues);
    if (formatted) {
      messages.push(formatted);
    }
  }

  return messages.join('\n\n');
}

/**
 * Format a group of errors for the same path
 */
function formatErrorGroup(path: string, issues: ZodIssue[]): string {
  const sections: string[] = [];

  // Determine the context (slide type, field, etc.)
  const context = analyzeErrorContext(path, issues);

  // Add header
  sections.push(`❌ Error at: ${path || 'root'}`);

  // Add specific error messages
  for (const issue of issues) {
    const message = formatIssue(issue, context);
    if (message) {
      sections.push(`   ${message}`);
    }
  }

  // Add helpful example if available
  const example = getRelevantExample(context);
  if (example) {
    sections.push('');
    sections.push('💡 Example:');
    sections.push(example);
  }

  return sections.join('\n');
}

/**
 * Analyze error context to provide better suggestions
 */
interface ErrorContext {
  slideType?: string;
  slideIndex?: number;
  field?: string;
  isSlideTypeError: boolean;
  isContentError: boolean;
  isRequiredError: boolean;
}

function analyzeErrorContext(path: string, issues: ZodIssue[]): ErrorContext {
  const parts = path.split('.');
  const context: ErrorContext = {
    isSlideTypeError: false,
    isContentError: false,
    isRequiredError: false,
  };

  // Check if this is a slide error
  if (parts[0] === 'slides' && parts[1]) {
    context.slideIndex = parseInt(parts[1], 10);

    // Check if type field error
    if (parts[2] === 'type') {
      context.isSlideTypeError = true;
    }

    // Check if content field error
    if (parts[2] === 'content') {
      context.isContentError = true;
    }

    context.field = parts[2];
  }

  // Check for required field errors
  context.isRequiredError = issues.some(
    (issue) => issue.code === 'invalid_type' && issue.received === 'undefined'
  );

  // Try to infer slide type from discriminated union error
  for (const issue of issues) {
    if (issue.code === 'invalid_union_discriminator' && 'options' in issue) {
      // This is a discriminated union error on 'type' field
      context.isSlideTypeError = true;
    }
    if (issue.code === 'invalid_union' && path.includes('slides')) {
      context.isSlideTypeError = true;
    }
  }

  return context;
}

/**
 * Format a single Zod issue
 */
function formatIssue(issue: ZodIssue, context: ErrorContext): string {
  switch (issue.code) {
    case 'invalid_type':
      return formatInvalidTypeError(issue, context);

    case 'invalid_union':
    case 'invalid_union_discriminator':
      return formatUnionError(issue, context);

    case 'invalid_enum_value':
      return formatEnumError(issue);

    case 'too_small':
      return formatTooSmallError(issue, context);

    case 'too_big':
      return formatTooBigError(issue);

    case 'invalid_string':
      return formatStringError(issue);

    case 'custom':
      return issue.message;

    default:
      return issue.message;
  }
}

/**
 * Format invalid type errors
 */
function formatInvalidTypeError(issue: ZodIssue & { code: 'invalid_type' }, context: ErrorContext): string {
  const { expected, received } = issue;

  if (received === 'undefined') {
    if (context.isContentError) {
      return `Missing required field. The 'content' field must be an array of strings, even for single items.`;
    }
    return `Missing required field. Expected ${expected}, but field was not provided.`;
  }

  if (context.isContentError && expected === 'array' && received === 'string') {
    return `The 'content' field must be an array. Wrap single items in brackets: ["Your content"]`;
  }

  return `Expected ${expected}, but received ${received}.`;
}

/**
 * Format discriminated union errors (slide type errors)
 */
function formatUnionError(issue: ZodIssue, context: ErrorContext): string {
  if (context.isSlideTypeError) {
    const validTypes = [
      'title', 'content', 'media', 'data', 'quote', 'timeline',
      'comparison', 'process', 'section-header', 'blank', 'hero',
      'two-column', 'three-column', 'four-column', 'chart-with-metrics',
      'product-overview'
    ];

    return `Invalid slide type. Must be one of: ${validTypes.join(', ')}`;
  }

  if (issue.code === 'invalid_union_discriminator' && 'options' in issue) {
    const options = (issue as any).options as string[];
    return `Invalid value. Expected one of: ${options.join(', ')}`;
  }

  return 'Invalid value for this field. Check that all required fields are present and have correct types.';
}

/**
 * Format enum errors
 */
function formatEnumError(issue: ZodIssue & { code: 'invalid_enum_value' }): string {
  const { options, received } = issue;
  return `Invalid value "${received}". Expected one of: ${options.join(', ')}`;
}

/**
 * Format "too small" errors (min length, min items, etc.)
 */
function formatTooSmallError(issue: ZodIssue & { code: 'too_small' }, context: ErrorContext): string {
  const { minimum, type, inclusive } = issue;

  if (type === 'string') {
    return `Text is too short. Minimum length: ${minimum} character${minimum === 1 ? '' : 's'}.`;
  }

  if (type === 'array') {
    if (context.isContentError) {
      return `Content array is empty. Add at least ${minimum} item${minimum === 1 ? '' : 's'}.`;
    }
    return `Array must contain at least ${minimum} item${minimum === 1 ? '' : 's'}.`;
  }

  return `Value is too small. Minimum: ${minimum}${inclusive ? ' (inclusive)' : ' (exclusive)'}.`;
}

/**
 * Format "too big" errors
 */
function formatTooBigError(issue: ZodIssue & { code: 'too_big' }): string {
  const { maximum, type, inclusive } = issue;

  if (type === 'string') {
    return `Text is too long. Maximum length: ${maximum} character${maximum === 1 ? '' : 's'}.`;
  }

  if (type === 'array') {
    return `Array is too large. Maximum: ${maximum} item${maximum === 1 ? '' : 's'}.`;
  }

  return `Value is too large. Maximum: ${maximum}${inclusive ? ' (inclusive)' : ' (exclusive)'}.`;
}

/**
 * Format string validation errors (regex, URL, etc.)
 */
function formatStringError(issue: ZodIssue & { code: 'invalid_string' }): string {
  const { validation } = issue;

  if (typeof validation === 'object' && 'includes' in validation) {
    return `String must include "${validation.includes}".`;
  }

  if (typeof validation === 'object' && 'startsWith' in validation) {
    return `String must start with "${validation.startsWith}".`;
  }

  if (typeof validation === 'object' && 'endsWith' in validation) {
    return `String must end with "${validation.endsWith}".`;
  }

  if (validation === 'url') {
    return 'Must be a valid URL (e.g., https://example.com).';
  }

  if (validation === 'email') {
    return 'Must be a valid email address.';
  }

  if (validation === 'datetime') {
    return 'Must be a valid ISO 8601 datetime string (e.g., 2024-01-15T10:30:00Z).';
  }

  if (typeof validation === 'object' && 'regex' in validation) {
    return 'String does not match the required pattern.';
  }

  return `Invalid string format: ${validation}`;
}

/**
 * Get a relevant example based on error context
 */
function getRelevantExample(context: ErrorContext): string | null {
  if (context.isSlideTypeError) {
    return `Valid slide with explicit type:
   {
     "type": "content",
     "title": "My Slide",
     "content": ["Point 1", "Point 2"]
   }`;
  }

  if (context.isContentError) {
    return `Content must be an array:
   "content": ["First point", "Second point", "Third point"]

   Even for a single item:
   "content": ["Single point"]`;
  }

  if (context.field === 'title') {
    return `"title": "Your Slide Title Here"`;
  }

  if (context.field === 'theme') {
    return `"theme": "corporate"

   Available themes: corporate, pitch-deck, academic, workshop, startup`;
  }

  return null;
}

/**
 * Format validation errors into a structured response
 *
 * @param error - Error to format
 * @returns Structured error response
 */
export function formatValidationError(error: unknown): {
  message: string;
  details?: string;
  examples?: string[];
} {
  if (error instanceof ZodError) {
    return {
      message: 'Validation failed',
      details: formatZodError(error),
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: 'An unknown error occurred',
    details: String(error),
  };
}

/**
 * Common error messages for specific scenarios
 */
export const ERROR_MESSAGES = {
  SLIDE_TYPE_REQUIRED: `The 'type' field is required for all slides.

Valid slide types:
  - title: Title slide with author and date
  - content: Standard content slide with bullet points
  - media: Image, video, or embedded content
  - data: Tables and charts
  - quote: Pull quote with author attribution
  - timeline: Event timeline
  - comparison: Side-by-side comparison
  - process: Step-by-step process
  - section-header: Section divider
  - blank: Blank canvas
  - hero: Full-screen hero slide
  - two-column: Two-column layout
  - three-column: Three-column layout
  - four-column: Four-column layout
  - chart-with-metrics: Chart with metrics sidebar
  - product-overview: Product showcase

Example:
{
  "type": "content",
  "title": "Key Points",
  "content": ["Point 1", "Point 2"]
}`,

  CONTENT_MUST_BE_ARRAY: `The 'content' field must be an array of strings.

❌ Wrong:
"content": "Single item"

✅ Correct:
"content": ["Single item"]

For multiple items:
"content": [
  "First point",
  "Second point",
  "Third point"
]`,

  INVALID_THEME: `Invalid theme name.

Available predefined themes:
  - corporate: Professional business presentations
  - pitch-deck: Modern startup pitch decks
  - academic: Academic and educational content
  - workshop: Interactive workshop materials
  - startup: Bold, energetic startup presentations

You can also create a custom theme using the create_custom_theme tool.

Example:
"theme": "corporate"`,

  MISSING_REQUIRED_FIELD: (field: string, slideType: string) =>
    `The '${field}' field is required for '${slideType}' slides.

Check the ${slideType} slide requirements and ensure all required fields are present.`,

  INVALID_URL: `Invalid URL format.

URLs must be valid and include the protocol (http:// or https://).

✅ Correct examples:
  - "https://example.com/image.jpg"
  - "https://www.youtube.com/embed/VIDEO_ID"
  - "https://unsplash.com/photos/abc123"

❌ Wrong:
  - "example.com/image.jpg" (missing protocol)
  - "//example.com/image.jpg" (missing protocol)`,

  INVALID_HEX_COLOR: `Invalid hex color format.

Colors must be in 6-digit hex format with # prefix.

✅ Correct examples:
  - "#FF5733"
  - "#00BFFF"
  - "#1A1A1A"

❌ Wrong:
  - "FF5733" (missing #)
  - "#F00" (must be 6 digits)
  - "rgb(255, 0, 0)" (use hex format)`,

  EMPTY_SLIDES_ARRAY: `Presentation must have at least one slide.

Add at least one slide to the 'slides' array.

Example:
{
  "theme": "corporate",
  "title": "My Presentation",
  "slides": [
    {
      "type": "title",
      "title": "Welcome",
      "subtitle": "An introduction"
    }
  ]
}`,
} as const;
