import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark, PenLine } from 'lucide-react';

interface MonthData {
  name: string;
  days: number;
  startDay: number;
  sampleDay: {
    dayNumber: number;
    yearDay: number;
    prayer: string;
    verse: string;
    verseRef: string;
    devotional: string;
  };
}

const months: MonthData[] = [
  {
    name: 'Fevereiro',
    days: 28,
    startDay: 6,
    sampleDay: {
      dayNumber: 14,
      yearDay: 45,
      prayer: 'Senhor, ensina-me a amar como Tu amas. Que meu coração reflita a Tua compaixão em cada encontro e cada palavra deste dia.',
      verse: 'O amor é paciente, o amor é bondoso. Não inveja, não se vangloria, não se orgulha.',
      verseRef: '1 Coríntios 13:4',
      devotional: 'Amar não é sobre intensidade, mas sobre constância. Deus não pede que você ame perfeitamente — Ele pede que você tente, todos os dias, um pouquinho mais. E isso já é suficiente.',
    },
  },
  {
    name: 'Março',
    days: 31,
    startDay: 6,
    sampleDay: {
      dayNumber: 15,
      yearDay: 74,
      prayer: 'Pai, renova minhas forças nesta manhã. Que eu encontre paz mesmo em meio à correria e que Tua presença me acompanhe.',
      verse: 'Aqueles que esperam no Senhor renovam as suas forças; sobem com asas como águias.',
      verseRef: 'Isaías 40:31',
      devotional: 'Renovar não é começar do zero. É permitir que Deus cuide das partes cansadas de você enquanto te sustenta para seguir em frente. Descanse n\'Ele hoje.',
    },
  },
  {
    name: 'Abril',
    days: 30,
    startDay: 2,
    sampleDay: {
      dayNumber: 10,
      yearDay: 100,
      prayer: 'Deus, me dá coragem para confiar mesmo quando não entendo os Teus caminhos. Que minha fé seja maior que o meu medo.',
      verse: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.',
      verseRef: 'Provérbios 3:5',
      devotional: 'Confiar é um ato de fé silencioso. É acordar sem saber o que o dia reserva e ainda assim dizer: "Deus, estou nas Tuas mãos." Hoje, pratique esse ato.',
    },
  },
];

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function InteractivePreview() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right');
  const [animateContent, setAnimateContent] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const goToMonth = (index: number) => {
    if (index === currentMonth || isTransitioning) return;
    setSlideDir(index > currentMonth ? 'right' : 'left');
    setIsTransitioning(true);
    setAnimateContent(false);
    setTimeout(() => {
      setCurrentMonth(index);
      setTimeout(() => {
        setIsTransitioning(false);
        setAnimateContent(true);
      }, 50);
    }, 350);
  };

  // Reset animation when month changes
  useEffect(() => {
    if (animateContent && contentRef.current) {
      const children = contentRef.current.querySelectorAll('.content-item');
      children.forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(16px)';
        setTimeout(() => {
          el.style.transition = 'all 0.5s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 100 + i * 120);
      });
    }
  }, [animateContent, currentMonth]);

  const month = months[currentMonth];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < month.startDay; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= month.days; i++) {
    calendarDays.push(i);
  }

  const canGoPrev = currentMonth > 0;
  const canGoNext = currentMonth < months.length - 1;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Month tabs */}
      <div className="flex justify-center items-center gap-3 mb-10">
        <button
          onClick={() => canGoPrev && goToMonth(currentMonth - 1)}
          className={`p-2.5 rounded-full transition-all ${canGoPrev ? 'text-sage-deep hover:bg-sage/20 cursor-pointer' : 'text-stone-300 cursor-not-allowed'}`}
          disabled={!canGoPrev}
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>

        {months.map((m, i) => (
          <button
            key={m.name}
            onClick={() => goToMonth(i)}
            className={`px-6 py-3 rounded-full font-bold text-base transition-all duration-300 cursor-pointer ${
              i === currentMonth
                ? 'bg-sage-deep text-white shadow-md shadow-sage-deep/20'
                : 'bg-white/80 text-stone-600 hover:bg-sage-light/50 hover:text-sage-deep border border-stone-200/50'
            }`}
          >
            {m.name}
          </button>
        ))}

        <button
          onClick={() => canGoNext && goToMonth(currentMonth + 1)}
          className={`p-2.5 rounded-full transition-all ${canGoNext ? 'text-sage-deep hover:bg-sage/20 cursor-pointer' : 'text-stone-300 cursor-not-allowed'}`}
          disabled={!canGoNext}
        >
          <ChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Page content with notebook wrapper */}
      <div className="relative">
        {/* Spiral binding on left side */}
        <div className="absolute left-0 md:-left-4 top-4 bottom-4 w-7 z-20 hidden md:flex flex-col justify-between items-center">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full border-[2.5px] border-stone-300 bg-cream-dark/80 spiral-hole" />
          ))}
        </div>

        {/* Main page card */}
        <div
          className={`transition-all duration-350 ease-out ${
            isTransitioning
              ? slideDir === 'right'
                ? 'opacity-0 translate-x-8 scale-[0.97]'
                : 'opacity-0 -translate-x-8 scale-[0.97]'
              : 'opacity-100 translate-x-0 scale-100'
          }`}
        >
          <div className="bg-paper rounded-2xl card-soft overflow-hidden border border-paper-line/50 notebook-bg relative md:ml-4">
            {/* Bookmark tab */}
            <div className="absolute -top-1 right-8 md:right-16 w-8 h-12 z-10">
              <div className="w-full h-full bg-sage/60 rounded-b-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }} />
            </div>

            {/* Red margin line on left */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-[1.5px] bg-red-400/15 z-10" />

            {/* Page header */}
            <div className="bg-gradient-to-r from-sage-light/40 via-sage-light/20 to-sky-light/30 px-6 md:px-10 py-6 border-b border-paper-line/50 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-hand text-sage-deep text-lg flex items-center gap-2">
                    <Bookmark className="w-4 h-4 stroke-[2]" />
                    Devocional 365
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-stone-800 mt-1">{month.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Prévia</p>
                  <p className="font-hand text-sage-dark text-lg">Um dia de cada vez</p>
                </div>
              </div>

              {/* Tape strip effect */}
              <div className="absolute -top-1 left-20 md:left-32 px-3 py-1 tape-strip rounded-sm">
                <p className="font-hand text-stone-500 text-xs">página de exemplo ✦</p>
              </div>
            </div>

            <div className="p-6 md:p-10 grid md:grid-cols-2 gap-8 md:gap-10">
              {/* Left: Calendar + Day indicator */}
              <div className="space-y-6">
                {/* Calendar - ENHANCED with hover effects */}
                <div className="bg-cream/60 rounded-xl p-5 md:p-6 border border-paper-line/30 relative">
                  {/* Month label on calendar */}
                  <div className="flex items-center justify-between mb-4">
                    <p className="font-display text-lg font-bold text-stone-700">{month.name}</p>
                    <p className="font-hand text-sage-deep text-sm">2025</p>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 text-center mb-3">
                    {weekDays.map(d => (
                      <div key={d} className="text-sm font-extrabold text-stone-500 py-1.5">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1.5 text-center">
                    {calendarDays.map((day, i) => (
                      <div
                        key={i}
                        onMouseEnter={() => day && day > month.sampleDay.dayNumber && setHoveredDay(day)}
                        onMouseLeave={() => setHoveredDay(null)}
                        className={`text-base font-bold py-2 rounded-lg transition-all duration-200 ${
                          day === null
                            ? ''
                            : day === month.sampleDay.dayNumber
                            ? 'bg-sage-deep text-white font-extrabold shadow-md shadow-sage-deep/25 scale-110 cal-day-active'
                            : day < month.sampleDay.dayNumber
                            ? 'text-stone-400 line-through'
                            : hoveredDay === day
                            ? 'text-sage-deep bg-sage-light/60 scale-105 cursor-pointer'
                            : 'text-stone-700 hover:bg-sage/15 cursor-pointer'
                        }`}
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Checkmark indicator for completed days */}
                  <div className="mt-3 pt-3 border-t border-paper-line/30 flex items-center gap-4 text-xs font-semibold text-stone-500">
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-sage-deep rounded-sm inline-block" /> Dia atual
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-3 h-3 bg-stone-200 rounded-sm inline-block line-through text-[8px] text-center" /> Concluído
                    </span>
                  </div>
                </div>

                {/* Day indicator */}
                <div className="bg-gradient-to-r from-sage-light/30 to-sage-light/10 rounded-xl p-5 border border-sage/20 relative overflow-hidden">
                  {/* Decorative circle */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-sage/8 rounded-full" />

                  <div className="flex items-center gap-4 relative">
                    <div className="w-16 h-16 bg-sage-deep/10 rounded-2xl flex items-center justify-center border border-sage/20">
                      <span className="font-display text-2xl text-sage-deep font-black">{month.sampleDay.dayNumber}</span>
                    </div>
                    <div>
                      <p className="font-hand text-sage-deep text-xl">
                        Dia {month.sampleDay.yearDay} do ano
                      </p>
                      <p className="text-base text-stone-500 font-semibold">
                        {month.sampleDay.dayNumber} de {month.name}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mini hint */}
                <div className="flex items-center gap-2 text-stone-400 text-sm font-medium px-1">
                  <PenLine className="w-4 h-4" />
                  <p className="font-hand text-base">Clique nos meses para navegar ↑</p>
                </div>
              </div>

              {/* Right: Sample day content with staggered animations */}
              <div ref={contentRef} className="notebook-bg rounded-xl p-5 md:p-6 border border-paper-line/40 relative bg-paper shadow-inner shadow-stone-100/50">
                {/* Margin line */}
                <div className="absolute left-5 md:left-6 top-0 bottom-0 w-[1.5px] bg-red-300/20" />

                <div className="pl-4 space-y-5">
                  {/* Prayer */}
                  <div className="content-item">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">🙏</span>
                      <h4 className="font-display text-base font-bold text-stone-800">Oração do dia</h4>
                    </div>
                    <p className="font-hand text-xl font-bold text-stone-600 italic leading-relaxed">
                      &ldquo;{month.sampleDay.prayer}&rdquo;
                    </p>
                  </div>

                  {/* Verse */}
                  <div className="content-item border-t border-paper-line/50 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">📖</span>
                      <h4 className="font-display text-base font-bold text-stone-800">Versículo</h4>
                    </div>
                    <div className="bg-sage-light/15 rounded-lg p-3 border-l-[3px] border-sage/50">
                      <p className="font-hand text-xl md:text-2xl font-bold text-sage-deep leading-relaxed">
                        &ldquo;{month.sampleDay.verse}&rdquo;
                      </p>
                      <p className="text-sm text-stone-500 mt-1.5 font-bold">— {month.sampleDay.verseRef}</p>
                    </div>
                  </div>

                  {/* Devotional */}
                  <div className="content-item border-t border-paper-line/50 pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">💭</span>
                      <h4 className="font-display text-base font-bold text-stone-800">Reflexão</h4>
                    </div>
                    <p className="text-stone-700 leading-relaxed text-base font-semibold">
                      {month.sampleDay.devotional}
                    </p>
                  </div>

                  {/* Writing space */}
                  <div className="content-item border-t border-dashed border-paper-line/60 pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">✏️</span>
                      <h4 className="font-display text-base font-bold text-stone-800">Suas anotações</h4>
                    </div>
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="border-b border-dashed border-stone-300/60 pb-1 h-6" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Paper fold corner */}
                <div className="absolute bottom-0 right-0 w-12 h-12">
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[48px] border-l-transparent border-b-[48px] border-b-cream-dark/80" />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[44px] border-l-transparent border-b-[44px] border-b-paper opacity-50" />
                </div>
              </div>
            </div>

            {/* Page footer */}
            <div className="px-6 md:px-10 py-4 border-t border-paper-line/30 flex items-center justify-between bg-cream/30">
              <p className="font-hand text-stone-500 text-sm">Devocional 365 — Um dia de cada vez com Deus</p>
              <p className="text-sm text-stone-400 font-bold">Página {currentMonth * 30 + month.sampleDay.dayNumber}</p>
            </div>
          </div>
        </div>

        {/* Shadow pages behind (depth effect) */}
        <div className="absolute inset-x-2 -bottom-2 h-4 bg-white/60 rounded-b-2xl border border-paper-line/30 -z-10 md:ml-4" />
        <div className="absolute inset-x-4 -bottom-4 h-4 bg-white/40 rounded-b-2xl border border-paper-line/20 -z-20 md:ml-4" />
      </div>

      <p className="text-center text-stone-500 text-base mt-8 font-semibold">
        Clique nos meses acima para navegar entre as páginas
      </p>
    </div>
  );
}
