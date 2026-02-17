import React, { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
export default function InspectorPanel({ isOpen, nodeId, onClose, data }) {
  const panelRef = useRef(null)
  const content = data?.nodeContent?.[nodeId]
  const isSubnetList = content?.isSubnetList
  const projectSubnets = data?.projectSubnets ?? []
  const [selectedSubnet, setSelectedSubnet] = React.useState(null)

  useEffect(() => {
    if (!isOpen) setSelectedSubnet(null)
  }, [isOpen, nodeId])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusables[0]
    if (first) first.focus()
  }, [isOpen, nodeId, selectedSubnet])

  const displayContent = selectedSubnet
    ? data?.nodeContent?.[selectedSubnet.contentKey]
    : content

  if (!data) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="inspector-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
              zIndex: 100,
              pointerEvents: 'auto',
            }}
            aria-hidden="true"
          />
          <motion.aside
            ref={panelRef}
            className="inspector-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: 'min(400px, 100vw - 2rem)',
              maxWidth: '100%',
              height: '100vh',
              background: 'var(--bg-panel)',
              borderLeft: '1px solid var(--border-subtle)',
              zIndex: 101,
              overflowY: 'auto',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
            }}
            role="dialog"
            aria-label="Node inspector"
          >
            <div style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h2 style={{ margin: 0, fontSize: 'var(--text-lead)', color: 'var(--neon-cyan)' }}>Inspector</h2>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close inspector"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)',
                    padding: '0.4rem 0.85rem',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 'var(--text-chip)',
                  }}
                >
                  Close
                </button>
              </div>

              {isSubnetList && !selectedSubnet && (
                <div className="inspector-subnet-list">
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body)', marginBottom: '1.25rem' }}>
                    {content?.summary}
                  </p>
                  {projectSubnets.map((sub) => (
                    <button
                      key={sub.subnet}
                      type="button"
                      onClick={() => setSelectedSubnet(sub)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.9rem 1.15rem',
                        marginBottom: '0.6rem',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 6,
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-body)',
                      }}
                    >
                      <span style={{ color: 'var(--neon-cyan)' }}>Subnet {sub.subnet}</span>
                      <span style={{ marginLeft: '0.5rem' }}>— {sub.name}</span>
                    </button>
                  ))}
                </div>
              )}

              {(selectedSubnet || !isSubnetList) && displayContent && (
                <>
                  {isSubnetList && selectedSubnet && (
                    <button
                      type="button"
                      onClick={() => setSelectedSubnet(null)}
                      style={{
                        marginBottom: '1.25rem',
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: 'var(--text-chip)',
                      }}
                    >
                      ← Back to subnets
                    </button>
                  )}
                  <h3 style={{ margin: '0 0 0.5rem', color: 'var(--text-primary)', fontSize: 'var(--text-card-title)' }}>
                    {displayContent.title}
                  </h3>
                  {displayContent.subnet && (
                    <p style={{ margin: '0 0 0.5rem', color: 'var(--neon-cyan)', fontSize: 'var(--text-chip)' }}>
                      {displayContent.subnet}
                    </p>
                  )}
                  <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-body)', marginBottom: '1.25rem', lineHeight: 'var(--line-height-body)' }}>
                    {displayContent.summary}
                  </p>
                  {displayContent.jobs && (
                    <div style={{ marginBottom: '1.25rem' }}>
                      {displayContent.jobs.map((job, i) => (
                        <div key={i} style={{ marginBottom: '1.5rem' }}>
                          <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--text-primary)', fontSize: 'var(--text-body)' }}>
                            {job.company}, {job.location}
                          </p>
                          <p style={{ margin: '0 0 0.5rem', fontSize: 'var(--text-chip)', color: 'var(--neon-cyan)' }}>
                            {job.role} · {job.period}
                          </p>
                          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)' }}>
                            {job.bullets.map((b, j) => (
                              <li key={j} style={{ marginBottom: '0.35rem' }}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  {displayContent.bullets && displayContent.bullets.length > 0 && !displayContent.jobs && (
                    <ul style={{ margin: '0 0 1.25rem', paddingLeft: '1.5rem', color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)' }}>
                      {displayContent.bullets.map((b, i) => (
                        <li key={i} style={{ marginBottom: '0.35rem' }}>{b}</li>
                      ))}
                    </ul>
                  )}
                  {displayContent.tags && displayContent.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                      {displayContent.tags.map((tag, i) => (
                        <span
                          key={i}
                          style={{
                            padding: '0.3rem 0.65rem',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 4,
                            fontSize: 'var(--text-chip)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  {displayContent.links && displayContent.links.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {displayContent.links.map((link, i) => (
                        <a
                          key={i}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '0.55rem 1.1rem',
                            background: 'var(--neon-cyan)',
                            color: 'var(--bg-deep)',
                            borderRadius: 6,
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: 'var(--text-chip)',
                          }}
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
