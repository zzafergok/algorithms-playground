'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { selectionSort } from '@/lib/algorithms/sorting';

export default function SelectionSortPage() {
  const implementations = {
    javascript: `/**
 * Selection Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function selectionSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Outer loop - each iteration places one element in its final position
  for (let i = 0; i < n - 1; i++) {
    // Assume the current index has the minimum value
    let minIndex = i;
    
    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap only if a new minimum was found
    if (minIndex !== i) {
      // Destructuring swap
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  
  return result;
}`,
    python: `def selection_sort(arr):
    """
    Implementation of Selection Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    n = len(result)
    
    # Outer loop - each iteration places one element in its final position
    for i in range(n - 1):
        # Assume the current index has the minimum value
        min_index = i
        
        # Find the minimum element in the unsorted portion
        for j in range(i + 1, n):
            if result[j] < result[min_index]:
                min_index = j
        
        # Swap only if a new minimum was found
        if min_index != i:
            result[i], result[min_index] = result[min_index], result[i]
    
    return result`,
    typescript: `/**
 * Selection Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function selectionSort<T>(arr: T[]): T[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Outer loop - each iteration places one element in its final position
  for (let i = 0; i < n - 1; i++) {
    // Assume the current index has the minimum value
    let minIndex = i;
    
    // Find the minimum element in the unsorted portion
    for (let j = i + 1; j < n; j++) {
      if (result[j] < result[minIndex]) {
        minIndex = j;
      }
    }
    
    // Swap only if a new minimum was found
    if (minIndex !== i) {
      // Destructuring swap
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }
  
  return result;
}`,
    java: `/**
 * Selection Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] selectionSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    // Outer loop - each iteration places one element in its final position
    for (int i = 0; i < n - 1; i++) {
        // Assume the current index has the minimum value
        int minIndex = i;
        
        // Find the minimum element in the unsorted portion
        for (int j = i + 1; j < n; j++) {
            if (result[j] < result[minIndex]) {
                minIndex = j;
            }
        }
        
        // Swap only if a new minimum was found
        if (minIndex != i) {
            // Swap elements
            int temp = result[i];
            result[i] = result[minIndex];
            result[minIndex] = temp;
        }
    }
    
    return result;
}`,
  };

  const selectionSortDescription = `
Selection Sort, dizideki en küçük elemanı bulup başa yerleştiren bir sıralama algoritmasıdır. Bu algoritma, diziyi sıralı ve sırasız olmak üzere iki bölüme ayırır. Her adımda, sırasız bölümdeki en küçük elemanı bulur ve sıralı bölümün sonuna ekler.

## Çalışma Prensibi:

1. Dizinin ilk elemanını geçici olarak en küçük kabul eder.
2. Dizinin geri kalanında daha küçük bir eleman arar.
3. Daha küçük bir eleman bulunursa, bu elemanı yeni en küçük olarak işaretler.
4. Tarama tamamlandıktan sonra, bulunan en küçük elemanı dizinin başıyla takas eder.
5. Sıralı bölümü bir eleman artırır (ilk elemanı artık sıralı kabul eder).
6. Bu işlemleri, sırasız bölüm bitene kadar tekrarlar.

## Önemli Özellikler:

1. **Takas Optimizasyonu**: Minimum eleman zaten doğru konumdaysa takas yapılmaz.
2. **Kararsız Sıralama**: Eşit değere sahip elemanların orijinal sırası korunmayabilir.
3. **Karşılaştırma Sayısı**: Her zaman n*(n-1)/2 karşılaştırma yapar.
4. **Takas Sayısı**: En fazla (n-1) takas işlemi gerçekleştirir, bu da Bubble Sort'tan daha az takas demektir.

Selection Sort, veri kümesinin büyüklüğünden bağımsız olarak her zaman aynı sayıda adım atar, bu nedenle en iyi, ortalama ve en kötü durum karmaşıklıkları aynıdır: O(n²).
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Selection Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selection Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">
                  {selectionSortDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Selection Sort algoritmasının farklı programlama dillerindeki
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
              title="Selection Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Selection Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Selection Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Selection Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Selection Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </p>

        <InteractiveDemo
          title="Selection Sort Demo"
          description="Verdiğiniz dizi Selection Sort algoritması ile sıralanacaktır."
          algorithmFunction={selectionSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Selection Sort her durum için O(n²) zaman karmaşıklığına
                sahiptir, ancak az sayıda takas işlemi gerçekleştirir.
              </p>
            </div>
          )}
        />
      </div>

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
                      O(n²)
                    </code>{' '}
                    - Dizi zaten sıralı olsa bile algoritma her zaman tüm diziyi
                    tarar.
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - Algoritma her zaman n*(n-1)/2 karşılaştırma yapar.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - Dizi ters sıralı olsa bile algoritma aynı sayıda adım
                    atar.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(1)
                  </code>{' '}
                  - Selection Sort yerinde (in-place) bir sıralama
                  algoritmasıdır. Giriş dizisinin boyutundan bağımsız olarak
                  sabit miktarda ekstra bellek kullanır.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Selection Sort <span className="font-medium">kararsız</span>{' '}
                  bir algoritmadır. Eşit değere sahip elemanların göreceli
                  sırası korunmayabilir. Bunun nedeni, uzak mesafedeki takas
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
                  <li>Anlaşılması ve uygulanması kolaydır.</li>
                  <li>
                    Ekstra bellek alanı gerektirmez (O(1) alan karmaşıklığı).
                  </li>
                  <li>
                    Takas işlemi sayısı azdır - en fazla (n-1) takas yapılır.
                  </li>
                  <li>Küçük veri setleri için yeterince verimli olabilir.</li>
                  <li>
                    Yazma işlemi maliyetli olduğunda (örn. EEPROM) verimli
                    olabilir.
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
                    verimsizdir.
                  </li>
                  <li>
                    Dizi durumuna bakılmaksızın her zaman aynı karmaşıklığa
                    sahiptir - uyarlanabilir değildir.
                  </li>
                  <li>
                    Kararsız bir algoritma olduğundan, eşit değerli elemanların
                    sırası değişebilir.
                  </li>
                  <li>
                    Modern uygulamalarda, daha iyi performans sunan algoritmalar
                    tercih edilir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Selection Sort vs Bubble Sort</h2>
        <p className="text-muted-foreground">
          Selection Sort ve Bubble Sort, benzer zaman karmaşıklığına sahip
          olsalar da, önemli farklılıklar içeren iki temel sıralama
          algoritmasıdır. İşte bu iki algoritmanın karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Selection Sort</th>
                <th className="p-2 text-left">Bubble Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Takas İşlemi</td>
                <td className="p-2">En fazla (n-1) takas yapar</td>
                <td className="p-2">En kötü durumda n*(n-1)/2 takas yapar</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Karmaşıklık (En İyi Durum)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n) - Zaten sıralı veri için</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Karmaşıklık (En Kötü Durum)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n²)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Erken Çıkış</td>
                <td className="p-2">Yok - Her zaman tüm diziyi tarar</td>
                <td className="p-2">Var - Sıralı durumda erken sonlanabilir</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Uyarlanabilirlik</td>
                <td className="p-2">Uyarlanabilir değil</td>
                <td className="p-2">Kısmen uyarlanabilir</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">Takas işlemi maliyetli ise</td>
                <td className="p-2">Veri seti neredeyse sıralı ise</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          İki algoritma da O(n²) karmaşıklığa sahiptir, ancak Selection Sort her
          zaman daha az takas işlemi yapar. Bununla birlikte, Bubble Sort kısmen
          sıralı verilerde daha iyi performans gösterebilir ve kararlı bir
          algoritma olması eşit elemanların orijinal sırasını koruduğu anlamına
          gelir.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Selection Sort'a benzer veya alternatif olarak kullanılabilecek diğer
          sıralama algoritmaları:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Insertion Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Kısmen sıralı veriler için Selection Sort'tan daha verimli ve
                kararlı bir algoritmadır.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Heap Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Selection Sort'un daha gelişmiş bir versiyonu olarak
                düşünülebilir, O(n log n) karmaşıklığa sahiptir.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Merge Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Daha hızlı (O(n log n)) ve kararlı bir algoritmadır, ancak
                ekstra bellek gerektirir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
