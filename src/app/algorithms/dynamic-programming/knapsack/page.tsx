'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Knapsack({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Knapsack Problem (Sırt Çantası Problemi)"
        description="Belirli bir ağırlık kapasitesindeki çantaya, maksimum değere sahip nesneleri yerleştirmeyi amaçlayan, dinamik programlama yaklaşımıyla çözülen optimizasyon problemi."
        category="dynamic-programming"
      />
    </div>
  );
}
