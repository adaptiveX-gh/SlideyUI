/**
 * DataSlide Component
 * Slide optimized for displaying data visualizations and insights
 */

import { DataSlideProps } from '../types';

/**
 * Data-focused slide with insights and source attribution
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
  return (
    <div
      className={`slide slide-layout-data ${className}`}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="slide-content">
        {title && (
          <div className="slide-header">
            <h2 className="slide-title">{title}</h2>
          </div>
        )}

        <div className="slide-body">
          {children}
        </div>

        {insights && insights.length > 0 && (
          <div className="slide-insights">
            <h3 className="slide-insights-title">Key Insights</h3>
            <ul className="slide-insights-list">
              {insights.map((insight, index) => (
                <li key={index} className="slide-insight-item">
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {source && (
          <div className="slide-source">
            <small className="slide-source-text">Source: {source}</small>
          </div>
        )}
      </div>
    </div>
  );
}
