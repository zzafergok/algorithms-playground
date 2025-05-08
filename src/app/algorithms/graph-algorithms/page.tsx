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

export default function GraphAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Breadth-First Search (BFS)',
      path: '/algorithms/graph-algorithms/bfs',
      description:
        'Grafı seviye seviye dolaşan, en kısa yolu bulma ve seviye tabanlı işlemlerde kullanılan algortima.',
    },
    {
      name: 'Depth-First Search (DFS)',
      path: '/algorithms/graph-algorithms/dfs',
      description:
        'Grafı derinlemesine dolaşan, bağlantılı bileşenler ve çevrim tespitinde kullanılan algoritma.',
    },
    {
      name: "Dijkstra's Algorithm",
      path: '/algorithms/graph-algorithms/dijkstra',
      description:
        'Bir düğümden diğer tüm düğümlere olan en kısa yolları bulan, ağırlıklı graflarda kullanılan algoritma.',
    },
    {
      name: 'Bellman-Ford Algorithm',
      path: '/algorithms/graph-algorithms/bellman-ford',
      description:
        'Negatif ağırlıklı kenarları olan graflarda en kısa yolları bulan ve negatif çevrimleri tespit eden algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Graf Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Graf algoritmaları, düğümler ve bu düğümleri birbirine bağlayan
          kenarlardan oluşan veri yapıları üzerinde çalışan algoritmalardır. Ağ
          analizi, yol bulma, optimizasyon gibi birçok alanda kullanılırlar.
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
        <h2 className="text-2xl font-bold mb-4">Graf Algoritmaları Hakkında</h2>
        <div className="max-w-none">
          <p>
            Graf algoritmaları, düğümler (nodes) ve kenarlardan (edges) oluşan
            graf veri yapıları üzerinde çalışan algoritmalardır. Bu
            algoritmalar, sosyal ağlar, haritalar, bilgisayar ağları, ve
            moleküler yapılar gibi birçok gerçek dünya problemini modellemek ve
            çözmek için kullanılır.
          </p>

          <p className="mt-4">Graflar genellikle iki temel türde olabilir:</p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Yönlendirilmiş Graf (Directed Graph):</strong> Kenarların
              bir yönü vardır ve düğümler arasındaki ilişki tek yönlüdür.
            </li>
            <li>
              <strong>Yönlendirilmemiş Graf (Undirected Graph):</strong>{' '}
              Kenarların yönü yoktur ve düğümler arasındaki ilişki çift
              yönlüdür.
            </li>
          </ul>

          <p className="mt-4">
            Graf algoritmaları genellikle şu kategorilerde gruplandırılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Gezinme Algoritmaları:</strong> BFS (Breadth-First Search)
              ve DFS (Depth-First Search) gibi algoritmalar, grafta düğümler
              arasında dolaşmak için kullanılır.
            </li>
            <li>
              <strong>En Kısa Yol Algoritmaları:</strong> Dijkstra, Bellman-Ford
              ve Floyd-Warshall gibi algoritmalar, iki düğüm arasındaki en kısa
              yolu bulmak için kullanılır.
            </li>
            <li>
              <strong>Minimum Yayılma Ağacı Algoritmaları:</strong> Kruskal ve
              Prim algoritmaları, grafın tüm düğümlerini birbirine bağlayan
              minimum ağırlıklı kenar kümesini bulmak için kullanılır.
            </li>
            <li>
              <strong>Akış Algoritmaları:</strong> Ford-Fulkerson gibi
              algoritmalar, bir ağda maksimum akışı belirlemek için kullanılır.
            </li>
            <li>
              <strong>Çevrim Tespit Algoritmaları:</strong> Graf içindeki
              döngüleri veya çevrimleri tespit etmek için kullanılır.
            </li>
          </ul>

          <p className="mt-4">
            Graf algoritmaları yaygın olarak şu alanlarda kullanılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Navigasyon sistemleri ve harita uygulamaları</li>
            <li>Sosyal ağ analizi</li>
            <li>İnternet ve bilgisayar ağları</li>
            <li>Biyolojik ağlar ve protein etkileşimleri</li>
            <li>Öneri sistemleri</li>
            <li>Yapay zeka ve makine öğrenmesi</li>
            <li>Veri madenciliği ve büyük veri analizi</li>
          </ul>

          <p className="mt-4">
            Graf algoritmaları, karmaşık ilişkisel verileri analiz etmek ve
            optimize etmek için güçlü araçlardır ve bilgisayar biliminin temel
            konularından biridir.
          </p>
        </div>
      </div>
    </div>
  );
}
