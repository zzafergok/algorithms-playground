'use client';

import { UnderConstruction } from '@/components/common/under-construction';

export default function SimulatedAnnealing() {
  return (
    <UnderConstruction
      title="Simulated Annealing (Benzetimli Tavlama)"
      description="Fiziksel tavlama işlemini taklit eden, yerel optimumlardan kaçarak global optimum çözüm arayan metasezgisel yöntem. Başlangıçta yüksek sıcaklıkla rastgele çözümler kabul ederken, zamanla sıcaklığı düşürerek optimuma yakınsar."
      category="optimization-algorithms"
    />
  );
}
