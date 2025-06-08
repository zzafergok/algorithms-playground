export function bubbleSort(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (result[j] > result[j + 1]) {
        [result[j], result[j + 1]] = [result[j + 1], result[j]];
      }
    }
  }

  return result;
}

export function selectionSort<T extends number>(arr: T[]): T[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}

export function mergeSort<T extends number>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;

  const mergeSortInPlace = (start: number, end: number): void => {
    if (end - start <= 1) return;

    const mid = start + Math.floor((end - start) / 2);

    mergeSortInPlace(start, mid);
    mergeSortInPlace(mid, end);

    merge(start, mid, end);
  };

  const merge = (start: number, mid: number, end: number): void => {
    const temp: T[] = [];

    let left = start,
      right = mid;

    while (left < mid && right < end) {
      if (arr[left] <= arr[right]) {
        temp.push(arr[left++]);
      } else {
        temp.push(arr[right++]);
      }
    }

    temp.push(...arr.slice(left, mid), ...arr.slice(right, end));

    arr.splice(start, temp.length, ...temp);
  };

  mergeSortInPlace(0, arr.length);

  return arr;
}

export function quickSort<T extends number>(arr: T[]): T[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left: T[] = [];
  const right: T[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

export function radixSort(arr: number[]): number[] {
  const result = [...arr];

  if (result.length === 0) return result;

  const max = Math.max(...result);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortByDigit(result, exp);
  }

  return result;
}

export function countingSortByDigit(arr: number[], exp: number): void {
  const n = arr.length;
  const output = new Array(n).fill(0);
  const count = new Array(10).fill(0); // Digits are 0-9

  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i] / exp) % 10;
    count[digit]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }

  for (let i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}

export function countingSort(arr: number[]): number[] {
  const result = [...arr];

  if (result.length === 0) return result;

  const max = Math.max(...result);

  const count = new Array(max + 1).fill(0);

  for (let i = 0; i < result.length; i++) {
    count[result[i]]++;
  }

  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  const output = new Array(result.length);

  for (let i = result.length - 1; i >= 0; i--) {
    output[count[result[i]] - 1] = result[i];
    count[result[i]]--;
  }

  for (let i = 0; i < result.length; i++) {
    result[i] = output[i];
  }

  return result;
}

export function heapSort<T extends number>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(result, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    [result[0], result[i]] = [result[i], result[0]];

    heapify(result, i, 0);
  }

  return result;
}

export function heapify<T extends number>(
  arr: T[],
  n: number,
  i: number
): void {
  let largest = i; // Initialize largest as root
  const left = 2 * i + 1; // Left child
  const right = 2 * i + 2; // Right child

  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }

  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

export function insertionSort<T extends number>(arr: T[]): T[] {
  const result = [...arr];
  const n = result.length;

  for (let i = 1; i < n; i++) {
    const current = result[i];

    let j = i - 1;
    while (j >= 0 && result[j] > current) {
      result[j + 1] = result[j];
      j--;
    }

    result[j + 1] = current;
  }

  return result;
}

export class PriorityQueue<T> {
  private items: Array<{ element: T; priority: number }> = [];

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

  dequeue(): T | undefined {
    if (this.isEmpty()) return undefined;
    return this.items.shift()?.element;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  contains(element: T): boolean {
    return this.items.some((item) => item.element === element);
  }
}

export class BinaryHeap<T> {
  private heap: Array<{ element: T; priority: number }> = [];

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getLeftChildIndex(index: number): number {
    return 2 * index + 1;
  }

  private getRightChildIndex(index: number): number {
    return 2 * index + 2;
  }

  private swap(index1: number, index2: number): void {
    [this.heap[index1], this.heap[index2]] = [
      this.heap[index2],
      this.heap[index1],
    ];
  }

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

  insert(element: T, priority: number): void {
    this.heap.push({ element, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  extractMin(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop()?.element;

    const min = this.heap[0].element;
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    return min;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  size(): number {
    return this.heap.length;
  }
}

export function timSort(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;
  const MIN_MERGE = 32;

  const getMinRunLength = (n: number): number => {
    let r = 0;
    while (n >= MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  };

  const insertionSort = (arr: number[], left: number, right: number): void => {
    for (let i = left + 1; i <= right; i++) {
      const keyItem = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > keyItem) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = keyItem;
    }
  };

  const merge = (
    arr: number[],
    left: number,
    mid: number,
    right: number
  ): void => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      j++;
      k++;
    }
  };

  const findRuns = (
    arr: number[]
  ): { start: number; end: number; descending: boolean }[] => {
    const runs: { start: number; end: number; descending: boolean }[] = [];
    let i = 0;

    while (i < n - 1) {
      let runStart = i;
      let runEnd = i;
      let descending = false;

      if (arr[i] > arr[i + 1]) {
        descending = true;
        while (runEnd < n - 1 && arr[runEnd] > arr[runEnd + 1]) {
          runEnd++;
        }
      } else {
        while (runEnd < n - 1 && arr[runEnd] <= arr[runEnd + 1]) {
          runEnd++;
        }
      }

      runs.push({ start: runStart, end: runEnd, descending });
      i = runEnd + 1;
    }

    if (i === n - 1) {
      runs.push({ start: i, end: i, descending: false });
    }

    return runs;
  };

  const minRun = getMinRunLength(n);

  if (n < 64) {
    insertionSort(result, 0, n - 1);
    return result;
  }

  let runs = findRuns(result);

  for (let i = 0; i < runs.length; i++) {
    let { start, end, descending } = runs[i];

    if (descending) {
      let left = start,
        right = end;
      while (left < right) {
        [result[left], result[right]] = [result[right], result[left]];
        left++;
        right--;
      }
    }

    if (end - start + 1 < minRun) {
      const newEnd = Math.min(start + minRun - 1, n - 1);
      insertionSort(result, start, newEnd);
      runs[i].end = newEnd;
    }
  }

  let currentSize = minRun;
  while (currentSize < n) {
    for (let start = 0; start < n; start += 2 * currentSize) {
      const mid = Math.min(start + currentSize - 1, n - 1);
      const end = Math.min(start + 2 * currentSize - 1, n - 1);

      if (mid < end) {
        merge(result, start, mid, end);
      }
    }
    currentSize *= 2;
  }

  return result;
}

export function shellSort(arr: number[]): number[] {
  const result = [...arr];
  const n = result.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      const temp = result[i];
      let j = i;

      while (j >= gap && result[j - gap] > temp) {
        result[j] = result[j - gap];
        j -= gap;
      }
      result[j] = temp;
    }
  }

  return result;
}
