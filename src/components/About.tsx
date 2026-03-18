import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Shield, Server, Database } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techCards = [
  {
    icon: Code2,
    title: 'Tecnologia Moderna',
    desc: 'React, Flutter, Node.js, Python, TypeScript e as frameworks mais atuais do mercado.',
  },
  {
    icon: Shield,
    title: 'Segurança Total',
    desc: 'HTTPS, criptografia de ponta, conformidade com LGPD e proteção de dados em todas as camadas.',
  },
  {
    icon: Server,
    title: 'Infraestrutura Premium',
    desc: 'Hospedagem em AWS, Vercel e Firebase com alta disponibilidade e escalabilidade global.',
  },
  {
    icon: Database,
    title: 'Dados Robustos',
    desc: 'PostgreSQL, MongoDB, Firestore e Redis para performance e confiabilidade dos seus dados.',
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
    <section className="section section-alt" id="quem-somos" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Quem Somos</h2>
          <p className="section-subtitle">
            Transformamos desafios em soluções digitais de alto impacto
          </p>
        </div>

        <p className="about-text">
          A <strong>Evolith Studio</strong> nasceu da paixão por criar
          <span className="highlight"> experiências digitais extraordinárias</span>.
          Somos especializados em desenvolvimento sob demanda, utilizando as
          <strong> tecnologias mais modernas do mercado</strong> para entregar
          soluções que superam expectativas.
          Cada projeto é tratado com dedicação total, desde a arquitetura
          até a entrega final, garantindo <span className="highlight">performance,
          segurança e design impecável</span>.
          Trabalhamos com os melhores hosts e bancos de dados do mercado,
          porque sabemos que a base de um grande produto é uma
          <strong> infraestrutura sólida</strong>.
        </p>

        <div className="tech-grid" ref={cardsRef}>
          {techCards.map((card, i) => {
            const Icon = card.icon
            return (
              <div
                key={i}
                className="tech-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="tech-card-icon">
                  <Icon size={48} strokeWidth={1.5} />
                </div>
                <h3 className="tech-card-title">{card.title}</h3>
                <p className="tech-card-desc">{card.desc}</p>
              </div>
            )
          })}
        </div>

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
      </div>
    </section>
  )
}
