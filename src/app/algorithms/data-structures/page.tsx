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

export default function DataStructuresPage() {
  const dataStructures = [
    {
      name: 'Linked List',
      path: '/algorithms/data-structures/linked-list',
      description:
        'Her düğümün veri ve bir sonraki düğüme referans içerdiği dinamik bir veri yapısı.',
    },
    {
      name: 'Stack',
      path: '/algorithms/data-structures/stack',
      description:
        'Son giren ilk çıkar (LIFO) prensibiyle çalışan, yalnızca en üstteki elemana erişim sağlayan veri yapısı.',
    },
    {
      name: 'Queue',
      path: '/algorithms/data-structures/queue',
      description:
        'İlk giren ilk çıkar (FIFO) prensibiyle çalışan, elemanları sırayla işleyen veri yapısı.',
    },
    {
      name: 'Binary Search Tree',
      path: '/algorithms/data-structures/binary-search-tree',
      description:
        'Her düğümün en fazla iki çocuğa sahip olduğu, hızlı arama, ekleme ve silme işlemlerine olanak tanıyan hiyerarşik yapı.',
    },
    {
      name: 'Hash Table',
      path: '/algorithms/data-structures/hash-table',
      description:
        'Anahtarları değerlere eşleyen, sabit zamanlı erişim sağlayan veri yapısı.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Veri Yapıları</h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Veri yapıları, verileri organize etme, saklama ve işleme yöntemlerini
          tanımlayan programlama kavramlarıdır. Etkili algoritmalar tasarlamanın
          temelini oluştururlar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataStructures.map((structure) => (
          <Card key={structure.name} className="algorithm-card">
            <CardHeader>
              <CardTitle>{structure.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {structure.description}
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="mt-2">
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
        <div className="max-w-none">
          <p>
            Veri yapıları, verileri organize etme ve işleme yöntemlerini
            sağlayan programlama konseptleridir. Doğru veri yapısı seçimi,
            algoritmaların verimliliğini ve performansını doğrudan etkiler.
          </p>
          <p>Veri yapıları genel olarak iki ana kategoriye ayrılır:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>İlkel Veri Yapıları:</strong> Tamsayılar, kayan noktalı
              sayılar, karakterler gibi doğrudan değerleri temsil eden basit
              veri tipleri.
            </li>
            <li>
              <strong>Soyut Veri Yapıları:</strong> Daha karmaşık veri
              organizasyonlarını tanımlayan üst düzey yapılar. Diziler, bağlı
              listeler, yığınlar, kuyruklar, ağaçlar, grafikler ve hash tablolar
              bu kategoriye girer.
            </li>
          </ul>
          <p>
            Her veri yapısının kendine özgü avantajları ve kullanım alanları
            vardır:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Diziler (Arrays):</strong> Ardışık bellek konumlarında
              saklanan sabit boyutlu koleksiyonlar. İndeksleme ile hızlı erişim
              sağlar.
            </li>
            <li>
              <strong>Bağlı Listeler (Linked Lists):</strong> Dinamik boyutlu,
              her elemanın bir sonrakine işaret ettiği yapılar. Ekleme ve silme
              işlemleri verimlidir.
            </li>
            <li>
              <strong>Yığınlar (Stacks):</strong> Son giren ilk çıkar (LIFO)
              prensibiyle çalışır. Fonksiyon çağrıları, geri alma özellikleri
              için kullanılır.
            </li>
            <li>
              <strong>Kuyruklar (Queues):</strong> İlk giren ilk çıkar (FIFO)
              prensibiyle çalışır. İş sıralaması, mesaj kuyruklama için
              idealdir.
            </li>
            <li>
              <strong>Ağaçlar (Trees):</strong> Hiyerarşik yapıdır, arama ve
              sıralama işlemleri için etkilidir. İkili arama ağaçları, AVL
              ağaçları yaygın örneklerdir.
            </li>
            <li>
              <strong>Grafikler (Graphs):</strong> Düğümler ve kenarlardan
              oluşan, karmaşık ilişkileri temsil eden veri yapılarıdır. Sosyal
              ağlar, yol haritaları modellemede kullanılır.
            </li>
            <li>
              <strong>Hash Tablolar (Hash Tables):</strong> Anahtarları
              değerlere eşleyen, ortalama durumda sabit zamanlı erişim sağlayan
              yapılardır. Sözlükler, önbellek sistemleri için idealdir.
            </li>
          </ul>
          <p>
            Doğru veri yapısını seçmek, algoritma tasarımının kritik bir
            parçasıdır ve çözülecek problem, veri boyutu, işlem tipleri ve
            performans gereksinimleri göz önünde bulundurularak belirlenir.
          </p>
        </div>
      </div>
    </div>
  );
}
