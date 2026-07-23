const ACCENTS = {
  cyan: {
    value: 'text-cyan-300',
    ring: 'border-cyan-400/30',
    glow: 'shadow-[0_0_25px_-8px_rgba(34,211,238,0.7)]',
    bar: 'from-cyan-400 to-blue-500',
  },
  emerald: {
    value: 'text-emerald-300',
    ring: 'border-emerald-400/30',
    glow: 'shadow-[0_0_25px_-8px_rgba(52,211,153,0.7)]',
    bar: 'from-emerald-400 to-cyan-400',
  },
  rose: {
    value: 'text-rose-300',
    ring: 'border-rose-400/30',
    glow: 'shadow-[0_0_25px_-8px_rgba(251,113,133,0.7)]',
    bar: 'from-rose-400 to-fuchsia-500',
  },
};

function MetricCard({ label, value, accent = 'cyan' }) {
  const colors = ACCENTS[accent];

  return (
    <div
      className={`relative overflow-hidden bg-gray-900/80 rounded-2xl p-8 w-56 text-center border ${colors.ring} ${colors.glow}`}
    >
      <span className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.bar}`} />
      <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-4">{label}</h2>
      <p className={`text-5xl font-bold ${colors.value}`}>{value}</p>
    </div>
  );
}

export default MetricCard;
