/**
 * TitleSlide Component
 * Hero slide for presentation opening
 *
 * @deprecated Use ContentCard with variant="featured" instead for modern card-based presentations
 * @see {@link ContentCard}
 */

import { ReactNode } from 'react';
import { ContentCard } from './cards/ContentCard';
import clsx from 'clsx';

export interface TitleSlideProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  logo?: string;
  backgroundImage?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Hero slide for presentation opening
 *
 * @deprecated Use ContentCard with variant="featured" instead. This component is maintained for backwards compatibility.
 *
 * Migration:
 * ```tsx
 * // Old (deprecated):
 * <TitleSlide
 *   title="My Presentation"
 *   subtitle="An amazing talk"
 *   author="John Doe"
 *   backgroundImage="/hero.jpg"
 * />
 *
 * // New (recommended):
 * <ContentCard
 *   title="My Presentation"
 *   subtitle="An amazing talk"
 *   variant="featured"
 *   backgroundImage="/hero.jpg"
 *   footer={<p className="text-center">John Doe</p>}
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TitleSlide
 *   title="My Presentation"
 *   subtitle="An amazing talk"
 *   author="John Doe"
 *   date="October 2025"
 * />
 * ```
 */
export function TitleSlide({
  title,
  subtitle,
  author,
  date,
  logo,
  backgroundImage,
  className = '',
  children,
}: TitleSlideProps) {
  // Build footer content with author and date
  const footerContent = (author || date) ? (
    <div className="text-center space-y-2">
      {author && <p className="text-2xl font-medium">{author}</p>}
      {date && <p className="text-xl opacity-70">{date}</p>}
    </div>
  ) : undefined;

  // Build badge/logo if provided
  const badge = logo ? (
    <img
      className="h-12 w-auto"
      src={logo}
      alt="Logo"
    />
  ) : undefined;

  return (
    <ContentCard
      title={title}
      subtitle={subtitle}
      variant="featured"
      backgroundImage={backgroundImage}
      badge={badge}
      footer={footerContent}
      className={clsx('flex flex-col justify-center items-center text-center gap-8', className)}
      // Force slide-like appearance
      mode="full"
      aspectRatio="16/9"
    >
      {children}
    </ContentCard>
  );
}