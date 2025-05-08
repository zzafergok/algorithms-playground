'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

// 2D noktayı temsil eden tip tanımlaması
interface Point {
  x: number;
  y: number;
  cluster: number;
}

// Hiyerarşik kümeleme için küme düğümünü temsil eden tip tanımlaması
interface ClusterNode {
  id: number;
  points: Point[];
  children?: [ClusterNode, ClusterNode];
  distance?: number;
}

// İki nokta arasındaki Öklid mesafesini hesaplayan yardımcı fonksiyon
function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}

// İki küme arasındaki mesafeyi hesaplayan fonksiyon (en yakın komşu metodu)
function calculateClusterDistance(
  clusterA: ClusterNode,
  clusterB: ClusterNode
): number {
  let minDistance = Infinity;

  // Her iki kümedeki her nokta çifti için mesafeyi hesapla ve minimum değeri bul
  for (const pointA of clusterA.points) {
    for (const pointB of clusterB.points) {
      const distance = euclideanDistance(pointA, pointB);
      minDistance = Math.min(minDistance, distance);
    }
  }

  return minDistance;
}

// Hiyerarşik kümeleme algoritması (Aglomeratif - AGNES) implementasyonu
function hierarchicalClustering(
  points: Point[],
  cutoffDistance: number = Infinity
): {
  dendrogram: ClusterNode;
  clusterAssignments: number[];
  steps: any[];
} {
  // Adımları kaydetmek için dizi
  const steps: any[] = [];

  // Her nokta için başlangıçta ayrı küme oluştur
  let clusters: ClusterNode[] = points.map((point, index) => ({
    id: index,
    points: [{ ...point, cluster: index }],
  }));

  // Başlangıç durumu kaydet
  steps.push({
    clusters: JSON.parse(JSON.stringify(clusters)),
    step: 'initialization',
    description: 'Her nokta kendi kümesini oluşturur',
  });

  // Uzaklık eşiği altında en az 2 küme kalana kadar kümeleri birleştir
  let nextId = points.length;
  while (clusters.length > 1) {
    // En yakın iki kümeyi bul
    let minDistance = Infinity;
    let closestPair: [number, number] = [-1, -1];

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        // İki küme arasındaki mesafeyi hesapla
        const distance = calculateClusterDistance(clusters[i], clusters[j]);

        if (distance < minDistance) {
          minDistance = distance;
          closestPair = [i, j];
        }
      }
    }

    // Mesafe eşik değerini aştıysa, birleştirmeyi durdur
    if (minDistance > cutoffDistance) {
      break;
    }

    // En yakın kümeleri birleştir
    const [i, j] = closestPair;
    const mergedCluster: ClusterNode = {
      id: nextId++,
      points: [...clusters[i].points, ...clusters[j].points],
      children: [clusters[i], clusters[j]],
      distance: minDistance,
    };

    // Birleştirilen kümeleri güncelle
    mergedCluster.points.forEach((p) => (p.cluster = mergedCluster.id));

    // Yeni kümeyi ekle, eski kümeleri çıkar
    const newClusters = clusters.filter(
      (_, index) => index !== i && index !== j
    );
    newClusters.push(mergedCluster);
    clusters = newClusters;

    // Adımı kaydet
    steps.push({
      clusters: JSON.parse(JSON.stringify(clusters)),
      mergedIndices: closestPair,
      distance: minDistance,
      step: 'merge',
      description: `Kümeler birleştirildi (Mesafe: ${minDistance.toFixed(2)})`,
    });
  }

  // Son kümeleme durumuna göre nokta atamalarını yap
  const clusterAssignments = new Array(points.length).fill(-1);

  for (const cluster of clusters) {
    for (const point of cluster.points) {
      // Orijinal nokta dizisindeki indeksi bulmalıyız
      const originalIndex = points.findIndex(
        (p) => p.x === point.x && p.y === point.y
      );
      if (originalIndex !== -1) {
        clusterAssignments[originalIndex] = cluster.id;
      }
    }
  }

  // Dendrogram kökünü bul (tek kök yoksa yapay bir kök oluştur)
  let dendrogram: ClusterNode;
  if (clusters.length === 1) {
    dendrogram = clusters[0];
  } else {
    // Birden fazla kök varsa, yapay bir kök oluştur
    dendrogram = {
      id: nextId,
      points: clusters.flatMap((c) => c.points),
      children: clusters.length >= 2 ? [clusters[0], clusters[1]] : undefined,
    };
  }

  return { dendrogram, clusterAssignments, steps };
}

