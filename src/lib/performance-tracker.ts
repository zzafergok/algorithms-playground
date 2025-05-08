// Extend the Performance interface to include the Chrome-specific memory property
declare global {
  interface Performance {
    memory?: {
      usedJSHeapSize: number;
      totalJSHeapSize: number;
      jsHeapSizeLimit: number;
    };
  }
}

export interface AlgorithmPerformanceMetrics {
  executionTime: number;
  memoryUsageBefore: number;
  memoryUsageAfter: number;
  comparisons: number;
  swaps: number;
}

export class PerformanceTracker {
  private startMemory: number = 0;
  private comparisons: number = 0;
  private swaps: number = 0;

  constructor() {
    this.reset();
  }

  reset() {
    this.startMemory = this.getMemoryUsage();
    this.comparisons = 0;
    this.swaps = 0;
  }

  private getMemoryUsage(): number {
    if (
      typeof window !== 'undefined' &&
      window.performance &&
      window.performance.memory
    ) {
      return window.performance.memory.usedJSHeapSize / 1024; // Convert to KB
    }
    return 0;
  }

  trackComparison() {
    this.comparisons++;
  }

  trackSwap() {
    this.swaps++;
  }

  measure<T>(
    algorithm: (arr: T[]) => T[],
    input: T[]
  ): AlgorithmPerformanceMetrics {
    // Reset tracking
    this.reset();

    // Measure start time
    const startTime = performance.now();

    // Create a copy of the input to avoid mutation
    const inputCopy = [...input];

    // Perform the algorithm with custom comparison and swap tracking
    const trackedAlgorithm = (arr: T[]) => {
      const wrappedAlgorithm = (comparison: (a: T, b: T) => boolean) => {
        return (a: T, b: T) => {
          this.trackComparison();
          return comparison(a, b);
        };
      };

      const wrappedSwap = (arr: T[], i: number, j: number) => {
        this.trackSwap();
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      };

      return algorithm(arr);
    };

    // Run the algorithm
    const result = trackedAlgorithm(inputCopy);

    // Measure end time
    const endTime = performance.now();

    // Calculate memory usage
    const endMemory = this.getMemoryUsage();

    return {
      executionTime: endTime - startTime,
      memoryUsageBefore: this.startMemory,
      memoryUsageAfter: endMemory,
      comparisons: this.comparisons,
      swaps: this.swaps,
    };
  }
}

// Singleton instance for global performance tracking
export const performanceTracker = new PerformanceTracker();
