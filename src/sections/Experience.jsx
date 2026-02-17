import React from 'react'
import { motion } from 'framer-motion'

const logEntryStyle = {
  borderLeft: '3px solid var(--neon-cyan)',
  paddingLeft: '1.25rem',
  marginBottom: '2rem',
  position: 'relative',
}

export default function Experience({ data }) {
  const experience = data?.experience ?? []
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section-title">Professional Experience</h2>
      <div style={{ maxWidth: 640 }}>
        {experience.map((entry, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.3 }}
            style={logEntryStyle}
          >
            <p style={{ margin: '0 0 0.25rem', fontSize: 'var(--text-chip)', color: 'var(--accent-amber)' }}>
              [{entry.period}]
            </p>
            <h3 style={{ margin: '0 0 0.25rem', fontSize: 'var(--text-card-title)', color: 'var(--text-primary)' }}>
              {entry.role}
            </h3>
            <p style={{ margin: '0 0 0.75rem', fontSize: 'var(--text-body)', color: 'var(--text-secondary)' }}>
              {entry.company}, {entry.location}
            </p>
            {entry.bullets?.length > 0 && (
              <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)' }}>
                {entry.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: '0.25rem' }}>{b}</li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
