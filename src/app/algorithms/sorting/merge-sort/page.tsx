'use client';

import React from 'react';
import { mergeSort } from '@/lib/algorithms/sorting';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MergeSortPage() {
  // Algorithm implementations in different languages
  const implementations = {
    javascript: `/**
 * Merge Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function mergeSort(arr) {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) return arr;
  
  // Split array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

/**
 * Merge two sorted arrays into one sorted array
 * @param {Array} left - First sorted array
 * @param {Array} right - Second sorted array
 * @returns {Array} - Merged sorted array
 */
function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add any remaining elements from both arrays
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}`,
    python: `def merge_sort(arr):
    """
    Implementation of Merge Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Base case: lists with 0 or 1 element are already sorted
    if len(arr) <= 1:
        return arr
    
    # Split list into two halves
    mid = len(arr) // 2
    left = arr[:mid]
    right = arr[mid:]
    
    # Recursively sort both halves
    sorted_left = merge_sort(left)
    sorted_right = merge_sort(right)
    
    # Merge the sorted halves
    return merge(sorted_left, sorted_right)

def merge(left, right):
    """
    Merge two sorted lists into one sorted list
    
    Args:
        left: First sorted list
        right: Second sorted list
        
    Returns:
        Merged sorted list
    """
    result = []
    left_index = right_index = 0
    
    # Compare elements from both lists and add the smaller one to the result
    while left_index < len(left) and right_index < len(right):
        if left[left_index] < right[right_index]:
            result.append(left[left_index])
            left_index += 1
        else:
            result.append(right[right_index])
            right_index += 1
    
    # Add any remaining elements from both lists
    result.extend(left[left_index:])
    result.extend(right[right_index:])
    return result`,
    typescript: `/**
 * Merge Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function mergeSort<T>(arr: T[]): T[] {
  // Base case: arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) return arr;
  
  // Split array into two halves
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  
  // Recursively sort both halves
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  
  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

/**
 * Merge two sorted arrays into one sorted array
 * @param left - First sorted array
 * @param right - Second sorted array
 * @returns Merged sorted array
 */
function merge<T>(left: T[], right: T[]): T[] {
  let result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;
  
  // Compare elements from both arrays and add the smaller one to the result
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }
  
  // Add any remaining elements from both arrays
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}`,
    java: `/**
 * Merge Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] mergeSort(int[] arr) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (arr.length <= 1) return arr;
    
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    
    // Split array into two halves
    int mid = result.length / 2;
    int[] left = Arrays.copyOfRange(result, 0, mid);
    int[] right = Arrays.copyOfRange(result, mid, result.length);
    
    // Recursively sort both halves
    left = mergeSort(left);
    right = mergeSort(right);
    
    // Merge the sorted halves
    return merge(left, right);
}

/**
 * Merge two sorted arrays into one sorted array
 * 
 * @param left First sorted array
 * @param right Second sorted array
 * @return Merged sorted array
 */
private static int[] merge(int[] left, int[] right) {
    int[] result = new int[left.length + right.length];
    int leftIndex = 0, rightIndex = 0, resultIndex = 0;
    
    // Compare elements from both arrays and add the smaller one to the result
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] <= right[rightIndex]) {
            result[resultIndex++] = left[leftIndex++];
        } else {
            result[resultIndex++] = right[rightIndex++];
        }
    }
    
    // Add any remaining elements from left array
    while (leftIndex < left.length) {
        result[resultIndex++] = left[leftIndex++];
    }
    
    // Add any remaining elements from right array
    while (rightIndex < right.length) {
        result[resultIndex++] = right[rightIndex++];
    }
    
    return result;
}`,
  };

  // Detailed merge sort explanation
  const mergeSortDescription = `
Merge Sort, "Böl ve Fethet" (Divide and Conquer) paradigmasını kullanan verimli ve kararlı bir sıralama algoritmasıdır. Diziyi önce küçük alt parçalara böler, ardından bu parçaları sıralayarak birleştirir.

## Çalışma Prensibi:

1. **Bölme (Divide)**: Diziyi yaklaşık olarak iki eşit parçaya böl.
2. **Fethetme (Conquer)**: Alt dizileri özyinelemeli olarak sırala.
3. **Birleştirme (Merge)**: Sıralanmış alt dizileri birleştirerek tek bir sıralı dizi oluştur.

## Önemli Özellikler:

1. **Kararlı Sıralama**: Eşit değere sahip elemanların göreceli sırası korunur.
2. **Tutarlı Performans**: Her durumda O(n log n) zaman karmaşıklığı garantisi sunar.
3. **Ekstra Bellek**: Sıralama için ek bellek gerektirir (O(n) alan karmaşıklığı).
4. **Dış Sıralama**: Büyük veri setleri için dış sıralama (external sorting) uygulamaları için uygundur.

Merge Sort, büyük veri setleri için ve kararlılığın önemli olduğu durumlarda tercih edilen bir algoritmadır. Tutarlı performansı ve kararlılığı nedeniyle, birçok programlama dilinin standart kütüphanelerinde kullanılır.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Merge Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          {/* Algorithm Description */}
          <Card>
            <CardHeader>
              <CardTitle>Merge Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{mergeSortDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Merge Sort algoritmasının farklı programlama dillerindeki uygulamaları
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
              title="Merge Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Merge Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Merge Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Merge Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interactive Demo Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Merge Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </p>

        <InteractiveDemo
          title="Merge Sort Demo"
          description="Verdiğiniz dizi Merge Sort algoritması ile sıralanacaktır."
          algorithmFunction={mergeSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Merge Sort her durumda O(n log n) karmaşıklığa sahiptir, bu
                da büyük veri setleri için tutarlı performans sağlar.
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
                    - Dizi zaten sıralı olsa bile, bölme ve birleştirme
                    işlemleri yapılması gerekir.
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n log n)
                    </code>{' '}
                    - Her düzeyde n karşılaştırma yapılır ve log n düzey vardır.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n log n)
                    </code>{' '}
                    - Bölme ve birleştirme işlemleri dizinin düzeninden
                    bağımsızdır.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(n)
                  </code>{' '}
                  - Birleştirme işlemi için geçici bir dizi kullanıldığından,
                  orijinal dizi boyutunda ekstra bellek kullanır.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Merge Sort <span className="font-medium">kararlı</span> bir
                  algoritmadır. Birleştirme işleminde, eşit elemanlar
                  karşılaştırıldığında, sol dizideki eleman önce alınarak,
                  orijinal sıranın korunması sağlanır.
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
                  <li>Her durumda O(n log n) karmaşıklık garantisi sunar.</li>
                  <li>
                    Kararlı bir algoritma olduğundan, eşit değerli elemanların
                    sırası korunur.
                  </li>
                  <li>
                    Bağlı listeler gibi ardışıl erişimli veri yapıları için
                    idealdir.
                  </li>
                  <li>
                    Dizinin düzeninden bağımsız olarak tutarlı performans
                    gösterir.
                  </li>
                  <li>
                    Dış sıralama (external sorting) uygulamaları için uygundur.
                  </li>
                  <li>
                    Paralelleştirmeye uygun bir algoritma yapısına sahiptir.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Dezavantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    O(n) ekstra bellek gerektirir (yerinde sıralama yapmaz).
                  </li>
                  <li>
                    Küçük diziler için Quick Sort veya Insertion Sort'tan daha
                    yavaş olabilir.
                  </li>
                  <li>
                    Her adımda yeni diziler oluşturma ve kopyalama işlemleri
                    performansı etkileyebilir.
                  </li>
                  <li>
                    Birleştirme adımında dizinin tamamını taramak gerekir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Merge Sort Visualization Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Merge Sort Nasıl Çalışır?</h2>
        <p className="text-muted-foreground">
          Aşağıda, Merge Sort'un [38, 27, 43, 3, 9, 82, 10] dizisini sıralama
          adımları gösterilmiştir:
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Adım Adım Merge Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-2">
                  Başlangıç Dizisi:
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [38, 27, 43, 3, 9, 82, 10]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">1. Bölme Adımı:</h3>
                <p className="text-sm mb-2">Diziyi ortadan ikiye böleriz:</p>
                <code className="block bg-muted p-3 rounded-md">
                  [38, 27, 43, 3] ve [9, 82, 10]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">2. Bölme Adımı:</h3>
                <p className="text-sm mb-2">Alt dizileri tekrar böleriz:</p>
                <code className="block bg-muted p-3 rounded-md">
                  [38, 27] ve [43, 3] ve [9, 82] ve [10]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">3. Bölme Adımı:</h3>
                <p className="text-sm mb-2">
                  Alt dizileri tekrar böleriz (bölünebilen diziler için):
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [38] ve [27] ve [43] ve [3] ve [9] ve [82] ve [10]
                </code>
                <p className="text-sm mt-2">
                  Artık tüm alt diziler 1 veya 0 elemanlı, birleştirmeye
                  başlayabiliriz.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  1. Birleştirme Adımı:
                </h3>
                <p className="text-sm mb-2">
                  1 elemanlı alt dizileri sıralı bir şekilde birleştiririz:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [27, 38] ve [3, 43] ve [9, 82] ve [10]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  2. Birleştirme Adımı:
                </h3>
                <p className="text-sm mb-2">
                  2 elemanlı alt dizileri sıralı bir şekilde birleştiririz:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [3, 27, 38, 43] ve [9, 10, 82]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  3. Birleştirme Adımı (Son Adım):
                </h3>
                <p className="text-sm mb-2">
                  Kalan iki alt diziyi sıralı bir şekilde birleştiririz:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [3, 9, 10, 27, 38, 43, 82]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  Sonuç: Tamamen Sıralanmış Dizi
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [3, 9, 10, 27, 38, 43, 82]
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Merge Sort vs Other Algorithms Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Merge Sort ve Diğer Algoritmalar</h2>
        <p className="text-muted-foreground">
          Merge Sort ile diğer popüler sıralama algoritmalarının
          karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Merge Sort</th>
                <th className="p-2 text-left">Quick Sort</th>
                <th className="p-2 text-left">Heap Sort</th>
                <th className="p-2 text-left">Insertion Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En İyi Durum</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En Kötü Durum</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n²)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Alan Karmaşıklığı</td>
                <td className="p-2">O(n)</td>
                <td className="p-2">O(log n)</td>
                <td className="p-2">O(1)</td>
                <td className="p-2">O(1)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Önbellek Dostu</td>
                <td className="p-2">Orta</td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Düşük</td>
                <td className="p-2">Yüksek</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Uyarlanabilirlik</td>
                <td className="p-2">Uyarlanabilir değil</td>
                <td className="p-2">Kısmen</td>
                <td className="p-2">Uyarlanabilir değil</td>
                <td className="p-2">Yüksek</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Dış Sıralama</td>
                <td className="p-2">İdeal</td>
                <td className="p-2">Uygun değil</td>
                <td className="p-2">Uygun değil</td>
                <td className="p-2">Uygun değil</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">
                  Kararlılık, tutarlı performans gerektiğinde
                </td>
                <td className="p-2">Genel amaçlı, pratik kullanım</td>
                <td className="p-2">Sınırlı bellek durumlarında</td>
                <td className="p-2">Küçük veya kısmen sıralı dizilerde</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Merge Sort, özellikle kararlılığın önemli olduğu ve her durumda
          güvenilir performans gerektiren uygulamalar için idealdir. Ancak,
          ekstra bellek kullanımı nedeniyle, bellek sınırlı sistemlerde Heap
          Sort veya Quick Sort daha iyi bir seçenek olabilir.
        </p>
      </div>

      {/* Related Algorithms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Merge Sort ile ilişkili veya benzer algoritmalar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Timsort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Merge Sort ve Insertion Sort'u birleştiren hibrit bir algoritma.
                Python, Java ve diğer birçok dilin yerleşik sıralama algoritması
                olarak kullanılır.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Natural Merge Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Dizideki doğal olarak sıralı alt dizileri (runs) tespit ederek,
                bölme adımını optimize eden bir Merge Sort varyasyonu.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Polyphase Merge Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Dış sıralama için kullanılan bir Merge Sort varyasyonu. Sınırlı
                sayıda dosya veya teyp kullanarak büyük veri setlerini sıralar.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Algorithm Explanation */}
      <AlgorithmExplanation
        title="Merge Sort"
        description="Böl ve Fethet stratejisini kullanan, kararlı ve tutarlı bir sıralama algoritması."
        timeComplexity={{
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n log n)',
        }}
        spaceComplexity="O(n)"
        advantages={[
          'Her durumda O(n log n) zaman karmaşıklığı garantisi',
          'Kararlı bir sıralama algoritması',
          'Bağlı listeler gibi ardışıl erişimli veri yapıları için idealdir',
          'Paralelleştirmeye uygun bir algoritma yapısı',
          'Dış sıralama (external sorting) uygulamaları için idealdir',
        ]}
        disadvantages={[
          'O(n) ekstra bellek gerektirir (yerinde sıralama yapmaz)',
          "Küçük diziler için Quick Sort veya Insertion Sort'tan daha yavaş olabilir",
          'Her adımda yeni diziler oluşturma ve kopyalama işlemleri gerekir',
          'Önbellek verimliliği, ardışıl olmayan bellek erişimleri nedeniyle düşük olabilir',
        ]}
        pseudocode={`MERGE-SORT(A, p, r)
1  if p < r
2    q = floor((p + r) / 2)
3    MERGE-SORT(A, p, q)
4    MERGE-SORT(A, q + 1, r)
5    MERGE(A, p, q, r)

MERGE(A, p, q, r)
1  n1 = q - p + 1
2  n2 = r - q
3  let L[1..n1+1] and R[1..n2+1] be new arrays
4  for i = 1 to n1
5    L[i] = A[p + i - 1]
6  for j = 1 to n2
7    R[j] = A[q + j]
8  L[n1 + 1] = ∞
9  R[n2 + 1] = ∞
10 i = 1
11 j = 1
12 for k = p to r
13   if L[i] ≤ R[j]
14     A[k] = L[i]
15     i = i + 1
16   else
17     A[k] = R[j]
18     j = j + 1`}
        applications={[
          'Büyük veri setlerinin sıralanması',
          'Kararlılığın önemli olduğu sıralama işlemleri',
          'Dış sıralama uygulamaları (büyük dosyaların sıralanması)',
          'Bağlı listeler ve ardışıl erişimli veri yapılarının sıralanması',
          'Paralel hesaplama uygulamaları',
          'İnversiyon sayısı problemi gibi ilişkili algoritma problemleri',
        ]}
      />
    </div>
  );
}
