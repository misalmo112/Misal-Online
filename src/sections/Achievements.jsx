import React from 'react'
import { motion } from 'framer-motion'

export default function Achievements({ data }) {
  const items = data?.achievementsList ?? []
  return (
    <section className="section" id="achievements" aria-labelledby="achievements-heading">
      <h2 id="achievements-heading" className="section-title">Achievements</h2>
      <ul style={{ margin: 0, paddingLeft: '1.75rem', color: 'var(--text-secondary)', fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)' }}>
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.3 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
