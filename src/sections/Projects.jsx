import React from 'react'
import { motion } from 'framer-motion'

const cardStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border-subtle)',
  borderRadius: 8,
  padding: '1.75rem',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
}

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
            transition={{ duration: 0.3 }}
            style={cardStyle}
            className="project-card"
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--neon-cyan)'
              e.currentTarget.style.boxShadow = 'var(--glow-cyan)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = ''
              e.currentTarget.style.boxShadow = ''
            }}
          >
            <h3 style={{ margin: '0 0 0.5rem', fontSize: 'var(--text-card-title)', color: 'var(--text-primary)' }}>
              {project.name}
            </h3>
            <p style={{ margin: 0, fontSize: 'var(--text-body)', color: 'var(--text-secondary)', lineHeight: 'var(--line-height-body)' }}>
              {project.description}
            </p>
            {project.tags?.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.25rem' }}>
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    style={{
                      padding: '0.3rem 0.6rem',
                      background: 'rgba(0,245,255,0.1)',
                      borderRadius: 4,
                      fontSize: 'var(--text-chip)',
                      color: 'var(--neon-cyan)',
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
