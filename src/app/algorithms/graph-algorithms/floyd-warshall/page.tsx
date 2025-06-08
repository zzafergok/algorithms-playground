'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { MatrixVisualizer } from '@/components/common/matrix-visualizer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function FloydWarshallPage() {
  const pseudocode = `function floydWarshall(graph):
    n = number of vertices
    dist = adjacency matrix (distance[i][j] = weight of edge from i to j)
    next = matrix for path reconstruction
    
    // Initialize distance matrix
    for i = 1 to n:
        for j = 1 to n:
            if i == j:
                dist[i][j] = 0
            else if edge exists from i to j:
                dist[i][j] = weight(i, j)
                next[i][j] = j
            else:
                dist[i][j] = infinity
                next[i][j] = null
    
    // Main algorithm - try all intermediate vertices
    for k = 1 to n:
        for i = 1 to n:
            for j = 1 to n:
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    next[i][j] = next[i][k]
    
    return dist, next`;

  const implementations = {
    typescript: `interface Graph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
}

interface GraphEdge {
  from: string;
  to: string;
  weight: number;
}

// Floyd-Warshall algorithm for all-pairs shortest paths
function floydWarshall(graph: Graph): {
  distances: Map<string, Map<string, number>>;
  next: Map<string, Map<string, string | null>>;
} {
  const nodeIds = Array.from(graph.nodes.keys());
  const distances = new Map<string, Map<string, number>>();
  const next = new Map<string, Map<string, string | null>>();

  // Initialize distance and next matrices
  nodeIds.forEach(i => {
    distances.set(i, new Map<string, number>());
    next.set(i, new Map<string, string | null>());
    
    nodeIds.forEach(j => {
      if (i === j) {
        distances.get(i)!.set(j, 0);
      } else {
        distances.get(i)!.set(j, Infinity);
      }
      next.get(i)!.set(j, null);
    });
  });

  // Set direct edge distances
  graph.edges.forEach(edge => {
    distances.get(edge.from)!.set(edge.to, edge.weight);
    next.get(edge.from)!.set(edge.to, edge.to);
  });

  // Main Floyd-Warshall algorithm
  nodeIds.forEach(k => {
    nodeIds.forEach(i => {
      nodeIds.forEach(j => {
        const currentDistance = distances.get(i)!.get(j)!;
        const newDistance = distances.get(i)!.get(k)! + distances.get(k)!.get(j)!;
        
        if (newDistance < currentDistance) {
          distances.get(i)!.set(j, newDistance);
          next.get(i)!.set(j, next.get(i)!.get(k));
        }
      });
    });
  });

  return { distances, next };
}

// Reconstruct shortest path between two nodes
function reconstructPath(
  next: Map<string, Map<string, string | null>>,
  start: string,
  end: string
): string[] {
  if (next.get(start)!.get(end) === null) {
    return []; // No path exists
  }

  const path: string[] = [start];
  let current = start;

  while (current !== end) {
    current = next.get(current)!.get(end)!;
    path.push(current);
  }

  return path;
}

// Usage example
const graph: Graph = createExampleGraph();
const result = floydWarshall(graph);
const path = reconstructPath(result.next, '0', '3');
console.log('Shortest path from 0 to 3:', path);
console.log('Distance:', result.distances.get('0')!.get('3'));`,
    python: `from typing import Dict, List, Tuple, Optional
import math

class FloydWarshall:
    def __init__(self, num_vertices: int):
        self.num_vertices = num_vertices
        self.distance_matrix = [[math.inf] * num_vertices for _ in range(num_vertices)]
        self.next_matrix = [[None] * num_vertices for _ in range(num_vertices)]
        
        # Initialize diagonal to 0 (distance from vertex to itself)
        for i in range(num_vertices):
            self.distance_matrix[i][i] = 0
    
    def add_edge(self, from_vertex: int, to_vertex: int, weight: float):
        """Add an edge to the graph"""
        self.distance_matrix[from_vertex][to_vertex] = weight
        self.next_matrix[from_vertex][to_vertex] = to_vertex
    
    def run_algorithm(self) -> Tuple[List[List[float]], List[List[Optional[int]]]]:
        """
        Run Floyd-Warshall algorithm to find all-pairs shortest paths
        
        Returns:
            Tuple of (distance_matrix, next_matrix) for path reconstruction
        """
        n = self.num_vertices
        
        # Main Floyd-Warshall algorithm
        for k in range(n):
            for i in range(n):
                for j in range(n):
                    # Check if path through vertex k is shorter
                    if (self.distance_matrix[i][k] + self.distance_matrix[k][j] < 
                        self.distance_matrix[i][j]):
                        
                        self.distance_matrix[i][j] = (
                            self.distance_matrix[i][k] + self.distance_matrix[k][j]
                        )
                        self.next_matrix[i][j] = self.next_matrix[i][k]
        
        return self.distance_matrix, self.next_matrix
    
    def reconstruct_path(self, start: int, end: int) -> List[int]:
        """
        Reconstruct shortest path between two vertices
        
        Args:
            start: Starting vertex
            end: Ending vertex
            
        Returns:
            List of vertices in the shortest path, empty if no path exists
        """
        if self.next_matrix[start][end] is None:
            return []  # No path exists
        
        path = [start]
        current = start
        
        while current != end:
            current = self.next_matrix[current][end]
            if current is None:
                return []  # Path reconstruction failed
            path.append(current)
        
        return path
    
    def get_shortest_distance(self, start: int, end: int) -> float:
        """Get shortest distance between two vertices"""
        return self.distance_matrix[start][end]
    
    def print_distance_matrix(self):
        """Print the distance matrix in a readable format"""
        print("Distance Matrix:")
        print("     ", end="")
        for j in range(self.num_vertices):
            print(f"{j:6}", end="")
        print()
        
        for i in range(self.num_vertices):
            print(f"{i:3}: ", end="")
            for j in range(self.num_vertices):
                if self.distance_matrix[i][j] == math.inf:
                    print("  ∞   ", end="")
                else:
                    print(f"{self.distance_matrix[i][j]:6.1f}", end="")
            print()
    
    def detect_negative_cycle(self) -> bool:
        """
        Detect if there's a negative cycle in the graph
        
        Returns:
            True if negative cycle exists, False otherwise
        """
        for i in range(self.num_vertices):
            if self.distance_matrix[i][i] < 0:
                return True
        return False

# Usage example
def main():
    # Create a graph with 4 vertices
    fw = FloydWarshall(4)
    
    # Add edges (from, to, weight)
    fw.add_edge(0, 1, 3)
    fw.add_edge(0, 3, 7)
    fw.add_edge(1, 0, 8)
    fw.add_edge(1, 2, 2)
    fw.add_edge(2, 0, 5)
    fw.add_edge(2, 3, 1)
    fw.add_edge(3, 0, 2)
    
    # Run the algorithm
    distances, next_vertices = fw.run_algorithm()
    
    # Print results
    fw.print_distance_matrix()
    
    # Find shortest path between vertices 1 and 3
    path = fw.reconstruct_path(1, 3)
    distance = fw.get_shortest_distance(1, 3)
    
    print(f"\\nShortest path from 1 to 3: {' -> '.join(map(str, path))}")
    print(f"Distance: {distance}")
    
    # Check for negative cycles
    if fw.detect_negative_cycle():
        print("\\nWarning: Negative cycle detected!")
    else:
        print("\\nNo negative cycles found.")

if __name__ == "__main__":
    main()`,
    java: `import java.util.*;

public class FloydWarshall {
    private int numVertices;
    private double[][] distanceMatrix;
    private Integer[][] nextMatrix;
    private static final double INF = Double.POSITIVE_INFINITY;
    
    public FloydWarshall(int numVertices) {
        this.numVertices = numVertices;
        this.distanceMatrix = new double[numVertices][numVertices];
        this.nextMatrix = new Integer[numVertices][numVertices];
        
        // Initialize matrices
        for (int i = 0; i < numVertices; i++) {
            for (int j = 0; j < numVertices; j++) {
                if (i == j) {
                    distanceMatrix[i][j] = 0;
                } else {
                    distanceMatrix[i][j] = INF;
                }
                nextMatrix[i][j] = null;
            }
        }
    }
    
    /**
     * Add an edge to the graph
     */
    public void addEdge(int from, int to, double weight) {
        distanceMatrix[from][to] = weight;
        nextMatrix[from][to] = to;
    }
    
    /**
     * Run Floyd-Warshall algorithm to find all-pairs shortest paths
     */
    public void runAlgorithm() {
        // Main Floyd-Warshall algorithm
        for (int k = 0; k < numVertices; k++) {
            for (int i = 0; i < numVertices; i++) {
                for (int j = 0; j < numVertices; j++) {
                    // Check if path through vertex k is shorter
                    if (distanceMatrix[i][k] + distanceMatrix[k][j] < distanceMatrix[i][j]) {
                        distanceMatrix[i][j] = distanceMatrix[i][k] + distanceMatrix[k][j];
                        nextMatrix[i][j] = nextMatrix[i][k];
                    }
                }
            }
        }
    }
    
    /**
     * Reconstruct shortest path between two vertices
     */
    public List<Integer> reconstructPath(int start, int end) {
        if (nextMatrix[start][end] == null) {
            return new ArrayList<>(); // No path exists
        }
        
        List<Integer> path = new ArrayList<>();
        path.add(start);
        int current = start;
        
        while (current != end) {
            current = nextMatrix[current][end];
            if (current == null) {
                return new ArrayList<>(); // Path reconstruction failed
            }
            path.add(current);
        }
        
        return path;
    }
    
    /**
     * Get shortest distance between two vertices
     */
    public double getShortestDistance(int start, int end) {
        return distanceMatrix[start][end];
    }
    
    /**
     * Print the distance matrix in a readable format
     */
    public void printDistanceMatrix() {
        System.out.println("Distance Matrix:");
        System.out.print("     ");
        for (int j = 0; j < numVertices; j++) {
            System.out.printf("%6d", j);
        }
        System.out.println();
        
        for (int i = 0; i < numVertices; i++) {
            System.out.printf("%3d: ", i);
            for (int j = 0; j < numVertices; j++) {
                if (distanceMatrix[i][j] == INF) {
                    System.out.print("  ∞   ");
                } else {
                    System.out.printf("%6.1f", distanceMatrix[i][j]);
                }
            }
            System.out.println();
        }
    }
    
    /**
     * Detect if there's a negative cycle in the graph
     */
    public boolean hasNegativeCycle() {
        for (int i = 0; i < numVertices; i++) {
            if (distanceMatrix[i][i] < 0) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * Get all shortest paths from a source vertex
     */
    public Map<Integer, Double> getShortestDistancesFrom(int source) {
        Map<Integer, Double> distances = new HashMap<>();
        for (int i = 0; i < numVertices; i++) {
            distances.put(i, distanceMatrix[source][i]);
        }
        return distances;
    }
    
    public static void main(String[] args) {
        // Create a graph with 4 vertices
        FloydWarshall fw = new FloydWarshall(4);
        
        // Add edges (from, to, weight)
        fw.addEdge(0, 1, 3);
        fw.addEdge(0, 3, 7);
        fw.addEdge(1, 0, 8);
        fw.addEdge(1, 2, 2);
        fw.addEdge(2, 0, 5);
        fw.addEdge(2, 3, 1);
        fw.addEdge(3, 0, 2);
        
        // Run the algorithm
        fw.runAlgorithm();
        
        // Print results
        fw.printDistanceMatrix();
        
        // Find shortest path between vertices 1 and 3
        List<Integer> path = fw.reconstructPath(1, 3);
        double distance = fw.getShortestDistance(1, 3);
        
        System.out.println("\\nShortest path from 1 to 3: " + 
            String.join(" -> ", path.stream().map(String::valueOf).toArray(String[]::new)));
        System.out.println("Distance: " + distance);
        
        // Check for negative cycles
        if (fw.hasNegativeCycle()) {
            System.out.println("\\nWarning: Negative cycle detected!");
        } else {
            System.out.println("\\nNo negative cycles found.");
        }
    }
}`,
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Floyd-Warshall Algoritması"
        description="Floyd-Warshall algoritması, ağırlıklı bir grafta tüm düğüm çiftleri arasındaki en kısa yolları bulan dinamik programlama tabanlı bir algoritmadır. Roy Warshall ve Robert Floyd tarafından geliştirilmiş olup, pozitif ve negatif kenar ağırlıklarını destekler ancak negatif çevrimler olmamalıdır."
        timeComplexity={{
          best: 'O(V³)',
          average: 'O(V³)',
          worst: 'O(V³)',
        }}
        spaceComplexity="O(V²)"
        advantages={[
          'Tüm düğüm çiftleri arasındaki en kısa yolları tek seferde bulur',
          'Negatif kenar ağırlıklarını destekler',
          'Negatif çevrimleri tespit edebilir',
          'Uygulaması basit ve anlaşılırdır',
          'Yol rekonstrüksiyonu için next matrisi sağlar',
          'Dense (yoğun) graflarda verimli çalışır',
        ]}
        disadvantages={[
          "Zaman karmaşıklığı O(V³)'tür, büyük graflarda yavaş",
          'Alan karmaşıklığı O(V²), büyük graflarda bellek problemi',
          'Negatif çevrimler varsa sonuçlar geçersiz olur',
          'Sparse (seyrek) graflarda diğer algoritmalardan daha yavaş',
          'Tek kaynak en kısa yol problemleri için aşırı kapsamlı',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Ağ yönlendirme protokolleri (OSPF, BGP)',
          'Şehir içi ulaşım planlama sistemleri',
          'Oyun geliştirme (NPC navigasyonu)',
          'Sosyal ağ analizi (bağlantı mesafeleri)',
          'Malzeme akış optimizasyonu',
          'Grafik teorisi araştırmaları',
          'Coğrafi bilgi sistemleri (GIS)',
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Görselleştirme</h2>
        <MatrixVisualizer algorithm="floyd-warshall" />
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
              title="Floyd-Warshall - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Floyd-Warshall - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Floyd-Warshall - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Floyd-Warshall algoritması, dinamik programlama prensibini
            kullanarak tüm düğüm çiftleri arasındaki en kısa yolları hesaplar.
            Algoritmanın temel çalışma prensibi şu adımlardan oluşur:
          </p>

          <h3>1. Başlangıç Matrisi Oluşturma</h3>
          <p>
            İlk adımda, grafın komşuluk matrisinden yola çıkarak bir mesafe
            matrisi oluşturulur. Bu matrisin köşegen elemanları 0 (düğümden
            kendisine mesafe), doğrudan bağlantı olan düğümler arasındaki
            mesafeler kenar ağırlıkları, diğer tüm elemanlar ise sonsuz (∞)
            olarak ayarlanır.
          </p>

          <h3>2. Ara Düğüm İterasyonları</h3>
          <p>
            Algoritmanın ana döngüsünde, her düğüm k için, tüm düğüm çiftleri
            (i,j) kontrol edilir. Eğer i'den j'ye doğrudan gitmek yerine k
            üzerinden gitmek daha kısa bir yol sağlıyorsa, mesafe matrisi
            güncellenir:
          </p>
          <pre className="bg-muted p-4 rounded-md">
            if (distance[i][k] + distance[k][j] &lt; distance[i][j]) {'{'}
            distance[i][j] = distance[i][k] + distance[k][j]; next[i][j] =
            next[i][k];
            {'}'}
          </pre>

          <h3>3. Yol Rekonstrüksiyonu</h3>
          <p>
            Algoritma aynı zamanda bir "next" matrisi tutar. Bu matris, herhangi
            iki düğüm arasındaki en kısa yolda bir sonraki düğümün ne olduğunu
            saklar. Bu sayede algoritma tamamlandıktan sonra, sadece mesafeyi
            değil, gerçek yolu da elde edebiliriz.
          </p>

          <h3>4. Negatif Çevrim Tespiti</h3>
          <p>
            Floyd-Warshall algoritması çalıştıktan sonra, eğer mesafe matrisinin
            köşegen elemanlarından herhangi biri negatif ise, bu grafta negatif
            çevrim olduğunu gösterir. Negatif çevrimler varsa, en kısa yol
            kavramı anlamsız hale gelir çünkü çevrimde sürekli dolaşarak
            mesafeyi sonsuzca azaltabiliriz.
          </p>

          <h3>5. Algoritmanın Doğruluğu</h3>
          <p>
            Algoritmanın doğruluğu matematiksel tümevarım ile kanıtlanabilir.
            k'ıncı iterasyondan sonra, distance[i][j] değeri i'den j'ye giden ve
            sadece {'{1, 2, ..., k}'} düğümlerini ara düğüm olarak kullanan en
            kısa yolun uzunluğunu verir.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Karmaşıklık Analizi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Zaman Karmaşıklığı</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>O(V³):</strong> Üç iç içe döngü nedeniyle
              </p>
              <ul className="list-disc pl-5">
                <li>Dış döngü: V iterasyon (her düğüm için)</li>
                <li>İç döngüler: V × V = V² işlem her iterasyonda</li>
                <li>Toplam: V × V² = V³ işlem</li>
              </ul>
              <p className="mt-2">
                <strong>Not:</strong> Bu karmaşıklık tüm durumlar için sabittir,
                en iyi, ortalama ve en kötü durum aynıdır.
              </p>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Alan Karmaşıklığı</h3>
            <div className="space-y-2 text-sm">
              <p>
                <strong>O(V²):</strong> İki boyutlu matrisler için
              </p>
              <ul className="list-disc pl-5">
                <li>Mesafe matrisi: V × V boyutunda</li>
                <li>
                  Next matrisi: V × V boyutunda (yol rekonstrüksiyonu için)
                </li>
                <li>Toplam: 2 × V² alan</li>
              </ul>
              <p className="mt-2">
                <strong>Optimizasyon:</strong> Eğer sadece mesafeler
                gerekiyorsa, next matrisi kullanılmayabilir.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">
          Diğer Algoritmalarla Karşılaştırma
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-muted">
                <th className="border border-gray-300 p-3 text-left">
                  Algoritma
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Problem Türü
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Zaman Karmaşıklığı
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Alan Karmaşıklığı
                </th>
                <th className="border border-gray-300 p-3 text-left">
                  Avantajlar
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Floyd-Warshall
                </td>
                <td className="border border-gray-300 p-3">
                  All-pairs shortest path
                </td>
                <td className="border border-gray-300 p-3">O(V³)</td>
                <td className="border border-gray-300 p-3">O(V²)</td>
                <td className="border border-gray-300 p-3">
                  Negatif kenarlar, basit implementasyon
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Dijkstra
                </td>
                <td className="border border-gray-300 p-3">
                  Single-source shortest path
                </td>
                <td className="border border-gray-300 p-3">O((V + E) log V)</td>
                <td className="border border-gray-300 p-3">O(V)</td>
                <td className="border border-gray-300 p-3">
                  Hızlı, sparse graflarda verimli
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Bellman-Ford
                </td>
                <td className="border border-gray-300 p-3">
                  Single-source shortest path
                </td>
                <td className="border border-gray-300 p-3">O(VE)</td>
                <td className="border border-gray-300 p-3">O(V)</td>
                <td className="border border-gray-300 p-3">
                  Negatif kenarlar, negatif çevrim tespiti
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">
                  Johnson's
                </td>
                <td className="border border-gray-300 p-3">
                  All-pairs shortest path
                </td>
                <td className="border border-gray-300 p-3">O(V²log V + VE)</td>
                <td className="border border-gray-300 p-3">O(V²)</td>
                <td className="border border-gray-300 p-3">
                  Sparse graflarda Floyd-Warshall'dan hızlı
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Gerçek Dünya Uygulamaları</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Ağ Yönlendirme</h3>
            <p className="text-sm">
              İnternet protokollerinde, routerlar arasındaki en kısa yolları
              bulmak için kullanılır. OSPF (Open Shortest Path First) protokolü
              Floyd-Warshall'ın bir varyasyonunu kullanır.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Ulaşım Planlama</h3>
            <p className="text-sm">
              Şehir içi ulaşım sistemlerinde, herhangi iki nokta arasındaki en
              kısa yolu ve süreyi hesaplamak için kullanılır. GPS navigasyon
              sistemlerinin temelinde yer alır.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Oyun Geliştirme</h3>
            <p className="text-sm">
              Oyun haritalarında NPC'lerin (Non-Player Character) herhangi iki
              nokta arasındaki en kısa yolu bulması için kullanılır. Özellikle
              RTS (Real-Time Strategy) oyunlarında yaygındır.
            </p>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold mb-3">Sosyal Ağ Analizi</h3>
            <p className="text-sm">
              Sosyal ağlarda, iki kişi arasındaki "altı derece ayrılık"
              teorisini test etmek ve sosyal bağlantıların gücünü ölçmek için
              kullanılır.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">
          ⚠️ Önemli Notlar
        </h3>
        <ul className="list-disc pl-5 text-sm text-yellow-700 space-y-1">
          <li>
            Floyd-Warshall algoritması negatif çevrimler içeren graflarda doğru
            sonuç vermez. Algoritma çalıştırılmadan önce negatif çevrim kontrolü
            yapılmalıdır.
          </li>
          <li>
            Büyük graflarda (V &gt; 1000) performans sorunu yaşanabilir. Bu
            durumda Johnson's algoritması veya tekrarlı Dijkstra tercih
            edilmelidir.
          </li>
          <li>
            Algoritma dense (yoğun) graflar için optimize edilmiştir. Sparse
            (seyrek) graflarda diğer algoritmalar daha verimli olabilir.
          </li>
          <li>
            Floating-point sayılarla çalışırken, sayısal hassasiyet sorunları
            yaşanabilir. Bu durumda epsilon değeri kullanarak karşılaştırma
            yapılmalıdır.
          </li>
        </ul>
      </div>
    </div>
  );
}
