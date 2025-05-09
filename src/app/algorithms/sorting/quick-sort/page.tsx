'use client';

import React from 'react';
import { quickSort } from '@/lib/algorithms/sorting';
import { CodeBlock } from '@/components/common/code-block';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlgorithmExplanation } from '@/components/common/explanation';

export default function QuickSortPage() {
  // Algorithm implementations in different languages
  const implementations = {
    javascript: `/**
 * Quick Sort implementation for JavaScript arrays
 * @param {Array} arr - The array to sort
 * @returns {Array} - A new sorted array
 */
function quickSort(arr) {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  
  // Helper recursive function that performs the sorting
  const sort = (arr, low, high) => {
    if (low < high) {
      // Find the partition index
      const pivotIndex = partition(arr, low, high);
      
      // Recursively sort elements before and after the pivot
      sort(arr, low, pivotIndex - 1);
      sort(arr, pivotIndex + 1, high);
    }
  };
  
  // Helper function to partition the array around a pivot
  const partition = (arr, low, high) => {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element
    let i = low - 1;
    
    // Compare each element with pivot
    for (let j = low; j < high; j++) {
      // If current element is smaller than the pivot
      if (arr[j] < pivot) {
        i++;
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // Swap the pivot element with the element at (i+1)
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    // Return the pivot position
    return i + 1;
  };
  
  // Call the sorting function on the entire array
  sort(result, 0, result.length - 1);
  
  return result;
}`,
    python: `def quick_sort(arr):
    """
    Implementation of Quick Sort algorithm in Python
    
    Args:
        arr: Input list to be sorted
        
    Returns:
        A new sorted list
    """
    # Create a copy to avoid modifying the original list
    result = arr.copy()
    
    # Helper recursive function that performs the sorting
    def sort(arr, low, high):
        if low < high:
            # Find the partition index
            pivot_index = partition(arr, low, high)
            
            # Recursively sort elements before and after the pivot
            sort(arr, low, pivot_index - 1)
            sort(arr, pivot_index + 1, high)
    
    # Helper function to partition the array around a pivot
    def partition(arr, low, high):
        # Choose the rightmost element as pivot
        pivot = arr[high]
        
        # Index of smaller element
        i = low - 1
        
        # Compare each element with pivot
        for j in range(low, high):
            # If current element is smaller than the pivot
            if arr[j] < pivot:
                i += 1
                # Swap elements
                arr[i], arr[j] = arr[j], arr[i]
        
        # Swap the pivot element with the element at (i+1)
        arr[i + 1], arr[high] = arr[high], arr[i + 1]
        
        # Return the pivot position
        return i + 1
    
    # Call the sorting function on the entire array
    sort(result, 0, len(result) - 1)
    
    return result`,
    typescript: `/**
 * Quick Sort implementation for TypeScript arrays
 * @param arr - The array to sort
 * @returns A new sorted array
 */
function quickSort<T>(arr: T[]): T[] {
  // Create a copy to avoid modifying the original array
  const result = [...arr];
  
  // Helper recursive function that performs the sorting
  const sort = (arr: T[], low: number, high: number): void => {
    if (low < high) {
      // Find the partition index
      const pivotIndex = partition(arr, low, high);
      
      // Recursively sort elements before and after the pivot
      sort(arr, low, pivotIndex - 1);
      sort(arr, pivotIndex + 1, high);
    }
  };
  
  // Helper function to partition the array around a pivot
  const partition = (arr: T[], low: number, high: number): number => {
    // Choose the rightmost element as pivot
    const pivot = arr[high];
    
    // Index of smaller element
    let i = low - 1;
    
    // Compare each element with pivot
    for (let j = low; j < high; j++) {
      // If current element is smaller than the pivot
      if (arr[j] < pivot) {
        i++;
        // Swap elements
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
    
    // Swap the pivot element with the element at (i+1)
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    
    // Return the pivot position
    return i + 1;
  };
  
  // Call the sorting function on the entire array
  sort(result, 0, result.length - 1);
  
  return result;
}`,
    java: `/**
 * Quick Sort implementation in Java
 * 
 * @param arr The array to sort
 * @return A new sorted array
 */
public static int[] quickSort(int[] arr) {
    // Create a copy to avoid modifying the original array
    int[] result = Arrays.copyOf(arr, arr.length);
    
    // Call the sorting function on the entire array
    sort(result, 0, result.length - 1);
    
    return result;
}

/**
 * Helper recursive function that performs the sorting
 * 
 * @param arr The array to sort
 * @param low The starting index
 * @param high The ending index
 */
private static void sort(int[] arr, int low, int high) {
    if (low < high) {
        // Find the partition index
        int pivotIndex = partition(arr, low, high);
        
        // Recursively sort elements before and after the pivot
        sort(arr, low, pivotIndex - 1);
        sort(arr, pivotIndex + 1, high);
    }
}

/**
 * Helper function to partition the array around a pivot
 * 
 * @param arr The array to partition
 * @param low The starting index
 * @param high The ending index
 * @return The pivot position
 */
private static int partition(int[] arr, int low, int high) {
    // Choose the rightmost element as pivot
    int pivot = arr[high];
    
    // Index of smaller element
    int i = low - 1;
    
    // Compare each element with pivot
    for (int j = low; j < high; j++) {
        // If current element is smaller than the pivot
        if (arr[j] < pivot) {
            i++;
            // Swap elements
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    
    // Swap the pivot element with the element at (i+1)
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    
    // Return the pivot position
    return i + 1;
}`,
  };

  // Detailed quick sort explanation
  const quickSortDescription = `
Quick Sort, "Böl ve Fethet" (Divide and Conquer) paradigmasını kullanan hızlı ve verimli bir sıralama algoritmasıdır. Tony Hoare tarafından 1960 yılında geliştirilmiştir ve adını hızlı çalışmasından almıştır.

## Çalışma Prensibi:

1. **Pivot Seçimi**: Diziden bir "pivot" eleman seçilir.
2. **Bölme (Partitioning)**: Dizi, pivot etrafında yeniden düzenlenir:
   - Pivottan küçük elemanlar pivotun soluna
   - Pivottan büyük elemanlar pivotun sağına yerleştirilir
3. **Özyineleme (Recursion)**: Pivotun solundaki ve sağındaki alt diziler için aynı işlem özyinelemeli olarak tekrarlanır.
4. **Birleştirme**: Quick Sort'ta açık bir birleştirme adımı yoktur, alt diziler yerinde sıralanır.

## Önemli Özellikler:

1. **Yerinde Sıralama**: Genellikle ekstra O(log n) yığın belleği dışında ek bellek kullanmaz.
2. **Kararsız Sıralama**: Eşit değere sahip elemanların göreceli sırası korunmayabilir.
3. **Uyarlanabilir**: Pivot seçimine bağlı olarak özelleştirilebilir ve optimize edilebilir.
4. **Pratik Verimlilik**: Ortalama durumda O(n log n) zaman karmaşıklığı ile çoğu durumda diğer O(n log n) algoritmalardan daha hızlı çalışır.

Quick Sort, özellikle büyük veri setleri için ve hızın önemli olduğu durumlarda tercih edilen bir algoritmadır. Ancak, en kötü durumda O(n²) performans gösterebilir, bu nedenle pivot seçimi kritik öneme sahiptir.
`;

  return (
    <div className="container mx-auto py-12 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Quick Sort Algoritması
      </h1>

      <div className="grid">
        <div className="space-y-6">
          {/* Algorithm Description */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <p className="whitespace-pre-wrap">{quickSortDescription}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Code Examples Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Quick Sort algoritmasının farklı programlama dillerindeki uygulamaları
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
              title="Quick Sort - JavaScript"
            />
          </TabsContent>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Quick Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Quick Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Quick Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Interactive Demo Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kendi Verilerinizle Test Edin</h2>
        <p className="text-muted-foreground">
          Aşağıya kendi verilerinizi girerek Quick Sort algoritmasını test
          edebilirsiniz. Virgülle ayrılmış sayılar girin (örn: 5,3,8,4,2) veya
          rastgele bir dizi oluşturun.
        </p>

        <InteractiveDemo
          title="Quick Sort Demo"
          description="Verdiğiniz dizi Quick Sort algoritması ile sıralanacaktır."
          algorithmFunction={quickSort}
          inputType="array"
          inputPlaceholder="5,3,8,4,2"
          outputFormatter={(output) => (
            <div className="space-y-2">
              <div>
                <span className="font-medium">Sıralanmış Dizi: </span>
                <span>{JSON.stringify(output)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Not: Quick Sort ortalama durumda O(n log n) karmaşıklığa
                sahiptir ve çoğu pratik uygulamada oldukça hızlıdır.
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
                    - Her bölünmede pivot, diziyi iki eşit parçaya böldüğünde
                    oluşur.
                  </li>
                  <li>
                    <span className="font-medium">Ortalama Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n log n)
                    </code>{' '}
                    - Rastgele pivot seçiminde ortalama karmaşıklık.
                  </li>
                  <li>
                    <span className="font-medium">En Kötü Durum: </span>
                    <code className="text-sm bg-muted px-1 py-0.5 rounded">
                      O(n²)
                    </code>{' '}
                    - Pivot, sürekli olarak en küçük veya en büyük eleman
                    olduğunda oluşur.
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Alan Karmaşıklığı</h3>
                <p>
                  <code className="text-sm bg-muted px-1 py-0.5 rounded">
                    O(log n)
                  </code>{' '}
                  - Özyinelemeli çağrılar için yığın belleği kullanır. En kötü
                  durumda, yığın derinliği O(n) olabilir, ancak ortalamada O(log
                  n)'dir.
                </p>

                <h3 className="text-lg font-medium">Kararlılık (Stability)</h3>
                <p>
                  Quick Sort <span className="font-medium">kararsız</span> bir
                  algoritmadır. Pivot etrafında elemanların yeniden düzenlenmesi
                  sırasında, eşit değere sahip elemanların orijinal sırası
                  değişebilir.
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
                  <li>Pratik uygulamalarda genellikle çok hızlıdır.</li>
                  <li>
                    Yerinde sıralama yapar, minimum ekstra bellek kullanır.
                  </li>
                  <li>Önbellek dostu bir erişim modeline sahiptir.</li>
                  <li>
                    Farklı pivot seçim stratejileri ile optimize edilebilir.
                  </li>
                  <li>
                    Çoğu programlama dilinde dahili sıralama algoritması olarak
                    kullanılır.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">
                  Dezavantajlar
                </h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>En kötü durumda O(n²) zaman karmaşıklığına sahiptir.</li>
                  <li>
                    Kararsız bir algoritma olduğundan, eşit değerli elemanların
                    sırası değişebilir.
                  </li>
                  <li>
                    Merge Sort gibi algoritmalara göre daha karmaşık bir yapıya
                    sahiptir.
                  </li>
                  <li>
                    Kötü pivot seçimleri, özellikle zaten sıralı dizilerde,
                    performansı önemli ölçüde düşürebilir.
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Sort Visualization Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Sort Nasıl Çalışır?</h2>
        <p className="text-muted-foreground">
          Aşağıda, Quick Sort'un [7, 2, 1, 6, 8, 5, 3, 4] dizisini sıralama
          adımları gösterilmiştir:
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Adım Adım Quick Sort</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-medium mb-2">
                  Başlangıç Dizisi:
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [7, 2, 1, 6, 8, 5, 3, 4]
                </code>
                <p className="text-sm mb-2">
                  Pivot olarak son eleman seçilir: 4
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  1. Bölme (İlk Düzey):
                </h3>
                <p className="text-sm mb-2">
                  4'ten küçük elemanlar sola, büyük elemanlar sağa
                  yerleştirilir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 1, 3,{' '}
                  <span className="bg-yellow-100 dark:bg-yellow-800 px-1">
                    4
                  </span>
                  , 8, 5, 7, 6]
                </code>
                <p className="text-sm mt-2">
                  Pivot (4) artık doğru konumunda ve dizi iki alt parçaya
                  bölünür.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  2. Bölme (Sol Alt Dizi):
                </h3>
                <p className="text-sm mb-2">
                  Sol alt dizide ([2, 1, 3]) pivot olarak 3 seçilir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 1,{' '}
                  <span className="bg-yellow-100 dark:bg-yellow-800 px-1">
                    3
                  </span>
                  , 4, 8, 5, 7, 6]
                </code>
                <p className="text-sm mt-2">
                  3'ten küçük elemanlar sola yerleştirilir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [2, 1,{' '}
                  <span className="bg-yellow-100 dark:bg-yellow-800 px-1">
                    3
                  </span>
                  , 4, 8, 5, 7, 6]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  3. Bölme (Sol Alt Dizinin Sol Alt Dizisi):
                </h3>
                <p className="text-sm mb-2">
                  [2, 1] alt dizisinde pivot olarak 1 seçilir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [
                  <span className="bg-yellow-100 dark:bg-yellow-800 px-1">
                    1
                  </span>
                  , 2, 3, 4, 8, 5, 7, 6]
                </code>
                <p className="text-sm mt-2">
                  1'den küçük eleman olmadığı için, sadece sağında 2 kalır.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  4. Bölme (Sağ Alt Dizi):
                </h3>
                <p className="text-sm mb-2">
                  Sağ alt dizide ([8, 5, 7, 6]) pivot olarak 6 seçilir:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [1, 2, 3, 4, 5,{' '}
                  <span className="bg-yellow-100 dark:bg-yellow-800 px-1">
                    6
                  </span>
                  , 7, 8]
                </code>
                <p className="text-sm mt-2">
                  6'dan küçük elemanlar (5) sola, büyük elemanlar (7, 8) sağa
                  yerleştirilir.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  5. Bölme (Sağ Alt Dizinin Alt Dizileri):
                </h3>
                <p className="text-sm mb-2">
                  Kalan alt diziler [5] ve [7, 8] için aynı işlemler
                  tekrarlanır:
                </p>
                <code className="block bg-muted p-3 rounded-md">
                  [1, 2, 3, 4, 5, 6, 7, 8]
                </code>
              </div>

              <div>
                <h3 className="text-base font-medium mb-2">
                  Sonuç: Tamamen Sıralanmış Dizi
                </h3>
                <code className="block bg-muted p-3 rounded-md">
                  [1, 2, 3, 4, 5, 6, 7, 8]
                </code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pivot Selection Strategies Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Pivot Seçim Stratejileri</h2>
        <p className="text-muted-foreground">
          Quick Sort'un performansı büyük ölçüde pivot seçimine bağlıdır. İşte
          yaygın pivot seçim stratejileri:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>İlk/Son Eleman Pivot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dizinin ilk veya son elemanının pivot olarak seçilmesi en basit
                stratejilerdendir. Ancak, zaten sıralı veya ters sıralı
                dizilerde en kötü durum O(n²) performansına neden olabilir.
              </p>
              <code className="block bg-muted p-3 mt-2 rounded-md text-sm">
                pivot = arr[high]; // Son eleman
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ortanca Eleman Pivot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dizinin ortasındaki elemanı pivot olarak seçmek, sıralı
                dizilerde daha iyi performans sağlar. Ancak, her alt dizi için
                ortanca elemanı bulmak da ek işlem gerektirir.
              </p>
              <code className="block bg-muted p-3 mt-2 rounded-md text-sm">
                pivot = arr[Math.floor((low + high) / 2)];
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rastgele Pivot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Diziden rastgele bir elemanı pivot olarak seçmek, en kötü durum
                performansının olasılığını düşürür. Bu yaklaşım, çeşitli veri
                setlerinde genellikle iyi performans gösterir.
              </p>
              <code className="block bg-muted p-3 mt-2 rounded-md text-sm">
                {`const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
          pivot = arr[randomIndex];`}
              </code>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Üçlünün Ortancası (Median of Three)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Dizinin ilk, orta ve son elemanından ortanca değeri pivot olarak
                seçmek, çoğu pratik uygulamada iyi sonuçlar verir. Bu strateji,
                rastgele ve deterministik yaklaşımların avantajlarını
                birleştirir.
              </p>
              <code className="block bg-muted p-3 mt-2 rounded-md text-sm">
                {`const mid = Math.floor((low + high) / 2);
          // İlk, orta ve son elemanın ortancasını bul
          if (arr[mid] < arr[low]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
          if (arr[high] < arr[low]) [arr[low], arr[high]] = [arr[high], arr[low]];
          if (arr[mid] < arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
          pivot = arr[high];`}
              </code>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Sort vs Other Algorithms Comparison */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Quick Sort ve Diğer Algoritmalar</h2>
        <p className="text-muted-foreground">
          Quick Sort ile diğer popüler sıralama algoritmalarının
          karşılaştırması:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted">
                <th className="p-2 text-left">Özellik</th>
                <th className="p-2 text-left">Quick Sort</th>
                <th className="p-2 text-left">Merge Sort</th>
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
                <td className="p-2 font-medium">Ortalama Durum</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n²)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">En Kötü Durum</td>
                <td className="p-2">O(n²)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n log n)</td>
                <td className="p-2">O(n²)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Alan Karmaşıklığı</td>
                <td className="p-2">O(log n)</td>
                <td className="p-2">O(n)</td>
                <td className="p-2">O(1)</td>
                <td className="p-2">O(1)</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Kararlılık</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
                <td className="p-2">Kararsız</td>
                <td className="p-2">Kararlı</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Önbellek Dostu</td>
                <td className="p-2">Yüksek</td>
                <td className="p-2">Orta</td>
                <td className="p-2">Düşük</td>
                <td className="p-2">Yüksek</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Pratik Performans</td>
                <td className="p-2">Çok İyi</td>
                <td className="p-2">İyi</td>
                <td className="p-2">İyi</td>
                <td className="p-2">Küçük veri setleri için iyi</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-2 font-medium">Tercih Edilme Durumu</td>
                <td className="p-2">
                  Genel amaçlı, ortalama performansın önemli olduğu durumlar
                </td>
                <td className="p-2">
                  Kararlılık ve güvenilir performans gerektiğinde
                </td>
                <td className="p-2">Bellek sınırlı ortamlarda</td>
                <td className="p-2">Küçük veya kısmen sıralı dizilerde</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground mt-2">
          Quick Sort, pratik uygulamalarda genellikle en iyi performansı
          gösteren sıralama algoritmasıdır. Önbellek dostu yapısı ve minimal
          bellek kullanımı nedeniyle çoğu programlama dilinde dahili sıralama
          algoritması olarak tercih edilir. Ancak, kararsız oluşu ve en kötü
          durum performansı göz önüne alınmalıdır.
        </p>
      </div>

      {/* Related Algorithms Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İlgili Algoritmalar</h2>
        <p className="text-muted-foreground">
          Quick Sort ile ilişkili veya benzer algoritmalar:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Dual-Pivot Quick Sort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                İki pivot kullanan bir Quick Sort varyasyonu. Java'nın
                Arrays.sort() uygulamasında kullanılır ve genellikle standart
                Quick Sort'tan daha hızlıdır.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Introsort</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Quick Sort, Heap Sort ve Insertion Sort'u birleştiren hibrit bir
                algoritma. En kötü durumu önlemek için, özyineleme derinliği
                belirli bir eşiği aştığında Heap Sort'a geçiş yapar.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Quick Select</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground">
                Quick Sort'un bölme mekanizmasını kullanarak, sıralanmamış bir
                diziden k. en küçük (veya en büyük) elemanı bulan bir algoritma.
                Ortalama O(n) karmaşıklığa sahiptir.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Full Algorithm Explanation */}
      <AlgorithmExplanation
        title="Quick Sort"
        description="Böl ve Fethet stratejisini kullanan hızlı ve verimli bir sıralama algoritması."
        timeComplexity={{
          best: 'O(n log n)',
          average: 'O(n log n)',
          worst: 'O(n²)',
        }}
        spaceComplexity="O(log n)"
        advantages={[
          'Pratik uygulamalarda genellikle çok hızlıdır',
          'Yerinde sıralama yapar, minimum ekstra bellek kullanır',
          'Önbellek dostu bir erişim modeline sahiptir',
          'Pivot seçim stratejileri ile optimize edilebilir',
          'Rastgele erişimli veri yapıları için idealdir',
        ]}
        disadvantages={[
          'En kötü durumda O(n²) zaman karmaşıklığına sahiptir',
          'Kararsız bir sıralama algoritmasıdır',
          'Pivot seçimi, performansı önemli ölçüde etkiler',
          'Bağlı listeler gibi ardışıl erişimli veri yapıları için verimli değildir',
        ]}
        pseudocode={`QUICKSORT(A, p, r)
1  if p < r
2    q = PARTITION(A, p, r)
3    QUICKSORT(A, p, q - 1)
4    QUICKSORT(A, q + 1, r)

PARTITION(A, p, r)
1  x = A[r]               // Pivot olarak son eleman seçilir
2  i = p - 1              // Küçük elemanların indeksi
3  for j = p to r - 1
4    if A[j] <= x
5      i = i + 1
6      exchange A[i] with A[j]
7  exchange A[i + 1] with A[r]
8  return i + 1`}
        applications={[
          'Genel amaçlı sıralama işlemleri',
          'Programlama dillerinin standart kütüphaneleri',
          'Veritabanı sistemlerinde sıralama operasyonları',
          'Arama algoritmalarının ön işlemi olarak',
          'Quick Select algoritması ile k. en küçük eleman bulma',
          'Veri analizinde ve veri biliminde sıralama işlemleri',
        ]}
      />
    </div>
  );
}
