import React from 'react'
import { motion } from 'framer-motion'

export default function Projects({ data }) {
  const projects = data?.projects ?? []
  return (
    <section className="section" id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="section-title">Projects</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project, i) => (
          <motion.article
            key={project.id ?? i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 8,
              padding: '1.75rem',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--neon-cyan)'
              e.currentTarget.style.boxShadow = 'var(--glow-cyan)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <h3 style={{ margin: 0, fontSize: 'var(--text-card-title)', color: 'var(--text-primary)', lineHeight: 1.3 }}>
                {project.name}
              </h3>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  aria-label={`View ${project.name} on GitHub`}
                  style={{
                    flexShrink: 0,
                    marginLeft: '0.75rem',
                    padding: '0.3rem 0.65rem',
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 5,
                    color: 'var(--text-muted)',
                    textDecoration: 'none',
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    transition: 'border-color 0.2s, color 0.2s',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--neon-cyan)'; e.currentTarget.style.color = 'var(--neon-cyan)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
                >
                  ↗ GitHub
                </a>
              )}
            </div>
            <p style={{ margin: '0 0 auto', fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 'var(--line-height-body)' }}>
              {project.description}
            </p>
            {project.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '1.25rem' }}>
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      padding: '0.25rem 0.55rem',
                      background: 'rgba(0,245,255,0.07)',
                      borderRadius: 4,
                      fontSize: '0.78rem',
                      color: 'var(--neon-cyan)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
