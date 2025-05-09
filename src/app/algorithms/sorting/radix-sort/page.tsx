'use client';

import React from 'react';
import { radixSort } from '@/lib/algorithms/sorting';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RadixSortPage() {
  // Algorithm implementations in different languages
  const implementations = {
    javascript: `/**
 * Radix Sort implementation for JavaScript arrays
 * @param {Array<number>} arr - The array of non-negative integers to sort
 * @returns {Array<number>} - A new sorted array
 */
function radixSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  
  // Edge case: empty array
  if (result.length === 0) return result;
  
  // Find the maximum element to determine the number of digits
  const max = Math.max(...result);
  
  // Do counting sort for every digit position
  // Start from least significant digit (LSD) to most significant digit (MSD)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Call counting sort for the current digit
    countingSortByDigit(result, exp);
  }
  
  return result;
}

/**
 * Counting sort implementation that sorts based on a specific digit position
 * @param {Array<number>} arr - The array to sort
 * @param {number} exp - The current digit position (1, 10, 100, ...)
 */
function countingSortByDigit(arr, exp) {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0); // Digits are 0-9
  
  // Count occurrences of each digit at the current position
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] so that it contains the position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array in a stable way (traversing from end to start)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy the output array to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
    python: `def radix_sort(arr):
    """
    Implementation of Radix Sort algorithm in Python
    
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
    
    # Find the maximum element to determine the number of digits
    max_element = max(result)
    
    # Do counting sort for every digit position
    # Start from least significant digit (LSD) to most significant digit (MSD)
    exp = 1
    while max_element // exp > 0:
        counting_sort_by_digit(result, exp)
        exp *= 10
        
    return result

def counting_sort_by_digit(arr, exp):
    """
    Counting sort implementation that sorts based on a specific digit position
    
    Args:
        arr: The array to sort
        exp: The current digit position (1, 10, 100, ...)
    """
    n = len(arr)
    output = [0] * n
    count = [0] * 10  # Digits are 0-9
    
    # Count occurrences of each digit at the current position
    for i in range(n):
        digit = (arr[i] // exp) % 10
        count[digit] += 1
    
    # Change count[i] so that it contains the position of this digit in output[]
    for i in range(1, 10):
        count[i] += count[i - 1]
    
    # Build the output array in a stable way (traversing from end to start)
    for i in range(n - 1, -1, -1):
        digit = (arr[i] // exp) % 10
        output[count[digit] - 1] = arr[i]
        count[digit] -= 1
    
    # Copy the output array to arr
    for i in range(n):
        arr[i] = output[i]`,
    typescript: `/**
 * Radix Sort implementation for TypeScript arrays
 * @param arr - The array of non-negative integers to sort
 * @returns A new sorted array
 */
function radixSort(arr: number[]): number[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  
  // Edge case: empty array
  if (result.length === 0) return result;
  
  // Find the maximum element to determine the number of digits
  const max = Math.max(...result);
  
  // Do counting sort for every digit position
  // Start from least significant digit (LSD) to most significant digit (MSD)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Call counting sort for the current digit
    countingSortByDigit(result, exp);
  }
  
  return result;
}

/**
 * Counting sort implementation that sorts based on a specific digit position
 * @param arr - The array to sort
 * @param exp - The current digit position (1, 10, 100, ...)
 */
function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output: number[] = new Array(n).fill(0);
  const count: number[] = new Array(10).fill(0); // Digits are 0-9
  
  // Count occurrences of each digit at the current position
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }
  
  // Change count[i] so that it contains the position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  // Build the output array in a stable way (traversing from end to start)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  // Copy the output array to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`,
    java: `/**
 * Radix Sort implementation in Java for non-negative integers
 * 
 * @param arr The array of non-negative integers to sort
 * @return A new sorted array
 */
public static int[] radixSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    
    // Handle edge case of empty array
    if (result.length == 0) return result;
    
    // Find the maximum element to determine the number of digits
    int max = Arrays.stream(result).max().orElse(0);
    
    // Do counting sort for every digit position
    // Start from least significant digit (LSD) to most significant digit (MSD)
    for (int exp = 1; max / exp > 0; exp *= 10) {
        countingSortByDigit(result, exp);
    }
    
    return result;
}

/**
 * Counting sort implementation that sorts based on a specific digit position
 * 
 * @param arr The array to sort
 * @param exp The current digit position (1, 10, 100, ...)
 */
private static void countingSortByDigit(int[] arr, int exp) {
    int n = arr.length;
    int[] output = new int[n];
    int[] count = new int[10]; // Digits are 0-9
    
    // Count occurrences of each digit at the current position
    for (int i = 0; i < n; i++) {
        int digit = (arr[i] / exp) % 10;
        count[digit]++;
    }
    
    // Change count[i] so that it contains the position of this digit in output[]
    for (int i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }
    
    // Build the output array in a stable way (traversing from end to start)
    for (int i = n - 1; i >= 0; i--) {
        int digit = (arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    
    // Copy the output array to arr
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}`,
  };

  // Detailed radix sort explanation
  const radixSortDescription = `
Radix Sort, sayıların basamak değerlerine göre sıralama yapan, karşılaştırma yapmayan bir sıralama algoritmasıdır. Her basamak için ayrı bir sıralama işlemi uygulayarak, en düşük anlamlı basamaktan (LSD - Least Significant Digit) başlayıp en yüksek anlamlı basamağa (MSD - Most Significant Digit) doğru ilerler.

## Çalışma Prensibi:

1. Dizideki maksimum sayıyı bularak, gerekli basamak sayısını belirle.
2. En düşük anlamlı basamaktan (birler basamağı) başlayarak, her basamak için:
   a. Elemanları o basamaktaki değerlerine göre grupla (genellikle Counting Sort kullanılır).
   b. Gruplara göre diziyi yeniden düzenle.
3. Her basamak için bu işlemi tekrarla, en yüksek anlamlı basamağa kadar.

## Önemli Özellikler:

1. **Karşılaştırma Yapmadan Sıralama**: Diğer karşılaştırma tabanlı algoritmaların aksine, elemanları birbiriyle karşılaştırmaz.
2. **Kararlı Sıralama**: Eşit değere sahip elemanların göreceli sırası korunur (Counting Sort kararlı uygulandığında).
3. **Zaman Karmaşıklığı**: O(d × (n + k)), burada d basamak sayısı, n eleman sayısı, k ise olası basamak değeri sayısı (decimal için 10).
4. **Sınırlı Uygulama Alanı**: En verimli şekilde sayılar, stringler ve sabit uzunluktaki veriler için çalışır.

Radix Sort, sayılar çok büyük olmadığında ve basamak sayısı makul olduğunda oldukça verimlidir. Özellikle, tüm sayıların aynı basamak sayısına sahip olduğu durumlar için idealdir.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Radix Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          {/* Algorithm Description */}
          <Card>
            <CardHeader>
              <CardTitle>Radix Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{radixSortDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Radix Sort algoritmasının farklı programlama dillerindeki uygulamaları
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
              title="Radix Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Radix Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Radix Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Radix Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interactive Demo Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Radix Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış <strong>pozitif tam sayılar</strong>{' '}
          girin (örn: 170,45,75,90,802,24,2,66). Not: Radix Sort sadece tam
          sayılarla çalışır ve negatif değerler için ek işlemler gerektirir.
        </p>

        <InteractiveDemo
          title="Radix Sort Demo"
          description="Verdiğiniz dizi Radix Sort algoritması ile sıralanacaktır."
          algorithmFunction={radixSort}
          inputType="array"
          inputPlaceholder="170,45,75,90,802,24,2,66"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Radix Sort, d basamaklı n sayı için O(d(n+k)) karmaşıklığa
                sahiptir. Burada k basamak değeri aralığıdır (decimal için 10).
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
                      O(d(n+k))
                    </code>{' '}
                    - Burada d basamak sayısı, n eleman sayısı, k olası basamak
                    değeri sayısı (decimal için 10).
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(d(n+k))
                    </code>{' '}
                    - Karmaşıklık, giriş verisinin dağılımından bağımsızdır.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(d(n+k))
                    </code>{' '}
                    - Dizinin durumundan etkilenmez, sadece basamak sayısına
                    bağlıdır.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(n+k)
                  </code>{' '}
                  - Her basamak sıralaması için, sayaç dizisi (k boyutunda) ve
                  çıktı dizisi (n boyutunda) için ekstra bellek kullanır.
                  Yerinde (in-place) bir sıralama algoritması değildir.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Radix Sort <span className="font-medium">kararlı</span> bir
                  algoritmadır, çünkü her basamak sıralaması kararlı bir şekilde
                  (genellikle Counting Sort ile) yapılır. Bu sayede, aynı
                  basamak değerine sahip sayıların göreceli sırası korunur.
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
                    Karşılaştırma yapmadığı için karşılaştırma tabanlı
                    algoritmaların O(n log n) alt sınırını aşabilir.
                  </li>
                  <li>
                    Sabit basamak sayısına sahip sayılar için, O(n) zaman
                    karmaşıklığına yaklaşabilir.
                  </li>
                  <li>
                    Kararlı bir sıralama algoritmasıdır, eşit değere sahip
                    elemanların orijinal sırasını korur.
                  </li>
                  <li>
                    Stringler ve sabit uzunluktaki veri yapıları için de
                    kullanılabilir.
                  </li>
                  <li>
                    Çok büyük dizilerde ve çok geniş değer aralıklarında bile
                    verimli olabilir.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Dezavantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    Basamak sayısı çok farklı olan sayılarda verimsiz olabilir.
                  </li>
                  <li>Ekstra bellek gerektirir (yerinde sıralama yapmaz).</li>
                  <li>
                    Negatif sayılar için doğrudan uygulanamaz, ek değişiklikler
                    gerektirir.
                  </li>
                  <li>
                    Ondalık sayılar (float, double) için özel adaptasyonlar
                    gerektirir.
                  </li>
                  <li>
                    Çok büyük basamak sayısına sahip sayılarda, çok fazla
                    iterasyon gerekebilir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Radix Sort vs Other Algorithms Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Radix Sort ve Diğer Algoritmalar</h2>
        <p className="text-muted-foreground">
          Radix Sort ile diğer sıralama algoritmalarının karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Radix Sort</th>
                <th className="p-2 text-left">Counting Sort</th>
                <th className="p-2 text-left">Quick Sort</th>
                <th className="p-2 text-left">Merge Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Karşılaştırma Yapar mı?</td>
                <td className="p-2">Hayır</td>
                <td className="p-2">Hayır</td>
                <td className="p-2">Evet</td>
                <td className="p-2">Evet</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Zaman Karmaşıklığı</td>
                <td className="p-2">O(d(n+k))</td>
                <td className="p-2">O(n+k)</td>
                <td className="p-2">O(n log n) (Ortalama)</td>
                <td className="p-2">O(n log n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Alan Karmaşıklığı</td>
                <td className="p-2">O(n+k)</td>
                <td className="p-2">O(n+k)</td>
                <td className="p-2">O(log n)</td>
                <td className="p-2">O(n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Veri Kısıtlamaları</td>
                <td className="p-2">Sabit boyutlu anahtarlar</td>
                <td className="p-2">Sınırlı aralıklı tam sayılar</td>
                <td className="p-2">Yok</td>
                <td className="p-2">Yok</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">
                  Geniş Değer Aralıklarında Verimlilik
                </td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Düşük</td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Yüksek</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">Geniş aralıklı sabit boyutlu anahtarlar</td>
                <td className="p-2">Küçük tam sayı aralıkları</td>
                <td className="p-2">Genel amaçlı</td>
                <td className="p-2">Kararlılık önemli olduğunda</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Radix Sort, sınırlı basamak sayısına sahip sayılar için mükemmel bir
          seçimdir ve geniş değer aralıklarında Counting Sort'a göre daha
          verimlidir. Özellikle tüm sayıların benzer basamak sayısına sahip
          olduğu durumlarda, karşılaştırma tabanlı algoritmalara göre daha iyi
          performans gösterebilir.
        </p>
      </div>

      {/* Radix Sort Visualization Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Radix Sort Nasıl Çalışır?</h2>
        <p className="text-muted-foreground">
          Aşağıda, Radix Sort'un [170, 45, 75, 90, 802, 24, 2, 66] dizisini
          sıralama adımları gösterilmiştir:
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Adım Adım Radix Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-2">
                  Başlangıç Dizisi:
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [170, 45, 75, 90, 802, 24, 2, 66]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  1. Adım: Birler basamağına göre sıralama (exp = 1)
                </h3>
                <p className="text-sm mb-2">
                  Birler basamağındaki değerler: [0, 5, 5, 0, 2, 4, 2, 6]
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [170, 90, 802, 2, 24, 45, 75, 66]
                </code>
                <p className="text-sm mt-2">
                  Sıralama sonrası, birler basamağı: [0, 0, 2, 2, 4, 5, 5, 6]
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  2. Adım: Onlar basamağına göre sıralama (exp = 10)
                </h3>
                <p className="text-sm mb-2">
                  Onlar basamağındaki değerler: [7, 9, 0, 0, 2, 4, 7, 6]
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [802, 2, 24, 45, 66, 170, 75, 90]
                </code>
                <p className="text-sm mt-2">
                  Sıralama sonrası, onlar basamağı: [0, 0, 2, 4, 6, 7, 7, 9]
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  3. Adım: Yüzler basamağına göre sıralama (exp = 100)
                </h3>
                <p className="text-sm mb-2">
                  Yüzler basamağındaki değerler: [1, 0, 0, 0, 0, 0, 0, 8]
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 24, 45, 66, 75, 90, 170, 802]
                </code>
                <p className="text-sm mt-2">
                  Sıralama sonrası, yüzler basamağı: [0, 0, 0, 0, 0, 0, 1, 8]
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  Sonuç: Tamamen Sıralanmış Dizi
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 24, 45, 66, 75, 90, 170, 802]
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Related Algorithms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Radix Sort ile ilişkili veya benzer algoritmalar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Counting Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Radix Sort'un her basamak sıralaması için kullanılan temel
                algoritma. Sınırlı değer aralığında lineer zaman karmaşıklığı
                sunar.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">MSD Radix Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                En yüksek anlamlı basamaktan (MSD) başlayarak sıralama yapar.
                Daha erken kesme imkanı sunabilir, ancak implementasyonu daha
                karmaşıktır.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Bucket Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Veriyi "kovalara" böler ve her kovayı ayrı ayrı sıralar. Düzgün
                dağılımlı verilerde Radix Sort gibi lineer karmaşıklık
                gösterebilir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Algorithm Explanation */}
      <AlgorithmExplanation
        title="Radix Sort"
        description="Basamak değerlerine göre sıralama yapan, karşılaştırma yapmayan bir algoritma."
        timeComplexity={{
          best: 'O(d(n+k))',
          average: 'O(d(n+k))',
          worst: 'O(d(n+k))',
        }}
        spaceComplexity="O(n+k)"
        advantages={[
          'Karşılaştırma yapmadan sıralama yapabilir',
          "Geniş değer aralıklarında Counting Sort'tan daha verimlidir",
          'Kararlı bir sıralama algoritmasıdır',
          'Dizinin durumundan bağımsız olarak tutarlı performans gösterir',
        ]}
        disadvantages={[
          'Ekstra bellek gerektirir (yerinde sıralama yapmaz)',
          'Basamak sayısı çok farklı olan sayılarda verimsiz olabilir',
          'Negatif sayılar için ek işlemler gerektirir',
          'Ondalık sayılar için özel adaptasyon gerektirir',
        ]}
        pseudocode={`RADIX-SORT(A, d)
1  for i = 1 to d         // d: maksimum basamak sayısı
2    stable-sort array A using digit i as the sort key
    
// LSD Radix Sort için aşağıdaki şekilde de yazılabilir:
RADIX-SORT(A)
1  max = maximum element in array A
2  exp = 1             // Basamak değeri başlangıcı (birler basamağı)
3  while max / exp > 0
4    COUNTING-SORT-BY-DIGIT(A, exp)
5    exp = exp * 10   // Bir sonraki basamağa geç

COUNTING-SORT-BY-DIGIT(A, exp)
1  count[0..9] = new array
2  output[1..n] = new array
3  for i = 0 to 9
4    count[i] = 0
5  for j = 1 to length[A]
6    digit = (A[j] / exp) % 10
7    count[digit] = count[digit] + 1
8  for i = 1 to 9
9    count[i] = count[i] + count[i-1]
10 for j = length[A] downto 1
11   digit = (A[j] / exp) % 10
12   output[count[digit]] = A[j]
13   count[digit] = count[digit] - 1
14 for j = 1 to length[A]
15   A[j] = output[j]`}
        applications={[
          'Sıralama performansının kritik olduğu uygulamalar',
          'Geniş aralıklı tam sayıları sıralama',
          'Sabit uzunluklu verileri sıralama (örn. IP adresleri)',
          'Sözlük/kelime sıralaması (lexicographic sort)',
          'Veri tabanlarında kayıt sıralama işlemleri',
        ]}
      />
    </div>
  );
}
