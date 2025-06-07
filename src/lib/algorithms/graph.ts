export interface GraphNode {
  id: string;
  x: number;
  y: number;
  isObstacle?: boolean;
  distance?: number;
  parent?: GraphNode | null;
  visited?: boolean;
  inPath?: boolean;
  gScore?: number;
  fScore?: number;
  hScore?: number;
}

export interface GraphEdge {
  from: string;
  to: string;
  weight: number;
  selected?: boolean;
}

export interface Graph {
  nodes: Map<string, GraphNode>;
  edges: GraphEdge[];
  adjacencyList: Map<string, { nodeId: string; weight: number }[]>;
}

export interface UnionFind {
  parent: Map<string, string>;
  rank: Map<string, number>;
}

// Utility function to create a grid-based graph for pathfinding algorithms
export function createGridGraph(width: number, height: number): Graph {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const adjacencyList = new Map<string, { nodeId: string; weight: number }[]>();

  // Create nodes for each grid position
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const nodeId = `${x}-${y}`;
      nodes.set(nodeId, {
        id: nodeId,
        x,
        y,
        distance: Infinity,
        visited: false,
        inPath: false,
        parent: null,
      });
      adjacencyList.set(nodeId, []);
    }
  }

  // Create edges between adjacent nodes (4-directional movement)
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const currentId = `${x}-${y}`;
      const directions = [
        { dx: 0, dy: 1 }, // Down
        { dx: 1, dy: 0 }, // Right
        { dx: 0, dy: -1 }, // Up
        { dx: -1, dy: 0 }, // Left
      ];

      // Add edges to adjacent nodes
      directions.forEach(({ dx, dy }) => {
        const newX = x + dx;
        const newY = y + dy;
        const neighborId = `${newX}-${newY}`;

        if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
          const edge: GraphEdge = {
            from: currentId,
            to: neighborId,
            weight: 1,
          };
          edges.push(edge);
          adjacencyList.get(currentId)!.push({ nodeId: neighborId, weight: 1 });
        }
      });
    }
  }

  return { nodes, edges, adjacencyList };
}

// Heuristic function for A* algorithm using Manhattan distance
export function manhattanDistance(node1: GraphNode, node2: GraphNode): number {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}

// Heuristic function for A* algorithm using Euclidean distance
export function euclideanDistance(node1: GraphNode, node2: GraphNode): number {
  return Math.sqrt(
    Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
  );
}

// A* pathfinding algorithm implementation
export function aStar(
  graph: Graph,
  startId: string,
  goalId: string,
  heuristic: (node1: GraphNode, node2: GraphNode) => number = manhattanDistance
): {
  path: GraphNode[];
  visitedNodes: GraphNode[];
  distance: number;
  success: boolean;
} {
  // Initialize priority queue and tracking sets
  const openSet = new Set<string>([startId]);
  const closedSet = new Set<string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, string>();
  const visitedNodes: GraphNode[] = [];

  const startNode = graph.nodes.get(startId)!;
  const goalNode = graph.nodes.get(goalId)!;

  // Initialize scores for all nodes
  graph.nodes.forEach((node, id) => {
    gScore.set(id, id === startId ? 0 : Infinity);
    fScore.set(id, id === startId ? heuristic(startNode, goalNode) : Infinity);
  });

  // Main A* algorithm loop
  while (openSet.size > 0) {
    // Find node with lowest f-score in open set
    let current = Array.from(openSet).reduce((lowest, nodeId) =>
      fScore.get(nodeId)! < fScore.get(lowest)! ? nodeId : lowest
    );

    // Mark current node as visited for visualization
    const currentNode = graph.nodes.get(current)!;
    currentNode.visited = true;
    visitedNodes.push(currentNode);

    // Goal reached - reconstruct and return path
    if (current === goalId) {
      const path = reconstructPath(cameFrom, current, graph);
      return {
        path,
        visitedNodes,
        distance: gScore.get(current)!,
        success: true,
      };
    }

    // Move current node from open to closed set
    openSet.delete(current);
    closedSet.add(current);

    // Examine each neighbor of current node
    const neighbors = graph.adjacencyList.get(current) || [];
    for (const { nodeId: neighborId, weight } of neighbors) {
      const neighbor = graph.nodes.get(neighborId)!;

      // Skip obstacles and already processed nodes
      if (neighbor.isObstacle || closedSet.has(neighborId)) {
        continue;
      }

      const tentativeGScore = gScore.get(current)! + weight;

      // Add neighbor to open set if not already there
      if (!openSet.has(neighborId)) {
        openSet.add(neighborId);
      } else if (tentativeGScore >= gScore.get(neighborId)!) {
        continue; // Not a better path
      }

      // Record the best path to this neighbor
      cameFrom.set(neighborId, current);
      gScore.set(neighborId, tentativeGScore);
      fScore.set(neighborId, tentativeGScore + heuristic(neighbor, goalNode));
    }
  }

  // No path found
  return {
    path: [],
    visitedNodes,
    distance: -1,
    success: false,
  };
}

