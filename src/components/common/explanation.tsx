'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getComplexityName } from '@/lib/utils';

interface AlgorithmExplanationProps {
  title: string;
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  advantages: string[];
  disadvantages: string[];
  pseudocode: string;
  applications: string[];
}

export function AlgorithmExplanation({
  title,
  description,
  timeComplexity,
  spaceComplexity,
  advantages,
  disadvantages,
  pseudocode,
  applications,
}: AlgorithmExplanationProps) {
  return (
    <div className="algorithm-explanation space-y-6">
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="complexity">Karmaşıklık</TabsTrigger>
          <TabsTrigger value="code">Pseudo Kod</TabsTrigger>
          <TabsTrigger value="applications">Uygulama Alanları</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Avantajlar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {advantages.map((advantage, index) => (
                    <li key={index}>{advantage}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Dezavantajlar</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {disadvantages.map((disadvantage, index) => (
                    <li key={index}>{disadvantage}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="complexity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Zaman Karmaşıklığı</CardTitle>
              <CardDescription>
                Algoritmanın çalışma süresinin girdi boyutuna bağlı olarak
                değişimi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">En İyi Durum</h4>
                  <div className="text-xl font-mono">{timeComplexity.best}</div>
                  <p className="text-sm text-muted-foreground">
                    {getComplexityName(timeComplexity.best).description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Ortalama Durum</h4>
                  <div className="text-xl font-mono">
                    {timeComplexity.average}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getComplexityName(timeComplexity.average).description}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">En Kötü Durum</h4>
                  <div className="text-xl font-mono">
                    {timeComplexity.worst}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getComplexityName(timeComplexity.worst).description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alan Karmaşıklığı</CardTitle>
              <CardDescription>
                Algoritmanın bellek kullanımının girdi boyutuna bağlı olarak
                değişimi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-xl font-mono">{spaceComplexity}</div>
                <p className="text-sm text-muted-foreground">
                  {getComplexityName(spaceComplexity).description}
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="code">
          <Card>
            <CardHeader>
              <CardTitle>Pseudo Kodu</CardTitle>
              <CardDescription>
                Algoritmanın adım adım genel uygulaması
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                <code className="text-sm">{pseudocode}</code>
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Uygulama Alanları</CardTitle>
              <CardDescription>
                Bu algoritmanın gerçek hayatta kullanıldığı yerler
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                {applications.map((application, index) => (
                  <li key={index}>{application}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
