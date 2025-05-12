'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function LinkedList({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Linked List (Bağlı Liste)"
        description="Her düğümün veri ve bir sonraki düğüme referans içerdiği, dinamik bellek kullanımına olanak tanıyan doğrusal veri yapısı."
        category="data-structures"
      />
    </div>
  );
}
