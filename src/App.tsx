import { useState, useEffect, useRef, type ReactNode } from 'react';
import { TypingAnimation } from './components/TypingAnimation';
import { InteractivePreview } from './components/InteractivePreview';
import {
  Heart, BookOpen, Download, Printer, Calendar, Check,
  Shield, ArrowRight, ChevronDown,
  Sparkles, PenLine, RefreshCw, Sun, Feather,
  Gift, FileText, Clock, Users, Star, BookHeart,
  Coffee, Flower2, Bookmark
} from 'lucide-react';

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

/* ─── Reveal Wrapper ─── */
function Reveal({ children, className = '', id, delay = 0 }: { children: ReactNode; className?: string; id?: string; delay?: number }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div
      ref={ref}
      id={id}
      className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─── CTA Button ─── */
function CTAButton({ text, large = false }: { text: string; large?: boolean }) {
  return (
    <a
      href="#oferta"
      className={`inline-flex items-center justify-center gap-2.5 bg-sage-deep hover:bg-sage-dark text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cta-pulse cursor-pointer ${
        large ? 'px-10 py-5 text-lg tracking-wide' : 'px-8 py-4 text-base'
      }`}
    >
      {text}
      <ArrowRight className="w-5 h-5 stroke-[2.5]" />
    </a>
  );
}

/* ─── FAQ Item ─── */
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-beige/60">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer group"
      >
        <span className="font-display text-lg md:text-xl font-semibold text-stone-700 group-hover:text-sage-deep transition-colors pr-4">{question}</span>
        <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-sage-deep text-white rotate-180' : 'bg-cream-dark text-stone-400'}`}>
          <ChevronDown className="w-4 h-4 stroke-[2.5]" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-400 ease-out ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
        <p className="text-stone-600 text-base leading-relaxed pl-1 font-medium">{answer}</p>
      </div>
    </div>
  );
}

/* ─── Benefit Card ─── */
function BenefitCard({ icon: Icon, title, description, delay = 0 }: { icon: React.ElementType; title: string; description: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 card-soft border border-paper-line/30 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="w-14 h-14 bg-sage-light/50 rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-sage-deep stroke-[2]" />
        </div>
        <h4 className="font-display text-xl font-bold text-stone-800 mb-2">{title}</h4>
        <p className="text-stone-600 text-base leading-relaxed font-medium">{description}</p>
      </div>
    </Reveal>
  );
}

/* ─── Step Card ─── */
function StepCard({ number, title, description, icon: Icon, delay = 0 }: { number: number; title: string; description: string; icon: React.ElementType; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <div className="relative text-center group">
        <div className="w-18 h-18 mx-auto bg-gradient-to-br from-sage-light to-sage/30 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm">
          <Icon className="w-8 h-8 text-sage-deep stroke-[2]" />
        </div>
        <div className="absolute -top-2 -right-2 md:right-6 w-8 h-8 bg-sage-deep text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow-sm">
          {number}
        </div>
        <h4 className="font-display text-xl font-bold text-stone-800 mb-2">{title}</h4>
        <p className="text-stone-600 text-base leading-relaxed max-w-xs mx-auto font-medium">{description}</p>
      </div>
    </Reveal>
  );
}

