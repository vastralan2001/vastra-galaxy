import { motion } from 'framer-motion'
import { Crosshair, MapPin } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import { useSiteData } from '../data/store'

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

// 三个角色胶囊各用一种低饱和星色
const ROLE_COLORS = [
  { color: '#8B8FD9', glow: 'rgba(139,143,217,0.5)' }, // 靛蓝
  { color: '#A78BFA', glow: 'rgba(167,139,250,0.5)' }, // 暮光紫
  { color: '#C9A96A', glow: 'rgba(201,169,106,0.45)' }, // 星尘金
]

export default function Seeking({ index = '04' }: { index?: string }) {
  const { seeking } = useSiteData()

  return (
    <section id="seeking" className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
        >
          <Eyebrow>{index} · Destination</Eyebrow>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            星图上的目的地坐标
          </h2>
        </motion.div>

        {/* 状态卡 */}
        <motion.div
          initial={{ scale: 0.97, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 glass-card p-8 md:p-10 relative overflow-hidden"
        >
          {/* 坐标网格装饰 */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                'linear-gradient(rgba(139,143,217,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,143,217,1) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
            aria-hidden="true"
          />
          <div className="relative flex items-center gap-4">
            <span className="relative flex items-center justify-center w-11 h-11 rounded-full border border-star-gold/50 shrink-0">
              <Crosshair size={20} className="text-star-gold" />
              <span className="absolute inset-0 rounded-full animate-ping bg-star-gold/20" />
            </span>
            <div>
              <p className="font-display text-[11px] tracking-[0.25em] uppercase text-ink-faint">Current Status</p>
              <p className="mt-1 font-serif text-xl md:text-2xl text-ink">{seeking.status}</p>
            </div>
          </div>
        </motion.div>

        {/* 发光角色胶囊 */}
        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-8 flex flex-wrap gap-4"
        >
          {seeking.roles.map((role, i) => {
            const c = ROLE_COLORS[i % ROLE_COLORS.length]
            return (
              <motion.span
                key={role}
                variants={fadeUp}
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-display text-sm tracking-[0.08em] bg-cosmos-layer2/60"
                style={{
                  color: '#E8EAF4',
                  border: `1px solid ${c.color}66`,
                  boxShadow: `0 0 24px -6px ${c.glow}`,
                }}
              >
                <MapPin size={14} style={{ color: c.color }} />
                {role}
              </motion.span>
            )
          })}
        </motion.div>

        {/* 低饱和公司标签流 */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-12"
        >
          <p className="font-display text-xs tracking-[0.2em] uppercase text-star-teal mb-5">理想星系 · Target Coordinates</p>
          <div className="flex flex-wrap gap-2.5">
            {seeking.targets.map((t) => (
              <span
                key={t}
                className="px-4 py-1.5 rounded-full text-sm text-ink-faint border hairline bg-cosmos-layer1/50 transition-colors hover:text-ink-dim hover:border-star-indigo/30 cursor-default"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* note */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-12 max-w-3xl text-ink-dim leading-[1.9]"
        >
          {seeking.note}
        </motion.p>

        {/* 克制邀请 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-10 gold-quote text-lg md:text-xl"
        >
          如果你的星系里有合适的位置，欢迎联系。
        </motion.p>
      </div>
    </section>
  )
}
