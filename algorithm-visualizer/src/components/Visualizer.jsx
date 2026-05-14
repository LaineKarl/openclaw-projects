import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import GridCell from './GridCell'

export default function Visualizer({ algo, steps, currentStep, isPlaying, setIsPlaying, speed, gridConfig, onGridUpdate, onCellClick }) {
  const [arraySize, setArraySize] = useState(30)
  const [grid, setGrid] = useState([])
  const dragRef = useRef({ isDragging: false })
  const intervalRef = useRef(null)

  const stepData = steps[currentStep] || null

  // Initialize grid for pathfinding
  useEffect(() => {
    if (algo.category === 'pathfinding') {
      const rows = gridConfig.rows
      const cols = gridConfig.cols
      const newGrid = Array.from({ length: rows }, () => Array(cols).fill(0))
      newGrid[gridConfig.start[0]][gridConfig.start[1]] = 2
      newGrid[gridConfig.end[0]][gridConfig.end[1]] = 3
      gridConfig.walls.forEach(w => {
        const [r, c] = w
        if (newGrid[r] && newGrid[r][c] !== undefined) newGrid[r][c] = 1
      })
      setGrid(newGrid)
    }
  }, [algo, gridConfig])

  const handleCellClick = useCallback((row, col) => {
    onCellClick(row, col)
  }, [onCellClick])

  // Sorting visualization
  if (algo.category === 'sorting') {
    const arr = stepData?.array || Array.from({ length: arraySize }, (_, i) => i + 1)
    const maxVal = Math.max(...arr, 1)
    const highlight = stepData?.highlight || []

    return (
      <div className="flex-1 flex flex-col">
        <div className="mb-4 p-3 card">
          <h3 className="text-sm font-semibold text-dark-200 mb-1">{algo.name}</h3>
          <p className="text-xs text-dark-400 leading-relaxed">{algo.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {algo.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs text-dark-500">Array size:</span>
          <input
            type="range"
            min="5"
            max="100"
            value={arraySize}
            onChange={e => setArraySize(Number(e.target.value))}
            className="w-32 h-1.5 bg-dark-700 rounded-full appearance-none cursor-pointer accent-violet-500"
          />
          <span className="text-xs text-dark-400 font-mono">{arraySize}</span>
        </div>

        <div className="flex-1 flex items-end justify-center gap-[1px] px-4 pb-4 min-h-[300px]">
          {arr.map((val, i) => {
            const height = (val / maxVal) * 100
            const isHighlighted = highlight.includes(i)
            return (
              <motion.div
                key={`${currentStep}-${i}`}
                initial={false}
                animate={{
                  height: `${height}%`,
                  backgroundColor: isHighlighted ? '#facc15' : '#818cf8',
                }}
                transition={{ duration: 0.15, ease: 'easeInOut' }}
                className="flex-1 rounded-t-sm min-w-[2px]"
              />
            )
          })}
        </div>

        <div className="flex items-center justify-center gap-4 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span className="text-xs text-dark-400">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-400" />
            <span className="text-xs text-dark-400">Comparing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-400" />
            <span className="text-xs text-dark-400">Swapping</span>
          </div>
        </div>

        <div className="text-center text-xs text-dark-500 pb-2">
          Step {currentStep + 1} / {steps.length}
        </div>
      </div>
    )
  }

  // Pathfinding visualization
  if (algo.category === 'pathfinding') {
    const cellSize = Math.min(28, Math.floor(500 / gridConfig.cols))

    // Derive grid from stepData for dynamic playback; fall back to initial grid state
    const displayGrid = stepData?.grid || grid

    return (
      <div className="flex-1 flex flex-col">
        <div className="mb-4 p-3 card">
          <h3 className="text-sm font-semibold text-dark-200 mb-1">{algo.name}</h3>
          <p className="text-xs text-dark-400 leading-relaxed">{algo.description}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {algo.tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-dark-700 text-dark-400">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4">
          <div
            className="grid gap-px bg-dark-700 p-2 rounded-lg border border-dark-600"
            style={{
              gridTemplateColumns: `repeat(${gridConfig.cols}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${gridConfig.rows}, ${cellSize}px)`,
            }}
            onMouseLeave={() => { dragRef.current.isDragging = false }}
          >
            {displayGrid.map((row, r) =>
              row.map((cell, c) => {
                let state = null
                if (cell === 1) state = 'wall'
                else if (cell === 2) state = 'start'
                else if (cell === 3) state = 'end'
                else if (stepData?.highlight?.r === r && stepData?.highlight?.c === c) {
                  state = stepData.type === 'visiting' ? 'visiting' : 'path'
                }
                else if (stepData?.visited?.[r]?.[c]) {
                  state = 'visited'
                }
                else if (stepData?.path && stepData.path.some(p => p[0] === r && p[1] === c)) {
                  state = 'path'
                }

                return (
                  <GridCell
                    key={`${r}-${c}`}
                    row={r}
                    col={c}
                    isWall={cell === 1}
                    isStart={cell === 2}
                    isEnd={cell === 3}
                    state={state}
                    onClick={handleCellClick}
                    isDragging={dragRef.current.isDragging}
                  />
                )
              })
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pb-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500" />
            <span className="text-xs text-dark-400">Start</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-red-500" />
            <span className="text-xs text-dark-400">End</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-dark-600" />
            <span className="text-xs text-dark-400">Wall</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-400" />
            <span className="text-xs text-dark-400">Visiting</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-400" />
            <span className="text-xs text-dark-400">Visited</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-400" />
            <span className="text-xs text-dark-400">Path</span>
          </div>
        </div>

        <div className="text-center text-xs text-dark-500 pb-2">
          Step {currentStep + 1} / {steps.length}
        </div>
      </div>
    )
  }

  return null
}
