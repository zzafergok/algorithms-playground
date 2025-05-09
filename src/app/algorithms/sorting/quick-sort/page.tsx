'use client';

import React from 'react';
import {
  TimeComplexityFunctions,
  generateComplexityData,
} from '@/lib/complexity-analysis';
import { CodeBlock } from '@/components/common/code-block';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuickSortPage() {
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
        <div className="space-y-6">
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
              <CodeBlock code={quickSortCode} language="typescript" />
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
