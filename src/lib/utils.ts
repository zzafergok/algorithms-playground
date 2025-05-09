import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

// Tailwind sınıflarını birleştiren yardımcı fonksiyon
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Rastgele dizi oluşturmak için yardımcı fonksiyon
export function generateRandomArray(
  length: number = 20,
  min: number = 5,
  max: number = 100
): number[] {
  return Array.from(
    { length },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Algoritma hızını ölçen yardımcı fonksiyon
export function measureAlgorithmTime<T>(
  algorithm: (input: any) => T,
  input: any
): { result: T; time: number } {
  const start = performance.now();
  const result = algorithm(input);
  const end = performance.now();
  return { result, time: end - start };
}

// Kod bloğunu vurgulayan yardımcı fonksiyon
export function highlightCode(code: string, highlightLine: number): string[] {
  return code.split('\n').map((line, index) => {
    const lineNumber = index + 1;
    return lineNumber === highlightLine
      ? `<span class="code-highlight">${line}</span>`
      : line;
  });
}

// Algoritma karmaşıklık seviyesini veren fonksiyon
export function getComplexityName(complexity: string): {
  name: string;
  description: string;
} {
  const complexities: Record<string, { name: string; description: string }> = {
    'O(1)': {
      name: 'Sabit Zaman',
      description:
        'Giriş boyutu ne olursa olsun, algoritma her zaman aynı sürede çalışır.',
    },
    'O(log n)': {
      name: 'Logaritmik Zaman',
      description:
        'Giriş boyutu arttıkça, çalışma süresi logaritmik olarak artar.',
    },
    'O(n)': {
      name: 'Doğrusal Zaman',
      description: 'Çalışma süresi, giriş boyutu ile doğrusal olarak artar.',
    },
    'O(n log n)': {
      name: 'Linearitmik Zaman',
      description:
        'Çalışma süresi, giriş boyutu ile logaritmik çarpanlı doğrusal olarak artar.',
    },
    'O(n²)': {
      name: 'Karesel Zaman',
      description: 'Çalışma süresi, giriş boyutunun karesi ile orantılıdır.',
    },
    'O(n³)': {
      name: 'Kübik Zaman',
      description: 'Çalışma süresi, giriş boyutunun küpü ile orantılıdır.',
    },
    'O(2^n)': {
      name: 'Üstel Zaman',
      description: 'Çalışma süresi, 2 üzeri giriş boyutu ile orantılıdır.',
    },
  };

  return (
    complexities[complexity] || {
      name: 'Bilinmeyen Karmaşıklık',
      description: 'Bu algoritmanın karmaşıklığı belirtilmemiş.',
    }
  );
}
