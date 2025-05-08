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

export default function StringAlgorithmsPage() {
  const algorithms = [
    {
      name: 'Rabin-Karp Algorithm',
      path: '/algorithms/string-algorithms/rabin-karp',
      description:
        'Metin içerisinde desen aramak için hash değerlerini kullanan string eşleştirme algoritması.',
    },
    {
      name: 'KMP Algorithm',
      path: '/algorithms/string-algorithms/kmp',
      description:
        'Önek tablosu kullanarak metinde desen aramayı verimli hale getiren string eşleştirme algoritması.',
    },
    {
      name: 'Boyer-Moore Algorithm',
      path: '/algorithms/string-algorithms/boyer-moore',
      description:
        'Sağdan sola tarama yaparak ve kötü karakter kuralını kullanarak hızlı string eşleştirme algoritması.',
    },
    {
      name: 'Z Algorithm',
      path: '/algorithms/string-algorithms/z-algorithm',
      description:
        'Z-array kullanarak metin içerisinde desen bulma işlemini gerçekleştiren algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Metin İşleme Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Metin işleme algoritmaları, string veriler üzerinde arama, eşleştirme,
          düzenleme ve manipülasyon yapmak için kullanılan özel algoritmalardır.
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
          Metin İşleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Metin işleme algoritmaları, bilgisayar biliminin önemli bir alanını
            oluşturur ve string verileri üzerinde çeşitli işlemler yapmak için
            kullanılır. Bu algoritmalar, büyük metin verileri içerisinde arama
            yapmak, desen eşleştirmek, metin düzenlemesi yapmak ve metin
            verisini manipüle etmek gibi çeşitli görevleri yerine getirir.
          </p>

          <p className="mt-4">
            Metin işleme algoritmalarının temel kategorileri şunlardır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>String Eşleştirme (String Matching):</strong> Bir metin
              içerisinde belirli bir deseni bulmak için kullanılan algoritmalar.
              Örneğin; Rabin-Karp, KMP (Knuth-Morris-Pratt), Boyer-Moore,
              Z-Algorithm.
            </li>
            <li>
              <strong>Düzenleme Mesafesi (Edit Distance):</strong> İki metinin
              birbirine ne kadar benzediğini veya farklı olduğunu ölçen
              algoritmalar. Örneğin; Levenshtein Distance, Hamming Distance.
            </li>
            <li>
              <strong>Kompresyon (Compression):</strong> Metni daha az alanda
              saklamak için kullanılan algoritmalar. Örneğin; Huffman Coding,
              Lempel-Ziv-Welch (LZW).
            </li>
            <li>
              <strong>Regex Motoru:</strong> Düzenli ifadeler kullanarak metin
              arama ve eşleştirme yapmak için kullanılan algoritmalar.
            </li>
          </ul>

          <p className="mt-4">
            Metin işleme algoritmalarının performansı genellikle şu faktörlere
            göre değerlendirilir:
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
              <strong>Ön İşleme Süresi:</strong> Algoritmanın veriyi işlemeye
              başlamadan önce gerekli ön hazırlık süresi
            </li>
          </ul>

          <p className="mt-4">
            Metin işleme algoritmaları, aşağıdaki gibi birçok alanda yaygın
            olarak kullanılır:
          </p>

          <ul className="list-disc pl-5 space-y-2">
            <li>Arama motorları</li>
            <li>Biyoinformatik (DNA dizilimi analizi)</li>
            <li>Doğal dil işleme (NLP)</li>
            <li>Metin düzenleyiciler ve kelime işlemciler</li>
            <li>Veri sıkıştırma sistemleri</li>
            <li>Yazım denetimi ve otomatik düzeltme</li>
            <li>Veritabanı sorgulamaları</li>
            <li>Güvenlik sistemleri (örn. virüs taraması)</li>
          </ul>

          <p className="mt-4">
            Doğru metin işleme algoritmasını seçmek, uygulamanın performansını
            ve verimliliğini doğrudan etkiler. Özellikle büyük veri setleriyle
            çalışırken, verimli metin işleme algoritmaları kullanmak önemlidir.
            Örneğin, Boyer-Moore algoritması büyük metinlerde desen aramak için
            oldukça verimli olabilirken, KMP algoritması kısa desenleri aramak
            için daha uygun olabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
