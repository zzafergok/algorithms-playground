'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useState, useEffect } from 'react';

import { Menu, X, ChevronDown } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuSub,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme/theme-toggle';

import { cn } from '@/lib/utils';

// Navigation item interface with support for nested menus
interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
}

// Comprehensive navigation structure including all algorithm categories
const navItems: NavItem[] = [
  { label: 'Ana Sayfa', href: '/' },
  {
    label: 'Algoritmalar',
    href: '/algorithms',
    children: [
      {
        label: 'Sıralama Algoritmaları',
        href: '/algorithms/sorting',
        children: [
          { label: 'Bubble Sort', href: '/algorithms/sorting/bubble-sort' },
          { label: 'Counting Sort', href: '/algorithms/sorting/counting-sort' },
          { label: 'Heap Sort', href: '/algorithms/sorting/heap-sort' },
          {
            label: 'Insertion Sort',
            href: '/algorithms/sorting/insertion-sort',
          },
          { label: 'Merge Sort', href: '/algorithms/sorting/merge-sort' },
          { label: 'Quick Sort', href: '/algorithms/sorting/quick-sort' },
          { label: 'Radix Sort', href: '/algorithms/sorting/radix-sort' },
          {
            label: 'Selection Sort',
            href: '/algorithms/sorting/selection-sort',
          },
        ],
      },
      {
        label: 'Arama Algoritmaları',
        href: '/algorithms/searching',
        children: [
          {
            label: 'Linear Search',
            href: '/algorithms/searching/linear-search',
          },
          {
            label: 'Binary Search',
            href: '/algorithms/searching/binary-search',
          },
        ],
      },
      {
        label: 'Graf Algoritmaları',
        href: '/algorithms/graph-algorithms',
        children: [
          { label: 'BFS', href: '/algorithms/graph-algorithms/bfs' },
          { label: 'DFS', href: '/algorithms/graph-algorithms/dfs' },
          { label: 'Dijkstra', href: '/algorithms/graph-algorithms/dijkstra' },
          {
            label: 'Bellman-Ford',
            href: '/algorithms/graph-algorithms/bellman-ford',
          },
        ],
      },
      {
        label: 'Veri Yapıları',
        href: '/algorithms/data-structures',
        children: [
          {
            label: 'Linked List',
            href: '/algorithms/data-structures/linked-list',
          },
          { label: 'Stack', href: '/algorithms/data-structures/stack' },
          { label: 'Queue', href: '/algorithms/data-structures/queue' },
          {
            label: 'Binary Search Tree',
            href: '/algorithms/data-structures/binary-search-tree',
          },
          {
            label: 'Hash Table',
            href: '/algorithms/data-structures/hash-table',
          },
        ],
      },
      {
        label: 'Dinamik Programlama',
        href: '/algorithms/dynamic-programming',
        children: [
          {
            label: 'Fibonacci',
            href: '/algorithms/dynamic-programming/fibonacci',
          },
          {
            label: 'Knapsack',
            href: '/algorithms/dynamic-programming/knapsack',
          },
          {
            label: 'Longest Common Subsequence',
            href: '/algorithms/dynamic-programming/longest-common-subsequence',
          },
        ],
      },
      {
        label: 'Geri İzleme',
        href: '/algorithms/backtracking',
        children: [
          { label: 'N-Queens', href: '/algorithms/backtracking/n-queens' },
          { label: 'Subset Sum', href: '/algorithms/backtracking/subset-sum' },
        ],
      },
      {
        label: 'Açgözlü Algoritmalar',
        href: '/algorithms/greedy-algorithms',
        children: [
          {
            label: 'Fractional Knapsack',
            href: '/algorithms/greedy-algorithms/fractional-knapsack',
          },
          {
            label: 'Huffman Coding',
            href: '/algorithms/greedy-algorithms/huffman-coding',
          },
        ],
      },
      {
        label: 'Böl ve Fethet',
        href: '/algorithms/divide-and-conquer',
      },
      {
        label: 'Metin İşleme Algoritmaları',
        href: '/algorithms/string-algorithms',
        children: [
          { label: 'KMP', href: '/algorithms/string-algorithms/kmp' },
          {
            label: 'Rabin-Karp',
            href: '/algorithms/string-algorithms/rabin-karp',
          },
        ],
      },
      {
        label: 'Matematiksel Algoritmalar',
        href: '/algorithms/mathematical-algorithms',
        children: [
          { label: 'GCD', href: '/algorithms/mathematical-algorithms/gcd' },
          {
            label: 'Sieve of Eratosthenes',
            href: '/algorithms/mathematical-algorithms/sieve-of-eratosthenes',
          },
        ],
      },
      {
        label: 'Kümeleme Algoritmaları',
        href: '/algorithms/clustering-algorithms',
        children: [
          {
            label: 'K-Means',
            href: '/algorithms/clustering-algorithms/k-means',
          },
          {
            label: 'Hierarchical Clustering',
            href: '/algorithms/clustering-algorithms/hierarchical-clustering',
          },
        ],
      },
      {
        label: 'Optimizasyon Algoritmaları',
        href: '/algorithms/optimization-algorithms',
        children: [
          {
            label: 'Simulated Annealing',
            href: '/algorithms/optimization-algorithms/simulated-annealing',
          },
          {
            label: 'Genetic Algorithms',
            href: '/algorithms/optimization-algorithms/genetic-algorithms',
          },
        ],
      },
      {
        label: 'İleri Seviye Algoritmalar',
        href: '/algorithms/advanced-algorithms',
        children: [
          {
            label: "Floyd's Cycle-Finding",
            href: '/algorithms/advanced-algorithms/floyd-cycle-finding',
          },
          {
            label: 'Topological Sort',
            href: '/algorithms/advanced-algorithms/topological-sort',
          },
        ],
      },
      {
        label: 'Diğer Algoritmalar',
        href: '/algorithms/misc-algorithms',
        children: [
          {
            label: 'Bloom Filter',
            href: '/algorithms/misc-algorithms/bloom-filter',
          },
          {
            label: 'Reservoir Sampling',
            href: '/algorithms/misc-algorithms/reservoir-sampling',
          },
        ],
      },
    ],
  },
  { label: 'Hakkında', href: '/hakkinda' },
  {
    label: 'Kaynaklar',
    href: '/resources',
    children: [
      { label: 'Belgelendirme', href: '/resources/documentation' },
      { label: 'Katkıda Bulunma', href: '/resources/contributing' },
      { label: 'Kod Örnekleri', href: '/resources/code-examples' },
      { label: 'Sık Sorulan Sorular', href: '/resources/faq' },
    ],
  },
];

