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

export default function DataStructuresPage() {
  const dataStructures = [
    {
      name: 'Linked List',
      path: '/algorithms/data-structures/linked-list',
      description:
        'Her düğümün veri ve bir sonraki düğüme referans içerdiği dinamik bir veri yapısı.',
      category: 'Linear',
      difficulty: 'Kolay',
    },
    {
      name: 'Stack',
      path: '/algorithms/data-structures/stack',
      description:
        'Son giren ilk çıkar (LIFO) prensibiyle çalışan, yalnızca en üstteki elemana erişim sağlayan veri yapısı.',
      category: 'Linear',
      difficulty: 'Kolay',
    },
    {
      name: 'Queue',
      path: '/algorithms/data-structures/queue',
      description:
        'İlk giren ilk çıkar (FIFO) prensibiyle çalışan, elemanları sırayla işleyen veri yapısı.',
      category: 'Linear',
      difficulty: 'Kolay',
    },
    {
      name: 'Binary Search Tree',
      path: '/algorithms/data-structures/binary-search-tree',
      description:
        'Her düğümün en fazla iki çocuğa sahip olduğu, hızlı arama, ekleme ve silme işlemlerine olanak tanıyan hiyerarşik yapı.',
      category: 'Tree',
      difficulty: 'Orta',
    },
    {
      name: 'Hash Table',
      path: '/algorithms/data-structures/hash-table',
      description:
        'Anahtarları değerlere eşleyen, hash fonksiyonu kullanarak sabit zamanlı erişim sağlayan veri yapısı.',
      category: 'Hash-based',
      difficulty: 'Orta',
    },
    {
      name: 'Trie (Prefix Tree)',
      path: '/algorithms/data-structures/trie',
      description:
        'String verilerini verimli şekilde saklamak ve prefix tabanlı aramalar yapmak için kullanılan ağaç yapısı.',
      category: 'Tree',
      difficulty: 'Orta',
    },
    {
      name: 'Segment Tree',
      path: '/algorithms/data-structures/segment-tree',
      description:
        'Aralık sorguları ve nokta güncellemeleri için optimize edilmiş, logaritmik performans sağlayan ağaç yapısı.',
      category: 'Tree',
      difficulty: 'Zor',
    },
  ];

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'Linear':
        return 'default';
      case 'Tree':
        return 'secondary';
      case 'Hash-based':
        return 'outline';
      default:
        return 'secondary';
    }
  };

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
        <h1 className="text-4xl font-bold tracking-tight">Veri Yapıları</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Veri yapıları, verileri organize etme, saklama ve işleme yöntemlerini
          tanımlayan programlama kavramlarıdır. Etkili algoritmalar tasarlamanın
          temelini oluştururlar ve yazılım geliştirmenin kritik bileşenleridir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dataStructures.map((structure) => (
          <Card
            key={structure.name}
            className="algorithm-card flex flex-col hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight">
                  {structure.name}
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant={getCategoryBadgeVariant(structure.category)}
                    className="text-xs"
                  >
                    {structure.category}
                  </Badge>
                  <Badge
                    variant={getDifficultyBadgeVariant(structure.difficulty)}
                    className="text-xs"
                  >
                    {structure.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                {structure.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link
                  href={structure.path}
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
        <h2 className="text-2xl font-bold mb-4">Veri Yapıları Hakkında</h2>
        <div className="max-w-none space-y-4">
          <p>
            Veri yapıları, verileri organize etme ve işleme yöntemlerini
            sağlayan programlama konseptleridir. Doğru veri yapısı seçimi,
            algoritmaların verimliliğini ve performansını doğrudan etkileyen
            kritik bir faktördür. Her veri yapısının kendine özgü avantajları,
            dezavantajları ve optimal kullanım alanları bulunmaktadır.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2">Temel Kategoriler</h3>
            <p>
              Veri yapıları genel olarak iki ana kategoriye ayrılır. İlkel veri
              yapıları tamsayılar, kayan noktalı sayılar ve karakterler gibi
              doğrudan değerleri temsil eden basit veri tiplerini kapsar. Soyut
              veri yapıları ise daha karmaşık veri organizasyonlarını tanımlayan
              üst düzey yapılardır ve diziler, bağlı listeler, yığınlar,
              kuyruklar, ağaçlar, grafikler ve hash tablolar bu kategoriye
              girer.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Veri Yapısı Türleri</h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Doğrusal Veri Yapıları (Linear)</h4>
                <p className="text-sm text-muted-foreground">
                  Elemanların sıralı bir şekilde organize edildiği yapılardır.
                  Linked List, Stack, Queue gibi yapılar bu kategoriye girer.
                  Her eleman kendinden önceki ve sonraki elemanla doğrudan
                  ilişki içindedir.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Ağaç Yapıları (Tree)</h4>
                <p className="text-sm text-muted-foreground">
                  Hiyerarşik organizasyon sağlayan yapılardır. Binary Search
                  Tree, Trie, Segment Tree gibi yapılar farklı problemler için
                  optimize edilmiş ağaç implementasyonlarıdır. Logaritmik
                  performans ve organize veri erişimi sağlarlar.
                </p>
              </div>

              <div>
                <h4 className="font-medium">
                  Hash Tabanlı Yapılar (Hash-based)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hash fonksiyonları kullanarak sabit zamanlı erişim sağlayan
                  yapılardır. Hash Table anahtar-değer eşleştirmesi için
                  optimize edilmiş olup, ortalama durumda O(1) performans sunar.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Detaylı Veri Yapısı Özellikleri
            </h3>
            <div className="space-y-2">
              <div>
                <h4 className="font-medium">Diziler (Arrays):</h4>
                <p className="text-sm text-muted-foreground">
                  Ardışık bellek konumlarında saklanan sabit boyutlu
                  koleksiyonlar. İndeksleme ile hızlı erişim sağlar ancak
                  dinamik boyut değişikliği desteklemez.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Bağlı Listeler (Linked Lists):</h4>
                <p className="text-sm text-muted-foreground">
                  Dinamik boyutlu, her elemanın bir sonrakine işaret ettiği
                  yapılar. Ekleme ve silme işlemleri verimlidir ancak rastgele
                  erişim mümkün değildir.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Yığınlar (Stacks):</h4>
                <p className="text-sm text-muted-foreground">
                  Son giren ilk çıkar (LIFO) prensibiyle çalışır. Fonksiyon
                  çağrıları, geri alma özellikleri ve expression evaluation için
                  idealdir.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Kuyruklar (Queues):</h4>
                <p className="text-sm text-muted-foreground">
                  İlk giren ilk çıkar (FIFO) prensibiyle çalışır. İş sıralaması,
                  mesaj kuyruklama ve breadth-first search implementasyonları
                  için kullanılır.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Binary Search Tree:</h4>
                <p className="text-sm text-muted-foreground">
                  Hiyerarşik yapıdır, arama ve sıralama işlemleri için
                  etkilidir. Balanced tree varyantları logaritmik performans
                  garantisi sağlar.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Trie (Prefix Tree):</h4>
                <p className="text-sm text-muted-foreground">
                  String verilerini prefix tabanlı organize eden ağaç yapısı.
                  Autocomplete, dictionary implementasyonları ve string pattern
                  matching için idealdir.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Segment Tree:</h4>
                <p className="text-sm text-muted-foreground">
                  Aralık sorguları (range queries) için optimize edilmiş ağaç
                  yapısı. Toplam, minimum, maksimum gibi aggregate operasyonları
                  logaritmik zamanda gerçekleştirir.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Hash Tablolar (Hash Tables):</h4>
                <p className="text-sm text-muted-foreground">
                  Anahtarları değerlere eşleyen, ortalama durumda sabit zamanlı
                  erişim sağlayan yapılardır. Dictionary implementasyonları ve
                  caching sistemleri için kritiktir.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Veri Yapısı Seçim Kriterleri
            </h3>
            <p>
              Doğru veri yapısını seçmek, algoritma tasarımının kritik bir
              parçasıdır ve çözülecek problem türü, veri boyutu, işlem tipleri
              ve performans gereksinimleri göz önünde bulundurularak belirlenir.
              Erişim sıklığı, güncellenme paternleri, bellek kısıtlamaları ve
              zaman karmaşıklığı gereksinimleri de seçim sürecinde önemli
              faktörlerdir.
            </p>
          </div>

          <p>
            Modern yazılım geliştirmede veri yapıları, sadece teorik kavramlar
            değil, günlük programlama pratiğinin ayrılmaz parçalarıdır.
            Veritabanı tasarımından kullanıcı arayüzü geliştirmeye, sistem
            programlamadan web uygulamalarına kadar her alanda doğru veri yapısı
            seçimi, performanslı ve ölçeklenebilir çözümler üretmenin temelidir.
          </p>
        </div>
      </div>
    </div>
  );
}
