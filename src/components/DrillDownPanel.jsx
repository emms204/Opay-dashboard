/**
 * Panel shown when user clicks a chart segment. Displays deeper insights (key-value list).
 */
export function DrillDownPanel({ drillDown, onClose }) {
  if (!drillDown) return null;

  const { title, subtitle, rows } = drillDown;

  return (
    <div className="drill-down-overlay" onClick={onClose} role="presentation">
      <div className="drill-down-panel" onClick={(e) => e.stopPropagation()}>
        <div className="drill-down-header">
          <h4 className="drill-down-title">{title}</h4>
          {subtitle && <p className="drill-down-subtitle">{subtitle}</p>}
          <button type="button" className="drill-down-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <dl className="drill-down-list">
          {rows.map((row, i) => (
            <div key={i} className="drill-down-row">
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
        <p className="drill-down-hint">Click a chart segment to see more. Click outside to close.</p>
      </div>
    </div>
  );
}
