'use client';

import React from 'react';
import { Clock, MemoryStick, Layers, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface PerformanceMetricsProps {
  executionTime: number;
  memoryUsage?: number;
  comparisons?: number;
  swaps?: number;
}

export function PerformanceMetrics({
  executionTime,
  memoryUsage = 0,
  comparisons = 0,
  swaps = 0,
}: PerformanceMetricsProps) {
  const performanceMetrics = [
    {
      icon: Clock,
      label: 'Execution Time',
      value: `${executionTime.toFixed(4)} ms`,
      color: 'text-blue-500',
    },
    {
      icon: MemoryStick,
      label: 'Memory Usage',
      value: `${memoryUsage.toFixed(2)} KB`,
      color: 'text-green-500',
    },
    {
      icon: Layers,
      label: 'Comparisons',
      value: comparisons.toLocaleString(),
      color: 'text-purple-500',
    },
    {
      icon: Cpu,
      label: 'Swaps',
      value: swaps.toLocaleString(),
      color: 'text-red-500',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {performanceMetrics.map((metric) => (
            <div
              key={metric.label}
              className="flex items-center space-x-3 p-3 bg-muted rounded-lg"
            >
              <metric.icon className={`h-6 w-6 ${metric.color}`} />
              <div>
                <p className="text-xs text-muted-foreground">{metric.label}</p>
                <p className="font-semibold">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
