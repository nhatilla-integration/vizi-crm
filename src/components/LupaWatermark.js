function LupaWatermark() {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden="true"
      className="pointer-events-none select-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[18%] w-[520px] h-[520px] md:w-[760px] md:h-[760px] opacity-[0.08] rotate-[-8deg] z-0"
    >
      <defs>
        <linearGradient id="lupaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
      </defs>
      <circle cx="85" cy="85" r="55" fill="none" stroke="url(#lupaGradient)" strokeWidth="10" />
      <line x1="126" y1="126" x2="178" y2="178" stroke="url(#lupaGradient)" strokeWidth="16" strokeLinecap="round" />
    </svg>
  );
}

export default LupaWatermark;
