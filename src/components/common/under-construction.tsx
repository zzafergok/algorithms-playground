'use client';

import Link from 'next/link';

import {
  Send,
  Code,
  Code2,
  Github,
  Search,
  Rocket,
  FileText,
  Lightbulb,
  ArrowLeft,
  Microscope,
  AlertCircle,
  Construction,
} from 'lucide-react';
import { motion } from 'framer-motion';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UnderConstructionProps {
  title: string; // Sayfa başlığı
  description?: string; // İsteğe bağlı açıklama
  returnPath?: string; // Geri dönüş yolu (varsayılan olarak kategori sayfası)
  category?: string; // Algoritma kategorisi
}

// Geliştirme süreci timeline adımları
const timelineSteps = [
  {
    title: 'Araştırma',
    description: 'Algoritma hakkında kapsamlı araştırma ve kaynak toplama',
    status: 'Tamamlandı',
    icon: Search,
  },
  {
    title: 'İçerik Planlama',
    description: 'Teori, örnekler ve görselleştirmelerin planlanması',
    status: 'Devam Ediyor',
    icon: FileText,
  },
  {
    title: 'Geliştirme',
    description: 'İnteraktif demo ve görselleştirmelerin kodlanması',
    status: 'Planlandı',
    icon: Code2,
  },
  {
    title: 'Test ve İyileştirme',
    description: 'Kullanıcı deneyimi testleri ve iyileştirmeler',
    status: 'Planlandı',
    icon: Microscope,
  },
  {
    title: 'Yayınlama',
    description: 'İçeriğin gözden geçirilmesi ve canlıya alınması',
    status: 'Planlandı',
    icon: Rocket,
  },
];

export function UnderConstruction({
  title,
  category,
  returnPath,
  description,
}: UnderConstructionProps) {
  const backPath =
    returnPath || (category ? `/algorithms/${category}` : '/algorithms');

  return (
    <div className="space-y-8 py-8">
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className="px-3 py-1 text-sm flex items-center gap-2 bg-amber-500/10"
          >
            <Construction className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-amber-500 font-medium">Yapım Aşamasında</span>
          </Badge>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

        {description && (
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <div className="pt-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={backPath} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Geri Dön</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-full"
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                Bu İçerik Henüz Hazır Değil
              </CardTitle>
              <CardDescription>
                Bu algoritma sayfası üzerinde çalışıyoruz ve en kısa sürede
                hazır olacaktır.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow">
              <p>
                <strong>{title}</strong> algoritmasına özel içerik,
                görselleştirmeler ve interaktif demolar için çalışmalarımız
                devam ediyor. Bu süreçte aşağıdaki kaynaklardan
                yararlanabilirsiniz:
              </p>

              <div className="pl-4 border-l-2 border-muted space-y-2">
                <p className="text-sm">
                  <span className="font-medium">📚 Benzer Algoritmalar: </span>
                  İlgili kategori sayfasından diğer algoritmalara göz
                  atabilirsiniz.
                </p>
                <p className="text-sm">
                  <span className="font-medium">💡 Katkıda Bulunun: </span>
                  Bu algoritma hakkında bilgi sahibiyseniz, katkıda bulunmaktan
                  çekinmeyin.
                </p>
                <p className="text-sm">
                  <span className="font-medium">🔍 Öneri Gönderin: </span>
                  Bu algoritma için hangi özelliklerin eklenmesini isterdiniz?
                  Bize bildirin!
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4 mt-auto">
                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="https://github.com/zzafergok/algorithms-playground"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>GitHub Repo</span>
                  </Link>
                </Button>

                <Button variant="outline" size="sm" asChild>
                  <Link
                    href="/resources/contributing"
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" />
                    <span>Katkıda Bulunma Rehberi</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="h-full"
        >
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Öneri Gönderin
              </CardTitle>
              <CardDescription>
                Bu algoritma için görüş ve önerilerinizi bizimle paylaşın
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 flex-grow flex flex-col">
              <div className="space-y-2">
                <label className="text-sm font-medium">E-posta Adresi</label>
                <Input
                  disabled
                  value="gok.zaferr@gmail.com"
                  className="bg-muted/50 text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Yukarıdaki adrese doğrudan e-posta gönderebilirsiniz
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Öneri Göndermek İçin
                </label>
                <p className="text-sm text-muted-foreground">
                  Aşağıdaki butona tıklayarak e-posta uygulamanız ile doğrudan
                  iletişime geçebilirsiniz. E-postanızın konusu otomatik olarak{' '}
                  <strong>{title}</strong> algoritması ile ilgili olarak
                  ayarlanacaktır.
                </p>
              </div>

              <div className="mt-auto pt-4">
                <Button className="w-full" asChild>
                  <a
                    href={`mailto:gok.zaferr@gmail.com?subject=Algoritma Önerisi: ${title}&body=Merhaba,%0D%0A%0D%0A${title} algoritması hakkında önerilerim/katkılarım:%0D%0A%0D%0A[Lütfen önerilerinizi buraya yazınız]%0D%0A%0D%0ATeşekkürler,%0D%0A`}
                    className="flex items-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    E-posta Gönder
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        className="pt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Geliştirme Süreci</h2>
          <p className="text-muted-foreground">
            Algoritma sayfalarımızı geliştirirken izlediğimiz adımlar
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 h-full w-0.5 bg-border transform md:-translate-x-1/2" />

          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className={`relative flex items-start gap-8 mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full border-4 border-background bg-muted transform -translate-x-1/2 z-10" />

              <div
                className={`pl-8 md:pl-0 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'} md:w-1/2`}
              >
                <h3 className="text-lg font-semibold flex items-center gap-2 md:gap-3">
                  {index % 2 === 0 ? (
                    <>
                      <span>{step.title}</span>
                      <step.icon className="h-5 w-5 md:order-first" />
                    </>
                  ) : (
                    <>
                      <step.icon className="h-5 w-5" />
                      <span>{step.title}</span>
                    </>
                  )}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>

                <div
                  className={`mt-2 flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'}`}
                >
                  <Badge
                    variant={
                      step.status === 'Tamamlandı'
                        ? 'success'
                        : step.status === 'Devam Ediyor'
                          ? 'warning'
                          : 'secondary'
                    }
                    className="text-xs"
                  >
                    {step.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default UnderConstruction;
