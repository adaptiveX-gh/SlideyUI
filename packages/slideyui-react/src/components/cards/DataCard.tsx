/**
 * DataCard Component
 * Metrics, charts, and data visualization card
 * Optimized for presenting numerical data and insights
 */

import { DataCardProps } from '../../types';
import { CardContainer } from './CardContainer';
import clsx from 'clsx';

/**
 * Data-focused card for metrics, charts, and tables
 *
 * @example
 * ```tsx
 * // Metric card
 * <DataCard
 *   variant="metric"
 *   title="Revenue"
 *   value="$1.2M"
 *   label="Total Sales"
 *   trend="up"
 *   trendValue="+24%"
 *   icon={<DollarSign />}
 * />
 *
 * // Chart card
 * <DataCard
 *   variant="chart"
 *   title="Growth Trend"
 *   footer="Data from Q1-Q4 2024"
 * >
 *   <LineChart data={chartData} />
 * </DataCard>
 * ```
 */
export function DataCard({
  title,
  value,
  label,
  trend,
  trendValue,
  children,
  footer,
  icon,
  variant = 'metric',
  padding = 'spacious',
  className = '',
  ...containerProps
}: DataCardProps) {
  const trendIcons: Record<string, string> = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  const trendColors: Record<string, string> = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  const paddingClass = {
    compact: 'slide-card-compact',
    default: '',
    spacious: 'slide-card-spacious',
    none: 'slide-card-flush',
  }[padding];

  if (variant === 'metric') {
    return (
      <CardContainer {...containerProps} className={clsx('flex flex-col card-data-metric', paddingClass, className)}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {title && <h4 className="text-lg font-semibold text-slidey-muted-foreground">{title}</h4>}
          {icon && <div className="text-slidey-accent">{icon}</div>}
        </div>

        {/* Metric Value */}
        {value !== undefined && (
          <div className="mb-2">
            <div className="text-5xl font-bold text-slidey-foreground">{value}</div>
            {label && <div className="text-sm text-slidey-muted-foreground mt-1">{label}</div>}
          </div>
        )}

        {/* Trend Indicator */}
        {trend && (
          <div className={clsx('flex items-center gap-2 text-sm font-medium', trendColors[trend])}>
            <span className="text-xl">{trendIcons[trend]}</span>
            {trendValue && <span>{trendValue}</span>}
          </div>
        )}

        {/* Footer */}
        {footer && <div className="mt-auto pt-4 border-t border-slidey-border text-sm">{footer}</div>}
      </CardContainer>
    );
  }

  // Chart or Table variant
  return (
    <CardContainer {...containerProps} className={clsx('flex flex-col', paddingClass, className)}>
      {/* Header */}
      {title && (
        <div className="px-6 pt-6 pb-4 border-b border-slidey-border">
          <div className="flex items-start justify-between">
            <h4 className="text-xl font-semibold">{title}</h4>
            {icon && <div className="text-slidey-accent">{icon}</div>}
          </div>
        </div>
      )}

      {/* Chart/Table Content */}
      {children && (
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="px-6 pb-6 pt-4 border-t border-slidey-border text-sm text-slidey-muted-foreground">
          {footer}
        </div>
      )}
    </CardContainer>
  );
}
