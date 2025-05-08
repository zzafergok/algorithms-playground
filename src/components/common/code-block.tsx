'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn, highlightCode } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  highlightedLine?: number;
  showLineNumbers?: boolean;
  title?: string;
}

export function CodeBlock({
  code,
  language = 'javascript',
  highlightedLine,
  showLineNumbers = true,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeLines = highlightedLine
    ? highlightCode(code, highlightedLine)
    : code.split('\n');

  return (
    <div className="group relative rounded-md border">
      {title && (
        <div className="border-b bg-muted px-3 py-2 text-sm font-medium">
          {title}
        </div>
      )}
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">{copied ? 'Kopyalandı' : 'Kopyala'}</span>
        </Button>
        <pre
          className={cn(
            'overflow-x-auto p-4 text-sm',
            showLineNumbers && 'pl-0'
          )}
        >
          <code className={`language-${language}`}>
            {codeLines.map((line, i) => (
              <div key={i} className="table-row">
                {showLineNumbers && (
                  <span className="table-cell select-none pr-4 text-right text-muted-foreground">
                    {i + 1}
                  </span>
                )}
                <span
                  className="table-cell"
                  dangerouslySetInnerHTML={{ __html: line }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
