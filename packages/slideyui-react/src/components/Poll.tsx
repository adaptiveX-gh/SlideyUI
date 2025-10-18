/**
 * Poll Component
 * Interactive poll with results visualization
 */

import { useState } from 'react';
import { SlidePollProps } from '../types';

/**
 * Interactive poll component with results display
 *
 * @example
 * ```tsx
 * <Poll
 *   question="What's your favorite framework?"
 *   options={[
 *     { label: 'React', value: 'react', percentage: 45 },
 *     { label: 'Vue', value: 'vue', percentage: 30 },
 *     { label: 'Svelte', value: 'svelte', percentage: 25 },
 *   ]}
 *   showResults
 * />
 * ```
 */
export function Poll({
  question,
  options,
  showResults = false,
  multiple = false,
  className = '',
  onVote,
}: SlidePollProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleOptionClick = (value: string) => {
    let newSelection: string[];

    if (multiple) {
      // Toggle selection for multiple choice
      if (selectedValues.includes(value)) {
        newSelection = selectedValues.filter((v) => v !== value);
      } else {
        newSelection = [...selectedValues, value];
      }
    } else {
      // Single selection
      newSelection = [value];
    }

    setSelectedValues(newSelection);

    if (onVote) {
      onVote(multiple ? newSelection : newSelection[0]);
    }
  };

  return (
    <div className={`card-poll ${className}`}>
      <h3 className="card-poll-question">{question}</h3>

      <div className="card-poll-options">
        {options.map((option, index) => {
          const isSelected = selectedValues.includes(option.value);
          const letter = String.fromCharCode(65 + index); // A, B, C, D...

          return (
            <button
              key={option.value}
              className={`card-poll-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
              disabled={showResults}
            >
              <span className="card-poll-option-letter">{letter}</span>
              <span className="card-poll-option-text">{option.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
