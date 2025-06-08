'use client';

import React from 'react';

import { CodeBlock } from '@/components/common/code-block';
import { TreeVisualizer } from '@/components/common/tree-visualizer';
import { AlgorithmExplanation } from '@/components/common/explanation';
import { InteractiveDemo } from '@/components/common/interactive-demo';

interface TrieSearchDemoInput {
  toString(): string;
}

interface TrieStatistics {
  nodeCount: number;
  maxDepth: number;
  totalWords: number;
  totalPaths: number;
  avgDepth: number;
}

interface TrieInterface {
  insert(word: string): void;
  getWordCount(): number;
  getAllWords(): string[];
  getStatistics?(): TrieStatistics;
}

interface TrieSearchDemoResult {
  addedWords: string[];
  totalWords: number;
  allWords: string[];
  statistics: TrieStatistics | null;
}

interface PrefixSearchDemoInput {
  toString(): string;
}

interface PrefixSearchResult {
  prefix: string;
  hasPrefix: boolean;
  matchingWords: string[];
  suggestions: string[];
}

interface TrieWithPrefixMethods extends TrieInterface {
  startsWith(prefix: string): boolean;
  getWordsWithPrefix?(prefix: string): string[];
  getAutocompleteSuggestions?(prefix: string, maxSuggestions: number): string[];
}

