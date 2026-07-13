import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow'

const SKILL_GROUPS = [
  { title: '数据与分析', tags: ['Python', 'R', 'SQL', 'HiveSQL', 'Wind', 'A/B 实验'] },
  { title: '产品与 AI', tags: ['Coze', 'LLM Prompt', 'Vibe Coding & Designing', 'Agent 应用'] },
  { title: '设计与表达', tags: ['Figma', 'Thinkcell', '商赛级 PPT', 'Storytelling'] },
  { title: '语言', tags: ['中文母语', '英语 CET-6 600'] },
]

const CONSTELLATION = [
  { name: '篮球', x: 12, y: 28 },
  { name: 'KPOP 舞蹈', x: 30, y: 14 },
  { name: '滑雪', x: 52, y: 26 },
  { name: '跆拳道', x: 74, y: 12 },
  { name: '辩论', x: 88, y: 34 },
  { name: '跑步', x: 70, y: 52 },
  { name: '迪士尼烟花', x: 84, y: 74 },
  { name: '小说', x: 52, y: 82 },
  { name: 'Cosplay', x: 26, y: 68 },
  { name: '八段锦', x: 12, y: 52 },
]

const LINKS: [number, number][] = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 0], [2, 5], [1, 9]]

const tagMotion = {
  hidden: { scale: 0.8, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Skills({ index = '03' }: { index?: string }) {
  return (
    <section id="skills" className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Eyebrow>{index} · Toolbox</Eyebrow>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            工具箱与星座
          </h2>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-14 lg:gap-20 items-start">
          {/* skill tree */}
          <div className="space-y-9">
            {SKILL_GROUPS.map((g) => (
              <motion.div
                key={g.title}
                variants={{ show: { transition: { staggerChildren: 0.04 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10%' }}
              >
                <h3 className="font-display text-xs tracking-[0.2em] uppercase text-star-teal mb-4">{g.title}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {g.tags.map((t) => (
                    <motion.span
                      key={t}
                      variants={tagMotion}
                      className="px-4 py-1.5 rounded-full text-sm text-ink-dim border hairline bg-cosmos-layer2/50 transition-all hover:text-ink hover:border-star-indigo/50 hover:bg-star-indigo/10 hover:shadow-[0_0_20px_-6px_rgba(139,143,217,0.5)] cursor-default"
                    >
                      {t}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* constellation (md+) */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1 }}
            className="hidden md:block relative aspect-[4/3] glass-card p-6"
          >
            <svg viewBox="0 0 100 75" className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
              {LINKS.map(([a, b], i) => (
                <motion.line
                  key={`${a}-${b}`}
                  x1={CONSTELLATION[a].x}
                  y1={CONSTELLATION[a].y * 0.75}
                  x2={CONSTELLATION[b].x}
                  y2={CONSTELLATION[b].y * 0.75}
                  stroke="rgba(111,183,179,0.35)"
                  strokeWidth={0.25}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.08, duration: 1 }}
                />
              ))}
            </svg>
            {CONSTELLATION.map((n, i) => (
              <motion.div
                key={n.name}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                className="absolute group flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-star-teal shadow-[0_0_12px_rgba(111,183,179,0.6)] transition-transform group-hover:scale-150 group-hover:bg-ink" />
                <span className="mt-1.5 text-[11px] text-ink-dim group-hover:text-ink whitespace-nowrap transition-colors">{n.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* mobile fallback pills */}
          <div className="md:hidden flex flex-wrap gap-2.5">
            {CONSTELLATION.map((n) => (
              <span key={n.name} className="px-4 py-1.5 rounded-full text-sm text-ink-dim border hairline bg-cosmos-layer2/50">
                {n.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
