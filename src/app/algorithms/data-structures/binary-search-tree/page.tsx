'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function BinarySearchTree({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Binary Search Tree (İkili Arama Ağacı)"
        description="Her düğümün en fazla iki çocuğa sahip olduğu, hızlı arama, ekleme ve silme işlemlerine olanak tanıyan hiyerarşik veri yapısı."
        category="data-structures"
      />
    </div>
  );
}
