'use client';

import { AlgorithmExplanation } from '@/components/common/explanation';
import { SortingVisualizer } from '@/components/algorithms/sorting-visualizer';
import { InteractiveDemo } from '@/components/common/interactive-demo';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bubbleSort } from '@/lib/algorithms/sorting';

export default function BubbleSortPage() {
  const pseudocode = `function bubbleSort(arr):
    n = arr.length
    
    for i from 0 to n-1:
        for j from 0 to n-i-1:
            if arr[j] > arr[j+1]:
                swap arr[j] and arr[j+1]
                
    return arr`;

  const implementations = {
    javascript: `function bubbleSort(arr) {
  const result = [...arr];
  const n = result.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }
  
  return result;
}`,
    python: `def bubble_sort(arr):
    n = len(arr)
    # Dizinin bir kopyasını oluştur
    result = arr.copy()
    
    # Dış döngü
    for i in range(n - 1):
        # İç döngü
        for j in range(n - i - 1):
            # Karşılaştırma ve yer değiştirme
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                
    return result`,
    java: `public static int[] bubbleSort(int[] arr) {
    // Dizinin bir kopyasını oluştur
    int[] result = Arrays.copyOf(arr, arr.length);
    int n = result.length;
    
    // Dış döngü
    for (int i = 0; i < n - 1; i++) {
        // İç döngü
        for (int j = 0; j < n - i - 1; j++) {
            // Karşılaştırma ve yer değiştirme
            if (result[j] > result[j + 1]) {
                // Değerleri takas et
                int temp = result[j];
                result[j] = result[j + 1];
                result[j + 1] = temp;
            }
        }
    }
    
    return result;
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Bubble Sort (Kabarcık Sıralama) Algoritması"
        description="Bubble Sort, en temel sıralama algoritmalarından biridir. Adını, her geçişte dizinin en büyük elemanını 'kabarcık' gibi üste taşımasından alır. Algoritma, komşu elemanları karşılaştırarak ve gerektiğinde yer değiştirerek çalışır."
        timeComplexity={{
          best: 'O(n)',
          average: 'O(n²)',
          worst: 'O(n²)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          'Anlaşılması ve uygulanması çok kolaydır',
          'Küçük veri setleri için makul performans sunar',
          'Ekstra bellek kullanımı gerektirmez (in-place algoritma)',
          'Zaten sıralı olan verileri tespit edebilir',
        ]}
        disadvantages={[
          'Büyük veri setleri için yavaştır - O(n²) karmaşıklığı',
          'Selection Sort ve Insertion Sort gibi benzer karmaşıklığa sahip algoritmalardan genellikle daha yavaş çalışır',
          'Her eleman için potansiyel olarak çok sayıda takas işlemi yapması gerekir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Eğitim amaçlı olarak sıralama algoritma prensiplerini öğrenmek için',
          'Küçük veri setleri veya neredeyse sıralı veri setleri üzerinde',
          'Düşük bellek kullanımı gerektiren sistemlerde',
          'Paralel programlama ortamlarında (her bir geçiş bağımsız olarak yapılabilir)',
        ]}
      />

      {/* <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Görselleştirme</h2>
        <p className="text-muted-foreground">
          Bubble Sort algoritmasının çalışma prensibi adım adım
          gösterilmektedir. Yeni bir dizi oluşturabilir, adımları hesaplatabilir
          ve algoritmanın çalışmasını görsel olarak takip edebilirsiniz.
        </p>
        <SortingVisualizer algorithm="bubble" />
      </div> */}

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Bubble Sort algoritmasının farklı programlama dillerindeki
          uygulamaları aşağıda verilmiştir.
        </p>

        <Tabs defaultValue="javascript">
          <TabsList>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
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
            <div>
              <span className="font-medium">Sıralanmış Dizi: </span>
              <span>{JSON.stringify(output)}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
}
