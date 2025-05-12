'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

// TextareaProps arayüzü, HTML textarea elementinin tüm özelliklerini miras alır
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

// Textarea komponenti, React.forwardRef kullanarak ref'i alt elemana aktarır
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        // Tailwind sınıfları ile stillendirilmiş textarea elementi
        className={cn(
          // Temel stiller
          'flex min-h-[80px] w-full rounded-md border border-input',
          'bg-background px-3 py-2 text-sm',
          // Placeholder stili
          'placeholder:text-muted-foreground',
          // Odaklanma durumu için stiller
          'focus-visible:outline-none focus-visible:ring-2',
          'focus-visible:ring-ring focus-visible:ring-offset-2',
          // Devre dışı durumu için stiller
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Kullanıcı tarafından sağlanan sınıflar
          className
        )}
        // ref ve diğer props'ları aktar
        ref={ref}
        {...props}
      />
    );
  }
);

// Komponent ismi için displayName belirleme (DevTools'da daha iyi hata ayıklama için)
Textarea.displayName = 'Textarea';

export { Textarea };
