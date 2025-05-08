'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { generateRandomArray, sleep } from '@/lib/utils';

type SortingAlgorithm =
  | 'bubble'
  | 'selection'
  | 'insertion'
  | 'merge'
  | 'quick';

interface SortingStep {
  array: number[];
  comparingIndices: number[];
  swappedIndices: number[];
}

interface SortingVisualizerProps {
  algorithm: SortingAlgorithm;
  initialArray?: number[];
}

export function SortingVisualizer({
  algorithm,
  initialArray,
}: SortingVisualizerProps) {
  const [array, setArray] = useState<number[]>(
    initialArray || generateRandomArray()
  );
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const [arraySize, setArraySize] = useState<number>(
    initialArray?.length || 20
  );
  const [showStepInfo, setShowStepInfo] = useState<boolean>(true);

  const sortingTimeout = useRef<NodeJS.Timeout | null>(null);

  // Arrays için maksimum ve minimum değerler
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);

  // Algoritma açıklamaları
  const algorithmInfo = {
    bubble: {
      name: 'Kabarcık Sıralama',
      description:
        'Her adımda komşu elemanları karşılaştırır ve gerekirse yer değiştirir.',
    },
    selection: {
      name: 'Seçmeli Sıralama',
      description:
        'Her adımda, sıralanmamış kısımdan en küçük elemanı bulur ve sıralı kısmın sonuna ekler.',
    },
    insertion: {
      name: 'Eklemeli Sıralama',
      description:
        'Bir elemanı alır ve sıralı listeye uygun pozisyona yerleştirir.',
    },
    merge: {
      name: 'Birleştirme Sıralaması',
      description: 'Diziyi ikiye böler, her parçayı sıralar ve birleştirir.',
    },
    quick: {
      name: 'Hızlı Sıralama',
      description:
        'Diziyi bir pivot etrafında böler, küçük elemanları solda, büyükleri sağda toplar.',
    },
  };

  useEffect(() => {
    // Temizlik fonksiyonu
    return () => {
      if (sortingTimeout.current) {
        clearTimeout(sortingTimeout.current);
      }
    };
  }, []);

  // Yeni dizi oluşturma fonksiyonu
  const handleGenerateArray = () => {
    if (isSorting) return;
    const newArray = generateRandomArray(arraySize, 5, 100);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(-1);
  };

  // Sıralama adımlarını hesaplayan fonksiyon
  const calculateSortingSteps = async () => {
    if (isSorting) return;
    setIsSorting(true);

    const newSteps: SortingStep[] = [];
    const arrayCopy = [...array];

    // Bubble sort algoritması
    if (algorithm === 'bubble') {
      for (let i = 0; i < arrayCopy.length; i++) {
        for (let j = 0; j < arrayCopy.length - i - 1; j++) {
          // Karşılaştırma adımını kaydet
          newSteps.push({
            array: [...arrayCopy],
            comparingIndices: [j, j + 1],
            swappedIndices: [],
          });

          if (arrayCopy[j] > arrayCopy[j + 1]) {
            // Swap işlemi
            [arrayCopy[j], arrayCopy[j + 1]] = [arrayCopy[j + 1], arrayCopy[j]];

            // Swap adımını kaydet
            newSteps.push({
              array: [...arrayCopy],
              comparingIndices: [],
              swappedIndices: [j, j + 1],
            });
          }
        }
      }
    }
    // Selection sort algoritması
    else if (algorithm === 'selection') {
      for (let i = 0; i < arrayCopy.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arrayCopy.length; j++) {
          // Karşılaştırma adımını kaydet
          newSteps.push({
            array: [...arrayCopy],
            comparingIndices: [minIndex, j],
            swappedIndices: [],
          });

          if (arrayCopy[j] < arrayCopy[minIndex]) {
            minIndex = j;
          }
        }

        if (minIndex !== i) {
          // Swap işlemi
          [arrayCopy[i], arrayCopy[minIndex]] = [
            arrayCopy[minIndex],
            arrayCopy[i],
          ];

          // Swap adımını kaydet
          newSteps.push({
            array: [...arrayCopy],
            comparingIndices: [],
            swappedIndices: [i, minIndex],
          });
        }
      }
    }
    // Insertion sort algoritması
    else if (algorithm === 'insertion') {
      for (let i = 1; i < arrayCopy.length; i++) {
        const key = arrayCopy[i];
        let j = i - 1;

        // Karşılaştırma adımını kaydet
        newSteps.push({
          array: [...arrayCopy],
          comparingIndices: [i, j],
          swappedIndices: [],
        });

        while (j >= 0 && arrayCopy[j] > key) {
          arrayCopy[j + 1] = arrayCopy[j];

          // Taşıma adımını kaydet
          newSteps.push({
            array: [...arrayCopy],
            comparingIndices: [j + 1, j],
            swappedIndices: [j + 1],
          });

          j--;
        }

        arrayCopy[j + 1] = key;

        // Yerleştirme adımını kaydet
        newSteps.push({
          array: [...arrayCopy],
          comparingIndices: [],
          swappedIndices: [j + 1],
        });
      }
    }
    // Merge sort ve Quick sort için sadece temel adımlar (gerçek uygulamada daha karmaşık olur)
    else if (algorithm === 'merge' || algorithm === 'quick') {
      // Basit bir simülasyon (gerçek merge/quick sort değil)
      for (let i = 0; i < 10; i++) {
        const randomIndex1 = Math.floor(Math.random() * arrayCopy.length);
        const randomIndex2 = Math.floor(Math.random() * arrayCopy.length);

        // Karşılaştırma adımını kaydet
        newSteps.push({
          array: [...arrayCopy],
          comparingIndices: [randomIndex1, randomIndex2],
          swappedIndices: [],
        });

        if (arrayCopy[randomIndex1] > arrayCopy[randomIndex2]) {
          // Swap işlemi
          [arrayCopy[randomIndex1], arrayCopy[randomIndex2]] = [
            arrayCopy[randomIndex2],
            arrayCopy[randomIndex1],
          ];

          // Swap adımını kaydet
          newSteps.push({
            array: [...arrayCopy],
            comparingIndices: [],
            swappedIndices: [randomIndex1, randomIndex2],
          });
        }
      }

      // Son durumu ekle - sıralanmış dizi
      const sortedArray = [...array].sort((a, b) => a - b);
      newSteps.push({
        array: sortedArray,
        comparingIndices: [],
        swappedIndices: [],
      });
    }

    setSteps(newSteps);
    setIsSorting(false);
  };

  // Sıralama adımlarını gösterme fonksiyonu
  const startVisualization = async () => {
    if (steps.length === 0 || isSorting) return;

    setIsSorting(true);
    setCurrentStep(0);

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setArray(steps[i].array);

      await sleep(1000 - speed * 10); // Ayarlanabilir hız

      if (i === steps.length - 1) {
        setIsSorting(false);
      }
    }
  };

  // Sıralama durdurma fonksiyonu
  const stopVisualization = () => {
    if (sortingTimeout.current) {
      clearTimeout(sortingTimeout.current);
    }
    setIsSorting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{algorithmInfo[algorithm].name}</h2>
        <p className="text-muted-foreground">
          {algorithmInfo[algorithm].description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="arraySize">Dizi Boyutu: {arraySize}</Label>
            <div className="w-32">
              <Slider
                id="arraySize"
                min={5}
                max={50}
                step={1}
                value={[arraySize]}
                onValueChange={(value) => {
                  if (!isSorting) {
                    setArraySize(value[0]);
                  }
                }}
                disabled={isSorting}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="speed">Hız: {speed}%</Label>
            <div className="w-32">
              <Slider
                id="speed"
                min={1}
                max={95}
                step={1}
                value={[speed]}
                onValueChange={(value) => setSpeed(value[0])}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="stepInfo"
              checked={showStepInfo}
              onCheckedChange={setShowStepInfo}
            />
            <Label htmlFor="stepInfo">Adım Bilgisi Göster</Label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 col-span-2">
          <Button onClick={handleGenerateArray} disabled={isSorting}>
            Yeni Dizi Oluştur
          </Button>
          <Button onClick={calculateSortingSteps} disabled={isSorting}>
            Adımları Hesapla
          </Button>
          <Button
            onClick={startVisualization}
            disabled={isSorting || steps.length === 0}
            variant="default"
          >
            Görseli Başlat
          </Button>
          <Button
            onClick={stopVisualization}
            disabled={!isSorting}
            variant="destructive"
          >
            Durdur
          </Button>
        </div>
      </div>

      <div className="border border-border rounded-lg p-4">
        <div className="visualization-container h-64 relative">
          <div className="flex h-full items-end justify-around">
            {array.map((value, index) => {
              // Çubuk yüksekliğini hesapla
              const height =
                ((value - minValue) / (maxValue - minValue + 0.1)) * 100;

              // Renkleri belirle
              let backgroundColor = 'bg-primary';

              if (currentStep >= 0 && currentStep < steps.length) {
                const { comparingIndices, swappedIndices } = steps[currentStep];

                if (comparingIndices.includes(index)) {
                  backgroundColor = 'bg-yellow-500';
                } else if (swappedIndices.includes(index)) {
                  backgroundColor = 'bg-green-500';
                }
              }

              return (
                <div
                  key={index}
                  className={`array-bar w-2 md:w-4 ${backgroundColor}`}
                  style={{ height: `${height}%` }}
                  title={`Değer: ${value}`}
                />
              );
            })}
          </div>
        </div>

        {showStepInfo && currentStep >= 0 && currentStep < steps.length && (
          <div className="mt-4 text-sm">
            <p>
              <span className="font-bold">Adım {currentStep + 1}</span> /{' '}
              {steps.length}
            </p>
            {steps[currentStep].comparingIndices.length > 0 && (
              <p>
                <span className="inline-block w-4 h-4 bg-yellow-500 rounded-full mr-2"></span>
                Karşılaştırılan İndeksler:{' '}
                {steps[currentStep].comparingIndices.join(', ')}
              </p>
            )}
            {steps[currentStep].swappedIndices.length > 0 && (
              <p>
                <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                Değişen İndeksler:{' '}
                {steps[currentStep].swappedIndices.join(', ')}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
