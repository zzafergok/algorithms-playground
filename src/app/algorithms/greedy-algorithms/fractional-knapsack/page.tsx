'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function fractionalKnapsack({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Fractional Knapsack (Kesirli Sırt Çantası)"
        description="Nesneleri ağırlık/değer oranına göre sıralayarak çantaya yerleştiren, nesnelerin bölünebilir olduğu durumlarda optimal çözüm sunan açgözlü yaklaşım temelli algoritma."
        category="greedy-algorithms"
      />
    </div>
  );
}
