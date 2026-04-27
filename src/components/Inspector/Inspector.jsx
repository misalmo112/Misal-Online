import React from 'react'
import { NODE_INFO } from '../../data/portfolioData.js'

const styles = `
@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
`

export default function Inspector({ nodeId, onClose }) {
  if (!nodeId) return null
  const info = NODE_INFO[nodeId]
  if (!info) return null

  return (
    <>
      <style>{styles}</style>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)' }}
      />
      {/* Panel — always dark */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(420px, 100vw)',
        background: '#080808', borderLeft: '1px solid rgba(255,255,255,0.08)',
        zIndex: 101, overflowY: 'auto', padding: '2rem',
        animation: 'slideInRight .25s ease',
        fontFamily: 'Space Grotesk, sans-serif', color: '#f0f0f0'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
            // INSPECTOR
          </span>
          <button
            onClick={onClose}
            aria-label="Close inspector"
            style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)', borderRadius: 4, padding: '4px 9px', cursor: 'pointer', fontSize: '0.85rem', lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Title */}
        <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: '#f0f0f0', marginBottom: '0.75rem', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
          {info.title}
        </h2>

        {/* Summary */}
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
          {info.summary}
        </p>

        {/* Bullets */}
        {info.bullets && info.bullets.length > 0 && (
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              DETAILS
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {info.bullets.map((b, i) => (
                <li key={i} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', padding: '0.45rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>→</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tags */}
        {info.tags && info.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: '1.75rem' }}>
            {info.tags.map((t, i) => (
              <span key={i} style={{ fontFamily: 'Space Mono, monospace', fontSize: '0.68rem', padding: '3px 9px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, color: 'rgba(255,255,255,0.4)' }}>
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Links */}
        {info.links && info.links.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {info.links.map((l, i) => (
              <a key={i} href={l.href} target="_blank" rel="noopener noreferrer"
                style={{ padding: '0.6rem 1.25rem', border: '1px solid rgba(255,255,255,0.15)', color: '#f0f0f0', borderRadius: 6, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                {l.label} ↗
              </a>
            ))}
          </div>
        )}
      </aside>
    </>
  )
}
