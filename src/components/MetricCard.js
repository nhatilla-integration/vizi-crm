function MetricCard({ label, value, valueColor = 'text-white' }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-8 w-56 text-center shadow-lg">
      <h2 className="text-gray-400 text-sm uppercase tracking-wider mb-4">{label}</h2>
      <p className={`text-5xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}

export default MetricCard;