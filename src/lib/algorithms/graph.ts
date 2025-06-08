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

export function createGridGraph(width: number, height: number): Graph {
  const nodes = new Map<string, GraphNode>();
  const edges: GraphEdge[] = [];
  const adjacencyList = new Map<string, { nodeId: string; weight: number }[]>();

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

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const currentId = `${x}-${y}`;
      const directions = [
        { dx: 0, dy: 1 }, // Down
        { dx: 1, dy: 0 }, // Right
        { dx: 0, dy: -1 }, // Up
        { dx: -1, dy: 0 }, // Left
      ];

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

export function manhattanDistance(node1: GraphNode, node2: GraphNode): number {
  return Math.abs(node1.x - node2.x) + Math.abs(node1.y - node2.y);
}

export function euclideanDistance(node1: GraphNode, node2: GraphNode): number {
  return Math.sqrt(
    Math.pow(node1.x - node2.x, 2) + Math.pow(node1.y - node2.y, 2)
  );
}

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
  const openSet = new Set<string>([startId]);
  const closedSet = new Set<string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, string>();
  const visitedNodes: GraphNode[] = [];

  const startNode = graph.nodes.get(startId)!;
  const goalNode = graph.nodes.get(goalId)!;

  graph.nodes.forEach((node, id) => {
    gScore.set(id, id === startId ? 0 : Infinity);
    fScore.set(id, id === startId ? heuristic(startNode, goalNode) : Infinity);
  });

  while (openSet.size > 0) {
    let current = Array.from(openSet).reduce((lowest, nodeId) =>
      fScore.get(nodeId)! < fScore.get(lowest)! ? nodeId : lowest
    );

    const currentNode = graph.nodes.get(current)!;
    currentNode.visited = true;
    visitedNodes.push(currentNode);

    if (current === goalId) {
      const path = reconstructPath(cameFrom, current, graph);
      return {
        path,
        visitedNodes,
        distance: gScore.get(current)!,
        success: true,
      };
    }

    openSet.delete(current);
    closedSet.add(current);

    const neighbors = graph.adjacencyList.get(current) || [];
    for (const { nodeId: neighborId, weight } of neighbors) {
      const neighbor = graph.nodes.get(neighborId)!;

      if (neighbor.isObstacle || closedSet.has(neighborId)) {
        continue;
      }

      const tentativeGScore = gScore.get(current)! + weight;

      if (!openSet.has(neighborId)) {
        openSet.add(neighborId);
      } else if (tentativeGScore >= gScore.get(neighborId)!) {
        continue; // Not a better path
      }

      cameFrom.set(neighborId, current);
      gScore.set(neighborId, tentativeGScore);
      fScore.set(neighborId, tentativeGScore + heuristic(neighbor, goalNode));
    }
  }

  return {
    path: [],
    visitedNodes,
    distance: -1,
    success: false,
  };
}

export function floydWarshall(graph: Graph): {
  distances: Map<string, Map<string, number>>;
  next: Map<string, Map<string, string | null>>;
} {
  const nodeIds = Array.from(graph.nodes.keys());
  const distances = new Map<string, Map<string, number>>();
  const next = new Map<string, Map<string, string | null>>();

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

  graph.edges.forEach((edge) => {
    distances.get(edge.from)!.set(edge.to, edge.weight);
    next.get(edge.from)!.set(edge.to, edge.to);
  });

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

  for (const edge of sortedEdges) {
    const rootFrom = find(unionFind, edge.from);
    const rootTo = find(unionFind, edge.to);

    if (rootFrom !== rootTo) {
      union(unionFind, edge.from, edge.to);
      mstEdges.push(edge);
      totalWeight += edge.weight;
      steps.push({
        edge,
        action: 'add',
        reason: `Added edge (${edge.from} -> ${edge.to}) with weight ${edge.weight}`,
      });

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

  steps.push({
    edge: null,
    nodeId: startId,
    action: 'start',
    reason: `Starting from node ${startId}`,
  });

  while (visited.size < graph.nodes.size) {
    let minWeight = Infinity;
    let selectedEdge: GraphEdge | null = null;

    for (const edge of graph.edges) {
      const fromVisited = visited.has(edge.from);
      const toVisited = visited.has(edge.to);

      if (fromVisited !== toVisited && edge.weight < minWeight) {
        minWeight = edge.weight;
        selectedEdge = edge;
      }
    }

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

export function createUnionFind(nodes: string[]): UnionFind {
  const parent = new Map<string, string>();
  const rank = new Map<string, number>();

  nodes.forEach((node) => {
    parent.set(node, node);
    rank.set(node, 0);
  });

  return { parent, rank };
}

export function find(unionFind: UnionFind, node: string): string {
  if (unionFind.parent.get(node) !== node) {
    unionFind.parent.set(node, find(unionFind, unionFind.parent.get(node)!));
  }
  return unionFind.parent.get(node)!;
}

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

  if (rank1 < rank2) {
    unionFind.parent.set(root1, root2);
  } else if (rank1 > rank2) {
    unionFind.parent.set(root2, root1);
  } else {
    unionFind.parent.set(root2, root1);
    unionFind.rank.set(root1, rank1 + 1);
  }
}

function reconstructPath(
  cameFrom: Map<string, string>,
  current: string,
  graph: Graph
): GraphNode[] {
  const path: GraphNode[] = [];
  let currentNode = current;

  while (currentNode) {
    const node = graph.nodes.get(currentNode)!;
    node.inPath = true;
    path.unshift(node);
    currentNode = cameFrom.get(currentNode)!;
  }

  return path;
}

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
