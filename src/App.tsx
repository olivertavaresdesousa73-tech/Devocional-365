import { useState, useEffect, useRef, type ReactNode } from 'react';
import { TypingAnimation } from './components/TypingAnimation';
import { InteractivePreview } from './components/InteractivePreview';
import { Logo } from './components/Logo';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import {
  Heart, BookOpen, Download, Printer, Calendar, Check,
  Shield, ArrowRight, ChevronDown,
  Sparkles, PenLine, RefreshCw, Feather,
  FileText, Clock, Users, Star, BookHeart,
  Coffee, Flower2, Bookmark, Smartphone,
  Eye, Lock, CreditCard, ShieldCheck, TrendingUp,
  XCircle, CheckCircle2
} from 'lucide-react';

/* ─── Constants ─── */
const CHECKOUT_URL = 'https://pay.cakto.com.br/9iiog6g_781716';

/* ─── Scroll Reveal Hook ─── */
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
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
function CTAButton({ text, large = false, href }: { text: string; large?: boolean; href?: string }) {
  const isExternal = href ? href.startsWith('http') : true;
  const linkHref = href || CHECKOUT_URL;

  return (
    <a
      href={linkHref}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center justify-center gap-2.5 bg-sage-deep hover:bg-sage-dark text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cta-pulse cursor-pointer ${
        large ? 'px-10 py-5 text-lg tracking-wide' : 'px-8 py-4 text-base'
      }`}
      aria-label={text}
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
        aria-expanded={isOpen}
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
      <div className="bg-white/70 rounded-2xl p-6 card-soft border border-paper-line/30 hover:border-sage/30 transition-all duration-300 hover:-translate-y-1 h-full">
        <div className="w-14 h-14 bg-sage-light/50 rounded-xl flex items-center justify-center mb-4">
          <Icon className="w-7 h-7 text-sage-deep stroke-[2]" />
        </div>
        <h4 className="font-display text-xl font-bold text-stone-800 mb-2">{title}</h4>
        <p className="text-stone-600 text-base leading-relaxed font-medium">{description}</p>
      </div>
    </Reveal>
  );
}

/* ─── Review Photo with Fallback ─── */
function ReviewPhoto({ src, name, size = 'md' }: { src: string; name: string; size?: 'sm' | 'md' }) {
  const [hasError, setHasError] = useState(false);
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2);
  const sizeClasses = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-12 h-12 text-sm';

  if (hasError) {
    return (
      <div className={`${sizeClasses} rounded-full bg-gradient-to-br from-sage to-sage-deep flex items-center justify-center text-white font-bold border-2 border-white`}>
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Foto de ${name}`}
      className={`${sizeClasses} rounded-full object-cover border-2 border-white`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
}

/* ─── Star Rating ─── */
function StarRating({ count, size = 'md' }: { count: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
  return (
    <div className="flex gap-0.5" aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeMap[size]} ${i < count ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

/* ─── Caderno Image with Fallback ─── */
function CadernoImage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="w-full h-full bg-amber-50 rounded-lg shadow-2xl border border-stone-200 overflow-hidden flex flex-col items-center justify-center gap-3 p-6">
        <div className="w-16 h-16 bg-sage-light/40 rounded-xl flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-sage-deep stroke-[1.5]" />
        </div>
        <p className="text-stone-400 text-xs text-center font-semibold">Adicione <strong>caderno.png</strong><br />na pasta public/images/</p>
      </div>
    );
  }

  return (
    <img
      src="/images/caderno.png"
      alt="Devocional 365 — Versão impressa A4"
      className="w-full h-full object-contain drop-shadow-2xl rounded-lg"
      onError={() => setHasError(true)}
    />
  );
}



/* ─── Review Data ─── */
const REVIEWS = [
  {
    name: 'Maria Santos',
    stars: 5,
    photo: '/images/reviews/maria.jpg',
    text: 'A linguagem é tão acolhedora que parece que foi escrito para mim. Cada página traz paz.',
  },
  {
    name: 'Ana Paula R.',
    stars: 5,
    photo: '/images/reviews/ana.jpg',
    text: 'Comecei em julho e o devocional me acolheu sem julgamento. Os guias de recomeço são incríveis.',
  },
  {
    name: 'Carlos Eduardo',
    stars: 4,
    photo: '/images/reviews/carlos.jpg',
    text: 'Imprimi em A4 e ficou lindo. Parece um livro profissional. Superou minhas expectativas.',
  },
  {
    name: 'Juliana Ferreira',
    stars: 5,
    photo: '/images/reviews/juliana.jpg',
    text: 'Presenteei minha mãe e agora fazemos juntas. Virou nosso momento especial.',
  },
];

/* ─── Live Viewers Counter ─── */
function LiveViewers() {
  const [count, setCount] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(18, Math.min(38, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center lg:justify-start w-full">
      <div className="inline-flex items-center gap-2 bg-white/90 border border-sage/20 rounded-full px-4 py-2 shadow-sm max-w-full">
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <Eye className="w-3.5 h-3.5 text-sage-deep flex-shrink-0" />
        <span className="text-xs sm:text-sm text-stone-600 font-semibold">
          <strong className="text-stone-800 font-extrabold">{count}</strong> pessoas vendo agora
        </span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN APP
   ═══════════════════════════════════════════════════ */
export function App() {
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsHeaderScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream font-body overflow-x-hidden">

      {/* ── Header ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isHeaderScrolled ? 'bg-cream/95 backdrop-blur-lg shadow-md border-b border-beige/50 py-2.5' : 'bg-cream/60 backdrop-blur-sm py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <a href="#" className="flex items-center group transition-all duration-300" aria-label="Devocional 365 — Início">
            <Logo size={isHeaderScrolled ? 'sm' : 'md'} />
          </a>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navegação principal">
            {[
              { href: '#sobre', label: 'Sobre' },
              { href: '#previa', label: 'Prévia' },
              { href: '#avaliacoes', label: 'Avaliações' },
              { href: '#faq-section', label: 'FAQ' },
            ].map(link => (
              <a key={link.href} href={link.href} className="text-sm text-stone-600 hover:text-sage-deep font-semibold transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-sage-deep after:transition-all after:duration-300 hover:after:w-full">
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#oferta"
            className={`inline-flex items-center gap-2 bg-sage-deep hover:bg-sage-dark text-white font-bold rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:shadow-sage-deep/20 cursor-pointer ${isHeaderScrolled ? 'px-5 py-2.5 text-sm' : 'px-6 py-3 text-sm'}`}
            aria-label="Ir para a oferta"
          >
            <Heart className="w-4 h-4 stroke-[2.5] fill-white/20" />
            <span className="hidden sm:inline">Começar hoje</span>
            <span className="sm:hidden">Começar</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </a>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center overflow-x-hidden pt-16" aria-label="Início">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-dark/20 to-cream" />
        <div className="absolute top-20 right-0 w-80 h-80 bg-sage/8 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-sky-soft/15 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-0 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
          {/* Copy */}
          <div className="space-y-8 text-center lg:text-left">
            <LiveViewers />

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-stone-800 leading-[1.15] tracking-wide font-bold">
              Você não precisa começar no{' '}
              <span className="highlight-text">dia 1</span>{' '}
              para caminhar com Deus
            </h1>

            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              O Devocional 365 foi criado para pessoas reais, que querem{' '}
              <strong className="text-stone-800 font-extrabold">constância sem culpa.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
              <CTAButton text="Começar hoje com Deus" large href="#oferta" />
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-5 text-sm text-stone-500 font-semibold">
              <span className="flex items-center gap-1.5"><Download className="w-4 h-4 stroke-[2.5]" /> Acesso imediato</span>
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 stroke-[2.5]" /> Garantia 7 dias</span>
              <span className="flex items-center gap-1.5"><Printer className="w-4 h-4 stroke-[2.5]" /> Digital ou impresso</span>
            </div>
          </div>

          {/* Mockups + Thumbnails */}
          <div className="relative flex flex-col items-center lg:items-end w-full gap-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-8 sm:gap-4 md:gap-6 relative w-full justify-center">

              {/* Caderno — Imagem personalizada */}
              <div className="relative transform sm:-rotate-2 hover:rotate-0 transition-transform duration-700 float-animation">
                <div className="absolute inset-0 bg-stone-900/10 rounded-2xl blur-xl translate-y-4 translate-x-2" />
                <div className="relative w-[260px] sm:w-[230px] md:w-[290px] h-[380px] sm:h-[340px] md:h-[420px]">
                  <CadernoImage />
                </div>
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1.5 rounded-full shadow-md border border-stone-200/60 whitespace-nowrap">
                  <p className="text-[10px] md:text-xs text-stone-600 font-bold flex items-center gap-1.5">
                    <Printer className="w-3 h-3 text-sage-deep stroke-[2.5]" />
                    Versão impressa A4
                  </p>
                </div>
              </div>

              {/* Celular — iPhone com moldura e botões */}
              <div className="relative transform sm:rotate-1 hover:rotate-0 transition-transform duration-700 float-animation" style={{ animationDelay: '1s', overflow: 'visible' }}>
                {/* Shadow */}
                <div className="absolute inset-4 bg-black/15 rounded-[3rem] blur-2xl translate-y-8" />
                
                {/* iPhone Container - overflow visible for buttons */}
                <div className="relative" style={{ overflow: 'visible' }}>
                  
                  {/* ── Physical Buttons (LEFT) ── */}
                  {/* Silent Switch */}
                  <div className="absolute -left-[3px] top-[72px] w-[4px] h-[16px] rounded-l-sm bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-300 border-l border-t border-b border-zinc-400 shadow-[-1px_0_2px_rgba(0,0,0,0.15)]" style={{ zIndex: 30 }} />
                  {/* Volume Up */}
                  <div className="absolute -left-[3px] top-[105px] w-[4px] h-[32px] rounded-l-sm bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-300 border-l border-t border-b border-zinc-400 shadow-[-1px_0_2px_rgba(0,0,0,0.15)]" style={{ zIndex: 30 }} />
                  {/* Volume Down */}
                  <div className="absolute -left-[3px] top-[148px] w-[4px] h-[32px] rounded-l-sm bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-300 border-l border-t border-b border-zinc-400 shadow-[-1px_0_2px_rgba(0,0,0,0.15)]" style={{ zIndex: 30 }} />
                  
                  {/* ── Physical Button (RIGHT) ── */}
                  {/* Power Button */}
                  <div className="absolute -right-[3px] top-[115px] w-[4px] h-[40px] rounded-r-sm bg-gradient-to-b from-zinc-300 via-zinc-400 to-zinc-300 border-r border-t border-b border-zinc-400 shadow-[1px_0_2px_rgba(0,0,0,0.15)]" style={{ zIndex: 30 }} />

                  {/* iPhone Frame */}
                  <div className="relative w-[250px] sm:w-[230px] md:w-[270px] h-[500px] sm:h-[460px] md:h-[540px] rounded-[3rem] bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-800 p-[3px] shadow-[0_25px_60px_-12px_rgba(0,0,0,0.35),0_0_0_1px_rgba(0,0,0,0.1)]" style={{ overflow: 'visible' }}>
                    
                    {/* Inner bezel */}
                    <div className="w-full h-full rounded-[2.7rem] bg-black p-[2px]">
                      
                      {/* Screen */}
                      <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden bg-amber-50">
                        
                        {/* Dynamic Island */}
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[80px] h-[24px] bg-black rounded-full z-20 flex items-center justify-center gap-2">
                          <div className="w-[6px] h-[6px] rounded-full bg-zinc-700 ring-1 ring-zinc-600/40" />
                          <div className="w-[4px] h-[4px] rounded-full bg-zinc-800" />
                        </div>
                        
                        {/* Paper lines */}
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 26 }).map((_, i) => (
                            <div key={i} className="absolute w-full border-b border-blue-200/20" style={{ top: `${50 + i * 18}px` }} />
                          ))}
                          <div className="absolute top-0 bottom-0 left-10 w-[1px] bg-red-300/15" />
                        </div>

                        {/* Content */}
                        <div className="relative pt-12 px-5 pb-8 h-full flex flex-col">
                          
                          {/* Header */}
                          <div className="text-center pb-2.5 mb-3 border-b border-sage/20 flex-shrink-0">
                            <p className="font-hand text-sage-deep text-sm font-bold tracking-wide">Devocional 365</p>
                            <p className="font-display text-stone-800 text-3xl md:text-4xl font-bold leading-tight mt-0.5">Dia 45</p>
                            <p className="text-stone-400 text-[10px] font-semibold tracking-widest uppercase mt-1">14 de Fevereiro</p>
                          </div>

                          {/* Content sections */}
                          <div className="flex-1 space-y-3.5 overflow-hidden">
                            
                            {/* Oração */}
                            <div>
                              <p className="text-[9px] text-sage-deep/70 font-bold tracking-[0.15em] uppercase mb-1">🙏 Oração</p>
                              <p className="font-hand text-stone-700 text-[15px] md:text-[16px] leading-snug">"Senhor, ensina-me a amar como Tu amas. Abre meu coração..."</p>
                            </div>

                            {/* Versículo */}
                            <div className="bg-sage-light/25 rounded-xl p-3.5 border-l-[3px] border-sage">
                              <p className="text-[9px] text-sage-deep/70 font-bold tracking-[0.15em] uppercase mb-1">📖 Versículo</p>
                              <p className="font-hand text-sage-deep text-[15px] md:text-[16px] leading-snug font-bold">"O amor é paciente, o amor é bondoso."</p>
                              <p className="text-stone-400 text-[9px] font-bold mt-1.5 tracking-wide">— 1 Coríntios 13:4</p>
                            </div>

                            {/* Reflexão */}
                            <div>
                              <p className="text-[9px] text-sage-deep/70 font-bold tracking-[0.15em] uppercase mb-1">💭 Reflexão</p>
                              <p className="font-hand text-stone-600 text-[14px] md:text-[15px] leading-snug">"Amar não é sobre intensidade, mas sobre constância..."</p>
                            </div>

                            {/* Anotações */}
                            <div>
                              <p className="text-[9px] text-sage-deep/70 font-bold tracking-[0.15em] uppercase mb-1">✏️ Anotações</p>
                              <p className="font-hand text-stone-500/80 text-[13px] leading-relaxed italic">"Gratidão pela manhã tranquila..."</p>
                              <p className="font-hand text-stone-400/70 text-[12px] leading-relaxed italic mt-0.5">"Lembrar de agradecer sempre ♡"</p>
                              <div className="mt-2 space-y-[10px]">
                                {[1, 2, 3].map(i => <div key={i} className="w-full border-b border-stone-300/25" />)}
                              </div>
                            </div>
                          </div>

                          {/* Page number */}
                          <p className="text-center text-stone-300 text-[9px] font-semibold mt-2 flex-shrink-0">— 45 —</p>
                        </div>

                        {/* Home indicator */}
                        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[90px] h-[4px] bg-stone-400/30 rounded-full" />
                        
                        {/* Glass reflection */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-[2.5rem]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-stone-100 whitespace-nowrap">
                  <p className="text-[11px] md:text-xs text-stone-600 font-bold flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-sage-deep stroke-[2.5]" />
                    Versão digital
                  </p>
                </div>
              </div>
            </div>

            {/* Post-it Thumbnails */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-md mt-4">
              <div className="bg-amber-50 rounded-lg p-3 shadow-md hover:shadow-lg hover:-translate-y-2 hover:rotate-0 transition-all duration-300 cursor-default border border-amber-200/50 relative" style={{ transform: 'rotate(-2deg)' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-3 bg-amber-200/60 rounded-sm" />
                <span className="text-lg block mb-1">🙏</span>
                <p className="font-hand text-stone-700 text-sm font-bold leading-tight mb-1">Oração</p>
                <p className="font-hand text-stone-500 text-[11px] leading-snug">"Senhor, guia meus passos hoje..."</p>
                <p className="text-[7px] text-amber-600/60 font-bold mt-2 text-right">Dia 1</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 shadow-md hover:shadow-lg hover:-translate-y-2 hover:rotate-0 transition-all duration-300 cursor-default border border-green-200/50 relative" style={{ transform: 'rotate(1deg)' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-3 bg-green-200/60 rounded-sm" />
                <span className="text-lg block mb-1">📖</span>
                <p className="font-hand text-stone-700 text-sm font-bold leading-tight mb-1">Versículo</p>
                <p className="font-hand text-sage-deep text-[11px] leading-snug">"O Senhor é meu pastor, nada me faltará."</p>
                <p className="text-[7px] text-green-600/60 font-bold mt-2 text-right">Sl 23:1</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 shadow-md hover:shadow-lg hover:-translate-y-2 hover:rotate-0 transition-all duration-300 cursor-default border border-blue-200/50 relative" style={{ transform: 'rotate(-1deg)' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-3 bg-blue-200/60 rounded-sm" />
                <span className="text-lg block mb-1">✏️</span>
                <p className="font-hand text-stone-700 text-sm font-bold leading-tight mb-1">Anotação</p>
                <p className="font-hand text-stone-500 text-[11px] leading-snug">"Hoje senti paz ao orar de manhã..."</p>
                <p className="text-[7px] text-blue-600/60 font-bold mt-2 text-right">Dia 15</p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-7 h-7 text-stone-400 stroke-[2.5]" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DOR E IDENTIFICAÇÃO
          ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-white/50 section-lazy">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center space-y-6">
              <p className="font-display text-2xl md:text-3xl font-bold text-stone-800 leading-snug">
                Você começou um devocional cheio de vontade...<br />
                <span className="font-display text-sage-deep text-3xl md:text-4xl font-bold italic">...e parou no dia 12.</span>
              </p>
              <p className="text-lg text-stone-600 font-medium leading-relaxed">
                Não por falta de fé. Mas porque a vida aconteceu.<br />
                Os dias passaram. A culpa chegou. E o caderno ficou esquecido.
              </p>
              <p className="font-display text-3xl md:text-4xl text-sage-deep font-bold pt-2">
                Ainda dá tempo de recomeçar.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ANTES / DEPOIS
          ══════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-white/30 section-lazy">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl text-stone-800 font-bold">
                O que muda com o Devocional 365?
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal delay={0}>
              <div className="before-card bg-white/70 rounded-2xl p-6 border border-red-100/50 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-red-400 stroke-[2.5]" />
                  <h3 className="font-display text-lg font-bold text-stone-700">Sem constância</h3>
                </div>
                <ul className="space-y-3">
                  {['Começa empolgado, para em dias', 'Culpa por não manter o hábito', 'Sente distância de Deus', 'Devocionais complexos demais'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-stone-500 text-[15px] font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-300 mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="after-card bg-white/70 rounded-2xl p-6 border border-sage/20 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-5 h-5 text-sage-deep stroke-[2.5]" />
                  <h3 className="font-display text-lg font-bold text-stone-700">Com o Devocional 365</h3>
                </div>
                <ul className="space-y-3">
                  {['Hábito diário simples e leve', 'Recomeça sem culpa a qualquer momento', 'Conexão real e constante com Deus', 'Linguagem acolhedora e acessível'].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-stone-700 text-[15px] font-semibold">
                      <Check className="w-4 h-4 text-sage-deep stroke-[3] mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          APRESENTAÇÃO DO PRODUTO
          ══════════════════════════════════════════════ */}
      <section id="sobre" className="py-16 md:py-24 bg-white/40 scroll-mt-20 section-lazy">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-14">
              <p className="font-hand text-sage-deep text-2xl mb-3">Muito prazer,</p>
              <h2 className="font-display text-3xl md:text-5xl text-stone-800 mb-5 font-bold">
                Conheça o <span className="highlight-text">Devocional 365</span>
              </h2>
              <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
                365 dias organizados, com oração, versículo e reflexão. Simples, acolhedor e feito para manter — mesmo começando hoje.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BenefitCard icon={Calendar} title="365 dias organizados" description="Cada dia tem oração, versículo, reflexão e espaço para anotações." delay={0} />
            <BenefitCard icon={Printer} title="Digital ou impresso" description="Use no celular, tablet ou imprima em A4 e monte seu caderno." delay={100} />
            <BenefitCard icon={PenLine} title="Espaço para escrita" description="Linhas para suas anotações, orações e pensamentos pessoais." delay={200} />
            <BenefitCard icon={Coffee} title="Linguagem simples" description="Sem termos complexos. Textos acolhedores para qualquer pessoa." delay={300} />
            <BenefitCard icon={RefreshCw} title="Guias de recomeço" description="Perdeu dias? Cada mês tem um guia para retomar sem culpa." delay={400} />
            <BenefitCard icon={Download} title="Acesso imediato" description="Comprou, recebeu. Comece hoje, no dia que quiser." delay={500} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DEMONSTRAÇÃO ANIMADA (TYPING)
          ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream-dark/30 to-cream relative overflow-hidden section-lazy">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-sage/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-sky-soft/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <p className="font-hand text-sage-deep text-2xl mb-3">✦ Uma experiência real ✦</p>
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-4 font-bold">
                Cada dia é um encontro com Deus
              </h2>
              <p className="text-stone-500 text-base md:text-lg font-medium max-w-xl mx-auto">
                Veja como cada página foi pensada para trazer paz à sua rotina
              </p>
            </div>
          </Reveal>

          {/* Layout: Side cards + Typing Animation */}
          <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-6 items-start">

            {/* Left — mini previews */}
            <div className="hidden lg:flex flex-col gap-5">
              <Reveal delay={100}>
                <div className="bg-amber-50/80 rounded-xl border border-amber-200/40 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ transform: 'rotate(-1deg)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3.5 bg-amber-200/50 rounded-sm" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-amber-200/60 rounded-full flex items-center justify-center">
                      <span className="text-sm">🙏</span>
                    </div>
                    <p className="text-[10px] font-extrabold text-amber-700 uppercase tracking-widest">Oração</p>
                  </div>
                  <p className="font-hand text-stone-600 text-lg leading-relaxed font-bold">
                    &ldquo;Pai, me dá sabedoria para as escolhas de hoje. Que meus passos sejam guiados pela Tua vontade...&rdquo;
                  </p>
                  <p className="text-[9px] text-amber-600/50 font-bold text-right mt-3">Dia 15</p>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="bg-green-50/80 rounded-xl border border-green-200/40 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ transform: 'rotate(0.5deg)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3.5 bg-green-200/50 rounded-sm" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-green-200/60 rounded-full flex items-center justify-center">
                      <span className="text-sm">📖</span>
                    </div>
                    <p className="text-[10px] font-extrabold text-green-700 uppercase tracking-widest">Versículo</p>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3 border-l-[3px] border-sage">
                    <p className="font-hand text-sage-deep text-[17px] leading-snug font-bold">
                      &ldquo;Tudo tem o seu tempo determinado, e há tempo para todo propósito debaixo do céu.&rdquo;
                    </p>
                    <p className="text-[9px] text-stone-500 font-bold mt-1">— Eclesiastes 3:1</p>
                  </div>
                  <p className="text-[9px] text-green-600/50 font-bold text-right mt-2">Dia 42</p>
                </div>
              </Reveal>
            </div>

            {/* Center — Typing Animation */}
            <Reveal delay={200}>
              <TypingAnimation />
            </Reveal>

            {/* Right — mini previews */}
            <div className="hidden lg:flex flex-col gap-5">
              <Reveal delay={150}>
                <div className="bg-sky-50/80 rounded-xl border border-sky-200/40 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ transform: 'rotate(1deg)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3.5 bg-sky-200/50 rounded-sm" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-sky-200/60 rounded-full flex items-center justify-center">
                      <span className="text-sm">💭</span>
                    </div>
                    <p className="text-[10px] font-extrabold text-sky-700 uppercase tracking-widest">Reflexão</p>
                  </div>
                  <p className="text-stone-600 text-[13px] leading-relaxed font-semibold">
                    Às vezes Deus não muda a situação porque está mudando você através dela. Confie no processo.
                  </p>
                  <p className="text-[9px] text-sky-600/50 font-bold text-right mt-3">Dia 98</p>
                </div>
              </Reveal>

              <Reveal delay={300}>
                <div className="bg-rose-50/80 rounded-xl border border-rose-200/40 p-5 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden" style={{ transform: 'rotate(-0.5deg)' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-3.5 bg-rose-200/50 rounded-sm" />
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 bg-rose-200/60 rounded-full flex items-center justify-center">
                      <span className="text-sm">✏️</span>
                    </div>
                    <p className="text-[10px] font-extrabold text-rose-700 uppercase tracking-widest">Anotações</p>
                  </div>
                  <div className="space-y-2">
                    <div className="border-b border-dashed border-stone-300/50 pb-1">
                      <p className="font-hand text-stone-500 text-[15px] font-semibold" style={{ transform: 'rotate(-0.5deg)' }}>Acordei grata hoje...</p>
                    </div>
                    <div className="border-b border-dashed border-stone-300/50 pb-1">
                      <p className="font-hand text-stone-400 text-[15px] font-semibold" style={{ transform: 'rotate(0.3deg)' }}>Orar mais pela minha família</p>
                    </div>
                    <div className="border-b border-dashed border-stone-300/30 h-3" />
                  </div>
                  <p className="text-[9px] text-rose-600/50 font-bold text-right mt-2">Dia 203</p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="lg:hidden mt-8">
            <Reveal delay={300}>
              <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory" style={{ scrollbarWidth: 'none' }}>
                <div className="bg-amber-50/80 rounded-xl border border-amber-200/40 p-4 shadow-md min-w-[240px] snap-center flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">🙏</span>
                    <p className="text-[9px] font-extrabold text-amber-700 uppercase tracking-widest">Oração</p>
                    <span className="ml-auto text-[8px] text-stone-400 font-bold">Dia 15</span>
                  </div>
                  <p className="font-hand text-stone-600 text-sm leading-relaxed font-bold">
                    &ldquo;Pai, me dá sabedoria para as escolhas de hoje...&rdquo;
                  </p>
                </div>
                <div className="bg-green-50/80 rounded-xl border border-green-200/40 p-4 shadow-md min-w-[240px] snap-center flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">📖</span>
                    <p className="text-[9px] font-extrabold text-green-700 uppercase tracking-widest">Versículo</p>
                    <span className="ml-auto text-[8px] text-stone-400 font-bold">Dia 42</span>
                  </div>
                  <div className="bg-white/50 rounded-lg p-2.5 border-l-[3px] border-sage">
                    <p className="font-hand text-sage-deep text-sm font-bold leading-snug">&ldquo;Tudo tem o seu tempo determinado&rdquo;</p>
                    <p className="text-[8px] text-stone-500 font-bold mt-0.5">— Eclesiastes 3:1</p>
                  </div>
                </div>
                <div className="bg-rose-50/80 rounded-xl border border-rose-200/40 p-4 shadow-md min-w-[240px] snap-center flex-shrink-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm">✏️</span>
                    <p className="text-[9px] font-extrabold text-rose-700 uppercase tracking-widest">Anotações</p>
                    <span className="ml-auto text-[8px] text-stone-400 font-bold">Dia 203</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="border-b border-dashed border-stone-300/50 pb-0.5">
                      <p className="font-hand text-stone-500 text-xs font-semibold">Acordei grata hoje...</p>
                    </div>
                    <div className="border-b border-dashed border-stone-300/50 pb-0.5">
                      <p className="font-hand text-stone-400 text-xs font-semibold">Orar mais pela família</p>
                    </div>
                    <div className="border-b border-dashed border-stone-300/30 h-2.5" />
                  </div>
                </div>
              </div>
              <p className="text-center text-xs text-stone-400 font-semibold mt-2">← Deslize para ver mais →</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          DEMONSTRAÇÃO INTERATIVA
          ══════════════════════════════════════════════ */}
      <section id="previa" className="py-16 md:py-24 bg-gradient-to-b from-cream to-cream-dark/20 notebook-section-bg relative overflow-hidden scroll-mt-20 section-lazy">
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
                Veja como é <span className="highlight-text">por dentro</span>
              </h2>
              <p className="font-hand text-sage-deep text-xl">Navegue entre os meses e experimente</p>
            </div>
          </Reveal>
          <Reveal delay={200}>
            <InteractivePreview />
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PARA QUEM É
          ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-white/40 section-lazy">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Para quem é o Devocional 365
              </h2>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Clock, text: 'Para quem quer criar um hábito diário com Deus' },
              { icon: RefreshCw, text: 'Para quem já tentou manter um devocional e parou' },
              { icon: Flower2, text: 'Para quem busca paz e direção na rotina' },
              { icon: Feather, text: 'Para quem deseja uma fé prática e leve' },
              { icon: Heart, text: 'Para quem quer se sentir mais perto de Deus' },
              { icon: BookHeart, text: 'Para quem gosta de escrever e refletir' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="flex items-center gap-4 bg-white/70 rounded-xl p-5 border border-paper-line/30 hover:border-sage/30 transition-all duration-300">
                  <div className="w-10 h-10 bg-sage-light/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-sage-deep stroke-[2.5]" />
                  </div>
                  <p className="text-stone-700 text-base font-semibold">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AVALIAÇÕES
          ══════════════════════════════════════════════ */}
      <section id="avaliacoes" className="py-16 md:py-24 bg-gradient-to-b from-cream-dark/10 to-cream relative overflow-hidden scroll-mt-20 section-lazy">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-sage/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-6 relative">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Quem já começou, <span className="highlight-text">recomenda</span>
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((review, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-white/80 rounded-2xl p-6 card-soft border border-paper-line/30 h-full review-card-enhanced">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="review-photo-ring">
                      <ReviewPhoto src={review.photo} name={review.name} />
                    </div>
                    <div>
                      <p className="font-display text-stone-800 font-bold text-[15px]">{review.name}</p>
                      <StarRating count={review.stars} size="sm" />
                    </div>
                  </div>
                  <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-stone-500 font-semibold">
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
          OFERTA
          ══════════════════════════════════════════════ */}
      <section id="oferta" className="py-16 md:py-24 bg-gradient-to-b from-cream to-sage-light/15 relative overflow-hidden scroll-mt-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-0 w-72 h-72 bg-sage/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-sky-soft/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-xl mx-auto px-6">
          <Reveal>
            <div className="bg-white rounded-3xl p-8 md:p-10 card-soft border border-sage/15 text-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-sage-deep/10 text-sage-deep px-4 py-2 rounded-full text-sm font-extrabold tracking-wide">
                <Sparkles className="w-4 h-4 stroke-[2.5]" />
                Oferta especial
              </div>

              <div className="flex flex-col items-center gap-3">
                <Logo size="lg" showText={false} />
                <div>
                  <h2 className="font-display text-3xl md:text-4xl text-stone-800 mb-1 font-bold">Devocional 365</h2>
                  <p className="font-hand text-sage-deep text-xl">Um dia de cada vez com Deus</p>
                </div>
              </div>

              <div className="py-3">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="price-strike text-stone-400 text-2xl font-bold relative">R$ 67,00</span>
                  <span className="bg-red-50 text-red-500 text-xs font-extrabold px-2.5 py-1 rounded-full border border-red-100">-55%</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-stone-500 text-xl font-bold">R$</span>
                  <span className="font-display text-6xl md:text-7xl text-sage-deep font-black">29</span>
                  <span className="text-stone-500 text-xl font-bold">,90</span>
                </div>
                <p className="text-stone-500 text-sm mt-2 font-semibold">Pagamento único · Acesso vitalício</p>
              </div>

              <div className="text-left space-y-3 max-w-sm mx-auto">
                {[
                  { icon: BookOpen, text: '365 dias de devocional completo' },
                  { icon: Bookmark, text: 'Introduções e guias mensais de recomeço' },
                  { icon: Feather, text: 'Páginas extras de reflexão' },
                  { icon: FileText, text: 'Uso digital ou impressão A4' },
                  { icon: Download, text: 'Acesso imediato ao arquivo' },
                  { icon: Heart, text: 'Feito com cuidado e oração' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-sage rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span className="text-stone-700 text-base font-semibold">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <CTAButton text="Quero começar hoje" large />
              </div>

              <div className="flex items-center justify-center gap-3 pt-2 text-sm text-stone-500 font-semibold">
                <Shield className="w-5 h-5 text-sage stroke-[2]" />
                <span>Garantia de satisfação de <strong className="text-stone-700 font-extrabold">7 dias</strong></span>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold">
                  <Lock className="w-3.5 h-3.5 stroke-[2.5]" />
                  Pagamento seguro
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold">
                  <CreditCard className="w-3.5 h-3.5 stroke-[2.5]" />
                  PIX, cartão ou boleto
                </div>
                <div className="flex items-center gap-1.5 text-xs text-stone-400 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                  Compra protegida
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-3">
                <div className="flex -space-x-2">
                  {REVIEWS.slice(0, 3).map((review, i) => (
                    <ReviewPhoto key={i} src={review.photo} name={review.name} size="sm" />
                  ))}
                </div>
                <p className="text-xs text-stone-500 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 inline text-sage-deep stroke-[2.5] mr-0.5" />
                  +200 já adquiriram
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          GARANTIA EXPANDIDA
          ══════════════════════════════════════════════ */}
      <section className="py-10 md:py-14 bg-sage-light/10 section-lazy">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="bg-white rounded-2xl p-6 md:p-8 card-soft border border-sage/15 flex flex-col md:flex-row items-center gap-5 relative overflow-hidden">
              <div className="absolute inset-0 guarantee-shimmer pointer-events-none" />
              <div className="w-20 h-20 bg-sage-light/40 rounded-2xl flex items-center justify-center flex-shrink-0 relative">
                <Shield className="w-10 h-10 text-sage-deep stroke-[1.5]" />
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-sage-deep rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                </div>
              </div>
              <div className="text-center md:text-left relative">
                <h3 className="font-display text-xl font-bold text-stone-800 mb-2">
                  Garantia incondicional de 7 dias
                </h3>
                <p className="text-stone-600 text-[15px] leading-relaxed font-medium">
                  Se por qualquer motivo você não ficar satisfeito, devolvemos <strong className="text-stone-800 font-extrabold">100% do valor</strong>. Sem perguntas, sem burocracia. O risco é todo nosso.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TEXTO DE VALOR
          ══════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 bg-cream section-lazy">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="bg-paper rounded-2xl p-8 card-soft border border-paper-line/30">
              <h3 className="font-display text-xl text-stone-800 mb-4 font-bold">
                Por que este devocional é pago?
              </h3>
              <div className="space-y-3 text-stone-600 text-[15px] leading-relaxed font-medium">
                <p>
                  O Devocional 365 foi planejado e escrito com cuidado para acompanhar você <strong className="text-stone-800 font-extrabold">todos os dias do ano.</strong>
                </p>
                <p>
                  Ao adquirir, você recebe um conteúdo feito com profundidade, apoia a continuidade do projeto e contribui para novas versões.
                </p>
                <p className="font-hand text-lg text-sage-deep pt-2">
                  Obrigado por fazer parte disso. 💚
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FAQ
          ══════════════════════════════════════════════ */}
      <section id="faq-section" className="py-16 md:py-24 bg-white/40 scroll-mt-20 section-lazy">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl text-stone-800 font-bold">
                Perguntas frequentes
              </h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-paper rounded-2xl p-6 md:p-8 card-soft border border-paper-line/30">
              <FAQItem question="Posso começar em qualquer dia?" answer="Sim! Abra na página do dia atual e comece. Cada dia é independente e completo." />
              <FAQItem question="Funciona se eu já estiver atrasado?" answer="Com certeza. Simplesmente abra no dia atual e siga. Os guias mensais de recomeço vão te ajudar." />
              <FAQItem question="Posso imprimir?" answer="Sim! O arquivo está em formato A4, ideal para impressão. Também funciona perfeitamente em formato digital no celular ou tablet." />
              <FAQItem question="E se eu não gostar?" answer="Você tem 7 dias de garantia. Se não atender às suas expectativas, devolvemos o valor integral." />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA FINAL
          ══════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-cream to-sage-light/20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sage/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6">
          <Reveal>
            <div className="text-center space-y-6">
              <Heart className="w-10 h-10 text-sage mx-auto stroke-[2]" />

              <h2 className="font-display text-3xl md:text-5xl text-stone-800 leading-tight font-bold">
                Não espere a segunda-feira,<br />
                o mês que vem ou o próximo ano.
              </h2>

              <p className="text-lg text-stone-600 max-w-xl mx-auto leading-relaxed font-semibold">
                Hoje ainda é tempo. Deus está esperando por um momento{' '}
                <span className="font-hand text-sage-deep text-2xl">verdadeiro</span> com você.
              </p>

              <div className="pt-4">
                <CTAButton text="Começar hoje com Deus" large href="#oferta" />
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500 pt-2 font-bold">
                <span className="flex items-center gap-1.5"><Download className="w-4 h-4 stroke-[2.5]" /> Acesso imediato</span>
                <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 stroke-[2.5]" /> Garantia 7 dias</span>
              </div>

              <p className="font-hand text-sage-deep text-2xl pt-4">
                Um dia de cada vez. Com Deus. 🌿
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 bg-stone-800 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center mb-3">
            <Logo size="lg" showText={false} />
          </div>
          <p className="font-hand text-sage text-2xl mb-1">Devocional 365</p>
          <p className="text-stone-400 text-sm font-semibold">Um dia de cada vez com Deus</p>

          <div className="mt-5">
            <a
              href="https://wa.me/5583988702863"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/20 cursor-pointer"
              aria-label="Fale conosco pelo WhatsApp"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span className="font-bold text-sm">Dúvidas? Fale conosco</span>
            </a>
            <p className="text-stone-400 text-sm mt-3 font-semibold flex items-center justify-center gap-2">
              <WhatsAppIcon className="w-4 h-4 text-green-400" />
              WhatsApp: (83) 98870-2863
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-stone-700">
            <p className="text-stone-500 text-xs font-medium">
              © {new Date().getFullYear()} Devocional 365. Todos os direitos reservados.
            </p>
            <p className="text-stone-600 text-xs mt-1 font-medium">
              Feito com 💚 e muita oração.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
