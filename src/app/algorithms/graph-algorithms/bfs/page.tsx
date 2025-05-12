'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Bfs({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Breadth-First Search (Genişlik Öncelikli Arama)"
        description="Grafı seviye seviye dolaşan, en kısa yolu bulma ve seviye tabanlı işlemlerde kullanılan, kuyruk veri yapısı ile uygulanan temel graf algoritması."
        category="graph-algorithms"
      />
    </div>
  );
}
