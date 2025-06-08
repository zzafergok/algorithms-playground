'use client';

import React from 'react';
import Link from 'next/link';

import { Book, Code, FileQuestion, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ResourceCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function ResourcesPage() {
  const resourceCategories: ResourceCategory[] = [
    {
      title: 'Belgelendirme',
      description: 'Platform ve algoritmaların detaylı teknik belgelendirmesi',
      icon: <Book className="h-6 w-6" />,
      href: '/resources/documentation',
    },
    {
      title: 'Katkıda Bulunma',
      description: 'Projeye katkıda bulunmak isteyenler için rehber',
      icon: <GitFork className="h-6 w-6" />,
      href: '/resources/contributing',
    },
    {
      title: 'Sık Sorulan Sorular',
      description: 'Kullanıcıların en sık sorduğu sorular ve yanıtları',
      icon: <FileQuestion className="h-6 w-6" />,
      href: '/resources/faq',
    },
    {
      title: 'Kod Örnekleri',
      description: 'Algoritmaların farklı dillerde örnek implementasyonları',
      icon: <Code className="h-6 w-6" />,
      href: '/resources/code-examples',
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
        <h1 className="text-4xl font-bold tracking-tight mb-4">Kaynaklar</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Algoritma öğrenme yolculuğunuzu destekleyecek kapsamlı kaynaklar,
          belgeler ve rehberler
        </p>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {resourceCategories.map((category) => (
          <motion.div key={category.title} variants={itemVariants}>
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {category.icon}
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={category.href}>Görüntüle</Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Diğer Faydalı Kaynaklar</h2>

        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Harici Kaynaklar</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Book className="h-4 w-4 text-primary" />
              </div>
              <div>
                <a
                  href="https://www.algorithmist.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  The Algorithmist
                </a>
                <p className="text-sm text-muted-foreground">
                  Çeşitli algoritma problemleri ve çözümleri içeren platform
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Book className="h-4 w-4 text-primary" />
              </div>
              <div>
                <a
                  href="https://visualgo.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  VisuAlgo
                </a>
                <p className="text-sm text-muted-foreground">
                  Veri yapıları ve algoritmaların görselleştirildiği interaktif
                  platform
                </p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                <Book className="h-4 w-4 text-primary" />
              </div>
              <div>
                <a
                  href="https://www.geeksforgeeks.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  GeeksforGeeks
                </a>
                <p className="text-sm text-muted-foreground">
                  Programlama ve algoritma konularında geniş bir kaynak
                  kütüphanesi
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center p-8 border rounded-lg bg-card">
        <h2 className="text-2xl font-bold mb-4">Topluluk</h2>
        <p className="text-lg mb-6">
          Sorularınız veya katkılarınız mı var? GitHub üzerinden tartışmalara
          katılın veya issue açın.
        </p>
        <Button asChild>
          <a
            href="https://github.com/zzafergok/algorithms-playground"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub'da Bize Katılın
          </a>
        </Button>
      </div>
    </div>
  );
}
