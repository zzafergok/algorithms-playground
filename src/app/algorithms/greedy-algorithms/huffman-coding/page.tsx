'use client';

import React from 'react';

import { UnderConstruction } from '@/components/common/under-construction';

type Props = {};

export default function HuffmanCoding({}: Props) {
  return (
    <div>
      <UnderConstruction
        title="Huffman Coding (Huffman Kodlaması)"
        description="Karakterlerin frekanslarına göre değişken uzunluklu kodlar atayan, öncelikli kuyruk ve ikili ağaç yapılarını kullanan, veri sıkıştırma için kullanılan verimli bir algoritma."
        category="greedy-algorithms"
      />
    </div>
  );
}
