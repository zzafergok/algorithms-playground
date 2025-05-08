import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  children,
  language = 'typescript',
  className,
}: CodeBlockProps) {
  return (
    <pre
      className={cn(
        'bg-muted p-4 rounded-lg overflow-x-auto text-sm',
        'language-' + language,
        className
      )}
    >
      <code className={`language-${language}`}>{children.trim()}</code>
    </pre>
  );
}
