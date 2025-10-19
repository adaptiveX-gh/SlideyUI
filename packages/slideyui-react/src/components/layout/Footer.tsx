import React from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Content to display in the footer
   */
  children: React.ReactNode;

  /**
   * Footer layout style
   * @default "default"
   */
  layout?: 'default' | 'grid-2' | 'grid-3' | 'grid-4' | 'center';

  /**
   * Background image URL for the footer
   */
  backgroundImage?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Footer - Presentation-optimized footer component for cards and slides
 *
 * @example
 * ```tsx
 * // Simple footer
 * <Footer>
 *   <p>© 2024 Company Name</p>
 * </Footer>
 *
 * // Footer with grid layout
 * <Footer layout="grid-3">
 *   <FooterSection title="Products">
 *     <a href="#">Product 1</a>
 *     <a href="#">Product 2</a>
 *   </FooterSection>
 * </Footer>
 *
 * // Footer with background image
 * <Footer backgroundImage="/footer-bg.jpg">
 *   <FooterSection title="Contact Us">
 *     <p>Get in touch</p>
 *   </FooterSection>
 * </Footer>
 * ```
 *
 * @component
 */
export const Footer: React.FC<FooterProps> = ({
  children,
  layout = 'default',
  backgroundImage,
  className = '',
  style,
  ...props
}) => {
  const baseClass = 'card-footer';
  const layoutClass = layout !== 'default' ? `card-footer-${layout}` : '';
  const imageClass = backgroundImage ? 'card-footer-image' : '';

  const classes = [baseClass, layoutClass, imageClass, className]
    .filter(Boolean)
    .join(' ');

  const combinedStyle = backgroundImage
    ? { ...style, backgroundImage: `url(${backgroundImage})` }
    : style;

  return (
    <footer className={classes} style={combinedStyle} {...props}>
      {children}
    </footer>
  );
};

Footer.displayName = 'Footer';

export interface FooterSectionProps {
  /**
   * Section title
   */
  title?: string;

  /**
   * Section content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FooterSection - A section within a footer for organizing content
 *
 * @example
 * ```tsx
 * <FooterSection title="Company">
 *   <a href="/about">About</a>
 *   <a href="/careers">Careers</a>
 * </FooterSection>
 * ```
 */
export const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <div className={`card-footer-section ${className}`}>
      {title && <h3 className="card-footer-title">{title}</h3>}
      {children}
    </div>
  );
};

FooterSection.displayName = 'FooterSection';

export interface FooterLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;
}

/**
 * FooterLink - A styled link for footer navigation
 */
export const FooterLink: React.FC<FooterLinkProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <a className={`card-footer-link ${className}`} {...props}>
      {children}
    </a>
  );
};

FooterLink.displayName = 'FooterLink';

export interface FooterSocialProps {
  /**
   * Social media links
   */
  links: Array<{
    icon: React.ReactNode;
    href: string;
    label: string;
  }>;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FooterSocial - Social media icon links for footer
 *
 * @example
 * ```tsx
 * <FooterSocial
 *   links={[
 *     { icon: <TwitterIcon />, href: "https://twitter.com", label: "Twitter" },
 *     { icon: <FacebookIcon />, href: "https://facebook.com", label: "Facebook" }
 *   ]}
 * />
 * ```
 */
export const FooterSocial: React.FC<FooterSocialProps> = ({
  links,
  className = '',
}) => {
  return (
    <div className={`card-footer-social ${className}`}>
      {links.map((link, index) => (
        <a
          key={index}
          href={link.href}
          aria-label={link.label}
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

FooterSocial.displayName = 'FooterSocial';

export interface FooterNewsletterProps {
  /**
   * Newsletter signup handler
   */
  onSubmit?: (email: string) => void;

  /**
   * Placeholder text for email input
   */
  placeholder?: string;

  /**
   * Button text
   */
  buttonText?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FooterNewsletter - Newsletter signup form for footer
 *
 * @example
 * ```tsx
 * <FooterNewsletter
 *   onSubmit={(email) => console.log(email)}
 *   placeholder="Enter your email"
 *   buttonText="Subscribe"
 * />
 * ```
 */
export const FooterNewsletter: React.FC<FooterNewsletterProps> = ({
  onSubmit,
  placeholder = 'Enter your email',
  buttonText = 'Subscribe',
  className = '',
}) => {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && email) {
      onSubmit(email);
      setEmail('');
    }
  };

  return (
    <form className={`card-footer-newsletter ${className}`} onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

FooterNewsletter.displayName = 'FooterNewsletter';

export interface FooterLegalProps {
  /**
   * Legal text content
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * FooterLegal - Legal/copyright text for footer
 *
 * @example
 * ```tsx
 * <FooterLegal>
 *   © 2024 Company Name. All rights reserved.
 * </FooterLegal>
 * ```
 */
export const FooterLegal: React.FC<FooterLegalProps> = ({
  children,
  className = '',
}) => {
  return <div className={`card-footer-legal ${className}`}>{children}</div>;
};

FooterLegal.displayName = 'FooterLegal';
