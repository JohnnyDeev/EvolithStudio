export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src="/logo.png" alt="Evolith Studio" className="footer-logo" />
          <p className="footer-tagline">EVOLITH STUDIO</p>
        </div>

        <nav className="footer-links">
          {[
            { label: 'Início', href: '#inicio' },
            { label: 'Quem Somos', href: '#quem-somos' },
            { label: 'Projetos', href: '#projetos' },
            { label: 'Seu Projeto', href: '#seu-projeto' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              className="footer-link"
              onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-line" />

        <p className="footer-copy">
          &copy; {currentYear} Evolith Studio. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
