/**
 * Hook to manage build steps for progressive disclosure
 */

import { useContext } from 'react';
import { BuildStepContext } from '../context/BuildStepContext';

/**
 * Access build step context for progressive disclosure
 * @returns Build step context value
 *
 * @example
 * ```tsx
 * function AnimatedList() {
 *   const { isStepVisible } = useBuildSteps();
 *   return (
 *     <ul>
 *       {items.map((item, i) => (
 *         <li key={i} style={{ opacity: isStepVisible(i) ? 1 : 0 }}>
 *           {item}
 *         </li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useBuildSteps() {
  const context = useContext(BuildStepContext);
  return context;
}
