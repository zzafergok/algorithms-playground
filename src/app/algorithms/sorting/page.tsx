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
import { Badge } from '@/components/ui/badge';

// Define the interface for our sorting algorithms
interface SortingAlgorithm {
  name: string;
  slug: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function SortingAlgorithmsPage() {
  // Array containing all sorting algorithm information
  const sortingAlgorithms: SortingAlgorithm[] = [
    {
      name: 'Bubble Sort',
      slug: 'bubble-sort',
      description:
        'Her adımda komşu elemanları karşılaştırarak ve gerekirse değiştirerek çalışan basit bir sıralama algoritması.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      difficulty: 'Beginner',
    },
    {
      name: 'Selection Sort',
      slug: 'selection-sort',
      description:
        'Her adımda dizideki en küçük elemanı bulup uygun konuma yerleştiren algoritma.',
      timeComplexity: {
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      difficulty: 'Beginner',
    },
    {
      name: 'Insertion Sort',
      slug: 'insertion-sort',
      description:
        'Elemanları teker teker alıp sıralı alt listeye uygun konuma yerleştiren algoritma.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      difficulty: 'Beginner',
    },
    {
      name: 'Merge Sort',
      slug: 'merge-sort',
      description:
        'Böl ve fethet yaklaşımını kullanarak diziyi parçalara ayırıp sıralayarak birleştiren algoritma.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(n)',
      difficulty: 'Intermediate',
    },
    {
      name: 'Quick Sort',
      slug: 'quick-sort',
      description:
        'Pivot eleman seçerek diziyi bölen ve alt dizileri sıralayan hızlı bir algoritma.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(log n)',
      difficulty: 'Intermediate',
    },
    {
      name: 'Heap Sort',
      slug: 'heap-sort',
      description:
        'Binary heap veri yapısını kullanarak diziyi sıralayan, kararlı olmayan bir sıralama algoritması.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(1)',
      difficulty: 'Advanced',
    },
    {
      name: 'Counting Sort',
      slug: 'counting-sort',
      description:
        'Sayma prensibiyle çalışan, değer aralığı sınırlı diziler için lineer zamanda çalışan algoritma.',
      timeComplexity: {
        best: 'O(n+k)',
        average: 'O(n+k)',
        worst: 'O(n+k)',
      },
      spaceComplexity: 'O(n+k)',
      difficulty: 'Intermediate',
    },
    {
      name: 'Radix Sort',
      slug: 'radix-sort',
      description:
        'Elemanları basamak basamak sıralayan, karşılaştırma yapmayan bir algoritma.',
      timeComplexity: {
        best: 'O(nk)',
        average: 'O(nk)',
        worst: 'O(nk)',
      },
      spaceComplexity: 'O(n+k)',
      difficulty: 'Advanced',
    },
  ];

  // Helper function to map difficulty to badge color variant
  const getDifficultyBadgeVariant = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'success';
      case 'Intermediate':
        return 'warning';
      case 'Advanced':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  // Grouping algorithms by difficulty for better organization
  const beginnerAlgorithms = sortingAlgorithms.filter(
    (algo) => algo.difficulty === 'Beginner'
  );
  const intermediateAlgorithms = sortingAlgorithms.filter(
    (algo) => algo.difficulty === 'Intermediate'
  );
  const advancedAlgorithms = sortingAlgorithms.filter(
    (algo) => algo.difficulty === 'Advanced'
  );

  return (
    <div className="space-y-12">
      {/* Hero section with title and description */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Sıralama Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Sıralama algoritmaları, bir dizi veya listedeki elemanları belirli bir
          düzene (artan, azalan) göre düzenleyen temel algoritmalardır.
        </p>
      </div>

      {/* Information section about sorting algorithms */}
      <section className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Sıralama Algoritmaları Hakkında
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Sıralama algoritmaları, bilgisayar biliminin temel konularından
            biridir ve veri işlemede kritik bir rol oynar. Bu algoritmalar,
            dizileri, listeleri veya diğer veri koleksiyonlarını belirli bir
            düzene göre düzenler.
          </p>

          <p>
            Sıralama algoritmaları, genellikle aşağıdaki özelliklere göre
            değerlendirilir ve sınıflandırılır:
          </p>

          <ul>
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

          <p>
            Doğru sıralama algoritmasının seçimi; veri boyutu, veri tipi,
            verinin mevcut düzeni, bellek kısıtlamaları ve uygulama alanı gibi
            faktörlere bağlı olarak değişir.
          </p>
        </div>
      </section>

      {/* Comparison table for quick reference */}
      <section className="overflow-x-auto">
        <h2 className="text-2xl font-bold mb-4">Algoritma Karşılaştırması</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">Algoritma</th>
              <th className="p-2 text-left">En İyi Durum</th>
              <th className="p-2 text-left">Ortalama Durum</th>
              <th className="p-2 text-left">En Kötü Durum</th>
              <th className="p-2 text-left">Alan</th>
              <th className="p-2 text-left">Kararlı</th>
            </tr>
          </thead>
          <tbody>
            {sortingAlgorithms.map((algo) => (
              <tr key={algo.slug} className="border-t border-border">
                <td className="p-2 font-medium">{algo.name}</td>
                <td className="p-2 font-mono">{algo.timeComplexity.best}</td>
                <td className="p-2 font-mono">{algo.timeComplexity.average}</td>
                <td className="p-2 font-mono">{algo.timeComplexity.worst}</td>
                <td className="p-2 font-mono">{algo.spaceComplexity}</td>
                <td className="p-2">
                  {['Bubble Sort', 'Insertion Sort', 'Merge Sort'].includes(
                    algo.name
                  )
                    ? 'Evet'
                    : 'Hayır'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Algorithms grouped by difficulty */}
      <div className="space-y-8">
        {/* Beginner Algorithms */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Temel Algoritmalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beginnerAlgorithms.map((algorithm) => (
              <Card
                key={algorithm.slug}
                className="algorithm-card hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{algorithm.name}</CardTitle>
                    <Badge
                      variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                    >
                      {algorithm.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{algorithm.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      <span className="font-medium">En İyi: </span>
                      <span className="font-mono">
                        {algorithm.timeComplexity.best}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">En Kötü: </span>
                      <span className="font-mono">
                        {algorithm.timeComplexity.worst}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Alan: </span>
                      <span className="font-mono">
                        {algorithm.spaceComplexity}
                      </span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={`/algorithms/sorting/${algorithm.slug}`}
                      className="flex justify-between items-center"
                    >
                      <span>İncele</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Intermediate Algorithms */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Orta Seviye Algoritmalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intermediateAlgorithms.map((algorithm) => (
              <Card
                key={algorithm.slug}
                className="algorithm-card hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{algorithm.name}</CardTitle>
                    <Badge
                      variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                    >
                      {algorithm.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{algorithm.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      <span className="font-medium">En İyi: </span>
                      <span className="font-mono">
                        {algorithm.timeComplexity.best}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">En Kötü: </span>
                      <span className="font-mono">
                        {algorithm.timeComplexity.worst}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Alan: </span>
                      <span className="font-mono">
                        {algorithm.spaceComplexity}
                      </span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={`/algorithms/sorting/${algorithm.slug}`}
                      className="flex justify-between items-center"
                    >
                      <span>İncele</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Advanced Algorithms */}
        <section>
          <h2 className="text-2xl font-bold mb-4">İleri Seviye Algoritmalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advancedAlgorithms.map((algorithm) => (
              <Card
                key={algorithm.slug}
                className="algorithm-card hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{algorithm.name}</CardTitle>
                    <Badge
                      variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                    >
                      {algorithm.difficulty}
                    </Badge>
                  </div>
                  <CardDescription>{algorithm.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-col gap-1 text-sm">
                    <p>
                      <span className="font-medium">En İyi: </span>
                      <span className="font-mono">
                        {algorithm.timeComplexity.best}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">En Kötü: </span>
                      <span className="font-mono">
                        {algorithm.timeComplexity.worst}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium">Alan: </span>
                      <span className="font-mono">
                        {algorithm.spaceComplexity}
                      </span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="outline" className="w-full">
                    <Link
                      href={`/algorithms/sorting/${algorithm.slug}`}
                      className="flex justify-between items-center"
                    >
                      <span>İncele</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* When to use which algorithm section */}
      <section className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">
          Hangi Algoritmayı Ne Zaman Kullanmalı?
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Sıralama algoritması seçimi, kullanım senaryonuza bağlı olarak
            değişir:
          </p>

          <ul>
            <li>
              <strong>Bubble, Selection, Insertion Sort:</strong> Küçük veri
              setleri (n {'<'} 1000) ve öğretici amaçlar için idealdir.
              Insertion Sort, neredeyse sıralı veriler için oldukça verimlidir.
            </li>
            <li>
              <strong>Quick Sort:</strong> Genel amaçlı kullanım için sıklıkla
              tercih edilir ve pratik performansı genellikle mükemmeldir. Bellek
              verimli yapısı, birçok dil ve kütüphanede standart sıralama
              algoritması olarak kullanılmasını sağlar.
            </li>
            <li>
              <strong>Merge Sort:</strong> Kararlı bir sıralama gerektiğinde ve
              ekstra bellek kullanımının sorun olmadığı durumlarda idealdir.
              Büyük veri setleri ve dış sıralama (external sorting) için
              uygundur.
            </li>
            <li>
              <strong>Heap Sort:</strong> Sınırlı bellek koşullarında büyük veri
              setleri için iyi bir seçenektir ve en kötü durumda bile tutarlı
              O(n log n) performansı sunar.
            </li>
            <li>
              <strong>Counting ve Radix Sort:</strong> Değer aralığı sınırlı
              olan integer veri setleri için çok verimlidir ve doğru koşullarda
              lineer zaman karmaşıklığı sunar.
            </li>
          </ul>

          <p>
            Modern programlama dillerinin çoğu, performans ve kararlılık için
            optimize edilmiş, genellikle Quick Sort, Merge Sort veya bunların
            hibrit versiyonlarını içeren dahili sıralama işlevleri sunar.
          </p>
        </div>
      </section>
    </div>
  );
}