// Floyd-Warshall algorithm for all-pairs shortest paths
export function floydWarshall(graph: Graph): {
  distances: Map<string, Map<string, number>>;
  next: Map<string, Map<string, string | null>>;
} {
  const nodeIds = Array.from(graph.nodes.keys());
  const distances = new Map<string, Map<string, number>>();
  const next = new Map<string, Map<string, string | null>>();

  // Initialize distance and next matrices
  nodeIds.forEach((i) => {
    distances.set(i, new Map<string, number>());
    next.set(i, new Map<string, string | null>());

    nodeIds.forEach((j) => {
      if (i === j) {
        distances.get(i)!.set(j, 0);
      } else {
        distances.get(i)!.set(j, Infinity);
      }
      next.get(i)!.set(j, null);
    });
  });

  // Set direct edge distances
  graph.edges.forEach((edge) => {
    distances.get(edge.from)!.set(edge.to, edge.weight);
    next.get(edge.from)!.set(edge.to, edge.to);
  });

  // Main Floyd-Warshall algorithm - find shortest paths through all intermediate nodes
  nodeIds.forEach((k) => {
    nodeIds.forEach((i) => {
      nodeIds.forEach((j) => {
        const currentDistance = distances.get(i)!.get(j)!;
        const newDistance =
          distances.get(i)!.get(k)! + distances.get(k)!.get(j)!;

        if (newDistance < currentDistance) {
          distances.get(i)!.set(j, newDistance);
          next.get(i)!.set(j, next.get(i)!.get(k) || null);
        }
      });
    });
  });

  return { distances, next };
}

// Kruskal's algorithm for Minimum Spanning Tree
export function kruskal(graph: Graph): {
  mstEdges: GraphEdge[];
  totalWeight: number;
  steps: { edge: GraphEdge; action: 'add' | 'reject'; reason: string }[];
} {
  const sortedEdges = [...graph.edges].sort((a, b) => a.weight - b.weight);
  const mstEdges: GraphEdge[] = [];
  const steps: { edge: GraphEdge; action: 'add' | 'reject'; reason: string }[] =
    [];
  const unionFind = createUnionFind(Array.from(graph.nodes.keys()));
  let totalWeight = 0;

  // Process edges in order of increasing weight
  for (const edge of sortedEdges) {
    const rootFrom = find(unionFind, edge.from);
    const rootTo = find(unionFind, edge.to);

    // Check if adding this edge would create a cycle
    if (rootFrom !== rootTo) {
      union(unionFind, edge.from, edge.to);
      mstEdges.push(edge);
      totalWeight += edge.weight;
      steps.push({
        edge,
        action: 'add',
        reason: `Added edge (${edge.from} -> ${edge.to}) with weight ${edge.weight}`,
      });

      // Stop when we have n-1 edges for n nodes
      if (mstEdges.length === graph.nodes.size - 1) {
        break;
      }
    } else {
      steps.push({
        edge,
        action: 'reject',
        reason: `Rejected edge (${edge.from} -> ${edge.to}) - would create cycle`,
      });
    }
  }

  return { mstEdges, totalWeight, steps };
}

