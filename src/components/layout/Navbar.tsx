'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';

import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { NavigationItem } from './Navigation/NavigationItem';

import { navigationConfig } from '@/config/navigation';

import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isScrolled && 'shadow-sm'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            aria-label="AlgoPit ana sayfasına git"
          >
            <span className="font-bold text-xl text-primary">AlgoPit</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center md:gap-6 lg:gap-8">
          {navigationConfig.mainNavItems.map((item) => (
            <NavigationItem key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={handleMobileMenuToggle}
            aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="container md:hidden py-4 bg-background border-t border-border/40 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {navigationConfig.mainNavItems.map((item) => (
              <NavigationItem
                key={item.href}
                item={item}
                isMobile={true}
                onItemClick={handleMobileItemClick}
              />
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
