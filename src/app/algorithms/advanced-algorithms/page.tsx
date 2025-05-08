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

export default function AdvancedAlgorithmsPage() {
  const algorithms = [
    {
      name: "Floyd's Cycle-Finding",
      path: '/algorithms/advanced-algorithms/floyd-cycle-finding',
      description:
        "Bağlı listelerde döngüleri bulmak için kullanılan verimli bir algoritma. 'Tortoise and Hare' olarak da bilinir.",
    },
    {
      name: 'Topological Sort',
      path: '/algorithms/advanced-algorithms/topological-sort',
      description:
        'Yönlü asiklik graflarda (DAG) düğümleri bağımlılıklarına göre sıralayan algoritma.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          İleri Seviye Algoritmalar
        </h1>
        <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
          İleri seviye algoritmalar, karmaşık problemleri çözmek için optimize
          edilmiş, özel durumlara yönelik geliştirilmiş algoritmalardır. Bu
          algoritmaları anlamak, verimli yazılım çözümleri geliştirmede kritik
          öneme sahiptir.
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
          İleri Seviye Algoritmalar Hakkında
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            İleri seviye algoritmalar, genellikle belirli türdeki problemlere
            yönelik optimize edilmiş özel çözümlerdir. Bu algoritmalar
            çoğunlukla temel algoritmaların varyasyonları veya uzantıları olarak
            ortaya çıkar ve performans, verimlilik veya özel kullanım durumları
            için geliştirilmiştir.
          </p>
          <p>
            Bu algoritmalar, yazılım mühendisliği ve bilgisayar biliminde daha
            karmaşık ve özelleştirilmiş problemleri çözmek için kullanılır.
            Örneğin, bağlı listelerde döngü tespiti (Floyd's Cycle-Finding) veya
            bağımlılık çözümleme (Topological Sort) gibi özel durumlar için
            tasarlanmışlardır.
          </p>
          <p>
            İleri seviye algoritmaların anlaşılması, karmaşık yazılım
            sistemlerinin geliştirilmesinde ve optimizasyonunda önemli bir
            beceridir.
          </p>
        </div>
      </div>
    </div>
  );
}
