import { LayoutDashboard, Calendar, Users, CheckSquare, BarChart3 } from 'lucide-react'
import type { PageKey } from '../App'

interface MobileNavProps {
  activePage: PageKey
  onNavigate: (page: PageKey) => void
}

const items: { key: PageKey; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'overview', label: 'Home', icon: LayoutDashboard },
  { key: 'calendar', label: 'Calendar', icon: Calendar },
  { key: 'people', label: 'Team', icon: Users },
  { key: 'tasks', label: 'Tasks', icon: CheckSquare },
  { key: 'analytics', label: 'Stats', icon: BarChart3 },
]

export function MobileNav({ activePage, onNavigate }: MobileNavProps) {
  return (
    <div className="mobile-nav">
      {items.map((item) => {
        const Icon = item.icon
        return (
          <button
            key={item.key}
            className={`mobile-nav-item ${activePage === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            <Icon size={20} />
            <span>{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
