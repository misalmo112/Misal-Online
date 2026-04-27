import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopologyCanvas from './TopologyCanvas.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { portfolioData } from '../../data/portfolioData.js'

const COLLAPSE_THRESHOLD = 80

export default function HeroTopology({
  selectedNodeId,
  onSelectNode,
  hoveredNodeId,
  onHoverNode,
}) {
  const reducedMotion = useReducedMotion()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > COLLAPSE_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 800)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const nodes = portfolioData.topologyNodes
  const links = portfolioData.topologyLinks
  const { name, title, location, visa } = portfolioData.meta

  if (collapsed) {
    return (
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border-subtle)',
          background: 'var(--bg-panel)',
        }}
        aria-hidden="true"
      />
    )
  }

  return (
    <section
      className="hero-topology"
      style={{
        minHeight: 'calc(100vh - 52px)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
      }}
      aria-label="Hero"
    >
      {/* Left: Identity */}
      <motion.div
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.6, ease: 'easeOut' }}
        style={{
          flex: isMobile ? 'none' : '0 0 42%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: isMobile ? '3.5rem 1.75rem 2rem' : '4rem 3rem 4rem 2.5rem',
          borderRight: isMobile ? 'none' : '1px solid var(--border-subtle)',
          borderBottom: isMobile ? '1px solid var(--border-subtle)' : 'none',
        }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          style={{
            margin: '0 0 0.6rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-chip)',
            color: 'var(--neon-cyan)',
            letterSpacing: '0.12em',
          }}
        >
          EDGE-CORE-01 // OPERATIONAL
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{
            margin: '0 0 0.5rem',
            fontSize: isMobile ? 'clamp(2rem, 8vw, 3rem)' : 'clamp(2.25rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          {name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.4 }}
          style={{
            margin: '0 0 0.4rem',
            fontSize: 'var(--text-body-lg)',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}
        >
          {title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.4 }}
          style={{
            margin: '0 0 2rem',
            fontSize: 'var(--text-chip)',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {location} · {visa}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.4 }}
          style={{
            margin: '0 0 2.25rem',
            fontSize: 'var(--text-body)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: 380,
          }}
        >
          Network engineer, SaaS builder, and MSc cloud computing student. I design infrastructure that doesn't go down and software that does what it promises.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              background: 'var(--text-primary)',
              color: 'var(--bg-deep)',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 'var(--text-chip)',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            View Work
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '0.6rem 1.4rem',
              background: 'transparent',
              color: 'var(--text-primary)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 'var(--text-chip)',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--text-primary)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = ''}
          >
            Get in Touch
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          style={{
            marginTop: 'auto',
            paddingTop: '2.5rem',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          ↓ scroll to inspect modules
        </motion.p>
      </motion.div>

      {/* Right: Topology */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: reducedMotion ? 0.1 : 0.7 }}
        style={{
          flex: 1,
          position: 'relative',
          overflow: 'hidden',
          minHeight: isMobile ? '320px' : undefined,
          background: '#080808',
        }}
      >
        <TopologyCanvas
          nodes={nodes}
          links={links}
          selectedId={selectedNodeId}
          hoveredId={hoveredNodeId}
          onSelectNode={onSelectNode}
          onHoverNode={onHoverNode}
          reducedMotion={reducedMotion}
          simplified={isMobile}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '1rem',
            right: '1rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'rgba(0,245,255,0.35)',
            pointerEvents: 'none',
          }}
        >
          click any node to inspect
        </div>
      </motion.div>
    </section>
  )
}
