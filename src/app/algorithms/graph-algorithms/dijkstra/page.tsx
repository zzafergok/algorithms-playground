'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Dijkstra({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Dijkstra's Algorithm (Dijkstra Algoritması)"
        description="Ağırlıklı graflarda bir düğümden diğer tüm düğümlere olan en kısa yolları bulan, öncelikli kuyruk veri yapısını kullanan ve negatif kenar ağırlıklarını desteklemeyen graf algoritması."
        category="graph-algorithms"
      />
    </div>
  );
}
