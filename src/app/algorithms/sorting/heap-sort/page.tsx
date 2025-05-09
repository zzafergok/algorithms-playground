'use client';

import React from 'react';
import { heapSort } from '@/lib/algorithms/sorting';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlgorithmExplanation } from '@/components/common/explanation';

export default function HeapSortPage() {
  // Algorithm implementations in different languages
  const implementations = {
    javascript: `/**
 * Heap Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function heapSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [result[0], result[i]] = [result[i], result[0]];
    
    // Call heapify on the reduced heap
    heapify(result, i, 0);
  }
  
  return result;
}

/**
 * Function to heapify a subtree rooted at index i
 * @param {Array} arr - The array to heapify
 * @param {Number} n - Size of the heap
 * @param {Number} i - Root index of the subtree to heapify
 */
function heapify(arr, n, i) {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap and continue heapifying
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    python: `def heap_sort(arr):
    """
    Implementation of Heap Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    n = len(result)
    
    # Build a max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(result, n, i)
    
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        # Swap the root (maximum value) with the last element
        result[i], result[0] = result[0], result[i]
        
        # Call heapify on the reduced heap
        heapify(result, i, 0)
        
    return result

def heapify(arr, n, i):
    """
    Heapify subtree rooted at index i
    
    Args:
        arr: Array representation of heap
        n: Size of the heap
        i: Root index of subtree to heapify
    """
    largest = i  # Initialize largest as root
    left = 2 * i + 1  # Left child
    right = 2 * i + 2  # Right child
    
    # If left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # If right child exists and is greater than current largest
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # If largest is not the root
    if largest != i:
        # Swap root with largest
        arr[i], arr[largest] = arr[largest], arr[i]
        
        # Recursively heapify the affected subtree
        heapify(arr, n, largest)`,
    typescript: `/**
 * Heap Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function heapSort<T>(arr: T[]): T[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [result[0], result[i]] = [result[i], result[0]];
    
    // Call heapify on the reduced heap
    heapify(result, i, 0);
  }
  
  return result;
}

/**
 * Function to heapify a subtree rooted at index i
 * @param arr - The array to heapify
 * @param n - Size of the heap
 * @param i - Root index of the subtree to heapify
 */
function heapify<T>(arr: T[], n: number, i: number): void {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child
  
  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  
  // If right child is larger than largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  
  // If largest is not root
  if (largest !== i) {
    // Swap and continue heapifying
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
    java: `/**
 * Heap Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] heapSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    // Build heap (rearrange array)
    for (int i = n / 2 - 1; i >= 0; i--) {
        heapify(result, n, i);
    }
    
    // Extract an element from heap one by one
    for (int i = n - 1; i > 0; i--) {
        // Move current root to end
        int temp = result[0];
        result[0] = result[i];
        result[i] = temp;
        
        // Call max heapify on the reduced heap
        heapify(result, i, 0);
    }
    
    return result;
}

/**
 * Heapify a subtree rooted at node i
 * 
 * @param arr Array representation of heap
 * @param n Size of heap
 * @param i Root node index
 */
private static void heapify(int[] arr, int n, int i) {
    int largest = i; // Initialize largest as root
    int left = 2 * i + 1; // Left child
    int right = 2 * i + 2; // Right child
    
    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }
    
    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }
    
    // If largest is not root
    if (largest != i) {
        int swap = arr[i];
        arr[i] = arr[largest];
        arr[largest] = swap;
        
        // Recursively heapify the affected sub-tree
        heapify(arr, n, largest);
    }
}`,
  };

  // Detailed heap sort explanation
  const heapSortDescription = `
Heap Sort, binary heap veri yapısını kullanan karşılaştırma tabanlı bir sıralama algoritmasıdır. Bu algoritma, veriyi önce max-heap (veya min-heap) yapısına dönüştürür, ardından bu yapıyı kullanarak sıralama işlemini gerçekleştirir.

## Çalışma Prensibi:

1. Diziyi bir max-heap yapısına dönüştür (heapify).
2. Kök düğümü (en büyük eleman) dizinin sonuyla takas et.
3. Heap boyutunu bir azalt ve dizinin geri kalanı için heapify işlemini tekrarla.
4. Tüm dizi sıralanana kadar 2. ve 3. adımları tekrarla.

## Önemli Özellikler:

1. **Yerinde Sıralama**: Ek bellek kullanmadan orijinal diziyi sıralar.
2. **Kararsız Sıralama**: Eşit değere sahip elemanların orijinal sırası korunmayabilir.
3. **Zaman Karmaşıklığı**: Her durumda O(n log n) zaman karmaşıklığına sahiptir.
4. **Heapify İşlemi**: O(log n) karmaşıklığında bir işlemdir, heap oluşturma ise O(n) zamanda gerçekleşir.

Heap Sort, merge sort gibi her zaman O(n log n) performansına sahip, ancak quick sort'un aksine en kötü durum senaryolarında bile tutarlı performans gösterir.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Heap Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          {/* Algorithm Description */}
          <Card>
            <CardHeader>
              <CardTitle>Heap Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{heapSortDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Heap Sort algoritmasının farklı programlama dillerindeki uygulamaları
          aşağıda verilmiştir. Her örnek, algoritmanın optimize edilmiş
          versiyonunu içerir ve detaylı açıklamalarla sunulmuştur.
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
              title="Heap Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Heap Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Heap Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Heap Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interactive Demo Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Heap Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </p>

        <InteractiveDemo
          title="Heap Sort Demo"
          description="Verdiğiniz dizi Heap Sort algoritması ile sıralanacaktır."
          algorithmFunction={heapSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Heap Sort her durumda O(n log n) zaman karmaşıklığına
                sahiptir ve büyük veri setleri için tutarlı performans gösterir.
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
                      O(n log n)
                    </code>{' '}
                    - Heap oluşturma O(n), çıkarma işlemleri O(n log n).
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n log n)
                    </code>{' '}
                    - Her durumda aynı sayıda karşılaştırma ve takas yapılır.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n log n)
                    </code>{' '}
                    - Dizinin durumundan bağımsız, her zaman aynı karmaşıklık.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(1)
                  </code>{' '}
                  - Heap Sort yerinde (in-place) bir sıralama algoritmasıdır.
                  Giriş dizisinin boyutundan bağımsız olarak sabit miktarda
                  ekstra bellek kullanır.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Heap Sort <span className="font-medium">kararsız</span> bir
                  algoritmadır. Eşit değere sahip elemanların göreceli sırası
                  korunmayabilir. Bunun nedeni, uzak mesafedeki takas
                  işlemlerinin orijinal sırayı bozabilmesidir.
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
                  <li>Her durumda O(n log n) karmaşıklık garantisi sağlar.</li>
                  <li>
                    Ekstra bellek alanı gerektirmez (O(1) alan karmaşıklığı).
                  </li>
                  <li>
                    Quick Sort'un aksine, en kötü durumda bile verimlidir.
                  </li>
                  <li>
                    Öncelikli kuyruk (priority queue) uygulamaları için
                    uygundur.
                  </li>
                  <li>
                    Kısmen sıralanmış veri setlerinde de tutarlı performans
                    gösterir.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Dezavantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    Kararsız bir algoritma olduğundan, eşit değerli elemanların
                    sırası değişebilir.
                  </li>
                  <li>
                    Pratik uygulamalarda genellikle Quick Sort'tan daha
                    yavaştır.
                  </li>
                  <li>
                    Önbellek dostu değildir (cache-unfriendly), çünkü uzak
                    bellek konumlarına erişimi gerektirir.
                  </li>
                  <li>
                    Karmaşık veri yapılarını sıralamak için ek adımlar
                    gerektirebilir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Heap Sort vs Other Algorithms Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Heap Sort ve Diğer Algoritmalar</h2>
        <p className="text-muted-foreground">
          Heap Sort ile diğer popüler sıralama algoritmalarının karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Heap Sort</th>
                <th className="p-2 text-left">Quick Sort</th>
                <th className="p-2 text-left">Merge Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En İyi Durum</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En Kötü Durum</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n log n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Alan Karmaşıklığı</td>
                <td className="p-2">O(1)</td>
                <td className="p-2">O(log n)</td>
                <td className="p-2">O(n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Uyarlanabilirlik</td>
                <td className="p-2">Uyarlanabilir değil</td>
                <td className="p-2">Kısmen uyarlanabilir</td>
                <td className="p-2">Uyarlanabilir değil</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Önbellek Verimliliği</td>
                <td className="p-2">Düşük</td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Orta</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">Tutarlı performans ve sınırlı bellek</td>
                <td className="p-2">Genel amaçlı, pratik verimlilik</td>
                <td className="p-2">Kararlılık ve güvenilirlik</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Heap Sort her durumda O(n log n) karmaşıklık garantisi sağlar, bu da
          onu en kötü durumların önemli olduğu senaryolarda güvenilir bir seçim
          yapar. Ancak pratik uygulamalarda, önbellek verimliliği nedeniyle
          genellikle Quick Sort daha iyi performans gösterir.
        </p>
      </div>

      {/* Related Algorithms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Heap Sort ile ilişkili veya benzer algoritmaları keşfedin:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Priority Queue</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Heap veri yapısını kullanarak elemanları öncelik sırasına göre
                işler. Heap Sort'un temelini oluşturur.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Smoothsort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Heap Sort'un bir varyasyonu olup, Leonardo heapleri kullanır ve
                kısmen sıralı dizilerde daha iyi performans gösterir.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Introspective Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Quick Sort, Heap Sort ve Insertion Sort'u birleştiren hibrit bir
                algoritma. En iyi durumda Quick Sort, en kötü durumda Heap Sort
                kullanır.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Algorithm Explanation */}
      <AlgorithmExplanation
        title="Heap Sort"
        description="Binary heap veri yapısını kullanan, karşılaştırma tabanlı bir sıralama algoritması."
        timeComplexity={{
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n log n)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          'Her durumda O(n log n) zaman karmaşıklığı garantisi',
          'Ekstra bellek gerektirmez (yerinde sıralama)',
          'En kötü durumda bile tutarlı performans',
          'Öncelikli kuyruk (priority queue) uygulamaları için idealdir',
        ]}
        disadvantages={[
          'Kararsız bir sıralama algoritmasıdır',
          "Pratik uygulamalarda genellikle Quick Sort'tan daha yavaştır",
          'Önbellek dostu değildir (cache-unfriendly)',
          'Veri erişim modelinden dolayı modern CPU mimarilerinde verimsiz olabilir',
        ]}
        pseudocode={`HEAPSORT(A)
1  BUILD-MAX-HEAP(A)           // Diziyi max-heap'e dönüştür
2  for i = A.length downto 2   // Dizinin sonundan başlayarak her eleman için
3    swap A[1] with A[i]       // Kök (maksimum) elemanı sona taşı
4    A.heap-size = A.heap-size - 1  // Heap boyutunu azalt
5    MAX-HEAPIFY(A, 1)         // Yeni kökü heapify et

BUILD-MAX-HEAP(A)
1  A.heap-size = A.length     // Tüm diziyi heap olarak işaretle
2  for i = floor(A.length/2) downto 1  // Son olmayan düğümlerden başlayarak
3    MAX-HEAPIFY(A, i)        // Her düğümü heapify et

MAX-HEAPIFY(A, i)
1  l = LEFT(i)                // Sol çocuk indeksi
2  r = RIGHT(i)               // Sağ çocuk indeksi
3  if l <= A.heap-size and A[l] > A[i]  // Sol çocuk varsa ve daha büyükse
4    largest = l              // En büyük olarak işaretle
5  else                       // Değilse
6    largest = i              // Kök en büyük
7  if r <= A.heap-size and A[r] > A[largest]  // Sağ çocuk varsa ve daha büyükse
8    largest = r              // En büyük olarak işaretle
9  if largest != i            // Kök en büyük değilse
10   swap A[i] with A[largest]  // Kökü en büyük ile değiştir
11   MAX-HEAPIFY(A, largest)  // Alt ağacı heapify et`}
        applications={[
          'Öncelikli kuyruk (priority queue) uygulamaları',
          'Dijkstra ve Prim algoritmaları gibi graf algoritmaları',
          'K en büyük/küçük eleman bulma problemleri',
          'Gündelik ve gerçek zamanlı sistemlerde kullanılan programlama dillerinin sıralama işlevleri',
          'Sistem izleme ve kaynak yönetimi',
        ]}
      />
    </div>
  );
}
