'use client';

import React, { useState } from 'react';
import { AlgorithmVisualizer } from '@/visualization/components/AlgorithmVisualizer';
import { selectionSort } from '@/lib/algorithms/sorting';
import { generateRandomArray } from '@/lib/utils';
import {
  performanceTracker,
  AlgorithmPerformanceMetrics,
} from '@/lib/performance-tracker';
import {
  TimeComplexityFunctions,
  generateComplexityData,
} from '@/lib/complexity-analysis';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { PerformanceMetrics } from '@/components/ui/performance-metrics';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';

export default function SelectionSortPage() {
  const [initialArray, setInitialArray] = useState(
    generateRandomArray(42, 10, 10, 100)
  );
  const [performanceMetrics, setPerformanceMetrics] =
    useState<AlgorithmPerformanceMetrics | null>(null);

  const handleAlgorithmRun = (array: number[]) => {
    const metrics = performanceTracker.measure(selectionSort, array);
    setPerformanceMetrics(metrics);
    return array;
  };

  const rawComplexityData = generateComplexityData(
    TimeComplexityFunctions.quadratic
  );

  const complexityData = rawComplexityData.map((item) => ({
    inputSize: item.n,
    worstCase: item.value,
    averageCase: item.value,
    bestCase: item.value,
  }));

  const selectionSortDescription = `
Selection Sort, dizideki en küçük elemanı bulup başa yerleştiren bir 
sıralama algoritmasıdır. Her adımda dizinin sıralanmamış kısmından 
en küçük elemanı seçerek sıralama yapar.

Çalışma Prensibi:
1. Dizinin başından başlayarak tüm diziyi tara
2. En küçük elemanı bul
3. En küçük elemanı dizinin başındaki elemanla değiştir
4. İşlemi dizinin geri kalan kısmı için tekrarla
`;

  const selectionSortCode = `
function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // En küçük elemanı başa taşı
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
`;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Selection Sort Görselleştirmesi
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
              <CardTitle>Selection Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {selectionSortDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kod Örneği</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">{selectionSortCode}</CodeBlock>
            </CardContent>
          </Card>

          <AlgorithmComplexity
            timeComplexity={{
              worstCase: 'O(n²)',
              averageCase: 'O(n²)',
              bestCase: 'O(n²)',
            }}
            spaceComplexity="O(1) - Yerinde sıralama"
            complexityData={complexityData}
          />
        </div>
      </div>
    </div>
  );
}
