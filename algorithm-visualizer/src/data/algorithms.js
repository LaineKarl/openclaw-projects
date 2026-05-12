export const algorithms = [
  // ─── SORTING ALGORITHMS ───
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'sorting',
    bestCase: 'O(n)',
    averageCase: 'O(n²)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(1)',
    performance: 'slow',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.',
    pythonCode: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap if left element is larger
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        # If no swaps occurred, array is sorted
        if not swapped:
            break
    return arr`,
    tags: ['in-place', 'stable', 'simple']
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'sorting',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(n)',
    performance: 'fast',
    description: 'A divide-and-conquer algorithm that divides the array in half, sorts each half recursively, and then merges the sorted halves back together.',
    pythonCode: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    # Divide the array in half
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the sorted halves
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
    tags: ['divide-and-conquer', 'stable', 'recursive']
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'sorting',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n²)',
    spaceComplexity: 'O(log n)',
    performance: 'fast',
    description: 'Selects a pivot element and partitions the array around it, placing smaller elements before and larger elements after the pivot. Then recursively sorts the sub-arrays.',
    pythonCode: `def quick_sort(arr, low=0, high=None):
    if high is None:
        high = len(arr) - 1
    
    if low < high:
        # Partition and get pivot index
        pivot_index = partition(arr, low, high)
        # Recursively sort elements before and after partition
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)
    
    return arr