// Prim's algorithm for Minimum Spanning Tree
export function prim(
  graph: Graph,
  startNodeId?: string
): {
  mstEdges: GraphEdge[];
  totalWeight: number;
  steps: {
    edge: GraphEdge | null;
    nodeId: string;
    action: 'start' | 'add';
    reason: string;
  }[];
} {
  const nodeIds = Array.from(graph.nodes.keys());
  const startId = startNodeId || nodeIds[0];
  const visited = new Set<string>([startId]);
  const mstEdges: GraphEdge[] = [];
  const steps: {
    edge: GraphEdge | null;
    nodeId: string;
    action: 'start' | 'add';
    reason: string;
  }[] = [];
  let totalWeight = 0;

  // Initialize with starting node
  steps.push({
    edge: null,
    nodeId: startId,
    action: 'start',
    reason: `Starting from node ${startId}`,
  });

  // Continue until all nodes are included in MST
  while (visited.size < graph.nodes.size) {
    let minWeight = Infinity;
    let selectedEdge: GraphEdge | null = null;

    // Find minimum weight edge connecting visited to unvisited nodes
    for (const edge of graph.edges) {
      const fromVisited = visited.has(edge.from);
      const toVisited = visited.has(edge.to);

      // Edge must connect a visited node to an unvisited node
      if (fromVisited !== toVisited && edge.weight < minWeight) {
        minWeight = edge.weight;
        selectedEdge = edge;
      }
    }

    // Add the selected edge and node to MST
    if (selectedEdge) {
      const newNodeId = visited.has(selectedEdge.from)
        ? selectedEdge.to
        : selectedEdge.from;
      visited.add(newNodeId);
      mstEdges.push(selectedEdge);
      totalWeight += selectedEdge.weight;

      steps.push({
        edge: selectedEdge,
        nodeId: newNodeId,
        action: 'add',
        reason: `Added edge (${selectedEdge.from} -> ${selectedEdge.to}) with weight ${selectedEdge.weight}`,
      });
    }
  }

  return { mstEdges, totalWeight, steps };
}

// Union-Find data structure implementation for Kruskal's algorithm
export function createUnionFind(nodes: string[]): UnionFind {
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();

  // Initialize each node as its own parent with rank 0
  nodes.forEach((node) => {
    parent.set(node, node);
    rank.set(node, 0);
  });

  return { parent, rank };
}

// Find operation with path compression for Union-Find
export function find(unionFind: UnionFind, node: string): string {
  if (unionFind.parent.get(node) !== node) {
    // Path compression optimization
    unionFind.parent.set(node, find(unionFind, unionFind.parent.get(node)!));
  }
  return unionFind.parent.get(node)!;
}

// Union operation by rank for Union-Find
export function union(
  unionFind: UnionFind,
  node1: string,
  node2: string
): void {
  const root1 = find(unionFind, node1);
  const root2 = find(unionFind, node2);

  if (root1 === root2) return;

  const rank1 = unionFind.rank.get(root1)!;
  const rank2 = unionFind.rank.get(root2)!;

  // Union by rank optimization
  if (rank1 < rank2) {
    unionFind.parent.set(root1, root2);
  } else if (rank1 > rank2) {
    unionFind.parent.set(root2, root1);
  } else {
    unionFind.parent.set(root2, root1);
    unionFind.rank.set(root1, rank1 + 1);
  }
}

// Reconstruct path from A* algorithm result
function reconstructPath(
  cameFrom: Map<string, string>,
  current: string,
  graph: Graph
): GraphNode[] {
  const path: GraphNode[] = [];
  let currentNode = current;

  // Trace back from goal to start using parent pointers
  while (currentNode) {
    const node = graph.nodes.get(currentNode)!;
    node.inPath = true;
    path.unshift(node);
    currentNode = cameFrom.get(currentNode)!;
  }

  return path;
}

// Reset graph state for new algorithm runs
export function resetGraphState(graph: Graph): void {
  graph.nodes.forEach((node) => {
    node.visited = false;
    node.inPath = false;
    node.distance = Infinity;
    node.parent = null;
    node.gScore = undefined;
    node.fScore = undefined;
    node.hScore = undefined;
  });

  graph.edges.forEach((edge) => {
    edge.selected = false;
  });
}
