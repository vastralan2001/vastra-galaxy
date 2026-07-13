import { motion } from 'framer-motion'
import { assetUrl } from '@/lib/asset'
import { ExternalLink, SatelliteDish } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'
import { useSiteData } from '../data/store'

const cardMotion = {
  hidden: { y: 24, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

export default function Portfolio({ index = '04' }: { index?: string }) {
  const { portfolio } = useSiteData()

  return (
    <section id="portfolio" className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={cardMotion}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
        >
          <Eyebrow>{index} · Portfolio</Eyebrow>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            漂浮在轨道旁的作品
          </h2>
        </motion.div>

        {portfolio.length === 0 ? (
          /* 空态 */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.8 }}
            className="mt-14 dashed-panel p-12 md:p-16 text-center bg-cosmos-layer1/40"
          >
            <SatelliteDish size={30} className="mx-auto text-star-indigo/60 animate-floaty" />
            <p className="mt-6 font-serif text-lg text-ink-dim">信号塔已就位，作品正在驶向这片轨道</p>
            <p className="mt-2 text-sm text-ink-faint">内容持续更新中，敬请期待</p>
          </motion.div>
        ) : (
          /* 卡片网格 */
          <motion.div
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
            className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {portfolio.map((item) => {
              const inner = (
                <motion.div
                  variants={cardMotion}
                  className="glass-card overflow-hidden h-full flex flex-col transition-all duration-400 hover:-translate-y-1 group"
                >
                  {item.imageDataUrl ? (
                    <div className="aspect-[16/10] overflow-hidden border-b hairline">
                      <img
                        src={assetUrl(item.imageDataUrl)}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] border-b hairline flex items-center justify-center bg-cosmos-layer2/40">
                      <SatelliteDish size={26} className="text-star-indigo/40" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-serif text-lg text-ink">{item.title}</h3>
                      {item.link && <ExternalLink size={15} className="text-ink-faint group-hover:text-star-indigo shrink-0 mt-1 transition-colors" />}
                    </div>
                    <p className="mt-3 text-sm text-ink-dim leading-relaxed flex-1">{item.description}</p>
                    {item.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span key={t} className="px-2.5 py-0.5 rounded-full text-[11px] text-ink-faint border hairline bg-cosmos-layer2/60">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <p className="mt-4 font-display text-[10px] tracking-[0.15em] uppercase text-ink-faint/70">
                      {new Date(item.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                </motion.div>
              )
              return item.link ? (
                <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="block h-full">
                  {inner}
                </a>
              ) : (
                <div key={item.id} className="h-full">
                  {inner}
                </div>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}
