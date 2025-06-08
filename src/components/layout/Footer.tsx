'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';

import { Github, Mail, ArrowUp, Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/seperator';

import { FooterSection } from './FooterSection';

import { navigationConfig } from '@/config/navigation';

import { cn } from '@/lib/utils';

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
      }, 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <footer className="w-full bg-gradient-to-t from-muted/20 to-background border-t border-border/40">
        <div className="container py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 xl:gap-12">
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-4">
                <Link
                  href="/"
                  className="inline-block group"
                  aria-label="AlgoPit ana sayfasına git"
                >
                  <h3 className="text-xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                    AlgoPit
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                  Algoritmaları interaktif bir şekilde öğrenin ve uygulayın.
                  Görsel öğrenme ile algoritma kavramlarını kolayca anlayın.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">
                  Bizi Takip Edin
                </h4>
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/zzafergok/algorithms-playground"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-lg',
                      'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground',
                      'transition-all duration-200 hover:scale-110'
                    )}
                    aria-label="GitHub repository'yi ziyaret et"
                  >
                    <Github size={18} />
                  </Link>
                  <Link
                    href="mailto:gok.zaferr@gmail.com"
                    className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-lg',
                      'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground',
                      'transition-all duration-200 hover:scale-110'
                    )}
                    aria-label="E-posta ile iletişime geç"
                  >
                    <Mail size={18} />
                  </Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
                {navigationConfig.footerSections.map((section) => (
                  <FooterSection key={section.title} section={section} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="container py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-muted-foreground">
              <p className="flex items-center gap-1">
                &copy; {currentYear} AlgoPit. Tüm hakları saklıdır.
              </p>
              <span className="hidden sm:inline text-muted-foreground/50">
                •
              </span>
              <p className="flex items-center gap-1">
                <Heart size={14} className="text-red-500" />
                <span>ile Türkiye'de geliştirildi</span>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full shadow-lg',
            'bg-background/80 backdrop-blur-sm border-border/50',
            'transition-all duration-300 ease-out',
            'hover:scale-110 hover:shadow-xl hover:bg-background',
            'focus:ring-2 focus:ring-primary focus:ring-offset-2',
            'active:scale-95'
          )}
          onClick={scrollToTop}
          aria-label="Sayfanın başına geri dön"
        >
          <ArrowUp size={20} className="text-foreground" />
        </Button>
      )}
    </>
  );
};
