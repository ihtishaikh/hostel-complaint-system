export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search complaints..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="">All categories</option>
        <option value="maintenance">Maintenance</option>
        <option value="mess">Mess</option>
        <option value="other">Other</option>
      </select>
      <select
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All statuses</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}
