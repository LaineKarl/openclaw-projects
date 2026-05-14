import React from 'react'

export default function Stats({ stats }) {
  const currentStepStats = stats || { comparisons: 0, swaps: 0 }
  const isSearch = currentStepStats.isSearch

  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="text-center">
        <div className="text-lg font-bold text-violet-400">{currentStepStats.comparisons}</div>
        <div className="text-xs text-dark-500">{isSearch ? 'Checks' : 'Comparisons'}</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-red-400">{currentStepStats.swaps}</div>
        <div className="text-xs text-dark-500">{isSearch ? 'Iterations' : 'Swaps'}</div>
      </div>
      <div className="text-center">
        <div className="text-lg font-bold text-cyan-400">{currentStepStats.elapsed || 0}</div>
        <div className="text-xs text-dark-500">Time (ms)</div>
      </div>
    </div>
  )
}
