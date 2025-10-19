/**
 * Hero Component Family
 * Presentation-optimized hero sections for cards and slides
 * Includes centered content, background images, and split layouts
 */

import React from 'react';
import clsx from 'clsx';

/**
 * Hero - Main hero container
 */
export interface HeroProps {
  /** Hero content */
  children: React.ReactNode;
  /** Background image URL */
  backgroundImage?: string;
  /** Apply overlay gradient */
  overlay?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
}

export const Hero: React.FC<HeroProps> = ({
  children,
  backgroundImage,
  overlay = false,
  className = '',
  style,
  ...props
}) => {
  const combinedStyle = backgroundImage
    ? { ...style, backgroundImage: `url(${backgroundImage})` }
    : style;

  const classes = clsx(
    'card-hero',
    backgroundImage && 'card-hero-image',
    overlay && 'card-hero-overlay',
    className
  );

  return (
    <div className={classes} style={combinedStyle} {...props}>
      {children}
    </div>
  );
};

/**
 * HeroContent - Content wrapper for hero sections
 */
export interface HeroContentProps {
  /** Content alignment */
  align?: 'center' | 'start' | 'end';
  /** Hero content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const HeroContent: React.FC<HeroContentProps> = ({
  align = 'center',
  children,
  className = '',
  ...props
}) => {
  const classes = clsx(
    'card-hero-content',
    align === 'start' && 'card-hero-content-start',
    align === 'end' && 'card-hero-content-end',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * HeroTitle - Hero title/heading
 */
export interface HeroTitleProps {
  /** Title content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const HeroTitle: React.FC<HeroTitleProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h1 className={clsx('card-hero-title', className)} {...props}>
      {children}
    </h1>
  );
};

/**
 * HeroSubtitle - Hero subtitle/description
 */
export interface HeroSubtitleProps {
  /** Subtitle content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const HeroSubtitle: React.FC<HeroSubtitleProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <p className={clsx('card-hero-subtitle', className)} {...props}>
      {children}
    </p>
  );
};

/**
 * HeroActions - Action buttons container
 */
export interface HeroActionsProps {
  /** Action buttons */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const HeroActions: React.FC<HeroActionsProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-hero-actions', className)} {...props}>
      {children}
    </div>
  );
};

/**
 * HeroButton - Styled hero button
 */
export interface HeroButtonProps {
  /** Button content */
  children: React.ReactNode;
  /** Button variant */
  variant?: 'primary' | 'outline';
  /** Button href (renders as link if provided) */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

export const HeroButton: React.FC<HeroButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  ...props
}) => {
  const classes = clsx(
    'card-hero-button',
    variant === 'outline' && 'card-hero-button-outline',
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

/**
 * HeroSplit - Split layout container (content + image)
 */
export interface HeroSplitProps {
  /** Split content */
  children: React.ReactNode;
  /** Reverse layout order */
  reverse?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export const HeroSplit: React.FC<HeroSplitProps> = ({
  children,
  reverse = false,
  className = '',
  ...props
}) => {
  const classes = clsx(
    'card-hero-split',
    reverse && 'card-hero-split-reverse',
    className
  );

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

/**
 * HeroFigure - Image/media container for split layout
 */
export interface HeroFigureProps {
  /** Image source */
  src: string;
  /** Alt text */
  alt?: string;
  /** Additional CSS classes */
  className?: string;
}

export const HeroFigure: React.FC<HeroFigureProps> = ({
  src,
  alt = '',
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-hero-figure', className)} {...props}>
      <img src={src} alt={alt} />
    </div>
  );
};
