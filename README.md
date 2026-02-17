# Misal Online — Cyberpunk NOC Portfolio

A React + Vite portfolio with an SVG-based organic network topology hero, scroll-collapse behavior, and an Inspector panel. Built for GitHub Pages.

## Tech stack

- **Vite** + **React** (JavaScript)
- **Framer Motion** for animations
- **SVG** for the topology (no Canvas/WebGL)
- CSS variables for the cyberpunk theme
- `prefers-reduced-motion` supported

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

Output is in `dist/`. Preview the production build:

```bash
npm run preview
```

## Deploy to GitHub Pages

### Option 1: GitHub Actions (recommended)

1. In your repo: **Settings → Pages → Build and deployment**
2. Set **Source** to **GitHub Actions**.
3. Push to the `main` branch. The workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml) runs `npm ci`, `npm run build`, and deploys the `dist/` folder to GitHub Pages.

The site will be available at:

`https://<username>.github.io/Misal-Online/`

### Option 2: Manual deploy with gh-pages

If you prefer the `gh-pages` branch:

```bash
npm run build
npx gh-pages -d dist
```

Ensure **Settings → Pages** uses the `gh-pages` branch and the `/ (root)` folder.

### Base path

The app is built with base path `/Misal-Online/` in production so assets load correctly on GitHub Pages. This is set in [vite.config.js](vite.config.js). If you rename the repo, update the `base` value in `vite.config.js` to match (e.g. `/Your-Repo-Name/`).

## Project structure

- `src/data/portfolioData.js` — Single source of truth for all content
- `src/components/Topology/` — Hero topology (TopologyCanvas, Node, Link, HeroTopology)
- `src/components/Inspector/` — Right-side Inspector panel
- `src/sections/` — Projects, Skills, Experience, Certifications, Field Ops, Achievements, Contact
- `src/styles/theme.css` — CSS variables and global styles

## Content

Edit [src/data/portfolioData.js](src/data/portfolioData.js) to change copy, links, topology nodes, and section data. The UI is fully data-driven.
