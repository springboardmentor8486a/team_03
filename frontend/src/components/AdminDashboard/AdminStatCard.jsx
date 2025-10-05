export default function AdminStatCard({ title, value, subtitle, color, icon }) {
  return (
    <div
      className={`p-6 rounded-xl text-white bg-gradient-to-r ${color} shadow-md hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 cursor-pointer`}
    >
      <div className="flex items-center justify-between">
        <div className="text-left">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs mt-1 opacity-90">{subtitle}</p>
        </div>
        <span className="text-3xl">{icon}</span>
      </div>
    </div>
  );
}
