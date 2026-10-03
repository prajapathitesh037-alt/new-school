import { useState } from 'react'
import { User, Bell, Palette, Shield, Monitor, Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

interface SettingSection {
  title: string
  icon: typeof User
  items: { label: string; description: string; type: 'toggle' | 'select' | 'text'; value?: string | boolean }[]
}

const sections: SettingSection[] = [
  {
    title: 'Profile',
    icon: User,
    items: [
      { label: 'Display Name', description: 'Your visible name', type: 'text', value: 'Hitesh Prajapat' },
      { label: 'Email', description: 'Your email address', type: 'text', value: 'hitesh@nexora.app' },
      { label: 'Role', description: 'Your current role', type: 'text', value: 'Frontend Developer' },
    ],
  },
  {
    title: 'Notifications',
    icon: Bell,
    items: [
      { label: 'Push Notifications', description: 'Receive push notifications', type: 'toggle', value: true },
      { label: 'Email Digest', description: 'Daily email summary', type: 'toggle', value: false },
      { label: 'Task Reminders', description: 'Get reminded before deadlines', type: 'toggle', value: true },
    ],
  },
  {
    title: 'Appearance',
    icon: Palette,
    items: [
      { label: 'Theme', description: 'Choose your visual theme', type: 'select', value: 'light' },
      { label: 'Compact Mode', description: 'Use smaller spacing', type: 'toggle', value: false },
      { label: 'Animations', description: 'Enable UI animations', type: 'toggle', value: true },
    ],
  },
]

export function SettingsPage() {
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    'Push Notifications': true,
    'Email Digest': false,
    'Task Reminders': true,
    'Compact Mode': false,
    'Animations': true,
  })

  const handleToggle = (label: string) => {
    setToggles(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <div style={{ maxWidth: '680px' }}>
      {sections.map((section, si) => {
        const Icon = section.icon
        return (
          <motion.div
            key={section.title}
            className="card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: si * 0.05 }}
            style={{ marginBottom: 'var(--space-5)' }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              marginBottom: 'var(--space-5)',
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-warm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Icon size={16} color="var(--text-secondary)" />
              </div>
              <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {section.title}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {section.items.map(item => (
                <div
                  key={item.label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: 'var(--space-4)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {item.label}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                      {item.description}
                    </p>
                  </div>

                  {item.type === 'toggle' && (
                    <button
                      onClick={() => handleToggle(item.label)}
                      style={{
                        width: '40px',
                        height: '22px',
                        borderRadius: '11px',
                        background: toggles[item.label] ? 'var(--accent)' : 'rgba(40, 40, 30, 0.12)',
                        position: 'relative',
                        transition: 'background 200ms ease',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#fff',
                        position: 'absolute',
                        top: '2px',
                        left: toggles[item.label] ? '20px' : '2px',
                        transition: 'left 200ms ease',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                      }} />
                    </button>
                  )}

                  {item.type === 'text' && (
                    <span style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      background: 'var(--surface-warm)',
                      padding: '4px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                    }}>
                      {item.value as string}
                    </span>
                  )}

                  {item.type === 'select' && (
                    <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                      <button className="btn btn-sm btn-primary" style={{ padding: '4px 10px' }}>
                        <Sun size={12} /> Light
                      </button>
                      <button className="btn btn-sm btn-secondary" style={{ padding: '4px 10px' }}>
                        <Moon size={12} /> Dark
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )
      })}

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <button className="btn btn-primary">Save Changes</button>
      </motion.div>
    </div>
  )
}
