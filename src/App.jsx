import React, { useState, useEffect, useRef, useCallback, Suspense, lazy, Component } from 'react'
import { META, NODES, LINKS, PACKET_LINKS, NODE_INFO, EXPERIENCE, EDUCATION, PROJECTS, SKILLS, CERTS } from './data/portfolioData.js'

const Topology   = lazy(() => import('./components/Topology/Topology.jsx'))
const Inspector  = lazy(() => import('./components/Inspector/Inspector.jsx'))
const Terminal   = lazy(() => import('./components/Terminal.jsx'))

/* ─── ERROR BOUNDARY ────────────────────────────────────────────────────── */
class ErrBound extends Component {
  state = { err: false }
  static getDerivedStateFromError() { return { err: true } }
  render() { return this.state.err ? null : this.props.children }
}

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */
function useVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, vis]
}

function useWindowWidth() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  useEffect(() => {
    const h = () => setW(window.innerWidth)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return w
}

function useEasterEgg(n = 5) {
  const [open, setOpen] = useState(false)
  const count = useRef(0)
  const timer = useRef(null)
  const click = useCallback(() => {
    count.current++
    clearTimeout(timer.current)
    timer.current = setTimeout(() => { count.current = 0 }, 1400)
    if (count.current >= n) { count.current = 0; setOpen(true) }
  }, [n])
  return [open, () => setOpen(false), click]
}

/* ─── SECTION LABEL ─────────────────────────────────────────────────────── */
function Label({ text }) {
  return (
    <div style={{ fontFamily:'Space Mono,monospace', fontSize:'0.7rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'var(--fg2)', marginBottom:'3rem' }}>
      <span style={{ color:'var(--fg3)' }}>//</span> {text}
    </div>
  )
}

/* ─── SKILL BAR ─────────────────────────────────────────────────────────── */
function SkillBar({ name, level }) {
  const [ref, vis] = useVisible(0.3)
  return (
    <div ref={ref} style={{ marginBottom:'1rem' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
        <span style={{ fontSize:'0.87rem', color:'var(--fg)' }}>{name}</span>
        <span style={{ fontFamily:'Space Mono,monospace', fontSize:'0.72rem', color:'var(--fg2)' }}>{level}%</span>
      </div>
      <div style={{ height:1, background:'var(--border)', borderRadius:1, overflow:'hidden' }}>
        <div style={{ height:'100%', background:'var(--accent)', borderRadius:1, width: vis ? `${level}%` : '0%', transition:'width 1.1s cubic-bezier(.4,0,.2,1)' }}/>
      </div>
    </div>
  )
}

/* ─── TIMELINE ITEM ─────────────────────────────────────────────────────── */
function TimelineItem({ role, org, period, bullets, isLast }) {
  const [ref, vis] = useVisible()
  return (
    <div ref={ref} style={{ position:'relative', paddingLeft:'2rem', paddingBottom: isLast ? 0 : '3rem', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition:'opacity .5s ease,transform .5s ease' }}>
      {!isLast && <div style={{ position:'absolute', left:4, top:12, bottom:0, width:1, background:'var(--border)' }}/>}
      <div style={{ position:'absolute', left:0, top:6, width:9, height:9, borderRadius:'50%', background:'var(--accent)', border:'2px solid var(--bg)' }}/>
      <div style={{ fontFamily:'Space Mono,monospace', fontSize:'0.7rem', color:'var(--fg2)', marginBottom:5, letterSpacing:'0.06em' }}>{period}</div>
      <h3 style={{ color:'var(--fg)', fontWeight:600, margin:'0 0 .2rem', fontSize:'1rem' }}>{role}</h3>
      <div style={{ color:'var(--fg2)', fontSize:'0.83rem', marginBottom:'0.75rem' }}>{org}</div>
      {bullets && (
        <ul style={{ paddingLeft:'1.1rem', color:'var(--fg2)', fontSize:'0.85rem', lineHeight:1.75, margin:0 }}>
          {bullets.map((b, i) => <li key={i} style={{ marginBottom:2 }}>{b}</li>)}
        </ul>
      )}
    </div>
  )
}

/* ─── PROJECT CARD ──────────────────────────────────────────────────────── */
function ProjCard({ name, desc, tags, href }) {
  const [ref, vis] = useVisible()
  const [hov, setHov] = useState(false)
  return (
    <a ref={ref} href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ display:'block', textDecoration:'none', background:'var(--card)', border:`1px solid ${hov ? 'var(--accent)' : 'var(--border)'}`, borderRadius:8, padding:'1.5rem', transition:'all .2s ease', boxShadow: hov ? 'var(--shadow)' : 'none', opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'.5rem' }}>
        <h3 style={{ color:'var(--fg)', fontWeight:600, margin:0, fontSize:'0.95rem', lineHeight:1.3 }}>{name}</h3>
        <span style={{ color:'var(--fg2)', marginLeft:8, fontSize:'0.9rem', flexShrink:0 }}>↗</span>
      </div>
      <p style={{ color:'var(--fg2)', fontSize:'0.85rem', lineHeight:1.65, margin:'0 0 1rem' }}>{desc}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
        {tags.map((t, i) => <span key={i} style={{ fontFamily:'Space Mono,monospace', fontSize:'0.72rem', padding:'2px 8px', background:'var(--border)', borderRadius:4, color:'var(--fg2)' }}>{t}</span>)}
      </div>
    </a>
  )
}

/* ─── APP ───────────────────────────────────────────────────────────────── */
export default function App() {
  const [dark, setDark] = useState(true)
  const [selNode, setSelNode] = useState(null)
  const [eggOpen, eggClose, eggClick] = useEasterEgg(5)
  const width = useWindowWidth()
  const mobile = width < 800

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  // Escape closes inspector
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') setSelNode(null) }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const navLinks = ['experience', 'projects', 'skills', 'certifications', 'contact']

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', transition:'background .3s' }}>
      <a href="#experience" className="skip-link">Skip to content</a>

      {/* ── NAV ── */}
      <nav style={{ position:'fixed', top:0, left:0, right:0, zIndex:50, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 2rem', height:56, background: dark ? 'rgba(8,8,8,0.92)' : 'rgba(245,245,245,0.92)', backdropFilter:'blur(16px)', borderBottom:'1px solid var(--border)' }}
        aria-label="Main navigation"
      >
        <button onClick={eggClick} aria-label="Home — click 5 times for a surprise"
          style={{ background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'Space Mono,monospace', fontWeight:700, fontSize:'0.95rem', color:'var(--fg)', letterSpacing:'0.06em' }}>
          MISAL.K
        </button>
        <div style={{ display:'flex', alignItems:'center', gap:'2rem' }}>
          <div className="nav-links">
            {navLinks.map(l => (
              <a key={l} href={`#${l}`}
                style={{ color:'var(--fg2)', fontSize:'0.8rem', textDecoration:'none', fontFamily:'Space Mono,monospace', textTransform:'capitalize', letterSpacing:'0.04em', transition:'color .15s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--fg2)'}>
                {l}
              </a>
            ))}
          </div>
          <button onClick={() => setDark(d => !d)} title={dark ? 'Light mode' : 'Dark mode'}
            style={{ background:'none', border:'1px solid var(--border)', color:'var(--fg2)', borderRadius:6, padding:'5px 11px', cursor:'pointer', fontSize:'0.85rem', lineHeight:1 }}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {dark ? '◑' : '◐'}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div className="hero">
        {/* Text side */}
        <div className="hero-text" style={{ display:'flex', flexDirection:'column', justifyContent:'center', padding: mobile ? '3rem 1.5rem' : '5rem 3.5rem 4rem 2.5rem', borderRight: mobile ? 'none' : '1px solid var(--border)' }}>
          <div style={{ fontFamily:'Space Mono,monospace', fontSize:'0.68rem', color:'var(--fg2)', letterSpacing:'0.22em', marginBottom:'1.75rem', animation:'fadeUp .6s ease' }}>
            <span style={{ color:'var(--fg3)' }}>//</span> AVAILABLE · ABU DHABI, UAE
          </div>
          <h1 style={{ fontSize: mobile ? '2rem' : 'clamp(2.2rem,3.5vw,3rem)', fontWeight:700, lineHeight:1.08, color:'var(--fg)', marginBottom:'1rem', letterSpacing:'-0.025em', animation:'fadeUp .6s .1s ease both' }}>
            {META.name}
          </h1>
          <div style={{ fontFamily:'Space Mono,monospace', fontSize: mobile ? '0.78rem' : '0.9rem', color:'var(--fg2)', marginBottom:'1.5rem', letterSpacing:'0.04em', animation:'fadeUp .6s .15s ease both' }}>
            {META.title}
          </div>
          <p style={{ fontSize:'0.95rem', color:'var(--fg2)', lineHeight:1.75, maxWidth:420, marginBottom:'2rem', animation:'fadeUp .6s .2s ease both' }}>
            {META.tagline}
          </p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7, marginBottom:'2.5rem', animation:'fadeUp .6s .25s ease both' }}>
            {["CCNA","Golden Visa","MSc Cloud Computing","4× Dean's List","ITIL 4"].map(s => (
              <span key={s} style={{ fontFamily:'Space Mono,monospace', fontSize:'0.68rem', padding:'5px 10px', border:'1px solid var(--border)', borderRadius:4, color:'var(--fg2)' }}>{s}</span>
            ))}
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', animation:'fadeUp .6s .3s ease both' }}>
            <a href="#projects" style={{ padding:'0.7rem 1.5rem', background:'var(--accent)', color:'var(--bg)', borderRadius:6, textDecoration:'none', fontWeight:600, fontSize:'0.88rem' }}>View Projects</a>
            <a href={META.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding:'0.7rem 1.4rem', border:'1px solid var(--border)', color:'var(--fg)', borderRadius:6, textDecoration:'none', fontSize:'0.88rem' }}>LinkedIn ↗</a>
            <a href={META.email} style={{ padding:'0.7rem 1.4rem', border:'1px solid var(--border)', color:'var(--fg)', borderRadius:6, textDecoration:'none', fontSize:'0.88rem' }}>Email</a>
          </div>
          <div style={{ marginTop:'auto', paddingTop:'3rem', fontFamily:'Space Mono,monospace', fontSize:'0.65rem', color:'var(--fg3)', display: mobile ? 'none' : 'block' }}>
            Click any topology node to inspect →
          </div>
        </div>

        {/* Topology side — always dark */}
        <div className="topology-panel" style={{ background:'#080808', position:'relative', overflow:'hidden', minHeight: mobile ? '60vw' : 'auto' }}>
          <div style={{ position:'absolute', inset:0, backgroundImage:'linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)', backgroundSize:'28px 28px', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom,transparent 48%,rgba(255,255,255,0.012) 50%,transparent 52%)', backgroundSize:'100% 40px', animation:'scanMove 8s linear infinite', pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:0, padding:'1.5rem' }}>
            <Suspense fallback={null}>
              <Topology selectedId={selNode} onSelect={setSelNode} />
            </Suspense>
          </div>
          <div style={{ position:'absolute', bottom:'1.25rem', right:'1.5rem', fontFamily:'Space Mono,monospace', fontSize:'0.62rem', color:'rgba(255,255,255,0.2)', textAlign:'right', lineHeight:1.7, pointerEvents:'none' }}>
            NOC-GRID v2.0<br/>
            <span style={{ color:'rgba(255,255,255,0.45)' }}>● OPERATIONAL</span>
          </div>
        </div>
      </div>

      {/* ── EXPERIENCE ── */}
      <div id="experience" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="section-inner">
          <Label text="Experience"/>
          <div style={{ maxWidth:640 }}>
            {EXPERIENCE.map((e, i) => <TimelineItem key={i} {...e} isLast={i === EXPERIENCE.length - 1}/>)}
          </div>
        </div>
      </div>

      {/* ── PROJECTS ── */}
      <div id="projects" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="section-inner">
          <Label text="Projects"/>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))', gap:'1.1rem' }}>
            {PROJECTS.map((p, i) => <ProjCard key={i} {...p}/>)}
          </div>
        </div>
      </div>

      {/* ── SKILLS ── */}
      <div id="skills" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="section-inner">
          <Label text="Skills"/>
          <div className="skills-grid">
            {SKILLS.map((g, i) => (
              <div key={i}>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:'0.68rem', letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--fg2)', marginBottom:'1.5rem' }}>{g.category}</div>
                {g.items.map((s, j) => <SkillBar key={j} {...s}/>)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CERTIFICATIONS ── */}
      <div id="certifications" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="section-inner">
          <Label text="Certifications"/>
          <div className="cert-grid">
            {CERTS.map((c, i) => (
              <div key={i} style={{ background:'var(--card)', border:'1px solid var(--border)', borderRadius:8, padding:'1.25rem 1.5rem' }}>
                <div style={{ fontWeight:600, color:'var(--fg)', marginBottom:4, fontSize:'0.95rem' }}>{c.name}</div>
                <div style={{ fontSize:'0.8rem', color:'var(--fg2)', marginBottom:'0.75rem' }}>{c.issuer}</div>
                <span style={{ fontFamily:'Space Mono,monospace', fontSize:'0.68rem', padding:'3px 8px', borderRadius:4, background: c.status === 'Active' ? 'var(--border)' : 'transparent', border:'1px solid var(--border)', color: c.status === 'Active' ? 'var(--fg)' : 'var(--fg2)' }}>{c.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── EDUCATION ── */}
      <div style={{ borderTop:'1px solid var(--border)' }}>
        <div className="section-inner">
          <Label text="Education"/>
          <div style={{ maxWidth:640 }}>
            {EDUCATION.map((e, i) => (
              <div key={i} style={{ position:'relative', paddingLeft:'2rem', paddingBottom: i < EDUCATION.length - 1 ? '2.5rem' : 0 }}>
                {i < EDUCATION.length - 1 && <div style={{ position:'absolute', left:4, top:12, bottom:0, width:1, background:'var(--border)' }}/>}
                <div style={{ position:'absolute', left:0, top:6, width:9, height:9, borderRadius:'50%', background:'var(--accent)', border:'2px solid var(--bg)' }}/>
                <div style={{ display:'flex', alignItems:'center', gap:10, flexWrap:'wrap', marginBottom:4 }}>
                  <div style={{ fontWeight:600, color:'var(--fg)', fontSize:'0.95rem' }}>{e.degree}</div>
                  {e.badge && <span style={{ fontFamily:'Space Mono,monospace', fontSize:'0.65rem', padding:'2px 8px', border:'1px solid var(--border)', borderRadius:4, color:'var(--fg2)' }}>{e.badge}</span>}
                </div>
                <div style={{ color:'var(--fg2)', fontSize:'0.83rem' }}>{e.school}</div>
                <div style={{ fontFamily:'Space Mono,monospace', fontSize:'0.7rem', color:'var(--fg3)', marginTop:3 }}>{e.period}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div id="contact" style={{ borderTop:'1px solid var(--border)' }}>
        <div className="section-inner">
          <Label text="Contact"/>
          <div style={{ maxWidth:580 }}>
            <p style={{ fontSize: mobile ? '1.3rem' : '1.75rem', fontWeight:600, color:'var(--fg)', lineHeight:1.3, marginBottom:'2.5rem', letterSpacing:'-0.01em' }}>
              Open to opportunities in network engineering, infrastructure, and cloud.
            </p>
            <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
              <a href={META.email} style={{ padding:'0.75rem 1.75rem', background:'var(--accent)', color:'var(--bg)', borderRadius:6, textDecoration:'none', fontWeight:600, fontSize:'0.9rem' }}>Send Email</a>
              <a href={META.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding:'0.75rem 1.5rem', border:'1px solid var(--border)', color:'var(--fg)', borderRadius:6, textDecoration:'none', fontSize:'0.9rem' }}>LinkedIn ↗</a>
              <a href={META.github} target="_blank" rel="noopener noreferrer" style={{ padding:'0.75rem 1.5rem', border:'1px solid var(--border)', color:'var(--fg)', borderRadius:6, textDecoration:'none', fontSize:'0.9rem' }}>GitHub ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:'1px solid var(--border)', padding:'2rem', textAlign:'center', fontFamily:'Space Mono,monospace', fontSize:'0.68rem', color:'var(--fg3)' }}>
        {META.name} · {META.location} · {META.visa}
      </footer>

      {/* Inspector */}
      <Suspense fallback={null}>
        <Inspector nodeId={selNode} onClose={() => setSelNode(null)}/>
      </Suspense>

      {/* Easter egg */}
      <ErrBound>
        <Suspense fallback={null}>
          {eggOpen && <Terminal onClose={eggClose}/>}
        </Suspense>
      </ErrBound>
    </div>
  )
}
