import React from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Content to display in the header
   */
  children: React.ReactNode;

  /**
   * Header layout style
   * @default "default"
   */
  layout?: 'default' | 'center';

  /**
   * Make header sticky
   */
  sticky?: boolean;

  /**
   * Background image URL for the header
   */
  backgroundImage?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Header - Presentation-optimized header component for cards and slides
 *
 * @example
 * ```tsx
 * <Header>
   *   <HeaderBrand>Company</HeaderBrand>
 *   <HeaderNav>
 *     <HeaderLink href="#about">About</HeaderLink>
 *   </HeaderNav>
 * </Header>
 * ```
 *
 * @component
 */
export const Header: React.FC<HeaderProps> = ({
  children,
  layout = 'default',
  sticky = false,
  backgroundImage,
  className = '',
  style,
  ...props
}) => {
  const baseClass = 'card-header';
  const layoutClass = layout === 'center' ? 'card-header-center' : '';
  const stickyClass = sticky ? 'card-header-sticky' : '';
  const imageClass = backgroundImage ? 'card-header-image' : '';

  const classes = [baseClass, layoutClass, stickyClass, imageClass, className]
    .filter(Boolean)
    .join(' ');

  const combinedStyle = backgroundImage
    ? { ...style, backgroundImage: `url(${backgroundImage})` }
    : style;

  return (
    <header className={classes} style={combinedStyle} {...props}>
      {children}
    </header>
  );
};

Header.displayName = 'Header';

export interface HeaderBrandProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Brand name or logo
   */
  children: React.ReactNode;

  /**
   * Optional logo image source
   */
  logo?: string;

  /**
   * Logo alt text
   */
  logoAlt?: string;

  /**
   * Optional subtitle
   */
  subtitle?: string;
}

/**
 * HeaderBrand - Brand/logo section of the header
 */
export const HeaderBrand: React.FC<HeaderBrandProps> = ({
  children,
  logo,
  logoAlt,
  subtitle,
  className = '',
  ...props
}) => {
  const content = (
    <>
      {logo && <img src={logo} alt={logoAlt || 'Logo'} className="card-header-logo" />}
      <div>
        <div>{children}</div>
        {subtitle && <div className="card-header-subtitle">{subtitle}</div>}
      </div>
    </>
  );

  if (props.href) {
    return (
      <a className={`card-header-brand ${className}`} {...props}>
        {content}
      </a>
    );
  }

  return <div className={`card-header-brand ${className}`}>{content}</div>;
};

HeaderBrand.displayName = 'HeaderBrand';

export interface HeaderNavProps {
  /**
   * Navigation items
   */
  children: React.ReactNode;

  /**
   * Navigation alignment
   */
  align?: 'left' | 'center' | 'right';

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HeaderNav - Navigation container for header links
 */
export const HeaderNav: React.FC<HeaderNavProps> = ({
  children,
  align = 'left',
  className = '',
}) => {
  const alignClass = `card-header-nav-${align}`;

  return (
    <nav className={`card-header-nav ${alignClass} ${className}`}>
      {children}
    </nav>
  );
};

HeaderNav.displayName = 'HeaderNav';

export interface HeaderLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Link text
   */
  children: React.ReactNode;

  /**
   * Whether the link is active
   */
  active?: boolean;
}

/**
 * HeaderLink - Styled link for header navigation
 */
export const HeaderLink: React.FC<HeaderLinkProps> = ({
  children,
  active = false,
  className = '',
  ...props
}) => {
  const activeClass = active ? 'card-header-link-active' : '';

  return (
    <a className={`card-header-link ${activeClass} ${className}`} {...props}>
      {children}
    </a>
  );
};

HeaderLink.displayName = 'HeaderLink';

export interface HeaderActionsProps {
  /**
   * Action buttons and elements
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HeaderActions - Container for action buttons
 */
export const HeaderActions: React.FC<HeaderActionsProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`card-header-actions ${className}`}>
      {children}
    </div>
  );
};

HeaderActions.displayName = 'HeaderActions';

export interface HeaderButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Button text
   */
  children: React.ReactNode;

  /**
   * Button variant
   */
  variant?: 'solid' | 'outline';
}

/**
 * HeaderButton - Styled button for header actions
 */
export const HeaderButton: React.FC<HeaderButtonProps> = ({
  children,
  variant = 'solid',
  className = '',
  ...props
}) => {
  const variantClass = variant === 'outline' ? 'card-header-button-outline' : '';

  return (
    <button className={`card-header-button ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

HeaderButton.displayName = 'HeaderButton';

export interface HeaderSearchProps {
  /**
   * Search input value
   */
  value?: string;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Search icon (optional)
   */
  icon?: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HeaderSearch - Search input for header
 */
export const HeaderSearch: React.FC<HeaderSearchProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  icon,
  className = '',
}) => {
  return (
    <div className={`card-header-search ${className}`}>
      {icon && <div className="card-header-search-icon">{icon}</div>}
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

HeaderSearch.displayName = 'HeaderSearch';

export interface HeaderDropdownProps {
  /**
   * Dropdown trigger content
   */
  trigger: React.ReactNode;

  /**
   * Dropdown menu items
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * HeaderDropdown - Dropdown menu for header
 */
export const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  trigger,
  children,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`card-header-dropdown ${className}`}>
      <div
        className="card-header-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
      >
        {trigger}
      </div>
      <div
        className="card-header-dropdown-menu"
        data-open={isOpen}
      >
        {children}
      </div>
    </div>
  );
};

HeaderDropdown.displayName = 'HeaderDropdown';

export interface HeaderDropdownItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Item content
   */
  children: React.ReactNode;
}

/**
 * HeaderDropdownItem - Item in dropdown menu
 */
export const HeaderDropdownItem: React.FC<HeaderDropdownItemProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <a className={`card-header-dropdown-item ${className}`} {...props}>
      {children}
    </a>
  );
};

HeaderDropdownItem.displayName = 'HeaderDropdownItem';

/**
 * HeaderDropdownDivider - Divider for dropdown menu
 */
export const HeaderDropdownDivider: React.FC = () => {
  return <div className="card-header-dropdown-divider" />;
};

HeaderDropdownDivider.displayName = 'HeaderDropdownDivider';
