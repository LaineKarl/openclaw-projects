import React from 'react'

export default function GridCell({
  row, col, isWall, isStart, isEnd, state, onClick, onDrag, isDragging
}) {
  const baseClasses = 'cell-transition w-full aspect-square rounded-sm cursor-pointer border border-dark-800/50'
  
  let colorClass = 'bg-dark-800'
  if (isWall) colorClass = 'bg-dark-600 border-dark-500'
  else if (isStart) colorClass = 'bg-emerald-500 border-emerald-400'
  else if (isEnd) colorClass = 'bg-red-500 border-red-400'
  else if (state === 'comparing') colorClass = 'bg-yellow-400'
  else if (state === 'swapping') colorClass = 'bg-red-400'
  else if (state === 'visiting') colorClass = 'bg-blue-400'
  else if (state === 'visited') colorClass = 'bg-gray-600'
  else if (state === 'path') colorClass = 'bg-emerald-400'

  return (
    <div
      className={`${baseClasses} ${colorClass}`}
      style={{ width: '100%' }}
      onClick={() => onClick?.(row, col)}
      onMouseDown={(e) => { e.preventDefault(); onDrag?.(row, col, true) }}
      onMouseUp={() => onDrag?.(row, col, false)}
      onMouseEnter={(e) => { if (isDragging) onDrag?.(row, col, true) }}
    />
  )
}
