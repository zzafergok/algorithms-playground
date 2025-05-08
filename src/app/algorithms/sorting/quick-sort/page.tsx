'use client';

import React, { useState } from 'react';
import { AlgorithmVisualizer } from '@/visualization/components/AlgorithmVisualizer';
import { quickSort } from '@/lib/algorithms/sorting';
import { generateRandomArray } from '@/lib/utils';
import { performanceTracker } from '@/lib/performance-tracker';
import {
  TimeComplexityFunctions,
  generateComplexityData,
} from '@/lib/complexity-analysis';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { PerformanceMetrics } from '@/components/ui/performance-metrics';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';

export default function QuickSortPage() {
  const [initialArray, setInitialArray] = useState(
    generateRandomArray(10, 10, 100)
  );
  const [performanceMetrics, setPerformanceMetrics] = useState<any | null>(
    null
  );

  const handleAlgorithmRun = (array: number[]) => {
    const metrics = performanceTracker.measure(quickSort, array);
    setPerformanceMetrics(metrics);
    return array;
  };

  const rawComplexityData = generateComplexityData(
    TimeComplexityFunctions.linearithmic
  );

  const complexityData = rawComplexityData.map((item) => ({
    inputSize: item.n,
    worstCase: item.n ** 2, // O(n²) for worst case
    averageCase: item.value, // O(n log n) for average case
    bestCase: item.value, // O(n log n) for best case
  }));

  const quickSortDescription = `
Quick Sort, "Böl ve Fethet" stratejisini kullanan hızlı ve verimli bir sıralama algoritmasıdır.

Çalışma Prensibi:
1. Diziden bir pivot eleman seç (genellikle son eleman)
2. Pivot etrafında diziyi yeniden düzenle
   - Pivottan küçük elemanları sola
   - Pivottan büyük elemanları sağa yerleştir
3. Alt diziler için aynı işlemi özyinelemeli olarak tekrarla

Özellikleri:
- Ortalama ve en iyi durumda O(n log n) karmaşıklığa sahiptir
- Yerinde sıralama yapar (ekstra bellek kullanmaz)
- Genellikle pratik uygulamalarda en hızlı sıralama algoritmalarından biridir
`;

  const quickSortCode = `
function quickSort(arr: number[]): number[] {
  // Dizi 1 veya daha az eleman içeriyorsa zaten sıralıdır
  if (arr.length <= 1) return arr;

  // Son elemanı pivot olarak seç
  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  // Pivottan küçük ve büyük elemanları ayır
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Alt dizileri özyinelemeli olarak sırala ve birleştir
  return [
    ...quickSort(left), 
    pivot, 
    ...quickSort(right)
  ];
}
`;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Quick Sort Görselleştirmesi
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Algoritma Görselleştirmesi</CardTitle>
          </CardHeader>
          <CardContent>
            <AlgorithmVisualizer
              algorithm={handleAlgorithmRun}
              initialArray={initialArray}
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          {performanceMetrics && (
            <PerformanceMetrics
              executionTime={performanceMetrics.executionTime}
              memoryUsage={performanceMetrics.memoryUsageAfter}
              comparisons={performanceMetrics.comparisons}
              swaps={performanceMetrics.swaps}
            />
          )}

          <Card>
            <CardHeader>
              <CardTitle>Quick Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {quickSortDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kod Örneği</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">{quickSortCode}</CodeBlock>
            </CardContent>
          </Card>

          <AlgorithmComplexity
            timeComplexity={{
              worstCase: 'O(n²)',
              averageCase: 'O(n log n)',
              bestCase: 'O(n log n)',
            }}
            spaceComplexity="O(log n) - Özyineleme için bellek"
            complexityData={complexityData}
          />
        </div>
      </div>
    </div>
  );
}
