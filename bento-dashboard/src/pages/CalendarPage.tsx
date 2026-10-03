import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, MapPin, Video, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

interface CalEvent {
  id: number
  title: string
  time: string
  type: 'work' | 'personal'
  color: string
  location?: string
  platform?: string
  description?: string
}

const events: CalEvent[] = [
  { id: 1, title: 'Team Standup', time: '10:00 AM - 10:30 AM', type: 'work', color: 'var(--danger)', location: 'Room 2B', platform: 'Google Meet', description: 'Daily team sync' },
  { id: 2, title: 'Design Review', time: '2:00 PM - 3:00 PM', type: 'work', color: 'var(--accent)', platform: 'Google Meet' },
  { id: 3, title: 'Gym', time: '6:00 PM - 7:00 PM', type: 'personal', color: 'var(--info)' },
  { id: 4, title: 'Dinner with Friends', time: '8:00 PM - 9:00 PM', type: 'personal', color: 'var(--danger)' },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export function CalendarPage() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [selectedDay, setSelectedDay] = useState(today.getDate())
  const [selectedEvent, setSelectedEvent] = useState<CalEvent>(events[0])

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const monthName = new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Previous month trailing days
  const prevMonthDays = getDaysInMonth(year, month - 1)
  const trailingDays = Array.from({ length: firstDay }, (_, i) => prevMonthDays - firstDay + 1 + i)

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1) }
    else setMonth(month - 1)
  }

  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1) }
    else setMonth(month + 1)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px 260px', gap: 'var(--space-5)' }}>
      {/* Calendar Grid */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-5)',
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600 }}>{monthName}</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <button className="btn btn-icon btn-secondary" onClick={prevMonth}>
              <ChevronLeft size={16} />
            </button>
            <button className="btn btn-icon btn-secondary" onClick={nextMonth}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0',
          marginBottom: 'var(--space-2)',
        }}>
          {DAYS.map(d => (
            <div key={d} style={{
              textAlign: 'center',
              fontSize: '11px',
              fontWeight: 500,
              color: 'var(--text-tertiary)',
              padding: 'var(--space-2)',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}>
              {d}
            </div>
          ))}
        </div>

        {/* Calendar dates */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '0',
        }}>
          {/* Trailing days from previous month */}
          {trailingDays.map(d => (
            <div key={`prev-${d}`} style={{
              textAlign: 'center',
              padding: 'var(--space-3)',
              fontSize: '13px',
              color: 'var(--text-tertiary)',
              opacity: 0.4,
            }}>
              {d}
            </div>
          ))}

          {/* Current month days */}
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
            const isSelected = d === selectedDay
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            return (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                style={{
                  textAlign: 'center',
                  padding: 'var(--space-3)',
                  fontSize: '13px',
                  fontWeight: isSelected || isToday ? 500 : 400,
                  color: isSelected ? 'var(--text-primary)' : 'var(--text-primary)',
                  background: isSelected
                    ? 'var(--accent)'
                    : 'transparent',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 150ms ease-out',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'var(--surface-warm)'
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) e.currentTarget.style.background = 'transparent'
                }}
              >
                {d}
                {isToday && !isSelected && (
                  <div style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    margin: '2px auto 0',
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Today's Events */}
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
          marginBottom: 'var(--space-4)',
        }}>
          <span className="card-title" style={{ marginBottom: 0 }}>Today's Events</span>
          <button style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>View all</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {events.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-sm)',
                textAlign: 'left',
                width: '100%',
                background: selectedEvent?.id === event.id ? 'var(--surface-warm)' : 'transparent',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={(e) => {
                if (selectedEvent?.id !== event.id) e.currentTarget.style.background = 'var(--surface-warm)'
              }}
              onMouseLeave={(e) => {
                if (selectedEvent?.id !== event.id) e.currentTarget.style.background = 'transparent'
              }}
            >
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: event.color,
                flexShrink: 0,
              }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '13px', fontWeight: 500 }}>{event.title}</p>
                <p style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '1px' }}>
                  {event.time}
                </p>
              </div>
              <span className={`tag ${event.type === 'work' ? 'tag-work' : 'tag-personal'}`}>
                {event.type === 'work' ? 'Work' : 'Personal'}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Event Details */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="card-title">Event Details</div>

        {selectedEvent ? (
          <div>
            <div style={{
              padding: 'var(--space-4)',
              background: 'var(--surface-warm)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 'var(--space-4)',
            }}>
              <p style={{ fontSize: '14px', fontWeight: 600 }}>{selectedEvent.title}</p>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                {selectedEvent.time}
              </p>
              <span className={`tag ${selectedEvent.type === 'work' ? 'tag-work' : 'tag-personal'}`} style={{ marginTop: 'var(--space-2)' }}>
                {selectedEvent.type === 'work' ? 'Work' : 'Personal'}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {selectedEvent.platform && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Video size={14} color="var(--text-tertiary)" />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedEvent.platform}</span>
                </div>
              )}
              {selectedEvent.description && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <Users size={14} color="var(--text-tertiary)" />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedEvent.description}</span>
                </div>
              )}
              {selectedEvent.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <MapPin size={14} color="var(--text-tertiary)" />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{selectedEvent.location}</span>
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-6)',
            }}>
              <button className="btn btn-accent" style={{ width: '100%' }}>Join Meeting</button>
              <button className="btn btn-secondary" style={{ width: '100%' }}>Edit Event</button>
            </div>
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)', textAlign: 'center', padding: 'var(--space-8)' }}>
            Select an event to see details
          </p>
        )}
      </motion.div>

      {/* Add Event FAB */}
      <div style={{ position: 'fixed', bottom: 'var(--space-8)', right: 'var(--space-8)' }}>
        <button className="btn btn-accent" style={{
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          padding: 0,
          boxShadow: 'var(--shadow-md)',
        }}>
          <Plus size={20} />
        </button>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .calendar-page-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .calendar-page-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
