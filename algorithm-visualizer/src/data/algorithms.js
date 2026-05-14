export const categories = [
  { id: 'all', label: 'All' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'pathfinding', label: 'Pathfinding' },
  { id: 'search', label: 'Search' },
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
  // SEARCH ALGORITHMS
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'search',
    bestCase: 'O(1)',
    averageCase: 'O(log n)',
    worstCase: 'O(log n)',
    spaceComplexity: 'O(1)',
    performance: 'excellent',
    description: 'Searches a sorted array by repeatedly dividing the search interval in half. Compares the target to the middle element and eliminates half the remaining elements each step.',
    tags: ['comparison', 'sorted', 'divide-and-conquer'],
    pythonCode: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
  },
  {
    id: 'linear-search',
    name: 'Linear Search',
    category: 'search',
    bestCase: 'O(1)',
    averageCase: 'O(n)',
    worstCase: 'O(n)',
    spaceComplexity: 'O(1)',
    performance: 'poor',
    description: 'Checks each element of the array sequentially until the target is found or the end is reached. Simple but slow for large datasets.',
    tags: ['comparison', 'unsorted', 'simple'],
    pythonCode: `def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1`,
  },
  // SORTING ALGORITHMS
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(1)',
    performance: 'good',
    description: 'Builds a max heap from the array, then repeatedly extracts the maximum element and places it at the end. Combines the best of merge sort and insertion sort.',
    tags: ['comparison', 'heap', 'in-place', 'not stable'],
    pythonCode: `def heap_sort(arr):
    n = len(arr)
    def heapify(n, i):
        largest = i
        l, r = 2*i + 1, 2*i + 2
        if l < n and arr[l] > arr[largest]:
            largest = l
        if r < n and arr[r] > arr[largest]:
            largest = r
        if largest != i:
            arr[i], arr[largest] = arr[largest], arr[i]
            heapify(n, largest)
    for i in range(n//2 - 1, -1, -1):
        heapify(n, i)
    for i in range(n-1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(i, 0)
    return arr`,
  },
  {
    id: 'radix-sort',
    name: 'Radix Sort',
    category: 'sorting',
    bestCase: 'O(nk)',
    averageCase: 'O(nk)',
    worstCase: 'O(nk)',
    spaceComplexity: 'O(n+k)',
    performance: 'good',
    description: 'Sorts numbers digit by digit from least significant to most significant using counting sort as a subroutine. Works only on integers or fixed-length strings.',
    tags: ['non-comparison', 'integer', 'stable'],
    pythonCode: `def radix_sort(arr):
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        index = arr[i] // exp
        count[index % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n - 1, -1, -1):
        index = arr[i] // exp
        output[count[index % 10] - 1] = arr[i]
        count[index % 10] -= 1
    for i in range(n):
        arr[i] = output[i]`,
  },
  {
    id: 'counting-sort',
    name: 'Counting Sort',
    category: 'sorting',
    bestCase: 'O(n+k)',
    averageCase: 'O(n+k)',
    worstCase: 'O(n+k)',
    spaceComplexity: 'O(k)',
    performance: 'good',
    description: 'Counts the occurrences of each distinct value, then computes positions. Very fast when the range of values (k) is not significantly larger than the number of elements (n).',
    tags: ['non-comparison', 'integer', 'stable'],
    pythonCode: `def counting_sort(arr):
    if not arr: return arr
    k = max(arr)
    count = [0] * (k + 1)
    output = [0] * len(arr)
    for num in arr:
        count[num] += 1
    for i in range(1, k + 1):
        count[i] += count[i - 1]
    for i in range(len(arr) - 1, -1, -1):
        output[count[arr[i]] - 1] = arr[i]
        count[arr[i]] -= 1
    return output`,
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
    id: 'dfs',
    name: 'Depth-First Search',
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    worstCase: 'O(V + E)',
    spaceComplexity: 'O(V)',
    performance: 'fair',
    description: 'Explores as far as possible along each branch before backtracking. Uses a stack (or recursion) to traverse the graph. Does not guarantee shortest path.',
    tags: ['graph', 'unweighted', 'not optimal', 'recursive'],
    pythonCode: `def dfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited = set()
    parent = {start: None}
    
    def recurse(r, c):
        if (r, c) == end:
            return True
        visited.add((r, c))
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if (0 <= nr < rows and 0 <= nc < cols
                and grid[nr][nc] != 1
                and (nr, nc) not in visited):
                parent[(nr, nc)] = (r, c)
                if recurse(nr, nc):
                    return True
        return False
    
    recurse(*start)
    # Reconstruct path
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = parent[cur]
    return path[::-1]`,
  },
  {
    id: 'greedy-best-first',
    name: 'Greedy Best-First Search',
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    worstCase: 'O(V + E)',
    spaceComplexity: 'O(V)',
    performance: 'fair',
    description: 'Always expands the node closest to the goal based on a heuristic. Fast but does not guarantee the shortest or optimal path.',
    tags: ['graph', 'heuristic', 'greedy', 'not optimal'],
    pythonCode: `import heapq

def greedy_best_first(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    def h(r, c):
        return abs(r - end[0]) + abs(c - end[1])
    visited = set()
    parent = {start: None}
    heap = [(h(*start), start)]
    
    while heap:
        _, (r, c) = heapq.heappop(heap)
        if (r, c) in visited:
            continue
        visited.add((r, c))
        if (r, c) == end:
            break
        for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1 and (nr, nc) not in visited:
                parent[(nr, nc)] = (r, c)
                heapq.heappush(heap, (h(nr, nc), (nr, nc)))
    
    # Reconstruct path
    path = []
    cur = end
    while cur:
        path.append(cur)
        cur = parent[cur]
    return path[::-1]`,
  },
  {
    id: 'bidirectional-search',
    name: 'Bidirectional Search',
    category: 'pathfinding',
    bestCase: 'O(b^(d/2))',
    averageCase: 'O(b^(d/2))',
    worstCase: 'O(b^d)',
    spaceComplexity: 'O(b^(d/2))',
    performance: 'good',
    description: 'Runs two simultaneous searches — one from the start and one from the goal — and stops when they meet. Reduces search space from O(b^d) to O(b^(d/2)).',
    tags: ['graph', 'unweighted', 'parallel', 'efficient'],
    pythonCode: `from collections import deque

def bidirectional_bfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    visited_f = {start}
    visited_b = {end}
    parent_f = {start: None}
    parent_b = {end: None}
    queue_f = deque([start])
    queue_b = deque([end])
    
    while queue_f and queue_b:
        if queue_f:
            r, c = queue_f.popleft()
            if (r, c) in visited_b:
                meet = (r, c)
                break
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if (0 <= nr < rows and 0 <= nc < cols
                    and grid[nr][nc] != 1
                    and (nr, nc) not in visited_f):
                    visited_f.add((nr, nc))
                    parent_f[(nr, nc)] = (r, c)
                    queue_f.append((nr, nc))
        if queue_b:
            r, c = queue_b.popleft()
            if (r, c) in visited_f:
                meet = (r, c)
                break
            for dr, dc in [(-1,0),(1,0),(0,-1),(0,1)]:
                nr, nc = r + dr, c + dc
                if (0 <= nr < rows and 0 <= nc < cols
                    and grid[nr][nc] != 1
                    and (nr, nc) not in visited_b):
                    visited_b.add((nr, nc))
                    parent_b[(nr, nc)] = (r, c)
                    queue_b.append((nr, nc))
    
    # Reconstruct full path
    path = []
    cur = meet
    while cur:
        path.append(cur)
        cur = parent_f[cur]
    path.reverse()
    cur = parent_b[meet]
    while cur:
        path.append(cur)
        cur = parent_b[cur]
    return path`,
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
