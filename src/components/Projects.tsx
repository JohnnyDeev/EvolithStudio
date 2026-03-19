import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ShoppingCart, Smartphone, Monitor, Camera,
  Palette, HelpCircle, CircleDot, Rocket, Cog,
} from 'lucide-react'
import ProjectModal, { type Project } from './ProjectModal'

gsap.registerPlugin(ScrollTrigger)

const projectIcons = [ShoppingCart, Smartphone, Monitor, Camera, Palette, HelpCircle, CircleDot, Rocket, Cog]

const projects: Project[] = [
  {
    id: 1,
    title: 'Plataforma E-Commerce Moderna',
    tag: 'Site',
    tagClass: '',
    shortDesc: 'O E-commerce Completo para Impulsionar Suas Vendas',
    fullDesc: 'Plataforma e-commerce completa, desde o catálogo de produtos com busca e filtros avançados até o checkout com múltiplos métodos de pagamento. O dashboard administrativo permite gerenciar pedidos, estoque, clientes e relatórios em tempo real. Design responsivo premium com carrinho persistente e experiência de compra fluida.',
    features: [
      'Catálogo com busca e filtros inteligentes',
      'Checkout com Stripe, PIX e boleto',
      'Cálculo automático de frete (Correios/Melhor Envio)',
      'Dashboard admin com relatórios e gráficos',
      'Gestão de estoque em tempo real',
      'Notificações por email e WhatsApp',
      'Carrinho persistente e lista de desejos',
      'SEO otimizado para Google Shopping',
    ],
    techs: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'AWS'],
    image: '/e-commerce-completo.png',
  },
  {
    id: 2,
    title: 'App de Pedidos & Delivery',
    tag: 'App',
    tagClass: 'app',
    shortDesc: 'Aumente Suas Vendas com o Seu Próprio App de Entregas',
    fullDesc: 'Aplicativo de pedidos com cardápio digital interativo, categorias, combos e personalização de itens. Sistema completo de delivery com rastreamento, painel de cozinha para gerenciar preparo e impressão automática. Integração direta com WhatsApp para confirmação e atualização de status dos pedidos.',
    features: [
      'Cardápio digital interativo com categorias',
      'Pedidos online com personalização de itens',
      'Rastreamento de delivery em tempo real',
      'Painel de cozinha para gerenciamento',
      'Integração WhatsApp automática',
      'Impressão automática de pedidos',
      'Cupons de desconto e fidelidade',
      'Relatórios de vendas detalhados',
    ],
    techs: ['Flutter', 'Node.js', 'Firebase', 'API WhatsApp', 'Maps'],
    image: '/app-de-pedidos.png',
  },
  {
    id: 3,
    title: 'Display Interativo Controlado',
    tag: 'Sistema',
    tagClass: 'sistema',
    shortDesc: 'Totems Touchscreen e Displays Conectados ao Seu Negócio',
    fullDesc: 'Sistema de exibição profissional com duas telas sincronizadas em tempo real. A tela de controle permite configurar conteúdo, sequências e temporizadores, enquanto o display público exibe mídia, textos, rankings e informações dinâmicas. Ideal para lojas, eventos, filas e painéis informativos.',
    features: [
      'Duas telas sincronizadas em tempo real',
      'Painel de controle com arrastar e soltar',
      'Exibição de imagens, vídeos e textos',
      'Temporizadores e sequências automáticas',
      'Rankings e placares ao vivo',
      'Modo offline com cache local',
      'Configuração remota via any device',
      'Múltiplos layouts pré-configurados',
    ],
    techs: ['React', 'WebSocket', 'Node.js', 'Firebase', 'Canvas API'],
    image: '/display-controlado.png',
  },
  {
    id: 4,
    title: 'Estúdio de Fotos com IA',
    tag: 'App',
    tagClass: 'app',
    shortDesc: 'Sistema de edição automática de fotos com molduras temáticas e processamento por Inteligência Artificial.',
    fullDesc: 'Aplicativo de edição de fotos que combina molduras temáticas profissionais com recursos de inteligência artificial. O usuário escolhe entre dezenas de templates para festas, formaturas, natal e eventos, ajusta a foto automaticamente com IA e pode compartilhar ou imprimir diretamente. Perfeito para eventos, festas e pontos de venda.',
    features: [
      'Galeria de molduras temáticas (50+)',
      'Ajuste automático de rosto com IA',
      'Remoção de fundo inteligente',
      'Filtros e efeitos profissionais',
      'Compartilhamento direto em redes sociais',
      'Impressão via impressora térmica',
      'Modo totem para eventos',
      'Personalização de marca para B2B',
    ],
    techs: ['Flutter', 'TensorFlow Lite', 'Canvas', 'Firebase', 'Python'],
    image: '/studio-de-fotos-ia.png',
  },
  {
    id: 5,
    title: 'Aplicativo Educativo - Aquarela Kids',
    tag: 'App',
    tagClass: 'app',
    shortDesc: 'Transforme o Aprendizado em uma Aventura Interativa em 3D',
    fullDesc: 'Aplicativo educativo de colorir para crianças, com interface intuitiva e segura. Conta com dezenas de desenhos temáticos (animais, natureza, veículos, etc.), paleta de cores ampla, opção de preenchimento e pincel. Publicado na PlayStore com controle parental e totalmente offline.',
    features: [
      'Dezenas de desenhos temáticos',
      'Paleta de cores ampla e personalizada',
      'Ferramentas: pincel, balde, borracha',
      'Salvar e compartilhar criações',
      'Modo offline completo',
      'Interface segura para crianças',
      'Sem anúncios intrusivos',
      'Publicado na Google PlayStore',
    ],
    techs: ['Flutter', 'Canvas API', 'Firebase', 'PlayStore'],
    image: '/aquarela-kids.png',
  },
  {
    id: 6,
    title: 'Quiz Interativo para Eventos',
    tag: 'Game',
    tagClass: 'game',
    shortDesc: 'Ferramenta personalizada para engajar o público e captar contatos em feiras, eventos e ações comerciais.',
    fullDesc: 'Plataforma de quiz interativo totalmente personalizável pelo cliente. Permite criar perguntas, definir respostas, ajustar tempo, personalizar cores e logotipos da marca. Ideal para promoções em eventos, stands, feiras e lojas. Com ranking em tempo real e exportação de dados dos participantes.',
    features: [
      'Editor de perguntas e respostas',
      'Personalização total de marca e cores',
      'Temporizador configurável por pergunta',
      'Ranking em tempo real no display',
      'Exportação de dados dos participantes',
      'Modo competição multiplayer',
      'Tela de exibição separada (display)',
      'Relatórios de engajamento',
    ],
    techs: ['React', 'Node.js', 'WebSocket', 'Firebase', 'Canvas'],
    image: '/quiz-comercial.png',
  },
  {
    id: 7,
    title: 'Roleta de Prêmios Customizada',
    tag: 'Game',
    tagClass: 'game',
    shortDesc: 'Atraia Múltiplos Visitantes e Recompense o seu Público com Prêmios',
    fullDesc: 'Roleta digital profissional para promoções e eventos. Permite configurar prêmios com estoque controlado, definir probabilidades e ativar modo de resultado controlado para garantir distribuição planejada. Visual impactante com animações suaves e som. Display em tempo real dos prêmios disponíveis.',
    features: [
      'Configuração de prêmios e probabilidades',
      'Controle de estoque por prêmio',
      'Modo resultado controlado (planejado)',
      'Animação suave com som e efeitos',
      'Display de prêmios disponíveis',
      'Histórico de sorteios em tempo real',
      'Personalização visual completa',
      'Exportação de resultados',
    ],
    techs: ['React', 'Canvas API', 'Node.js', 'Firebase', 'GSAP'],
    image: '/roleta-de-premios.png',
  },
  {
    id: 8,
    title: 'Jogo Controlado por Gestos (Space Defenders)',
    tag: 'Game',
    tagClass: 'game',
    shortDesc: 'Experiência inovadora onde o jogador controla uma nave apenas com movimentos das mãos, via câmera, sem necessidade de toque.',
    fullDesc: 'Jogo de nave espacial arcade com controle por gestos da mão usando visão computacional. O jogador defende a galáxia de asteróides e inimigos usando movimentos naturais captados pela câmera. Com ranking global, power-ups, chefes de fase e gráficos neon vibrantes. Perfeito para stands interativos.',
    features: [
      'Controle por gestos (visão computacional)',
      'Efeitos visuais neon com particulas',
      'Sistema de power-ups e upgrades',
      'Chefes de fase desafiadores',
      'Ranking global com leaderboard',
      'Ondas infinitas com dificuldade progressiva',
      'Trilha sonora e efeitos de som',
      'Modo stand para eventos',
    ],
    techs: ['Unity', 'C#', 'MediaPipe', 'Firebase', 'WebGL'],
    image: '/space-defenders.png',
  },
  {
    id: 9,
    title: 'Automação de Processos',
    tag: 'Sistema',
    tagClass: 'sistema',
    shortDesc: 'Softwares personalizados para automatizar tarefas repetitivas, preenchimento de planilhas e geração de relatórios inteligentes para sua equipe.',
    fullDesc: 'Imagine sua equipe livre das tarefas repetitivas que consomem horas de trabalho todo dia. Nossos sistemas de automação substituem processos manuais por fluxos inteligentes: preenchem planilhas automaticamente, consolidam dados de múltiplas fontes, geram relatórios profissionais em PDF e disparam notificações por e-mail ou WhatsApp sem nenhuma intervenção humana. O resultado? Menos erros, mais velocidade e colaboradores focados no que realmente importa para o crescimento do negócio.',
    features: [
      'Preenchimento automático de planilhas Excel/Google Sheets',
      'Geração de relatórios em PDF agendados (diário, semanal, mensal)',
      'Integração com ERP, CRM e sistemas legados via API',
      'Consolidação de dados de múltiplas fontes em um único painel',
      'Envio automático de relatórios por e-mail e WhatsApp',
      'Alertas e notificações configuráveis por evento ou horário',
      'Dashboard em tempo real com indicadores-chave (KPIs)',
      'Histórico de execuções com logs detalhados para auditoria',
    ],
    techs: ['Python', 'Node.js', 'Google Sheets API', 'PostgreSQL', 'n8n', 'AWS Lambda'],
    image: '/automacao.png',
  },
]

