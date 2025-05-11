'use client';

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// FAQ item interface
interface FAQItem {
  id: string;
  tags: string[];
  question: string;
  category: string;
  isHelpful?: boolean;
  answer: React.ReactNode;
}

export default function FAQPage() {
  // State for search and expanded items
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);

  // FAQ items data
  const faqData: FAQItem[] = [
    {
      id: 'general-1',
      question: 'Algorithms Playground nedir?',
      answer: (
        <p>
          Algorithms Playground, algoritmaları interaktif bir şekilde öğrenmek
          ve deneyimlemek için tasarlanmış bir eğitim platformudur.
          Görselleştirmeler, adım adım açıklamalar ve canlı kod örnekleriyle,
          hem acemi hem de deneyimli programcıların algoritmaları daha iyi
          anlamasını sağlamayı amaçlıyoruz.
        </p>
      ),
      category: 'general',
      tags: ['genel', 'platform', 'hakkında'],
    },
    {
      id: 'general-2',
      question: 'Bu platform kimler için tasarlanmıştır?',
      answer: (
        <div>
          <p>
            Algorithms Playground, çeşitli düzeylerdeki kullanıcılar için
            tasarlanmıştır:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Algoritma ve veri yapıları öğrenmek isteyen öğrenciler</li>
            <li>Bilgilerini pekiştirmek isteyen programcılar</li>
            <li>Teknik mülakatlara hazırlanan adaylar</li>
            <li>Algoritmaları görsel olarak anlamak isteyen herkes</li>
          </ul>
        </div>
      ),
      category: 'general',
      tags: ['hedef kitle', 'kullanıcı', 'eğitim'],
    },
    {
      id: 'general-3',
      question: 'Platform ücretsiz mi kullanılabilir?',
      answer: (
        <p>
          Evet, Algorithms Playground tamamen ücretsiz ve açık kaynaklı bir
          projedir. GitHub üzerinden koda erişebilir, projeyi forklayabilir ve
          katkıda bulunabilirsiniz. Eğitim materyallerini, interaktif demoları
          ve tüm kaynakları herhangi bir ücret ödemeden kullanabilirsiniz.
        </p>
      ),
      category: 'general',
      tags: ['ücretsiz', 'açık kaynak', 'lisans'],
    },
    {
      id: 'algorithms-1',
      question: 'Platformda hangi algoritma kategorileri bulunuyor?',
      answer: (
        <div>
          <p>Platformda şu ana kategorilerdeki algoritmalar bulunmaktadır:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              Sıralama Algoritmaları (Bubble Sort, Quick Sort, Merge Sort vb.)
            </li>
            <li>Arama Algoritmaları (Binary Search, Linear Search vb.)</li>
            <li>Graf Algoritmaları (BFS, DFS, Dijkstra, Bellman-Ford vb.)</li>
            <li>
              Veri Yapıları (Linked List, Stack, Queue, Binary Search Tree, Hash
              Table vb.)
            </li>
            <li>
              Dinamik Programlama (Fibonacci, Knapsack, Longest Common
              Subsequence vb.)
            </li>
            <li>Metin İşleme Algoritmaları (KMP, Rabin-Karp vb.)</li>
            <li>Matematiksel Algoritmalar (GCD, Sieve of Eratosthenes vb.)</li>
            <li>Optimizasyon Algoritmaları ve daha fazlası...</li>
          </ul>
          // Continuing the FAQ page content...
          <p className="mt-2">
            Sürekli olarak yeni algoritmalar eklemeye devam ediyoruz. Eğer
            belirli bir algoritma görmek istiyorsanız, GitHub üzerinden bir
            öneride bulunabilirsiniz.
          </p>
        </div>
      ),
      category: 'algorithms',
      tags: ['kategoriler', 'algoritma türleri', 'içerik'],
    },
    {
      id: 'algorithms-2',
      question: 'Kendi algoritmalarımı ekleyebilir miyim?',
      answer: (
        <div>
          <p>
            Evet, kendi algoritma implementasyonlarınızı eklemek için katkıda
            bulunabilirsiniz. Katkı sağlamak için:
          </p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>GitHub repository'sini forklayın</li>
            <li>Yeni bir branch oluşturun</li>
            <li>
              Algoritmanızı ekleyin ve gerekli görselleştirmeleri oluşturun
            </li>
            <li>Pull request gönderin</li>
          </ol>
          <p className="mt-2">
            Daha detaylı bilgi için{' '}
            <a
              href="/resources/contributing"
              className="text-primary hover:underline"
            >
              Katkıda Bulunma
            </a>{' '}
            sayfamıza göz atabilirsiniz.
          </p>
        </div>
      ),
      category: 'algorithms',
      tags: ['katkı', 'algoritma ekleme'],
    },
    {
      id: 'usage-1',
      question: 'Algoritma görselleştirmelerini nasıl kullanabilirim?',
      answer: (
        <div>
          <p>Algoritma görselleştirmelerini kullanmak için:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>İlgilendiğiniz algoritmanın sayfasına gidin</li>
            <li>İnteraktif demo bölümünü bulun</li>
            <li>Kendi verilerinizi girin veya rastgele veri oluşturun</li>
            <li>
              "Çalıştır" düğmesine tıklayın ve algoritmanın çalışmasını izleyin
            </li>
            <li>
              Adım adım ilerlemek için "İleri" ve "Geri" düğmelerini
              kullanabilirsiniz
            </li>
            <li>
              Algoritmanın performans metriklerini görmek için çalışma
              tamamlandıktan sonra "Performans" sekmesine bakın
            </li>
          </ol>
        </div>
      ),
      category: 'usage',
      tags: ['görselleştirme', 'demo', 'kullanım'],
    },
    {
      id: 'usage-2',
      question: 'Algoritmaların kodlarını kendi projemde kullanabilir miyim?',
      answer: (
        <p>
          Evet, tüm algoritma implementasyonları MIT lisansı altında
          sunulmaktadır, bu da kodları kendi projelerinizde özgürce
          kullanabileceğiniz anlamına gelir. Ancak, kodları kullanırken
          projenizde Algorithms Playground'a atıfta bulunmanız takdir edilir,
          ancak zorunlu değildir. Kodları kullanmadan önce, üretim ortamında
          kullanım için optimize edilmemiş olabileceklerini ve ek testlere
          ihtiyaç duyabileceğinizi unutmayın.
        </p>
      ),
      category: 'usage',
      tags: ['lisans', 'kod kullanımı'],
    },
    {
      id: 'usage-3',
      question: 'Büyük veri setlerini nasıl test edebilirim?',
      answer: (
        <div>
          <p>Büyük veri setleriyle algoritma performansını test etmek için:</p>
          <ol className="list-decimal pl-5 mt-2 space-y-1">
            <li>
              İlgili algoritma sayfasında "İnteraktif Demo" bölümüne gidin
            </li>
            <li>
              "Rastgele Dizi Oluştur" özelliğini kullanın ve boyut parametresini
              artırın (ör. 1000 eleman)
            </li>
            <li>
              Çok büyük veri setleri için (10.000+ eleman), animasyonları devre
              dışı bırakmak isteyebilirsiniz
            </li>
            <li>
              Performans metriklerinde çalışma süresi, bellek kullanımı ve diğer
              ölçümleri görebilirsiniz
            </li>
          </ol>
          <p className="mt-2">
            Not: Çok büyük veri setleri tarayıcınızın performansını
            etkileyebilir. Tarayıcı tabanlı bir uygulama olduğu için,
            milyonlarca elemanlı veri setleri için uygun olmayabilir.
          </p>
        </div>
      ),
      category: 'usage',
      tags: ['büyük veri', 'performans', 'test'],
    },
    {
      id: 'technical-1',
      question: 'Algoritma karmaşıklığı nasıl hesaplanır?',
      answer: (
        <div>
          <p>
            Algoritma karmaşıklığı, bir algoritmanın giriş boyutuna göre nasıl
            ölçeklendiğini gösteren matematiksel bir analizdir. İki ana
            karmaşıklık türü vardır:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Zaman Karmaşıklığı:</strong> Algoritmanın çalışma
              süresinin giriş boyutuna göre nasıl değiştiğini gösterir (ör.
              O(n), O(n log n), O(n²)).
            </li>
            <li>
              <strong>Alan Karmaşıklığı:</strong> Algoritmanın bellek
              kullanımının giriş boyutuna göre nasıl değiştiğini gösterir.
            </li>
          </ul>
          <p className="mt-2">
            Platformumuzda her algoritma için en iyi, ortalama ve en kötü durum
            karmaşıklık analizlerini sağlıyoruz. Karmaşıklık kavramları hakkında
            daha fazla bilgi için "Algoritmik Karmaşıklık" öğretici bölümümüze
            göz atabilirsiniz.
          </p>
        </div>
      ),
      category: 'technical',
      tags: ['karmaşıklık', 'big o', 'analiz'],
    },
    {
      id: 'technical-2',
      question: 'Bazı algoritmalar neden diğerlerinden daha hızlı?',
      answer: (
        <div>
          <p>Algoritmaların hızı birçok faktöre bağlıdır:</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li>
              <strong>Algoritmik Karmaşıklık:</strong> O(n log n) karmaşıklığa
              sahip bir algoritma, genellikle O(n²) karmaşıklığa sahip bir
              algoritmadan büyük veri setlerinde daha hızlıdır.
            </li>
            <li>
              <strong>Veri Niteliği:</strong> Bazı algoritmalar belirli veri
              tipleri için optimize edilmiştir. Örneğin, Insertion Sort,
              neredeyse sıralı diziler için çok verimlidir.
            </li>
            <li>
              <strong>Sabit Faktörler:</strong> Düşük asimptotik karmaşıklığa
              sahip algoritmalar, yüksek sabit faktörleri nedeniyle küçük veri
              setlerinde daha yavaş olabilir.
            </li>
            <li>
              <strong>Bellek Erişimi ve Cache Etkileri:</strong> Modern
              bilgisayarlarda bellek erişimi, algoritma performansında önemli
              bir rol oynar.
            </li>
          </ul>
          <p className="mt-2">
            Her algoritmanın güçlü ve zayıf yönleri vardır. Bu yüzden her
            algoritmanın avantajlarını, dezavantajlarını ve kullanım durumlarını
            açıklıyoruz.
          </p>
        </div>
      ),
      category: 'technical',
      tags: ['hız', 'performans', 'karşılaştırma'],
    },
    {
      id: 'technical-3',
      question: 'Platform hangi teknolojilerle geliştirilmiştir?',
      answer: (
        <div>
          <p>
            Algorithms Playground aşağıdaki modern web teknolojileri
            kullanılarak geliştirilmiştir:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>Next.js:</strong> React framework (App Router)
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
          <p className="mt-2">
            Algoritmalar ve görselleştirmeler için, React bileşenleri ve
            canvas/SVG tabanlı görselleştirme kütüphaneleri kullanılmıştır.
            Performans ölçümleri için Web API'leri ve işlem yoğun hesaplamalar
            için Web Worker'lar kullanılmaktadır.
          </p>
        </div>
      ),
      category: 'technical',
      tags: ['teknoloji', 'framework', 'geliştirme'],
    },
    {
      id: 'contribute-1',
      question: 'Projeye nasıl katkıda bulunabilirim?',
      answer: (
        <div>
          <p>Projeye çeşitli şekillerde katkıda bulunabilirsiniz:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Yeni algoritmalar ve görselleştirmeler ekleme</li>
            <li>Var olan demoları iyileştirme</li>
            <li>Dokümantasyon ve açıklamaları geliştirme</li>
            <li>Hataları düzeltme</li>
            <li>Yeni özellikler önerme</li>
            <li>Çevirilere yardımcı olma</li>
          </ul>
          <p className="mt-2">
            Katkıda bulunma sürecinin detayları için{' '}
            <a
              href="/resources/contributing"
              className="text-primary hover:underline"
            >
              Katkıda Bulunma
            </a>{' '}
            sayfamızı ziyaret edin.
          </p>
        </div>
      ),
      category: 'contribute',
      tags: ['katkı', 'geliştirme', 'katılım'],
    },
    {
      id: 'contribute-2',
      question: 'Teknik bilgim olmadan nasıl katkıda bulunabilirim?',
      answer: (
        <div>
          <p>
            Teknik programlama bilgisi olmadan da projeye değerli katkılarda
            bulunabilirsiniz:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Dokümantasyonda yazım hatalarını düzeltme</li>
            <li>Algoritma açıklamalarını daha anlaşılır hale getirme</li>
            <li>Kullanıcı arayüzü için geri bildirim sağlama</li>
            <li>Sosyal medyada projeyi paylaşarak farkındalık yaratma</li>
            <li>
              Kullanıcı perspektifinden öneriler ve geribildirimler sağlama
            </li>
          </ul>
          <p className="mt-2">
            Tüm katkılar, projenin daha iyi hale gelmesine yardımcı olur ve
            takdir edilir!
          </p>
        </div>
      ),
      category: 'contribute',
      tags: ['katkı', 'teknik olmayan', 'geribildirim'],
    },
  ];

  // Update FAQ state on component mount
  useEffect(() => {
    setFaqs(faqData);
  }, []);

  // Filter FAQs based on search query and category
  const getFilteredFaqs = (category: string) => {
    let filteredFaqs = [...faqData];

    // Filter by search query if exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredFaqs = filteredFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          (typeof faq.answer === 'string' &&
            faq.answer.toLowerCase().includes(query)) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by category if not "all"
    if (category !== 'all') {
      filteredFaqs = filteredFaqs.filter((faq) => faq.category === category);
    }

    return filteredFaqs;
  };

  // Toggle expand/collapse FAQ item
  const toggleItem = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Record if answer was helpful
  const markHelpful = (id: string, isHelpful: boolean) => {
    setFaqs((prev) =>
      prev.map((faq) => (faq.id === id ? { ...faq, isHelpful } : faq))
    );
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  // Count FAQs by category
  const getCategoryCount = (category: string) => {
    return category === 'all'
      ? faqData.length
      : faqData.filter((faq) => faq.category === category).length;
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      {/* Header section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Sık Sorulan Sorular
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Algorithms Playground hakkında en çok sorulan sorular ve yanıtları
        </p>

        {/* Search box */}
        <div className="relative mt-6 max-w-lg mx-auto">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <Input
            className="pl-10"
            placeholder="Sorularda ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* FAQ categories tabs */}
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            Tümü{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('all')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="general" className="flex-1">
            Genel{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('general')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="algorithms" className="flex-1">
            Algoritmalar{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('algorithms')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="usage" className="flex-1">
            Kullanım{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('usage')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="technical" className="flex-1">
            Teknik{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('technical')}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="contribute" className="flex-1">
            Katkıda Bulunma{' '}
            <Badge variant="secondary" className="ml-2">
              {getCategoryCount('contribute')}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* FAQ content for each category */}
        {[
          'all',
          'general',
          'algorithms',
          'usage',
          'technical',
          'contribute',
        ].map((category) => (
          <TabsContent key={category} value={category} className="pt-4">
            <AnimatePresence>
              {getFilteredFaqs(category).length > 0 ? (
                <motion.div
                  className="space-y-4"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                    exit: { opacity: 0 },
                  }}
                >
                  {getFilteredFaqs(category).map((faq) => (
                    <motion.div
                      key={faq.id}
                      variants={itemVariants}
                      className="border rounded-lg overflow-hidden"
                    >
                      {/* Question header */}
                      <div
                        className={`p-4 flex justify-between items-center cursor-pointer ${
                          expandedItems.includes(faq.id)
                            ? 'bg-muted'
                            : 'bg-card'
                        }`}
                        onClick={() => toggleItem(faq.id)}
                      >
                        <h3 className="font-medium text-lg">{faq.question}</h3>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expandedItems.includes(faq.id) ? 'rotate-180' : ''
                          }`}
                        />
                      </div>

                      {/* Answer content with animation */}
                      <AnimatePresence>
                        {expandedItems.includes(faq.id) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 border-t">
                              <div className="prose dark:prose-invert max-w-none">
                                {faq.answer}
                              </div>

                              {/* Tags */}
                              <div className="flex flex-wrap gap-1 mt-4">
                                {faq.tags.map((tag) => (
                                  <Badge
                                    key={tag}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>

                              {/* Helpful buttons */}
                              {/* <div className="mt-4 flex items-center space-x-4">
                                <span className="text-sm text-muted-foreground">
                                  Bu yanıt yardımcı oldu mu?
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`${faq.isHelpful === true ? 'bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markHelpful(faq.id, true);
                                  }}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-1" />
                                  Evet
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className={`${faq.isHelpful === false ? 'bg-red-100 dark:bg-red-900 border-red-200 dark:border-red-800' : ''}`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markHelpful(faq.id, false);
                                  }}
                                >
                                  <ThumbsDown className="h-4 w-4 mr-1" />
                                  Hayır
                                </Button>
                              </div> */}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-lg font-medium mb-2">
                    Arama kriterlerinize uygun soru bulunamadı
                  </h3>
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
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        ))}
      </Tabs>

      {/* Ask a question section */}
      <div className="mt-16 p-6 bg-muted rounded-lg text-center">
        <h2 className="text-xl font-bold mb-4">Sorunuzu Bulamadınız mı?</h2>
        <p className="mb-6 max-w-xl mx-auto">
          Eğer burada yanıtını bulamadığınız bir sorunuz varsa, doğrudan bize
          sorabilirsiniz. GitHub üzerinden bir issue açın veya e-posta gönderin.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild variant="outline">
            <a
              href="https://github.com/zzafergok/algorithms-playground/issues/new?template=question.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub'da Soru Sorun
            </a>
          </Button>
          <Button asChild>
            <a href="mailto:gok.zaferr@gmail.com">E-posta Gönderin</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
