import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ChevronDown } from 'lucide-react'

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

  const titleWords = ['Construímos', 'o', 'futuro,', 'uma', 'linha', 'de', 'código', 'por', 'vez']

  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <div className="hero-logo-wrapper" ref={logoRef}>
          <img src="/logo.png" alt="Evolith Studio" className="hero-logo" />
        </div>

        <h1 className="hero-title" ref={titleRef}>
          {titleWords.map((word, i) => (
            <span
              key={i}
              className={`word ${['futuro,', 'código'].includes(word) ? 'gradient-word' : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </h1>

        <p className="hero-subtitle" ref={subtitleRef}>
          Desenvolvimento sob demanda de sites, aplicativos e games
          com tecnologia de ponta e design que impressiona.
        </p>

        <div className="hero-cta-group" ref={ctaRef}>
          <button className="btn-primary" onClick={() => scrollTo('#projetos')}>
            Ver Projetos
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('#seu-projeto')}>
            Fale Conosco
          </button>
        </div>
      </div>

      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  )
}
