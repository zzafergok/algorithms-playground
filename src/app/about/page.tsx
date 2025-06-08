'use client';

import Link from 'next/link';

import React from 'react';

import { motion } from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Cpu,
  Zap,
  Mail,
  Code2,
  Users,
  Layers,
  Target,
  Rocket,
  BookOpen,
  Sparkles,
  FileText,
  GitBranch,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';

export default function AboutPage() {
  const platformFeatures = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: 'Görsel Öğrenme',
      description:
        'Her algoritmanın adım adım görselleştirilmesi ile karmaşık konseptleri kolayca anlayın.',
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: 'Kapsamlı İçerik',
      description:
        '15+ kategori ve 50+ algoritma ile programlama temellerinizi güçlendirin.',
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Pratik Odaklı',
      description:
        'Teoriyi pratiğe dökün, kendi verilerinizle algoritmaları test edin.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Herkes İçin',
      description:
        'Yeni başlayanlardan ileri seviye geliştiricilere, herkes için tasarlandı.',
    },
  ];

  const platformStats = [
    { value: '50+', label: 'Algoritma' },
    { value: '15+', label: 'Kategori' },
    { value: '100+', label: 'Kod Örneği' },
    { value: '24/7', label: 'Erişilebilir' },
  ];

  const learningPath = [
    {
      step: 1,
      title: 'Keşfet',
      description: 'Algoritma kategorilerini ve örnekleri inceleyin.',
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      step: 2,
      title: 'Anla',
      description: 'Görselleştirmeler ve açıklamalar ile mantığı kavrayın.',
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      step: 3,
      title: 'Uygula',
      description: 'İnteraktif demolar ile kendi verilerinizi test edin.',
      icon: <Cpu className="h-5 w-5" />,
    },
    {
      step: 4,
      title: 'Ustalaş',
      description: 'Kod örnekleri ile kendi projelerinizde kullanın.',
      icon: <GitBranch className="h-5 w-5" />,
    },
  ];

  const futureGoals = [
    'Daha fazla algoritma ve veri yapısı eklemek',
    'Video içerikler ve interaktif dersler hazırlamak',
    'Mobil uyumlu ara yüz geliştirmek',
    'Kullanıcı geri bildirimlerini entegre etmek',
    'Yerelleştirme ve çoklu dil desteği',
  ];

  const howItWorks = [
    {
      icon: <BrainCircuit className="h-6 w-6" />,
      title: 'Akıllı Görselleştirme',
      description:
        'Algoritmaların çalışma mantığını adım adım görsellerle anlatıyoruz. Her adımda neler olduğunu canlı olarak takip edebilirsiniz.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Anlık Geri Bildirim',
      description:
        'Girdiğiniz verileri anında işleyerek sonuçları görselleştiriyoruz. Farklı girdilerle algoritmanın davranışını test edebilirsiniz.',
    },
    {
      icon: <Code2 className="h-6 w-6" />,
      title: 'Çoklu Dil Desteği',
      description:
        'JavaScript, Python, Java gibi popüler dillerde kod örnekleri sunuyoruz. Tercih ettiğiniz dilde implementasyonu inceleyebilirsiniz.',
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: 'Performans Analizi',
      description:
        'Her algoritmanın zaman ve alan karmaşıklığını detaylı olarak açıklıyoruz. Farklı senaryolardaki performansını analiz edebilirsiniz.',
    },
  ];

  return (
    <div className="space-y-16 max-w-5xl mx-auto py-8">
      <section className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-primary">AlgoPit</span> Nedir?
          </h1>
        </motion.div>

        <motion.p
          className="text-xl text-muted-foreground max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Algoritmaları interaktif bir şekilde öğrenmeniz ve uygulamanız için
          tasarlanmış, görsel açıklamalar ve pratik örneklerle desteklenen
          kapsamlı bir eğitim platformu.
        </motion.p>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {platformStats.map((stat) => (
            <Card key={stat.label} className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Misyonumuz
        </h2>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed text-center">
            Algoritmaları ve veri yapılarını herkesin kolayca öğrenebileceği,
            anlayabileceği ve uygulayabileceği bir ortam oluşturmak. Karmaşık
            kavramları, görsel açıklamalar ve interaktif örneklerle basit hale
            getirerek, yazılım geliştirme topluluğunun teknik becerilerini
            güçlendirmek.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Nasıl Çalışır?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Platform Özellikleri
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {feature.icon}
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Öğrenme Yolu
        </h2>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform -translate-x-1/2" />

          <div className="space-y-8">
            {learningPath.map((item, index) => (
              <motion.div
                key={item.step}
                className="relative"
                initial={{ opacity: 0, x: index % 2 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div
                  className={`flex flex-col md:flex-row items-center gap-4 ${
                    index % 2 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>

                  <div
                    className={`flex-1 ml-12 md:ml-0 ${index % 2 ? 'md:text-right' : 'md:text-left'}`}
                  >
                    <Card className="inline-block">
                      <CardContent className="p-4">
                        <div
                          className={`flex items-center gap-3 ${index % 2 ? 'md:flex-row-reverse' : ''}`}
                        >
                          <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            {item.icon}
                          </div>
                          <div>
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Kullanılan Teknolojiler
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Framer Motion',
            'Radix UI',
          ].map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="text-base px-4 py-2"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      <section className="space-y-6 bg-muted/30 rounded-lg p-8">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Katkıda Bulunun
        </h2>
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-lg">
            AlgoPit açık kaynak bir projedir. Her türlü katkı ve önerilerinizi
            memnuniyetle karşılıyoruz.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link
                href="https://github.com/zzafergok/algorithms-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub'da İncele
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href="/resources/contributing"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Katkı Rehberi
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          Gelecek Hedeflerimiz
        </h2>
        <div className="max-w-3xl mx-auto">
          <ul className="space-y-3">
            {futureGoals.map((goal, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{goal}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">İletişim</h2>
        <p className="text-lg max-w-2xl mx-auto">
          Platform hakkında sorularınız, önerileriniz veya geri bildirimleriniz
          için bizimle iletişime geçebilirsiniz.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link
              href="mailto:gok.zaferr@gmail.com"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              E-posta Gönder
            </Link>
          </Button>
        </div>
      </section>

      <section className="relative p-8 bg-muted/30 rounded-lg overflow-hidden text-center">
        <div className="absolute -top-10 -left-10 text-[150px] opacity-5 font-serif">
          "
        </div>
        <blockquote className="relative z-10 text-xl italic max-w-3xl mx-auto">
          Herhangi bir aptal, bir bilgisayarın anlayabileceği kod yazabilir. İyi
          programcılar, insanların anlayabileceği kod yazar.
          <span className="block mt-4 font-semibold text-primary">
            — Martin Fowler
          </span>
        </blockquote>
      </section>
    </div>
  );
}
