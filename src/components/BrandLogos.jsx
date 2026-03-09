import { useState } from 'react';

/**
 * Brand logos. Place images ending with "logo" in public/logos/:
 * - opay-logo.svg (or .png)
 * - funita-logo.svg
 * - dstv-logo.svg
 * - gotv-logo.svg
 */
const LOGOS = [
  { src: '/logos/opay-logo.svg', alt: 'OPay', name: 'OPay' },
  { src: '/logos/funita-logo.svg', alt: 'Terrestrial', name: 'Terrestrial' },
  { src: '/logos/dstv-logo.svg', alt: 'DStv', name: 'DStv' },
  { src: '/logos/gotv-logo.svg', alt: 'GOtv', name: 'GOtv' },
];

function LogoImg({ src, alt, name }) {
  const [attempt, setAttempt] = useState(0);
  const srcPng = src.replace(/\.svg$/i, '.png');
  const showFallback = attempt >= 2;
  const currentSrc = attempt === 0 ? src : srcPng;

  return (
    <div className="brand-logo">
      {!showFallback && (
        <img
          src={currentSrc}
          alt={alt}
          className="brand-logo-img"
          onError={() => setAttempt((a) => a + 1)}
        />
      )}
      {showFallback && <span className="brand-logo-fallback">{name}</span>}
    </div>
  );
}

export function BrandLogos({ className = '' }) {
  return (
    <div className={`brand-logos ${className}`.trim()}>
      {LOGOS.map((logo) => (
        <LogoImg key={logo.alt} src={logo.src} alt={logo.alt} name={logo.name} />
      ))}
    </div>
  );
}