export default function TrieDataStructurePage() {
  const algorithmData = {
    title: 'Trie (Prefix Tree) Veri Yapısı',
    description:
      'Trie, prefix tree olarak da bilinen, string verilerini verimli bir şekilde saklamak ve araştırmak için ' +
      'kullanılan ağaç benzeri bir veri yapısıdır. Her düğüm bir karakteri temsil eder ve kök düğümden ' +
      'yapraklara doğru giden yol bir string oluşturur.',
    timeComplexity: {
      best: 'O(m)',
      average: 'O(m)',
      worst: 'O(m)',
    },
    spaceComplexity: 'O(ALPHABET_SIZE × N × M)',
    advantages: [
      'String arama işlemleri çok hızlıdır (O(m) - string uzunluğu)',
      'Prefix tabanlı aramalar için idealdir (autocomplete)',
      'Longest common prefix bulma işlemleri etkilidir',
      'String sorting işlemlerinde kullanılabilir',
      'Dictionary ve spell checker uygulamaları için mükemmeldir',
    ],
    disadvantages: [
      'Yüksek bellek tüketimi (her düğüm için alphabet boyutu kadar pointer)',
      'Cache locality performance düşük olabilir',
      "Küçük dataset'lerde hash table'dan yavaş olabilir",
      "Implementation karmaşıklığı hash table'dan fazladır",
    ],
    pseudocode: `// Trie Node yapısı
class TrieNode:
    children = new Map()  // Character -> TrieNode mapping
    isEndOfWord = false
    value = null         // Opsiyonel: tam kelimeyi saklamak için

// Trie implementasyonu
class Trie:
    root = new TrieNode()
    
    function insert(word):
        current = root
        for char in word:
            if char not in current.children:
                current.children[char] = new TrieNode()
            current = current.children[char]
        current.isEndOfWord = true
        current.value = word
    
    function search(word):
        current = root
        for char in word:
            if char not in current.children:
                return false
            current = current.children[char]
        return current.isEndOfWord
    
    function startsWith(prefix):
        current = root
        for char in prefix:
            if char not in current.children:
                return false
            current = current.children[char]
        return true`,
    applications: [
      'Autocomplete ve type-ahead functionality',
      'Spell checkers ve word suggestion systems',
      'IP routing tables (longest prefix matching)',
      'Compiler design (keyword recognition)',
      'DNA sequence analysis ve bioinformatics',
      'Text compression algorithms',
      'Search engines ve indexing systems',
    ],
  };

  const trieImplementation = `// Trie (Prefix Tree) JavaScript implementasyonu
class TrieNode {
  constructor() {
    // Her düğüm için karakter-düğüm eşlemesi
    this.children = new Map();
    // Bu düğümde bir kelime bitip bitmediğini belirten flag
    this.isEndOfWord = false;
    // Opsiyonel: kelimenin kendisini saklamak için
    this.value = null;
    // Opsiyonel: kelime sayısını takip etmek için
    this.count = 0;
  }
}

class Trie {
  constructor() {
    // Kök düğüm - boş karakter temsil eder
    this.root = new TrieNode();
    // Toplam benzersiz kelime sayısı
    this.wordCount = 0;
  }

  // Yeni kelime ekleme işlemi - O(m) zaman karmaşıklığı
  insert(word) {
    if (!word || word.length === 0) return;

    let currentNode = this.root;
    const normalizedWord = word.toLowerCase();

    // Her karakter için düğüm oluştur veya mevcut düğüme git
    for (const char of normalizedWord) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode());
      }
      currentNode = currentNode.children.get(char);
    }

    // Kelime sonu işaretleme ve sayaç güncelleme
    if (!currentNode.isEndOfWord) {
      this.wordCount++;
    }
    currentNode.isEndOfWord = true;
    currentNode.value = word;
    currentNode.count = (currentNode.count || 0) + 1;
  }

  // Kelime arama işlemi - O(m) zaman karmaşıklığı
  search(word) {
    if (!word || word.length === 0) return false;

    const node = this.findNode(word.toLowerCase());
    return node !== null && node.isEndOfWord;
  }

  // Prefix varlığı kontrolü - O(m) zaman karmaşıklığı
  startsWith(prefix) {
    if (!prefix || prefix.length === 0) return true;

    return this.findNode(prefix.toLowerCase()) !== null;
  }

  // Belirli prefix ile başlayan tüm kelimeleri bulma
  getWordsWithPrefix(prefix) {
    const words = [];
    const prefixNode = this.findNode(prefix.toLowerCase());

    if (prefixNode) {
      this.collectWords(prefixNode, prefix.toLowerCase(), words);
    }

    return words;
  }

  // Autocomplete öneriler - en çok kullanılan kelimeler öncelikli
  getAutocompleteSuggestions(prefix, maxSuggestions = 10) {
    const words = this.getWordsWithPrefix(prefix);
    
    // Count'a göre sırala ve en çok kullanılanları döndür
    return words
      .map(word => ({
        word,
        count: this.getWordCount(word)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, maxSuggestions)
      .map(item => item.word);
  }

  // Kelime silme işlemi - O(m) zaman karmaşıklığı
  delete(word) {
    if (!word || word.length === 0) return false;

    return this.deleteHelper(this.root, word.toLowerCase(), 0);
  }

  // Trie'daki tüm kelimeleri alma
  getAllWords() {
    const words = [];
    this.collectWords(this.root, '', words);
    return words;
  }

  // Toplam benzersiz kelime sayısını döndürme
  getWordCount() {
    return this.wordCount;
  }

  // Belirli bir kelimenin kaç kez eklendiğini öğrenme
  getWordFrequency(word) {
    const node = this.findNode(word.toLowerCase());
    return node && node.isEndOfWord ? node.count : 0;
  }

  // En uzun ortak prefix bulma
  getLongestCommonPrefix() {
    let current = this.root;
    let prefix = '';

    // Tek bir çocuk varsa ve kelime sonu değilse devam et
    while (current.children.size === 1 && !current.isEndOfWord) {
      const char = Array.from(current.children.keys())[0];
      prefix += char;
      current = current.children.get(char);
    }

    return prefix;
  }

  // Trie'ın istatistiklerini döndürme
  getStatistics() {
    let nodeCount = 0;
    let maxDepth = 0;
    let totalPaths = 0;

    const traverse = (node, depth) => {
      nodeCount++;
      maxDepth = Math.max(maxDepth, depth);
      
      if (node.isEndOfWord) {
        totalPaths++;
      }

      for (const child of node.children.values()) {
        traverse(child, depth + 1);
      }
    };

    traverse(this.root, 0);

    return {
      nodeCount,
      maxDepth,
      totalWords: this.wordCount,
      totalPaths,
      avgDepth: totalPaths > 0 ? maxDepth / totalPaths : 0
    };
  }

  // Yardımcı metod: belirli kelime/prefix için düğüm bulma
  findNode(word) {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return null;
      }
      currentNode = currentNode.children.get(char);
    }

    return currentNode;
  }

  // Belirli düğümden başlayarak tüm kelimeleri toplama
  collectWords(node, prefix, words) {
    if (node.isEndOfWord && node.value) {
      words.push(node.value);
    }

    // Tüm çocukları dolaş ve kelimeleri topla
    node.children.forEach((childNode, char) => {
      this.collectWords(childNode, prefix + char, words);
    });
  }

  // Rekursif silme yardımcı metodu
  deleteHelper(node, word, index) {
    if (index === word.length) {
      // Kelimenin sonuna ulaştık
      if (!node.isEndOfWord) {
        return false; // Kelime mevcut değil
      }

      node.isEndOfWord = false;
      node.value = null;
      this.wordCount--;

      // Düğümün çocuğu yoksa silinebilir
      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);

    if (!childNode) {
      return false; // Kelime mevcut değil
    }

    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

    // Çocuk düğümü silinmeli mi kontrol et
    if (shouldDeleteChild) {
      node.children.delete(char);
      // Mevcut düğüm de silinebilir mi kontrol et
      return !node.isEndOfWord && node.children.size === 0;
    }

    return false;
  }

  // Belirli kelimenin count değerini döndürme
  getWordCount(word) {
    const node = this.findNode(word.toLowerCase());
    return node && node.isEndOfWord ? node.count : 0;
  }
}

// Kullanım örneği ve test
const trie = new Trie();

// Kelime ekleme
const words = ['cat', 'cats', 'car', 'card', 'care', 'careful', 'cars', 'carry'];
words.forEach(word => trie.insert(word));

// Arama işlemleri
console.log('Search "car":', trie.search('car')); // true
console.log('Search "care":', trie.search('care')); // true
console.log('Search "caring":', trie.search('caring')); // false

// Prefix kontrolü
console.log('StartsWith "car":', trie.startsWith('car')); // true
console.log('StartsWith "dog":', trie.startsWith('dog')); // false

// Autocomplete
console.log('Words with prefix "car":', trie.getWordsWithPrefix('car'));
// ['car', 'card', 'care', 'careful', 'cars', 'carry']

// İstatistikler
console.log('Trie statistics:', trie.getStatistics());`;

  const prefixSearchDemo = (input: PrefixSearchDemoInput): string => {
    const prefix: string = input.toString().trim();

    if (!prefix) {
      return 'Lütfen bir prefix girin';
    }

    const sampleWords: string[] = [
      'cat',
      'cats',
      'car',
      'card',
      'care',
      'careful',
      'carry',
      'dog',
      'dogs',
      'door',
    ];
    const trie: TrieWithPrefixMethods =
      new (require('@/lib/algorithms/data-structures').Trie)();

    sampleWords.forEach((word: string) => trie.insert(word));

    const result: PrefixSearchResult = {
      prefix: prefix,
      hasPrefix: trie.startsWith(prefix),
      matchingWords: trie.getWordsWithPrefix
        ? trie.getWordsWithPrefix(prefix)
        : [],
      suggestions: trie.getAutocompleteSuggestions
        ? trie.getAutocompleteSuggestions(prefix, 5)
        : [],
    };

    return JSON.stringify(result, null, 2);
  };

  const trieSearchDemo = (input: TrieSearchDemoInput): string => {
    const words: string[] = input
      .toString()
      .split(',')
      .map((word: string) => word.trim())
      .filter((word: string) => word.length > 0);

    if (words.length === 0) {
      return 'Lütfen virgülle ayrılmış kelimeler girin (örn: cat,car,card)';
    }

    const trie: TrieInterface =
      new (require('@/lib/algorithms/data-structures').Trie)();

    // Kelimeleri trie'a ekle
    words.forEach((word: string) => trie.insert(word));

    const result: TrieSearchDemoResult = {
      addedWords: words,
      totalWords: trie.getWordCount(),
      allWords: trie.getAllWords(),
      statistics: trie.getStatistics ? trie.getStatistics() : null,
    };

    return JSON.stringify(result, null, 2);
  };

  return (
    <div className="space-y-8">
      <AlgorithmExplanation {...algorithmData} />

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">İnteraktif Trie Görselleştirme</h2>
        <p className="text-muted-foreground">
          Aşağıdaki görselleştirici ile Trie veri yapısını keşfedebilirsiniz.
          Kelimeler ekleyin, silin ve prefix tabanlı arama işlemlerini test
          edin.
        </p>
        <TreeVisualizer
          treeType="trie"
          initialData={[
            'cat',
            'car',
            'card',
            'care',
            'careful',
            'cats',
            'dog',
            'dogs',
          ]}
          showControls={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InteractiveDemo
          title="Trie Oluşturma Demo"
          description="Virgülle ayrılmış kelimeler girerek Trie oluşturun"
          algorithmFunction={trieSearchDemo}
          inputPlaceholder="cat,car,card,care,careful"
          inputType="text"
        />

        <InteractiveDemo
          title="Prefix Arama Demo"
          description="Belirli prefix ile başlayan kelimeleri bulun"
          algorithmFunction={prefixSearchDemo}
          inputPlaceholder="car"
          inputType="text"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">JavaScript Implementasyonu</h2>
        <p className="text-muted-foreground">
          Trie veri yapısının tam JavaScript implementasyonu. Autocomplete,
          prefix arama ve istatistik hesaplama özellikleri içerir.
        </p>
        <CodeBlock
          code={trieImplementation}
          language="javascript"
          showLineNumbers={true}
          title="Trie Data Structure - Tam Implementasyon"
        />
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4">
          Trie vs Hash Table Performans Karşılaştırması
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-green-600 mb-3">
              Trie Advantages
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Prefix Operations:</strong> O(m) - çok hızlı
              </div>
              <div>
                <strong>Autocomplete:</strong> Doğal destek
              </div>
              <div>
                <strong>Longest Common Prefix:</strong> Etkili
              </div>
              <div>
                <strong>Memory Usage:</strong> Ortak prefix'ler optimize
              </div>
              <div>
                <strong>Sorted Output:</strong> Doğal olarak sıralı
              </div>
            </div>
          </div>
          <div className="bg-background p-4 rounded">
            <h4 className="font-semibold text-blue-600 mb-3">
              Hash Table Advantages
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Simple Operations:</strong> O(1) average case
              </div>
              <div>
                <strong>Memory Efficiency:</strong> Düşük overhead
              </div>
              <div>
                <strong>Implementation:</strong> Daha basit
              </div>
              <div>
                <strong>Cache Performance:</strong> Daha iyi locality
              </div>
              <div>
                <strong>General Purpose:</strong> Her türlü key için
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">
          Trie Optimizasyon Teknikleri
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Bellek Optimizasyonu
              </h4>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Compressed Trie:</strong> Tek çocuklu düğümleri
                  birleştir
                </li>
                <li>
                  • <strong>Radix Tree:</strong> Edge compression uygula
                </li>
                <li>
                  • <strong>Patricia Tree:</strong> Binary radix tree kullan
                </li>
                <li>
                  • <strong>Ternary Search Tree:</strong> 3-way branching
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded">
              <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
                Performans Optimizasyonu
              </h4>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Array-based Storage:</strong> Map yerine array
                  kullan
                </li>
                <li>
                  • <strong>Cache-friendly Layout:</strong> Düğümleri sıralı
                  yerleştir
                </li>
                <li>
                  • <strong>Lazy Evaluation:</strong> Gereksiz computation'ları
                  ertele
                </li>
                <li>
                  • <strong>Parallel Operations:</strong> Thread-safe
                  implementasyon
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-200">
          Gerçek Dünya Uygulamaları ve Örnekler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Web ve Mobil Uygulamalar
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Google Search:</strong> Autocomplete suggestions
              </li>
              <li>
                • <strong>IDE'ler:</strong> Code completion ve IntelliSense
              </li>
              <li>
                • <strong>Sosyal Medya:</strong> Hashtag ve mention suggestions
              </li>
              <li>
                • <strong>E-ticaret:</strong> Product search autocomplete
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-700 dark:text-green-300 mb-2">
              Sistem ve Network Uygulamaları
            </h4>
            <ul className="text-sm space-y-1">
              <li>
                • <strong>Router Tables:</strong> IP address longest prefix
                matching
              </li>
              <li>
                • <strong>DNS Resolution:</strong> Domain name lookup
                optimization
              </li>
              <li>
                • <strong>Compiler Design:</strong> Keyword recognition ve
                lexical analysis
              </li>
              <li>
                • <strong>Spell Checkers:</strong> Dictionary lookup ve
                correction
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 dark:bg-purple-950/20 p-6 rounded-lg">
        <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-200">
          Trie Variations ve Alternatif Implementasyonlar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Compressed Trie (Radix Tree)
            </h4>
            <p className="text-sm">
              Tek çocuklu düğümleri birleştirerek bellek kullanımını optimize
              eder. Suffix tree'lerin temelini oluşturur.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Ternary Search Tree
            </h4>
            <p className="text-sm">
              Binary search tree'nin string'ler için adaptasyonu. Daha az bellek
              kullanır ama biraz daha yavaştır.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded">
            <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Suffix Tree
            </h4>
            <p className="text-sm">
              Bir string'in tüm suffix'lerini içeren compressed trie. Pattern
              matching ve string analysis için kullanılır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
