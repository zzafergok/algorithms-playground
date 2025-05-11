'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Twitter, Mail, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Footer column section type
interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

// Footer sections configuration
const footerSections: FooterSection[] = [
  {
    title: 'Bağlantılar',
    links: [
      { label: 'Ana Sayfa', href: '/' },
      { label: 'Algoritmalar', href: '/algorithms' },
      { label: 'Hakkında', href: '/hakkinda' },
    ],
  },
  {
    title: 'Algoritma Kategorileri',
    links: [
      { label: 'Sıralama Algoritmaları', href: '/algorithms/sorting' },
      { label: 'Arama Algoritmaları', href: '/algorithms/searching' },
      { label: 'Graf Algoritmaları', href: '/algorithms/graph-algorithms' },
      { label: 'Veri Yapıları', href: '/algorithms/data-structures' },
      { label: 'Dinamik Programlama', href: '/algorithms/dynamic-programming' },
    ],
  },
  {
    title: 'Kaynaklar',
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/zzafergok/algorithms-playground',
        external: true,
      },
      { label: 'Belgelendirme', href: '/resources/documentation' },
      { label: 'Katkıda Bulunma', href: '/resources/contributing' },
    ],
  },
];

export default function Footer() {
  // Get current year for copyright notice
  const currentYear = new Date().getFullYear();
  // State for scroll-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Handle scroll event for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 50;
      setShowScrollTop(window.scrollY > scrollThreshold);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full bg-background border-t border-border/40">
      {/* Main footer content */}
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* About section */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Algorithms Playground</h3>
            <p className="text-sm text-muted-foreground">
              Algoritmaları interaktif bir şekilde öğrenin ve uygulayın. Görsel
              öğrenme ile algoritma kavramlarını kolayca anlayın.
            </p>
            {/* Social links */}
            <div className="flex gap-4 mt-2">
              <a
                href="https://github.com/zzafergok/algorithms-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>

              <a
                href="mailto:gok.zaferr@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="E-posta"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <div className="flex flex-col gap-2 text-sm">
                {section.links.map((link) =>
                  link.external ? (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Copyright section */}
      {/* <div className="border-t border-border/40">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>
            &copy; {currentYear} Algorithms Playground. Tüm hakları saklıdır.
          </p>
          <p className="mt-2 md:mt-0">
            <Link href="/privacy" className="hover:text-foreground">
              Gizlilik Politikası
            </Link>
            {' • '}
            <Link href="/terms" className="hover:text-foreground">
              Kullanım Koşulları
            </Link>
          </p>
        </div>
      </div> */}

      {/* Scroll to top button */}
      {showScrollTop && (
        <Button
          variant="outline"
          size="icon"
          className={cn(
            'fixed bottom-6 right-6 z-50 rounded-full shadow-md',
            'transition-all duration-300 transform'
          )}
          onClick={scrollToTop}
          aria-label="Sayfanın başına dön"
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </footer>
  );
}
