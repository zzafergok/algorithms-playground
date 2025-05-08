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

export function insertionSort<T extends number>(arr: T[]): T[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let current = arr[i];
    let j = i - 1;

    // Move elements of arr[0..i-1] that are greater than current
    // to one position ahead of their current position
    while (j >= 0 && arr[j] > current) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = current;
  }
  return arr;
}

// Merge Sort
export function mergeSort<T extends number>(arr: T[]): T[] {
  // Dizi 1 veya daha az eleman içeriyorsa zaten sıralıdır
  if (arr.length <= 1) return arr;

  // Diziyi ortadan ikiye böl
  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  // Alt dizileri özyinelemeli olarak sırala
  return merge(mergeSort(left), mergeSort(right));
}

function merge<T extends number>(left: T[], right: T[]): T[] {
  let result: T[] = [];
  let leftIndex = 0;
  let rightIndex = 0;

  // İki alt diziyi birleştir
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  // Kalan elemanları ekle
  return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Quick Sort
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

// Performans ve karşılaştırma için yardımcı fonksiyonlar
export function isSorted<T extends number>(arr: T[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

export function compareSortingAlgorithms(arr: number[]) {
  const algorithms = [
    { name: 'Bubble Sort', func: bubbleSort },
    { name: 'Selection Sort', func: selectionSort },
    { name: 'Insertion Sort', func: insertionSort },
    { name: 'Merge Sort', func: mergeSort },
    { name: 'Quick Sort', func: quickSort },
  ];

  return algorithms
    .map((algo) => {
      const startTime = performance.now();
      const sortedArr = algo.func([...arr]);
      const endTime = performance.now();

      return {
        name: algo.name,
        executionTime: endTime - startTime,
        isSorted: isSorted(sortedArr),
      };
    })
    .sort((a, b) => a.executionTime - b.executionTime);
}