/* ─── Star Rating ─── */
function StarRating({ count, size = 'md' }: { count: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeMap[size]} star-icon ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

/* ─── (Reviews are now inline in the section) ─── */

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export function App() {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingCTA(window.scrollY > 900);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream font-body overflow-x-hidden">

      {/* ── Floating CTA ── */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${showFloatingCTA ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <a href="#oferta" className="flex items-center gap-2 bg-sage-deep text-white px-6 py-3.5 rounded-full shadow-lg shadow-sage-deep/25 hover:bg-sage-dark transition-all hover:scale-105 text-sm font-bold cursor-pointer tracking-wide">
          <Heart className="w-4 h-4 stroke-[2.5]" />
          Quero começar
        </a>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 1 — HERO
          ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/20 to-cream" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-sage/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-sky-soft/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-warm-gold/5 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-0 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-sage/12 text-sage-deep px-4 py-2 rounded-full text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4 stroke-[2.5]" />
              Devocional 365 — Um dia de cada vez com Deus
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-800 leading-[1.2] tracking-wide font-bold">
              Você não precisa começar no{' '}
              <span className="highlight-text">dia 1</span>{' '}
              para caminhar com Deus
            </h1>

            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-lg font-medium">
              O Devocional 365 foi criado para pessoas reais, que querem{' '}
              <strong className="text-stone-800 font-extrabold">constância sem culpa.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <CTAButton text="Começar hoje com Deus" large />
            </div>

            <div className="flex flex-wrap items-center gap-5 text-sm text-stone-500 font-semibold">
              <span className="flex items-center gap-1.5"><Download className="w-4 h-4 stroke-[2.5]" /> Acesso imediato</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 stroke-[2.5]" /> Garantia 7 dias</span>
              <span className="flex items-center gap-1.5"><Printer className="w-4 h-4 stroke-[2.5]" /> Digital ou impresso</span>
            </div>
          </div>

          {/* Right: IMPROVED Mockup — Tablet estilo devocional real */}
          <div className="relative flex justify-center items-center lg:justify-end">
            {/* Tablet mockup — ENHANCED with real devotional page */}
            <div className="relative z-10 bg-stone-800 rounded-[2rem] p-3 shadow-2xl shadow-stone-900/25 transform rotate-1 hover:rotate-0 transition-transform duration-700 float-animation">
              <div className="bg-paper rounded-2xl w-80 md:w-[380px] h-[480px] md:h-[560px] overflow-hidden relative notebook-bg">
                {/* Spiral binding on left */}
                <div className="absolute left-0 top-6 bottom-6 w-6 z-20 flex flex-col justify-between items-center">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="w-[18px] h-[18px] rounded-full border-[2.5px] border-stone-300 bg-stone-100/80 shadow-inner" />
                  ))}
                </div>

                {/* Red margin line */}
                <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-red-400/25 z-10" />

                {/* Page content */}
                <div className="pl-11 pr-6 pt-5 pb-4 h-full flex flex-col relative">
                  {/* Header with day */}
                  <div className="mb-4 pb-3 border-b-2 border-paper-line/40">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-hand text-sage-deep text-base tracking-wide font-bold">✦ Devocional 365 ✦</p>
                        <h3 className="font-display text-3xl md:text-4xl font-bold text-stone-700 leading-tight mt-0.5">Dia 45</h3>
                      </div>
                      <div className="text-right bg-sage-light/30 rounded-xl px-3 py-2">
                        <p className="text-xs text-sage-deep font-bold uppercase tracking-wider">Fevereiro</p>
                        <p className="font-hand text-2xl text-stone-700 font-bold leading-tight">14</p>
                      </div>
                    </div>
                  </div>

                  {/* Prayer section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">🙏</span>
                      <p className="text-xs font-extrabold text-sage-deep uppercase tracking-[0.15em]">Oração</p>
                    </div>
                    <p className="font-hand text-xl md:text-[22px] text-stone-600 leading-relaxed font-bold">
                      &ldquo;Senhor, ensina-me a amar como Tu amas. Que meu coração reflita a Tua compaixão...&rdquo;
                    </p>
                  </div>

                  {/* Verse section */}
                  <div className="mb-4 bg-sage-light/25 rounded-xl p-4 border-l-4 border-sage shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">📖</span>
                      <p className="text-xs font-extrabold text-sage-deep uppercase tracking-[0.15em]">Versículo</p>
                    </div>
                    <p className="font-hand text-[22px] md:text-2xl text-sage-deep leading-snug font-bold">
                      &ldquo;O amor é paciente, o amor é bondoso.&rdquo;
                    </p>
                    <p className="text-xs text-stone-500 font-bold mt-1.5 tracking-wide">— 1 Coríntios 13:4</p>
                  </div>

                  {/* Reflection section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-base">💭</span>
                      <p className="text-xs font-extrabold text-sage-deep uppercase tracking-[0.15em]">Reflexão</p>
                    </div>
                    <p className="text-sm md:text-[15px] text-stone-600 leading-relaxed font-semibold">
                      Amar não é sobre intensidade, mas sobre constância. Deus não pede que você ame perfeitamente — Ele pede que tente, todos os dias.
                    </p>
                  </div>

                  {/* Notes section */}
                  <div className="flex-1 mt-auto">
                    <div className="flex items-center gap-2 mb-2.5">
                      <span className="text-base">✏️</span>
                      <p className="text-xs font-extrabold text-sage-deep uppercase tracking-[0.15em]">Anotações</p>
                    </div>
                    <div className="space-y-3.5">
                      <div className="border-b border-dashed border-stone-300/60 pb-1">
                        <p className="font-hand text-lg text-stone-400 leading-tight font-semibold">Gratidão pela manhã tranquila...</p>
                      </div>
                      <div className="border-b border-dashed border-stone-300/60 pb-1">
                        <p className="font-hand text-lg text-stone-300/80 leading-tight font-semibold">Lembrar de orar pela família</p>
                      </div>
                      <div className="border-b border-dashed border-stone-300/40 h-5" />
                    </div>
                  </div>

                  {/* Page number */}
                  <div className="text-center mt-3 pt-2 border-t border-paper-line/30">
                    <p className="text-xs text-stone-400 font-bold tracking-widest">— 45 —</p>
                  </div>
                </div>

                {/* Paper fold corner */}
                <div className="absolute bottom-0 right-0 w-12 h-12">
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[48px] border-l-transparent border-b-[48px] border-b-cream-dark/80" />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[44px] border-l-transparent border-b-[44px] border-b-paper opacity-50" />
                </div>
              </div>
            </div>

            {/* A4 print mockup — behind tablet */}
            <div className="absolute -left-4 bottom-4 md:-left-10 md:bottom-0 z-0 bg-white rounded-lg shadow-xl w-48 md:w-60 h-64 md:h-72 transform -rotate-6 border border-paper-line/60 overflow-hidden">
              <div className="p-4 h-full flex flex-col notebook-bg">
                {/* Spiral dots on top */}
                <div className="flex justify-center gap-3 mb-3 pb-2 border-b border-paper-line/30">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full border-[1.5px] border-stone-300 bg-stone-50" />
                  ))}
                </div>
                <div className="text-center mb-2">
                  <p className="font-hand text-sage-deep text-xs tracking-wide">Devocional 365</p>
                  <p className="font-display text-lg font-bold text-stone-700 mt-0.5">Março</p>
                </div>
                {/* Calendar */}
                <div className="bg-cream/50 rounded-lg p-2 mb-2">
                  <div className="grid grid-cols-7 gap-px text-center mb-1">
                    {['D','S','T','Q','Q','S','S'].map((d,i) => (
                      <span key={i} className="text-[7px] text-stone-500 font-bold">{d}</span>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-px text-center">
                    {Array.from({length:31}, (_,i) => (
                      <span key={i} className={`text-[8px] font-bold py-px ${i+1 === 15 ? 'text-white bg-sage-deep rounded-full' : 'text-stone-400'}`}>{i+1}</span>
                    ))}
                  </div>
                </div>
                {/* Mini verse */}
                <div className="bg-sage-light/30 rounded p-2 mb-2">
                  <p className="text-[7px] text-sage-deep font-extrabold">📖 Versículo do dia</p>
                  <p className="text-[7px] text-stone-500 italic leading-tight font-semibold mt-0.5">&ldquo;Aqueles que esperam no Senhor renovam suas forças...&rdquo;</p>
                </div>
                {/* Lines */}
                <div className="space-y-2 flex-1">
                  <div className="border-b border-dashed border-stone-300 h-2" />
                  <div className="border-b border-dashed border-stone-300 h-2" />
                  <div className="border-b border-dashed border-stone-300 h-2" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-sage/15 rounded-full blur-xl" />
            <div className="absolute -bottom-10 right-10 w-28 h-28 bg-sky-soft/20 rounded-full blur-xl" />

            {/* Decorative glow */}
            <div className="absolute -top-4 left-8 w-16 h-16 bg-sage/10 rounded-full blur-xl" />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-7 h-7 text-stone-400 stroke-[2.5]" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 2 — DOR E IDENTIFICAÇÃO
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-white/50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 text-warm-gold text-sm font-bold">
                <Heart className="w-4 h-4 stroke-[2.5]" />
                <span>Você se identifica?</span>
              </div>

              <div className="space-y-6 text-lg md:text-xl text-stone-600 leading-relaxed font-medium">
                <p className="font-display text-2xl md:text-3xl font-bold text-stone-800">
                  Você começou um devocional cheio de vontade...<br />
                  <span className="font-display text-sage-deep text-3xl md:text-4xl font-bold italic">...e parou no dia 12.</span>
                </p>

                <p className="font-semibold">
                  Não por falta de fé. Não por falta de desejo.<br />
                  Mas porque a vida aconteceu.
                </p>

                <div className="py-4 space-y-3">
                  <p className="text-stone-600 font-semibold">Os dias passaram.</p>
                  <p className="text-stone-600 font-semibold">A culpa chegou.</p>
                  <p className="text-stone-600 font-semibold">E aquele caderno ficou esquecido na gaveta.</p>
                </div>

                <p className="font-display text-xl md:text-2xl font-bold text-stone-700">
                  Você olha para trás e pensa:<br />
                  <em>&ldquo;Já perdi tanto tempo... será que ainda dá?&rdquo;</em>
                </p>

                <div className="pt-4">
                  <p className="font-display text-3xl md:text-4xl text-sage-deep font-bold">
                    Sim. Ainda dá.
                  </p>
                  <p className="text-stone-600 mt-3 font-semibold text-lg">
                    E o Devocional 365 foi feito exatamente para esse recomeço.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 3 — APRESENTAÇÃO DO PRODUTO
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white/40">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-hand text-sage-deep text-2xl mb-3">Muito prazer,</p>
              <h2 className="font-display text-3xl md:text-5xl text-stone-800 mb-5 font-bold">
                Conheça o <span className="highlight-text">Devocional 365</span>
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                Um devocional diário com 365 dias organizados, pensado para ser simples,
                acolhedor e possível de manter — mesmo que você comece hoje.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard
              icon={Calendar}
              title="365 dias organizados"
              description="Cada dia do ano tem sua página, com oração, versículo, reflexão e espaço para suas anotações pessoais."
              delay={0}
            />
            <BenefitCard
              icon={FileText}
              title="Um dia por página"
              description="Sem excesso de conteúdo. Cada página é leve, objetiva e feita para caber na sua rotina — mesmo nos dias corridos."
              delay={100}
            />
            <BenefitCard
              icon={Printer}
              title="Digital ou impresso"
              description="Use no tablet, celular ou computador. Ou imprima em A4 e monte seu próprio caderno devocional físico."
              delay={200}
            />
            <BenefitCard
              icon={PenLine}
              title="Espaço para escrita"
              description="Cada dia tem linhas para suas anotações, orações e pensamentos. Seu devocional, do seu jeito."
              delay={300}
            />
            <BenefitCard
              icon={Coffee}
              title="Linguagem simples"
              description="Sem termos religiosos complexos. Textos acolhedores que qualquer pessoa consegue ler e se conectar."
              delay={400}
            />
            <BenefitCard
              icon={RefreshCw}
              title="Guias de recomeço"
              description="Perdeu dias ou semanas? Cada mês tem um guia que ajuda você a retomar sem culpa e sem pressão."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 4 — DEMONSTRAÇÃO ANIMADA (TYPING)
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-cream-dark/30 to-cream relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sky-soft/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-hand text-sage-deep text-2xl mb-3">✦ Uma experiência real ✦</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-4 font-bold">
                Cada dia é um encontro com Deus
              </h2>
              <p className="text-stone-600 max-w-lg mx-auto text-lg font-medium">
                Veja como é a experiência de abrir o devocional e encontrar palavras que acolhem sua alma.
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <TypingAnimation />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 5 — COMO UM DIA COMEÇA
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white/40">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <p className="font-hand text-sage-deep text-2xl mb-3">Simples assim</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Como um dia com Deus começa
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            <StepCard number={1} icon={Gift} title="Adquira o devocional" description="Faça seu pedido e receba o acesso completo ao Devocional 365 imediatamente." delay={0} />
            <StepCard number={2} icon={Download} title="Receba o acesso" description="O arquivo completo é enviado para você de forma digital, pronto para usar." delay={100} />
            <StepCard number={3} icon={Printer} title="Escolha o formato" description="Use digitalmente no tablet ou celular, ou imprima em A4 para criar seu caderno." delay={200} />
            <StepCard number={4} icon={Sun} title="Comece quando quiser" description="Não importa o mês ou o dia. Abra na página de hoje e comece sua jornada." delay={300} />
          </div>

          {/* Connecting line for desktop */}
          <div className="hidden lg:block max-w-4xl mx-auto mt-[-140px] mb-[100px]">
            <div className="border-t-2 border-dashed border-sage/20 mx-20" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 6 — DEMONSTRAÇÃO INTERATIVA
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-cream-dark/20 notebook-section-bg relative overflow-hidden">
        {/* Decorative notebook elements */}
        <div className="absolute left-4 md:left-10 top-0 bottom-0 w-[1px] bg-red-300/10 hidden lg:block" />
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-red-300/10 hidden lg:block" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 bg-sage/12 text-sage-deep px-4 py-2 rounded-full text-sm font-bold mb-4">
                <BookOpen className="w-4 h-4 stroke-[2.5]" />
                Prévia exclusiva
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-4 font-bold">
                Veja um exemplo de como é <span className="highlight-text">por dentro</span>
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg font-medium">
                Navegue entre os meses e experimente a sensação de ter o devocional em suas mãos.
                <br />
                <span className="font-hand text-sage-deep text-xl mt-2 inline-block">Isso não é apenas um arquivo. É uma experiência.</span>
              </p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <InteractivePreview />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7 — PARA QUEM É
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white/40">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-hand text-sage-deep text-2xl mb-3">Será que é para mim?</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Para quem é o Devocional 365
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: Clock, text: 'Para quem quer criar um hábito diário com Deus, mesmo com pouco tempo' },
              { icon: RefreshCw, text: 'Para quem já tentou manter um devocional e parou — mais de uma vez' },
              { icon: Flower2, text: 'Para quem busca paz, direção e um momento de silêncio na rotina' },
              { icon: Feather, text: 'Para quem deseja uma fé prática, leve e sem complicação' },
              { icon: Heart, text: 'Para quem quer se sentir mais perto de Deus, todos os dias' },
              { icon: Users, text: 'Para quem quer compartilhar esse momento com a família ou amigos' },
              { icon: BookHeart, text: 'Para quem gosta de escrever, refletir e guardar suas experiências' },
              { icon: Star, text: 'Para quem acredita que nunca é tarde para começar de novo' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4 bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-paper-line/30 hover:border-sage/30 transition-all duration-300">
                  <div className="w-11 h-11 bg-sage-light/50 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-5 h-5 text-sage-deep stroke-[2.5]" />
                  </div>
                  <p className="text-stone-700 leading-relaxed text-base font-semibold">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 7.5 — AVALIAÇÕES (TESTIMONIALS)
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-cream-dark/10 to-cream relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-sky-soft/8 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-hand text-sage-deep text-2xl mb-3">O que estão dizendo</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Quem já começou, <span className="highlight-text">recomenda</span>
              </h2>
            </div>
          </Reveal>

          {/* Simple review cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Review 1 — 5 stars */}
            <Reveal delay={0}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-soft border border-paper-line/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Santos" className="w-12 h-12 rounded-full object-cover border-2 border-sage/20" loading="lazy" />
                  <div>
                    <p className="font-display text-stone-800 font-bold text-[15px]">Maria Santos</p>
                    <StarRating count={5} size="sm" />
                  </div>
                </div>
                <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                  &ldquo;O devocional mudou minha rotina matinal. A linguagem é tão acolhedora que parece que foi escrito para mim. Cada página traz paz.&rdquo;
                </p>
              </div>
            </Reveal>

            {/* Review 2 — 5 stars */}
            <Reveal delay={100}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-soft border border-paper-line/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="Ana Paula R." className="w-12 h-12 rounded-full object-cover border-2 border-sage/20" loading="lazy" />
                  <div>
                    <p className="font-display text-stone-800 font-bold text-[15px]">Ana Paula R.</p>
                    <StarRating count={5} size="sm" />
                  </div>
                </div>
                <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                  &ldquo;Comecei em julho, achando que era tarde. Mas o devocional me acolheu sem julgamento. Os guias de recomeço são incríveis.&rdquo;
                </p>
              </div>
            </Reveal>

            {/* Review 3 — 4 stars */}
            <Reveal delay={200}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-soft border border-paper-line/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Carlos Eduardo" className="w-12 h-12 rounded-full object-cover border-2 border-sage/20" loading="lazy" />
                  <div>
                    <p className="font-display text-stone-800 font-bold text-[15px]">Carlos Eduardo</p>
                    <StarRating count={4} size="sm" />
                  </div>
                </div>
                <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                  &ldquo;Material bem feito e organizado. Imprimi em A4 e ficou lindo, parece um livro profissional. Superou minhas expectativas.&rdquo;
                </p>
              </div>
            </Reveal>

            {/* Review 4 — 5 stars */}
            <Reveal delay={300}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 card-soft border border-paper-line/30 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <img src="https://randomuser.me/api/portraits/women/63.jpg" alt="Juliana Ferreira" className="w-12 h-12 rounded-full object-cover border-2 border-sage/20" loading="lazy" />
                  <div>
                    <p className="font-display text-stone-800 font-bold text-[15px]">Juliana Ferreira</p>
                    <StarRating count={5} size="sm" />
                  </div>
                </div>
                <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                  &ldquo;Presenteei minha mãe e ela amou! Agora fazemos juntas, cada uma no seu tempo. Virou nosso momento especial.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          {/* Simple social proof */}
          <Reveal delay={400}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-stone-500 font-semibold">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" strokeWidth={0} />
                <span className="text-stone-700 font-bold">4.8 de 5</span>
                <span>· avaliação média</span>
              </div>
              <div className="hidden sm:block w-px h-5 bg-stone-300" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sage-deep stroke-[2.5]" />
                <span>+200 pessoas já começaram</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 8 — E SE EU PERDER DIAS?
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-sage-light/10 to-cream relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />
        <div className="max-w-3xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 text-sage-deep text-sm font-bold">
                <RefreshCw className="w-4 h-4 stroke-[2.5]" />
                <span>Uma pergunta importante</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                E se eu perder alguns dias?
              </h2>

              <div className="bg-paper rounded-2xl p-8 md:p-10 card-soft text-left space-y-6 border border-sage/10">
                <p className="text-lg text-stone-700 leading-relaxed font-semibold">
                  <span className="font-hand text-2xl text-sage-deep">Tudo bem.</span> De verdade.
                </p>
                <p className="text-stone-600 leading-relaxed text-base font-medium">
                  O Devocional 365 não foi feito para gerar culpa. Ele foi pensado para
                  acolher seus recomeços — quantos forem necessários.
                </p>

                <div className="space-y-4 pt-2">
                  {[
                    'Não há penalidade por dias perdidos',
                    'Cada mês traz um guia de recomeço para te ajudar a retomar',
                    'Você pode pular, voltar e seguir no seu ritmo',
                    'As datas são sugestões, não obrigações',
                    'O importante é estar presente quando puder — não ser perfeito',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-sage-light rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-sage-deep stroke-[3]" />
                      </div>
                      <p className="text-stone-700 font-semibold text-base">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-paper-line/50">
                  <p className="font-hand text-xl text-sage-deep text-center">
                    &ldquo;Deus não conta seus tropeços. Ele celebra seus retornos.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 9 — O QUE VOCÊ RECEBE
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white/40">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-hand text-sage-deep text-2xl mb-3">Tudo isso está incluso</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                O que você recebe
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-gradient-to-br from-paper to-cream rounded-2xl p-8 md:p-10 card-soft border border-paper-line/30 space-y-5">
              {[
                { icon: BookOpen, title: 'Devocional 365 completo', desc: '365 páginas com oração, versículo, reflexão e espaço para anotações' },
                { icon: Bookmark, title: 'Introduções mensais', desc: 'Cada mês começa com uma palavra de acolhimento e direcionamento' },
                { icon: RefreshCw, title: 'Guias de recuperação', desc: 'Perdeu dias? Cada mês tem um guia especial para te ajudar a recomeçar' },
                { icon: Feather, title: 'Páginas extras de reflexão', desc: 'Espaços dedicados para reflexões mais profundas e momentos especiais' },
                { icon: FileText, title: 'Orientações de uso', desc: 'Instruções claras para uso digital ou impressão em A4' },
                { icon: Heart, title: 'Feito com cuidado', desc: 'Cada palavra foi escrita pensando em você e na sua jornada de fé' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-paper-line/30 last:border-0 last:pb-0 first:pt-0">
                  <div className="w-12 h-12 bg-sage-light/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-sage-deep stroke-[2]" />
                  </div>
                  <div>
                    <h4 className="font-display text-stone-800 text-lg font-bold mb-0.5">{item.title}</h4>
                    <p className="text-stone-600 text-base font-medium">{item.desc}</p>
                  </div>
                  <div className="ml-auto flex-shrink-0 self-center">
                    <Check className="w-6 h-6 text-sage stroke-[2.5]" />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 10 — OFERTA
          ══════════════════════════════════════════════ */}
      <section id="oferta" className="py-20 md:py-28 bg-gradient-to-b from-cream to-sage-light/15 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-sage/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-soft/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-xl mx-auto px-6">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 md:p-10 card-soft border border-sage/15 text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-sage-deep/10 text-sage-deep px-4 py-2 rounded-full text-sm font-extrabold tracking-wide">
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                Oferta especial
              </div>

              {/* Product name */}
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-2 font-bold">Devocional 365</h2>
                <p className="font-hand text-sage-deep text-xl">Um dia de cada vez com Deus</p>
              </div>

              {/* Price */}
              <div className="py-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-stone-500 text-lg font-semibold">por apenas</span>
                </div>
                <div className="flex items-baseline justify-center gap-1 mt-2">
                  <span className="text-stone-500 text-xl font-bold">R$</span>
                  <span className="font-display text-6xl md:text-7xl text-sage-deep font-black">29</span>
                  <span className="text-stone-500 text-xl font-bold">,90</span>
                </div>
                <p className="text-stone-500 text-sm mt-2 font-semibold">Pagamento único · Acesso vitalício</p>
              </div>

              {/* Benefits mini list */}
              <div className="text-left space-y-3 max-w-sm mx-auto">
                {[
                  '365 dias de devocional completo',
                  'Guias de recomeço mensais',
                  'Páginas extras de reflexão',
                  'Uso digital ou impressão A4',
                  'Acesso imediato ao arquivo',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span className="text-stone-700 text-base font-semibold">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="pt-2">
                <CTAButton text="Quero começar hoje" large />
              </div>

              {/* Guarantee */}
              <div className="flex items-center justify-center gap-3 pt-2 text-sm text-stone-500 font-semibold">
                <Shield className="w-5 h-5 text-sage stroke-[2]" />
                <span>Garantia de satisfação de <strong className="text-stone-700 font-extrabold">7 dias</strong></span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 11 — CHECKOUT (TEXTO DE VALOR)
          ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="bg-paper rounded-2xl p-8 md:p-10 card-soft border border-paper-line/30 relative paper-lines">
              {/* Decorative corner */}
              <div className="absolute top-4 right-4">
                <Feather className="w-6 h-6 text-sage/30" />
              </div>

              <h3 className="font-display text-xl md:text-2xl text-stone-800 mb-6 font-bold">
                Por que este devocional é pago?
              </h3>

              <div className="space-y-4 text-stone-600 leading-relaxed text-base font-medium">
                <p>
                  O Devocional 365 <strong className="text-stone-800 font-extrabold">não é apenas um arquivo.</strong>
                </p>
                <p>
                  Ele foi planejado, escrito e organizado com cuidado, dedicação e responsabilidade
                  para acompanhar você todos os dias do ano.
                </p>
                <p>
                  Cada mês, cada reflexão e cada guia de recomeço foi desenvolvido pensando em
                  <strong className="text-stone-800 font-extrabold"> pessoas reais</strong> que desejam constância sem culpa.
                </p>

                <div className="py-4 space-y-3">
                  <p className="text-stone-800 font-bold text-lg">Ao adquirir este material, você:</p>
                  {[
                    'Recebe um conteúdo feito com profundidade e responsabilidade',
                    'Apoia a continuidade e melhoria do projeto',
                    'Contribui para que novas versões e recursos sejam desenvolvidos',
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-sage-deep mt-1 font-bold">•</span>
                      <p className="text-stone-600 font-semibold">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="font-semibold">
                  Esse valor não é apenas pelo acesso ao conteúdo,<br />
                  mas pelo <strong className="text-stone-800 font-extrabold">trabalho, pelo tempo investido e pela missão</strong> de
                  torná-lo cada vez melhor.
                </p>

                <div className="pt-4 border-t border-paper-line/50">
                  <p className="font-hand text-xl text-sage-deep">
                    Obrigado por fazer parte disso. 💚
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 12 — FAQ
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-white/40">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-hand text-sage-deep text-2xl mb-3">Tire suas dúvidas</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Perguntas frequentes
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-paper rounded-2xl p-6 md:p-8 card-soft border border-paper-line/30">
              <FAQItem
                question="Posso começar em qualquer dia do ano?"
                answer="Sim! O Devocional 365 foi criado para que você comece quando quiser. Não importa se estamos em janeiro ou em setembro — abra na página do dia e comece. Cada dia é independente e completo."
              />
              <FAQItem
                question="Funciona se eu já estiver atrasado?"
                answer="Com certeza. O devocional não segue um calendário rígido. Se você começou e parou, ou se está começando agora no meio do ano, simplesmente abra no dia atual e siga em frente. Os guias mensais de recomeço vão te ajudar nesse processo."
              />
              <FAQItem
                question="Posso imprimir o devocional?"
                answer="Sim! O arquivo foi preparado no formato A4, ideal para impressão. Você pode imprimir tudo de uma vez ou mês a mês, do jeito que preferir. Também funciona perfeitamente em formato digital."
              />
              <FAQItem
                question="O devocional é digital?"
                answer="Sim, o Devocional 365 é um produto digital. Você recebe o acesso ao arquivo completo imediatamente após a compra. Pode usar no celular, tablet ou computador, ou imprimir em papel A4."
              />
              <FAQItem
                question="Preciso ter conhecimento bíblico para usar?"
                answer="Não! O devocional usa uma linguagem simples, acolhedora e sem termos religiosos complexos. Foi feito para qualquer pessoa que deseja se aproximar de Deus, independente do nível de conhecimento bíblico."
              />
              <FAQItem
                question="E se eu não gostar?"
                answer="Você tem 7 dias de garantia. Se por qualquer motivo o devocional não atender às suas expectativas, é só entrar em contato e devolvemos o valor integral. Sem complicação."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SECTION 13 — CTA FINAL
          ══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-cream to-sage-light/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-sky-soft/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center space-y-8">
              <div className="inline-block">
                <Heart className="w-10 h-10 text-sage mx-auto mb-4 stroke-[2]" />
              </div>

              <h2 className="font-display text-3xl md:text-5xl text-stone-800 leading-tight font-bold">
                Não espere a segunda-feira,<br />
                o mês que vem ou o próximo ano.
              </h2>

              <p className="text-lg md:text-xl text-stone-600 max-w-xl mx-auto leading-relaxed font-semibold">
                Hoje ainda é tempo. E Deus está esperando por esse momento com você —
                não um momento perfeito, mas um momento{' '}
                <span className="font-hand text-sage-deep text-2xl">verdadeiro.</span>
              </p>

              <div className="pt-4">
                <CTAButton text="Começar hoje com Deus" large />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500 pt-4 font-bold">
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4 stroke-[2.5]" /> Acesso imediato</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 stroke-[2.5]" /> Garantia 7 dias</span>
                <span className="flex items-center gap-1.5"><Heart className="w-4 h-4 stroke-[2.5]" /> Feito com amor</span>
              </div>

              <p className="font-hand text-sage-deep text-2xl pt-6">
                Um dia de cada vez. Com Deus. Com você. 🌿
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 bg-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-hand text-sage text-2xl mb-2">Devocional 365</p>
          <p className="text-stone-400 text-sm font-semibold">Um dia de cada vez com Deus</p>
          <div className="mt-6 pt-6 border-t border-stone-700">
            <p className="text-stone-500 text-xs font-medium">
              © {new Date().getFullYear()} Devocional 365. Todos os direitos reservados.
            </p>
            <p className="text-stone-600 text-xs mt-2 font-medium">
              Feito com 💚 e muita oração.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
