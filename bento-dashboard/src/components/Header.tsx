import { Bell, Menu } from 'lucide-react'

interface HeaderProps {
  title: string
  subtitle: string
  onMenuToggle: () => void
}

export function Header({ title, subtitle, onMenuToggle }: HeaderProps) {
  const today = new Date()
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <header className="page-header">
      <div className="page-header-left">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            className="header-icon-btn mobile-menu-btn"
            onClick={onMenuToggle}
            style={{ display: 'none' }}
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>
          <h1>{title}</h1>
        </div>
        <p>{subtitle}</p>
      </div>
      <div className="page-header-right">
        <span className="header-date">{dateStr}</span>
        <button className="header-icon-btn" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>
        <div className="header-avatar">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
            alt="Hitesh Prajapat"
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
