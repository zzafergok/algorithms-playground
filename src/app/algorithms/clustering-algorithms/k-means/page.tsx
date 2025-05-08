'use client';

import React, { useState, useEffect } from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

// 2D noktayı temsil eden tip
interface Point {
  x: number;
  y: number;
  cluster: number;
}

// K-means algoritması implementasyonu
function kMeansAlgorithm(
  points: Point[],
  k: number,
  maxIterations: number = 100
): { points: Point[]; centroids: Point[]; iterations: number; steps: any[] } {
  if (points.length < k) {
    throw new Error('Nokta sayısı küme sayısından az olamaz.');
  }

  const steps: any[] = [];

  // Rastgele merkez noktaları seç
  const centroids: Point[] = [];
  const usedIndices = new Set<number>();

  // Rastgele, tekrarlanmayan indekslerde merkezler seç
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * points.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      centroids.push({
        x: points[randomIndex].x,
        y: points[randomIndex].y,
        cluster: centroids.length,
      });
    }
  }

  // Algoritma adımlarını kaydet
  steps.push({
    points: JSON.parse(JSON.stringify(points)),
    centroids: JSON.parse(JSON.stringify(centroids)),
    step: 'initialization',
  });

  // Noktaların en yakın merkezlere atanması
  let iterations = 0;
  let isConverged = false;

  while (!isConverged && iterations < maxIterations) {
    // Noktaları en yakın merkezlere ata
    assignPointsToClusters(points, centroids);

    // Adımı kaydet
    steps.push({
      points: JSON.parse(JSON.stringify(points)),
      centroids: JSON.parse(JSON.stringify(centroids)),
      step: 'assignment',
    });

    // Önceki merkezleri sakla
    const oldCentroids = JSON.parse(JSON.stringify(centroids));

    // Merkez noktalarını güncelle
    const hasUpdated = updateCentroids(points, centroids, k);

    // Adımı kaydet
    steps.push({
      points: JSON.parse(JSON.stringify(points)),
      centroids: JSON.parse(JSON.stringify(centroids)),
      step: 'update',
    });

    // Merkez noktalar değişmediyse yakınsama sağlanmıştır
    isConverged = !hasUpdated;
    iterations++;
  }

  return { points, centroids, iterations, steps };
}

// Noktaları en yakın merkezlerine ata
function assignPointsToClusters(points: Point[], centroids: Point[]): void {
  for (const point of points) {
    let minDistance = Infinity;
    let closestCluster = 0;

    // Her nokta için en yakın merkezi bul
    for (let i = 0; i < centroids.length; i++) {
      const distance = euclideanDistance(point, centroids[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = i;
      }
    }

    // Noktayı en yakın kümeye ata
    point.cluster = closestCluster;
  }
}

// Merkez noktalarını güncelle
function updateCentroids(
  points: Point[],
  centroids: Point[],
  k: number
): boolean {
  let hasUpdated = false;

  // Her küme için yeni merkez hesapla
  for (let i = 0; i < k; i++) {
    const clusterPoints = points.filter((p) => p.cluster === i);

    // Küme boşsa güncelleme yapma
    if (clusterPoints.length === 0) continue;

    // Yeni merkezi hesapla (ortalama)
    const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
    const newX = sumX / clusterPoints.length;
    const newY = sumY / clusterPoints.length;

    // Merkez değiştiyse güncelle
    if (centroids[i].x !== newX || centroids[i].y !== newY) {
      centroids[i].x = newX;
      centroids[i].y = newY;
      hasUpdated = true;
    }
  }

  return hasUpdated;
}

// İki nokta arasındaki Öklid mesafesi
function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// Rastgele 2D nokta kümesi oluştur
function generateRandomPoints(
  numPoints: number,
  maxX: number,
  maxY: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0.0; i < numPoints; i++) {
    points.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
      cluster: -1, // Başlangıçta atanmamış küme
    });
  }
  return points;
}

