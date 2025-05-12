'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Gcd({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Euclidean Algorithm (Öklid Algoritması)"
        description="İki veya daha fazla sayının en büyük ortak bölenini (EBOB) bulan, bölme ve kalan işlemlerini tekrarlayarak çalışan matematiksel bir algoritma."
        category="mathematical-algorithms"
      />
    </div>
  );
}
