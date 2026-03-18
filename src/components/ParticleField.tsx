import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let particles: Particle[] = []

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(80, Math.floor(window.innerWidth / 15))
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.5 ? '#E8F1F2' : '#C0C0C0',
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p, i) => {
        // movimentação
        p.x += p.vx
        p.y += p.vy

        // reposicionar quando sair da tela
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // desenhar partícula
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // desenhar conexões entre partículas próximas
        for (let j = i + 1; j < particles.length; j++) {
          const other = particles[j]
          const dx = p.x - other.x
          const dy = p.y - other.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(other.x, other.y)
            ctx.strokeStyle = p.color
            ctx.globalAlpha = (1 - distance / 150) * 0.15
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(drawParticles)
    }

    resize()
    createParticles()
    drawParticles()

    window.addEventListener('resize', () => {
      resize()
      createParticles()
    })

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="global-particles"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -10, pointerEvents: 'none' }}
    />
  )
}
