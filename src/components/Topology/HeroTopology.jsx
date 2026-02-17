import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TopologyCanvas from './TopologyCanvas.jsx'
import { useReducedMotion } from '../../hooks/useReducedMotion.js'
import { portfolioData } from '../../data/portfolioData.js'

const COLLAPSE_THRESHOLD = 80
const HERO_FULL_HEIGHT = '100vh'
const HERO_COLLAPSED_HEIGHT = '140px'

export default function HeroTopology({
  selectedNodeId,
  onSelectNode,
  hoveredNodeId,
  onHoverNode,
}) {
  const reducedMotion = useReducedMotion()
  const [collapsed, setCollapsed] = useState(false)
  const [simplified, setSimplified] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setCollapsed(window.scrollY > COLLAPSE_THRESHOLD)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const checkMobile = () => setSimplified(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nodes = portfolioData.topologyNodes
  const links = portfolioData.topologyLinks

  return (
    <motion.section
      className="hero-topology"
      style={{
        height: collapsed ? HERO_COLLAPSED_HEIGHT : HERO_FULL_HEIGHT,
        minHeight: collapsed ? HERO_COLLAPSED_HEIGHT : HERO_FULL_HEIGHT,
      }}
      initial={false}
      animate={{
        height: collapsed ? HERO_COLLAPSED_HEIGHT : HERO_FULL_HEIGHT,
        minHeight: collapsed ? HERO_COLLAPSED_HEIGHT : HERO_FULL_HEIGHT,
      }}
      transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: 'easeOut' }}
    >
      <motion.div
        className="hero-topology-inner"
        animate={{
          scale: collapsed ? 0.35 : 1,
          y: collapsed ? -20 : 0,
        }}
        transition={{ duration: reducedMotion ? 0.1 : 0.4, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: collapsed ? HERO_COLLAPSED_HEIGHT : '100%',
          display: 'flex',
          flexDirection: collapsed ? 'row' : 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          gap: collapsed ? 0 : '1.25rem',
        }}
      >
        <div
          className="topology-wrapper topology-wrapper--landscape"
          style={{
            width: collapsed ? '120px' : 'min(96vw, 1280px)',
            height: collapsed ? '120px' : 'min(62vw, 640px)',
            maxHeight: collapsed ? undefined : 'min(72vh, 640px)',
            transition: 'width 0.4s ease, height 0.4s ease',
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
            simplified={simplified}
          />
        </div>
        {!collapsed && (
          <motion.h1
            className="hero-welcome"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{
              margin: 0,
              color: 'var(--neon-cyan)',
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 600,
              textAlign: 'center',
              width: '100%',
            }}
          >
            Welcome to Misal&apos;s Network Operations Center
          </motion.h1>
        )}
        {!collapsed && (
          <motion.p
            className="hero-scroll-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            style={{
              margin: 0,
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-body-lg)',
            }}
          >
            Scroll to inspect modules ↓
          </motion.p>
        )}
      </motion.div>
    </motion.section>
  )
}
