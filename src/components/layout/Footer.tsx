'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background">
      <div className="container py-6 md:py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">AlgoViz</h3>
            <p className="text-sm text-muted-foreground">
              Algoritmaları interaktif bir şekilde öğrenin ve uygulayın.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Bağlantılar</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/algorithms"
                className="text-muted-foreground hover:text-foreground"
              >
                Algoritmalar
              </Link>
              <Link
                href="/hakkinda"
                className="text-muted-foreground hover:text-foreground"
              >
                Hakkında
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Algoritma Kategorileri</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link
                href="/algorithms/sorting"
                className="text-muted-foreground hover:text-foreground"
              >
                Sıralama Algoritmaları
              </Link>
              <Link
                href="/algorithms/search"
                className="text-muted-foreground hover:text-foreground"
              >
                Arama Algoritmaları
              </Link>
              <Link
                href="/algorithms/graf"
                className="text-muted-foreground hover:text-foreground"
              >
                Graf Algoritmaları
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border/40 pt-6 text-center text-sm text-muted-foreground">
          &copy; {currentYear} AlgoViz. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
