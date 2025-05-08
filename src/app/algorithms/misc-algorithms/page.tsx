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

export default function MiscAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Bloom Filter',
      path: '/algorithms/misc-algorithms/bloom-filter',
      description:
        'Bir elemanın bir kümede bulunup bulunmadığını hızlı şekilde kontrol eden, olasılıksal veri yapısı.',
    },
    {
      name: 'Reservoir Sampling',
      path: '/algorithms/misc-algorithms/reservoir-sampling',
      description:
        'Bilinmeyen boyuttaki veri akışından rastgele örneklem almaya yarayan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Diğer Önemli Algoritmalar
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Çeşitli problem alanlarında kullanılan, farklı kategorilere tam olarak
          sığmayan ancak yazılım geliştirmede kritik önem taşıyan algoritmalar.
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
          Diğer Önemli Algoritmalar Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Bu bölümde yer alan algoritmalar, standart sınıflandırmalara tam
            olarak uymayan ancak modern yazılım geliştirmede önemli rol oynayan
            algoritmalardır. Bu algoritmaların çoğu, belirli problem alanlarına
            özel çözümler sunan, uzmanlaşmış veri yapıları ve teknikler içerir.
          </p>

          <p className="mt-4">
            Bu özel amaçlı algoritmaların bazı önemli örnekleri:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Bloom Filter:</strong> Bir elemanın bir kümede bulunup
              bulunmadığını hızlı bir şekilde kontrol etmek için kullanılan
              olasılıksal bir veri yapısıdır. Web tarayıcıları, veritabanları ve
              önbellekleme sistemlerinde yaygın olarak kullanılır.
            </li>
            <li>
              <strong>Reservoir Sampling:</strong> Bilinmeyen boyuttaki bir veri
              akışından sabit boyutlu rastgele bir örneklem seçmek için
              kullanılan bir algoritmadır. Büyük veri analizinde ve veri
              madenciliğinde kullanılır.
            </li>
            <li>
              <strong>Karnaugh Haritası:</strong> Boolean fonksiyonlarını
              sadeleştirmek için kullanılan bir yöntemdir. Dijital mantık
              devrelerinin tasarımında ve optimizasyonunda kullanılır.
            </li>
            <li>
              <strong>Consensus Algoritmaları:</strong> Dağıtık sistemlerde
              birden fazla düğümün ortak bir karara varmasını sağlayan
              algoritmalardır. Blockchain teknolojisi, dağıtık veritabanları ve
              dağıtık sistemlerde yaygın olarak kullanılır.
            </li>
            <li>
              <strong>MapReduce:</strong> Büyük veri kümelerini işlemek için
              kullanılan bir programlama modeli ve veri işleme tekniğidir.
              Paralel işleme, dağıtık sistemler ve büyük veri analizinde
              kullanılır.
            </li>
            <li>
              <strong>Monte Carlo Metotları:</strong> Rastgele örnekleme yoluyla
              sayısal sonuçlar üreten bir hesaplama algoritmaları sınıfıdır.
              Sayısal entegrasyon, optimizasyon, rastgele sayı üretimi ve
              simülasyon gibi alanlarda kullanılır.
            </li>
          </ul>

          <p className="mt-4">
            Bu algoritmaların çoğu, özel problem alanlarında optimize edilmiş
            performans sağlamak veya belirli veri işleme ihtiyaçlarını
            karşılamak için tasarlanmıştır. Modern yazılım sistemlerinin
            karmaşıklığı arttıkça, bu tür uzmanlaşmış algoritmaların önemi de
            artmaktadır.
          </p>

          <p className="mt-4">
            Yazılım geliştiriciler için, bu algoritmaların temel prensiplerini
            ve kullanım alanlarını anlamak, karşılaşılan problemlere en uygun
            çözümü seçmek açısından değerlidir. Her algoritmanın kendine özgü
            avantajları, dezavantajları ve kullanım senaryoları vardır.
          </p>
        </div>
      </div>
    </div>
  );
}
