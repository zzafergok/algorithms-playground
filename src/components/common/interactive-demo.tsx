'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { measureAlgorithmTime } from '@/lib/utils';

interface InteractiveDemoProps {
  title: string;
  description?: string;
  algorithmFunction: (input: any) => any;
  inputPlaceholder?: string;
  inputType?: 'text' | 'number' | 'array';
  outputFormatter?: (output: any) => React.ReactNode;
}

export function InteractiveDemo({
  title,
  description,
  algorithmFunction,
  inputPlaceholder = 'Veri girin...',
  inputType = 'text',
  outputFormatter,
}: InteractiveDemoProps) {
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setError(null);
  };

  const parseInput = (input: string): any => {
    if (inputType === 'number') {
      const number = parseFloat(input);
      if (isNaN(number)) {
        throw new Error('Geçerli bir sayı girin');
      }
      return number;
    }

    if (inputType === 'array') {
      try {
        // Girdi bir dizi olarak girildiyse [...] şeklinde
        if (input.trim().startsWith('[') && input.trim().endsWith(']')) {
          return JSON.parse(input);
        }

        // Girdi virgülle ayrılmış değerler olarak girildiyse
        return input.split(',').map((item) => {
          const trimmed = item.trim();
          // Sayı mı yoksa metin mi olduğunu kontrol et
          if (!isNaN(parseFloat(trimmed)) && trimmed !== '') {
            return parseFloat(trimmed);
          }
          return trimmed;
        });
      } catch (e) {
        throw new Error('Geçerli bir dizi girin (örn: 1,2,3 veya [1,2,3])');
      }
    }

    return input; // Metin girişi için
  };

  const handleRun = () => {
    setError(null);
    setIsRunning(true);

    try {
      const parsedInput = parseInput(input);

      // Algoritma fonksiyonunu çalıştır ve süreyi ölç
      const { result, time } = measureAlgorithmTime(
        algorithmFunction,
        parsedInput
      );

      setOutput(result);
      setExecutionTime(time);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Bir hata oluştu');
      }
      setOutput(null);
      setExecutionTime(null);
    } finally {
      setIsRunning(false);
    }
  };

  const formatOutput = (output: any): React.ReactNode => {
    if (outputFormatter) {
      return outputFormatter(output);
    }

    if (output === null || output === undefined) {
      return <span className="text-muted-foreground">Sonuç yok</span>;
    }

    if (Array.isArray(output)) {
      return JSON.stringify(output);
    }

    if (typeof output === 'object') {
      return <pre>{JSON.stringify(output, null, 2)}</pre>;
    }

    return String(output);
  };

  return (
    <Card className="interactive-section">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="mb-2">
              <label htmlFor="input" className="text-sm font-medium">
                Girdi{' '}
                {inputType === 'array' &&
                  '(virgülle ayrılmış değerler veya dizi)'}
              </label>
            </div>
            <Input
              id="input"
              value={input}
              onChange={handleInputChange}
              placeholder={inputPlaceholder}
              className="w-full"
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>

          <div>
            <div className="mb-2">
              <label className="text-sm font-medium">Sonuç</label>
            </div>
            <div className="rounded-md border p-3 min-h-12">
              {formatOutput(output)}
            </div>
            {executionTime !== null && (
              <p className="mt-1 text-sm text-muted-foreground">
                Çalışma süresi: {executionTime.toFixed(4)} ms
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRun} disabled={isRunning || !input.trim()}>
          {isRunning ? 'Çalışıyor...' : 'Çalıştır'}
        </Button>
      </CardFooter>
    </Card>
  );
}
