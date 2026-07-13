import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#about', label: '关于' },
  { href: '#galaxy', label: '星系' },
  { href: '#skills', label: '技能' },
  { href: '#contact', label: '联系' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-md bg-cosmos-base/70 border-b hairline' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-sm tracking-[0.15em] text-ink">
          <span className="text-star-gold mr-2">✦</span>羽羊 Vastra
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-xs tracking-[0.18em] uppercase text-ink-dim hover:text-ink transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="md:hidden text-ink-dim hover:text-ink"
          onClick={() => setOpen(true)}
          aria-label="打开菜单"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-cosmos-base/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <button
              className="absolute top-5 right-5 text-ink-dim hover:text-ink"
              onClick={() => setOpen(false)}
              aria-label="关闭菜单"
            >
              <X size={26} />
            </button>
            <ul className="flex flex-col items-center gap-10">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.08 * i }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-2xl text-ink hover:text-star-gold transition-colors"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
