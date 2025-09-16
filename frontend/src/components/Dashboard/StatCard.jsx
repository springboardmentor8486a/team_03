export default function StatCard({ title, value, subtitle, color, icon }) {
  return (
    <div
      className={`p-6 rounded-xl text-white bg-gradient-to-r ${color} shadow`}
    >
      <div className="flex items-center justify-between">
        {/* Left side (text) */}
        <div className="text-left">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs mt-1 opacity-90">{subtitle}</p>
        </div>

        {/* Right side (icon) */}
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}
