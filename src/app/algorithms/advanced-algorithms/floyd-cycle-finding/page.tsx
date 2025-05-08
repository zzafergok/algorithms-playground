'use client';

import React, { useState, useEffect } from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Floyd döngü algoritması implementasyonu
function floydCycleFinding<T>(arr: T[]): {
  cycleExists: boolean;
  cycleStart?: number;
  cycleLength?: number;
} {
  // Boş dizi kontrolü
  if (arr.length === 0) {
    return { cycleExists: false };
  }

  let tortoise = 0; // Yavaş hareket eden işaretçi (kaplumbağa)
  let hare = 0; // Hızlı hareket eden işaretçi (tavşan)

  // Faz 1: Döngünün varlığını tespit et
  do {
    // Kaplumbağa bir adım, tavşan iki adım ilerler
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, getNextIndex(arr, hare));

    // Dizi sınırlarını aşma kontrolü
    if (tortoise === -1 || hare === -1) {
      return { cycleExists: false };
    }
  } while (tortoise !== hare);

  // Buraya ulaşıldıysa, döngü var demektir

  // Faz 2: Döngünün başlangıç noktasını bul
  tortoise = 0;
  while (tortoise !== hare) {
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, hare);
  }

  // Döngünün uzunluğunu hesapla
  let cycleLength = 1;
  hare = getNextIndex(arr, tortoise);
  while (tortoise !== hare) {
    hare = getNextIndex(arr, hare);
    cycleLength++;
  }

  return {
    cycleExists: true,
    cycleStart: tortoise,
    cycleLength: cycleLength,
  };
}

// Bir sonraki indeksi döndüren yardımcı fonksiyon
function getNextIndex<T>(arr: T[], currentIndex: number): number {
  // Dizinin sınırları içinde olup olmadığımızı kontrol et
  if (currentIndex < 0 || currentIndex >= arr.length) {
    return -1;
  }

  // Bir sonraki indeksi hesapla
  // Bu örnek için, her değer bir sonraki elemana işaret eder
  // Gerçek dünyada linked list'te bu bir pointer olurdu
  const nextIndex =
    typeof arr[currentIndex] === 'number' ? Number(arr[currentIndex]) : -1;

  // Geçerli bir indeks mi kontrol et
  if (nextIndex < 0 || nextIndex >= arr.length) {
    return -1;
  }

  return nextIndex;
}

