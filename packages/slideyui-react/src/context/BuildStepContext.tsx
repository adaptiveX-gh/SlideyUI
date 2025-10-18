/**
 * Build Step Context Provider
 * Manages progressive disclosure state for animated content
 */

import { createContext, ReactNode, useCallback, useState } from 'react';
import { BuildStepContextValue } from '../types';

export const BuildStepContext = createContext<BuildStepContextValue | null>(null);

interface BuildStepProviderProps {
  children: ReactNode;
  totalSteps: number;
}

export function BuildStepProvider({ children, totalSteps }: BuildStepProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const isStepVisible = useCallback(
    (step: number) => {
      return step <= currentStep;
    },
    [currentStep]
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  }, [totalSteps]);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const resetSteps = useCallback(() => {
    setCurrentStep(0);
  }, []);

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
