import { useState } from 'react';

/**
 * Collapsible accordion that shows a data-driven insight below a chart.
 * Collapsed by default; expands to show the full insight text.
 */
export function InsightAccordion({ children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="insight-accordion">
      <button
        type="button"
        className="insight-accordion-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className="insight-accordion-label">Insight</span>
        <span className="insight-accordion-icon" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="insight-accordion-content">
          {children}
        </div>
      )}
    </div>
  );
}
