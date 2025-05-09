'use client';

import React, { useState } from 'react';
import { SortingVisualizer } from '@/components/algorithms/sorting-visualizer';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { bubbleSort } from '@/lib/algorithms/sorting';
import { generateRandomArray } from '@/lib/utils';
import { PerformanceMetrics } from '@/components/ui/performance-metrics';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';

export default function BubbleSortPage() {
  // State for visualization and interactive components
  const [initialArray, setInitialArray] = useState<number[]>(
    generateRandomArray(20, 10, 100)
  );
  const [performanceMetrics, setPerformanceMetrics] = useState<any | null>(
    null
  );

  // Algorithm implementations in different languages
  const implementations = {
    javascript: `/**
 * Bubble Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function bubbleSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Outer loop - each pass places one element in its final position
  for (let i = 0; i < n - 1; i++) {
    // Optimization: track if any swaps occurred during this pass
    let swapped = false;
    
    // Inner loop - compare adjacent elements and swap if needed
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Destructuring swap - cleaner than using a temp variable
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, the array is already sorted
    if (!swapped) break;
  }
  
  return result;
}`,
    python: `def bubble_sort(arr):
    """
    Implementation of Bubble Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    n = len(result)
    
    # Outer loop - each pass places one element in its final position
    for i in range(n - 1):
        # Optimization: track if any swaps occurred during this pass
        swapped = False
        
        # Inner loop - compare adjacent elements and swap if needed
        for j in range(n - i - 1):
            # Compare and swap if needed
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
                
        # If no swaps occurred, the list is already sorted
        if not swapped:
            break
                
    return result`,
    typescript: `/**
 * Bubble Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function bubbleSort<T>(arr: T[]): T[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Outer loop - each pass places one element in its final position
  for (let i = 0; i < n - 1; i++) {
    // Optimization: track if any swaps occurred during this pass
    let swapped = false;
    
    // Inner loop - compare adjacent elements and swap if needed
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        // Destructuring swap - cleaner than using a temp variable
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
        swapped = true;
      }
    }
    
    // If no swaps occurred, the array is already sorted
    if (!swapped) break;
  }
  
  return result;
}`,
    java: `/**
 * Bubble Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] bubbleSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    // Outer loop - each pass places one element in its final position
    for (int i = 0; i < n - 1; i++) {
        // Optimization: track if any swaps occurred during this pass
        boolean swapped = false;
        
        // Inner loop - compare adjacent elements and swap if needed
        for (int j = 0; j < n - i - 1; j++) {
            // Compare and swap if needed
            if (result[j] > result[j + 1]) {
                // Swap elements
                int temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
                swapped = true;
            }
        }
        
        // If no swaps occurred, the array is already sorted
        if (!swapped) break;
    }
    
    return result;
}`,
  };

  // Simulated complexity data for visualization
  const complexityData = Array.from({ length: 10 }, (_, i) => {
    const n = (i + 1) * 10;
    return {
      inputSize: n,
      worstCase: n * n,
      averageCase: n * n,
      bestCase: n, // O(n) for best case (already sorted)
    };
  });

  // Detailed bubble sort explanation
  const bubbleSortDescription = `
Bubble Sort, en basit sıralama algoritmalarından biridir. Her geçişte, komşu elemanları karşılaştırarak, büyük elemanların dizinin sonuna doğru kabarcık gibi yükselmesini sağlar.

## Çalışma Prensibi:

1. Dizinin başından başlayarak, her bir elemanı sağındaki komşusuyla karşılaştırır.
2. Eğer soldaki eleman, sağdakinden büyükse, yerlerini değiştirir.
3. Bu işlem, dizinin başından sonuna kadar tekrarlanır.
4. Her tam geçiş sonrası, en büyük eleman dizinin sonuna yerleşir.
5. Bir sonraki geçişte, son eleman zaten yerleştiği için, bir önceki elemana kadar karşılaştırma yapılır.
6. Hiçbir takas işlemi gerçekleşmediğinde, dizi sıralanmış demektir ve algoritma sonlanır.

## Optimizasyonlar:

1. **Erken Çıkış**: Eğer bir geçişte hiçbir takas yapılmamışsa, dizi sıralanmış demektir.
2. **Sınır Takibi**: Her geçişte, bir önceki geçişte yerleştirilen elemanlar için gereksiz karşılaştırma yapılmaz.

Bubble Sort, eğitim amaçlı ve küçük veri setleri için uygundur, ancak büyük veri setleri için verimli değildir.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Bubble Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          {/* Algorithm Description */}
          <Card>
            <CardHeader>
              <CardTitle>Bubble Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{bubbleSortDescription}</p>
              </div>
            </CardContent>
          </Card>

          {/* Complexity Analysis */}
          <AlgorithmComplexity
            timeComplexity={{
              worstCase: 'O(n²)',
              averageCase: 'O(n²)',
              bestCase: 'O(n)',
            }}
            spaceComplexity="O(1) - Yerinde sıralama"
            complexityData={complexityData}
          />
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Bubble Sort algoritmasının farklı programlama dillerindeki
          uygulamaları aşağıda verilmiştir. Her örnek, algoritmanın optimize
          edilmiş versiyonunu içerir ve detaylı açıklamalarla sunulmuştur.
        </p>

        <Tabs defaultValue="javascript">
          <TabsList>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          <TabsContent value="javascript">
            <CodeBlock
              code={implementations.javascript}
              language="javascript"
              title="Bubble Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Bubble Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Bubble Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Bubble Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interactive Demo Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Bubble Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </p>

        <InteractiveDemo
          title="Bubble Sort Demo"
          description="Verdiğiniz dizi Bubble Sort algoritması ile sıralanacaktır."
          algorithmFunction={bubbleSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Bubble Sort büyük veri setleri için verimli değildir.
                1000'den fazla eleman içeren diziler için daha verimli
                algoritmalar tercih edin.
              </p>
            </div>
          )}
        />
      </div>

      {/* Algorithmic Analysis Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Analizi</h2>

        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Zaman ve Alan Karmaşıklığı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Zaman Karmaşıklığı</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">En İyi Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n)
                    </code>{' '}
                    - Dizi zaten sıralıysa, algoritma tek bir geçişte tamamlanır
                    (erken çıkış optimizasyonu ile).
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - İç içe iki döngü kullanır ve ortalamada n²/2 karşılaştırma
                    gerektirir.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - Dizi tersine sıralıysa, her eleman için bir takas gerekir,
                    n(n-1)/2 karşılaştırma yapılır.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(1)
                  </code>{' '}
                  - Bubble Sort yerinde (in-place) bir sıralama algoritmasıdır.
                  Giriş dizisinin boyutundan bağımsız olarak sabit miktarda
                  ekstra bellek kullanır.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Bubble Sort <span className="font-medium">kararlı</span> bir
                  algoritma olduğundan, eşit değere sahip elemanların göreceli
                  sırası korunur. Bu özellik, ikincil sıralama kriterleri olan
                  uygulamalarda önemlidir.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avantajlar ve Dezavantajlar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-green-600 dark:text-green-400 mb-2">
                  Avantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Anlaşılması ve uygulanması son derece kolaydır.</li>
                  <li>
                    Ekstra bellek alanı gerektirmez (O(1) alan karmaşıklığı).
                  </li>
                  <li>
                    Kararlı bir algoritma olduğundan, eşit değerli elemanların
                    sırası değişmez.
                  </li>
                  <li>
                    Erken çıkış optimizasyonu ile zaten sıralı veriler için O(n)
                    karmaşıklığa sahiptir.
                  </li>
                  <li>
                    Çok küçük veri setleri için basit ve verimli olabilir.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Dezavantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    Büyük veri setleri için O(n²) zaman karmaşıklığı nedeniyle
                    oldukça verimsizdir.
                  </li>
                  <li>
                    Selection Sort ve Insertion Sort gibi diğer basit
                    algoritmalardan genellikle daha yavaştır.
                  </li>
                  <li>
                    Takas işlemi sayısı fazladır, bu da performansı düşürür.
                  </li>
                  <li>
                    Modern uygulamalarda, daha iyi performans sunan algoritmalar
                    (Quick Sort, Merge Sort vb.) tercih edilir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Algorithms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Bubble Sort'a benzer veya alternatif olarak kullanılabilecek diğer
          sıralama algoritmaları:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Insertion Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Küçük veri setleri için verimli ve kısmen sıralı veriler için
                O(n) performans sunar.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Selection Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Bubble Sort'a benzer karmaşıklığa sahip, ancak takas işlemi
                sayısı daha azdır.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Cocktail Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Bubble Sort'un iki yönlü bir varyasyonu, daha hızlı yakınsama
                sağlayabilir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
