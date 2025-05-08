'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface AlgorithmVisualizerProps<T> {
  algorithm: (arr: T[]) => T[];
  initialArray: T[];
}

export function AlgorithmVisualizer<T>({
  algorithm,
  initialArray,
}: AlgorithmVisualizerProps<T>) {
  const [array, setArray] = useState<T[]>(initialArray);
  const [steps, setSteps] = useState<T[][]>([initialArray]);
  const [currentStep, setCurrentStep] = useState(0);
  const [speed, setSpeed] = useState(500);

  const runAlgorithm = useCallback(() => {
    const algorithmSteps: T[][] = [array];
    const arrayCopy = [...array];

    // Modify arrayCopy using the algorithm
    // and push each intermediate state to algorithmSteps
    const result = algorithm(arrayCopy);

    algorithmSteps.push(result);
    setSteps(algorithmSteps);
    setCurrentStep(algorithmSteps.length - 1);
  }, [algorithm, array]);

  const resetAlgorithm = () => {
    setArray(initialArray);
    setSteps([initialArray]);
    setCurrentStep(0);
  };

  const generateRandomArray = () => {
    // Implement array generation logic based on T type
    // This is a placeholder and should be customized
    const newArray = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 100) as T
    );
    setArray(newArray);
    setSteps([newArray]);
    setCurrentStep(0);
  };

  return (
    <div className="p-6 bg-card rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <Button onClick={runAlgorithm}>Run Algorithm</Button>
          <Button variant="outline" onClick={resetAlgorithm}>
            Reset
          </Button>
          <Button variant="secondary" onClick={generateRandomArray}>
            Generate Random Array
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <span>Visualization Speed:</span>
          <Slider
            defaultValue={[speed]}
            max={2000}
            min={100}
            step={100}
            onValueChange={(value) => setSpeed(value[0])}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-end space-x-2 h-64">
          {steps[currentStep].map((item, index) => (
            <div
              key={index}
              className="w-10 bg-primary transition-all"
              style={{
                height: `${Number(item) * 3}px`,
                backgroundColor: getColorForItem(item, steps[currentStep]),
              }}
            >
              {String(item)}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <Button
          variant="outline"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
        >
          Previous Step
        </Button>
        <span>
          Step {currentStep} / {steps.length - 1}
        </span>
        <Button
          variant="outline"
          disabled={currentStep === steps.length - 1}
          onClick={() =>
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
          }
        >
          Next Step
        </Button>
      </div>
    </div>
  );
}

// Helper function to color code array elements
function getColorForItem<T>(item: T, array: T[]): string {
  const index = array.indexOf(item);
  const totalItems = array.length;
  const hue = (index / totalItems) * 360;
  return `hsl(${hue}, 70%, 50%)`;
}
