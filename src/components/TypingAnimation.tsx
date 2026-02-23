import { useState, useEffect, useRef } from 'react';

interface Line {
  text: string;
  type: 'title' | 'verse' | 'reference' | 'text' | 'emphasis' | 'break';
}

const lines: Line[] = [
  { text: 'Hoje ainda é tempo', type: 'title' },
  { text: '', type: 'break' },
  { text: '"O Senhor é compassivo e misericordioso"', type: 'verse' },
  { text: '– Salmos 103:8', type: 'reference' },
  { text: '', type: 'break' },
  { text: 'Você não precisa ter todas as respostas.', type: 'text' },
  { text: 'Não precisa de um momento perfeito.', type: 'text' },
  { text: 'Deus não espera perfeição —', type: 'text' },
  { text: 'Ele espera você.', type: 'emphasis' },
  { text: '', type: 'break' },
  { text: 'Hoje, respire fundo.', type: 'text' },
  { text: 'Abra o coração.', type: 'text' },
  { text: 'E deixe Ele cuidar do resto.', type: 'emphasis' },
];

function getLineClasses(type: string): string {
  switch (type) {
    case 'title':
      return 'text-3xl md:text-5xl font-hand text-stone-800 mb-4';
    case 'verse':
      return 'text-xl md:text-2xl font-hand font-bold italic text-sage-deep';
    case 'reference':
      return 'text-sm text-stone-500 mb-3 font-bold';
    case 'emphasis':
      return 'text-xl md:text-2xl font-hand font-bold text-sage-deep';
    default:
      return 'text-lg md:text-xl font-hand font-bold text-stone-600';
  }
}

export function TypingAnimation() {
  const [completedLines, setCompletedLines] = useState<number>(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted || completedLines >= lines.length) return;

    const line = lines[completedLines];

    if (line.type === 'break') {
      const timer = setTimeout(() => {
        setCompletedLines(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (!isTyping) {
      const startDelay = setTimeout(() => {
        setIsTyping(true);
        setCurrentText('');
      }, 250);
      return () => clearTimeout(startDelay);
    }

    if (currentText.length < line.text.length) {
      const speed = line.type === 'title' ? 55 : line.type === 'verse' ? 38 : 30;
      const timer = setTimeout(() => {
        setCurrentText(line.text.slice(0, currentText.length + 1));
      }, speed);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setIsTyping(false);
        setCompletedLines(prev => prev + 1);
        setCurrentText('');
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, completedLines, currentText, isTyping]);

  return (
    <div ref={containerRef} className="max-w-2xl mx-auto">
      <div className="relative bg-paper rounded-2xl p-8 md:p-12 card-soft paper-lines overflow-hidden">
        {/* Notebook margin line */}
        <div className="absolute left-7 md:left-11 top-0 bottom-0 w-[2px] bg-red-300/25" />

        {/* Spiral binding dots */}
        <div className="absolute left-2 md:left-3 top-8 bottom-8 flex flex-col justify-between">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3.5 h-3.5 rounded-full border-[2.5px] border-stone-300 bg-cream" />
          ))}
        </div>

        <div className="space-y-1.5 pl-6 md:pl-4">
          {lines.slice(0, completedLines).map((line, i) => (
            <div key={i} className={getLineClasses(line.type)}>
              {line.type === 'break' ? <div className="h-4" /> : line.text}
            </div>
          ))}
          {isTyping && completedLines < lines.length && (
            <div className={`${getLineClasses(lines[completedLines].type)} typing-cursor`}>
              {currentText}
            </div>
          )}
        </div>

        {/* Paper fold corner */}
        <div className="absolute bottom-0 right-0 w-14 h-14">
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[56px] border-l-transparent border-b-[56px] border-b-cream-dark" />
          <div className="absolute bottom-0 right-0 w-0 h-0 border-l-[52px] border-l-transparent border-b-[52px] border-b-paper opacity-60" />
        </div>
      </div>
    </div>
  );
}
