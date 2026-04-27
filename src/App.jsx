import React, { useState, useEffect, useRef, Suspense, lazy } from 'react'
import HeroTopology from './components/Topology/HeroTopology.jsx'
import InspectorPanel from './components/Inspector/InspectorPanel.jsx'
import { portfolioData } from './data/portfolioData.js'

const Projects = lazy(() => import('./sections/Projects.jsx'))
const Skills = lazy(() => import('./sections/Skills.jsx'))
const Experience = lazy(() => import('./sections/Experience.jsx'))
const Certifications = lazy(() => import('./sections/Certifications.jsx'))
const FieldOps = lazy(() => import('./sections/FieldOps.jsx'))
const Achievements = lazy(() => import('./sections/Achievements.jsx'))
const Contact = lazy(() => import('./sections/Contact.jsx'))

const SectionFallback = () => <div className="section" style={{ minHeight: 120 }} aria-hidden="true" />

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [hoveredNodeId, setHoveredNodeId] = useState(null)
  const [theme, setTheme] = useState('dark')
  const [easterEggOpen, setEasterEggOpen] = useState(false)
  const logoClickCount = useRef(0)
  const logoClickTimer = useRef(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const handleLogoClick = () => {
    logoClickCount.current += 1
    clearTimeout(logoClickTimer.current)
    if (logoClickCount.current >= 5) {
      logoClickCount.current = 0
      setEasterEggOpen(true)
    } else {
      logoClickTimer.current = setTimeout(() => { logoClickCount.current = 0 }, 1200)
    }
  }

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <a href="#projects" className="skip-link">Skip to main content</a>
      <div className="app-grid-bg" aria-hidden="true" />
      <div className="scanline-sweep" aria-hidden="true" />

      {/* Navbar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.75rem',
          height: '52px',
          background: 'var(--bg-panel)',
          borderBottom: '1px solid var(--border-subtle)',
          backdropFilter: 'blur(12px)',
        }}
        aria-label="Main navigation"
      >
        <button
          type="button"
          onClick={handleLogoClick}
          aria-label="Home — click 5 times for a surprise"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.95rem',
            fontWeight: 700,
            color: 'var(--neon-cyan)',
            letterSpacing: '0.08em',
            padding: 0,
          }}
        >
          MISAL.K
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div
            style={{ display: 'flex', gap: '1.25rem' }}
            role="list"
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                role="listitem"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: 'var(--text-chip)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = ''}
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            style={{
              background: 'none',
              border: '1px solid var(--border-subtle)',
              borderRadius: 6,
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              padding: '0.3rem 0.55rem',
              lineHeight: 1,
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.color = 'var(--neon-cyan)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
          >
            {theme === 'dark' ? '◑' : '◐'}
          </button>
        </div>
      </nav>

      <main id="main" style={{ position: 'relative', zIndex: 2, paddingTop: '52px' }}>
        <HeroTopology
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          hoveredNodeId={hoveredNodeId}
          onHoverNode={setHoveredNodeId}
        />

        <Suspense fallback={<SectionFallback />}>
          <Projects data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FieldOps data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Achievements data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact data={portfolioData} />
        </Suspense>

        <footer
          style={{
            position: 'relative',
            zIndex: 2,
            borderTop: '1px solid var(--border-subtle)',
            padding: '2rem 1.75rem',
            textAlign: 'center',
            fontSize: 'var(--text-chip)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {portfolioData.meta.name} · {portfolioData.meta.location} · {portfolioData.meta.visa}
        </footer>
      </main>

      <InspectorPanel
        isOpen={!!selectedNodeId}
        nodeId={selectedNodeId}
        onClose={() => setSelectedNodeId(null)}
        data={portfolioData}
      />

      {/* Easter egg terminal */}
      {easterEggOpen && (
        <div
          role="dialog"
          aria-label="Secret terminal"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.85)',
          }}
          onClick={() => setEasterEggOpen(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: 'min(560px, 92vw)',
              background: '#080808',
              border: '1px solid var(--neon-cyan)',
              borderRadius: 8,
              boxShadow: '0 0 40px rgba(0,245,255,0.25)',
              padding: '1.75rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--neon-cyan)',
            }}
          >
            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>EDGE-CORE-01 // SECURE SHELL</span>
              <button
                type="button"
                onClick={() => setEasterEggOpen(false)}
                aria-label="Close terminal"
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '1rem' }}
              >
                ×
              </button>
            </div>
            <div style={{ color: 'var(--text-secondary)', lineHeight: 1.9 }}>
              <div><span style={{ color: 'var(--neon-cyan)' }}>$</span> whoami</div>
              <div style={{ paddingLeft: '1rem', color: 'var(--text-primary)' }}>Misal Muhammed Kunhi</div>
              <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--neon-cyan)' }}>$</span> cat status.txt</div>
              <div style={{ paddingLeft: '1rem', color: 'var(--text-primary)' }}>Network Engineer · SaaS Builder · MSc Cloud Computing (in progress)</div>
              <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--neon-cyan)' }}>$</span> uptime</div>
              <div style={{ paddingLeft: '1rem', color: 'var(--text-primary)' }}>Abu Dhabi, UAE · Golden Visa Holder · Always building</div>
              <div style={{ marginTop: '0.5rem' }}><span style={{ color: 'var(--neon-cyan)' }}>$</span> ping future</div>
              <div style={{ paddingLeft: '1rem', color: 'var(--accent-amber)' }}>PONG — response time: enthusiastic</div>
              <div style={{ marginTop: '0.75rem', color: 'var(--text-muted)' }}>[Press ESC or click outside to exit]</div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
