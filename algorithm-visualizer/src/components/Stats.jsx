import React from 'react'

export default function Stats({ stats }) {
  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <span className="text-dark-400">Comparisons:</span>
        <span className="text-dark-100 font-mono font-semibold">{stats.comparisons.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <span className="text-dark-400">Swaps:</span>
        <span className="text-dark-100 font-mono font-semibold">{stats.swaps.toLocaleString()}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-dark-400">⏱</span>
        <span className="text-dark-100 font-mono font-semibold">{(stats.elapsed / 1000).toFixed(2)}s</span>
      </div>
    </div>
  )
}