export default function Navbar() {
  // State for mobile menu toggle
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State to track scroll for shadow effect
  const [scrolled, setScrolled] = useState(false);
  // Get current pathname for active link highlighting
  const pathname = usePathname();
  // State for expanded mobile sub-menus
  const [expandedMobileItems, setExpandedMobileItems] = useState<string[]>([]);

  // Handle scroll event for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Check initial scroll position
    handleScroll();

    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Toggle mobile submenu expansion
  const toggleMobileSubMenu = (href: string) => {
    setExpandedMobileItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href]
    );
  };

  // Check if mobile submenu is expanded
  const isMobileExpanded = (href: string) => {
    return expandedMobileItems.includes(href);
  };

  // Render dropdown items recursively
  const renderDropdownItems = (items: NavItem[]) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0) {
        return (
          <DropdownMenuSub key={item.href}>
            <DropdownMenuSubTrigger
              className={cn(isActive(item.href) && 'font-medium text-primary')}
            >
              {item.label}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem asChild>
                <Link href={item.href} className="font-medium">
                  Tümünü Görüntüle
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {renderDropdownItems(item.children)}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        );
      }

      return (
        <DropdownMenuItem key={item.href} asChild>
          <Link
            href={item.href}
            className={cn('w-full', isActive(item.href) && 'font-medium')}
          >
            {item.label}
            {item.description && (
              <span className="ml-2 text-xs text-muted-foreground">
                {item.description}
              </span>
            )}
          </Link>
        </DropdownMenuItem>
      );
    });
  };

  // Render mobile menu items recursively
  const renderMobileMenuItems = (items: NavItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.href} className={cn('py-1', level > 0 && 'ml-4')}>
        {item.children && item.children.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <Link
                href={item.href}
                className={cn(
                  'text-sm font-medium py-2 block',
                  isActive(item.href) ? 'text-primary' : 'text-foreground'
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={(e) => {
                  e.preventDefault();
                  toggleMobileSubMenu(item.href);
                }}
              >
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isMobileExpanded(item.href) && 'rotate-180'
                  )}
                />
              </Button>
            </div>

            {isMobileExpanded(item.href) && (
              <div className="pl-4 border-l border-border/50 mt-1 space-y-1">
                {renderMobileMenuItems(item.children, level + 1)}
              </div>
            )}
          </>
        ) : (
          <Link
            href={item.href}
            className={cn(
              'text-sm font-medium py-2 block',
              isActive(item.href) ? 'text-primary' : 'text-foreground',
              level > 0 ? 'text-muted-foreground hover:text-foreground' : ''
            )}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        )}
      </div>
    ));
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-200',
        'border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        scrolled && 'shadow-sm'
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and brand */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl text-primary">AlgoPit</span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center md:gap-6 lg:gap-8">
          {navItems.map((item) =>
            item.children ? (
              <DropdownMenu key={item.href}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'text-sm font-medium transition-colors hover:text-primary flex items-center gap-1',
                      isActive(item.href)
                        ? 'text-primary'
                        : 'text-muted-foreground'
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
                  {/* If this is the Algorithms menu, we'll add categories */}
                  {item.href === '/algorithms' ? (
                    <DropdownMenuGroup>
                      {renderDropdownItems(item.children)}
                    </DropdownMenuGroup>
                  ) : (
                    renderDropdownItems(item.children)
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden py-4 bg-background border-t border-border/40 max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-2">
            {renderMobileMenuItems(navItems)}
          </nav>
        </div>
      )}
    </header>
  );
}
