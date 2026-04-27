export const META = {
  name: 'Misal Muhammed Kunhi',
  title: 'Network & Infrastructure Engineer',
  tagline: 'Building reliable networks and scalable systems — from hardware to cloud.',
  location: 'Abu Dhabi, UAE',
  visa: 'UAE Golden Visa Holder',
  email: 'mailto:misalmo@outlook.com',
  github: 'https://github.com/misalmo112',
  linkedin: 'https://www.linkedin.com/in/misal-muhammed-kunhi-626162250/',
}

export const NODES = [
  { id:'core',  label:'CORE',     type:'core',   cx:50, cy:50 },
  { id:'net',   label:'Network',  type:'domain', cx:20, cy:30 },
  { id:'sw',    label:'Software', type:'domain', cx:78, cy:28 },
  { id:'sec',   label:'Security', type:'domain', cx:22, cy:70 },
  { id:'cloud', label:'Cloud',    type:'domain', cx:76, cy:70 },
  { id:'proj',  label:'Projects', type:'domain', cx:50, cy:17 },
  { id:'cert',  label:'Certs',    type:'domain', cx:50, cy:83 },
  { id:'n1', label:'VLAN',    type:'leaf', cx:7,  cy:18 },
  { id:'n2', label:'BGP',     type:'leaf', cx:5,  cy:40 },
  { id:'n3', label:'Meraki',  type:'leaf', cx:13, cy:55 },
  { id:'n4', label:'React',   type:'leaf', cx:91, cy:18 },
  { id:'n5', label:'Node.js', type:'leaf', cx:93, cy:38 },
  { id:'n6', label:'Firewall',type:'leaf', cx:8,  cy:80 },
  { id:'n7', label:'IDS/IPS', type:'leaf', cx:26, cy:87 },
  { id:'n8', label:'AWS',     type:'leaf', cx:88, cy:80 },
  { id:'n9', label:'K8s',     type:'leaf', cx:88, cy:60 },
  { id:'p1', label:'SaaS',    type:'leaf', cx:36, cy:7  },
  { id:'p2', label:'AI',      type:'leaf', cx:64, cy:7  },
  { id:'c1', label:'CCNA',    type:'leaf', cx:37, cy:93 },
  { id:'c2', label:'ITIL4',   type:'leaf', cx:63, cy:93 },
]

export const LINKS = [
  ['core','net'],['core','sw'],['core','sec'],['core','cloud'],['core','proj'],['core','cert'],
  ['net','n1'],['net','n2'],['net','n3'],
  ['sw','n4'],['sw','n5'],
  ['sec','n6'],['sec','n7'],
  ['cloud','n8'],['cloud','n9'],
  ['proj','p1'],['proj','p2'],
  ['cert','c1'],['cert','c2'],
]

export const PACKET_LINKS = [
  { from:'core', to:'net',   dur:'2.8s' },
  { from:'core', to:'sw',    dur:'3.4s' },
  { from:'core', to:'cloud', dur:'4.1s' },
  { from:'net',  to:'n1',    dur:'5s'   },
  { from:'sw',   to:'n4',    dur:'6s'   },
]

export const NODE_INFO = {
  core:  { title:'EDGE-CORE-01', summary:'Primary routing node — Misal Muhammed Kunhi, Network & Infrastructure Engineer based in Abu Dhabi, UAE.', bullets:['Hostname: MISAL.K','Status: OPERATIONAL','Location: Abu Dhabi, UAE','Visa: UAE Golden Visa Holder'], tags:['NOC','Core','Edge'], links:[] },
  net:   { title:'Network & Infrastructure', summary:'Enterprise networking across switching, routing, and cloud management.', bullets:['Cisco IOS / NX-OS','VLAN segmentation, L2/L3 design','BGP, OSPF routing protocols','Meraki cloud management'], tags:['Cisco','VLAN','Meraki'], links:[] },
  sw:    { title:'Software Systems', summary:'Full-stack development and SaaS architecture — built a complete SaaS from scratch.', bullets:['Built SaaS application from scratch','React, Node.js, REST API design','Cloud deployment and scaling'], tags:['React','Node.js','SaaS'], links:[{ label:'GitHub', href:'https://github.com/misalmo112' }] },
  sec:   { title:'Security', summary:'Network security design, firewalls, and access control policies.', bullets:['Firewall configuration & management','IDS/IPS deployment','Secure access control policies','Zero-trust network design'], tags:['Firewall','IDS/IPS','ZeroTrust'], links:[] },
  cloud: { title:'Cloud & Infrastructure', summary:'Cloud architecture — currently pursuing MSc in Cloud Computing.', bullets:['MSc Cloud Computing (in progress)','Cloud architecture design','Infrastructure automation','Cisco cloud management'], tags:['Cloud','AWS','Automation'], links:[] },
  proj:  { title:'Project Subnets', summary:'Standalone software projects spanning SaaS, AI, and academic systems.', bullets:['Academic Advising Subsystem','Sports Management App','OpenClaw AI Assistant','Family Social App'], tags:['Open Source','GitHub'], links:[{ label:'GitHub', href:'https://github.com/misalmo112' }] },
  cert:  { title:'Certifications', summary:'Active vendor and framework certifications.', bullets:['CCNA — Cisco','ITIL 4 Foundation — PeopleCert','Cisco AI Technical Practitioner','CCIE Enterprise (In Progress)'], tags:['CCNA','ITIL4','CCIE'], links:[] },
}

