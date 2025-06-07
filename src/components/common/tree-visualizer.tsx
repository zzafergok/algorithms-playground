'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Minus,
  RotateCcw,
  Search,
  TreePine,
  FolderTree,
  Trash2,
} from 'lucide-react';
import { Trie, SegmentTreeNode } from '@/lib/algorithms/data-structures';
import { cn } from '@/lib/utils';

interface TreeVisualizerProps {
  className?: string;
  treeType?: 'trie' | 'segment';
  showControls?: boolean;
  initialData?: string[] | number[];
}

interface TrieVisualizationNode {
  char: string;
  isEndOfWord: boolean;
  children: TrieVisualizationNode[];
  level: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
  word?: string;
  count?: number;
}

interface SegmentTreeVisualizationNode {
  value: string;
  start: number;
  end: number;
  sum: number;
  min: number;
  max: number;
  children: SegmentTreeVisualizationNode[];
  level: number;
  x: number;
  y: number;
  parentX?: number;
  parentY?: number;
  isLeaf: boolean;
}

// Tree visualizer component for Trie and Segment Tree data structures
export function TreeVisualizer({
  className,
  treeType = 'trie',
  showControls = true,
  initialData,
}: TreeVisualizerProps) {
  // Core state management for both tree types
  const [currentTreeType, setCurrentTreeType] = useState<'trie' | 'segment'>(
    treeType
  );

  // Trie-specific state
  const [trie, setTrie] = useState<Trie>(() => {
    const newTrie = new Trie();
    if (currentTreeType === 'trie' && initialData) {
      (initialData as string[]).forEach((word) => newTrie.insert(word));
    }
    return newTrie;
  });
  const [trieWords, setTrieWords] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [newWord, setNewWord] = useState<string>('');
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Segment Tree specific state
  const [segmentArray, setSegmentArray] = useState<number[]>(() =>
    currentTreeType === 'segment' && initialData
      ? (initialData as number[])
      : [1, 3, 5, 7, 9, 11]
  );
  const [segmentTree, setSegmentTree] = useState<any>(null);
  const [queryStart, setQueryStart] = useState<number>(0);
  const [queryEnd, setQueryEnd] = useState<number>(2);
  const [queryResult, setQueryResult] = useState<{
    sum: number;
    min: number;
    max: number;
  } | null>(null);

  // Visualization settings
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [showValues, setShowValues] = useState<boolean>(true);
  const [compactView, setCompactView] = useState<boolean>(false);

  // Initialize trees when type changes
  React.useEffect(() => {
    if (currentTreeType === 'trie') {
      const newTrie = new Trie();
      const defaultWords = [
        'cat',
        'car',
        'card',
        'care',
        'careful',
        'cats',
        'dog',
        'dogs',
      ];
      defaultWords.forEach((word) => newTrie.insert(word));
      setTrie(newTrie);
      setTrieWords(defaultWords);
    } else {
      // Initialize segment tree will be done in the segment tree section
      buildSegmentTree();
    }
  }, [currentTreeType]);

  // Build segment tree from current array
  const buildSegmentTree = useCallback(() => {
    if (segmentArray.length === 0) return;

    const { SegmentTree } = require('@/lib/algorithms/data-structures');
    const newTree = new SegmentTree(segmentArray);
    setSegmentTree(newTree);
  }, [segmentArray]);

  // Convert Trie to visualization format
  const convertTrieToVisualization =
    useCallback((): TrieVisualizationNode[] => {
      const nodes: TrieVisualizationNode[] = [];
      const nodeWidth = 60;
      const nodeHeight = 40;
      const levelHeight = 80;

      // Create root node
      const root: TrieVisualizationNode = {
        char: 'ROOT',
        isEndOfWord: false,
        children: [],
        level: 0,
        x: 0,
        y: 0,
      };

      // BFS traversal to build visualization tree
      const queue: {
        trieNode: any;
        visNode: TrieVisualizationNode;
        path: string;
        level: number;
      }[] = [
        { trieNode: (trie as any).root, visNode: root, path: '', level: 0 },
      ];

      const levelNodes: TrieVisualizationNode[][] = [[]];
      levelNodes[0].push(root);

      while (queue.length > 0) {
        const { trieNode, visNode, path, level } = queue.shift()!;

        if (trieNode.children) {
          const childrenArray = Array.from(trieNode.children.entries()) as [
            string,
            any,
          ][];
          childrenArray.forEach(([char, childTrieNode]) => {
            const childPath = path + char;
            const childVisNode: TrieVisualizationNode = {
              char,
              isEndOfWord: childTrieNode.isEndOfWord,
              children: [],
              level: level + 1,
              x: 0,
              y: (level + 1) * levelHeight,
              word: childTrieNode.isEndOfWord ? childTrieNode.value : undefined,
              count: childTrieNode.count,
            };

            visNode.children.push(childVisNode);

            if (!levelNodes[level + 1]) {
              levelNodes[level + 1] = [];
            }
            levelNodes[level + 1].push(childVisNode);

            queue.push({
              trieNode: childTrieNode,
              visNode: childVisNode,
              path: childPath,
              level: level + 1,
            });
          });
        }
      }

      // Calculate positions for each level
      levelNodes.forEach((levelNodeList, level) => {
        const totalWidth = levelNodeList.length * nodeWidth * 2;
        const startX = -totalWidth / 2;

        levelNodeList.forEach((node, index) => {
          node.x = startX + index * nodeWidth * 2 + nodeWidth;
          node.y = level * levelHeight + 50;
        });
      });

      // Set parent coordinates for line drawing
      const setParentCoordinates = (
        node: TrieVisualizationNode,
        parentX?: number,
        parentY?: number
      ) => {
        if (parentX !== undefined && parentY !== undefined) {
          node.parentX = parentX;
          node.parentY = parentY;
        }

        node.children.forEach((child) => {
          setParentCoordinates(child, node.x, node.y);
        });
      };

      setParentCoordinates(root);

      return [root];
    }, [trie]);

  // Convert Segment Tree to visualization format
  const convertSegmentTreeToVisualization =
    useCallback((): SegmentTreeVisualizationNode[] => {
      if (!segmentTree) return [];

      const nodes: SegmentTreeVisualizationNode[] = [];
      const nodeWidth = 80;
      const levelHeight = 100;

      const treeRoot = segmentTree.getTreeStructure();
      if (!treeRoot) return [];

      // BFS traversal to build visualization tree
      const queue: {
        segNode: SegmentTreeNode;
        visNode: SegmentTreeVisualizationNode;
        level: number;
      }[] = [];

      const root: SegmentTreeVisualizationNode = {
        value: `[${treeRoot.start}-${treeRoot.end}]`,
        start: treeRoot.start,
        end: treeRoot.end,
        sum: treeRoot.sum,
        min: treeRoot.min,
        max: treeRoot.max,
        children: [],
        level: 0,
        x: 0,
        y: 50,
        isLeaf: treeRoot.start === treeRoot.end,
      };

      queue.push({ segNode: treeRoot, visNode: root, level: 0 });

      const levelNodes: SegmentTreeVisualizationNode[][] = [[]];
      levelNodes[0].push(root);

      while (queue.length > 0) {
        const { segNode, visNode, level } = queue.shift()!;

        if (segNode.left) {
          const leftChild: SegmentTreeVisualizationNode = {
            value: `[${segNode.left.start}-${segNode.left.end}]`,
            start: segNode.left.start,
            end: segNode.left.end,
            sum: segNode.left.sum,
            min: segNode.left.min,
            max: segNode.left.max,
            children: [],
            level: level + 1,
            x: 0,
            y: (level + 1) * levelHeight + 50,
            isLeaf: segNode.left.start === segNode.left.end,
          };

          visNode.children.push(leftChild);

          if (!levelNodes[level + 1]) {
            levelNodes[level + 1] = [];
          }
          levelNodes[level + 1].push(leftChild);

          queue.push({
            segNode: segNode.left,
            visNode: leftChild,
            level: level + 1,
          });
        }

        if (segNode.right) {
          const rightChild: SegmentTreeVisualizationNode = {
            value: `[${segNode.right.start}-${segNode.right.end}]`,
            start: segNode.right.start,
            end: segNode.right.end,
            sum: segNode.right.sum,
            min: segNode.right.min,
            max: segNode.right.max,
            children: [],
            level: level + 1,
            x: 0,
            y: (level + 1) * levelHeight + 50,
            isLeaf: segNode.right.start === segNode.right.end,
          };

          visNode.children.push(rightChild);

          if (!levelNodes[level + 1]) {
            levelNodes[level + 1] = [];
          }
          levelNodes[level + 1].push(rightChild);

          queue.push({
            segNode: segNode.right,
            visNode: rightChild,
            level: level + 1,
          });
        }
      }

      // Calculate positions for each level
      levelNodes.forEach((levelNodeList, level) => {
        const totalWidth = levelNodeList.length * nodeWidth * 1.5;
        const startX = -totalWidth / 2;

        levelNodeList.forEach((node, index) => {
          node.x = startX + index * nodeWidth * 1.5 + nodeWidth / 2;
        });
      });

      // Set parent coordinates for line drawing
      const setParentCoordinates = (
        node: SegmentTreeVisualizationNode,
        parentX?: number,
        parentY?: number
      ) => {
        if (parentX !== undefined && parentY !== undefined) {
          node.parentX = parentX;
          node.parentY = parentY;
        }

        node.children.forEach((child) => {
          setParentCoordinates(child, node.x, node.y);
        });
      };

      setParentCoordinates(root);

      return [root];
    }, [segmentTree]);

  // Trie operations
  const addWordToTrie = useCallback(() => {
    if (newWord.trim() && !trieWords.includes(newWord.trim().toLowerCase())) {
      const word = newWord.trim().toLowerCase();
      trie.insert(word);
      setTrieWords((prev) => [...prev, word]);
      setNewWord('');
    }
  }, [newWord, trie, trieWords]);

  const removeWordFromTrie = useCallback(
    (word: string) => {
      if (trie.delete(word)) {
        setTrieWords((prev) => prev.filter((w) => w !== word));
      }
    },
    [trie]
  );

  const searchInTrie = useCallback(() => {
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      const results = trie.getWordsWithPrefix(term);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, trie]);

  // Segment Tree operations
  const updateSegmentArray = useCallback(
    (index: number, newValue: string) => {
      const value = parseInt(newValue) || 0;
      const newArray = [...segmentArray];
      newArray[index] = value;
      setSegmentArray(newArray);
    },
    [segmentArray]
  );

  const addToSegmentArray = useCallback(() => {
    setSegmentArray((prev) => [...prev, 0]);
  }, []);

  const removeFromSegmentArray = useCallback(
    (index: number) => {
      if (segmentArray.length > 1) {
        setSegmentArray((prev) => prev.filter((_, i) => i !== index));
      }
    },
    [segmentArray]
  );

  const querySegmentTree = useCallback(() => {
    if (
      segmentTree &&
      queryStart <= queryEnd &&
      queryStart >= 0 &&
      queryEnd < segmentArray.length
    ) {
      const sum = segmentTree.querySum(queryStart, queryEnd);
      const min = segmentTree.queryMin(queryStart, queryEnd);
      const max = segmentTree.queryMax(queryStart, queryEnd);
      setQueryResult({ sum, min, max });
    }
  }, [segmentTree, queryStart, queryEnd, segmentArray.length]);

  // Build segment tree when array changes
  React.useEffect(() => {
    if (currentTreeType === 'segment') {
      buildSegmentTree();
    }
  }, [segmentArray, currentTreeType, buildSegmentTree]);

  // Auto-search as user types
  React.useEffect(() => {
    if (currentTreeType === 'trie') {
      searchInTrie();
    }
  }, [searchTerm, currentTreeType, searchInTrie]);

  // Get visualization data based on tree type
  const visualizationData = useMemo(() => {
    if (currentTreeType === 'trie') {
      return convertTrieToVisualization();
    } else {
      return convertSegmentTreeToVisualization();
    }
  }, [
    currentTreeType,
    convertTrieToVisualization,
    convertSegmentTreeToVisualization,
  ]);

  // Calculate SVG dimensions
  const svgDimensions = useMemo(() => {
    let minX = 0,
      maxX = 0,
      minY = 0,
      maxY = 0;

    const calculateBounds = (nodes: any[]) => {
      nodes.forEach((node) => {
        minX = Math.min(minX, node.x - 40);
        maxX = Math.max(maxX, node.x + 40);
        minY = Math.min(minY, node.y - 20);
        maxY = Math.max(maxY, node.y + 20);

        if (node.children) {
          calculateBounds(node.children);
        }
      });
    };

    calculateBounds(visualizationData);

    const width = Math.max(400, maxX - minX + 100);
    const height = Math.max(300, maxY - minY + 100);
    const viewBoxX = minX - 50;
    const viewBoxY = minY - 50;

    return { width, height, viewBoxX, viewBoxY };
  }, [visualizationData]);

  // Render tree nodes recursively
  const renderTreeNodes = useCallback(
    (nodes: any[]): JSX.Element[] => {
      const elements: JSX.Element[] = [];

      nodes.forEach((node, index) => {
        // Draw connection line to parent
        if (node.parentX !== undefined && node.parentY !== undefined) {
          elements.push(
            <line
              key={`line-${index}-${node.char || node.value}`}
              x1={node.parentX}
              y1={node.parentY}
              x2={node.x}
              y2={node.y}
              stroke="#666"
              strokeWidth="2"
            />
          );
        }

        // Draw node based on tree type
        if (currentTreeType === 'trie') {
          const trieNode = node as TrieVisualizationNode;
          elements.push(
            <g key={`node-${index}-${trieNode.char}`}>
              <circle
                cx={trieNode.x}
                cy={trieNode.y}
                r="25"
                fill={trieNode.isEndOfWord ? '#10b981' : '#e5e7eb'}
                stroke={trieNode.isEndOfWord ? '#059669' : '#6b7280'}
                strokeWidth="2"
                className="cursor-pointer hover:opacity-80"
              />
              <text
                x={trieNode.x}
                y={trieNode.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="text-sm font-bold fill-gray-700 pointer-events-none"
              >
                {trieNode.char}
              </text>
              {trieNode.isEndOfWord && trieNode.count && showValues && (
                <text
                  x={trieNode.x}
                  y={trieNode.y + 35}
                  textAnchor="middle"
                  className="text-xs fill-green-600 pointer-events-none"
                >
                  ({trieNode.count})
                </text>
              )}
              {trieNode.word && showLabels && (
                <text
                  x={trieNode.x}
                  y={trieNode.y - 35}
                  textAnchor="middle"
                  className="text-xs fill-blue-600 font-medium pointer-events-none"
                >
                  "{trieNode.word}"
                </text>
              )}
            </g>
          );
        } else {
          const segNode = node as SegmentTreeVisualizationNode;
          elements.push(
            <g key={`node-${index}-${segNode.value}`}>
              <rect
                x={segNode.x - 35}
                y={segNode.y - 15}
                width="70"
                height="30"
                fill={segNode.isLeaf ? '#fef3c7' : '#dbeafe'}
                stroke={segNode.isLeaf ? '#f59e0b' : '#3b82f6'}
                strokeWidth="2"
                rx="5"
                className="cursor-pointer hover:opacity-80"
              />
              <text
                x={segNode.x}
                y={segNode.y - 5}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-700 pointer-events-none"
              >
                {segNode.value}
              </text>
              {showValues && (
                <text
                  x={segNode.x}
                  y={segNode.y + 8}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 pointer-events-none"
                >
                  S:{segNode.sum} Min:{segNode.min} Max:{segNode.max}
                </text>
              )}
            </g>
          );
        }

        // Recursively render children
        if (node.children && node.children.length > 0) {
          elements.push(...renderTreeNodes(node.children));
        }
      });

      return elements;
    },
    [currentTreeType, showLabels, showValues]
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Control Panel */}
      {showControls && (
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          {/* Tree Type Selection */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2">
              <Label>Ağaç Türü</Label>
              <select
                value={currentTreeType}
                onChange={(e) =>
                  setCurrentTreeType(e.target.value as 'trie' | 'segment')
                }
                className="p-2 border rounded"
              >
                <option value="trie">Trie (Prefix Tree)</option>
                <option value="segment">Segment Tree</option>
              </select>
            </div>

            {/* Visualization Options */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center space-x-2">
                <Switch
                  id="show-labels"
                  checked={showLabels}
                  onCheckedChange={setShowLabels}
                />
                <Label htmlFor="show-labels">Etiketleri Göster</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="show-values"
                  checked={showValues}
                  onCheckedChange={setShowValues}
                />
                <Label htmlFor="show-values">Değerleri Göster</Label>
              </div>
            </div>
          </div>

          {/* Trie Controls */}
          {currentTreeType === 'trie' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Add Word */}
                <div className="space-y-2">
                  <Label>Kelime Ekle</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newWord}
                      onChange={(e) => setNewWord(e.target.value)}
                      placeholder="Yeni kelime..."
                      onKeyPress={(e) => e.key === 'Enter' && addWordToTrie()}
                    />
                    <Button onClick={addWordToTrie} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Search */}
                <div className="space-y-2">
                  <Label>Kelime Ara / Prefix</Label>
                  <div className="flex gap-2">
                    <Input
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Arama terimi..."
                    />
                    <Button onClick={searchInTrie} size="sm">
                      <Search className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Current Words */}
              <div className="space-y-2">
                <Label>Mevcut Kelimeler ({trie.getWordCount()})</Label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {trieWords.map((word) => (
                    <div
                      key={word}
                      className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm"
                    >
                      <span>{word}</span>
                      <Button
                        onClick={() => removeWordFromTrie(word)}
                        variant="ghost"
                        size="sm"
                        className="h-4 w-4 p-0 hover:bg-red-100"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <Label>Arama Sonuçları</Label>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.map((word) => (
                      <div
                        key={word}
                        className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm"
                      >
                        {word}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trie Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-background rounded border">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {trie.getWordCount()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Toplam Kelime
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {searchResults.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Bulunan Sonuç
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">
                    {trie.startsWith(searchTerm) ? 'Evet' : 'Hayır'}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Prefix Var mı?
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Segment Tree Controls */}
          {currentTreeType === 'segment' && (
            <div className="space-y-4">
              {/* Array Input */}
              <div className="space-y-2">
                <Label>Dizi Elemanları</Label>
                <div className="flex flex-wrap gap-2">
                  {segmentArray.map((value, index) => (
                    <div key={index} className="flex items-center gap-1">
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          updateSegmentArray(index, e.target.value)
                        }
                        className="w-16 text-center"
                      />
                      <Button
                        onClick={() => removeFromSegmentArray(index)}
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        disabled={segmentArray.length <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={addToSegmentArray}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Query Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Sorgu Başlangıç İndeksi</Label>
                  <Input
                    type="number"
                    value={queryStart}
                    onChange={(e) =>
                      setQueryStart(parseInt(e.target.value) || 0)
                    }
                    min="0"
                    max={segmentArray.length - 1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Sorgu Bitiş İndeksi</Label>
                  <Input
                    type="number"
                    value={queryEnd}
                    onChange={(e) => setQueryEnd(parseInt(e.target.value) || 0)}
                    min="0"
                    max={segmentArray.length - 1}
                  />
                </div>

                <div className="space-y-2">
                  <Label>&nbsp;</Label>
                  <Button onClick={querySegmentTree} className="w-full">
                    Sorgu Çalıştır
                  </Button>
                </div>
              </div>

              {/* Rebuild Tree Button */}
              <Button
                onClick={buildSegmentTree}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Ağacı Yeniden Oluştur
              </Button>

              {/* Query Results */}
              {queryResult && (
                <div className="p-4 bg-green-50 rounded border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">
                    Sorgu Sonucu [{queryStart}, {queryEnd}]
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-green-700">
                        Toplam:
                      </span>
                      <div className="text-xl font-bold text-green-800">
                        {queryResult.sum}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">
                        Minimum:
                      </span>
                      <div className="text-xl font-bold text-green-800">
                        {queryResult.min}
                      </div>
                    </div>
                    <div>
                      <span className="font-medium text-green-700">
                        Maksimum:
                      </span>
                      <div className="text-xl font-bold text-green-800">
                        {queryResult.max}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Segment Tree Statistics */}
              {segmentTree && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-3 bg-background rounded border">
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {segmentArray.length}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Dizi Boyutu
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {segmentTree.getHeight()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Ağaç Yüksekliği
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-primary">
                      {segmentTree.querySum(0, segmentArray.length - 1)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Toplam Değer
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tree Visualization */}
      <div className="flex justify-center">
        <div className="border-2 border-gray-300 rounded-lg bg-white overflow-auto">
          <svg
            width={svgDimensions.width}
            height={svgDimensions.height}
            viewBox={`${svgDimensions.viewBoxX} ${svgDimensions.viewBoxY} ${svgDimensions.width} ${svgDimensions.height}`}
          >
            {/* Grid background */}
            <defs>
              <pattern
                id="tree-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="#f5f5f5"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect
              x={svgDimensions.viewBoxX}
              y={svgDimensions.viewBoxY}
              width={svgDimensions.width}
              height={svgDimensions.height}
              fill="url(#tree-grid)"
            />

            {/* Render tree nodes and connections */}
            <g className="tree-visualization">
              {renderTreeNodes(visualizationData)}
            </g>
          </svg>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {currentTreeType === 'trie' && (
          <div className="space-y-2">
            <h4 className="font-semibold">Trie Düğüm Renkleri</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 border-2 border-green-600 rounded-full"></div>
                <span>Kelime sonu düğümü</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-gray-200 border-2 border-gray-500 rounded-full"></div>
                <span>Ara düğüm</span>
              </div>
            </div>
          </div>
        )}

        {currentTreeType === 'segment' && (
          <div className="space-y-2">
            <h4 className="font-semibold">Segment Tree Düğüm Renkleri</h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-yellow-200 border-2 border-yellow-600 rounded"></div>
                <span>Yaprak düğümü (tek eleman)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-4 bg-blue-200 border-2 border-blue-600 rounded"></div>
                <span>İç düğüm (aralık)</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-2">
          <h4 className="font-semibold">Genel Bilgiler</h4>
          <div className="space-y-1 text-sm">
            {currentTreeType === 'trie' ? (
              <>
                <p>• Yeşil düğümler tamamlanmış kelimeleri temsil eder</p>
                <p>
                  • Parantez içindeki sayı kelimenin kaç kez eklendiğini
                  gösterir
                </p>
                <p>• Mavi etiketler tamamlanmış kelimeyi gösterir</p>
              </>
            ) : (
              <>
                <p>
                  • Her düğüm bir aralığı ve o aralıktaki toplam/min/max
                  değerleri içerir
                </p>
                <p>• Yaprak düğümler orijinal dizi elemanlarını temsil eder</p>
                <p>• İç düğümler alt aralıkların birleşimini temsil eder</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Algorithm Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FolderTree className="w-5 h-5" />
            Trie (Prefix Tree)
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>Ekleme: O(m) - m kelime uzunluğu</li>
              <li>Arama: O(m)</li>
              <li>
                Prefix arama: O(p + k) - p prefix uzunluğu, k sonuç sayısı
              </li>
            </ul>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(ALPHABET_SIZE * N * M)
            </p>
            <p>
              <strong>Kullanım Alanları:</strong> Otomatik tamamlama, yazım
              kontrolü, IP routing
            </p>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TreePine className="w-5 h-5" />
            Segment Tree
          </h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Zaman Karmaşıklığı:</strong>
            </p>
            <ul className="list-disc pl-5">
              <li>İnşa etme: O(n)</li>
              <li>Aralık sorgusu: O(log n)</li>
              <li>Güncelleme: O(log n)</li>
            </ul>
            <p>
              <strong>Alan Karmaşıklığı:</strong> O(n)
            </p>
            <p>
              <strong>Kullanım Alanları:</strong> Aralık toplamı, min/max
              sorguları, lazy propagation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
