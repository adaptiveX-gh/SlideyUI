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

  const getTotalVotes = () => {
    return options.reduce((sum, option) => sum + (option.percentage || 0), 0);
  };

  return (
    <div className={`slide-poll ${className}`}>
      <h3 className="slide-poll-question">{question}</h3>

      <div className="slide-poll-options">
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value);
          const percentage = option.percentage || 0;

          return (
            <div
              key={option.value}
              className={`slide-poll-option ${isSelected ? 'slide-poll-option-selected' : ''} ${
                showResults ? 'slide-poll-option-results' : ''
              }`}
            >
              <button
                className="slide-poll-option-button"
                onClick={() => handleOptionClick(option.value)}
                disabled={showResults}
                aria-pressed={isSelected}
              >
                <div className="slide-poll-option-content">
                  <span className="slide-poll-option-label">{option.label}</span>

                  {showResults && (
                    <span className="slide-poll-option-percentage">
                      {percentage}%
                    </span>
                  )}
                </div>

                {showResults && (
                  <div className="slide-poll-option-bar-container">
                    <div
                      className="slide-poll-option-bar"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}

                {!showResults && (
                  <div className="slide-poll-option-indicator">
                    {multiple ? (
                      <div
                        className={`slide-poll-checkbox ${
                          isSelected ? 'slide-poll-checkbox-checked' : ''
                        }`}
                      >
                        {isSelected && (
                          <svg
                            className="slide-poll-check-icon"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    ) : (
                      <div
                        className={`slide-poll-radio ${
                          isSelected ? 'slide-poll-radio-checked' : ''
                        }`}
                      >
                        {isSelected && <div className="slide-poll-radio-dot" />}
                      </div>
                    )}
                  </div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {showResults && (
        <div className="slide-poll-footer">
          <p className="slide-poll-total">
            Total responses: {getTotalVotes()}
          </p>
        </div>
      )}
    </div>
  );
}
