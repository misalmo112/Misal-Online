import React from 'react'
import { motion } from 'framer-motion'

const cardStyle = {
  padding: '1.25rem 1.5rem',
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '0.6rem',
}

export default function FieldOps({ data }) {
  const items = data?.fieldOps ?? []
  return (
    <section className="section" id="field-ops" aria-labelledby="field-ops-heading">
      <h2 id="field-ops-heading" className="section-title">Field Ops</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 480 }}>
        {items.map((item, i) => (
          <motion.div
            key={item.name ?? i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.3 }}
            style={cardStyle}
          >
            <span style={{ color: 'var(--text-primary)', fontSize: 'var(--text-body)' }}>{item.name}</span>
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '0.35rem 0.75rem',
                  background: 'var(--neon-cyan)',
                  color: 'var(--bg-deep)',
                  borderRadius: 6,
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: 'var(--text-chip)',
                }}
              >
                {item.linkLabel ?? 'Link'}
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
