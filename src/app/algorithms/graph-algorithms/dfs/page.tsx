'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Dfs({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Depth-First Search (Derinlik Öncelikli Arama)"
        description="Grafı derinlemesine dolaşan, bağlantılı bileşenler ve çevrim tespitinde kullanılan, özyinelemeli yapı veya yığın ile uygulanan temel graf algoritması."
        category="graph-algorithms"
      />
    </div>
  );
}
