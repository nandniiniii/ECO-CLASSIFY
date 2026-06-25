import "./Logo.css";

export default function Logo({ size = 44 }) {
  return (
    <div className="eco-logo-wrap" style={{ width: size * 2.9, height: size }}>
      <svg viewBox="0 0 320 110" className="eco-logo-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a6e85f" />
            <stop offset="45%" stopColor="#5fa82e" />
            <stop offset="100%" stopColor="#234f10" />
          </linearGradient>
          <linearGradient id="bodyShade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2e5c14" />
            <stop offset="100%" stopColor="#16320a" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c4f27c" />
            <stop offset="100%" stopColor="#3d7a1e" />
          </linearGradient>
          <radialGradient id="lensGrad" cx="38%" cy="32%" r="75%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#cfcfcf" />
            <stop offset="100%" stopColor="#7a7a7a" />
          </radialGradient>
        </defs>

        <g transform="translate(5,5)">
          <path
            className="eco-logo-body"
            d="M10 20 C10 12 16 6 24 6 L150 6 C158 6 164 12 164 20 L164 90 C164 98 158 104 150 104 L24 104 C16 104 10 98 10 90 Z"
            fill="url(#bodyGrad)"
          />
          <path
            d="M150 6 C158 6 164 12 164 20 L164 90 C164 98 158 104 150 104 L120 104 L150 6 Z"
            fill="url(#bodyShade)"
            opacity="0.6"
          />
          <rect x="22" y="16" width="22" height="8" rx="2" fill="#f4f4f4" />

          <g transform="translate(95,55)" className="eco-logo-lens-group">
            <circle r="44" fill="#163005" />
            <circle r="38" fill="#fefefe" />
            <circle
              r="33"
              className="eco-logo-aperture"
              fill="none"
              stroke="#c8e23c"
              strokeWidth="6"
              strokeDasharray="6 8"
              strokeLinecap="round"
            />
            <circle r="23" fill="url(#lensGrad)" />
            <circle r="23" fill="none" stroke="#666" strokeWidth="1" />
          </g>

          <g transform="translate(140,8)" className="eco-logo-leaf">
            <path
              d="M0 35 C 8 15 25 0 45 0 C 38 18 28 30 8 38 Z"
              fill="url(#leafGrad)"
              stroke="#16320a"
              strokeWidth="1"
            />
            <path d="M0 35 C 10 22 25 10 42 3" fill="none" stroke="#16320a" strokeWidth="1.2" />
            <path
              d="M-10 42 C -5 25 8 12 25 6 C 18 22 10 32 -2 44 Z"
              fill="#7fc23f"
              stroke="#16320a"
              strokeWidth="1"
            />
          </g>
        </g>

        <text x="170" y="98" textAnchor="middle" fontFamily="Georgia, serif" fontSize="34" letterSpacing="2">
          <tspan fill="#a6e85f">ECO</tspan>
          <tspan fill="#e8e2d0">-</tspan>
          <tspan fill="#c4f27c">CLASSIFY</tspan>
        </text>
      </svg>
    </div>
  );
}
