/**
 * Single source of truth for the Cyberpunk NOC portfolio.
 * All UI content is driven from this file.
 */

export const portfolioData = {
  meta: {
    name: 'Misal Muhammed Kunhi',
    title: 'Network & Infrastructure Engineer',
    headline: 'Network & Infrastructure Engineer',
    location: 'Abu Dhabi, UAE',
    visa: 'Golden Visa Holder',
  },

  contact: {
    email: 'misalmo@outlook.com',
    links: [
      { label: 'Email', href: 'mailto:misalmo@outlook.com', icon: 'email' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/misal-muhammed-kunhi-626162250/', icon: 'linkedin' },
      { label: 'GitHub', href: 'https://github.com/misalmo112', icon: 'github' },
      { label: 'Strava', href: 'https://strava.app.link/Ked0o4UMP0b', icon: 'strava' },
      { label: 'Instagram', href: 'https://www.instagram.com/misal.mo', icon: 'instagram' },
    ],
  },

  education: [
    { school: 'Rochester Institute of Technology, Dubai', degree: 'Bachelor of Computing and Information Technology', graduated: 'May 2025' },
    { school: 'Abu Dhabi Indian School', degree: 'High School Diploma', graduated: 'March 2021' },
  ],

  // Topology: nodes with organic positions (x, y in 0–100 viewBox)
  topologyNodes: [
    { id: 'core', label: 'CORE', type: 'core', position: { x: 50, y: 50 }, contentKey: 'core' },
    { id: 'network-infrastructure', label: 'Network & Infrastructure', type: 'domain', position: { x: 22, y: 28 }, contentKey: 'network-infrastructure' },
    { id: 'software-systems', label: 'Software Systems', type: 'domain', position: { x: 78, y: 25 }, contentKey: 'software-systems' },
    { id: 'project-subnets', label: 'Project Subnets', type: 'domain', position: { x: 50, y: 18 }, contentKey: 'project-subnets' },
    { id: 'certifications', label: 'Certifications', type: 'domain', position: { x: 82, y: 68 }, contentKey: 'certifications' },
    { id: 'field-ops', label: 'Field Ops', type: 'domain', position: { x: 35, y: 85 }, contentKey: 'field-ops' },
    { id: 'achievements', label: 'Achievements', type: 'domain', position: { x: 68, y: 82 }, contentKey: 'achievements' },
    // Cluster nodes under Project Subnets
    { id: 'subnet-1', label: '10.0.0.0/24', type: 'cluster', position: { x: 38, y: 10 }, contentKey: 'project-academic', clusterId: 'project-subnets' },
    { id: 'subnet-2', label: '192.168.1.0/24', type: 'cluster', position: { x: 52, y: 8 }, contentKey: 'project-family', clusterId: 'project-subnets' },
    { id: 'subnet-3', label: '192.168.2.0/24', type: 'cluster', position: { x: 62, y: 12 }, contentKey: 'project-sports', clusterId: 'project-subnets' },
    { id: 'subnet-4', label: '192.168.3.0/24', type: 'cluster', position: { x: 48, y: 14 }, contentKey: 'project-openclaw', clusterId: 'project-subnets' },
  ],

  // Links: [fromId, toId]
  topologyLinks: [
    ['core', 'network-infrastructure'],
    ['core', 'software-systems'],
    ['core', 'project-subnets'],
    ['core', 'certifications'],
    ['core', 'field-ops'],
    ['core', 'achievements'],
    ['project-subnets', 'subnet-1'],
    ['project-subnets', 'subnet-2'],
    ['project-subnets', 'subnet-3'],
    ['project-subnets', 'subnet-4'],
  ],

  // Inspector content per node (contentKey)
  nodeContent: {
    core: {
      title: 'EDGE-CORE-01',
      summary: 'Primary routing node — Misal Muhammed Kunhi. Network & Infrastructure Engineer.',
      bullets: [
        'Hostname: MISAL.K',
        'Status: OPERATIONAL',
        'Location: Abu Dhabi, UAE',
        'Visa: Golden Visa Holder',
      ],
      tags: ['NOC', 'Edge', 'Core'],
      links: [],
    },
    'network-infrastructure': {
      title: 'Network & Infrastructure',
      summary: 'Networking, switching, routing, and infrastructure design.',
      bullets: [
        'Cisco switching & routing',
        'VLAN segmentation, L2/L3 design',
        'Redundancy and access policies',
        'Meraki & Cisco Cloud',
      ],
      tags: ['Cisco', 'Meraki', 'VLAN', 'L2/L3'],
      links: [],
    },
    'software-systems': {
      title: 'Software Systems',
      summary: 'Software development and system integration.',
      bullets: [
        'Full-stack and automation',
        'APIs and integrations',
        'Documentation and tooling',
      ],
      tags: ['React', 'Node', 'APIs'],
      links: [{ label: 'GitHub', href: 'https://github.com/misalmo112' }],
    },
    'project-subnets': {
      title: 'Project Subnets',
      summary: 'Select a subnet below to inspect project details.',
      bullets: [],
      tags: [],
      links: [],
      isSubnetList: true,
    },
    certifications: {
      title: 'Certifications',
      summary: 'Industry and vendor certifications.',
      bullets: ['CCNA', 'Cisco AI Technical Practitioner', 'ITIL 4 Foundation', 'CCIE Training'],
      tags: ['CCNA', 'ITIL 4', 'CCIE Training'],
      links: [],
    },
    'field-ops': {
      title: 'Field Ops',
      summary: 'Long distance running, hiking, photography, and more.',
      bullets: [
        'Long distance running (Strava)',
        'Hiking/camping',
        'Photography',
        'Going out with friends',
        'Volleyball',
      ],
      tags: ['Strava', 'Running', 'Photography'],
      links: [
        { label: 'Strava', href: 'https://strava.app.link/Ked0o4UMP0b' },
        { label: 'Instagram', href: 'https://www.instagram.com/misal.mo' },
      ],
    },
    achievements: {
      title: 'Achievements',
      summary: 'Academic and personal milestones.',
      bullets: [
        '4x Dean\'s List Certificate for academic excellence',
        'Selected for RIT Student Abroad Program in New York',
        'Golden Visa Holder',
      ],
      tags: ['Dean\'s List', 'RIT Abroad', 'Golden Visa'],
      links: [],
    },
    'project-academic': {
      title: 'Academic Advising Subsystem',
      subnet: '10.0.0.0/24',
      summary: 'Capstone: automated academic advisor subsystem at university.',
      bullets: ['University capstone project', 'Automated advising workflows'],
      tags: ['Capstone', 'Automation'],
      links: [],
    },
    'project-family': {
      title: 'Family App',
      subnet: '192.168.1.0/24',
      summary: 'Family-oriented application project.',
      bullets: [],
      tags: ['App'],
      links: [],
    },
    'project-sports': {
      title: 'Sports Management App',
      subnet: '192.168.2.0/24',
      summary: 'Sports management application.',
      bullets: [],
      tags: ['App', 'Sports'],
      links: [],
    },
    'project-openclaw': {
      title: 'OpenClaw AI Assistant',
      subnet: '192.168.3.0/24',
      summary: 'AI assistant project.',
      bullets: [],
      tags: ['AI', 'Assistant'],
      links: [],
    },
  },

  // Project subnets for Inspector (tiles)
  projectSubnets: [
    { subnet: '10.0.0.0/24', name: 'Academic Advising Subsystem', contentKey: 'project-academic' },
    { subnet: '192.168.1.0/24', name: 'Family App', contentKey: 'project-family' },
    { subnet: '192.168.2.0/24', name: 'Sports Management App', contentKey: 'project-sports' },
    { subnet: '192.168.3.0/24', name: 'OpenClaw AI Assistant', contentKey: 'project-openclaw' },
  ],

  // Experience timeline
  experience: [
    {
      role: 'Network Engineer',
      company: 'Freelance / Self-Directed',
      location: 'Abu Dhabi, UAE',
      period: '2023 – Present',
      bullets: [
        'Designed and deployed enterprise-grade switching & routing architectures using Cisco IOS/NX-OS',
        'Implemented VLAN segmentation, L2/L3 redundancy, and access policies for multi-site environments',
        'Managed Cisco Meraki cloud-managed networks and wireless deployments',
        'Produced network documentation, topology diagrams, and runbooks',
      ],
    },
    {
      role: 'Full-Stack Developer & Founder',
      company: 'SaaS — Sports Management Platform',
      location: 'Remote',
      period: '2023 – Present',
      bullets: [
        'Built a SaaS sports management application from scratch — architecture, frontend, backend, database',
        'Implemented multi-tenant auth, real-time scheduling, and league management features',
        'Designed REST API, deployed on cloud infrastructure with CI/CD pipeline',
      ],
    },
    {
      role: 'Student — B.S. Computing & Information Technology',
      company: 'Rochester Institute of Technology, Dubai',
      location: 'Dubai, UAE',
      period: '2021 – May 2025',
      bullets: [
        '4× Dean\'s List Certificate for academic excellence',
        'Selected for RIT Student Abroad Program, Rochester New York campus',
        'Capstone: Academic Advising Subsystem — automated advising workflows',
      ],
    },
  ],

  // Projects section (cards)
  projects: [
    {
      id: 'sports',
      name: 'Sports Management SaaS',
      description: 'Multi-tenant SaaS platform for league and tournament management. Built solo from architecture to deployment.',
      tags: ['React', 'Node.js', 'SaaS', 'Cloud'],
      link: 'https://github.com/misalmo112',
    },
    {
      id: 'openclaw',
      name: 'OpenClaw AI Assistant',
      description: 'AI-powered assistant integrating multiple LLM providers with tool use, memory, and a custom orchestration layer.',
      tags: ['AI', 'LLM', 'Python'],
      link: 'https://github.com/misalmo112',
    },
    {
      id: 'academic',
      name: 'Academic Advising Subsystem',
      description: 'Capstone project at RIT Dubai — automated academic advising workflows to reduce advisor load.',
      tags: ['Capstone', 'Automation', 'React'],
      link: 'https://github.com/misalmo112',
    },
    {
      id: 'portfolio',
      name: 'This Portfolio',
      description: 'Cyberpunk NOC-themed personal portfolio. Clickable topology network, animated sections, dark/light mode.',
      tags: ['React', 'Framer Motion', 'Vite'],
      link: 'https://github.com/misalmo112/Misal-Online',
    },
  ],

  // Skills section (grouped with proficiency 0–100)
  skills: [
    {
      category: 'Networking & Infrastructure',
      items: [
        { name: 'Cisco IOS/NX-OS', level: 90 },
        { name: 'VLAN / L2/L3 Design', level: 88 },
        { name: 'BGP / OSPF', level: 75 },
        { name: 'Cisco Meraki', level: 82 },
        { name: 'Wireless LAN', level: 78 },
        { name: 'Network Documentation', level: 92 },
      ],
    },
    {
      category: 'Software & Cloud',
      items: [
        { name: 'React / TypeScript', level: 85 },
        { name: 'Node.js / REST APIs', level: 83 },
        { name: 'Python / Automation', level: 78 },
        { name: 'Cloud Infrastructure', level: 72 },
        { name: 'CI/CD Pipelines', level: 70 },
      ],
    },
    {
      category: 'Security & Operations',
      items: [
        { name: 'Firewalls / IDS/IPS', level: 80 },
        { name: 'Access Policies / ACLs', level: 85 },
        { name: 'ITIL Practices', level: 88 },
        { name: 'Incident Management', level: 80 },
      ],
    },
  ],

  // Certifications section
  certificationsList: [
    { name: 'CCNA' },
    { name: 'Cisco AI Technical Practitioner' },
    { name: 'ITIL 4 Foundation' },
    { name: 'CCIE Training' },
  ],

  // Achievements (can be its own section or in hero)
  achievementsList: [
    '4x Dean\'s List Certificate for academic excellence',
    'Selected for RIT Student Abroad Program in New York',
    'Golden Visa Holder',
  ],

  // Field Ops section
  fieldOps: [
    { name: 'Long distance running', link: 'https://strava.app.link/Ked0o4UMP0b', linkLabel: 'Strava' },
    { name: 'Hiking/camping' },
    { name: 'Photography' },
    { name: 'Going out with friends' },
    { name: 'Volleyball' },
    { name: 'Instagram', link: 'https://www.instagram.com/misal.mo', linkLabel: 'misal.mo' },
  ],
}
