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

// N-Queens problemi çözümü - Geri izleme (backtracking) algoritması
function solveNQueens(n: number): number[][] {
  // Tüm çözümleri saklayan dizi
  const solutions: number[][] = [];

  // Satranç tahtasını temsil eden dizi (her satırdaki vezirin sütun pozisyonu)
  const board: number[] = Array(n).fill(-1);

  // Vezir yerleştirmenin güvenli olup olmadığını kontrol eden yardımcı fonksiyon
  function isSafe(row: number, col: number): boolean {
    // Daha önceki satırlardaki vezirleri kontrol et
    for (let i = 0; i < row; i++) {
      // Aynı sütunda başka bir vezir var mı?
      if (board[i] === col) {
        return false;
      }

      // Aynı çaprazda başka bir vezir var mı?
      if (Math.abs(i - row) === Math.abs(board[i] - col)) {
        return false;
      }
    }

    return true;
  }

  // Geri izleme (backtracking) fonksiyonu
  function backtrack(row: number): void {
    // Tüm satırlar dolduruldu, bir çözüm bulundu
    if (row === n) {
      // Bulunan çözümü kaydet
      solutions.push([...board]);
      return;
    }

    // Mevcut satır için tüm olası sütunları dene
    for (let col = 0; col < n; col++) {
      // Eğer bu pozisyona vezir yerleştirmek güvenliyse
      if (isSafe(row, col)) {
        // Veziri yerleştir
        board[row] = col;

        // Sonraki satır için recursion
        backtrack(row + 1);

        // Geri al (backtrack) - vazgeçme adımı
        board[row] = -1;
      }
    }
  }

  // 0. satırdan itibaren geri izleme algoritmasını başlat
  backtrack(0);

  return solutions;
}

