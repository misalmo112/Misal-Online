import React from 'react'
import { motion } from 'framer-motion'

export default function Certifications({ data }) {
  const certs = data?.certificationsList ?? []
  return (
    <section className="section" id="certifications" aria-labelledby="certifications-heading">
      <h2 id="certifications-heading" className="section-title">Certifications</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {certs.map((cert, i) => (
          <motion.div
            key={cert.name ?? i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            style={{
              padding: '1.1rem 1.4rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              color: 'var(--text-primary)',
              fontSize: 'var(--text-body)',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-cyan)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.boxShadow = '' }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: 'var(--neon-cyan)',
                flexShrink: 0,
                boxShadow: '0 0 6px rgba(0,245,255,0.7)',
              }}
              aria-hidden="true"
            />
            {cert.name}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
