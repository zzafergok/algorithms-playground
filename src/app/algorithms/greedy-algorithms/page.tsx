import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GreedyAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Fractional Knapsack',
      path: '/algorithms/greedy-algorithms/fractional-knapsack',
      description:
        'Nesneleri ağırlık/değer oranına göre sıralayarak çantaya yerleştiren, nesnelerin bölünebilir olduğu çanta problemi çözümü.',
    },
    {
      name: 'Huffman Coding',
      path: '/algorithms/greedy-algorithms/huffman-coding',
      description:
        'Karakterlerin frekanslarına göre değişken uzunluklu kodlar atayan, veri sıkıştırma için kullanılan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Açgözlü Algoritmalar
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Açgözlü (Greedy) algoritmalar, her adımda en iyi görünen seçimi
          yaparak global optimum çözüm arayan problem çözme yaklaşımıdır.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.name} className="algorithm-card">
            <CardHeader>
              <CardTitle>{algorithm.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {algorithm.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="mt-2">
                <Link
                  href={algorithm.path}
                  className="flex justify-between items-center gap-3"
                >
                  <span className="flex-grow text-center">İncele</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Açgözlü Algoritmalar Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Açgözlü algoritmalar, optimizasyon problemlerini çözmek için
            kullanılan bir algoritma tasarım yaklaşımıdır. Bu yaklaşımda,
            algoritma her adımda mevcut durumda en iyi görünen seçimi yapar,
            gelecekteki sonuçları dikkate almadan ilerler. Bu nedenle "açgözlü"
            (greedy) olarak adlandırılır.
          </p>

          <p className="mt-4">Açgözlü algoritmaların temel özellikleri:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Yerel Optimizasyon:</strong> Her adımda mevcut durumda en
              iyi görünen seçimi yapar.
            </li>
            <li>
              <strong>Geriye Dönüş Yok:</strong> Bir kez karar verildikten
              sonra, bu karar değiştirilmez.
            </li>
            <li>
              <strong>Basitlik:</strong> Genellikle anlaşılması ve uygulanması
              kolaydır.
            </li>
            <li>
              <strong>Verimlilik:</strong> Çoğu durumda çok hızlı çalışır,
              genellikle O(n log n) veya daha iyi.
            </li>
          </ul>

          <p className="mt-4">
            Açgözlü algoritmaların başarılı olması için gereken koşullar:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Açgözlü Seçim Özelliği:</strong> Yerel optimum seçimler,
              global optimum çözüme yol açmalıdır.
            </li>
            <li>
              <strong>Optimal Alt Yapı:</strong> Problemin optimal çözümü, alt
              problemlerin optimal çözümlerini içermelidir.
            </li>
          </ul>

          <p className="mt-4">
            Açgözlü algoritmaların her zaman optimal çözümü garanti etmediğini
            unutmamak önemlidir. Bazı durumlarda, yerel optimum kararlar, global
            optimum çözüme ulaşmayı engelleyebilir. Ancak, belirli problem
            türlerinde açgözlü yaklaşım optimal sonuç verir.
          </p>

          <p className="mt-4">
            Açgözlü algoritmaların kullanıldığı yaygın problemler:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Minimum Yayılma Ağacı (Kruskal ve Prim algoritmaları)</li>
            <li>Huffman Kodlama (veri sıkıştırma)</li>
            <li>Dijkstra En Kısa Yol Algoritması</li>
            <li>Kesirli Sırt Çantası Problemi (Fractional Knapsack)</li>
            <li>Etkinlik Seçim Problemi (Activity Selection)</li>
            <li>Para Üstü Problemi (Coin Change Problem - bazı durumlarda)</li>
          </ul>

          <p className="mt-4">
            Açgözlü algoritmalar, dinamik programlama veya geri izleme gibi
            diğer yaklaşımlara göre genellikle daha hızlı ve daha az bellek
            kullanır. Ancak, her problem için uygun olmayabilir ve bazen
            alt-optimal sonuçlar üretebilir. Bu nedenle, problemi dikkatli bir
            şekilde analiz etmek ve açgözlü yaklaşımın uygun olup olmadığını
            belirlemek önemlidir.
          </p>
        </div>
      </div>
    </div>
  );
}
