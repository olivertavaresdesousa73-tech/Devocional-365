import { useState } from 'react';
import { BookOpen } from 'lucide-react';

export function Logo({ size = 'md', showText = true }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const [imgError, setImgError] = useState(false);

  const sizeMap = {
    sm: { img: 36, text: 'text-base', sub: 'text-[10px]' },
    md: { img: 44, text: 'text-lg', sub: 'text-xs' },
    lg: { img: 56, text: 'text-2xl', sub: 'text-sm' },
  };

  const s = sizeMap[size];

  return (
    <div className="flex items-center gap-2.5 group">
      {/* Logo image from /images/logo.png */}
      <div className="relative flex-shrink-0 transition-transform duration-500 group-hover:scale-105">
        {!imgError ? (
          <img
            src="/images/logo.png"
            alt="Devocional 365"
            width={s.img}
            height={s.img}
            className="object-contain drop-shadow-sm"
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback caso a imagem não exista */
          <div
            className="bg-gradient-to-br from-sage to-sage-deep rounded-xl flex items-center justify-center shadow-md"
            style={{ width: s.img, height: s.img }}
          >
            <BookOpen className="text-white stroke-[2]" style={{ width: s.img * 0.5, height: s.img * 0.5 }} />
          </div>
        )}
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
