'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { timSort } from '@/lib/algorithms/sorting';

export default function TimSortPage() {
  const pseudocode = `function timSort(arr):
    n = length(arr)
    MIN_MERGE = 32
    
    # Minimum run uzunluğunu hesapla
    minRun = getMinRunLength(n)
    
    # Küçük diziler için insertion sort
    if n < 64:
        insertionSort(arr, 0, n-1)
        return arr
    
    # Doğal run'ları bul
    runs = findNaturalRuns(arr)
    
    # Her run'ı işle
    for each run in runs:
        if run.isDescending:
            reverse(run)
        
        # Run'ı minimum uzunluğa genişlet
        if run.length < minRun:
            extendRun(run, minRun)
            insertionSort(run)
    
    # Run'ları birleştir
    while more than one run exists:
        mergeRuns()
    
    return arr`;

  const implementations = {
    typescript: `class TimSort {
  private static MIN_MERGE = 32;
  
  public static sort(arr: number[]): number[] {
    const result = [...arr];
    const n = result.length;
    
    if (n < 2) return result;
    
    // Küçük diziler için insertion sort
    if (n < 64) {
      this.insertionSort(result, 0, n - 1);
      return result;
    }
    
    const minRun = this.getMinRunLength(n);
    
    // Run'ları bul ve işle
    const runs = this.findRuns(result);
    
    for (const run of runs) {
      if (run.descending) {
        this.reverse(result, run.start, run.end);
      }
      
      if (run.end - run.start + 1 < minRun) {
        const newEnd = Math.min(run.start + minRun - 1, n - 1);
        this.insertionSort(result, run.start, newEnd);
        run.end = newEnd;
      }
    }
    
    // Run'ları birleştir
    this.mergeRuns(result, runs);
    
    return result;
  }
  
  private static getMinRunLength(n: number): number {
    let r = 0;
    while (n >= this.MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }
  
  private static insertionSort(arr: number[], left: number, right: number): void {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;
      
      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }
  
  private static findRuns(arr: number[]): Array<{start: number, end: number, descending: boolean}> {
    const runs = [];
    let i = 0;
    const n = arr.length;
    
    while (i < n - 1) {
      let start = i;
      let descending = false;
      
      if (arr[i] > arr[i + 1]) {
        descending = true;
        while (i < n - 1 && arr[i] > arr[i + 1]) {
          i++;
        }
      } else {
        while (i < n - 1 && arr[i] <= arr[i + 1]) {
          i++;
        }
      }
      
      runs.push({ start, end: i, descending });
      i++;
    }
    
    if (i === n - 1) {
      runs.push({ start: i, end: i, descending: false });
    }
    
    return runs;
  }
  
  private static reverse(arr: number[], start: number, end: number): void {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }
  
  private static merge(arr: number[], left: number, mid: number, right: number): void {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k++] = leftArr[i++];
      } else {
        arr[k++] = rightArr[j++];
      }
    }
    
    while (i < leftArr.length) arr[k++] = leftArr[i++];
    while (j < rightArr.length) arr[k++] = rightArr[j++];
  }
  
  private static mergeRuns(arr: number[], runs: Array<{start: number, end: number}>): void {
    let currentSize = this.MIN_MERGE;
    const n = arr.length;
    
    while (currentSize < n) {
      for (let start = 0; start < n; start += 2 * currentSize) {
        const mid = Math.min(start + currentSize - 1, n - 1);
        const end = Math.min(start + 2 * currentSize - 1, n - 1);
        
        if (mid < end) {
          this.merge(arr, start, mid, end);
        }
      }
      currentSize *= 2;
    }
  }
}

// Kullanım örneği
const array = [64, 34, 25, 12, 22, 11, 90];
console.log(TimSort.sort(array)); // [11, 12, 22, 25, 34, 64, 90]`,
    python: `def tim_sort(arr):
    """
    Tim Sort algoritması implementasyonu
    Python'un yerleşik sort() fonksiyonunda kullanılan algoritma
    """
    MIN_MERGE = 32
    
    def get_min_run_length(n):
        """Minimum run uzunluğunu hesaplar"""
        r = 0
        while n >= MIN_MERGE:
            r |= n & 1
            n >>= 1
        return n + r
    
    def insertion_sort(arr, left, right):
        """Küçük diziler için insertion sort"""
        for i in range(left + 1, right + 1):
            key_item = arr[i]
            j = i - 1
            while j >= left and arr[j] > key_item:
                arr[j + 1] = arr[j]
                j -= 1
            arr[j + 1] = key_item
    
    def merge(arr, left, mid, right):
        """İki sıralı parçayı birleştirir"""
        left_arr = arr[left:mid + 1]
        right_arr = arr[mid + 1:right + 1]
        
        i = j = 0
        k = left
        
        while i < len(left_arr) and j < len(right_arr):
            if left_arr[i] <= right_arr[j]:
                arr[k] = left_arr[i]
                i += 1
            else:
                arr[k] = right_arr[j]
                j += 1
            k += 1
        
        while i < len(left_arr):
            arr[k] = left_arr[i]
            i += 1
            k += 1
        
        while j < len(right_arr):
            arr[k] = right_arr[j]
            j += 1
            k += 1
    
    def find_runs(arr):
        """Doğal run'ları bulur"""
        runs = []
        i = 0
        n = len(arr)
        
        while i < n - 1:
            run_start = i
            descending = False
            
            # Artan mı azalan mı kontrol et
            if arr[i] > arr[i + 1]:
                descending = True
                while i < n - 1 and arr[i] > arr[i + 1]:
                    i += 1
            else:
                while i < n - 1 and arr[i] <= arr[i + 1]:
                    i += 1
            
            runs.append({
                'start': run_start,
                'end': i,
                'descending': descending
            })
            i += 1
        
        # Son eleman
        if i == n - 1:
            runs.append({
                'start': i,
                'end': i,
                'descending': False
            })
        
        return runs
    
    n = len(arr)
    if n < 2:
        return arr
    
    result = arr.copy()
    
    # Küçük diziler için insertion sort
    if n < 64:
        insertion_sort(result, 0, n - 1)
        return result
    
    min_run = get_min_run_length(n)
    runs = find_runs(result)
    
    # Run'ları işle
    for run in runs:
        # Azalan run'ı ters çevir
        if run['descending']:
            start, end = run['start'], run['end']
            while start < end:
                result[start], result[end] = result[end], result[start]
                start += 1
                end -= 1
        
        # Run'ı minimum uzunluğa genişlet
        run_length = run['end'] - run['start'] + 1
        if run_length < min_run:
            new_end = min(run['start'] + min_run - 1, n - 1)
            insertion_sort(result, run['start'], new_end)
            run['end'] = new_end
    
    # Run'ları birleştir
    current_size = min_run
    while current_size < n:
        start = 0
        while start < n:
            mid = min(start + current_size - 1, n - 1)
            end = min(start + 2 * current_size - 1, n - 1)
            
            if mid < end:
                merge(result, start, mid, end)
            
            start += 2 * current_size
        
        current_size *= 2
    
    return result

# Kullanım örneği
array = [64, 34, 25, 12, 22, 11, 90]
print(tim_sort(array))  # [11, 12, 22, 25, 34, 64, 90]`,
    java: `import java.util.*;

public class TimSort {
    private static final int MIN_MERGE = 32;
    
    public static int[] timSort(int[] arr) {
        int n = arr.length;
        int[] result = arr.clone();
        
        if (n < 2) return result;
        
        // Küçük diziler için insertion sort
        if (n < 64) {
            insertionSort(result, 0, n - 1);
            return result;
        }
        
        int minRun = getMinRunLength(n);
        
        // Run'ları bul ve işle
        List<Run> runs = findRuns(result);
        
        for (Run run : runs) {
            if (run.descending) {
                reverse(result, run.start, run.end);
            }
            
            if (run.end - run.start + 1 < minRun) {
                int newEnd = Math.min(run.start + minRun - 1, n - 1);
                insertionSort(result, run.start, newEnd);
                run.end = newEnd;
            }
        }
        
        // Run'ları birleştir
        mergeRuns(result, n);
        
        return result;
    }
    
    private static int getMinRunLength(int n) {
        int r = 0;
        while (n >= MIN_MERGE) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    }
    
    private static void insertionSort(int[] arr, int left, int right) {
        for (int i = left + 1; i <= right; i++) {
            int key = arr[i];
            int j = i - 1;
            
            while (j >= left && arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = key;
        }
    }
    
    private static List<Run> findRuns(int[] arr) {
        List<Run> runs = new ArrayList<>();
        int i = 0;
        int n = arr.length;
        
        while (i < n - 1) {
            int start = i;
            boolean descending = false;
            
            if (arr[i] > arr[i + 1]) {
                descending = true;
                while (i < n - 1 && arr[i] > arr[i + 1]) {
                    i++;
                }
            } else {
                while (i < n - 1 && arr[i] <= arr[i + 1]) {
                    i++;
                }
            }
            
            runs.add(new Run(start, i, descending));
            i++;
        }
        
        if (i == n - 1) {
            runs.add(new Run(i, i, false));
        }
        
        return runs;
    }
    
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    private static void merge(int[] arr, int left, int mid, int right) {
        int[] leftArr = Arrays.copyOfRange(arr, left, mid + 1);
        int[] rightArr = Arrays.copyOfRange(arr, mid + 1, right + 1);
        
        int i = 0, j = 0, k = left;
        
        while (i < leftArr.length && j < rightArr.length) {
            if (leftArr[i] <= rightArr[j]) {
                arr[k++] = leftArr[i++];
            } else {
                arr[k++] = rightArr[j++];
            }
        }
        
        while (i < leftArr.length) arr[k++] = leftArr[i++];
        while (j < rightArr.length) arr[k++] = rightArr[j++];
    }
    
    private static void mergeRuns(int[] arr, int n) {
        int currentSize = MIN_MERGE;
        
        while (currentSize < n) {
            for (int start = 0; start < n; start += 2 * currentSize) {
                int mid = Math.min(start + currentSize - 1, n - 1);
                int end = Math.min(start + 2 * currentSize - 1, n - 1);
                
                if (mid < end) {
                    merge(arr, start, mid, end);
                }
            }
            currentSize *= 2;
        }
    }
    
    private static class Run {
        int start, end;
        boolean descending;
        
        Run(int start, int end, boolean descending) {
            this.start = start;
            this.end = end;
            this.descending = descending;
        }
    }
    
    public static void main(String[] args) {
        int[] array = {64, 34, 25, 12, 22, 11, 90};
        int[] sorted = timSort(array);
        System.out.println(Arrays.toString(sorted));
    }
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Tim Sort Algoritması"
        description="Tim Sort, Python programlama dilinin yerleşik sort() fonksiyonunda kullanılan hibrit bir sıralama algoritmasıdır. Tim Peters tarafından 2002'de geliştirilmiş olup, merge sort ve insertion sort algoritmalarının avantajlarını birleştirir. Gerçek dünyadaki verilerde sıkça bulunan kısmen sıralı dizilerde mükemmel performans gösterir."
        timeComplexity={{
          best: 'O(n)',
          average: 'O(n log n)',
          worst: 'O(n log n)',
        }}
        spaceComplexity="O(n)"
        advantages={[
          'Adaptive algoritma - kısmen sıralı dizilerde O(n) performans',
          'Kararlı sıralama algoritmasıdır (stable)',
          'Gerçek dünyadaki veriler için optimize edilmiştir',
          "Doğal run'ları tespit ederek performansı artırır",
          'Küçük diziler için insertion sort kullanarak optimize eder',
          "En kötü durum garantisi O(n log n)'dir",
        ]}
        disadvantages={[
          'Karmaşık implementasyon gerektirir',
          'Ek O(n) bellek alanı gerektirir',
          'Küçük diziler için basit algoritmalardan yavaş olabilir',
          'Cache locality açısından optimal olmayabilir',
          'Anlaşılması ve debug edilmesi zordur',
        ]}
        pseudocode={pseudocode}
        applications={[
          "Python'un yerleşik sort() fonksiyonu",
          "Java'nın Arrays.sort() metodu (object dizileri için)",
          'Büyük ölçekli veri işleme uygulamaları',
          'Kısmen sıralı verilerin bulunduğu sistemler',
          'Production seviyesi yazılım geliştirme',
          'Veri analizi ve bilimsel hesaplama kütüphaneleri',
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Demo</h2>
        <InteractiveDemo
          title="Tim Sort Algoritması"
          description="Dizinizdeki sayıları Tim Sort algoritması ile sıralayın ve hibrit algoritmanın performansını gözlemleyin."
          algorithmFunction={timSort}
          inputPlaceholder="Örnek: 64,34,25,12,22,11,90"
          inputType="array"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <Tabs defaultValue="typescript">
          <TabsList>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Tim Sort - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Tim Sort - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Tim Sort - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Tim Sort algoritması, gerçek dünyadaki verilerin özelliklerini
            dikkate alarak tasarlanmış hibrit bir sıralama algoritmasıdır.
            Algoritmanın temel çalışma prensibi şu adımları içermektedir:
          </p>

          <h3>1. Run Tespiti</h3>
          <p>
            Algoritma öncelikle dizide doğal olarak sıralı olan parçaları (run)
            tespit eder. Bu parçalar artan veya azalan sırada olabilir. Azalan
            sıradaki run'lar tersine çevrilerek artan sıraya dönüştürülür.
          </p>

          <h3>2. Minimum Run Uzunluğu</h3>
          <p>
            Tim Sort, verimli merge işlemleri için minimum run uzunluğunu
            hesaplar. Bu değer genellikle 32 ile 64 arasında olur ve dizinin
            toplam boyutuna bağlı olarak belirlenir.
          </p>

          <h3>3. Run Genişletme</h3>
          <p>
            Minimum uzunluktan kısa olan run'lar, insertion sort kullanılarak
            genişletilir. Insertion sort küçük diziler için çok verimli
            olduğundan bu optimizasyon önemli performans kazanımları sağlar.
          </p>

          <h3>4. Akıllı Merge Stratejisi</h3>
          <p>
            Tim Sort, run'ları birleştirirken akıllı bir strateji kullanır.
            Galloping mode adı verilen bu teknik, bir run'dan art arda çok
            sayıda eleman alındığında performansı artırmak için kullanılır.
          </p>

          <h3>5. Adaptif Davranış</h3>
          <p>
            Algoritmanın en önemli özelliği adaptif olmasıdır. Verinin mevcut
            sıralama durumuna göre davranışını değiştirir. Tamamen sıralı
            dizilerde O(n) performans gösterirken, en kötü durumda O(n log n)
            garantisi sunar.
          </p>
        </div>
      </div>
    </div>
  );
}
