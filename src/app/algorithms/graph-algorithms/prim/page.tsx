'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { MSTVisualizer } from '@/components/common/mst-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';

// Prim algoritması için ana sayfa komponenti
export default function PrimAlgorithmPage() {
  // Prim algoritması için açıklama verileri
  const algorithmData = {
    title: "Prim's Algorithm (Prim Algoritması)",
    description:
      "Prim's algoritması, ağırlıklı bağlantılı bir grafın minimum yayılma ağacını (MST) bulmak için kullanılan " +
      'açgözlü bir algoritmadır. Algoritma, bir düğümden başlayarak her adımda mevcut ağaca en yakın düğümü ekler.',
    timeComplexity: {
      best: 'O(E log V)',
      average: 'O(E log V)',
      worst: 'O(E log V)',
    },
    spaceComplexity: 'O(V)',
    advantages: [
      'Dense graflarda Kruskal algoritmasından daha etkilidir',
      'Öncelik kuyruğu ile efficient implementasyon mümkündür',
      'Her zaman bağlı bir MST oluşturur',
      'Incremental olarak MST inşa eder',
      'Network design problemleri için intuitive yaklaşım sağlar',
    ],
    disadvantages: [
      'Sparse graflarda Kruskal algoritmasından yavaş olabilir',
      'Başlangıç düğümü seçimi algoritmanın performansını etkilemez ama visualizasyon değişir',
      'Union-Find yapısına göre daha karmaşık veri yapıları gerektirir',
      'Paralel implementasyonu zordur',
    ],
    pseudocode: `function Prim(graph, startVertex):
    mst = []
    visited = set()
    priorityQueue = MinHeap()
    
    visited.add(startVertex)
    
    // Başlangıç düğümünün tüm kenarlarını kuyruğa ekle
    for edge in graph.edges(startVertex):
        priorityQueue.insert(edge, edge.weight)
    
    while priorityQueue is not empty and len(visited) < graph.vertexCount:
        edge = priorityQueue.extractMin()
        
        if edge.to not in visited:
            mst.append(edge)
            visited.add(edge.to)
            
            // Yeni düğümün kenarlarını kuyruğa ekle
            for newEdge in graph.edges(edge.to):
                if newEdge.to not in visited:
                    priorityQueue.insert(newEdge, newEdge.weight)
    
    return mst`,
    applications: [
      'Ağ tasarımı ve kablolama maliyeti minimizasyonu',
      'Cluster analysis ve phylogenetic trees',
      'Approximation algorithms for TSP',
      'Image segmentation ve computer vision',
      'Social network analysis',
      'Circuit design ve VLSI layout',
      'Transportation network planning',
    ],
  };

  // Prim algoritması için JavaScript implementasyonu
  const primImplementation = `// Prim's Algorithm JavaScript implementasyonu
class PrimMST {
  constructor(graph) {
    this.graph = graph;
    this.vertices = graph.vertices;
    this.edges = graph.edges;
  }

  // Ana Prim algoritması - MST hesaplar
  findMST(startVertex = 0) {
    const mst = [];
    const visited = new Set();
    const priorityQueue = new MinHeap();
    let totalWeight = 0;

    // Başlangıç düğümünü ziyaret edildi olarak işaretle
    visited.add(startVertex);

    // Başlangıç düğümünün tüm kenarlarını priority queue'ya ekle
    this.addEdgesToQueue(startVertex, visited, priorityQueue);

    // MST tamamlanana kadar devam et
    while (!priorityQueue.isEmpty() && visited.size < this.vertices.length) {
      const edge = priorityQueue.extractMin();
      const { from, to, weight } = edge;

      // Hedef düğüm zaten ziyaret edildiyse atla
      if (visited.has(to)) {
        continue;
      }

      // Kenarı MST'ye ekle
      mst.push(edge);
      totalWeight += weight;
      visited.add(to);

      // Yeni düğümün kenarlarını queue'ya ekle
      this.addEdgesToQueue(to, visited, priorityQueue);
    }

    return {
      edges: mst,
      totalWeight: totalWeight,
      isComplete: visited.size === this.vertices.length
    };
  }

  // Belirtilen düğümün kenarlarını priority queue'ya ekle
  addEdgesToQueue(vertex, visited, priorityQueue) {
    for (const edge of this.edges) {
      // Düğümden çıkan ve henüz ziyaret edilmemiş düğümlere giden kenarlar
      if (edge.from === vertex && !visited.has(edge.to)) {
        priorityQueue.insert(edge, edge.weight);
      }
      // Undirected graf için tersi de geçerli
      else if (edge.to === vertex && !visited.has(edge.from)) {
        const reverseEdge = { from: edge.to, to: edge.from, weight: edge.weight };
        priorityQueue.insert(reverseEdge, edge.weight);
      }
    }
  }

  // MST'nin geçerli olup olmadığını kontrol et
  validateMST(mst) {
    if (mst.edges.length !== this.vertices.length - 1) {
      return false;
    }

    // Tüm düğümlerin bağlı olup olmadığını kontrol et
    const visited = new Set();
    const stack = [mst.edges[0].from];

    while (stack.length > 0) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      
      visited.add(current);

      for (const edge of mst.edges) {
        if (edge.from === current && !visited.has(edge.to)) {
          stack.push(edge.to);
        } else if (edge.to === current && !visited.has(edge.from)) {
          stack.push(edge.from);
        }
      }
    }

    return visited.size === this.vertices.length;
  }

  // Graf bilgilerini döndür
  getGraphInfo() {
    return {
      vertexCount: this.vertices.length,
      edgeCount: this.edges.length,
      isConnected: this.isGraphConnected()
    };
  }

  // Grafın bağlı olup olmadığını kontrol et
  isGraphConnected() {
    if (this.vertices.length === 0) return true;

    const visited = new Set();
    const stack = [this.vertices[0]];

    while (stack.length > 0) {
      const current = stack.pop();
      if (visited.has(current)) continue;
      
      visited.add(current);

      for (const edge of this.edges) {
        if (edge.from === current && !visited.has(edge.to)) {
          stack.push(edge.to);
        } else if (edge.to === current && !visited.has(edge.from)) {
          stack.push(edge.from);
        }
      }
    }

    return visited.size === this.vertices.length;
  }
}

// Min Heap implementasyonu - Priority Queue için
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Parent index hesapla
  getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  // Left child index hesapla
  getLeftChildIndex(index) {
    return 2 * index + 1;
  }

  // Right child index hesapla
  getRightChildIndex(index) {
    return 2 * index + 2;
  }

  // İki elemanın yerini değiştir
  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]];
  }

  // Yeni eleman ekle
  insert(element, priority) {
    const node = { element, priority };
    this.heap.push(node);
    this.heapifyUp(this.heap.length - 1);
  }

  // Minimum elemanı çıkar
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop().element;

    const min = this.heap[0].element;
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }

  // Yukarı doğru heap property koru
  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // Aşağı doğru heap property koru
  heapifyDown(index) {
    while (this.getLeftChildIndex(index) < this.heap.length) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);
      
      let smallestIndex = leftChildIndex;
      if (rightChildIndex < this.heap.length && 
          this.heap[rightChildIndex].priority < this.heap[leftChildIndex].priority) {
        smallestIndex = rightChildIndex;
      }

      if (this.heap[index].priority <= this.heap[smallestIndex].priority) {
        break;
      }

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }

  // Heap boş mu
  isEmpty() {
    return this.heap.length === 0;
  }

  // Heap boyutu
  size() {
    return this.heap.length;
  }
}

// Kullanım örneği
const graph = {
  vertices: [0, 1, 2, 3, 4],
  edges: [
    { from: 0, to: 1, weight: 2 },
    { from: 0, to: 3, weight: 6 },
    { from: 1, to: 2, weight: 3 },
    { from: 1, to: 3, weight: 8 },
    { from: 1, to: 4, weight: 5 },
    { from: 2, to: 4, weight: 7 },
    { from: 3, to: 4, weight: 9 }
  ]
};

const primMST = new PrimMST(graph);
const result = primMST.findMST(0);
console.log('MST Edges:', result.edges);
console.log('Total Weight:', result.totalWeight);`;

  return (
    <div className="space-y-8">
      {/* Algoritma açıklaması ve teorik bilgiler */}
      <AlgorithmExplanation {...algorithmData} />

      {/* İnteraktif MST visualizer */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          İnteraktif Prim Algoritması Simülasyonu
        </h2>
        <p className="text-muted-foreground">
          Aşağıdaki graf görselleştirici ile Prim algoritmasını test
          edebilirsiniz. Graf boyutunu ayarlayın, başlangıç düğümünü seçin ve
          algoritmanın MST'yi nasıl oluşturduğunu adım adım gözlemleyin.
        </p>
        <MSTVisualizer
          algorithm="prim"
          initialNodeCount={6}
          showControls={true}
        />
      </div>

      {/* Kod implementasyonu */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">JavaScript Implementasyonu</h2>
        <p className="text-muted-foreground">
          Prim algoritmasının tam JavaScript implementasyonu. Min-heap tabanlı
          priority queue kullanarak optimal performans sağlar ve graf bağlantı
          kontrolü içerir.
        </p>
        <CodeBlock
          code={primImplementation}
          language="javascript"
          showLineNumbers={true}
          title="Prim's Algorithm - Tam Implementasyon"
        />
      </div>

      {/* Algoritma karşılaştırması */}
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          Prim vs Kruskal Algoritması Karşılaştırması
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-green-600 mb-3">
              Prim's Algorithm
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Yaklaşım:</strong> Düğüm tabanlı, tek ağaç büyütme
              </div>
              <div>
                <strong>Veri Yapısı:</strong> Priority Queue (Min-Heap)
              </div>
              <div>
                <strong>Başlangıç:</strong> Belirli bir düğümden başlar
              </div>
              <div>
                <strong>En İyi Durum:</strong> Dense graflarda etkili
              </div>
              <div>
                <strong>Bellek:</strong> O(V) - düğüm sayısına bağlı
              </div>
              <div>
                <strong>Implementasyon:</strong> Nispeten karmaşık
              </div>
            </div>
          </div>
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-blue-600 mb-3">
              Kruskal's Algorithm
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Yaklaşım:</strong> Kenar tabanlı, forest birleştirme
              </div>
              <div>
                <strong>Veri Yapısı:</strong> Union-Find (Disjoint Set)
              </div>
              <div>
                <strong>Başlangıç:</strong> En küçük ağırlıklı kenardan
              </div>
              <div>
                <strong>En İyi Durum:</strong> Sparse graflarda etkili
              </div>
              <div>
                <strong>Bellek:</strong> O(E) - kenar sayısına bağlı
              </div>
              <div>
                <strong>Implementasyon:</strong> Nispeten basit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zaman karmaşıklığı analizi */}
      <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          Zaman Karmaşıklığı Detay Analizi
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Binary Heap ile Implementasyon
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Kenar ekleme: O(log V) per edge</li>
                <li>• Minimum çıkarma: O(log V) per extraction</li>
                <li>• Toplam: O(E log V)</li>
                <li>• Dense graflarda: O(V² log V)</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Fibonacci Heap ile Implementasyon
              </h4>
              <ul className="text-sm space-y-1">
                <li>• Kenar ekleme: O(1) amortized</li>
                <li>• Minimum çıkarma: O(log V) amortized</li>
                <li>• Toplam: O(E + V log V)</li>
                <li>• Teorik olarak daha iyi</li>
              </ul>
            </div>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            <strong>Not:</strong> Fibonacci heap implementasyonu karmaşık olduğu
            için pratikte binary heap genellikle tercih edilir. Dense graflarda
            (E ≈ V²) Prim's algorithm O(V² log V) olur.
          </p>
        </div>
      </div>

      {/* Pratik uygulama örnekleri */}
      <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-200">
          Gerçek Dünya Uygulamaları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Network Infrastructure
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Fiber optik kablo döşeme optimizasyonu</li>
              <li>• Elektrik şebekesi tasarımı</li>
              <li>• Su dağıtım sistemi planlaması</li>
              <li>• Telekomünikasyon ağ tasarımı</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Computer Science Applications
            </h4>
            <ul className="text-sm space-y-1">
              <li>• Cluster analysis ve data mining</li>
              <li>• Image segmentation algoritmaları</li>
              <li>• Approximation algorithms for TSP</li>
              <li>• Social network community detection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Optimizasyon teknikleri */}
      <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-200">
          Prim Algoritması Optimizasyon Teknikleri
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-purple-700 dark:text-purple-300">
              Dense Graph Optimization:
            </strong>
            <span className="ml-2">
              Dense graflarda simple array-based priority queue kullanarak O(V²)
              elde edilebilir.
            </span>
          </div>
          <div>
            <strong className="text-purple-700 dark:text-purple-300">
              Parallel Implementation:
            </strong>
            <span className="ml-2">
              Borůvka algoritması ile kombine ederek paralel MST hesaplaması
              mümkündür.
            </span>
          </div>
          <div>
            <strong className="text-purple-700 dark:text-purple-300">
              Memory Optimization:
            </strong>
            <span className="ml-2">
              Büyük graflarda external memory algoritmalarıyla bellek kullanımı
              optimize edilebilir.
            </span>
          </div>
          <div>
            <strong className="text-purple-700 dark:text-purple-300">
              Incremental MST:
            </strong>
            <span className="ml-2">
              Dinamik graflarda kenar ekleme/çıkarma işlemleri için incremental
              versiyonlar kullanılabilir.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
