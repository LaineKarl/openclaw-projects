import React from 'react'

export default function Controls({
  isPlaying, setIsPlaying, speed, setSpeed,
  onStepForward, onStepBackward, onReset
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 p-4 card">
      {/* Playback Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={onReset}
          className="btn-icon"
          title="Reset"
          aria-label="Reset"
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
        </button>

        <button
          onClick={onStepBackward}
          className="btn-icon"
          title="Step Backward"
          aria-label="Step backward"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
          </svg>
        </button>

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`btn-icon ${isPlaying ? 'bg-violet-600/30 border-violet-500 text-violet-300' : ''}`}
          title={isPlaying ? 'Pause' : 'Play'}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={onStepForward}
          className="btn-icon"
          title="Step Forward"
          aria-label="Step forward"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
          </svg>
        </button>
      </div>

      {/* Speed Control */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-xs text-dark-500">🐢</span>
        <input
          type="range"
          min="1"
          max="100"
          value={speed}
          onChange={e => setSpeed(Number(e.target.value))}
          className="w-32 h-1.5 bg-dark-700 rounded-full appearance-none cursor-pointer accent-violet-500"
        />
        <span className="text-xs text-dark-500">🐇</span>
        <span className="text-xs text-dark-400 font-mono w-12 text-center">{speed}%</span>
      </div>
    </div>
  )
}
