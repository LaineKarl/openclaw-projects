import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import GridCell from './GridCell'

export default function Visualizer({ algo, steps, currentStep, isPlaying, setIsPlaying, speed, gridConfig, onGridUpdate, onCellClick }) {
  const [arraySize, setArraySize] = useState(30)
  const dragRef = useRef({ isDragging: false })
  const intervalRef = useRef(null)

  // Get current step data
  const stepData = steps[currentStep] || null

  // Initialize grid for pathfinding algorithms
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

  // Animation loop for pathfinding
  useEffect(() => {
    if (isPlaying && algo.category === 'pathfinding') {
      intervalRef.current = setInterval(() => {
        if (currentStep < steps.length - 1) {
          // This would be handled by the parent
        }
      }, 1000 / (speed / 5))
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, algo, speed, currentStep, steps.length])

  // Render sorting visualization
  if (algo.category === 'sorting') {
    const arr = stepData?.array || Array.from({ length: arraySize }, (_, i) => i + 1)
    const maxVal = Math.max(...arr, 1)
    const highlight = stepData?.highlight || []

    return (
      <div className="flex-1 flex flex-col">
        {/* Algorithm description */}
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

        {/* Array size control */}
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

        {/* Bar chart visualization */}
        <div className="flex-1 flex items-end justify-center gap-[1px] px-4 pb-4 min-h-[300px]">
          {arr.map((val, i) => {
            const height = (val / maxVal) * 100
            const isHighlighted = highlight.includes(i)
            return (
              <motion.div
                key={i}
                layout
                initial={false}
                animate={{
                  height: `${height}%`,
                  backgroundColor: isHighlighted ? '#facc15' : '#818cf8',
                }}
                transition={{ duration: 0.1 }}
                className="flex-1 rounded-t-sm min-w-[2px]"
                style={{ height: `${height}%` }}
              />
            )
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 pb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span className="text-xs text-dark-400">Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-400" />
            <span className="text-xs text-dark-400">Comparing</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center text-xs text-dark-500 pb-2">
          Step {currentStep + 1} / {steps.length}
        </div>
      </div>
    )
  }

  // Render pathfinding visualization
  if (algo.category === 'pathfinding') {
    const cellSize = Math.min(28, Math.floor(500 / gridConfig.cols))
    
    return (
      <div className="flex-1 flex flex-col">
        {/* Algorithm description */}
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

        {/* Grid */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div
            className="grid gap-px bg-dark-700 p-2 rounded-lg border border-dark-600"
            style={{
              gridTemplateColumns: `repeat(${gridConfig.cols}, ${cellSize}px)`,
              gridTemplateRows: `repeat(${gridConfig.rows}, ${cellSize}px)`,
            }}
            onMouseLeave={() => { dragRef.current.isDragging = false }}
          >
            {grid.map((row, r) =>
              row.map((cell, c) => {
                let state = null
                if (cell === 1) state = 'wall'
                else if (cell === 2) state = 'start'
                else if (cell === 3) state = 'end'
                else if (stepData?.highlightedCells?.[`${r},${c}`]) state = stepData.highlightedCells[`${r},${c}`]
                
                return (
                  <GridCell
                    key={`${r}-${c}`}
                    row={r}
                    col={c}
                    isWall={cell === 1}
                    isStart={cell === 2}
                    isEnd={cell === 3}
                    state={state}
                    onClick={onCellClick}
                    onDrag={(row, col, isDown) => {
                      if (isDown) {
                        dragRef.current.isDragging = true
                        onCellClick(row, col)
                      }
                    }}
                    isDragging={dragRef.current.isDragging}
                  />
                )
              })
            )}
          </div>
        </div>

        {/* Legend */}
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
            <span className="text-xs text-dark-400">Path</span>
          </div>
        </div>

        {/* Step indicator */}
        <div className="text-center text-xs text-dark-500 pb-2">
          Step {currentStep + 1} / {steps.length}
        </div>
      </div>
    )
  }

  return null
}