// Satranç tahtasını görselleştiren bileşen
const ChessboardVisualization: React.FC<{
  size: number;
  solution: number[];
}> = ({ size, solution }) => {
  return (
    <div className="inline-grid gap-0.5 p-1 bg-gray-700 dark:bg-gray-800 rounded-md">
      {/* n x n satranç tahtası oluştur */}
      <div
        className="inline-grid"
        style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      >
        {/* Tüm hücreleri oluştur */}
        {Array.from({ length: size * size }).map((_, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          const isQueenPlaced = solution[row] === col;

          // Satranç tahtasındaki siyah/beyaz kare desenini oluştur
          const isBlackSquare = (row + col) % 2 === 1;

          return (
            <div
              key={index}
              className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 
                ${isBlackSquare ? 'bg-gray-600 dark:bg-gray-900' : 'bg-gray-200 dark:bg-gray-700'}`}
            >
              {isQueenPlaced && (
                <div className="text-2xl md:text-3xl" aria-label="Vezir">
                  ♛
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Tüm çözümleri gösteren bileşen
const SolutionsViewer: React.FC<{
  solutions: number[][];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}> = ({ solutions, currentIndex, onChangeIndex }) => {
  const handlePrevious = () => {
    onChangeIndex((currentIndex - 1 + solutions.length) % solutions.length);
  };

  const handleNext = () => {
    onChangeIndex((currentIndex + 1) % solutions.length);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between items-center w-full">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={solutions.length <= 1}
        >
          Önceki Çözüm
        </Button>
        <span className="text-sm font-medium">
          {solutions.length > 0
            ? `Çözüm ${currentIndex + 1} / ${solutions.length}`
            : 'Çözüm bulunamadı'}
        </span>
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={solutions.length <= 1}
        >
          Sonraki Çözüm
        </Button>
      </div>

      {solutions.length > 0 ? (
        <ChessboardVisualization
          size={solutions[0].length}
          solution={solutions[currentIndex]}
        />
      ) : (
        <p className="text-red-500">Bu boyut için çözüm bulunamadı.</p>
      )}
    </div>
  );
};

export default function NQueensPage() {
  // N değeri (satranç tahtası boyutu)
  const [boardSize, setBoardSize] = useState<number>(4);
  // Bulunan çözümler
  const [solutions, setSolutions] = useState<number[][]>([]);
  // Gösterilen çözüm indeksi
  const [currentSolutionIndex, setCurrentSolutionIndex] = useState<number>(0);
  // Algoritma çalışma durumu
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Algoritma açıklaması için veriler
  const pseudocode = `function solveNQueens(n):
    // Bulunan tüm çözümleri saklar
    solutions = []
    
    // Satranç tahtasını temsil eden dizi 
    // (her satırdaki vezirin sütun pozisyonu)
    board = [-1, -1, ..., -1] // n elemanlı
    
    function isSafe(row, col):
        // Daha önceki satırlardaki vezirleri kontrol et
        for i from 0 to row-1:
            // Aynı sütunda vezir var mı?
            if board[i] == col:
                return false
            
            // Aynı çaprazda vezir var mı?
            if abs(i - row) == abs(board[i] - col):
                return false
        
        return true
    
    function backtrack(row):
        // Tüm satırlar dolduruldu, çözüm bulundu
        if row == n:
            solutions.add(copy of board)
            return
        
        // Mevcut satır için tüm sütunları dene
        for col from 0 to n-1:
            // Vezir yerleştirmek güvenli mi kontrol et
            if isSafe(row, col):
                // Veziri yerleştir
                board[row] = col
                
                // Sonraki satır için recursion
                backtrack(row + 1)
                
                // Geri al (backtrack)
                board[row] = -1
    
    // İlk satırdan başla
    backtrack(0)
    
    return solutions`;

  const implementations = {
    typescript: `function solveNQueens(n: number): number[][] {
  // Tüm çözümleri saklayan dizi
  const solutions: number[][] = [];
  
  // Satranç tahtasını temsil eden dizi (her satırdaki vezirin sütun pozisyonu)
  const board: number[] = Array(n).fill(-1);
  
  // Vezir yerleştirmenin güvenli olup olmadığını kontrol eden yardımcı fonksiyon
  function isSafe(row: number, col: number): boolean {
    // Daha önceki satırlardaki vezirleri kontrol et
    for (let i = 0; i < row; i++) {
      // Aynı sütunda başka bir vezir var mı?
      if (board[i] === col) {
        return false;
      }
      
      // Aynı çaprazda başka bir vezir var mı?
      if (Math.abs(i - row) === Math.abs(board[i] - col)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Geri izleme (backtracking) fonksiyonu
  function backtrack(row: number): void {
    // Tüm satırlar dolduruldu, bir çözüm bulundu
    if (row === n) {
      // Bulunan çözümü kaydet
      solutions.push([...board]);
      return;
    }
    
    // Mevcut satır için tüm olası sütunları dene
    for (let col = 0; col < n; col++) {
      // Eğer bu pozisyona vezir yerleştirmek güvenliyse
      if (isSafe(row, col)) {
        // Veziri yerleştir
        board[row] = col;
        
        // Sonraki satır için recursion
        backtrack(row + 1);
        
        // Geri al (backtrack) - vazgeçme adımı
        board[row] = -1;
      }
    }
  }
  
  // 0. satırdan itibaren geri izleme algoritmasını başlat
  backtrack(0);
  
  return solutions;
}`,
    python: `def solve_n_queens(n):
    """
    N-Queens problemini çözen ve tüm olası çözümleri döndüren fonksiyon
    
    Args:
        n: Satranç tahtası boyutu ve yerleştirilecek vezir sayısı
        
    Returns:
        Tüm çözümlerin listesi. Her çözüm, her satırdaki vezirin
        sütun pozisyonlarını içeren bir liste
    """
    solutions = []
    board = [-1] * n  # Satranç tahtası (her satırdaki vezirin sütun pozisyonu)
    
    def is_safe(row, col):
        """Verilen pozisyona vezir yerleştirmenin güvenli olup olmadığını kontrol eder"""
        for i in range(row):
            # Aynı sütunda veya çaprazda vezir kontrolü
            if board[i] == col or abs(i - row) == abs(board[i] - col):
                return False
        return True
    
    def backtrack(row):
        """Geri izleme algoritması"""
        # Tüm vezirler yerleştirildi, çözüm bulundu
        if row == n:
            solutions.append(board[:])
            return
        
        # Mevcut satır için tüm sütunları dene
        for col in range(n):
            if is_safe(row, col):
                # Veziri yerleştir
                board[row] = col
                
                # Sonraki satıra geç
                backtrack(row + 1)
                
                # Geri al (backtrack)
                board[row] = -1
    
    # İlk satırdan başla
    backtrack(0)
    
    return solutions`,
    java: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class NQueens {
    
    /**
     * N-Queens problemini çözen ve tüm çözümleri döndüren metot
     * 
     * @param n Satranç tahtası boyutu ve vezir sayısı
     * @return Tüm çözümlerin listesi
     */
    public static List<int[]> solveNQueens(int n) {
        List<int[]> solutions = new ArrayList<>();
        int[] board = new int[n];
        Arrays.fill(board, -1);
        
        backtrack(0, board, solutions, n);
        
        return solutions;
    }
    
    /**
     * Vezir yerleştirmenin güvenli olup olmadığını kontrol eden yardımcı metot
     * 
     * @param row Kontrol edilecek satır
     * @param col Kontrol edilecek sütun
     * @param board Mevcut tahta durumu
     * @return Pozisyonun güvenli olup olmadığı
     */
    private static boolean isSafe(int row, int col, int[] board) {
        for (int i = 0; i < row; i++) {
            // Aynı sütunda vezir kontrolü
            if (board[i] == col) {
                return false;
            }
            
            // Çaprazlarda vezir kontrolü
            if (Math.abs(i - row) == Math.abs(board[i] - col)) {
                return false;
            }
        }
        return true;
    }
    
    /**
     * Geri izleme algoritmasını uygulayan rekürsif metot
     * 
     * @param row İşlenecek mevcut satır
     * @param board Mevcut tahta durumu
     * @param solutions Bulunan çözümlerin listesi
     * @param n Tahta boyutu
     */
    private static void backtrack(int row, int[] board, List<int[]> solutions, int n) {
        // Tüm satırlar dolduruldu, çözüm bulundu
        if (row == n) {
            solutions.add(board.clone());
            return;
        }
        
        // Mevcut satır için tüm sütunları dene
        for (int col = 0; col < n; col++) {
            if (isSafe(row, col, board)) {
                // Veziri yerleştir
                board[row] = col;
                
                // Sonraki satır için recursive çağrı
                backtrack(row + 1, board, solutions, n);
                
                // Backtrack - geri alma
                board[row] = -1;
            }
        }
    }
}`,
  };

  // Yeni board size değerinde çözümü hesapla
  useEffect(() => {
    handleSolve();
  }, [boardSize]);

  // Tahtanın boyutunu değiştirme işlevi
  const handleBoardSizeChange = (value: number[]) => {
    setBoardSize(value[0]);
  };

  // Çözümü bulma işlevi
  const handleSolve = () => {
    setIsRunning(true);

    // Büyük boyutlar için performans için setTimeout kullan
    setTimeout(() => {
      try {
        const foundSolutions = solveNQueens(boardSize);
        setSolutions(foundSolutions);
        setCurrentSolutionIndex(0);
      } catch (error) {
        console.error('Algoritma çalıştırılırken hata:', error);
        alert('Algoritma çalıştırma hatası!');
      } finally {
        setIsRunning(false);
      }
    }, 0);
  };

  return (
    <div className="space-y-12">
      <AlgorithmExplanation
        title="N-Queens Problemi (Geri İzleme Algoritması)"
        description="N-Queens problemi, n×n boyutundaki bir satranç tahtasına n adet veziri, hiçbirinin birbirini tehdit etmeyecek şekilde yerleştirme sorunudur. Vezirler, yatay, dikey ve çapraz yönlerde hareket edebildiği için, aynı satır, sütun veya çaprazda başka bir vezir olmamalıdır. Bu problem, geri izleme (backtracking) algoritmasının klasik bir uygulamasıdır."
        timeComplexity={{
          best: 'O(n!)',
          average: 'O(n!)',
          worst: 'O(n!)',
        }}
        spaceComplexity="O(n²)"
        advantages={[
          'Her boyuttaki satranç tahtasındaki tüm olası çözümleri bulabilir',
          'Çözümü olmayan durumları etkili bir şekilde tespit eder',
          'Geri izleme yaklaşımı sayesinde, geçersiz dal keşfedildiği an bu daldan vazgeçer',
          'Çözüm alanını sistematik olarak araştırır',
        ]}
        disadvantages={[
          'Üstel zaman karmaşıklığına sahiptir (O(n!)), bu da büyük n değerleri için işlemleri yavaşlatır',
          'Tahta boyutu arttıkça çözüm sayısı hızla artar, bu da hesaplama süresini uzatır',
          'Tüm çözümleri bulmak gerekliyse, bu faktöriyel karmaşıklık kaçınılmazdır',
          'Büyük değerler için bellek kısıtlamaları olabilir',
        ]}
        pseudocode={pseudocode}
        applications={[
          'Satranç yapay zekası ve satranç bulmacaları',
          'Kaynak tahsisi ve çizelgeleme problemleri',
          'Geri izleme tekniğini gösteren eğitimsel bir örnek',
          'Paralel ve dağıtık sistemlerde yük dengeleme',
          'Desen tanıma ve geometrik düzenleme problemleri',
          'Yapay zeka ve bilgisayar bilimi algoritmalarını öğrenmek için kullanılan örnek problem',
        ]}
      />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Demo</h2>
        <p className="text-muted-foreground">
          N-Queens probleminin çözümünü görmek için satranç tahtası boyutunu
          ayarlayın. Düşük değerler için çözümü hızlıca görebilirsiniz. (Not: n
          ≥ 9 için hesaplama zaman alabilir.)
        </p>

        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="board-size">Tahta Boyutu (n): {boardSize}</Label>
              <div className="w-64">
                <Slider
                  id="board-size"
                  min={1}
                  max={10}
                  step={1}
                  value={[boardSize]}
                  onValueChange={handleBoardSizeChange}
                  disabled={isRunning}
                />
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              n = 1 için 1 çözüm, n = 4 için 2 çözüm, n = 8 için 92 çözüm
              vardır. n = 2 ve n = 3 için çözüm yoktur.
            </p>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              Bulunan Çözüm Sayısı: {solutions.length}
            </span>
            <Button onClick={handleSolve} disabled={isRunning}>
              {isRunning ? 'Hesaplanıyor...' : 'Yeniden Hesapla'}
            </Button>
          </div>

          <div className="flex justify-center py-4">
            <SolutionsViewer
              solutions={solutions}
              currentIndex={currentSolutionIndex}
              onChangeIndex={setCurrentSolutionIndex}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Kod Örnekleri</h2>
        <p className="text-muted-foreground">
          N-Queens problemi için geri izleme algoritmasının farklı programlama
          dillerindeki implementasyonları.
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
              title="N-Queens Problemi - TypeScript"
            />
          </TabsContent>
          <TabsContent value="python">
            <CodeBlock
              code={implementations.python}
              language="python"
              title="N-Queens Problemi - Python"
            />
          </TabsContent>
          <TabsContent value="java">
            <CodeBlock
              code={implementations.java}
              language="java"
              title="N-Queens Problemi - Java"
            />
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Algoritma Nasıl Çalışır?</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            N-Queens problemi, geri izleme (backtracking) algoritması kullanarak
            çözülür. Geri izleme, bir çözüm arama yöntemidir ve özellikle
            kısıtlama tabanlı problemlerde kullanılır.
          </p>

          <h3>Algoritmanın Çalışma Mantığı</h3>
          <ol>
            <li>
              <strong>Adım Adım İlerleme</strong>: Algoritma ilk satırdan
              başlayarak, her satıra bir vezir yerleştirir.
            </li>
            <li>
              <strong>Güvenlik Kontrolü</strong>: Her yerleştirme adımında, yeni
              vezirin diğer vezirleri tehdit edip etmediği kontrol edilir.
            </li>
            <li>
              <strong>Derinleştirme</strong>: Eğer yerleştirme güvenliyse,
              algoritma bir sonraki satıra geçer.
            </li>
            <li>
              <strong>Geri Adım</strong>: Eğer mevcut konfigürasyon bir çözüme
              götürmüyorsa (yani sonraki satırlara güvenli yerleştirme
              yapılamıyorsa), algoritma bir önceki adıma döner ve farklı bir
              yerleştirme dener.
            </li>
            <li>
              <strong>Çözüm Bulma</strong>: Tüm vezirler yerleştirildiğinde
              (yani son satıra da vezir yerleştirildiğinde), bir çözüm bulunmuş
              demektir.
            </li>
          </ol>

          <h3>Güvenlik Kontrolü Mantığı</h3>
          <p>
            N-Queens probleminde bir yerleştirmenin güvenli olması için üç koşul
            sağlanmalıdır:
          </p>
          <ul>
            <li>
              <strong>Satır Kontrolü</strong>: Her satıra tam olarak bir vezir
              yerleştirildiğinden, aynı satırda iki vezir olamaz.
            </li>
            <li>
              <strong>Sütun Kontrolü</strong>: Aynı sütunda birden fazla vezir
              olmamalıdır.
            </li>
            <li>
              <strong>Çapraz Kontrol</strong>: Vezirlerin birbirlerini çapraz
              olarak tehdit etmemeleri için, çaprazlarda başka vezir
              olmamalıdır.
            </li>
          </ul>

          <h3>Optimizasyon Teknikleri</h3>
          <p>
            N-Queens problemi için daha verimli çözümler elde etmek için
            kullanılabilecek bazı teknikler:
          </p>
          <ul>
            <li>
              <strong>Simetri Kullanma</strong>: Satranç tahtasının simetrik
              özelliklerinden faydalanarak arama uzayını küçültme.
            </li>
            <li>
              <strong>Bit Manipülasyonu</strong>: Vezir yerleşimlerini ve
              çatışma kontrollerini bit işlemleriyle hızlandırma.
            </li>
            <li>
              <strong>Kısıt Programlama</strong>: Problemi kısıt programlama
              yaklaşımı ile formüle etme ve çözme.
            </li>
            <li>
              <strong>Paralel Hesaplama</strong>: Büyük n değerleri için farklı
              arama dallarını paralel olarak işleme.
            </li>
          </ul>

          <h3>İlginç Özellikler</h3>
          <p>N-Queens problemi şu ilginç özelliklere sahiptir:</p>
          <ul>
            <li>n = 1 için 1 çözüm vardır (1x1 tahtada 1 vezir).</li>
            <li>
              n = 2 ve n = 3 için hiçbir çözüm yoktur (iki veya üç veziri tehdit
              etmeden yerleştirmek imkansızdır).
            </li>
            <li>n ≥ 4 için ise en az bir çözüm her zaman vardır.</li>
            <li>n = 8 için 92 farklı çözüm vardır.</li>
            <li>n = 9 için 352 çözüm, n = 10 için 724 çözüm vardır.</li>
            <li>Çözüm sayısı n değeri arttıkça hızla artmaktadır.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
