'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { MSTVisualizer } from '@/components/common/mst-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function KruskalPage() {
  const pseudocode = `function kruskal(graph):
    mst = empty set
    edges = sort all edges by weight in ascending order
    unionFind = initialize union-find structure for all vertices
    
    for each edge (u, v) in edges:
        if find(unionFind, u) != find(unionFind, v):
            // Adding this edge won't create a cycle
            add edge (u, v) to mst
            union(unionFind, u, v)
            
            if mst has (V-1) edges:
                break  // MST is complete
    
    return mst`;

  const implementations = {
    typescript: `interface Edge {
  from: string;
  to: string;
  weight: number;
}

interface UnionFind {
  parent: Map<string, string>;
  rank: Map<string, number>;
}

// Kruskal's algorithm for Minimum Spanning Tree
function kruskal(graph: Graph): {
  mstEdges: Edge[];
  totalWeight: number;
  steps: { edge: Edge; action: 'add' | 'reject'; reason: string }[];
} {
  const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  const mstEdges: Edge[] = [];
  const steps: { edge: Edge; action: 'add' | 'reject'; reason: string }[] = [];
  const unionFind = createUnionFind(Array.from(graph.nodes.keys()));
  let totalWeight = 0;

  // Process edges in order of increasing weight
  for (const edge of sortedEdges) {
    const rootFrom = find(unionFind, edge.from);
    const rootTo = find(unionFind, edge.to);

    // Check if adding this edge would create a cycle
    if (rootFrom !== rootTo) {
      union(unionFind, edge.from, edge.to);
      mstEdges.push(edge);
      totalWeight += edge.weight;
      steps.push({ 
        edge, 
        action: 'add', 
        reason: \`Added edge (\${edge.from} -> \${edge.to}) with weight \${edge.weight}\` 
      });
      
      // Stop when we have n-1 edges for n nodes
      if (mstEdges.length === graph.nodes.size - 1) {
        break;
      }
    } else {
      steps.push({ 
        edge, 
        action: 'reject', 
        reason: \`Rejected edge (\${edge.from} -> \${edge.to}) - would create cycle\` 
      });
    }
  }

  return { mstEdges, totalWeight, steps };
}

// Union-Find data structure implementation
function createUnionFind(nodes: string[]): UnionFind {
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();

  // Initialize each node as its own parent with rank 0
  nodes.forEach(node => {
    parent.set(node, node);
    rank.set(node, 0);
  });

  return { parent, rank };
}

// Find operation with path compression
function find(unionFind: UnionFind, node: string): string {
  if (unionFind.parent.get(node) !== node) {
    // Path compression optimization
    unionFind.parent.set(node, find(unionFind, unionFind.parent.get(node)!));
  }
  return unionFind.parent.get(node)!;
}

// Union operation by rank
function union(unionFind: UnionFind, node1: string, node2: string): void {
  const root1 = find(unionFind, node1);
  const root2 = find(unionFind, node2);

  if (root1 === root2) return;

  const rank1 = unionFind.rank.get(root1)!;
  const rank2 = unionFind.rank.get(root2)!;

  // Union by rank optimization
  if (rank1 < rank2) {
    unionFind.parent.set(root1, root2);
  } else if (rank1 > rank2) {
    unionFind.parent.set(root2, root1);
  } else {
    unionFind.parent.set(root2, root1);
    unionFind.rank.set(root1, rank1 + 1);
  }
}

// Usage example
const graph = createExampleGraph();
const result = kruskal(graph);
console.log('MST edges:', result.mstEdges);
console.log('Total weight:', result.totalWeight);`,
    python: `from typing import List, Dict, Tuple, Set
import heapq

class Edge:
    def __init__(self, from_vertex: str, to_vertex: str, weight: float):
        self.from_vertex = from_vertex
        self.to_vertex = to_vertex
        self.weight = weight
    
    def __lt__(self, other):
        return self.weight < other.weight
    
    def __repr__(self):
        return f"Edge({self.from_vertex} -> {self.to_vertex}, weight: {self.weight})"

class UnionFind:
    def __init__(self, vertices: List[str]):
        self.parent = {vertex: vertex for vertex in vertices}
        self.rank = {vertex: 0 for vertex in vertices}
    
    def find(self, vertex: str) -> str:
        """Find operation with path compression"""
        if self.parent[vertex] != vertex:
            # Path compression optimization
            self.parent[vertex] = self.find(self.parent[vertex])
        return self.parent[vertex]
    
    def union(self, vertex1: str, vertex2: str) -> bool:
        """Union operation by rank"""
        root1 = self.find(vertex1)
        root2 = self.find(vertex2)
        
        if root1 == root2:
            return False  # Already in same set
        
        # Union by rank optimization
        if self.rank[root1] < self.rank[root2]:
            self.parent[root1] = root2
        elif self.rank[root1] > self.rank[root2]:
            self.parent[root2] = root1
        else:
            self.parent[root2] = root1
            self.rank[root1] += 1
        
        return True

class KruskalMST:
    def __init__(self, vertices: List[str]):
        self.vertices = vertices
        self.edges: List[Edge] = []
    
    def add_edge(self, from_vertex: str, to_vertex: str, weight: float):
        """Add an edge to the graph"""
        self.edges.append(Edge(from_vertex, to_vertex, weight))
    
    def find_mst(self) -> Tuple[List[Edge], float, List[Dict]]:
        """
        Find Minimum Spanning Tree using Kruskal's algorithm
        
        Returns:
            Tuple of (mst_edges, total_weight, algorithm_steps)
        """
        if not self.vertices:
            return [], 0.0, []
        
        # Sort edges by weight
        sorted_edges = sorted(self.edges)
        union_find = UnionFind(self.vertices)
        
        mst_edges: List[Edge] = []
        total_weight = 0.0
        steps = []
        
        for edge in sorted_edges:
            # Check if adding this edge creates a cycle
            if union_find.find(edge.from_vertex) != union_find.find(edge.to_vertex):
                # Add edge to MST
                union_find.union(edge.from_vertex, edge.to_vertex)
                mst_edges.append(edge)
                total_weight += edge.weight
                
                steps.append({
                    'edge': edge,
                    'action': 'add',
                    'reason': f'Added edge ({edge.from_vertex} -> {edge.to_vertex}) with weight {edge.weight}'
                })
                
                # MST is complete when we have (V-1) edges
                if len(mst_edges) == len(self.vertices) - 1:
                    break
            else:
                steps.append({
                    'edge': edge,
                    'action': 'reject',
                    'reason': f'Rejected edge ({edge.from_vertex} -> {edge.to_vertex}) - would create cycle'
                })
        
        return mst_edges, total_weight, steps
    
    def print_mst(self):
        """Print the Minimum Spanning Tree"""
        mst_edges, total_weight, steps = self.find_mst()
        
        print("Minimum Spanning Tree (Kruskal's Algorithm):")
        print("-" * 50)
        
        for i, edge in enumerate(mst_edges, 1):
            print(f"{i}. {edge.from_vertex} -- {edge.to_vertex} (weight: {edge.weight})")
        
        print(f"\\nTotal weight: {total_weight}")
        print(f"Number of edges: {len(mst_edges)}")
        
        return mst_edges, total_weight

# Usage example
def main():
    # Create a graph with vertices
    vertices = ['A', 'B', 'C', 'D', 'E', 'F']
    kruskal_mst = KruskalMST(vertices)
    
    # Add edges (from, to, weight)
    edges_data = [
        ('A', 'B', 4), ('A', 'F', 2),
        ('B', 'C', 6), ('B', 'F', 5),
        ('C', 'D', 3), ('C', 'F', 1),
        ('D', 'E', 2), ('D', 'F', 4),
        ('E', 'F', 4)
    ]
    
    for from_v, to_v, weight in edges_data:
        kruskal_mst.add_edge(from_v, to_v, weight)
    
    # Find and print MST
    mst_edges, total_weight = kruskal_mst.print_mst()
    
    # Print algorithm steps
    _, _, steps = kruskal_mst.find_mst()
    print("\\nAlgorithm Steps:")
    for i, step in enumerate(steps, 1):
        print(f"{i}. {step['reason']}")

if __name__ == "__main__":
    main()`,
    java: `import java.util.*;

class Edge implements Comparable<Edge> {
    String from, to;
    int weight;
    
    public Edge(String from, String to, int weight) {
        this.from = from;
        this.to = to;
        this.weight = weight;
    }
    
    @Override
    public int compareTo(Edge other) {
        return Integer.compare(this.weight, other.weight);
    }
    
    @Override
    public String toString() {
        return String.format("Edge(%s -> %s, weight: %d)", from, to, weight);
    }
}

class UnionFind {
    private Map<String, String> parent;
    private Map<String, Integer> rank;
    
    public UnionFind(Set<String> vertices) {
        parent = new HashMap<>();
        rank = new HashMap<>();
        
        for (String vertex : vertices) {
            parent.put(vertex, vertex);
            rank.put(vertex, 0);
        }
    }
    
    public String find(String vertex) {
        if (!parent.get(vertex).equals(vertex)) {
            // Path compression optimization
            parent.put(vertex, find(parent.get(vertex)));
        }
        return parent.get(vertex);
    }
    
    public boolean union(String vertex1, String vertex2) {
        String root1 = find(vertex1);
        String root2 = find(vertex2);
        
        if (root1.equals(root2)) {
            return false; // Already in same set
        }
        
        // Union by rank optimization
        int rank1 = rank.get(root1);
        int rank2 = rank.get(root2);
        
        if (rank1 < rank2) {
            parent.put(root1, root2);
        } else if (rank1 > rank2) {
            parent.put(root2, root1);
        } else {
            parent.put(root2, root1);
            rank.put(root1, rank1 + 1);
        }
        
        return true;
    }
}

class KruskalResult {
    List<Edge> mstEdges;
    int totalWeight;
    List<String> steps;
    
    public KruskalResult(List<Edge> mstEdges, int totalWeight, List<String> steps) {
        this.mstEdges = mstEdges;
        this.totalWeight = totalWeight;
        this.steps = steps;
    }
}

public class KruskalMST {
    private Set<String> vertices;
    private List<Edge> edges;
    
    public KruskalMST() {
        vertices = new HashSet<>();
        edges = new ArrayList<>();
    }
    
    public void addVertex(String vertex) {
        vertices.add(vertex);
    }
    
    public void addEdge(String from, String to, int weight) {
        vertices.add(from);
        vertices.add(to);
        edges.add(new Edge(from, to, weight));
    }
    
    public KruskalResult findMST() {
        if (vertices.isEmpty()) {
            return new KruskalResult(new ArrayList<>(), 0, new ArrayList<>());
        }
        
        // Sort edges by weight
        Collections.sort(edges);
        
        UnionFind unionFind = new UnionFind(vertices);
        List<Edge> mstEdges = new ArrayList<>();
        List<String> steps = new ArrayList<>();
        int totalWeight = 0;
        
        for (Edge edge : edges) {
            // Check if adding this edge creates a cycle
            if (!unionFind.find(edge.from).equals(unionFind.find(edge.to))) {
                // Add edge to MST
                unionFind.union(edge.from, edge.to);
                mstEdges.add(edge);
                totalWeight += edge.weight;
                
                steps.add(String.format("Added edge (%s -> %s) with weight %d", 
                    edge.from, edge.to, edge.weight));
                
                // MST is complete when we have (V-1) edges
                if (mstEdges.size() == vertices.size() - 1) {
                    break;
                }
            } else {
                steps.add(String.format("Rejected edge (%s -> %s) - would create cycle", 
                    edge.from, edge.to));
            }
        }
        
        return new KruskalResult(mstEdges, totalWeight, steps);
    }
    
    public void printMST() {
        KruskalResult result = findMST();
        
        System.out.println("Minimum Spanning Tree (Kruskal's Algorithm):");
        System.out.println("-".repeat(50));
        
        for (int i = 0; i < result.mstEdges.size(); i++) {
            Edge edge = result.mstEdges.get(i);
            System.out.printf("%d. %s -- %s (weight: %d)%n", 
                i + 1, edge.from, edge.to, edge.weight);
        }
        
        System.out.printf("%nTotal weight: %d%n", result.totalWeight);
        System.out.printf("Number of edges: %d%n", result.mstEdges.size());
        
        System.out.println("\\nAlgorithm Steps:");
        for (int i = 0; i < result.steps.size(); i++) {
            System.out.printf("%d. %s%n", i + 1, result.steps.get(i));
        }
    }
    
    public static void main(String[] args) {
        KruskalMST kruskal = new KruskalMST();
        
        // Add edges to create a sample graph
        int[][] edgesData = {
            {'A', 'B', 4}, {'A', 'F', 2},
            {'B', 'C', 6}, {'B', 'F', 5},
            {'C', 'D', 3}, {'C', 'F', 1},
            {'D', 'E', 2}, {'D', 'F', 4},
            {'E', 'F', 4}
        };
        
        for (int[] edgeData : edgesData) {
            kruskal.addEdge(
                String.valueOf((char) edgeData[0]), 
                String.valueOf((char) edgeData[1]), 
                edgeData[2]
            );
        }
        
        kruskal.printMST();
    }
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Kruskal's Algorithm (Kruskal Algoritması)"
        description="Kruskal algoritması, ağırlıklı bağlı bir grafta Minimum Spanning Tree (Minimum Yayılma Ağacı) bulan açgözlü bir algoritmadır. Joseph Kruskal tarafından 1956'da geliştirilmiş olup, kenar tabanlı bir yaklaşım kullanır ve Union-Find veri yapısından yararlanır."
        timeComplexity={{
          best: 'O(E log E)',
          average: 'O(E log E)',
          worst: 'O(E log E)',
        }}
        spaceComplexity="O(V)"
        advantages={[
          'Sparse (seyrek) graflar için verimlidir',
          'Kenar tabanlı yaklaşımı anlaşılması kolaydır',
          'Union-Find optimizasyonları ile hızlı çalışır',
          'Tüm kenarları aynı anda işleyebilir',
          'Paralel işleme uygun bir yapıya sahiptir',
          'Deterministik sonuçlar verir',
        ]}
        disadvantages={[
          'Kenarları sıralama işlemi O(E log E) zaman alır',
          'Dense (yoğun) graflar için Prim algoritmasından yavaş olabilir',
          'Union-Find veri yapısı ek karmaşıklık getirir',
          'Başlangıç düğümü seçimi yapılamaz',
          'Büyük edge sayısına sahip graflarda bellek sorunu yaşanabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ tasarımı ve kablo döşeme optimizasyonu',
          'Telefon hatları ve internet altyapısı planlaması',
          'Şehir planlama ve yol ağları tasarımı',
          'Kümeleme algoritmaları (clustering)',
          'Image segmentation (görüntü bölütleme)',
          'Circuit design ve PCB tasarımı',
          'Social network analysis',
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Görselleştirme</h2>
        <MSTVisualizer algorithm="kruskal" />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
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
              title="Kruskal's Algorithm - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Kruskal's Algorithm - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Kruskal's Algorithm - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Kruskal algoritması, Minimum Spanning Tree problemini kenar tabanlı
            açgözlü yaklaşımla çözer. Algoritmanın temel prensibi, her adımda
            mevcut durumda en iyi görünen seçimi yapmaktır. Bu yaklaşım, MST
            probleminin optimal alt yapı özelliğine sahip olması nedeniyle
            global optimum sonucu garanti eder.
          </p>

          <h3>1. Kenar Sıralama Aşaması</h3>
          <p>
            Algoritma, grafın tüm kenarlarını ağırlıklarına göre artan sırada
            düzenleyerek başlar. Bu sıralama işlemi, algoritmanın toplam zaman
            karmaşıklığını belirleyen ana faktördür ve O(E log E) zaman
            gerektirir. Efficient sorting algoritmaları kullanılarak bu işlem
            optimize edilebilir.
          </p>

          <h3>2. Union-Find Veri Yapısının Başlatılması</h3>
          <p>
            Her düğüm başlangıçta kendi kümesinin temsilcisi olarak ayarlanır.
            Union-Find veri yapısı, iki temel optimizasyon ile geliştirilmiştir:
            path compression ve union by rank. Bu optimizasyonlar, find ve union
            işlemlerini neredeyse sabit zamanda (amortized α(n))
            gerçekleştirmeyi mümkün kılar.
          </p>

          <h3>3. Kenar İşleme Döngüsü</h3>
          <p>
            Sıralanmış kenar listesi üzerinde iterasyon yapılır. Her kenar için,
            o kenarın iki uç düğümünün aynı bağlı bileşende olup olmadığı
            kontrol edilir. Eğer farklı bileşenlerdeyse, kenar MST'ye eklenir ve
            iki bileşen birleştirilir. Bu işlem, çevrim oluşmasını önler ve
            MST'nin temel özelliğini korur.
          </p>

          <h3>4. Sonlandırma Koşulu</h3>
          <p>
            Algoritma, MST'de (V-1) kenar bulunduğunda sonlanır; burada V graf
            düğümlerinin sayısıdır. Bu, bağlı bir grafın spanning tree'sinin
            sahip olabileceği minimum kenar sayısıdır. Erken sonlandırma,
            algoritmanın verimliliğini artırır ve gereksiz kenar kontrollerini
            önler.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Union-Find Veri Yapısı</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Kruskal algoritmasının verimli çalışması, Union-Find (Disjoint Set)
            veri yapısının etkili implementasyonuna bağlıdır. Bu veri yapısı,
            dinamik bağlantılılık sorgularını destekler ve iki temel işlem
            sunar.
          </p>

          <h3>Find İşlemi</h3>
          <p>
            Find işlemi, bir elemanın hangi kümeye ait olduğunu belirler. Path
            compression optimizasyonu ile, find işlemi sırasında geçilen tüm
            düğümler doğrudan kök düğüme bağlanır. Bu optimizasyon, gelecekteki
            find işlemlerini hızlandırır ve veri yapısının genel performansını
            önemli ölçüde artırır.
          </p>

          <h3>Union İşlemi</h3>
          <p>
            Union işlemi, iki farklı kümeyi birleştirir. Union by rank
            optimizasyonu ile, daha düşük rank'e sahip ağaç, daha yüksek rank'e
            sahip ağacın altına bağlanır. Bu yaklaşım, ağaç yapısının dengeli
            kalmasını sağlar ve find işlemlerinin worst-case zaman
            karmaşıklığını minimize eder.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Prim Algoritması ile Karşılaştırma
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-muted">
                <th className="border border-gray-300 p-3 text-left">Kriter</th>
                <th className="border border-gray-300 p-3 text-left">
                  Kruskal
                </th>
                <th className="border border-gray-300 p-3 text-left">Prim</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Yaklaşım
                </td>
                <td className="border border-gray-300 p-3">Kenar tabanlı</td>
                <td className="border border-gray-300 p-3">Düğüm tabanlı</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Zaman Karmaşıklığı
                </td>
                <td className="border border-gray-300 p-3">O(E log E)</td>
                <td className="border border-gray-300 p-3">O(E log V)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Veri Yapısı
                </td>
                <td className="border border-gray-300 p-3">Union-Find</td>
                <td className="border border-gray-300 p-3">Priority Queue</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Sparse Graflarda
                </td>
                <td className="border border-gray-300 p-3">Daha Verimli</td>
                <td className="border border-gray-300 p-3">Daha Az Verimli</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Dense Graflarda
                </td>
                <td className="border border-gray-300 p-3">Daha Az Verimli</td>
                <td className="border border-gray-300 p-3">Daha Verimli</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Paralel İşleme
                </td>
                <td className="border border-gray-300 p-3">Daha Uygun</td>
                <td className="border border-gray-300 p-3">Daha Zor</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Performans Analizi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Zaman Karmaşıklığı Detayı
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Sıralama:</strong> O(E log E) - Dominant factor
              </p>
              <p>
                <strong>Union-Find işlemleri:</strong> O(E α(V)) - Neredeyse
                lineer
              </p>
              <p>
                <strong>Toplam:</strong> O(E log E + E α(V)) = O(E log E)
              </p>
              <p className="mt-2">
                α(V) inverse Ackermann function'dur ve pratikte 5'ten küçük bir
                sabittir, bu nedenle Union-Find işlemleri neredeyse sabit zaman
                alır.
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Alan Karmaşıklığı Detayı
            </h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>Union-Find yapısı:</strong> O(V) - Parent ve rank
                dizileri
              </p>
              <p>
                <strong>MST kenar listesi:</strong> O(V) - En fazla V-1 kenar
              </p>
              <p>
                <strong>Geçici depolama:</strong> O(1) - Sabit alan
              </p>
              <p className="mt-2">
                Algoritma in-place çalışır ve giriş grafından bağımsız olarak
                linear alan kullanır. Bu özellik, büyük graflarda bellek
                verimliliği sağlar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Pratik Uygulama Örnekleri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Ağ Altyapısı Tasarımı
            </h3>
            <p className="text-sm">
              Telekomünikasyon şirketleri, şehirler arası fiber optik kablo
              ağlarını planlarken Kruskal algoritmasını kullanır. Her şehir bir
              düğüm, şehirler arası mesafeler ise kenar ağırlıkları olarak
              modellenir. Bu yaklaşım, minimum maliyetle tüm şehirleri birbirine
              bağlayan en ekonomik kablo döşeme planını oluşturur.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Kümeleme Algoritmaları
            </h3>
            <p className="text-sm">
              Machine learning alanında, Kruskal algoritması hierarchical
              clustering için kullanılır. Veri noktaları arasındaki mesafeler
              kenar ağırlıkları olarak hesaplanır ve MST oluşturulduktan sonra,
              en ağır kenarlar kaldırılarak veri kümelere ayrılır. Bu yöntem,
              özellikle doğal veri gruplarını keşfetmede etkilidir.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">
              Elektronik Devre Tasarımı
            </h3>
            <p className="text-sm">
              PCB (Printed Circuit Board) tasarımında, elektronik bileşenler
              arasındaki minimum bağlantı maliyetini hesaplamak için Kruskal
              algoritması uygulanır. Her bileşen bir düğüm, bağlantı maliyetleri
              ise kenar ağırlıkları olarak tanımlanır. Bu optimizasyon, üretim
              maliyetlerini minimize eder ve devre performansını artırır.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Görüntü İşleme</h3>
            <p className="text-sm">
              Image segmentation uygulamalarında, piksel gruplarını
              benzerliklerine göre ayırmak için Kruskal algoritması kullanılır.
              Her piksel bir düğüm, pikseller arası renk veya texture farkları
              ise kenar ağırlıkları olarak hesaplanır. MST oluşturulduktan
              sonra, yüksek ağırlıklı kenarlar kaldırılarak görüntü anlamlı
              bölgelere ayrılır.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">
          💡 Optimizasyon İpuçları
        </h3>
        <div className="space-y-2 text-sm text-blue-700">
          <p>
            <strong>Kenar Sıralama Optimizasyonu:</strong> Çok büyük graflarda,
            external sorting veya radix sort gibi specialized sorting
            algoritmaları kullanarak sıralama performansını artırabilirsiniz.
          </p>
          <p>
            <strong>Parallel Processing:</strong> Kenar sıralama işlemi
            parallelizable olduğu için, multi-core sistemlerde parallel sorting
            algoritmalarından yararlanarak önemli performans kazanımları elde
            edebilirsiniz.
          </p>
          <p>
            <strong>Memory Management:</strong> Çok büyük graflarda, kenar
            listesini memory'de tutmak yerine, streaming approach kullanarak
            disk tabanlı processing yapabilirsiniz.
          </p>
          <p>
            <strong>Early Termination:</strong> MST'de (V-1) kenar bulunduğunda
            algoritmanın erken sonlandırılması, özellikle dense graflarda önemli
            zaman tasarrufu sağlar.
          </p>
        </div>
      </div>
    </div>
  );
}
