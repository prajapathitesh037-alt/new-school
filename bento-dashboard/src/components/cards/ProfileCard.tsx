import { motion } from 'framer-motion'

export function ProfileCard() {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-6)',
      }}>
        <div className="avatar-md">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face"
            alt="Hitesh Prajapat"
          />
        </div>
        <div>
          <h3 style={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '-0.01em',
          }}>
            Hitesh Prajapat
          </h3>
          <p style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginTop: '2px',
          }}>
            Frontend Developer
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-2)',
          }}>
            <span className="status-dot online" />
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Online</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)',
        marginBottom: 'var(--space-5)',
      }}>
        {[
          { value: '12', label: 'Tasks today' },
          { value: '6', label: 'Completed' },
          { value: '4', label: 'In progress' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '22px',
              fontWeight: 600,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '11px',
              color: 'var(--text-secondary)',
              marginTop: '2px',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-2)',
        }}>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Daily progress
          </span>
          <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>
            75%
          </span>
        </div>
        <div className="progress-bar">
          <motion.div
            className="progress-bar-fill accent"
            initial={{ width: '20%' }}
            animate={{ width: '75%' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
      </div>
    </div>
  )
}
