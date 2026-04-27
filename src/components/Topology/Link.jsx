import React, { useId } from 'react'
import { motion } from 'framer-motion'

export default function Link({ from, to, isHovered, reducedMotion, linkId }) {
  const x1 = from.x
  const y1 = from.y
  const x2 = to.x
  const y2 = to.y
  const pathId = `link-path-${linkId}`
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)

  return (
    <g aria-hidden="true">
      <defs>
        <path id={pathId} d={`M ${x1} ${y1} L ${x2} ${y2}`} />
      </defs>
      {/* Base line */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={isHovered ? 'var(--neon-cyan)' : 'var(--neon-cyan-dim)'}
        strokeWidth={isHovered ? 0.35 : 0.18}
        strokeOpacity={isHovered ? 0.9 : 0.4}
      />
      {/* Continuous flowing packets */}
      {!reducedMotion && (
        <>
          <motion.circle
            r={0.28}
            fill="var(--neon-cyan)"
            style={{ filter: 'drop-shadow(0 0 1px rgba(0,245,255,0.9))' }}
            animate={{
              offsetDistance: ['0%', '100%'],
            }}
            transition={{
              duration: 2.4 + (len * 0.03),
              repeat: Infinity,
              ease: 'linear',
              delay: (x1 * 0.07 + y1 * 0.05) % 2,
            }}
            // eslint-disable-next-line react/no-unknown-property
            offsetPath={`path('M ${x1} ${y1} L ${x2} ${y2}')`}
            opacity={isHovered ? 1 : 0.5}
          />
          {isHovered && (
            <motion.circle
              r={0.2}
              fill="white"
              style={{ filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))' }}
              animate={{
                offsetDistance: ['0%', '100%'],
              }}
              transition={{
                duration: 1.6 + (len * 0.02),
                repeat: Infinity,
                ease: 'linear',
                delay: 0.8,
              }}
              // eslint-disable-next-line react/no-unknown-property
              offsetPath={`path('M ${x1} ${y1} L ${x2} ${y2}')`}
            />
          )}
        </>
      )}
    </g>
  )
}
