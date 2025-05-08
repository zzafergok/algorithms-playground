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

export default function BacktrackingPage() {
  const algorithms = [
    {
      name: 'N-Queens Problem',
      path: '/algorithms/backtracking/n-queens',
      description:
        'N adet veziri, birbirlerini tehdit etmeyecek şekilde N×N boyutundaki satranç tahtasına yerleştirme problemi.',
    },
    {
      name: 'Subset Sum Problem',
      path: '/algorithms/backtracking/subset-sum',
      description:
        'Bir dizi içerisindeki sayıların alt kümelerinin toplamının belirli bir değere eşit olup olmadığını bulan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Geri İzleme Algoritmaları
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          Geri izleme (backtracking), bir problem için olası tüm çözümleri adım
          adım keşfeden ve geçersiz çözüm yollarını eleme yöntemiyle ilerleyen
          bir algoritma stratejisidir.
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
              <Button asChild variant="ghost" size="sm" className="mt-2">
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
          Geri İzleme Algoritmaları Hakkında
        </h2>
        <div className="max-w-none">
          <p>
            Geri izleme, bir araştırma ağacını derinlemesine dolaşarak çözüm
            arayan bir problem çözme tekniğidir. Algoritma, her adımda bir seçim
            yapar ve bu seçimin sonuçlarını inceler. Eğer seçim kısıtlamaları
            ihlal ediyorsa, algoritma geri döner (backtrack) ve başka bir seçim
            yapar.
          </p>
          <p>
            Bu yaklaşım, kombinatoryal problemlerde özellikle etkilidir.
            Örneğin; permütasyonlar, kombinasyonlar, bulmacalar ve oyunlar gibi
            çözüm uzayının büyük olduğu durumlarda kullanışlıdır.
          </p>
          <p>
            Geri izleme algoritmaları genellikle rekürsif yapıdadır ve "kaba
            kuvvet" yaklaşımına göre daha verimlidir, çünkü geçersiz çözüm
            yollarını erken aşamada tespit edip elemek mümkündür.
          </p>
          <p>Yaygın geri izleme kullanım alanları:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Bulmacalar (Sudoku, Satranç, N-Queens, vb.)</li>
            <li>
              Kombinatoryal problemler (Subset Sum, Kombinasyon, Permütasyon)
            </li>
            <li>Labirent çözme</li>
            <li>Graf boyama ve diğer graf problemleri</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
