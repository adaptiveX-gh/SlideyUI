/**
 * Code slide template
 *
 * Renders code snippet slides with syntax highlighting and line numbers.
 * Supports multiple languages and line highlighting.
 */

import type { GenerationOptions } from '../types/index.js';
import { escapeHTML } from '../utils/html.js';
import type { z } from 'zod';
import type { CodeSlideSchema } from '../schema/index.js';

type CodeSlideSpec = z.infer<typeof CodeSlideSchema>;

/**
 * Language display names mapping
 */
const LANGUAGE_NAMES: Record<string, string> = {
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  jsx: 'JSX',
  tsx: 'TSX',
  python: 'Python',
  java: 'Java',
  cpp: 'C++',
  c: 'C',
  csharp: 'C#',
  go: 'Go',
  rust: 'Rust',
  php: 'PHP',
  ruby: 'Ruby',
  swift: 'Swift',
  kotlin: 'Kotlin',
  scala: 'Scala',
  bash: 'Bash',
  shell: 'Shell',
  powershell: 'PowerShell',
  sql: 'SQL',
  html: 'HTML',
  css: 'CSS',
  scss: 'SCSS',
  json: 'JSON',
  yaml: 'YAML',
  xml: 'XML',
  markdown: 'Markdown',
};

/**
 * Get language display name
 */
function getLanguageName(lang: string): string {
  return LANGUAGE_NAMES[lang.toLowerCase()] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

/**
 * Simple syntax highlighting using regex patterns
 * This is a basic implementation - for production, consider using Shiki or Prism.js
 */
function highlightSyntax(code: string, language: string): string {
  const lang = language.toLowerCase();

  // Escape HTML first
  let highlighted = escapeHTML(code);

  // Apply basic syntax highlighting based on language
  if (lang === 'javascript' || lang === 'typescript' || lang === 'jsx' || lang === 'tsx') {
    // Keywords
    highlighted = highlighted.replace(
      /\b(const|let|var|function|class|if|else|for|while|return|import|export|default|async|await|try|catch|throw|new|this|super|extends|implements|interface|type|enum|namespace|module|declare|public|private|protected|static|readonly)\b/g,
      '<span class="code-keyword">$1</span>'
    );
    // Strings
    highlighted = highlighted.replace(
      /(['"`])(?:(?=(\\?))\2.)*?\1/g,
      '<span class="code-string">$&</span>'
    );
    // Comments
    highlighted = highlighted.replace(
      /\/\/.*/g,
      '<span class="code-comment">$&</span>'
    );
    highlighted = highlighted.replace(
      /\/\*[\s\S]*?\*\//g,
      '<span class="code-comment">$&</span>'
    );
    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="code-number">$1</span>'
    );
  } else if (lang === 'python') {
    // Keywords
    highlighted = highlighted.replace(
      /\b(def|class|if|elif|else|for|while|return|import|from|as|try|except|finally|with|lambda|yield|raise|pass|break|continue|True|False|None|and|or|not|in|is)\b/g,
      '<span class="code-keyword">$1</span>'
    );
    // Strings
    highlighted = highlighted.replace(
      /(['"])(?:(?=(\\?))\2.)*?\1/g,
      '<span class="code-string">$&</span>'
    );
    // Comments
    highlighted = highlighted.replace(
      /#.*/g,
      '<span class="code-comment">$&</span>'
    );
    // Numbers
    highlighted = highlighted.replace(
      /\b(\d+\.?\d*)\b/g,
      '<span class="code-number">$1</span>'
    );
  } else if (lang === 'html' || lang === 'xml') {
    // Tags
    highlighted = highlighted.replace(
      /(&lt;\/?)([\w-]+)/g,
      '$1<span class="code-tag">$2</span>'
    );
    // Attributes
    highlighted = highlighted.replace(
      /([\w-]+)=/g,
      '<span class="code-attr">$1</span>='
    );
    // Strings (attribute values)
    highlighted = highlighted.replace(
      /=(['"])(?:(?=(\\?))\2.)*?\1/g,
      '=<span class="code-string">$&</span>'.replace('=', '')
    );
  } else if (lang === 'css' || lang === 'scss') {
    // Selectors
    highlighted = highlighted.replace(
      /([.#]?[\w-]+)(?=\s*\{)/g,
      '<span class="code-selector">$1</span>'
    );
    // Properties
    highlighted = highlighted.replace(
      /([\w-]+)(?=\s*:)/g,
      '<span class="code-property">$1</span>'
    );
    // Strings
    highlighted = highlighted.replace(
      /(['"])(?:(?=(\\?))\2.)*?\1/g,
      '<span class="code-string">$&</span>'
    );
    // Comments
    highlighted = highlighted.replace(
      /\/\*[\s\S]*?\*\//g,
      '<span class="code-comment">$&</span>'
    );
  } else if (lang === 'json') {
    // Keys
    highlighted = highlighted.replace(
      /"([\w-]+)"(?=\s*:)/g,
      '<span class="code-key">"$1"</span>'
    );
    // Strings
    highlighted = highlighted.replace(
      /:\s*"([^"]*)"/g,
      ': <span class="code-string">"$1"</span>'
    );
    // Numbers
    highlighted = highlighted.replace(
      /:\s*(\d+\.?\d*)/g,
      ': <span class="code-number">$1</span>'
    );
    // Booleans/null
    highlighted = highlighted.replace(
      /\b(true|false|null)\b/g,
      '<span class="code-keyword">$1</span>'
    );
  }

  return highlighted;
}

/**
 * Render code with line numbers and highlighting
 */
function renderCodeLines(
  code: string,
  language: string,
  highlights?: number[]
): string {
  const lines = code.split('\n');
  const highlightSet = new Set(highlights || []);

  return lines
    .map((line, index) => {
      const lineNumber = index + 1;
      const isHighlighted = highlightSet.has(lineNumber);
      const highlightClass = isHighlighted ? ' slideyui-code-line-highlighted' : '';
      const highlightedLine = highlightSyntax(line || ' ', language);

      return `
        <div class="slideyui-code-line${highlightClass}" data-line-number="${lineNumber}">
          <span class="slideyui-code-line-number">${lineNumber}</span>
          <span class="slideyui-code-line-content">${highlightedLine}</span>
        </div>
      `.trim();
    })
    .join('\n');
}

/**
 * Main code template function
 */
export function codeTemplate(
  spec: CodeSlideSpec,
  _options: GenerationOptions
): string {
  const title = spec.title ? escapeHTML(spec.title) : '';
  const filename = spec.filename ? escapeHTML(spec.filename) : '';
  const language = spec.language.toLowerCase();
  const languageDisplay = getLanguageName(language);
  const theme = spec.theme ?? 'dark';
  const themeClass = `slideyui-code-theme-${theme}`;

  const codeLines = renderCodeLines(spec.code, language, spec.highlights);

  return `
    <div class="slideyui-card slideyui-code-card ${themeClass}">
      ${title ? `
        <div class="slideyui-card-header">
          <h2 class="slideyui-card-title">${title}</h2>
        </div>
      ` : ''}
      <div class="slideyui-card-content slideyui-code-content">
        <div class="slideyui-code-header">
          ${filename ? `
            <span class="slideyui-code-filename">${filename}</span>
          ` : ''}
          <span class="slideyui-code-language">${languageDisplay}</span>
        </div>
        <div class="slideyui-code-wrapper">
          <pre class="slideyui-code-pre"><code class="slideyui-code language-${escapeHTML(language)}">${codeLines}</code></pre>
        </div>
      </div>
    </div>
  `;
}
