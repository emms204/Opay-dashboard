# OPay Campaign Analytics Dashboard

A **story-driven** React dashboard that compares Cable (DStv & GOtv) vs Terrestrial (Funita) campaign performance for Dec/Jan and February 2026. Built with **React**, **Vite**, and **Recharts**.

## What it does

- **Tells a story**: Each section answers a question (e.g. “Who reached more households?”, “How did we grow?”).
- **Visual charts**: Bar, area, line, and radial charts with green/white/orange theme.
- **Interactive**: Period toggle (Dec/Jan vs Feb), hover tooltips, responsive layout.
- **Landing-style**: Single scrolling page with KPIs, narratives, and charts.

## Run locally

```bash
cd opay-dashboard
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## Build for production

```bash
npm run build
```

Output is in `dist/`. Serve that folder with any static host.

## Data

All numbers come from the markdown reports in the parent folder (Funita and DStv Media Sales). Edit `src/data/campaignData.js` to change the data.
