'use client';

import React, { useState, useMemo, useCallback } from 'react';

import {
  X,
  Copy,
  Code2,
  Check,
  Filter,
  Layers,
  Target,
  Search,
  GitBranch,
  BarChart3,
  Settings2,
  BookMarked,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Category = {
  id: string;
  name: string;
  icon: React.ReactNode;
};

type Difficulty = 'Kolay' | 'Orta' | 'Zor';

type LanguageCode = {
  language: string;
  code: string;
};

type CodeExample = {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: Difficulty;
  languages: string[];
  githubUrl?: string;
  concepts: string[];
  codeExamples: LanguageCode[]; // Yeni alan - kod örnekleri
};

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleCopy}
      className="absolute top-2 right-2"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
};

const CodeModal = ({ example }: { example: CodeExample }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    example.codeExamples[0]?.language || ''
  );

  return (
    <DialogContent className="max-w-4xl max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5" />
            {example.title}
          </div>
          {example.githubUrl && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={example.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <p className="text-muted-foreground">{example.description}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant={getDifficultyColor(example.difficulty)}>
            {example.difficulty}
          </Badge>
          {example.concepts.map((concept) => (
            <Badge key={concept} variant="secondary">
              {concept}
            </Badge>
          ))}
        </div>

        {example.codeExamples.length > 0 && (
          <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <TabsList className="w-full">
              {example.codeExamples.map((codeExample) => (
                <TabsTrigger
                  key={codeExample.language}
                  value={codeExample.language}
                  className="flex-1"
                >
                  {codeExample.language}
                </TabsTrigger>
              ))}
            </TabsList>
            {example.codeExamples.map((codeExample) => (
              <TabsContent
                key={codeExample.language}
                value={codeExample.language}
              >
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  <div className="relative">
                    <CopyButton text={codeExample.code} />
                    <pre className="p-4">
                      <code className="text-sm">{codeExample.code}</code>
                    </pre>
                  </div>
                </ScrollArea>
              </TabsContent>
            ))}
          </Tabs>
        )}
      </div>
    </DialogContent>
  );
};

const getDifficultyColor = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'Kolay':
      return 'success';
    case 'Orta':
      return 'warning';
    case 'Zor':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function CodeExamplesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Set<Difficulty>
  >(new Set());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories: Category[] = [
    {
      id: 'sorting',
      name: 'Sıralama',
      icon: <Settings2 className="h-4 w-4" />,
    },
    { id: 'searching', name: 'Arama', icon: <Search className="h-4 w-4" /> },
    { id: 'graph', name: 'Graf', icon: <Code2 className="h-4 w-4" /> },
    {
      id: 'dp',
      name: 'Dinamik Programlama',
      icon: <BookMarked className="h-4 w-4" />,
    },
    {
      id: 'data-structures',
      name: 'Veri Yapıları',
      icon: <Layers className="h-4 w-4" />,
    },
    { id: 'greedy', name: 'Açgözlü', icon: <Target className="h-4 w-4" /> },
    {
      id: 'backtracking',
      name: 'Geri İzleme',
      icon: <GitBranch className="h-4 w-4" />,
    },
    { id: 'math', name: 'Matematik', icon: <BarChart3 className="h-4 w-4" /> },
  ];

  const codeExamples: CodeExample[] = [
    {
      id: '1',
      title: 'Bubble Sort Implementasyonu',
      description:
        'Adım adım bubble sort algoritmasının farklı dillerde implementasyonu',
      category: 'sorting',
      difficulty: 'Kolay',
      languages: ['JavaScript', 'Python', 'Java'],
      githubUrl:
        'https://github.com/zzafergok/algorithms-playground/tree/main/src/lib/algorithms/sorting.ts',
      concepts: ['Sıralama', 'Karşılaştırma', 'Swap İşlemi'],
      codeExamples: [
        {
          language: 'JavaScript',
          code: `function bubbleSort(arr) {
  const n = arr.length;
  const result = [...arr];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Swap elements
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  
  return result;
}

// Kullanım örneği
const array = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(array)); // [11, 12, 22, 25, 34, 64, 90]`,
        },
        {
          language: 'Python',
          code: `def bubble_sort(arr):
    n = len(arr)
    result = arr.copy()
    
    for i in range(n - 1):
        for j in range(n - i - 1):
            if result[j] > result[j + 1]:
                # Swap elements
                result[j], result[j + 1] = result[j + 1], result[j]
    
    return result

# Kullanım örneği
array = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(array))  # [11, 12, 22, 25, 34, 64, 90]`,
        },
        {
          language: 'Java',
          code: `public class BubbleSort {
    public static int[] bubbleSort(int[] arr) {
        int n = arr.length;
        int[] result = arr.clone();
        
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (result[j] > result[j + 1]) {
                    // Swap elements
                    int temp = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = temp;
                }
            }
        }
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        int[] sorted = bubbleSort(array);
        System.out.println(Arrays.toString(sorted));
    }
}`,
        },
      ],
    },
    {
      id: '2',
      title: 'Binary Search Algorithm',
      description: 'Verimli arama algoritması örneği ve farklı varyasyonları',
      category: 'searching',
      difficulty: 'Orta',
      languages: ['JavaScript', 'Python', 'C++'],
      concepts: ['Arama', 'Böl ve Fethet', 'Logaritmik Karmaşıklık'],
      codeExamples: [
        {
          language: 'JavaScript',
          code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    }
    
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Element not found
}

// Kullanım örneği
const sortedArray = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(sortedArray, 7)); // 3
console.log(binarySearch(sortedArray, 6)); // -1`,
        },
        {
          language: 'Python',
          code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        
        if arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1  # Element not found

# Kullanım örneği
sorted_array = [1, 3, 5, 7, 9, 11, 13, 15]
print(binary_search(sorted_array, 7))  # 3
print(binary_search(sorted_array, 6))  # -1`,
        },
        {
          language: 'C++',
          code: `#include <iostream>
#include <vector>

int binarySearch(const std::vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (arr[mid] == target) {
            return mid;
        }
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1; // Element not found
}

int main() {
    std::vector<int> sortedArray = {1, 3, 5, 7, 9, 11, 13, 15};
    std::cout << binarySearch(sortedArray, 7) << std::endl; // 3
    std::cout << binarySearch(sortedArray, 6) << std::endl; // -1
    return 0;
}`,
        },
      ],
    },
    {
      id: '3',
      title: 'Dynamic Programming - Fibonacci',
      description: 'Fibonacci serisinin dinamik programlama ile optimal çözümü',
      category: 'dp',
      difficulty: 'Kolay',
      languages: ['JavaScript', 'Python', 'Java'],
      concepts: ['Dinamik Programlama', 'Memoization', 'Optimizasyon'],
      codeExamples: [
        {
          language: 'JavaScript',
          code: `// Memoization yaklaşımı
function fibonacciMemo(n, memo = {}) {
  if (n <= 1) return n;
  
  if (!memo[n]) {
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
  }
  
  return memo[n];
}

// Tabulation yaklaşımı
function fibonacciTab(n) {
  if (n <= 1) return n;
  
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space-optimized yaklaşım
function fibonacciOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0;
  let prev1 = 1;
  
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Kullanım örneği
console.log(fibonacciMemo(10)); // 55
console.log(fibonacciTab(10)); // 55
console.log(fibonacciOptimized(10)); // 55`,
        },
        {
          language: 'Python',
          code: `# Memoization yaklaşımı
def fibonacci_memo(n, memo=None):
    if memo is None:
        memo = {}
    
    if n <= 1:
        return n
    
    if n not in memo:
        memo[n] = fibonacci_memo(n - 1, memo) + fibonacci_memo(n - 2, memo)
    
    return memo[n]

# Tabulation yaklaşımı
def fibonacci_tab(n):
    if n <= 1:
        return n
    
    dp = [0] * (n + 1)
    dp[0] = 0
    dp[1] = 1
    
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]

# Space-optimized yaklaşım
def fibonacci_optimized(n):
    if n <= 1:
        return n
    
    prev2, prev1 = 0, 1
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1

# Kullanım örneği
print(fibonacci_memo(10))     # 55
print(fibonacci_tab(10))      # 55
print(fibonacci_optimized(10)) # 55`,
        },
        {
          language: 'Java',
          code: `import java.util.HashMap;
import java.util.Map;

public class Fibonacci {
    // Memoization yaklaşımı
    public static int fibonacciMemo(int n, Map<Integer, Integer> memo) {
        if (n <= 1) return n;
        
        if (memo.containsKey(n)) {
            return memo.get(n);
        }
        
        int result = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
        memo.put(n, result);
        return result;
    }
    
    // Tabulation yaklaşımı
    public static int fibonacciTab(int n) {
        if (n <= 1) return n;
        
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        
        return dp[n];
    }
    
    // Space-optimized yaklaşım
    public static int fibonacciOptimized(int n) {
        if (n <= 1) return n;
        
        int prev2 = 0;
        int prev1 = 1;
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        
        return prev1;
    }
    
    public static void main(String[] args) {
        Map<Integer, Integer> memo = new HashMap<>();
        System.out.println(fibonacciMemo(10, memo));  // 55
        System.out.println(fibonacciTab(10));         // 55
        System.out.println(fibonacciOptimized(10));   // 55
    }
}`,
        },
      ],
    },
    ...Array.from({ length: 8 }, (_, index) => ({
      ...[
        {
          id: '3',
          title: 'Graph Traversal (BFS/DFS)',
          description:
            'Graf yapısında derinlik ve genişlik öncelikli arama örnekleri',
          category: 'graph',
          difficulty: 'Orta' as Difficulty,
          languages: ['JavaScript', 'Python'],
          concepts: ['Graf', 'Traversal', 'Queue', 'Stack'],
        },
        {
          id: '5',
          title: 'Quick Sort Algorithm',
          description:
            'Pivot tabanlı hızlı sıralama algoritması implementasyonu',
          category: 'sorting',
          difficulty: 'Orta' as Difficulty,
          languages: ['JavaScript', 'Python', 'Java', 'C++'],
          concepts: ['Böl ve Fethet', 'Pivot', 'Rekürsif Çözüm'],
        },
        {
          id: '6',
          title: "Dijkstra's Shortest Path",
          description:
            'En kısa yol algoritması ve graf problemlerinde kullanımı',
          category: 'graph',
          difficulty: 'Zor' as Difficulty,
          languages: ['JavaScript', 'Python'],
          concepts: ['Graf', 'En Kısa Yol', 'Priority Queue'],
        },
        {
          id: '7',
          title: 'Linked List Operations',
          description: 'Bağlı liste veri yapısı ve temel operasyonları',
          category: 'data-structures',
          difficulty: 'Kolay' as Difficulty,
          languages: ['JavaScript', 'Python', 'Java'],
          concepts: ['Pointer', 'Node', 'Traversal'],
        },
        {
          id: '8',
          title: 'Binary Search Tree',
          description: 'İkili arama ağacı implementasyonu ve işlemleri',
          category: 'data-structures',
          difficulty: 'Orta' as Difficulty,
          languages: ['JavaScript', 'Python', 'Java'],
          concepts: ['Ağaç', 'Rekürsif', 'Arama', 'Ekleme', 'Silme'],
        },
        {
          id: '9',
          title: 'Knapsack Problem',
          description: 'Sırt çantası problemi - Dinamik programlama çözümü',
          category: 'dp',
          difficulty: 'Zor' as Difficulty,
          languages: ['JavaScript', 'Python'],
          concepts: ['Optimizasyon', 'Dinamik Programlama', 'Tablo'],
        },
        {
          id: '10',
          title: 'Huffman Coding',
          description: 'Veri sıkıştırma için Huffman kodlama algoritması',
          category: 'greedy',
          difficulty: 'Zor' as Difficulty,
          languages: ['JavaScript', 'Python'],
          concepts: ['Sıkıştırma', 'Ağaç', 'Açgözlü'],
        },
        {
          id: '11',
          title: 'N-Queens Problem',
          description: 'N vezir problemi - Geri izleme ile çözüm',
          category: 'backtracking',
          difficulty: 'Zor' as Difficulty,
          languages: ['JavaScript', 'Python'],
          concepts: ['Geri İzleme', 'Constraint', 'Recursive'],
        },
        {
          id: '12',
          title: 'GCD Algorithm (Euclidean)',
          description: 'En büyük ortak bölen algoritması',
          category: 'math',
          difficulty: 'Kolay' as Difficulty,
          languages: ['JavaScript', 'Python', 'Java', 'C++'],
          concepts: ['Matematik', 'Modulo', 'Recursive'],
        },
      ][index],
      codeExamples: [], // Boş kod örnekleri
    })),
  ];

  const toggleCategory = useCallback((categoryId: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  }, []);

  const toggleDifficulty = useCallback((difficulty: Difficulty) => {
    setSelectedDifficulties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(difficulty)) {
        newSet.delete(difficulty);
      } else {
        newSet.add(difficulty);
      }
      return newSet;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategories(new Set());
    setSelectedDifficulties(new Set());
    setSearchTerm('');
  }, []);

  const filteredExamples = useMemo(() => {
    return codeExamples.filter((example) => {
      const matchesSearch =
        searchTerm === '' ||
        example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        example.concepts.some((concept) =>
          concept.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategories.size === 0 ||
        selectedCategories.has(example.category);

      const matchesDifficulty =
        selectedDifficulties.size === 0 ||
        selectedDifficulties.has(example.difficulty);

      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategories, selectedDifficulties]);

  const activeFilterCount = selectedCategories.size + selectedDifficulties.size;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Kod Örnekleri</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Farklı programlama dillerinde algoritma implementasyonları ve detaylı
          açıklamalar
        </p>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Kod örneklerinde ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            variant={activeFilterCount > 0 ? 'default' : 'outline'}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filtrele
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {activeFilterCount}
              </Badge>
            )}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`}
            />
          </Button>
        </div>

        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <Card className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Kategoriler</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategories.has(category.id)
                              ? 'default'
                              : 'outline'
                          }
                          size="sm"
                          onClick={() => toggleCategory(category.id)}
                          className="flex items-center gap-2"
                        >
                          {category.icon}
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Zorluk Seviyesi</h3>
                    <div className="flex flex-wrap gap-2">
                      {(['Kolay', 'Orta', 'Zor'] as Difficulty[]).map(
                        (difficulty) => (
                          <Button
                            key={difficulty}
                            variant={
                              selectedDifficulties.has(difficulty)
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => toggleDifficulty(difficulty)}
                          >
                            {difficulty}
                          </Button>
                        )
                      )}
                    </div>
                  </div>

                  {activeFilterCount > 0 && (
                    <div className="flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-muted-foreground"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Filtreleri Temizle
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted-foreground">
          {filteredExamples.length} kod örneği bulundu
        </p>

        {(selectedCategories.size > 0 || selectedDifficulties.size > 0) && (
          <div className="flex flex-wrap gap-2">
            {Array.from(selectedCategories).map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return category ? (
                <Badge
                  key={categoryId}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {category.name}
                  <X
                    className="h-3 w-3 cursor-pointer hover:text-destructive"
                    onClick={() => toggleCategory(categoryId)}
                  />
                </Badge>
              ) : null;
            })}
            {Array.from(selectedDifficulties).map((difficulty) => (
              <Badge
                key={difficulty}
                variant={getDifficultyColor(difficulty)}
                className="flex items-center gap-1"
              >
                {difficulty}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => toggleDifficulty(difficulty)}
                />
              </Badge>
            ))}
          </div>
        )}
      </div>
      <AnimatePresence mode="popLayout">
        {filteredExamples.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamples.map((example, index) => (
              <motion.div
                key={example.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">
                            {example.title}
                          </CardTitle>
                          <Badge
                            variant={getDifficultyColor(example.difficulty)}
                          >
                            {example.difficulty}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {example.description}
                        </p>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Diller:</p>
                          <div className="flex flex-wrap gap-1">
                            {example.languages.map((lang) => (
                              <Badge
                                key={lang}
                                variant="outline"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">
                            Konseptler:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {example.concepts.map((concept) => (
                              <Badge
                                key={concept}
                                variant="secondary"
                                className="text-xs"
                              >
                                {concept}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Kategori:</p>
                          <Badge variant="outline">
                            {
                              categories.find((c) => c.id === example.category)
                                ?.name
                            }
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <CodeModal example={example} />
                </Dialog>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg">
              Arama kriterlerinize uygun kod örneği bulunamadı.
            </p>
            <Button variant="outline" className="mt-4" onClick={clearFilters}>
              Filtreleri Temizle
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
