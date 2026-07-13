import { motion } from 'framer-motion'
import Eyebrow from '../components/Eyebrow'

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
}

const PARAS = [
  '「羽羊」这个花名，来自一个朴素的愿望：羊长出翅膀，就能去很多想去的地方。我相信利他是最长的捷径，也享受做人与人之间的连接器。',
  '我把自己定位成一个「人类观察员」——在 AI 与商业的交叉地带，观察人、理解人，再用产品与数据把洞察变成真实的价值。',
  '白天是 ESTJ 式的项目负责人，晚上是 INFP 式的小说读者。务实与理想主义并不矛盾，它们只是同一颗恒星的两面。',
]

const CONTRACTS = [
  '每天和一个不太熟的人聊天',
  '每周舞房两小时',
  '每月迪士尼烟花',
]

export default function About({ index = '01' }: { index?: string }) {
  return (
    <section id="about" className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10%' }}>
          <Eyebrow>{index} · About</Eyebrow>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            一颗仍在形成的恒星
          </h2>
        </motion.div>

        <div className="mt-14 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            className="space-y-6"
          >
            {PARAS.map((p) => (
              <motion.p key={p.slice(0, 8)} variants={fadeUp} className="text-ink-dim leading-[1.9]">
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-card p-8 md:p-10"
          >
            <p className="eyebrow mb-6">Personal Manual</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['01 年', '天秤座', '庚金女', '工作 ESTJ', '生活 INFP'].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full text-xs text-ink-dim border hairline bg-cosmos-layer2/60">
                  {t}
                </span>
              ))}
            </div>
            <p className="font-display text-xs tracking-[0.2em] uppercase text-star-indigo mb-4">生命契约三则</p>
            <ul className="space-y-3 mb-10">
              {CONTRACTS.map((c, i) => (
                <li key={c} className="flex items-center gap-3 text-ink-dim">
                  <span className="font-display text-xs text-star-gold">0{i + 1}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1 }}
              className="gold-quote text-xl md:text-2xl border-t hairline pt-8"
            >
              「我全部的野心就是自由一生」
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
