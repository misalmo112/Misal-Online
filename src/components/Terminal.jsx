import React, { useState, useEffect, useRef } from 'react'

const LINES = [
  '> MISAL.K // SYSTEM DIAGNOSTIC',
  '> initializing connection...',
  '> host: edge-core-01.abu-dhabi',
  '> status: OPERATIONAL',
  '> uptime: 99.97%',
  '> certs: CCNA · ITIL4 · AI-Practitioner',
  '> ccie: in progress...',
  '> msc-cloud: enrolled',
  '> golden-visa: ACTIVE',
  '> note: nice — you found the easter egg.',
  '> ^C to exit',
]

export default function Terminal({ onClose }) {
  const [visible, setVisible] = useState([])
  const [ready, setReady] = useState(false)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    // Small delay so the opening click doesn't immediately fire onClose via backdrop
    const openDelay = setTimeout(() => { if (mounted.current) setReady(true) }, 200)
    let i = 0
    const interval = setInterval(() => {
      if (!mounted.current) { clearInterval(interval); return }
      if (i < LINES.length) {
        setVisible(v => [...v, LINES[i]])
        i++
      } else {
        clearInterval(interval)
      }
    }, 110)
    return () => { mounted.current = false; clearInterval(interval); clearTimeout(openDelay) }
  }, [])

  return (
    <>
      {/* Backdrop — only interactive after opening click has cleared */}
      <div
        onClick={ready ? onClose : undefined}
        style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.55)' }}
      />
      {/* Window */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(600px, calc(100vw - 2rem))',
        background: '#050505',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        overflow: 'hidden',
        zIndex: 201,
        boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
        fontFamily: 'Space Mono, monospace',
      }}>
        {/* Title bar */}
        <div style={{ padding: '0.7rem 1rem', background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: 7 }}>
            <button onClick={onClose} aria-label="Close terminal"
              style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57', border: 'none', cursor: 'pointer', padding: 0 }}/>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}/>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840', display: 'inline-block' }}/>
          </div>
          <span style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>MISAL.K — bash</span>
          <span style={{ width: 12 }}/>
        </div>

        {/* Output */}
        <div style={{ padding: '1.25rem 1.5rem 1.75rem', minHeight: 200 }}>
          {visible.map((line, i) => (
            <div key={i} style={{ fontSize: '0.82rem', color: line.startsWith('> note') ? 'rgba(255,255,255,0.9)' : line.includes('OPERATIONAL') || line.includes('ACTIVE') ? '#28c840' : 'rgba(255,255,255,0.6)', lineHeight: 1.9 }}>
              {line}
            </div>
          ))}
          {visible.length < LINES.length && (
            <span style={{ display: 'inline-block', width: 8, height: 14, background: 'rgba(255,255,255,0.7)', animation: 'none', verticalAlign: 'middle' }}>▋</span>
          )}
        </div>
      </div>
    </>
  )
}