// Rastgele 2D nokta kümesi oluştur
function generateRandomPoints(
  numPoints: number,
  maxX: number,
  maxY: number
): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < numPoints; i++) {
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
  width: number;
  height: number;
  highlightCluster?: number;
}> = ({ points, width, height, highlightCluster }) => {
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
    '#574B90',
    '#F78FB3',
    '#3DC1D3',
    '#63CDDA',
    '#786FA6',
  ];

  // Nokta yarıçapı
  const pointRadius = 5;

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Noktaları çiz */}
        {points.map((point, index) => {
          const isHighlighted =
            highlightCluster !== undefined &&
            point.cluster === highlightCluster;

          return (
            <circle
              key={`point-${index}`}
              cx={point.x}
              cy={point.y}
              r={isHighlighted ? pointRadius * 1.5 : pointRadius}
              fill={
                point.cluster >= 0
                  ? colors[point.cluster % colors.length]
                  : '#ccc'
              }
              stroke={isHighlighted ? '#000' : '#fff'}
              strokeWidth={isHighlighted ? 2 : 1}
              opacity={isHighlighted ? 1 : 0.8}
            />
          );
        })}
      </svg>
    </div>
  );
};

// Dendrogram görselleştirme bileşeni
const DendrogramVisualization: React.FC<{
  dendrogram: ClusterNode;
  width: number;
  height: number;
  onSelectCluster: (clusterId: number) => void;
}> = ({ dendrogram, width, height, onSelectCluster }) => {
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);

  // Yatay ve dikey ölçekleme faktörleri
  const horizontalScale = width * 0.9;
  const verticalScale = height * 0.9;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  // Dendrogram için düğümleri ve kenarları oluştur
  const nodes: any[] = [];
  const edges: any[] = [];

  // Ağaç yapısını dolaşarak düğümleri ve kenarları belirle
  function traverseTree(
    node: ClusterNode,
    depth: number,
    x: number,
    width: number
  ) {
    const y =
      margin.top +
      (depth * (verticalScale - margin.top - margin.bottom)) /
        getTreeDepth(dendrogram);

    nodes.push({
      id: node.id,
      x: x + width / 2,
      y,
      points: node.points.length,
      distance: node.distance || 0,
      isLeaf: !node.children,
    });

    if (node.children) {
      const [left, right] = node.children;
      const childWidth = width / 2;

      traverseTree(left, depth + 1, x, childWidth);
      traverseTree(right, depth + 1, x + childWidth, childWidth);

      // Bu düğümden çocuklarına kenarlar ekle
      const leftNode = nodes.find((n) => n.id === left.id);
      const rightNode = nodes.find((n) => n.id === right.id);

      if (leftNode && rightNode) {
        edges.push({
          from: { id: node.id, x: x + width / 2, y },
          to: { id: left.id, x: leftNode.x, y: leftNode.y },
        });

        edges.push({
          from: { id: node.id, x: x + width / 2, y },
          to: { id: right.id, x: rightNode.x, y: rightNode.y },
        });
      }
    }
  }

  // Ağacın derinliğini bul
  function getTreeDepth(node: ClusterNode): number {
    if (!node.children) return 1;
    const [left, right] = node.children;
    return 1 + Math.max(getTreeDepth(left), getTreeDepth(right));
  }

  // Dendrogramı oluştur
  traverseTree(
    dendrogram,
    0,
    margin.left,
    horizontalScale - margin.left - margin.right
  );

  // Renk paleti
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
        {/* Kenarları çiz */}
        {edges.map((edge, index) => (
          <line
            key={`edge-${index}`}
            x1={edge.from.x}
            y1={edge.from.y}
            x2={edge.to.x}
            y2={edge.to.y}
            stroke="#666"
            strokeWidth={1.5}
          />
        ))}

        {/* Düğümleri çiz */}
        {nodes.map((node) => (
          <g
            key={`node-${node.id}`}
            onClick={() => onSelectCluster(node.id)}
            onMouseEnter={() => setHoveredCluster(node.id)}
            onMouseLeave={() => setHoveredCluster(null)}
            style={{ cursor: 'pointer' }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.isLeaf ? 4 : 6}
              fill={node.isLeaf ? colors[node.id % colors.length] : '#fff'}
              stroke={hoveredCluster === node.id ? '#000' : '#666'}
              strokeWidth={hoveredCluster === node.id ? 2 : 1}
            />

            {!node.isLeaf && (
              <text
                x={node.x}
                y={node.y - 10}
                textAnchor="middle"
                fontSize="10"
                fill="#666"
              >
                {node.points}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

// Algoritma adımlarını görselleştiren bileşen
const HierarchicalClusteringSteps: React.FC<{
  steps: any[];
  currentStep: number;
  onChangeStep: (step: number) => void;
  width: number;
  height: number;
  onSelectCluster: (clusterId: number) => void;
}> = ({ steps, currentStep, onChangeStep, width, height, onSelectCluster }) => {
  // İleri ve geri adım tuşları için event handler'lar
  const handlePrevious = () => {
    onChangeStep(Math.max(0, currentStep - 1));
  };

  const handleNext = () => {
    onChangeStep(Math.min(steps.length - 1, currentStep + 1));
  };

  if (steps.length === 0) {
    return <p>Adım bulunamadı</p>;
  }

  const step = steps[currentStep];
  const clusters = step.clusters || [];

  // Her kümedeki noktaları birleştirerek tek bir nokta listesi oluştur
  const allPoints = clusters.flatMap((cluster: ClusterNode) =>
    cluster.points.map((p: Point) => ({ ...p, cluster: cluster.id }))
  );

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
            <span>{step.description || 'Kümeleme Adımı'}</span>
            <Badge>{step.step}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ClusterVisualization
              points={allPoints}
              width={width}
              height={height / 2}
              highlightCluster={step.mergedCluster}
            />

            <div className="text-sm">
              <p className="font-medium">Küme Sayısı: {clusters.length}</p>
              {step.distance !== undefined && (
                <p>Birleştirme Mesafesi: {step.distance.toFixed(2)}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Kod örnekleri
const implementations = {
  typescript: `// Hiyerarşik kümeleme algoritması (Aglomeratif - AGNES)
function hierarchicalClustering(
  points: Point[],
  cutoffDistance: number = Infinity
): { 
  dendrogram: ClusterNode, 
  clusterAssignments: number[]
} {
  // Her nokta için başlangıçta ayrı küme oluştur
  let clusters: ClusterNode[] = points.map((point, index) => ({
    id: index,
    points: [{ ...point, cluster: index }],
  }));
  
  // Uzaklık eşiği altında en az 2 küme kalana kadar kümeleri birleştir
  let nextId = points.length;
  while (clusters.length > 1) {
    // En yakın iki kümeyi bul
    let minDistance = Infinity;
    let closestPair: [number, number] = [-1, -1];
    
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        // İki küme arasındaki mesafeyi hesapla
        const distance = calculateClusterDistance(clusters[i], clusters[j]);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestPair = [i, j];
        }
      }
    }
    
    // Mesafe eşik değerini aştıysa, birleştirmeyi durdur
    if (minDistance > cutoffDistance) {
      break;
    }
    
    // En yakın kümeleri birleştir
    const [i, j] = closestPair;
    const mergedCluster: ClusterNode = {
      id: nextId++,
      points: [...clusters[i].points, ...clusters[j].points],
      children: [clusters[i], clusters[j]],
      distance: minDistance
    };
    
    // Birleştirilen kümeleri güncelle
    mergedCluster.points.forEach(p => p.cluster = mergedCluster.id);
    
    // Yeni kümeyi ekle, eski kümeleri çıkar
    const newClusters = clusters.filter((_, index) => index !== i && index !== j);
    newClusters.push(mergedCluster);
    clusters = newClusters;
  }
  
  // Son kümeleme durumuna göre nokta atamalarını yap
  const clusterAssignments = new Array(points.length).fill(-1);
  
  for (const cluster of clusters) {
    for (const point of cluster.points) {
      // Orijinal nokta dizisindeki indeksi bulmalıyız
      const originalIndex = points.findIndex(p => p.x === point.x && p.y === point.y);
      if (originalIndex !== -1) {
        clusterAssignments[originalIndex] = cluster.id;
      }
    }
  }
  
  // Dendrogram kökünü bul (tek kök yoksa yapay bir kök oluştur)
  let dendrogram: ClusterNode;
  if (clusters.length === 1) {
    dendrogram = clusters[0];
  } else {
    // Birden fazla kök varsa, yapay bir kök oluştur
    dendrogram = {
      id: nextId,
      points: clusters.flatMap(c => c.points),
      children: clusters.length >= 2 ? [clusters[0], clusters[1]] : undefined
    };
  }
  
  return { dendrogram, clusterAssignments };
}

// İki küme arasındaki mesafeyi hesapla (en yakın komşu/tek bağlantı yöntemi)
function calculateClusterDistance(clusterA: ClusterNode, clusterB: ClusterNode): number {
  let minDistance = Infinity;
  
  // Her iki kümedeki her nokta çifti için mesafeyi hesapla
  for (const pointA of clusterA.points) {
    for (const pointB of clusterB.points) {
      const distance = euclideanDistance(pointA, pointB);
      minDistance = Math.min(minDistance, distance);
    }
  }
  
  return minDistance;
}

// İki nokta arasındaki Öklid mesafesi
function euclideanDistance(p1: Point, p2: Point): number {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
}`,
  python: `import numpy as np
import matplotlib.pyplot as plt
from scipy.cluster.hierarchy import dendrogram, linkage
from typing import List, Dict, Tuple, Optional, Union, Any

class Point:
    def __init__(self, x: float, y: float, cluster: int = -1):
        self.x = x
        self.y = y
        self.cluster = cluster

class ClusterNode:
    def __init__(self, id: int, points: List[Point], 
                 children: Optional[List['ClusterNode']] = None,
                 distance: Optional[float] = None):
        self.id = id
        self.points = points
        self.children = children
        self.distance = distance

def euclidean_distance(p1: Point, p2: Point) -> float:
    """İki nokta arasındaki Öklid mesafesini hesaplar"""
    return np.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)

def calculate_cluster_distance(cluster_a: ClusterNode, 
                               cluster_b: ClusterNode, 
                               linkage_type: str = 'single') -> float:
    """İki küme arasındaki mesafeyi hesaplar"""
    distances = []
    
    # Her iki kümedeki her nokta çifti için mesafeleri hesapla
    for point_a in cluster_a.points:
        for point_b in cluster_b.points:
            distances.append(euclidean_distance(point_a, point_b))
    
    # Bağlantı türüne göre mesafeyi belirle
    if linkage_type == 'single':  # En yakın komşu
        return min(distances)
    elif linkage_type == 'complete':  # En uzak komşu
        return max(distances)
    elif linkage_type == 'average':  # Ortalama bağlantı
        return sum(distances) / len(distances)
    else:
        raise ValueError(f"Bilinmeyen bağlantı türü: {linkage_type}")

def hierarchical_clustering(points: List[Point], 
                            cutoff_distance: float = float('inf'),
                            linkage_type: str = 'single') -> Dict[str, Any]:
    """Hiyerarşik kümeleme algoritması (Aglomeratif)"""
    # Her nokta için başlangıçta ayrı küme oluştur
    clusters = [ClusterNode(i, [point]) for i, point in enumerate(points)]
    
    # Adımları kaydetmek için liste
    steps = []
    steps.append({
        'clusters': clusters.copy(),
        'step': 'initialization',
        'description': 'Her nokta kendi kümesini oluşturur'
    })
    
    # Uzaklık eşiği altında en az 2 küme kalana kadar kümeleri birleştir
    next_id = len(points)
    while len(clusters) > 1:
        # En yakın iki kümeyi bul
        min_distance = float('inf')
        closest_pair = (-1, -1)
        
        for i in range(len(clusters)):
            for j in range(i + 1, len(clusters)):
                distance = calculate_cluster_distance(
                    clusters[i], clusters[j], linkage_type)
                
                if distance < min_distance:
                    min_distance = distance
                    closest_pair = (i, j)
        
        # Mesafe eşik değerini aştıysa, birleştirmeyi durdur
        if min_distance > cutoff_distance:
            break
        
        # En yakın kümeleri birleştir
        i, j = closest_pair
        merged_points = clusters[i].points + clusters[j].points
        for point in merged_points:
            point.cluster = next_id
            
        merged_cluster = ClusterNode(
            id=next_id,
            points=merged_points,
            children=[clusters[i], clusters[j]],
            distance=min_distance
        )
        next_id += 1
        
        # Yeni kümeyi ekle, eski kümeleri çıkar
        new_clusters = [cluster for k, cluster in enumerate(clusters) 
                         if k != i and k != j]
        new_clusters.append(merged_cluster)
        clusters = new_clusters
        
        # Adımı kaydet
        steps.append({
            'clusters': clusters.copy(),
            'merged_indices': closest_pair,
            'distance': min_distance,
            'step': 'merge',
            'description': f'Kümeler birleştirildi (Mesafe: {min_distance:.2f})'
        })
    
    # Son kümeleme durumuna göre nokta atamalarını yap
    cluster_assignments = [-1] * len(points)
    for cluster in clusters:
        for point in cluster.points:
            # Orijinal nokta dizisindeki indeksi bul
            for i, original_point in enumerate(points):
                if original_point.x == point.x and original_point.y == point.y:
                    cluster_assignments[i] = cluster.id
    
    # Dendrogram kökünü bul (tek kök yoksa yapay bir kök oluştur)
    if len(clusters) == 1:
        dendrogram = clusters[0]
    else:
        # Birden fazla kök varsa, yapay bir kök oluştur
        dendrogram = ClusterNode(
            id=next_id,
            points=[p for c in clusters for p in c.points],
            children=clusters[:2] if len(clusters) >= 2 else None
        )
    
    return {
        'dendrogram': dendrogram,
        'cluster_assignments': cluster_assignments,
        'steps': steps
    }

# Görselleştirme fonksiyonu
def visualize_hierarchical_clustering(points, cluster_assignments):
    """Kümeleme sonuçlarını görselleştirir"""
    plt.figure(figsize=(10, 6))
    
    # Farklı kümeler için farklı renkler
    colors = plt.cm.rainbow(np.linspace(0, 1, max(cluster_assignments) + 1))
    
    # Noktaları çiz
    for i, point in enumerate(points):
        cluster_id = cluster_assignments[i]
        color = colors[cluster_id] if cluster_id >= 0 else 'gray'
        plt.scatter(point.x, point.y, color=color)
    
    plt.title('Hierarchical Clustering Results')
    plt.xlabel('X')
    plt.ylabel('Y')
    plt.show()
    
# Dendrogram görselleştirme
def plot_dendrogram(model, **kwargs):
    """SciPy hierarchical clustering modelini kullanarak dendrogram çizer"""
    plt.figure(figsize=(12, 8))
    
    # Dendrogram çiz
    dendrogram(model, **kwargs)
    
    plt.title('Hierarchical Clustering Dendrogram')
    plt.xlabel('Sample index')
    plt.ylabel('Distance')
    plt.show()`,
};

// Algoritmanın pseudocode tanımlaması
const pseudocode = `function hierarchicalClustering(points, cutoffDistance):
    // 1. Her noktayı kendi başına bir küme olarak başlat
    clusters = []
    for each point in points:
        clusters.add(new Cluster(point))
    
    // 2. Mesafe eşiği altında en az 2 küme kalana kadar birleştir
    while clusters.length > 1:
        // En yakın iki kümeyi bul
        minDistance = Infinity
        closestPair = [-1, -1]
        
        for i from 0 to clusters.length - 1:
            for j from i + 1 to clusters.length - 1:
                distance = calculateDistance(clusters[i], clusters[j])
                
                if distance < minDistance:
                    minDistance = distance
                    closestPair = [i, j]
        
        // Mesafe eşik değerini aştıysa, birleştirmeyi durdur
        if minDistance > cutoffDistance:
            break
        
       // En yakın kümeleri birleştir
        [i, j] = closestPair
        mergedCluster = mergeClusters(clusters[i], clusters[j])
        
        // Eski kümeleri çıkar, yeni kümeyi ekle
        clusters.remove(clusters[i])
        clusters.remove(clusters[j])
        clusters.add(mergedCluster)
    
    // 3. Dendrogram oluştur ve sonuç kümelerini döndür
    return {
        dendrogram: buildDendrogram(clusters),
        clusterAssignments: assignPointsToClusters(points, clusters)
    }`;

// Ana uygulama bileşeni - Hiyerarşik kümeleme algoritmasını görselleştiren ve açıklayan sayfa
export default function HierarchicalClusteringPage() {
  // Görselleştirme boyutları için sabit değerler tanımlama
  const width = 500;
  const height = 400;

  // Algoritma parametreleri için state tanımlamaları
  const [numPoints, setNumPoints] = useState<number>(30);
  const [numClusters, setNumClusters] = useState<number>(3);
  const [dataType, setDataType] = useState<'random' | 'clustered'>('clustered');
  const [cutoffDistance, setCutoffDistance] = useState<number>(Infinity);
  const [cutoffValue, setCutoffValue] = useState<number>(100);

  // Veri ve algoritma sonuçları için state tanımlamaları
  const [points, setPoints] = useState<Point[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [dendrogram, setDendrogram] = useState<ClusterNode | null>(null);
  const [clusterAssignments, setClusterAssignments] = useState<number[]>([]);
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Kullanıcının veri kümesi oluşturmasını sağlayan fonksiyon
  const generateData = useCallback(() => {
    let newPoints: Point[];

    // Veri tipi seçimine göre nokta kümesi oluştur
    if (dataType === 'random') {
      newPoints = generateRandomPoints(numPoints, width, height);
    } else {
      // Kümelenmiş veriler için her kümede eşit sayıda nokta oluştur
      const pointsPerCluster = Math.floor(numPoints / numClusters);
      newPoints = generateClusteredPoints(
        numClusters,
        pointsPerCluster,
        width,
        height,
        50 // Yayılma faktörü
      );
    }

    // Yeni veri kümesi oluşturulduğunda state'i sıfırla
    setPoints(newPoints);
    setSteps([]);
    setCurrentStep(0);
    setDendrogram(null);
    setClusterAssignments([]);
    setSelectedCluster(null);
  }, [dataType, numPoints, numClusters, width, height]);

  // Component yüklendiğinde ilk veri kümesini oluştur
  useEffect(() => {
    generateData();
  }, [generateData]);

  // Algoritmanın çalıştırılmasını sağlayan fonksiyon
  const runAlgorithm = useCallback(() => {
    if (points.length === 0 || isRunning) return;

    setIsRunning(true);

    // Kullanıcı seçimine göre cutoff mesafesini ayarla
    // 0-100 aralığındaki slider değerini gerçek mesafeye dönüştür
    const actualCutoff =
      cutoffValue === 100 ? Infinity : (cutoffValue / 100) * 200;
    setCutoffDistance(actualCutoff);

    // Algoritma çalıştırma işlemini zamanlayıcı ile asenkron olarak yap
    // Bu UI'ın donmasını engeller
    setTimeout(() => {
      try {
        // Algoritma çalıştır ve sonuçları al
        const result = hierarchicalClustering(points, actualCutoff);

        // Sonuçları state'e kaydet
        setDendrogram(result.dendrogram);
        setClusterAssignments(result.clusterAssignments);
        setSteps(result.steps);
        setCurrentStep(0); // İlk adımdan başla
      } catch (error) {
        console.error('Algoritma çalıştırılırken hata oluştu:', error);
      } finally {
        setIsRunning(false);
      }
    }, 100);
  }, [points, isRunning, cutoffValue]);

  // Kullanıcının ilgilendiği kümeyi takip etmek için handler
  const handleSelectCluster = (clusterId: number) => {
    setSelectedCluster(clusterId === selectedCluster ? null : clusterId);
  };

  // İlgili kümedeki noktaları recursive olarak filtrele
  const getPointsInCluster = useCallback(() => {
    if (!selectedCluster || !dendrogram) return [];

    // Seçilen küme ID'sine sahip düğümü bul
    const findClusterNode = (node: ClusterNode): ClusterNode | null => {
      if (node.id === selectedCluster) return node;
      if (!node.children) return null;

      // Çocuk düğümlerde aramaya devam et (sol ve sağ alt ağaç)
      const leftResult = findClusterNode(node.children[0]);
      if (leftResult) return leftResult;

      return findClusterNode(node.children[1]);
    };

    const clusterNode = findClusterNode(dendrogram);
    return clusterNode ? clusterNode.points : [];
  }, [selectedCluster, dendrogram]);

  // Seçilen kümeye ait noktaları al
  const selectedPoints = getPointsInCluster();

  // Kesme eşiği değeri değişikliğini işle
  const handleCutoffChange = (value: number[]) => {
    setCutoffValue(value[0]);
  };

  // Algoritma adımları arasında geçiş yapmayı sağlayan handler
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  return (
    <div className="space-y-8">
      <AlgorithmExplanation
        title="Hiyerarşik Kümeleme (Hierarchical Clustering) Algoritması"
        description="Hiyerarşik kümeleme, benzer özelliklere sahip verileri gruplandırmak için kullanılan bir kümeleme algoritmasıdır. Aglomeratif (birleştirici) yaklaşımda, her nokta başlangıçta kendi kümesini oluşturur ve en yakın kümeler hiyerarşik olarak birleştirilir."
        timeComplexity={{
          best: 'O(n²)',
          average: 'O(n² log n)',
          worst: 'O(n³)',
        }}
        spaceComplexity="O(n²)"
        advantages={[
          'Küme sayısını önceden bilmeye gerek yoktur',
          'Hiyerarşik yapı (dendrogram) sayesinde tüm kümeleme seviyelerini görmek mümkündür',
          'Çeşitli mesafe ölçümlerine ve bağlantı yöntemlerine uyarlanabilir',
          'Keyfi şekilli kümeleri tespit edebilir',
        ]}
        disadvantages={[
          'Büyük veri setleri için yüksek hesaplama karmaşıklığı',
          'Gürültülü verilere karşı hassasiyet',
          'Birleştirme işlemi geri alınamaz, bu da hatalı birleştirmeleri düzeltmeyi zorlaştırır',
          'Yüksek bellek gereksinimi',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Müşteri segmentasyonu',
          'Biyolojik taksonomik sınıflandırma',
          'Belge ve metin kategorizasyonu',
          'Gen ekspresyon analizi',
          'Sosyal ağ analizi',
          'Anomali tespiti',
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sol panel - Parametreler ve Kontroller */}
        <Card>
          <CardHeader>
            <CardTitle>Algoritma Parametreleri</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Veri tipi seçimi */}
              <div className="space-y-2">
                <Label>Veri Tipi</Label>
                <div className="flex space-x-2">
                  <Button
                    variant={dataType === 'random' ? 'default' : 'outline'}
                    onClick={() => setDataType('random')}
                    disabled={isRunning}
                  >
                    Rastgele
                  </Button>
                  <Button
                    variant={dataType === 'clustered' ? 'default' : 'outline'}
                    onClick={() => setDataType('clustered')}
                    disabled={isRunning}
                  >
                    Kümelenmiş
                  </Button>
                </div>
              </div>

              {/* Nokta sayısı ayarı */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="numPoints">Nokta Sayısı: {numPoints}</Label>
                </div>
                <Slider
                  id="numPoints"
                  min={10}
                  max={100}
                  step={5}
                  value={[numPoints]}
                  onValueChange={(value) => setNumPoints(value[0])}
                  disabled={isRunning}
                />
              </div>

              {/* Küme sayısı ayarı (sadece kümelenmiş veri için) */}
              {dataType === 'clustered' && (
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="numClusters">
                      Küme Sayısı: {numClusters}
                    </Label>
                  </div>
                  <Slider
                    id="numClusters"
                    min={2}
                    max={6}
                    step={1}
                    value={[numClusters]}
                    onValueChange={(value) => setNumClusters(value[0])}
                    disabled={isRunning}
                  />
                </div>
              )}

              {/* Kesme mesafesi ayarı */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="cutoffValue">
                    Kesme Eşiği:{' '}
                    {cutoffValue === 100 ? 'Hiç (Tek Küme)' : `${cutoffValue}%`}
                  </Label>
                </div>
                <Slider
                  id="cutoffValue"
                  min={0}
                  max={100}
                  step={5}
                  value={[cutoffValue]}
                  onValueChange={handleCutoffChange}
                  disabled={isRunning}
                />
              </div>

              {/* Butonlar */}
              <div className="flex space-x-2">
                <Button onClick={generateData} disabled={isRunning}>
                  Yeni Veri Oluştur
                </Button>
                <Button
                  onClick={runAlgorithm}
                  disabled={isRunning || points.length === 0}
                >
                  {isRunning ? 'Çalışıyor...' : 'Algoritmayı Çalıştır'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sağ panel - Görselleştirme */}
        <Card>
          <CardHeader>
            <CardTitle>Veri Görselleştirmesi</CardTitle>
          </CardHeader>
          <CardContent>
            <ClusterVisualization
              points={points.map((p) => ({
                ...p,
                cluster: clusterAssignments[points.indexOf(p)] || -1,
              }))}
              width={width}
              height={height}
              highlightCluster={
                selectedCluster !== null ? selectedCluster : undefined
              }
            />

            {selectedCluster !== null && (
              <div className="mt-2">
                <p className="text-sm font-medium">
                  Seçili Küme: {selectedCluster} ({selectedPoints.length} nokta)
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dendrogram ve Adımlar - Algoritma çalıştırıldıktan sonra görünür */}
      {dendrogram && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dendrogram */}
          <Card>
            <CardHeader>
              <CardTitle>Dendrogram</CardTitle>
            </CardHeader>
            <CardContent>
              <DendrogramVisualization
                dendrogram={dendrogram}
                width={width}
                height={height}
                onSelectCluster={handleSelectCluster}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Düğümlere tıklayarak kümeleri seçebilirsiniz
              </p>
            </CardContent>
          </Card>

          {/* Adım adım görselleştirme */}
          <div>
            <HierarchicalClusteringSteps
              steps={steps}
              currentStep={currentStep}
              onChangeStep={handleStepChange}
              width={width}
              height={height}
              onSelectCluster={handleSelectCluster}
            />
          </div>
        </div>
      )}

      {/* Kod örnekleri */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Hiyerarşik kümeleme algoritmasının farklı programlama dillerindeki
          uygulamaları:
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
              title="Hiyerarşik Kümeleme - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Hiyerarşik Kümeleme - Python"
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
