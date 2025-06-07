'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Play,
  RotateCcw,
  Shuffle,
  Network,
  TreePine,
  Plus,
  Minus,
} from 'lucide-react';
import {
  Graph,
  GraphNode,
  GraphEdge,
  kruskal,
  prim,
  resetGraphState,
} from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';

interface MSTVisualizerProps {
  className?: string;
  initialNodeCount?: number;
  showControls?: boolean;
  algorithm?: 'kruskal' | 'prim';
}

interface VisualNode extends GraphNode {
  fx?: number;
  fy?: number;
  vx?: number;
  vy?: number;
}

interface AlgorithmStep {
  edge: GraphEdge;
  action: 'add' | 'reject' | 'consider';
  reason: string;
  totalWeight: number;
  edgesInMST: GraphEdge[];
}

// MST visualizer component for Minimum Spanning Tree algorithms
export function MSTVisualizer({
  className,
  initialNodeCount = 6,
  showControls = true,
  algorithm = 'kruskal',
}: MSTVisualizerProps) {
  // Core state management
  const [nodeCount, setNodeCount] = useState(initialNodeCount);
  const [graph, setGraph] = useState<Graph>(() =>
    generateRandomGraph(initialNodeCount)
  );
  const [algorithm_type, setAlgorithmType] = useState<'kruskal' | 'prim'>(
    algorithm
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);

  // Algorithm execution state
  const [currentStep, setCurrentStep] = useState<number>(-1);
  const [algorithmSteps, setAlgorithmSteps] = useState<AlgorithmStep[]>([]);
  const [mstEdges, setMstEdges] = useState<GraphEdge[]>([]);
  const [totalMSTWeight, setTotalMSTWeight] = useState<number>(0);

  // Visualization settings
  const [showWeights, setShowWeights] = useState<boolean>(true);
  const [showStepDetails, setShowStepDetails] = useState<boolean>(true);
  const [selectedStartNode, setSelectedStartNode] = useState<string>('0');

  // Algorithm statistics
  const [algorithmStats, setAlgorithmStats] = useState({
    totalEdges: 0,
    edgesConsidered: 0,
    edgesRejected: 0,
    finalMSTWeight: 0,
    executionTime: 0,
  });

  // Generate a random connected graph
  function generateRandomGraph(numNodes: number): Graph {
    const nodes = new Map<string, VisualNode>();
    const edges: GraphEdge[] = [];
    const adjacencyList = new Map<
      string,
      { nodeId: string; weight: number }[]
    >();

    const canvasWidth = 400;
    const canvasHeight = 300;
    const radius = Math.min(canvasWidth, canvasHeight) * 0.35;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Create nodes in a circular layout
    for (let i = 0; i < numNodes; i++) {
      const angle = (2 * Math.PI * i) / numNodes;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      const nodeId = i.toString();
      nodes.set(nodeId, {
        id: nodeId,
        x,
        y,
      });
      adjacencyList.set(nodeId, []);
    }

    // Ensure connectivity by creating a minimum spanning path
    for (let i = 0; i < numNodes - 1; i++) {
      const weight = Math.floor(Math.random() * 15) + 1;
      const edge: GraphEdge = {
        from: i.toString(),
        to: (i + 1).toString(),
        weight,
      };
      edges.push(edge);

      adjacencyList
        .get(i.toString())!
        .push({ nodeId: (i + 1).toString(), weight });
      adjacencyList
        .get((i + 1).toString())!
        .push({ nodeId: i.toString(), weight });
    }

    // Add additional random edges for complexity
    const additionalEdges = Math.floor(numNodes * 0.7);
    for (let i = 0; i < additionalEdges; i++) {
      const from = Math.floor(Math.random() * numNodes);
      const to = Math.floor(Math.random() * numNodes);

      if (from !== to) {
        // Check if edge already exists
        const existsForward = edges.some(
          (e) =>
            (e.from === from.toString() && e.to === to.toString()) ||
            (e.from === to.toString() && e.to === from.toString())
        );

        if (!existsForward) {
          const weight = Math.floor(Math.random() * 20) + 1;
          const edge: GraphEdge = {
            from: from.toString(),
            to: to.toString(),
            weight,
          };
          edges.push(edge);

          adjacencyList
            .get(from.toString())!
            .push({ nodeId: to.toString(), weight });
          adjacencyList
            .get(to.toString())!
            .push({ nodeId: from.toString(), weight });
        }
      }
    }

    return { nodes, edges, adjacencyList };
  }

  // Run the selected MST algorithm
  const runMSTAlgorithm = useCallback(async () => {
    setIsRunning(true);
    setCurrentStep(-1);
    setMstEdges([]);
    setTotalMSTWeight(0);
    resetGraphState(graph);

    const startTime = performance.now();

    let result;
    let steps: AlgorithmStep[] = [];

    if (algorithm_type === 'kruskal') {
      // Run Kruskal's algorithm
      const kruskalResult = kruskal(graph);
      result = kruskalResult;

      // Convert Kruskal steps to our step format
      let totalWeight = 0;
      const edgesInMST: GraphEdge[] = [];

      steps = kruskalResult.steps.map((step) => {
        if (step.action === 'add') {
          totalWeight += step.edge.weight;
          edgesInMST.push(step.edge);
        }

        return {
          edge: step.edge,
          action: step.action,
          reason: step.reason,
          totalWeight,
          edgesInMST: [...edgesInMST],
        };
      });
    } else {
      // Run Prim's algorithm
      const primResult = prim(graph, selectedStartNode);
      result = primResult;

      // Convert Prim steps to our step format
      let totalWeight = 0;
      const edgesInMST: GraphEdge[] = [];

      steps = primResult.steps.map((step) => {
        if (step.action === 'add' && step.edge) {
          totalWeight += step.edge.weight;
          edgesInMST.push(step.edge);

          return {
            edge: step.edge,
            action: 'add' as const,
            reason: step.reason,
            totalWeight,
            edgesInMST: [...edgesInMST],
          };
        } else {
          return {
            edge: step.edge || { from: '', to: '', weight: 0 },
            action: 'consider' as const,
            reason: step.reason,
            totalWeight,
            edgesInMST: [...edgesInMST],
          };
        }
      });
    }

    const endTime = performance.now();

    setAlgorithmSteps(steps);
    setTotalMSTWeight(result.totalWeight);

    // Calculate statistics
    const edgesConsidered = steps.length;
    const edgesRejected = steps.filter((s) => s.action === 'reject').length;

    setAlgorithmStats({
      totalEdges: graph.edges.length,
      edgesConsidered,
      edgesRejected,
      finalMSTWeight: result.totalWeight,
      executionTime: endTime - startTime,
    });

    // Animate through steps
    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(i);
      setMstEdges(steps[i].edgesInMST);
      setTotalMSTWeight(steps[i].totalWeight);

      await new Promise((resolve) => setTimeout(resolve, 101 - animationSpeed));
    }

    setIsRunning(false);
  }, [graph, algorithm_type, selectedStartNode, animationSpeed]);

  // Reset algorithm state
  const resetAlgorithm = useCallback(() => {
    setCurrentStep(-1);
    setAlgorithmSteps([]);
    setMstEdges([]);
    setTotalMSTWeight(0);
    setIsRunning(false);
    resetGraphState(graph);
    setAlgorithmStats({
      totalEdges: 0,
      edgesConsidered: 0,
      edgesRejected: 0,
      finalMSTWeight: 0,
      executionTime: 0,
    });
  }, [graph]);

  // Generate new random graph
  const generateNewGraph = useCallback(() => {
    const newGraph = generateRandomGraph(nodeCount);
    setGraph(newGraph);
    setSelectedStartNode('0');
    resetAlgorithm();
  }, [nodeCount, resetAlgorithm]);

  // Add new node to graph
  const addNode = useCallback(() => {
    if (nodeCount >= 10) return; // Limit maximum nodes

    const newNodeCount = nodeCount + 1;
    setNodeCount(newNodeCount);
    generateNewGraph();
  }, [nodeCount, generateNewGraph]);

  // Remove node from graph
  const removeNode = useCallback(() => {
    if (nodeCount <= 3) return; // Minimum 3 nodes required

    const newNodeCount = nodeCount - 1;
    setNodeCount(newNodeCount);
    generateNewGraph();
  }, [nodeCount, generateNewGraph]);

  // Get edge styling based on current state
  const getEdgeStyle = useCallback(
    (edge: GraphEdge) => {
      const isMSTEdge = mstEdges.some(
        (e) =>
          (e.from === edge.from && e.to === edge.to) ||
          (e.from === edge.to && e.to === edge.from)
      );

      const currentStepEdge =
        currentStep >= 0 && currentStep < algorithmSteps.length
          ? algorithmSteps[currentStep].edge
          : null;

      const isCurrentEdge =
        currentStepEdge &&
        ((currentStepEdge.from === edge.from &&
          currentStepEdge.to === edge.to) ||
          (currentStepEdge.from === edge.to &&
            currentStepEdge.to === edge.from));

      if (isCurrentEdge) {
        const action = algorithmSteps[currentStep].action;
        if (action === 'add') return 'stroke-green-500 stroke-4';
        if (action === 'reject')
          return 'stroke-red-500 stroke-3 stroke-dasharray-4';
        return 'stroke-yellow-500 stroke-3';
      }

      if (isMSTEdge) {
        return 'stroke-blue-600 stroke-3';
      }

      return 'stroke-gray-300 stroke-2';
    },
    [mstEdges, currentStep, algorithmSteps]
  );

  // Get node styling based on current state
  const getNodeStyle = useCallback(
    (nodeId: string) => {
      const baseClasses =
        'fill-white stroke-gray-400 stroke-2 cursor-pointer hover:fill-gray-100';

      if (algorithm_type === 'prim') {
        // In Prim's algorithm, highlight visited nodes
        const isStartNode = nodeId === selectedStartNode;
        if (isStartNode) {
          return cn(baseClasses, 'fill-green-200 stroke-green-600');
        }

        // Check if node is connected to current MST
        const isConnected = mstEdges.some(
          (edge) => edge.from === nodeId || edge.to === nodeId
        );

        if (isConnected) {
          return cn(baseClasses, 'fill-blue-200 stroke-blue-600');
        }
      }

      return baseClasses;
    },
    [algorithm_type, selectedStartNode, mstEdges]
  );

  // Calculate edge path for SVG
  const getEdgePath = useCallback(
    (edge: GraphEdge) => {
      const fromNode = graph.nodes.get(edge.from);
      const toNode = graph.nodes.get(edge.to);

      if (!fromNode || !toNode) return '';

      return `M ${fromNode.x} ${fromNode.y} L ${toNode.x} ${toNode.y}`;
    },
    [graph.nodes]
  );

  // Calculate edge midpoint for weight labels
  const getEdgeMidpoint = useCallback(
    (edge: GraphEdge) => {
      const fromNode = graph.nodes.get(edge.from);
      const toNode = graph.nodes.get(edge.to);

      if (!fromNode || !toNode) return { x: 0, y: 0 };

      return {
        x: (fromNode.x + toNode.x) / 2,
        y: (fromNode.y + toNode.y) / 2,
      };
    },
    [graph.nodes]
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Control Panel */}
      {showControls && (
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              onClick={runMSTAlgorithm}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              {algorithm_type === 'kruskal' ? 'Kruskal' : 'Prim'} Çalıştır
            </Button>

            <Button
              onClick={resetAlgorithm}
              variant="outline"
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Sıfırla
            </Button>

            <Button
              onClick={generateNewGraph}
              variant="outline"
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Yeni Graf
            </Button>
          </div>

          {/* Algorithm and Graph Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Algoritma</Label>
              <select
                value={algorithm_type}
                onChange={(e) =>
                  setAlgorithmType(e.target.value as 'kruskal' | 'prim')
                }
                className="w-full p-2 border rounded"
                disabled={isRunning}
              >
                <option value="kruskal">Kruskal's Algorithm</option>
                <option value="prim">Prim's Algorithm</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label>Düğüm Sayısı: {nodeCount}</Label>
              <div className="flex items-center gap-2">
                <Button
                  onClick={removeNode}
                  variant="outline"
                  size="sm"
                  disabled={isRunning || nodeCount <= 3}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Slider
                  value={[nodeCount]}
                  onValueChange={([value]) => setNodeCount(value)}
                  min={3}
                  max={10}
                  step={1}
                  disabled={isRunning}
                  className="flex-1"
                />
                <Button
                  onClick={addNode}
                  variant="outline"
                  size="sm"
                  disabled={isRunning || nodeCount >= 10}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Animasyon Hızı: {animationSpeed}</Label>
              <Slider
                value={[animationSpeed]}
                onValueChange={([value]) => setAnimationSpeed(value)}
                min={1}
                max={100}
                step={1}
              />
            </div>
          </div>

          {/* Prim's Algorithm Start Node Selection */}
          {algorithm_type === 'prim' && (
            <div className="space-y-2">
              <Label>Başlangıç Düğümü (Prim için)</Label>
              <select
                value={selectedStartNode}
                onChange={(e) => setSelectedStartNode(e.target.value)}
                className="w-32 p-2 border rounded"
                disabled={isRunning}
              >
                {Array.from(graph.nodes.keys()).map((nodeId) => (
                  <option key={nodeId} value={nodeId}>
                    Düğüm {nodeId}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Visualization Options */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Switch
                id="show-weights"
                checked={showWeights}
                onCheckedChange={setShowWeights}
              />
              <Label htmlFor="show-weights">Ağırlıkları Göster</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-steps"
                checked={showStepDetails}
                onCheckedChange={setShowStepDetails}
              />
              <Label htmlFor="show-steps">Adım Detaylarını Göster</Label>
            </div>
          </div>

          {/* Algorithm Statistics */}
          {algorithmStats.totalEdges > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-background rounded border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.totalEdges}
                </div>
                <div className="text-sm text-muted-foreground">
                  Toplam Kenar
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.edgesConsidered}
                </div>
                <div className="text-sm text-muted-foreground">
                  İncelenen Kenar
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.finalMSTWeight}
                </div>
                <div className="text-sm text-muted-foreground">
                  MST Toplam Ağırlığı
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.executionTime.toFixed(2)}ms
                </div>
                <div className="text-sm text-muted-foreground">
                  Çalışma Süresi
                </div>
              </div>
            </div>
          )}

          {/* Current Step Information */}
          {showStepDetails &&
            currentStep >= 0 &&
            currentStep < algorithmSteps.length && (
              <div className="p-4 bg-background rounded border">
                <div className="flex items-center gap-2 mb-2">
                  <TreePine className="w-5 h-5" />
                  <span className="font-semibold">
                    Adım {currentStep + 1}/{algorithmSteps.length}
                  </span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Kenar:</span>
                    <span>
                      {algorithmSteps[currentStep].edge.from} ↔{' '}
                      {algorithmSteps[currentStep].edge.to}
                      (Ağırlık: {algorithmSteps[currentStep].edge.weight})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-medium">İşlem:</span>
                    <span
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium',
                        algorithmSteps[currentStep].action === 'add' &&
                          'bg-green-100 text-green-800',
                        algorithmSteps[currentStep].action === 'reject' &&
                          'bg-red-100 text-red-800',
                        algorithmSteps[currentStep].action === 'consider' &&
                          'bg-yellow-100 text-yellow-800'
                      )}
                    >
                      {algorithmSteps[currentStep].action === 'add' &&
                        'Eklendi'}
                      {algorithmSteps[currentStep].action === 'reject' &&
                        'Reddedildi'}
                      {algorithmSteps[currentStep].action === 'consider' &&
                        'İnceleniyor'}
                    </span>
                  </div>

                  <div className="text-muted-foreground">
                    {algorithmSteps[currentStep].reason}
                  </div>

                  <div className="flex items-center gap-4 pt-2 border-t">
                    <span className="font-medium">
                      MST'deki Kenarlar:{' '}
                      {algorithmSteps[currentStep].edgesInMST.length}
                    </span>
                    <span className="font-medium">
                      Toplam Ağırlık: {algorithmSteps[currentStep].totalWeight}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
      )}

      {/* Graph Visualization */}
      <div className="flex justify-center">
        <div className="border-2 border-gray-300 rounded-lg bg-white overflow-hidden">
          <svg width="500" height="400" viewBox="0 0 500 400">
            {/* Grid background */}
            <defs>
              <pattern
                id="grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Edges */}
            <g className="edges">
              {graph.edges.map((edge, index) => {
                const midpoint = getEdgeMidpoint(edge);
                return (
                  <g key={`edge-${index}`}>
                    {/* Edge line */}
                    <path
                      d={getEdgePath(edge)}
                      className={getEdgeStyle(edge)}
                      fill="none"
                    />

                    {/* Edge weight label */}
                    {showWeights && (
                      <g>
                        <circle
                          cx={midpoint.x}
                          cy={midpoint.y}
                          r="12"
                          fill="white"
                          stroke="#666"
                          strokeWidth="1"
                        />
                        <text
                          x={midpoint.x}
                          y={midpoint.y}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="text-xs font-medium fill-gray-700"
                        >
                          {edge.weight}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g className="nodes">
              {Array.from(graph.nodes.entries()).map(([nodeId, node]) => (
                <g key={nodeId}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r="20"
                    className={getNodeStyle(nodeId)}
                    onClick={() =>
                      algorithm_type === 'prim' && setSelectedStartNode(nodeId)
                    }
                  />
                  <text
                    x={node.x}
                    y={node.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="text-sm font-bold fill-gray-700 pointer-events-none"
                  >
                    {nodeId}
                  </text>
                </g>
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h4 className="font-semibold">Kenar Renkleri</h4>
          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-blue-600"></div>
              <span>MST'de bulunan kenar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-green-500"></div>
              <span>Şu anda eklenen kenar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-red-500 border-dashed border border-red-500"></div>
              <span>Reddedilen kenar (döngü oluşturur)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-yellow-500"></div>
              <span>İncelenen kenar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-1 bg-gray-300"></div>
              <span>Normal kenar</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold">Düğüm Renkleri</h4>
          <div className="space-y-1 text-sm">
            {algorithm_type === 'prim' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-200 border-2 border-green-600 rounded-full"></div>
                  <span>Başlangıç düğümü</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-200 border-2 border-blue-600 rounded-full"></div>
                  <span>MST'ye bağlı düğüm</span>
                </div>
              </>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white border-2 border-gray-400 rounded-full"></div>
              <span>Normal düğüm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Network className="w-5 h-5" />
            Kruskal's Algorithm
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong> O(E log E)
            </p>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(V)
            </p>
            <p>
              <strong>Yaklaşım:</strong> Kenar tabanlı, Union-Find kullanır
            </p>
            <p>
              <strong>Çalışma Prensibi:</strong> Tüm kenarları ağırlığa göre
              sıralar, döngü oluşturmayan en küçük kenarları ekler
            </p>
            <p>
              <strong>Avantaj:</strong> Sparse graflarda verimli
            </p>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            Prim's Algorithm
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong> O(E log V)
            </p>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(V)
            </p>
            <p>
              <strong>Yaklaşım:</strong> Düğüm tabanlı, öncelik kuyruğu kullanır
            </p>
            <p>
              <strong>Çalışma Prensibi:</strong> Bir düğümden başlar, her adımda
              MST'ye en yakın düğümü ekler
            </p>
            <p>
              <strong>Avantaj:</strong> Dense graflarda verimli
            </p>
          </div>
        </div>
      </div>

      {/* Final MST Summary */}
      {mstEdges.length > 0 && currentStep >= algorithmSteps.length - 1 && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-3">
            Minimum Spanning Tree Tamamlandı!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium text-green-700">MST Kenarları:</span>
              <div className="mt-1">
                {mstEdges.map((edge, index) => (
                  <div key={index} className="text-green-600">
                    {edge.from} ↔ {edge.to} (ağırlık: {edge.weight})
                  </div>
                ))}
              </div>
            </div>
            <div>
              <span className="font-medium text-green-700">
                Toplam Ağırlık:
              </span>
              <div className="text-2xl font-bold text-green-800">
                {totalMSTWeight}
              </div>
            </div>
            <div>
              <span className="font-medium text-green-700">İstatistikler:</span>
              <div className="text-green-600">
                <div>
                  {nodeCount} düğüm, {mstEdges.length} kenar
                </div>
                <div>
                  Toplam {graph.edges.length} kenardan{' '}
                  {algorithmStats.edgesConsidered} tanesi incelendi
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
