'use client';

import React from 'react';
import {
  TimeComplexityFunctions,
  generateComplexityData,
} from '@/lib/complexity-analysis';
import { CodeBlock } from '@/components/common/code-block';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function InsertionSortPage() {
  const rawComplexityData = generateComplexityData(
    TimeComplexityFunctions.quadratic
  );

  const complexityData = rawComplexityData.map((item) => ({
    inputSize: item.n,
    worstCase: item.value,
    averageCase: item.value,
    bestCase: item.n, // Best case for insertion sort is O(n)
  }));

  const insertionSortDescription = `
Insertion Sort, dizinin her elemanını sıralanmış kısımla karşılaştırarak 
doğru konuma yerleştiren bir sıralama algoritmasıdır.

Çalışma Prensibi:
1. Dizinin ikinci elemanından başla
2. Elemanı sıralanmış kısımla karşılaştır
3. Elemanı sıralanmış kısımda doğru konuma yerleştir
4. İşlemi dizinin geri kalan elemanları için tekrarla

Kısmi sıralanmış dizilerde oldukça verimlidir.
`;

  const insertionSortCode = `
function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;
    
    // Sıralanmış kısımda doğru konumu bul
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}
`;

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Insertion Sort Görselleştirmesi
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Insertion Sort Açıklaması</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {insertionSortDescription}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kod Örneği</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock code={insertionSortCode} language="typescript" />
            </CardContent>
          </Card>

          <AlgorithmComplexity
            timeComplexity={{
              worstCase: 'O(n²)',
              averageCase: 'O(n²)',
              bestCase: 'O(n)',
            }}
            spaceComplexity="O(1) - Yerinde sıralama"
            complexityData={complexityData}
          />
        </div>
      </div>
    </div>
  );
}
