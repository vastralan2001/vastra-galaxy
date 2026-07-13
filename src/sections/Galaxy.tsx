import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, MousePointerClick } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import { CATEGORY_META, ORBIT_PERIODS, type Category, type Planet } from '../data/galaxy'
import { useSiteData } from '../data/store'

const ORBIT_RADII = [24, 34, 43, 50] // % of container half-width from center
const CATEGORIES: Category[] = ['academic', 'business', 'venture', 'community']

function PlanetDot({
  planet,
  period,
  reversed,
  selected,
  onSelect,
}: {
  planet: Planet
  period: number
  reversed: boolean
  selected: boolean
  onSelect: () => void
}) {
  const meta = CATEGORY_META[planet.category]
  const rad = (planet.angle * Math.PI) / 180
  const r = ORBIT_RADII[planet.orbit - 1]
  const left = 50 + r * Math.cos(rad)
  const top = 50 + r * Math.sin(rad)

  return (
    <button
      onClick={onSelect}
      className="absolute group flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto p-3 -m-3 cursor-pointer"
      style={{ left: `${left}%`, top: `${top}%` }}
      aria-label={planet.name}
    >
      <span
        className="relative block rounded-full transition-transform duration-300 group-hover:scale-150"
        style={{
          width: planet.featured ? 18 : 14,
          height: planet.featured ? 18 : 14,
          background: `radial-gradient(circle at 35% 30%, #fff, ${meta.color} 55%, transparent 75%)`,
          boxShadow: `0 0 ${planet.featured ? 22 : 14}px ${meta.glow}`,
          outline: selected ? '2px solid #C9A96A' : planet.featured ? '1.5px solid rgba(201,169,106,0.7)' : 'none',
          outlineOffset: 4,
        }}
      >
        {planet.featured && (
          <span className="absolute inset-0 rounded-full animate-ping pointer-events-none" style={{ background: meta.glow }} />
        )}
      </span>
      <span
        className={`whitespace-nowrap font-display text-[11px] tracking-[0.08em] transition-colors pointer-events-none ${planet.featured ? 'text-ink' : 'text-ink-dim group-hover:text-ink'}`}
        style={{ animation: `spin ${period}s linear infinite ${reversed ? 'normal' : 'reverse'}` }}
      >
        {planet.name}
        {planet.featured && <span className="ml-1.5 text-star-gold">最新</span>}
        <span className={`${planet.featured ? 'inline' : 'hidden group-hover:inline'} text-ink-faint ml-1.5`}>{planet.time}</span>
      </span>
    </button>
  )
}

