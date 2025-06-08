'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { GridVisualizer } from '@/components/common/grid-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';

// A* algoritması için ana sayfa komponenti
export default function AStarAlgorithmPage() {
  // A* algoritması için açıklama verileri
  const algorithmData = {
    title: 'A* (A-Star) Algoritması',
    description:
      'A* algoritması, graf teorisinde en kısa yolu bulmak için kullanılan optimal ve tam bir arama algoritmasıdır. ' +
      'Dijkstra algoritmasının geliştirilmiş hali olup, heuristik fonksiyon kullanarak daha hızlı sonuç elde eder.',
    timeComplexity: {
      best: 'O(b^d)',
      average: 'O(b^d)',
      worst: 'O(b^d)',
    },
    spaceComplexity: 'O(b^d)',
    advantages: [
      'Optimal çözüm garantisi sağlar (admissible heuristic ile)',
      'Dijkstra algoritmasından genellikle daha hızlıdır',
      'Heuristik fonksiyon ile yönlendirilebilir arama yapar',
      'Çok çeşitli problem türlerine uygulanabilir',
      'Memory efficient implementasyonları mevcuttur',
    ],
    disadvantages: [
      'Heuristik fonksiyonun kalitesine bağımlıdır',
      'Büyük graf yapılarında yüksek bellek tüketimi',
      'Heuristik hesaplama maliyeti ekstra yük getirebilir',
      'Dinamik graf yapılarında yeniden hesaplama gerektirir',
    ],
    pseudocode: `function AStar(start, goal, heuristic):
    openSet = PriorityQueue()
    openSet.enqueue(start, 0)
    
    gScore[start] = 0
    fScore[start] = heuristic(start, goal)
    
    while openSet is not empty:
        current = openSet.dequeue()
        
        if current == goal:
            return reconstructPath(current)
        
        for neighbor in getNeighbors(current):
            tentativeGScore = gScore[current] + distance(current, neighbor)
            
            if tentativeGScore < gScore[neighbor]:
                cameFrom[neighbor] = current
                gScore[neighbor] = tentativeGScore
                fScore[neighbor] = gScore[neighbor] + heuristic(neighbor, goal)
                
                if neighbor not in openSet:
                    openSet.enqueue(neighbor, fScore[neighbor])
    
    return failure`,
    applications: [
      'Video oyunlarında NPC navigasyonu ve yol bulma',
      'Robotik alanında hareket planlama',
      'GPS navigasyon sistemlerinde rota hesaplama',
      'Yapay zeka ve makine öğrenmesinde problem çözme',
      'Network routing ve veri iletimi optimizasyonu',
      'Puzzle çözme algoritmalarında (8-puzzle, 15-puzzle)',
      'Şehir planlama ve trafik yönetimi sistemleri',
    ],
  };

  // A* algoritması için JavaScript implementasyonu
  const astarImplementation = `// A* algoritması JavaScript implementasyonu
class AStarPathfinder {
  constructor(grid, heuristicFunction = 'manhattan') {
    this.grid = grid;
    this.heuristicFunction = heuristicFunction;
  }

  // Ana A* algoritması - en kısa yolu hesaplar
  findPath(start, goal) {
    const openSet = new PriorityQueue();
    const closedSet = new Set();
    const gScore = new Map();
    const fScore = new Map();
    const cameFrom = new Map();

    // Başlangıç düğümünü ayarla
    gScore.set(this.getNodeKey(start), 0);
    fScore.set(this.getNodeKey(start), this.heuristic(start, goal));
    openSet.enqueue(start, fScore.get(this.getNodeKey(start)));

    while (!openSet.isEmpty()) {
      const current = openSet.dequeue();
      const currentKey = this.getNodeKey(current);

      // Hedefe ulaştık mı kontrol et
      if (this.isGoal(current, goal)) {
        return this.reconstructPath(cameFrom, current);
      }

      closedSet.add(currentKey);

      // Komşu düğümleri işle
      for (const neighbor of this.getNeighbors(current)) {
        const neighborKey = this.getNodeKey(neighbor);
        
        if (closedSet.has(neighborKey) || this.isObstacle(neighbor)) {
          continue;
        }

        const tentativeGScore = gScore.get(currentKey) + 
                               this.getDistance(current, neighbor);

        if (!gScore.has(neighborKey) || tentativeGScore < gScore.get(neighborKey)) {
          cameFrom.set(neighborKey, current);
          gScore.set(neighborKey, tentativeGScore);
          fScore.set(neighborKey, tentativeGScore + this.heuristic(neighbor, goal));

          if (!openSet.contains(neighbor)) {
            openSet.enqueue(neighbor, fScore.get(neighborKey));
          }
        }
      }
    }

    return []; // Yol bulunamadı
  }

  // Heuristik fonksiyon - hedef düğüme tahmini mesafe
  heuristic(node, goal) {
    switch (this.heuristicFunction) {
      case 'manhattan':
        return Math.abs(node.x - goal.x) + Math.abs(node.y - goal.y);
      case 'euclidean':
        return Math.sqrt(Math.pow(node.x - goal.x, 2) + Math.pow(node.y - goal.y, 2));
      case 'diagonal':
        return Math.max(Math.abs(node.x - goal.x), Math.abs(node.y - goal.y));
      default:
        return 0;
    }
  }

  // İki düğüm arası gerçek mesafe hesapla
  getDistance(node1, node2) {
    return Math.sqrt(
      Math.pow(node2.x - node1.x, 2) + Math.pow(node2.y - node1.y, 2)
    );
  }

  // Komşu düğümleri getir (8-yönlü hareket)
  getNeighbors(node) {
    const neighbors = [];
    const directions = [
      { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 },
      { x: -1, y: 0 },                    { x: 1, y: 0 },
      { x: -1, y: 1 },  { x: 0, y: 1 },  { x: 1, y: 1 }
    ];

    for (const dir of directions) {
      const newX = node.x + dir.x;
      const newY = node.y + dir.y;

      if (this.isValidPosition(newX, newY)) {
        neighbors.push({ x: newX, y: newY });
      }
    }

    return neighbors;
  }

  // Yolu yeniden oluştur
  reconstructPath(cameFrom, current) {
    const path = [current];
    let currentKey = this.getNodeKey(current);

    while (cameFrom.has(currentKey)) {
      current = cameFrom.get(currentKey);
      path.unshift(current);
      currentKey = this.getNodeKey(current);
    }

    return path;
  }

  // Yardımcı fonksiyonlar
  getNodeKey(node) {
    return \`\${node.x},\${node.y}\`;
  }

  isGoal(node, goal) {
    return node.x === goal.x && node.y === goal.y;
  }

  isValidPosition(x, y) {
    return x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height;
  }

  isObstacle(node) {
    return this.grid.data[node.y][node.x] === 1;
  }
}

// Priority Queue implementasyonu
class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(element, priority) {
    const queueElement = { element, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (queueElement.priority < this.items[i].priority) {
        this.items.splice(i, 0, queueElement);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(queueElement);
    }
  }

  dequeue() {
    return this.items.shift()?.element;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  contains(element) {
    return this.items.some(item => 
      item.element.x === element.x && item.element.y === element.y
    );
  }
}`;

  return (
    <div className="space-y-8">
      {/* Algoritma açıklaması ve teorik bilgiler */}
      <AlgorithmExplanation {...algorithmData} />

      {/* İnteraktif grid visualizer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          İnteraktif A* Algoritması Simülasyonu
        </h2>
        <p className="text-muted-foreground">
          Aşağıdaki grid üzerinde A* algoritmasını test edebilirsiniz. Başlangıç
          ve hedef noktalarını seçin, engeller yerleştirin ve algoritmanın en
          kısa yolu nasıl bulduğunu gözlemleyin.
        </p>
        <GridVisualizer
          algorithm="astar"
          initialWidth={25}
          initialHeight={20}
          showControls={true}
        />
      </div>

      {/* Kod implementasyonu */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">JavaScript Implementasyonu</h2>
        <p className="text-muted-foreground">
          A* algoritmasının tam JavaScript implementasyonu. Bu kod, priority
          queue ve heuristik fonksiyonlar dahil olmak üzere algoritmanın tüm
          bileşenlerini içerir.
        </p>
        <CodeBlock
          code={astarImplementation}
          language="javascript"
          showLineNumbers={true}
          title="A* Algoritması - Tam Implementasyon"
        />
      </div>

      {/* Algoritma karşılaştırması */}
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          A* vs Diğer Yol Bulma Algoritmaları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-green-600">A* Algoritması</h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Optimal çözüm garantisi</li>
              <li>• Heuristik ile yönlendirilmiş</li>
              <li>• Orta düzey bellek kullanımı</li>
              <li>• Çoğu durumda hızlı</li>
            </ul>
          </div>
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-blue-600">
              Dijkstra Algoritması
            </h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Optimal çözüm garantisi</li>
              <li>• Heuristik kullanmaz</li>
              <li>• Yüksek bellek kullanımı</li>
              <li>• Daha yavaş ama kesin</li>
            </ul>
          </div>
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-purple-600">Greedy Best-First</h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>• Optimal değil</li>
              <li>• Heuristik odaklı</li>
              <li>• Düşük bellek kullanımı</li>
              <li>• Çok hızlı ama riskli</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Performans ipuçları */}
      <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          A* Algoritması Optimizasyon İpuçları
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-blue-700 dark:text-blue-300">
              Heuristik Seçimi:
            </strong>
            <span className="ml-2">
              Manhattan distance grid tabanlı hareketler için, Euclidean
              distance serbest hareket için idealdir.
            </span>
          </div>
          <div>
            <strong className="text-blue-700 dark:text-blue-300">
              Bellek Optimizasyonu:
            </strong>
            <span className="ml-2">
              Büyük gridlerde hierarchical pathfinding veya jump point search
              kullanın.
            </span>
          </div>
          <div>
            <strong className="text-blue-700 dark:text-blue-300">
              Preprocessing:
            </strong>
            <span className="ml-2">
              Statik haritalar için precomputed distance maps kullanarak
              performansı artırın.
            </span>
          </div>
          <div>
            <strong className="text-blue-700 dark:text-blue-300">
              Dynamic Environments:
            </strong>
            <span className="ml-2">
              Değişen ortamlar için D* Lite veya incremental A* algoritmaları
              tercih edin.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
