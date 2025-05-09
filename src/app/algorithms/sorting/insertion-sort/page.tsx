'use client';

import React from 'react';
import { insertionSort } from '@/lib/algorithms/sorting';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlgorithmExplanation } from '@/components/common/explanation';

export default function InsertionSortPage() {
  // Algorithm implementations in different languages
  const implementations = {
    javascript: `/**
 * Insertion Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function insertionSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    // Store the current element to be inserted
    const current = result[i];
    
    // Find the position to insert the current element in the sorted subarray
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      // Shift elements to the right
      result[j + 1] = result[j];
      j--;
    }
    
    // Insert the current element at the correct position
    result[j + 1] = current;
  }
  
  return result;
}`,
    python: `def insertion_sort(arr):
    """
    Implementation of Insertion Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    n = len(result)
    
    # Start from the second element (index 1)
    for i in range(1, n):
        # Store the current element to be inserted
        current = result[i]
        
        # Find the position to insert the current element in the sorted subarray
        j = i - 1
        while j >= 0 and result[j] > current:
            # Shift elements to the right
            result[j + 1] = result[j]
            j -= 1
            
        # Insert the current element at the correct position
        result[j + 1] = current
        
    return result`,
    typescript: `/**
 * Insertion Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function insertionSort<T>(arr: T[]): T[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  const n = result.length;
  
  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    // Store the current element to be inserted
    const current = result[i];
    
    // Find the position to insert the current element in the sorted subarray
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      // Shift elements to the right
      result[j + 1] = result[j];
      j--;
    }
    
    // Insert the current element at the correct position
    result[j + 1] = current;
  }
  
  return result;
}`,
    java: `/**
 * Insertion Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] insertionSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    // Start from the second element (index 1)
    for (int i = 1; i < n; i++) {
        // Store the current element to be inserted
        int current = result[i];
        
        // Find the position to insert the current element in the sorted subarray
        int j = i - 1;
        while (j >= 0 && result[j] > current) {
            // Shift elements to the right
            result[j + 1] = result[j];
            j--;
        }
        
        // Insert the current element at the correct position
        result[j + 1] = current;
    }
    
    return result;
}`,
  };

  // Detailed insertion sort explanation
  const insertionSortDescription = `
Insertion Sort, sıralanmış kısıma elemanları tek tek yerleştiren basit ve sezgisel bir sıralama algoritmasıdır. Bu algoritma, kart oyununda elimizdeki kartları sıralarken kullandığımız stratejiye benzer bir yaklaşım kullanır.

## Çalışma Prensibi:

1. Dizinin ilk elemanı zaten sıralı kabul edilir.
2. İkinci elemandan başlayarak, her elemanı sıralı alt dizide doğru konuma yerleştir.
3. Bu işlem için, mevcut elemanı geçici olarak sakla.
4. Sıralı kısımda elemandan büyük olan tüm elemanları bir pozisyon sağa kaydır.
5. Boşalan konuma mevcut elemanı yerleştir.
6. Dizinin tüm elemanları için 2-5 adımlarını tekrarla.

## Önemli Özellikler:

1. **Yerinde Sıralama**: Ekstra bellek kullanmadan orijinal diziyi sıralar.
2. **Kararlı Sıralama**: Eşit değere sahip elemanların göreceli sırası korunur.
3. **Uyarlanabilir**: Kısmen sıralı dizilerde daha az işlem yaparak daha verimli çalışır.
4. **Çevrimiçi Algoritma**: Giriş verilerini hepsi bir anda değil, sırayla alabilir.

Insertion Sort, küçük veri setleri veya neredeyse sıralı diziler için oldukça verimlidir. Örneğin, zaten sıralı bir diziye yeni elemanlar eklerken idealdir. Ancak büyük ve rastgele düzenlenmiş dizilerde daha yavaştır.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Insertion Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          {/* Algorithm Description */}
          <Card>
            <CardHeader>
              <CardTitle>Insertion Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">
                  {insertionSortDescription}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Insertion Sort algoritmasının farklı programlama dillerindeki
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
              title="Insertion Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Insertion Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Insertion Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Insertion Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interactive Demo Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Insertion Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </p>

        <InteractiveDemo
          title="Insertion Sort Demo"
          description="Verdiğiniz dizi Insertion Sort algoritması ile sıralanacaktır."
          algorithmFunction={insertionSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Insertion Sort kısmen sıralı dizilerde daha verimlidir ve
                küçük veri setleri için uygun bir seçimdir.
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
                    - Dizi zaten sıralıysa, sadece karşılaştırma yapılır ve hiç
                    yer değiştirme yapılmaz.
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - Rastgele sırada olan bir dizi için, her eleman ortalama
                    olarak yarısı kadar yer değiştirir.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - Dizi tersine sıralıysa, her eleman en başa kadar taşınmak
                    zorundadır.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(1)
                  </code>{' '}
                  - Insertion Sort yerinde (in-place) bir sıralama
                  algoritmasıdır. Giriş dizisinin boyutundan bağımsız olarak
                  sabit miktarda ekstra bellek kullanır.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Insertion Sort <span className="font-medium">kararlı</span>{' '}
                  bir algoritmadır. Eşit değere sahip elemanların göreceli
                  sırası korunur. Bu özellik, çoklu anahtar sıralaması
                  gerektiren uygulamalarda önemlidir.
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
                  <li>Ekstra bellek gerektirmez (O(1) alan karmaşıklığı).</li>
                  <li>
                    Kararlı bir algoritma olduğundan, eşit değerli elemanların
                    sırası korunur.
                  </li>
                  <li>
                    Neredeyse sıralı dizilerde, O(n) karmaşıklığa yaklaşır ve
                    oldukça verimlidir.
                  </li>
                  <li>
                    Çevrimiçi bir algoritma olduğundan, veri aktarımı sırasında
                    sıralama yapabilir.
                  </li>
                  <li>Küçük veri setleri için basit ve verimlidir.</li>
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
                    Rastgele sıralanmış veya tersine sıralı dizilerde performans
                    kaybı yaşanır.
                  </li>
                  <li>Her eleman için kaydırma işlemi maliyetlidir.</li>
                  <li>
                    Dizinin boyutu büyüdükçe, daha gelişmiş algoritmalardan
                    (Quick Sort, Merge Sort vb.) önemli ölçüde daha yavaştır.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insertion Sort Visualization Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Insertion Sort Nasıl Çalışır?</h2>
        <p className="text-muted-foreground">
          Aşağıda, Insertion Sort'un [5, 2, 4, 6, 1, 3] dizisini sıralama
          adımları gösterilmiştir:
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Adım Adım Insertion Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-2">
                  Başlangıç Dizisi:
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [5, 2, 4, 6, 1, 3]
                </code>
                <p className="text-sm mb-2">
                  İlk eleman (5) zaten sıralanmış kabul edilir.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  1. Adım: İkinci elemanı (2) ekle
                </h3>
                <p className="text-sm mb-2">
                  2 değeri 5'ten küçük olduğu için, 5'i sağa kaydır ve 2'yi
                  yerleştir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 5, 4, 6, 1, 3]
                </code>
                <p className="text-sm mt-2">Sıralanmış kısım: [2, 5]</p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  2. Adım: Üçüncü elemanı (4) ekle
                </h3>
                <p className="text-sm mb-2">
                  4 değeri 5'ten küçük ama 2'den büyük olduğu için, 5'i sağa
                  kaydır ve 4'ü yerleştir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 4, 5, 6, 1, 3]
                </code>
                <p className="text-sm mt-2">Sıralanmış kısım: [2, 4, 5]</p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  3. Adım: Dördüncü elemanı (6) ekle
                </h3>
                <p className="text-sm mb-2">
                  6 değeri 5'ten büyük olduğu için yerinde kalır:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 4, 5, 6, 1, 3]
                </code>
                <p className="text-sm mt-2">Sıralanmış kısım: [2, 4, 5, 6]</p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  4. Adım: Beşinci elemanı (1) ekle
                </h3>
                <p className="text-sm mb-2">
                  1 değeri tüm önceki elemanlardan küçük olduğu için, hepsini
                  sağa kaydır ve 1'i başa yerleştir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [1, 2, 4, 5, 6, 3]
                </code>
                <p className="text-sm mt-2">
                  Sıralanmış kısım: [1, 2, 4, 5, 6]
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  5. Adım: Altıncı elemanı (3) ekle
                </h3>
                <p className="text-sm mb-2">
                  3 değeri 2'den büyük ama 4'ten küçük olduğu için, 4, 5 ve 6'yı
                  sağa kaydır ve 3'ü yerleştir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [1, 2, 3, 4, 5, 6]
                </code>
                <p className="text-sm mt-2">
                  Sıralanmış kısım: [1, 2, 3, 4, 5, 6]
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  Sonuç: Tamamen Sıralanmış Dizi
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [1, 2, 3, 4, 5, 6]
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insertion Sort vs Other Algorithms Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Insertion Sort ve Diğer Algoritmalar
        </h2>
        <p className="text-muted-foreground">
          Insertion Sort ile diğer popüler sıralama algoritmalarının
          karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Insertion Sort</th>
                <th className="p-2 text-left">Bubble Sort</th>
                <th className="p-2 text-left">Selection Sort</th>
                <th className="p-2 text-left">Quick Sort</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En İyi Durum</td>
                <td className="p-2">O(n)</td>
                <td className="p-2">O(n)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n log n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En Kötü Durum</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n²)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Alan Karmaşıklığı</td>
                <td className="p-2">O(1)</td>
                <td className="p-2">O(1)</td>
                <td className="p-2">O(1)</td>
                <td className="p-2">O(log n)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararsız</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Uyarlanabilirlik</td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Düşük</td>
                <td className="p-2">Yok</td>
                <td className="p-2">Kısmen</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Çevrimiçi</td>
                <td className="p-2">Evet</td>
                <td className="p-2">Hayır</td>
                <td className="p-2">Hayır</td>
                <td className="p-2">Hayır</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">Kısmen sıralı küçük veri setleri</td>
                <td className="p-2">Eğitim amaçlı</td>
                <td className="p-2">Az takas gerektiren durumlar</td>
                <td className="p-2">Genel amaçlı büyük veri setleri</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Insertion Sort, özellikle kısmen sıralı diziler için verimli bir
          seçimdir. Çoğu programlama dilinin dahili sıralama fonksiyonları,
          küçük alt dizileri sıralamak için Insertion Sort'u tercih eder. Bu
          yüzden hibrit algoritmalarda (Timsort gibi) sıklıkla kullanılır.
        </p>
      </div>

      {/* Related Algorithms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Insertion Sort ile ilişkili veya benzer algoritmalar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Shell Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Insertion Sort'un geliştirilmiş versiyonu. Büyük adımlarla
                başlayıp giderek küçülen adımlarla sıralama yapar, böylece uzak
                elemanları daha hızlı hareket ettirir.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Binary Insertion Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Linear arama yerine binary search kullanarak elemanın doğru
                pozisyonunu daha hızlı bulan bir Insertion Sort varyasyonudur.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Timsort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Insertion Sort ve Merge Sort'u birleştiren bir hibrit algoritma.
                Python, Java ve daha birçok dilin yerleşik sıralama algoritması
                olarak kullanılır.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Algorithm Explanation */}
      <AlgorithmExplanation
        title="Insertion Sort"
        description="Sıralanmış bir alt listeye elemanları birer birer ekleyerek sıralama yapan bir algoritma."
        timeComplexity={{
          best: 'O(n)',
          average: 'O(n²)',
          worst: 'O(n²)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          'Kısmen sıralı veriler için çok verimli',
          'Küçük veri setleri için basit ve etkili',
          'Kararlı bir sıralama algoritması',
          'Yerinde sıralama (ek bellek gerektirmez)',
          'Çevrimiçi bir algoritma (veri gelirken sıralayabilir)',
        ]}
        disadvantages={[
          'Büyük veri setleri için O(n²) karmaşıklık nedeniyle verimsiz',
          'Her eleman için kaydırma işlemi zaman alıcı olabilir',
          'Rastgele sıralanmış dizilerde performans düşüktür',
          "Büyük veri setlerinde Quick Sort veya Merge Sort'tan daha yavaştır",
        ]}
        pseudocode={`INSERTION-SORT(A)
1  for j = 2 to A.length
2    key = A[j]
3    // A[j]'yi sıralanmış alt dizide doğru konuma yerleştir
4    i = j - 1
5    while i > 0 and A[i] > key
6      A[i + 1] = A[i]
7      i = i - 1
8    A[i + 1] = key`}
        applications={[
          'Küçük veri setlerinin sıralanması',
          'Neredeyse sıralı dizilerin sıralanması',
          'Veri süreci sırasında çevrimiçi sıralama',
          'Hibrit sıralama algoritmalarının bir parçası olarak (Timsort)',
          'Sıralama algoritması öğretiminde örnek olarak',
        ]}
      />
    </div>
  );
}
