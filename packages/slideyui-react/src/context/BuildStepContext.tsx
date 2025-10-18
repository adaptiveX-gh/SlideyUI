/**
 * Build Step Context Provider
 * Manages progressive disclosure state for animated content
 *
 * Works seamlessly with both traditional slide presentations and card-based layouts.
 * Integrates with PresentationContext for keyboard navigation in full-screen mode.
 *
 * @example
 * Basic usage with cards:
 * ```tsx
 * <BuildStepProvider totalSteps={3}>
 *   <ContentCard title="Step by Step">
 *     <BuildStep step={1}>First reveal</BuildStep>
 *     <BuildStep step={2}>Second reveal</BuildStep>
 *     <BuildStep step={3}>Third reveal</BuildStep>
 *   </ContentCard>
 * </BuildStepProvider>
 * ```
 *
 * @example
 * Programmatic control:
 * ```tsx
 * function ControlledSteps() {
 *   const { currentStep, nextStep, previousStep, totalSteps } = useBuildSteps();
 *
 *   return (
 *     <div>
 *       <p>Step {currentStep} of {totalSteps}</p>
 *       <button onClick={previousStep}>Previous</button>
 *       <button onClick={nextStep}>Next</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Integration with presentation mode:
 * ```tsx
 * <Presentation>
 *   <BuildStepProvider totalSteps={4}>
 *     <ContentCard title="Progressive Disclosure">
 *       <BuildStep step={1}>Point 1</BuildStep>
 *       <BuildStep step={2}>Point 2</BuildStep>
 *       <BuildStep step={3}>Point 3</BuildStep>
 *       <BuildStep step={4}>Conclusion</BuildStep>
 *     </ContentCard>
 *   </BuildStepProvider>
 * </Presentation>
 * ```
 */

import { createContext, ReactNode, useCallback, useState, useEffect } from 'react';
import { BuildStepContextValue } from '../types';

export const BuildStepContext = createContext<BuildStepContextValue | null>(null);

interface BuildStepProviderProps {
  children: ReactNode;
  /** Total number of build steps */
  totalSteps: number;
  /** Enable keyboard navigation (Arrow keys, Space) */
  enableKeyboard?: boolean;
  /** Callback when step changes */
  onStepChange?: (step: number) => void;
}

export function BuildStepProvider({
  children,
  totalSteps,
  enableKeyboard = true,
  onStepChange,
}: BuildStepProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const isStepVisible = useCallback(
    (step: number) => {
      return step <= currentStep;
    },
    [currentStep]
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.min(prev + 1, totalSteps);
      if (next !== prev) {
        onStepChange?.(next);
      }
      return next;
    });
  }, [totalSteps, onStepChange]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => {
      const next = Math.max(prev - 1, 0);
      if (next !== prev) {
        onStepChange?.(next);
      }
      return next;
    });
  }, [onStepChange]);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
    onStepChange?.(0);
  }, [onStepChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if no input is focused
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      switch (event.key) {
        case 'ArrowRight':
        case ' ': // Space
          if (currentStep < totalSteps) {
            event.preventDefault();
            nextStep();
          }
          break;
        case 'ArrowLeft':
          if (currentStep > 0) {
            event.preventDefault();
            previousStep();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboard, currentStep, totalSteps, nextStep, previousStep]);

  const value: BuildStepContextValue = {
    currentStep,
    totalSteps,
    isStepVisible,
    nextStep,
    previousStep,
    resetSteps,
  };

  return <BuildStepContext.Provider value={value}>{children}</BuildStepContext.Provider>;
}