export const EXPERIENCE = [
  { role:'Network & Infrastructure Engineer', org:'Abu Dhabi, UAE', period:'2024 — Present',
    bullets:['Cisco IOS/NX-OS switching & routing across enterprise networks','VLAN segmentation, L2/L3 design, redundancy and failover','Meraki cloud management and wireless infrastructure deployment','Firewall config, IDS/IPS, access control policy enforcement'] },
  { role:'SaaS Developer — Independent', org:'Remote', period:'2023 — 2024',
    bullets:['Architected and built a full SaaS product from scratch','Full-stack: React, Node.js, REST API design, cloud deployment','End-to-end ownership: product vision, development, and scaling'] },
]

export const EDUCATION = [
  { degree:'MSc Cloud Computing',                    school:'In Progress',             period:'2025 — Present', badge:'Current'        },
  { degree:'BSc Computing & Information Technology', school:'RIT Dubai',               period:'May 2025',       badge:"4× Dean's List" },
  { degree:'High School Diploma',                    school:'Abu Dhabi Indian School', period:'March 2021',     badge:''               },
]

export const PROJECTS = [
  { name:'Academic Advising Subsystem', desc:'Capstone project: automated academic advisor at university level with AI-driven advising workflows and pipeline automation.',  tags:['Python','Automation','Capstone'], href:'https://github.com/misalmo112/Academic-Advising' },
  { name:'Family Social App',           desc:'Family-oriented social platform with shared content, messaging, and media features — built for real family connectivity.',      tags:['React','Node.js','App'],          href:'https://github.com/misalmo112/The-Family-App' },
  { name:'Sports Management App',       desc:'Full sports management system for team coordination, scheduling, and match tracking across multiple sports.',                  tags:['React','Sports','CRUD'],           href:'https://github.com/misalmo112/Sports-Management-app' },
  { name:'OpenClaw AI Assistant',       desc:'AI-powered assistant with natural language interface and task automation — an exploration in applied AI for productivity.',     tags:['AI','LLM','Automation'],           href:'https://github.com/misalmo112' },
]

export const SKILLS = [
  { category:'Network Engineering', items:[
    { name:'Cisco IOS / NX-OS',       level:90 },
    { name:'VLAN & L2/L3 Design',     level:88 },
    { name:'BGP / OSPF Routing',      level:78 },
    { name:'Meraki Cloud Mgmt',       level:82 },
    { name:'Wireless Infrastructure', level:75 },
  ]},
  { category:'Software & Cloud', items:[
    { name:'React / Frontend',        level:80 },
    { name:'Node.js / REST APIs',     level:78 },
    { name:'Cloud Architecture',      level:72 },
    { name:'Automation & Scripting',  level:74 },
  ]},
  { category:'Security & Operations', items:[
    { name:'Firewall Configuration',  level:82 },
    { name:'Access Control Policies', level:85 },
    { name:'IDS/IPS Management',      level:78 },
    { name:'Network Monitoring',      level:84 },
  ]},
]

export const CERTS = [
  { name:'CCNA',                           issuer:'Cisco',      status:'Active'      },
  { name:'Cisco AI Technical Practitioner',issuer:'Cisco',      status:'Active'      },
  { name:'ITIL 4 Foundation',              issuer:'PeopleCert', status:'Active'      },
  { name:'CCIE Enterprise',                issuer:'Cisco',       status:'In Progress' },
]

// Legacy export for any remaining imports
export const portfolioData = { meta: META, contact: { links: [
  { label:'Email', href: META.email },
  { label:'LinkedIn', href: META.linkedin },
  { label:'GitHub', href: META.github },
]}}
