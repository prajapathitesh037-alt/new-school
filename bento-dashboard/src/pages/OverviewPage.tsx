import { ProfileCard } from '../components/cards/ProfileCard'
import { ProgressCard } from '../components/cards/ProgressCard'
import { TimeTrackerCard } from '../components/cards/TimeTrackerCard'
import { QuickTasksCard } from '../components/cards/QuickTasksCard'
import { RecentActivityCard } from '../components/cards/RecentActivityCard'
import { UpcomingCard } from '../components/cards/UpcomingCard'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
}

export function OverviewPage() {
  return (
    <div className="bento-grid">
      {/* Row 1 */}
      <motion.div className="bento-span-5" custom={0} variants={cardVariants} initial="hidden" animate="visible">
        <ProfileCard />
      </motion.div>
      <motion.div className="bento-span-4" custom={1} variants={cardVariants} initial="hidden" animate="visible">
        <ProgressCard />
      </motion.div>
      <motion.div className="bento-span-3" custom={2} variants={cardVariants} initial="hidden" animate="visible" style={{ gridColumn: 'span 3' }}>
        <TimeTrackerCard />
      </motion.div>

      {/* Row 2 */}
      <motion.div className="bento-span-4" custom={3} variants={cardVariants} initial="hidden" animate="visible">
        <QuickTasksCard />
      </motion.div>
      <motion.div className="bento-span-4" custom={4} variants={cardVariants} initial="hidden" animate="visible">
        <RecentActivityCard />
      </motion.div>
      <motion.div className="bento-span-4" custom={5} variants={cardVariants} initial="hidden" animate="visible">
        <UpcomingCard />
      </motion.div>
    </div>
  )
}
