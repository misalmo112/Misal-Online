import React from 'react'
import { motion } from 'framer-motion'

export default function Contact({ data }) {
  const meta = data?.meta ?? {}
  const links = data?.contact?.links ?? []
  return (
    <section className="section" id="contact" aria-labelledby="contact-heading">
      <h2 id="contact-heading" className="section-title">Contact</h2>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '2rem',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          background: 'var(--bg-card)',
          maxWidth: 560,
        }}
      >
        <p style={{ margin: '0 0 1rem', color: 'var(--accent-amber)', fontSize: 'var(--text-body)' }}>
          Secure channel established.
        </p>
        <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', fontSize: 'var(--text-body)' }}>
          {meta.name} · {meta.title}<br />
          {meta.location} · {meta.visa}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {links.map((link, i) => (
            <a
              key={link.href ?? i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '0.6rem 1.2rem',
                background: 'transparent',
                border: '2px solid var(--neon-cyan)',
                color: 'var(--neon-cyan)',
                borderRadius: 8,
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: 'var(--text-chip)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--neon-cyan)'
                e.currentTarget.style.color = 'var(--bg-deep)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ''
                e.currentTarget.style.color = ''
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
