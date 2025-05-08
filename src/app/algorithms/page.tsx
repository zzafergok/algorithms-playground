import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AlgorithmsPage() {
  const algorithmCategories = [
    {
      title: 'Sıralama Algoritmaları',
      description:
        'Verileri belirli bir düzende sıralamak için kullanılan algoritmalar',
      href: '/algorithms/sorting',
      algorithms: [
        { name: 'Bubble Sort', href: '/algorithms/sorting/bubble-sort' },
        { name: 'Quick Sort', href: '/algorithms/sorting/quick-sort' },
        { name: 'Merge Sort', href: '/algorithms/sorting/merge-sort' },
        { name: 'Insertion Sort', href: '/algorithms/sorting/insertion-sort' },
        { name: 'Selection Sort', href: '/algorithms/sorting/selection-sort' },
        { name: 'Heap Sort', href: '/algorithms/sorting/heap-sort' },
      ],
    },
    {
      title: 'Arama Algoritmaları',
      description:
        'Veri yapılarında eleman bulmak için kullanılan algoritmalar',
      href: '/algorithms/search',
      algorithms: [
        { name: 'Linear Search', href: '/algorithms/search/linear-search' },
        { name: 'Binary Search', href: '/algorithms/search/binary-search' },
        { name: 'Jump Search', href: '/algorithms/search/jump-search' },
        {
          name: 'Exponential Search',
          href: '/algorithms/search/exponential-search',
        },
      ],
    },
    {
      title: 'Graf Algoritmaları',
      description: 'Graf veri yapıları üzerinde işlem yapan algoritmalar',
      href: '/algorithms/graf',
      algorithms: [
        { name: 'Breadth-First Search (BFS)', href: '/algorithms/graf/bfs' },
        { name: 'Depth-First Search (DFS)', href: '/algorithms/graf/dfs' },
        { name: 'Dijkstra', href: '/algorithms/graf/dijkstra' },
        { name: 'Bellman-Ford', href: '/algorithms/graf/bellman-ford' },
        { name: "Kruskal's MST", href: '/algorithms/graf/kruskal' },
        { name: "Prim's MST", href: '/algorithms/graf/prim' },
      ],
    },
    {
      title: 'Veri Yapıları',
      description: 'Verileri organize etme ve saklama yöntemleri',
      href: '/algorithms/veri-yapilari',
      algorithms: [
        { name: 'Linked List', href: '/algorithms/veri-yapilari/linked-list' },
        { name: 'Stack', href: '/algorithms/veri-yapilari/stack' },
        { name: 'Queue', href: '/algorithms/veri-yapilari/queue' },
        { name: 'Binary Search Tree', href: '/algorithms/veri-yapilari/bst' },
        { name: 'Hash Table', href: '/algorithms/veri-yapilari/hash-table' },
        { name: 'Heap', href: '/algorithms/veri-yapilari/heap' },
      ],
    },
    {
      title: 'Dinamik Programlama',
      description:
        'Karmaşık problemleri alt problemlere bölerek çözen yöntemler',
      href: '/algorithms/dinamik-programlama',
      algorithms: [
        {
          name: 'Fibonacci',
          href: '/algorithms/dinamik-programlama/fibonacci',
        },
        {
          name: 'Knapsack Problem',
          href: '/algorithms/dinamik-programlama/knapsack',
        },
        {
          name: 'Longest Common Subsequence',
          href: '/algorithms/dinamik-programlama/lcs',
        },
        {
          name: 'Edit Distance',
          href: '/algorithms/dinamik-programlama/edit-distance',
        },
        {
          name: 'Coin Change',
          href: '/algorithms/dinamik-programlama/coin-change',
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Algoritma Kategorileri
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Farklı problem türlerine göre gruplandırılmış algoritmalar arasından
          keşfetmek istediğinizi seçin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {algorithmCategories.map((category, index) => (
          <Card key={index} className="algorithm-card">
            <CardHeader>
              <CardTitle className="text-2xl">{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-sm font-medium mb-2">
                Popüler Algoritmalar:
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.algorithms.slice(0, 4).map((algorithm, i) => (
                  <Link
                    key={i}
                    href={algorithm.href}
                    className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    {algorithm.name}
                  </Link>
                ))}
                {category.algorithms.length > 4 && (
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium">
                    +{category.algorithms.length - 4} daha
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={category.href}>
                  Tüm {category.title} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
