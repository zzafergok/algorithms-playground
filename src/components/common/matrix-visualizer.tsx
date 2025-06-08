'use client';

import React, { useState, useCallback } from 'react';

import { Play, RotateCcw, Grid as GridIcon, Calculator } from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

import {
  Graph,
  GraphNode,
  GraphEdge,
  floydWarshall,
} from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';

interface MatrixVisualizerProps {
  className?: string;
  initialSize?: number;
  showControls?: boolean;
  algorithm?: 'floyd-warshall';
}

export function MatrixVisualizer({
  className,
  initialSize = 5,
  showControls = true,
  algorithm = 'floyd-warshall',
}: MatrixVisualizerProps) {
  const [matrixSize, setMatrixSize] = useState(initialSize);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [distanceMatrix, setDistanceMatrix] = useState<number[][]>([]);
  const [nextMatrix, setNextMatrix] = useState<(string | null)[][]>([]);
  const [reconstructedPath, setReconstructedPath] = useState<number[]>([]);
  const [adjacencyMatrix, setAdjacencyMatrix] = useState<number[][]>(() =>
    createInitialMatrix(initialSize)
  );
  const [selectedPath, setSelectedPath] = useState<{
    from: number;
    to: number;
  } | null>(null);
  const [algorithmStats, setAlgorithmStats] = useState({
    iterations: 0,
    totalComparisons: 0,
    pathsFound: 0,
    executionTime: 0,
  });

  function createInitialMatrix(size: number): number[][] {
    const matrix = Array(size)
      .fill(null)
      .map(() => Array(size).fill(Infinity));

    for (let i = 0; i < size; i++) {
      matrix[i][i] = 0;
    }

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (i !== j && Math.random() < 0.4) {
          matrix[i][j] = Math.floor(Math.random() * 10) + 1;
        }
      }
    }

    return matrix;
  }

  const convertToGraph = useCallback((matrix: number[][]): Graph => {
    const nodes = new Map<string, GraphNode>();
    const edges: GraphEdge[] = [];
    const adjacencyList = new Map<
      string,
      { nodeId: string; weight: number }[]
    >();

    for (let i = 0; i < matrix.length; i++) {
      const nodeId = i.toString();
      nodes.set(nodeId, {
        id: nodeId,
        x: i,
        y: 0,
      });
      adjacencyList.set(nodeId, []);
    }

    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if (i !== j && matrix[i][j] !== Infinity) {
          const edge: GraphEdge = {
            from: i.toString(),
            to: j.toString(),
            weight: matrix[i][j],
          };
          edges.push(edge);
          adjacencyList.get(i.toString())!.push({
            nodeId: j.toString(),
            weight: matrix[i][j],
          });
        }
      }
    }

    return { nodes, edges, adjacencyList };
  }, []);

  const runFloydWarshall = useCallback(async () => {
    setIsRunning(true);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);

    const startTime = performance.now();
    const graph = convertToGraph(adjacencyMatrix);
    const result = floydWarshall(graph);
    const endTime = performance.now();

    const newDistanceMatrix = Array(matrixSize)
      .fill(null)
      .map(() => Array(matrixSize).fill(Infinity));
    const newNextMatrix = Array(matrixSize)
      .fill(null)
      .map(() => Array(matrixSize).fill(null));

    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        const iStr = i.toString();
        const jStr = j.toString();
        newDistanceMatrix[i][j] =
          result.distances.get(iStr)?.get(jStr) ?? Infinity;
        newNextMatrix[i][j] = result.next.get(iStr)?.get(jStr) ?? null;
      }
    }

    setDistanceMatrix(newDistanceMatrix);
    setNextMatrix(newNextMatrix);

    let pathsFound = 0;
    for (let i = 0; i < matrixSize; i++) {
      for (let j = 0; j < matrixSize; j++) {
        if (i !== j && newDistanceMatrix[i][j] !== Infinity) {
          pathsFound++;
        }
      }
    }

    setAlgorithmStats({
      iterations: matrixSize,
      totalComparisons: matrixSize * matrixSize * matrixSize,
      pathsFound,
      executionTime: endTime - startTime,
    });

    for (let k = 0; k < matrixSize; k++) {
      setCurrentStep(k);
      await new Promise((resolve) => setTimeout(resolve, 101 - animationSpeed));
    }

    setCurrentStep(matrixSize);
    setIsRunning(false);
  }, [adjacencyMatrix, matrixSize, animationSpeed, convertToGraph]);

  const reconstructPath = useCallback(
    (from: number, to: number): number[] => {
      if (
        distanceMatrix.length === 0 ||
        distanceMatrix[from][to] === Infinity
      ) {
        return [];
      }

      const path: number[] = [from];
      let current = from;

      while (current !== to) {
        const next = nextMatrix[current][to];
        if (next === null) break;

        current = parseInt(next);
        path.push(current);
      }

      return path;
    },
    [distanceMatrix, nextMatrix]
  );

  const handlePathSelection = useCallback(
    (from: number, to: number) => {
      const newSelection = { from, to };
      setSelectedPath(newSelection);

      if (distanceMatrix.length > 0) {
        const path = reconstructPath(from, to);
        setReconstructedPath(path);
      }
    },
    [distanceMatrix, reconstructPath]
  );

  const updateMatrixCell = useCallback(
    (row: number, col: number, value: string) => {
      const numValue = value === '' ? Infinity : parseFloat(value);
      if (isNaN(numValue) && value !== '') return;

      const newMatrix = [...adjacencyMatrix];
      newMatrix[row][col] = numValue;
      setAdjacencyMatrix(newMatrix);
    },
    [adjacencyMatrix]
  );

  const resetMatrix = useCallback(() => {
    const newMatrix = createInitialMatrix(matrixSize);
    setAdjacencyMatrix(newMatrix);
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);
    setAlgorithmStats({
      iterations: 0,
      totalComparisons: 0,
      pathsFound: 0,
      executionTime: 0,
    });
  }, [matrixSize]);

  const generateRandomMatrix = useCallback(() => {
    const newMatrix = createInitialMatrix(matrixSize);
    setAdjacencyMatrix(newMatrix);
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);
  }, [matrixSize]);

  const resizeMatrix = useCallback((newSize: number) => {
    setMatrixSize(newSize);
    const newMatrix = createInitialMatrix(newSize);
    setAdjacencyMatrix(newMatrix);
    setDistanceMatrix([]);
    setNextMatrix([]);
    setCurrentStep(-1);
    setSelectedPath(null);
    setReconstructedPath([]);
  }, []);

  const getCellStyle = useCallback(
    (row: number, col: number, isDistanceMatrix: boolean = false) => {
      let baseClasses = 'w-16 h-10 text-center border border-gray-300 text-sm';

      if (isDistanceMatrix) {
        baseClasses += ' bg-blue-50';

        if (selectedPath && reconstructedPath.length > 0) {
          const isInPath =
            reconstructedPath.includes(row) && reconstructedPath.includes(col);
          if (row === selectedPath.from && col === selectedPath.to) {
            baseClasses += ' bg-green-200 font-bold';
          } else if (isInPath) {
            baseClasses += ' bg-yellow-100';
          }
        }

        if (currentStep >= 0 && currentStep < matrixSize) {
          if (row === currentStep || col === currentStep) {
            baseClasses += ' bg-purple-100';
          }
        }
      } else {
        baseClasses += ' bg-white';

        if (row === col) {
          baseClasses += ' bg-gray-100';
        }
      }

      return baseClasses;
    },
    [currentStep, matrixSize, selectedPath, reconstructedPath]
  );

  const formatValue = useCallback((value: number): string => {
    if (value === Infinity) return '∞';
    if (value === 0) return '0';
    return value.toString();
  }, []);

  return (
    <div className={cn('space-y-6', className)}>
      {showControls && (
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              onClick={runFloydWarshall}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Floyd-Warshall Çalıştır
            </Button>

            <Button
              onClick={resetMatrix}
              variant="outline"
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Sıfırla
            </Button>

            <Button
              onClick={generateRandomMatrix}
              variant="outline"
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <GridIcon className="w-4 h-4" />
              Rastgele Matris
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Matris Boyutu: {matrixSize}</Label>
              <Slider
                value={[matrixSize]}
                onValueChange={([value]) => resizeMatrix(value)}
                min={3}
                max={8}
                step={1}
                disabled={isRunning}
              />
            </div>

            <div className="space-y-2">
              <Label>Animasyon Hızı: {animationSpeed}</Label>
              <Slider
                value={[animationSpeed]}
                onValueChange={([value]) => setAnimationSpeed(value)}
                min={1}
                max={100}
                step={1}
              />
            </div>
          </div>

          {algorithmStats.totalComparisons > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-background rounded border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.iterations}
                </div>
                <div className="text-sm text-muted-foreground">
                  İterasyonlar
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.totalComparisons}
                </div>
                <div className="text-sm text-muted-foreground">
                  Karşılaştırmalar
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.pathsFound}
                </div>
                <div className="text-sm text-muted-foreground">
                  Bulunan Yollar
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.executionTime.toFixed(2)}ms
                </div>
                <div className="text-sm text-muted-foreground">
                  Çalışma Süresi
                </div>
              </div>
            </div>
          )}

          {currentStep >= 0 && currentStep < matrixSize && (
            <div className="p-3 bg-purple-100 rounded border border-purple-300">
              <div className="text-sm font-medium text-purple-800">
                Şu anki iterasyon: k = {currentStep}
              </div>
              <div className="text-xs text-purple-600">
                {currentStep} numaralı düğüm üzerinden geçen yollar kontrol
                ediliyor
              </div>
            </div>
          )}

          {distanceMatrix.length > 0 && (
            <div className="space-y-2">
              <Label>Yol Görselleştirme (Kaynak → Hedef)</Label>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: matrixSize }, (_, i) =>
                  Array.from({ length: matrixSize }, (_, j) => {
                    if (i === j || distanceMatrix[i][j] === Infinity)
                      return null;

                    const isSelected =
                      selectedPath?.from === i && selectedPath?.to === j;
                    return (
                      <Button
                        key={`${i}-${j}`}
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handlePathSelection(i, j)}
                        className="text-xs"
                      >
                        {i} → {j}
                      </Button>
                    );
                  })
                )}
              </div>

              {selectedPath && reconstructedPath.length > 0 && (
                <div className="p-3 bg-green-50 rounded border border-green-300">
                  <div className="text-sm font-medium text-green-800">
                    En Kısa Yol ({selectedPath.from} → {selectedPath.to}):
                  </div>
                  <div className="text-sm text-green-700">
                    {reconstructedPath.join(' → ')}
                    <span className="ml-2 font-medium">
                      (Toplam Mesafe:{' '}
                      {formatValue(
                        distanceMatrix[selectedPath.from][selectedPath.to]
                      )}
                      )
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Calculator className="w-5 h-5" />
            Komşuluk Matrisi (Giriş)
          </h3>
          <div className="overflow-x-auto">
            <div className="inline-block p-4 bg-white rounded border">
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: `repeat(${matrixSize + 1}, 1fr)`,
                }}
              >
                <div className="w-10 h-10 flex items-center justify-center font-bold"></div>
                {Array.from({ length: matrixSize }, (_, i) => (
                  <div
                    key={i}
                    className="w-16 h-10 flex items-center justify-center font-bold text-sm bg-gray-100 border"
                  >
                    {i}
                  </div>
                ))}

                {Array.from({ length: matrixSize }, (_, row) => (
                  <React.Fragment key={row}>
                    {/* Row header */}
                    <div className="w-10 h-10 flex items-center justify-center font-bold text-sm bg-gray-100 border">
                      {row}
                    </div>

                    {Array.from({ length: matrixSize }, (_, col) => (
                      <Input
                        key={`${row}-${col}`}
                        className={cn(getCellStyle(row, col), 'p-1')}
                        value={
                          adjacencyMatrix[row][col] === Infinity
                            ? ''
                            : adjacencyMatrix[row][col].toString()
                        }
                        onChange={(e) =>
                          updateMatrixCell(row, col, e.target.value)
                        }
                        disabled={isRunning || row === col}
                        placeholder={row === col ? '0' : '∞'}
                        type="number"
                        min="0"
                        step="1"
                      />
                    ))}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>• Komşuluk matrisinde kenar ağırlıklarını girin</p>
            <p>• Boş hücreler sonsuz (∞) mesafe olarak kabul edilir</p>
            <p>
              • Köşegen elemanlar (kendinden kendine mesafe) otomatik olarak
              0'dır
            </p>
          </div>
        </div>

        {distanceMatrix.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <GridIcon className="w-5 h-5" />
              En Kısa Mesafe Matrisi (Çıktı)
            </h3>
            <div className="overflow-x-auto">
              <div className="inline-block p-4 bg-blue-50 rounded border">
                <div
                  className="grid gap-1"
                  style={{
                    gridTemplateColumns: `repeat(${matrixSize + 1}, 1fr)`,
                  }}
                >
                  <div className="w-10 h-10 flex items-center justify-center font-bold"></div>
                  {Array.from({ length: matrixSize }, (_, i) => (
                    <div
                      key={i}
                      className="w-16 h-10 flex items-center justify-center font-bold text-sm bg-blue-100 border"
                    >
                      {i}
                    </div>
                  ))}

                  {Array.from({ length: matrixSize }, (_, row) => (
                    <React.Fragment key={row}>
                      <div className="w-10 h-10 flex items-center justify-center font-bold text-sm bg-blue-100 border">
                        {row}
                      </div>

                      {Array.from({ length: matrixSize }, (_, col) => (
                        <div
                          key={`${row}-${col}`}
                          className={cn(
                            getCellStyle(row, col, true),
                            'flex items-center justify-center cursor-pointer hover:bg-blue-100',
                            row !== col && distanceMatrix[row][col] !== Infinity
                              ? 'hover:scale-105 transition-transform'
                              : ''
                          )}
                          onClick={() =>
                            row !== col &&
                            distanceMatrix[row][col] !== Infinity &&
                            handlePathSelection(row, col)
                          }
                          title={
                            row !== col && distanceMatrix[row][col] !== Infinity
                              ? `${row} → ${col} yolunu göster`
                              : ''
                          }
                        >
                          {formatValue(distanceMatrix[row][col])}
                        </div>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>
                • Bu matris tüm düğüm çiftleri arasındaki en kısa mesafeleri
                gösterir
              </p>
              <p>• Bir hücreye tıklayarak o yolu görselleştirebilirsiniz</p>
              <p>• Mor renk mevcut iterasyonda işlenen düğümü gösterir</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-muted rounded-lg">
        <h3 className="text-lg font-semibold mb-3">
          Floyd-Warshall Algoritması
        </h3>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Zaman Karmaşıklığı:</strong> O(n³) - Üç iç içe döngü
            kullanır
          </p>
          <p>
            <strong>Alan Karmaşıklığı:</strong> O(n²) - İki boyutlu mesafe
            matrisi
          </p>
          <p>
            <strong>Çalışma Prensibi:</strong> Her iterasyonda, bir ara düğüm
            (k) üzerinden geçen yolları kontrol eder ve daha kısa yol bulursa
            günceller.
          </p>
          <p>
            <strong>Kullanım Alanları:</strong> Ağ yönlendirme, şehir planlama,
            oyun geliştirme (NPC navigasyonu), graf analizi
          </p>
        </div>
      </div>
    </div>
  );
}
