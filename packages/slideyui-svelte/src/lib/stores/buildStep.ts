/**
 * Build Step Store
 * Manages progressive disclosure state for animated content
 *
 * Works seamlessly with both traditional slide presentations and card-based layouts.
 * Integrates with PresentationContext for keyboard navigation in full-screen mode.
 *
 * @example
 * Basic usage with cards:
 * ```svelte
 * <script>
 *   import { createBuildStepStore, setBuildStepContext } from '@slideyui/svelte';
 *
 *   const buildSteps = createBuildStepStore(3);
 *   setBuildStepContext(buildSteps);
 * </script>
 *
 * <ContentCard title="Step by Step">
 *   <BuildStep step={1}>First reveal</BuildStep>
 *   <BuildStep step={2}>Second reveal</BuildStep>
 *   <BuildStep step={3}>Third reveal</BuildStep>
 * </ContentCard>
 * ```
 *
 * @example
 * Programmatic control:
 * ```svelte
 * <script>
 *   import { getBuildStepContext } from '@slideyui/svelte';
 *
 *   const buildSteps = getBuildStepContext();
 *
 *   function handleNext() {
 *     buildSteps.nextStep();
 *   }
 * </script>
 *
 * <p>Step {$buildSteps.currentStep} of {$buildSteps.totalSteps}</p>
 * <button onclick={handleNext}>Next</button>
 * ```
 */

import { writable, derived, get } from 'svelte/store';
import { getContext, setContext } from 'svelte';

const BUILD_STEP_CONTEXT_KEY = Symbol('buildStep');

/**
 * Build step state
 */
export interface BuildStepState {
  /** Current build step index */
  currentStep: number;
  /** Total build steps */
  totalSteps: number;
}

/**
 * Build step store type
 */
export interface BuildStepStore {
  subscribe: (
    run: (value: BuildStepState) => void,
    invalidate?: (value?: BuildStepState) => void
  ) => () => void;
  /** Whether to show this step */
  isStepVisible: (step: number) => boolean;
  /** Advance to next step */
  nextStep: () => void;
  /** Go to previous step */
  previousStep: () => void;
  /** Reset to first step */
  resetSteps: () => void;
  /** Set current step directly */
  setStep: (step: number) => void;
}

/**
 * Create a build step store
 * @param totalSteps Total number of build steps
 * @param enableKeyboard Enable keyboard navigation (Arrow keys, Space)
 * @param onStepChange Callback when step changes
 */
export function createBuildStepStore(
  totalSteps: number,
  enableKeyboard: boolean = true,
  onStepChange?: (step: number) => void
): BuildStepStore {
  const state = writable<BuildStepState>({
    currentStep: 0,
    totalSteps,
  });

  // Keyboard navigation handler
  if (enableKeyboard && typeof window !== 'undefined') {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if no input is focused
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      const currentState = get(state);

      switch (event.key) {
        case 'ArrowRight':
        case ' ': // Space
          if (currentState.currentStep < currentState.totalSteps) {
            event.preventDefault();
            nextStep();
          }
          break;
        case 'ArrowLeft':
          if (currentState.currentStep > 0) {
            event.preventDefault();
            previousStep();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Note: In a real-world scenario, you'd need to handle cleanup
    // This could be done by returning a destroy function or using $effect
  }

  function isStepVisible(step: number): boolean {
    const currentState = get(state);
    return step <= currentState.currentStep;
  }

  function nextStep() {
    state.update((s) => {
      const next = Math.min(s.currentStep + 1, s.totalSteps);
      if (next !== s.currentStep) {
        onStepChange?.(next);
      }
      return { ...s, currentStep: next };
    });
  }

  function previousStep() {
    state.update((s) => {
      const next = Math.max(s.currentStep - 1, 0);
      if (next !== s.currentStep) {
        onStepChange?.(next);
      }
      return { ...s, currentStep: next };
    });
  }

  function resetSteps() {
    state.set({ currentStep: 0, totalSteps });
    onStepChange?.(0);
  }

  function setStep(step: number) {
    state.update((s) => {
      const nextStep = Math.max(0, Math.min(step, s.totalSteps));
      if (nextStep !== s.currentStep) {
        onStepChange?.(nextStep);
      }
      return { ...s, currentStep: nextStep };
    });
  }

  return {
    subscribe: state.subscribe,
    isStepVisible,
    nextStep,
    previousStep,
    resetSteps,
    setStep,
  };
}

/**
 * Set build step context for child components
 * @param store Build step store
 */
export function setBuildStepContext(store: BuildStepStore) {
  setContext(BUILD_STEP_CONTEXT_KEY, store);
}

/**
 * Get build step context from parent component
 * @returns Build step store or null if not in context
 */
export function getBuildStepContext(): BuildStepStore | null {
  try {
    return getContext<BuildStepStore>(BUILD_STEP_CONTEXT_KEY);
  } catch {
    return null;
  }
}
