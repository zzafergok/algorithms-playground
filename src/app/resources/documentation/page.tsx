'use client';

import Link from 'next/link';

import React, { useState } from 'react';

import {
  Code,
  Book,
  Mail,
  Search,
  GitFork,
  FileText,
  Settings,
  LayoutGrid,
  ChevronDown,
  FileQuestion,
} from 'lucide-react';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define documentation section interface
interface DocSection {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  content: React.ReactNode;
}

export default function DocumentationPage() {
  // State for search functionality
  const [searchQuery, setSearchQuery] = useState('');
  // State to track expanded sections
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // Documentation sections with detailed content
  const docSections: DocSection[] = [
    {
      id: 'getting-started',
      title: 'Başlangıç',
      description: 'Platforma giriş ve temel kullanım',
      icon: <Book className="h-5 w-5" />,
      tags: ['başlangıç', 'giriş', 'temel'],
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h3>Algorithms Playground'a Hoş Geldiniz</h3>
          <p>
            Algorithms Playground, algoritmaları interaktif bir şekilde
            öğrenmenize yardımcı olan kapsamlı bir eğitim platformudur. Bu
            belgede, platformun temel özelliklerini ve nasıl kullanılacağını
            öğreneceksiniz.
          </p>

          <h4>Platformun Ana Özellikleri</h4>
          <ul>
            <li>
              <strong>İnteraktif Görselleştirmeler:</strong> Algoritmaların
              çalışma mantığını adım adım görselleştirme
            </li>
            <li>
              <strong>Kod Örnekleri:</strong> Farklı programlama dillerinde
              (JavaScript, Python, Java) örnekler
            </li>
            <li>
              <strong>Canlı Demo:</strong> Kendi verilerinizle algoritmaları
              test etme imkanı
            </li>
            <li>
              <strong>Detaylı Açıklamalar:</strong> Her algoritmanın karmaşıklık
              analizi ve kullanım alanları
            </li>
          </ul>

          <h4>Navigasyon</h4>
          <p>
            Ana menüden farklı algoritma kategorilerine erişebilirsiniz. Her
            algoritma sayfasında genellikle şu bölümler bulunur:
          </p>
          <ul>
            <li>Teorik açıklama ve karmaşıklık analizi</li>
            <li>İnteraktif demo ve görselleştirme</li>
            <li>Kod örnekleri</li>
            <li>Gerçek hayat uygulamaları</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'platform-architecture',
      title: 'Platform Mimarisi',
      description: 'Sistemin teknik yapısı ve bileşenleri',
      icon: <LayoutGrid className="h-5 w-5" />,
      tags: ['mimari', 'yapı', 'teknik'],
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h3>Platform Mimarisi</h3>
          <p>
            Algorithms Playground, modern web teknolojileri kullanılarak
            geliştirilmiş bir full-stack uygulamadır. İşte platformun ana
            bileşenleri:
          </p>

          <h4>Frontend</h4>
          <ul>
            <li>
              <strong>Next.js:</strong> React tabanlı framework (App Router)
            </li>
            <li>
              <strong>TypeScript:</strong> Tip güvenliği
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Stil ve arayüz
            </li>
            <li>
              <strong>radix/ui:</strong> UI bileşenleri
            </li>
            <li>
              <strong>Framer Motion:</strong> Animasyonlar
            </li>
          </ul>

          <h4>Dosya Yapısı</h4>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {`algorithms-playground/
├── public/          # Statik dosyalar
├── src/
│   ├── app/         # Sayfa bileşenleri (Next.js App Router)
│   │   ├── algorithms/  # Algoritma sayfaları
│   │   ├── page.tsx     # Ana sayfa
│   ├── components/  # UI bileşenleri
│   │   ├── common/      # Ortak bileşenler
│   │   ├── layout/      # Düzen bileşenleri
│   │   ├── theme/       # Tema bileşenleri
│   │   ├── ui/          # Temel UI bileşenleri (radix-ui)
│   ├── context/     # React context tanımlamaları
│   ├── lib/         # Yardımcı fonksiyonlar ve algoritma uygulamaları
│   │   ├── algorithms/  # Algoritma implementasyonları
│   ├── styles/      # Global stil tanımlamaları`}
          </pre>

          <h4>Performans Optimizasyonları</h4>
          <p>
            Platform, optimum performans için aşağıdaki teknikleri kullanır:
          </p>
          <ul>
            <li>Next.js App Router ile statik sayfa oluşturma</li>
            <li>Görüntülerin otomatik optimizasyonu</li>
            <li>Code splitting</li>
            <li>Suspense ve lazy loading</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'algorithm-visualizations',
      title: 'Algoritma Görselleştirmeleri',
      description: 'İnteraktif görselleştirme bileşenlerinin kullanımı',
      icon: <FileText className="h-5 w-5" />,
      tags: ['görselleştirme', 'interaktif', 'demo'],
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h3>Algoritma Görselleştirmeleri</h3>
          <p>
            Platformdaki interaktif görselleştirmelerin nasıl kullanılacağı ve
            özelleştirileceği hakkında bilgiler.
          </p>

          <h4>Temel Özellikler</h4>
          <ul>
            <li>
              <strong>Adım Adım İlerleme:</strong> Algoritmaları her adımda ne
              yaptığını görerek anlayın
            </li>
            <li>
              <strong>Hız Kontrolü:</strong> Görselleştirmenin hızını ayarlayın
            </li>
            <li>
              <strong>Kendi Verilerinizi Girin:</strong> Algoritmaları kendi
              verilerinizle test edin
            </li>
            <li>
              <strong>Performans Metrikleri:</strong> Çalışma süresi, bellek
              kullanımı gibi metrikleri görün
            </li>
          </ul>

          <h4>Örnek Kullanım</h4>
          <p>
            Bir sıralama algoritması görselleştirmesi için tipik kullanım akışı:
          </p>
          <ol>
            <li>Algoritma sayfasını açın (ör. Bubble Sort)</li>
            <li>"İnteraktif Demo" bölümüne gidin</li>
            <li>
              Girdi alanına sayıları virgülle ayırarak girin (ör. "5,3,8,1,9,4")
            </li>
            <li>"Çalıştır" düğmesine tıklayın</li>
            <li>
              Algoritmanın çalışmasını izleyin veya "Adım Adım" özelliğini
              kullanın
            </li>
            <li>Performans metriklerini inceleyin</li>
          </ol>

          <h4>Özelleştirme Seçenekleri</h4>
          <ul>
            <li>
              <strong>Rastgele Dizi:</strong> "Rastgele Dizi Oluştur" düğmesini
              kullanarak otomatik veri oluşturun
            </li>
            <li>
              <strong>Animasyon Hızı:</strong> Slider ile görselleştirme hızını
              ayarlayın
            </li>
            <li>
              <strong>Dizi Boyutu:</strong> Test edilecek veri miktarını
              belirleyin
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'code-implementation',
      title: 'Kod İmplementasyonları',
      description: 'Algoritmaların farklı dillerdeki implementasyon detayları',
      icon: <Code className="h-5 w-5" />,
      tags: ['kod', 'programlama', 'örnekler'],
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h3>Kod İmplementasyonları</h3>
          <p>
            Her algoritma için, üç ana programlama dilinde
            (JavaScript/TypeScript, Python ve Java) örnek implementasyonlar
            sunulmuştur. Bu implementasyonlar, algoritmaların gerçek hayatta
            nasıl uygulanacağını göstermek için optimize edilmiştir.
          </p>

          <h4>Kodların Özellikleri</h4>
          <ul>
            <li>
              <strong>Okunabilirlik:</strong> Açıklayıcı değişken isimleri ve
              yorum satırları
            </li>
            <li>
              <strong>Verimlilik:</strong> Zaman ve alan karmaşıklığı açısından
              optimize edilmiş
            </li>
            <li>
              <strong>Modülerlik:</strong> Yeniden kullanılabilir fonksiyonlar
            </li>
            <li>
              <strong>Hata Kontrolü:</strong> Edge case'lerin ele alınması
            </li>
          </ul>

          <h4>Kod Örneğini Kullanma</h4>
          <p>Örnek kodu kendi projenizde kullanmak için:</p>
          <ol>
            <li>İlgili algoritma sayfasına gidin</li>
            <li>"Kod Örnekleri" sekmesine tıklayın</li>
            <li>İstediğiniz dili seçin</li>
            <li>
              Kodu kopyalamak için sağ üst köşedeki "Kopyala" düğmesini kullanın
            </li>
            <li>Kendi projenize entegre edin</li>
          </ol>

          <div className="bg-muted p-4 rounded-md">
            <h4 className="mt-0">Örnek: Quicksort (TypeScript)</h4>
            <pre className="text-xs overflow-x-auto">
              {`export function quickSort<T extends number>(arr: T[]): T[] {
  // Dizi 1 veya daha az eleman içeriyorsa zaten sıralıdır
  if (arr.length <= 1) return arr;

  // Son elemanı pivot olarak seç
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  // Pivottan küçük ve büyük elemanları ayır
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Alt dizileri özyinelemeli olarak sırala ve birleştir
  return [...quickSort(left), pivot, ...quickSort(right)];
}`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'configuration',
      title: 'Konfigürasyon',
      description: 'Platform ayarları ve özelleştirme seçenekleri',
      icon: <Settings className="h-5 w-5" />,
      tags: ['ayarlar', 'özelleştirme', 'konfigürasyon'],
      content: (
        <div className="prose dark:prose-invert max-w-none">
          <h3>Konfigürasyon ve Ayarlar</h3>
          <p>
            Algorithms Playground'u tercihlerinize göre özelleştirmek için
            çeşitli ayarlar ve konfigürasyon seçenekleri bulunmaktadır.
          </p>

          <h4>Tema Ayarları</h4>
          <p>
            Platform, hem açık hem de koyu tema desteği sunar. Tema değiştirmek
            için:
          </p>
          <ul>
            <li>Sağ üst köşedeki tema geçiş düğmesini kullanın</li>
            <li>Sistem temasını kullanmak için otomatik temayı seçin</li>
          </ul>

          <h4>Görselleştirme Ayarları</h4>
          <p>
            Algoritma görselleştirmelerini özelleştirmek için her demo
            sayfasında bulunan ayar seçeneklerini kullanabilirsiniz:
          </p>
          <ul>
            <li>
              <strong>Animasyon Hızı:</strong> Slider ile görselleştirme hızını
              ayarlayın
            </li>
            <li>
              <strong>Veri Boyutu:</strong> Test edilecek veri miktarını
              belirleyin
            </li>
            <li>
              <strong>Renk Şeması:</strong> Görselleştirmelerde kullanılan
              renkleri özelleştirin
            </li>
            <li>
              <strong>Adım Adım Modu:</strong> Algoritmanın her adımını manuel
              olarak ilerletin
            </li>
          </ul>

          <h4>Performans Ayarları</h4>
          <p>
            Büyük veri setleriyle çalışırken, performansı optimize etmek için
            çeşitli ayarlar bulunur:
          </p>
          <ul>
            <li>
              <strong>Animasyon Optimizasyonu:</strong> Büyük veri setlerinde
              animasyonları devre dışı bırakın
            </li>
            <li>
              <strong>Veri Kümeleme:</strong> Büyük veri setlerini
              görselleştirirken veri noktalarını gruplandırın
            </li>
            <li>
              <strong>Görselleştirme Detayı:</strong> Performans için detay
              seviyesini azaltın
            </li>
          </ul>
        </div>
      ),
    },
  ];

  // Toggle section expansion
  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Filter sections based on search query
  const filteredSections = docSections.filter((section) => {
    const query = searchQuery.toLowerCase();
    return (
      section.title.toLowerCase().includes(query) ||
      section.description.toLowerCase().includes(query) ||
      section.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      {/* Header section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Belgelendirme
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Algorithms Playground'un tüm özelliklerini ve kullanımını anlatan
          kapsamlı teknik belgelendirme
        </p>

        {/* Search box */}
        <div className="relative mt-6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            className="pl-10"
            placeholder="Belgelerde ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Quick links */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3">Hızlı Bağlantılar:</h2>
        <div className="flex flex-wrap gap-2">
          {docSections.map((section) => (
            <Button key={section.id} variant="outline" size="sm" asChild>
              <a href={`#${section.id}`}>{section.title}</a>
            </Button>
          ))}
        </div>
      </div>

      {/* Documentation sections */}
      <div className="space-y-6">
        {filteredSections.map((section) => (
          <Card key={section.id} id={section.id} className="scroll-mt-20">
            <CardHeader
              className="cursor-pointer"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {section.icon}
                  </div>
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                </div>
                <ChevronDown
                  className={`h-5 w-5 transition-transform ${
                    expandedSections.includes(section.id) ? 'rotate-180' : ''
                  }`}
                />
              </div>
              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-2">
                {section.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            {/* Collapsible content */}
            {expandedSections.includes(section.id) && (
              <CardContent className="pt-0">{section.content}</CardContent>
            )}
          </Card>
        ))}
      </div>

      {/* No results message */}
      {filteredSections.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium mb-2">Arama sonucu bulunamadı</h3>
          <p className="text-muted-foreground">
            Farklı bir arama terimi deneyin veya filtreleri sıfırlayın
          </p>
          <Button
            variant="outline"
            onClick={() => setSearchQuery('')}
            className="mt-4"
          >
            Aramayı Temizle
          </Button>
        </div>
      )}

      {/* Help section */}
      <div className="mt-16 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          Daha Fazla Yardım mı Gerekiyor?
        </h2>
        <p className="mb-4">
          Burada cevap bulamadığınız sorularınız mı var? Şu kaynaklara
          bakabilirsiniz:
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-primary" />
            <Link href="/resources/faq" className="hover:underline">
              Sık Sorulan Sorular
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <GitFork className="h-5 w-5 text-primary" />
            <Link href="/resources/contributing" className="hover:underline">
              Katkıda Bulunma Rehberi
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact section */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-medium mb-2">Hala cevap bulamadınız mı?</h3>
        <p className="text-muted-foreground mb-4">
          Belgelendirmede görmek istediğiniz konular veya önerileriniz varsa,
          lütfen bize bildirin.
        </p>
        <Button asChild>
          <a
            href="mailto:gok.zaferr@gmail.com"
            className="inline-flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            İletişime Geçin
          </a>
        </Button>
      </div>
    </div>
  );
}
