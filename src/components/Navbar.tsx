import { useState, useEffect } from 'react'

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Quem Somos', href: '#quem-somos' },
  { label: 'Projetos', href: '#projetos' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLinkClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
        <a className="navbar-brand" href="#inicio" onClick={(e) => { e.preventDefault(); handleLinkClick('#inicio') }}>
          <img src="/logo.png" alt="Evolith Studio" className="navbar-logo" />
          <span className="navbar-title">EVOLITH STUDIO</span>
        </a>

        <div className="navbar-links">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-link"
              onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
            >
              {link.label}
            </a>
          ))}
          <button
            className="navbar-cta"
            onClick={() => handleLinkClick('#seu-projeto')}
          >
            <span>Fale Conosco</span>
          </button>
        </div>

        <div
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <a
            key={link.href}
            href={link.href}
            className="navbar-link"
            onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
          >
            {link.label}
          </a>
        ))}
        <button
          className="navbar-cta"
          onClick={() => handleLinkClick('#seu-projeto')}
          style={{ marginTop: '1rem' }}
        >
          <span>Fale Conosco</span>
        </button>
      </div>
    </>
  )
}
