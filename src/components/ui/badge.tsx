'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Badge bileşeni için varyant tanımlamaları
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        // Ana varyant - mavi tonda
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        // İkincil varyant - gri tonda
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Yıkıcı/Tehlikeli eylemler için - kırmızı tonda
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        // Ana renk tonu ile border - içi boş
        outline: 'text-foreground',
        // Özel varyantlar
        success:
          'border-transparent bg-green-500 dark:bg-green-700 text-white hover:bg-green-600 dark:hover:bg-green-800',
        warning:
          'border-transparent bg-yellow-500 dark:bg-yellow-700 text-white hover:bg-yellow-600 dark:hover:bg-yellow-800',
        info: 'border-transparent bg-blue-500 dark:bg-blue-700 text-white hover:bg-blue-600 dark:hover:bg-blue-800',
      },
      // Boyut varyantları
      size: {
        default: 'text-xs px-2.5 py-0.5',
        sm: 'text-xs px-2 py-0.5 rounded-md',
        lg: 'text-sm px-3 py-1',
      },
    },
    // Varsayılan varyantlar
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

// Badge bileşeni için prop tipleri
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Badge bileşeni
function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
