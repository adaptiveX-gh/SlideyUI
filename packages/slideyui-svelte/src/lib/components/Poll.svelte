<!--
  Poll Component
  Interactive poll with results visualization
-->

<script lang="ts">
  import type { PollOption } from '../types';

  /**
   * Poll question
   */
  export let question: string;

  /**
   * Poll options
   */
  export let options: PollOption[];

  /**
   * Show results
   */
  export let showResults: boolean = false;

  /**
   * Allow multiple selections
   */
  export let multiple: boolean = false;

  /**
   * Additional CSS classes
   */
  let className: string = '';
  export { className as class };

  /**
   * Callback when option selected
   */
  export let onVote: ((value: string | string[]) => void) | undefined = undefined;

  // State for selected values
  let selectedValues: string[] = [];

  // Handle option click
  function handleOptionClick(value: string) {
    let newSelection: string[];

    if (multiple) {
      // Toggle selection for multiple choice
      if (selectedValues.includes(value)) {
        newSelection = selectedValues.filter((v: string) => v !== value);
      } else {
        newSelection = [...selectedValues, value];
      }
    } else {
      // Single selection
      newSelection = [value];
    }

    selectedValues = newSelection;

    if (onVote) {
      onVote(multiple ? newSelection : newSelection[0]);
    }
  }

  // Calculate total votes for display
  function getTotalVotes(): number {
    return options.reduce((sum, option) => sum + (option.percentage || 0), 0);
  }
</script>

<!--
  Interactive poll component with results display

  @example
  ```svelte
  <Poll
    question="What's your favorite framework?"
    options={[
      { label: 'React', value: 'react', percentage: 45 },
      { label: 'Vue', value: 'vue', percentage: 30 },
      { label: 'Svelte', value: 'svelte', percentage: 25 },
    ]}
    showResults
  />
  ```
-->

<div class="slide-poll {className}">
  <h3 class="slide-poll-question">{question}</h3>

  <div class="slide-poll-options">
    {#each options as option}
      {@const isSelected = selectedValues.includes(option.value)}
      {@const percentage = option.percentage || 0}

      <div
        class="slide-poll-option"
        class:slide-poll-option-selected={isSelected}
        class:slide-poll-option-results={showResults}
      >
        <button
          class="slide-poll-option-button"
          on:click={() => handleOptionClick(option.value)}
          disabled={showResults}
          aria-pressed={isSelected}
        >
          <div class="slide-poll-option-content">
            <span class="slide-poll-option-label">{option.label}</span>

            {#if showResults}
              <span class="slide-poll-option-percentage">
                {percentage}%
              </span>
            {/if}
          </div>

          {#if showResults}
            <div class="slide-poll-option-bar-container">
              <div
                class="slide-poll-option-bar"
                style="width: {percentage}%"
              />
            </div>
          {/if}

          {#if !showResults}
            <div class="slide-poll-option-indicator">
              {#if multiple}
                <div
                  class="slide-poll-checkbox"
                  class:slide-poll-checkbox-checked={isSelected}
                >
                  {#if isSelected}
                    <svg
                      class="slide-poll-check-icon"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  {/if}
                </div>
              {:else}
                <div
                  class="slide-poll-radio"
                  class:slide-poll-radio-checked={isSelected}
                >
                  {#if isSelected}
                    <div class="slide-poll-radio-dot" />
                  {/if}
                </div>
              {/if}
            </div>
          {/if}
        </button>
      </div>
    {/each}
  </div>

  {#if showResults}
    <div class="slide-poll-footer">
      <p class="slide-poll-total">
        Total responses: {getTotalVotes()}
      </p>
    </div>
  {/if}
</div>
