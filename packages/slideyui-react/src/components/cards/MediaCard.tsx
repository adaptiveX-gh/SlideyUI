/**
 * MediaCard Component
 * Image and video-focused presentation card
 * Optimized for visual content with optional overlays and captions
 */

import { MediaCardProps } from '../../types';
import { CardContainer } from './CardContainer';
import clsx from 'clsx';

const objectFitClasses: Record<string, string> = {
  cover: 'object-cover',
  contain: 'object-contain',
  fill: 'object-fill',
};

/**
 * Media-focused card for images and videos
 *
 * @example
 * ```tsx
 * // Image card with caption
 * <MediaCard
 *   src="/images/chart.png"
 *   alt="Sales growth chart"
 *   caption="Q4 Revenue: +42%"
 * />
 *
 * // Background image with overlay content
 * <MediaCard
 *   src="/images/hero.jpg"
 *   asBackground
 *   overlay={<div className="bg-black/50 p-6 rounded-lg">...</div>}
 * >
 *   <h2 className="text-white text-4xl">Overlay Content</h2>
 * </MediaCard>
 * ```
 */
export function MediaCard({
  src,
  alt = '',
  mediaType = 'image',
  title,
  caption,
  objectFit = 'cover',
  overlay,
  asBackground = false,
  children,
  padding = 'none',
  className = '',
  ...containerProps
}: MediaCardProps) {
  const paddingClass = {
    compact: 'slide-card-compact',
    default: '',
    spacious: 'slide-card-spacious',
    none: 'slide-card-flush',
  }[padding];

  if (asBackground) {
    // Use media as background with content overlay
    return (
      <CardContainer
        {...containerProps}
        backgroundImage={src}
        className={clsx('relative flex items-center justify-center', paddingClass, className)}
      >
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {overlay}
          </div>
        )}
        {children && <div className="relative z-10">{children}</div>}
      </CardContainer>
    );
  }

  return (
    <CardContainer {...containerProps} className={clsx('relative overflow-hidden', paddingClass, className)}>
      {/* Media Content */}
      <div className="relative w-full h-full">
        {mediaType === 'video' ? (
          <video
            src={src}
            className={clsx('w-full h-full', objectFitClasses[objectFit])}
            controls
            playsInline
          >
            <track kind="captions" />
          </video>
        ) : (
          <img
            src={src}
            alt={alt}
            className={clsx('w-full h-full', objectFitClasses[objectFit])}
            loading="lazy"
          />
        )}

        {/* Title Overlay */}
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white text-2xl font-semibold">{title}</h3>
          </div>
        )}

        {/* Custom Overlay */}
        {overlay && (
          <div className="absolute inset-0 flex items-center justify-center">
            {overlay}
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-slidey-background/95 p-4 border-t border-slidey-border">
          <div className="text-sm text-slidey-muted-foreground">{caption}</div>
        </div>
      )}
    </CardContainer>
  );
}
