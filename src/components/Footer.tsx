
export default function Footer() {
  return (
    <footer className="relative border-t hairline">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-sm tracking-[0.15em] text-ink">
          <a href="admin.html" className="text-star-gold mr-2" aria-label="管理舱入口" title="">
            ✦
          </a>
          羽羊 Vastra
        </div>
        <p className="gold-quote text-sm">我全部的野心就是自由一生</p>
        <p className="font-display text-xs tracking-[0.15em] text-ink-faint">
          © 2025 蓝天翔 · Ad Vastra
        </p>
      </div>
    </footer>
  )
}
