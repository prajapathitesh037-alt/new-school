import { Clock, Users, Dumbbell } from 'lucide-react'

const upcoming = [
  {
    icon: Users,
    iconBg: 'rgba(239, 200, 74, 0.15)',
    iconColor: '#8B7520',
    title: 'Team Standup',
    time: '10:00 AM - 10:30 AM',
    tag: 'Work',
    tagClass: 'tag-work',
  },
  {
    icon: Clock,
    iconBg: 'rgba(91, 141, 239, 0.12)',
    iconColor: '#4A73C5',
    title: 'Design Review',
    time: '2:00 PM - 3:00 PM',
    tag: 'Work',
    tagClass: 'tag-work',
  },
  {
    icon: Dumbbell,
    iconBg: 'rgba(76, 175, 110, 0.12)',
    iconColor: '#3D8F5A',
    title: 'Workout',
    time: '6:00 PM - 7:00 PM',
    tag: 'Personal',
    tagClass: 'tag-personal',
  },
]

export function UpcomingCard() {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--space-4)',
      }}>
        <span className="card-title" style={{ marginBottom: 0 }}>Upcoming</span>
        <button style={{
          fontSize: '12px',
          color: 'var(--text-secondary)',
          padding: 'var(--space-1) var(--space-2)',
          borderRadius: 'var(--radius-sm)',
          transition: 'color 150ms ease',
        }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          View all
        </button>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
      }}>
        {upcoming.map((event, i) => {
          const Icon = event.icon
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                transition: 'background 150ms ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-warm)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: event.iconBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <Icon size={15} color={event.iconColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {event.title}
                </p>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                  {event.time}
                </p>
              </div>
              <span className={`tag ${event.tagClass}`}>{event.tag}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
