import React, { useMemo } from 'react'
import Link from './Link.jsx'
import Node from './Node.jsx'

/**
 * SVG topology: links then nodes. Organic positions from data.
 * Supports simplified mobile view (fewer nodes).
 */
export default function TopologyCanvas({
  nodes,
  links,
  selectedId,
  hoveredId,
  onSelectNode,
  onHoverNode,
  reducedMotion,
  simplified,
}) {
  const nodeMap = useMemo(() => {
    const m = {}
    nodes.forEach((n) => { m[n.id] = n })
    return m
  }, [nodes])

  const linkPositions = useMemo(() => {
    return links.map(([fromId, toId]) => ({
      fromId,
      toId,
      from: nodeMap[fromId]?.position ?? { x: 50, y: 50 },
      to: nodeMap[toId]?.position ?? { x: 50, y: 50 },
    }))
  }, [links, nodeMap])

  const isLinkHovered = (fromId, toId) => {
    if (!hoveredId) return false
    return hoveredId === fromId || hoveredId === toId
  }

  const nodesToRender = simplified
    ? nodes.filter((n) => n.type === 'core' || n.type === 'domain')
    : nodes

  const nodeIdsToRender = useMemo(() => new Set(nodesToRender.map((n) => n.id)), [nodesToRender])
  const linksToRender = useMemo(
    () => links.filter(([fromId, toId]) => nodeIdsToRender.has(fromId) && nodeIdsToRender.has(toId)),
    [links, nodeIdsToRender]
  )

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      className="topology-svg"
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="glow-subtle" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-strong" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.2" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="glow-core" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="grid-vignette" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#080808" stopOpacity="0" />
          <stop offset="100%" stopColor="#080808" stopOpacity="0.7" />
        </radialGradient>
      </defs>
      {/* Subtle vignette */}
      <rect x="0" y="0" width="100" height="100" fill="url(#grid-vignette)" pointerEvents="none" />
      <g className="topology-links">
        {linksToRender.map(([fromId, toId], i) => (
          <Link
            key={`${fromId}-${toId}-${i}`}
            linkId={`${fromId}-${toId}`}
            from={nodeMap[fromId]?.position ?? { x: 50, y: 50 }}
            to={nodeMap[toId]?.position ?? { x: 50, y: 50 }}
            isHovered={isLinkHovered(fromId, toId)}
            reducedMotion={reducedMotion}
          />
        ))}
      </g>
      <g className="topology-nodes">
        {nodesToRender.map((node) => (
          <Node
            key={node.id}
            node={node}
            isSelected={selectedId === node.id}
            isHovered={hoveredId === node.id}
            onSelect={onSelectNode}
            onHoverStart={onHoverNode}
            onHoverEnd={() => onHoverNode(null)}
            reducedMotion={reducedMotion}
          />
        ))}
      </g>
    </svg>
  )
}
