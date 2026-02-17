import React from 'react'
import { motion } from 'framer-motion'

/**
 * SVG link between two nodes. Optional "packet" dash animation on hover when reducedMotion is false.
 */
export default function Link({ from, to, isHovered, reducedMotion, linkId }) {
  const x1 = from.x
  const y1 = from.y
  const x2 = to.x
  const y2 = to.y

  return (
    <g aria-hidden="true">
      {/* Base line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="var(--neon-cyan-dim)"
        strokeWidth={isHovered ? 0.4 : 0.2}
        strokeOpacity={isHovered ? 0.9 : 0.5}
        className="topology-link"
      />
      {/* Animated "packet" path when hovered and motion allowed */}
      {!reducedMotion && isHovered && (
        <motion.path
          d={`M ${x1} ${y1} L ${x2} ${y2}`}
          stroke="var(--neon-cyan)"
          strokeWidth={0.25}
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ filter: 'drop-shadow(0 0 4px var(--neon-cyan))' }}
        />
      )}
    </g>
  )
}