// Küme merkezleri etrafında dağılımlı noktalar oluştur
function generateClusteredPoints(
  numClusters: number,
  pointsPerCluster: number,
  maxX: number,
  maxY: number,
  spread: number
): Point[] {
  const points: Point[] = [];
  const clusterCenters: { x: number; y: number }[] = [];

  // Küme merkezlerini belirle
  for (let i = 0; i < numClusters; i++) {
    clusterCenters.push({
      x: Math.random() * maxX,
      y: Math.random() * maxY,
    });
  }

  // Her küme için noktalar oluştur
  for (let i = 0; i < numClusters; i++) {
    for (let j = 0; j < pointsPerCluster; j++) {
      // Merkez etrafında normal dağılım
      const offsetX = (Math.random() - 0.5) * 2 * spread;
      const offsetY = (Math.random() - 0.5) * 2 * spread;

      const x = Math.max(0, Math.min(maxX, clusterCenters[i].x + offsetX));
      const y = Math.max(0, Math.min(maxY, clusterCenters[i].y + offsetY));

      points.push({ x, y, cluster: -1 });
    }
  }

  return points;
}

// Kümeleri görselleştiren bileşen
const ClusterVisualization: React.FC<{
  points: Point[];
  centroids: Point[];
  width: number;
  height: number;
}> = ({ points, centroids, width, height }) => {
  // Renk paleti - farklı kümeler için
  const colors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FFA5A5',
    '#98D8C8',
    '#FFBE76',
    '#BADC58',
    '#7ED6DF',
    '#E056FD',
    '#686DE0',
  ];

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Noktaları çiz */}
        {points.map((point, index) => (
          <circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r={5}
            fill={
              point.cluster >= 0
                ? colors[point.cluster % colors.length]
                : '#ccc'
            }
            stroke="#fff"
            strokeWidth={1}
          />
        ))}

        {/* Merkez noktaları çiz */}
        {centroids.map((centroid, index) => (
          <g key={`centroid-${index}`}>
            <circle
              cx={centroid.x}
              cy={centroid.y}
              r={8}
              fill={colors[index % colors.length]}
              stroke="#000"
              strokeWidth={2}
            />
            <text
              x={centroid.x}
              y={centroid.y + 20}
              textAnchor="middle"
              fill="#333"
              fontSize="12"
              fontWeight="bold"
            >
              C{index + 1}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

// Algoritma adımlarını gösteren bileşen
const KMeansStepsViewer: React.FC<{
  steps: any[];
  currentStep: number;
  onChangeStep: (step: number) => void;
  width: number;
  height: number;
}> = ({ steps, currentStep, onChangeStep, width, height }) => {
  if (steps.length === 0) {
    return <p>Adım bulunamadı</p>;
  }

  const handlePrevious = () => {
    onChangeStep(Math.max(0, currentStep - 1));
  };

  const handleNext = () => {
    onChangeStep(Math.min(steps.length - 1, currentStep + 1));
  };

  const step = steps[currentStep];
  const stepType = step.step;

  let stepDescription = '';
  switch (stepType) {
    case 'initialization':
      stepDescription = 'Başlatma: Rastgele merkez noktaları seçildi';
      break;
    case 'assignment':
      stepDescription = 'Atama: Noktalar en yakın merkeze atandı';
      break;
    case 'update':
      stepDescription = 'Güncelleme: Merkez noktalar yeniden hesaplandı';
      break;
    default:
      stepDescription = 'Adım';
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
        >
          Önceki Adım
        </Button>
        <span className="text-sm font-medium">
          Adım {currentStep + 1} / {steps.length}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Sonraki Adım
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{stepDescription}</span>
            <Badge>{stepType}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ClusterVisualization
            points={step.points}
            centroids={step.centroids}
            width={width}
            height={height}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default function KMeansPage() {
  // Yapılandırma parametreleri
  const [k, setK] = useState<number>(3);
  const [numPoints, setNumPoints] = useState<number>(50);
  const [dataType, setDataType] = useState<'random' | 'clustered'>('clustered');

  // Görselleştirme boyutları
  const width = 500;
  const height = 400;

  // Algoritma sonuçları
  const [points, setPoints] = useState<Point[]>([]);
  const [centroids, setCentroids] = useState<Point[]>([]);
  const [iterations, setIterations] = useState<number>(0);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Pseudo kod
  const pseudocode = `function kMeans(points, k, maxIterations):
    // 1. Rastgele k adet merkez noktası seç
    centroids = randomly select k points from points
    
    // 2. Yakınsama sağlanana veya maksimum iterasyon sayısına ulaşana kadar döngü
    iterations = 0
    isConverged = false
    
    while not isConverged and iterations < maxIterations:
        // 3. Her noktayı en yakın merkeze ata
        for each point in points:
            minDistance = Infinity
            closestCluster = 0
            
            for i from 0 to k-1:
                distance = euclideanDistance(point, centroids[i])
                if distance < minDistance:
                    minDistance = distance
                    closestCluster = i
            
            point.cluster = closestCluster
        
        // 4. Merkez noktaları güncelle
        hasUpdated = false
        
        for i from 0 to k-1:
            clusterPoints = all points where point.cluster = i
            if clusterPoints is empty:
                continue
            
            newX = average x-coordinate of clusterPoints
            newY = average y-coordinate of clusterPoints
            
            if centroids[i].x != newX or centroids[i].y != newY:
                centroids[i].x = newX
                centroids[i].y = newY
                hasUpdated = true
        
        // 5. Merkez noktalar değişmediyse yakınsama sağlanmıştır
        isConverged = not hasUpdated
        iterations++
    
    return points, centroids, iterations`;

  const implementations = {
    typescript: `// K-means algoritması implementasyonu
function kMeansAlgorithm(
  points: Point[],
  k: number,
  maxIterations: number = 100
): { points: Point[], centroids: Point[], iterations: number } {
  if (points.length < k) {
    throw new Error("Nokta sayısı küme sayısından az olamaz.");
  }
  
  // Rastgele merkez noktaları seç
  const centroids: Point[] = [];
  const usedIndices = new Set<number>();
  
  // Rastgele, tekrarlanmayan indekslerde merkezler seç
  while (centroids.length < k) {
    const randomIndex = Math.floor(Math.random() * points.length);
    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      centroids.push({
        x: points[randomIndex].x,
        y: points[randomIndex].y,
        cluster: centroids.length
      });
    }
  }
  
  // Noktaların en yakın merkezlere atanması
  let iterations = 0;
  let isConverged = false;
  
  while (!isConverged && iterations < maxIterations) {
    // Noktaları en yakın merkezlere ata
    assignPointsToClusters(points, centroids);
    
    // Önceki merkezleri sakla
    const oldCentroids = JSON.parse(JSON.stringify(centroids));
    
    // Merkez noktalarını güncelle
    const hasUpdated = updateCentroids(points, centroids, k);
    
    // Merkez noktalar değişmediyse yakınsama sağlanmıştır
    isConverged = !hasUpdated;
    iterations++;
  }
  
  return { points, centroids, iterations };
}

// Noktaları en yakın merkezlerine ata
function assignPointsToClusters(points: Point[], centroids: Point[]): void {
  for (const point of points) {
    let minDistance = Infinity;
    let closestCluster = 0;
    
    // Her nokta için en yakın merkezi bul
    for (let i = 0; i < centroids.length; i++) {
      const distance = euclideanDistance(point, centroids[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestCluster = i;
      }
    }
    
    // Noktayı en yakın kümeye ata
    point.cluster = closestCluster;
  }
}

// Merkez noktalarını güncelle
function updateCentroids(points: Point[], centroids: Point[], k: number): boolean {
  let hasUpdated = false;
  
  // Her küme için yeni merkez hesapla
  for (let i = 0; i < k; i++) {
    const clusterPoints = points.filter(p => p.cluster === i);
    
    // Küme boşsa güncelleme yapma
    if (clusterPoints.length === 0) continue;
    
    // Yeni merkezi hesapla (ortalama)
    const sumX = clusterPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = clusterPoints.reduce((sum, p) => sum + p.y, 0);
    const newX = sumX / clusterPoints.length;
    const newY = sumY / clusterPoints.length;
    
    // Merkez değiştiyse güncelle
    if (centroids[i].x !== newX || centroids[i].y !== newY) {
      centroids[i].x = newX;
      centroids[i].y = newY;
      hasUpdated = true;
    }
  }
  
  return hasUpdated;
}

// İki nokta arasındaki Öklid mesafesi
function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}`,
    python: `import numpy as np
import matplotlib.pyplot as plt
from typing import List, Tuple, Dict, Any

class Point:
    def __init__(self, x: float, y: float, cluster: int = -1):
        self.x = x
        self.y = y
        self.cluster = cluster

def euclidean_distance(p1: Point, p2: Point) -> float:
    """İki nokta arasındaki Öklid mesafesini hesaplar"""
    return np.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

def assign_points_to_clusters(points: List[Point], centroids: List[Point]) -> None:
    """Noktaları en yakın kümelere atar"""
    for point in points:
        min_distance = float('inf')
        closest_cluster = 0
        
        for i, centroid in enumerate(centroids):
            distance = euclidean_distance(point, centroid)
            if distance < min_distance:
                min_distance = distance
                closest_cluster = i
        
        point.cluster = closest_cluster

def update_centroids(points: List[Point], centroids: List[Point], k: int) -> bool:
    """Küme merkezlerini günceller"""
    has_updated = False
    
    for i in range(k):
        cluster_points = [p for p in points if p.cluster == i]
        
        if not cluster_points:
            continue
        
        new_x = sum(p.x for p in cluster_points) / len(cluster_points)
        new_y = sum(p.y for p in cluster_points) / len(cluster_points)
        
        if centroids[i].x != new_x or centroids[i].y != new_y:
            centroids[i].x = new_x
            centroids[i].y = new_y
            has_updated = True
    
    return has_updated

def kmeans(points: List[Point], k: int, max_iterations: int = 100) -> Tuple[List[Point], List[Point], int]:
    """K-means kümeleme algoritması"""
    if len(points) < k:
        raise ValueError("Nokta sayısı küme sayısından az olamaz.")
    
    # Rastgele merkez noktaları seç
    indices = np.random.choice(len(points), k, replace=False)
    centroids = [Point(points[i].x, points[i].y, i) for i in indices]
    
    iterations = 0
    is_converged = False
    
    while not is_converged and iterations < max_iterations:
        # Noktaları kümelere ata
        assign_points_to_clusters(points, centroids)
        
        # Merkez noktaları güncelle
        has_updated = update_centroids(points, centroids, k)
        
        # Yakınsama kontrolü
        is_converged = not has_updated
        iterations += 1
    
    return points, centroids, iterations

def visualize_clusters(points: List[Point], centroids: List[Point]) -> None:
    """Kümeleri görselleştirir"""
    colors = ['r', 'g', 'b', 'c', 'm', 'y', 'k']
    
    plt.figure(figsize=(10, 8))
    
    # Noktaları çiz
    for point in points:
        plt.scatter(point.x, point.y, color=colors[point.cluster % len(colors)], alpha=0.6)
    
    # Merkezleri çiz
    for i, centroid in enumerate(centroids):
        plt.scatter(centroid.x, centroid.y, color=colors[i % len(colors)], 
                   marker='*', s=200, edgecolor='black')
    
    plt.title('K-means Clustering')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.show()`,
    java: `import java.util.*;

class Point {
    double x;
    double y;
    int cluster;
    
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
        this.cluster = -1; // Başlangıçta atanmamış
    }
    
    public Point(double x, double y, int cluster) {
        this.x = x;
        this.y = y;
        this.cluster = cluster;
    }
    
    @Override
    public String toString() {
        return "(" + x + ", " + y + ") -> Cluster: " + cluster;
    }
}

public class KMeans {
    private List<Point> points;
    private List<Point> centroids;
    private int k;
    private int maxIterations;
    private int iterations;
    
    public KMeans(List<Point> points, int k, int maxIterations) {
        this.points = points;
        this.k = k;
        this.maxIterations = maxIterations;
        this.centroids = new ArrayList<>();
        this.iterations = 0;
    }
    
    public void run() {
        if (points.size() < k) {
            throw new IllegalArgumentException("Nokta sayısı küme sayısından az olamaz.");
        }
        
        // Rastgele merkez noktaları seç
        Set<Integer> usedIndices = new HashSet<>();
        Random random = new Random();
        
        while (centroids.size() < k) {
            int randomIndex = random.nextInt(points.size());
            if (!usedIndices.contains(randomIndex)) {
                usedIndices.add(randomIndex);
                Point point = points.get(randomIndex);
                centroids.add(new Point(point.x, point.y, centroids.size()));
            }
        }
        
        boolean isConverged = false;
        iterations = 0;
        
        while (!isConverged && iterations < maxIterations) {
            // Noktaları en yakın kümelere ata
            assignPointsToClusters();
            
            // Merkez noktaları güncelle
            boolean hasUpdated = updateCentroids();
            
            // Merkez noktalar değişmediyse yakınsama sağlanmıştır
            isConverged = !hasUpdated;
            iterations++;
        }
    }
    
    private void assignPointsToClusters() {
        for (Point point : points) {
            double minDistance = Double.MAX_VALUE;
            int closestCluster = 0;
            
            for (int i = 0; i < centroids.size(); i++) {
                double distance = euclideanDistance(point, centroids.get(i));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCluster = i;
                }
            }
            
            point.cluster = closestCluster;
        }
    }
    
    private boolean updateCentroids() {
        boolean hasUpdated = false;
        
        for (int i = 0; i < k; i++) {
            List<Point> clusterPoints = new ArrayList<>();
            
            for (Point point : points) {
                if (point.cluster == i) {
                    clusterPoints.add(point);
                }
            }
            
            if (clusterPoints.isEmpty()) {
                continue;
            }
            
            double sumX = 0, sumY = 0;
            for (Point point : clusterPoints) {
                sumX += point.x;
                sumY += point.y;
            }
            
            double newX = sumX / clusterPoints.size();
            double newY = sumY / clusterPoints.size();
            
            Point centroid = centroids.get(i);
            if (centroid.x != newX || centroid.y != newY) {
                centroid.x = newX;
                centroid.y = newY;
                hasUpdated = true;
            }
        }
        
        return hasUpdated;
    }
    
    private double euclideanDistance(Point p1, Point p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
    
    public List<Point> getPoints() {
        return points;
    }
    
    public List<Point> getCentroids() {
        return centroids;
    }
    
    public int getIterations() {
        return iterations;
    }
}`,
  };

  // Sayfa yüklendiğinde veri oluştur
  useEffect(() => {
    generateData();
  }, []);

  // Veri tipine göre noktaları oluştur
  const generateData = () => {
    let newPoints: Point[] = [];

    if (dataType === 'random') {
      newPoints = generateRandomPoints(numPoints, width, height);
    } else {
      const pointsPerCluster = Math.floor(numPoints / k);
      const remainingPoints = numPoints - pointsPerCluster * k;

      newPoints = generateClusteredPoints(
        k,
        pointsPerCluster,
        width,
        height,
        50
      );

      // Kalan noktaları ekle
      if (remainingPoints > 0) {
        const extraPoints = generateRandomPoints(
          remainingPoints,
          width,
          height
        );
        newPoints = [...newPoints, ...extraPoints];
      }
    }

    setPoints(newPoints);
    setSteps([]);
    setCurrentStep(0);
    setCentroids([]);
    setIterations(0);
  };

  // K değeri değişikliğini işle
  const handleKChange = (value: number[]) => {
    setK(value[0]);
  };

  // Nokta sayısı değişikliğini işle
  const handleNumPointsChange = (value: number[]) => {
    setNumPoints(value[0]);
  };

  // Veri tipi değişikliğini işle
  const handleDataTypeChange = (type: 'random' | 'clustered') => {
    setDataType(type);
  };

  // Algoritma çalıştırma işlevi
  const handleRunAlgorithm = () => {
    try {
      setIsRunning(true);

      setTimeout(() => {
        try {
          const result = kMeansAlgorithm([...points], k, 100);
          setPoints(result.points);
          setCentroids(result.centroids);
          setIterations(result.iterations);
          setSteps(result.steps);
          setCurrentStep(0);
        } catch (error) {
          console.error('Algoritma çalıştırma hatası:', error);
          alert(
            error instanceof Error
              ? error.message
              : 'Algoritma çalıştırma hatası!'
          );
        } finally {
          setIsRunning(false);
        }
      }, 0);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Bir hata oluştu!');
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="K-Means Kümeleme Algoritması"
        description="K-Means, verileri K adet kümeye ayıran, her kümenin merkezi etrafında gruplandıran popüler bir kümeleme algoritmasıdır. Bu algoritma, veri noktalarını birbirine en yakın merkezlere atayarak ve merkez konumlarını yeniden hesaplayarak çalışır. İteratif bir süreç sonucunda, veri noktaları doğal gruplarına ayrılır."
        timeComplexity={{
          best: 'O(n * k * i)',
          average: 'O(n * k * i)',
          worst: 'O(n * k * i)',
        }}
        spaceComplexity="O(n + k)"
        advantages={[
          'Basit, anlaşılabilir ve uygulanması kolay bir algoritmadır',
          'Büyük veri setlerinde bile etkili ve verimlidir',
          'Yakınsama genellikle hızlıdır ve az sayıda iterasyon gerektirir',
          'Farklı küme şekillerine ve boyutlarına uyarlanabilir',
          'Kümelerin merkez noktalarını açıkça gösterir',
        ]}
        disadvantages={[
          'Optimum küme sayısı (k) önceden belirlenmelidir',
          'Başlangıç merkezlerinin rastgele seçimi sonuçları etkileyebilir',
          'Yalnızca küresel küme şekillerine uygun çalışır, karmaşık şekillerde başarısız olabilir',
          'Gürültülü verilere ve aykırı değerlere karşı hassastır',
          'Farklı yoğunluklardaki kümeleri belirlemede zorlanabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Müşteri segmentasyonu ve pazar araştırmaları',
          'Görüntü sıkıştırma ve renk kantizasyonu',
          'Anomali tespiti ve gürültülü veri filtreleme',
          'Belge sınıflandırma ve metin madenciliği',
          'Öznitelik seçimi ve boyut indirgeme',
          'Tıbbi görüntü analizi ve hastalık tespiti',
        ]}
      />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold">İnteraktif Demo</h2>
        <p className="text-muted-foreground">
          K-Means algoritmasını deneyimlemek için aşağıdaki parametreleri
          ayarlayın ve algoritmanın çalışmasını adım adım gözlemleyin.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Algoritma Parametreleri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="k-slider">Küme Sayısı (k): {k}</Label>
                    <Slider
                      id="k-slider"
                      min={2}
                      max={10}
                      step={1}
                      value={[k]}
                      onValueChange={handleKChange}
                      disabled={isRunning}
                      className="w-40"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Verilerin kaç farklı kümeye ayrılacağını belirler.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="points-slider">
                      Nokta Sayısı: {numPoints}
                    </Label>
                    <Slider
                      id="points-slider"
                      min={10}
                      max={200}
                      step={10}
                      value={[numPoints]}
                      onValueChange={handleNumPointsChange}
                      disabled={isRunning}
                      className="w-40"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Kümelenecek veri noktalarının sayısı.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Veri Dağılımı</Label>
                  <div className="flex space-x-4">
                    <Button
                      variant={dataType === 'random' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleDataTypeChange('random')}
                      disabled={isRunning}
                    >
                      Rastgele
                    </Button>
                    <Button
                      variant={dataType === 'clustered' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleDataTypeChange('clustered')}
                      disabled={isRunning}
                    >
                      Kümelenmiş
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Veri noktalarının dağılım tipi.
                  </p>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={generateData}
                    disabled={isRunning}
                    variant="outline"
                  >
                    Yeni Veri Oluştur
                  </Button>
                  <Button onClick={handleRunAlgorithm} disabled={isRunning}>
                    {isRunning ? 'Çalışıyor...' : 'Algoritmayı Çalıştır'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {iterations > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Algoritma Sonuçları</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Küme Sayısı:</span>
                      <Badge variant="outline">{k}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">
                        İterasyon Sayısı:
                      </span>
                      <Badge variant="outline">{iterations}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Nokta Sayısı:</span>
                      <Badge variant="outline">{points.length}</Badge>
                    </div>
                    {centroids.map((centroid, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm font-medium">
                          Merkez {index + 1}:
                        </span>
                        <Badge>
                          ({centroid.x.toFixed(2)}, {centroid.y.toFixed(2)})
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-4">
            {steps.length > 0 ? (
              <KMeansStepsViewer
                steps={steps}
                currentStep={currentStep}
                onChangeStep={setCurrentStep}
                width={width}
                height={height}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Veri Görünümü</CardTitle>
                </CardHeader>
                <CardContent>
                  <ClusterVisualization
                    points={points}
                    centroids={[]}
                    width={width}
                    height={height}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          K-Means kümeleme algoritmasının farklı programlama dillerindeki
          implementasyonları.
        </p>

        <Tabs defaultValue="typescript">
          <TabsList>
            <TabsTrigger value="typescript">TypeScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
          </TabsList>
          <TabsContent value="typescript">
            <CodeBlock
              code={implementations.typescript}
              language="typescript"
              title="K-Means Algoritması - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="K-Means Algoritması - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="K-Means Algoritması - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            K-Means algoritması, veri noktalarını benzerliklerine göre K sayıda
            kümeye ayırmak için kullanılan gözetimsiz bir öğrenme
            algoritmasıdır. Algoritma, noktaları birbirine benzer gruplara
            ayırarak veri setindeki doğal yapıları ortaya çıkarmayı amaçlar.
          </p>

          <h3>Temel Çalışma Prensibi</h3>
          <p>K-Means algoritması, dört ana adımda çalışır:</p>

          <ol>
            <li>
              <strong>Başlatma:</strong> K adet merkez noktası (centroid)
              rastgele seçilir. Bu merkezler, kümelerin başlangıç noktalarını
              temsil eder.
            </li>
            <li>
              <strong>Atama:</strong> Her veri noktası, kendisine en yakın
              merkeze atanır. Yakınlık genellikle Öklid mesafesi ile ölçülür.
            </li>
            <li>
              <strong>Güncelleme:</strong> Her küme için yeni merkez hesaplanır.
              Yeni merkez, kümeye atanan tüm noktaların ortalama koordinatıdır.
            </li>
            <li>
              <strong>Yakınsama:</strong> 2. ve 3. adımlar, merkezler artık
              değişmeyene kadar veya maksimum iterasyon sayısına ulaşılana kadar
              tekrarlanır.
            </li>
          </ol>

          <h3>Mesafe Ölçütü</h3>
          <p>
            K-Means algoritmasında en yaygın kullanılan mesafe ölçütü, Öklid
            mesafesidir:
          </p>
          <p>
            <strong>Öklid Mesafesi:</strong> İki nokta arasındaki düz çizgi
            mesafesi. d(p, q) = √[(p<sub>x</sub> - q<sub>x</sub>)<sup>2</sup> +
            (p<sub>y</sub> - q<sub>y</sub>)<sup>2</sup>]
          </p>

          <h3>Başlangıç Merkez Seçim Stratejileri</h3>
          <p>
            K-Means algoritmasının performansı, başlangıç merkezlerinin seçimine
            büyük ölçüde bağlıdır. Yaygın başlangıç stratejileri:
          </p>
          <ul>
            <li>
              <strong>Rastgele Seçim:</strong> Merkezler rastgele veri noktaları
              arasından seçilir.
            </li>
            <li>
              <strong>K-Means++:</strong> Merkezler, birbirinden uzak olma
              olasılığı daha yüksek olan noktalara ağırlık verilerek seçilir.
            </li>
            <li>
              <strong>Forgy Yöntemi:</strong> Merkezler, veri setinden rastgele
              K nokta seçilerek başlatılır.
            </li>
          </ul>

          <h3>K Değerinin Seçimi</h3>
          <p>Optimum K değerini belirlemek için çeşitli yöntemler:</p>
          <ul>
            <li>
              <strong>Dirsek Yöntemi (Elbow Method):</strong> Farklı K değerleri
              için küme içi varyansın (WCSS) grafiği çizilir ve "dirsek" noktası
              optimal K olarak seçilir.
            </li>
            <li>
              <strong>Silhouette Analizi:</strong> Her kümeleme için silhouette
              katsayısı hesaplanır ve en yüksek skoru veren K değeri seçilir.
            </li>
            <li>
              <strong>Gap İstatistiği:</strong> Gözlenen kümelemenin beklenen
              kümelemeden ne kadar farklı olduğunu ölçer.
            </li>
          </ul>

          <h3>Algoritmanın Güçlü ve Zayıf Yönleri</h3>

          <h4>Güçlü Yönler:</h4>
          <ul>
            <li>Basit ve uygulaması kolaydır</li>
            <li>Büyük veri setlerinde bile verimli çalışır</li>
            <li>
              Lineer zaman karmaşıklığı: O(n * k * i) - n: nokta sayısı, k: küme
              sayısı, i: iterasyon sayısı
            </li>
            <li>Sonuçların yorumlanması kolaydır</li>
          </ul>

          <h4>Zayıf Yönler:</h4>
          <ul>
            <li>K değeri önceden belirlenmelidir</li>
            <li>
              Başlangıç merkezlerine bağımlıdır ve yerel optimumlara takılabilir
            </li>
            <li>Küresel olmayan küme şekillerini belirlemede başarısızdır</li>
            <li>Aykırı değerlere duyarlıdır</li>
            <li>
              Farklı boyut ve yoğunluktaki kümeleri ayırt etmekte zorlanır
            </li>
          </ul>

          <h3>Gerçek Dünya Uygulamaları</h3>
          <p>K-Means algoritması birçok alanda yaygın olarak kullanılır:</p>
          <ul>
            <li>
              <strong>Müşteri Segmentasyonu:</strong> Benzer satın alma
              davranışlarına sahip müşteri gruplarını belirlemek
            </li>
            <li>
              <strong>Görüntü İşleme:</strong> Görüntü segmentasyonu ve renk
              kantizasyonu
            </li>
            <li>
              <strong>Belge Sınıflandırma:</strong> Benzer konulardaki belgeleri
              gruplamak
            </li>
            <li>
              <strong>Anomali Tespiti:</strong> Normal davranıştan sapan veri
              noktalarını belirlemek
            </li>
            <li>
              <strong>Öznitelik Öğrenme:</strong> Veri setindeki gizli
              özellikleri keşfetmek
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