export default function Projects() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  useEffect(() => {
    if (!gridRef.current) return

    const sectionHeader = gridRef.current.closest('.section-container')?.querySelector('.section-header')
    if (sectionHeader) {
      gsap.set(sectionHeader, { opacity: 0, y: 40 })
      gsap.to(sectionHeader, {
        scrollTrigger: {
          trigger: sectionHeader,
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

    const cards = gridRef.current.querySelectorAll('.project-card')
    gsap.set(cards, { opacity: 0, y: 60 })
    gsap.to(cards, {
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.1,
      ease: 'power3.out',
    })
  }, [])

  // Tilt 3D para os cards dos projetos
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / centerY * -6
    const rotateY = (x - centerX) / centerX * 6

    card.style.transform = `translateY(-10px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <section className="section" id="projetos">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">Alguns de Nossos Projetos</h2>
          <p className="section-subtitle">
            Cada solução é única, construída sob medida para resolver
            desafios reais com <span className="highlight">tecnologia de ponta</span>.
          </p>
        </div>

        <div className="projects-grid" ref={gridRef}>
          {projects.map((project, i) => {
            const Icon = projectIcons[i]
            return (
              <div
                key={project.id}
                className="project-card"
                onClick={() => setSelectedProject(project)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="project-card-image-placeholder">
                  {project.image ? (
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`project-card-image ${[1, 2, 3, 4, 6, 8, 9].includes(project.id) ? 'zoomed' : ''}`} 
                    />
                  ) : (
                    <Icon size={56} strokeWidth={1.2} />
                  )}
                </div>
                <div className="project-card-body">
                  <span className={`project-card-tag ${project.tagClass}`}>
                    {project.tag}
                  </span>
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.shortDesc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  )
}
