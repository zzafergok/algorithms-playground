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

export default function SearchingAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Linear Search',
      path: '/algorithms/searching/linear-search',
      description:
        'Bir dizide elemanları sırayla kontrol ederek arama yapan en basit algoritma.',
    },
    {
      name: 'Binary Search',
      path: '/algorithms/searching/binary-search',
      description:
        'Sıralı dizilerde, her adımda arama alanını yarıya bölerek logaritmik zamanda arama yapan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Arama Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Arama algoritmaları, veri yapıları içerisinde belirli bir elemanı
          bulmak için kullanılan algoritmalardır.
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
        <h2 className="text-2xl font-bold mb-4">
          Arama Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Arama algoritmaları, bir veri yapısı içerisinde belirli bir elemanı
            veya değeri bulmak için kullanılan temel algoritmalardır. Yazılım
            uygulamalarında, veritabanlarında, dosya sistemlerinde ve birçok
            farklı alanda sıkça kullanılırlar.
          </p>

          <p className="mt-4">
            Arama algoritmaları, çalışma prensipleri ve performans
            karakteristiklerine göre çeşitli kategorilere ayrılabilir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Doğrusal Arama Algoritmaları:</strong> Veri yapısının tüm
              elemanlarını tek tek kontrol ederek arama yapar. (Örn: Linear
              Search)
            </li>
            <li>
              <strong>İkili Arama Algoritmaları:</strong> Sıralı veri
              yapılarında, arama uzayını her adımda yarıya bölerek logaritmik
              bir zaman karmaşıklığında çalışır. (Örn: Binary Search)
            </li>
            <li>
              <strong>Sıçramalı Arama Algoritmaları:</strong> Belirli bir adım
              boyutuyla ilerleyerek arama yapar. (Örn: Jump Search)
            </li>
            <li>
              <strong>Hash Tabanlı Arama:</strong> Anahtarların hash değerlerini
              kullanarak sabit zamanda arama yapar. (Örn: Hash Tables)
            </li>
            <li>
              <strong>Ağaç Tabanlı Arama:</strong> Ağaç veri yapılarını
              kullanarak logaritmik zamanda arama yapar. (Örn: Binary Search
              Tree)
            </li>
          </ul>

          <p className="mt-4">
            Arama algoritmalarının seçimi, aşağıdaki faktörlere bağlı olarak
            değişir:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Verinin boyutu ve yapısı</li>
            <li>Verinin sıralı olup olmadığı</li>
            <li>Bellek kısıtlamaları</li>
            <li>Arama işleminin sıklığı</li>
            <li>Ekleme ve silme işlemlerinin sıklığı</li>
          </ul>

          <p className="mt-4">
            Arama algoritmalarının bazı önemli performans metrikleri:
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
              <strong>Verimlilik:</strong> Algoritmanın pratik performansı
            </li>
          </ul>

          <p className="mt-4">
            Doğru arama algoritmasını seçmek, yazılım uygulamalarının
            performansını ve verimini önemli ölçüde etkileyebilir. Örneğin,
            büyük veri yapılarında Binary Search gibi logaritmik karmaşıklığa
            sahip algoritmalar, Linear Search gibi doğrusal karmaşıklığa sahip
            algoritmalara göre çok daha hızlı çalışır.
          </p>
        </div>
      </div>
    </div>
  );
}
