/**
 * EmbedCard Component
 * Embeds rich media from various providers (YouTube, Vimeo, TikTok, custom)
 * Optimized for presentation scale with responsive aspect ratios
 */

import { useState } from 'react';
import { EmbedCardProps } from '../../types';
import { CardContainer } from './CardContainer';
import clsx from 'clsx';

/**
 * Generates provider-specific iframe URL with optimal parameters
 */
function getEmbedUrl(provider: string, embedUrl: string, autoplay: boolean): string {
  try {
    const url = new URL(embedUrl);

    // Security: Only allow http/https protocols
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      console.warn(`[EmbedCard] Invalid protocol: ${url.protocol}. Only http/https allowed.`);
      return '';
    }

    switch (provider) {
      case 'youtube':
        url.searchParams.set('autoplay', autoplay ? '1' : '0');
        url.searchParams.set('rel', '0');
        url.searchParams.set('modestbranding', '1');
        break;
      case 'vimeo':
        url.searchParams.set('autoplay', autoplay ? '1' : '0');
        url.searchParams.set('title', '0');
        url.searchParams.set('byline', '0');
        url.searchParams.set('portrait', '0');
        break;
      case 'tiktok':
      case 'custom':
      default:
        // Use URL as-is for TikTok and custom embeds
        break;
    }

    return url.toString();
  } catch (error) {
    console.error('[EmbedCard] Invalid embedUrl:', embedUrl, error);
    return '';
  }
}

/**
 * Rich media embed card for presentations
 *
 * @example
 * ```tsx
 * // YouTube embed
 * <EmbedCard
 *   provider="youtube"
 *   embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
 *   title="Demo Video"
 *   caption="Watch our product demo"
 *   aspectRatio="16/9"
 * />
 *
 * // Vimeo embed with autoplay
 * <EmbedCard
 *   provider="vimeo"
 *   embedUrl="https://player.vimeo.com/video/123456789"
 *   title="Vimeo Demo"
 *   autoplay
 * />
 *
 * // TikTok embed
 * <EmbedCard
 *   provider="tiktok"
 *   embedUrl="https://www.tiktok.com/embed/v2/7123456789"
 *   title="TikTok Demo"
 *   aspectRatio="9/16"
 * />
 *
 * // Custom iframe embed
 * <EmbedCard
 *   provider="custom"
 *   embedUrl="https://example.com/interactive-demo"
 *   title="Interactive Demo"
 *   allowFullscreen
 * />
 * ```
 */
export function EmbedCard({
  provider,
  embedUrl,
  title,
  caption,
  aspectRatio = '16/9',
  allowFullscreen = true,
  autoplay = false,
  children,
  className = '',
  ...containerProps
}: EmbedCardProps) {
  const [loadError, setLoadError] = useState(false);
  const finalEmbedUrl = getEmbedUrl(provider, embedUrl, autoplay);

  // Build iframe allow attribute based on props
  const allowAttributes = [
    'accelerometer',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture',
    allowFullscreen && 'fullscreen',
    autoplay && 'autoplay',
  ].filter(Boolean).join('; ');

  if (!finalEmbedUrl || loadError) {
    return (
      <CardContainer {...containerProps} className={clsx('slide-embed-card', className)}>
        <div className="flex flex-col items-center justify-center p-8 text-slidey-muted-foreground">
          {children || (
            <>
              <p className="text-lg mb-2">Failed to load embed</p>
              <p className="text-sm">Please check the URL and try again</p>
            </>
          )}
        </div>
      </CardContainer>
    );
  }

  return (
    <CardContainer
      {...containerProps}
      aspectRatio={aspectRatio}
      className={clsx('slide-embed-card', className)}
    >
      <div className="relative w-full h-full">
        <iframe
          src={finalEmbedUrl}
          title={title || `${provider} embed`}
          className="slide-embed-iframe"
          allow={allowAttributes}
          allowFullScreen={allowFullscreen}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-presentation"
          onError={() => setLoadError(true)}
        />

        {/* Fallback content if embed fails */}
        {children && (
          <noscript>
            <div className="absolute inset-0 flex items-center justify-center p-6 bg-slidey-muted">
              {children}
            </div>
          </noscript>
        )}
      </div>

      {/* Caption below embed */}
      {caption && (
        <div className="slide-embed-caption">
          {caption}
        </div>
      )}
    </CardContainer>
  );
}
