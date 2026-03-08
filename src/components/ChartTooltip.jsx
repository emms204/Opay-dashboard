/**
 * Custom tooltip for Recharts that shows granular detail (multiple metrics) on hover.
 * Use as <Tooltip content={<ChartTooltip />} /> or <Tooltip content={(props) => <ChartTooltip {...props} rows={...} />} />
 */
export function ChartTooltip({ active, payload, label, rows }) {
  if (!active || !payload?.length) return null;

  const raw = payload[0]?.payload;
  const list = rows
    ? rows(raw, label)
    : defaultRows(payload, label);

  if (!list?.length) return null;

  return (
    <div className="chart-tooltip">
      {label && <div className="chart-tooltip-title">{label}</div>}
      <ul className="chart-tooltip-list">
        {list.map((item, i) => (
          <li key={i}>
            <span className="chart-tooltip-label">{item.label}</span>
            <span className="chart-tooltip-value">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function defaultRows(payload, label) {
  const p = payload[0];
  const name = p?.name || '';
  const value = p?.value;
  if (value == null) return null;
  return [{ label: name, value: String(value) }];
}
