'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function LongestCommonSubsequence({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Longest Common Subsequence (En Uzun Ortak Alt Dizi)"
        description="İki dizi arasındaki aynı sırada görünen ancak bitişik olmak zorunda olmayan en uzun ortak elemanlar dizisini bulan, dinamik programlama ile verimli çözülen algoritma."
        category="dynamic-programming"
      />
    </div>
  );
}
