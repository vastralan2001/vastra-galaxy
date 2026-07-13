import { useEffect } from 'react'
import Lenis from 'lenis'
import Starfield from '../components/Starfield'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Galaxy from '../sections/Galaxy'
import Skills from '../sections/Skills'
import Portfolio from '../sections/Portfolio'
import Seeking from '../sections/Seeking'
import Contact from '../sections/Contact'
import ComingSoon from '../sections/ComingSoon'
import { useSiteData } from '../data/store'

export default function Home() {
  const { visibility } = useSiteData()

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  // 章节编号动态顺延：Portfolio 开关开启时占一个编号
  const showPortfolio = visibility.portfolio
  let seq = 3 // 01 About · 02 Galaxy · 03 Toolbox
  const portfolioNo = showPortfolio ? String(++seq).padStart(2, '0') : null
  const seekingNo = String(++seq).padStart(2, '0')
  const contactNo = String(++seq).padStart(2, '0')
  const comingSoonNo = String(++seq).padStart(2, '0')

  return (
    <>
      <Starfield />
      <Navbar />
      <main className="relative">
        <Hero />
        <About index="01" />
        <Galaxy index="02" />
        <Skills index="03" />
        {showPortfolio && portfolioNo && <Portfolio index={portfolioNo} />}
        <Seeking index={seekingNo} />
        <Contact index={contactNo} />
        <ComingSoon index={comingSoonNo} />
      </main>
      <Footer />
    </>
  )
}
