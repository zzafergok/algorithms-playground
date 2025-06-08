import { NavigationConfig } from '@/types/navigation';

export const navigationConfig: NavigationConfig = {
  mainNavItems: [
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
            {
              label: 'Counting Sort',
              href: '/algorithms/sorting/counting-sort',
            },
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
            { label: 'Shell Sort', href: '/algorithms/sorting/shell-sort' },
            { label: 'Tim Sort', href: '/algorithms/sorting/tim-sort' },
          ],
        },
        {
          label: 'Arama Algoritmaları',
          href: '/algorithms/searching',
          children: [
            {
              label: 'Binary Search',
              href: '/algorithms/searching/binary-search',
            },
            {
              label: 'Linear Search',
              href: '/algorithms/searching/linear-search',
            },
          ],
        },
        {
          label: 'Graf Algoritmaları',
          href: '/algorithms/graph-algorithms',
          children: [
            { label: 'A*', href: '/algorithms/graph-algorithms/a-star' },
            {
              label: 'Bellman-Ford',
              href: '/algorithms/graph-algorithms/bellman-ford',
            },
            { label: 'BFS', href: '/algorithms/graph-algorithms/bfs' },
            { label: 'DFS', href: '/algorithms/graph-algorithms/dfs' },
            {
              label: 'Dijkstra',
              href: '/algorithms/graph-algorithms/dijkstra',
            },
            {
              label: 'Floyd-Warshall',
              href: '/algorithms/graph-algorithms/floyd-warshall',
            },
            { label: 'Kruskal', href: '/algorithms/graph-algorithms/kruskal' },
            { label: 'Prim', href: '/algorithms/graph-algorithms/prim' },
          ],
        },
        {
          label: 'Veri Yapıları',
          href: '/algorithms/data-structures',
          children: [
            {
              label: 'Binary Search Tree',
              href: '/algorithms/data-structures/binary-search-tree',
            },
            {
              label: 'Hash Table',
              href: '/algorithms/data-structures/hash-table',
            },
            {
              label: 'Linked List',
              href: '/algorithms/data-structures/linked-list',
            },
            { label: 'Queue', href: '/algorithms/data-structures/queue' },
            {
              label: 'Segment Tree',
              href: '/algorithms/data-structures/segment-tree',
            },
            { label: 'Stack', href: '/algorithms/data-structures/stack' },
            { label: 'Trie', href: '/algorithms/data-structures/trie' },
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
            {
              label: 'Subset Sum',
              href: '/algorithms/backtracking/subset-sum',
            },
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
          label: 'Kümeleme Algoritmaları',
          href: '/algorithms/clustering-algorithms',
          children: [
            {
              label: 'Hierarchical Clustering',
              href: '/algorithms/clustering-algorithms/hierarchical-clustering',
            },
            {
              label: 'K-Means',
              href: '/algorithms/clustering-algorithms/k-means',
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
        {
          label: 'Optimizasyon Algoritmaları',
          href: '/algorithms/optimization-algorithms',
          children: [
            {
              label: 'Genetic Algorithms',
              href: '/algorithms/optimization-algorithms/genetic-algorithms',
            },
            {
              label: 'Simulated Annealing',
              href: '/algorithms/optimization-algorithms/simulated-annealing',
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
          label: 'Böl ve Fethet',
          href: '/algorithms/divide-and-conquer',
        },
      ],
    },
    { label: 'Hakkında', href: '/about' },
    {
      label: 'Kaynaklar',
      href: '/resources',
      children: [
        { label: 'Kod Örnekleri', href: '/resources/code-examples' },
        { label: 'Katkıda Bulunma', href: '/resources/contributing' },
        { label: 'Belgelendirme', href: '/resources/documentation' },
        { label: 'Sık Sorulan Sorular', href: '/resources/faq' },
      ],
    },
  ],
  footerSections: [
    {
      title: 'Bağlantılar',
      links: [
        { label: 'Ana Sayfa', href: '/' },
        { label: 'Algoritmalar', href: '/algorithms' },
        { label: 'Hakkında', href: '/about' },
      ],
    },
    {
      title: 'Algoritma Kategorileri',
      links: [
        { label: 'Sıralama Algoritmaları', href: '/algorithms/sorting' },
        { label: 'Arama Algoritmaları', href: '/algorithms/searching' },
        { label: 'Graf Algoritmaları', href: '/algorithms/graph-algorithms' },
        { label: 'Veri Yapıları', href: '/algorithms/data-structures' },
        {
          label: 'Dinamik Programlama',
          href: '/algorithms/dynamic-programming',
        },
      ],
    },
    {
      title: 'Kaynaklar',
      links: [
        {
          label: 'GitHub',
          href: 'https://github.com/zzafergok/algorithms-playground',
          isExternal: true,
        },
        { label: 'Belgelendirme', href: '/resources/documentation' },
        { label: 'Katkıda Bulunma', href: '/resources/contributing' },
      ],
    },
  ],
};
