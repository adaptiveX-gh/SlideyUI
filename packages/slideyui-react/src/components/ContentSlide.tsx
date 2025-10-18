/**
 * ContentSlide Component
 * Standard content slide with title and flexible layout options
 */

import { ContentSlideProps } from '../types';

/**
 * Standard content slide with title and customizable layouts
 *
 * @example
 * ```tsx
 * <ContentSlide title="Key Features" layout="centered">
 *   <ul className="slide-list">
 *     <li>Feature 1</li>
 *     <li>Feature 2</li>
 *   </ul>
 * </ContentSlide>
 * ```
 */
export function ContentSlide({
  title,
  subtitle,
  layout = 'default',
  divider = false,
  className = '',
  children,
  backgroundImage,
  backgroundColor,
}: ContentSlideProps) {
  const layoutClass = layout !== 'default' ? `slide-layout-${layout}` : '';

  return (
    <div
      className={`slide slide-layout-content ${layoutClass} ${className}`}
      style={{
        backgroundColor,
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="slide-content">
        {(title || subtitle) && (
          <div className={`slide-header ${divider ? 'slide-divider' : ''}`}>
            {title && <h2 className="slide-title">{title}</h2>}
            {subtitle && <h3 className="slide-subtitle">{subtitle}</h3>}
          </div>
        )}

        <div className="slide-body">
          {children}
        </div>
      </div>
    </div>
  );
}
