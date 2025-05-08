'use client';

import React, { useState, useEffect } from 'react';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Graf veri yapısını temsil eden type
type Graph = {
  [key: string]: string[];
};

// Topolojik sıralama algoritması - DFS yaklaşımı
function topologicalSort(graph: Graph): {
  result: string[];
  hasCycle: boolean;
} {
  // Düğümlerin ziyaret durumunu izlemek için
  const visited: { [key: string]: boolean } = {};
  const tempVisited: { [key: string]: boolean } = {}; // Geçici ziyaret (çevrim tespiti için)
  const result: string[] = [];
  let hasCycle = false;

  // Tüm düğümleri kontrol et
  const nodes = Object.keys(graph);

  // DFS yardımcı fonksiyonu
  function dfs(node: string) {
    // Çevrim kontrolü - eğer düğüm geçici olarak ziyaret edildiyse, çevrim var demektir
    if (tempVisited[node]) {
      hasCycle = true;
      return;
    }

    // Eğer düğüm zaten ziyaret edildiyse, tekrar ziyaret etmeye gerek yok
    if (visited[node]) {
      return;
    }

    // Düğümü geçici olarak ziyaret edildi olarak işaretle
    tempVisited[node] = true;

    // Komşu düğümleri kontrol et
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      dfs(neighbor);
    }

    // Düğüm işlendi, artık kalıcı olarak ziyaret edildi
    visited[node] = true;
    // Geçici ziyaret işaretini kaldır
    tempVisited[node] = false;

    // Sonuç listesine ekle (başa ekleyerek sıralama tersine çevrilir)
    result.unshift(node);
  }

  // Tüm düğümler için DFS
  for (const node of nodes) {
    if (!visited[node]) {
      dfs(node);
    }
  }

  return { result, hasCycle };
}

