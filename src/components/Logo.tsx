export function Logo({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const sizeMap = {
    sm: { icon: 38, text: 'text-base', sub: 'text-[10px]' },
    md: { icon: 46, text: 'text-lg', sub: 'text-xs' },
    lg: { icon: 60, text: 'text-2xl', sub: 'text-sm' },
  };

  const s = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5 group">
      {/* SVG Logo — Bíblia + Lápis */}
      <div className="relative flex-shrink-0">
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform duration-500 group-hover:scale-105"
        >
          {/* Glow sutil atrás */}
          <defs>
            <linearGradient id="bibleGrad" x1="8" y1="6" x2="38" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8B7355" />
              <stop offset="100%" stopColor="#6B5B45" />
            </linearGradient>
            <linearGradient id="coverGrad" x1="10" y1="8" x2="36" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A0926B" />
              <stop offset="50%" stopColor="#8B7D5C" />
              <stop offset="100%" stopColor="#7A6C4F" />
            </linearGradient>
            <linearGradient id="pageGrad" x1="14" y1="10" x2="14" y2="46" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF8EE" />
              <stop offset="100%" stopColor="#F5EDD8" />
            </linearGradient>
            <linearGradient id="pencilBody" x1="36" y1="4" x2="44" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E8C36A" />
              <stop offset="50%" stopColor="#D4A843" />
              <stop offset="100%" stopColor="#C49B3A" />
            </linearGradient>
            <linearGradient id="pencilDark" x1="38" y1="4" x2="44" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#C9A035" />
              <stop offset="100%" stopColor="#B08A28" />
            </linearGradient>
            <filter id="softShadow" x="-4" y="-2" width="68" height="64" filterUnits="userSpaceOnUse">
              <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="#00000020" />
            </filter>
          </defs>

          <g filter="url(#softShadow)">
            {/* ══ BÍBLIA ══ */}
            {/* Lombada (spine) */}
            <rect x="7" y="7" width="6" height="40" rx="2" fill="url(#bibleGrad)" />
            <rect x="8" y="9" width="1.5" height="36" rx="0.75" fill="#9A8A6A" opacity="0.5" />

            {/* Capa traseira */}
            <rect x="10" y="8" width="26" height="39" rx="2.5" fill="url(#coverGrad)" />

            {/* Detalhe de textura da capa */}
            <rect x="12" y="11" width="22" height="33" rx="1.5" fill="none" stroke="#BDA96E" strokeWidth="0.5" opacity="0.4" />

            {/* Cruz dourada na capa */}
            <rect x="21.5" y="14" width="2" height="12" rx="0.5" fill="#D4B968" opacity="0.7" />
            <rect x="17.5" y="17.5" width="10" height="2" rx="0.5" fill="#D4B968" opacity="0.7" />

            {/* Páginas (efeito camadas) */}
            <rect x="12" y="10" width="23" height="36" rx="1.5" fill="#F0E6D0" />
            <rect x="12.5" y="10.5" width="22" height="35" rx="1" fill="#F5EDDA" />
            <rect x="13" y="11" width="21" height="34" rx="1" fill="url(#pageGrad)" />

            {/* Linhas de texto simuladas */}
            <line x1="16" y1="16" x2="30" y2="16" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="19.5" x2="28" y2="19.5" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="23" x2="31" y2="23" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="26.5" x2="27" y2="26.5" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="30" x2="30" y2="30" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="33.5" x2="26" y2="33.5" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="37" x2="29" y2="37" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="16" y1="40.5" x2="24" y2="40.5" stroke="#C9BFA8" strokeWidth="0.7" strokeLinecap="round" />

            {/* Marca-página (ribbon) */}
            <path d="M28 8 L28 18 L30.5 15.5 L33 18 L33 8" fill="#B85C5C" opacity="0.85" />

            {/* ══ LÁPIS ══ */}
            {/* Sombra do lápis */}
            <rect x="39" y="6" width="6.5" height="35" rx="1.2" fill="#00000010" transform="rotate(8 42 24)" />

            {/* Corpo do lápis */}
            <g transform="rotate(8 42 24)">
              {/* Corpo principal */}
              <rect x="39" y="5" width="6" height="33" rx="1" fill="url(#pencilBody)" />

              {/* Faixa escura (listra do lápis) */}
              <rect x="39" y="5" width="2.2" height="33" rx="0.5" fill="url(#pencilDark)" opacity="0.5" />

              {/* Faixa de reflexo (brilho) */}
              <rect x="43" y="5" width="1" height="33" rx="0.5" fill="#F0D878" opacity="0.4" />

              {/* Anel metálico (ferrule) */}
              <rect x="38.5" y="36" width="7" height="4" rx="0.8" fill="#C0B090" />
              <rect x="38.5" y="36.8" width="7" height="0.8" rx="0.3" fill="#A89870" />
              <rect x="38.5" y="38.5" width="7" height="0.8" rx="0.3" fill="#A89870" />

              {/* Borracha (eraser) */}
              <rect x="39.5" y="40" width="5" height="5" rx="1" fill="#E8A0A0" />
              <rect x="39.5" y="40" width="5" height="1.5" rx="0.5" fill="#D48888" opacity="0.5" />

              {/* Ponta do lápis */}
              <path d="M39 5 L42 -2 L45 5 Z" fill="#DEB960" />
              {/* Madeira exposta */}
              <path d="M40 5 L42 0 L44 5 Z" fill="#F0DDA0" />
              {/* Grafite */}
              <path d="M41.2 2 L42 -1.5 L42.8 2 Z" fill="#4A4A4A" />
            </g>
          </g>
        </svg>
      </div>

      {/* Texto do logo */}
      {showText && (
        <div className="flex flex-col">
          <p className={`font-display text-stone-800 font-extrabold ${s.text} leading-tight tracking-tight`}>
            Devocional <span className="text-sage-deep">365</span>
          </p>
          <p className={`font-hand text-sage-deep font-bold ${s.sub} leading-tight`}>
            Um dia de cada vez com Deus
          </p>
        </div>
      )}
    </div>
  );
}
