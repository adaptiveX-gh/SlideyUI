/**
 * CodeBlock Component
 * Syntax-highlighted code block with copy functionality
 */

import { useState } from 'react';
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
  lineNumbers = false,
  highlightLines,
  fileName,
  className = '',
}: SlideCodeProps) {
  const [copied, setCopied] = useState(false);

  // Ensure children is always a string, default to empty string if undefined
  const codeContent = children ?? '';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Parse highlight lines (e.g., "1,3-5" -> [1,3,4,5])
  const highlightedLines = new Set<number>();
  if (highlightLines) {
    highlightLines.split(',').forEach((part) => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number);
        for (let i = start; i <= end; i++) {
          highlightedLines.add(i);
        }
      } else {
        highlightedLines.add(Number(part));
      }
    });
  }

  const lines = codeContent.split('\n');

  return (
    <div className={`slide-code ${className}`}>
      {fileName && (
        <div className="slide-code-header">
          <span className="slide-code-filename">{fileName}</span>
          <span className="slide-code-language">{language}</span>
        </div>
      )}

      <div className="slide-code-container">
        <button
          onClick={handleCopy}
          className="slide-code-copy-button"
          aria-label="Copy code"
          title={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <svg className="slide-code-icon" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="slide-code-icon" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          )}
        </button>

        <pre className={`slide-code-block language-${language}`}>
          <code className="slide-code-content">
            {lineNumbers ? (
              lines.map((line, index) => {
                const lineNumber = index + 1;
                const isHighlighted = highlightedLines.has(lineNumber);
                return (
                  <div
                    key={index}
                    className={`slide-code-line ${isHighlighted ? 'slide-code-line-highlighted' : ''}`}
                  >
                    <span className="slide-code-line-number">{lineNumber}</span>
                    <span className="slide-code-line-content">{line}</span>
                  </div>
                );
              })
            ) : (
              codeContent
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
