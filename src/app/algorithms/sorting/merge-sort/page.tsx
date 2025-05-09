'use client';

import React from 'react';
import {
  TimeComplexityFunctions,
  generateComplexityData,
} from '@/lib/complexity-analysis';
import { CodeBlock } from '@/components/common/code-block';
import { AlgorithmComplexity } from '@/components/ui/algorithm-complexity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function MergeSortPage() {
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
        <div className="space-y-6">
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
              <CodeBlock code={mergeSortCode} language="typescript" />
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
