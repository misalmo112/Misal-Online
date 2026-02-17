import React from 'react'
import { motion } from 'framer-motion'

/**
 * Topology node: core (chassis + port LEDs + labels) or domain/cluster (circle + label).
 * Focusable, keyboard selectable, tooltip on hover.
 */
export default function Node({
  node,
  isSelected,
  isHovered,
  onSelect,
  onHoverStart,
  onHoverEnd,
  reducedMotion,
}) {
  const { id, type, label, position } = node
  const x = position.x
  const y = position.y
  const isCore = type === 'core'
  const isCluster = type === 'cluster'

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(id)
    }
  }

  const glowFilter = isSelected || isHovered ? 'url(#glow-strong)' : 'url(#glow-subtle)'

  if (isCore) {
    const w = 10
    const h = 6
    const cx = x
    const cy = y
    return (
      <g
        transform={`translate(${cx}, ${cy})`}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHoverStart(id)}
        onMouseLeave={onHoverEnd}
        onClick={() => onSelect(id)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-label={`Core router: ${label}. Click to inspect.`}
      >
        <motion.rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx={0.8}
          fill="var(--bg-navy)"
          stroke={isSelected || isHovered ? 'var(--accent-magenta)' : 'var(--neon-cyan)'}
          strokeWidth={isSelected || isHovered ? 0.35 : 0.2}
          filter={glowFilter}
          animate={!reducedMotion ? { x: [0, 0.1, -0.1, 0], y: [0, -0.05, 0.05, 0] } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Port LEDs */}
        {[-1.5, -0.5, 0.5, 1.5].map((dx, i) => (
          <circle
            key={i}
            cx={dx}
            cy={-h / 2 - 0.3}
            r={0.2}
            fill={i < 3 ? 'var(--neon-cyan)' : 'var(--accent-amber)'}
            opacity={0.9}
          />
        ))}
        <text y={-h / 2 - 1.2} textAnchor="middle" fill="var(--neon-cyan)" fontSize={0.9} fontWeight="700">MISAL.K</text>
        <text y={h / 2 + 1.4} textAnchor="middle" fill="var(--text-secondary)" fontSize={0.55}>EDGE-CORE-01</text>
        <text y={h / 2 + 2.1} textAnchor="middle" fill="var(--accent-amber)" fontSize={0.5}>STATUS: OPERATIONAL</text>
      </g>
    )
  }

  const r = isCluster ? 1.8 : 2.2
  return (
    <g
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => onHoverStart(id)}
      onMouseLeave={onHoverEnd}
      onClick={() => onSelect(id)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${label}. Click to inspect.`}
      title={label}
    >
      {!isCore && (
        <>
          <motion.circle
            r={r}
            fill="var(--bg-navy)"
            stroke={isSelected || isHovered ? 'var(--accent-magenta)' : 'var(--neon-cyan)'}
            strokeWidth={isSelected || isHovered ? 0.35 : 0.2}
            filter={glowFilter}
            animate={!reducedMotion ? { x: [0, 0.08, -0.08, 0], y: [0, -0.06, 0.06, 0] } : {}}
            transition={{ duration: 3 + (x % 3) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <text
            y={r + 1.4}
            textAnchor="middle"
            fill="var(--text-secondary)"
            fontSize={isCluster ? 0.55 : 0.65}
            className="node-label"
          >
            {isCluster ? label : label.length > 18 ? label.slice(0, 16) + '…' : label}
          </text>
        </>
      )}
    </g>
  )
}
