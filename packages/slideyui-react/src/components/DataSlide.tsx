/**
 * DataSlide Component
 * Slide optimized for displaying data visualizations and insights
 *
 * @deprecated Use DataCard component instead for modern card-based presentations
 * @see {@link DataCard}
 */

import { DataSlideProps } from '../types';
import { DataCard } from './cards/DataCard';
import clsx from 'clsx';

/**
 * Data-focused slide with insights and source attribution
 *
 * @deprecated Use DataCard component instead. This component is maintained for backwards compatibility.
 *
 * Migration:
 * ```tsx
 * // Old (deprecated):
 * <DataSlide
 *   title="Q4 Results"
 *   insights={['Revenue up 25%', 'Customer growth 40%']}
 *   source="Internal Analytics"
 * >
 *   <div className="slide-chart">
 *     {/* Chart component here *\/}
 *   </div>
 * </DataSlide>
 *
 * // New (recommended):
 * <DataCard
 *   title="Q4 Results"
 *   variant="chart"
 *   footer="Source: Internal Analytics"
 * >
 *   <div className="slide-chart">
 *     {/* Chart component here *\/}
 *   </div>
 *   <div className="mt-4">
 *     <h4 className="font-semibold mb-2">Key Insights</h4>
 *     <ul>
 *       <li>Revenue up 25%</li>
 *       <li>Customer growth 40%</li>
 *     </ul>
 *   </div>
 * </DataCard>
 * ```
 *
 * @example
 * ```tsx
 * <DataSlide
 *   title="Q4 Results"
 *   insights={['Revenue up 25%', 'Customer growth 40%']}
 *   source="Internal Analytics"
 * >
 *   <div className="slide-chart">
 *     {/* Chart component here *\/}
 *   </div>
 * </DataSlide>
 * ```
 */
export function DataSlide({
  title,
  insights,
  source,
  className = '',
  children,
  backgroundImage,
  backgroundColor,
}: DataSlideProps) {
  // Build footer with source attribution
  const footerContent = source ? (
    <div className="text-sm text-slidey-muted-foreground">
      Source: {source}
    </div>
  ) : undefined;

  // Build children with insights appended
  const contentWithInsights = (
    <>
      {children}
      {insights && insights.length > 0 && (
        <div className="mt-6 p-4 bg-slidey-accent/5 rounded-lg border border-slidey-border">
          <h4 className="text-lg font-semibold mb-3">Key Insights</h4>
          <ul className="space-y-2">
            {insights.map((insight, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-slidey-accent mt-1">•</span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );

  return (
    <DataCard
      title={title}
      variant="chart"
      footer={footerContent}
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      className={clsx('flex flex-col gap-6', className)}
      // Force slide-like appearance
      mode="full"
      aspectRatio="16/9"
    >
      {contentWithInsights}
    </DataCard>
  );
}
