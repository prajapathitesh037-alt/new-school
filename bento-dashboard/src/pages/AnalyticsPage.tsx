import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'

const weeklyData = [
  { name: 'Mon', tasks: 8, hours: 6.2 },
  { name: 'Tue', tasks: 12, hours: 7.5 },
  { name: 'Wed', tasks: 15, hours: 8.1 },
  { name: 'Thu', tasks: 10, hours: 5.8 },
  { name: 'Fri', tasks: 14, hours: 7.2 },
  { name: 'Sat', tasks: 5, hours: 3.0 },
  { name: 'Sun', tasks: 3, hours: 2.1 },
]

const monthlyData = [
  { name: 'Week 1', completed: 28, target: 30 },
  { name: 'Week 2', completed: 35, target: 30 },
  { name: 'Week 3', completed: 22, target: 30 },
  { name: 'Week 4', completed: 40, target: 30 },
]

const categoryData = [
  { name: 'Development', value: 40, color: '#EFC84A' },
  { name: 'Design', value: 25, color: '#5B8DEF' },
  { name: 'Meetings', value: 20, color: '#E8614D' },
  { name: 'Learning', value: 15, color: '#4CAF6E' },
]

const stats = [
  { label: 'Tasks Completed', value: '124', change: '+12%', positive: true },
  { label: 'Focus Hours', value: '42.5h', change: '+8%', positive: true },
  { label: 'Streak', value: '14 days', change: '+3', positive: true },
  { label: 'Efficiency', value: '87%', change: '-2%', positive: false },
]

const customTooltipStyle = {
  background: '#FFFFFF',
  border: '1px solid rgba(40, 40, 30, 0.10)',
  borderRadius: '8px',
  padding: '8px 12px',
  fontSize: '12px',
  boxShadow: '0 2px 8px rgba(40, 40, 30, 0.06)',
}

export function AnalyticsPage() {
  return (
    <div>
      {/* Stats */}
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
          <div className="card" key={i} style={{ padding: 'var(--space-5)' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: 'var(--space-2)' }}>
              {stat.label}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: '12px',
                fontWeight: 500,
                color: stat.positive ? 'var(--success)' : 'var(--danger)',
              }}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-5)',
        marginBottom: 'var(--space-5)',
      }}>
        {/* Weekly Tasks */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div className="card-title">Weekly Tasks</div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(40,40,30,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#77766F' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#77766F' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(239, 200, 74, 0.08)' }} />
                <Bar dataKey="tasks" fill="#EFC84A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Focus Hours Trend */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="card-title">Focus Hours</div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(40,40,30,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#77766F' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#77766F' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} />
                <Line type="monotone" dataKey="hours" stroke="#EFC84A" strokeWidth={2} dot={{ r: 4, fill: '#EFC84A', stroke: '#fff', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#EFC84A' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 'var(--space-5)',
      }}>
        {/* Monthly Progress */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="card-title">Monthly Progress</div>
          <div style={{ height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(40,40,30,0.06)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#77766F' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#77766F' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={customTooltipStyle} cursor={{ fill: 'rgba(239, 200, 74, 0.08)' }} />
                <Bar dataKey="completed" fill="#EFC84A" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" fill="rgba(40,40,30,0.08)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Time by Category */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="card-title">Time by Category</div>
          <div style={{ height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={customTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
            {categoryData.map(cat => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: cat.color }} />
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{cat.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
