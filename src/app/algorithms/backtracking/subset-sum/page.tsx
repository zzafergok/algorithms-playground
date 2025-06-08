'use client';

import React, { useState, useEffect } from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/common/code-block';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function findSubsetSum(
  arr: number[],
  targetSum: number
): { subsets: number[][]; steps: any[] } {
  const result: number[][] = [];
  const steps: any[] = [];
  const currentSubset: number[] = [];

  const sortedArr = [...arr].sort((a, b) => a - b);

  function backtrack(start: number, currentSum: number) {
    steps.push({
      subset: [...currentSubset],
      index: start,
      currentSum: currentSum,
      remaining: targetSum - currentSum,
    });

    if (currentSum === targetSum) {
      result.push([...currentSubset]);
      return;
    }

    if (currentSum > targetSum) {
      return;
    }

    for (let i = start; i < sortedArr.length; i++) {
      if (i > start && sortedArr[i] === sortedArr[i - 1]) {
        continue;
      }

      currentSubset.push(sortedArr[i]);

      backtrack(i + 1, currentSum + sortedArr[i]);

      currentSubset.pop();
    }
  }

  backtrack(0, 0);

  return { subsets: result, steps };
}

function dpSubsetSumAll(arr: number[], target: number): number[][] {
  const dp: number[][][] = Array(target + 1)
    .fill(null)
    .map(() => []);
  dp[0] = [[]]; // 0 toplamını oluşturan boş alt küme

  for (const num of arr) {
    for (let j = target; j >= num; j--) {
      if (dp[j - num].length > 0) {
        for (const subset of dp[j - num]) {
          dp[j].push([...subset, num]);
        }
      }
    }
  }

  return dp[target];
}

