import { useEffect, useRef } from 'react'

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number

    // ── Types ──────────────────────────────────────────────────────────
    interface Particle {
      x: number; y: number
      vx: number; vy: number
      size: number; opacity: number
      glowTimer: number   // 0-1: flashes when a pulse arrives
    }

    // A "ChainPulse" hops node→node through the live connection graph.
    // It was spawned when a *new* edge appeared and keeps going until:
    //   • it returns to originIdx  (loop completed)
    //   • the edge ahead breaks   (distance > CONNECTION_DIST)
    //   • no unvisited neighbours  (dead end)
    interface ChainPulse {
      originIdx: number
      fromIdx: number       // just left this node
      toIdx: number         // heading here
      t: number             // 0→1 travel progress on current edge
      speed: number
      visited: Set<number>  // nodes already traversed in this chain
    }

    let particles: Particle[] = []
    let pulses: ChainPulse[] = []
    let prevConnected: Set<string> = new Set()

    const CONNECTION_DIST = 150
    const MAX_PULSES = 10

    // ── helpers ────────────────────────────────────────────────────────
    const edgeKey = (a: number, b: number) => a < b ? `${a}:${b}` : `${b}:${a}`

    const dist = (a: Particle, b: Particle) => {
      const dx = a.x - b.x; const dy = a.y - b.y
      return Math.sqrt(dx * dx + dy * dy)
    }

    const neighborsOf = (idx: number): number[] => {
      const result: number[] = []
      particles.forEach((p, j) => {
        if (j !== idx && dist(particles[idx], p) < CONNECTION_DIST) result.push(j)
      })
      return result
    }

    // ── setup ──────────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      const count = Math.min(80, Math.floor(window.innerWidth / 15))
      particles = []
      pulses = []
      prevConnected = new Set()
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.15,
          glowTimer: 0,
        })
      }
    }

    // ── main loop ──────────────────────────────────────────────────────
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 1. Move particles
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        if (p.glowTimer > 0) p.glowTimer = Math.max(0, p.glowTimer - 0.025)
      })

      // 2. Build current connection set & detect new edges
      const currentConnected: Set<string> = new Set()
      const newEdges: [number, number][] = []

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          if (dist(particles[i], particles[j]) < CONNECTION_DIST) {
            const key = edgeKey(i, j)
            currentConnected.add(key)
            if (!prevConnected.has(key)) newEdges.push([i, j])
          }
        }
      }
      prevConnected = currentConnected

      // 3. Spawn chain pulses on new edges
      for (const [a, b] of newEdges) {
        if (pulses.length >= MAX_PULSES) break
        // from a → b
        pulses.push({
          originIdx: a,
          fromIdx: a,
          toIdx: b,
          t: 0,
          speed: 0.007 + Math.random() * 0.005,
          visited: new Set([a]),
        })
      }

      // 4. Draw static connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const d = dist(particles[i], particles[j])
          if (d < CONNECTION_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = '#8899AA'
            ctx.globalAlpha = (1 - d / CONNECTION_DIST) * 0.28
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // 5. Advance & draw chain pulses
      pulses = pulses.filter(pulse => {
        const from = particles[pulse.fromIdx]
        const to   = particles[pulse.toIdx]

        // Kill if edge broke
        if (dist(from, to) >= CONNECTION_DIST) return false

        pulse.t += pulse.speed

        // ── draw trail + orb ───────────────────────────────────────────
        const px = from.x + (to.x - from.x) * pulse.t
        const py = from.y + (to.y - from.y) * pulse.t

        const trailT = Math.max(0, pulse.t - 0.25)
        const tx0 = from.x + (to.x - from.x) * trailT
        const ty0 = from.y + (to.y - from.y) * trailT

        // Trail gradient (silver — subtle)
        const grad = ctx.createLinearGradient(tx0, ty0, px, py)
        grad.addColorStop(0, 'rgba(180,200,220,0)')
        grad.addColorStop(0.6, 'rgba(200,215,230,0.18)')
        grad.addColorStop(1, 'rgba(230,240,255,0.45)')

        ctx.beginPath()
        ctx.moveTo(tx0, ty0)
        ctx.lineTo(px, py)
        ctx.strokeStyle = grad
        ctx.globalAlpha = 1
        ctx.lineWidth = 1
        ctx.stroke()

        // Orb glow (smaller, softer)
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 5)
        glow.addColorStop(0,   'rgba(220,235,255,0.6)')
        glow.addColorStop(0.4, 'rgba(190,210,235,0.3)')
        glow.addColorStop(1,   'rgba(150,180,210,0)')

        ctx.beginPath()
        ctx.arc(px, py, 5, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.globalAlpha = 1
        ctx.fill()

        // ── hop when arriving ──────────────────────────────────────────
        if (pulse.t >= 1) {
          particles[pulse.toIdx].glowTimer = 1  // flash destination node

          // loop completed?
          if (pulse.toIdx === pulse.originIdx) return false

          pulse.visited.add(pulse.toIdx)

          // Find next unvisited neighbour
          const candidates = neighborsOf(pulse.toIdx).filter(
            n => !pulse.visited.has(n)
          )

          if (candidates.length === 0) {
            // Try to route back to origin if connected
            const backToOrigin = neighborsOf(pulse.toIdx).includes(pulse.originIdx)
            if (backToOrigin) {
              pulse.fromIdx = pulse.toIdx
              pulse.toIdx   = pulse.originIdx
              pulse.t       = 0
              return true
            }
            return false  // dead end
          }

          // Prefer the neighbour closest to origin for a natural circuit feel
          const origin = particles[pulse.originIdx]
          candidates.sort((a, b) =>
            dist(particles[a], origin) - dist(particles[b], origin)
          )

          pulse.fromIdx = pulse.toIdx
          pulse.toIdx   = candidates[0]
          pulse.t       = 0
        }

        return true
      })

      // 6. Draw particles (with silver halo when glowTimer active)
      particles.forEach(p => {
        ctx.globalAlpha = p.opacity
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = '#C8D8E8'
        ctx.fill()

        if (p.glowTimer > 0) {
          const r = p.size * 3.5 * p.glowTimer
          const halo = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
          halo.addColorStop(0,   `rgba(210,225,245,${p.glowTimer * 0.5})`)
          halo.addColorStop(0.5, `rgba(180,205,230,${p.glowTimer * 0.25})`)
          halo.addColorStop(1,   'rgba(150,180,210,0)')
          ctx.beginPath()
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
          ctx.fillStyle = halo
          ctx.globalAlpha = p.glowTimer
          ctx.fill()
        }
      })

      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(drawParticles)
    }

    resize()
    createParticles()
    drawParticles()

    const onResize = () => { resize(); createParticles() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
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