// Graf görselleştirme bileşeni
const GraphVisualization: React.FC<{
  graph: Graph;
  sortedNodes: string[];
  hasCycle: boolean;
}> = ({ graph, sortedNodes, hasCycle }) => {
  // Graf düğümlerini seçili sıralamaya göre düzenle
  const orderedNodes = [...sortedNodes];

  return (
    <div className="mt-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Graf Yapısı</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(graph).map(([node, neighbors]) => (
              <div key={node} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                  {node}
                </div>
                <div className="text-sm">
                  → {neighbors.length > 0 ? neighbors.join(', ') : '(yok)'}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Topolojik Sıralama Sonucu</CardTitle>
        </CardHeader>
        <CardContent>
          {hasCycle ? (
            <div className="text-red-500 font-medium">
              Graf çevrim içeriyor! Topolojik sıralama yalnızca çevrimsiz yönlü
              graflarda (DAG) mümkündür.
            </div>
          ) : (
            <div>
              <div className="flex flex-wrap gap-2 items-center">
                {orderedNodes.map((node, index) => (
                  <React.Fragment key={node}>
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                      {node}
                    </div>
                    {index < orderedNodes.length - 1 && (
                      <div className="text-lg">→</div>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Bu sıralama, her düğümün kendi tüm bağımlılıklarından sonra
                geldiği bir düzeni gösterir. Bir DAG için birden fazla geçerli
                topolojik sıralama olabilir.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default function TopologicalSortPage() {
  // Örnek graf durumu
  const [graph, setGraph] = useState<Graph>({
    A: ['C', 'D'],
    B: ['D'],
    C: ['E'],
    D: ['E'],
    E: [],
  });

  // Kullanıcı girdisi için durum
  const [graphInput, setGraphInput] = useState<string>(
    'A:C,D\nB:D\nC:E\nD:E\nE:'
  );
  const [sortResult, setSortResult] = useState<{
    result: string[];
    hasCycle: boolean;
  }>({
    result: ['B', 'A', 'D', 'C', 'E'],
    hasCycle: false,
  });

  // Algoritma açıklaması için veriler
  const pseudocode = `function topologicalSort(graph):
    visited = {}  # Kalıcı ziyaret edilen düğümler
    tempVisited = {}  # Geçici ziyaret edilen düğümler (çevrim tespiti için)
    result = []  # Sıralama sonucu
    hasCycle = false
    
    function dfs(node):
        if node in tempVisited:  # Çevrim tespiti
            hasCycle = true
            return
        
        if node in visited:  # Zaten işlendi
            return
        
        tempVisited[node] = true  # Geçici ziyaret işaretle
        
        for each neighbor in graph[node]:
            dfs(neighbor)
        
        visited[node] = true  # Kalıcı ziyaret işaretle
        tempVisited[node] = false  # Geçici işareti kaldır
        
        # Düğümü sonuç listesinin başına ekle
        result.insertAt(0, node)
    
    for each node in graph:
        if node not in visited:
            dfs(node)
    
    return { result, hasCycle }`;

  const implementations = {
    typescript: `function topologicalSort(graph: Record<string, string[]>): { result: string[], hasCycle: boolean } {
  // Düğümlerin ziyaret durumunu izlemek için
  const visited: Record<string, boolean> = {};
  const tempVisited: Record<string, boolean> = {}; // Geçici ziyaret (çevrim tespiti için)
  const result: string[] = [];
  let hasCycle = false;
  
  // DFS yardımcı fonksiyonu
  function dfs(node: string) {
    // Çevrim kontrolü - eğer düğüm geçici olarak ziyaret edildiyse, çevrim var demektir
    if (tempVisited[node]) {
      hasCycle = true;
      return;
    }
    
    // Eğer düğüm zaten ziyaret edildiyse, tekrar ziyaret etmeye gerek yok
    if (visited[node]) {
      return;
    }
    
    // Düğümü geçici olarak ziyaret edildi olarak işaretle
    tempVisited[node] = true;
    
    // Komşu düğümleri kontrol et
    const neighbors = graph[node] || [];
    for (const neighbor of neighbors) {
      dfs(neighbor);
    }
    
    // Düğüm işlendi, artık kalıcı olarak ziyaret edildi
    visited[node] = true;
    // Geçici ziyaret işaretini kaldır
    tempVisited[node] = false;
    
    // Sonuç listesine ekle (başa ekleyerek sıralama tersine çevrilir)
    result.unshift(node);
  }
  
  // Tüm düğümler için DFS
  for (const node of Object.keys(graph)) {
    if (!visited[node]) {
      dfs(node);
    }
  }
  
  return { result, hasCycle };
}`,
    python: `def topological_sort(graph):
    """
    Yönlü Asiklik Graf (DAG) için topolojik sıralama algoritması.
    DFS yaklaşımını kullanır.
    
    Args:
        graph: Düğümleri ve komşularını içeren komşuluk listesi sözlüğü
        
    Returns:
        Topolojik sıralama listesi ve çevrim varlığı durumu
    """
    visited = set()  # Kalıcı ziyaret edilenler
    temp_visited = set()  # Geçici ziyaret edilenler
    result = []  # Sıralama sonucu
    has_cycle = False
    
    def dfs(node):
        nonlocal has_cycle
        
        # Çevrim tespiti
        if node in temp_visited:
            has_cycle = True
            return
            
        # Zaten işlenen düğüm kontrolü
        if node in visited:
            return
            
        # Geçici ziyaret işaretle
        temp_visited.add(node)
        
        # Komşuları işle
        for neighbor in graph.get(node, []):
            dfs(neighbor)
            
        # Ziyaret işlemi tamamlandı
        visited.add(node)
        temp_visited.remove(node)
        
        # Sonuç listesinin başına ekle
        result.insert(0, node)
    
    # Tüm düğümler için DFS
    for node in graph:
        if node not in visited:
            dfs(node)
            
    return {"result": result, "has_cycle": has_cycle}`,
    java: `import java.util.*;

public class TopologicalSort {
    // Graf veri yapısı
    private Map<String, List<String>> graph;
    // Ziyaret edilen düğümler
    private Set<String> visited;
    // Geçici ziyaret edilen düğümler (çevrim tespiti için)
    private Set<String> tempVisited;
    // Sonuç listesi
    private LinkedList<String> result;
    // Çevrim var mı?
    private boolean hasCycle;
    
    public TopologicalSort(Map<String, List<String>> graph) {
        this.graph = graph;
        this.visited = new HashSet<>();
        this.tempVisited = new HashSet<>();
        this.result = new LinkedList<>();
        this.hasCycle = false;
    }
    
    /**
     * Topolojik sıralama algoritması
     * @return Sıralanmış düğüm listesi ve çevrim varlığı
     */
    public Map<String, Object> sort() {
        // Tüm düğümler için DFS
        for (String node : graph.keySet()) {
            if (!visited.contains(node)) {
                dfs(node);
            }
        }
        
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("result", result);
        resultMap.put("hasCycle", hasCycle);
        
        return resultMap;
    }
    
    /**
     * Derinlik öncelikli arama (DFS)
     * @param node İşlenecek düğüm
     */
    private void dfs(String node) {
        // Çevrim tespiti
        if (tempVisited.contains(node)) {
            hasCycle = true;
            return;
        }
        
        // Zaten işlendi mi?
        if (visited.contains(node)) {
            return;
        }
        
        // Geçici ziyaret işaretle
        tempVisited.add(node);
        
        // Komşuları işle
        List<String> neighbors = graph.getOrDefault(node, new ArrayList<>());
        for (String neighbor : neighbors) {
            dfs(neighbor);
        }
        
        // İşaretleri güncelle
        visited.add(node);
        tempVisited.remove(node);
        
        // Sonucun başına ekle
        result.addFirst(node);
    }
}`,
  };

  // Uygulama başladığında örnek grafa göre sıralama yap
  useEffect(() => {
    handleRunAlgorithm();
  }, []);

  // Input değişikliklerini işle
  const handleGraphInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setGraphInput(e.target.value);
  };

  // Algoritma çalıştırma işlevi
  const handleRunAlgorithm = () => {
    try {
      // Girdiyi graf veri yapısına dönüştür
      const parsedGraph: Graph = {};

      // Satır satır işle
      const lines = graphInput.trim().split('\n');

      for (const line of lines) {
        // Boş satırları atla
        if (!line.trim()) continue;

        // Düğüm ve komşularını ayır (A:B,C,D formatı)
        const [node, neighborsStr] = line.split(':');

        if (!node) {
          throw new Error(
            "Geçersiz satır formatı. 'Düğüm:Komşu1,Komşu2' formatını kullanın."
          );
        }

        // Düğümü oluştur
        const trimmedNode = node.trim();
        parsedGraph[trimmedNode] = [];

        // Komşuları ekle (varsa)
        if (neighborsStr && neighborsStr.trim()) {
          const neighbors = neighborsStr
            .split(',')
            .map((n) => n.trim())
            .filter(Boolean);
          parsedGraph[trimmedNode] = neighbors;
        }
      }

      // Graf boş mu kontrol et
      if (Object.keys(parsedGraph).length === 0) {
        throw new Error('Graf boş olamaz. En az bir düğüm belirtin.');
      }

      // Grafdaki tüm komşuların düğüm olarak tanımlandığından emin ol
      for (const [node, neighbors] of Object.entries(parsedGraph)) {
        for (const neighbor of neighbors) {
          if (!parsedGraph[neighbor]) {
            // Komşu düğüm tanımlanmamış, onu otomatik olarak ekle
            parsedGraph[neighbor] = [];
          }
        }
      }

      // Topolojik sıralama algoritmasını çalıştır
      setGraph(parsedGraph);
      const result = topologicalSort(parsedGraph);
      setSortResult(result);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Bir hata oluştu!');
    }
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="Topolojik Sıralama (Topological Sort) Algoritması"
        description="Topolojik sıralama, yönlü asiklik graflarda (DAG) düğümleri bağımlılıklarına göre sıralayan bir algoritmadır. Her düğüm, kendisine bağımlı olan düğümlerden önce gelecek şekilde bir doğrusal sıralama oluşturur. Bu algoritma, görev planlaması, derleme sırası, kurs ön koşulları gibi bağımlılık yönetimi gerektiren birçok alanda kullanılır."
        timeComplexity={{
          best: 'O(V + E)',
          average: 'O(V + E)',
          worst: 'O(V + E)',
        }}
        spaceComplexity="O(V)"
        advantages={[
          'Doğrusal zaman karmaşıklığı (O(V + E) - Düğüm ve kenar sayısıyla orantılı)',
          'Bağımlılık ilişkilerini doğru şekilde yönetir',
          'Çevrimleri (döngüleri) tespit edebilir',
          'Derleme sırası, görev planlaması gibi birçok gerçek dünya problemine uygulanabilir',
          'DFS algoritmasının doğal bir uzantısıdır',
        ]}
        disadvantages={[
          'Yalnızca yönlü asiklik graflar (DAG) için kullanılabilir',
          'Çevrimli graflar için kullanılamaz',
          'Birden fazla geçerli topolojik sıralama olabilir (tek bir doğru çözüm yoktur)',
          'Yüksek öncelikli görevleri belirleme konusunda yetersiz kalabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Derleme sistemi bağımlılıkları (Make, Maven, Gradle)',
          'Görev planlama ve iş akışı yönetimi',
          'Üniversitelerde ders/program planlaması',
          'Yazılım paket bağımlılıklarının yönetimi',
          'Veri işleme sırası ve pipeline optimizasyonu',
          'Kritik yol analizi (PERT/CPM)',
          'Statik kod analizi (sembol çözümleme)',
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Demo</h2>
        <p className="text-muted-foreground">
          Topolojik sıralama algoritmasını test edin. Grafı aşağıdaki formatta
          girin (her satır bir düğümü ve komşularını temsil eder):
        </p>
        <p className="text-sm font-medium">
          Format: Düğüm:Komşu1,Komşu2,Komşu3
        </p>

        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="graphInput">Graf Yapısı</Label>
            <textarea
              id="graphInput"
              value={graphInput}
              onChange={handleGraphInputChange}
              className="min-h-[200px] p-3 border rounded-md resize-y bg-card"
              placeholder="Örnek:&#10;A:B,C&#10;B:D&#10;C:D&#10;D:"
            />
            <div className="text-xs text-muted-foreground">
              <p>Örnek gösterim:</p>
              <ul className="list-disc pl-4">
                <li>
                  <code>A:B,C</code> - A düğümünden B ve C düğümlerine kenarlar
                  var
                </li>
                <li>
                  <code>B:D</code> - B düğümünden D düğümüne kenar var
                </li>
                <li>
                  <code>C:</code> - C düğümünden çıkan kenar yok
                </li>
              </ul>
            </div>
            <Button onClick={handleRunAlgorithm} className="w-full">
              Algoritmayı Çalıştır
            </Button>
          </div>

          <GraphVisualization
            graph={graph}
            sortedNodes={sortResult.result}
            hasCycle={sortResult.hasCycle}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          Topolojik sıralama algoritmasının farklı programlama dillerindeki
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
              title="Topolojik Sıralama - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="Topolojik Sıralama - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="Topolojik Sıralama - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Topolojik sıralama, yönlü asiklik graflarda (DAG) düğümleri sıralama
            yöntemidir. Eğer grafdaki iki düğüm arasında u'dan v'ye bir kenar
            varsa, u düğümü topolojik sıralamada v'den önce gelmelidir.
            Algoritmanın temeli, her düğümün kendisine bağımlı olan tüm
            düğümlerden önce işlenmesini sağlamaktır.
          </p>

          <h3>Algoritmanın Adımları</h3>
          <p>Topolojik sıralama için yaygın olarak iki yaklaşım kullanılır:</p>

          <h4>1. DFS (Derinlik Öncelikli Arama) Tabanlı Yaklaşım</h4>
          <ol>
            <li>Her düğüm için, henüz ziyaret edilmediyse DFS başlat</li>
            <li>Mevcut düğümün tüm komşularını ziyaret et</li>
            <li>
              Tüm komşuları ziyaret edildikten sonra, düğümü sonuç listesinin
              başına ekle
            </li>
            <li>
              DFS tamamlandığında, sonuç listesi doğru topolojik sıralamayı
              içerir
            </li>
          </ol>

          <h4>2. Kahn Algoritması (Girdi Derecesi Tabanlı)</h4>
          <ol>
            <li>Her düğümün girdi derecesini (gelen kenar sayısı) hesapla</li>
            <li>Girdi derecesi 0 olan düğümleri bir kuyruğa ekle</li>
            <li>Kuyruktan bir düğüm çıkar, sonuç listesine ekle</li>
            <li>Çıkarılan düğümün tüm komşularının girdi derecesini 1 azalt</li>
            <li>Girdi derecesi 0'a düşen düğümleri kuyruğa ekle</li>
            <li>Kuyruk boşalana kadar devam et</li>
          </ol>

          <h3>Çevrim Tespiti</h3>
          <p>
            Topolojik sıralama yalnızca çevrimsiz graflar (DAG) için mümkündür.
            Algoritma çevrim tespiti de yapabilir:
          </p>
          <ul>
            <li>
              DFS yaklaşımında, geçici ziyaret işaretleri kullanarak çevrimleri
              tespit edebiliriz. Eğer bir düğüm halen geçici ziyaret edildi
              olarak işaretliyken tekrar ziyaret edilirse, bu bir çevrim
              olduğunu gösterir.
            </li>
            <li>
              Kahn algoritmasında, eğer sonuç listesinin uzunluğu graf düğüm
              sayısından azsa, graf bir çevrim içeriyor demektir.
            </li>
          </ul>

          <h3>Örnek Uygulama: Ders Ön Koşulları</h3>
          <p>
            Topolojik sıralama algoritmasının klasik uygulamalarından biri,
            üniversite derslerinin ön koşul ilişkilerini düzenlemektir. Örneğin:
          </p>
          <ul>
            <li>Matematiksel Analiz → Diferansiyel Denklemler</li>
            <li>Lineer Cebir → Sayısal Analiz</li>
            <li>Algoritma Teorisi → Veri Yapıları → İşletim Sistemleri</li>
          </ul>
          <p>
            Topolojik sıralama algoritması, bu dersleri ön koşulları dikkate
            alarak sıralayarak bir öğrencinin hangi dersleri hangi sırayla
            alması gerektiğini belirlemede yardımcı olur.
          </p>
        </div>
      </div>
    </div>
  );
}
