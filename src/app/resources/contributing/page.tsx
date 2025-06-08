'use client';

import React, { useState } from 'react';

import {
  Bug,
  Book,
  Check,
  FileCode,
  FilePlus,
  GitBranch,
  HelpCircle,
  MessageSquare,
  GitPullRequest,
} from 'lucide-react';
import { motion } from 'framer-motion';

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ContributionStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: string;
  language?: string;
}

export default function ContributingPage() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const contributionSteps: ContributionStep[] = [
    {
      title: 'Fork the repository',
      description:
        'Start by forking the repository to your own GitHub account.',
      icon: <GitBranch className="h-6 w-6" />,
    },
    {
      title: 'Clone the repository',
      description: 'Clone your forked repository to your local machine.',
      icon: <FilePlus className="h-6 w-6" />,
      code: 'git clone https://github.com/YOUR_USERNAME/algorithms-playground.git\ncd algorithms-playground',
      language: 'bash',
    },
    {
      title: 'Create a branch',
      description: 'Create a new branch for your feature or bug fix.',
      icon: <GitBranch className="h-6 w-6" />,
      code: 'git checkout -b feature/your-feature-name\n# or\ngit checkout -b fix/your-bug-fix',
      language: 'bash',
    },
    {
      title: 'Install dependencies',
      description: 'Install the project dependencies.',
      icon: <FileCode className="h-6 w-6" />,
      code: 'npm install\n# or\nyarn install\n# or\npnpm install',
      language: 'bash',
    },
    {
      title: 'Make your changes',
      description:
        'Implement your feature or fix the bug. Make sure to follow the code style and add tests if applicable.',
      icon: <FileCode className="h-6 w-6" />,
    },
    {
      title: 'Test your changes',
      description:
        "Run tests to ensure your changes don't break existing functionality.",
      icon: <Check className="h-6 w-6" />,
      code: 'npm run test\n# or\nyarn test',
      language: 'bash',
    },
    {
      title: 'Commit your changes',
      description: 'Commit your changes with a descriptive commit message.',
      icon: <Check className="h-6 w-6" />,
      code: 'git add .\ngit commit -m "feat: add your feature description"\n# or\ngit commit -m "fix: resolve issue #123"',
      language: 'bash',
    },
    {
      title: 'Push to the branch',
      description: 'Push your branch to your forked repository.',
      icon: <GitPullRequest className="h-6 w-6" />,
      code: 'git push origin feature/your-feature-name',
      language: 'bash',
    },
    {
      title: 'Create a Pull Request',
      description:
        'Go to the original repository and create a pull request from your branch.',
      icon: <GitPullRequest className="h-6 w-6" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <div className="container py-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Katkıda Bulunma
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          AlgoPit'e katkıda bulunmak için rehber. Bu projeye katkıda bulunarak,
          algoritma öğrenimine ve açık kaynak topluluğuna destek olabilirsiniz.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Katkı Süreci</h2>

        <div className="relative mb-12">
          <div className="flex justify-between relative">
            {contributionSteps.map((_, index) => (
              <Button
                key={index}
                variant={index <= activeStep ? 'default' : 'outline'}
                size="icon"
                className={`relative z-10 transition-all ${
                  index <= activeStep
                    ? 'text-primary-foreground'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <div className="absolute -bottom-4 left-0 right-0 h-1 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{
                width: `${(activeStep / (contributionSteps.length - 1)) * 100}%`,
              }}
            />
          </div>
        </div>

        <Card className="border border-border mt-8">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-primary/10 text-primary">
                {contributionSteps[activeStep].icon}
              </div>
              <CardTitle>{contributionSteps[activeStep].title}</CardTitle>
            </div>
            <CardDescription>
              {contributionSteps[activeStep].description}
            </CardDescription>
          </CardHeader>

          {contributionSteps[activeStep].code && (
            <CardContent>
              <CodeBlock
                code={contributionSteps[activeStep].code}
                language={contributionSteps[activeStep].language || 'bash'}
                showLineNumbers={true}
              />
            </CardContent>
          )}

          <div className="p-4 flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
              disabled={activeStep === 0}
            >
              Önceki
            </Button>
            <Button
              onClick={() =>
                setActiveStep((prev) =>
                  Math.min(contributionSteps.length - 1, prev + 1)
                )
              }
              disabled={activeStep === contributionSteps.length - 1}
            >
              Sonraki
            </Button>
          </div>
        </Card>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Katkı Rehberleri</h2>

        <Tabs defaultValue="code">
          <TabsList className="w-full">
            <TabsTrigger value="code">Kod Standartları</TabsTrigger>
            <TabsTrigger value="docs">Dokümantasyon</TabsTrigger>
            <TabsTrigger value="bugs">Hata Raporlama</TabsTrigger>
            <TabsTrigger value="features">Özellik Önerileri</TabsTrigger>
          </TabsList>

          <TabsContent value="code" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Kod Standartları</CardTitle>
                <CardDescription>
                  Kodunuzun proje standartlarına uygun olduğundan emin olun.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Stil Rehberi</h3>
                  <ul>
                    <li>
                      ESLint ve Prettier yapılandırmalarına uygun kod yazın
                    </li>
                    <li>
                      Değişkenler ve fonksiyonlar için anlamlı isimler kullanın
                    </li>
                    <li>
                      Her fonksiyon ve karmaşık kod bloğu için açıklayıcı
                      yorumlar ekleyin
                    </li>
                    <li>
                      Her dosya başına tekli bir sorumluluk ilkesini uygulayın
                    </li>
                  </ul>

                  <h3>TypeScript</h3>
                  <ul>
                    <li>
                      Tüm fonksiyonlar ve bileşenler için doğru tipleri kullanın
                    </li>
                    <li>
                      Tür genellemesini uygun yerlerde kullanın (örn. jenerik
                      fonksiyonlar)
                    </li>
                    <li>
                      <code>any</code> kullanımından kaçının
                    </li>
                    <li>Açık dönüş tiplerini belirtin</li>
                  </ul>

                  <h3>React Bileşenleri</h3>
                  <ul>
                    <li>
                      Bileşenleri mümkün olduğunca küçük ve yeniden
                      kullanılabilir tutun
                    </li>
                    <li>Karmaşık durum yönetimi için React Hooks kullanın</li>
                    <li>Prop drilling yerine context kullanmayı tercih edin</li>
                    <li>Tüm prop'lar için TypeScript arayüzleri oluşturun</li>
                  </ul>

                  <h3>Performans</h3>
                  <ul>
                    <li>
                      Gereksiz yeniden render'ları önlemek için memo, useMemo ve
                      useCallback kullanın
                    </li>
                    <li>
                      Büyük listeleri görselleştirirken sanal listeler tercih
                      edin
                    </li>
                    <li>Yoğun işlemleri web worker'lara taşıyın</li>
                  </ul>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="text-sm font-medium mb-2">Örnek Kod Stili</h4>
                  <CodeBlock
                    code={`// Kötü
function sort(a) {
  // Sıralama işlemi
  return a.sort();
}

// İyi
/**
 * Bir diziyi sıralar
 * @param {Array<number>} array Sıralanacak dizi
 * @returns {Array<number>} Sıralanmış dizi
 */
function sortArray<T extends number>(array: T[]): T[] {
  // Giriş doğrulama
  if (!Array.isArray(array)) {
    throw new Error('Input must be an array');
  }
  
  // Sıralama işlemi (orijinal diziyi değiştirmemek için kopyasını oluşturuyoruz)
  return [...array].sort((a, b) => a - b);
}`}
                    language="typescript"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="docs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Dokümantasyon Standartları</CardTitle>
                <CardDescription>
                  İyi belgelenmiş kod ve özellikler, projenin herkes tarafından
                  anlaşılabilir olmasını sağlar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Kod Belgelendirmesi</h3>
                  <ul>
                    <li>
                      Tüm sınıflar, arayüzler ve fonksiyonlar için JSDoc
                      yorumları ekleyin
                    </li>
                    <li>
                      Parametre ve dönüş değerlerini detaylı olarak açıklayın
                    </li>
                    <li>
                      Karmaşık algoritmaların çalışma prensiplerini açıklayın
                    </li>
                    <li>
                      Edge case'leri ve varsayımları belgelemek için yorum
                      ekleyin
                    </li>
                  </ul>

                  <h3>Algoritma Dokümantasyonu</h3>
                  <p>
                    Yeni bir algoritma eklerken, aşağıdaki bilgileri içeren bir
                    dokümantasyon oluşturun:
                  </p>
                  <ul>
                    <li>Algoritmanın adı ve kısa açıklaması</li>
                    <li>
                      Zaman ve alan karmaşıklığı analizleri (en iyi, ortalama ve
                      en kötü durum)
                    </li>
                    <li>Algoritmanın avantajları ve dezavantajları</li>
                    <li>Gerçek hayat uygulama örnekleri</li>
                    <li>Pseudo kod veya akış şeması</li>
                    <li>İmplementasyon notları</li>
                  </ul>

                  <h3>README ve Wiki</h3>
                  <p>
                    Önemli değişiklikler yaptığınızda, README.md dosyasını da
                    güncellemeyi unutmayın. Yeni eklenen özellikler için wiki
                    sayfaları oluşturmayı düşünün.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bugs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Hata Raporlama</CardTitle>
                <CardDescription>
                  Bulduğunuz hataları etkili bir şekilde raporlamak için
                  kılavuzlar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Hata Raporlama Süreci</h3>
                  <ol>
                    <li>
                      GitHub Issue bölümünü kontrol edin - belki bu hata zaten
                      bildirilmiştir
                    </li>
                    <li>
                      "Bug report" şablonunu kullanarak yeni bir issue oluşturun
                    </li>
                    <li>Hatanın başlığını açık ve kısa tutun</li>
                    <li>
                      Aşağıdaki bilgileri ekleyin:
                      <ul>
                        <li>Hatanın detaylı açıklaması</li>
                        <li>Hatayı yeniden oluşturmak için adımlar</li>
                        <li>Beklenen davranış</li>
                        <li>Gerçek davranış</li>
                        <li>Ekran görüntüleri (mümkünse)</li>
                        <li>Kullandığınız ortam (tarayıcı, işletim sistemi)</li>
                        <li>Hatanın çözümü hakkında önerileriniz (varsa)</li>
                      </ul>
                    </li>
                  </ol>

                  <h3>Örnek Hata Raporu</h3>
                  <div className="bg-muted p-4 rounded-md">
                    <p className="font-semibold">
                      Başlık: Quick Sort algoritmasında büyük veri setlerinde
                      performans sorunu
                    </p>
                    <p className="text-sm">
                      <strong>Açıklama:</strong> Quick Sort algoritması
                      10.000'den fazla eleman içeren dizilerde aşırı yavaş
                      çalışıyor.
                    </p>
                    <p className="text-sm">
                      <strong>Adımlar:</strong>
                      <br />
                      1. Quick Sort algoritması sayfasına gidin
                      <br />
                      2. Giriş alanına 15.000 elemanlı rastgele dizi oluşturun
                      <br />
                      3. "Çalıştır" düğmesine tıklayın
                    </p>
                    <p className="text-sm">
                      <strong>Beklenen:</strong> Algoritmanın makul bir sürede
                      (birkaç saniye) tamamlanması
                    </p>
                    <p className="text-sm">
                      <strong>Gerçek:</strong> Algoritma tarayıcıyı dondurur
                      veya 30+ saniye sürer
                    </p>
                    <p className="text-sm">
                      <strong>Tarayıcı:</strong> Chrome 119.0.6045.123
                    </p>
                    <p className="text-sm">
                      <strong>İşletim Sistemi:</strong> Windows 11
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Özellik Önerileri</CardTitle>
                <CardDescription>
                  Yeni özellik önerilerinde bulunmak için rehber.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <h3>Özellik Önerisi Süreci</h3>
                  <ol>
                    <li>
                      GitHub Issues sayfasını kontrol edin - belki benzer bir
                      öneri zaten mevcuttur
                    </li>
                    <li>
                      "Feature request" şablonunu kullanarak yeni bir issue
                      oluşturun
                    </li>
                    <li>Özelliği açık ve anlaşılır bir şekilde tanımlayın</li>
                    <li>
                      Aşağıdaki bilgileri ekleyin:
                      <ul>
                        <li>Özellik açıklaması</li>
                        <li>
                          Bu özelliğin hangi sorunu çözeceği veya nasıl
                          kullanışlı olacağı
                        </li>
                        <li>Alternatif çözümler</li>
                        <li>Örnek kullanım senaryoları</li>
                        <li>
                          Varsa, benzer özelliklere sahip diğer projelerden
                          referanslar
                        </li>
                      </ul>
                    </li>
                  </ol>

                  <p>
                    Bir özellik önerirken, projenin genel amacına ve kapsamına
                    uygun olmasına dikkat edin. Önerdiğiniz özelliği kendinizin
                    uygulamaya istekli olup olmadığınızı belirtin.
                  </p>

                  <h3>Öneri Sonrası</h3>
                  <p>
                    Öneriniz proje yöneticileri tarafından incelendikten sonra:
                  </p>
                  <ul>
                    <li>Kabul edilebilir</li>
                    <li>Daha fazla tartışma gerektirebilir</li>
                    <li>Kapsamın dışında olduğu için reddedilebilir</li>
                    <li>Zaten planlanmış olabilir</li>
                  </ul>
                  <p>
                    Her durumda, projedeki herkesin zamanına saygı göstermek ve
                    yapıcı bir diyalog sürdürmek önemlidir.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {[
          {
            title: 'Yeni Algoritma Eklemek',
            description:
              'Yeni bir algoritma implementasyonu ve görselleştirmesi ekleyin',
            icon: <FileCode className="h-6 w-6 text-primary" />,
            link: '#',
          },
          {
            title: 'Hata Raporlamak',
            description:
              'Bulduğunuz hataları bildirin ve çözüm önerilerinde bulunun',
            icon: <Bug className="h-6 w-6 text-primary" />,
            link: 'https://github.com/zzafergok/algorithms-playground/issues/new?template=bug_report.md',
          },
          {
            title: 'Dokümantasyon İyileştirmeleri',
            description:
              'Belgeleri geliştirin, yeni örnekler ekleyin veya açıklamaları iyileştirin',
            icon: <Book className="h-6 w-6 text-primary" />,
            link: '#',
          },
          {
            title: 'Topluluk Tartışmaları',
            description: 'Projede aktif rol alın ve tartışmalara katılın',
            icon: <MessageSquare className="h-6 w-6 text-primary" />,
            link: 'https://github.com/zzafergok/algorithms-playground/discussions',
          },
        ].map((item, index) => (
          <motion.div key={item.title} variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center gap-3">
                  {item.icon}
                  <CardTitle>{item.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
              <div className="px-6 pb-6">
                <Button asChild variant="outline" className="w-full">
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    Daha Fazla Bilgi
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary p-2 rounded-full mb-4">
          <HelpCircle className="h-5 w-5" />
          <span className="font-medium">Yardıma mı ihtiyacınız var?</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Hala Sorularınız Mı Var?</h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Katkıda bulunma süreciyle ilgili sorularınız varsa, GitHub üzerinde
          bir issue açabilir veya doğrudan ekibe e-posta gönderebilirsiniz.
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
