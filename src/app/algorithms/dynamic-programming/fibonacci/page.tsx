'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Fibonacci({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Fibonacci Sequence (Fibonacci Dizisi)"
        description="Her sayının kendinden önceki iki sayının toplamı olduğu, dinamik programlama ve memoization teknikleri ile verimli hesaplanabilen matematiksel dizi."
        category="dynamic-programming"
      />
    </div>
  );
}
