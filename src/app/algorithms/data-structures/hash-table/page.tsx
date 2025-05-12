'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

export interface IAppProps {}

export default function HashTable(props: IAppProps) {
  return (
    <div>
      <UnderConstruction
        title="Hash Table (Hash Tablosu)"
        description="Anahtar-değer çiftlerini saklayan, sabit zamanlı erişim sağlayan ve anahtarları değerlere eşleyen etkili bir veri yapısı."
        category="data-structures"
      />
    </div>
  );
}
