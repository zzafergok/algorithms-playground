// src/app/hakkinda/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

import React, { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { motion } from 'framer-motion';
import { BookOpen, Code, Coffee, Globe, Heart, Mail } from 'lucide-react';

export default function AboutPage() {
  // State for tracking which card is hovered
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // State for the fun fact randomizer
  const [funFact, setFunFact] = useState('');

  // Array of interesting facts to display randomly
  const funFacts = [
    "Dijkstra'nın algoritması ilk olarak kağıt üzerinde bir kahve dükkanında geliştirildi.",
    "Bir programcı olarak en sevdiğim şaka: 'İki dizinci bir bara girer ve barmen sorar: Ne istemiştiniz? Dizinci cevap verir: Bir içki, iki içki.'",
    'İlk aşk mektubumu bir algoritma şeklinde yazdım. Hala red cevabının neden O(1) sürede geldiğini çözebilmiş değilim.',
    "Quicksort algoritmasının mucidi Tony Hoare, daha sonra null referansı icat ettiği için 'milyarlarca dolarlık hata' olarak adlandırdığı şey için özür diledi.",
    "Hayatımın 42.195 km'sini koşarak geçirdim - tam bir maraton mesafesi!",
  ];

  // Effect to change the fun fact every 8 seconds
  useEffect(() => {
    const randomizeFact = () => {
      const randomIndex = Math.floor(Math.random() * funFacts.length);
      setFunFact(funFacts[randomIndex]);
    };

    // Set initial fact
    randomizeFact();

    // Update fact periodically
    const interval = setInterval(randomizeFact, 8000);

    // Clean up on unmount
    return () => clearInterval(interval);
  }, []);

  // Journey timeline data
  const journeySteps = [
    {
      year: '2010',
      title: 'İlk Algoritmamı Yazdım',
      description:
        'Üniversite yıllarımda bir Bubble Sort implementasyonu ile başladı her şey.',
    },
    {
      year: '2015',
      title: 'Teknoloji Şirketi Kurdum',
      description:
        'Algoritma optimizasyonu üzerine çalışan küçük bir ekiple yola çıktık.',
    },
    {
      year: '2019',
      title: 'Açık Kaynak Projelere Katkı',
      description:
        'Topluluk için çeşitli algoritma kütüphanelerine katkıda bulundum.',
    },
    {
      year: '2022',
      title: 'Algorithms Playground',
      description:
        'Öğrenme yolculuğumda edindiğim tüm bilgileri paylaşmak için bu platformu oluşturdum.',
    },
  ];

  return (
    <div className="space-y-16 max-w-4xl mx-auto py-8">
      {/* Hero Section - Unconventional layout with asymmetrical elements */}
      <section className="relative">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -left-20 w-40 h-40 bg-secondary/20 rounded-full blur-xl" />

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 p-6">
          {/* Profile image with animated border */}
          <motion.div
            className="relative w-56 h-56 rounded-lg overflow-hidden border-2 border-primary"
            animate={{
              borderColor: [
                '#3B82F6',
                '#10B981',
                '#8B5CF6',
                '#F97316',
                '#3B82F6',
              ],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/assets/20210104_230350.jpg"
              alt="Stark"
              fill
              className="object-cover"
              // This would need to be replaced with an actual image
              // For now we'll show a placeholder
              unoptimized
            />
          </motion.div>

          {/* Introduction text */}
          <div className="space-y-4">
            <motion.h1
              className="text-4xl font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Merhaba, Ben <span className="text-primary">Stark</span>
            </motion.h1>

            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Algoritma tutkunu, yazılım geliştiricisi, ve sürekli öğrenen bir
              meraklı.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Badge variant="outline">Algoritma Aşığı</Badge>
              <Badge variant="outline">Full-stack Geliştirici</Badge>
              <Badge variant="outline">Açık Kaynak Katkıcısı</Badge>
              <Badge variant="outline">Sürekli Öğrenci</Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* My Story Section - Written in a personal, engaging style */}
      <section className="space-y-6 relative">
        <div className="absolute -right-40 top-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10" />

        <h2 className="text-3xl font-bold tracking-tight">Hikayem</h2>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">
            Ben Stark. Algoritmaların büyülü dünyasına lisede bir bilgisayar
            dersinde aşık oldum. İlginç bir şekilde, bu ders pek çok arkadaşım
            için sıradan bir "zorunlu ders" iken, benim için yepyeni bir
            dünyanın kapılarını açtı.
          </p>

          <p className="text-lg leading-relaxed">
            Bir sorunu çözmenin her zaman birden fazla yolu olduğunu, ancak{' '}
            <em>nasıl</em> çözdüğünüzün bazen <em>çözüp çözemediğiniz</em> kadar
            önemli olduğunu o derste öğrendim. İlk ödevimde bir veri setini
            sıralamaya çalışırken, Bubble Sort algoritmasını kullanmıştım - ve
            elbette program çok büyük veri setlerinde çöktü. Hocamız "daha iyi
            bir yol düşünün" dediğinde, algoritma dünyasına ilk adımımı atmış
            oldum.
          </p>

          <p className="text-lg leading-relaxed">
            O günden beri, algoritmaların hem pratik hem de felsefi yönlerini
            keşfediyorum. Bilgisayar bilimlerinde ve yazılım mühendisliğinde
            resmi eğitimimi tamamladıktan sonra, çeşitli şirketlerde çalıştım,
            kendi girişimlerimi başlattım ve açık kaynak projelere katkıda
            bulundum. Tüm bu süreçte, algoritmaların günlük hayatımızdaki yerini
            ve önemini daha derinden anladım.
          </p>

          <p className="text-lg leading-relaxed">
            <strong className="text-primary">Algorithms Playground</strong>,
            benim bu tutkumu başkalarıyla paylaşma arzumdan doğdu. İnanıyorum ki
            algoritmaları öğrenmek, sadece bilgisayar bilimlerindeki başarı için
            değil, aynı zamanda sistematik ve yaratıcı düşünme yeteneklerini
            geliştirmek için de son derece değerli bir yolculuktur.
          </p>

          <p className="text-lg leading-relaxed">
            Bu platform aracılığıyla, algoritmaları sadece akademik bir konu
            olmaktan çıkarıp, onları herkesin anlayabileceği, keşfedebileceği ve
            sevebileceği bir hale getirmeyi amaçlıyorum. Çünkü bana göre,
            algoritmalar sadece bilgisayar programları değil, aynı zamanda
            düşünce alışkanlıklarıdır.
          </p>
        </div>
      </section>

      {/* Random Fun Fact Section - Adds personality and surprise */}
      <motion.section
        className="rounded-xl bg-muted p-6 relative overflow-hidden"
        animate={{
          boxShadow: [
            '0 4px 20px rgba(0,0,0,0.1)',
            '0 4px 20px rgba(0,0,0,0.2)',
            '0 4px 20px rgba(0,0,0,0.1)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-blue-400 to-primary animate-gradient-x" />

        <div className="flex items-center gap-4">
          <Coffee className="h-8 w-8 text-primary" />
          <h3 className="text-xl font-bold">Rastgele Eğlenceli Bilgi</h3>
        </div>

        <motion.p
          className="mt-3 text-lg"
          key={funFact}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {funFact}
        </motion.p>
      </motion.section>

      {/* Journey Timeline - Visual storytelling */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">Yolculuğum</h2>

        <div className="relative border-l-2 border-primary/50 pl-6 space-y-8 ml-2">
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.year}
              className="relative"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline dot */}
              <div className="absolute -left-[34px] w-6 h-6 rounded-full bg-background border-2 border-primary" />

              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">{step.year}</div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills and Interests - Interactive cards */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">İlgi Alanlarım</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <Code className="h-6 w-6" />,
              title: 'Algoritma Tasarımı',
              description:
                'Karmaşık sorunları çözmek için verimli ve yaratıcı algoritmalar geliştirmek benim tutku projemdir.',
            },
            {
              icon: <BookOpen className="h-6 w-6" />,
              title: 'Sürekli Öğrenme',
              description:
                'Her gün yeni bir şey öğrenmek benim mottom. Bilgisayar bilimlerindeki gelişmeleri yakından takip ediyorum.',
            },
            {
              icon: <Globe className="h-6 w-6" />,
              title: 'Açık Kaynak',
              description:
                'Bilgi paylaştıkça çoğalır. Topluluk projeleri ve açık kaynak katkılar yapıyorum.',
            },
            {
              icon: <Heart className="h-6 w-6" />,
              title: 'Mentorluk',
              description:
                'Bilgilerimi yeni başlayanlarla paylaşmak ve onlara ilham vermek en sevdiğim aktivitelerden biri.',
            },
          ].map((card, index) => (
            <motion.div
              key={index}
              className={`rounded-lg border p-4 transition-all duration-300 ${activeCard === index ? 'bg-primary/10 -translate-y-1' : 'bg-card'}`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`p-2 rounded-full ${activeCard === index ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
                >
                  {card.icon}
                </div>
                <h3 className="font-semibold text-lg">{card.title}</h3>
              </div>
              <p className="text-muted-foreground">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action - Encouraging engagement */}
      <section className="space-y-6 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Bana Ulaşın</h2>

        <p className="text-lg max-w-2xl mx-auto">
          Algoritmalar, programlama veya herhangi bir konuda sohbet etmek için
          benimle iletişime geçebilirsiniz. Sorularınızı, geri bildirimlerinizi
          veya sadece merhaba demek istediğinizi duymaktan mutluluk duyarım.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <Button asChild>
            <Link
              href="mailto:gok.zaferr@gmail.com"
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              E-posta Gönder
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link
              href="https://github.com/zzafergok"
              className="flex items-center gap-2"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Link>
          </Button>
        </div>
      </section>

      {/* Quotes Section - Inspiration corner */}
      <section className="relative p-8 bg-muted rounded-lg overflow-hidden">
        <div className="absolute -top-10 -left-10 text-[150px] opacity-5 font-serif">
          "
        </div>

        <blockquote className="relative z-10 text-xl italic">
          Programlar yazarken insanlar düşünürken nasıl düşünmeleri gerektiğini
          öğreniyor.
          <span className="block mt-4 text-right font-semibold text-primary">
            — Bill Gates
          </span>
        </blockquote>
      </section>
    </div>
  );
}
