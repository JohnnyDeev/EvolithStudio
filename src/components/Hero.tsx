import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronsDown } from 'lucide-react'

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 })

    // entrada do logo
    if (logoRef.current) {
      tl.fromTo(logoRef.current, {
        scale: 0.5,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.7)',
      })
    }

    // revelação das palavras uma por uma
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word')
      tl.to(words, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
      }, '-=0.3')
    }

    // subtítulo
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.2')
    }

    // botões de chamada para ação (CTA)
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current.children, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
      }, '-=0.3')
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const titleWords = ['Onde', 'a', 'tecnologia', 'encontra', 'a', 'imaginação.']

  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <div className="hero-logo-wrapper" ref={logoRef}>
          <img src="/logo.png" alt="Evolith Studio Logo" className="hero-logo" />
        </div>
        
        <h1 className="hero-title" ref={titleRef}>
          {titleWords.map((word, i) => (
            <span
              key={i}
              className={`word ${['tecnologia', 'imaginação.'].includes(word) ? 'gradient-word' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          Criamos <span className="gradient-word">ecossistemas digitais</span>, aplicativos de <span className="gradient-word">alta performance</span> e <span className="gradient-word">experiências gamers</span> que conectam sua marca ao <span className="gradient-word">próximo nível</span>.
        </p>

        <div className="hero-cta-group" ref={ctaRef}>
          <button className="btn-primary" onClick={() => scrollTo('#quem-somos')}>
            <span>Quem Somos</span>
            <span className="btn-glow"></span>
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('#projetos')}>
            <span>Nossos Projetos</span>
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={() => scrollTo('#quem-somos')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.875rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>Descobrir</span>
        <div className="scroll-bar" style={{ height: '40px', width: '2px', background: 'rgba(255,255,255,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent, #fff)', animation: 'scroll-drop 2s infinite' }} />
        </div>
        <ChevronsDown size={20} style={{ animation: 'bounce 2s infinite', opacity: 0.7 }} />
      </div>
    </section>
  );
}
