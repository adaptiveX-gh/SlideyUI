import React from 'react';

/**
 * List - Presentation-optimized vertical list layout
 * Based on DaisyUI List component, adapted for slide presentations
 *
 * @example
 * ```tsx
 * <List>
 *   <ListItem icon="📊" title="Data Analytics" description="Real-time insights" />
 *   <ListItem icon="🔒" title="Security" description="Enterprise-grade protection" />
 * </List>
 * ```
 */

export interface ListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * List variant style
   */
  variant?: 'default' | 'bordered' | 'compact' | 'numbered' | 'hoverable';

  /**
   * Optional header text
   */
  header?: string;

  /**
   * Add shadow to the list
   */
  shadow?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * List items
   */
  children?: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon or emoji to display (optional)
   */
  icon?: React.ReactNode;

  /**
   * Icon background color (uses theme color by default)
   */
  iconColor?: string;

  /**
   * Image URL to display (alternative to icon)
   */
  image?: string;

  /**
   * Main title/heading for the list item
   */
  title?: string;

  /**
   * Optional description text
   */
  description?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Custom content (overrides title/description if provided)
   */
  children?: React.ReactNode;

  /**
   * Action buttons/elements
   */
  actions?: React.ReactNode;

  /**
   * Click handler for interactive lists
   */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const List: React.FC<ListProps> = ({
  variant = 'default',
  header,
  shadow = false,
  className = '',
  children,
  ...props
}) => {
  const variantClass = variant !== 'default' ? `card-list-${variant}` : '';
  const shadowClass = shadow ? 'card-list-shadow' : '';
  const classes = ['card-list', variantClass, shadowClass, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {header && <div className="card-list-header">{header}</div>}
      {children}
    </div>
  );
};

export const ListItem: React.FC<ListItemProps> = ({
  icon,
  iconColor,
  image,
  title,
  description,
  className = '',
  children,
  actions,
  onClick,
  ...props
}) => {
  const classes = ['card-list-row', className].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick} {...props}>
      {image ? (
        <div className="card-list-row-image">
          <img src={image} alt={title || ''} />
        </div>
      ) : (
        icon && (
          <div
            className="card-list-row-icon"
            style={iconColor ? { backgroundColor: iconColor } : undefined}
          >
            {icon}
          </div>
        )
      )}
      {children ? (
        children
      ) : (
        <div className="card-list-row-content">
          {title && <div className="card-list-row-title">{title}</div>}
          {description && <div className="card-list-row-description">{description}</div>}
        </div>
      )}
      {actions && <div className="card-list-row-actions">{actions}</div>}
    </div>
  );
};

List.displayName = 'List';
ListItem.displayName = 'ListItem';
