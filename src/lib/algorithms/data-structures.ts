export interface TrieNode {
  children: Map<string, TrieNode>;
  isEndOfWord: boolean;
  value?: string;
  count?: number;
}

export interface SegmentTreeNode {
  start: number;
  end: number;
  sum: number;
  min: number;
  max: number;
  left?: SegmentTreeNode;
  right?: SegmentTreeNode;
}

export class Trie {
  private root: TrieNode;
  private wordCount: number;

  constructor() {
    this.root = this.createNode();
    this.wordCount = 0;
  }

  private createNode(): TrieNode {
    return {
      children: new Map<string, TrieNode>(),
      isEndOfWord: false,
      count: 0,
    };
  }

  public insert(word: string): void {
    if (!word || word.length === 0) return;

    let currentNode = this.root;

    for (const char of word.toLowerCase()) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, this.createNode());
      }
      currentNode = currentNode.children.get(char)!;
    }

    if (!currentNode.isEndOfWord) {
      this.wordCount++;
    }
    currentNode.isEndOfWord = true;
    currentNode.value = word;
    currentNode.count = (currentNode.count || 0) + 1;
  }

  public search(word: string): boolean {
    if (!word || word.length === 0) return false;

    const node = this.findNode(word.toLowerCase());
    return node !== null && node.isEndOfWord;
  }

  public startsWith(prefix: string): boolean {
    if (!prefix || prefix.length === 0) return true;

    return this.findNode(prefix.toLowerCase()) !== null;
  }

  public getWordsWithPrefix(prefix: string): string[] {
    const words: string[] = [];
    const prefixNode = this.findNode(prefix.toLowerCase());

    if (prefixNode) {
      this.collectWords(prefixNode, prefix.toLowerCase(), words);
    }

    return words;
  }

  public delete(word: string): boolean {
    if (!word || word.length === 0) return false;

    return this.deleteHelper(this.root, word.toLowerCase(), 0);
  }

  public getAllWords(): string[] {
    const words: string[] = [];
    this.collectWords(this.root, '', words);
    return words;
  }

  public getWordCount(): number {
    return this.wordCount;
  }

  private findNode(word: string): TrieNode | null {
    let currentNode = this.root;

    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return null;
      }
      currentNode = currentNode.children.get(char)!;
    }

    return currentNode;
  }

  private collectWords(node: TrieNode, prefix: string, words: string[]): void {
    if (node.isEndOfWord && node.value) {
      words.push(node.value);
    }

    node.children.forEach((childNode, char) => {
      this.collectWords(childNode, prefix + char, words);
    });
  }

  private deleteHelper(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) {
        return false; // Word doesn't exist
      }

      node.isEndOfWord = false;
      node.value = undefined;
      this.wordCount--;

      return node.children.size === 0;
    }

    const char = word[index];
    const childNode = node.children.get(char);

    if (!childNode) {
      return false; // Word doesn't exist
    }

    const shouldDeleteChild = this.deleteHelper(childNode, word, index + 1);

    if (shouldDeleteChild) {
      node.children.delete(char);
      return !node.isEndOfWord && node.children.size === 0;
    }

    return false;
  }
}

export class SegmentTree {
  private root: SegmentTreeNode | null;
  private originalArray: number[];

  constructor(array: number[]) {
    this.originalArray = [...array];
    this.root =
      array.length > 0 ? this.buildTree(array, 0, array.length - 1) : null;
  }

  private buildTree(
    array: number[],
    start: number,
    end: number
  ): SegmentTreeNode {
    if (start === end) {
      return {
        start,
        end,
        sum: array[start],
        min: array[start],
        max: array[start],
      };
    }

    const mid = Math.floor((start + end) / 2);
    const leftChild = this.buildTree(array, start, mid);
    const rightChild = this.buildTree(array, mid + 1, end);

    return {
      start,
      end,
      sum: leftChild.sum + rightChild.sum,
      min: Math.min(leftChild.min, rightChild.min),
      max: Math.max(leftChild.max, rightChild.max),
      left: leftChild,
      right: rightChild,
    };
  }

  public querySum(queryStart: number, queryEnd: number): number {
    if (!this.root || queryStart > queryEnd) return 0;
    return this.querySumHelper(this.root, queryStart, queryEnd);
  }

