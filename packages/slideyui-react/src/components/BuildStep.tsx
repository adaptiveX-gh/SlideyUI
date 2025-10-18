/**
 * BuildStep Component
 * Progressive disclosure wrapper for step-by-step content reveal
 */

import { useState, useEffect } from 'react';
import { BuildStepProps } from '../types';
import { useSlideContext } from '../hooks/useSlideContext';

/**
 * Wrapper component for progressive disclosure of content
 * Shows/hides content based on current build step
 *
 * @example
 * ```tsx
 * <ContentSlide title="Progressive List">
 *   <BuildStep step={1}>First item appears</BuildStep>
 *   <BuildStep step={2}>Second item appears</BuildStep>
 *   <BuildStep step={3}>Third item appears</BuildStep>
 * </ContentSlide>
 * ```
 */
export function BuildStep({
  step,
  children,
  animation = 'fade',
  className = '',
}: BuildStepProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { currentSlide } = useSlideContext();

  useEffect(() => {
    // Reset step when slide changes
    setCurrentStep(0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        setCurrentStep((prev) => prev + 1);
      } else if (event.key === 'ArrowLeft') {
        setCurrentStep((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const isVisible = currentStep >= step;

  if (!isVisible) {
    return null;
  }

  const animationClass = animation !== 'none' ? `slide-build-${animation}` : '';

  return (
    <div className={`slide-build-step ${animationClass} ${className}`}>
      {children}
    </div>
  );
}
