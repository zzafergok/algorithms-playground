'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import {
  Play,
  Square,
  RotateCcw,
  Zap,
  MapPin,
  Target,
  Construction,
} from 'lucide-react';
import {
  Graph,
  GraphNode,
  createGridGraph,
  aStar,
  resetGraphState,
  manhattanDistance,
  euclideanDistance,
} from '@/lib/algorithms/graph';
import { cn } from '@/lib/utils';

interface GridVisualizerProps {
  className?: string;
  initialWidth?: number;
  initialHeight?: number;
  showControls?: boolean;
  algorithm?: 'astar';
}

type CellMode = 'start' | 'goal' | 'obstacle' | 'clear';
type AlgorithmState = 'idle' | 'running' | 'paused' | 'completed';

// Grid visualizer component for pathfinding algorithms
export function GridVisualizer({
  className,
  initialWidth = 20,
  initialHeight = 15,
  showControls = true,
  algorithm = 'astar',
}: GridVisualizerProps) {
  // Core state management for grid and algorithm execution
  const [gridWidth, setGridWidth] = useState(initialWidth);
  const [gridHeight, setGridHeight] = useState(initialHeight);
  const [graph, setGraph] = useState<Graph>(() =>
    createGridGraph(initialWidth, initialHeight)
  );
  const [startNode, setStartNode] = useState<string>('2-2');
  const [goalNode, setGoalNode] = useState<string>(
    `${initialWidth - 3}-${initialHeight - 3}`
  );

  // Algorithm execution and visualization state
  const [algorithmState, setAlgorithmState] = useState<AlgorithmState>('idle');
  const [cellMode, setCellMode] = useState<CellMode>('obstacle');
  const [animationSpeed, setAnimationSpeed] = useState<number>(50);
  const [isDiagonal, setIsDiagonal] = useState<boolean>(false);
  const [heuristicType, setHeuristicType] = useState<'manhattan' | 'euclidean'>(
    'manhattan'
  );
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

  // Algorithm results state
  const [pathFound, setPathFound] = useState<GraphNode[]>([]);
  const [visitedNodes, setVisitedNodes] = useState<GraphNode[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [algorithmStats, setAlgorithmStats] = useState({
    pathLength: 0,
    nodesVisited: 0,
    executionTime: 0,
  });

  // Memoized heuristic function selection
  const heuristicFunction = useMemo(() => {
    return heuristicType === 'manhattan'
      ? manhattanDistance
      : euclideanDistance;
  }, [heuristicType]);

  // Reset grid to initial state
  const resetGrid = useCallback(() => {
    setAlgorithmState('idle');
    setCurrentStep(0);
    setPathFound([]);
    setVisitedNodes([]);
    setAlgorithmStats({ pathLength: 0, nodesVisited: 0, executionTime: 0 });

    const newGraph = createGridGraph(gridWidth, gridHeight);
    resetGraphState(newGraph);
    setGraph(newGraph);
  }, [gridWidth, gridHeight]);

  // Handle grid size changes
  const updateGridSize = useCallback((newWidth: number, newHeight: number) => {
    setGridWidth(newWidth);
    setGridHeight(newHeight);
    setStartNode('2-2');
    setGoalNode(`${newWidth - 3}-${newHeight - 3}`);

    const newGraph = createGridGraph(newWidth, newHeight);
    setGraph(newGraph);
    setAlgorithmState('idle');
    setCurrentStep(0);
    setPathFound([]);
    setVisitedNodes([]);
  }, []);

  // Handle cell click events for placing start, goal, and obstacles
  const handleCellClick = useCallback(
    (nodeId: string) => {
      if (algorithmState === 'running') return;

      const newGraph = { ...graph };
      const node = newGraph.nodes.get(nodeId);
      if (!node) return;

      switch (cellMode) {
        case 'start':
          // Clear previous start node and set new one
          if (startNode && newGraph.nodes.has(startNode)) {
            newGraph.nodes.get(startNode)!.isObstacle = false;
          }
          setStartNode(nodeId);
          node.isObstacle = false;
          break;

        case 'goal':
          // Clear previous goal node and set new one
          if (goalNode && newGraph.nodes.has(goalNode)) {
            newGraph.nodes.get(goalNode)!.isObstacle = false;
          }
          setGoalNode(nodeId);
          node.isObstacle = false;
          break;

        case 'obstacle':
          // Toggle obstacle state (don't allow on start/goal)
          if (nodeId !== startNode && nodeId !== goalNode) {
            node.isObstacle = !node.isObstacle;
          }
          break;

        case 'clear':
          // Clear the cell
          if (nodeId !== startNode && nodeId !== goalNode) {
            node.isObstacle = false;
          }
          break;
      }

      setGraph(newGraph);
    },
    [graph, cellMode, startNode, goalNode, algorithmState]
  );

  // Handle mouse drag for painting obstacles
  const handleCellMouseEnter = useCallback(
    (nodeId: string) => {
      if (!isMouseDown || algorithmState === 'running') return;

      // Only paint obstacles or clear when dragging
      if (cellMode === 'obstacle' || cellMode === 'clear') {
        handleCellClick(nodeId);
      }
    },
    [isMouseDown, cellMode, handleCellClick, algorithmState]
  );

  // Run the pathfinding algorithm
  const runAlgorithm = useCallback(async () => {
    if (!graph.nodes.has(startNode) || !graph.nodes.has(goalNode)) {
      return;
    }

    setAlgorithmState('running');
    resetGraphState(graph);

    const startTime = performance.now();

    // Execute A* algorithm
    const result = aStar(graph, startNode, goalNode, heuristicFunction);

    const endTime = performance.now();
    const executionTime = endTime - startTime;

    // Update results and statistics
    setPathFound(result.path);
    setVisitedNodes(result.visitedNodes);
    setAlgorithmStats({
      pathLength: result.path.length,
      nodesVisited: result.visitedNodes.length,
      executionTime,
    });

    // Animate the visualization step by step
    if (result.visitedNodes.length > 0) {
      for (let i = 0; i < result.visitedNodes.length; i++) {
        if (algorithmState !== 'running') break;

        setCurrentStep(i + 1);
        await new Promise((resolve) =>
          setTimeout(resolve, 101 - animationSpeed)
        );
      }
    }

    setAlgorithmState('completed');
  }, [
    graph,
    startNode,
    goalNode,
    heuristicFunction,
    animationSpeed,
    algorithmState,
  ]);

  // Get cell appearance classes based on state
  const getCellClasses = useCallback(
    (nodeId: string, node: GraphNode) => {
      const baseClasses =
        'w-6 h-6 border border-gray-300 cursor-pointer transition-colors duration-150 hover:opacity-80';

      // Priority order: start > goal > path > visited > obstacle > default
      if (nodeId === startNode) {
        return cn(baseClasses, 'bg-green-500 hover:bg-green-600');
      }

      if (nodeId === goalNode) {
        return cn(baseClasses, 'bg-red-500 hover:bg-red-600');
      }

      if (node.inPath && algorithmState === 'completed') {
        return cn(baseClasses, 'bg-yellow-400 hover:bg-yellow-500');
      }

      if (
        node.visited &&
        currentStep > visitedNodes.findIndex((n) => n.id === nodeId)
      ) {
        return cn(baseClasses, 'bg-blue-200 hover:bg-blue-300');
      }

      if (node.isObstacle) {
        return cn(baseClasses, 'bg-gray-800 hover:bg-gray-700');
      }

      return cn(baseClasses, 'bg-white hover:bg-gray-100');
    },
    [startNode, goalNode, algorithmState, currentStep, visitedNodes]
  );

  // Get cell icon based on type
  const getCellIcon = useCallback(
    (nodeId: string, node: GraphNode) => {
      if (nodeId === startNode) {
        return <MapPin className="w-4 h-4 text-white" />;
      }

      if (nodeId === goalNode) {
        return <Target className="w-4 h-4 text-white" />;
      }

      if (node.isObstacle) {
        return <Construction className="w-3 h-3 text-white" />;
      }

      return null;
    },
    [startNode, goalNode]
  );

  // Generate random maze pattern
  const generateMaze = useCallback(() => {
    const newGraph = { ...graph };

    // Clear existing obstacles
    newGraph.nodes.forEach((node) => {
      node.isObstacle = false;
    });

    // Generate random obstacles (about 30% of cells)
    newGraph.nodes.forEach((node, nodeId) => {
      if (nodeId !== startNode && nodeId !== goalNode && Math.random() < 0.3) {
        node.isObstacle = true;
      }
    });

    setGraph(newGraph);
  }, [graph, startNode, goalNode]);

  // Clear all obstacles
  const clearObstacles = useCallback(() => {
    const newGraph = { ...graph };
    newGraph.nodes.forEach((node) => {
      node.isObstacle = false;
    });
    setGraph(newGraph);
  }, [graph]);

  // Effect to handle grid size changes
  useEffect(() => {
    if (algorithmState === 'idle') {
      updateGridSize(gridWidth, gridHeight);
    }
  }, [gridWidth, gridHeight, algorithmState, updateGridSize]);

  return (
    <div className={cn('space-y-6', className)}>
      {/* Control Panel */}
      {showControls && (
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Algorithm Controls */}
            <Button
              onClick={runAlgorithm}
              disabled={algorithmState === 'running'}
              className="flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              Algoritma Çalıştır
            </Button>

            <Button
              onClick={resetGrid}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Sıfırla
            </Button>

            <Button
              onClick={generateMaze}
              variant="outline"
              disabled={algorithmState === 'running'}
              className="flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              Rastgele Labirent
            </Button>

            <Button
              onClick={clearObstacles}
              variant="outline"
              disabled={algorithmState === 'running'}
              className="flex items-center gap-2"
            >
              <Square className="w-4 h-4" />
              Engelleri Temizle
            </Button>
          </div>

          {/* Grid Size Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Genişlik: {gridWidth}</Label>
              <Slider
                value={[gridWidth]}
                onValueChange={([value]) => setGridWidth(value)}
                min={10}
                max={40}
                step={1}
                disabled={algorithmState === 'running'}
              />
            </div>

            <div className="space-y-2">
              <Label>Yükseklik: {gridHeight}</Label>
              <Slider
                value={[gridHeight]}
                onValueChange={([value]) => setGridHeight(value)}
                min={10}
                max={30}
                step={1}
                disabled={algorithmState === 'running'}
              />
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

            <div className="space-y-2">
              <Label>Sezgisel Fonksiyon</Label>
              <select
                value={heuristicType}
                onChange={(e) =>
                  setHeuristicType(e.target.value as 'manhattan' | 'euclidean')
                }
                className="w-full p-2 border rounded"
                disabled={algorithmState === 'running'}
              >
                <option value="manhattan">Manhattan Distance</option>
                <option value="euclidean">Euclidean Distance</option>
              </select>
            </div>
          </div>

          {/* Cell Mode Selection */}
          <div className="space-y-2">
            <Label>Yerleştirme Modu</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { mode: 'start' as CellMode, label: 'Başlangıç', icon: MapPin },
                { mode: 'goal' as CellMode, label: 'Hedef', icon: Target },
                {
                  mode: 'obstacle' as CellMode,
                  label: 'Engel',
                  icon: Construction,
                },
                { mode: 'clear' as CellMode, label: 'Temizle', icon: Square },
              ].map(({ mode, label, icon: Icon }) => (
                <Button
                  key={mode}
                  variant={cellMode === mode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCellMode(mode)}
                  disabled={algorithmState === 'running'}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Algorithm Statistics */}
          {algorithmStats.nodesVisited > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-background rounded border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.pathLength}
                </div>
                <div className="text-sm text-muted-foreground">
                  Yol Uzunluğu
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {algorithmStats.nodesVisited}
                </div>
                <div className="text-sm text-muted-foreground">
                  Ziyaret Edilen Düğüm
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
        </div>
      )}

      {/* Grid Visualization */}
      <div className="flex justify-center">
        <div
          className="inline-block border-2 border-gray-400 bg-white"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridWidth}, 1fr)`,
            gap: '1px',
          }}
          onMouseLeave={() => setIsMouseDown(false)}
        >
          {Array.from({ length: gridHeight }, (_, y) =>
            Array.from({ length: gridWidth }, (_, x) => {
              const nodeId = `${x}-${y}`;
              const node = graph.nodes.get(nodeId);

              if (!node) return null;

              return (
                <div
                  key={nodeId}
                  className={getCellClasses(nodeId, node)}
                  onClick={() => handleCellClick(nodeId)}
                  onMouseDown={() => setIsMouseDown(true)}
                  onMouseUp={() => setIsMouseDown(false)}
                  onMouseEnter={() => handleCellMouseEnter(nodeId)}
                  title={`Node: ${nodeId}${node.isObstacle ? ' (Obstacle)' : ''}`}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    {getCellIcon(nodeId, node)}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 border border-gray-300 flex items-center justify-center">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <span>Başlangıç</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 border border-gray-300 flex items-center justify-center">
            <Target className="w-3 h-3 text-white" />
          </div>
          <span>Hedef</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800 border border-gray-300"></div>
          <span>Engel</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-200 border border-gray-300"></div>
          <span>Ziyaret Edildi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400 border border-gray-300"></div>
          <span>En Kısa Yol</span>
        </div>
      </div>
    </div>
  );
}
