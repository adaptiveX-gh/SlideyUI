/**
 * BuildStep Component
 * Progressive disclosure wrapper for step-by-step content reveal
 */

import { useBuildSteps } from '../hooks/useBuildSteps';
import { BuildStepProps } from '../types';

/**
 * Wrapper component for progressive disclosure of content
 * Shows/hides content based on current build step
 *
 * Works in both traditional slide presentations and card-based layouts.
 * Must be wrapped in a BuildStepProvider to function.
 *
 * @example
 * Traditional slide usage:
 * ```tsx
 * <ContentSlide title="Progressive List">
 *   <BuildStep step={1}>First item appears</BuildStep>
 *   <BuildStep step={2}>Second item appears</BuildStep>
 *   <BuildStep step={3}>Third item appears</BuildStep>
 * </ContentSlide>
 * ```
 *
 * @example
 * Card-based usage:
 * ```tsx
 * <BuildStepProvider totalSteps={3}>
 *   <ContentCard title="Progressive Content">
 *     <BuildStep step={1}>
 *       <p>First point appears</p>
 *     </BuildStep>
 *     <BuildStep step={2}>
 *       <p>Second point appears</p>
 *     </BuildStep>
 *     <BuildStep step={3}>
 *       <p>Third point appears</p>
 *     </BuildStep>
 *   </ContentCard>
 * </BuildStepProvider>
 * ```
 *
 * @example
 * Using with custom animations:
 * ```tsx
 * <BuildStepProvider totalSteps={2}>
 *   <ContentCard title="Animated Reveals">
 *     <BuildStep step={1} animation="slide">
 *       Slides in from right
 *     </BuildStep>
 *     <BuildStep step={2} animation="scale">
 *       Scales up from center
 *     </BuildStep>
 *   </ContentCard>
 * </BuildStepProvider>
 * ```
 */
export function BuildStep({
  step,
  children,
  animation = 'fade',
  className = '',
}: BuildStepProps) {
  const buildContext = useBuildSteps();

  // If no BuildStepProvider, show all content immediately
  if (!buildContext) {
    return <div className={className}>{children}</div>;
  }

  const { isStepVisible } = buildContext;
  const isVisible = isStepVisible(step);

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
