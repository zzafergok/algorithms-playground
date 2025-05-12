'use client';

import { UnderConstruction } from '@/components/common/under-construction';

export default function Fibonacci() {
  return (
    <UnderConstruction
      title="Fibonacci Sequence"
      description="Her sayının kendinden önceki iki sayının toplamı olduğu, memoization ile verimli hesaplanabilen dizi."
      category="dynamic-programming"
    />
  );
}
