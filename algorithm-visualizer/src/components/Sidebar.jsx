import React from 'react'

export default function Sidebar({ isOpen, algorithms, selectedAlgo, onSelectAlgo, onToggle }) {
  const sortingAlgos = algorithms.filter(a => a.category === 'sorting')
  const pathAlgos = algorithms.filter(a => a.category === 'pathfinding')

  const perfBadge = (perf) => {
    const cls = perf === 'fast' ? 'badge-fast' : perf === 'medium' ? 'badge-medium' : 'badge-slow'
    return <span className={cls}>{perf.charAt(0).toUpperCase() + perf.slice(1)}</span>
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-72 bg-dark-900 border-r border-dark-700 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-none'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-dark-300 uppercase tracking-wider">Algorithms</h2>
            <button onClick={onToggle} className="btn-icon lg:hidden" aria-label="Close sidebar">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Algorithm List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {/* Sorting Section */}
          {sortingAlgos.length > 0 && (
            <>
              <div className="px-2 py-2 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                Sorting
              </div>
              {sortingAlgos.map(algo => (
                <button
                  key={algo.id}
                  onClick={() => onSelectAlgo(algo)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    selectedAlgo?.id === algo.id
                      ? 'bg-violet-600/20 border border-violet-500/40'
                      : 'hover:bg-dark-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${
                      selectedAlgo?.id === algo.id ? 'text-violet-300' : 'text-dark-200 group-hover:text-white'
                    }`}>
                      {algo.name}
                    </span>
                    {perfBadge(algo.performance)}
                  </div>
                  <div className="text-xs text-dark-500 font-mono">{algo.averageCase}</div>
                </button>
              ))}
            </>
          )}

          {/* Pathfinding Section */}
          {pathAlgos.length > 0 && (
            <>
              <div className="px-2 py-2 mt-3 text-xs font-semibold text-dark-500 uppercase tracking-wider">
                Pathfinding
              </div>
              {pathAlgos.map(algo => (
                <button
                  key={algo.id}
                  onClick={() => onSelectAlgo(algo)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    selectedAlgo?.id === algo.id
                      ? 'bg-cyan-600/20 border border-cyan-500/40'
                      : 'hover:bg-dark-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-semibold ${
                      selectedAlgo?.id === algo.id ? 'text-cyan-300' : 'text-dark-200 group-hover:text-white'
                    }`}>
                      {algo.name}
                    </span>
                    {perfBadge(algo.performance)}
                  </div>
                  <div className="text-xs text-dark-500 font-mono">{algo.averageCase}</div>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-dark-700 text-xs text-dark-600 text-center">
          {algorithms.length} algorithms
        </div>
      </aside>
    </>
  )
}
