const ACCENTS = {
  blue: { bar: 'bg-brand-blue', value: 'text-brand-blue', tint: 'bg-blue-50/60' },
  green: { bar: 'bg-green-500', value: 'text-green-600', tint: 'bg-green-50/60' },
  red: { bar: 'bg-red-500', value: 'text-red-600', tint: 'bg-red-50/60' },
};

function MetricCard({ label, value, accent = 'blue' }) {
  const colors = ACCENTS[accent];

  return (
    <div className={`flex items-stretch rounded-xl w-64 border border-slate-200 shadow-sm overflow-hidden ${colors.tint}`}>
      <span className={`w-2 shrink-0 ${colors.bar}`} />
      <div className="p-5 text-left">
        <h2 className="text-slate-500 text-xs uppercase tracking-wider font-semibold mb-2">{label}</h2>
        <p className={`text-4xl font-extrabold ${colors.value}`}>{value}</p>
      </div>
    </div>
  );
}

export default MetricCard;
