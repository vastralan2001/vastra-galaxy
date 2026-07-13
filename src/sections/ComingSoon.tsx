import { motion } from 'framer-motion'
import { Newspaper, CalendarClock, FolderHeart } from 'lucide-react'

const PANELS = [
  { icon: Newspaper, title: '文章与推送' },
  { icon: CalendarClock, title: '活动回顾' },
  { icon: FolderHeart, title: '读书笔记 & 思考碎片' },
]

function EmptyAsteroid() {
  return (
    <svg viewBox="0 0 120 60" className="w-28 h-14 mx-auto my-5 animate-floaty" aria-hidden="true">
      <ellipse cx="60" cy="30" rx="48" ry="16" fill="none" stroke="rgba(139,143,217,0.3)" strokeWidth="1" strokeDasharray="4 4" />
      <circle cx="84" cy="17" r="5" fill="rgba(139,143,217,0.25)" />
      <circle cx="82.5" cy="15.5" r="1.6" fill="rgba(232,234,244,0.7)" />
    </svg>
  )
}

export default function ComingSoon({ index = '05' }: { index?: string }) {
  return (
    <section className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <span className="eyebrow">{index} · Coming Soon</span>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            星图待续
          </h2>
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {PANELS.map((p) => (
            <motion.div
              key={p.title}
              variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
              className="dashed-panel p-8 text-center bg-cosmos-layer1/40"
            >
              <p.icon size={24} className="mx-auto text-star-indigo/70" />
              <h3 className="mt-4 font-serif text-lg text-ink">{p.title}</h3>
              <EmptyAsteroid />
              <p className="text-sm text-ink-faint">内容持续更新中，敬请期待</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
