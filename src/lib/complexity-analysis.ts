// Time complexity calculation functions
export const TimeComplexityFunctions = {
  // O(1) - Constant Time
  constant: (n: number) => 1,

  // O(log n) - Logarithmic Time
  logarithmic: (n: number) => Math.log2(n),

  // O(n) - Linear Time
  linear: (n: number) => n,

  // O(n log n) - Linearithmic Time
  linearithmic: (n: number) => n * Math.log2(n),

  // O(n²) - Quadratic Time
  quadratic: (n: number) => Math.pow(n, 2),

  // O(2^n) - Exponential Time
  exponential: (n: number) => Math.pow(2, n),

  // O(n!) - Factorial Time
  factorial: (n: number): number => {
    if (n <= 1) return 1;
    return n * TimeComplexityFunctions.factorial(n - 1);
  },
};

/**
 * Generates data points for visualizing algorithm complexity
 */
export function generateComplexityData(
  complexityFunction: (n: number) => number,
  dataPoints: number = 20,
  maxN: number = 100
) {
  const data = [];
  const step = maxN / dataPoints;

  for (let i = 1; i <= dataPoints; i++) {
    const n = Math.round(i * step);
    const value = complexityFunction(n);
    data.push({ n, value });
  }

  return data;
}
