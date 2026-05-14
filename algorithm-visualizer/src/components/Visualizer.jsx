import React, { useState, useCallback, useRef, useEffect } from 'react'
import GridCell from './GridCell'

export default function Visualizer({ algo, steps, currentStep, isPlaying, setIsPlaying, speed, arraySize, onArraySizeChange, gridConfig, onGridUpdate, onCellClick }) {
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

  // Search visualization
  if (algo.category === 'search') {
    const stepData = steps[currentStep] || null
    const arr = stepData?.array || []
    const target = stepData?.target
    const index = stepData?.index ?? -1
    const isFound = stepData?.found
    const isNotFound = stepData?.type === 'not-found'
    const low = stepData?.low ?? 0
    const high = stepData?.high ?? arr.length - 1

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

        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-violet-500" />
            <span className="text-xs text-dark-400">Unsearched</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-yellow-400" />
            <span className="text-xs text-dark-400">Checking</span>
          </div>
          {algo.id === 'binary-search' && (
            <>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-emerald-400" />
                <span className="text-xs text-dark-400">Low</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-red-400" />
                <span className="text-xs text-dark-400">High</span>
              </div>
            </>
          )}
          <div className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded ${isFound ? 'bg-green-500' : isNotFound ? 'bg-gray-500' : 'bg-violet-500'}`} />
            <span className="text-xs text-dark-400">{isFound ? 'Found' : isNotFound ? 'Not found' : 'Result'}</span>
          </div>
        </div>

        <div className="flex-1 flex items-end justify-center gap-[2px] px-4 pb-4 min-h-[300px]">
          {arr.map((val, i) => {
            let color = '#818cf8'
            let border = 'none'
            if (algo.id === 'binary-search') {
              if (i >= low && i <= high) {
                color = '#818cf8'
              } else {
                color = '#374151'
              }
              if (i === low && i !== index) color = '#34d399'
              if (i === high && i !== index) color = '#f87171'
              if (i === index) color = '#facc15'
            } else {
              if (i === index) color = '#facc15'
              if (i > index) color = '#374151'
            }
            if (isFound && i === index) color = '#22c55e'
            if (isNotFound) color = '#6b7280'

            const height = (val / Math.max(...arr, 1)) * 100
            return (
              <div
                key={i}
                style={{
                  height: `${height}%`,
                  backgroundColor: color,
                  borderColor: i === index ? '#facc15' : 'transparent',
                  borderWidth: i === index ? '2px' : '0px',
                }}
                className="flex-1 rounded-t-sm min-w-[2px] transition-colors duration-150"
              />
            )
          })}
        </div>

        <div className="text-center text-xs text-dark-500 pb-2">
          Step {currentStep + 1} / {steps.length}
          {target !== undefined && <span className="ml-2">Target: <strong className="text-violet-400">{target}</strong></span>}
          {algo.id === 'binary-search' && stepData?.left !== undefined && (
            <span className="ml-2">L:{low} R:{high}</span>
          )}
        </div>
      </div>
    )
  }

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
            onChange={e => onArraySizeChange(Number(e.target.value))}
            className="w-32 h-1.5 bg-dark-700 rounded-full appearance-none cursor-pointer accent-violet-500"
          />
          <span className="text-xs text-dark-400 font-mono">{arraySize}</span>
        </div>

        <div
          className="flex-1 flex items-end justify-center gap-[1px] px-4 pb-4"
          style={{ height: 320 }}
        >
          {arr.map((val, i) => {
            const height = (val / maxVal) * 280
            const isHighlighted = highlight.includes(i)
            return (
              <div
                key={`${currentStep}-${i}`}
                style={{
                  height: `${height}px`,
                  backgroundColor: isHighlighted ? '#facc15' : '#818cf8',
                }}
                className="flex-1 rounded-t-sm min-w-[2px] bar-transition"
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
