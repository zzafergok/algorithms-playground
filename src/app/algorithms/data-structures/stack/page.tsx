'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function Stack({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Stack (Yığın)"
        description="Son giren ilk çıkar (LIFO) prensibiyle çalışan, yalnızca en üstteki elemana erişim sağlayan ve geri alma işlemleri gibi uygulamalar için ideal olan veri yapısı."
        category="data-structures"
      />
    </div>
  );
}
