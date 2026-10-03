import { useState } from 'react'
import { Plus, Check } from 'lucide-react'

interface Task {
  id: number
  text: string
  done: boolean
  color?: string
}

const initialTasks: Task[] = [
  { id: 1, text: 'Finish UI design for dashboard', done: false, color: 'var(--accent)' },
  { id: 2, text: 'Build API integration', done: false },
  { id: 3, text: 'Review PR from team', done: false },
  { id: 4, text: 'Study DSA (1 hour)', done: false },
]

export function QuickTasksCard() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState('')
  const [showInput, setShowInput] = useState(false)

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t))
  }

  const addTask = () => {
    if (!newTask.trim()) return
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), done: false }])
    setNewTask('')
    setShowInput(false)
  }

  return (
    <div className="card" style={{ height: '100%' }}>
      <div className="card-title">Quick Tasks</div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}>
        {tasks.map((task) => (
          <div
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3)',
              cursor: 'pointer',
            }}
            onClick={() => toggleTask(task.id)}
          >
            <div
              className={`checkbox-custom ${task.done ? 'checked' : ''}`}
              style={task.color && !task.done ? { borderColor: task.color, background: task.color } : {}}
            >
              {task.done && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <span style={{
              fontSize: '13px',
              color: task.done ? 'var(--text-tertiary)' : 'var(--text-primary)',
              textDecoration: task.done ? 'line-through' : 'none',
              transition: 'all 150ms ease',
            }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

      {showInput ? (
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginTop: 'var(--space-4)',
        }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a task..."
            autoFocus
            style={{
              flex: 1,
              padding: '6px 12px',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              fontSize: '13px',
              background: 'var(--surface-warm)',
              outline: 'none',
            }}
          />
          <button className="btn btn-primary btn-sm" onClick={addTask}>Add</button>
        </div>
      ) : (
        <button
          onClick={() => setShowInput(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginTop: 'var(--space-4)',
            fontSize: '13px',
            color: 'var(--text-secondary)',
            padding: 'var(--space-2) 0',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <Plus size={14} />
          Add new task
        </button>
      )}
    </div>
  )
}
