'use client';

import React, { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { Search, Filter, Code, Copy, Check } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/common/code-block';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Code example interface
interface CodeExample {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Kolay' | 'Orta' | 'Zor';
  tags: string[];
  implementations: {
    [key: string]: {
      code: string;
      explanation?: string;
    };
  };
}

export default function CodeExamplesPage() {
  // State variables
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExamples, setFilteredExamples] = useState<CodeExample[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Language options
  const languageOptions = ['typescript', 'python', 'java'];

  // All code examples data
  const codeExamples: CodeExample[] = [
    {
      id: 'bubble-sort',
      name: 'Bubble Sort',
      description:
        'Her adımda komşu elemanları karşılaştırarak ve gerekirse değiştirerek çalışan basit bir sıralama algoritması.',
      category: 'Sıralama Algoritmaları',
      difficulty: 'Kolay',
      tags: ['sıralama', 'karşılaştırma-temelli', 'in-place'],
      implementations: {
        typescript: {
          code: `// Bubble sort algoritma implementasyonu
export function bubbleSort(arr: number[]): number[] {
  // Dizinin bir kopyasını oluştur
  const result = [...arr];
  const n = result.length;

  // Dış döngü - her geçişte en az bir eleman sıralanır
  for (let i = 0; i < n - 1; i++) {
    // İç döngü - her geçişte elemanları karşılaştır
    for (let j = 0; j < n - i - 1; j++) {
      // Mevcut eleman bir sonrakinden büyükse, yerlerini değiştir
      if (result[j] > result[j + 1]) {
        // Destructuring assignment ile yer değiştirme
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
}`,
          explanation:
            'Bubble Sort, her adımda komşu elemanları karşılaştırıp gerektiğinde yerlerini değiştirerek çalışır. Bu süreç, en büyük elemanların sona taşınmasıyla sonuçlanır. Her geçişte, en azından bir eleman doğru pozisyona yerleşir. En kötü ve ortalama durumda O(n²) zaman karmaşıklığına sahiptir.',
        },
        python: {
          code: `def bubble_sort(arr):
    """
    Bubble Sort algoritması ile bir listeyi sıralar.
    
    Args:
        arr: Sıralanacak liste
        
    Returns:
        Sıralanmış liste
    """
    # Listenin bir kopyasını oluştur
    result = arr.copy()
    n = len(result)
    
    # Dış döngü - her geçişte en az bir eleman sıralanır
    for i in range(n - 1):
        # İç döngü - her geçişte elemanları karşılaştır
        for j in range(0, n - i - 1):
            # Mevcut eleman bir sonrakinden büyükse, yerlerini değiştir
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                
    return result`,
          explanation:
            "Python implementasyonu, fonksiyonel ve açıklayıcıdır. Orijinal diziyi değiştirmemek için bir kopya oluşturur ve standart Python syntax'ını kullanarak elemanların yerlerini değiştirir.",
        },
        java: {
          code: `/**
 * Bubble Sort algorithm implementation
 */
public class BubbleSort {
    
    /**
     * Sorts an array using Bubble Sort algorithm
     * 
     * @param arr The array to be sorted
     * @return The sorted array
     */
    public static int[] bubbleSort(int[] arr) {
        // Create a copy of the input array
        int[] result = arr.clone();
        int n = result.length;
        
        // Outer loop - each pass places at least one element
        for (int i = 0; i < n - 1; i++) {
            // Inner loop - compare adjacent elements
            for (int j = 0; j < n - i - 1; j++) {
                // If current element is greater than the next one, swap them
                if (result[j] > result[j + 1]) {
                    // Swap elements
                    int temp = result[j];
                    result[j] = result[j + 1];
                    result[j + 1] = temp;
                }
            }
        }
        
        return result;
    }
}`,
          // Continuing the code examples page...
          explanation:
            'Java implementasyonu, sınıf yapısı içinde statik bir metot olarak tanımlanmıştır. Tip güvenliği ve açıklayıcı yorum satırları, kodu anlaşılır kılmaktadır. Daha verimli bir kod için erken çıkış optimizasyonu da eklenebilir.',
        },
      },
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      description:
        'Sıralı dizilerde, her adımda arama alanını yarıya bölerek logaritmik zamanda arama yapan algoritma.',
      category: 'Arama Algoritmaları',
      difficulty: 'Orta',
      tags: ['arama', 'sıralı-dizi', 'logaritmik'],
      implementations: {
        typescript: {
          code: `/**
 * Sıralı bir dizide ikili arama algoritması
 * 
 * @param arr Arama yapılacak sıralı dizi
 * @param target Aranan değer
 * @returns Hedef değerin indeksi veya bulunamazsa -1
 */
export function binarySearch(arr: number[], target: number): number {
  // Başlangıç ve bitiş indekslerini ayarla
  let left = 0;
  let right = arr.length - 1;
  
  // Arama alanı var oldukça devam et
  while (left <= right) {
    // Orta noktayı bul (taşma olmadan)
    const mid = left + Math.floor((right - left) / 2);
    
    // Hedef bulundu mu?
    if (arr[mid] === target) {
      return mid;
    }
    
    // Sol yarıyı ara
    if (arr[mid] > target) {
      right = mid - 1;
    } 
    // Sağ yarıyı ara
    else {
      left = mid + 1;
    }
  }
  
  // Hedef bulunamadı
  return -1;
}`,
          explanation:
            "Binary Search, sıralı bir dizide logaritmik zaman karmaşıklığında (O(log n)) arama yapar. Her adımda, arama alanını yarıya bölerek hedefin hangi yarıda olabileceğine karar verir. Bu, linear search'e göre çok daha verimlidir, özellikle büyük veri setlerinde.",
        },
        python: {
          code: `def binary_search(arr, target):
    """
    Sıralı bir dizide ikili arama algoritması
    
    Args:
        arr: Arama yapılacak sıralı dizi
        target: Aranan değer
        
    Returns:
        Hedef değerin indeksi veya bulunamazsa -1
    """
    # Başlangıç ve bitiş indekslerini ayarla
    left, right = 0, len(arr) - 1
    
    # Arama alanı var oldukça devam et
    while left <= right:
        # Orta noktayı bul
        mid = left + (right - left) // 2
        
        # Hedef bulundu mu?
        if arr[mid] == target:
            return mid
            
        # Sol yarıyı ara
        if arr[mid] > target:
            right = mid - 1
        # Sağ yarıyı ara
        else:
            left = mid + 1
    
    # Hedef bulunamadı
    return -1`,
          explanation:
            'Python implementasyonu, kodun okunabilirliğini artıran açıklayıcı yorumlar ve dokümantasyon içerir. Integer bölme operatörü (//) kullanılarak taşma sorunları önlenir.',
        },
        java: {
          code: `/**
 * Binary Search algorithm implementation
 */
public class BinarySearch {
    
    /**
     * Searches for a target value in a sorted array
     * 
     * @param arr The sorted array to search in
     * @param target The value to search for
     * @return The index of the target or -1 if not found
     */
    public static int binarySearch(int[] arr, int target) {
        // Set initial bounds
        int left = 0;
        int right = arr.length - 1;
        
        // Continue as long as the search space exists
        while (left <= right) {
            // Find the middle point (prevent overflow)
            int mid = left + (right - left) / 2;
            
            // Check if target is found
            if (arr[mid] == target) {
                return mid;
            }
            
            // Search the left half
            if (arr[mid] > target) {
                right = mid - 1;
            }
            // Search the right half
            else {
                left = mid + 1;
            }
        }
        
        // Target not found
        return -1;
    }
}`,
          explanation:
            'Java implementasyonu, statik bir metot içinde tutulmuş ve kapsamlı yorum satırlarıyla açıklanmıştır. Taşma sorunlarını önlemek için güvenli bir orta nokta hesaplama yöntemi kullanılmıştır.',
        },
      },
    },
    {
      id: 'linked-list',
      name: 'Linked List',
      description:
        'Her düğümün veri ve bir sonraki düğüme referans içerdiği dinamik bir veri yapısı.',
      category: 'Veri Yapıları',
      difficulty: 'Orta',
      tags: ['veri-yapısı', 'bağlı-liste', 'dinamik'],
      implementations: {
        typescript: {
          code: `/**
 * Linked List düğümü sınıfı
 */
class ListNode<T> {
  value: T;
  next: ListNode<T> | null;
  
  constructor(value: T, next: ListNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
}

/**
 * Tek yönlü bağlı liste implementasyonu
 */
export class LinkedList<T> {
  private head: ListNode<T> | null;
  private size: number;
  
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  /**
   * Liste boyutunu döndürür
   */
  getSize(): number {
    return this.size;
  }
  
  /**
   * Liste boş mu kontrol eder
   */
  isEmpty(): boolean {
    return this.size === 0;
  }
  
  /**
   * Listenin başına eleman ekler
   */
  prepend(value: T): void {
    const newNode = new ListNode(value, this.head);
    this.head = newNode;
    this.size++;
  }
  
  /**
   * Listenin sonuna eleman ekler
   */
  append(value: T): void {
    const newNode = new ListNode(value);
    
    // Liste boşsa, yeni düğüm head olur
    if (!this.head) {
      this.head = newNode;
    } else {
      // Listenin sonuna git
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      // Son düğüme yeni düğümü bağla
      current.next = newNode;
    }
    
    this.size++;
  }
  
  /**
   * Belirli bir indeksteki elemanı bulur
   */
  get(index: number): T | null {
    // Geçersiz indeks kontrolü
    if (index < 0 || index >= this.size) {
      return null;
    }
    
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    
    return current ? current.value : null;
  }
  
  /**
   * Belirli bir indeksteki elemanı siler
   */
  removeAt(index: number): T | null {
    // Geçersiz indeks kontrolü
    if (index < 0 || index >= this.size || !this.head) {
      return null;
    }
    
    let removedValue: T;
    
    // Baştan silme
    if (index === 0) {
      removedValue = this.head.value;
      this.head = this.head.next;
    } else {
      // Silinecek düğümün öncesine git
      let current = this.head;
      for (let i = 0; i < index - 1 && current.next; i++) {
        current = current.next;
      }
      
      if (current.next) {
        removedValue = current.next.value;
        current.next = current.next.next;
      } else {
        return null;
      }
    }
    
    this.size--;
    return removedValue;
  }
  
  /**
   * Tüm listeyi diziye dönüştürür
   */
  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }
}`,
          explanation:
            "TypeScript'te jenerik bir sınıf olarak implementasyonu, tip güvenliği ve yeniden kullanılabilirlik sağlar. Bu implementasyon, temel bağlı liste operasyonlarını (ekleme, silme, erişim) içerir ve jenerik tip kullanarak farklı veri tipleriyle çalışabilir.",
        },
        python: {
          code: `class ListNode:
    """Linked List düğümü sınıfı"""
    def __init__(self, value, next=None):
        self.value = value
        self.next = next
        
class LinkedList:
    """Tek yönlü bağlı liste implementasyonu"""
    def __init__(self):
        self.head = None
        self.size = 0
        
    def get_size(self):
        """Liste boyutunu döndürür"""
        return self.size
        
    def is_empty(self):
        """Liste boş mu kontrol eder"""
        return self.size == 0
        
    def prepend(self, value):
        """Listenin başına eleman ekler"""
        self.head = ListNode(value, self.head)
        self.size += 1
        
    def append(self, value):
        """Listenin sonuna eleman ekler"""
        new_node = ListNode(value)
        
        # Liste boşsa, yeni düğüm head olur
        if self.head is None:
            self.head = new_node
        else:
            # Listenin sonuna git
            current = self.head
            while current.next:
                current = current.next
            # Son düğüme yeni düğümü bağla
            current.next = new_node
            
        self.size += 1
        
    def get(self, index):
        """Belirli bir indeksteki elemanı bulur"""
        # Geçersiz indeks kontrolü
        if index < 0 or index >= self.size:
            return None
            
        current = self.head
        for i in range(index):
            if current is None:
                return None
            current = current.next
            
        return current.value if current else None
        
    def remove_at(self, index):
        """Belirli bir indeksteki elemanı siler"""
        # Geçersiz indeks kontrolü
        if index < 0 or index >= self.size or self.head is None:
            return None
            
        # Baştan silme
        if index == 0:
            removed_value = self.head.value
            self.head = self.head.next
        else:
            # Silinecek düğümün öncesine git
            current = self.head
            for i in range(index - 1):
                if current.next is None:
                    return None
                current = current.next
                
            if current.next:
                removed_value = current.next.value
                current.next = current.next.next
            else:
                return None
                
        self.size -= 1
        return removed_value
        
    def to_list(self):
        """Tüm listeyi diziye dönüştürür"""
        result = []
        current = self.head
        
        while current:
            result.append(current.value)
            current = current.next
            
        return result`,
          explanation:
            "Python implementasyonu, doc-string'ler kullanarak her metodun amacını ve işlevini belirtmektedir. Pythonic yaklaşımla yazılmış, okuması ve anlaması kolay bir implementasyondur. None kontrolü, Python'un null değer yaklaşımına uygundur.",
        },
        java: {
          code: `/**
 * Linked List implementation in Java
 */
public class LinkedList<T> {
    
    /**
     * Node class for linked list
     */
    private class ListNode {
        T value;
        ListNode next;
        
        public ListNode(T value) {
            this.value = value;
            this.next = null;
        }
        
        public ListNode(T value, ListNode next) {
            this.value = value;
            this.next = next;
        }
    }
    
    private ListNode head;
    private int size;
    
    /**
     * Constructor for LinkedList
     */
    public LinkedList() {
        this.head = null;
        this.size = 0;
    }
    
    /**
     * Returns the size of the list
     */
    public int getSize() {
        return size;
    }
    
    /**
     * Checks if the list is empty
     */
    public boolean isEmpty() {
        return size == 0;
    }
    
    /**
     * Adds an element to the beginning of the list
     */
    public void prepend(T value) {
        head = new ListNode(value, head);
        size++;
    }
    
    /**
     * Adds an element to the end of the list
     */
    public void append(T value) {
        ListNode newNode = new ListNode(value);
        
        // If the list is empty, the new node becomes the head
        if (head == null) {
            head = newNode;
        } else {
            // Go to the end of the list
            ListNode current = head;
            while (current.next != null) {
                current = current.next;
            }
            // Link the new node to the end
            current.next = newNode;
        }
        
        size++;
    }
    
    /**
     * Gets the element at a specific index
     */
    public T get(int index) {
        // Check for invalid index
        if (index < 0 || index >= size) {
            return null;
        }
        
        ListNode current = head;
        for (int i = 0; i < index && current != null; i++) {
            current = current.next;
        }
        
        return current != null ? current.value : null;
    }
    
    /**
     * Removes the element at a specific index
     */
    public T removeAt(int index) {
        // Check for invalid index
        if (index < 0 || index >= size || head == null) {
            return null;
        }
        
        T removedValue;
        
        // Remove from the beginning
        if (index == 0) {
            removedValue = head.value;
            head = head.next;
        } else {
            // Go to the node before the one to be removed
            ListNode current = head;
            for (int i = 0; i < index - 1 && current.next != null; i++) {
                current = current.next;
            }
            
            if (current.next != null) {
                removedValue = current.next.value;
                current.next = current.next.next;
            } else {
                return null;
            }
        }
        
        size--;
        return removedValue;
    }
    
    /**
     * Converts the list to an array
     */
    public Object[] toArray() {
        Object[] result = new Object[size];
        ListNode current = head;
        int index = 0;
        
        while (current != null) {
            result[index++] = current.value;
            current = current.next;
        }
        
        return result;
    }
}`,
          explanation:
            "Java implementasyonu, iç içe sınıf yapısını kullanarak düğüm tanımını kapsüllemektedir. Jenerik tip kullanımı sayesinde farklı veri tipleriyle çalışabilir. Java'nın tip sistemi ve nesne yönelimli özellikleri, güçlü bir kapsülleme sağlar.",
        },
      },
    },
    {
      id: 'dijkstra',
      name: 'Dijkstra Algorithm',
      description:
        'Bir düğümden diğer tüm düğümlere olan en kısa yolları bulan, ağırlıklı graflarda kullanılan algoritma.',
      category: 'Graf Algoritmaları',
      difficulty: 'Zor',
      tags: ['graf', 'en-kısa-yol', 'ağırlıklı-graf'],
      implementations: {
        typescript: {
          code: `/**
 * Dijkstra's algoritması implementasyonu
 * @param graph Ağırlıklı graf (komşuluk listesi)
 * @param startVertex Başlangıç düğümü
 * @returns En kısa mesafeler ve önceki düğümler
 */
export function dijkstra(
  graph: Record<string, Record<string, number>>,
  startVertex: string
): { distances: Record<string, number>; previousVertices: Record<string, string | null> } {
  // Tüm düğümleri al
  const vertices = Object.keys(graph);
  
  // Mesafeleri ve önceki düğümleri saklamak için objeler
  const distances: Record<string, number> = {};
  const previousVertices: Record<string, string | null> = {};
  // Ziyaret edilmemiş düğümleri takip etmek için set
  const unvisited = new Set<string>();
  
  // İlk durumu ayarla
  for (const vertex of vertices) {
    // Başlangıç düğümü dışındaki tüm düğümlerin mesafesi sonsuz
    distances[vertex] = vertex === startVertex ? 0 : Infinity;
    // Başlangıçta önceki düğüm null
    previousVertices[vertex] = null;
    // Tüm düğümleri ziyaret edilmemiş olarak işaretle
    unvisited.add(vertex);
  }
  
  // Ziyaret edilmemiş düğüm kaldığı sürece devam et
  while (unvisited.size > 0) {
    // En küçük mesafeye sahip ziyaret edilmemiş düğümü bul
    let currentVertex: string | null = null;
    let smallestDistance = Infinity;
    
    for (const vertex of unvisited) {
      if (distances[vertex] < smallestDistance) {
        smallestDistance = distances[vertex];
        currentVertex = vertex;
      }
    }
    
    // Tüm erişilebilir düğümler ziyaret edildiyse çık
    if (currentVertex === null || distances[currentVertex] === Infinity) {
      break;
    }
    
    // Mevcut düğümü ziyaret edildi olarak işaretle
    unvisited.delete(currentVertex);
    
    // Mevcut düğümün komşularını kontrol et
    for (const neighbor in graph[currentVertex]) {
      // Eğer komşu ziyaret edilmemişse
      if (unvisited.has(neighbor)) {
        // Mevcut düğüm üzerinden komşuya olan mesafeyi hesapla
        const distance = distances[currentVertex] + graph[currentVertex][neighbor];
        
        // Eğer yeni mesafe daha kısaysa, güncelle
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          previousVertices[neighbor] = currentVertex;
        }
      }
    }
  }
  
  return { distances, previousVertices };
}

/**
 * En kısa yolu yeniden oluşturur
 * @param previousVertices Önceki düğümler haritası
 * @param startVertex Başlangıç düğümü
 * @param endVertex Bitiş düğümü
 * @returns En kısa yol (düğüm dizisi)
 */
export function reconstructPath(
  previousVertices: Record<string, string | null>,
  startVertex: string,
  endVertex: string
): string[] {
  const path: string[] = [];
  let currentVertex: string | null = endVertex;
  
  // Yolu bitiş düğümünden başlangıç düğümüne doğru geri izle
  while (currentVertex !== null) {
    path.unshift(currentVertex);
    currentVertex = previousVertices[currentVertex];
  }
  
  // Eğer başlangıç düğümünden bitiş düğümüne bir yol yoksa boş dizi döndür
  return path[0] === startVertex ? path : [];
}`,
          explanation:
            'Bu TypeScript implementasyonu, graf veri yapısını komşuluk listesi olarak temsil eder. Algoritma, her adımda en küçük mesafeye sahip düğümü seçer ve komşularına olan mesafeleri günceller. Yol yeniden oluşturma fonksiyonu, en kısa yolu bitiş düğümünden başlangıç düğümüne doğru geri izleyerek bulur.',
        },
        python: {
          code: `import heapq

def dijkstra(graph, start_vertex):
    """
    Dijkstra'nın en kısa yol algoritması
    
    Args:
        graph: Ağırlıklı graf (komşuluk listesi olarak) - {vertex: {neighbor: weight}}
        start_vertex: Başlangıç düğümü
        
    Returns:
        distances: Her düğüme olan en kısa mesafeler
        previous_vertices: Her düğüme olan en kısa yolda bir önceki düğüm
    """
    # Tüm düğümleri al
    vertices = list(graph.keys())
    
    # Mesafeleri ve önceki düğümleri saklamak için sözlükler
    distances = {vertex: float('infinity') for vertex in vertices}
    distances[start_vertex] = 0
    previous_vertices = {vertex: None for vertex in vertices}
    
    # Öncelik kuyruğu (min heap)
    priority_queue = [(0, start_vertex)]
    
    # Ziyaret edilmiş düğümleri takip etmek için küme
    visited = set()
    
    while priority_queue:
        # En küçük mesafeye sahip düğümü al
        current_distance, current_vertex = heapq.heappop(priority_queue)
        
        # Eğer düğüm zaten ziyaret edildiyse atla
        if current_vertex in visited:
            continue
            
        # Düğümü ziyaret edildi olarak işaretle
        visited.add(current_vertex)
        
        # Eğer mevcut mesafe, kayıtlı mesafeden büyükse atla
        if current_distance > distances[current_vertex]:
            continue
            
        # Komşuları kontrol et
        for neighbor, weight in graph[current_vertex].items():
            # Eğer komşu ziyaret edilmemişse
            if neighbor not in visited:
                # Yeni mesafeyi hesapla
                distance = current_distance + weight
                
                # Eğer yeni mesafe daha kısaysa, güncelle
                if distance < distances[neighbor]:
                    distances[neighbor] = distance
                    previous_vertices[neighbor] = current_vertex
                    heapq.heappush(priority_queue, (distance, neighbor))
    
    return distances, previous_vertices

def reconstruct_path(previous_vertices, start_vertex, end_vertex):
    """
    En kısa yolu yeniden oluşturur
    
    Args:
        previous_vertices: Her düğüme olan en kısa yolda bir önceki düğüm
        start_vertex: Başlangıç düğümü
        end_vertex: Bitiş düğümü
        
    Returns:
        En kısa yol (düğüm listesi)
    """
    path = []
    current_vertex = end_vertex
    
    # Yolu bitiş düğümünden başlangıç düğümüne doğru geri izle
    while current_vertex is not None:
        path.append(current_vertex)
        current_vertex = previous_vertices[current_vertex]
        
    # Yolu tersine çevir
    path.reverse()
    
    # Eğer başlangıç düğümünden bitiş düğümüne bir yol yoksa boş liste döndür
    return path if path and path[0] == start_vertex else []`,
          explanation:
            'Python implementasyonu, heapq modülünün öncelik kuyruğunu (min-heap) kullanarak verimliliği artırır. Bu, her adımda en küçük mesafeye sahip düğümü O(log n) sürede bulmayı sağlar. Ayrıca, ziyaret edilmiş düğümleri takip eden bir küme kullanarak gereksiz işlemleri önler.',
        },
        java: {
          code: `import java.util.*;

/**
 * Dijkstra's Algorithm implementation
 */
public class Dijkstra {
    
    /**
     * Finds the shortest paths from a start vertex to all other vertices
     * 
     * @param graph The weighted graph as an adjacency map
     * @param startVertex The starting vertex
     * @return A map of distances and a map of previous vertices
     */
    public static Map<String, Object> dijkstra(
            Map<String, Map<String, Integer>> graph, 
            String startVertex) {
        
        // Get all vertices
        Set<String> vertices = graph.keySet();
        
        // Maps to store distances and previous vertices
        Map<String, Integer> distances = new HashMap<>();
        Map<String, String> previousVertices = new HashMap<>();
        
        // Priority queue to get the vertex with the smallest distance
        PriorityQueue<Map.Entry<String, Integer>> priorityQueue = 
            new PriorityQueue<>(Comparator.comparing(Map.Entry::getValue));
            
        // Set for visited vertices
        Set<String> visited = new HashSet<>();
        
        // Initialize distances and previous vertices
        for (String vertex : vertices) {
            // Set all distances to infinity except the start vertex
            distances.put(vertex, vertex.equals(startVertex) ? 0 : Integer.MAX_VALUE);
            // Set all previous vertices to null
            previousVertices.put(vertex, null);
        }
        
        // Add the start vertex to the priority queue
        priorityQueue.add(new AbstractMap.SimpleEntry<>(startVertex, 0));
        
        // Continue until the priority queue is empty
        while (!priorityQueue.isEmpty()) {
            // Get the vertex with the smallest distance
            Map.Entry<String, Integer> entry = priorityQueue.poll();
            String currentVertex = entry.getKey();
            int currentDistance = entry.getValue();
            
            // Skip if already visited
            if (visited.contains(currentVertex)) {
                continue;
            }
            
            // Mark as visited
            visited.add(currentVertex);
            
            // Skip if the current distance is greater than the recorded distance
            if (currentDistance > distances.get(currentVertex)) {
                continue;
            }
            
            // Check all neighbors
            Map<String, Integer> neighbors = graph.get(currentVertex);
            if (neighbors != null) {
                for (Map.Entry<String, Integer> neighborEntry : neighbors.entrySet()) {
                    String neighbor = neighborEntry.getKey();
                    int weight = neighborEntry.getValue();
                    
                    // Skip if already visited
                    if (visited.contains(neighbor)) {
                        continue;
                    }
                    
                    // Calculate new distance
                    int distance = currentDistance + weight;
                    
                    // Update if the new distance is shorter
                    if (distance < distances.get(neighbor)) {
                        distances.put(neighbor, distance);
                        previousVertices.put(neighbor, currentVertex);
                        priorityQueue.add(new AbstractMap.SimpleEntry<>(neighbor, distance));
                    }
                }
            }
        }
        
        // Return both distances and previous vertices
        Map<String, Object> result = new HashMap<>();
        result.put("distances", distances);
        result.put("previousVertices", previousVertices);
        
        return result;
    }
    
    /**
     * Reconstructs the shortest path from start to end
     * 
     * @param previousVertices Map of previous vertices
     * @param startVertex The starting vertex
     * @param endVertex The ending vertex
     * @return The shortest path as a list of vertices
     */
    public static List<String> reconstructPath(
            Map<String, String> previousVertices,
            String startVertex,
            String endVertex) {
        
        List<String> path = new ArrayList<>();
        String currentVertex = endVertex;
        
        // Trace the path from end to start
        while (currentVertex != null) {
            path.add(0, currentVertex);
            currentVertex = previousVertices.get(currentVertex);
        }
        
        // Return empty list if no path exists
        return path.size() > 0 && path.get(0).equals(startVertex) ? path : new ArrayList<>();
    }
}`,
          explanation:
            "Java implementasyonu, öncelik kuyruğu (PriorityQueue) kullanarak en küçük mesafeye sahip düğümü verimli bir şekilde seçer. Ziyaret edilmiş düğümleri izlemek için bir Set kullanır. HashMap'ler, mesafe ve önceki düğüm bilgilerini saklamak için kullanılır. Java'nın güçlü koleksiyon framework'ü sayesinde, algoritma temiz ve okunabilir bir şekilde implemente edilmiştir.",
        },
      },
    },
  ];

  // Filter examples based on search and filters
  useEffect(() => {
    let filtered = [...codeExamples];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (example) =>
          example.name.toLowerCase().includes(query) ||
          example.description.toLowerCase().includes(query) ||
          // Continuing with the Code Examples page implementation...
          example.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((example) =>
        selectedCategories.includes(example.category)
      );
    }

    // Apply difficulty filter
    if (selectedDifficulties.length > 0) {
      filtered = filtered.filter((example) =>
        selectedDifficulties.includes(example.difficulty)
      );
    }

    setFilteredExamples(filtered);
  }, [searchQuery, selectedCategories, selectedDifficulties, codeExamples]);

  // Copy code to clipboard
  const handleCopyCode = (id: string, language: string) => {
    const example = codeExamples.find((ex) => ex.id === id);
    if (example && example.implementations[language]) {
      navigator.clipboard.writeText(example.implementations[language].code);
      setCopiedId(`${id}-${language}`);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Toggle difficulty selection
  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  // Get all unique categories
  const allCategories = Array.from(
    new Set(codeExamples.map((ex) => ex.category))
  );

  // Get all unique difficulties
  const allDifficulties = Array.from(
    new Set(codeExamples.map((ex) => ex.difficulty))
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  // Helper for difficulty badge color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Kolay':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Orta':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Zor':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="container py-12 max-w-5xl mx-auto">
      {/* Header section */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Kod Örnekleri
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Çeşitli algoritmaların farklı programlama dillerinde örnek
          implementasyonları. Bu örnekler, eğitim ve referans amacıyla
          kullanılabilir.
        </p>

        {/* Search and filter controls */}
        <div className="mt-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              size={18}
            />
            <Input
              className="pl-10"
              placeholder="Algoritma veya etiket ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Kategoriler</span>
                {selectedCategories.length > 0 && (
                  <Badge className="ml-1">{selectedCategories.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Algoritma Kategorileri</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allCategories.map((category) => (
                <DropdownMenuCheckboxItem
                  key={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => toggleCategory(category)}
                >
                  {category}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Difficulty filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter size={16} />
                <span className="hidden sm:inline">Zorluk</span>
                {selectedDifficulties.length > 0 && (
                  <Badge className="ml-1">{selectedDifficulties.length}</Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Zorluk Seviyeleri</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allDifficulties.map((difficulty) => (
                <DropdownMenuCheckboxItem
                  key={difficulty}
                  checked={selectedDifficulties.includes(difficulty)}
                  onCheckedChange={() => toggleDifficulty(difficulty)}
                >
                  {difficulty}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Display the code examples */}
      {filteredExamples.length > 0 ? (
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredExamples.map((example) => (
            <motion.div key={example.id} variants={itemVariants}>
              <Card className="overflow-hidden">
                <CardHeader>
                  <div className="flex flex-wrap justify-between gap-4">
                    <div>
                      <CardTitle className="text-2xl">{example.name}</CardTitle>
                      <p className="text-muted-foreground mt-1">
                        {example.description}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(example.difficulty)}`}
                      >
                        {example.difficulty}
                      </span>
                      <Badge variant="outline">{example.category}</Badge>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {example.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent>
                  {/* Code tabs */}
                  <Tabs defaultValue={languageOptions[0]}>
                    <TabsList>
                      {languageOptions.map((lang) => (
                        <TabsTrigger key={lang} value={lang}>
                          {lang === 'typescript'
                            ? 'TypeScript'
                            : lang === 'python'
                              ? 'Python'
                              : 'Java'}
                        </TabsTrigger>
                      ))}
                    </TabsList>

                    {/* Code content for each language */}
                    {languageOptions.map((lang) => (
                      <TabsContent key={lang} value={lang}>
                        <div className="relative">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-2 flex gap-1"
                            onClick={() => handleCopyCode(example.id, lang)}
                          >
                            {copiedId === `${example.id}-${lang}` ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                            <span>
                              {copiedId === `${example.id}-${lang}`
                                ? 'Kopyalandı'
                                : 'Kopyala'}
                            </span>
                          </Button>

                          {example.implementations[lang] ? (
                            <div>
                              <CodeBlock
                                code={example.implementations[lang].code}
                                language={lang}
                                showLineNumbers={true}
                              />

                              {example.implementations[lang].explanation && (
                                <div className="mt-4 p-4 bg-muted/50 rounded-md">
                                  <h4 className="font-medium mb-2">Açıklama</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {example.implementations[lang].explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="p-4 text-center text-muted-foreground">
                              Bu algoritma için{' '}
                              {lang === 'typescript'
                                ? 'TypeScript'
                                : lang === 'python'
                                  ? 'Python'
                                  : 'Java'}{' '}
                              implementasyonu bulunmamaktadır.
                            </div>
                          )}
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // No results state
        <div className="text-center py-16">
          <Code className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">Kod örneği bulunamadı</h3>
          <p className="text-muted-foreground mb-6">
            Arama terimini değiştirin veya filtreleri temizleyin
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategories([]);
              setSelectedDifficulties([]);
            }}
          >
            Filtreleri Temizle
          </Button>
        </div>
      )}

      {/* Additional information */}
      <div className="mt-16 p-6 bg-muted rounded-lg">
        <h2 className="text-xl font-bold mb-4">Kod Kullanım Bilgileri</h2>
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Bu sayfadaki tüm kod örnekleri MIT lisansı altında sunulmaktadır ve
            herhangi bir projenizde serbestçe kullanabilirsiniz. Kodları
            kullanırken aşağıdaki hususları göz önünde bulundurun:
          </p>
          <ul>
            <li>
              Örnekler eğitim amaçlıdır ve üretim ortamında kullanmadan önce
              test edilmelidir.
            </li>
            <li>
              Bazı algoritmaların büyük veri setleri için optimizasyona ihtiyacı
              olabilir.
            </li>
            <li>
              Kodları kullanırken, uygulamanızın ihtiyaçlarına göre uyarlamaktan
              çekinmeyin.
            </li>
            <li>
              Örnekleri kullanırken projenizde Algorithms Playground'a atıfta
              bulunmanız takdir edilir, ancak zorunlu değildir.
            </li>
          </ul>
        </div>
      </div>

      {/* Contributing section */}
      <div className="mt-8 text-center">
        <h3 className="text-lg font-medium mb-2">
          Kendi kod örneğinizi eklemek mi istiyorsunuz?
        </h3>
        <p className="text-muted-foreground mb-4">
          GitHub üzerinden katkıda bulunabilir ve kendi algoritma
          implementasyonlarınızı paylaşabilirsiniz.
        </p>
        <Button asChild>
          <a
            href="/resources/contributing"
            className="inline-flex items-center gap-2"
          >
            <Code className="h-4 w-4" />
            Katkıda Bulunma Rehberi
          </a>
        </Button>
      </div>
    </div>
  );
}
