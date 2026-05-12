import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

const theme = {
  ...dracula,
  'pre[class*="language-"]': {
    ...dracula['pre[class*="language-"]'],
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '8px',
    fontSize: '12px',
    lineHeight: '1.6',
  },
  'code[class*="language-"]': {
    ...dracula['code[class*="language-"]'],
    fontSize: '12px',
    fontFamily: "'Fira Code', monospace",
  },
}

export default function CodeDisplay({ algo, currentLine }) {
  const lines = algo.pythonCode.split('\n')

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-dark-700 bg-dark-800/50">
        <h3 className="text-sm font-semibold text-dark-300">Python Implementation</h3>
        <span className="text-xs text-dark-500 font-mono">Python 3</span>
      </div>
      
      <div className="flex-1 overflow-auto p-3">
        <SyntaxHighlighter
          language="python"
          style={theme}
          customStyle={{
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
          }}
          showLineNumbers
          lineNumberStyle={{
            color: '#64748b',
            paddingRight: '12px',
            userSelect: 'none',
            minWidth: '2ch',
            textAlign: 'right',
          }}
          wrapLines
        >
          {algo.pythonCode}
        </SyntaxHighlighter>
      </div>

      {/* Complexity info */}
      <div className="p-3 border-t border-dark-700 bg-dark-800/30 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-dark-500">Best:</span>
            <span className="text-dark-200 ml-1 font-mono">{algo.bestCase}</span>
          </div>
          <div>
            <span className="text-dark-500">Average:</span>
            <span className="text-dark-200 ml-1 font-mono">{algo.averageCase}</span>
          </div>
          <div>
            <span className="text-dark-500">Worst:</span>
            <span className="text-dark-200 ml-1 font-mono">{algo.worstCase}</span>
          </div>
          <div>
            <span className="text-dark-500">Space:</span>
            <span className="text-dark-200 ml-1 font-mono">{algo.spaceComplexity}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
