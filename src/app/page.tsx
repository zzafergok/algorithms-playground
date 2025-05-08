import Link from 'next/link';
import { ArrowRight, Code, BookOpen, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Home() {
  const algorithmCategories = [
    {
      title: 'Sıralama Algoritmaları',
      description:
        'Verileri belirli bir düzende sıralamak için kullanılan algoritmalar',
      href: '/algorithms/sorting',
      examples: ['Bubble Sort', 'Quick Sort', 'Merge Sort'],
    },
    {
      title: 'Arama Algoritmaları',
      description:
        'Veri yapılarında eleman bulmak için kullanılan algoritmalar',
      href: '/algorithms/search',
      examples: ['Binary Search', 'Linear Search', 'Jump Search'],
    },
    {
      title: 'Graf Algoritmaları',
      description: 'Graf veri yapıları üzerinde işlem yapan algoritmalar',
      href: '/algorithms/graf',
      examples: ['Dijkstra', 'DFS', 'BFS'],
    },
    {
      title: 'Dinamik Programlama',
      description:
        'Karmaşık problemleri alt problemlere bölerek çözen yöntemler',
      href: '/algorithms/dynamic-programming',
      examples: ['Fibonacci', 'Knapsack', 'Longest Common Subsequence'],
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="py-12 md:py-20">
        <div className="flex flex-col items-center text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Algoritmaları Öğren,
            <span className="text-primary"> Anla</span> ve
            <span className="text-primary"> Uygula</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            İnteraktif örnekler, görselleştirmeler ve uygulamalı öğrenme ile
            algoritmalarda ustalaşın.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="">
              <Link
                href="/algorithms"
                className="flex justify-between items-center gap-3"
              >
                <span className="flex-grow text-center">Algoritmalar</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/hakkinda">Daha Fazla Bilgi</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="feature-section">
        <h2 className="text-3xl font-bold text-center mb-8">
          Nasıl Öğreneceksiniz?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-4 space-y-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Teorik Bilgi</h3>
            <p className="text-muted-foreground">
              Her algoritmanın teorik temelleri, zaman karmaşıklığı, avantajları
              ve dezavantajları hakkında detaylı bilgiler.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 space-y-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <BarChart4 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Görsel Öğrenme</h3>
            <p className="text-muted-foreground">
              Algoritmaların çalışma prensiplerini adım adım görselleştirmelerle
              anlayın.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 space-y-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Code className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">İnteraktif Uygulamalar</h3>
            <p className="text-muted-foreground">
              Kendi verilerinizle algoritmaları test edin, kodlarını inceleyin
              ve nasıl çalıştıklarını keşfedin.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="feature-section">
        <h2 className="text-3xl font-bold text-center mb-8">
          Algoritma Kategorileri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {algorithmCategories.map((category, index) => (
            <Card key={index} className="algorithm-card">
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Popüler örnekler:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {category.examples.map((example, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium"
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost">
                  <Link
                    href={category.href}
                    className="flex justify-between items-center gap-3"
                  >
                    <span className="flex-grow text-center">Keşfet</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
