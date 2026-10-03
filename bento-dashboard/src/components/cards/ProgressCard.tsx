import { motion } from 'framer-motion'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const barHeights = [45, 65, 85, 55, 70, 30, 40] // percentage heights

export function ProgressCard() {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-title">Today's Progress</div>

      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-2)',
      }}>
        <span style={{
          fontSize: '28px',
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}>
          6.6h
        </span>
        <span style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
        }}>
          Focus time
        </span>
      </div>

      {/* Bar chart */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 'var(--space-3)',
        height: '90px',
        marginTop: 'var(--space-5)',
        paddingBottom: 'var(--space-1)',
      }}>
        {days.map((day, i) => (
          <div key={day} style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--space-2)',
            height: '100%',
            justifyContent: 'flex-end',
          }}>
            <motion.div
              initial={{ height: '20%' }}
              animate={{ height: `${barHeights[i]}%` }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: 0.2 + i * 0.06,
              }}
              style={{
                width: '100%',
                maxWidth: '28px',
                background: i === 2 ? 'var(--accent)' : 'rgba(239, 200, 74, 0.25)',
                borderRadius: '4px 4px 2px 2px',
                minHeight: '4px',
              }}
            />
            <span style={{
              fontSize: '10px',
              color: 'var(--text-tertiary)',
              fontWeight: 500,
            }}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
