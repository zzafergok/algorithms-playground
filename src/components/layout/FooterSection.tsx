import Link from 'next/link';

import { ExternalLink } from 'lucide-react';

import { FooterSection as FooterSectionType } from '@/types/navigation';

import { cn } from '@/lib/utils';

interface FooterSectionProps {
  section: FooterSectionType;
}

export const FooterSection = ({ section }: FooterSectionProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-semibold text-foreground tracking-wide">
        {section.title}
      </h4>
      <nav className="space-y-3">
        {section.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-2 text-sm text-muted-foreground',
              'hover:text-foreground transition-colors duration-200',
              'hover:translate-x-1 transform transition-transform',
              'group'
            )}
            {...(link.isExternal && {
              target: '_blank',
              rel: 'noopener noreferrer',
            })}
          >
            <span className="group-hover:underline underline-offset-2">
              {link.label}
            </span>
            {link.isExternal && (
              <ExternalLink
                size={12}
                className="opacity-60 group-hover:opacity-100 transition-opacity"
              />
            )}
          </Link>
        ))}
      </nav>
    </div>
  );
};
