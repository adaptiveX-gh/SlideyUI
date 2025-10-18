/**
 * CardStack Component
 * Layered/stacked card layout for presentation effects
 * Useful for progressive disclosure in AI-generated content
 */

import { CardStackProps } from '../../types';
import clsx from 'clsx';
import { Children, cloneElement, isValidElement } from 'react';

const offsetClasses: Record<string, { translate: string; zIndex: number }> = {
  sm: { translate: '4', zIndex: 10 },
  md: { translate: '8', zIndex: 10 },
  lg: { translate: '12', zIndex: 10 },
};

/**
 * Stack cards with offset for layered presentation effect
 *
 * @example
 * ```tsx
 * <CardStack offset="md" expandOnHover>
 *   <CardContainer>Card 1</CardContainer>
 *   <CardContainer>Card 2</CardContainer>
 *   <CardContainer>Card 3</CardContainer>
 * </CardStack>
 * ```
 */
export function CardStack({
  direction = 'vertical',
  offset = 'md',
  className = '',
  children,
  expandOnHover = false,
}: CardStackProps) {
  const childArray = Children.toArray(children);
  const offsetConfig = offsetClasses[offset];

  return (
    <div
      className={clsx(
        'relative',
        direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
        expandOnHover && 'group',
        className
      )}
    >
      {childArray.map((child, index) => {
        const isFirst = index === 0;
        const translateClass =
          direction === 'horizontal'
            ? `translate-x-${offsetConfig.translate}`
            : `translate-y-${offsetConfig.translate}`;

        if (isValidElement(child)) {
          return cloneElement(child as React.ReactElement, {
            key: index,
            className: clsx(
              child.props.className,
              !isFirst && 'absolute',
              !isFirst && translateClass,
              expandOnHover &&
                !isFirst &&
                `group-hover:${direction === 'horizontal' ? `translate-x-[${(index + 1) * 16}px]` : `translate-y-[${(index + 1) * 16}px]`}`,
              'transition-transform duration-300'
            ),
            style: {
              ...child.props.style,
              zIndex: childArray.length - index,
            },
          });
        }
        return child;
      })}
    </div>
  );
}
