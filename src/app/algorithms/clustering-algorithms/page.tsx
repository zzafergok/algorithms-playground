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

export default function ClusteringAlgorithmsPage() {
  const algorithms = [
    {
      name: 'K-Means',
      path: '/algorithms/clustering-algorithms/k-means',
      description:
        'Verileri K adet kümeye ayıran, her kümenin merkezi etrafında gruplandıran popüler bir kümeleme algoritması.',
    },
    {
      name: 'Hierarchical Clustering',
      path: '/algorithms/clustering-algorithms/hierarchical-clustering',
      description:
        'Verileri hiyerarşik bir ağaç yapısında gruplayan, farklı seviyelerde kümeleme imkanı sunan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Kümeleme Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Kümeleme algoritmaları, benzer özelliklere sahip verileri
          gruplandırmak için kullanılan gözetimsiz öğrenme yöntemleridir. Bu
          algoritmalar, veri analizinde, müşteri segmentasyonunda ve desen
          tanımada yaygın olarak kullanılır.
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
          Kümeleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Kümeleme algoritmaları, etiketlenmemiş verileri benzerliklerine göre
            gruplara ayırmak için kullanılan gözetimsiz öğrenme yöntemleridir.
            Bu algoritmalar, veri içindeki doğal grupları veya kalıpları
            keşfetmeyi amaçlar.
          </p>
          <p>Temel kümeleme yöntemleri şu şekilde sınıflandırılabilir:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Bölümleyici Kümeleme:</strong> Veriyi önceden belirlenen
              sayıda kümeye ayırır (K-Means gibi).
            </li>
            <li>
              <strong>Hiyerarşik Kümeleme:</strong> Veriyi bir ağaç yapısında
              gruplar, farklı kümeleme seviyeleri sunar.
            </li>
            <li>
              <strong>Yoğunluk Bazlı Kümeleme:</strong> Yoğun bölgeleri arayarak
              kümeleri belirler (DBSCAN gibi).
            </li>
            <li>
              <strong>Model Bazlı Kümeleme:</strong> İstatistiksel modeller
              kullanarak kümelemeyi gerçekleştirir.
            </li>
          </ul>
          <p>Kümeleme algoritmaları birçok alanda kullanılır:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Pazarlama: Müşteri segmentasyonu ve hedef kitle analizi</li>
            <li>Biyoloji: Genetik veriler üzerinde grupların tespiti</li>
            <li>Görüntü İşleme: Renk kuantalama ve görüntü segmentasyonu</li>
            <li>Sosyal Ağ Analizi: Topluluk tespiti ve ağ yapısı analizi</li>
            <li>
              Öneri Sistemleri: Benzer kullanıcı veya ürünlerin gruplanması
            </li>
          </ul>
          <p>
            İyi bir kümeleme algoritması seçimi, veri yapısına, küme şekline ve
            problem türüne bağlıdır. Her algoritmanın kendine özgü avantajları
            ve sınırlamaları vardır.
          </p>
        </div>
      </div>
    </div>
  );
}
