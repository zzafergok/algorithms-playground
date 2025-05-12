'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function BellmanFord({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Bellman-Ford Algorithm (Bellman-Ford Algoritması)"
        description="Negatif ağırlıklı kenarları olan yönlendirilmiş graflarda, tek bir kaynaktan tüm düğümlere olan en kısa yolları bulan ve negatif çevrimleri tespit edebilen algoritma."
        category="graph-algorithms"
      />
    </div>
  );
}
