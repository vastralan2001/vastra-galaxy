import { motion } from 'framer-motion'
import { Mail, PenLine, Camera } from 'lucide-react'
import Eyebrow from '../components/Eyebrow'

const CARDS = [
  {
    icon: Mail,
    title: '邮箱',
    value: 'vastralan@foxmail.com',
    desc: '最正式的联络方式，来信必复',
    href: 'mailto:vastralan@foxmail.com',
    glow: 'rgba(139,143,217,0.4)',
  },
  {
    icon: PenLine,
    title: '公众号',
    value: 'Ad Vastra',
    desc: '表达欲的自留地，驶向星辰的航行日志',
    href: null,
    glow: 'rgba(201,169,106,0.4)',
  },
  {
    icon: Camera,
    title: '小红书',
    value: '@羽羊Vastra',
    desc: '生活切片：舞蹈、烟花与观察笔记',
    href: null,
    glow: 'rgba(111,183,179,0.4)',
  },
]

export default function Contact({ index = '04' }: { index?: string }) {
  return (
    <section id="contact" className="relative py-24 md:py-32 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <Eyebrow>{index} · Contact</Eyebrow>
          <h2 className="mt-5 font-serif font-bold text-ink" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
            来我的星系做客
          </h2>
          <p className="mt-5 text-ink-dim max-w-xl mx-auto leading-relaxed">
            无论是聊 AI、商业、活动，还是单纯想交换一个故事——我的舷窗永远为有趣的灵魂敞开。
          </p>
        </motion.div>

        <motion.div
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10%' }}
          className="mt-14 grid md:grid-cols-3 gap-6"
        >
          {CARDS.map((c) => {
            const inner = (
              <motion.div
                variants={{ hidden: { y: 24, opacity: 0 }, show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } } }}
                className="glass-card p-8 h-full transition-all duration-400 hover:-translate-y-1 group"
                style={{ ['--glow' as string]: c.glow }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 12px 44px -12px ${c.glow}`)}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
              >
                <c.icon size={26} className="text-star-indigo group-hover:text-ink transition-colors" />
                <p className="mt-5 font-display text-xs tracking-[0.2em] uppercase text-ink-faint">{c.title}</p>
                <p className="mt-2 font-serif text-xl text-ink break-all">{c.value}</p>
                <p className="mt-3 text-sm text-ink-dim leading-relaxed">{c.desc}</p>
              </motion.div>
            )
            return c.href ? (
              <a key={c.title} href={c.href} className="block h-full">
                {inner}
              </a>
            ) : (
              <div key={c.title} className="h-full">
                {inner}
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
