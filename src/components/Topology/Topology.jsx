import React, { useState } from 'react'
import { NODES, LINKS, PACKET_LINKS } from '../../data/portfolioData.js'

const nm = Object.fromEntries(NODES.map(n => [n.id, n]))

function rFor(n) {
  return n.type === 'core' ? 4.8 : n.type === 'domain' ? 2.8 : 1.5
}

export default function Topology({ selectedId, onSelect }) {
  const [hov, setHov] = useState(null)

  return (
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <filter id="tglow">
          <feGaussianBlur stdDeviation="2" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
        <filter id="tglow-sm">
          <feGaussianBlur stdDeviation="0.8" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Links */}
      {LINKS.map(([a, b], i) => {
        const na = nm[a], nb = nm[b]
        const active = selectedId === a || selectedId === b || hov === a || hov === b
        return (
          <line
            key={i}
            x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
            stroke="white"
            strokeWidth={active ? 0.35 : 0.18}
            opacity={active ? 0.45 : 0.1}
            style={{ transition: 'stroke-width .2s, opacity .2s' }}
          />
        )
      })}

      {/* Animated packets */}
      {PACKET_LINKS.map((pl, i) => {
        const na = nm[pl.from], nb = nm[pl.to]
        return (
          <circle key={i} r={0.55} fill="white" opacity={0.65} filter="url(#tglow-sm)">
            <animateMotion
              path={`M${na.cx},${na.cy} L${nb.cx},${nb.cy}`}
              dur={pl.dur}
              repeatCount="indefinite"
            />
          </circle>
        )
      })}

      {/* Nodes */}
      {NODES.map(n => {
        const r = rFor(n)
        const isSelected = selectedId === n.id
        const isHov = hov === n.id
        const isCore = n.type === 'core'
        const isDomain = n.type === 'domain'

        return (
          <g
            key={n.id}
            onClick={() => onSelect(isSelected ? null : n.id)}
            onMouseEnter={() => setHov(n.id)}
            onMouseLeave={() => setHov(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Core pulse rings */}
            {isCore && (
              <>
                <circle cx={n.cx} cy={n.cy} r={r + 6} fill="none" stroke="white" strokeWidth={0.15} opacity={0.08}>
                  <animate attributeName="r" values={`${r + 4};${r + 9};${r + 4}`} dur="3s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.08;0.02;0.08" dur="3s" repeatCount="indefinite"/>
                </circle>
                <circle cx={n.cx} cy={n.cy} r={r + 3} fill="none" stroke="white" strokeWidth={0.2} opacity={0.12}>
                  <animate attributeName="r" values={`${r + 2};${r + 5};${r + 2}`} dur="3s" begin="1s" repeatCount="indefinite"/>
                  <animate attributeName="opacity" values="0.12;0.04;0.12" dur="3s" begin="1s" repeatCount="indefinite"/>
                </circle>
              </>
            )}

            {/* Selection ring */}
            {isSelected && (
              <circle cx={n.cx} cy={n.cy} r={r + 1.8} fill="none" stroke="white" strokeWidth={0.35} opacity={0.6}/>
            )}

            {/* Node circle */}
            <circle
              cx={n.cx} cy={n.cy} r={r}
              fill={isSelected || isHov ? 'white' : (isCore ? 'rgba(255,255,255,0.92)' : isDomain ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)')}
              stroke="white"
              strokeWidth={isCore ? 0 : 0.3}
              opacity={1}
              filter={isCore || isSelected ? 'url(#tglow)' : undefined}
              style={{ transition: 'fill .2s, opacity .2s' }}
            />

            {/* Labels */}
            {(n.type !== 'leaf' || isHov || isSelected) && (
              <text
                x={n.cx}
                y={n.cy + r + 3.2}
                textAnchor="middle"
                fill="white"
                opacity={isHov || isSelected ? 0.9 : 0.55}
                style={{ fontFamily: 'Space Mono, monospace', fontSize: isCore ? 3.8 : 3, pointerEvents: 'none', userSelect: 'none' }}
              >
                {n.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
