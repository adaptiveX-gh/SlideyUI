/**
 * TitleSlide Component
 * Hero slide for presentation opening
 */

import { ReactNode } from 'react';

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
  return (
    <div className={`slide slide-layout-title ${className}`}>
      {backgroundImage && (
        <div
          className="slide-bleed slide-overlay-gradient"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}

      <div className="slide-content-center z-10">
        <h1 className="slide-title-hero">{title}</h1>
        {subtitle && <h2 className="slide-subtitle mt-4">{subtitle}</h2>}

        {(author || date) && (
          <div className="slide-meta mt-8 space-y-2">
            {author && <p className="slide-author text-2xl">{author}</p>}
            {date && <p className="slide-date text-xl text-slide-muted">{date}</p>}
          </div>
        )}

        {children}
      </div>

      {logo && (
        <img
          className="slide-logo-corner absolute top-8 right-8 h-16 w-auto"
          src={logo}
          alt="Logo"
        />
      )}
    </div>
  );
}