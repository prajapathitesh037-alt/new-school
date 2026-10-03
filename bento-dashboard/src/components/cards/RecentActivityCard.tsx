import { GitPullRequest, MessageSquare, FileText, CheckCircle2 } from 'lucide-react'

const activities = [
  {
    icon: CheckCircle2,
    iconColor: 'var(--success)',
    text: 'You completed the design system',
    time: '2 hours ago',
  },
  {
    icon: MessageSquare,
    iconColor: 'var(--info)',
    text: 'New comment on your PR',
    time: '4 hours ago',
  },
  {
    icon: GitPullRequest,
    iconColor: 'var(--accent)',
    text: 'Team meeting at 11:00 AM',
    time: '5 hours ago',
  },
  {
    icon: FileText,
    iconColor: 'var(--text-tertiary)',
    text: 'You shared a file',
    time: '6 hours ago',
  },
]

export function RecentActivityCard() {
  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-title">Recent Activity</div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
      }}>
        {activities.map((activity, i) => {
          const Icon = activity.icon
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) 0',
                borderBottom: i < activities.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '1px',
              }}>
                <Icon size={14} color={activity.iconColor} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  lineHeight: 1.4,
                }}>
                  {activity.text}
                </p>
                <p style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  marginTop: '2px',
                }}>
                  {activity.time}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
