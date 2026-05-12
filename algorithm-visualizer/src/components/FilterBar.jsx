import React from 'react'
import { complexities, performanceLevels } from '../data/algorithms'

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-dark-700 bg-dark-900/30">
      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={e => onFilterChange({ category: e.target.value })}
        className="input-field w-36 py-1.5 text-xs"
      >
        {complexities.length > 0 && (
          <option value="all">All Categories</option>
        )}
        <option value="sorting">Sorting</option>
        <option value="pathfinding">Pathfinding</option>
      </select>

      {/* Complexity Filter */}
      <select
        value={filters.complexity}
        onChange={e => onFilterChange({ complexity: e.target.value })}
        className="input-field w-40 py-1.5 text-xs"
      >
        {complexities.map(c => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>

      {/* Performance Filter */}
      <select
        value={filters.performance}
        onChange={e => onFilterChange({ performance: e.target.value })}
        className="input-field w-36 py-1.5 text-xs"
      >
        <option value="all">All Performance</option>
        <option value="fast">⚡ Fast</option>
        <option value="medium">⏱ Medium</option>
        <option value="slow">🐢 Slow</option>
      </select>

      {/* Active filter count */}
      {Object.values(filters).some(f => f !== 'all') && (
        <button
          onClick={() => onFilterChange({ category: 'all', complexity: 'all', performance: 'all' })}
          className="ml-auto text-xs text-violet-400 hover:text-violet-300 transition-colors"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}
