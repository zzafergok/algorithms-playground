import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import {
  Card,
  CardTitle,
  CardFooter,
  CardContent,
  CardHeader,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function GraphAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Breadth-First Search (BFS)',
      path: '/algorithms/graph-algorithms/bfs',
      description:
        'Grafı seviye seviye dolaşan, en kısa yolu bulma ve seviye tabanlı işlemlerde kullanılan algoritma.',
      category: 'Traversal',
      difficulty: 'Kolay',
    },
    {
      name: 'Depth-First Search (DFS)',
      path: '/algorithms/graph-algorithms/dfs',
      description:
        'Grafı derinlemesine dolaşan, bağlantılı bileşenler ve çevrim tespitinde kullanılan algoritma.',
      category: 'Traversal',
      difficulty: 'Kolay',
    },
    {
      name: "Dijkstra's Algorithm",
      path: '/algorithms/graph-algorithms/dijkstra',
      description:
        'Bir düğümden diğer tüm düğümlere olan en kısa yolları bulan, ağırlıklı graflarda kullanılan algoritma.',
      category: 'Shortest Path',
      difficulty: 'Orta',
    },
    {
      name: 'A* (A-Star) Algorithm',
      path: '/algorithms/graph-algorithms/a-star',
      description:
        'Heuristik fonksiyon kullanarak hedef odaklı en kısa yol bulan, oyun ve robotik alanlarında yaygın kullanılan algoritma.',
      category: 'Shortest Path',
      difficulty: 'Orta',
    },
    {
      name: 'Bellman-Ford Algorithm',
      path: '/algorithms/graph-algorithms/bellman-ford',
      description:
        'Negatif ağırlıklı kenarları olan graflarda en kısa yolları bulan ve negatif çevrimleri tespit eden algoritma.',
      category: 'Shortest Path',
      difficulty: 'Zor',
    },
    {
      name: 'Floyd-Warshall Algorithm',
      path: '/algorithms/graph-algorithms/floyd-warshall',
      description:
        'Tüm düğüm çiftleri arasındaki en kısa yolları bulan, dinamik programlama tabanlı algoritma.',
      category: 'Shortest Path',
      difficulty: 'Zor',
    },
    {
      name: "Kruskal's Algorithm",
      path: '/algorithms/graph-algorithms/kruskal',
      description:
        'Kenar tabanlı yaklaşımla minimum yayılma ağacı bulan, Union-Find veri yapısını kullanan algoritma.',
      category: 'MST',
      difficulty: 'Orta',
    },
    {
      name: "Prim's Algorithm",
      path: '/algorithms/graph-algorithms/prim',
      description:
        'Düğüm tabanlı yaklaşımla minimum yayılma ağacı bulan, öncelik kuyruğu kullanan algoritma.',
      category: 'MST',
      difficulty: 'Orta',
    },
  ];

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'Traversal':
        return 'default';
      case 'Shortest Path':
        return 'secondary';
      case 'MST':
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
        <h1 className="text-4xl font-bold tracking-tight">
          Graf Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Graf algoritmaları, düğümler ve bu düğümleri birbirine bağlayan
          kenarlardan oluşan veri yapıları üzerinde çalışan algoritmalardır. Ağ
          analizi, yol bulma, optimizasyon ve bağlantı analizi gibi birçok
          alanda kritik öneme sahiptir.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {algorithms.map((algorithm) => (
          <Card
            key={algorithm.name}
            className="algorithm-card flex flex-col hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-lg leading-tight">
                  {algorithm.name}
                </CardTitle>
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant={getCategoryBadgeVariant(algorithm.category)}
                    className="text-xs"
                  >
                    {algorithm.category}
                  </Badge>
                  <Badge
                    variant={getDifficultyBadgeVariant(algorithm.difficulty)}
                    className="text-xs"
                  >
                    {algorithm.difficulty}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
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
        <h2 className="text-2xl font-bold mb-4">Graf Algoritmaları Hakkında</h2>
        <div className="max-w-none space-y-4">
          <p>
            Graf algoritmaları, düğümler (nodes) ve kenarlardan (edges) oluşan
            graf veri yapıları üzerinde çalışan algoritmalardır. Bu
            algoritmalar, sosyal ağlar, haritalar, bilgisayar ağları, moleküler
            yapılar ve birçok gerçek dünya problemini modellemek ve çözmek için
            kullanılır.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-2">Graf Türleri</h3>
            <p>
              Graflar temel yapılarına göre farklı kategorilerde incelenir.
              Yönlendirilmiş graflar (directed graphs) kenarların belirli bir
              yönü olduğu yapılardır, yönlendirilmemiş graflar (undirected
              graphs) ise çift yönlü bağlantıları temsil eder. Ağırlıklı graflar
              kenarlara sayısal değerler atayarak mesafe, maliyet veya kapasite
              gibi kavramları modellerken, ağırlıksız graflar sadece bağlantı
              durumunu gösterir.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Algorithm Kategorileri
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">
                  Gezinme Algoritmaları (Traversal)
                </h4>
                <p className="text-sm text-muted-foreground">
                  BFS ve DFS gibi algoritmalar, grafta düğümler arasında
                  sistematik dolaşım sağlar. Bağlantılı bileşenlerin tespiti,
                  çevrim bulma ve topolojik sıralama gibi temel işlemler için
                  kullanılır.
                </p>
              </div>

              <div>
                <h4 className="font-medium">
                  En Kısa Yol Algoritmaları (Shortest Path)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Dijkstra, A*, Bellman-Ford ve Floyd-Warshall algoritmaları
                  farklı graf türlerinde optimal yol bulma problemlerini çözer.
                  Navigasyon sistemleri, ağ yönlendirme ve lojistik
                  optimizasyonunda kritik role sahiptir.
                </p>
              </div>

              <div>
                <h4 className="font-medium">Minimum Yayılma Ağacı (MST)</h4>
                <p className="text-sm text-muted-foreground">
                  Kruskal ve Prim algoritmaları, tüm düğümleri birbirine
                  bağlayan minimum maliyetli kenar kümesini bulur. Ağ tasarımı,
                  kablolama planlaması ve kümeleme uygulamalarında yaygın olarak
                  kullanılır.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Uygulama Alanları</h3>
            <p>
              Graf algoritmaları günlük hayatımızın birçok alanında yer alır.
              Navigasyon sistemleri ve harita uygulamaları en kısa yol
              algoritmalarını kullanırken, sosyal ağ platformları bağlantı
              analizi için graf yapılarından yararlanır. İnternet ve bilgisayar
              ağlarında veri yönlendirme, biyolojik araştırmalarda protein
              etkileşim ağları, öneri sistemlerinde kullanıcı-ürün ilişkileri,
              yapay zeka ve makine öğrenmesinde özellik çıkarımı, veri
              madenciliği ve büyük veri analizinde pattern tanıma gibi çok
              çeşitli alanlarda kritik işlevler üstlenir.
            </p>
          </div>

          <p>
            Graf algoritmaları, karmaşık ilişkisel verileri analiz etmek,
            optimize etmek ve anlamak için güçlü araçlar sunar. Bu algoritmalar
            bilgisayar biliminin temel konularından birini oluşturarak, modern
            teknolojinin birçok alanında vazgeçilmez bileşenler haline
            gelmiştir.
          </p>
        </div>
      </div>
    </div>
  );
}
