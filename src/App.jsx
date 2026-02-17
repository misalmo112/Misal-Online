import React, { useState, Suspense, lazy } from 'react'
import HeroTopology from './components/Topology/HeroTopology.jsx'
import InspectorPanel from './components/Inspector/InspectorPanel.jsx'
import { portfolioData } from './data/portfolioData.js'

const Projects = lazy(() => import('./sections/Projects.jsx'))
const Skills = lazy(() => import('./sections/Skills.jsx'))
const Experience = lazy(() => import('./sections/Experience.jsx'))
const Certifications = lazy(() => import('./sections/Certifications.jsx'))
const FieldOps = lazy(() => import('./sections/FieldOps.jsx'))
const Achievements = lazy(() => import('./sections/Achievements.jsx'))
const Contact = lazy(() => import('./sections/Contact.jsx'))

const SectionFallback = () => <div className="section" style={{ minHeight: 120 }} aria-hidden="true" />

export default function App() {
  const [selectedNodeId, setSelectedNodeId] = useState(null)
  const [hoveredNodeId, setHoveredNodeId] = useState(null)

  return (
    <>
      <a href="#projects" className="skip-link">Skip to main content</a>
      <div className="app-grid-bg" aria-hidden="true" />
      <div className="scanline-sweep" aria-hidden="true" />

      <main id="main" style={{ position: 'relative', zIndex: 2 }}>
        <HeroTopology
          selectedNodeId={selectedNodeId}
          onSelectNode={setSelectedNodeId}
          hoveredNodeId={hoveredNodeId}
          onHoverNode={setHoveredNodeId}
        />

        <Suspense fallback={<SectionFallback />}>
          <Projects data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Skills data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Experience data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Certifications data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FieldOps data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Achievements data={portfolioData} />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Contact data={portfolioData} />
        </Suspense>

        <footer
          className="section"
          style={{
            paddingTop: '2.5rem',
            paddingBottom: '2.5rem',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            fontSize: 'var(--text-chip)',
            color: 'var(--text-muted)',
          }}
        >
          {portfolioData.meta.name} · {portfolioData.meta.location}
        </footer>
      </main>

      <InspectorPanel
        isOpen={!!selectedNodeId}
        nodeId={selectedNodeId}
        onClose={() => setSelectedNodeId(null)}
        data={portfolioData}
      />
    </>
  )
}
