import { useState } from 'react'
import './index.css'
import { Sidebar } from './components/Sidebar'
import { Header } from './components/Header'
import { OverviewPage } from './pages/OverviewPage'
import { CalendarPage } from './pages/CalendarPage'
import { PeoplePage } from './pages/PeoplePage'
import { TasksPage } from './pages/TasksPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'
import { MobileNav } from './components/MobileNav'
import { AnimatePresence, motion } from 'framer-motion'

export type PageKey = 'overview' | 'calendar' | 'people' | 'tasks' | 'analytics' | 'settings'

const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
  transition: { duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }
}

function App() {
  const [activePage, setActivePage] = useState<PageKey>('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderPage = () => {
    switch (activePage) {
      case 'overview': return <OverviewPage />
      case 'calendar': return <CalendarPage />
      case 'people': return <PeoplePage />
      case 'tasks': return <TasksPage />
      case 'analytics': return <AnalyticsPage />
      case 'settings': return <SettingsPage />
      default: return <OverviewPage />
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
  }

  const getSubtitle = (): string => {
    const subtitles: Record<PageKey, string> = {
      overview: "Here's what's happening with your goals today.",
      calendar: 'Manage your schedule and never miss an important event.',
      people: 'Work together, achieve more.',
      tasks: 'Stay organized and get things done.',
      analytics: 'Track your productivity and performance.',
      settings: 'Customize your workspace preferences.',
    }
    return subtitles[activePage]
  }

  const getTitle = (): string => {
    const titles: Record<PageKey, string> = {
      overview: `${getGreeting()}, Hitesh 👋`,
      calendar: 'Calendar',
      people: 'Team',
      tasks: 'Tasks',
      analytics: 'Analytics',
      settings: 'Settings',
    }
    return titles[activePage]
  }

  return (
    <div className="app-layout">
      <Sidebar
        activePage={activePage}
        onNavigate={(page) => { setActivePage(page); setSidebarOpen(false) }}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-content">
        <Header
          title={getTitle()}
          subtitle={getSubtitle()}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            {...pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <MobileNav activePage={activePage} onNavigate={setActivePage} />
    </div>
  )
}

export default App
