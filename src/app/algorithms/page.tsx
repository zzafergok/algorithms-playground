import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Kategori tipini tanımla
interface Category {
  title: string;
  slug: string;
  description: string;
  algorithms: Algorithm[];
  icon?: React.ReactNode;
}

// Algoritma tipini tanımla
interface Algorithm {
  name: string;
  slug: string;
  description: string;
  difficulty?: 'Kolay' | 'Orta' | 'Zor';
}

export default function AlgorithmsPage() {
  // Tüm algoritma kategorilerini tanımla
  const algorithmCategories: Category[] = [
    {
      title: 'Sıralama Algoritmaları',
      slug: 'sorting',
      description:
        'Verileri belirli bir düzende sıralamak için kullanılan algoritmalar',
      algorithms: [
        {
          name: 'Bubble Sort',
          slug: 'bubble-sort',
          description:
            'Her adımda komşu elemanları karşılaştırarak ve gerekirse değiştirerek çalışan basit bir sıralama algoritması.',
          difficulty: 'Kolay',
        },
        {
          name: 'Selection Sort',
          slug: 'selection-sort',
          description:
            'Her adımda dizideki en küçük elemanı bulup uygun konuma yerleştiren algoritma.',
          difficulty: 'Kolay',
        },
        {
          name: 'Insertion Sort',
          slug: 'insertion-sort',
          description:
            'Elemanları teker teker alıp sıralı alt listeye uygun konuma yerleştiren algoritma.',
          difficulty: 'Kolay',
        },
        {
          name: 'Merge Sort',
          slug: 'merge-sort',
          description:
            'Böl ve fethet yaklaşımını kullanarak diziyi parçalara ayırıp sıralayarak birleştiren algorima.',
          difficulty: 'Orta',
        },
        {
          name: 'Quick Sort',
          slug: 'quick-sort',
          description:
            'Pivot eleman seçerek diziyi bölen ve alt dizileri sıralayan hızlı bir algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Arama Algoritmaları',
      slug: 'searching',
      description:
        'Veri yapılarında eleman bulmak için kullanılan algoritmalar',
      algorithms: [
        {
          name: 'Linear Search',
          slug: 'linear-search',
          description:
            'Bir dizide elemanları sırayla kontrol ederek arama yapan en basit algoritma.',
          difficulty: 'Kolay',
        },
        {
          name: 'Binary Search',
          slug: 'binary-search',
          description:
            'Sıralı dizilerde, her adımda arama alanını yarıya bölerek logaritmik zamanda arama yapan algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Graf Algoritmaları',
      slug: 'graph-algorithms',
      description: 'Graf veri yapıları üzerinde işlem yapan algoritmalar',
      algorithms: [
        {
          name: 'Breadth-First Search (BFS)',
          slug: 'bfs',
          description:
            'Grafı seviye seviye dolaşan, en kısa yolu bulma ve seviye tabanlı işlemlerde kullanılan algortima.',
          difficulty: 'Orta',
        },
        {
          name: 'Depth-First Search (DFS)',
          slug: 'dfs',
          description:
            'Grafı derinlemesine dolaşan, bağlantılı bileşenler ve çevrim tespitinde kullanılan algoritma.',
          difficulty: 'Orta',
        },
        {
          name: "Dijkstra's Algorithm",
          slug: 'dijkstra',
          description:
            'Bir düğümden diğer tüm düğümlere olan en kısa yolları bulan, ağırlıklı graflarda kullanılan algoritma.',
          difficulty: 'Zor',
        },
        {
          name: 'Bellman-Ford Algorithm',
          slug: 'bellman-ford',
          description:
            'Negatif ağırlıklı kenarları olan graflarda en kısa yolları bulan ve negatif çevrimleri tespit eden algoritma.',
          difficulty: 'Zor',
        },
      ],
    },
    {
      title: 'Veri Yapıları',
      slug: 'data-structures',
      description: 'Verileri organize etme ve saklama yöntemleri',
      algorithms: [
        {
          name: 'Linked List',
          slug: 'linked-list',
          description:
            'Her düğümün veri ve bir sonraki düğüme referans içerdiği dinamik bir veri yapısı.',
          difficulty: 'Kolay',
        },
        {
          name: 'Stack',
          slug: 'stack',
          description:
            'Son giren ilk çıkar (LIFO) prensibiyle çalışan, yalnızca en üstteki elemana erişim sağlayan veri yapısı.',
          difficulty: 'Kolay',
        },
        {
          name: 'Queue',
          slug: 'queue',
          description:
            'İlk giren ilk çıkar (FIFO) prensibiyle çalışan, elemanları sırayla işleyen veri yapısı.',
          difficulty: 'Kolay',
        },
        {
          name: 'Binary Search Tree',
          slug: 'binary-search-tree',
          description:
            'Her düğümün en fazla iki çocuğa sahip olduğu, hızlı arama, ekleme ve silme işlemlerine olanak tanıyan hiyerarşik yapı.',
          difficulty: 'Orta',
        },
        {
          name: 'Hash Table',
          slug: 'hash-table',
          description:
            'Anahtarları değerlere eşleyen, sabit zamanlı erişim sağlayan veri yapısı.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Dinamik Programlama',
      slug: 'dynamic-programming',
      description:
        'Karmaşık problemleri alt problemlere bölerek çözen yöntemler',
      algorithms: [
        {
          name: 'Fibonacci',
          slug: 'fibonacci',
          description:
            'Her sayının kendinden önceki iki sayının toplamı olduğu, memoization ile verimli hesaplanabilen dizi.',
          difficulty: 'Kolay',
        },
        {
          name: 'Knapsack Problem',
          slug: 'knapsack',
          description:
            'Belirli bir ağırlık kapasitesindeki çantaya, maksimum değere sahip nesneleri yerleştirme problemi.',
          difficulty: 'Orta',
        },
        {
          name: 'Longest Common Subsequence',
          slug: 'longest-common-subsequence',
          description:
            'İki dizi arasındaki en uzun ortak alt diziyi bulan algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Geri İzleme Algoritmaları',
      slug: 'backtracking',
      description:
        'Bir problem için olası tüm çözümleri adım adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen bir algoritma stratejisi',
      algorithms: [
        {
          name: 'N-Queens Problem',
          slug: 'n-queens',
          description:
            'N adet veziri, birbirlerini tehdit etmeyecek şekilde N×N boyutundaki satranç tahtasına yerleştirme problemi.',
          difficulty: 'Orta',
        },
        {
          name: 'Subset Sum Problem',
          slug: 'subset-sum',
          description:
            'Bir dizi içerisindeki sayıların alt kümelerinin toplamının belirli bir değere eşit olup olmadığını bulan algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Açgözlü Algoritmalar',
      slug: 'greedy-algorithms',
      description:
        'Her adımda en iyi görünen seçimi yaparak global optimum çözüm arayan problem çözme yaklaşımı',
      algorithms: [
        {
          name: 'Fractional Knapsack',
          slug: 'fractional-knapsack',
          description:
            'Nesneleri ağırlık/değer oranına göre sıralayarak çantaya yerleştiren, nesnelerin bölünebilir olduğu çanta problemi çözümü.',
          difficulty: 'Orta',
        },
        {
          name: 'Huffman Coding',
          slug: 'huffman-coding',
          description:
            'Karakterlerin frekanslarına göre değişken uzunluklu kodlar atayan, veri sıkıştırma için kullanılan algoritma.',
          difficulty: 'Zor',
        },
      ],
    },
    {
      title: 'Böl ve Fethet Algoritmaları',
      slug: 'divide-and-conquer',
      description:
        'Problemi aynı tipte daha küçük alt problemlere bölen, çözen ve sonuçları birleştiren algoritma tasarım yaklaşımı',
      algorithms: [
        {
          name: 'Merge Sort',
          slug: 'sorting/merge-sort',
          description:
            'Diziyi iki parçaya bölen, her parçayı sıralayan ve sonra birleştiren etkili bir sıralama algoritması.',
          difficulty: 'Orta',
        },
        {
          name: 'Quick Sort',
          slug: 'sorting/quick-sort',
          description:
            'Pivot seçerek diziyi bölen ve her bölümü tekrar eden şekilde sıralayan hızlı sıralama algoritması.',
          difficulty: 'Orta',
        },
        {
          name: 'Binary Search',
          slug: 'searching/binary-search',
          description:
            'Sıralı dizilerde, her adımda arama alanını yarıya indirerek logaritmik zamanda arama yapan algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Metin İşleme Algoritmaları',
      slug: 'string-algorithms',
      description:
        'String veriler üzerinde arama, eşleştirme, düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalar',
      algorithms: [
        {
          name: 'Rabin-Karp Algorithm',
          slug: 'rabin-karp',
          description:
            'Metin içerisinde desen aramak için hash değerlerini kullanan string eşleştirme algoritması.',
          difficulty: 'Orta',
        },
        {
          name: 'KMP Algorithm',
          slug: 'kmp',
          description:
            'Önek tablosu kullanarak metinde desen aramayı verimli hale getiren string eşleştirme algoritması.',
          difficulty: 'Zor',
        },
      ],
    },
    {
      title: 'Matematiksel Algoritmalar',
      slug: 'mathematical-algorithms',
      description:
        'Matematiksel problemleri çözmek ve matematiksel hesaplamalar yapmak için kullanılan algoritmalar',
      algorithms: [
        {
          name: 'GCD (Euclidean Algorithm)',
          slug: 'gcd',
          description:
            'İki veya daha fazla sayının en büyük ortak bölenini bulan etkili bir algoritma.',
          difficulty: 'Kolay',
        },
        {
          name: 'Sieve of Eratosthenes',
          slug: 'sieve-of-eratosthenes',
          description:
            'Belirli bir sayıya kadar olan tüm asal sayıları hızlı bir şekilde bulan algoritma.',
          difficulty: 'Kolay',
        },
      ],
    },
    {
      title: 'Kümeleme Algoritmaları',
      slug: 'clustering-algorithms',
      description:
        'Benzer özelliklere sahip verileri gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleri',
      algorithms: [
        {
          name: 'K-Means',
          slug: 'k-means',
          description:
            'Verileri K adet kümeye ayıran, her kümenin merkezi etrafında gruplandıran popüler bir kümeleme algoritması.',
          difficulty: 'Orta',
        },
        {
          name: 'Hierarchical Clustering',
          slug: 'hierarchical-clustering',
          description:
            'Verileri hiyerarşik bir ağaç yapısında gruplayan, farklı seviyelerde kümeleme imkanı sunan algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'Optimizasyon Algoritmaları',
      slug: 'optimization-algorithms',
      description:
        'Belirli bir problem için olası çözümler arasından en iyi çözümü bulmayı amaçlayan algoritmalar',
      algorithms: [
        {
          name: 'Simulated Annealing',
          slug: 'simulated-annealing',
          description:
            'Fiziksel tavlama işlemini taklit eden, global optimum çözüm arayan bir metasezgisel yöntem.',
          difficulty: 'Zor',
        },
        {
          name: 'Genetic Algorithms',
          slug: 'genetic-algorithms',
          description:
            'Doğal evrim süreçlerini taklit eden, popülasyon tabanlı meta-sezgisel optimizasyon algoritması.',
          difficulty: 'Zor',
        },
      ],
    },
    {
      title: 'Diğer Önemli Algoritmalar',
      slug: 'misc-algorithms',
      description:
        'Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar',
      algorithms: [
        {
          name: 'Bloom Filter',
          slug: 'bloom-filter',
          description:
            'Bir elemanın bir kümede bulunup bulunmadığını hızlı şekilde kontrol eden, olasılıksal veri yapısı.',
          difficulty: 'Orta',
        },
        {
          name: 'Reservoir Sampling',
          slug: 'reservoir-sampling',
          description:
            'Bilinmeyen boyuttaki veri akışından rastgele örneklem almaya yarayan algoritma.',
          difficulty: 'Orta',
        },
      ],
    },
    {
      title: 'İleri Seviye Algoritmalar',
      slug: 'advanced-algorithms',
      description:
        'Karmaşık problemleri çözmek için optimize edilmiş, özel durumlara yönelik geliştirilmiş algoritmalar',
      algorithms: [
        {
          name: "Floyd's Cycle-Finding",
          slug: 'floyd-cycle-finding',
          description:
            "Bağlı listelerde döngüleri bulmak için kullanılan verimli bir algoritma. 'Tortoise and Hare' olarak da bilinir.",
          difficulty: 'Zor',
        },
        {
          name: 'Topological Sort',
          slug: 'topological-sort',
          description:
            'Yönlü asiklik graflarda (DAG) düğümleri bağımlılıklarına göre sıralayan algoritma.',
          difficulty: 'Zor',
        },
      ],
    },
  ];

  // Zorluk seviyesi için kullanılacak badge renklerini tanımla
  const difficultyBadgeVariant = (difficulty?: string) => {
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
    <div className="space-y-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Algoritma Kütüphanesi
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Tüm algoritma kategorilerini keşfedin, interaktif görselleştirmeler ve
          detaylı açıklamalarla algoritmaların nasıl çalıştığını öğrenin.
        </p>
      </div>

      {/* Algoritma Seçimi İpuçları Bölümü */}
      <div className="mt-12 p-6 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Algoritma Seçimi Rehberi</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            İhtiyacınıza uygun algoritma seçmek, sorununuzun verimli çözümü için
            kritik öneme sahiptir. İşte algoritma seçerken göz önünde
            bulundurmanız gereken bazı faktörler:
          </p>

          <ul>
            <li>
              <strong>Problem Tipi:</strong> Sıralama, arama, optimizasyon gibi
              temel problem tipiniz nedir?
            </li>
            <li>
              <strong>Veri Boyutu:</strong> Çok büyük veri kümeleri için
              asimptotik karmaşıklığı daha düşük algoritmalar tercih
              edilmelidir.
            </li>
            <li>
              <strong>Zaman ve Alan Kısıtlamaları:</strong> Hızlı çalışma mı
              yoksa düşük bellek kullanımı mı daha önemli?
            </li>
            <li>
              <strong>İşlem Tipi:</strong> Dinamik veri mi yoksa statik veri mi
              işlenecek?
            </li>
            <li>
              <strong>Uygulama Ortamı:</strong> Algoritmanın çalışacağı platform
              veya sistem özellikleri.
            </li>
          </ul>

          <p>
            Bu platformda sunulan algoritmalar, çeşitli problem türlerine
            yönelik çözümleri ve bunların uygulanma şekillerini göstermektedir.
            Her algoritmanın avantajları, dezavantajları ve karmaşıklık
            analizleri detaylı olarak incelenmiştir.
          </p>
        </div>
      </div>

      {/* Algoritma Kategorileri Özeti */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithmCategories.map((category) => (
          <Card
            key={category.slug}
            className="algorithm-card hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="text-sm font-medium">İçerdiği Algoritmalar:</p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                  {category.algorithms.slice(0, 3).map((algo) => (
                    <li key={algo.slug}>{algo.name}</li>
                  ))}
                  {category.algorithms.length > 3 && (
                    <li>
                      <span className="text-primary">
                        +{category.algorithms.length - 3} daha...
                      </span>
                    </li>
                  )}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full relative">
                <Link href={`/algorithms/${category.slug}`}>
                  <span className="absolute inset-0 flex items-center justify-center">
                    Kategoriyi Keşfet
                  </span>
                  <ArrowRight className="absolute right-4 bottom-3 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Tüm Algoritmalar Listesi */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Tüm Algoritmalar
        </h2>

        <div className="bg-muted/30 rounded-lg p-6">
          {/* Tüm kategorileri yeni sekmelerde göster */}
          <div className="space-y-10">
            {algorithmCategories.map((category) => (
              <div key={category.slug} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">{category.title}</h3>
                  <Button asChild variant="link" size="sm">
                    <Link href={`/algorithms/${category.slug}`}>
                      Tümünü Gör
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.algorithms.map((algorithm) => (
                    <Card
                      key={algorithm.slug}
                      className="overflow-hidden hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{algorithm.name}</h4>
                          {algorithm.difficulty && (
                            <Badge
                              variant={difficultyBadgeVariant(
                                algorithm.difficulty
                              )}
                            >
                              {algorithm.difficulty}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {algorithm.description}
                        </p>
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="mt-2"
                        >
                          <Link
                            href={`/algorithms/${category.slug}/${algorithm.slug}`}
                            className="flex justify-between items-center gap-3"
                          >
                            <span className="flex-grow text-center">
                              İncele
                            </span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
