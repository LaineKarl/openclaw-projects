import React from 'react'
import { categories, complexities, performanceLevels } from '../data/algorithms'

export default function FilterBar({ filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap items-center gap-2 px-4 py-2 border-b border-dark-700 bg-dark-900/30">
      <select
        value={filters.category}
        onChange={e => onFilterChange({ category: e.target.value })}
        className="input-field w-36 py-1.5 text-xs"
      >
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>

      <select
        value={filters.complexity}
        onChange={e => onFilterChange({ complexity: e.target.value })}
        className="input-field w-40 py-1.5 text-xs"
      >
        {complexities.map(c => (
          <option key={c.id} value={c.id}>{c.label}</option>
        ))}
      </select>

      <select
        value={filters.performance}
        onChange={e => onFilterChange({ performance: e.target.value })}
        className="input-field w-36 py-1.5 text-xs"
      >
        {performanceLevels.map(p => (
          <option key={p.id} value={p.id}>{p.label}</option>
        ))}
      </select>

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
