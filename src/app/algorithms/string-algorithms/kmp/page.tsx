'use client';

import { UnderConstruction } from '@/components/common/under-construction';

export default function Kmp() {
  return (
    <UnderConstruction
      title="Knuth-Morris-Pratt Algorithm (KMP Algoritması)"
      description="Önek tablosu kullanarak metinde desen aramayı verimli hale getiren string eşleştirme algoritması. Daha önce eşleşen karakterleri tekrar kontrol etmeyerek, doğrusal zamanda arama yapar."
      category="string-algorithms"
    />
  );
}
