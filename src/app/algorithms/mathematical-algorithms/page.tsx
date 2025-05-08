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

export default function MathematicalAlgorithmsPage() {
  const algorithms = [
    {
      name: 'GCD (Euclidean Algorithm)',
      path: '/algorithms/mathematical-algorithms/gcd',
      description:
        'İki veya daha fazla sayının en büyük ortak bölenini bulan etkili bir algoritma.',
    },
    {
      name: 'Sieve of Eratosthenes',
      path: '/algorithms/mathematical-algorithms/sieve-of-eratosthenes',
      description:
        'Belirli bir sayıya kadar olan tüm asal sayıları hızlı bir şekilde bulan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Matematiksel Algoritmalar
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Matematiksel algoritmalar, matematiksel problemleri çözmek ve
          matematiksel hesaplamalar yapmak için kullanılan algoritmalardır.
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
          Matematiksel Algoritmalar Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Matematiksel algoritmalar, sayı teorisi, cebir, geometri ve diğer
            matematik alanlarındaki problemleri çözmek için tasarlanmış özel
            algoritmalardır. Bu algoritmalar, temel matematiksel işlemleri
            gerçekleştirmekten karmaşık matematiksel hesaplamalara kadar geniş
            bir yelpazede kullanılır.
          </p>

          <p className="mt-4">
            Matematiksel algoritmaların önemli kategorileri:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Sayı Teorisi Algoritmaları:</strong> Asal sayılar,
              faktörizasyon, bölünebilirlik gibi konularla ilgili algoritmalar
              (örn. Eratosthenes Eleği, Öklid Algoritması)
            </li>
            <li>
              <strong>Cebirsel Algoritmalar:</strong> Matris işlemleri, polinom
              hesaplamaları, denklem çözümü gibi cebirsel hesaplamalar için
              algoritmalar
            </li>
            <li>
              <strong>Sayısal Algoritmalar:</strong> Sayısal entegrasyon,
              diferansiyel denklemler, interpolasyon gibi sayısal analiz
              problemlerini çözen algoritmalar
            </li>
            <li>
              <strong>Geometrik Algoritmalar:</strong> Geometrik problemleri
              çözen algoritmalar (örn. Convex Hull, Closest Pair of Points)
            </li>
            <li>
              <strong>Kriptografik Algoritmalar:</strong> Şifreleme ve şifre
              çözme için kullanılan matematiksel algoritmalar (örn. RSA, El
              Gamal)
            </li>
          </ul>

          <p className="mt-4">
            Matematiksel algoritmaların yaygın kullanım alanları:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Kriptografi ve veri güvenliği</li>
            <li>Bilimsel hesaplamalar ve simülasyonlar</li>
            <li>Grafik işleme ve bilgisayar destekli tasarım</li>
            <li>Finans ve ekonomi modelleri</li>
            <li>Yapay zeka ve makine öğrenmesi</li>
            <li>Optimizasyon problemleri</li>
            <li>Oyun teorisi ve stratejik karar verme</li>
          </ul>

          <p className="mt-4">
            Matematiksel algoritmalar, bilgisayar biliminin temelini oluşturur
            ve karmaşık hesaplamaları verimli bir şekilde gerçekleştirmek için
            kritik öneme sahiptir. Bu algoritmalar, hesaplama karmaşıklığı,
            doğruluk ve verimlilik gibi faktörler göz önünde bulundurularak
            tasarlanır.
          </p>
        </div>
      </div>
    </div>
  );
}
