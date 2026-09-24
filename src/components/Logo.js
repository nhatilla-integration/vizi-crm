// Selo de marca do Vizi: mantém o conceito de "lupa" (visibilidade) da marca
// original, mas como um selo compacto e sólido — não mais uma textura gigante
// e apagada no fundo.
function Logo({ size = 40 }) {
  return (
    <div
      className="rounded-xl bg-gradient-to-br from-brand-blue to-brand-orange flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 24" className="w-[58%] h-[58%]" fill="none">
        <circle cx="10" cy="10" r="6.2" stroke="white" strokeWidth="2.4" />
        <line x1="14.6" y1="14.6" x2="20.5" y2="20.5" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export default Logo;
