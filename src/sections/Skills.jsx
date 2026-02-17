import React from 'react'
import { motion } from 'framer-motion'

export default function Skills({ data }) {
  const skills = data?.skills ?? []
  return (
    <section className="section" id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading" className="section-title">Skills</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {skills.map((group, i) => (
          <motion.div
            key={group.category ?? i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3 }}
          >
            <h3 style={{ margin: '0 0 0.75rem', fontSize: 'var(--text-lead)', color: 'var(--neon-cyan)' }}>
              {group.category}
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
              {group.items?.map((item, j) => (
                <span
                  key={j}
                  style={{
                    padding: '0.5rem 0.9rem',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 6,
                    fontSize: 'var(--text-chip)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
