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

export default function DivideAndConquerPage() {
  const algorithms = [
    {
      name: 'Merge Sort',
      path: '/algorithms/sorting/merge-sort',
      description:
        'Diziyi iki parçaya bölen, her parçayı sıralayan ve sonra birleştiren etkili bir sıralama algoritması.',
    },
    {
      name: 'Quick Sort',
      path: '/algorithms/sorting/quick-sort',
      description:
        'Pivot seçerek diziyi bölen ve her bölümü tekrar eden şekilde sıralayan hızlı sıralama algoritması.',
    },
    {
      name: 'Binary Search',
      path: '/algorithms/searching/binary-search',
      description:
        'Sıralı dizilerde, her adımda arama alanını yarıya indirerek logaritmik zamanda arama yapan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Böl ve Fethet Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Böl ve fethet (divide and conquer), problemi aynı tipte daha küçük alt
          problemlere bölen, çözen ve sonuçları birleştiren algoritma tasarım
          yaklaşımıdır.
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
              <Button asChild variant="ghost" size="sm" className="mt-2">
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
          Böl ve Fethet Yaklaşımı Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Böl ve fethet yaklaşımı, karmaşık problemleri daha küçük alt
            problemlere bölerek çözmeyi amaçlayan temel bir algoritma tasarım
            prensibidir. Bu yaklaşım üç ana adımdan oluşur:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Böl (Divide):</strong> Problemi aynı türde daha küçük alt
              problemlere böl.
            </li>
            <li>
              <strong>Fethet (Conquer):</strong> Alt problemleri özyinelemeli
              (recursive) olarak çöz. Eğer alt problemler yeterince küçükse,
              doğrudan çöz.
            </li>
            <li>
              <strong>Birleştir (Combine):</strong> Alt problemlerin çözümlerini
              orijinal problemin çözümü için birleştir.
            </li>
          </ol>
          <p className="mt-4">Böl ve fethet yaklaşımının avantajları:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Verimlilik:</strong> Birçok durumda, bu yaklaşım doğrusal
              algoritmalara göre daha verimlidir, logaritmik zaman karmaşıklığı
              sunar.
            </li>
            <li>
              <strong>Paralelleştirebilme:</strong> Alt problemler bağımsız
              olduğu için çözümleri paralel işlemlerle gerçekleştirilebilir.
            </li>
            <li>
              <strong>Ölçeklenebilirlik:</strong> Büyük veri setleri için bile
              etkin çözümler sunar.
            </li>
          </ul>
          <p className="mt-4">Yaygın kullanım alanları:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Sıralama algoritmaları (Merge Sort, Quick Sort)</li>
            <li>Arama algoritmaları (Binary Search)</li>
            <li>Matris çarpımı (Strassen's Algorithm)</li>
            <li>En yakın nokta çiftini bulma (Closest Pair of Points)</li>
            <li>Hızlı Fourier dönüşümü (FFT)</li>
          </ul>
          <p className="mt-4">
            Böl ve fethet algoritmaları genellikle O(n log n) veya daha iyi
            zaman karmaşıklığına sahiptir. Bu nedenle, büyük veri setleriyle
            çalışırken önemli performans avantajları sağlarlar.
          </p>
        </div>
      </div>
    </div>
  );
}
