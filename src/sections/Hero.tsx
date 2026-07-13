import { motion } from 'framer-motion'
import { ArrowDown, Compass, UserRound } from 'lucide-react'

const line = {
  hidden: { y: 30, opacity: 0 },
  show: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.25 + i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[100dvh] flex flex-col items-center justify-center px-5 sm:px-8 text-center">
      <div className="max-w-3xl">
        <motion.p custom={0} variants={line} initial="hidden" animate="show" className="eyebrow justify-center mb-8">
          Ad Vastra · Personal Galaxy
        </motion.p>
        <motion.h1
          custom={1}
          variants={line}
          initial="hidden"
          animate="show"
          className="font-serif font-bold text-ink leading-none"
          style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)' }}
        >
          蓝天翔
        </motion.h1>
        <motion.p custom={2} variants={line} initial="hidden" animate="show" className="mt-4 font-display text-lg tracking-[0.25em] text-ink-dim">
          羽羊 / VASTRA
        </motion.p>
        <motion.p custom={3} variants={line} initial="hidden" animate="show" className="mt-8 text-base md:text-lg text-ink-dim leading-relaxed">
          AI 时代的产品工程师 / 活动主理人 · 务实的理想主义者
        </motion.p>
        <motion.p custom={4} variants={line} initial="hidden" animate="show" className="mt-4 text-sm md:text-base text-ink-faint leading-relaxed max-w-xl mx-auto">
          欢迎驶入我的个人星系——这里的每一段经历，都是一颗仍在发光的小行星。
        </motion.p>
        <motion.div custom={5} variants={line} initial="hidden" animate="show" className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#galaxy"
            className="group inline-flex items-center gap-2 px-7 py-3 rounded-full border border-star-indigo/50 text-ink font-display text-sm tracking-[0.12em] transition-all hover:border-star-indigo hover:glow-indigo active:scale-[0.98]"
          >
            <Compass size={16} className="text-star-indigo" />
            开始探索 →
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-ink-dim font-display text-sm tracking-[0.12em] transition-colors hover:text-ink active:scale-[0.98]"
          >
            <UserRound size={16} />
            关于我
          </a>
        </motion.div>
      </div>
      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ink-faint animate-arrow-bob" aria-label="向下滚动">
        <ArrowDown size={22} />
      </a>
    </section>
  )
}
