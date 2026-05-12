export const categories = [
  { id: 'all', label: 'All' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'pathfinding', label: 'Pathfinding' },
]

export const complexities = [
  { id: 'all', label: 'All' },
  { id: 'O(n)', label: 'O(n)' },
  { id: 'O(n log n)', label: 'O(n log n)' },
  { id: 'O(n²)', label: 'O(n²)' },
]

export const performanceLevels = [
  { id: 'all', label: 'All' },
  { id: 'excellent', label: 'Excellent' },
  { id: 'good', label: 'Good' },
  { id: 'fair', label: 'Fair' },
  { id: 'poor', label: 'Poor' },
]

export const algorithms = [
  // SORTING ALGORITHMS
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    performance: 'poor',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    tags: ['comparison', 'in-place', 'stable'],
    pythonCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr`,
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'sorting',
    bestCase: 'O(n²)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    performance: 'poor',
    description: 'Finds the minimum element and places it at the beginning. Repeats for the remaining unsorted portion of the array.',
    tags: ['comparison', 'in-place', 'not stable'],
    pythonCode: `def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'sorting',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    performance: 'fair',
    description: 'Builds the sorted array one item at a time by repeatedly picking the next element and inserting it into its correct position among the already sorted elements.',
    tags: ['comparison', 'in-place', 'stable', 'online'],
    pythonCode: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(n)',
    performance: 'good',
    description: 'Divides the array in half, recursively sorts each half, then merges the two sorted halves back together.',
    tags: ['comparison', 'divide-and-conquer', 'stable'],
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(log n)',
    performance: 'good',
    description: 'Picks a pivot element and partitions the array around it, then recursively sorts the sub-arrays on each side.',
    tags: ['comparison', 'divide-and-conquer', 'in-place'],
    pythonCode: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)`,
  },
  // PATHFINDING ALGORITHMS
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    worstCase: 'O(V + E)',
    spaceComplexity: 'O(V)',
    performance: 'good',
    description: 'Explores all neighbors at the present depth before moving on to nodes at the next depth level. Guarantees shortest path in unweighted graphs.',
    tags: ['graph', 'unweighted', 'optimal'],
    pythonCode: `from collections import deque

def bfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    queue = deque([start])
    visited.add(start)
    parent = {start: None}
    
    while queue:
        r, c = queue.popleft()
        if (r, c) == end:
            break
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols
                and grid[nr][nc] != 1
                and (nr, nc) not in visited):
                visited.add((nr, nc))
                parent[(nr, nc)] = (r, c)
                queue.append((nr, nc))
    
    # Reconstruct path
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = parent[cur]
    return path[::-1]`,
  },
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O((V + E) log V)',
    worstCase: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    performance: 'good',
    description: 'Finds the shortest path from a start node to all other nodes in a weighted graph. Uses a priority queue to always explore the closest unvisited node first.',
    tags: ['graph', 'weighted', 'optimal', 'greedy'],
    pythonCode: `import heapq

def dijkstra(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    dist = {start: 0}
    visited = set()
    parent = {start: None}
    heap = [(0, start)]
    
    while heap:
        d, (r, c) = heapq.heappop(heap)
        if (r, c) in visited:
            continue
        visited.add((r, c))
        if (r, c) == end:
            break
        for dr, dc, w in [(-1,0,1),(1,0,1),(0,-1,1),(0,1,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                nd = d + w
                if nd < dist.get((nr, nc), float('inf')):
                    dist[(nr, nc)] = nd
                    parent[(nr, nc)] = (r, c)
                    heapq.heappush(heap, (nd, (nr, nc)))
    
    # Reconstruct path
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = parent[cur]
    return path[::-1]`,
  },
  {
    id: 'a-star',
    name: 'A* Search',
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O((V + E) log V)',
    worstCase: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    performance: 'excellent',
    description: "Combines Dijkstra's algorithm with a heuristic (Manhattan distance) to guide the search toward the goal. Often finds the optimal path faster than Dijkstra by prioritizing promising directions.",
    tags: ['graph', 'weighted', 'optimal', 'heuristic', 'greedy'],
    pythonCode: `import heapq

def a_star(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    def h(r, c):
        return abs(r - end[0]) + abs(c - end[1])
    
    dist = {start: 0}
    visited = set()
    parent = {start: None}
    heap = [(h(*start), 0, start)]
    
    while heap:
        f, d, (r, c) = heapq.heappop(heap)
        if (r, c) in visited:
            continue
        visited.add((r, c))
        if (r, c) == end:
            break
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                nd = d + 1
                if nd < dist.get((nr, nc), float('inf')):
                    dist[(nr, nc)] = nd
                    parent[(nr, nc)] = (r, c)
                    heapq.heappush(heap, (nd + h(nr, nc), nd, (nr, nc)))
    
    # Reconstruct path
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = parent[cur]
    return path[::-1]`,
  },
]