// Döngü bulma sonuçlarını görselleştiren bileşen
const CycleVisualization: React.FC<{
  array: number[];
  result: { cycleExists: boolean; cycleStart?: number; cycleLength?: number };
}> = ({ array, result }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-4 mb-4">
        {array.map((value, index) => {
          // Döngüdeki elemanları farklı renkte göster
          let bgColor = 'bg-gray-200 dark:bg-gray-700';

          if (result.cycleExists && result.cycleStart !== undefined) {
            // Döngünün başlangıç noktasını vurgula
            if (index === result.cycleStart) {
              bgColor = 'bg-green-500 dark:bg-green-600';
            }
            // Döngüdeki diğer elemanları vurgula
            else if (
              isCycleMember(
                index,
                result.cycleStart,
                array,
                result.cycleLength || 0
              )
            ) {
              bgColor = 'bg-yellow-300 dark:bg-yellow-600';
            }
          }

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center mb-1`}
              >
                {value}
              </div>
              <div className="text-sm text-gray-500">{index}</div>
              {index < array.length - 1 && (
                <div className="w-4 h-0.5 bg-gray-300 dark:bg-gray-600 rotate-90 ml-4"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ok işaretleri ile bağlantıları göster */}
      <div className="flex flex-wrap gap-4 mb-4">
        {array.map((value, index) => (
          <div key={index} className="flex items-center">
            <div className="text-xs">
              {index} → {value}
            </div>
            {index < array.length - 1 && <div className="w-4"></div>}
          </div>
        ))}
      </div>

      {/* Sonuç bilgilerini göster */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Sonuç</CardTitle>
        </CardHeader>
        <CardContent>
          {result.cycleExists ? (
            <div>
              <p className="text-green-600 dark:text-green-400 font-medium mb-2">
                Döngü tespit edildi!
              </p>
              <ul className="list-disc pl-4">
                <li>Döngünün başlangıç indeksi: {result.cycleStart}</li>
                <li>Döngünün uzunluğu: {result.cycleLength}</li>
                <li>
                  Döngüdeki elemanlar:{' '}
                  {getCycleMembers(
                    result.cycleStart || 0,
                    array,
                    result.cycleLength || 0
                  ).join(' → ')}
                </li>
              </ul>
            </div>
          ) : (
            <p className="text-red-600 dark:text-red-400">
              Döngü tespit edilemedi.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

// Bir indeksin döngünün parçası olup olmadığını kontrol et
function isCycleMember(
  index: number,
  cycleStart: number,
  array: number[],
  cycleLength: number
): boolean {
  let current = cycleStart;
  for (let i = 0; i < cycleLength; i++) {
    if (current === index) return true;
    current = array[current];
  }
  return false;
}

// Döngüdeki elemanları al
function getCycleMembers(
  cycleStart: number,
  array: number[],
  cycleLength: number
): number[] {
  const members = [cycleStart];
  let current = array[cycleStart];

  for (let i = 1; i < cycleLength; i++) {
    members.push(current);
    current = array[current];
  }

  return members;
}

export default function FloydCycleFindingPage() {
  // Örnek dizi durumu
  const [inputArray, setInputArray] = useState<number[]>([1, 3, 4, 2, 2]);
  const [inputText, setInputText] = useState('1, 3, 4, 2, 2');
  const [result, setResult] = useState<{
    cycleExists: boolean;
    cycleStart?: number;
    cycleLength?: number;
  }>({ cycleExists: false });

  // Algoritma açıklaması için veriler
  const pseudocode = `function floydCycleFinding(arr):
    # Faz 1: Döngünün varlığını tespit et
    tortoise = 0 # Yavaş işaretçi
    hare = 0     # Hızlı işaretçi
    
    repeat
        tortoise = getNextIndex(arr, tortoise)
        hare = getNextIndex(arr, getNextIndex(arr, hare))
        
        if tortoise is invalid or hare is invalid
            return {cycleExists: false}
    until tortoise == hare
    
    # Faz 2: Döngünün başlangıç noktasını bul
    tortoise = 0
    while tortoise != hare
        tortoise = getNextIndex(arr, tortoise)
        hare = getNextIndex(arr, hare)
    
    # Döngünün uzunluğunu hesapla
    cycleLength = 1
    hare = getNextIndex(arr, tortoise)
    while tortoise != hare
        hare = getNextIndex(arr, hare)
        cycleLength++
    
    return {
        cycleExists: true,
        cycleStart: tortoise,
        cycleLength: cycleLength
    }`;

  const implementations = {
    typescript: `function floydCycleFinding<T>(arr: T[]): { cycleExists: boolean; cycleStart?: number; cycleLength?: number } {
  // Boş dizi kontrolü
  if (arr.length === 0) {
    return { cycleExists: false };
  }

  let tortoise = 0; // Yavaş hareket eden işaretçi (kaplumbağa)
  let hare = 0;     // Hızlı hareket eden işaretçi (tavşan)
  
  // Faz 1: Döngünün varlığını tespit et
  do {
    // Kaplumbağa bir adım, tavşan iki adım ilerler
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, getNextIndex(arr, hare));
    
    // Dizi sınırlarını aşma kontrolü
    if (tortoise === -1 || hare === -1) {
      return { cycleExists: false };
    }
    
  } while (tortoise !== hare);
  
  // Buraya ulaşıldıysa, döngü var demektir
  
  // Faz 2: Döngünün başlangıç noktasını bul
  tortoise = 0;
  while (tortoise !== hare) {
    tortoise = getNextIndex(arr, tortoise);
    hare = getNextIndex(arr, hare);
  }
  
  // Döngünün uzunluğunu hesapla
  let cycleLength = 1;
  hare = getNextIndex(arr, tortoise);
  while (tortoise !== hare) {
    hare = getNextIndex(arr, hare);
    cycleLength++;
  }
  
  return {
    cycleExists: true,
    cycleStart: tortoise,
    cycleLength: cycleLength
  };
}`,
    python: `def floyd_cycle_finding(arr):
    """
    Floyd's Cycle-Finding algoritması ile bağlı listedeki döngüleri tespit eder.
    """
    # Boş dizi kontrolü
    if not arr:
        return {"cycle_exists": False}
    
    # Faz 1: Döngünün varlığını tespit et
    tortoise = 0  # Yavaş işaretçi
    hare = 0      # Hızlı işaretçi
    
    while True:
        # Kaplumbağa bir adım, tavşan iki adım ilerler
        tortoise = get_next_index(arr, tortoise)
        hare = get_next_index(arr, get_next_index(arr, hare))
        
        # Dizi sınırlarını aşma kontrolü
        if tortoise == -1 or hare == -1:
            return {"cycle_exists": False}
        
        if tortoise == hare:
            break
    
    # Faz 2: Döngünün başlangıç noktasını bul
    tortoise = 0
    while tortoise != hare:
        tortoise = get_next_index(arr, tortoise)
        hare = get_next_index(arr, hare)
    
    # Döngünün uzunluğunu hesapla
    cycle_length = 1
    hare = get_next_index(arr, tortoise)
    while tortoise != hare:
        hare = get_next_index(arr, hare)
        cycle_length += 1
    
    return {
        "cycle_exists": True,
        "cycle_start": tortoise,
        "cycle_length": cycle_length
    }

def get_next_index(arr, current_index):
    """
    Bir sonraki indeksi döndüren yardımcı fonksiyon.
    """
    # Dizinin sınırları içinde olup olmadığımızı kontrol et
    if current_index < 0 or current_index >= len(arr):
        return -1
    
    # Bir sonraki indeksi hesapla
    next_index = arr[current_index] if isinstance(arr[current_index], int) else -1
    
    # Geçerli bir indeks mi kontrol et
    if next_index < 0 or next_index >= len(arr):
        return -1
    
    return next_index`,
  };

  // Uygulama çalıştığında örnek diziyi işle
  useEffect(() => {
    handleRunAlgorithm();
  }, []);

  // Input değişikliklerini işle
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  // Algoritma çalıştırma işlevi
  const handleRunAlgorithm = () => {
    try {
      // Girdiyi sayı dizisine dönüştür
      const parsedArray = inputText
        .split(',')
        .map((item) => parseInt(item.trim(), 10))
        .filter((num) => !isNaN(num));

      if (parsedArray.length === 0) {
        throw new Error('Lütfen geçerli bir sayı dizisi girin.');
      }

      // Sayıların dizi indeksleri içinde olduğundan emin ol
      const isValid = parsedArray.every(
        (num) => num >= 0 && num < parsedArray.length
      );
      if (!isValid) {
        throw new Error(
          'Her değer dizi uzunluğundan küçük olmalıdır (indeks olarak çalışması için).'
        );
      }

      setInputArray(parsedArray);
      const algorithmResult = floydCycleFinding(parsedArray);
      setResult(algorithmResult);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Bir hata oluştu!');
    }
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Floyd's Cycle Finding Algoritması (Tortoise and Hare)"
        description="Floyd'un Döngü Bulma Algoritması, bağlı listelerdeki döngüleri tespit etmek için kullanılan verimli bir algoritmadır. 'Kaplumbağa ve Tavşan' algoritması olarak da bilinir. Biri yavaş (kaplumbağa), diğeri hızlı (tavşan) hareket eden iki işaretçi kullanarak, döngü varsa bu iki işaretçinin mutlaka bir noktada buluşacağı prensibine dayanır."
        timeComplexity={{
          best: 'O(n)',
          average: 'O(n)',
          worst: 'O(n)',
        }}
        spaceComplexity="O(1)"
        advantages={[
          'Sabit bellek kullanımı (O(1) uzay karmaşıklığı)',
          'Doğrusal zaman karmaşıklığı (O(n))',
          'Döngünün başlangıç noktasını ve uzunluğunu tespit edebilir',
          'Uygulaması basittir ve minimum işaretçi kullanır',
        ]}
        disadvantages={[
          'Yalnızca bağlı listeler veya işaretçi temelli veri yapıları için tasarlanmıştır',
          'Algoritma, durum makinesi veya otomat tabanlı algoritmalardan daha az sezgiseldir',
          'Hash tablosu kullanarak çözme yaklaşımından biraz daha yavaş olabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Bağlı listelerde döngü tespiti',
          'Bellek sızıntılarını tespit etme',
          'Döngüsel referansları bulma',
          'Sayı dizilerinde döngü tespiti (örn. çarpım zinciri)',
          'Rasgele sayı üreteçlerinde döngü tespiti',
          'Fonksiyon iterasyonlarında desen tespiti',
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Demo</h2>
        <p className="text-muted-foreground">
          Floyd's Cycle Finding algoritmasını test edin. Aşağıdaki dizide her
          sayı, bir sonraki indeksi temsil eder (dizideki bir değer 3 ise, o
          pozisyonda 3. indekse bir bağlantı olduğunu gösterir). Döngü
          oluşturmak için, aynı indekse birden fazla bağlantı olmalıdır.
        </p>

        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="input">Dizi (virgülle ayrılmış sayılar)</Label>
            <div className="flex space-x-2">
              <Input
                id="input"
                value={inputText}
                onChange={handleInputChange}
                placeholder="Örnek: 1, 3, 4, 2, 2"
              />
              <Button onClick={handleRunAlgorithm}>Çalıştır</Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Her sayı, o indeksten bağlanan bir sonraki indeksi temsil eder.
              Sayılar 0 ile (dizi uzunluğu - 1) arasında olmalıdır.
            </p>
          </div>

          <CycleVisualization array={inputArray} result={result} />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Floyd's Cycle Finding algoritmasının farklı programlama dillerindeki
          implementasyonları.
        </p>

        <Tabs defaultValue="typescript">
          <TabsList>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
          </TabsList>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="Floyd's Cycle Finding - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Floyd's Cycle Finding - Python"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>Floyd'un Döngü Bulma Algoritması iki aşamada çalışır:</p>

          <h3>Faz 1: Döngünün Varlığını Tespit Etme</h3>
          <ul>
            <li>
              İki işaretçi kullanılır: tortoise (kaplumbağa) ve hare (tavşan).
            </li>
            <li>Her adımda kaplumbağa bir adım, tavşan iki adım ilerler.</li>
            <li>
              Eğer döngü varsa, tavşan kaplumbağayı mutlaka yakalar (aynı
              noktada buluşurlar).
            </li>
            <li>
              Eğer tavşan listenin sonuna ulaşırsa (null/undefined), döngü
              yoktur.
            </li>
          </ul>

          <h3>Faz 2: Döngünün Başlangıç Noktasını Bulma</h3>
          <ul>
            <li>Kaplumbağa başlangıç noktasına (0 indeksine) geri döner.</li>
            <li>Tavşan Faz 1'deki buluşma noktasında kalır.</li>
            <li>Şimdi her ikisi de aynı hızda (her adımda bir) ilerler.</li>
            <li>Buluştukları nokta, döngünün başlangıç noktasıdır.</li>
          </ul>

          <h3>Faz 3: Döngünün Uzunluğunu Hesaplama</h3>
          <ul>
            <li>
              Döngünün başlangıç noktasından itibaren bir işaretçi ilerletilir.
            </li>
            <li>Başlangıç noktasına geri dönene kadar adımlar sayılır.</li>
            <li>Bu sayı, döngünün uzunluğunu verir.</li>
          </ul>

          <h3>Matematiksel Sezgi</h3>
          <p>
            Bu algoritmanın çalışmasının arkasındaki matematiksel sezgi şudur:
            Eğer kaplumbağa ve tavşan döngü içerisinde buluşursa, kaplumbağa 'k'
            adım atmışsa, tavşan '2k' adım atmıştır. Buluşma noktasından
            döngünün başlangıcına olan mesafe, başlangıç noktasından döngü
            başlangıcına olan mesafeye eşittir. Bu, döngünün başlangıcını bulmak
            için ikinci fazda iki işaretçinin neden aynı noktada buluştuğunu
            açıklar.
          </p>
        </div>
      </div>
    </div>
  );
}
