import { useState } from 'react'
import { Search, Filter, UserPlus, FolderOpen } from 'lucide-react'
import { motion } from 'framer-motion'

interface TeamMember {
  id: number
  name: string
  role: string
  status: 'Active' | 'Away' | 'Offline'
  activity: string
  progress: number
  lastActive: string
  avatar: string
  color: string
}

const members: TeamMember[] = [
  { id: 1, name: 'Sneha Meena', role: 'UI/UX Designer', status: 'Active', activity: 'Design updated', progress: 80, lastActive: '2h ago', avatar: 'SM', color: '#E8614D' },
  { id: 2, name: 'Yumiksha Meena', role: 'Frontend Developer', status: 'Active', activity: 'PR merged', progress: 70, lastActive: '1h ago', avatar: 'YM', color: '#5B8DEF' },
  { id: 3, name: 'Rohan Choudhary', role: 'Backend Developer', status: 'Active', activity: 'API fixed', progress: 85, lastActive: '3h ago', avatar: 'RC', color: '#4CAF6E' },
  { id: 4, name: 'Lokesh Baroliya', role: 'Full Stack Developer', status: 'Away', activity: 'In a meeting', progress: 50, lastActive: '5h ago', avatar: 'LB', color: '#EFC84A' },
  { id: 5, name: 'Shobhit Sain', role: 'DevOps Engineer', status: 'Active', activity: 'Deployment', progress: 80, lastActive: '4h ago', avatar: 'SS', color: '#9B59B6' },
]

interface Project {
  id: number
  name: string
  members: number
  progress: number
  color: string
  icon: string
}

const projects: Project[] = [
  { id: 1, name: 'AI Productivity App', members: 4, progress: 60, color: 'var(--accent)', icon: '🤖' },
  { id: 2, name: 'College Management System', members: 3, progress: 40, color: 'var(--info)', icon: '🏫' },
  { id: 3, name: 'Portfolio Website', members: 2, progress: 80, color: 'var(--success)', icon: '🌐' },
]

const stats = [
  { label: 'Total Members', value: '6', icon: '👥' },
  { label: 'Active', value: '4', icon: '🟢' },
  { label: 'On Leave', value: '2', icon: '🔴' },
  { label: 'Projects', value: '3', icon: '📁' },
]

export function PeoplePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div>
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-5)',
        }}
      >
        {stats.map((stat, i) => (
          <div className="card" key={i} style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
            <span style={{ fontSize: '20px', marginBottom: 'var(--space-2)', display: 'block' }}>{stat.icon}</span>
            <div style={{ fontSize: '22px', fontWeight: 600, color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 'var(--space-5)',
      }}>
        {/* Team Members Table */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-5)',
          }}>
            <span className="card-title" style={{ marginBottom: 0 }}>Team Members</span>
          </div>

          {/* Search bar */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-5)',
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: '8px 12px',
              background: 'var(--surface-warm)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <Search size={14} color="var(--text-tertiary)" />
              <input
                type="text"
                placeholder="Search team members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  width: '100%',
                }}
              />
            </div>
            <button className="btn btn-secondary btn-sm">
              <Filter size={14} />
            </button>
            <button className="btn btn-accent btn-sm">
              <UserPlus size={14} />
              Invite
            </button>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Activity</th>
                  <th>Progress</th>
                  <th>Last Active</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr
                    key={member.id}
                    onMouseEnter={() => setHoveredRow(member.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === member.id ? 'var(--accent-subtle)' : 'transparent',
                    }}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div className="avatar-sm" style={{ background: member.color, color: '#fff', fontSize: '11px' }}>
                          {member.avatar}
                        </div>
                        <span style={{ fontWeight: 500 }}>{member.name}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{member.role}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                        <span className={`status-dot ${member.status === 'Active' ? 'online' : member.status === 'Away' ? 'away' : 'offline'}`} />
                        <span style={{
                          fontSize: '12px',
                          color: member.status === 'Active' ? 'var(--success)' : 'var(--text-secondary)',
                          fontWeight: 500,
                        }}>
                          {member.status}
                        </span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{member.activity}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: '100px' }}>
                        <div className="progress-bar" style={{ flex: 1 }}>
                          <motion.div
                            className="progress-bar-fill danger"
                            initial={{ width: '0%' }}
                            animate={{ width: `${member.progress}%` }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                          />
                        </div>
                        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', minWidth: '30px' }}>
                          {member.progress}%
                        </span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>{member.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Active Projects */}
        <div>
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            style={{ marginBottom: 'var(--space-5)' }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 'var(--space-4)',
            }}>
              <span className="card-title" style={{ marginBottom: 0 }}>Active Projects</span>
              <button style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>View all</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {projects.map(project => (
                <div
                  key={project.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-warm)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--surface-warm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    flexShrink: 0,
                  }}>
                    {project.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: 500 }}>{project.name}</p>
                    <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                      {project.members} members · {project.progress}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="card"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <div className="card-title">Quick Actions</div>
            <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button className="btn btn-accent btn-sm" style={{ flex: 1 }}>
                <FolderOpen size={14} />
                Create Project
              </button>
              <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}>
                <UserPlus size={14} />
                Invite Member
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .people-layout { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
