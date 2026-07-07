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
  PieChart,
  Pie,
} from 'recharts';
import {
  terrestrial,
  periodTimeline,
  terrestrialChannelsDecJan,
  terrestrialChannelsFeb,
  terrestrialChannelsMar,
  terrestrialChannelsApr,
  terrestrialChannelsMay,
  terrestrialChannelsJun,
  terrestrialProgramsFeb,
  terrestrialProgramsDecJan,
  terrestrialProgramsMar,
  terrestrialProgramsApr,
  terrestrialProgramsMay,
  terrestrialProgramsJun,
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
import { getPeriodInsight, getStaticInsight } from './data/chartInsights';
import './App.css';

const COLORS = {
  terrestrial: '#2d9d5a',
  terrestrialAlt: '#2563eb',
  orange: '#e87c2b',
  purple: '#6b4c9a',
  accent: '#0d5c2e',
};

const VIEWS = [
  { id: 'campaign-overview', label: 'Campaign Overview' },
  { id: 'campaign-progression', label: 'Campaign Progression' },
  { id: 'reach', label: 'Reach' },
  { id: 'growth', label: 'Growth Over Time' },
  { id: 'top-channels', label: 'Top Channels' },
  { id: 'audience-demographics', label: 'Audience Demographics' },
  { id: 'top-programs', label: 'Top Programs' },
];

const PERIOD_OPTIONS = [
  { id: 'decjan', dataKey: 'decJan', label: 'Dec/Jan 2026', short: 'Dec/Jan' },
  { id: 'feb', dataKey: 'feb', label: 'February 2026', short: 'Feb' },
  { id: 'mar', dataKey: 'mar', label: 'March 2026', short: 'Mar' },
  { id: 'apr', dataKey: 'apr', label: 'April 2026', short: 'Apr' },
  { id: 'may', dataKey: 'may', label: 'May 2026', short: 'May' },
  { id: 'jun', dataKey: 'jun', label: 'June 2026', short: 'Jun' },
];

const LATEST_PERIOD = PERIOD_OPTIONS[PERIOD_OPTIONS.length - 1];

const PROGRESSION_PERIODS = [
  { id: 'decjan', short: 'Dec/Jan' },
  { id: 'feb', short: 'Feb' },
  { id: 'mar', short: 'Mar' },
  { id: 'apr', short: 'Apr' },
  { id: 'may', short: 'May' },
  { id: 'jun', short: 'Jun' },
];

const terrestrialChannelsByPeriod = {
  decjan: terrestrialChannelsDecJan,
  feb: terrestrialChannelsFeb,
  mar: terrestrialChannelsMar,
  apr: terrestrialChannelsApr,
  may: terrestrialChannelsMay,
  jun: terrestrialChannelsJun,
};

const terrestrialProgramsByPeriod = {
  decjan: terrestrialProgramsDecJan,
  feb: terrestrialProgramsFeb,
  mar: terrestrialProgramsMar,
  apr: terrestrialProgramsApr,
  may: terrestrialProgramsMay,
  jun: terrestrialProgramsJun,
};

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

/**
 * Classify the latest period step against the prior step.
 * Thresholds prevent small fluctuations from being mis-labeled.
 */
function classifyTrajectory(previousStep, latestStep) {
  if (latestStep < -2) return { label: 'Declining', tone: 'declining' };
  if (latestStep > previousStep + 5) return { label: 'Accelerating', tone: 'accelerating' };
  if (latestStep >= 0 && latestStep < previousStep - 5) return { label: 'Softening', tone: 'softening' };
  return { label: 'Stable', tone: 'stable' };
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
  const [period, setPeriod] = useState(LATEST_PERIOD.id);
  const [drillDown, setDrillDown] = useState(null);
  const [programSortKey, setProgramSortKey] = useState('totalTVR');
  const [programSortAsc, setProgramSortAsc] = useState(false);
  const [selectedAudienceChannel, setSelectedAudienceChannel] = useState('cnn');
  const [progressionNormalized, setProgressionNormalized] = useState(false);

  const periodMeta = PERIOD_OPTIONS.find((p) => p.id === period) ?? LATEST_PERIOD;
  const periodDataKey = periodMeta.dataKey;
  const t = terrestrial[periodDataKey];

  const periodLabel = periodMeta.label;
  const periodShort = periodMeta.short;

  const reachData = [{
    name: 'Terrestrial',
    value: t.householdsReachedM,
    fill: COLORS.terrestrial,
    spots: t.spots,
    frequency: t.avgFrequency,
    totalTVR: t.totalTVR,
  }];

  const spotsFreqData = [{
    name: 'Terrestrial',
    spots: t.spots,
    frequency: t.avgFrequency,
    householdsReachedM: t.householdsReachedM,
    totalTVR: t.totalTVR,
  }];

  const topTerr = (terrestrialChannelsByPeriod[period] ?? terrestrialChannelsByPeriod[LATEST_PERIOD.id])
    .slice()
    .sort((a, b) => b.tvr - a.tvr)
    .slice(0, 10);

  const topTerrPie = topTerr.slice(0, 5).map((r) => ({ name: r.channel, value: r.tvr, fill: COLORS.terrestrial }));
  const topTerrReachPie = topTerr.slice(0, 5).map((r) => ({ name: r.channel, value: r.impacts, fill: COLORS.terrestrial }));

  const terrestrialPrograms = (terrestrialProgramsByPeriod[period] ?? terrestrialProgramsByPeriod[LATEST_PERIOD.id]).slice();
  terrestrialPrograms.sort((a, b) => {
    const va = a[programSortKey];
    const vb = b[programSortKey];
    const cmp = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb));
    return programSortAsc ? cmp : -cmp;
  });

  const tDec = terrestrial.decJan;
  const tFeb = terrestrial.feb;
  const tMar = terrestrial.mar;
  const tApr = terrestrial.apr;
  const tMay = terrestrial.may;
  const tJun = terrestrial.jun;

  const reachTooltipRows = (raw) => [
    { label: 'Households reached', value: raw.value + ' M' },
    { label: 'Spots', value: String(raw.spots ?? '—') },
    { label: 'Avg. frequency', value: raw.frequency != null ? raw.frequency.toFixed(1) : '—' },
    raw.grps != null && { label: 'GRPs', value: String(raw.grps) },
    raw.totalTVR != null && { label: 'Total TVR', value: raw.totalTVR.toFixed(1) },
  ].filter(Boolean);

  const channelReachTooltipRows = (raw) => [
    { label: 'Channel', value: raw.name },
    { label: 'Reach (impacts)', value: formatNum(raw.value) },
  ];

  const spotsFreqTooltipRows = (raw) => [
    { label: 'Spots', value: String(raw.spots) },
    { label: 'Avg. frequency', value: raw.frequency.toFixed(1) },
    { label: 'Households (M)', value: raw.householdsReachedM + ' M' },
    raw.totalTVR != null && { label: 'Total TVR', value: raw.totalTVR.toFixed(1) },
  ].filter(Boolean);

  const channelTooltipRows = (raw) => [
    { label: 'Channel', value: raw.channel ?? raw.name },
    { label: 'TVR', value: (raw.tvr ?? raw.value)?.toFixed?.(1) ?? raw.tvr ?? raw.value },
    raw.impacts != null && { label: 'Impacts', value: formatNum(raw.impacts) },
  ].filter(Boolean);

  return (
    <div className="app">
      {/* Header */}
      <header className="site-header">
        <BrandLogos className="header-logos" />
        <p className="header-eyebrow">Opay Terrestrial TV Campaign</p>
        <h1 className="header-title">Opay TVC Report</h1>
        {view !== 'growth' && view !== 'campaign-overview' && view !== 'campaign-progression' && (
          <div className="header-controls">
            <label className="granularity-label">
              Period
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="granularity-select"
              >
                {PERIOD_OPTIONS.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
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
          const terrImpactByChannel = [...terrestrialChannelsJun].sort((a, b) => b.impacts - a.impacts).slice(0, 6).map((r) => ({ name: r.channel, value: r.impacts / 1e6, fill: COLORS.terrestrial }));
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
            <div className="view-content-stack overview-single-col">
              <h3 className="chart-title overview-page-title">Campaign overview — Dec/Jan vs June</h3>
              <div className="overview-cards">
                <div className="overview-card overview-card--terrestrial overview-card--full">
                  <div className="overview-card-header">
                    <h4>Terrestrial (Funita)</h4>
                    <div className="overview-hero-kpi">
                      <span className="overview-hero-value">{tJun.householdsReachedM}</span>
                      <span className="overview-hero-unit">M reach</span>
                      <span className={`overview-hero-change ${tJun.householdsReachedM >= tDec.householdsReachedM ? 'positive' : 'negative'}`}>
                        {tJun.householdsReachedM >= tDec.householdsReachedM ? '↑' : '↓'} {pctChange(tDec.householdsReachedM, tJun.householdsReachedM)}%
                      </span>
                    </div>
                  </div>
                  <div className="overview-metrics">
                    {overviewMetric('reach', 'Total reach (HH M)', tDec.householdsReachedM, tJun.householdsReachedM, 'color-terrestrial', (v) => v + ' M')}
                    {overviewMetric('spots', 'Total spots', tDec.spots, tJun.spots, 'color-terrestrial')}
                    {overviewMetric('frequency', 'Avg. frequency', tDec.avgFrequency, tJun.avgFrequency, 'color-terrestrial', (v) => v.toFixed(1))}
                    {overviewMetric('tvr', 'Total TVR', tDec.totalTVR, tJun.totalTVR, 'color-terrestrial', (v) => v.toFixed(1))}
                  </div>
                  <div className="overview-mini-chart">
                    <h5>Reach by channel (Jun)</h5>
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
                      <BarChart data={[
                        { period: 'Dec/Jan', value: tDec.householdsReachedM },
                        { period: 'Feb', value: tFeb.householdsReachedM },
                        { period: 'Mar', value: tMar.householdsReachedM },
                        { period: 'Apr', value: tApr.householdsReachedM },
                        { period: 'May', value: tMay.householdsReachedM },
                        { period: 'Jun', value: tJun.householdsReachedM },
                      ]} margin={{ top: 2, right: 4, bottom: 2, left: 4 }}>
                        <XAxis dataKey="period" tick={{ fontSize: 9 }} />
                        <YAxis hide domain={[0, 55]} />
                        <Bar dataKey="value" fill={COLORS.terrestrial} radius={[2, 2, 0, 0]} />
                        <Tooltip formatter={(v) => [v + ' M', 'Reach']} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <InsightAccordion>{getStaticInsight('campaignOverviewTerrestrial')}</InsightAccordion>
                </div>
              </div>
            </div>
          );
        })()}

        {view === 'campaign-progression' && (() => {
          const normalized = progressionNormalized;
          const norm = (val, periodKey, isRate) => {
            if (!isRate || !normalized) return val;
            if (periodKey === 'decjan') return val / 2;
            return val;
          };

          const fmtValue = (v, unit) => {
            if (v == null || Number.isNaN(v)) return '—';
            if (unit === 'M') return v.toFixed(1) + 'M';
            if (unit === 'x') return v.toFixed(1) + '×';
            if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
            return v.toFixed(1);
          };

          const fmtPct = (v) => {
            const sign = v >= 0 ? '+' : '−';
            return `${sign}${Math.abs(v).toFixed(1)}%`;
          };

          const kpiDefs = [
            { id: 'terr-reach', label: 'Household reach', unit: 'M', icon: OVERVIEW_ICONS.reach, isRate: false,
              getValue: (pid) => terrestrial[pid === 'decjan' ? 'decJan' : pid].householdsReachedM },
            { id: 'terr-spots', label: 'Spots', unit: '', icon: OVERVIEW_ICONS.spots, isRate: true,
              getValue: (pid) => terrestrial[pid === 'decjan' ? 'decJan' : pid].spots },
            { id: 'terr-freq', label: 'Avg. frequency', unit: 'x', icon: OVERVIEW_ICONS.frequency, isRate: false,
              getValue: (pid) => terrestrial[pid === 'decjan' ? 'decJan' : pid].avgFrequency },
            { id: 'terr-tvr', label: 'Total TVR', unit: '', icon: OVERVIEW_ICONS.tvr, isRate: true,
              getValue: (pid) => terrestrial[pid === 'decjan' ? 'decJan' : pid].totalTVR },
          ];

          const buildCard = (k) => {
            const series = PROGRESSION_PERIODS.map((p) => {
              const raw = k.getValue(p.id);
              return {
                ...p,
                raw,
                value: norm(raw, p.id, k.isRate),
              };
            });
            const first = series[0];
            const last = series[series.length - 1];
            const step4 = pctChangeNum(series.find((s) => s.id === 'apr')?.value ?? 0, series.find((s) => s.id === 'may')?.value ?? 0);
            const step5 = pctChangeNum(series.find((s) => s.id === 'may')?.value ?? 0, series.find((s) => s.id === 'jun')?.value ?? 0);
            const net = pctChangeNum(first.value, last.value);
            const step2 = pctChangeNum(series[1].value, series[2].value);
            const step3 = pctChangeNum(series[2].value, series[3].value);
            const tag = classifyTrajectory(step2, step3);
            const chartData = series.map((s) => ({ period: s.short, value: s.value }));

            return (
              <div key={k.id} className="progression-card progression-card--terrestrial">
                <div className="progression-card-head">
                  <span className="progression-card-icon" aria-hidden="true">{k.icon}</span>
                  <span className="progression-card-label">{k.label}</span>
                  <span className={`progression-tag progression-tag--${tag.tone}`}>{tag.label}</span>
                </div>
                <div className="progression-values progression-values--wide">
                  {series.map((s) => (
                    <div key={s.id} className="progression-value">
                      <span className="progression-value-period">{s.short}{s.id === 'decjan' && k.isRate && normalized ? ' /mo' : ''}</span>
                      <span className="progression-value-num">{fmtValue(s.value, k.unit)}</span>
                    </div>
                  ))}
                </div>
                <div className="progression-chart">
                  <ResponsiveContainer width="100%" height={50}>
                    <BarChart data={chartData} margin={{ top: 2, right: 4, bottom: 0, left: 4 }}>
                      <XAxis dataKey="period" tick={{ fontSize: 8, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Bar dataKey="value" fill={COLORS.terrestrial} radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="progression-deltas">
                  <span className="progression-delta">
                    <small>Apr→May</small>
                    <span className={step4 >= 0 ? 'positive' : 'negative'}>{fmtPct(step4)}</span>
                  </span>
                  <span className="progression-delta">
                    <small>May→Jun</small>
                    <span className={step5 >= 0 ? 'positive' : 'negative'}>{fmtPct(step5)}</span>
                  </span>
                  <span className="progression-delta progression-delta--net">
                    <small>Net</small>
                    <span className={net >= 0 ? 'positive' : 'negative'}>{fmtPct(net)}</span>
                  </span>
                </div>
              </div>
            );
          };

          const buildChannelSpark = (label, data, color, latest) => {
            const step2 = pctChangeNum(data[1].tvr, data[2].tvr);
            const step3 = pctChangeNum(data[data.length - 2].tvr, data[data.length - 1].tvr);
            const tag = classifyTrajectory(step2, step3);
            return (
              <li key={label} className="progression-channel-row">
                <span className="progression-channel-name">{label}</span>
                <div className="progression-channel-spark">
                  <ResponsiveContainer width="100%" height={30}>
                    <LineChart data={data} margin={{ top: 4, bottom: 4, left: 2, right: 2 }}>
                      <Line type="monotone" dataKey="tvr" stroke={color} strokeWidth={2} dot={{ r: 2, fill: color }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <span className="progression-channel-mar">{latest.toFixed(0)} TVR</span>
                <span className={`progression-tag progression-tag--${tag.tone}`}>{tag.label}</span>
              </li>
            );
          };

          const channelPeriodIds = ['decjan', 'feb', 'mar', 'apr', 'may', 'jun'];
          const channelMaps = {
            decjan: terrestrialChannelsDecJan,
            feb: terrestrialChannelsFeb,
            mar: terrestrialChannelsMar,
            apr: terrestrialChannelsApr,
            may: terrestrialChannelsMay,
            jun: terrestrialChannelsJun,
          };

          const topTerrTraj = [...terrestrialChannelsJun]
            .sort((a, b) => b.tvr - a.tvr)
            .slice(0, 5)
            .map((c) => ({
              channel: c.channel,
              data: channelPeriodIds.map((pid) => {
                const row = channelMaps[pid].find((x) => x.channel === c.channel);
                const tvr = row?.tvr ?? 0;
                return { period: PROGRESSION_PERIODS.find((p) => p.id === pid).short, tvr: norm(tvr, pid, true) };
              }),
              latest: c.tvr,
            }));

          return (
            <div className="view-content-stack progression-view">
              <div className="progression-header">
                <div className="progression-period-strip" aria-label="Period progression">
                  {PROGRESSION_PERIODS.map((p, i) => (
                    <span key={p.id}>
                      {i > 0 && <span className="progression-period-arrow" aria-hidden="true">→</span>}
                      <span className="progression-period-chip">{p.short}</span>
                    </span>
                  ))}
                </div>
                <label className="progression-toggle">
                  <input
                    type="checkbox"
                    checked={normalized}
                    onChange={(e) => setProgressionNormalized(e.target.checked)}
                  />
                  <span>Monthly-normalized{normalized ? ' · ON' : ''}</span>
                </label>
              </div>
              <p className="progression-subtitle">
                {normalized
                  ? 'Rate metrics (spots, TVR) are divided by 2 for Dec/Jan to put all six periods on a per-month basis. State metrics (household reach, frequency) are unchanged.'
                  : 'Raw totals as delivered. Dec/Jan covers ~2 months; Feb–Jun are single months.'}
              </p>

              <h3 className="chart-title progression-section-heading">KPI progression</h3>
              <div className="progression-grid">
                {kpiDefs.map(buildCard)}
              </div>

              <h3 className="chart-title progression-section-heading">Top channel trajectory — by June TVR</h3>
              <div className="progression-channels progression-channels--single">
                <div className="progression-channel-block">
                  <h4>Top 5 channels</h4>
                  <ul className="progression-channel-list">
                    {topTerrTraj.map((ch) => buildChannelSpark(ch.channel, ch.data, COLORS.terrestrial, ch.latest))}
                  </ul>
                </div>
              </div>

              <InsightAccordion>{getStaticInsight('campaignProgression')}</InsightAccordion>
            </div>
          );
        })()}

        {view === 'reach' && (
          <>
            <div className="chart-large">
              <h3 className="chart-title">Households reached (M) — {periodLabel}</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reachData} layout="vertical" margin={{ left: 80, right: 24 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis type="number" domain={[0, 55]} tickFormatter={(v) => v + 'M'} />
                    <YAxis type="category" dataKey="name" width={90} />
                    <Tooltip content={<ChartTooltip rows={reachTooltipRows} />} cursor={{ fill: 'rgba(13, 92, 46, 0.08)' }} />
                    <Bar
                      dataKey="value"
                      radius={[0, 6, 6, 0]}
                      name="Households (M)"
                      fill={COLORS.terrestrial}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: periodLabel, rows: reachTooltipRows(data) })}
                      style={{ cursor: 'pointer' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{getPeriodInsight('reachHouseholds', period)}</InsightAccordion>
            </div>
            <div className="chart-small">
              <h3 className="chart-title">Reach by channel (top 5)</h3>
              <div className="chart-inner">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topTerrReachPie}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius="80%"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      onClick={(data) => setDrillDown({ title: data.name, subtitle: periodLabel, rows: channelReachTooltipRows(data) })}
                    >
                      {topTerrReachPie.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} style={{ cursor: 'pointer' }} />
                      ))}
                    </Pie>
                    <Tooltip content={<ChartTooltip rows={channelReachTooltipRows} />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{getPeriodInsight('reachSharePie', period)}</InsightAccordion>
            </div>
            <div className="chart-large chart-full">
              <h3 className="chart-title">Spots &amp; avg. frequency — {periodShort}</h3>
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
                      fill={COLORS.accent}
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
              <InsightAccordion>{getPeriodInsight('reachSpotsFreq', period)}</InsightAccordion>
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
                      <linearGradient id="colorTerrHH" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.terrestrialAlt} stopOpacity={0.5} />
                        <stop offset="95%" stopColor={COLORS.terrestrialAlt} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="period" />
                    <YAxis domain={[0, 55]} tickFormatter={(v) => v + 'M'} />
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
                              { label: 'Households (M)', value: raw?.terrestrialHH != null ? raw.terrestrialHH + ' M' : '—' },
                              { label: 'Spots', value: String(raw?.terrestrialSpots ?? '—') },
                            ]}
                          />
                        );
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="terrestrialHH"
                      name="Households (M)"
                      stroke={COLORS.terrestrialAlt}
                      fill="url(#colorTerrHH)"
                      strokeWidth={2}
                      style={{ cursor: 'pointer' }}
                      onClick={(data) => setDrillDown({
                        title: data.period,
                        subtitle: 'Household reach & spots',
                        rows: [
                          { label: 'Households (M)', value: data.terrestrialHH + ' M' },
                          { label: 'Spots', value: String(data.terrestrialSpots) },
                          { label: 'Avg. frequency', value: data.terrestrialFreq?.toFixed?.(1) ?? '—' },
                        ],
                      })}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{getStaticInsight('growthHouseholdReach')}</InsightAccordion>
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
                              { label: 'Spots', value: String(raw?.terrestrialSpots ?? '—') },
                            ]}
                          />
                        );
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="terrestrialSpots" name="Spots" stroke={COLORS.terrestrialAlt} strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{getStaticInsight('growthSpots')}</InsightAccordion>
            </div>
          </div>
        )}

        {view === 'top-channels' && (
          <>
            <div className="chart-large">
              <h3 className="chart-title">Top channels by TVR — {periodLabel}</h3>
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
                      onClick={(data) => setDrillDown({ title: data.channel, subtitle: periodLabel, rows: channelTooltipRows({ ...data }) })}
                      style={{ cursor: 'pointer' }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <InsightAccordion>{getPeriodInsight('topChannelsTerrestrial', period)}</InsightAccordion>
            </div>
            <div className="chart-small chart-small--with-legend">
              <h3 className="chart-title">Top 5 channels (TVR share)</h3>
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
                        setDrillDown({ title: full.channel ?? data.name, subtitle: periodLabel, rows: channelTooltipRows({ ...full, name: full.channel }) });
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
              <InsightAccordion>{getPeriodInsight('topChannelsTerrestrialPie', period)}</InsightAccordion>
            </div>
          </>
        )}

        {view === 'audience-demographics' && (() => {
          const selectedChannel = audienceChannels.find((c) => c.id === selectedAudienceChannel) ?? audienceChannels[0];
          const LINE_COLORS = [COLORS.terrestrial, COLORS.terrestrialAlt, COLORS.orange, COLORS.purple, COLORS.accent];
          return (
            <div className="view-content-stack audience-demographics-view">
              <p className="chart-subtitle">Source: Funita — Your Target Customers spend time watching (May 2026).</p>

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
                  <InsightAccordion>{getPeriodInsight('audienceOverviewGender', period)}</InsightAccordion>
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
                  <InsightAccordion>{getPeriodInsight('audienceOverviewAge', period)}</InsightAccordion>
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
                <InsightAccordion>{getPeriodInsight('audienceOverviewTime', period)}</InsightAccordion>
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
              <InsightAccordion>{getPeriodInsight('audienceChannelDetail', period)}</InsightAccordion>
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
              <InsightAccordion>{getPeriodInsight('topProgramsTable', period)}</InsightAccordion>
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
              <InsightAccordion>{getPeriodInsight('topProgramsHeatmap', period)}</InsightAccordion>
            </div>
          </div>
        )}
      </main>

      <footer className="site-footer">
        <BrandLogos className="footer-logos" />
        <p className="footer-credit">Data: Funita x OPAY Campaign Reports (Dec/Jan–Jun 2026). Opay TVC Report.</p>
      </footer>

      <DrillDownPanel drillDown={drillDown} onClose={() => setDrillDown(null)} />
    </div>
  );
}
