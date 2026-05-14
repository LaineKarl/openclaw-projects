import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import FilterBar from './components/FilterBar'
import Visualizer from './components/Visualizer'
import CodeDisplay from './components/CodeDisplay'
import Controls from './components/Controls'
import Stats from './components/Stats'
import { useAlgorithm } from './hooks/useAlgorithm'
import { algorithms, categories } from './data/algorithms'

function App() {
  const [selectedAlgo, setSelectedAlgo] = useState(null)
  const [selectedAlgo2, setSelectedAlgo2] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [filters, setFilters] = useState({
    category: 'all',
    complexity: 'all',
    performance: 'all',
  })
  const [gridConfig, setGridConfig] = useState({
    rows: 15,
    cols: 20,
    walls: new Set(),
    start: [7, 3],
    end: [7, 16],
  })
  const [compareMode, setCompareMode] = useState(false)
  const [arraySize, setArraySize] = useState(30)

  const algoHook = useAlgorithm(selectedAlgo, arraySize)
  const algoHook2 = useAlgorithm(selectedAlgo2, arraySize)
  const { steps, currentStep, isPlaying, setIsPlaying, speed, setSpeed, stats, stepForward, stepBackward, reset, generateSteps } = algoHook
  const { steps: steps2, currentStep: currentStep2, isPlaying: isPlaying2, setIsPlaying: setIsPlaying2, speed: speed2, setSpeed: setSpeed2, stats: stats2, stepForward: stepForward2, stepBackward: stepBackward2, reset: reset2, generateSteps: generateSteps2 } = algoHook2

  const filteredAlgorithms = useMemo(() => {
    let result = algorithms
    if (filters.category !== 'all') {
      result = result.filter(a => a.category === filters.category)
    }
    if (filters.complexity !== 'all') {
      result = result.filter(a => a.bestCase === filters.complexity)
    }
    if (filters.performance !== 'all') {
      result = result.filter(a => a.performance === filters.performance)
    }
    return result
  }, [filters])

  const handleSelectAlgo = useCallback((algo) => {
    setSelectedAlgo(algo)
    setIsPlaying(false)
    setTimeout(() => generateSteps(), 0)
  }, [generateSteps])

  const handleSelectAlgo2 = useCallback((algo) => {
    setSelectedAlgo2(algo)
    setIsPlaying2(false)
    setTimeout(() => generateSteps2(), 0)
  }, [generateSteps2])

  const handleFilterChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }, [])

  const handleGridUpdate = useCallback((config) => {
    setGridConfig(config)
  }, [])

  const handleCellClick = useCallback((row, col) => {
    setGridConfig(prev => {
      const newWalls = new Set(prev.walls)
      const key = `${row},${col}`
      const isStart = row === prev.start[0] && col === prev.start[1]
      const isEnd = row === prev.end[0] && col === prev.end[1]
      if (isStart || isEnd) return prev
      if (prev.walls.has(key)) newWalls.delete(key)
      else newWalls.add(key)
      return { ...prev, walls: newWalls }
    })
  }, [])

  useEffect(() => {
    if (selectedAlgo) generateSteps()
  }, [selectedAlgo, arraySize, generateSteps])

  useEffect(() => {
    if (selectedAlgo2) generateSteps2()
  }, [selectedAlgo2, arraySize, generateSteps2])

  const handlePlayToggle = useCallback(() => {
    setIsPlaying(!isPlaying)
    setIsPlaying2(!isPlaying2)
  }, [isPlaying, isPlaying2])

  const handleStepForward = useCallback(() => {
    stepForward()
    stepForward2()
  }, [stepForward, stepForward2])

  const handleStepBackward = useCallback(() => {
    stepBackward()
    stepBackward2()
  }, [stepBackward, stepBackward2])

  const handleReset = useCallback(() => {
    reset()
    reset2()
  }, [reset, reset2])

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      <Sidebar
        isOpen={sidebarOpen}
        algorithms={filteredAlgorithms}
        selectedAlgo={selectedAlgo}
        selectedAlgo2={selectedAlgo2}
        compareMode={compareMode}
        onSelectAlgo={handleSelectAlgo}
        onSelectAlgo2={handleSelectAlgo2}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700 bg-dark-900/50">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="btn-icon" aria-label="Toggle sidebar">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Algorithm Visualizer
            </h1>
            <button
              onClick={() => {
                setCompareMode(!compareMode)
                if (!compareMode) {
                  setSelectedAlgo2(algorithms[1])
                  setTimeout(() => generateSteps2(), 0)
                } else {
                  setSelectedAlgo2(null)
                }
              }}
              className={`text-xs px-2 py-1 rounded-full transition-colors ${compareMode ? 'bg-violet-600 text-white' : 'bg-dark-700 text-dark-400 hover:text-dark-200'}`}
            >
              {compareMode ? 'Compare Mode' : 'Compare'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            {selectedAlgo && (
              <span className="text-dark-400 text-sm">{selectedAlgo.name}</span>
            )}
            {compareMode && selectedAlgo2 && (
              <span className="text-dark-400 text-sm">vs {selectedAlgo2.name}</span>
            )}
          </div>
        </div>

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className="flex-1 flex flex-col p-4 overflow-auto">
            {selectedAlgo ? (
              <>
                <div className={compareMode ? "flex flex-col lg:flex-row gap-4" : ""}>
                  <div className={compareMode ? "flex-1 min-w-0" : "flex-1"}>
                    <Visualizer
                      algo={selectedAlgo}
                      steps={steps}
                      currentStep={currentStep}
                      isPlaying={isPlaying}
                      setIsPlaying={setIsPlaying}
                      speed={speed}
                      arraySize={arraySize}
                      onArraySizeChange={setArraySize}
                      gridConfig={gridConfig}
                      onGridUpdate={handleGridUpdate}
                      onCellClick={handleCellClick}
                    />
                  </div>
                  {compareMode && selectedAlgo2 && (
                    <div className="flex-1 min-w-0">
                      <Visualizer
                        algo={selectedAlgo2}
                        steps={steps2}
                        currentStep={currentStep2}
                        isPlaying={isPlaying2}
                        setIsPlaying={setIsPlaying2}
                        speed={speed2}
                        arraySize={arraySize}
                        onArraySizeChange={setArraySize}
                        gridConfig={gridConfig}
                        onGridUpdate={handleGridUpdate}
                        onCellClick={handleCellClick}
                      />
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <Controls
                    isPlaying={isPlaying && isPlaying2}
                    setIsPlaying={handlePlayToggle}
                    speed={speed}
                    setSpeed={setSpeed}
                    onStepForward={handleStepForward}
                    onStepBackward={handleStepBackward}
                    onReset={handleReset}
                  />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center max-w-md">
                  <div className="text-6xl mb-4">🧠</div>
                  <h2 className="text-2xl font-bold mb-2 text-dark-200">Welcome to Algorithm Visualizer</h2>
                  <p className="text-dark-400 mb-6">
                    Select an algorithm from the sidebar to start visualizing how it works step by step.
                    Enable Compare mode to see two algorithms side by side!
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="card p-3">
                      <div className="text-violet-400 font-semibold mb-1">Sorting</div>
                      <div className="text-dark-400">Bubble, Selection, Insertion, Merge, Quick</div>
                    </div>
                    <div className="card p-3">
                      <div className="text-cyan-400 font-semibold mb-1">Pathfinding</div>
                      <div className="text-dark-400">BFS, Dijkstra, A*</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {selectedAlgo && (
            <div className="lg:w-[420px] flex flex-col border-t lg:border-t-0 lg:border-l border-dark-700">
              <CodeDisplay algo={selectedAlgo} currentLine={steps[currentStep]?.codeLine} />
              <div className="p-3 border-t border-dark-700">
                <Stats stats={stats} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
