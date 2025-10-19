/**
 * Basic Layout Components
 * Presentation-optimized 16:9 layout patterns for card composition
 *
 * These layouts provide common slide patterns optimized for AI generation:
 * - Blank card templates
 * - Image and text combinations
 * - Multi-column layouts
 * - Title with bullet points
 */

import React from 'react';
import clsx from 'clsx';

// ============================================================================
// 1. Blank Card
// ============================================================================

/**
 * BlankLayout - Empty card template for custom content
 */
export interface BlankLayoutProps {
  /** Content to render */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const BlankLayout: React.FC<BlankLayoutProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('w-full h-full', className)} {...props}>
      {children}
    </div>
  );
};

// ============================================================================
// 2. Image and Text (Image Left, Text Right)
// ============================================================================

/**
 * ImageAndTextLayout - Image on left, text content on right
 */
export interface ImageAndTextLayoutProps {
  /** Image source URL */
  image: string;
  /** Image alt text */
  imageAlt?: string;
  /** Text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const ImageAndTextLayout: React.FC<ImageAndTextLayoutProps> = ({
  image,
  imageAlt = '',
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-split', className)} {...props}>
      <div className="card-layout-split-image">
        <img src={image} alt={imageAlt} />
      </div>
      <div className="card-layout-split-content">{children}</div>
    </div>
  );
};

// ============================================================================
// 3. Text and Image (Text Left, Image Right)
// ============================================================================

/**
 * TextAndImageLayout - Text content on left, image on right
 */
export interface TextAndImageLayoutProps {
  /** Image source URL */
  image: string;
  /** Image alt text */
  imageAlt?: string;
  /** Text content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const TextAndImageLayout: React.FC<TextAndImageLayoutProps> = ({
  image,
  imageAlt = '',
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-split card-layout-split-reverse', className)} {...props}>
      <div className="card-layout-split-content">{children}</div>
      <div className="card-layout-split-image">
        <img src={image} alt={imageAlt} />
      </div>
    </div>
  );
};

// ============================================================================
// 4. Two Columns
// ============================================================================

/**
 * TwoColumnLayout - Simple two-column layout
 */
export interface TwoColumnLayoutProps {
  /** Left column content */
  left: React.ReactNode;
  /** Right column content */
  right: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const TwoColumnLayout: React.FC<TwoColumnLayoutProps> = ({
  left,
  right,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-2col', className)} {...props}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

// ============================================================================
// 5. Two Columns with Headings
// ============================================================================

/**
 * TwoColumnWithHeadingsLayout - Two columns each with a heading
 */
export interface TwoColumnWithHeadingsLayoutProps {
  /** Left column heading */
  leftHeading: React.ReactNode;
  /** Left column content */
  leftContent: React.ReactNode;
  /** Right column heading */
  rightHeading: React.ReactNode;
  /** Right column content */
  rightContent: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const TwoColumnWithHeadingsLayout: React.FC<TwoColumnWithHeadingsLayoutProps> = ({
  leftHeading,
  leftContent,
  rightHeading,
  rightContent,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-2col', className)} {...props}>
      <div className="card-layout-col">
        <h3 className="card-layout-col-heading">{leftHeading}</h3>
        <div className="card-layout-col-content">{leftContent}</div>
      </div>
      <div className="card-layout-col">
        <h3 className="card-layout-col-heading">{rightHeading}</h3>
        <div className="card-layout-col-content">{rightContent}</div>
      </div>
    </div>
  );
};

// ============================================================================
// 6. Three Columns
// ============================================================================

/**
 * ThreeColumnLayout - Simple three-column layout
 */
export interface ThreeColumnLayoutProps {
  /** First column content */
  first: React.ReactNode;
  /** Second column content */
  second: React.ReactNode;
  /** Third column content */
  third: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  first,
  second,
  third,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-3col', className)} {...props}>
      <div>{first}</div>
      <div>{second}</div>
      <div>{third}</div>
    </div>
  );
};

// ============================================================================
// 7. Three Columns with Headings
// ============================================================================

/**
 * ThreeColumnWithHeadingsLayout - Three columns each with a heading
 */
export interface ThreeColumnWithHeadingsLayoutProps {
  /** First column heading */
  firstHeading: React.ReactNode;
  /** First column content */
  firstContent: React.ReactNode;
  /** Second column heading */
  secondHeading: React.ReactNode;
  /** Second column content */
  secondContent: React.ReactNode;
  /** Third column heading */
  thirdHeading: React.ReactNode;
  /** Third column content */
  thirdContent: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const ThreeColumnWithHeadingsLayout: React.FC<ThreeColumnWithHeadingsLayoutProps> = ({
  firstHeading,
  firstContent,
  secondHeading,
  secondContent,
  thirdHeading,
  thirdContent,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-3col', className)} {...props}>
      <div className="card-layout-col">
        <h3 className="card-layout-col-heading">{firstHeading}</h3>
        <div className="card-layout-col-content">{firstContent}</div>
      </div>
      <div className="card-layout-col">
        <h3 className="card-layout-col-heading">{secondHeading}</h3>
        <div className="card-layout-col-content">{secondContent}</div>
      </div>
      <div className="card-layout-col">
        <h3 className="card-layout-col-heading">{thirdHeading}</h3>
        <div className="card-layout-col-content">{thirdContent}</div>
      </div>
    </div>
  );
};

// ============================================================================
// 8. Four Columns
// ============================================================================

/**
 * FourColumnLayout - Four-column layout
 */
export interface FourColumnLayoutProps {
  /** First column content */
  first: React.ReactNode;
  /** Second column content */
  second: React.ReactNode;
  /** Third column content */
  third: React.ReactNode;
  /** Fourth column content */
  fourth: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
}

export const FourColumnLayout: React.FC<FourColumnLayoutProps> = ({
  first,
  second,
  third,
  fourth,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-4col', className)} {...props}>
      <div>{first}</div>
      <div>{second}</div>
      <div>{third}</div>
      <div>{fourth}</div>
    </div>
  );
};

// ============================================================================
// 9. Title with Bullets
// ============================================================================

/**
 * TitleWithBulletsLayout - Title at top with bullet points
 */
export interface TitleWithBulletsLayoutProps {
  /** Title text */
  title: React.ReactNode;
  /** Bullet point items */
  items: React.ReactNode[];
  /** Additional CSS classes */
  className?: string;
}

export const TitleWithBulletsLayout: React.FC<TitleWithBulletsLayoutProps> = ({
  title,
  items,
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-title-bullets', className)} {...props}>
      <h2 className="card-layout-title-bullets-header">{title}</h2>
      <ul className="card-layout-bullets">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

// ============================================================================
// 10. Title with Bullets and Image
// ============================================================================

/**
 * TitleWithBulletsAndImageLayout - Title, bullets on left, image on right
 */
export interface TitleWithBulletsAndImageLayoutProps {
  /** Title text */
  title: React.ReactNode;
  /** Bullet point items */
  items: React.ReactNode[];
  /** Image source URL */
  image: string;
  /** Image alt text */
  imageAlt?: string;
  /** Additional CSS classes */
  className?: string;
}

export const TitleWithBulletsAndImageLayout: React.FC<TitleWithBulletsAndImageLayoutProps> = ({
  title,
  items,
  image,
  imageAlt = '',
  className = '',
  ...props
}) => {
  return (
    <div className={clsx('card-layout-title-bullets-image', className)} {...props}>
      <div className="card-layout-title-bullets-image-content">
        <h2 className="card-layout-title-bullets-header">{title}</h2>
        <ul className="card-layout-bullets">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="card-layout-split-image">
        <img src={image} alt={imageAlt} />
      </div>
    </div>
  );
};
