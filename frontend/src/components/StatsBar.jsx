export default function StatsBar({ complaints }) {
  const counts = complaints.reduce(
    (acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    },
    { open: 0, "in-progress": 0, resolved: 0 }
  );

  return (
    <div className="stats-bar">
      <div className="stat stat-open">
        <span className="stat-count">{counts.open}</span>
        <span className="stat-label">Open</span>
      </div>
      <div className="stat stat-progress">
        <span className="stat-count">{counts["in-progress"]}</span>
        <span className="stat-label">In Progress</span>
      </div>
      <div className="stat stat-resolved">
        <span className="stat-count">{counts.resolved}</span>
        <span className="stat-label">Resolved</span>
      </div>
    </div>
  );
}
