import React from 'react'
import { motion } from 'framer-motion'

export default function Experience({ data }) {
  const experience = data?.experience ?? []
  return (
    <section className="section" id="experience" aria-labelledby="experience-heading">
      <h2 id="experience-heading" className="section-title">Experience</h2>
      <div style={{ position: 'relative', maxWidth: 700 }}>
        {/* Vertical timeline line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, var(--neon-cyan), rgba(0,245,255,0.1))',
          }}
          aria-hidden="true"
        />
        {experience.map((entry, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            style={{
              paddingLeft: '2rem',
              paddingBottom: i < experience.length - 1 ? '2.75rem' : 0,
              position: 'relative',
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: 'absolute',
                left: '-4px',
                top: '0.45rem',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: i === 0 ? 'var(--neon-cyan)' : 'var(--bg-navy)',
                border: `2px solid ${i === 0 ? 'var(--neon-cyan)' : 'rgba(0,245,255,0.4)'}`,
                boxShadow: i === 0 ? '0 0 8px rgba(0,245,255,0.6)' : 'none',
              }}
              aria-hidden="true"
            />
            <p
              style={{
                margin: '0 0 0.3rem',
                fontSize: 'var(--text-chip)',
                color: 'var(--accent-amber)',
                fontFamily: 'var(--font-mono)',
                letterSpacing: '0.04em',
              }}
            >
              {entry.period}
            </p>
            <h3
              style={{
                margin: '0 0 0.2rem',
                fontSize: 'var(--text-card-title)',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {entry.role}
            </h3>
            <p
              style={{
                margin: '0 0 0.9rem',
                fontSize: 'var(--text-chip)',
                color: 'var(--text-secondary)',
              }}
            >
              {entry.company} · {entry.location}
            </p>
            {entry.bullets?.length > 0 && (
              <ul
                style={{
                  margin: 0,
                  paddingLeft: '1.25rem',
                  color: 'var(--text-secondary)',
                  fontSize: 'var(--text-body)',
                  lineHeight: 'var(--line-height-body)',
                }}
              >
                {entry.bullets.map((b, j) => (
                  <li key={j} style={{ marginBottom: '0.3rem' }}>{b}</li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
