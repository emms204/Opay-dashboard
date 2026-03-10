import { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  Cell,
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
} from 'recharts';
import {
  cable,
  terrestrial,
  dstv,
  gotv,
  periodTimeline,
  terrestrialChannelsDecJan,
  terrestrialChannelsFeb,
  cableChannelsDecJan,
  cableChannelsFeb,
  terrestrialProgramsFeb,
  terrestrialProgramsDecJan,
  cnnGender,
  cnnAgeGroups,
  cnnAudienceFlowByHour,
  audienceChannels,
  audienceFlowMultiLine,
  audienceAverageGender,
  audienceAverageAgeGroups,
  channelsWithFlow,
} from './data/campaignData';
import { BrandLogos } from './components/BrandLogos';
import { ChartTooltip } from './components/ChartTooltip';
import { DrillDownPanel } from './components/DrillDownPanel';
import { InsightAccordion } from './components/InsightAccordion';
import { INSIGHTS } from './data/chartInsights';
import './App.css';

const COLORS = {
  cable: '#0d5c2e',
  terrestrial: '#2d9d5a',
  terrestrialAlt: '#2563eb', /* distinct blue for area/line vs cable green */
  dstv: '#1a7d3e',
  gotv: '#5a9bd4',
  orange: '#e87c2b',
  purple: '#6b4c9a',
};

const VIEWS = [
  { id: 'campaign-overview', label: 'Campaign Overview' },
  { id: 'reach', label: 'Reach & Comparison' },
  { id: 'growth', label: 'Growth Over Time' },
  { id: 'dstv-gotv', label: 'DStv vs GOtv' },
  { id: 'top-channels', label: 'Top Channels' },
  { id: 'audience-demographics', label: 'Audience Demographics' },
  { id: 'top-programs', label: 'Top Programs' },
];

function formatNum(x) {
  if (x >= 1e6) return (x / 1e6).toFixed(1) + 'M';
  if (x >= 1e3) return (x / 1e3).toFixed(1) + 'K';
  return String(x);
}

function pctChange(prev, curr) {
  if (prev == null || prev === 0) return null;
  return (((curr - prev) / prev) * 100).toFixed(1);
}

function pctChangeNum(prev, curr) {
  if (prev == null || prev === 0) return 0;
  return ((curr - prev) / prev) * 100;
}

const OVERVIEW_ICONS = {
  reach: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  spots: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  frequency: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12a9 9 0 1 0-9 9" />
      <path d="M21 3v6h-6M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9" />
    </svg>
  ),
  tvr: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 20V10M12 20V4M6 20v-6" />
    </svg>
  ),
  impacts: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  grps: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 3v18h18" />
      <path d="M7 16v-5M12 16V8M17 16v-3" />
    </svg>
  ),
};

