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

  const glowFilter = isCore
    ? (isSelected || isHovered ? 'url(#glow-core)' : 'url(#glow-strong)')
    : (isSelected || isHovered ? 'url(#glow-strong)' : 'url(#glow-subtle)')

  const activeStroke = isSelected ? 'var(--accent-magenta)' : isHovered ? '#ffffff' : 'var(--neon-cyan)'

  if (isCore) {
    const w = 11
    const h = 6.5
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
        {/* Pulsing outer ring */}
        {!reducedMotion && (
          <motion.circle
            r={8}
            fill="none"
            stroke="var(--neon-cyan)"
            strokeWidth={0.15}
            animate={{ r: [7, 9.5, 7], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
        {/* Second pulse ring */}
        {!reducedMotion && (
          <motion.circle
            r={6}
            fill="none"
            stroke="var(--neon-cyan)"
            strokeWidth={0.1}
            animate={{ r: [5.5, 7.5, 5.5], opacity: [0.25, 0, 0.25] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />
        )}
        <motion.rect
          x={-w / 2}
          y={-h / 2}
          width={w}
          height={h}
          rx={0.8}
          fill="#0a0a14"
          stroke={activeStroke}
          strokeWidth={isSelected || isHovered ? 0.4 : 0.22}
          filter={glowFilter}
          animate={!reducedMotion ? { x: [0, 0.08, -0.08, 0], y: [0, -0.04, 0.04, 0] } : {}}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Port LEDs */}
        {[-1.8, -0.9, 0, 0.9, 1.8].map((dx, i) => (
          <motion.circle
            key={i}
            cx={dx}
            cy={-h / 2 + 0.6}
            r={0.18}
            fill={i === 4 ? 'var(--accent-amber)' : 'var(--neon-cyan)'}
            animate={!reducedMotion ? { opacity: [1, 0.4, 1] } : {}}
            transition={{ duration: 1.2 + i * 0.3, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
        {/* Chassis label */}
        <text y={-h / 2 - 1.4} textAnchor="middle" fill="var(--neon-cyan)" fontSize={1.0} fontWeight="700" fontFamily="monospace">MISAL.K</text>
        <text y={h / 2 + 1.5} textAnchor="middle" fill="var(--text-secondary)" fontSize={0.58} fontFamily="monospace">EDGE-CORE-01</text>
        <text y={h / 2 + 2.3} textAnchor="middle" fill="var(--accent-amber)" fontSize={0.52} fontFamily="monospace">STATUS: OPERATIONAL</text>
      </g>
    )
  }

  const r = isCluster ? 1.7 : 2.4
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
      {/* Selection ring */}
      {(isSelected || isHovered) && !reducedMotion && (
        <motion.circle
          r={r + 1.5}
          fill="none"
          stroke={isSelected ? 'var(--accent-magenta)' : 'var(--neon-cyan)'}
          strokeWidth={0.12}
          animate={{ r: [r + 1, r + 2.5, r + 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <motion.circle
        r={r}
        fill="#0a0a14"
        stroke={activeStroke}
        strokeWidth={isSelected || isHovered ? 0.38 : 0.2}
        filter={glowFilter}
        animate={!reducedMotion ? { x: [0, 0.06, -0.06, 0], y: [0, -0.05, 0.05, 0] } : {}}
        transition={{ duration: 3 + (x % 3) * 0.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <text
        y={r + 1.5}
        textAnchor="middle"
        fill={isSelected || isHovered ? 'var(--text-primary)' : 'var(--text-secondary)'}
        fontSize={isCluster ? 0.52 : 0.68}
        className="node-label"
        fontFamily="monospace"
      >
        {isCluster ? label : label.length > 18 ? label.slice(0, 16) + '…' : label}
      </text>
    </g>
  )
}
