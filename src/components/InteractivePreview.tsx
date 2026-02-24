import { useState, useRef, useEffect, useCallback } from 'react';
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

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const weekDaysFull = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export function InteractivePreview() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('right');
  const [animateContent, setAnimateContent] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);

  const goToMonth = useCallback((index: number) => {
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
    }, 300);
  }, [currentMonth, isTransitioning]);

  useEffect(() => {
    if (animateContent && contentRef.current) {
      const children = contentRef.current.querySelectorAll('.content-item');
      children.forEach((child, i) => {
        const el = child as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(12px)';
        setTimeout(() => {
          el.style.transition = 'all 0.4s ease-out';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 80 + i * 100);
      });
    }
  }, [animateContent, currentMonth]);

  const month = months[currentMonth];

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < month.startDay; i++) calendarDays.push(null);
  for (let i = 1; i <= month.days; i++) calendarDays.push(i);

  const canGoPrev = currentMonth > 0;
  const canGoNext = currentMonth < months.length - 1;

  return (
    <div className="max-w-5xl mx-auto preview-scroll-fix">
      {/* Month tabs */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mb-8">
        <button
          onClick={() => canGoPrev && goToMonth(currentMonth - 1)}
          className={`p-2 rounded-full transition-all ${canGoPrev ? 'text-sage-deep hover:bg-sage/20 cursor-pointer' : 'text-stone-300 cursor-not-allowed'}`}
          disabled={!canGoPrev}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>

        {months.map((m, i) => (
          <button
            key={m.name}
            onClick={() => goToMonth(i)}
            className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer ${
              i === currentMonth
                ? 'bg-sage-deep text-white shadow-md'
                : 'bg-white/80 text-stone-600 hover:bg-sage-light/50 border border-stone-200/50'
            }`}
          >
            {m.name}
          </button>
        ))}

        <button
          onClick={() => canGoNext && goToMonth(currentMonth + 1)}
          className={`p-2 rounded-full transition-all ${canGoNext ? 'text-sage-deep hover:bg-sage/20 cursor-pointer' : 'text-stone-300 cursor-not-allowed'}`}
          disabled={!canGoNext}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Page content */}
      <div className="relative">
        {/* Spiral binding — desktop only, fewer holes */}
        <div className="absolute -left-4 top-4 bottom-4 w-7 z-20 hidden lg:flex flex-col justify-between items-center">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="w-5 h-5 rounded-full border-[2.5px] border-stone-300 bg-cream-dark/80 spiral-hole" />
          ))}
        </div>

        {/* Main page card */}
        <div
          className={`transition-all duration-300 ease-out ${
            isTransitioning
              ? slideDir === 'right'
                ? 'opacity-0 translate-x-6 scale-[0.98]'
                : 'opacity-0 -translate-x-6 scale-[0.98]'
              : 'opacity-100 translate-x-0 scale-100'
          }`}
        >
          <div className="bg-paper rounded-2xl card-soft overflow-hidden border border-paper-line/50 notebook-bg relative lg:ml-4">
            {/* Bookmark tab */}
            <div className="absolute -top-1 right-6 sm:right-16 w-7 h-10 z-10">
              <div className="w-full h-full bg-sage/60 rounded-b-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }} />
            </div>

            {/* Red margin line */}
            <div className="absolute left-6 sm:left-12 top-0 bottom-0 w-[1px] bg-red-400/15 z-10" />

            {/* Page header */}
            <div className="bg-gradient-to-r from-sage-light/40 via-sage-light/20 to-sky-light/30 px-5 sm:px-10 py-5 border-b border-paper-line/50 relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-hand text-sage-deep text-base sm:text-lg flex items-center gap-2">
                    <Bookmark className="w-4 h-4 stroke-[2]" />
                    Devocional 365
                  </p>
                  <h3 className="font-display text-xl sm:text-3xl font-bold text-stone-800 mt-1">{month.name}</h3>
                </div>
                <div className="text-right hidden sm:block">
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-bold">Prévia</p>
                  <p className="font-hand text-sage-dark text-lg">Um dia de cada vez</p>
                </div>
              </div>

              {/* Tape strip — desktop only */}
              <div className="absolute -top-1 left-32 px-3 py-1 tape-strip rounded-sm hidden md:block">
                <p className="font-hand text-stone-500 text-xs">página de exemplo ✦</p>
              </div>
            </div>

            <div className="p-5 sm:p-8 md:p-10 grid md:grid-cols-2 gap-6 md:gap-10">
              {/* Left: Calendar + Day indicator */}
              <div className="space-y-5">
                {/* Calendar */}
                <div className="bg-cream/60 rounded-xl p-4 sm:p-6 border border-paper-line/30">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display text-base sm:text-lg font-bold text-stone-700">{month.name}</p>
                    <p className="font-hand text-sage-deep text-sm">2025</p>
                  </div>

                  {/* Weekday headers — responsive */}
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {weekDays.map((d, idx) => (
                      <div key={idx} className="text-xs sm:hidden font-extrabold text-stone-500 py-1">{d}</div>
                    ))}
                    {weekDaysFull.map((d, idx) => (
                      <div key={idx} className="text-sm hidden sm:block font-extrabold text-stone-500 py-1.5">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {calendarDays.map((day, i) => (
                      <div
                        key={i}
                        className={`text-sm sm:text-base font-bold py-1.5 sm:py-2 rounded-lg transition-colors duration-150 relative ${
                          day === null
                            ? ''
                            : day === month.sampleDay.dayNumber
                            ? 'bg-sage-deep text-white font-extrabold shadow-md cal-day-active'
                            : day < month.sampleDay.dayNumber
                            ? 'text-sage-deep/60'
                            : 'text-stone-700'
                        }`}
                      >
                        {day !== null && day < month.sampleDay.dayNumber ? (
                          <span className="relative">
                            <span className="opacity-40">{day}</span>
                            <span className="absolute inset-0 flex items-center justify-center font-hand text-sage-deep text-lg font-bold">✓</span>
                          </span>
                        ) : day}
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-3 border-t border-paper-line/30 flex items-center gap-4 text-xs font-semibold text-stone-500">
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 bg-sage-deep rounded-sm inline-flex items-center justify-center text-white text-[9px]">●</span> Dia atual
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-4 h-4 bg-sage-light/40 rounded-sm inline-flex items-center justify-center font-hand text-sage-deep text-xs font-bold">✓</span> Concluído
                    </span>
                  </div>
                </div>

                {/* Day indicator */}
                <div className="bg-gradient-to-r from-sage-light/30 to-sage-light/10 rounded-xl p-4 sm:p-5 border border-sage/20 relative overflow-hidden">
                  <div className="flex items-center gap-4 relative">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-sage-deep/10 rounded-2xl flex items-center justify-center border border-sage/20">
                      <span className="font-display text-xl sm:text-2xl text-sage-deep font-black">{month.sampleDay.dayNumber}</span>
                    </div>
                    <div>
                      <p className="font-hand text-sage-deep text-lg sm:text-xl">
                        Dia {month.sampleDay.yearDay} do ano
                      </p>
                      <p className="text-sm sm:text-base text-stone-500 font-semibold">
                        {month.sampleDay.dayNumber} de {month.name}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-2 text-stone-400 text-sm font-medium px-1">
                  <PenLine className="w-4 h-4" />
                  <p className="font-hand text-base">Clique nos meses para navegar ↑</p>
                </div>
              </div>

              {/* Right: Sample day content */}
              <div ref={contentRef} className="notebook-bg rounded-xl p-4 sm:p-6 border border-paper-line/40 relative bg-paper">
                <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-[1px] bg-red-300/20" />

                <div className="pl-3 sm:pl-4 space-y-4 sm:space-y-5">
                  {/* Prayer */}
                  <div className="content-item">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base sm:text-lg">🙏</span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-stone-800">Oração do dia</h4>
                    </div>
                    <p className="font-hand text-lg sm:text-xl font-bold text-stone-600 italic leading-relaxed">
                      &ldquo;{month.sampleDay.prayer}&rdquo;
                    </p>
                  </div>

                  {/* Verse */}
                  <div className="content-item border-t border-paper-line/50 pt-3 sm:pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base sm:text-lg">📖</span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-stone-800">Versículo</h4>
                    </div>
                    <div className="bg-sage-light/15 rounded-lg p-2.5 sm:p-3 border-l-[3px] border-sage/50">
                      <p className="font-hand text-lg sm:text-2xl font-bold text-sage-deep leading-relaxed">
                        &ldquo;{month.sampleDay.verse}&rdquo;
                      </p>
                      <p className="text-xs sm:text-sm text-stone-500 mt-1 font-bold">— {month.sampleDay.verseRef}</p>
                    </div>
                  </div>

                  {/* Devotional */}
                  <div className="content-item border-t border-paper-line/50 pt-3 sm:pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base sm:text-lg">💭</span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-stone-800">Reflexão</h4>
                    </div>
                    <p className="text-stone-700 leading-relaxed text-sm sm:text-base font-semibold">
                      {month.sampleDay.devotional}
                    </p>
                  </div>

                  {/* Writing space */}
                  <div className="content-item border-t border-dashed border-paper-line/60 pt-3 sm:pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base sm:text-lg">✏️</span>
                      <h4 className="font-display text-sm sm:text-base font-bold text-stone-800">Suas anotações</h4>
                    </div>
                    <div className="space-y-2.5">
                      <div className="border-b border-dashed border-stone-300/50 pb-1">
                        <p className="font-hand text-base sm:text-lg text-stone-400/90 font-semibold leading-relaxed" style={{ transform: 'rotate(-0.3deg)' }}>
                          Hoje senti uma paz diferente ao orar...
                        </p>
                      </div>
                      <div className="border-b border-dashed border-stone-300/50 pb-1">
                        <p className="font-hand text-base sm:text-lg text-stone-400/70 font-semibold leading-relaxed" style={{ transform: 'rotate(0.2deg)' }}>
                          Lembrar de agradecer pelas pequenas coisas
                        </p>
                      </div>
                      <div className="border-b border-dashed border-stone-300/50 pb-1">
                        <p className="font-hand text-sm sm:text-[17px] text-stone-400/50 font-medium leading-relaxed" style={{ transform: 'rotate(-0.5deg)' }}>
                          Deus é fiel, mesmo quando eu duvido ♡
                        </p>
                      </div>
                      <div className="border-b border-dashed border-stone-300/30 h-4" />
                      <div className="border-b border-dashed border-stone-300/20 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Page footer */}
            <div className="px-5 sm:px-10 py-3 border-t border-paper-line/30 flex items-center justify-between bg-cream/30">
              <p className="font-hand text-stone-500 text-xs sm:text-sm">Devocional 365</p>
              <p className="text-xs sm:text-sm text-stone-400 font-bold">Página {currentMonth * 30 + month.sampleDay.dayNumber}</p>
            </div>
          </div>
        </div>

        {/* Shadow pages behind */}
        <div className="absolute inset-x-2 -bottom-2 h-3 bg-white/60 rounded-b-2xl border border-paper-line/30 -z-10 lg:ml-4" />
        <div className="absolute inset-x-4 -bottom-4 h-3 bg-white/40 rounded-b-2xl border border-paper-line/20 -z-20 lg:ml-4" />
      </div>

      <p className="text-center text-stone-500 text-sm sm:text-base mt-6 font-semibold">
        Clique nos meses acima para navegar entre as páginas
      </p>
    </div>
  );
}
