/**
 * CodeBlock Component
 * Syntax-highlighted code block with copy functionality
 */

import { SlideCodeProps } from '../types';

/**
 * Code block component with copy button and syntax highlighting placeholder
 *
 * @example
 * ```tsx
 * <CodeBlock language="javascript" fileName="app.js" lineNumbers>
 *   {`function hello() {
 *   console.log('Hello World');
 * }`}
 * </CodeBlock>
 * ```
 */
export function CodeBlock({
  children,
  language = 'text',
  fileName,
  className = '',
}: Omit<SlideCodeProps, 'lineNumbers' | 'highlightLines'>) {
  // Ensure children is always a string, default to empty string if undefined
  const codeContent = children ?? '';

  return (
    <div className={`card-code ${className}`}>
      {fileName && (
        <div className="card-code-header">
          <span>{fileName}</span>
          <span>{language}</span>
        </div>
      )}

      <div className="card-code-body">
        <pre>
          <code>{codeContent}</code>
        </pre>
      </div>
    </div>
  );
}
