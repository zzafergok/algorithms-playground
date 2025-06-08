// Bubble sort algoritma implementasyonu
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
}

// Selection sort algoritması - her iterasyonda minimum elemanı bulup yerleştirir
export function selectionSort<T extends number>(arr: T[]): T[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // Swap the found minimum element with the first element
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

// Optimized merge sort with early termination and reduced memory allocation
export function mergeSort<T extends number>(arr: T[]): T[] {
  // Base case: Arrays with 0 or 1 element are already sorted
  if (arr.length <= 1) return arr;

  // Prevent unnecessary array copies by working on the original array
  const mergeSortInPlace = (start: number, end: number): void => {
    // Early termination for small subarrays
    if (end - start <= 1) return;

    // Calculate midpoint efficiently
    const mid = start + Math.floor((end - start) / 2);

    // Recursively sort left and right subarrays
    mergeSortInPlace(start, mid);
    mergeSortInPlace(mid, end);

    // Merge sorted subarrays
    merge(start, mid, end);
  };

  // In-place merge implementation to reduce memory overhead
  const merge = (start: number, mid: number, end: number): void => {
    // Temporary array for merging
    const temp: T[] = [];

    let left = start,
      right = mid;

    // Merge elements in sorted order
    while (left < mid && right < end) {
      if (arr[left] <= arr[right]) {
        temp.push(arr[left++]);
      } else {
        temp.push(arr[right++]);
      }
    }

    // Add remaining elements
    temp.push(...arr.slice(left, mid), ...arr.slice(right, end));

    // Copy back to original array
    arr.splice(start, temp.length, ...temp);
  };

  // Initiate sorting on entire array
  mergeSortInPlace(0, arr.length);

  return arr;
}

// Quick Sort implementasyonu - pivot tabanlı böl ve fethet algoritması
export function quickSort<T extends number>(arr: T[]): T[] {
  // Dizi 1 veya daha az eleman içeriyorsa zaten sıralıdır
  if (arr.length <= 1) return arr;

  // Son elemanı pivot olarak seç
  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  // Pivottan küçük ve büyük elemanları ayır
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  // Alt dizileri özyinelemeli olarak sırala ve birleştir
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Radix Sort - sadece pozitif tam sayılar için çalışır
export function radixSort(arr: number[]): number[] {
  // Create a copy of the array to avoid modifying the original
  const result = [...arr];

  // Edge case: empty array
  if (result.length === 0) return result;

  // Find the maximum element to determine the number of digits
  const max = Math.max(...result);

  // Do counting sort for every digit position
  // Start from least significant digit (LSD) to most significant digit (MSD)
  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    // Call counting sort for the current digit
    countingSortByDigit(result, exp);
  }

  return result;
}

// Counting sort implementation that sorts based on a specific digit position
export function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0); // Digits are 0-9

  // Count occurrences of each digit at the current position
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  // Change count[i] so that it contains the position of this digit in output[]
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array in a stable way (traversing from end to start)
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  // Copy the output array to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

// Counting Sort implementation for demo purposes
// Only works with non-negative integers
export function countingSort(arr: number[]): number[] {
  // Create a copy of the array to avoid modifying the original
  const result = [...arr];

  // Edge case: empty array
  if (result.length === 0) return result;

  // Find the maximum element to determine the count array size
  const max = Math.max(...result);

  // Create counting array (index 0 to max)
  const count = new Array(max + 1).fill(0);

  // Count frequency of each element
  for (let i = 0; i < result.length; i++) {
    count[result[i]]++;
  }

  // Update counting array with cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Create the output array
  const output = new Array(result.length);

  // Build the output array in a stable way (traversing from end to start)
  for (let i = result.length - 1; i >= 0; i--) {
    output[count[result[i]] - 1] = result[i];
    count[result[i]]--;
  }

  // Copy the output array to result
  for (let i = 0; i < result.length; i++) {
    result[i] = output[i];
  }

  return result;
}

// Heap Sort implementasyonu - binary heap veri yapısını kullanır
export function heapSort<T extends number>(arr: T[]): T[] {
  // Create a copy of the array to avoid modifying the original
  const result = [...arr];
  const n = result.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i > 0; i--) {
    // Move current root to the end
    [result[0], result[i]] = [result[i], result[0]];

    // Call heapify on the reduced heap
    heapify(result, i, 0);
  }

  return result;
}

// Function to heapify a subtree rooted at index i
export function heapify<T extends number>(
  arr: T[],
  n: number,
  i: number
): void {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

  // If left child is larger than root
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  // If right child is larger than the largest so far
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  // If largest is not the root
  if (largest !== i) {
    // Swap and continue heapifying
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

// Insertion sort algoritması - küçük diziler için oldukça etkili
export function insertionSort<T extends number>(arr: T[]): T[] {
  // Create a copy of the array to avoid modifying the original
  const result = [...arr];
  const n = result.length;

  // Start from the second element (index 1)
  for (let i = 1; i < n; i++) {
    // Store the current element to be inserted
    const current = result[i];

    // Find the position to insert the current element in the sorted subarray
    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      // Shift elements to the right
      result[j + 1] = result[j];
      j--;
    }

    // Insert the current element at the correct position
    result[j + 1] = current;
  }

  return result;
}

// Priority queue implementasyonu - A* algoritması için gerekli
export class PriorityQueue<T> {
  private items: Array<{ element: T; priority: number }> = [];

  // Yeni eleman ekle - öncelik sırasına göre yerleştir
  enqueue(element: T, priority: number): void {
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

  // En yüksek öncelikli elemanı çıkar
  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items.shift()?.element;
  }

  // Kuyruk boş mu kontrol et
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Kuyruk boyutunu döndür
  size(): number {
    return this.items.length;
  }

  // Kuyruktaki tüm elemanları kontrol etmek için
  contains(element: T): boolean {
    return this.items.some((item) => item.element === element);
  }
}

// Binary heap implementasyonu - daha etkili priority queue için
export class BinaryHeap<T> {
  private heap: Array<{ element: T; priority: number }> = [];

  // Parent node indeksini hesapla
  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  // Left child indeksini hesapla
  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  // Right child indeksini hesapla
  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  // İki elemanın yerini değiştir
  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

  // Yukarı doğru heap property'yi koru
  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index);
      if (this.heap[index].priority >= this.heap[parentIndex].priority) {
        break;
      }
      this.swap(index, parentIndex);
      index = parentIndex;
    }
  }

  // Aşağı doğru heap property'yi koru
  private heapifyDown(index: number): void {
    while (this.getLeftChildIndex(index) < this.heap.length) {
      const leftChildIndex = this.getLeftChildIndex(index);
      const rightChildIndex = this.getRightChildIndex(index);

      let smallestIndex = leftChildIndex;
      if (
        rightChildIndex < this.heap.length &&
        this.heap[rightChildIndex].priority < this.heap[leftChildIndex].priority
      ) {
        smallestIndex = rightChildIndex;
      }

      if (this.heap[index].priority <= this.heap[smallestIndex].priority) {
        break;
      }

      this.swap(index, smallestIndex);
      index = smallestIndex;
    }
  }

  // Yeni eleman ekle
  insert(element: T, priority: number): void {
    this.heap.push({ element, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  // Minimum elemanı çıkar
  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop()?.element;

    const min = this.heap[0].element;
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  // Heap boş mu
  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  // Heap boyutu
  size(): number {
    return this.heap.length;
  }
}
