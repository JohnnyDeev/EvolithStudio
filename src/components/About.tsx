import { useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Layout, Cloud, Database, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techCards = [
  {
    icon: Layout,
    title: 'Frontend & Mobile',
    desc: 'React, Flutter e TypeScript. Interfaces responsivas e performáticas para qualquer dispositivo.',
  },
  {
    icon: Cloud,
    title: 'Backend & Cloud',
    desc: 'Node.js, Python, Firebase e AWS. Infraestrutura escalável com foco em disponibilidade.',
  },
  {
    icon: Database,
    title: 'Database',
    desc: 'PostgreSQL, Firestore e Redis. Modelagem de dados otimizada para velocidade e integridade.',
  },
  {
    icon: Sparkles,
    title: 'Specialties',
    desc: 'Integração de IA, Visão Computacional e Gamificação. Soluções inovadoras sob medida.',
  },
]

const stats = [
  { value: 15, suffix: '+', label: 'Projetos Entregues' },
  { value: 100, suffix: '%', label: 'Satisfação' },
  { value: 8, suffix: '+', label: 'Tecnologias' },
  { value: 24, suffix: '/7', label: 'Suporte' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const headerEl = sectionRef.current.querySelector('.section-header')
    const textEl = sectionRef.current.querySelector('.about-text')

    if (headerEl) {
      gsap.set(headerEl, { opacity: 0, y: 40 })
      gsap.to(headerEl, {
        scrollTrigger: {
          trigger: headerEl,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
    }

    if (textEl) {
      gsap.set(textEl, { opacity: 0, y: 30 })
      gsap.to(textEl, {
        scrollTrigger: {
          trigger: textEl,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.15,
      })
    }

    // animação sequencial dos cards de tecnologia
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.tech-card')
      gsap.set(cards, { opacity: 0, y: 50 })
      gsap.to(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
          once: true,
        },
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      })
    }

    // animação do contador de estatísticas
    if (statsRef.current) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number')
      statNumbers.forEach(el => {
        const target = parseInt(el.getAttribute('data-value') || '0')
        const suffix = el.getAttribute('data-suffix') || ''
        const counter = { val: 0 }

        gsap.to(counter, {
          val: target,
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
          duration: 2,
          ease: 'power2.out',
          onUpdate: function () {
            el.textContent = Math.round(counter.val) + suffix
          },
        })
      })
    }
  }, [])

  // easter egg: pulo + rotação no ícone ao entrar no card
  const iconRefs = useRef<(HTMLDivElement | null)[]>([])
  const animatingRef = useRef<boolean[]>(techCards.map(() => false))

  const handleIconHover = useCallback((index: number) => {
    const iconEl = iconRefs.current[index]
    if (!iconEl || animatingRef.current[index]) return

    animatingRef.current[index] = true

    gsap.timeline({
      onComplete: () => { animatingRef.current[index] = false },
    })
      .to(iconEl, {
        y: -18,
        rotation: 180,
        scale: 1.25,
        duration: 0.28,
        ease: 'power2.out',
      })
      .to(iconEl, {
        y: 0,
        rotation: 360,
        scale: 1,
        duration: 0.38,
        ease: 'bounce.out',
      })
      .set(iconEl, { rotation: 0 })
  }, [])

  // efeito de inclinação 3D nos cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / centerY * -8
    const rotateY = (x - centerX) / centerX * 8

    card.style.transform = `translateY(-8px) perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <section className="section section-alt about-section-fs" id="quem-somos" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Quem Somos</h2>
        </div>

        <p className="about-text">
          Na <strong>Evolith Studio</strong> projetamos soluções. Combinamos infraestrutura sólida
          com as frameworks mais modernas para entregar softwares que são <span className="highlight">rápidos, seguros e visualmente impactantes</span>.
          Se o desafio exige inovação — seja um sistema de IA ou um game interativo — nós entregamos a engenharia necessária.
        </p>
        <div className="stats-row" ref={statsRef}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div
                className="stat-number"
                data-value={stat.value}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tech Stack DEPOIS */}
        <div className="tech-grid" ref={cardsRef} style={{ marginTop: '4rem' }}>
          {techCards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={i}
                className="tech-card"
                onMouseEnter={() => handleIconHover(i)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="tech-card-icon"
                  ref={el => { iconRefs.current[i] = el }}
                >
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="tech-card-title">{card.title}</h3>
                <p className="tech-card-desc">{card.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
