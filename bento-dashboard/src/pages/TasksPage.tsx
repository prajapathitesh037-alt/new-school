import { useState } from 'react'
import { Plus, CheckCircle2, Circle, Clock, AlertCircle, Filter } from 'lucide-react'
import { motion } from 'framer-motion'

interface Task {
  id: number
  title: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'high' | 'medium' | 'low'
  assignee: string
  dueDate: string
}

const initialTasks: Task[] = [
  { id: 1, title: 'Complete dashboard UI components', status: 'in-progress', priority: 'high', assignee: 'Hitesh', dueDate: 'Today' },
  { id: 2, title: 'Write API documentation', status: 'todo', priority: 'medium', assignee: 'Rohan', dueDate: 'Tomorrow' },
  { id: 3, title: 'Fix authentication bug', status: 'in-progress', priority: 'high', assignee: 'Sneha', dueDate: 'Today' },
  { id: 4, title: 'Deploy staging environment', status: 'todo', priority: 'low', assignee: 'Shobhit', dueDate: 'Oct 5' },
  { id: 5, title: 'Design review with team', status: 'done', priority: 'medium', assignee: 'Yumiksha', dueDate: 'Yesterday' },
  { id: 6, title: 'Update user onboarding flow', status: 'done', priority: 'high', assignee: 'Sneha', dueDate: 'Yesterday' },
  { id: 7, title: 'Performance optimization', status: 'todo', priority: 'medium', assignee: 'Hitesh', dueDate: 'Oct 6' },
  { id: 8, title: 'Set up CI/CD pipeline', status: 'in-progress', priority: 'high', assignee: 'Shobhit', dueDate: 'Today' },
]

const statusConfig = {
  'todo': { label: 'To Do', icon: Circle, color: 'var(--text-tertiary)' },
  'in-progress': { label: 'In Progress', icon: Clock, color: 'var(--accent)' },
  'done': { label: 'Done', icon: CheckCircle2, color: 'var(--success)' },
}

const priorityConfig = {
  'high': { label: 'High', color: 'var(--danger)' },
  'medium': { label: 'Medium', color: 'var(--accent)' },
  'low': { label: 'Low', color: 'var(--text-tertiary)' },
}

export function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState<'all' | 'todo' | 'in-progress' | 'done'>('all')

  const cycleStatus = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id !== id) return t
      const next: Record<string, 'todo' | 'in-progress' | 'done'> = {
        'todo': 'in-progress',
        'in-progress': 'done',
        'done': 'todo',
      }
      return { ...t, status: next[t.status] }
    }))
  }

  const filtered = filter === 'all' ? tasks : tasks.filter(t => t.status === filter)

  const columns: ('todo' | 'in-progress' | 'done')[] = ['todo', 'in-progress', 'done']

  return (
    <div>
      {/* Filter bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-5)',
          alignItems: 'center',
        }}
      >
        {(['all', 'todo', 'in-progress', 'done'] as const).map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? 'All' : statusConfig[f].label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="btn btn-accent btn-sm">
          <Plus size={14} />
          Add Task
        </button>
      </motion.div>

      {/* Kanban Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-5)',
      }}>
        {columns.map((col, ci) => {
          const cfg = statusConfig[col]
          const StatusIcon = cfg.icon
          const colTasks = tasks.filter(t => t.status === col)

          return (
            <motion.div
              key={col}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: ci * 0.05 }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-4)',
                padding: '0 var(--space-2)',
              }}>
                <StatusIcon size={16} color={cfg.color} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {cfg.label}
                </span>
                <span style={{
                  fontSize: '11px',
                  background: 'var(--surface-warm)',
                  padding: '1px 8px',
                  borderRadius: 'var(--radius-full)',
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}>
                  {colTasks.length}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {colTasks.map((task, ti) => {
                  const priCfg = priorityConfig[task.priority]
                  return (
                    <motion.div
                      key={task.id}
                      className="card"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: ti * 0.04 }}
                      style={{ padding: 'var(--space-4)', cursor: 'pointer' }}
                      onClick={() => cycleStatus(task.id)}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        marginBottom: 'var(--space-2)',
                      }}>
                        <div style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: priCfg.color,
                        }} />
                        <span style={{ fontSize: '11px', color: priCfg.color, fontWeight: 500 }}>
                          {priCfg.label}
                        </span>
                      </div>
                      <p style={{
                        fontSize: '13px',
                        fontWeight: 500,
                        color: task.status === 'done' ? 'var(--text-tertiary)' : 'var(--text-primary)',
                        textDecoration: task.status === 'done' ? 'line-through' : 'none',
                        lineHeight: 1.4,
                      }}>
                        {task.title}
                      </p>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 'var(--space-3)',
                      }}>
                        <div className="avatar-sm" style={{ width: '22px', height: '22px', fontSize: '9px' }}>
                          {task.assignee.charAt(0)}
                        </div>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                          {task.dueDate}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
