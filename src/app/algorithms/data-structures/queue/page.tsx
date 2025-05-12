'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Queue({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Queue (Kuyruk)"
        description="İlk giren ilk çıkar (FIFO) prensibiyle çalışan, elemanlara sıralı erişim sağlayan ve sıra tabanlı işlemler için ideal olan doğrusal veri yapısı."
        category="data-structures"
      />
    </div>
  );
}
