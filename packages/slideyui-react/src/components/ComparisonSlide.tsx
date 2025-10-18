/**
 * ComparisonSlide Component
 * Two-column comparison slide for contrasting concepts
 */

import { ComparisonSlideProps } from '../types';

/**
 * Comparison slide with two-column layout for contrasting content
 *
 * @example
 * ```tsx
 * <ComparisonSlide
 *   title="Before vs After"
 *   leftLabel="Before"
 *   rightLabel="After"
 *   variant="vs"
 *   leftContent={<div>Old approach...</div>}
 *   rightContent={<div>New approach...</div>}
 * />
 * ```
 */
export function ComparisonSlide({
  title,
  leftLabel,
  rightLabel,
  leftContent,
  rightContent,
  variant = 'default',
  className = '',
  children,
  backgroundImage,
  backgroundColor,
}: ComparisonSlideProps) {
  return (
    <div
      className={`slide slide-layout-comparison ${className}`}
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

        <div className="slide-comparison-container">
          <div className="slide-comparison-side slide-comparison-left">
            {leftLabel && <h3 className="slide-comparison-label">{leftLabel}</h3>}
            <div className="slide-comparison-content">
              {leftContent}
            </div>
          </div>

          {variant === 'vs' && (
            <div className="slide-comparison-divider">
              <span className="slide-comparison-vs">VS</span>
            </div>
          )}

          {variant === 'arrows' && (
            <div className="slide-comparison-divider">
              <span className="slide-comparison-arrow">�</span>
            </div>
          )}

          {variant === 'default' && (
            <div className="slide-comparison-divider">
              <div className="slide-comparison-line"></div>
            </div>
          )}

          <div className="slide-comparison-side slide-comparison-right">
            {rightLabel && <h3 className="slide-comparison-label">{rightLabel}</h3>}
            <div className="slide-comparison-content">
              {rightContent}
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
