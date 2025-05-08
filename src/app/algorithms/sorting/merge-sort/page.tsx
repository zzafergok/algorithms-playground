'use client';

import React, { useState } from 'react';
import { AlgorithmVisualizer } from '@/visualization/components/AlgorithmVisualizer';
import { generateRandomArray } from '@/lib/utils';
import { performanceTracker } from '@/lib/performance-tracker';
import {
  TimeComplexityFunctions,
  generateComplexityData,
} from '@/lib/complexity-analysis';

// Implement mergeSort function locally
function merge(left: number[], right: number[]): number[] {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CodeBlock } from '@/components/ui/code-block';
import { PerformanceMetrics } from '@/components/ui/performance-metrics';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';

export default function MergeSortPage() {
  const [initialArray, setInitialArray] = useState(
    generateRandomArray(10, 10, 100)
  );
  interface PerformanceMetricsType {
    executionTime: number;
    memoryUsageAfter: number;
    comparisons: number;
    swaps: number;
  }

  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetricsType | null>(null);

  const handleAlgorithmRun = (array: number[]) => {
    const metrics = performanceTracker.measure(mergeSort, array);
    setPerformanceMetrics(metrics);
    return array;
  };

  const rawComplexityData = generateComplexityData(
    TimeComplexityFunctions.linearithmic
  );

  const complexityData = rawComplexityData.map((item) => ({
    inputSize: item.n,
    worstCase: item.value,
    averageCase: item.value,
    bestCase: item.value,
  }));

  const mergeSortDescription = `
Merge Sort, "Böl ve Fethet" stratejisini kullanan bir sıralama algoritmasıdır. 
Diziyi küçük alt dizilere ayırır, bu alt dizileri sıralar ve sonra birleştirir.

Çalışma Prensibi:
1. Diziyi ortadan ikiye böl
2. Her alt diziyi özyinelemeli olarak sırala
3. Sıralanmış alt dizileri birleştir
4. Tüm dizi sıralanana kadar işlemi tekrarla

Özellikleri:
- Kararlı bir sıralama algoritmasıdır
- Her durumda O(n log n) karmaşıklığa sahiptir
- Ekstra bellek kullanır (O(n) alan karmaşıklığı)
`;

  const mergeSortCode = `
function mergeSort(arr: number[]): number[] {
  // Dizi 1 veya daha az eleman içeriyorsa zaten sıralıdır
  if (arr.length <= 1) return arr;

  // Diziyi ortadan ikiye böl
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Alt dizileri özyinelemeli olarak sırala
  return merge(
    mergeSort(left), 
    mergeSort(right)
  );
}

function merge(left: number[], right: number[]): number[] {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // İki alt diziyi birleştir
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Kalan elemanları ekle
  return result.concat(
    left.slice(leftIndex), 
    right.slice(rightIndex)
  );
}
`;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Merge Sort Görselleştirmesi
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
              <CardTitle>Merge Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {mergeSortDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kod Örneği</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock language="typescript">{mergeSortCode}</CodeBlock>
            </CardContent>
          </Card>

          <AlgorithmComplexity
            timeComplexity={{
              worstCase: 'O(n log n)',
              averageCase: 'O(n log n)',
              bestCase: 'O(n log n)',
            }}
            spaceComplexity="O(n) - Ek bellek kullanımı"
            complexityData={complexityData}
          />
        </div>
      </div>
    </div>
  );
}
