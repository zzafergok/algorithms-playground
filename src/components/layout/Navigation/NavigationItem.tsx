'use client';

import Link from 'next/link';

import { useState } from 'react';

import { ChevronDown } from 'lucide-react';

import { useNavigation } from '@/hooks/useNavigation';

import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { NavItem } from '@/types/navigation';

import { cn } from '@/lib/utils';

interface NavigationItemProps {
  item: NavItem;
  isMobile?: boolean;
  onItemClick?: () => void;
}

export const NavigationItem = ({
  item,
  isMobile = false,
  onItemClick,
}: NavigationItemProps) => {
  const { isActiveLink } = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);

  const renderDropdownItems = (items: NavItem[]) => {
    return items.map((childItem) => {
      if (childItem.children && childItem.children.length > 0) {
        return (
          <DropdownMenuSub key={childItem.href}>
            <DropdownMenuSubTrigger>{childItem.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem asChild>
                <Link href={childItem.href} onClick={onItemClick}>
                  Tümünü Görüntüle
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {renderDropdownItems(childItem.children)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={childItem.href} asChild>
          <Link
            href={childItem.href}
            onClick={onItemClick}
            className={cn(
              'w-full cursor-pointer',
              isActiveLink(childItem.href) && 'font-medium text-primary'
            )}
          >
            {childItem.label}
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  if (isMobile) {
    if (item.children && item.children.length > 0) {
      return (
        <div className="py-1">
          <div className="flex items-center justify-between">
            <Link
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'text-sm font-medium py-2 block flex-1',
                isActiveLink(item.href) ? 'text-primary' : 'text-foreground'
              )}
            >
              {item.label}
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={`${item.label} alt menüsünü ${isExpanded ? 'kapat' : 'aç'}`}
            >
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform',
                  isExpanded && 'rotate-180'
                )}
              />
            </Button>
          </div>
          {isExpanded && (
            <div className="pl-4 border-l border-border/50 mt-1 space-y-1">
              {item.children.map((child) => (
                <NavigationItem
                  key={child.href}
                  item={child}
                  isMobile={true}
                  onItemClick={onItemClick}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        href={item.href}
        onClick={onItemClick}
        className={cn(
          'text-sm font-medium py-2 block',
          isActiveLink(item.href) ? 'text-primary' : 'text-foreground'
        )}
      >
        {item.label}
      </Link>
    );
  }

  if (item.children && item.children.length > 0) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1',
              isActiveLink(item.href) ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            {item.label}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link href={item.href} className="font-medium">
              Tümünü Görüntüle
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {renderDropdownItems(item.children)}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link
      href={item.href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isActiveLink(item.href) ? 'text-primary' : 'text-muted-foreground'
      )}
    >
      {item.label}
    </Link>
  );
};
