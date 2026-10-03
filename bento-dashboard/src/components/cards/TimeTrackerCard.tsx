import { useState, useEffect, useRef, useCallback } from 'react'
import { Pause, Play, MoreHorizontal } from 'lucide-react'

export function TimeTrackerCard() {
  const [seconds, setSeconds] = useState(155) // 02:35 in seconds
  const [isRunning, setIsRunning] = useState(true)
  const intervalRef = useRef<number | null>(null)

  const startTimer = useCallback(() => {
    if (intervalRef.current) return
    intervalRef.current = window.setInterval(() => {
      setSeconds((s) => s + 1)
    }, 1000)
  }, [])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    if (isRunning) startTimer()
    else stopTimer()
    return stopTimer
  }, [isRunning, startTimer, stopTimer])

  const minutes = Math.floor(seconds / 60)
  const secs = seconds % 60
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`

  // Progress for the ring (out of 60 minutes)
  const progress = Math.min((seconds / 3600) * 100, 100)
  const circumference = 2 * Math.PI * 52
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-4)',
      }}>
        <span className="card-title" style={{ marginBottom: 0 }}>Time Tracker</span>
        <button className="header-icon-btn" style={{ width: '28px', height: '28px' }}>
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Circular progress */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}>
        <div style={{ position: 'relative', width: '120px', height: '120px' }}>
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            style={{ transform: 'rotate(-90deg)' }}
          >
            {/* Background ring */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(40, 40, 30, 0.06)"
              strokeWidth="6"
            />
            {/* Progress ring */}
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: 'stroke-dashoffset 1s ease-out',
              }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}>
              {timeStr}
            </span>
          </div>
        </div>

        <span style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          marginTop: 'var(--space-3)',
        }}>
          Focus session
        </span>
      </div>

      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: 'var(--space-2)',
        marginTop: 'var(--space-4)',
      }}>
        <button
          className={`btn ${isRunning ? 'btn-accent' : 'btn-primary'}`}
          style={{ flex: 1, gap: 'var(--space-2)' }}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? <Pause size={14} /> : <Play size={14} />}
          {isRunning ? 'Pause' : 'Resume'}
        </button>
      </div>
    </div>
  )
}