  public queryMin(queryStart: number, queryEnd: number): number {
    if (!this.root || queryStart > queryEnd) return Infinity;
    return this.queryMinHelper(this.root, queryStart, queryEnd);
  }

  public queryMax(queryStart: number, queryEnd: number): number {
    if (!this.root || queryStart > queryEnd) return -Infinity;
    return this.queryMaxHelper(this.root, queryStart, queryEnd);
  }

  public update(index: number, newValue: number): void {
    if (!this.root || index < 0 || index >= this.originalArray.length) return;

    this.originalArray[index] = newValue;
    this.updateHelper(this.root, index, newValue);
  }

  public updateRange(
    updateStart: number,
    updateEnd: number,
    delta: number
  ): void {
    if (!this.root || updateStart > updateEnd) return;

    for (let i = updateStart; i <= updateEnd; i++) {
      if (i >= 0 && i < this.originalArray.length) {
        this.originalArray[i] += delta;
      }
    }

    this.root = this.buildTree(
      this.originalArray,
      0,
      this.originalArray.length - 1
    );
  }

  public getArray(): number[] {
    return [...this.originalArray];
  }

  private querySumHelper(
    node: SegmentTreeNode,
    queryStart: number,
    queryEnd: number
  ): number {
    if (queryStart <= node.start && queryEnd >= node.end) {
      return node.sum;
    }

    if (queryEnd < node.start || queryStart > node.end) {
      return 0;
    }

    let result = 0;
    if (node.left) {
      result += this.querySumHelper(node.left, queryStart, queryEnd);
    }
    if (node.right) {
      result += this.querySumHelper(node.right, queryStart, queryEnd);
    }

    return result;
  }

  private queryMinHelper(
    node: SegmentTreeNode,
    queryStart: number,
    queryEnd: number
  ): number {
    if (queryStart <= node.start && queryEnd >= node.end) {
      return node.min;
    }

    if (queryEnd < node.start || queryStart > node.end) {
      return Infinity;
    }

    let leftMin = Infinity;
    let rightMin = Infinity;

    if (node.left) {
      leftMin = this.queryMinHelper(node.left, queryStart, queryEnd);
    }
    if (node.right) {
      rightMin = this.queryMinHelper(node.right, queryStart, queryEnd);
    }

    return Math.min(leftMin, rightMin);
  }

  private queryMaxHelper(
    node: SegmentTreeNode,
    queryStart: number,
    queryEnd: number
  ): number {
    if (queryStart <= node.start && queryEnd >= node.end) {
      return node.max;
    }

    if (queryEnd < node.start || queryStart > node.end) {
      return -Infinity;
    }

    let leftMax = -Infinity;
    let rightMax = -Infinity;

    if (node.left) {
      leftMax = this.queryMaxHelper(node.left, queryStart, queryEnd);
    }
    if (node.right) {
      rightMax = this.queryMaxHelper(node.right, queryStart, queryEnd);
    }

    return Math.max(leftMax, rightMax);
  }

  private updateHelper(
    node: SegmentTreeNode,
    index: number,
    newValue: number
  ): void {
    if (node.start === node.end) {
      node.sum = newValue;
      node.min = newValue;
      node.max = newValue;
      return;
    }

    const mid = Math.floor((node.start + node.end) / 2);
    if (index <= mid && node.left) {
      this.updateHelper(node.left, index, newValue);
    } else if (node.right) {
      this.updateHelper(node.right, index, newValue);
    }

    if (node.left && node.right) {
      node.sum = node.left.sum + node.right.sum;
      node.min = Math.min(node.left.min, node.right.min);
      node.max = Math.max(node.left.max, node.right.max);
    }
  }

  public getTreeStructure(): SegmentTreeNode | null {
    return this.root;
  }

  public getHeight(): number {
    return this.getHeightHelper(this.root);
  }

  private getHeightHelper(node: SegmentTreeNode | null): number {
    if (!node) return 0;

    const leftHeight = this.getHeightHelper(node.left || null);
    const rightHeight = this.getHeightHelper(node.right || null);

    return 1 + Math.max(leftHeight, rightHeight);
  }
}
