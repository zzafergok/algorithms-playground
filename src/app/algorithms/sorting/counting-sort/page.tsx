'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { countingSort } from '@/lib/algorithms/sorting';

export default function CountingSortPage() {
  const implementations = {
    javascript: `/**
 * Counting Sort implementation for JavaScript arrays
 * @param {Array<number>} arr - The array of non-negative integers to sort
 * @returns {Array<number>} - A new sorted array
 */
function countingSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  
  // Edge case: empty array
  if (result.length === 0) return result;
  
  // Find the maximum element to determine the count array size
  const max = Math.max(...result);
  
  // Create counting array (index 0 to max)
  const count = new Array(max + 1).fill(0);
  
  // Count frequency of each element
  for (let i = 0; i < result.length; i++) {
    count[result[i]]++;
  }
  
  // Update counting array with cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  // Create the output array
  const output = new Array(result.length);
  
  // Build the output array in a stable way (traversing from end to start)
  for (let i = result.length - 1; i >= 0; i--) {
    output[count[result[i]] - 1] = result[i];
    count[result[i]]--;
  }
  
  // Copy the output array to result
  for (let i = 0; i < result.length; i++) {
    result[i] = output[i];
  }
  
  return result;
}`,
    python: `def counting_sort(arr):
    """
    Implementation of Counting Sort algorithm in Python
    
    Args:
        arr: Input list of non-negative integers to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    
    # Handle edge case of empty array
    if len(result) == 0:
        return result
    
    # Find the maximum element to determine the count array size
    max_element = max(result)
    
    # Create a count array to store the count of each unique object
    count = [0] * (max_element + 1)
    
    # Store the count of each element
    for num in result:
        count[num] += 1
    
    # Store the cumulative count
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    
    # Create the output array
    output = [0] * len(result)
    
    # Build the output array in a stable way (traversing from end to start)
    for i in range(len(result) - 1, -1, -1):
        output[count[result[i]] - 1] = result[i]
        count[result[i]] -= 1
    
    # Copy the sorted elements into original array
    for i in range(len(result)):
        result[i] = output[i]
        
    return result`,
    typescript: `/**
 * Counting Sort implementation for TypeScript arrays
 * @param arr - The array of non-negative integers to sort
 * @returns A new sorted array
 */
function countingSort(arr: number[]): number[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  
  // Edge case: empty array
  if (result.length === 0) return result;
  
  // Find the maximum element to determine the count array size
  const max = Math.max(...result);
  
  // Create counting array (index 0 to max)
  const count: number[] = new Array(max + 1).fill(0);
  
  // Count frequency of each element
  for (let i = 0; i < result.length; i++) {
    count[result[i]]++;
  }
  
  // Update counting array with cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }
  
  // Create the output array
  const output: number[] = new Array(result.length);
  
  // Build the output array in a stable way (traversing from end to start)
  for (let i = result.length - 1; i >= 0; i--) {
    output[count[result[i]] - 1] = result[i];
    count[result[i]]--;
  }
  
  // Copy the output array to result
  for (let i = 0; i < result.length; i++) {
    result[i] = output[i];
  }
  
  return result;
}`,
    java: `/**
 * Counting Sort implementation in Java for non-negative integers
 * 
 * @param arr The array of non-negative integers to sort
 * @return A new sorted array
 */
public static int[] countingSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    
    // Handle edge case of empty array
    if (result.length == 0) return result;
    
    // Find the maximum element to determine the count array size
    int max = Arrays.stream(result).max().orElse(0);
    
    // Create a count array to store the count of each element
    int[] count = new int[max + 1];
    
    // Store the count of each element
    for (int num : result) {
        count[num]++;
    }
    
    // Store the cumulative count
    for (int i = 1; i <= max; i++) {
        count[i] += count[i - 1];
    }
    
    // Create the output array
    int[] output = new int[result.length];
    
    // Build the output array in a stable way (traversing from end to start)
    for (int i = result.length - 1; i >= 0; i--) {
        output[count[result[i]] - 1] = result[i];
        count[result[i]]--;
    }
    
    // Copy the output array to result
    for (int i = 0; i < result.length; i++) {
        result[i] = output[i];
    }
    
    return result;
}`,
  };

  const countingSortDescription = `
Counting Sort, karşılaştırma yapmadan sıralama yapan, belirli koşullar altında lineer zaman karmaşıklığı (O(n)) sunan bir sıralama algoritmasıdır. Giriş dizisindeki her elemanın kaç kez tekrarlandığını sayarak çalışır ve bu sayıları kullanarak sıralı bir dizi oluşturur.

## Çalışma Prensibi:

1. Giriş dizisindeki maksimum değeri bul (k).
2. k+1 uzunluğunda bir sayaç dizisi oluştur ve tümünü 0 ile başlat.
3. Giriş dizisinin her bir elemanı için, sayaç dizisinde ilgili indeksi 1 artır.
4. Sayaç dizisini kümülatif olarak güncelle (her eleman kendinden önceki ile toplanır).
5. Sıralı diziyi oluşturmak için giriş dizisini sondan başa doğru tara.
6. Her eleman için, sayaç dizisindeki değer, o elemanın sıralı dizideki konumunu belirtir.

## Önemli Özellikler:

1. **Karşılaştırma Yapmadan Sıralama**: Diğer algoritmaların aksine, elemanları birbiriyle karşılaştırmaz.
2. **Kararlı Sıralama**: Eşit değere sahip elemanların göreceli sırası korunur.
3. **Sınırlı Uygulama Alanı**: Sadece sınırlı değer aralığına sahip tam sayılar için verimlidir.
4. **Zaman Karmaşıklığı**: O(n+k), burada n giriş dizisinin boyutu, k ise olası değer aralığı.

Counting Sort, özellikle k değeri n ile karşılaştırılabilir olduğunda (k = O(n)) çok verimlidir, ancak değer aralığı çok büyükse verimli değildir.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Counting Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Counting Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{countingSortDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Counting Sort algoritmasının farklı programlama dillerindeki
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
              title="Counting Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Counting Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Counting Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Counting Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Counting Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış <strong>pozitif tam sayılar</strong>{' '}
          girin (örn: 5,3,8,4,2). Not: Counting Sort sadece tam sayılarla
          çalışır ve negatif değerler için ek işlemler gerektirir.
        </p>

        <InteractiveDemo
          title="Counting Sort Demo"
          description="Verdiğiniz dizi Counting Sort algoritması ile sıralanacaktır."
          algorithmFunction={countingSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Counting Sort, değer aralığı sınırlı tam sayı dizileri için
                O(n+k) karmaşıklığa sahiptir. Burada k dizideki maksimum
                değerdir.
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
                      O(n+k)
                    </code>{' '}
                    - Burada n giriş dizisinin boyutu, k ise değer aralığı.
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n+k)
                    </code>{' '}
                    - Karmaşıklık, giriş verisinin dağılımından bağımsızdır.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n+k)
                    </code>{' '}
                    - Diğer algoritmalardan farklı olarak, dizinin durumundan
                    etkilenmez.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(n+k)
                  </code>{' '}
                  - Sayaç dizisi (k boyutunda) ve çıktı dizisi (n boyutunda)
                  için ekstra bellek kullanır. Yerinde (in-place) bir sıralama
                  algoritması değildir.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Counting Sort <span className="font-medium">kararlı</span> bir
                  algoritma olarak uygulanabilir. Bu uygulama, giriş dizisini
                  sondan başa doğru tarayarak eşit değerli elemanların göreceli
                  sırasının korunmasını sağlar.
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
                  <li>
                    Sınırlı aralıkta lineer zaman karmaşıklığı (O(n+k)) sağlar.
                  </li>
                  <li>
                    Karşılaştırma yapmadığı için karşılaştırma tabanlı
                    algoritmaların O(n log n) alt sınırını aşabilir.
                  </li>
                  <li>
                    Kararlı bir sıralama algoritmadır, eşit değere sahip
                    elemanların orijinal sırasını korur.
                  </li>
                  <li>
                    Radix Sort gibi daha gelişmiş algoritmaların yapı taşı
                    olarak kullanılır.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Dezavantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    Sadece tam sayı veya sınırlı aralıktaki değerler için
                    etkilidir.
                  </li>
                  <li>Değer aralığı (k) çok büyükse verimsiz olabilir.</li>
                  <li>
                    Veri kümesi boyutuna ek olarak, değer aralığı kadar ekstra
                    bellek gerektirir.
                  </li>
                  <li>
                    Negatif sayılar için doğrudan uygulanamaz, ek değişiklikler
                    gerektirir.
                  </li>
                  <li>
                    Anahtar-değer çiftleri veya daha karmaşık veri yapıları için
                    özel uygulamalar gerektirir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Counting Sort ve Karşılaştırmalı Algoritmalar
        </h2>
        <p className="text-muted-foreground">
          Counting Sort ile karşılaştırma tabanlı ve karşılaştırma yapmayan
          diğer sıralama algoritmalarının karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Counting Sort</th>
                <th className="p-2 text-left">Quick Sort</th>
                <th className="p-2 text-left">Radix Sort</th>
                <th className="p-2 text-left">Bucket Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Karşılaştırma Yapar mı?</td>
                <td className="p-2">Hayır</td>
                <td className="p-2">Evet</td>
                <td className="p-2">Hayır</td>
                <td className="p-2">Kısmen</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Zaman Karmaşıklığı</td>
                <td className="p-2">O(n+k)</td>
                <td className="p-2">O(n log n) (Ortalama)</td>
                <td className="p-2">O(d(n+k))</td>
                <td className="p-2">O(n+k)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Alan Karmaşıklığı</td>
                <td className="p-2">O(n+k)</td>
                <td className="p-2">O(log n)</td>
                <td className="p-2">O(n+k)</td>
                <td className="p-2">O(n+k)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Uygulamaya Bağlı</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Veri Kısıtlamaları</td>
                <td className="p-2">Sınırlı aralıklı tam sayılar</td>
                <td className="p-2">Yok</td>
                <td className="p-2">Sabit boyutlu anahtarlar</td>
                <td className="p-2">Düzgün dağılımlı veriler</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">
                  Tekrarlayan elemanlar için verimlilik
                </td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Orta</td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Orta-Yüksek</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">Küçük tam sayı aralığı</td>
                <td className="p-2">Genel amaçlı</td>
                <td className="p-2">Çok basamaklı sayılar</td>
                <td className="p-2">Düzgün dağılımlı veriler</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Counting Sort, sınırlı aralıktaki tam sayılar için mükemmel bir
          seçimdir ve lineer zaman karmaşıklığı sunar. Ancak, geniş değer
          aralıkları veya karmaşık veri türleri için uygun değildir. Bu
          durumlarda Radix Sort veya karşılaştırma tabanlı algoritmalar tercih
          edilmelidir.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Counting Sort ile ilişkili veya benzer algoritmalar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Radix Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Sayıları basamak basamak sıralar ve her basamak için genellikle
                Counting Sort kullanır. Büyük sayılar için daha verimlidir.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Bucket Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Veriyi "kovalara" böler ve her kovayı ayrı ayrı sıralar. Veri
                düzgün dağılımlı olduğunda Counting Sort gibi lineer zaman
                karmaşıklığı sunar.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Pigeonhole Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Counting Sort'un bir varyasyonudur. Her değer için tam olarak
                bir "güvercin yuvası" oluşturur ve elemanları yerleştirir. Değer
                aralığı ve eleman sayısı yakın olduğunda idealdir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlgorithmExplanation
        title="Counting Sort"
        description="Karşılaştırma yapmadan sıralama yapan, sınırlı değer aralığında lineer zamanda çalışan bir algoritma."
        timeComplexity={{
          best: 'O(n+k)',
          average: 'O(n+k)',
          worst: 'O(n+k)',
        }}
        spaceComplexity="O(n+k)"
        advantages={[
          'Sınırlı aralıkta lineer zaman karmaşıklığı (O(n+k))',
          'Karşılaştırma yapmadığı için karşılaştırma tabanlı algoritmaların alt sınırını aşabilir',
          'Kararlı bir sıralama algoritmasıdır',
          'Tekrarlanan değerler için oldukça verimlidir',
        ]}
        disadvantages={[
          'Sadece tam sayı veya sınırlı aralıktaki değerler için etkilidir',
          'Değer aralığı (k) çok büyükse verimsiz olabilir',
          'Ekstra bellek gerektirir (yerinde sıralama yapmaz)',
          'Negatif sayılar için doğrudan uygulanamaz',
        ]}
        pseudocode={`COUNTING-SORT(A, B, k)
1  let C[0..k] be a new array // C sayaç dizisi
2  for i = 0 to k
3    C[i] = 0
4  for j = 1 to A.length
5    C[A[j]] = C[A[j]] + 1
6  // C[i] artık A'da i değerine sahip eleman sayısını içerir
7  for i = 1 to k
8    C[i] = C[i] + C[i-1]
9  // C[i] artık A'da i değerinden küçük veya eşit eleman sayısını içerir
10 for j = A.length downto 1
11   B[C[A[j]]] = A[j]
12   C[A[j]] = C[A[j]] - 1`}
        applications={[
          'Radix Sort için alt rutin olarak',
          'Sınırlı aralıktaki tam sayıları sıralama (örn: yaş, not, puan)',
          'Histogram oluşturma ve analiz etme',
          'Sıklık sayımı gerektiren uygulamalar',
          'Sıralama kararlılığının önemli olduğu durumlar',
        ]}
      />
    </div>
  );
}
