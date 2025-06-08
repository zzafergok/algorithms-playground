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

export default function DynamicProgrammingPage() {
  const algorithms = [
    {
      name: 'Fibonacci Sequence',
      path: '/algorithms/dynamic-programming/fibonacci',
      description:
        'Her sayının kendinden önceki iki sayının toplamı olduğu, memoization ile verimli hesaplanabilen dizi.',
    },
    {
      name: 'Knapsack Problem',
      path: '/algorithms/dynamic-programming/knapsack',
      description:
        'Belirli bir ağırlık kapasitesindeki çantaya, maksimum değere sahip nesneleri yerleştirme problemi.',
    },
    {
      name: 'Longest Common Subsequence',
      path: '/algorithms/dynamic-programming/longest-common-subsequence',
      description:
        'İki dizi arasındaki en uzun ortak alt diziyi bulan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Dinamik Programlama
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Dinamik Programlama (DP), karmaşık problemleri daha küçük alt
          problemlere bölerek ve alt problemlerin sonuçlarını saklayarak tekrar
          hesaplamayı önleyen bir algoritma tasarım tekniğidir.
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
          Dinamik Programlama Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Dinamik Programlama (DP), karmaşık problemleri daha küçük alt
            problemlere bölen, bu alt problemlerin sonuçlarını saklayan ve
            tekrar hesaplama ihtiyacını ortadan kaldıran bir algoritma tasarım
            yaklaşımıdır. Bu yöntem, özellikle örtüşen alt problemleri olan ve
            optimal alt yapıya sahip problemlerde kullanılır.
          </p>

          <p className="mt-4">
            Dinamik Programlama iki temel yaklaşımla uygulanır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Memoization (Üstten-Aşağı Yaklaşım):</strong> Rekürsif
              olarak problem çözülürken, alt problemlerin sonuçları bir tabloda
              saklanır ve gerektiğinde tekrar kullanılır.
            </li>
            <li>
              <strong>Tabulation (Aşağıdan-Yukarı Yaklaşım):</strong> Alt
              problemlerden başlayarak, daha büyük problemlere doğru ilerleyerek
              tabloyu doldurur.
            </li>
          </ul>

          <p className="mt-4">
            Bir problemin DP ile çözülebilmesi için genellikle şu özelliklere
            sahip olması gerekir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Örtüşen Alt Problemler:</strong> Aynı alt problemler,
              çözüm sürecinde birden fazla kez ortaya çıkar.
            </li>
            <li>
              <strong>Optimal Alt Yapı:</strong> Bir problemin optimal çözümü,
              alt problemlerin optimal çözümlerinden oluşur.
            </li>
          </ul>

          <p className="mt-4">
            Dinamik Programlama yaygın olarak şu alanlarda kullanılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Optimizasyon problemleri (Knapsack Problem, Coin Change)</li>
            <li>Sekans analizi (Longest Common Subsequence, Edit Distance)</li>
            <li>Grafik algoritmaları (Shortest Path, Floyd-Warshall)</li>
            <li>Bilgisayarlı görü ve görüntü işleme</li>
            <li>Biyoinformatik</li>
            <li>Ekonomi ve finans modelleri</li>
          </ul>

          <p className="mt-4">
            DP yaklaşımı, brute force veya özyinelemeli (recursive) çözümlere
            kıyasla genellikle çok daha verimlidir. Ancak, doğru durum tanımını
            formüle etmek ve geçiş denklemlerini belirlemek, DP çözümlerinin en
            zorlu kısmı olabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
