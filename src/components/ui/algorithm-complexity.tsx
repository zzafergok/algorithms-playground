import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface ComplexityData {
  inputSize: number;
  worstCase: number;
  averageCase: number;
  bestCase: number;
}

interface AlgorithmComplexityProps {
  timeComplexity: {
    worstCase: string;
    averageCase: string;
    bestCase: string;
  };
  spaceComplexity: string;
  complexityData: ComplexityData[];
}

export function AlgorithmComplexity({
  timeComplexity,
  spaceComplexity,
  complexityData,
}: AlgorithmComplexityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Algorithm Complexity Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Time Complexity</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Worst Case:</span>
                <span className="font-medium">{timeComplexity.worstCase}</span>
              </div>
              <div className="flex justify-between">
                <span>Average Case:</span>
                <span className="font-medium">
                  {timeComplexity.averageCase}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Best Case:</span>
                <span className="font-medium">{timeComplexity.bestCase}</span>
              </div>
            </div>

            <h3 className="font-semibold mt-4 mb-2">Space Complexity</h3>
            <p>{spaceComplexity}</p>
          </div>

          <div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={complexityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="inputSize"
                  label={{
                    value: 'Input Size',
                    position: 'insideBottom',
                    offset: -5,
                  }}
                />
                <YAxis
                  label={{
                    value: 'Time Complexity',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="worstCase"
                  stroke="#ff4d4d"
                  name="Worst Case"
                />
                <Line
                  type="monotone"
                  dataKey="averageCase"
                  stroke="#4dff4d"
                  name="Average Case"
                />
                <Line
                  type="monotone"
                  dataKey="bestCase"
                  stroke="#4d4dff"
                  name="Best Case"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Utility function to generate complexity data
export function generateComplexityData(
  complexityFunc: (n: number) => number,
  maxInputSize: number = 20
): ComplexityData[] {
  return Array.from({ length: maxInputSize }, (_, i) => {
    const inputSize = i + 1;
    return {
      inputSize,
      worstCase: complexityFunc(inputSize),
      averageCase: Math.floor(complexityFunc(inputSize) * 0.8),
      bestCase: Math.floor(complexityFunc(inputSize) * 0.5),
    };
  });
}