export default function App() {
  const [view, setView] = useState('reach');
  const [period, setPeriod] = useState('feb');
  const [drillDown, setDrillDown] = useState(null);
  const [programSortKey, setProgramSortKey] = useState('totalTVR');
  const [programSortAsc, setProgramSortAsc] = useState(false);
  const [selectedAudienceChannel, setSelectedAudienceChannel] = useState('cnn');

  const c = period === 'decjan' ? cable.decJan : cable.feb;
  const t = period === 'decjan' ? terrestrial.decJan : terrestrial.feb;
  const d = period === 'decjan' ? dstv.decJan : dstv.feb;
  const g = period === 'decjan' ? gotv.decJan : gotv.feb;

  const periodLabel = period === 'decjan' ? 'Dec/Jan 2026' : 'February 2026';
  const periodShort = period === 'decjan' ? 'Dec/Jan' : 'Feb';

  const reachCompareData = [
    { name: 'Cable', value: c.householdsReachedM, fill: COLORS.cable, spots: c.spots, frequency: c.avgFrequency, grps: c.grps },
    { name: 'Terrestrial', value: t.householdsReachedM, fill: COLORS.terrestrial, spots: t.spots, frequency: t.avgFrequency, totalTVR: t.totalTVR },
  ];

  const reachPieData = reachCompareData.map((d) => ({ ...d }));

  const spotsFreqData = [
    { name: 'Cable', spots: c.spots, frequency: c.avgFrequency, householdsReachedM: c.householdsReachedM, grps: c.grps },
    { name: 'Terrestrial', spots: t.spots, frequency: t.avgFrequency, householdsReachedM: t.householdsReachedM, totalTVR: t.totalTVR },
  ];

  const dstvVsGotvData = [
    { name: 'Households (M)', DStv: d.householdsReachedM, GOtv: g.householdsReachedM },
    { name: 'Total TVR', DStv: Math.round(d.totalTVR), GOtv: Math.round(g.totalTVR) },
    { name: 'Impacts (M)', DStv: d.impacts / 1e6, GOtv: g.impacts / 1e6 },
    { name: 'Avg. frequency', DStv: d.avgFrequency, GOtv: g.avgFrequency },
  ];

  const cableSharePie = [
    { name: 'DStv', value: d.householdsReachedM, fill: COLORS.dstv },
    { name: 'GOtv', value: g.householdsReachedM, fill: COLORS.gotv },
  ];
  const cableShareTotal = d.householdsReachedM + g.householdsReachedM;

  const topTerr = (period === 'decjan' ? terrestrialChannelsDecJan : terrestrialChannelsFeb)
    .slice()
    .sort((a, b) => b.tvr - a.tvr)
    .slice(0, 10);
  const topCable = (period === 'decjan' ? cableChannelsDecJan : cableChannelsFeb)
    .slice()
    .sort((a, b) => b.tvr - a.tvr)
    .slice(0, 10);

  const topTerrPie = topTerr.slice(0, 5).map((r) => ({ name: r.channel, value: r.tvr, fill: COLORS.terrestrial }));
  const topCablePie = topCable.slice(0, 5).map((r) => ({
    name: r.channel,
    value: r.tvr,
    fill: r.platform === 'DStv' ? COLORS.dstv : COLORS.gotv,
  }));

  const radialReach = [
    { name: period === 'decjan' ? 'Terrestrial Dec/Jan' : 'Terrestrial Feb', value: Math.min(100, (t.householdsReachedM / 40) * 100), fill: COLORS.terrestrial },
    { name: period === 'decjan' ? 'Cable Dec/Jan' : 'Cable Feb', value: Math.min(100, (c.householdsReachedM / 40) * 100), fill: COLORS.cable },
  ];

  const terrestrialPrograms = (period === 'decjan' ? terrestrialProgramsDecJan : terrestrialProgramsFeb).slice();
  terrestrialPrograms.sort((a, b) => {
    const va = a[programSortKey];
    const vb = b[programSortKey];
    const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb));
    return programSortAsc ? cmp : -cmp;
  });

  const tDec = terrestrial.decJan;
  const tFeb = terrestrial.feb;
  const cDec = cable.decJan;
  const cFeb = cable.feb;

  const reachTooltipRows = (raw) => [
    { label: 'Households reached', value: raw.value + ' M' },
    { label: 'Spots', value: String(raw.spots ?? '—') },
    { label: 'Avg. frequency', value: raw.frequency != null ? raw.frequency.toFixed(1) : '—' },
    raw.grps != null && { label: 'GRPs', value: String(raw.grps) },
    raw.totalTVR != null && { label: 'Total TVR', value: raw.totalTVR.toFixed(1) },
    raw.impacts != null && { label: 'Impacts', value: formatNum(raw.impacts) },
  ].filter(Boolean);

  const spotsFreqTooltipRows = (raw) => [
    { label: 'Spots', value: String(raw.spots) },
    { label: 'Avg. frequency', value: raw.frequency.toFixed(1) },
    { label: 'Households (M)', value: raw.householdsReachedM + ' M' },
    raw.grps != null && { label: 'GRPs', value: String(raw.grps) },
    raw.totalTVR != null && { label: 'Total TVR', value: raw.totalTVR.toFixed(1) },
  ].filter(Boolean);

  const dstvGotvTooltipRows = (raw) => {
    const fmt = (v, isImpacts) => (typeof v === 'number' ? (isImpacts ? v.toFixed(1) + ' M' : v) : v);
    const isImpacts = raw?.name === 'Impacts (M)';
    return [
      { label: 'DStv', value: fmt(raw?.DStv, isImpacts) },
      { label: 'GOtv', value: fmt(raw?.GOtv, isImpacts) },
    ];
  };

  const channelTooltipRows = (raw) => [
    raw.platform && { label: 'Platform', value: raw.platform },
    { label: 'Channel', value: raw.channel ?? raw.name },
    { label: 'TVR', value: (raw.tvr ?? raw.value)?.toFixed?.(1) ?? raw.tvr ?? raw.value },
    raw.impacts != null && { label: 'Impacts', value: formatNum(raw.impacts) },
  ].filter(Boolean);

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <BrandLogos className="header-logos" />
        <p className="header-eyebrow">Opay Terrestrial Cable Integrated Marketing</p>
        <h1 className="header-title">Opay TVC Report</h1>
        {view !== 'growth' && view !== 'campaign-overview' && (
          <div className="header-controls">
            <label className="granularity-label">
              Period
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="granularity-select"
              >
                <option value="decjan">Dec/Jan 2026</option>
                <option value="feb">February 2026</option>
              </select>
            </label>
          </div>
        )}
      </header>

      {/* Navigation */}
      <nav className="view-nav">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            className={`view-nav-btn ${view === v.id ? 'active' : ''}`}
            onClick={() => setView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </nav>

      {/* Central display */}
      <main className={`view-content ${view === 'top-channels' ? 'view-content--top-channels' : ''}`}>
        {view === 'campaign-overview' && (() => {
          const terrImpactByChannel = [...terrestrialChannelsFeb].sort((a, b) => b.impacts - a.impacts).slice(0, 6).map((r) => ({ name: r.channel, value: r.impacts / 1e6, fill: COLORS.terrestrial }));
          const cableImpactByChannel = [...cableChannelsFeb].sort((a, b) => b.impacts - a.impacts).slice(0, 6).map((r) => ({ name: (r.platform ? r.platform + ' ' : '') + r.channel, value: r.impacts / 1e6, fill: r.platform === 'DStv' ? COLORS.dstv : COLORS.gotv }));
          const overviewMetric = (iconKey, label, prevNum, currNum, colorClass, format = (v) => String(v)) => {
            const pctStr = pctChange(prevNum, currNum) ?? '0.0';
            const num = pctChangeNum(prevNum, currNum);
            const isPos = num >= 0;
            const barPct = Math.min(100, Math.abs(num));
            const prevD = format(prevNum);
            const currD = format(currNum);
            return (
              <div key={label} className="overview-metric-row" title={`Previous: ${prevD} → Current: ${currD} (${pctStr}%)`}>
                <span className="overview-metric-icon" aria-hidden="true">{OVERVIEW_ICONS[iconKey]}</span>
                <div className="overview-metric-body">
                  <span className="overview-metric-label">{label}</span>
                  <span className={`overview-metric-values ${colorClass}`}>{prevD} → {currD}</span>
                  <div className="overview-metric-bar-wrap">
                    <div className="overview-metric-bar-bg" />
                    <div className={`overview-metric-bar-fill ${isPos ? 'positive' : 'negative'}`} style={{ width: barPct + '%' }} />
                  </div>
                </div>
                <span className={`overview-metric-change ${isPos ? 'positive' : 'negative'}`} title={`${pctStr}%`}>
                  {isPos ? '↑' : '↓'} {pctStr}%
                </span>
              </div>
            );
          };
          return (
            <div className="view-content-stack overview-two-col">
              <h3 className="chart-title overview-page-title">Campaign overview — Dec/Jan vs February</h3>
              <div className="overview-cards">
                <div className="overview-card overview-card--terrestrial">
                  <div className="overview-card-header">
                    <h4>Terrestrial (Funita)</h4>
                    <div className="overview-hero-kpi">
                      <span className="overview-hero-value">{tFeb.householdsReachedM}</span>
                      <span className="overview-hero-unit">M reach</span>
                      <span className="overview-hero-change positive">↑ {pctChange(tDec.householdsReachedM, tFeb.householdsReachedM)}%</span>
                    </div>
                  </div>
                  <div className="overview-metrics">
                    {overviewMetric('reach', 'Total reach (HH M)', tDec.householdsReachedM, tFeb.householdsReachedM, 'color-terrestrial', (v) => v + ' M')}
                    {overviewMetric('spots', 'Total spots', tDec.spots, tFeb.spots, 'color-terrestrial')}
                    {overviewMetric('frequency', 'Avg. frequency', tDec.avgFrequency, tFeb.avgFrequency, 'color-terrestrial', (v) => v.toFixed(1))}
                    {overviewMetric('tvr', 'Total TVR', tDec.totalTVR, tFeb.totalTVR, 'color-terrestrial', (v) => v.toFixed(1))}
                  </div>
                  <div className="overview-mini-chart">
                    <h5>Reach by channel (Feb)</h5>
                    <ResponsiveContainer width="100%" height={140}>
                      <BarChart data={terrImpactByChannel} layout="vertical" margin={{ left: 50, right: 8, top: 4, bottom: 4 }}>
                        <XAxis type="number" tickFormatter={(v) => v + 'M'} />
                        <YAxis type="category" dataKey="name" width={48} tick={{ fontSize: 9 }} />
                        <Tooltip formatter={(v) => [v.toFixed(2) + 'M reach', 'Reach']} />
                        <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                          {terrImpactByChannel.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overview-spark">
                    <span className="overview-spark-label">Reach trend</span>
                    <ResponsiveContainer width="100%" height={36}>
                      <BarChart data={[{ period: 'Dec/Jan', value: tDec.householdsReachedM }, { period: 'Feb', value: tFeb.householdsReachedM }]} margin={{ top: 2, right: 4, bottom: 2, left: 4 }}>
                        <XAxis dataKey="period" tick={{ fontSize: 10 }} />
                        <YAxis hide domain={[0, 40]} />
                        <Bar dataKey="value" fill={COLORS.terrestrial} radius={[2, 2, 0, 0]} />
                        <Tooltip formatter={(v) => [v + ' M', 'Reach']} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <InsightAccordion>{INSIGHTS.campaignOverviewTerrestrial}</InsightAccordion>
                </div>
                <div className="overview-card overview-card--cable">
                  <div className="overview-card-header">
                    <h4>Cable (DStv + GOtv)</h4>
                    <div className="overview-hero-kpi">
                      <span className="overview-hero-value">{cFeb.householdsReachedM}</span>
                      <span className="overview-hero-unit">M reach</span>
                      <span className="overview-hero-change positive">↑ {pctChange(cDec.householdsReachedM, cFeb.householdsReachedM)}%</span>
                    </div>
                  </div>
                  <div className="overview-metrics">
                    {overviewMetric('reach', 'Total reach (HH M)', cDec.householdsReachedM, cFeb.householdsReachedM, 'color-cable', (v) => v + ' M')}
                    {overviewMetric('spots', 'Total spots', cDec.spots, cFeb.spots, 'color-cable')}
                    {overviewMetric('frequency', 'Avg. frequency', cDec.avgFrequency, cFeb.avgFrequency, 'color-cable', (v) => v.toFixed(1))}
                    {overviewMetric('grps', 'GRPs', cDec.grps, cFeb.grps, 'color-cable')}
                  </div>
                  <div className="overview-mini-chart">
                    <h5>Impacts by channel (Feb)</h5>
                    <ResponsiveContainer width="100%" height={140}>
                      <BarChart data={cableImpactByChannel} layout="vertical" margin={{ left: 50, right: 8, top: 4, bottom: 4 }}>
                        <XAxis type="number" tickFormatter={(v) => v + 'M'} />
                        <YAxis type="category" dataKey="name" width={48} tick={{ fontSize: 9 }} />
                        <Tooltip formatter={(v) => [v.toFixed(2) + 'M impacts', 'Impacts']} />
                        <Bar dataKey="value" radius={[0, 3, 3, 0]}>
                          {cableImpactByChannel.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="overview-spark">
                    <span className="overview-spark-label">Reach trend</span>
                    <ResponsiveContainer width="100%" height={36}>
                      <BarChart data={[{ period: 'Dec/Jan', value: cDec.householdsReachedM }, { period: 'Feb', value: cFeb.householdsReachedM }]} margin={{ top: 2, right: 4, bottom: 2, left: 4 }}>
                        <XAxis dataKey="period" tick={{ fontSize: 10 }} />
                        <YAxis hide domain={[0, 40]} />
                        <Bar dataKey="value" fill={COLORS.gotv} radius={[2, 2, 0, 0]} />
                        <Tooltip formatter={(v) => [v + ' M', 'Reach']} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <InsightAccordion>{INSIGHTS.campaignOverviewCable}</InsightAccordion>
                </div>
              </div>
            </div>
          );
        })()}

        {view === 'reach' && (
          <>
            <div className="chart-large">
              <h3 className="chart-title">Cable vs Terrestrial — Households reached (M)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reachCompareData} layout="vertical" margin={{ left: 80, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" domain={[0, 40]} tickFormatter={(v) => v + 'M'} />
                    <YAxis type="category" dataKey="name" width={90} />
                    <Tooltip content={<ChartTooltip rows={reachTooltipRows} />} cursor={{ fill: 'rgba(13, 92, 46, 0.08)' }} />
                    <Bar
                      dataKey="value"
                      radius={[0, 6, 6, 0]}
                      name="Households (M)"
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: periodLabel, rows: reachTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    >
                      {reachCompareData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.reachHouseholds}</InsightAccordion>
            </div>
            <div className="chart-small">
              <h3 className="chart-title">Share of reach</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reachPieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: periodLabel, rows: reachTooltipRows(data) })}
                    >
                      {reachPieData.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip rows={reachTooltipRows} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.reachSharePie}</InsightAccordion>
            </div>
            <div className="chart-large chart-full">
              <h3 className="chart-title">Spots &amp; avg. frequency</h3>
              <div className="chart-inner chart-inner-short">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={spotsFreqData} margin={{ top: 12, right: 24, left: 12, bottom: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<ChartTooltip rows={spotsFreqTooltipRows} />} cursor={{ fill: 'rgba(13, 92, 46, 0.08)' }} />
                    <Legend />
                    <Bar
                      yAxisId="left"
                      dataKey="spots"
                      fill={COLORS.cable}
                      name="Spots"
                      radius={[4, 4, 0, 0]}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: 'Spots & frequency', rows: spotsFreqTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="frequency"
                      fill={COLORS.orange}
                      name="Avg. frequency"
                      radius={[4, 4, 0, 0]}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: 'Spots & frequency', rows: spotsFreqTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.reachSpotsFreq}</InsightAccordion>
            </div>
          </>
        )}

        {view === 'growth' && (
          <div className="view-content-stack">
            <div className="chart-large">
              <h3 className="chart-title">Household reach over time (M)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={periodTimeline} margin={{ top: 12, right: 24, left: 12, bottom: 12 }}>
                    <defs>
                      <linearGradient id="colorCableHH" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.cable} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={COLORS.cable} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorTerrHH" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.terrestrialAlt} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={COLORS.terrestrialAlt} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 40]} tickFormatter={(v) => v + 'M'} />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const raw = payload[0]?.payload;
                        return (
                          <ChartTooltip
                            active={active}
                            payload={payload}
                            label={label}
                            rows={() => [
                              { label: 'Period', value: raw?.period ?? label },
                              { label: 'Cable (HH M)', value: raw?.cableHH != null ? raw.cableHH + ' M' : '—' },
                              { label: 'Terrestrial (HH M)', value: raw?.terrestrialHH != null ? raw.terrestrialHH + ' M' : '—' },
                            ]}
                          />
                        );
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="cableHH"
                      name="Cable (HH M)"
                      stroke={COLORS.cable}
                      fill="url(#colorCableHH)"
                      strokeWidth={2}
                      style={{ cursor: 'pointer' }}
                      onClick={(data) => setDrillDown({
                        title: data.period,
                        subtitle: 'Household reach & spots',
                        rows: [
                          { label: 'Cable (HH M)', value: data.cableHH + ' M' },
                          { label: 'Terrestrial (HH M)', value: data.terrestrialHH + ' M' },
                          { label: 'Cable spots', value: String(data.cableSpots) },
                          { label: 'Terrestrial spots', value: String(data.terrestrialSpots) },
                        ],
                      })}
                    />
                    <Area
                      type="monotone"
                      dataKey="terrestrialHH"
                      name="Terrestrial (HH M)"
                      stroke={COLORS.terrestrialAlt}
                      fill="url(#colorTerrHH)"
                      strokeWidth={2}
                      style={{ cursor: 'pointer' }}
                      onClick={(data) => setDrillDown({
                        title: data.period,
                        subtitle: 'Household reach & spots',
                        rows: [
                          { label: 'Cable (HH M)', value: data.cableHH + ' M' },
                          { label: 'Terrestrial (HH M)', value: data.terrestrialHH + ' M' },
                          { label: 'Cable spots', value: String(data.cableSpots) },
                          { label: 'Terrestrial spots', value: String(data.terrestrialSpots) },
                        ],
                      })}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.growthHouseholdReach}</InsightAccordion>
            </div>
            <div className="chart-small">
              <h3 className="chart-title">Spots over time</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={periodTimeline} margin={{ top: 12, right: 24, left: 12, bottom: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip
                      content={({ active, payload, label }) => {
                        if (!active || !payload?.length) return null;
                        const raw = payload[0]?.payload;
                        return (
                          <ChartTooltip
                            active={active}
                            payload={payload}
                            label={label}
                            rows={() => [
                              { label: 'Period', value: raw?.period ?? label },
                              { label: 'Cable spots', value: String(raw?.cableSpots ?? '—') },
                              { label: 'Terrestrial spots', value: String(raw?.terrestrialSpots ?? '—') },
                            ]}
                          />
                        );
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="cableSpots" name="Cable spots" stroke={COLORS.cable} strokeWidth={2} dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="terrestrialSpots" name="Terrestrial spots" stroke={COLORS.terrestrialAlt} strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.growthSpots}</InsightAccordion>
            </div>
          </div>
        )}

        {view === 'dstv-gotv' && (
          <>
            <div className="chart-large">
              <h3 className="chart-title">DStv vs GOtv — {periodLabel}</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dstvVsGotvData} margin={{ top: 12, right: 24, left: 12, bottom: 12 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip content={<ChartTooltip rows={dstvGotvTooltipRows} />} cursor={{ fill: 'rgba(13, 92, 46, 0.08)' }} />
                    <Legend />
                    <Bar
                      dataKey="DStv"
                      fill={COLORS.dstv}
                      name="DStv"
                      radius={[4, 4, 0, 0]}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: 'DStv vs GOtv — ' + periodLabel, rows: dstvGotvTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    />
                    <Bar
                      dataKey="GOtv"
                      fill={COLORS.gotv}
                      name="GOtv"
                      radius={[4, 4, 0, 0]}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: 'DStv vs GOtv — ' + periodLabel, rows: dstvGotvTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.dstvGotvBar}</InsightAccordion>
            </div>
            <div className="chart-small-group">
              <div className="chart-small">
                <h3 className="chart-title">Reach share ({periodShort})</h3>
                <div className="chart-inner chart-inner-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={cableSharePie}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        onClick={(data) => setDrillDown({
                          title: data.name,
                          subtitle: 'Cable reach share — ' + periodLabel,
                          rows: [
                            { label: 'Households reached', value: data.value + ' M' },
                            { label: 'Share', value: (cableShareTotal ? (data.value / cableShareTotal) * 100 : 0).toFixed(1) + '%' },
                          ],
                        })}
                      >
                        {cableSharePie.map((entry, i) => (<Cell key={i} fill={entry.fill} style={{ cursor: 'pointer' }} />))}
                      </Pie>
                      <Tooltip content={({ payload }) => payload?.[0] && (
                        <ChartTooltip
                          active
                          payload={payload}
                          rows={(raw) => [{ label: raw.name, value: raw.value + ' M households' }]}
                        />
                      )} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <InsightAccordion>{INSIGHTS.dstvGotvReachShare}</InsightAccordion>
              </div>
              <div className="chart-small">
                <h3 className="chart-title">Reach comparison</h3>
                <div className="chart-inner chart-inner-sm">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart innerRadius="50%" outerRadius="90%" data={radialReach} startAngle={180} endAngle={0}>
                      <RadialBar background dataKey="value" nameKey="name" cornerRadius={8} />
                      <Legend />
                      <Tooltip formatter={(value) => [value?.toFixed?.(0) + '% of 40M scale', 'Reach']} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <InsightAccordion>{INSIGHTS.dstvGotvRadial}</InsightAccordion>
              </div>
            </div>
          </>
        )}

        {view === 'top-channels' && (
          <>
            <div className="chart-large">
              <h3 className="chart-title">Top channels by TVR — Terrestrial (Funita)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topTerr} layout="vertical" margin={{ left: 130, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="channel" width={125} tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTooltip rows={channelTooltipRows} />} cursor={{ fill: 'rgba(13, 92, 46, 0.08)' }} />
                    <Bar
                      dataKey="tvr"
                      name="TVR"
                      fill={COLORS.terrestrial}
                      radius={[0, 4, 4, 0]}
                      onClick={(data) => setDrillDown({ title: data.channel, subtitle: 'Terrestrial (Funita) · ' + periodLabel, rows: channelTooltipRows({ ...data, platform: null }) })}
                      style={{ cursor: 'pointer' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.topChannelsTerrestrial}</InsightAccordion>
            </div>
            <div className="chart-small chart-small--with-legend">
              <h3 className="chart-title">Top 5 Terrestrial (TVR share)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ bottom: 20 }}>
                    <Pie
                      data={topTerrPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="42%"
                      outerRadius="65%"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      onClick={(data) => {
                        const full = topTerr.find((r) => r.channel === data.name) ?? data;
                        setDrillDown({ title: full.channel ?? data.name, subtitle: 'Terrestrial · ' + periodLabel, rows: channelTooltipRows({ ...full, name: full.channel }) });
                      }}
                    >
                      {topTerrPie.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 8 }} formatter={(value) => value} />
                    <Tooltip content={<ChartTooltip rows={(raw) => channelTooltipRows({ ...raw, channel: raw.name, tvr: raw.value })} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.topChannelsTerrestrialPie}</InsightAccordion>
            </div>
            <div className="chart-large">
              <h3 className="chart-title">Top channels by TVR — Cable (DStv + GOtv)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topCable} layout="vertical" margin={{ left: 130, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="channel" width={125} tick={{ fontSize: 11 }} />
                    <Tooltip content={<ChartTooltip rows={channelTooltipRows} />} cursor={{ fill: 'rgba(13, 92, 46, 0.08)' }} />
                    <Bar
                      dataKey="tvr"
                      name="TVR"
                      radius={[0, 4, 4, 0]}
                      onClick={(data) => setDrillDown({ title: data.channel, subtitle: (data.platform ?? 'Cable') + ' · ' + periodLabel, rows: channelTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    >
                      {topCable.map((entry, i) => (
                        <Cell key={i} fill={entry.platform === 'DStv' ? COLORS.dstv : COLORS.gotv} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.topChannelsCable}</InsightAccordion>
            </div>
            <div className="chart-small chart-small--with-legend">
              <h3 className="chart-title">Top 5 Cable (TVR share)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart margin={{ bottom: 20 }}>
                    <Pie
                      data={topCablePie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="42%"
                      outerRadius="65%"
                      label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                      onClick={(data) => {
                        const full = topCable.find((r) => r.channel === data.name) ?? data;
                        setDrillDown({ title: full.channel ?? data.name, subtitle: (full.platform ?? 'Cable') + ' · ' + periodLabel, rows: channelTooltipRows({ ...full, name: full.channel }) });
                      }}
                    >
                      {topCablePie.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                    <Legend layout="vertical" verticalAlign="bottom" align="center" wrapperStyle={{ paddingTop: 8 }} formatter={(value) => value} />
                    <Tooltip content={<ChartTooltip rows={(raw) => channelTooltipRows({ ...raw, channel: raw.name, tvr: raw.value, platform: topCable.find((r) => r.channel === raw.name)?.platform })} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{INSIGHTS.topChannelsCablePie}</InsightAccordion>
            </div>
          </>
        )}

        {view === 'audience-demographics' && (() => {
          const selectedChannel = audienceChannels.find((c) => c.id === selectedAudienceChannel) ?? audienceChannels[0];
          const LINE_COLORS = [COLORS.terrestrial, COLORS.terrestrialAlt, COLORS.orange, COLORS.purple, COLORS.gotv];
          return (
            <div className="view-content-stack audience-demographics-view">
              <p className="chart-subtitle">Source: Funita — Your Target Customers spend time watching (Feb 2026).</p>

              {/* Audience Overview */}
              <h3 className="chart-title section-heading">Audience overview (average across all channels)</h3>
              <div className="demographics-grid">
                <div className="chart-small">
                  <h3 className="chart-title">Average gender breakdown</h3>
                  <div className="chart-inner chart-inner-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={audienceAverageGender} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" label={({ name, value }) => `${name} ${value}%`}>
                          {audienceAverageGender.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                        </Pie>
                        <Tooltip formatter={(value) => [value + '%', 'Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <InsightAccordion>{INSIGHTS.audienceOverviewGender}</InsightAccordion>
                </div>
                <div className="chart-small">
                  <h3 className="chart-title">Average age group distribution</h3>
                  <div className="chart-inner chart-inner-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={audienceAverageAgeGroups} layout="vertical" margin={{ left: 70, right: 24 }}>
                        <XAxis type="number" domain={[0, 45]} />
                        <YAxis type="category" dataKey="ageGroup" width={65} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(value) => [value + '%', 'Share']} />
                        <Bar dataKey="percentage" name="%" fill={COLORS.terrestrial} radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <InsightAccordion>{INSIGHTS.audienceOverviewAge}</InsightAccordion>
                </div>
              </div>
              <div className="chart-large">
                <h3 className="chart-title">Audience reach by time of day (all channels, relative 0–100)</h3>
                <div className="chart-inner">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={audienceFlowMultiLine} margin={{ top: 12, right: 24, left: 12, bottom: 12 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="timeSlot" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      {channelsWithFlow.map((ch, i) => (
                        <Line key={ch.id} type="monotone" dataKey={ch.id} name={ch.name} stroke={LINE_COLORS[i % LINE_COLORS.length]} strokeWidth={2} dot={{ r: 2 }} />
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <InsightAccordion>{INSIGHTS.audienceOverviewTime}</InsightAccordion>
              </div>

              {/* Channel filter + per-channel section */}
              <h3 className="chart-title section-heading">View by channel</h3>
              <div className="audience-channel-filter">
                <label htmlFor="audience-channel-select" className="audience-channel-label">Channel</label>
                <select
                  id="audience-channel-select"
                  className="granularity-select audience-channel-select"
                  value={selectedAudienceChannel}
                  onChange={(e) => setSelectedAudienceChannel(e.target.value)}
                >
                  {audienceChannels.map((ch) => (
                    <option key={ch.id} value={ch.id}>{ch.name}</option>
                  ))}
                </select>
              </div>
              <div className="demographics-grid">
                <div className="chart-small">
                  <h3 className="chart-title">Gender breakdown — {selectedChannel.name}</h3>
                  <div className="chart-inner chart-inner-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={selectedChannel.gender} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius="80%" label={({ name, value }) => `${name} ${value}%`}>
                          {selectedChannel.gender.map((entry, i) => (<Cell key={i} fill={entry.fill} />))}
                        </Pie>
                        <Tooltip formatter={(value) => [value + '%', 'Share']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div className="chart-small">
                  <h3 className="chart-title">Age group distribution — {selectedChannel.name}</h3>
                  <div className="chart-inner chart-inner-sm">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedChannel.ageGroups} layout="vertical" margin={{ left: 70, right: 24 }}>
                        <XAxis type="number" domain={[0, 45]} />
                        <YAxis type="category" dataKey="ageGroup" width={65} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(value) => [value + '%', 'Share']} />
                        <Bar dataKey="percentage" name="%" fill={COLORS.terrestrial} radius={[0, 4, 4, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {selectedChannel.audienceFlow ? (
                <div className="chart-large">
                  <h3 className="chart-title">Audience reach by time of day — {selectedChannel.name}</h3>
                  <div className="chart-inner">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={selectedChannel.audienceFlow} margin={{ top: 12, right: 24, left: 12, bottom: 12 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                        <XAxis dataKey="timeSlot" />
                        <YAxis />
                        <Tooltip content={({ active, payload }) => active && payload?.[0] && (
                          <ChartTooltip active payload={payload} label={payload[0].payload.timeSlot} rows={() => [{ label: 'Relative viewership', value: payload[0].value }]} />
                        )} />
                        <Line type="monotone" dataKey="value" name="Viewership" stroke={COLORS.terrestrial} strokeWidth={2} dot={{ r: 3 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              ) : (
                <p className="chart-subtitle">No numeric audience flow data for this channel in the report (ROK uses text descriptors).</p>
              )}
              <InsightAccordion>{INSIGHTS.audienceChannelDetail}</InsightAccordion>
            </div>
          );
        })()}

        {view === 'top-programs' && (
          <div className="view-content-stack" style={{ width: '100%' }}>
            <div className="chart-large">
              <h3 className="chart-title">Terrestrial program performance — {periodLabel}</h3>
              <div className="programs-table-wrap">
                <table className="programs-table">
                  <thead>
                    <tr>
                      <th onClick={() => { setProgramSortKey('channel'); setProgramSortAsc((a) => !a); }} className="sortable">Channel</th>
                      <th onClick={() => { setProgramSortKey('program'); setProgramSortAsc((a) => !a); }} className="sortable">Program</th>
                      <th onClick={() => { setProgramSortKey('totalTVR'); setProgramSortAsc((a) => !a); }} className="sortable">Total TVR</th>
                      <th onClick={() => { setProgramSortKey('impacts'); setProgramSortAsc((a) => !a); }} className="sortable">Reach</th>
                      <th onClick={() => { setProgramSortKey('insertions'); setProgramSortAsc((a) => !a); }} className="sortable">Insertions</th>
                      <th onClick={() => { setProgramSortKey('avgFrequency'); setProgramSortAsc((a) => !a); }} className="sortable">Avg. frequency</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terrestrialPrograms.map((row, i) => (
                      <tr key={i}>
                        <td>{row.channel}</td>
                        <td>{row.program}</td>
                        <td>{row.totalTVR.toFixed(1)}</td>
                        <td>{formatNum(row.impacts)}</td>
                        <td>{row.insertions}</td>
                        <td>{row.avgFrequency.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <InsightAccordion>{INSIGHTS.topProgramsTable}</InsightAccordion>
            </div>
            <div className="chart-large">
              <h3 className="chart-title">Viewership by time slot (CNN Mon–Fri, relative level)</h3>
              <div className="heatmap-wrap">
                <div className="heatmap-grid">
                  {cnnAudienceFlowByHour.map((row, i) => (
                    <div key={i} className="heatmap-cell" style={{ backgroundColor: `rgba(13, 92, 46, ${0.15 + (row.viewership / 100) * 0.85})` }} title={`${row.timeSlot}: ${row.viewership}`}>
                      <span className="heatmap-label">{row.timeSlot}</span>
                      <span className="heatmap-value">{row.viewership}</span>
                    </div>
                  ))}
                </div>
              </div>
              <InsightAccordion>{INSIGHTS.topProgramsHeatmap}</InsightAccordion>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <BrandLogos className="footer-logos" />
        <p className="footer-credit">Data: Funita x OPAY Campaign Reports (Dec/Jan & Feb 2026), OPay DMS Post Campaign. Opay TVC Report.</p>
      </footer>

      <DrillDownPanel drillDown={drillDown} onClose={() => setDrillDown(null)} />
    </div>
  );
}