const SubsetVisualizer: React.FC<{
  originalArray: number[];
  subset: number[];
  targetSum: number;
}> = ({ originalArray, subset, targetSum }) => {
  const sum = subset.reduce((acc, val) => acc + val, 0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {originalArray.map((num, index) => {
          const isInSubset = subset.includes(num);

          return (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-lg font-mono text-lg
                ${
                  isInSubset
                    ? 'bg-green-500 dark:bg-green-700 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
            >
              {num}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Toplam:</span>
        <Badge variant={sum === targetSum ? 'default' : 'outline'}>
          {sum} / {targetSum}
        </Badge>
      </div>
    </div>
  );
};

const SubsetSumViewer: React.FC<{
  array: number[];
  targetSum: number;
  solutions: number[][];
  currentSolutionIndex: number;
  onChangeSolution: (index: number) => void;
}> = ({
  array,
  targetSum,
  solutions,
  currentSolutionIndex,
  onChangeSolution,
}) => {
  const handlePrevious = () => {
    onChangeSolution(
      (currentSolutionIndex - 1 + solutions.length) % solutions.length
    );
  };

  const handleNext = () => {
    onChangeSolution((currentSolutionIndex + 1) % solutions.length);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={solutions.length <= 1}
        >
          Önceki Çözüm
        </Button>
        <span className="text-sm font-medium">
          {solutions.length > 0
            ? `Çözüm ${currentSolutionIndex + 1} / ${solutions.length}`
            : 'Çözüm bulunamadı'}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={solutions.length <= 1}
        >
          Sonraki Çözüm
        </Button>
      </div>

      {solutions.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Bulunan Alt Küme</CardTitle>
          </CardHeader>
          <CardContent>
            <SubsetVisualizer
              originalArray={array}
              subset={solutions[currentSolutionIndex]}
              targetSum={targetSum}
            />
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900">
          <CardContent className="pt-6">
            <p className="text-red-600 dark:text-red-400 font-medium">
              Bu dizi ve hedef toplam için çözüm bulunamadı.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default function SubsetSumPage() {
  const [targetSum, setTargetSum] = useState<number>(9);
  const [solutions, setSolutions] = useState<number[][]>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [algorithmSteps, setAlgorithmSteps] = useState<any[]>([]);
  const [targetSumInput, setTargetSumInput] = useState<string>('9');
  const [arrayInput, setArrayInput] = useState<string>('3, 34, 4, 12, 5, 2');
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0);
  const [algorithm, setAlgorithm] = useState<'backtracking' | 'dp'>(
    'backtracking'
  );
  const [originalArray, setOriginalArray] = useState<number[]>([
    3, 34, 4, 12, 5, 2,
  ]);

  const pseudocode = `function findSubsetSum(arr, targetSum):
    result = []  // Bulunan alt kümeleri saklar
    currentSubset = []  // Mevcut alt küme
    
    // Elemanları sırala (opsiyonel, ama budama için faydalı olabilir)
    sortedArr = sort(arr)
    
    function backtrack(start, currentSum):
        // Hedef toplam bulundu
        if currentSum == targetSum:
            result.add(copy of currentSubset)
            return
        
        // Toplam hedefi aştı, bu dalı buda
        if currentSum > targetSum:
            return
        
        // Olası tüm elemanları dene
        for i from start to length(sortedArr)-1:
            // Tekrar eden elemanları atla (opsiyonel)
            if i > start AND sortedArr[i] == sortedArr[i-1]:
                continue
            
            // Elemanı alt kümeye ekle
            currentSubset.add(sortedArr[i])
            
            // Rekürsif olarak bir sonraki elemandan devam et
            backtrack(i + 1, currentSum + sortedArr[i])
            
            // Geri izleme (backtrack)
            currentSubset.remove(sortedArr[i])
    
    // 0. indeksten başla, toplam 0
    backtrack(0, 0)
    
    return result`;

  const implementations = {
    typescript: `function findSubsetSum(arr: number[], targetSum: number): number[][] {
  // Bulunan alt kümeleri saklayacak dizi
  const result: number[][] = [];
  // Mevcut alt kümeyi oluşturmak için kullanılan dizi
  const currentSubset: number[] = [];
  
  // Diziyi sırala (opsiyonel, ama budama için yardımcı olabilir)
  const sortedArr = [...arr].sort((a, b) => a - b);
  
  // Geri izleme fonksiyonu
  function backtrack(start: number, currentSum: number) {
    // Hedef toplam bulundu, çözümü kaydet
    if (currentSum === targetSum) {
      result.push([...currentSubset]);
      return;
    }
    
    // Toplam hedefi aştı, bu dalı buda
    if (currentSum > targetSum) {
      return;
    }
    
    // Tüm olası elemanları dene
    for (let i = start; i < sortedArr.length; i++) {
      // Aynı değere sahip ardışık elemanları atla (tekrarları önle)
      if (i > start && sortedArr[i] === sortedArr[i - 1]) {
        continue;
      }
      
      // Elemanı alt kümeye ekle
      currentSubset.push(sortedArr[i]);
      
      // Sonraki eleman için rekürsif çağrı
      backtrack(i + 1, currentSum + sortedArr[i]);
      
      // Geri al (backtrack)
      currentSubset.pop();
    }
  }
  
  // 0. indeksten ve 0 toplamdan başlayarak geri izleme algortimasını başlat
  backtrack(0, 0);
  
  return result;
}`,
    python: `def find_subset_sum(arr, target_sum):
    """
    Subset Sum problemini çözen geri izleme (backtracking) algoritması
    
    Args:
        arr: Sayı dizisi
        target_sum: Hedef toplam
        
    Returns:
        Hedef toplamı oluşturan tüm alt kümelerin listesi
    """
    result = []  # Bulunan alt kümeler
    current_subset = []  # Mevcut alt küme
    
    # Diziyi sırala (opsiyonel, budama için yardımcı olabilir)
    sorted_arr = sorted(arr)
    
    def backtrack(start, current_sum):
        # Hedef toplama ulaşıldı
        if current_sum == target_sum:
            result.append(current_subset[:])
            return
        
        # Toplam hedefi aştı
        if current_sum > target_sum:
            return
        
        # Olası tüm elemanları dene
        for i in range(start, len(sorted_arr)):
            # Tekrar eden elemanları atla
            if i > start and sorted_arr[i] == sorted_arr[i-1]:
                continue
            
            # Elemanı alt kümeye ekle
            current_subset.append(sorted_arr[i])
            
            # Sonraki eleman için rekürsif çağrı
            backtrack(i + 1, current_sum + sorted_arr[i])
            
            # Geri izleme (backtrack)
            current_subset.pop()
    
    # Başlangıç çağrısı
    backtrack(0, 0)
    
    return result`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SubsetSum {
    
    /**
     * Subset Sum problemini çözen metot
     * 
     * @param arr Sayı dizisi
     * @param targetSum Hedef toplam
     * @return Hedef toplamı oluşturan tüm alt kümeler
     */
    public static List<List<Integer>> findSubsetSum(int[] arr, int targetSum) {
        List<List<Integer>> result = new ArrayList<>();
        List<Integer> currentSubset = new ArrayList<>();
        
        // Diziyi sırala
        Arrays.sort(arr);
        
        backtrack(arr, targetSum, 0, 0, currentSubset, result);
        
        return result;
    }
    
    /**
     * Geri izleme algoritması
     * 
     * @param arr Sıralanmış dizi
     * @param targetSum Hedef toplam
     * @param start Başlangıç indeksi
     * @param currentSum Mevcut toplam
     * @param currentSubset Mevcut alt küme
     * @param result Sonuç listesi
     */
    private static void backtrack(int[] arr, int targetSum, int start, int currentSum, 
                                  List<Integer> currentSubset, List<List<Integer>> result) {
        // Hedef toplama ulaşıldı
        if (currentSum == targetSum) {
            result.add(new ArrayList<>(currentSubset));
            return;
        }
        
        // Toplam hedefi aştı
        if (currentSum > targetSum) {
            return;
        }
        
        // Olası tüm elemanları dene
        for (int i = start; i < arr.length; i++) {
            // Tekrar eden elemanları atla
            if (i > start && arr[i] == arr[i-1]) {
                continue;
            }
            
            // Elemanı alt kümeye ekle
            currentSubset.add(arr[i]);
            
            // Rekürsif çağrı
            backtrack(arr, targetSum, i + 1, currentSum + arr[i], currentSubset, result);
            
            // Geri izleme
            currentSubset.remove(currentSubset.size() - 1);
        }
    }
    
    /**
     * Dinamik programlama ile Subset Sum problemi çözümü 
     * (Sadece var/yok kontrolü yapar, tüm alt kümeleri bulmaz)
     * 
     * @param arr Sayı dizisi
     * @param targetSum Hedef toplam
     * @return Hedef toplamı oluşturan alt küme var mı?
     */
    public static boolean dpSubsetSum(int[] arr, int targetSum) {
        boolean[] dp = new boolean[targetSum + 1];
        dp[0] = true;  // 0 toplamını oluşturmak her zaman mümkün
        
        for (int num : arr) {
            for (int j = targetSum; j >= num; j--) {
                dp[j] = dp[j] || dp[j - num];
            }
        }
        
        return dp[targetSum];
    }
}`,
  };

  useEffect(() => {
    handleRunAlgorithm();
  }, []);

  const handleArrayInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setArrayInput(e.target.value);
  };

  const handleTargetSumInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetSumInput(e.target.value);
  };

  const handleRunAlgorithm = () => {
    try {
      setIsRunning(true);

      const parsedArray = arrayInput
        .split(',')
        .map((item) => parseInt(item.trim(), 10))
        .filter((num) => !isNaN(num));

      if (parsedArray.length === 0) {
        throw new Error('Lütfen geçerli bir sayı dizisi girin.');
      }

      const parsedTargetSum = parseInt(targetSumInput.trim(), 10);
      if (isNaN(parsedTargetSum)) {
        throw new Error('Lütfen geçerli bir hedef toplam girin.');
      }

      setOriginalArray(parsedArray);
      setTargetSum(parsedTargetSum);

      setTimeout(() => {
        try {
          if (algorithm === 'backtracking') {
            const { subsets, steps } = findSubsetSum(
              parsedArray,
              parsedTargetSum
            );
            setSolutions(subsets);
            setAlgorithmSteps(steps);
          } else {
            const dpSolutions = dpSubsetSumAll(parsedArray, parsedTargetSum);
            setSolutions(dpSolutions);
            setAlgorithmSteps([]);
          }

          setCurrentSolutionIndex(0);
        } catch (error) {
          console.error('Algoritma çalışma hatası:', error);
          alert('Algoritma çalıştırma hatası!');
        } finally {
          setIsRunning(false);
        }
      }, 0);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Bir hata oluştu!');
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Subset Sum Problemi (Alt Küme Toplamı)"
        description="Subset Sum (Alt Küme Toplamı) problemi, bir sayı dizisinden, toplamı belirli bir hedef değere eşit olan bir alt küme bulunup bulunamayacağını belirleyen bir problemdir. Bu, NP-Complete bir problemdir ve geri izleme (backtracking) algoritması, dinamik programlama (dynamic programming) veya brute force yaklaşımları ile çözülebilir."
        timeComplexity={{
          best: 'O(2^n)',
          average: 'O(2^n)',
          worst: 'O(2^n)',
        }}
        spaceComplexity="O(n)"
        advantages={[
          'Geri izleme (backtracking) yaklaşımı tüm olası çözümleri bulabilir',
          'Erken budama (pruning) teknikleri ile verimlilik arttırılabilir',
          'Basit ve anlaşılması kolay bir algoritma',
          'Optimal alt kümeyi garanti eder',
        ]}
        disadvantages={[
          'Üstel zaman karmaşıklığı (O(2^n)) nedeniyle büyük veri setleri için verimsiz',
          'Küçük ve orta ölçekli veri setleri için pratik olsa da, büyük ölçekli problemlerde zaman sınırlamaları olabilir',
          'Dinamik programlama yaklaşımı daha verimli olabilir ancak sadece çözümün var/yok bilgisini verir (tüm olası çözümleri göstermez)',
          'Optimal çözümü bulmak için tüm kombinasyonları kontrol etmek gerekebilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Bütçe tahsisi ve kaynak dağıtımı problemleri',
          'Sırt çantası (knapsack) problemi türevleri',
          'Finansal portföy optimizasyonu',
          'Veri kümesi bölümleme (partition) işlemleri',
          'İş zamanlama ve kaynak atama problemleri',
          'Algoritma tasarımı ve analiz için eğitim amaçlı örnek problem',
        ]}
      />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">İnteraktif Demo</h2>
        <p className="text-muted-foreground">
          Subset Sum problemini test etmek için bir sayı dizisi ve hedef toplamı
          girin. Algoritma, dizideki sayılardan oluşan ve toplamı hedef değere
          eşit olan tüm olası alt kümeleri bulacaktır.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="array-input">
                Sayı Dizisi (virgülle ayrılmış)
              </Label>
              <Input
                id="array-input"
                value={arrayInput}
                onChange={handleArrayInputChange}
                placeholder="Örn: 3, 34, 4, 12, 5, 2"
                disabled={isRunning}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-sum-input">Hedef Toplam</Label>
              <Input
                id="target-sum-input"
                value={targetSumInput}
                onChange={handleTargetSumInputChange}
                placeholder="Örn: 9"
                type="number"
                disabled={isRunning}
              />
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Algoritma:</span>
              <div className="flex space-x-2">
                <Button
                  variant={algorithm === 'backtracking' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAlgorithm('backtracking')}
                  disabled={isRunning}
                >
                  Geri İzleme
                </Button>
                <Button
                  variant={algorithm === 'dp' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setAlgorithm('dp')}
                  disabled={isRunning}
                >
                  Dinamik Programlama
                </Button>
              </div>
            </div>

            <Button
              onClick={handleRunAlgorithm}
              disabled={isRunning}
              className="w-full"
            >
              {isRunning ? 'Çalışıyor...' : 'Algoritmayı Çalıştır'}
            </Button>

            <div className="text-sm text-muted-foreground mt-2">
              <p>Algoritma Bilgileri:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>
                  <span className="font-medium">Geri İzleme:</span> Tüm olası
                  alt kümeleri bulur, üstel karmaşıklık.
                </li>
                <li>
                  <span className="font-medium">Dinamik Programlama:</span> Daha
                  verimli, ancak benzer alt kümeler oluşturabilir.
                </li>
                <li>Büyük diziler için hesaplama zaman alabilir.</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sonuçlar</h3>
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex justify-between mb-4">
                  <span className="text-sm font-medium">
                    Bulunan Alt Küme Sayısı:
                  </span>
                  <Badge variant="outline">{solutions.length}</Badge>
                </div>

                <SubsetSumViewer
                  array={originalArray}
                  targetSum={targetSum}
                  solutions={solutions}
                  currentSolutionIndex={currentSolutionIndex}
                  onChangeSolution={setCurrentSolutionIndex}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Subset Sum problemi için geri izleme algoritmasının farklı programlama
          dillerindeki implementasyonları.
        </p>

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
              title="Subset Sum Problemi - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Subset Sum Problemi - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Subset Sum Problemi - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Subset Sum problemi, bir sayı dizisinden, toplamı belirli bir hedef
            değere eşit olan bir alt küme bulunup bulunamayacağını belirleyen
            bir problemdir. Bu problem için iki temel yaklaşım vardır: geri
            izleme (backtracking) ve dinamik programlama (dynamic programming).
          </p>

          <h3>Geri İzleme (Backtracking) Yaklaşımı</h3>
          <p>
            Geri izleme yaklaşımı, her sayı için iki seçenek olduğunu varsayar:
            sayı ya alt kümeye dahil edilir ya da edilmez. Bu, tüm olası alt
            kümeleri araştırmak için sistematik bir yol sağlar.
          </p>

          <ol>
            <li>
              <strong>Deneme:</strong> Bir sayıyı alt kümeye ekle ve alt toplamı
              güncelle.
            </li>
            <li>
              <strong>Kontrol:</strong> Eğer mevcut toplam hedef değere eşitse,
              çözümü kaydet.
            </li>
            <li>
              <strong>Budama (Pruning):</strong> Eğer mevcut toplam hedef değeri
              aşıyorsa, bu dal daha fazla araştırılmaz.
            </li>
            <li>
              <strong>Rekürsif Arama:</strong> Kalan sayılarla alt problemleri
              çöz.
            </li>
            <li>
              <strong>Geri İzleme:</strong> Mevcut sayıyı alt kümeden çıkar ve
              başka bir dalı dene.
            </li>
          </ol>

          <h3>Dinamik Programlama (Dynamic Programming) Yaklaşımı</h3>
          <p>
            Dinamik programlama yaklaşımı, alt problemlerin sonuçlarını
            saklayarak ve tekrar kullanarak verimliliği artırır. Bu yöntemde,
            bir boolean tablosu kullanılır:
          </p>

          <ul>
            <li>
              <code>dp[i][j] = true</code> anlamı: i. indekse kadar olan
              sayıları kullanarak j toplamını oluşturmak mümkün.
            </li>
            <li>
              <code>dp[i][j] = false</code> anlamı: i. indekse kadar olan
              sayıları kullanarak j toplamını oluşturmak imkansız.
            </li>
          </ul>

          <p>1D versiyonu için (uzay optimizasyonu ile):</p>

          <ul>
            <li>
              <code>dp[j] = true</code> anlamı: j toplamını oluşturmak mümkün.
            </li>
            <li>
              <code>dp[j] = false</code> anlamı: j toplamını oluşturmak
              imkansız.
            </li>
          </ul>

          <h3>İki Yaklaşımın Karşılaştırması</h3>

          <h4>Geri İzleme:</h4>
          <ul>
            <li>
              <strong>Avantajları:</strong> Tüm olası çözümleri bulabilir, uzay
              verimliliği daha yüksek.
            </li>
            <li>
              <strong>Dezavantajları:</strong> Üstel zaman karmaşıklığı, büyük
              diziler için çok yavaş olabilir.
            </li>
          </ul>

          <h4>Dinamik Programlama:</h4>
          <ul>
            <li>
              <strong>Avantajları:</strong> Daha iyi zaman verimliliği, büyük
              diziler için daha pratik.
            </li>
            <li>
              <strong>Dezavantajları:</strong> Daha fazla bellek kullanımı,
              genellikle sadece çözümün var/yok bilgisini verir (tüm alt
              kümeleri vermez).
            </li>
          </ul>

          <h3>Optimizasyon Teknikleri</h3>

          <p>
            Subset Sum probleminin çözümünü hızlandırmak için kullanılabilecek
            bazı teknikler:
          </p>

          <ul>
            <li>
              <strong>Sıralama:</strong> Diziyi sıralamak, erken budama
              fırsatları yaratabilir, özellikle büyük elemanlar daha erken
              reddedilebilir.
            </li>
            <li>
              <strong>Tekrarları Eleme:</strong> Tekrar eden elemanları tek
              seferde işlemek (tekrar eden sayılar için aynı alt problemleri
              çözmemek).
            </li>
            <li>
              <strong>Meet in the Middle:</strong> Diziyi iki parçaya bölerek,
              her biri için olası tüm toplamları hesaplamak ve ardından
              birleştirmek. Bu, 2^(n/2) karmaşıklığına düşürebilir.
            </li>
            <li>
              <strong>Kesme İpuçları:</strong> Eğer toplam hedefi aşarsa hemen
              buda, eğer kalan elemanların toplamı hedef değeri tamamlamaya
              yetmiyorsa buda.
            </li>
          </ul>

          <h3>Algoritmik Varyasyonlar</h3>

          <p>Subset Sum probleminin birkaç varyasyonu vardır:</p>

          <ul>
            <li>
              <strong>Karar Versiyonu:</strong> Sadece böyle bir alt kümenin var
              olup olmadığını belirler (evet/hayır).
            </li>
            <li>
              <strong>Optimizasyon Versiyonu:</strong> Hedef değeri aşmadan ona
              en yakın toplamı bulan alt kümeyi belirler.
            </li>
            <li>
              <strong>Sayma Versiyonu:</strong> Hedef toplamı oluşturan alt
              kümelerin sayısını belirler.
            </li>
            <li>
              <strong>Tüm Çözümler Versiyonu:</strong> Hedef toplamı oluşturan
              tüm alt kümeleri bulur (bizim uyguladığımız).
            </li>
          </ul>

          <h3>Karmaşıklık Özeti</h3>

          <ul>
            <li>
              <strong>Geri İzleme Yaklaşımı:</strong>
              <ul>
                <li>Zaman Karmaşıklığı: O(2^n)</li>
                <li>Uzay Karmaşıklığı: O(n) - rekürsif çağrı yığını için</li>
              </ul>
            </li>
            <li>
              <strong>Dinamik Programlama Yaklaşımı:</strong>
              <ul>
                <li>Zaman Karmaşıklığı: O(n * targetSum)</li>
                <li>Uzay Karmaşıklığı: O(targetSum) - 1D DP tablosu için</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
