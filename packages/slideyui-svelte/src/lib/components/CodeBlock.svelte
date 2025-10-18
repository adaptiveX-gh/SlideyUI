<!--
  CodeBlock Component
  Syntax-highlighted code block with copy functionality
-->

<script lang="ts">
  /**
   * Programming language
   */
  export let language: string = 'text';

  /**
   * Show line numbers
   */
  export let lineNumbers: boolean = false;

  /**
   * Highlighted lines (e.g., "1,3-5")
   */
  export let highlightLines: string | undefined = undefined;

  /**
   * File name
   */
  export let fileName: string | undefined = undefined;

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };

  // State for copy button
  let copied: boolean = false;

  // Capture code content from slot
  let codeElement: HTMLElement;
  $: codeContent = codeElement?.textContent ?? '';

  // Handle copy to clipboard
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(codeContent);
      copied = true;
      setTimeout(() => {
        copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }

  // Parse highlight lines (e.g., "1,3-5" -> Set([1,3,4,5]))
  function parseHighlightLines(highlightLines: string | undefined): Set<number> {
    const lines = new Set<number>();
    if (highlightLines) {
      highlightLines.split(',').forEach((part) => {
        if (part.includes('-')) {
          const [start, end] = part.split('-').map(Number);
          for (let i = start; i <= end; i++) {
            lines.add(i);
          }
        } else {
          lines.add(Number(part));
        }
      });
    }
    return lines;
  }

  $: highlightedLines = parseHighlightLines(highlightLines);

  // Parse lines for line numbers mode
  $: lines = codeContent.split('\n');
</script>

<!--
  Code block component with copy button and syntax highlighting placeholder

  @example
  ```svelte
  <CodeBlock language="javascript" fileName="app.js" lineNumbers>
    {`function hello() {
    console.log('Hello World');
  }`}
  </CodeBlock>
  ```
-->

<div class="slide-code {className}">
  {#if fileName}
    <div class="slide-code-header">
      <span class="slide-code-filename">{fileName}</span>
      <span class="slide-code-language">{language}</span>
    </div>
  {/if}

  <div class="slide-code-container">
    <button
      on:click={handleCopy}
      class="slide-code-copy-button"
      aria-label="Copy code"
      title={copied ? 'Copied!' : 'Copy code'}
    >
      {#if copied}
        <svg class="slide-code-icon" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clip-rule="evenodd"
          />
        </svg>
      {:else}
        <svg class="slide-code-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
        </svg>
      {/if}
    </button>

    <pre class="slide-code-block language-{language}">
      <code class="slide-code-content" bind:this={codeElement}>
        {#if lineNumbers}
          {#each lines as line, index}
            {@const lineNumber = index + 1}
            {@const isHighlighted = highlightedLines.has(lineNumber)}
            <div
              class="slide-code-line"
              class:slide-code-line-highlighted={isHighlighted}
            >
              <span class="slide-code-line-number">{lineNumber}</span>
              <span class="slide-code-line-content">{line}</span>
            </div>
          {/each}
        {:else}
          <slot />
        {/if}
      </code>
    </pre>
  </div>
</div>
