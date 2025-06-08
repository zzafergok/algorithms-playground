'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { TreeVisualizer } from '@/components/common/tree-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';

interface ParsedArray {
  array: number[];
}

interface QueryResult {
  array: number[];
  queryRange: string;
  sum: number;
  min: number;
  max: number;
  treeStats: TreeStatistics | null;
}

interface TreeStatistics {
  nodeCount: number;
  leafCount: number;
  height: number;
  arraySize: number;
}

interface SegmentTreeInterface {
  querySum(start: number, end: number): number;
  queryMin(start: number, end: number): number;
  queryMax(start: number, end: number): number;
  getStatistics?(): TreeStatistics;
}

interface ParseArrayStringResult {
  array: number[];
}

interface TreeStats {
  sum: number;
  min: number;
  max: number;
}

interface PointUpdateResult {
  originalArray: number[];
  updatedIndex: number;
  oldValue: number;
  newValue: number;
  beforeUpdate: TreeStats;
  afterUpdate: TreeStats;
  updatedArray: number[];
}

interface SegmentTreeWithArray extends SegmentTreeInterface {
  updatePoint(index: number, newValue: number): void;
  getArray?(): number[];
}

// Segment Tree veri yapısı için ana sayfa komponenti
export default function SegmentTreeDataStructurePage() {
  // Segment Tree veri yapısı için açıklama verileri
  const algorithmData = {
    title: 'Segment Tree (Aralık Ağacı) Veri Yapısı',
    description:
      'Segment Tree, bir dizi üzerinde aralık sorguları (range queries) ve nokta güncellemeleri ' +
      'yapabilmek için tasarlanmış binary tree tabanlı bir veri yapısıdır. Toplam, minimum, maksimum ' +
      'gibi işlemleri logaritmik zamanda gerçekleştirir.',
    timeComplexity: {
      best: 'O(log n)',
      average: 'O(log n)',
      worst: 'O(log n)',
    },
    spaceComplexity: 'O(n)',
    advantages: [
      'Aralık sorguları çok hızlıdır (O(log n))',
      'Nokta güncellemeleri etkilidir (O(log n))',
      'Lazy propagation ile aralık güncellemeleri destekler',
      'Çeşitli associative operations için kullanılabilir',
      'Online algorithm - önceden tüm sorguları bilmek gerekmez',
    ],
    disadvantages: [
      'Implementation karmaşıklığı yüksektir',
      'Sabit boyutlu diziler için ekstra bellek kullanır',
      'Cache performance bazı durumlarda kötü olabilir',
      'Küçük diziler için overhead fazla olabilir',
    ],
    pseudocode: `// Segment Tree Node yapısı
class SegmentTreeNode:
    start, end          // Bu düğümün kapsadığı aralık
    sum, min, max       // Aralıktaki değerler
    left, right         // Sol ve sağ çocuk düğümler

// Segment Tree implementasyonu
class SegmentTree:
    root = null
    
    function build(array, start, end):
        if start == end:
            return new Node(start, end, array[start])
        
        mid = (start + end) / 2
        node = new Node(start, end)
        node.left = build(array, start, mid)
        node.right = build(array, mid + 1, end)
        
        // Parent node değerlerini çocuklardan hesapla
        node.sum = node.left.sum + node.right.sum
        node.min = min(node.left.min, node.right.min)
        node.max = max(node.left.max, node.right.max)
        
        return node
    
    function query(node, queryStart, queryEnd):
        // Tam kapsama
        if queryStart <= node.start and queryEnd >= node.end:
            return node.sum
        
        // Kapsama yok
        if queryEnd < node.start or queryStart > node.end:
            return 0
        
        // Kısmi kapsama
        return query(node.left, queryStart, queryEnd) +
               query(node.right, queryStart, queryEnd)`,
    applications: [
      'Competitive programming ve algorithm contests',
      'Database indexing ve range queries',
      'Computer graphics (2D range trees)',
      'Computational geometry problems',
      'Stock market analysis (range statistics)',
      'Time series data analysis',
      'Game development (collision detection)',
    ],
  };

  // Segment Tree için JavaScript implementasyonu
  const segmentTreeImplementation = `// Segment Tree JavaScript implementasyonu
class SegmentTreeNode {
  constructor(start, end, sum = 0, min = Infinity, max = -Infinity) {
    // Bu düğümün kapsadığı aralığın başlangıç ve bitiş indeksleri
    this.start = start;
    this.end = end;
    
    // Aralıktaki değerlerin toplamı, minimumu ve maksimumu
    this.sum = sum;
    this.min = min;
    this.max = max;
    
    // Sol ve sağ çocuk düğümler
    this.left = null;
    this.right = null;
    
    // Lazy propagation için (opsiyonel)
    this.lazyValue = 0;
    this.hasLazyValue = false;
  }
}

class SegmentTree {
  constructor(array) {
    // Orijinal diziyi kopyala
    this.originalArray = [...array];
    
    // Segment tree'yi build et
    this.root = array.length > 0 ? this.buildTree(array, 0, array.length - 1) : null;
  }

  // Segment tree'yi recursive olarak build etme
  buildTree(array, start, end) {
    // Base case: yaprak düğüm (tek eleman)
    if (start === end) {
      return new SegmentTreeNode(
        start, 
        end, 
        array[start], 
        array[start], 
        array[start]
      );
    }

    // Recursive case: iç düğüm
    const mid = Math.floor((start + end) / 2);
    const leftChild = this.buildTree(array, start, mid);
    const rightChild = this.buildTree(array, mid + 1, end);

    // Parent düğümün değerlerini çocuklardan hesapla
    const node = new SegmentTreeNode(start, end);
    node.left = leftChild;
    node.right = rightChild;
    
    // Aggregation operations
    node.sum = leftChild.sum + rightChild.sum;
    node.min = Math.min(leftChild.min, rightChild.min);
    node.max = Math.max(leftChild.max, rightChild.max);

    return node;
  }

  // Aralık toplamı sorgusu - O(log n)
  querySum(queryStart, queryEnd) {
    if (!this.root || queryStart > queryEnd) return 0;
    return this.querySumHelper(this.root, queryStart, queryEnd);
  }

  // Aralık minimum sorgusu - O(log n)
  queryMin(queryStart, queryEnd) {
    if (!this.root || queryStart > queryEnd) return Infinity;
    return this.queryMinHelper(this.root, queryStart, queryEnd);
  }

  // Aralık maksimum sorgusu - O(log n)
  queryMax(queryStart, queryEnd) {
    if (!this.root || queryStart > queryEnd) return -Infinity;
    return this.queryMaxHelper(this.root, queryStart, queryEnd);
  }

  // Nokta güncelleme - O(log n)
  updatePoint(index, newValue) {
    if (!this.root || index < 0 || index >= this.originalArray.length) return;
    
    this.originalArray[index] = newValue;
    this.updatePointHelper(this.root, index, newValue);
  }

  // Aralık güncelleme - lazy propagation ile O(log n)
  updateRange(updateStart, updateEnd, delta) {
    if (!this.root || updateStart > updateEnd) return;
    
    // Basit implementasyon: tüm noktaları tek tek güncelle
    for (let i = updateStart; i <= updateEnd; i++) {
      if (i >= 0 && i < this.originalArray.length) {
        this.originalArray[i] += delta;
      }
    }
    
    // Tree'yi yeniden build et (gerçek implementasyonda lazy propagation kullanılır)
    this.root = this.buildTree(this.originalArray, 0, this.originalArray.length - 1);
  }

  // Sum query helper - recursive implementation
  querySumHelper(node, queryStart, queryEnd) {
    // Tam kapsama - node'un tüm aralığı sorgu aralığında
    if (queryStart <= node.start && queryEnd >= node.end) {
      return node.sum;
    }

    // Kapsama yok - sorgu aralığı ile node aralığı kesişmiyor
    if (queryEnd < node.start || queryStart > node.end) {
      return 0;
    }

    // Kısmi kapsama - sol ve sağ çocukları sorgula
    let result = 0;
    if (node.left) {
      result += this.querySumHelper(node.left, queryStart, queryEnd);
    }
    if (node.right) {
      result += this.querySumHelper(node.right, queryStart, queryEnd);
    }

    return result;
  }

  // Min query helper - recursive implementation
  queryMinHelper(node, queryStart, queryEnd) {
    // Tam kapsama
    if (queryStart <= node.start && queryEnd >= node.end) {
      return node.min;
    }

    // Kapsama yok
    if (queryEnd < node.start || queryStart > node.end) {
      return Infinity;
    }

    // Kısmi kapsama
    let leftMin = Infinity;
    let rightMin = Infinity;

    if (node.left) {
      leftMin = this.queryMinHelper(node.left, queryStart, queryEnd);
    }
    if (node.right) {
      rightMin = this.queryMinHelper(node.right, queryStart, queryEnd);
    }

    return Math.min(leftMin, rightMin);
  }

  // Max query helper - recursive implementation
  queryMaxHelper(node, queryStart, queryEnd) {
    // Tam kapsama
    if (queryStart <= node.start && queryEnd >= node.end) {
      return node.max;
    }

    // Kapsama yok
    if (queryEnd < node.start || queryStart > node.end) {
      return -Infinity;
    }

    // Kısmi kapsama
    let leftMax = -Infinity;
    let rightMax = -Infinity;

    if (node.left) {
      leftMax = this.queryMaxHelper(node.left, queryStart, queryEnd);
    }
    if (node.right) {
      rightMax = this.queryMaxHelper(node.right, queryStart, queryEnd);
    }

    return Math.max(leftMax, rightMax);
  }

  // Point update helper - recursive implementation
  updatePointHelper(node, index, newValue) {
    // Base case: yaprak düğüm
    if (node.start === node.end) {
      node.sum = newValue;
      node.min = newValue;
      node.max = newValue;
      return;
    }

    // Recursive case: uygun çocuğu güncelle
    const mid = Math.floor((node.start + node.end) / 2);
    if (index <= mid && node.left) {
      this.updatePointHelper(node.left, index, newValue);
    } else if (node.right) {
      this.updatePointHelper(node.right, index, newValue);
    }

    // Parent node değerlerini güncelle
    if (node.left && node.right) {
      node.sum = node.left.sum + node.right.sum;
      node.min = Math.min(node.left.min, node.right.min);
      node.max = Math.max(node.left.max, node.right.max);
    }
  }

  // Tree structure'ı döndürme (görselleştirme için)
  getTreeStructure() {
    return this.root;
  }

  // Tree yüksekliğini hesaplama
  getHeight() {
    return this.getHeightHelper(this.root);
  }

  // Height helper - recursive implementation
  getHeightHelper(node) {
    if (!node) return 0;

    const leftHeight = this.getHeightHelper(node.left);
    const rightHeight = this.getHeightHelper(node.right);

    return 1 + Math.max(leftHeight, rightHeight);
  }

  // Orijinal diziyi döndürme
  getArray() {
    return [...this.originalArray];
  }

  // Tree istatistiklerini döndürme
  getStatistics() {
    let nodeCount = 0;
    let leafCount = 0;

    const traverse = (node) => {
      if (!node) return;
      
      nodeCount++;
      if (node.start === node.end) {
        leafCount++;
      }

      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);

    return {
      nodeCount,
      leafCount,
      height: this.getHeight(),
      arraySize: this.originalArray.length
    };
  }

  // Tree'nin geçerli olup olmadığını kontrol etme
  validateTree() {
    if (!this.root) return true;

    const validate = (node) => {
      if (!node) return true;

      // Yaprak düğüm kontrolü
      if (node.start === node.end) {
        const expectedValue = this.originalArray[node.start];
        return node.sum === expectedValue && 
               node.min === expectedValue && 
               node.max === expectedValue;
      }

      // İç düğüm kontrolü
      if (!node.left || !node.right) return false;

      const expectedSum = node.left.sum + node.right.sum;
      const expectedMin = Math.min(node.left.min, node.right.min);
      const expectedMax = Math.max(node.left.max, node.right.max);

      return node.sum === expectedSum &&
             node.min === expectedMin &&
             node.max === expectedMax &&
             validate(node.left) &&
             validate(node.right);
    };

    return validate(this.root);
  }
}

// Kullanım örneği ve test
const array = [1, 3, 5, 7, 9, 11];
const segTree = new SegmentTree(array);

// Aralık sorguları
console.log('Sum [1,3]:', segTree.querySum(1, 3)); // 3 + 5 + 7 = 15
console.log('Min [1,3]:', segTree.queryMin(1, 3)); // min(3, 5, 7) = 3
console.log('Max [1,3]:', segTree.queryMax(1, 3)); // max(3, 5, 7) = 7

// Nokta güncelleme
segTree.updatePoint(2, 10); // index 2'deki değeri 10 yap
console.log('Sum [1,3] after update:', segTree.querySum(1, 3)); // 3 + 10 + 7 = 20

// Tree istatistikleri
console.log('Tree statistics:', segTree.getStatistics());
console.log('Tree is valid:', segTree.validateTree());`;

  const segmentTreeQueryDemo = (input: string | number): string => {
    const parts: string[] = input.toString().split(',');

    if (parts.length !== 3) {
      return 'Lütfen "dizi,başlangıç,bitiş" formatında girin (örn: 1,3,5,7,9,2,4)';
    }

    try {
      const arrayStr: string = parts[0].trim();
      const start: number = parseInt(parts[1].trim());
      const end: number = parseInt(parts[2].trim());

      const array: number[] = arrayStr
        .split(' ')
        .map((x: string) => parseInt(x.trim()))
        .filter((x: number) => !isNaN(x));

      if (array.length === 0) {
        return 'Geçerli bir sayı dizisi girin';
      }

      if (start < 0 || end >= array.length || start > end) {
        return `Geçersiz aralık. 0 ile ${array.length - 1} arasında olmalı`;
      }

      const segTree: SegmentTreeInterface =
        new (require('@/lib/algorithms/data-structures').SegmentTree)(array);

      const result: QueryResult = {
        array: array,
        queryRange: `[${start}, ${end}]`,
        sum: segTree.querySum(start, end),
        min: segTree.queryMin(start, end),
        max: segTree.queryMax(start, end),
        treeStats: segTree.getStatistics ? segTree.getStatistics() : null,
      };

      return JSON.stringify(result, null, 2);
    } catch (error) {
      return 'Hata: Geçerli format kullanın (örn: 1 3 5 7 9,0,2)';
    }
  };

  const pointUpdateDemo = (input: string | number): string => {
    const parts: string[] = input.toString().split(',');

    if (parts.length !== 3) {
      return 'Lütfen "dizi,index,yeniDeğer" formatında girin';
    }

    try {
      const arrayStr: string = parts[0].trim();
      const index: number = parseInt(parts[1].trim());
      const newValue: number = parseInt(parts[2].trim());

      const parseArrayString = (arrayStr: string): ParseArrayStringResult => {
        const array: number[] = arrayStr
          .split(' ')
          .map((x: string) => parseInt(x.trim()))
          .filter((x: number) => !isNaN(x));

        return { array };
      };

      const { array }: ParseArrayStringResult = parseArrayString(arrayStr);

      if (array.length === 0) {
        return 'Geçerli bir sayı dizisi girin';
      }

      if (index < 0 || index >= array.length) {
        return `Geçersiz index. 0 ile ${array.length - 1} arasında olmalı`;
      }

      const segTree: SegmentTreeWithArray =
        new (require('@/lib/algorithms/data-structures').SegmentTree)(array);
      const oldValue: number = array[index];

      // Güncelleme öncesi değerler
      const beforeUpdate: TreeStats = {
        sum: segTree.querySum(0, array.length - 1),
        min: segTree.queryMin(0, array.length - 1),
        max: segTree.queryMax(0, array.length - 1),
      };

      // Güncelleme yap
      segTree.updatePoint(index, newValue);

      // Güncelleme sonrası değerler
      const afterUpdate: TreeStats = {
        sum: segTree.querySum(0, array.length - 1),
        min: segTree.queryMin(0, array.length - 1),
        max: segTree.queryMax(0, array.length - 1),
      };

      const result: PointUpdateResult = {
        originalArray: array,
        updatedIndex: index,
        oldValue: oldValue,
        newValue: newValue,
        beforeUpdate,
        afterUpdate,
        updatedArray: segTree.getArray ? segTree.getArray() : array,
      };

      return JSON.stringify(result, null, 2);
    } catch (error) {
      return 'Hata: Geçerli format kullanın (örn: 1 3 5 7 9,2,10)';
    }
  };

  return (
    <div className="space-y-8">
      {/* Algoritma açıklaması ve teorik bilgiler */}
      <AlgorithmExplanation {...algorithmData} />

      {/* İnteraktif Segment Tree görselleştirici */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          İnteraktif Segment Tree Görselleştirme
        </h2>
        <p className="text-muted-foreground">
          Aşağıdaki görselleştirici ile Segment Tree veri yapısını
          keşfedebilirsiniz. Dizi elemanlarını değiştirin, aralık sorguları
          yapın ve tree'nin nasıl güncellendiğini gözlemleyin.
        </p>
        <TreeVisualizer
          treeType="segment"
          initialData={[1, 3, 5, 7, 9, 11]}
          showControls={true}
        />
      </div>

      {/* İnteraktif demolar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InteractiveDemo
          title="Aralık Sorgusu Demo"
          description="Dizi, başlangıç indeks ve bitiş indeks girerek aralık sorgusu yapın"
          algorithmFunction={segmentTreeQueryDemo}
          inputPlaceholder="1 3 5 7 9,1,3"
          inputType="text"
        />

        <InteractiveDemo
          title="Nokta Güncelleme Demo"
          description="Belirli bir indeksteki değeri güncelleyin"
          algorithmFunction={pointUpdateDemo}
          inputPlaceholder="1 3 5 7 9,2,10"
          inputType="text"
        />
      </div>

      {/* Kod implementasyonu */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">JavaScript Implementasyonu</h2>
        <p className="text-muted-foreground">
          Segment Tree veri yapısının tam JavaScript implementasyonu. Aralık
          sorguları, nokta güncellemeleri ve tree validasyonu özellikleri
          içerir.
        </p>
        <CodeBlock
          code={segmentTreeImplementation}
          language="javascript"
          showLineNumbers={true}
          title="Segment Tree - Tam Implementasyon"
        />
      </div>

      {/* Karmaşıklık analizi */}
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          Zaman ve Alan Karmaşıklığı Analizi
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-blue-600 mb-3">
              Zaman Karmaşıklığı
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Build Operation:</strong> O(n) - linear time
              </div>
              <div>
                <strong>Range Query:</strong> O(log n) - logarithmic
              </div>
              <div>
                <strong>Point Update:</strong> O(log n) - logarithmic
              </div>
              <div>
                <strong>Range Update:</strong> O(log n) with lazy propagation
              </div>
              <div>
                <strong>Space Usage:</strong> O(n) - linear space
              </div>
            </div>
          </div>
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-green-600 mb-3">Karşılaştırma</h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Naive Approach:</strong> O(n) query, O(1) update
              </div>
              <div>
                <strong>Prefix Sum:</strong> O(1) query, O(n) update
              </div>
              <div>
                <strong>Segment Tree:</strong> O(log n) query ve update
              </div>
              <div>
                <strong>Square Root Decomposition:</strong> O(√n) both
              </div>
              <div>
                <strong>Fenwick Tree:</strong> O(log n) - daha az memory
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lazy propagation açıklaması */}
      <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          Lazy Propagation Optimizasyonu
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Lazy propagation, aralık güncellemelerini etkili hale getiren bir
            tekniktir. Güncellemeyi hemen yapmak yerine, gerekli olana kadar
            erteler.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Normal Range Update
              </h4>
              <div className="text-sm space-y-1">
                <div>Zaman Karmaşıklığı: O(n log n)</div>
                <div>Her güncelleme derhal yapılır</div>
                <div>Çok sayıda gereksiz işlem</div>
                <div>Basit implementasyon</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Lazy Propagation
              </h4>
              <div className="text-sm space-y-1">
                <div>Zaman Karmaşıklığı: O(log n)</div>
                <div>Güncelleme gerektiğinde yapılır</div>
                <div>Minimum işlem sayısı</div>
                <div>Karmaşık implementasyon</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variant'lar ve uzantılar */}
      <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-200">
          Segment Tree Variants ve Uzantılar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              2D Segment Tree
            </h4>
            <p className="text-sm">
              İki boyutlu aralık sorguları için kullanılır. Matrix üzerinde
              rectangle sum, min veya max sorguları yapabilir.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Persistent Segment Tree
            </h4>
            <p className="text-sm">
              Historical queries destekler. Geçmiş versiyonlara erişim sağlar ve
              versiyonlanmış range queries yapar.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Dynamic Segment Tree
            </h4>
            <p className="text-sm">
              Koordinat compression ile çok büyük aralıkları handle eder. Sparse
              data için memory efficient.
            </p>
          </div>
        </div>
      </div>

      {/* Gerçek dünya uygulamaları */}
      <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-200">
          Gerçek Dünya Uygulamaları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Software Development
            </h4>
            <div className="text-sm space-y-1">
              <div>
                <strong>Database Indexing:</strong> B+ tree range queries
              </div>
              <div>
                <strong>Text Editors:</strong> Line-based operations
              </div>
              <div>
                <strong>Graphics Programming:</strong> Spatial queries
              </div>
              <div>
                <strong>Game Development:</strong> Collision detection
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Data Analysis
            </h4>
            <div className="text-sm space-y-1">
              <div>
                <strong>Time Series:</strong> Moving window statistics
              </div>
              <div>
                <strong>Financial Data:</strong> OHLC candlestick queries
              </div>
              <div>
                <strong>Sensor Networks:</strong> Range monitoring
              </div>
              <div>
                <strong>Log Analysis:</strong> Time range aggregations
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pratik uygulama ipuçları */}
      <div className="bg-yellow-50 dark:bg-yellow-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-yellow-800 dark:text-yellow-200">
          Implementation ve Optimizasyon İpuçları
        </h3>
        <div className="space-y-3 text-sm">
          <div>
            <strong className="text-yellow-700 dark:text-yellow-300">
              Memory Layout:
            </strong>
            <span className="ml-2">
              Array-based implementation cache performance'ını artırabilir.
            </span>
          </div>
          <div>
            <strong className="text-yellow-700 dark:text-yellow-300">
              Build Optimization:
            </strong>
            <span className="ml-2">
              Bottom-up build yaklaşımı recursive call overhead'ını azaltır.
            </span>
          </div>
          <div>
            <strong className="text-yellow-700 dark:text-yellow-300">
              Query Optimization:
            </strong>
            <span className="ml-2">
              Tam kapsama durumunda erken return ile performance artırılır.
            </span>
          </div>
          <div>
            <strong className="text-yellow-700 dark:text-yellow-300">
              Lazy Propagation:
            </strong>
            <span className="ml-2">
              Frequent range updates varsa mutlaka lazy propagation
              implementasyonu yapın.
            </span>
          </div>
          <div>
            <strong className="text-yellow-700 dark:text-yellow-300">
              Alternative:
            </strong>
            <span className="ml-2">
              Sadece sum queries varsa Fenwick Tree daha memory efficient
              olabilir.
            </span>
          </div>
        </div>
      </div>

      {/* Advanced Segment Tree Features */}
      <div className="bg-indigo-50 dark:bg-indigo-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-indigo-800 dark:text-indigo-200">
          İleri Seviye Segment Tree Özellikleri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">
              Lazy Propagation ile Range Update
            </h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded text-sm">
              <pre className="overflow-x-auto">
                {`// Lazy propagation örneği
class LazySegmentTree {
  updateRange(start, end, delta) {
    this.updateRangeLazy(this.root, start, end, delta);
  }
  
  updateRangeLazy(node, start, end, delta) {
    // Lazy value'yu push down et
    if (node.hasLazyValue) {
      node.sum += node.lazyValue * (node.end - node.start + 1);
      if (node.left) {
        node.left.lazyValue += node.lazyValue;
        node.left.hasLazyValue = true;
      }
      if (node.right) {
        node.right.lazyValue += node.lazyValue;
        node.right.hasLazyValue = true;
      }
      node.lazyValue = 0;
      node.hasLazyValue = false;
    }
    
    // Range update logic
    if (start <= node.start && end >= node.end) {
      node.lazyValue += delta;
      node.hasLazyValue = true;
      return;
    }
    
    // Partial overlap case
    const mid = Math.floor((node.start + node.end) / 2);
    if (start <= mid) {
      this.updateRangeLazy(node.left, start, end, delta);
    }
    if (end > mid) {
      this.updateRangeLazy(node.right, start, end, delta);
    }
  }
}`}
              </pre>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-indigo-700 dark:text-indigo-300">
              2D Segment Tree Örneği
            </h4>
            <div className="bg-white dark:bg-gray-800 p-4 rounded text-sm">
              <pre className="overflow-x-auto">
                {`// 2D Segment Tree temel yapısı
class SegmentTree2D {
  constructor(matrix) {
    this.rows = matrix.length;
    this.cols = matrix[0].length;
    this.tree = this.build2D(matrix);
  }
  
  // 2D aralık sorgusu
  queryRect(x1, y1, x2, y2) {
    return this.queryRows(0, 0, this.rows - 1, x1, x2, y1, y2);
  }
  
  queryRows(node, start, end, x1, x2, y1, y2) {
    if (x1 > end || x2 < start) return 0;
    
    if (x1 <= start && end <= x2) {
      return this.queryCols(this.tree[node], 0, this.cols - 1, y1, y2);
    }
    
    const mid = Math.floor((start + end) / 2);
    return this.queryRows(2*node+1, start, mid, x1, x2, y1, y2) +
           this.queryRows(2*node+2, mid+1, end, x1, x2, y1, y2);
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Competitive Programming Tips */}
      <div className="bg-red-50 dark:bg-red-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-red-800 dark:text-red-200">
          Competitive Programming İpuçları
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
              Hızlı Template
            </h4>
            <div className="text-sm space-y-1">
              <div>• Array-based implementation kullanın (4*n boyut)</div>
              <div>
                • 1-indexed arrays tercih edin (implementation kolaylığı)
              </div>
              <div>• Recursive yerine iterative yaklaşım kullanın</div>
              <div>• Macro'lar ile kod uzunluğunu azaltın</div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">
              Debug Teknikleri
            </h4>
            <div className="text-sm space-y-1">
              <div>• Tree'yi print eden fonksiyon yazın</div>
              <div>• Küçük test case'lerle doğrulayın</div>
              <div>• Edge case'leri (tek eleman, boş dizi) test edin</div>
              <div>• Lazy propagation'da push fonksiyonunu unutmayın</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Benchmarks */}
      <div className="bg-gray-50 dark:bg-gray-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Performans Karşılaştırması ve Benchmarks
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 bg-gray-100 dark:bg-gray-800">
                  Algoritma
                </th>
                <th className="text-left p-3 bg-gray-100 dark:bg-gray-800">
                  Build
                </th>
                <th className="text-left p-3 bg-gray-100 dark:bg-gray-800">
                  Range Query
                </th>
                <th className="text-left p-3 bg-gray-100 dark:bg-gray-800">
                  Point Update
                </th>
                <th className="text-left p-3 bg-gray-100 dark:bg-gray-800">
                  Range Update
                </th>
                <th className="text-left p-3 bg-gray-100 dark:bg-gray-800">
                  Space
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">Naive Array</td>
                <td className="p-3">O(1)</td>
                <td className="p-3 text-red-600">O(n)</td>
                <td className="p-3 text-green-600">O(1)</td>
                <td className="p-3 text-red-600">O(n)</td>
                <td className="p-3 text-green-600">O(n)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Prefix Sum</td>
                <td className="p-3">O(n)</td>
                <td className="p-3 text-green-600">O(1)</td>
                <td className="p-3 text-red-600">O(n)</td>
                <td className="p-3 text-red-600">O(n)</td>
                <td className="p-3 text-green-600">O(n)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Segment Tree</td>
                <td className="p-3">O(n)</td>
                <td className="p-3 text-blue-600">O(log n)</td>
                <td className="p-3 text-blue-600">O(log n)</td>
                <td className="p-3 text-blue-600">O(log n)</td>
                <td className="p-3 text-yellow-600">O(4n)</td>
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">Fenwick Tree</td>
                <td className="p-3">O(n)</td>
                <td className="p-3 text-blue-600">O(log n)</td>
                <td className="p-3 text-blue-600">O(log n)</td>
                <td className="p-3 text-red-600">O(n log n)</td>
                <td className="p-3 text-green-600">O(n)</td>
              </tr>
              <tr>
                <td className="p-3 font-medium">√n Decomposition</td>
                <td className="p-3">O(n)</td>
                <td className="p-3 text-yellow-600">O(√n)</td>
                <td className="p-3 text-yellow-600">O(√n)</td>
                <td className="p-3 text-yellow-600">O(√n)</td>
                <td className="p-3 text-green-600">O(n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Common Pitfalls and Solutions */}
      <div className="bg-orange-50 dark:bg-orange-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-orange-800 dark:text-orange-200">
          Yaygın Hatalar ve Çözümleri
        </h3>
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              ❌ Yanlış Array Boyutu
            </h4>
            <p className="text-sm mb-2">
              Segment tree için 4*n boyutunda array kullanmamak overflow'a neden
              olur.
            </p>
            <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <code>// Yanlış: tree = new Array(2*n)</code>
              <br />
              <code>// Doğru: tree = new Array(4*n)</code>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              ❌ Lazy Propagation Unutmak
            </h4>
            <p className="text-sm mb-2">
              Range update sonrası query yapmadan önce push fonksiyonunu
              çağırmamak.
            </p>
            <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <code>// Her query/update başında push() çağırmalı</code>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">
              ❌ Edge Case Kontrolsüzlüğü
            </h4>
            <p className="text-sm mb-2">
              Boş aralık sorguları ve geçersiz indeksler için kontrol yapmamak.
            </p>
            <div className="text-xs bg-gray-100 dark:bg-gray-700 p-2 rounded">
              <code>{`if (queryStart > queryEnd || queryEnd < nodeStart) return neutral;`}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
