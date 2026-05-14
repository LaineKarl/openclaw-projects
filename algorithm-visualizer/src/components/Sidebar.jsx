import React, { useState, useMemo } from 'react'

export default function Sidebar({ isOpen, algorithms, selectedAlgo, selectedAlgo2, compareMode, onSelectAlgo, onSelectAlgo2, onToggle }) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!search) return algorithms
    return algorithms.filter(a =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    )
  }, [algorithms, search])

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />
      )}
      <div className={`fixed lg:relative z-50 h-full transition-transform duration-300 bg-dark-900 border-r border-dark-700 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} w-80`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-dark-700">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-dark-200">Algorithms</h2>
              <button onClick={onToggle} className="btn-icon lg:hidden" aria-label="Close sidebar">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <input
              type="text"
              placeholder="Search algorithms..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-dark-800 border border-dark-600 rounded-lg text-dark-200 placeholder-dark-500 focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {filtered.map(algo => (
              <button
                key={algo.id}
                onClick={() => {
                  if (!compareMode) {
                    if (selectedAlgo?.id === algo.id) {
                      onSelectAlgo(null)
                    } else {
                      onSelectAlgo(algo)
                      onSelectAlgo2(null)
                    }
                    return
                  }

                  if (selectedAlgo2?.id === algo.id) {
                    onSelectAlgo2(null)
                  } else if (selectedAlgo?.id === algo.id) {
                    onSelectAlgo(null)
                  } else if (!selectedAlgo) {
                    onSelectAlgo(algo)
                  } else if (!selectedAlgo2) {
                    onSelectAlgo2(algo)
                  } else {
                    onSelectAlgo2(algo)
                  }
                }}
                className={`w-full text-left p-3 rounded-lg border transition-all ${
                  selectedAlgo?.id === algo.id
                    ? 'border-violet-500 bg-violet-500/10'
                    : selectedAlgo2?.id === algo.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-dark-700 bg-dark-800 hover:border-dark-600 hover:bg-dark-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-dark-200">{algo.name}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    algo.performance === 'excellent' ? 'bg-emerald-500/20 text-emerald-400' :
                    algo.performance === 'good' ? 'bg-blue-500/20 text-blue-400' :
                    algo.performance === 'fair' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {algo.performance}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-dark-500">
                  <span>{algo.category === 'sorting' ? '📊' : '🗺️'}</span>
                  <span>{algo.averageCase}</span>
                  <span>·</span>
                  <span>{algo.spaceComplexity}</span>
                </div>
                {selectedAlgo?.id === algo.id && (
                  <div className="mt-1 text-xs text-violet-400">● Primary</div>
                )}
                {selectedAlgo2?.id === algo.id && (
                  <div className="mt-1 text-xs text-cyan-400">● Compare</div>
                )}
              </button>
            ))}
          </div>

          <div className="p-3 border-t border-dark-700 text-xs text-dark-500 text-center">
            {algorithms.length} algorithms available
          </div>
        </div>
      </div>
    </>
  )
}
