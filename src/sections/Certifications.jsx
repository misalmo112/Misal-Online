import React from 'react'
import { motion } from 'framer-motion'

const badgeStyle = {
  padding: '1rem 1.5rem',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 8,
  color: 'var(--text-primary)',
  fontSize: 'var(--text-body)',
  textAlign: 'center',
}

export default function Certifications({ data }) {
  const certs = data?.certificationsList ?? []
  return (
    <section className="section" id="certifications" aria-labelledby="certifications-heading">
      <h2 id="certifications-heading" className="section-title">Certifications</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {certs.map((cert, i) => (
          <motion.div
            key={cert.name ?? i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.3 }}
            style={badgeStyle}
            className="cert-badge"
          >
            {cert.name}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
