import { LayoutDashboard, Calendar, Users, CheckSquare, BarChart3, Settings, Zap } from 'lucide-react'
import type { PageKey } from '../App'

interface SidebarProps {
  activePage: PageKey
  onNavigate: (page: PageKey) => void
  isOpen: boolean
  onClose: () => void
}

const navItems: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'calendar', label: 'Calendar', icon: Calendar },
  { key: 'people', label: 'People', icon: Users },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings },
]

const quotes = [
  'Small steps every day lead to big results.',
  'Better planning today, bigger dreams tomorrow.',
  'Great teams build great things.',
  'Focus on progress, not perfection.',
]

export function Sidebar({ activePage, onNavigate, isOpen, onClose }: SidebarProps) {
  const quoteIndex = new Date().getDay() % quotes.length

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.2)',
            zIndex: 99,
          }}
          onClick={onClose}
        />
      )}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Zap size={16} color="#252525" />
          </div>
          <span className="sidebar-brand-name">Nexora</span>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.key}
                className={`nav-item ${activePage === item.key ? 'active' : ''}`}
                onClick={() => onNavigate(item.key)}
              >
                <Icon className="nav-icon" size={18} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-quote">
          <p>{quotes[quoteIndex]}</p>
        </div>
      </aside>
    </>
  )
}
