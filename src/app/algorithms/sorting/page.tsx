import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SortingAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Bubble Sort',
      path: '/algorithms/sorting/bubble-sort',
      description:
        'Her adımda komşu elemanları karşılaştırarak ve gerekirse değiştirerek çalışan basit bir sıralama algoritması.',
    },
    {
      name: 'Selection Sort',
      path: '/algorithms/sorting/selection-sort',
      description:
        'Her adımda dizideki en küçük elemanı bulup uygun konuma yerleştiren algoritma.',
    },
    {
      name: 'Insertion Sort',
      path: '/algorithms/sorting/insertion-sort',
      description:
        'Elemanları teker teker alıp sıralı alt listeye uygun konuma yerleştiren algoritma.',
    },
    {
      name: 'Merge Sort',
      path: '/algorithms/sorting/merge-sort',
      description:
        'Böl ve fethet yaklaşımını kullanarak diziyi parçalara ayırıp sıralayarak birleştiren algorima.',
    },
    {
      name: 'Quick Sort',
      path: '/algorithms/sorting/quick-sort',
      description:
        'Pivot eleman seçerek diziyi bölen ve alt dizileri sıralayan hızlı bir algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Sıralama Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Sıralama algoritmaları, bir dizi veya listedeki elemanları belirli bir
          düzene (artan, azalan) göre düzenleyen algoritmalardır.
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
              <Button asChild>
                <Link href={algorithm.path}>
                  İncele <ArrowRight className="ml-2 h-4 w-4" />
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
            Sıralama algoritmaları, bilgisayar biliminin temel konularından
            biridir ve veri işlemede kritik bir rol oynar. Bu algoritmalar,
            dizileri, listeleri veya diğer veri koleksiyonlarını belirli bir
            düzene göre düzenler.
          </p>

          <p className="mt-4">
            Sıralama algoritmaları, genellikle aşağıdaki özelliklere göre
            değerlendirilir ve sınıflandırılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Zaman Karmaşıklığı:</strong> Algoritmanın çalışma süresi
              (En kötü, ortalama ve en iyi durum)
            </li>
            <li>
              <strong>Alan Karmaşıklığı:</strong> Algoritmanın bellek kullanımı
            </li>
            <li>
              <strong>Kararlılık (Stability):</strong> Eşit değerlere sahip
              elemanların sıralama sonucunda orijinal sırasını koruyup
              korumadığı
            </li>
            <li>
              <strong>Yerinde Sıralama (In-place):</strong> Algoritmanın ekstra
              bellek kullanmadan, orijinal veri yapısını düzenleyip
              düzenlemediği
            </li>
            <li>
              <strong>Uyarlanabilirlik (Adaptivity):</strong> Algoritmanın,
              girdi verilerinin düzenine (kısmen sıralı, tersine sıralı vb.)
              göre performansının değişip değişmediği
            </li>
          </ul>

          <p className="mt-4">
            Temel sıralama algoritmaları çeşitli kategorilere ayrılabilir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Karşılaştırma Bazlı Algoritmalar:</strong> Elemanları
              birbiriyle karşılaştırarak sıralama yapar (Bubble Sort, Selection
              Sort, Insertion Sort, Merge Sort, Quick Sort, Heap Sort)
            </li>
            <li>
              <strong>Dağıtım Bazlı Algoritmalar:</strong> Elemanları
              karşılaştırmadan, belirli özelliklere göre gruplandırarak sıralar
              (Counting Sort, Radix Sort, Bucket Sort)
            </li>
          </ul>

          <p className="mt-4">
            Sıralama algoritmalarının seçimi, aşağıdaki faktörlere bağlı olarak
            değişir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Veri boyutu (küçük, orta, büyük)</li>
            <li>Veri tipi (sayısal, metin, karma)</li>
            <li>
              Verinin mevcut düzeni (rastgele, kısmen sıralı, tersine sıralı)
            </li>
            <li>Bellek kısıtlamaları</li>
            <li>Kararlılık gereksinimi</li>
            <li>
              Uygulama alanı (gerçek zamanlı sistemler, veritabanları, vb.)
            </li>
          </ul>

          <p className="mt-4">
            Doğru sıralama algoritmasını seçmek, uygulamaların performansını
            önemli ölçüde etkileyebilir. Örneğin, küçük veri setleri için
            Insertion Sort gibi basit algoritmalar yeterli olabilirken, büyük
            veri setleri için Merge Sort veya Quick Sort gibi daha gelişmiş
            algoritmalar gerekebilir.
          </p>
        </div>
      </div>
    </div>
  );
}
