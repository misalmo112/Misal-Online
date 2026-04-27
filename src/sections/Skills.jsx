import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function SkillBar({ name, level, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-30px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -12 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      style={{ marginBottom: '0.85rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem' }}>
        <span style={{ fontSize: 'var(--text-chip)', color: 'var(--text-primary)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>{level}%</span>
      </div>
      <div
        style={{
          height: '3px',
          background: 'var(--border-subtle)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 0.7, delay: index * 0.06 + 0.2, ease: 'easeOut' }}
          style={{
            height: '100%',
            background: level >= 85
              ? 'var(--neon-cyan)'
              : level >= 75
              ? 'rgba(0,245,255,0.65)'
              : 'rgba(0,245,255,0.4)',
            borderRadius: 2,
            boxShadow: level >= 85 ? '0 0 6px rgba(0,245,255,0.5)' : 'none',
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills({ data }) {
  const skills = data?.skills ?? []
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="section-title">Skills</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '2.5rem',
        }}
      >
        {skills.map((group, i) => (
          <motion.div
            key={group.category ?? i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <h3
              style={{
                margin: '0 0 1.25rem',
                fontSize: 'var(--text-chip)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--neon-cyan)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              {group.category}
            </h3>
            {group.items?.map((item, j) => {
              const name = typeof item === 'string' ? item : item.name
              const level = typeof item === 'object' ? item.level : 70
              return <SkillBar key={j} name={name} level={level} index={j} />
            })}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
