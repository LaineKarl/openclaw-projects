import React, { useState, useCallback, useMemo, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import FilterBar from './components/FilterBar'
import Visualizer from './components/Visualizer'
import CodeDisplay from './components/CodeDisplay'
import Controls from './components/Controls'
import Stats from './components/Stats'
import { useAlgorithm } from './hooks/useAlgorithm'
import { algorithms } from './data/algorithms'

function App() {
  const [selectedAlgo, setSelectedAlgo] = useState(null)
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

  // Algorithm hook
  const algoHook = useAlgorithm(selectedAlgo)
  const { steps, currentStep, isPlaying, setIsPlaying, speed, setSpeed, stats, stepForward, stepBackward, reset, generateSteps } = algoHook

  // Filter algorithms
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
    // Generate steps after a tick so the algo is set
    setTimeout(() => generateSteps(), 0)
  }, [generateSteps])

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
      
      if (prev.walls.has(key)) {
        newWalls.delete(key)
      } else {
        newWalls.add(key)
      }
      
      return { ...prev, walls: newWalls }
    })
  }, [])

  // Generate steps when algo changes
  useEffect(() => {
    if (selectedAlgo) {
      generateSteps()
    }
  }, [selectedAlgo, generateSteps])

  return (
    <div className="flex h-screen overflow-hidden bg-dark-950">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        algorithms={filteredAlgorithms}
        selectedAlgo={selectedAlgo}
        onSelectAlgo={handleSelectAlgo}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-dark-700 bg-dark-900/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="btn-icon"
              aria-label="Toggle sidebar"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M3 12h18M3 6h18M3 18h18" />
              </svg>
            </button>
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Algorithm Visualizer
            </h1>
          </div>
          {selectedAlgo && (
            <div className="flex items-center gap-2">
              <span className="text-dark-400 text-sm">{selectedAlgo.name}</span>
              <span className={`badge-${selectedAlgo.performance}`}>
                {selectedAlgo.performance.charAt(0).toUpperCase() + selectedAlgo.performance.slice(1)}
              </span>
            </div>
          )}
        </div>

        {/* Filters */}
        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        {/* Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Visualizer */}
          <div className="flex-1 flex flex-col p-4 overflow-auto">
            {selectedAlgo ? (
              <>
                <Visualizer
                  algo={selectedAlgo}
                  steps={steps}
                  currentStep={currentStep}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  speed={speed}
                  gridConfig={gridConfig}
                  onGridUpdate={handleGridUpdate}
                  onCellClick={handleCellClick}
                />
                <div className="mt-4">
                  <Controls
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                    speed={speed}
                    setSpeed={setSpeed}
                    onStepForward={stepForward}
                    onStepBackward={stepBackward}
                    onReset={reset}
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
                  </p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="card p-3">
                      <div className="text-violet-400 font-semibold mb-1">Sorting</div>
                      <div className="text-dark-400">Bubble, Merge, Quick, Heap</div>
                    </div>
                    <div className="card p-3">
                      <div className="text-cyan-400 font-semibold mb-1">Pathfinding</div>
                      <div className="text-dark-400">Dijkstra, A*, BFS</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code Panel */}
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
