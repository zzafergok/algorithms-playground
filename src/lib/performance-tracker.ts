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
  // Use more precise memory tracking
  private getMemoryUsage(): {
    usedMemory: number;
    totalMemory: number;
    memoryUsagePercent: number;
  } {
    // Fallback for environments without memory tracking
    if (typeof window === 'undefined' || !window.performance?.memory) {
      return {
        usedMemory: 0,
        totalMemory: 0,
        memoryUsagePercent: 0,
      };
    }

    const { usedJSHeapSize, totalJSHeapSize } = window.performance.memory;

    // Calculate memory usage percentage for more meaningful insights
    return {
      usedMemory: usedJSHeapSize / 1024, // KB
      totalMemory: totalJSHeapSize / 1024, // KB
      memoryUsagePercent: (usedJSHeapSize / totalJSHeapSize) * 100,
    };
  }
}

// Singleton instance for global performance tracking
export const performanceTracker = new PerformanceTracker();
