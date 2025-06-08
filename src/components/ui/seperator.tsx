'use client';

import * as React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

// Enhanced separator component with comprehensive styling options
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & {
    variant?: 'default' | 'dashed' | 'dotted' | 'thick' | 'gradient';
    spacing?: 'sm' | 'md' | 'lg' | 'xl';
  }
>(
  (
    {
      className,
      orientation = 'horizontal',
      decorative = true,
      variant = 'default',
      spacing = 'md',
      ...props
    },
    ref
  ) => {
    // Base styling for separator with orientation support
    const baseClasses = cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]'
    );

    // Variant-specific styling for different visual appearances
    const variantClasses = {
      default: 'bg-border',
      dashed: 'border-dashed border-t border-border bg-transparent',
      dotted: 'border-dotted border-t border-border bg-transparent',
      thick: 'bg-border',
      gradient: 'bg-gradient-to-r from-transparent via-border to-transparent',
    };

    // Spacing configuration for consistent layout
    const spacingClasses = {
      sm: orientation === 'horizontal' ? 'my-2' : 'mx-2',
      md: orientation === 'horizontal' ? 'my-4' : 'mx-4',
      lg: orientation === 'horizontal' ? 'my-6' : 'mx-6',
      xl: orientation === 'horizontal' ? 'my-8' : 'mx-8',
    };

    // Thickness adjustment for thick variant
    const thicknessClasses =
      variant === 'thick'
        ? orientation === 'horizontal'
          ? 'h-[2px]'
          : 'w-[2px]'
        : '';

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={cn(
          baseClasses,
          variantClasses[variant],
          spacingClasses[spacing],
          thicknessClasses,
          className
        )}
        {...props}
      />
    );
  }
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
