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

export default function OptimizationAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Simulated Annealing',
      path: '/algorithms/optimization-algorithms/simulated-annealing',
      description:
        'Fiziksel tavlama işlemini taklit eden, global optimum çözüm arayan bir metasezgisel yöntem.',
    },
    {
      name: 'Genetic Algorithms',
      path: '/algorithms/optimization-algorithms/genetic-algorithms',
      description:
        'Doğal evrim süreçlerini taklit eden, popülasyon tabanlı meta-sezgisel optimizasyon algoritması.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Optimizasyon Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Optimizasyon algoritmaları, belirli bir problem için olası çözümler
          arasından en iyi çözümü bulmayı amaçlayan algoritmalardır.
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
          Optimizasyon Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Optimizasyon algoritmaları, bir problemin olası çözümleri arasından
            en iyi çözümü (minimum veya maksimum) bulmayı amaçlayan matematiksel
            ve hesaplama yöntemleridir. Bu algoritmalar, mühendislik, ekonomi,
            lojistik, yapay zeka gibi birçok alanda kullanılır.
          </p>

          <p className="mt-4">
            Optimizasyon algoritmaları genellikle şu kategorilere ayrılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Tam Optimizasyon Algoritmaları:</strong> Problemin kesin
              optimal çözümünü garanti eden algoritmalar (Simplex Algoritması,
              Dinamik Programlama gibi).
            </li>
            <li>
              <strong>Yaklaşık Optimizasyon Algoritmaları:</strong> Optimal
              çözüme yakın çözümler üreten, ancak optimumu garanti etmeyen
              algoritmalar.
            </li>
            <li>
              <strong>Metasezgisel Algoritmalar:</strong> Doğadan esinlenen veya
              genel arama stratejilerine dayanan, geniş arama uzaylarında etkili
              olan algoritmalar (Simüle Edilmiş Tavlama, Genetik Algoritmalar,
              Parçacık Sürü Optimizasyonu gibi).
            </li>
          </ul>

          <p className="mt-4">
            Optimizasyon algoritmaları, aşağıdaki bileşenlere sahiptir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Amaç Fonksiyonu:</strong> Optimize edilecek ölçüt (en aza
              indirilecek maliyet veya en üst düzeye çıkarılacak fayda).
            </li>
            <li>
              <strong>Değişkenler:</strong> Kontrol edilebilen ve
              değiştirilebilen parametreler.
            </li>
            <li>
              <strong>Kısıtlamalar:</strong> Çözümlerin sağlaması gereken
              koşullar.
            </li>
            <li>
              <strong>Arama Uzayı:</strong> Tüm olası çözümlerin kümesi.
            </li>
          </ul>

          <p className="mt-4">
            Optimizasyon algoritmalarının uygulandığı yaygın alanlar:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Makine öğrenmesi modelleri eğitimi</li>
            <li>Lojistik ve tedarik zinciri optimizasyonu</li>
            <li>Finansal portföy optimizasyonu</li>
            <li>Üretim planlama ve çizelgeleme</li>
            <li>Robotik ve otonom sistemler</li>
            <li>Enerji yönetimi ve dağıtımı</li>
            <li>Ağ tasarımı ve trafik yönlendirme</li>
          </ul>

          <p className="mt-4">
            Her optimizasyon algoritması, belirli problem türleri için daha
            uygundur. Algoritma seçimi; problem tipi, arama uzayı boyutu,
            problemin yapısı (doğrusal, doğrusal olmayan, konveks), hesaplama
            kaynakları ve gerekli çözüm kalitesi gibi faktörlere bağlıdır.
          </p>
        </div>
      </div>
    </div>
  );
}
