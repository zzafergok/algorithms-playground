export const TimeComplexityFunctions = {
  constant: (n: number) => 1,

  logarithmic: (n: number) => Math.log2(n),

  linear: (n: number) => n,

  linearithmic: (n: number) => n * Math.log2(n),

  quadratic: (n: number) => Math.pow(n, 2),

  exponential: (n: number) => Math.pow(2, n),

  factorial: (n: number): number => {
    if (n <= 1) return 1;
    return n * TimeComplexityFunctions.factorial(n - 1);
  },
};

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
