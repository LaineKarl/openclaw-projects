import { useState, useCallback, useRef, useEffect } from 'react'

export function useAlgorithm(algo) {
  const [steps, setSteps] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 })
  const intervalRef = useRef(null)

  // Generate steps for sorting algorithms
  const generateSteps = useCallback(() => {
    if (!algo) return
    
    if (algo.category === 'sorting') {
      const arr = Array.from({ length: 30 }, () => Math.floor(Math.random() * 95) + 5)
      const newSteps = []
      const arrCopy = [...arr]
      
      if (algo.id === 'bubble-sort') {
        const n = arrCopy.length
        for (let i = 0; i < n; i++) {
          let swapped = false
          for (let j = 0; j < n - i - 1; j++) {
            newSteps.push({
              type: 'comparing',
              array: [...arrCopy],
              highlight: [j, j + 1],
              codeLine: 6,
            })
            
            if (arrCopy[j] > arrCopy[j + 1]) {
              [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]]
              swapped = true
              newSteps.push({
                type: 'swapping',
                array: [...arrCopy],
                highlight: [j, j + 1],
                codeLine: 8,
              })
            }
          }
          if (!swapped) {
            newSteps.push({
              type: 'done',
              array: [...arrCopy],
              highlight: [],
              codeLine: 11,
            })
            break
          }
        }
      }
      
      setSteps(newSteps)
      setCurrentStep(0)
      setStats({ comparisons: 0, swaps: 0 })
    }
  }, [algo])

  // Auto-play
  useEffect(() => {
    if (isPlaying && steps.length > 0 && currentStep < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStep(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, 1000 / (speed / 5))
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying, steps.length, currentStep, speed])

  const stepForward = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep, steps.length])

  const stepBackward = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }, [currentStep])

  const reset = useCallback(() => {
    setIsPlaying(false)
    setCurrentStep(0)
    generateSteps()
  }, [generateSteps])

  return {
    steps,
    currentStep,
    isPlaying,
    setIsPlaying,
    speed,
    setSpeed,
    stats,
    stepForward,
    stepBackward,
    reset,
    generateSteps,
  }
}
