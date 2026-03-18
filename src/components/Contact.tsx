import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Mail, Send } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    type: '',
    description: '',
  })

  useEffect(() => {
    if (!sectionRef.current) return

    const header = sectionRef.current.querySelector('.section-header')
    if (header) {
      gsap.set(header, { opacity: 0, y: 40 })
      gsap.to(header, {
        scrollTrigger: { trigger: header, start: 'top 85%', toggleActions: 'play none none none', once: true },
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      })
    }

    if (formRef.current) {
      gsap.set(formRef.current, { opacity: 0, x: -50 })
      gsap.to(formRef.current, {
        scrollTrigger: { trigger: formRef.current, start: 'top 85%', toggleActions: 'play none none none', once: true },
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
      })
    }

    if (visualRef.current) {
      gsap.set(visualRef.current, { opacity: 0, x: 50 })
      gsap.to(visualRef.current, {
        scrollTrigger: { trigger: visualRef.current, start: 'top 85%', toggleActions: 'play none none none', once: true },
        opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', delay: 0.2,
      })
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const buildMessage = () => {
    const typeLabel = form.type || 'Não informado'
    return `Olá! Meu nome é ${form.name || 'Não informado'}.%0A%0ATipo de projeto: ${typeLabel}%0A%0ADescrição: ${form.description || 'Não informada'}%0A%0AEmail para contato: ${form.email || 'Não informado'}`
  }

  const handleWhatsApp = () => {
    const phone = '5500000000000' // Substitua pelo número de telefone real
    const msg = buildMessage()
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  const handleEmail = () => {
    const email = 'contato@evolithstudio.com' // Substitua pelo e-mail real
    const subject = encodeURIComponent(`Novo Projeto - ${form.type || 'Consulta'}`)
    const body = buildMessage().replace(/%0A/g, '%0D%0A')
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank')
  }

  return (
    <section className="section section-alt" id="seu-projeto" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Tem uma ideia?</h2>
          <p className="section-subtitle">
            Conte pra gente o que você precisa. Vamos transformar <span className="highlight">sua visão em realidade</span>.
          </p>
        </div>

        <div className="contact-wrapper">
          <div ref={formRef}>
            <div className="contact-form">
              <div className="form-group">
                <label className="form-label">Seu Nome</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Como podemos te chamar?"
                  value={form.name}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Projeto</label>
                <select
                  name="type"
                  className="form-select"
                  value={form.type}
                  onChange={handleChange}
                >
                  <option value="">Selecione o tipo</option>
                  <option value="Site">Site / Loja Virtual</option>
                  <option value="Aplicativo">Aplicativo Mobile</option>
                  <option value="Game">Game / Jogo</option>
                  <option value="Sistema">Sistema / Dashboard</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Descreva sua Ideia</label>
                <textarea
                  name="description"
                  className="form-textarea"
                  placeholder="Conte um pouco sobre o que você precisa..."
                  value={form.description}
                  onChange={handleChange}
                />
              </div>

              <div className="contact-buttons">
                <button className="btn-whatsapp" onClick={handleWhatsApp}>
                  <MessageCircle size={18} />
                  Enviar por WhatsApp
                </button>
                <button className="btn-email" onClick={handleEmail}>
                  <Mail size={18} />
                  Enviar por Email
                </button>
              </div>
            </div>
          </div>

          <div className="contact-visual" ref={visualRef}>
            <div className="contact-visual-icon">
              <Send size={60} color="#fff" strokeWidth={1.5} />
            </div>
            <p className="contact-visual-text">
              Preencha o formulário e entre em contato diretamente pelo
              <strong style={{ color: '#25D366' }}> WhatsApp</strong> ou
              <strong style={{ color: '#00D4FF' }}> Email</strong>.
              Responderemos o mais rápido possível!
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
