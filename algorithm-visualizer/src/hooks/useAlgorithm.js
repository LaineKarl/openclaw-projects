import { useState, useCallback, useRef, useEffect } from 'react'

export function useAlgorithm(algo) {
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 })
  const intervalRef = useRef(null)

  const generateSteps = useCallback(() => {
    if (!algo) return

    if (algo.category === 'sorting') {
      const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 95) + 5)
      const arrCopy = [...arr]
      const newSteps = []
      let comparisons = 0
      let swaps = 0

      if (algo.id === 'bubble-sort') {
        const n = arrCopy.length
        for (let i = 0; i < n; i++) {
          let swapped = false
          for (let j = 0; j < n - i - 1; j++) {
            comparisons++
            newSteps.push({
              type: 'comparing',
              array: [...arrCopy],
              highlight: [j, j + 1],
              comparisons,
              swaps,
            })
            if (arrCopy[j] > arrCopy[j + 1]) {
              [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]]
              swaps++
              newSteps.push({
                type: 'swapping',
                array: [...arrCopy],
                highlight: [j, j + 1],
                comparisons,
                swaps,
              })
            }
          }
          if (!swapped) {
            newSteps.push({ type: 'done', array: [...arrCopy], highlight: [], comparisons, swaps })
            break
          }
        }
      }

      if (algo.id === 'selection-sort') {
        const n = arrCopy.length
        for (let i = 0; i < n - 1; i++) {
          let minIdx = i
          for (let j = i + 1; j < n; j++) {
            comparisons++
            newSteps.push({ type: 'comparing', array: [...arrCopy], highlight: [minIdx, j], comparisons, swaps })
            if (arrCopy[j] < arrCopy[minIdx]) minIdx = j
          }
          if (minIdx !== i) {
            [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]]
            swaps++
            newSteps.push({ type: 'swapping', array: [...arrCopy], highlight: [i, minIdx], comparisons, swaps })
          }
        }
        newSteps.push({ type: 'done', array: [...arrCopy], highlight: [], comparisons, swaps })
      }

      if (algo.id === 'insertion-sort') {
        for (let i = 1; i < arrCopy.length; i++) {
          let j = i
          while (j > 0) {
            comparisons++
            newSteps.push({ type: 'comparing', array: [...arrCopy], highlight: [j - 1, j], comparisons, swaps })
            if (arrCopy[j - 1] > arrCopy[j]) {
              [arrCopy[j - 1], arrCopy[j]] = [arrCopy[j], arrCopy[j - 1]]
              swaps++
              newSteps.push({ type: 'swapping', array: [...arrCopy], highlight: [j - 1, j], comparisons, swaps })
              j--
            } else {
              break
            }
          }
        }
        newSteps.push({ type: 'done', array: [...arrCopy], highlight: [], comparisons, swaps })
      }

      if (algo.id === 'quick-sort') {
        const quickSort = (arr, low, high) => {
          if (low < high) {
            const pi = partition(arr, low, high)
            quickSort(arr, low, pi - 1)
            quickSort(arr, pi + 1, high)
          } else if (low === high) {
            newSteps.push({ type: 'done', array: [...arr], highlight: [], comparisons, swaps })
          }
        }
        const partition = (arr, low, high) => {
          const pivot = arr[high]
          let i = low - 1
          for (let j = low; j < high; j++) {
            comparisons++
            newSteps.push({ type: 'comparing', array: [...arr], highlight: [j, high], comparisons, swaps })
            if (arr[j] < pivot) {
              i++
              [arr[i], arr[j]] = [arr[j], arr[i]]
              swaps++
              newSteps.push({ type: 'swapping', array: [...arr], highlight: [i, j], comparisons, swaps })
            }
          }
          [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
          swaps++
          newSteps.push({ type: 'swapping', array: [...arr], highlight: [i + 1, high], comparisons, swaps })
          return i + 1
        }
        quickSort(arrCopy, 0, arrCopy.length - 1)
      }

      if (algo.id === 'merge-sort') {
        const mergeSort = (arr, left, right) => {
          if (right - left <= 1) return
          const mid = Math.floor((left + right) / 2)
          mergeSort(arr, left, mid)
          mergeSort(arr, mid, right)
          merge(arr, left, mid, right)
        }
        const merge = (arr, left, mid, right) => {
          const leftArr = arr.slice(left, mid)
          const rightArr = arr.slice(mid, right)
          let i = 0, j = 0, k = left
          while (i < leftArr.length && j < rightArr.length) {
            comparisons++
            newSteps.push({ type: 'comparing', array: [...arr], highlight: [left + i, mid + j], comparisons, swaps })
            if (leftArr[i] <= rightArr[j]) {
              arr[k] = leftArr[i]
              i++
            } else {
              arr[k] = rightArr[j]
              j++
            }
            swaps++
            newSteps.push({ type: 'swapping', array: [...arr], highlight: [k], comparisons, swaps })
            k++
          }
          while (i < leftArr.length) {
            arr[k] = leftArr[i]
            newSteps.push({ type: 'swapping', array: [...arr], highlight: [k], comparisons, swaps })
            i++; k++
          }
          while (j < rightArr.length) {
            arr[k] = rightArr[j]
            newSteps.push({ type: 'swapping', array: [...arr], highlight: [k], comparisons, swaps })
            j++; k++
          }
        }
        mergeSort(arrCopy, 0, arrCopy.length)
        newSteps.push({ type: 'done', array: [...arrCopy], highlight: [], comparisons, swaps })
      }

      setSteps(newSteps)
      setCurrentStep(0)
    }

    if (algo.category === 'pathfinding') {
      const rows = 15
      const cols = 20
      const grid = Array.from({ length: rows }, () => Array(cols).fill(0))
      const startRow = 7, startCol = 3
      const endRow = 7, endCol = 16

      grid[startRow][startCol] = 2
      grid[endRow][endCol] = 3

      const wallSet = new Set(['4,5','4,6','4,7','4,8','4,9','8,5','8,6','8,7','8,8','8,9'])

      wallSet.forEach(w => {
        const [r, c] = w.split(',').map(Number)
        grid[r][c] = 1
      })

      const newSteps = []

      if (algo.id === 'bfs') {
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
        const parent = Array.from({ length: rows }, () => Array(cols).fill(null))
        const queue = [[startRow, startCol]]
        visited[startRow][startCol] = true
        let found = false

        while (queue.length > 0) {
          const [r, c] = queue.shift()
          if (r === endRow && c === endCol) { found = true; break }

          newSteps.push({ type: 'visiting', grid: grid.map(row => [...row]), highlight: { r, c }, visited, parent })

          const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] !== 1) {
              visited[nr][nc] = true
              parent[nr][nc] = [r, c]
              queue.push([nr, nc])
            }
          }
        }

        if (found) {
          const path = []
          let cur = [endRow, endCol]
          while (cur) {
            path.push(cur)
            cur = parent[cur[0]]?.[cur[1]] ? parent[cur[0]][cur[1]] : null
          }
          path.reverse()
          for (let i = 1; i < path.length; i++) {
            const [pr, pc] = path[i]
            newSteps.push({ type: 'path', grid: grid.map(row => [...row]), path: path.slice(0, i + 1), visited, parent })
          }
        }
      }

      if (algo.id === 'dijkstra') {
        const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
        const parent = Array.from({ length: rows }, () => Array(cols).fill(null))
        dist[startRow][startCol] = 0

        const getMin = () => {
          let minD = Infinity, mr = -1, mc = -1
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (!visited[r][c] && dist[r][c] < minD) { minD = dist[r][c]; mr = r; mc = c }
            }
          }
          return mr === -1 ? null : [mr, mc]
        }

        while (true) {
          const curr = getMin()
          if (!curr || (curr[0] === endRow && curr[1] === endCol)) break
          const [r, c] = curr
          visited[r][c] = true
          newSteps.push({ type: 'visiting', grid: grid.map(row => [...row]), highlight: { r, c }, dist, visited, parent })

          const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] !== 1) {
              const nd = dist[r][c] + 1
              if (nd < dist[nr][nc]) {
                dist[nr][nc] = nd
                parent[nr][nc] = [r, c]
              }
            }
          }
        }

        if (dist[endRow][endCol] < Infinity) {
          const path = []
          let cur = [endRow, endCol]
          while (cur) {
            path.push(cur)
            const p = parent[cur[0]]?.[cur[1]]
            cur = p ? p : null
          }
          path.reverse()
          for (let i = 1; i < path.length; i++) {
            newSteps.push({ type: 'path', grid: grid.map(row => [...row]), path: path.slice(0, i + 1), dist, visited, parent })
          }
        }
      }

      if (algo.id === 'a-star') {
        const heuristic = (r, c) => Math.abs(r - endRow) + Math.abs(c - endCol)
        const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity))
        const visited = Array.from({ length: rows }, () => Array(cols).fill(false))
        const parent = Array.from({ length: rows }, () => Array(cols).fill(null))
        dist[startRow][startCol] = 0

        const getMin = () => {
          let minF = Infinity, mr = -1, mc = -1
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (!visited[r][c] && dist[r][c] + heuristic(r, c) < minF) { minF = dist[r][c] + heuristic(r, c); mr = r; mc = c }
            }
          }
          return mr === -1 ? null : [mr, mc]
        }

        while (true) {
          const curr = getMin()
          if (!curr || (curr[0] === endRow && curr[1] === endCol)) break
          const [r, c] = curr
          visited[r][c] = true
          newSteps.push({ type: 'visiting', grid: grid.map(row => [...row]), highlight: { r, c }, dist, visited, parent })

          const dirs = [[-1,0],[1,0],[0,-1],[0,1]]
          for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] && grid[nr][nc] !== 1) {
              const nd = dist[r][c] + 1
              if (nd < dist[nr][nc]) {
                dist[nr][nc] = nd
                parent[nr][nc] = [r, c]
              }
            }
          }
        }

        if (dist[endRow][endCol] < Infinity) {
          const path = []
          let cur = [endRow, endCol]
          while (cur) {
            path.push(cur)
            const p = parent[cur[0]]?.[cur[1]]
            cur = p ? p : null
          }
          path.reverse()
          for (let i = 1; i < path.length; i++) {
            newSteps.push({ type: 'path', grid: grid.map(row => [...row]), path: path.slice(0, i + 1), dist, visited, parent })
          }
        }
      }

      setSteps(newSteps)
      setCurrentStep(0)
    }
  }, [algo])

  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStep < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) { setIsPlaying(false); return prev }
          return prev + 1
        })
      }, 1000 / (speed / 5))
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [isPlaying, steps.length, currentStep, speed])

  const stepForward = useCallback(() => { if (currentStep < steps.length - 1) setCurrentStep(prev => prev + 1) }, [currentStep, steps.length])
  const stepBackward = useCallback(() => { if (currentStep > 0) setCurrentStep(prev => prev - 1) }, [currentStep])

  const reset = useCallback(() => { setIsPlaying(false); setCurrentStep(0); generateSteps() }, [generateSteps])

  return { steps, currentStep, isPlaying, setIsPlaying, speed, setSpeed, stats, stepForward, stepBackward, reset, generateSteps }
}