def partition(arr, low, high):
    pivot = arr[high]  # Choose last element as pivot
    i = low - 1  # Pointer for smaller element
    
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    tags: ['divide-and-conquer', 'in-place', 'recursive']
  },
  {
    id: 'heap-sort',
    name: 'Heap Sort',
    category: 'sorting',
    bestCase: 'O(n log n)',
    averageCase: 'O(n log n)',
    worstCase: 'O(n log n)',
    spaceComplexity: 'O(1)',
    performance: 'fast',
    description: 'Builds a max heap from the array, then repeatedly extracts the maximum element and places it at the end. Uses a binary heap data structure.',
    pythonCode: `def heap_sort(arr):
    n = len(arr)
    
    # Build max heap (rearrange array)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    
    # Extract elements from heap one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]  # Move current root to end
        heapify(arr, i, 0)  # Call heapify on reduced heap
    
    return arr

def heapify(arr, n, i):
    largest = i      # Initialize largest as root
    left = 2 * i + 1  # Left child
    right = 2 * i + 2 # Right child
    
    # Check if left child exists and is greater than root
    if left < n and arr[left] > arr[largest]:
        largest = left
    
    # Check if right child exists and is greater than root
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    # Change root if needed
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)  # Recursively heapify the affected subtree`,
    tags: ['in-place', 'not stable', 'heap-based']
  },

  // ─── PATHFINDING ALGORITHMS ───
  {
    id: 'dijkstra',
    name: "Dijkstra's Algorithm",
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O((V + E) log V)',
    worstCase: 'O((V + E) log V)',
    spaceComplexity: 'O(V)',
    performance: 'fast',
    description: 'Finds the shortest path from a source node to all other nodes in a weighted graph. Uses a priority queue and guarantees optimal paths for non-negative weights.',
    pythonCode: `import heapq

def dijkstra(graph, start, end):
    # Distance dictionary - initialize to infinity
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    
    # Priority queue: (distance, node)
    pq = [(0, start)]
    
    # Track visited nodes and previous nodes for path reconstruction
    visited = set()
    previous = {node: None for node in graph}
    
    while pq:
        current_dist, current_node = heapq.heappop(pq)
        
        # Skip if already visited
        if current_node in visited:
            continue
        visited.add(current_node)
        
        # Check all neighbors
        for neighbor, weight in graph[current_node].items():
            distance = current_dist + weight
            
            # Only update if shorter path found
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))
    
    # Reconstruct path
    path = []
    node = end
    while node is not None:
        path.append(node)
        node = previous[node]
    
    return path[::-1], distances[end]`,
    tags: ['greedy', 'shortest-path', 'weighted-graph']
  },
  {
    id: 'astar',
    name: 'A* Search',
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    worstCase: 'O(V²)',
    spaceComplexity: 'O(V)',
    performance: 'fast',
    description: 'An extension of Dijkstra\'s that uses a heuristic (estimated distance to goal) to guide the search, making it faster for pathfinding on grids.',
    pythonCode: `import heapq

def heuristic(a, b):
    """Manhattan distance on a grid"""
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def astar(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    open_set = [(0, start)]
    came_from = {}
    g_score = {(r, c): float('inf') for r in range(rows) for c in range(cols)}
    g_score[start] = 0
    f_score = {(r, c): float('inf') for r in range(rows) for c in range(cols)}
    f_score[start] = heuristic(start, end)
    open_set_hash = {start}
    
    while open_set:
        _, current = heapq.heappop(open_set)
        open_set_hash.discard(current)
        
        if current == end:
            # Reconstruct path
            path = [current]
            while current in came_from:
                current = came_from[current]
                path.append(current)
            return path[::-1]
        
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = current[0] + dr, current[1] + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] != 1:
                tentative_g = g_score[current] + 1
                if tentative_g < g_score[(nr, nc)]:
                    came_from[(nr, nc)] = current
                    g_score[(nr, nc)] = tentative_g
                    f = tentative_g + heuristic((nr, nc), end)
                    f_score[(nr, nc)] = f
                    if (nr, nc) not in open_set_hash:
                        heapq.heappush(open_set, (f, (nr, nc)))
                        open_set_hash.add((nr, nc))
    
    return None  # No path found`,
    tags: ['heuristic', 'shortest-path', 'grid-based']
  },
  {
    id: 'bfs',
    name: 'Breadth-First Search',
    category: 'pathfinding',
    bestCase: 'O(V + E)',
    averageCase: 'O(V + E)',
    worstCase: 'O(V + E)',
    spaceComplexity: 'O(V)',
    performance: 'medium',
    description: 'Explores all neighbors at the present depth before moving to nodes at the next depth level. Uses a queue and finds the shortest path in unweighted graphs.',
    pythonCode: `from collections import deque

def bfs(grid, start, end):
    rows, cols = len(grid), len(grid[0])
    queue = deque([start])
    visited = {start}
    came_from = {start: None}
    
    while queue:
        current = queue.popleft()
        
        if current == end:
            # Reconstruct path
            path = [current]
            while current in came_from and came_from[current] is not None:
                current = came_from[current]
                path.append(current)
            return path[::-1]
        
        # Explore all 4 directions
        for dr, dc in [(0,1),(0,-1),(1,0),(-1,0)]:
            nr, nc = current[0] + dr, current[1] + dc
            if (0 <= nr < rows and 0 <= nc < cols 
                and grid[nr][nc] != 1 
                and (nr, nc) not in visited):
                visited.add((nr, nc))
                came_from[(nr, nc)] = current
                queue.append((nr, nc))
    
    return None  # No path found`,
    tags: ['queue-based', 'unweighted', 'shortest-path']
  }
]

export const categories = [
  { id: 'all', label: 'All Categories' },
  { id: 'sorting', label: 'Sorting' },
  { id: 'pathfinding', label: 'Pathfinding' }
]

export const complexities = [
  { id: 'all', label: 'All Complexities' },
  { id: 'O(1)', label: 'O(1) - Constant' },
  { id: 'O(log n)', label: 'O(log n) - Logarithmic' },
  { id: 'O(n)', label: 'O(n) - Linear' },
  { id: 'O(n log n)', label: 'O(n log n) - Linearithmic' },
  { id: 'O(n²)', label: 'O(n²) - Quadratic' },
  { id: 'O(V + E)', label: 'O(V + E) - Graph' }
]

export const performanceLevels = [
  { id: 'all', label: 'All Performance' },
  { id: 'fast', label: 'Fast' },
  { id: 'medium', label: 'Medium' },
  { id: 'slow', label: 'Slow' }
]