function DetailPanel({ planet }: { planet: Planet | null }) {
  return (
    <div className="lg:sticky lg:top-28 glass-card p-8 min-h-[320px]">
      <AnimatePresence mode="wait">
        {planet ? (
          <motion.div
            key={planet.id}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-display tracking-[0.12em] mb-5"
              style={{
                color: CATEGORY_META[planet.category].color,
                border: `1px solid ${CATEGORY_META[planet.category].glow}`,
              }}
            >
              {CATEGORY_META[planet.category].label}
            </span>
            <h3 className="font-serif text-2xl text-ink">{planet.name}</h3>
            <p className="mt-1 font-display text-sm tracking-[0.1em] text-ink-faint">{planet.time}</p>
            <p className="mt-4 text-sm text-star-indigo">{planet.role}</p>
            <ul className="mt-5 space-y-3">
              {planet.highlights.map((h) => (
                <li key={h.slice(0, 10)} className="flex gap-3 text-sm text-ink-dim leading-relaxed">
                  <span className="mt-2 w-1 h-1 rounded-full bg-star-gold shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full min-h-[260px] flex flex-col items-center justify-center text-center gap-4"
          >
            <MousePointerClick size={28} className="text-star-indigo/60" />
            <p className="text-ink-faint text-sm leading-relaxed">
              点击任意一颗小行星
              <br />
              查看这段旅程
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileTimeline({
  planets,
  selected,
  onSelect,
}: {
  planets: Planet[]
  selected: string | null
  onSelect: (id: string) => void
}) {
  return (
    <div className="space-y-10">
      {CATEGORIES.map((cat) => {
        const meta = CATEGORY_META[cat]
        return (
          <div key={cat}>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase mb-5 flex items-center gap-2" style={{ color: meta.color }}>
              <span className="w-2 h-2 rounded-full" style={{ background: meta.color, boxShadow: `0 0 10px ${meta.glow}` }} />
              {meta.label}
            </h4>
            <div className="space-y-3">
              {planets.filter((p) => p.category === cat).map((p) => {
                const open = selected === p.id
                return (
                  <div key={p.id} className="glass-card overflow-hidden">
                    <button onClick={() => onSelect(p.id)} className="w-full flex items-center gap-4 p-5 text-left">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ background: `radial-gradient(circle at 35% 30%, #fff, ${meta.color} 60%, transparent 80%)`, boxShadow: `0 0 10px ${meta.glow}` }}
                      />
                      <span className="flex-1">
                        <span className="block text-ink font-serif">
                          {p.name}
                          {p.featured && <span className="ml-2 text-[10px] font-display tracking-[0.1em] text-star-gold align-middle">最新</span>}
                        </span>
                        <span className="block text-xs text-ink-faint font-display tracking-[0.08em] mt-0.5">{p.time}</span>
                      </span>
                      <ChevronDown size={16} className={`text-ink-faint transition-transform ${open ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-0 border-t hairline">
                            <p className="mt-4 text-xs text-star-indigo">{p.role}</p>
                            <ul className="mt-3 space-y-2">
                              {p.highlights.map((h) => (
                                <li key={h.slice(0, 10)} className="flex gap-2.5 text-xs text-ink-dim leading-relaxed">
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-star-gold shrink-0" />
                                  {h}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Galaxy({ index = '02' }: { index?: string }) {
  const { experiences: planets } = useSiteData()
  // 默认选中 featured 行星
  const [selectedId, setSelectedId] = useState<string | null>(() => planets.find((p) => p.featured)?.id ?? null)
  const selected = planets.find((p) => p.id === selectedId) ?? planets.find((p) => p.featured) ?? planets[0] ?? null

  return (
    <section id="galaxy" className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>{index} · Galaxy</Eyebrow>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            我的每一段经历，都是一颗小行星
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-10 items-start">
          {/* Desktop orbit map */}
          <motion.div
            initial={{ scale: 0.9, rotate: -4, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block relative w-full max-w-[620px] mx-auto aspect-square [&:hover_.orbit-spin]:[animation-play-state:paused]"
          >
            {/* central star */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
              <div
                className="w-12 h-12 rounded-full animate-twinkle"
                style={{
                  background: 'radial-gradient(circle at 40% 35%, #fff, #C9A96A 45%, rgba(201,169,106,0.15) 75%, transparent)',
                  boxShadow: '0 0 50px rgba(201,169,106,0.45)',
                }}
              />
              <span className="mt-2 font-display text-[11px] tracking-[0.15em] text-star-gold whitespace-nowrap">羽羊 Vastra</span>
            </div>

            {/* orbits */}
            {ORBIT_RADII.map((r, i) => {
              const period = ORBIT_PERIODS[i]
              const reversed = i % 2 === 1
              return (
                <div
                  key={r}
                  className="orbit-spin absolute inset-0 pointer-events-none"
                  style={{ animation: `spin ${period}s linear infinite ${reversed ? 'reverse' : 'normal'}` }}
                >
                  <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: `${r * 2}%`,
                      height: `${r * 2}%`,
                      border: `1px ${i % 2 === 0 ? 'solid' : 'dashed'} rgba(139,143,217,0.18)`,
                    }}
                  />
                  {planets.filter((p) => p.orbit === i + 1).map((p) => (
                    <PlanetDot
                      key={p.id}
                      planet={p}
                      period={period}
                      reversed={reversed}
                      selected={selectedId === p.id}
                      onSelect={() => setSelectedId(p.id)}
                    />
                  ))}
                </div>
              )
            })}

            {/* legend */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-x-5 gap-y-2 w-[130%] pointer-events-none">
              {CATEGORIES.map((c) => (
                <span key={c} className="flex items-center gap-1.5 font-display text-[10px] tracking-[0.12em] text-ink-faint uppercase">
                  <span className="w-2 h-2 rounded-full" style={{ background: CATEGORY_META[c].color }} />
                  {CATEGORY_META[c].label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mobile timeline */}
          <div className="lg:hidden">
            <MobileTimeline planets={planets} selected={selectedId} onSelect={(id) => setSelectedId(selectedId === id ? null : id)} />
          </div>

          {/* Detail panel (desktop) */}
          <div className="hidden lg:block">
            <DetailPanel planet={selected} />
          </div>
        </div>
      </div>
    </section>
  )
}
