import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SortingAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Bubble Sort',
      path: '/algorithms/sorting/bubble-sort',
      description:
        'Her adımda komşu elemanları karşılaştırarak ve gerekirse değiştirerek çalışan basit bir sıralama algoritması.',
      difficulty: 'Kolay',
    },
    {
      name: 'Selection Sort',
      path: '/algorithms/sorting/selection-sort',
      description:
        'Her adımda dizideki en küçük elemanı bulup uygun konuma yerleştiren algoritma.',
      difficulty: 'Kolay',
    },
    {
      name: 'Insertion Sort',
      path: '/algorithms/sorting/insertion-sort',
      description:
        'Elemanları teker teker alıp sıralı alt listeye uygun konuma yerleştiren algoritma.',
      difficulty: 'Kolay',
    },
    {
      name: 'Merge Sort',
      path: '/algorithms/sorting/merge-sort',
      description:
        'Böl ve fethet yaklaşımını kullanarak diziyi parçalara ayırıp sıralayarak birleştiren algoritma.',
      difficulty: 'Orta',
    },
    {
      name: 'Quick Sort',
      path: '/algorithms/sorting/quick-sort',
      description:
        'Pivot eleman seçerek diziyi bölen ve alt dizileri sıralayan hızlı bir algoritma.',
      difficulty: 'Orta',
    },
    {
      name: 'Heap Sort',
      path: '/algorithms/sorting/heap-sort',
      description:
        'Binary heap veri yapısını kullanarak elemanları sıralayan verimli bir algoritma.',
      difficulty: 'Orta',
    },
    {
      name: 'Counting Sort',
      path: '/algorithms/sorting/counting-sort',
      description:
        'Karşılaştırma yapmadan, elemanların frekansını sayarak sıralama yapan doğrusal algoritma.',
      difficulty: 'Orta',
    },
    {
      name: 'Radix Sort',
      path: '/algorithms/sorting/radix-sort',
      description:
        'Sayıları basamaklarına göre sıralayan, counting sort tabanlı doğrusal algoritma.',
      difficulty: 'Orta',
    },
    {
      name: 'Shell Sort',
      path: '/algorithms/sorting/shell-sort',
      description:
        "Insertion sort'un geliştirilmiş versiyonu, gap aralıklarıyla elemanları önceden organize eden algoritma.",
      difficulty: 'Orta',
    },
    {
      name: 'Tim Sort',
      path: '/algorithms/sorting/tim-sort',
      description:
        "Python'un yerleşik sort fonksiyonunda kullanılan, merge sort ve insertion sort'un hibrit versiyonu.",
      difficulty: 'Zor',
    },
  ];

  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay':
        return 'success';
      case 'Orta':
        return 'warning';
      case 'Zor':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Sıralama Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Sıralama algoritmaları, verileri belirli bir düzende organize etmek
          için kullanılan temel algoritmalardan oluşur. Her algoritmanın kendine
          özgü avantajları, dezavantajları ve kullanım alanları bulunmaktadır.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => (
          <Card key={algorithm.name} className="algorithm-card flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{algorithm.name}</CardTitle>
                {algorithm.difficulty && (
                  <Badge
                    variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                    className="text-xs"
                  >
                    {algorithm.difficulty}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm text-muted-foreground">
                {algorithm.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
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
          Sıralama Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Sıralama algoritmaları, bilgisayar biliminin en temel ve yaygın
            kullanılan algoritmalarından oluşur. Bu algoritmalar, verileri
            belirli bir kritere göre düzenleyerek arama, filtreleme ve analiz
            işlemlerini kolaylaştırır.
          </p>

          <p className="mt-4">
            Sıralama algoritmalarını çeşitli kriterlere göre kategorize
            edebiliriz:
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="font-semibold">
                Karmaşıklığa Göre Sınıflandırma:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Basit Algoritmalar (O(n²)):</strong> Bubble Sort,
                  Selection Sort, Insertion Sort gibi anlaşılması kolay ancak
                  büyük veri setlerinde yavaş çalışan algoritmalar.
                </li>
                <li>
                  <strong>Verimli Algoritmalar (O(n log n)):</strong> Merge
                  Sort, Quick Sort, Heap Sort gibi büyük veri setlerinde etkili
                  performans gösteren algoritmalar.
                </li>
                <li>
                  <strong>Doğrusal Algoritmalar (O(n)):</strong> Counting Sort,
                  Radix Sort gibi özel koşullarda doğrusal zamanda çalışan
                  algoritmalar.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Kararlılığa Göre Sınıflandırma:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Kararlı Algoritmalar:</strong> Eşit elemanların göreli
                  sırasını koruyan algoritmalar (Merge Sort, Insertion Sort,
                  Bubble Sort).
                </li>
                <li>
                  <strong>Kararsız Algoritmalar:</strong> Eşit elemanların
                  göreli sırasını korumayan algoritmalar (Quick Sort, Selection
                  Sort, Heap Sort).
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">
                Bellek Kullanımına Göre Sınıflandırma:
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>In-place Algoritmalar:</strong> Sabit miktarda ek
                  bellek kullanan algoritmalar (Quick Sort, Heap Sort, Selection
                  Sort).
                </li>
                <li>
                  <strong>Out-of-place Algoritmalar:</strong> Giriş boyutuyla
                  orantılı ek bellek gerektiren algoritmalar (Merge Sort,
                  Counting Sort).
                </li>
              </ul>
            </div>
          </div>

          <p className="mt-4">
            Doğru algoritma seçimi, veri boyutu, bellek kısıtlamaları,
            kararlılık gereksinimleri ve performans beklentilerine bağlı olarak
            değişkenlik gösterir. Her algoritmanın kendine özgü avantaj ve
            dezavantajları bulunduğundan, spesifik kullanım senaryolarına göre
            en uygun algoritmanın seçilmesi kritik öneme sahiptir.
          </p>
        </div>
      </div>
    </div>
  );
}
